output "name" {
  value = var.name
}

output "port" {
  value = var.port
}

output "security_groups" {
  value = [aws_security_group.api_container.id]
}

output "task_definition_arn" {
  value = aws_ecs_task_definition.api.arn
}

output "lb_target_group" {
  value = aws_alb_target_group.api.arn
}
