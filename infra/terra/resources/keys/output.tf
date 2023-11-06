
output "keypair_name" {
  value = aws_key_pair.bastion_key.key_name
}

output "private_key_path" {
  value = local_sensitive_file.bastion-private-key.filename
}

output "private_key" {
  value = local_sensitive_file.bastion-private-key.content
}
