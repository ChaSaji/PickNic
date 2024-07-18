import AuthGuard from "@/components/AuthGuard/AuthGuard";
import Header from "@/components/Header/Header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div
        style={{
          marginTop: 20,
          marginRight: 30,
          marginLeft: 30,
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 20px)",
        }}
      >
        <Header />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            paddingTop: 20,
            paddingRight: 40,
            paddingLeft: 40,
          }}
        >
          {children}
        </div>
      </div>
    </AuthGuard>
  );
}
