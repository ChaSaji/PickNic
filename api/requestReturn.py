from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
 
app = FastAPI()

class baseJsonModel(BaseModel):
    name: str
    year: int

# ダミーデータ
jsonDatas = [
    {
        "name":"Yucham",
        "year":24,
    }
]

@app.get('/', response_model=List[baseJsonModel])
async def responseJson():
    return jsonDatas

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host = "0.0.0.0", port=8000)