import boto3
import os

def download_image_from_s3(bucket_name, s3_key, save_path, aws_access_key_id, aws_secret_access_key,endpoint_url):
    # S3クライアントの作成
    s3 = boto3.client('s3',
                      endpoint_url=endpoint_url,
                      aws_access_key_id=aws_access_key_id,
                      aws_secret_access_key=aws_secret_access_key)
    
    # 画像をダウンロード
    s3.download_file(bucket_name, s3_key, save_path)
    print(f"Image successfully downloaded from S3: {save_path}")

# AWSアクセスキーとシークレットキー
aws_access_key_id = '/*See file*/'
aws_secret_access_key = '/*See file*/'
endpoint_url='/*See file*/'
# S3バケット名
bucket_name = '/*See file*/'

# S3の画像ファイルのキー（パス）
s3_key = '/*Ask Goto*/'

# 画像を保存するローカルのディレクトリとファイル名
save_directory = './images'
save_filename = 'downloaded_image.jpg'
save_path = os.path.join(save_directory, save_filename)

# ディレクトリが存在しない場合は作成
os.makedirs(save_directory, exist_ok=True)

# 画像をS3からダウンロードして保存
download_image_from_s3(bucket_name, s3_key, save_path, aws_access_key_id, aws_secret_access_key,endpoint_url)
