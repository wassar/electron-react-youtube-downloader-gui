import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, IconButton, Dialog, Box } from "@mui/material";
import { KeyboardBackspace as CloseIcon } from "@mui/icons-material";

import { generateHistoryItem } from "../../utils";

import VideoInfo from "./video-info";
import Loader from "./_loader";
import { appendNewDownload } from "../../store/actions";

interface NewDownloadDialogProps {
    open: boolean;
    close: () => void;
}

const NewDownloadDialog: React.FC<NewDownloadDialogProps> = ({
    open,
    close,
}) => {
    const dispatch = useDispatch();
    const [vidInfo, setVidInfo] = useState<downloadInfoResponse>();
    const { downloads_path } = useSelector(
        (store: RootState) => store.appSettings
    );

    useEffect(() => {
        if (!open) return setVidInfo(undefined);

        window.api.getNewDownloadInfo();

        window.api.onNewDownloadInfo((e, response) => {
            if (!open) return;
            setVidInfo(response);
        });
        //
    }, [open]);

    const handleNewDownload = (
        item: vidFormat,
        format: mediaFormat,
        type: mediaType
    ) => {
        const historyItem: downloadHistory = {
            id: new Date().getTime(),
            ...generateHistoryItem(vidInfo?.videoDetails!, format, type),
        };

        window.api.startNewDownload(item, historyItem, downloads_path);
        dispatch(appendNewDownload(historyItem));
        close();
    };

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
                {vidInfo ? (
                    <VideoInfo
                        handleNewDownload={handleNewDownload}
                        vidInfo={vidInfo}
                    />
                ) : (
                    <Loader />
                )}
            </Box>
        </Dialog>
    );
};

export default NewDownloadDialog;
