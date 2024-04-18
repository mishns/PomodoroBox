import { Container } from "@pages/Container";
import { Content } from "@pages/Content";
import { HeaderPage } from "@pages/HeaderPage";
import { TaskListContextProvider } from "@src/contexts/TaskListContext";
import React from "react";

function App() {
  return (
    <Container>
      <HeaderPage />
      <TaskListContextProvider>
        <Content />
      </TaskListContextProvider>
    </Container>
  );
}

export default App;
