import React from "react";

type PropsType = {
  label: string;
  onClick?: () => void;
  size?: "medium" | "fit";
};

const Button = ({ size = "medium", ...props }: PropsType) => {
  const styleMap = {
    medium: { width: 150 },
    fit: { width: "100%" },
  };

  return (
    <button
      style={{
        backgroundColor: "#FFF2D1",
        borderWidth: 4,
        borderRadius: 10,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        width: styleMap[size].width,
        fontSize: 20,
        fontWeight: 700,
        cursor: "pointer",
      }}
      {...props}
    >
      {props.label}
    </button>
  );
};

export default Button;
