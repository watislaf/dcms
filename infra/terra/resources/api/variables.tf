variable "name" {
  type        = string
}

variable "port" {
  type        = number
}

variable "vpc_id" {
  type        = string
}

variable "external_alb_security_group_id" {
  type = string
}

variable "alb_listener_arn" {
  type = string
}

variable "check_health_path" {
  type = string
}


variable "ecsTaskExecutionRoleArn" {
  type = string
}

variable "repo_url" {
  type = string
}


variable "mongo_ip" {
  type = string
}

variable "mongo_port" {
  type = number
}

variable "mongo_url" {
  type = string
}

variable "domain" {
  type = string
}
