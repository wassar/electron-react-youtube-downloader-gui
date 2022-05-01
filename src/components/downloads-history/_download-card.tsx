import { useState } from "react";
import { Box, Card } from "@mui/material";
import { VideoThumbnail as CardThumbnail } from "..";

import CardActions from "./_card-actions";
import CardBody from "./_card-body";

import { ProgressBar } from "./_progress-bar";
import ErrorOverlay from "./_error-overlay";

interface DownloadCardProps {
    download: downloadHistory;
    handleActionClick: (item: downloadHistory, action: string) => void;
    error?: string;
}

const DownloadCard: React.FC<DownloadCardProps> = ({
    download,
    handleActionClick,
}) => {
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
                position: "relative",
            }}
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingY={0.8}
                paddingX={0.2}
            >
                <Box
                    sx={{
                        borderRadius: 0.5,
                        width: 165 * 0.6,
                    }}
                >
                    <CardThumbnail
                        title={title}
                        length={lengthSeconds}
                        thumbnail={thumbnails[0].url}
                    />
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        ml: 1,
                        overflow: "hidden",
                    }}
                >
                    <CardBody
                        title={title}
                        author={author}
                        views={viewCount}
                        downloadedAt={downloaded_at}
                        format={format}
                        type={type}
                    />
                </Box>
                <CardActions
                    item={download}
                    handleActionClick={handleActionClick}
                />
            </Box>
            {download.download_progress && (
                <ProgressBar value={download.download_progress} />
            )}

            {download.status === "error" && (
                <ErrorOverlay error={download.error!} />
            )}
        </Card>
    );
};

export default DownloadCard;
