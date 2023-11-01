output "security_group_id" {
  value = aws_security_group.main.id
}

output "alb_id" {
  value = aws_alb.main.id
}
