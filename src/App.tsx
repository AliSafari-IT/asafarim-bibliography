import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ConsentProvider, ConsentBanner, ConsentModal, useConsent } from '@asafarim/react-privacy-consent';
import { globalConsentConfig } from './config/consentConfig';
import '@asafarim/react-privacy-consent/styles.css';
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import "./App.css";
import Navbar from "./layout/Navbar";
import BookForm from "./components/BookForm";
import AppInfo from "./components/AppInfo";
import "./components/AppInfo.css";
import TestComponent from "./layout/DDMenuTest";
import ThemeDebug from "./components/ThemeDebug";
import {ThemeDemo} from "./components/ThemeDemo";
import PrivacyConsentDemo from "./components/PrivacyConsentDemo";
import MarkdownUtils from "./components/MarkdownUtils";

// Wrapper component to connect ConsentModal to consent context
function ConsentModalWrapper() {
  const { isPreferencesVisible, hidePreferences } = useConsent();
  
  return (
    <ConsentModal 
      isOpen={isPreferencesVisible}
      onClose={hidePreferences}
    />
  );
}

function App() {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  return (
    <ConsentProvider config={globalConsentConfig}>
      <div className="app-container">
        <ThemeDebug />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <div className="bibliography-container">
                  <div className="book-list-container">
                    <BookList onSelectBook={setSelectedBookId} />
                  </div>
                  <div className="book-details-container">
                    {selectedBookId ? (
                      <BookDetails bookId={selectedBookId} />
                    ) : (
                      <div className="empty-state">
                        <h2>Select a book to view details</h2>
                        <p>Click on any book from the list to view its details</p>
                      </div>
                    )}
                  </div>
                  <div className="app-info-wrapper">
                    <AppInfo />
                  </div>
                </div>
              }
            />
            <Route path="/add" element={<BookForm />} />
            <Route path="/edit/:id" element={<BookForm />} />
            <Route path="/info" element={<AppInfo />} />
            <Route path="/dd" element={<TestComponent />} />
            <Route path="/react-themes/demo" element={<ThemeDemo />} />
            <Route path="/react-privacy-consent/demo" element={<PrivacyConsentDemo />} />
            <Route
              path="/markdown-utils/demo"
              element={<MarkdownUtils />}
            />

            {/* Catch-all route for any unmatched paths */}
            {/* Catch-all route for 404 Not Found */}
            <Route
              path="*"
              element={
                <div className="not-found">
                  <h2>Page Not Found</h2>
                  <p>The page you are looking for does not exist.</p>
                </div>
              }
            />
          </Routes>
        </main>
        <footer className="app-footer">
          <p> {new Date().getFullYear()} ASafariM Bibliography</p>
        </footer>
      </div>
      {/* Global consent components */}
      <ConsentBanner />
      <ConsentModalWrapper />
    </ConsentProvider>
  );
}

export default App;
