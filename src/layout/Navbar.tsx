import { useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  BookOpenIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import DDMenu, { MenuItem } from "@asafarim/dd-menu";
import { ThemeToggle, useTheme } from "@asafarim/react-themes";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../contexts/AuthContext";
import UserProfile from "../components/UserProfile";
import SignOutButton from "../components/SignOutButton";
import AuthGuard from "../components/AuthGuard";

type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};

const navigation: NavigationItem[] = [
  { name: "Bibliography", href: "/", current: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Bibliography");
  const { theme } = useTheme();
  const { /* isLoggedIn */ } = useAuth(); // Not used but kept for future use

  const handleNavigation = (name: string) => {
    setActiveItem(name);
  };

  const navMenuItems: MenuItem[] = [
    {
      id: "dd-menu",
      label: "DD Menu",
      link: "/dd",
      icon: "🏠",
    },
    {
      id: "theme-demo",
      label: "Theme Demo",
      link: "/react-themes/demo",
      icon: "🎨",
    },
    {
      id: "privacy-consent",
      label: "Privacy Consent",
      link: "/react-privacy-consent/demo",
      icon: "🔒",
    },
    {
      id: "markdown-utils",
      label: "Markdown Utils",
      link: "/markdown-utils/demo",
      icon: "📄",
    },
  ];

  const referencesMenuItems: MenuItem[] = [
    {
      id: "my-references",
      label: "My References",
      link: "/references",
      icon: "📚",
    },
    {
      id: "citation-generator",
      label: "Citation Generator",
      link: "/citations",
      icon: "📝",
    },
  ];

  return (
    <Disclosure
      as="nav"
      className="navbar-themed sticky top-0 z-50 shadow-md"
      style={{
        backgroundColor: "var(--navbar-bg)",
        borderBottom: "1px solid var(--navbar-border)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
      key="navbar"
      aria-label="Main Navigation"
    >
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
                  style={{
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <BookOpenIcon
                    className="h-8 w-8"
                    style={{ color: "var(--primary)" }}
                  />{" "}
                  <span className="ml-2 text-xl font-bold navbar-brand-text truncate max-w-[180px] sm:max-w-none">
                    ASafariM Bibliography{" "}
                    <span
                      className="hidden md:inline"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      (Redux Usage & demos)
                    </span>
                  </span>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 items-center h-full">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.name === activeItem
                            ? "navbar-nav-link active"
                            : "navbar-nav-link",
                          "flex items-center"
                        )}
                        aria-current={
                          item.name === activeItem ? "page" : undefined
                        }
                        onClick={() => handleNavigation(item.name)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <AuthGuard>
                      <DDMenu
                        items={referencesMenuItems}
                        placement="bottom"
                        variant="default"
                        style={{
                          color: "#374151",
                          fontWeight: "500",
                        }}
                        className="dd-menu--default dd-menu--md dd-menu--navbar dd-menu--navbar--md"
                        closeOnClick={true}
                        size="md"
                        theme={theme as any}
                        trigger={
                          <span
                            style={{
                              color: "#374151",
                              fontWeight: "500",
                              cursor: "pointer",
                            }}
                          >
                            Tools
                          </span>
                        }
                      />
                    </AuthGuard>
                    <DDMenu
                      items={navMenuItems}
                      placement="bottom"
                      variant="default"
                      style={{
                        color: "#374151",
                        fontWeight: "500",
                      }}
                      className="dd-menu--default dd-menu--md dd-menu--navbar dd-menu--navbar--md"
                      closeOnClick={true}
                      size="md"
                      theme={theme as any}
                      trigger={
                        <span
                          style={{
                            color: "#374151",
                            fontWeight: "500",
                            cursor: "pointer",
                          }}
                        >
                          Packages
                        </span>
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-2 h-full">
                <AuthGuard
                  fallback={
                    <div className="hidden sm:block">
                      <GoogleLoginButton />
                    </div>
                  }
                >
                  <div className="hidden sm:flex items-center">
                    <UserProfile />
                    <SignOutButton />
                  </div>
                </AuthGuard>

                <AuthGuard
                  fallback={
                    <div className="sm:hidden">
                      <GoogleLoginButton />
                    </div>
                  }
                >
                  <Link
                    to="/add"
                    className="navbar-add-button focus:ring-2 flex items-center justify-center relative group"
                    style={{
                      backgroundColor: "var(--accent-primary)",
                      color: "white",
                      borderRadius: "9999px",
                      padding: "0.5rem",
                      width: "2.5rem",
                      height: "2.5rem",
                      transition: "background-color 0.2s ease",
                    }}
                    onClick={() => handleNavigation("Add Book")}
                    aria-label="Add Book"
                  >
                    <BookOpenIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="absolute -top-1 -right-1">
                      <PlusIcon
                        className="h-4 w-4 bg-accent-primary text-white rounded-full p-0.5 shadow border-2 border-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="sr-only">Add Book</span>
                  </Link>
                </AuthGuard>

                <ThemeToggle />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div
              className="px-2 pb-3 pt-2 rounded-b-lg shadow-lg"
              style={{
                backgroundColor: "var(--dropdown-bg)",
                borderLeft: "1px solid var(--navbar-border)",
                borderRight: "1px solid var(--navbar-border)",
                borderBottom: "1px solid var(--navbar-border)",
              }}
            >
              {/* Main navigation items */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    style={{
                      backgroundColor:
                        item.name === activeItem
                          ? "var(--accent-primary)"
                          : "var(--bg-secondary)",
                      color:
                        item.name === activeItem
                          ? "white"
                          : "var(--text-primary)",
                    }}
                    className="px-4 py-3 rounded-lg text-center font-medium transition-all hover:shadow-md"
                    aria-current={item.name === activeItem ? "page" : undefined}
                    onClick={() => {
                      handleNavigation(item.name);
                      close();
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Tools & References items for mobile */}
              <AuthGuard>
                <div className="pt-2 pb-1">
                  <p
                    className="px-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Tools & References
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2 mb-4">
                  {referencesMenuItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.link || "#"}
                      className="flex items-center px-4 py-3 rounded-lg transition-all"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                      }}
                      onClick={() => close()}
                    >
                      <span className="mr-3 text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </AuthGuard>

              {/* Packages items for mobile */}
              <div className="pt-2 pb-1">
                <p
                  className="px-3 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Packages
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 mb-4">
                {navMenuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.link || "#"}
                    className="flex items-center px-4 py-3 rounded-lg transition-all"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                    }}
                    onClick={() => close()}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Login for mobile */}
              <div
                className="pt-4 pb-2 mt-2"
                style={{ borderTop: "1px solid var(--border-primary)" }}
              >
                <AuthGuard
                  fallback={
                    <GoogleLoginButton className="w-full justify-center py-2" />
                  }
                >
                  <div className="flex items-center justify-between">
                    <UserProfile />
                    <SignOutButton />
                  </div>
                </AuthGuard>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
