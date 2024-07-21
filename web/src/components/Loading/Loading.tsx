import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#FF914D"
        ariaLabel="oval-loading"
      />
    </div>
  );
};

export default Loading;
