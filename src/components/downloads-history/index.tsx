import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteDownloadHistoryItem,
    setDownloadHistory,
    updateDownloadHistory,
} from "../../store/actions";
import Card from "./_download-card";

const DownloadHistory: React.FC = () => {
    const dispatch = useDispatch();
    const { downloadHistory } = useSelector((store: RootState) => store);

    useEffect(() => {
        window.api.onDownloadSync((e, id, { percentage }) => {
            dispatch(
                updateDownloadHistory(id, { download_progress: percentage })
            );
        });

        window.api.onHistoryUpdate((e, history) => {
            dispatch(setDownloadHistory(history));
        });

        window.api.onDownloadError((e, id, error) => {
            dispatch(updateDownloadHistory(id, { status: "error", error }));
        });
    }, []);

    const handleActionClick = (item: downloadHistory, action: string) => {
        window.api.handleDownloadAction(action, item);
        if (action === "DELETE_DOWNLOAD")
            dispatch(deleteDownloadHistoryItem(item.id!));
    };

    return (
        <>
            {downloadHistory.map((download) => (
                <Card
                    key={download.id}
                    download={download}
                    handleActionClick={handleActionClick}
                />
            ))}
        </>
    );
};

export default DownloadHistory;
