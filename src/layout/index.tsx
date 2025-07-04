import { ReactNode } from "react";
import Navbar from "./Navbar";
import { useTheme } from "@asafarim/react-themes";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // We're not using the theme directly in this component,
  // but we keep the import to make the TypeScript linter happy
  useTheme();

  return (
    <div className="min-h-screen flex flex-col" style={{ 
      backgroundColor: "var(--bg-primary)", 
      color: "var(--text-primary)",
      transition: "background-color 0.3s ease, color 0.3s ease"
    }}>
      <Navbar />
      <main className="flex-grow">
        <div className="responsive-container py-4 sm:py-6 lg:py-8">
          {children}
        </div>
      </main>
      <footer className="py-4 text-center text-sm border-t" style={{
        color: "var(--text-secondary)",
        borderColor: "var(--border-primary)",
        backgroundColor: "var(--bg-footer)"
      }}>
        <div className="responsive-container">
          <p>© {new Date().getFullYear()} ASafariM Bibliography. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
