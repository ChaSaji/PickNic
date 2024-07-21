import cv2
import numpy as np
from scipy.spatial.distance import cosine
from sklearn.metrics.pairwise import cosine_similarity
from matplotlib import pyplot as plt

#pip install opencv-contrib-python

def pad_with_zeros(matrix):
    rows, cols = matrix.shape
    max_size = max(rows, cols)
    
    # 0で埋められた新しい行列を作成
    padded_matrix = np.zeros((max_size, max_size), dtype=matrix.dtype)
    # 元の行列の値を新しい行列にコピー
    padded_matrix[:rows, :cols] = matrix
    
    return padded_matrix

def verify_trim_coordinates_size(point, image_shape, size):
    x = int(point[0])
    y = int(point[1])
    shape_x = image_shape[1]
    shape_y = image_shape[0]
    x_left = size
    x_right = size
    y_top = size
    y_bottom = size
    if (x - size) < 0:
        x_left = x
    if (x + size) >= shape_x:
        x_right = shape_x - x
    if (y + size) >= shape_y:
        y_top = y
    if (y - size) < 0:
        y_bottom = shape_y - y
    return x_left, x_right, y_top, y_bottom

def compete_color(point, kp1, kp2, img1, img2):
    size = 16
    x1_left, x1_right, y1_top, y1_bottom = verify_trim_coordinates_size(kp1[point.queryIdx].pt, img1.shape, size)
    x2_left, x2_right, y2_top, y2_bottom = verify_trim_coordinates_size(kp2[point.trainIdx].pt, img2.shape, size)
    
    x_left = min(x1_left, x2_left)
    x_right = min(x1_right, x2_right)
    y_top = min(y1_top, y2_top)
    y_bottom = min(y1_bottom, y2_bottom)

    timg1 = img1[int(kp1[point.queryIdx].pt[1] - y_bottom) : int(kp1[point.queryIdx].pt[1] + y_top), int(kp1[point.queryIdx].pt[0] - x_left) : int(kp1[point.queryIdx].pt[0] + x_right)]
    timg2 = img2[int(kp2[point.trainIdx].pt[1] - y_bottom) : int(kp2[point.trainIdx].pt[1] + y_top), int(kp2[point.trainIdx].pt[0] - x_left) : int(kp2[point.trainIdx].pt[0] + x_right)]

    # 平均色の比較を使った（これは相違度）
    avg_color1 = np.mean(timg1, axis=(0, 1))
    avg_color2 = np.mean(timg2, axis=(0, 1))
    diff = np.linalg.norm(np.array(avg_color1) - np.array(avg_color2))

    return diff

def akaze(contents,original):
    nparr = np.frombuffer(original, np.uint8)
    img1 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    nparr = np.frombuffer(contents, np.uint8)
    img2 = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    img1 = cv2.resize(img1, (700, 1000))
    img2 = cv2.resize(img2, (700, 1000))

    # AKAZE検出器の生成
    akaze = cv2.AKAZE_create() 
    # gray1にAKAZEを適用、特徴点を検出
    kp1, des1 = akaze.detectAndCompute(img1,None) 
    # gray2にAKAZEを適用、特徴点を検出
    kp2, des2 = akaze.detectAndCompute(img2,None) 
    # BFMatcherオブジェクトの生成
    bf = cv2.BFMatcher()
    # Match descriptorsを生成
    ratio = 0.8

    matches1 = bf.knnMatch(des1,des2,k=2)
    good1 = []
    for m,n in matches1:
        if m.distance < ratio * n.distance:
            good1.append(m)

    matches2 = bf.knnMatch(des2,des1,k=2)
    good2 = []
    for m,n in matches2:
        if m.distance < ratio * n.distance:
            good2.append(m)   

    # コサイン類似度の計算
    cos_sim = 0
    if len(des1) > 0 and len(des2) > 0:
        # 行が長くなるようにする分岐
        if len(des1) > len(des2):
            cos_sim = cosine_similarity(des2, des1)
        else:
            cos_sim = cosine_similarity(des1, des2)
        cos_sim = pad_with_zeros(cos_sim)
        # 各特徴点の最大値を取得
        max_similarities = np.max(cos_sim, axis=1)
        # 全特徴点の最大値の平均を求める
        average_similarity = np.mean(max_similarities)

    # 色
    total_difference = 0
    num_comparisons = 0
    for point in good1:
        total_difference += compete_color(point, kp1, kp2, img1, img2)
        num_comparisons += 1
    average_difference = total_difference / num_comparisons
    max_color_difference = np.linalg.norm(np.array([255, 255, 255]) - np.array([0, 0, 0]))
    percentage_difference = (average_difference / max_color_difference)
    color_sim = 1 - percentage_difference

    return int(average_similarity * 100 * 0.5) + int(color_sim * 100 * 0.5)