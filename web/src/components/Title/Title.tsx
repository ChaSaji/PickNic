type PropsType = {
  label: string;
};

const Title = (props: PropsType) => {
  return <h1>{props.label}</h1>;
};

export default Title;
