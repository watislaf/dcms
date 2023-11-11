locals {
  private_key_path = "${var.DCMS_INFRA}/ssh/key"
  public_key_path  = "${var.DCMS_INFRA}/ssh/key.pub"
}

module "roles" {
  source = "./resources/roles"
}

module "network" {
  source             = "./resources/network"
  availability_zones = ["eu-central-1a", "eu-central-1b"]
  public_subnets     = ["172.18.100.0/24", "172.18.101.0/24"]
  private_subnets    = ["172.18.0.0/24", "172.18.1.0/24"]
}

module "external_application_load_balancer" {
  source = "./resources/external_alb"

  vpc_id             = module.network.vpc_id
  public_subnets_ids = module.network.public_subnets_ids
}

module "key" {
  source           = "./resources/keys"
  private_key_path = local.private_key_path
  public_key_path  = local.public_key_path
}

module "s3_bucket" {
  source = "./resources/bucket"
 name = "test-bucket"
}


module "bastion" {
  source           = "./resources/bastion_host"
  private_key_path = module.key.private_key_path
  key_name         = module.key.keypair_name
  private_key      = module.key.private_key

  ingress_ip = "0.0.0.0/0" ## UNSECURE

  instance_type    = "t3.nano"
  instance_ami     = "ami-0a485299eeb98b979"
  public_subnet_id = module.network.public_subnets_ids[1]
  vpc_id           = module.network.vpc_id
}

module "mongodb_cluster" {
  source           = "./resources/mongodb_cluster"
  mongo_port       = 27017
  mongo_local_port = 27018
  script_save_path = var.DCMS_INFRA

  key_name         = module.key.keypair_name
  private_key_path = module.key.private_key_path
  private_key      = module.key.private_key
  vpc_id           = module.network.vpc_id
  vpc_cidr_block   = module.network.vpc_cidr_block

  private_subnet_ids = module.network.private_subnets_ids
  jumpbox_public_ip  = module.bastion.bastion_ip
  replica_set_name   = "mongoRs"

  num_secondary_nodes = 0
  mongo_database      = "test"
  primary_node_type   = "t2.micro"
  secondary_node_type = "t2.micro"
}


module "api_container" {
  source = "./modules/auto_updating_ecs"

  repo_version = "1.0.2"

  name                = module.api_task.name
  port                = module.api_task.port
  security_groups     = module.api_task.security_groups
  task_definition_arn = module.api_task.task_definition_arn
  lb_target_group     = module.api_task.lb_target_group

  private_subnets_ids = module.network.private_subnets_ids

  project_folder = var.DCMS_SERVER
}

module "api_task" {
  source = "./resources/api"

  name              = "tests-api"
  port              = 8080
  check_health_path = "v1/health"
  domain            = "api.watislaf.com"

  vpc_id   = module.network.vpc_id
  repo_url = module.api_container.repo_url

  mongo_ip   = module.mongodb_cluster.ip
  mongo_port = module.mongodb_cluster.port
  mongo_url  = module.mongodb_cluster.url

  external_alb_security_group_id = module.external_application_load_balancer.security_group_id
  alb_listener_arn               = module.external_application_load_balancer.listener_arn
  ecsTaskExecutionRoleArn        = module.roles.ecsTaskExecutionIamRoleArn
}

module "web_container" {
  source = "./modules/auto_updating_ecs"

  repo_version = "1.0.3"

  name                = module.web_task.name
  port                = module.web_task.port
  security_groups     = module.web_task.security_groups
  task_definition_arn = module.web_task.task_definition_arn
  lb_target_group     = module.web_task.lb_target_group

  private_subnets_ids = module.network.private_subnets_ids

  project_folder = var.DCMS_ADMIN_PANEL
}

module "web_task" {
  source = "./resources/web"

  name              = "tests-web"
  port              = 4173
  check_health_path = "health.html"
  domain            = "www.watislaf.com"

  vpc_id   = module.network.vpc_id
  repo_url = module.web_container.repo_url

  external_alb_security_group_id = module.external_application_load_balancer.security_group_id
  alb_listener_arn               = module.external_application_load_balancer.listener_arn

  ecsTaskExecutionRoleArn = module.roles.ecsTaskExecutionIamRoleArn
}
