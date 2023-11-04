module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name                 = "dcms"
  cidr                 = "172.18.0.0/16"
  azs                  = var.availability_zones
  private_subnets      = var.private_subnets
  public_subnets       = var.public_subnets
  enable_dns_hostnames = true
}
