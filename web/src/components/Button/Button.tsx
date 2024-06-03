import React from "react";

type PropsType = {
  label: string;
  onClick: () => void;
};

const Button = (props: PropsType) => {
  return (
    <button
      style={{
        backgroundColor: "#FFF2D1",
        borderWidth: 4,
        borderRadius: 10,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        width: 150,
        fontSize: 20,
        fontWeight: 700,
        cursor: "pointer",
      }}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default Button;
