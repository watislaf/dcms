output "bastion_ip" {
  value = aws_eip.bastion.public_ip
}
output "keypair_name" {
  value = aws_key_pair.bastion_key.key_name
}
