"use client"
import Button from "@/components/Button/Button";
import React ,{useState, useEffect} from 'react';
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { Aladin } from 'next/font/google';
import photoData from './test.json';
//import {functionX} from "./funcs.js"

const EventPicturePage = () => {
  //ハンドルをここに
  const [photos, setPhotos] = useState([]); // 写真のURLのリストを保持する状態
  function functionX() {
  // 関数が何かのデータを計算または取得すると仮定
  return "Updated content from functiontext";
  }
  const fetchPhotos = async () => {
    const response = photoData
    console.log(photoData)
    try {
        //const response = await fetch('https://api.example.com/photos'); // あなたのAPIエンドポイント
        const response = photoData
        //const data = await response.json();
        const data=response
        console.log(data)
        setPhotos(data); // 写真のデータを状態にセット
    } catch (error) {
        console.error('Failed to fetch photos:', error);
    }

  };

  const [content, setContent] = useState("Initial content");
  //const [photodata, setPhotodata] = useState("NoChage")
  useEffect(() => {
      const result = functionX();
      setContent(result);  // functionX の結果に基づいてコンテンツを更新
      fetchPhotos()

  }, []);

  const galleryStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4列のグリッドを作成
    gap: '10px', // グリッドアイテム間の間隔
    padding: '10px',
    maxWidth: '100%'
  };

  const itemStyle = {
    display: 'flex',
    flexDirection: 'column', // アイテムを縦に並べる
    alignItems: 'center' // 中央揃え
  };

  const imageStyle = {
    width: '100%', // アイテムコンテナに合わせて幅を100%に設定
    height: 'auto' // アスペクト比を保持
  };
  const itembox = {
    display:"flex",
    gap:10
  };
  const buttonStyle = {
    marginTop: '5px', // 画像とボタンの間にマージンを設定
    width: '45%'
  };

  
  
  return (
  <PageTemplate titleLabel="投稿された写真">
       
    <div id="displayphoto" style={galleryStyle}>
    {photos.map((photo, index) => (
        <div key={index} style={itemStyle}>
        <div style={itembox}>
        <Button label="非表示" /><Button label="詳細" />
        </div>
        <img src={photo.url} alt={photo.title || `Photo ${index + 1}`} style={imageStyle} />
        
        
      </div>
      
      ))}
    </div>
    <p>{content}</p>
    
  </PageTemplate>
  );
};
export default EventPicturePage;