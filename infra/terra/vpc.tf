
# private network
data "aws_vpc" "default" {
  cidr_block       = "10.0.0.0/16"
  instance_tenancy = "default"
}

resource "aws_ecr_repository" "containerStorage" {
  name                 = "ecr"
  image_tag_mutability = "MUTABLE"
}
