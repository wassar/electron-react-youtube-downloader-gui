import {
    Box,
    Typography,
    LinearProgress,
    LinearProgressProps,
} from "@mui/material";

interface ProgressBarProps {
    value: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => (
    <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
                variant={value < 100 ? "determinate" : "indeterminate"}
                color={value < 100 ? "inherit" : "secondary"}
                value={value < 100 ? value : undefined}
            />
        </Box>
        {value < 100 && (
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {`${value}%`}
                </Typography>
            </Box>
        )}
    </Box>
);
