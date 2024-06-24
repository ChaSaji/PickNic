from fastapi import APIRouter, UploadFile, File
from ...lib.akaze import akaze

router=APIRouter()

#テンプレートどうやってもってくる？ランキングは？
@router.post("/events/{event_id}/uploadfile/")
async def upload_files(file1,file2):
#async def upload_files(file1: UploadFile = File(...),file2: UploadFile = File(...)):
    contents = await file1.read()
    original = await file2.read()
    ret = akaze(contents,original)
    return {"return":str(ret)}

