resource "aws_ecs_task_definition" "api" {
  family                = "${var.name}-family" # Naming our first task
  container_definitions = jsonencode(
    [
      {
        name : var.name,
        image : var.repo_url,
        essential : true,
        portMappings : [
          {
            containerPort : var.port,
            hostPort : var.port
          },
          {
            containerPort : var.mongo_port,
            hostPort : var.mongo_port
          }
        ],
        environment : [
          {
            "name" : "MONGO_PATH",
            "value" : var.mongo_url
          }
        ]
        memory : 512,
        cpu : 256,
        healthCheck : {
          retries = 5
          command = [
            "CMD-SHELL", "wget --no-verbose --tries=1 --spider localhost:${var.port}/${var.check_health_path} || exit 1"
          ]
          timeout : 5
          interval : 10
          startPeriod : 20
        }
      }
    ]
  )

  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = var.ecsTaskExecutionRoleArn
  tags                     = {
    Name = "${var.name}-family"
  }
}


resource "aws_security_group" "api_container" {
  description = "allow inbound access from the ALB only"

  name   = "${var.name}-container"
  vpc_id = var.vpc_id

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
    Name = var.name
  }
}

resource "aws_alb_target_group" "api" {
  name        = var.name
  port        = var.port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  stickiness {
    enabled = true
    type    = "lb_cookie"
  }

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = "/${var.check_health_path}"
    unhealthy_threshold = "2"
  }
}

resource "aws_lb_listener_rule" "static" {
  listener_arn = var.alb_listener_arn
  priority     = 99

  action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.api.arn
  }

  condition {
    host_header {
      values = [var.domain]
    }
  }
}
