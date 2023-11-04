
isLocked=$(git -C $DCMS config --local --get filter.git-crypt.smudge)

if [[ -z $isLocked ]]; then
  export AWS_ACCESS_KEY_ID=""
  export AWS_SECRET_ACCESS_KEY=""
  export AWS_DEFAULT_REGION=""
else
  source "$DCSM_INFRA"/secrets.sh
fi;

export TF_VAR_DCMS_ADMIN_PANEL=$DCMS/admin-panel
export TF_VAR_DCSM_SERVER=$DCMS/server
export TF_VAR_DCSM_INFRA=$DCMS/infra
export AWS_DEFAULT_PROFILE="watislaf"
