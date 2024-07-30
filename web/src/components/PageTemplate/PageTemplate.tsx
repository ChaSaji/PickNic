import { ReactNode, CSSProperties } from "react";
import Title from "../Title/Title";

type PropsType = {
  children: ReactNode;
  titleLabel: string;
  style?: CSSProperties;
};

const PageTemplate = (props: PropsType) => {
  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        ...props.style,
      }}
    >
      <Title label={props.titleLabel} />
      <div style={{ flex: 1, width: "100%" }}>{props.children}</div>
    </div>
  );
};

export default PageTemplate;
