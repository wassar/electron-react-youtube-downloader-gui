import { useState } from "react";
import { Box, Card } from "@mui/material";
import { VideoThumbnail as CardThumbnail } from "..";
import CardActions from "./_card-actions";
import CardBody from "./_card-body";

interface DownloadCardProps {
    download: downloadHistory;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ download }) => {
    const [thumbnails, setThumbnails] = useState(
        JSON.parse(download.thumbnails)
    );
    const [author, setAuthor] = useState(JSON.parse(download.author));
    const { title, lengthSeconds, viewCount, downloaded_at, format, type } =
        download;

    return (
        <Card
            sx={{
                m: -1,
                p: 0.5,
                mb: 1.5,
            }}
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingY={1.3}
            >
                <CardThumbnail
                    title={title}
                    length={lengthSeconds}
                    thumbnail={thumbnails[0].url}
                    width={165 * 0.6}
                />
                <Box sx={{ flexGrow: 1, ml: 1 }}>
                    <CardBody
                        title={title}
                        author={author}
                        views={viewCount}
                        downloadedAt={downloaded_at}
                        format={format}
                        type={type}
                    />
                </Box>
                <CardActions />
            </Box>
        </Card>
    );
};

export default DownloadCard;
