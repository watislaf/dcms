resource "aws_ecs_cluster" "this" {
  name = var.name
  tags = {
    Name = var.name
  }
}

resource "aws_ecs_service" "service" {
  name            = "${var.name}-service"
  cluster         = aws_ecs_cluster.this.id
  task_definition = var.task_definition_arn
  desired_count   = 1
  launch_type     = "FARGATE"
  depends_on      = [null_resource.send_docker_image]

  network_configuration {
    subnets          = var.private_subnets_ids
    assign_public_ip = false
    security_groups  = var.security_groups
  }

  load_balancer {
    target_group_arn = var.lb_target_group
    container_name   = var.name
    container_port   = var.port
  }
  tags = {
    Name = var.name
  }
}
