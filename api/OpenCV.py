from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import HTTPException
import cv2
import numpy as np
from ultralytics import YOLO

app = FastAPI()

@app.post("/uploadfile/")
async def upload_files(file):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    #hsv = cv2.cvtColor(img,cv2.COLOR_BGR2HSV)
    #hsv_arr = np.vstack(hsv)
    #hsv_code = ['{:02}{:02x}{:02x}'.format(*color) for color in hsv_arr]

   # モデル読み込み
    model = YOLO("yolov8x-oiv7.pt")
    results = model(img) 
    boxes = results[0].boxes
    max_area = 0
    for box in boxes:
        #x1,y1,x2,y2 = [int(i) for i in box.xyxy[0]]
        x1,y1,x2,y2 = [int(i) for i in box.xyxy[0]]

        # 面積の領域を計算
        area = (x2-x1)*(y2-y1)

        #area = w * h
        # ノイズ（小さすぎる領域）と全体の輪郭（大きすぎる領域）を除外
        if area < 1e2 :
            continue
        
        print("x1,x2,y1,y2",x1,x2,y1,y2)
        print("area",area)

        if max_area < area:
            max_area = area
            max_x1=x1
            max_y1=y1
            max_x2=x2
            max_y2=y2

    cv2.rectangle(img, (max_x1, max_y1), (max_x2, max_y2), (0, 0, 255), 2)

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