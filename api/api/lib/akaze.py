import sys
import cv2
import numpy as np

#pip install opencv-contrib-python

def akaze(contents,original):
    nparr = np.frombuffer(contents, np.uint8)
    img1 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    nparr = np.frombuffer(original, np.uint8)
    img2 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    img1=cv2.resize(img1, (700, 1000))
    img2=cv2.resize(img2, (700, 1000))

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
    
    # コサイン類似度を計算
    cos_sim = cosine_similarity(des1, des2)
    # 最大類似度を表示
    max_similarity = np.max(cos_sim)
    #print("最大コサイン類似度:", max_similarity)

    # matchesをdescriptorsの似ている順にソートする 
    #matches = sorted(matches, key = lambda x:x.distance)

    # 検出結果を描画する
    #img3 = cv2.drawMatches(img1, kp1, img2, kp2, matches[:10], None, flags = cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)

    #検出結果を描画した画像を出力する
    #cv2.imwrite("result.jpg",img3)
 
    return max_similarity
