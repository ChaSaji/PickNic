import sys
import cv2
import numpy as np

#pip install opencv-contrib-python

def akaze(contents,original):
    nparr = np.frombuffer(contents, np.uint8)
    img1 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    nparr = np.frombuffer(original, np.uint8)
    img2 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    gray1 = cv2.cvtColor(img1,cv2.COLOR_BGR2GRAY)
    gray2 = cv2.cvtColor(img2,cv2.COLOR_BGR2GRAY)

    # AKAZE検出器の生成
    akaze = cv2.AKAZE_create()
    # gray1にAKAZEを適用、特徴点を検出
    kp1, des1 = akaze.detectAndCompute(gray1,None)
    # gray2にAKAZEを適用、特徴点を検出
    kp2, des2 = akaze.detectAndCompute(gray2,None)

    # BFMatcherオブジェクトの生成
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)

    # Match descriptorsを生成
    matches = bf.match(des1, des2)
    dist = [m.distance for m in matches]
    ret = sum(dist) / len(dist)
    #0が同じ、100が違うなので逆にする
    match_per=100.0-ret
    round(match_per,5)
    #print(match_per)

    # matchesをdescriptorsの似ている順にソートする
    #matches = sorted(matches, key = lambda x:x.distance)

    # 検出結果を描画する
    #img3 = cv2.drawMatches(img1, kp1, img2, kp2, matches[:10], None, flags = cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)

    #検出結果を描画した画像を出力する
    #cv2.imwrite("result.jpg",img3)

    return match_per
