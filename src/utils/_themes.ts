import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#0a1929",
            paper: "#021e3c",
        },
        secondary: {
            main: "#ffd648",
            dark: "#ffd648",
        },
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

export const themes = {
    dark: darkTheme,
    light: lightTheme,
};

export const themeManager = (theme: "dark" | "light") => themes[theme];
