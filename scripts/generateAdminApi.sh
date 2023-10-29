DCMS_API=$DCSM_ADMIN_PANEL/src/api
spec_file=$DCMS_API/api.json
rm $spec_file &>/dev/null

if wget http://localhost:8080/api-json -O $spec_file; then
  cd $DCSM_ADMIN_PANEL
  npx openapi-generator-cli generate \
    -g typescript-axios \
    -i $spec_file \
    -c $DCMS_API/.openapi-generator-configuration.json \
    -t $DCMS_API/custom-templates \
    -o $DCMS_API \
    --api-package apis \
    --model-package models \
    --type-mappings json="string\|number" \
    --language-specific-primitives "string\|number"
  cd
  # TMP START
  rm spec_file
# TMP END

else
  echo run server
fi
