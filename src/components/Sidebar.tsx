import { useState } from "react";
import { Announcement01, BarChart01, ChevronLeft, ChevronRight, File01, LayoutGrid01, LogOut01, Settings01, Users01 } from "@untitledui/icons";
import { Link as AriaLink } from "react-aria-components";
import { cx } from "@/utils/cx";
import logo from "@/assets/logo.png";

const mainNavItems = [
  { label: "Dashboard", icon: LayoutGrid01, href: "#/dashboard" },
  { label: "Contacts", icon: Users01, href: "#/leads" },
  { label: "Templates", icon: File01, href: "#/campaigns" },
  { label: "Campaigns", icon: Announcement01, href: "#/audience" },
  { label: "Analytics", icon: BarChart01, href: "#/analytics" },
];

const bottomNavItems = [
  { label: "Settings", icon: Settings01, href: "#/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const hash = window.location.hash.replace("#", "") || "/leads";
  const activeUrl = hash;

  return (
    <aside
      className={cx(
        "hidden lg:flex shrink-0 flex-col bg-primary_alt border-r border-secondary h-screen overflow-hidden transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center border-b border-secondary min-h-[70px] px-4">
        <img
          src={logo}
          alt="BuildVick"
          className={cx(
            "object-contain rounded-lg transition-all duration-300",
            collapsed ? "h-10 w-10" : "h-14 w-auto",
          )}
        />
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-hidden px-2 pt-4">
        <ul className="flex flex-col gap-0.5">
          {mainNavItems.map((item) => {
            const isActive = activeUrl === item.href?.replace("#", "");
            return (
              <li key={item.label}>
                <AriaLink
                  href={item.href}
                  className={cx(
                    "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors outline-none",
                    collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5",
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-secondary hover:bg-primary_hover hover:text-secondary_hover",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    className={cx(
                      "size-[18px] shrink-0",
                      isActive ? "text-primary" : "text-fg-quaternary",
                    )}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </AriaLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-secondary px-2 py-3">
        <ul className="flex flex-col gap-0.5">
          {bottomNavItems.map((item) => {
            const isActive = activeUrl === item.href?.replace("#", "");
            return (
              <li key={item.label}>
                <AriaLink
                  href={item.href}
                  className={cx(
                    "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors outline-none",
                    collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5",
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-secondary hover:bg-primary_hover hover:text-secondary_hover",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <item.icon
                    className={cx(
                      "size-[18px] shrink-0",
                      isActive ? "text-primary" : "text-fg-quaternary",
                    )}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </AriaLink>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.hash = "#/leads";
                window.location.reload();
              }}
              className={cx(
                "flex w-full items-center gap-3 rounded-lg text-sm font-medium text-secondary transition-colors outline-none hover:bg-primary_hover hover:text-secondary_hover",
                collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5",
              )}
            >
              <LogOut01 className="size-[18px] shrink-0 text-fg-quaternary" />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </li>
        </ul>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cx(
            "mt-2 flex w-full items-center gap-3 rounded-lg py-2.5 text-xs font-medium text-fg-quaternary transition-colors outline-none hover:bg-primary_hover hover:text-fg-quaternary_hover",
            collapsed ? "justify-center px-0" : "px-3",
          )}
        >
          {collapsed ? (
            <ChevronRight className="size-4 stroke-[2.5px]" />
          ) : (
            <>
              <ChevronLeft className="size-4 stroke-[2.5px]" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
