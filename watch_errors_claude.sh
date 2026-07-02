#!/bin/bash

ERROR_DIR="./app/errors"
mkdir -p "$ERROR_DIR"

echo "🤖 Monitoring $ERROR_DIR for new error logs to send to Claude..."

inotifywait -m "$ERROR_DIR" -e create | while read -r directory action file; do
    if [[ "$file" =~ _errors\.md$ ]]; then
        echo ">> New error detected! Sending $file to Claude..."
        claude prompt < "${directory}${file}"
    fi
done