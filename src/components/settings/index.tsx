import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    ToggleButton as Button,
    ToggleButtonGroup as ButtonGroup,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Box,
    FormControl,
    FormLabel,
    Typography,
} from "@mui/material";

import { Folder as FolderIcon } from "@mui/icons-material";

import { updateSettings } from "../../store/actions";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    const dispatch = useDispatch();
    const { ui_mode, downloads_path } = useSelector(
        (store: RootState) => store.appSettings
    );

    const handleModeChange = (e: any, newMode: appSettings["ui_mode"]) => {
        dispatch(updateSettings({ ui_mode: newMode || ui_mode }));
    };

    const handleDonwloadsPath = () => {
        console.log("DOWNLOADS PATH CHANGE");
    };
    return (
        <Box width="100%" sx={{ "& label": { mb: 0.5, ml: 0.5 } }}>
            <FormControl fullWidth>
                <FormLabel>
                    <Typography variant="caption">Mode</Typography>
                </FormLabel>
                <ButtonGroup
                    fullWidth
                    exclusive
                    color="primary"
                    value={ui_mode}
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
                <OutlinedInput
                    value={downloads_path}
                    onChange={handleDonwloadsPath}
                    id="downloads-dir-input"
                    disabled
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={handleDonwloadsPath}>
                                <FolderIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Box>
    );
};

export default Settings;
