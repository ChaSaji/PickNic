"use client";

import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useParams, useRouter } from "next/navigation";
import { getPhotosFromR2 } from "@/lib/api/event";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";

const EventPicturePage = () => {
  const params = useParams();
  const eventId = params["eventId"] as string;
  const [photos, setPhotos] = useState<Array<{ src: string; alt: string }>>([]);
  const route = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const result = await getPhotosFromR2({ id: eventId });
        result.data && setPhotos(result.data);
        if (!result.success) {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Error fetching data:");
      }
    })();
  }, []);

  return (
    <PageTemplate titleLabel="投稿された写真">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => route.push(`/events/${eventId}`)} label="戻る" />
      </div>
      <div
        id="displayphoto"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          //gridTemplateRows: "repeat(2, 1fr)",
          //alignItems: "center",
          justifyContent: "center",
          gap: "100px",
          width: "100%",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {photos.map((photo, index) => (
          <div
            style={{
              //display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
            key={index}
          >
            {/* <Button label="非表示" />
            <Button label="詳細" /> */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                //alignItems: "center",
                //flexDirection: "column",
              }}
            >
              {photo.src && (
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default EventPicturePage;
