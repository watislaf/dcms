variable "vpc_id" {
  type = string
}

variable "instance_ami" {
  type = string
}

variable "instance_type" {
  type = string
}

variable "public_key_path" {
  type = string
}

variable "public_subnet_id" {
  type = string
}

variable "private_key_path" {
  type = string
}

variable "ingress_ip" {
  type = string
}
