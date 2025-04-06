import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        const body = document.body;
        if (theme === "dark") {
            body.classList.add("dark-mode");
            body.classList.remove("light-mode");
        } else {
            body.classList.add("ligh-mode");
            body.classList.remove("dark-mode");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            return prevTheme === "light" ? "dark" : "light";
        });
    };

    const values = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.element.isRequired,
};
