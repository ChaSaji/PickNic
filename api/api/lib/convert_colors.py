import sys
import cv2
import numpy as np

def convert(contents):
    # 指定した画像(path)の物体を検出し、外接矩形の画像を出力します
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    # グレースケール画像へ変換
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img_area=img.shape[0]*img.shape[1]
    # 2値化
    retval, bw = cv2.threshold(gray, 50, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    # 輪郭を抽出
    #   contours : [領域][Point No][0][x=0, y=1]
    #   cv2.CHAIN_APPROX_NONE: 中間点も保持する
    #   cv2.CHAIN_APPROX_SIMPLE: 中間点は保持しない
    contours, hierarchy = cv2.findContours(bw, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)

    contours=list(filter(lambda x: cv2.contourArea(x) < img_area-1000, contours))

    # 矩形検出された数（デフォルトで0を指定）
    detect_count = 0

    max_area = 0
    max_2 = 0
    max_i = 0

    # 各輪郭に対する処理
    for i in range(0, len(contours)):

        # 輪郭の領域を計算
        area = cv2.contourArea(contours[i])

        # ノイズ（小さすぎる領域）と全体の輪郭（大きすぎる領域）を除外
        if area < 1e2:
            continue

        if i == 0:
            max_area = area

        if max_area < area:
            max_2 = max_i
            max_i = i

    #結局最大面積を切り抜き
    #if max_2<=0:
    max_2=max_i

    # 外接矩形
    if len(contours[max_2]) > 0:
        rect = contours[max_2]
        x, y, w, h = cv2.boundingRect(rect)
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 1)
        #cv2.imshow("img2",img)

    cut_img=img[y+1:y+h-1,x+1:x+w-1]
    #cv2.imshow("window1",cut_img)

    x=cut_img.shape[0]//2
    y=cut_img.shape[1]//2
    #x_max=cut_img.shape[0]
    #y_max=cut_img.shape[1]
    #int(x_max)
    #int(y_max)
    cut_img2=cut_img[y-50:y+50,x-50:x+50]

    #cv2.imshow("window",cut_img2)

    hsv = cv2.cvtColor(cut_img2,cv2.COLOR_BGR2HSV)
    #cv2.imshow("hsv",hsv)
    h = hsv[:,:,0]
    h_flat = h.flatten()
    count = np.bincount(h_flat)
    md = np.argmax(count)
    print(md)

    if 0 <= md <= 15:
        #red
        color = 0
    elif 15<md<=20:
        #orange
        color = 1
    elif 20<md<=30:
        #yellow
        color = 2
    elif 30<md<=45:
        #yellowgreen
        color = 3
    elif 45<md<=75:
        #green
        color = 4
    elif 75<md<=100:
        #skyblue
        color = 5
    elif 100<md<=135:
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

    print(color)
    return color