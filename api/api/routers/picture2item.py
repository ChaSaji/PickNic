from fastapi import APIRouter
from lib.convert_colors import convert

router=APIRouter()

@router.post("/uploadfile/")
async def upload_files(file):
    contents = await file.read()
    ret = convert(contents)
    return {"return":str(ret)}

@router.get("/")
async def color():
    return {"return":str(color)}