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
            alignItems: "center",
            width: "100%",
            //height: "100%",
            flexWrap: "wrap",
            p: 2,
            mt: 4,
        }}
    >
        <Box>
            <ErrorIcon sx={{ fontSize: "4rem" }} color="error" />
        </Box>
        <Typography align="center">{error}</Typography>
    </Box>
);

export default DownloadError;
