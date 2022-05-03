import { Box, Typography } from "@mui/material";

import { ErrorOutline as ErrorIcon } from "@mui/icons-material";

interface ErrorOverlayProps {
    error: string;
}

const ErrorOverlay: React.FC<ErrorOverlayProps> = ({ error }) => (
    <Box
        sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(0,0,0,.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <ErrorIcon sx={{ mr: 1 }} color="error" />
        <Typography color="error">{error}</Typography>
    </Box>
);

export default ErrorOverlay;
