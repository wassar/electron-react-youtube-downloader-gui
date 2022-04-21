import {
    MenuItem,
    ListItemIcon,
    Typography,
    MenuItemProps,
} from "@mui/material";

interface MenuActionItemProps extends MenuItemProps {
    Icon: React.ReactNode;
    text: string;
}

export const IconMenuItem: React.FC<MenuActionItemProps> = ({
    onClick,
    Icon,
    text,
    sx,
    ...props
}) => (
    <MenuItem
        sx={{
            borderBottom: "1px solid rgba(255,255,255,.1)",
            ...sx,
        }}
        onClick={onClick}
        {...props}
    >
        <ListItemIcon>{Icon}</ListItemIcon>
        <Typography> {text}</Typography>
    </MenuItem>
);
