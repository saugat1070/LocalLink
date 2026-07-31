#!/bin/bash

FOLDER_NAME=$1

if [ -z "$FOLDER_NAME" ]; then
  echo "Usage: ./generate.sh <folder_name>"
  exit 1
fi

mkdir -p "./src/modules/$FOLDER_NAME"

touch "./src/modules/$FOLDER_NAME/$FOLDER_NAME.controller.ts"
touch "./src/modules/$FOLDER_NAME/$FOLDER_NAME.routes.ts"
touch "./src/modules/$FOLDER_NAME/$FOLDER_NAME.service.ts"
touch "./src/modules/$FOLDER_NAME/$FOLDER_NAME.model.ts"
touch "./src/modules/$FOLDER_NAME/$FOLDER_NAME.validation.ts"
touch "./src/modules/$FOLDER_NAME/index.ts"

echo "Created module: $FOLDER_NAME"