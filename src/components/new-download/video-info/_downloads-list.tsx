import millify from "millify";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow, Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";

import Filter from "./_filter";

interface DownloadsListProps {
    formats: vidFormat[];
    handleNewDownload: (i: vidFormat, f: mediaFormat, t: mediaType) => void;
}

const DownloadsList: React.FC<DownloadsListProps> = ({
    formats,
    handleNewDownload,
}) => {
    const [items, setItems] = useState([] as vidFormat[]);
    const [mediaType, setMediaType] = useState<mediaType>("video");
    const [mediaFormat, setMediaFormat] = useState<mediaFormat>("mp4");

    const downloadSize = (size: string): string => {
        return millify(parseInt(size), {
            units: ["B", "KB", "MB", "GB", "TB"],
            space: true,
        });
    };

    const downloadQuality = (item: vidFormat): string => {
        return mediaType === "audio"
            ? String(item.audioQuality).replace("AUDIO_QUALITY_", "")
            : item.quality;
    };

    useEffect(() => {
        setItems(
            formats
                .filter((item) => {
                    const ptr = new RegExp(
                        `${mediaType}\/${
                            mediaType === "video" ? mediaFormat : "webm"
                        }[^]`
                    );
                    if (
                        item.mimeType &&
                        item.contentLength &&
                        ptr.test(item.mimeType)
                    )
                        return item;
                })
                .sort((a, b): number =>
                    Number(a.contentLength) < Number(b.contentLength)
                        ? 1
                        : Number(a.contentLength) > Number(b.contentLength)
                        ? -1
                        : 0
                )
        );
    }, [formats, mediaType, mediaFormat]);

    return (
        <>
            <Filter
                mediaFormat={mediaFormat}
                mediaType={mediaType}
                setFormat={setMediaFormat}
                setType={setMediaType}
            />
            <Table>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.itag}>
                            <TableCell align="left">
                                {downloadQuality(item)}
                            </TableCell>
                            <TableCell align="center">
                                {downloadSize(item.contentLength)}
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                    onClick={() =>
                                        handleNewDownload(
                                            item,
                                            mediaFormat,
                                            mediaType
                                        )
                                    }
                                    color="primary"
                                >
                                    <DownloadIcon />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default DownloadsList;
