module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "dcms-bucket-${var.name}"
  acl    = "private"

  force_destroy = true

  control_object_ownership = true
  object_ownership         = "ObjectWriter"
}
