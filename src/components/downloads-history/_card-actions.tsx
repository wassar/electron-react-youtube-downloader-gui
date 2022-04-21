import { useState, MouseEvent, FC } from "react";
import { Box, IconButton, Menu } from "@mui/material";
import {
    MoreVert as OptionsIcon,
    DeleteOutline as DeleteIcon,
    OpenInBrowser as VisitVideoIcon,
    FolderOpen as OpenInFolderIcon,
} from "@mui/icons-material";

import { IconMenuItem as ActionMenuItem } from "..";

interface CardActionsProps {}

const CardActions: FC<CardActionsProps> = () => {
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (e: MouseEvent<HTMLElement>) => {
        setAnchor(e.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchor(null);
    };
    const handleAction = (action: string) => {
        console.log("Menu Item Clicked:", action);
        handleMenuClose();
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
            >
                <ActionMenuItem
                    onClick={() => handleAction("OPEN_FOLDER")}
                    text="Open in Folder"
                    Icon={<OpenInFolderIcon />}
                />
                <ActionMenuItem
                    onClick={() => handleAction("VISIT_VIDEO_PAGE")}
                    text="Visit Video Page"
                    Icon={<VisitVideoIcon />}
                />
                <ActionMenuItem
                    onClick={() => handleAction("DELETE_DOWNLOAD")}
                    text="Delete"
                    Icon={<DeleteIcon />}
                />
            </Menu>
        </Box>
    );
};

export default CardActions;
