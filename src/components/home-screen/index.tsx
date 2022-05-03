import { SyntheticEvent, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import {
    HomeOutlined as HomeIcon,
    AddBoxOutlined as NewDownloadIcon,
    SettingsOutlined as SettingsIcon,
} from "@mui/icons-material";

import { TabPanel, DownloadHistory, Settings, NewDownloadDialog } from "..";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const [dialogOpen, setDialogOpenOpen] = useState(false);

    const handleTabChnage = (e: SyntheticEvent, tabId: number) => {
        tabId !== 1 && setCurrentTab(tabId);
    };

    const handleDialogClose = () => {
        setDialogOpenOpen(false);
    };

    const handleNewDownload = () => {
        setDialogOpenOpen(true);
    };

    return (
        <Box width="100%">
            <Box position="fixed" bottom={0} width="100%">
                <Tabs
                    variant="fullWidth"
                    indicatorColor="secondary"
                    value={currentTab}
                    onChange={handleTabChnage}
                >
                    <Tab icon={<HomeIcon />} aria-label="Home" />
                    <Tab
                        icon={<NewDownloadIcon />}
                        aria-label="new download"
                        onClick={handleNewDownload}
                    />
                    <Tab icon={<SettingsIcon />} aria-label="settings" />
                </Tabs>
            </Box>
            <TabPanel index={0} currentTab={currentTab}>
                <DownloadHistory />
            </TabPanel>
            <TabPanel index={2} currentTab={currentTab}>
                <Settings />
            </TabPanel>
            <NewDownloadDialog open={dialogOpen} close={handleDialogClose} />
        </Box>
    );
};

export default HomeScreen;
