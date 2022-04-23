import { Box, Avatar, Typography, Link } from "@mui/material";
import { VideoThumbnail } from "..";

interface NewDownloadHeaderProps {
    title: string;
    thumbnail: string;
    length: number;
    views: number;
    author: vidAuthor;
}

const NewDownloadHeader: React.FC<NewDownloadHeaderProps> = ({
    title,
    thumbnail,
    length,
    author,
    views,
}) => {
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
                        width: 36,
                        height: 36,
                    }}
                />
                <Box width="calc(100% - 41px)" marginLeft="10px">
                    <Box pr={2}>
                        <Typography gutterBottom variant="body2">
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
                            >
                                {author.name}
                            </Typography>
                        </Link>
                        <Typography variant="caption" color="text.secondary">
                            {`${views} vues • ${/*postedAt*/ ""}`}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default NewDownloadHeader;
