output "repo_url" {
  value = "${aws_ecr_repository.repo.repository_url}:${var.repo_version}"
}
