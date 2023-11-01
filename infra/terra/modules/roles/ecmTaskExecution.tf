resource "aws_iam_role" "ecsTaskExecution" {
  name               = "ecsTaskExecution"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
  tags               = {
    Name = "ecsTaskExecution"
  }
}

data "aws_iam_policy_document" "ecsTaskExecution" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecution" {
  role       = aws_iam_role.ecsTaskExecution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

output "ecsTaskExecutionIamRoleArn" {
  value = aws_iam_role.ecsTaskExecution.arn
}
