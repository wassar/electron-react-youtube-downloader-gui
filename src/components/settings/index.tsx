import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    ToggleButton as Button,
    ToggleButtonGroup as ButtonGroup,
    Box,
    FormControl,
    FormLabel,
    Typography,
} from "@mui/material";

import { updateSettings } from "../../store/actions";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    const dispatch = useDispatch();
    const uiMode = useSelector((store: RootState) => store.appSettings.ui_mode);

    const handleModeChange = (e: any, newMode: appSettings["ui_mode"]) => {
        dispatch(updateSettings({ ui_mode: newMode || uiMode }));
    };

    return (
        <Box width="100%">
            <FormControl fullWidth>
                <FormLabel>
                    <Typography variant="caption">Mode</Typography>
                </FormLabel>
                <ButtonGroup
                    fullWidth
                    exclusive
                    color="primary"
                    value={uiMode}
                    onChange={handleModeChange}
                >
                    <Button value="light">Light</Button>
                    <Button value="system">System</Button>
                    <Button value="dark">Dark</Button>
                </ButtonGroup>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 4 }}>
                <FormLabel>
                    <Typography variant="caption">Downloads Folder</Typography>
                </FormLabel>
            </FormControl>
        </Box>
    );
};

export default Settings;
