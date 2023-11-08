output "ip" {
  value = aws_instance.mongo_primary.private_ip
}
output "port" {
  value = 27017
}
output "url" {
  value = "${aws_instance.mongo_primary.private_ip}:27017/test"
}
