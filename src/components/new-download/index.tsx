import { useState } from "react";
import { useSelector } from "react-redux";
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
    const { downloadHistory } = useSelector((store: RootState) => store);
    const [thumbnail, setThumbnail] = useState(
        JSON.parse(downloadHistory[0].thumbnails)
    );
    const { title, lengthSeconds, viewCount, author } = downloadHistory[0];

    console.log({ title, thumbnail, lengthSeconds });

    //const use

    return (
        <Dialog fullScreen open={open} onClose={close}>
            <Appbar close={close} />
            <Box p={0.5} mt={0.0}>
                <NewDownloadHeader
                    title={title}
                    thumbnail={thumbnail[4].url}
                    length={lengthSeconds}
                    views={viewCount}
                    author={JSON.parse(author)}
                    //postedAt={""}
                />
            </Box>
        </Dialog>
    );
};

export default NewDownloadDialog;
