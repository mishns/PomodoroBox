import { Container } from "@pages/Container";
import { Content } from "@pages/Content";
import { HeaderPage } from "@pages/HeaderPage";
import { TaskListContextProvider } from "@src/contexts/TaskListContext";
import React from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <HeaderPage />
        <TaskListContextProvider>
          <Content />
        </TaskListContextProvider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
