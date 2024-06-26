from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException
import cv2
import numpy as np
import sys
app = FastAPI()

@app.post("/uploadfile")
async def upload_files(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    #hsv = cv2.cvtColor(img,cv2.COLOR_BGR2HSV)
    #hsv_arr = np.vstack(hsv)
    #hsv_code = ['{:02}{:02x}{:02x}'.format(*color) for color in hsv_arr]

    # 指定した画像(path)の物体を検出し、外接矩形の画像を出力します
    # グレースケール画像へ変換
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 2値化
    retval, bw = cv2.threshold(gray, 50, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    # 輪郭を抽出
    #   contours : [領域][Point No][0][x=0, y=1]
    #   cv2.CHAIN_APPROX_NONE: 中間点も保持する
    #   cv2.CHAIN_APPROX_SIMPLE: 中間点は保持しない
    contours, hierarchy = cv2.findContours(bw, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)

    # 矩形検出された数（デフォルトで0を指定）
    detect_count = 0

    max_area = 0
    max_i = 0

    # 各輪郭に対する処理
    for i in range(0, len(contours)):

        # 輪郭の領域を計算
        area = cv2.contourArea(contours[i])

        # ノイズ（小さすぎる領域）と全体の輪郭（大きすぎる領域）を除外
        if area < 1e2 or 1e5 < area:
            continue

        if i == 0:
            max_area = area

        if max_area < area:
            max_i = i

    # 外接矩形
    if len(contours[max_i]) > 0:
        rect = contours[max_i]
        x, y, w, h = cv2.boundingRect(rect)
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)


    hsv = cv2.cvtColor(img,cv2.COLOR_BGR2HSV)
    h = hsv[:,:,0]
    h_flat = h.flatten()
    count = np.bincount(h_flat)
    md = np.argmax(count)

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
    # 外接矩形された画像を表示
    #cv2.imshow('output', img)
    #cv2.waitKey(0)

    # 終了処理
    #cv2.destroyAllWindows()

@app.get("/")
async def root():
    return {"message": "Hello World"}