`terraform init`
aws iam list-users
aws create-user --user-name tf-developer
aws  iam create-user --user-name tf-developer
aws  iam create-group
aws  iam create-group --group-name Dev
aws  iam add-user-to-group --user-name tf-developer --group-name Dev
aws iam create-access-key --user-name tf-developer
aws --profile watislaf iam create-access-key --user-name tf-developer
