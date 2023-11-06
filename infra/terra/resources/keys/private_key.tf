## Generate PEM (and OpenSSH) formatted private key.
resource "tls_private_key" "t" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

## Create the file for Public Key
resource "local_file" "bastion-public-key" {
  content    = tls_private_key.t.public_key_openssh
  filename   = var.public_key_path
}

## Create the sensitive file for Private Key
resource "local_sensitive_file" "bastion-private-key" {
  content         = tls_private_key.t.private_key_pem
  filename        = var.private_key_path
  file_permission = "0600"
}

## AWS SSH Key Pair
resource "aws_key_pair" "bastion_key" {
  key_name   = "bastion_key"
  public_key = tls_private_key.t.public_key_openssh
}
