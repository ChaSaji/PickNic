import { ReactNode } from "react";
import Title from "../Title/Title";

type PropsType = {
  children: ReactNode;
  titleLabel: string;
};

const PageTemplate = (props: PropsType) => {
  return (
    <div style={{ width: "100%" }}>
      <Title label={props.titleLabel} />
      {props.children}
    </div>
  );
};

export default PageTemplate;
