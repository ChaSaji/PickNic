"use client";

import React, { useState, useEffect } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { useParams, useRouter } from "next/navigation";
import { getPhotosFromR2 } from "@/lib/api/event";
import { toast } from "react-toastify";
import Button from "@/components/Button/Button";
import Loading from "@/components/Loading/Loading";

const EventPicturePage = () => {
  const params = useParams();
  const eventId = params["eventId"] as string;
  const [photos, setPhotos] = useState<Array<{ src: string; alt: string }>>([]);
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const result = await getPhotosFromR2({ prefix: eventId });
        result.data && setPhotos(result.data);
        if (!result.success) {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Error fetching data:");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const getFileName = (path: string) => {
    const fileName = path.split("/").pop();
    return fileName?.split(".").shift();
  };

  return (
    <PageTemplate
      titleLabel="投稿された写真"
      style={loading ? { marginBottom: 200 } : { marginBottom: 0 }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => route.push(`/events/${eventId}`)}
              label="戻る"
            />
          </div>
          <div
            id="displayphoto"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              justifyContent: "center",
              gap: "20px",
              width: "100%",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {photos.map((photo, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
                key={index}
              >
                {photo.alt && (
                  <div
                    style={{
                      marginBottom: 10,
                      textAlign: "center",
                      maxWidth: "100%",
                      fontWeight: "bold",
                    }}
                  >
                    {getFileName(photo.alt)}
                  </div>
                )}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "auto",
                  }}
                >
                  {photo.src && (
                    <img
                      src={photo.src}
                      alt={getFileName(photo.alt)}
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </PageTemplate>
  );
};

export default EventPicturePage;
