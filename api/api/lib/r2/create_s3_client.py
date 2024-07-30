import boto3
import os
from dotenv import load_dotenv

load_dotenv()

def create_s3_client():
    aws_access_key_id = os.getenv('AWS_ACCESS_KEY')
    aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
    endpoint_url=os.getenv('R2_ENDPOINT_URL')
    return boto3.client('s3',
                    region_name='auto',
                    endpoint_url=endpoint_url,
                    aws_access_key_id=aws_access_key_id,
                    aws_secret_access_key=aws_secret_access_key)