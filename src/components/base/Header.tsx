import { LogOut, Moon, Sun } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { useDarkMode } from '@/hooks/useDarkMode';

function Header() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useDarkMode();

  return (
    <header className="flex h-20 items-center justify-end border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center h-10 w-10 rounded-full text-muted-foreground transition-colors duration-200 ease-in-out hover:bg-muted hover:text-foreground"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors duration-200 ease-in-out hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
