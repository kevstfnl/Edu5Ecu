
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  BarChart3,
  FileText,
  Home,
  School,
  User,
  Users,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    {
      name: "Tableau de bord",
      path: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Classes",
      path: "/classes",
      icon: <School className="h-5 w-5" />,
    },
    {
      name: "Élèves",
      path: "/eleves",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Signalements",
      path: "/signalements",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      name: "Rapports",
      path: "/rapports",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Statistiques",
      path: "/statistiques",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "bg-sidebar transition-all duration-300 ease-in-out h-screen z-20",
        open ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
          <Link to="/" className="flex items-center">
            <div className="p-1 flex items-center justify-center">
              {open ? (
                <span className="ml-2 text-lg font-bold text-white max-h-8"><img src="/1.svg" className="max-h-11" alt="Logo" /></span>
              ) : (
                <span className="ml-2 text-lg font-bold text-white max-h-8"><img src="/2.svg" className="max-h-9" alt="Logo" /></span>
              )}
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md transition-colors text-sidebar-foreground hover:bg-sidebar-accent",
                    location.pathname === item.path && "sidebar-item-active"
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {open && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div
            className={cn(
              "flex items-center",
              !open && "justify-center"
            )}
          >
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                <User className="h-4 w-4 text-sidebar-foreground" />
              </div>
            </div>
            {open && (
              <div className="ml-3">
                <p className="text-sm font-medium text-sidebar-foreground">
                  M. Dubois
                </p>
                <p className="text-xs text-sidebar-foreground/70">
                  Conseiller Principal
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
