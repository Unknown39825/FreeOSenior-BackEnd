import React, { createContext, useState, useContext, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
    // Get the theme preference from localStorage or default to light theme
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem("app-theme");
        return savedTheme ? JSON.parse(savedTheme) : true; // true for light theme, false for dark
    };

    const [isLightTheme, setIsLightTheme] = useState(getInitialTheme);

    const toggleTheme = () => {
        setIsLightTheme((prevTheme) => {
            const newTheme = !prevTheme;
            localStorage.setItem("app-theme", JSON.stringify(newTheme)); // Save the updated theme preference
            return newTheme;
        });
    };

    useEffect(() => {
        localStorage.setItem("app-theme", JSON.stringify(isLightTheme)); // Sync theme with localStorage on first load
    }, [isLightTheme]);

    return (
        <ThemeContext.Provider value={{ toggleTheme }}>
            <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
