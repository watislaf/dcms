## EC2 Bastion Host Security Group
resource "aws_security_group" "bastion" {
  description = "EC2 Bastion Host Security Group"
  name        = "bastion"
  vpc_id      = var.vpc_id
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ingress_ip]
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    ipv6_cidr_blocks = ["::/0"]
    description      = "IPv6 route Open to Public Internet"
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "IPv4 route Open to Public Internet"
  }
}

resource "aws_eip" "bastion" {
  associate_with_private_ip = aws_instance.bastion.private_ip
  instance                  = aws_instance.bastion.id
}

resource "aws_instance" "bastion" {
  ami                         = var.instance_ami
  instance_type               = var.instance_type
  key_name                    = aws_key_pair.bastion_key.key_name
  vpc_security_group_ids      = [aws_security_group.bastion.id]
  subnet_id                   = var.public_subnet_id
  associate_public_ip_address = false
  user_data                   = <<EOF
  #!/bin/bash
  sudo yum update --all -y
  sudo yum install readline-devel openssl-devel -y
EOF

root_block_device {
    volume_size           = 8
    delete_on_termination = true
    volume_type           = "gp2"
    tags = {
      Name = "bastion_root"
    }
  }
  credit_specification {
    cpu_credits = "standard"
  }

  tags = {
    Name = "bastion"
  }
}
