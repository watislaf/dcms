variable "vpc_id" {
  type        = string
}

variable "public_subnets_ids" {
  type = list(string)
}
