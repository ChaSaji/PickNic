from fastapi import APIRouter, UploadFile, File
from ...lib.akaze import akaze
from fastapi.responses import JSONResponse
from pathlib import Path
import aiofiles

router=APIRouter()

#テンプレートどうやってもってくる？ランキングは？
@router.post("/events/{event_id}/uploadfile")
async def upload_files(file: UploadFile = File(...)):
    contents = await file.read()
    # Path to the static file2 in the directory
    file2_path = Path("./kuma.jpg")
    
    # Read the content of file2 from the directory
    async with aiofiles.open(file2_path, 'rb') as file2:
        original = await file2.read()

    ret = akaze(contents,original)
    return {"return":str(ret)}


@router.post("/events/{event_id}/uploadfile/sub")
async def upload_files_sub(file1: UploadFile = File(...),file2: UploadFile = File(...)):
    contents = await file1.read()
    original = await file2.read()
    ret = akaze(contents,original)
    return {"return":str(ret)}

