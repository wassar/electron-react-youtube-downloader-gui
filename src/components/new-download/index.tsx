import { Dialog, Box } from "@mui/material";
import Appbar from "./_appbar";

interface NewDownloadDialogProps {
    open: boolean;
    close: () => void;
}

const NewDownloadDialog: React.FC<NewDownloadDialogProps> = ({
    open,
    close,
}) => {
    return (
        <Dialog fullScreen open={open} onClose={close}>
            <Appbar close={close} />
            <Box>DOWNLOAD PROPS</Box>
        </Dialog>
    );
};

export default NewDownloadDialog;
