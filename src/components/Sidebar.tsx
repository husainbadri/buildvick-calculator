import { useCallback, useState } from "react";
import { Announcement01, BarChart01, ChevronLeft, ChevronRight, File01, LayoutGrid01, Lock01, LogOut01, Settings01, Users01 } from "@untitledui/icons";
import { Link as AriaLink } from "react-aria-components";
import { cx } from "@/utils/cx";
import logo from "@/assets/logo.png";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";

const mainNavItems = [
  { label: "Dashboard", icon: LayoutGrid01, href: "#/dashboard" },
  { label: "Meta Leads", icon: Users01, href: "#/leads" },
  { label: "Templates", icon: File01, href: "#/campaigns", locked: true },
  { label: "Campaigns", icon: Announcement01, href: "#/audience", locked: true },
  { label: "Analytics", icon: BarChart01, href: "#/analytics", locked: true },
];

const bottomNavItems = [
  { label: "Settings", icon: Settings01, href: "#/settings", locked: true },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const hash = window.location.hash.replace("#", "") || "/leads";
  const activeUrl = hash;

  const handleSignOut = useCallback(() => {
    localStorage.clear();
    window.location.hash = "#/leads";
    window.location.reload();
  }, []);

  return (
    <>
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
                      "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors outline-none relative",
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
                    {item.locked && !collapsed && (
                      <Lock01 className="ml-auto size-3.5 text-brand" />
                    )}
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
                      "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors outline-none relative",
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
                    {item.locked && !collapsed && (
                      <Lock01 className="ml-auto size-3.5 text-brand" />
                    )}
                  </AriaLink>
                </li>
              );
            })}
            <li>
              <button
                onClick={() => setShowSignOutConfirm(true)}
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

      <ModalOverlay isOpen={showSignOutConfirm} onOpenChange={setShowSignOutConfirm}>
        <Modal>
          <Dialog className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-utility-red-50 ring-8 ring-utility-red-50/50 mb-4">
                <LogOut01 className="size-6 text-utility-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-primary">Confirm Sign Out</h3>
              <p className="text-sm text-tertiary mt-2">
                Are you sure you want to log out? Any unsaved changes might be lost.
              </p>
              <div className="flex items-center gap-3 mt-8 w-full">
                <Button
                  className="flex-1"
                  color="secondary"
                  onClick={() => setShowSignOutConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  color="error"
                  onClick={handleSignOut}
                >
                  Yes, Sign out
                </Button>
              </div>
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  );
}
