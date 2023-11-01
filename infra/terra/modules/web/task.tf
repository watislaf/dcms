resource "aws_ecs_task_definition" "web" {
  family                = "${local.name}-family" # Naming our first task
  container_definitions = jsonencode(
    [
      {
        name : "${local.name}-task",
        image: aws_ecr_repository.web.repository_url,
        essential : true,
        portMappings : [
          {
            "containerPort" : var.port,
            "hostPort" : var.port
          }
        ],
        memory : 512,
        cpu : 256
      }
    ]
  )
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  // ARN of the task execution role that the Amazon ECS container agent and the Docker daemon can assume.
  execution_role_arn       = aws_iam_role.web.arn
  tags = {
    Name        = "${local.name}-family"
  }
}

resource "aws_iam_role" "web" {
  name               = "${local.name}-task-role"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
  tags = {
    Name        = "${local.name}-task-role"
  }
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.web.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
