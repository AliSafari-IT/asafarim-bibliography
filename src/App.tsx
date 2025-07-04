import { Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import '@asafarim/react-privacy-consent/styles.css';
import BookList from "./components/BookList";
import BookDetails from "./components/BookDetails";
import "./App.css";
import Layout from "./layout";
import BookForm from "./components/BookForm";
import AppInfo from "./components/AppInfo";
import "./components/AppInfo.css";
import TestComponent from "./layout/DDMenuTest";
import ThemeDebug from "./components/ThemeDebug";
import {ThemeDemo} from "./components/ThemeDemo";
import PrivacyConsentDemo from "./components/PrivacyConsentDemo";
import MarkdownUtils from "./components/MarkdownUtils";
import './styles/responsive.css';
import AuthPage from "./pages/AuthPage";
import ReferencesPage from "./pages/ReferencesPage";
import { useAuth } from "./contexts/AuthContext";

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

// Wrapper component to connect ConsentModal to consent context

function App() {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  
  return (
    <>
      <ThemeDebug />
      <Layout>
        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
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
            <Route 
              path="/add" 
              element={
                <ProtectedRoute>
                  <BookForm />
                </ProtectedRoute>
              } 
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route 
              path="/references" 
              element={
                <ProtectedRoute>
                  <ReferencesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit/:id" 
              element={
                <ProtectedRoute>
                  <BookForm />
                </ProtectedRoute>
              } 
            />
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
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
