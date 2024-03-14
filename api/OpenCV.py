from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException
from typing import Optional
from fastapi import FastAPI

from fastapi.responses import JSONResponse
from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image


app = FastAPI()

@app.post("/uploadfile")
async def upload_files(file: UploadFile = File(...)):
    # アップロードされたファイルの情報を出力
    file_info = {
        "filename": file.filename,
        "content_type": file.content_type,
    }
    # モデル読み込み
    model = YOLO("yolov8x-oiv7.pt")
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)

    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    src = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        sys.exit('Can not read image')
    
    results = model(img) 
    boxes = results[0].boxes

    h, w, _ = img.shape
    max_area = 0
    max_x1=0
    max_y1=0
    max_x2=3*h
    max_y2=3*w

    for box in boxes:

        x1,y1,x2,y2 = [int(i) for i in box.xyxy[0]]

        # 面積の領域を計算
        area = (x2-x1)*(y2-y1)

        if area < 1e2 or area > 1e5 :
            continue
        

        if max_area < area:
            max_area = area
            max_x1=x1
            max_y1=y1
            max_x2=x2
            max_y2=y2

    cv2.rectangle(img, (max_x1, max_y1), (max_x2, max_y2), (0, 0, 255), 2)
    #cv2.imshow("result",img)

    src = src[max_x1:max_x2,max_y1:max_y2]
    #cv2.imshow("src",src)

    hsv = cv2.cvtColor(src,cv2.COLOR_BGR2HSV)
    #cv2.imshow("hsv",hsv)
    h = hsv[:,:,0]
    h_flat = h.flatten()
    count = np.bincount(h_flat)
    md = np.argmax(count)
    print("md",md)

    if 0 <= md <= 15:
        #red
        color = 0
    elif 15<md<=30:
        #orange
        color = 1
    elif 15<md<=30:
        #yellow
        color = 2
    elif 30<md<=45:
        #yellowgreen
        color = 3
    elif 45<md<=75:
        #green
        color = 4
    elif 75<md<=105:
        #skyblue
        color = 5
    elif 105<md<=135:
        #blue
        color = 6
    elif 135<md<=150:
        #purple
        color = 7
    elif 150<md<=165:
        #pink
        color = 8
    elif 165<md<180:
        #red
        color = 0    

    return {"return":str(color)}

    #if s_mean < 15 and 240 < v_mean:
        # whilte
        #color = 9

    #if v_mean < 20:
        # black
        #color = 10
    print (color)
    return {"return":str(color)}
    #print(file_info)
    #print(file)
    #with open(file.filename, "wb") as f:
        #f.write(file.file.read())
    #return {"filename": file.filename}

    #print(file_info)
    #print(file)
    #return file_info
    
@app.get("/")
async def root():
    return {"message": "Hello World1"}