`terraform init`

configure profile watislaf on aws

```
aws iam list-users
aws create-user --user-name tf-developer
aws iam create-user --user-name tf-developer
aws iam create-group
aws iam create-group --group-name Dev
aws iam add-user-to-group --user-name tf-developer --group-name Dev
aws iam create-access-key --user-name tf-developer
aws --profile watislaf iam create-access-key --user-name tf-developer
push image
aws ecr get-login-password --region eu-central-1  | docker login --username AWS --password-stdin 211439781557.dkr.ecr.eu-central-1.amazonaws.com
aws ecr create-repository --repository-name REPO_NAME
docker-compose build
docker-compose push   
```

terraform destroy --target aws_instance.demo_vm_1
