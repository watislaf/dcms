output "ip" {
  value = aws_instance.mongo_primary.private_ip
}
output "port" {
  value = var.mongo_port
}
output "url" {
  value = "${aws_instance.mongo_primary.private_ip}:27017/${var.mongo_database}"
}
