import { useMemo, FC, ReactNode } from "react";
import { useMediaQuery, ThemeProvider, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { themeManager } from "./utils";

interface themeProps {
    children?: ReactNode;
}

const Theme: FC<themeProps> = ({ children }) => {
    const { ui_mode } = useSelector((store: RootState) => store.appSettings);
    const systemMode = useMediaQuery("(prefers-color-scheme: dark)")
        ? "dark"
        : "light";

    const theme = useMemo(
        () => themeManager(ui_mode === "system" ? systemMode : ui_mode),
        [ui_mode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default Theme;
