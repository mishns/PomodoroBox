import { Container } from "@pages/Container";
import { Content } from "@pages/Content";
import { HeaderPage } from "@pages/HeaderPage";
import React from "react";

function App() {
  return (
    <Container>
      <HeaderPage />
      <Content />
    </Container>
  );
}

export default App;
