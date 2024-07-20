import boto3
import os
from dotenv import load_dotenv

load_dotenv()

def upload_image_to_s3(aws_access_key_id, aws_secret_access_key, endpoint_url, bucket_name, contents, user_id, event_id):
    # S3クライアントの作成
    s3 = boto3.client('s3',
                      region_name='auto',
                      endpoint_url=endpoint_url,
                      aws_access_key_id=aws_access_key_id,
                      aws_secret_access_key=aws_secret_access_key)

    file_key = f"{event_id}/user-photos/{user_id}.jpg" # {event_id}/user-photos/{user_id}.png．
    # 画像をアップロード
    s3.put_object(Bucket=bucket_name, Key=file_key, Body=contents)
    print(f"Image successfully updated to S3: {user_id}")

    return file_key