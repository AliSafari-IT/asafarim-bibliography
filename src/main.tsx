import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import App from "./App.tsx";
import {
  ConsentProvider,
  ConsentBanner,
  ConsentModal,
} from "@asafarim/react-privacy-consent";
import { globalConsentConfig } from "./config/consentConfig";
import { AuthProvider } from "./contexts/AuthContext";

import "./index.css";
import "./styles/theme-components.css";
import { ThemeProvider } from "@asafarim/react-themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider
      defaultMode="light"
      persistMode={true}
    >
      <Provider store={store}>
        <AuthProvider>
          <ConsentProvider config={globalConsentConfig}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
            <ConsentBanner />
            <ConsentModal isOpen={false} onClose={() => {}} />
          </ConsentProvider>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
