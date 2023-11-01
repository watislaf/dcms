resource "aws_ecr_repository" "web" {
  name = local.name
  tags = {
    Name = local.name
  }
  force_delete = true
}

resource "aws_ecr_lifecycle_policy" "default_policy" {
  repository = aws_ecr_repository.web.name


  policy = jsonencode(
	{
	    "rules": [
	        {
	            "rulePriority": 1,
	            "description": "Keep only the last untagged images.",
	            "selection": {
	                "tagStatus": "untagged",
	                "countType": "imageCountMoreThan",
	                "countNumber": ${var.untagged_images}
	            },
	            "action": {
	                "type": "expire"
	            }
	        }
	    ]
	}
  )


}

resource "aws_ecs_cluster" "web" {
  name = local.name
  tags = {
    Name = local.name
  }
}

resource "aws_ecs_service" "my_first_service" {
  name            = "${local.name}-service"
  cluster         = aws_ecs_cluster.web.id
  task_definition = aws_ecs_task_definition.web.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  depends_on = [aws_iam_role_policy_attachment.ecsTaskExecutionRole_policy]

  network_configuration {
    subnets          = var.private_subnets_ids
    assign_public_ip = false
    security_groups = [aws_security_group.web_container.id]
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.web.arn
    container_name   = "${local.name}-LB-container"
    container_port   = var.port
  }
  tags = {
    Name = local.name
  }
}

resource "aws_security_group" "web_container" {
  description = "allow inbound access from the ALB only"

  name        = "${local.name}-container"
  vpc_id      = var.vpc_id

  ingress {
    protocol        = "tcp"
    from_port       = var.port
    to_port         = var.port
    security_groups = [var.external_alb_security_group_id]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = local.name
  }
}
