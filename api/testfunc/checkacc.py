import boto3

# シークレットキーとアクセスキーを使用してクライアントを設定
s3_client = boto3.client(
    's3',
    endpoint_url='/*See file*/',
    aws_access_key_id='/*See file*/',
    aws_secret_access_key='/*See file*/'
)

# バケット内のオブジェクトにアクセス
response = s3_client.list_objects_v2(Bucket='/*See file*/')
for obj in response.get('Contents', []):
    print(obj['Key'])