import { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Dialog, Box } from "@mui/material";
import { KeyboardBackspace as CloseIcon } from "@mui/icons-material";

import VideoInfo from "./video-info";
import Loader from "./_loader";

interface NewDownloadDialogProps {
    open: boolean;
    close: () => void;
}

const NewDownloadDialog: React.FC<NewDownloadDialogProps> = ({
    open,
    close,
}) => {
    const [vidInfo, setVidInfo] = useState<downloadInfoResponse>();

    useEffect(() => {
        if (!open) return setVidInfo(undefined);

        window.api.getNewDownloadInfo();
    }, [open]);

    window.api.onNewDownloadInfo((e, response) => {
        if (!open) return;
        setVidInfo(response);
    });

    return (
        <Dialog fullScreen open={open} onClose={close}>
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
            <Box p={0.5} mt={0.0}>
                {vidInfo ? <VideoInfo vidInfo={vidInfo} /> : <Loader />}
            </Box>
        </Dialog>
    );
};

export default NewDownloadDialog;
