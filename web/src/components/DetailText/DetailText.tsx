type PropsType = {
  label: string;
  value: string;
};

export const DetailText = (props: PropsType) => {
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
      <div style={{ display: "flex", fontSize: 20, fontWeight: 600 }}>
        {props.label}
      </div>
      <div style={{ display: "flex", paddingLeft: 20 }}>{props.value}</div>
    </div>
  );
};

export default DetailText;
