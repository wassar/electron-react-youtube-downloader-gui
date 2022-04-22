import { AppBar, Toolbar, IconButton } from "@mui/material";
import { KeyboardBackspace as CloseIcon } from "@mui/icons-material";

interface AppbarProps {
    close: () => void;
}

const Appbar: React.FC<AppbarProps> = ({ close }) => {
    return (
        <AppBar sx={{ position: "relative" }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={close}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;
