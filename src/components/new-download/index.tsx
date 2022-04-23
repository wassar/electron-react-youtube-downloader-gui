import { useEffect, useState } from "react";
import { Dialog, Box } from "@mui/material";

import Appbar from "./_appbar";
import NewDownloadHeader from "./_header";

interface NewDownloadDialogProps {
    open: boolean;
    close: () => void;
}

const NewDownloadDialog: React.FC<NewDownloadDialogProps> = ({
    open,
    close,
}) => {
    const [vidInfo, setVidInfo] = useState<downloadInfoResponse>();
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) return setVidInfo(undefined);

        window.api.getNewDownloadInfo();
    }, [open]);

    window.api.onNewDownloadInfo((e, response) => {
        if (!open) return;

        if (response.error) {
            setError(response.error);
        } else setVidInfo(response);
    });

    console.log({ vidInfo });

    return (
        <Dialog fullScreen open={open} onClose={close}>
            <Appbar close={close} />
            <Box p={0.5} mt={0.0}>
                {vidInfo && <NewDownloadHeader vidInfo={vidInfo} />}

                {!vidInfo && <h1> LOADINGG</h1>}
            </Box>
        </Dialog>
    );
};

export default NewDownloadDialog;
