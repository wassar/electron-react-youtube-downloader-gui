import { Box, Skeleton, Typography } from "@mui/material";

export const TableRowSkeleton: React.FC = () => (
    <Box display="flex">
        <Skeleton sx={{ mr: 1 }} width={"80%"} />
        <Skeleton width={"20%"} />
    </Box>
);

export const BodySkeleton: React.FC = () => (
    <Typography sx={{ mt: 4 }} variant="h4" component="div">
        {[...Array(4)].map((v, key) => (
            <TableRowSkeleton key={key} />
        ))}
    </Typography>
);

export const HeaderSkeleton: React.FC = () => (
    <Box width="100%">
        <Skeleton variant="rectangular" width="100%" height={290} />
        <Box display="flex" mt={1}>
            <Skeleton variant="circular" width={36} height={36} />
            <Box sx={{ marginLeft: "10px" }} width="calc(100% - 41px)">
                <Box pt={0.5}>
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
            </Box>
        </Box>
    </Box>
);

const LoadingSkeleton: React.FC = () => (
    <Box p={1}>
        <HeaderSkeleton />
        <BodySkeleton />
    </Box>
);

export default LoadingSkeleton;
