output "vpc_id" {
  value = module.vpc.vpc_id
}

output "vpc_cidr_block" {
  value = module.vpc.vpc_cidr_block
}

output "private_subnets_ids" {
  value = module.vpc.private_subnets
}

output "azones" {
  value = module.vpc.azs
}

output "public_subnets_ids" {
  value = module.vpc.public_subnets
}
