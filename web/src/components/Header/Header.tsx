const Header = () => {
  const userName = "ユーザー名";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "60px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: 48,
          lineHeight: 1,
          fontWeight: 700,
          color: "#FF914D",
        }}
      >
        PickNic
      </div>
      <div
        style={{
          fontSize: 24,
          lineHeight: 2,
          fontWeight: 500,
        }}
      >
        {userName}
      </div>
    </div>
  );
};

export default Header;
