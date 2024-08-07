from fastapi import APIRouter, UploadFile, File
from api.lib.convert_colors import convert

router=APIRouter()

@router.post("/uploadfile")
async def upload_files(file: UploadFile = File(...)):
    contents = await file.read()
    ret = convert(contents)
    return {"return":str(ret)}

