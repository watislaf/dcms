locals {
  private_key_path     = "${var.DCSM_INFRA}/ssh/key"
  public_key_path      = "${var.DCSM_INFRA}/ssh/key.pub"
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


module "web_container" {
  source = "./modules/auto_updating_ecs"

  repo_version = "1.0.0"

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

  vpc_id   = module.network.vpc_id
  repo_url = module.web_container.repo_url

  external_alb_security_group_id = module.external_application_load_balancer.security_group_id
  external_alb_id                = module.external_application_load_balancer.alb_id

  ecsTaskExecutionRoleArn = module.roles.ecsTaskExecutionIamRoleArn
}

module "bastion" {
  source        = "./resources/bastion_host"
  private_key_path     = local.private_key_path
  public_key_path      = local.public_key_path
  ingress_ip      = "0.0.0.0/0" ## UNSECURE

  instance_type     = "t3.nano"
  instance_ami    = "ami-0a485299eeb98b979"
  public_subnet_id = module.network.public_subnets_ids[1]
  vpc_id           = module.network.vpc_id
}


module "mongodb" {
  keypair_name  = module.bastion.keypair_name
  source        = "./resources/mongodb"
  vpc_id        = module.network.vpc_id
  subnet_id     = module.network.private_subnets_ids[1]
  azone         = module.network.azones[1]

  ssh_user      = "ec2-user"
  instance_type = "t3.micro"
  ami_id        = "ami-0a485299eeb98b979"

  mongodb_version = "7.0"
  replicaset_name = "mongo-rp0"
  replica_count   = 1
  replica_size   = 10
  private_key_path     = local.private_key_path

  bastion_host    = module.bastion.bastion_ip

  tags            = {
    Name        = "MongoDB"
  }
}
