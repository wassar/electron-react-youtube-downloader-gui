import { useMemo, FC, ReactChild } from "react";
import { useMediaQuery, ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { themeManager } from "./utils";

interface themeProps {
    children?: React.ReactNode;
}

const Theme: FC<themeProps> = ({ children }) => {
    const { ui_mode } = useSelector((store: RootState) => store.appSettings);

    const uiMode =
        ui_mode !== "system"
            ? ui_mode
            : useMediaQuery("(prefers-color-scheme: dark)")
            ? "dark"
            : "light";

    console.log({ uiMode });

    const theme = useMemo(() => themeManager(uiMode), [ui_mode, uiMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default Theme;
