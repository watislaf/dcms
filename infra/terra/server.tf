resource "aws_instance" "api" {
  ami           = "ami-0550c2ee59485be53"
  instance_type = "t3.micro"
}

output "api-ip" {
  value = aws_instance.api.public_ip
}
