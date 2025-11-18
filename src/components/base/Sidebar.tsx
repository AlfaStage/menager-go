import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Smartphone,
  Code,
} from 'lucide-react';
import { cn } from '@/utils/cn';

const navItems = [
  { to: '/manager', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/manager/instances', label: 'Instâncias', icon: Smartphone },
  { to: '/manager/api', label: 'API', icon: Code },
];

function Sidebar() {
  const currentYear = new Date().getFullYear();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card text-card-foreground">
      {/* Logo Header */}
      <header className="h-20 flex items-center justify-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary">
          Evolution GO
        </h1>
      </header>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/manager'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            <Icon className="h-5 w-5" />
            <span className="font-semibold">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <footer className="mt-auto p-4 border-t border-border text-center">
        <p className="text-sm font-semibold text-primary">Evolution GO</p>
        <p className="text-xs text-muted-foreground mt-1">
          © {currentYear} All rights reserved.
        </p>
      </footer>
    </aside>
  );
}

export default Sidebar;
