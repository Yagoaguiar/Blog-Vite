const Error404 = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>404 - Página não encontrada</h1>
      <p style={{ textAlign: "center" }}>
        A página que você está buscando não existe
      </p>
    </div>
  );
};

export default Error404;
