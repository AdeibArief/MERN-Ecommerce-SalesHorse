
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  // Get theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Apply theme when it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle between light and black theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "black" : "light");
  };

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      {/* Hidden checkbox controls the state */}
      <input
        type="checkbox"
        className="hidden"
        checked={theme === "black"}
        onChange={toggleTheme}
      />
      
      {/* Sun icon - shows when theme is black (dark mode) */}
      <Sun className="swap-off w-5 h-5" />
      
      {/* Moon icon - shows when theme is light */}
      <Moon className="swap-on w-5 h-5" />
    </label>
  );
};

export default ThemeToggle;