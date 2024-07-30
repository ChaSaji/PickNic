import os
from api.lib.r2.create_s3_client import create_s3_client

async def download_file_from_s3(key):
    s3 = create_s3_client()

    bucket = os.getenv('S3_BUCKET_NAME')
    try:
        s3_response_object = s3.get_object(Bucket=bucket, Key=key)
        return s3_response_object['Body'].read()
    except Exception as e:
        raise ValueError(f"An error occurred while downloading from S3: {str(e)}")