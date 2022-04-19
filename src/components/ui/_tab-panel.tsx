import { Box } from "@mui/material";
interface TabPanelProps {
    currentTab: number;
    index: number;
    children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({
    currentTab,
    index,
    children,
    ...props
}) => (
    <div role="tabpanel" hidden={currentTab !== index} {...props}>
        {currentTab === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
);
