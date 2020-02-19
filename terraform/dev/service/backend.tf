// service/backend.tf
terraform {
  backend "s3" {
    bucket         = "juniperswordplay-terraform-ci"
    key            = "service/terraform.tfstate"
    region         = "us-west-2"
    encrypt        = true
    dynamodb_table = "terraform-lock"
  }
}