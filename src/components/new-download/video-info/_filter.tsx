import {
    SelectChangeEvent,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

import {
    downloadAudioFormatList as audioFormatList,
    downloadVideoFormatList as videoFormatList,
    downloadMediaTypes as mediaTypes,
} from "../../../defaults";

interface DownloadsListFilterProps {
    setFormat: (p: any) => void;
    setType: (p: any) => void;
    mediaFormat: mediaFormat;
    mediaType: mediaType;
}

const DownloadsListFilter: React.FC<DownloadsListFilterProps> = ({
    setFormat,
    setType,
    mediaFormat,
    mediaType,
}) => {
    const handleTypeChange = (e: SelectChangeEvent) => {
        setFormat(
            e.target.value === "video" ? videoFormatList[0] : audioFormatList[0]
        );
        setType(e.target.value);
    };

    const handleFormatChange = (e: SelectChangeEvent) => {
        setFormat(e.target.value);
    };

    return (
        <Box mt={1} p={1}>
            <FormControl
                sx={{
                    width: "50%",
                    paddingRight: "5px",
                    boxSizing: "boreder-box",
                }}
            >
                <InputLabel id="select-format-label">Select Type</InputLabel>
                <Select
                    labelId="select-format-label"
                    value={mediaType}
                    onChange={handleTypeChange}
                    label="Select Type"
                >
                    {mediaTypes.map((name) => (
                        <MenuItem
                            sx={{
                                textTransform: "capitalize",
                            }}
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ width: "50%" }}>
                <InputLabel id="select-format-label">Select Format</InputLabel>
                <Select
                    labelId="select-format-label"
                    value={mediaFormat}
                    onChange={handleFormatChange}
                    label="Select Format"
                >
                    {(mediaType === "video"
                        ? videoFormatList
                        : audioFormatList
                    ).map((name) => (
                        <MenuItem key={name} value={name}>
                            {name.toUpperCase()}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default DownloadsListFilter;
