"use client";
import Button from "@/components/Button/Button";
import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { Aladin } from "next/font/google";
import photoData from "./test.json";
import Image from 'next/image';
//import { View, Image, StyleSheet } from 'react-native';
//import {functionX} from "./funcs.js"

const EventPicturePage = () => {
  //ハンドルをここに
  const [photos, setPhotos] = 
  useState<Array<{
          id: number,
          url: string,
          title: string,
          }>>([]); // 写真のURLのリストを保持する状態
  function functionX() {
    // 関数が何かのデータを計算または取得すると仮定
    return "Updated content from functiontext";
  }
  const fetchPhotos = async () => {
    const response = photoData;
    console.log(photoData);
    try {
      //const response = await fetch('https://api.example.com/photos'); // あなたのAPIエンドポイント
      const response = photoData;
      //const data = await response.json();
      const data = response;
      console.log(data);
      setPhotos(data); // 写真のデータを状態にセット
    } catch (error) {
      console.error("Failed to fetch photos:", error);
    }
  };

  const [content, setContent] = useState("Initial content");
  //const [photodata, setPhotodata] = useState("NoChage")
  useEffect(() => {
    const result = functionX();
    setContent(result); // functionX の結果に基づいてコンテンツを更新
    fetchPhotos();
  }, []);

  return (
    <PageTemplate titleLabel="投稿された写真">

      <div id="displayphoto" 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          //gridTemplateRows: "repeat(2, 1fr)", 
          //alignItems: "center",
          justifyContent: "center",
          gap: "100px",
          width: "100%",
          height: "250%",
        }}
      >
        {photos.map((photo, index) => (
          <div style={{
            //display: "flex",
            flexDirection: "column", 
            alignItems: "center",
            width:"100%" ,
            height:"100%"
            }} key={index} >
            
  
         
            <Button label="非表示" />
            <Button label="詳細" />
            
            <div style={{
              position: "relative",
              width:"100%",
              height:"100%",
              //alignItems: "center",
              //flexDirection: "column", 
            }}>
            <Image
              src={photo.url}
              alt={photo.title || `Photo ${index + 1}`}
              //width="100%"
              
              //layout="responsive"
              layout="fill"
              objectFit="contain" 
              />
              
            </div>
            </div>
      ))}
      </div>
    </PageTemplate>
    
  );
};
export default EventPicturePage;
