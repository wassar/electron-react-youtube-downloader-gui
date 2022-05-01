import { useState, MouseEvent, FC } from "react";
import { Box, IconButton, Menu, Link } from "@mui/material";
import {
    MoreVert as OptionsIcon,
    DeleteOutline as DeleteIcon,
    OpenInBrowser as VisitVideoIcon,
    FolderOpen as OpenInFolderIcon,
    PlayArrow as PlayIcon,
} from "@mui/icons-material";

import { IconMenuItem as ActionMenuItem } from "..";

interface CardActionsProps {
    item: downloadHistory;
    handleActionClick: (item: downloadHistory, action: string) => void;
}

const CardActions: FC<CardActionsProps> = ({ item, handleActionClick }) => {
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (e: MouseEvent<HTMLElement>) => {
        setAnchor(e.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchor(null);
    };

    return (
        <Box>
            <IconButton onClick={handleMenuOpen} color="primary">
                <OptionsIcon />
            </IconButton>
            <Menu
                anchorEl={anchor}
                open={Boolean(anchor)}
                onClose={handleMenuClose}
                sx={{ "& ul": { padding: "0 !important" } }}
            >
                <ActionMenuItem
                    onClick={() => handleActionClick(item, "PLAY_DOWNLOAD")}
                    text="Play"
                    Icon={<PlayIcon />}
                />
                <ActionMenuItem
                    onClick={() => handleActionClick(item, "OPEN_FOLDER")}
                    text="Reveal in folder"
                    Icon={<OpenInFolderIcon />}
                />
                <ActionMenuItem
                    onClick={() => handleActionClick(item, "VISIT_VIDEO_PAGE")}
                    text="Open in browser"
                    Icon={<VisitVideoIcon />}
                />
                <ActionMenuItem
                    onClick={() => handleActionClick(item, "DELETE_DOWNLOAD")}
                    text="Delete"
                    Icon={<DeleteIcon />}
                />
            </Menu>
        </Box>
    );
};

export default CardActions;
