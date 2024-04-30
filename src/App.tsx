import { StatisticsContextProvider } from "@contexts/StatisticsContext";
import { Content } from "@pages/Content";
import { HeaderPage } from "@pages/HeaderPage";
import { TaskListContextProvider } from "@src/contexts/TaskListContext";
import React from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <StatisticsContextProvider>
      <TaskListContextProvider>
        <BrowserRouter>
          <HeaderPage />
          <Content />
        </BrowserRouter>
      </TaskListContextProvider>
    </StatisticsContextProvider>
  );
}

export default App;
