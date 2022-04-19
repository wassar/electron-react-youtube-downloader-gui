import { SyntheticEvent, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import {
    HomeOutlined as HomeIcon,
    AddBoxOutlined as NewDownloadIcon,
    SettingsOutlined as SettingsIcon,
} from "@mui/icons-material";

import { TabPanel, DownloadHistory, Settings } from "..";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChnage = (e: SyntheticEvent, tabId: number) => {
        setCurrentTab(tabId);
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
                    <Tab icon={<NewDownloadIcon />} aria-label="new download" />
                    <Tab icon={<SettingsIcon />} aria-label="settings" />
                </Tabs>
            </Box>
            <TabPanel index={0} currentTab={currentTab}>
                <DownloadHistory />
            </TabPanel>
            <TabPanel index={1} currentTab={currentTab}>
                NEW DOWNLOAD
            </TabPanel>
            <TabPanel index={2} currentTab={currentTab}>
                <Settings />
            </TabPanel>
        </Box>
    );
};

export default HomeScreen;
