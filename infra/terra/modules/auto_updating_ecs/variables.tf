variable "name" {
  type = string
}

variable "project_folder" {
  type = string
}

variable "task_definition_arn" {
  type = string
}

variable "private_subnets_ids" {
  type = list(string)
}

variable "security_groups" {
  type = list(string)
}

variable "port" {
  type = number
}

variable "lb_target_group" {
  type = string
}

variable "repo_version" {
  type = string
}
