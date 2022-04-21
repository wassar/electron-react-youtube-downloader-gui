import moment from "moment";
import { useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";

interface VideoThumbnailProps {
    title: string;
    thumbnail: string;
    length: number;
    width: number | string;
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
    title,
    thumbnail,
    length,
    width,
}) => {
    const [vidLength] = useState(
        moment
            .utc(length * 1000)
            .format("HH:mm:ss")
            .replace(/^00:/, "")
    );
    return (
        <Box position="relative">
            <Avatar
                variant="square"
                sx={{ height: "auto", width }}
                alt={title}
                src={thumbnail}
            />
            <Typography
                position="absolute"
                bgcolor="rgba(0,0,0,.8)"
                fontSize=".75rem"
                fontWeight="bold"
                sx={{ bottom: 0, right: 0 }}
                lineHeight={1}
                p={0.5}
                m={0.5}
            >
                {vidLength}
            </Typography>
        </Box>
    );
};
