import React from "react";

type PropsType = {
  label: string;
  imgSrc: string;
  imgAlt?: string;
};

export const DetailImg = (props: PropsType) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderBottom: "dashed",
        marginTop: 10,
        paddingBottom: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignSelf: "start",
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        {props.label}
      </div>
      <div style={{ display: "flex", paddingLeft: 20 }}>
        <img
          src={props.imgSrc}
          alt={props.imgAlt || props.label}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default DetailImg;
