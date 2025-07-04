import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import App from "./App.tsx";

import "./index.css";
import { ThemeProvider } from "@asafarim/react-themes";
import "@asafarim/react-themes/styles.css";
import { createTheme, lightTheme } from "@asafarim/react-themes";
// Create a custom theme
const customTheme = createTheme(lightTheme, {
  name: 'custom',
  colors: {
    ...lightTheme.colors,
    primary: '#ff6b6b',
    primaryHover: '#ff5252',
    background: '#fdf2f8',
  }
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider defaultMode="auto" persistMode={true} customThemes={{ [customTheme.name]: customTheme }}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
