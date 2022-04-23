import millify from "millify";
import { useMemo } from "react";
import { Box, Avatar, Typography, Link } from "@mui/material";

import { VideoThumbnail } from "..";
import { timeAgo } from "../../utils";

interface NewDownloadHeaderProps {
    vidInfo: downloadInfoResponse;
}

const NewDownloadHeader: React.FC<NewDownloadHeaderProps> = ({ vidInfo }) => {
    const { title, thumbnails, author, lengthSeconds, viewCount, publishDate } =
        vidInfo.videoDetails!;

    const { views, thumbnail, length, publishedDate } = useMemo(
        () => ({
            views: millify(parseInt(viewCount), { precision: 0 }),
            thumbnail: thumbnails[thumbnails.length - 1].url,
            length: parseInt(lengthSeconds),
            publishedDate: timeAgo(new Date(publishDate).getTime()),
        }),
        [vidInfo]
    );

    return (
        <>
            <VideoThumbnail
                title={title}
                thumbnail={thumbnail}
                length={length}
            />
            <Box display="flex" mt={1} p={1}>
                <Avatar
                    variant="circular"
                    src={author.thumbnails![0]!.url}
                    alt={author.name}
                    sx={{
                        width: 50,
                        height: 50,
                    }}
                />
                <Box width="calc(100% - 41px)" marginLeft="10px">
                    <Box pr={2}>
                        <Typography gutterBottom variant="h6">
                            {title}
                        </Typography>
                        <Link
                            target="_blank"
                            underline="none"
                            href={author.channel_url}
                        >
                            <Typography
                                display="block"
                                variant="caption"
                                color="text.secondary"
                                fontWeight={700}
                            >
                                {author.name}
                            </Typography>
                        </Link>
                        <Typography variant="caption" color="text.secondary">
                            {`${views} vues • ${publishedDate}`}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default NewDownloadHeader;
