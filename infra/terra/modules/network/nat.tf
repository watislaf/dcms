// NAT
resource "aws_eip" "nat_eip" {
  domain   = "vpc"
}

resource "aws_nat_gateway" "nat" {
  # Allocating the Elastic IP to the NAT Gateway!
  allocation_id = aws_eip.nat_eip.id

  # Associating it in the Public Subnet!
  subnet_id = aws_subnet.public[0].id
  tags = {
    Name = "Nat-Gateway"
  }
}

resource "aws_route_table" "nat" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = {
    Name = "Route Table for NAT Gateway"
  }
}

resource "aws_route_table_association" "nat" {
  count          = length(var.public_subnets)
  subnet_id      = element(aws_subnet.private.*.id, count.index)
  route_table_id = aws_route_table.nat.id
}
