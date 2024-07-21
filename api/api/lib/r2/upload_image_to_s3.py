import os
from dotenv import load_dotenv
from api.lib.r2.create_s3_client import create_s3_client

load_dotenv()

def upload_image_to_s3(key, body):
    # S3クライアントの作成
    s3 = create_s3_client()

    # 画像をアップロード
    bucket = os.getenv('S3_BUCKET_NAME')
    result = s3.put_object(Bucket=bucket, Key=key, Body=body)
    print(f"Image successfully updated to S3: {key}")

    return result