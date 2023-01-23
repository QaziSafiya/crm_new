import { useEffect, useState } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || '');

    const updateTheme = theme => {
        localStorage.setItem('theme', theme);
        setTheme(theme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return [theme, updateTheme];
}