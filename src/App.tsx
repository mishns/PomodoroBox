import { SettingsContextProvider } from "@contexts/SettingsContext";
import { StatisticsContextProvider } from "@contexts/StatisticsContext";
import { Content } from "@pages/Content";
import { HeaderPage } from "@pages/HeaderPage";
import { TaskListContextProvider } from "@src/contexts/TaskListContext";
import React from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <StatisticsContextProvider>
      <SettingsContextProvider>
        <TaskListContextProvider>
          <BrowserRouter>
            <HeaderPage />
            <Content />
          </BrowserRouter>
        </TaskListContextProvider>
      </SettingsContextProvider>
    </StatisticsContextProvider>
  );
}

export default App;
