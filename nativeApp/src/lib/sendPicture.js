import React from "react";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { API_URL } from "@env";

async function sendImage({
  headers = {},
  endpoint = "uploadfile",
  uri,
  body = {},
}) {
  // 画像URIからBase64エンコードされたデータを取得
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: "base64",
  });

  let data = new FormData();
  data.append("file", {
    uri: `data:image/jpeg;base64,${base64}`,
    name: "image.jpg",
    type: "image/jpeg",
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  // axiosを使用してデータをPOST
  try {
    const res = await axios.post(`${API_URL}/${endpoint}`, data, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("responce data: " + res.data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
export default sendImage;
