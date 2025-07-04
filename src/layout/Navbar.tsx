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
const navigation = [
  { name: "Bibliography", href: "/", current: true },
  { name: "Add Book", href: "/add", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("Bibliography");
  const { mode } = useTheme();
  const handleNavigation = (name: string) => {
    setActiveItem(name);
  };
  const navMenuItems: MenuItem[] = [
    {
      id: "dd-menu",
      label: "DD Menu",
      link: "/dd",
      icon: "🏠",
    },{
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
    }
  ];
  return (
    <Disclosure
      as="nav"
      className="navbar-themed"
      key="navbar"
      aria-label="Main Navigation"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="navbar-mobile-button relative inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <BookOpenIcon className="h-8 w-8 text-indigo-500" />{" "}
                  <span className="ml-2 text-xl font-bold navbar-brand-text">
                    ASafariM Bibliography <span className="text-gray-400">(Redux Usage & demos)</span>
                  </span>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.name === activeItem
                            ? "navbar-nav-link active"
                            : "navbar-nav-link",
                          ""
                        )}
                        aria-current={
                          item.name === activeItem ? "page" : undefined
                        }
                        onClick={() => handleNavigation(item.name)}
                      >
                        {item.name}
                      </Link>
                    ))}
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
                      theme={mode}
                      trigger={
                        <span
                          style={{
                            color: "#374151",
                            fontWeight: "500",
                            cursor: "pointer",
                          }}
                        >
                          Goto Packages ↓
                        </span>
                      }
                    />
                  </div>
                </div>
              </div>{" "}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-2">
                <ThemeToggle />{" "}
                <Link
                  to="/add"
                  className="navbar-add-button focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => handleNavigation("Add Book")}
                >
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.name === activeItem
                      ? "navbar-nav-link active"
                      : "navbar-nav-link",
                    "block"
                  )}
                  aria-current={item.name === activeItem ? "page" : undefined}
                  onClick={() => handleNavigation(item.name)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
