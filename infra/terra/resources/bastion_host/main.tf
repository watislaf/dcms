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

data "template_file" "userdata" {
  template = file("${path.module}/jumpbox_userdata.sh")
}

resource "aws_instance" "bastion" {
  ami                         = var.instance_ami
  instance_type               = var.instance_type
  key_name                    = var.key_name
  vpc_security_group_ids      = [aws_security_group.bastion.id]
  subnet_id                   = var.public_subnet_id
  associate_public_ip_address = true
  user_data                   = data.template_file.userdata.rendered

  provisioner "file" {
    source      = var.private_key_path
    destination = "/home/ec2-user/id_rsa"

    connection {
      type         = "ssh"
      user         = "ec2-user"
      host         = self.public_ip
      agent        = false
      private_key  = var.private_key
    }
  }

  root_block_device {
    volume_size           = 8
    delete_on_termination = true
    volume_type           = "standard"
    tags                  = {
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
