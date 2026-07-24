import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'smai-theme';

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    // Storage can throw in private-browsing modes; fall back to the OS setting
    return null;
  }
}

function getInitialTheme(): Theme {
  return (
    readStoredTheme() ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#080b2e' : '#05086e');
  }, [theme]);

  // Keep following the OS until the visitor picks a theme by hand
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (!readStoredTheme()) setTheme(event.matches ? 'dark' : 'light');
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Preference just won't persist across visits
      }
      return next;
    });
  };

  return { theme, toggleTheme };
}

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

export function ThemeToggle({ theme, onToggle, className = '' }: ThemeToggleProps) {
  const label = theme === 'dark' ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      title={label}
      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-[#05086e] transition-colors hover:bg-gray-100 active:bg-gray-200 dark:text-amber-300 dark:hover:bg-white/10 dark:active:bg-white/20 ${className}`}
    >
      {theme === 'dark' ? <Sun size={21} /> : <Moon size={21} />}
    </button>
  );
}
