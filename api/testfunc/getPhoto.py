import boto3
import os
from dotenv import load_dotenv

# .envファイルを読み込む
load_dotenv()

def download_image_from_s3(bucket_name, s3_key, save_path, aws_access_key_id, aws_secret_access_key,endpoint_url):
    # S3クライアントの作成
    s3 = boto3.client('s3',
                      region_name='auto',
                      endpoint_url=endpoint_url,
                      aws_access_key_id=aws_access_key_id,
                      aws_secret_access_key=aws_secret_access_key)
    
    # 画像をダウンロード
    s3.download_file(bucket_name, s3_key, save_path)
    print(f"Image successfully downloaded from S3: {save_path}")

def debug_print_envs(aws_access_key_id,aws_secret_access_key,endpoint_url,bucket_name):
    print('debug : print values')
    print('debug : ',os.getenv('DATABASE_URL'))
    print('aws_access_key_id : ',aws_access_key_id)
    print('aws_secret_access_key : ',aws_secret_access_key)
    print('endpoint_url : ',endpoint_url)
    print('bucket_name : ',bucket_name)
    

# AWSアクセスキーとシークレットキー
aws_access_key_id = os.getenv('AWS_ACCESS_KEY')
aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')
endpoint_url=os.getenv('R2_ENDPOINT_URL')
# S3バケット名
bucket_name = os.getenv('S3_BUCKET_NAME')

# S3の画像ファイルのキー（パス）
s3_key = '66448766.jpg'

# 画像を保存するローカルのディレクトリとファイル名
save_directory = './testfunc/images/'
save_filename = 'downloaded_image.jpg'
save_path = os.path.join(save_directory, save_filename)

# ディレクトリが存在しない場合は作成
os.makedirs(save_directory, exist_ok=True)

debug_print_envs(aws_access_key_id=aws_access_key_id,aws_secret_access_key=aws_access_key_id,endpoint_url=endpoint_url,bucket_name=bucket_name)

# 画像をS3からダウンロードして保存
download_image_from_s3(bucket_name, s3_key, save_path, aws_access_key_id, aws_secret_access_key,endpoint_url)
