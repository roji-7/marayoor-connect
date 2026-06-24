import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Image as ImageIcon,
  FileText,
  CalendarDays,
  Newspaper,
  FilePlus,
  Palette,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/hero", label: "Hero", icon: ImageIcon },
  { to: "/admin/content", label: "Content", icon: FileText },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/news", label: "News", icon: Newspaper },
  { to: "/admin/pages", label: "Pages", icon: FilePlus },
  { to: "/admin/theme", label: "Theme", icon: Palette },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout() {
  const { signOut, user } = useAuth();
  const nav = useNavigate();
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden w-64 flex-col border-r border-border bg-card p-4 md:flex">
        <div className="mb-6 px-2">
          <div className="font-display text-xl text-tvk-gold">TVK Admin</div>
          <div className="truncate text-xs text-muted-foreground">{user?.email}</div>
        </div>
        <nav className="flex-1 space-y-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </NavLink>
          ))}
        </nav>
        <Button
          variant="outline"
          className="mt-4 w-full"
          onClick={async () => {
            await signOut();
            nav("/admin/login");
          }}
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed inset-x-0 top-0 z-40 border-b border-border bg-card">
        <div className="flex items-center gap-2 overflow-x-auto p-2">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-md px-3 py-1.5 text-xs ${
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`
              }
            >
              {it.label}
            </NavLink>
          ))}
        </div>
      </div>

      <main className="flex-1 p-4 pt-20 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
