import { Container } from "@pages/Container";
import { Content } from "@pages/Content";
import { Header } from "@pages/Header";
import { Button } from "@ui/Button";
import React from "react";

function App() {
  return (
    <Container>
      <Header />
      <Content>
        <Button>Добавить</Button>
      </Content>
    </Container>
  );
}

export default App;
