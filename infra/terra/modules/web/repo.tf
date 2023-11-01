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
      "rules" : [
        {
          "rulePriority" : 1,
          "description" : "Keep last 4 images",
          "selection" : {
            "tagStatus" : "tagged",
            "tagPrefixList" : ["v"],
            "countType" : "imageCountMoreThan",
            "countNumber" : 3
          },
          "action" : {
            "type" : "expire"
          }
        }
      ]
    }
  )
}

resource "null_resource" "send_docker_image" {
  provisioner "local-exec" {
    command = <<EOF
aws ecr get-login-password --region eu-north-1  | docker login --username AWS --password-stdin 211439781557.dkr.ecr.eu-north-1.amazonaws.com
docker build -t "${aws_ecr_repository.web.repository_url}:latest" -f $DCSM_ADMIN_PANEL/Dockerfile $DCSM_ADMIN_PANEL
docker push "${aws_ecr_repository.web.repository_url}:latest"
    EOF
  }

  triggers = {
    "run_at" = timestamp()
  }

  depends_on = [
    aws_ecr_repository.web,
  ]
}
