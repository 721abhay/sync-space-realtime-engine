#!/bin/bash

# --- AUTOMATED BACKUP SCRIPT (Row 10) ---
# Usage: ./backup.sh
# Needs: AWS CLI configured

TIMESTAMP=$(date +"%Y%m%d%H%M")
BACKUP_NAME="syncspace_backup_$TIMESTAMP.sql.gz"
S3_BUCKET="s3://syncspace-backups-prod"

echo "🚀 Starting Database Backup..."

# 1. Dump Database from Docker Container
# We execute pg_dump INSIDE the running postgres container
docker exec syncspace_db pg_dump -U admin syncspace_core | gzip > $BACKUP_NAME

if [ -f "$BACKUP_NAME" ]; then
    echo "✅ Backup created locally: $BACKUP_NAME"
    
    # 2. Upload to AWS S3
    echo "☁️  Uploading to $S3_BUCKET..."
    aws s3 cp $BACKUP_NAME $S3_BUCKET
    
    if [ $? -eq 0 ]; then
        echo "✅ Upload Successful!"
        rm $BACKUP_NAME # Cleanup local file
    else 
        echo "❌ Upload Failed. Check AWS Credentials."
    fi
else
    echo "❌ Database Dump Failed. Is Docker running?"
fi
