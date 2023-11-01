terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

module "roles" {
  source = "modules/roles"
}

module "network" {
  source = "./modules/network"
  availability_zones = ["eu-north-1a", "eu-north-1b"]
  public_subnets     = ["10.10.100.0/24", "10.10.101.0/24"]
  private_subnets    = ["10.10.0.0/24", "10.10.1.0/24"]
}

module "external_application_load_balancer" {
  source = "./modules/external_alb"

  vpc_id = module.network.vpc_id
  public_subnets_ids = module.network.public_subnets_ids
}

module "web" {
  source = "modules/web"

  env = "tests"
  port = 4173
  health_check_path = "healthcheck.html"

  ecsTaskExecutionRoleArn=module.roles.ecsTaskExecutionIamRoleArn

  vpc_id = module.network.vpc_id
  private_subnets_ids = module.network.private_subnets_ids

  external_alb_security_group_id = module.external_application_load_balancer.security_group_id
  external_alb_id = module.external_application_load_balancer.alb_id
}
