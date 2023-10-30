in order to create global lock use
```
terraform {
  backend "s3" {
    bucket         = local.bucket_name
    key            = "tf-infra/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = local.table_name
    encrypt        = true
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

module "tf-state" {
  source      = "./modules/tf-state"
  bucket_name = local.bucket_name
  table_name  = local.table_name
}
```
