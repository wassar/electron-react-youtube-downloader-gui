import millify from "millify";
import { useState } from "react";
import { Box, Link, Typography } from "@mui/material";
import {
    Visibility as ViewsIcon,
    YouTube as AuthorIcon,
    Download as DownloadIcon,
    MusicNote as AudioIcon,
    OndemandVideo as VideoIcon,
} from "@mui/icons-material";

import { IconMetadataItem as MetaItem } from "..";
import { timeAgo } from "../../utils";

import { Author } from "ytdl-core";

interface DownloadCardBodyProps {
    title: string;
    author: Author;
    views: number;
    downloadedAt: number;
    format: string;
    type: string;
}

const DownloadCardBody: React.FC<DownloadCardBodyProps> = ({
    title,
    author,
    views,
    downloadedAt,
    type,
    format,
}) => {
    const [viewsCount] = useState(millify(views, { precision: 0 }));
    const [downloadDate] = useState(timeAgo(downloadedAt));
    return (
        <>
            <Typography variant="subtitle2" title={title}>
                {title}
            </Typography>
            <Box display="flex" flexWrap="wrap">
                <MetaItem>
                    <AuthorIcon fontSize="small" />
                    <Link
                        underline="none"
                        target="_blank"
                        href={author.channel_url}
                    >
                        {author.name}
                    </Link>
                </MetaItem>
                <MetaItem marginX={1}>
                    {type === "audio" ? (
                        <AudioIcon fontSize="small" />
                    ) : (
                        <VideoIcon fontSize="small" />
                    )}
                    <Typography textTransform="uppercase">
                        <small>{format}</small>
                    </Typography>
                </MetaItem>
                <MetaItem marginX={1}>
                    <ViewsIcon fontSize="small" />
                    <Typography>
                        <small>{viewsCount}</small>
                    </Typography>
                </MetaItem>
                <MetaItem>
                    <DownloadIcon fontSize="small" />
                    <Typography>
                        <small>{downloadDate}</small>
                    </Typography>
                </MetaItem>
            </Box>
        </>
    );
};

export default DownloadCardBody;
