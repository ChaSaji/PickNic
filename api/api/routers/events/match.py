from fastapi import APIRouter, UploadFile, File
from ..lib.akaze import akaze

router=APIRouter()

#テンプレートどうやってもってくる？ランキングは？
@router.post("/events/uploadfile/")
async def upload_files(file,latitude,longitude):
#async def upload_files(file: UploadFile = File(...)):
    contents = await file.read()
    original = await file.read()
    ret = akaze(contents,original)
    return {"return":str(ret)}

@router.get("/")
async def match():
    return {"return":str(match_per)}