from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException
from typing import Optional
from fastapi import FastAPI

from fastapi.responses import JSONResponse
import cv2
import numpy as np
import sys

app = FastAPI()

@app.post("/uploadfile")
async def upload_files(file: UploadFile = File(...)):
    # アップロードされたファイルの情報を出力
    file_info = {
        "filename": file.filename,
        "content_type": file.content_type,
    }
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        sys.exit('Can not read image')

    # 指定した画像(path)の物体を検出し、外接矩形の画像を出力します
    # グレースケール画像へ変換
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 2値化
    retval, bw = cv2.threshold(gray, 50, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    # 輪郭を抽出
    #   contours : [領域][Point No][0][x=0, y=1]
    #   cv2.CHAIN_APPROX_NONE: 中間点も保持する
    #   cv2.CHAIN_APPROX_SIMPLE: 中間点は保持しない
    contours, hierarchy = cv2.findContours(bw, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    max_area = 0
    max_contour = 0

    # 各輪郭に対する処理
    for contour in contours :

        # 輪郭の領域を計算
        area = cv2.contourArea(contour)

        # ノイズ（小さすぎる領域）と全体の輪郭（大きすぎる領域）を除外
        if area < 1e2 or 1e5 < area:
            continue


        if max_area < area:
            max_area=area
            max_contour = contour

        # rect = contour
        # x, y, w, h = cv2.boundingRect(rect)
        # cv2.rectangle(src, (x, y), (x + w, y + h), (0, 0, 255), 2)
        # cv2.imshow("la",src)

    # 外接矩形
    rect = max_contour
    x, y, w, h = cv2.boundingRect(rect)
    #cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2)

    cut = img[y:y+h,x:x+w]

    hsv = cv2.cvtColor(cut,cv2.COLOR_BGR2HSV)
    h = hsv[:,:,0]
    h_flat = h.flatten()
    count = np.bincount(h_flat)
    md = np.argmax(count)


    if 0 <= md <= 15:
        # red
        color = 0
    elif 15<md<=30:
        # orange
        color = 1
    elif 15<md<=30:
        # yellow
        color = 2
    elif 30<md<=45:
        # yellowgreen
        color = 3
    elif 45<md<=75:
        # green
        color = 4
    elif 75<md<=105:
        # skyblue
        color = 5
    elif 105<md<=135:
        # blue
        color = 6
    elif 135<md<=150:
        # purple
        color = 7
    elif 150<md<=165:
        # pink
        color = 8
    elif 165<md<180:
        # red
        color = 0    

    
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