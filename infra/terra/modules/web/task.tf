resource "aws_ecs_task_definition" "web" {
  family                = "${local.name}-family" # Naming our first task
  container_definitions = jsonencode(
    [
      {
        name : local.name,
        image : aws_ecr_repository.web.repository_url,
        essential : true,
        portMappings : [
          {
            "containerPort" : var.port,
            "hostPort" : var.port
          }
        ],
        memory : 512,
        cpu : 256,
        healthCheck : {
          retries = 5
          command =  [ "CMD-SHELL", "curl -f http://localhost:${var.port}/${var.health_check_path} || exit 1" ]
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
  execution_role_arn       = var.ecsTaskExecutionRoleArn.arn
  tags                     = {
    Name = "${local.name}-family"
  }
}
