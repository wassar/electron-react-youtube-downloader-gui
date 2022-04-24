import { Box, Typography } from "@mui/material";
import { ErrorOutline as ErrorIcon } from "@mui/icons-material";

interface DownloadErrorProps {
    error: string;
}

const DownloadError: React.FC<DownloadErrorProps> = ({ error }) => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            p: 2,
            mt: 4,
        }}
    >
        <ErrorIcon sx={{ fontSize: "4rem", mb: 1 }} color="error" />
        <Typography width="100%" align="center">
            {error}
        </Typography>
    </Box>
);

export default DownloadError;
