import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NumberOfDisksProvider } from "./context/NumberOfDisksContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <NumberOfDisksProvider>
        <App />
      </NumberOfDisksProvider>
    </ThemeProvider>
  </React.StrictMode>
);
