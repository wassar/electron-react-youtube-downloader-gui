import { Typography, TypographyProps } from "@mui/material";

export const IconMetadataItem: React.FC<TypographyProps> = ({
    children,
    sx,
    ...props
}) => (
    <Typography
        sx={{
            display: "flex",
            alignItems: "center",
            "&>svg": {
                marginRight: 0.5,
            },
            ...sx,
        }}
        variant="overline"
        {...props}
    >
        {children}
    </Typography>
);
