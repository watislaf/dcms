variable "env" {
  description = "Env"
  type        = string
}

variable "port" {
  type        = number
}

variable "vpc_id" {
  type        = string
}

variable "private_subnets_ids" {
  type = list(string)
}

variable "external_alb_security_group_id" {
  type = string
}

variable "external_alb_id" {
  type = string
}

variable "health_check_path" {
  type = string
}

variable "ecsTaskExecutionRoleArn" {
  type = string
}
