terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

module "roles" {
  source = "./resources/roles"
}

module "network" {
  source             = "./resources/network"
  availability_zones = ["eu-central-1a", "eu-central-1b"]
  public_subnets     = ["10.10.100.0/24", "10.10.101.0/24"]
  private_subnets    = ["10.10.0.0/24", "10.10.1.0/24"]
}

module "external_application_load_balancer" {
  source = "./resources/external_alb"

  vpc_id             = module.network.vpc_id
  public_subnets_ids = module.network.public_subnets_ids
}


module "web_container" {
  source = "./modules/auto_updating_ecs"

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
