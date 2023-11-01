
isLocked=$(git -C $DCMS config --local --get filter.git-crypt.smudge)

if [[ -z $isLocked ]]; then
  export AWS_ACCESS_KEY_ID=""
  export AWS_SECRET_ACCESS_KEY=""
  export AWS_DEFAULT_REGION=""
else
  source "$DCSM_INFRA"/secrets.sh
fi;
