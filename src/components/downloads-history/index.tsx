import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDownloadHistory, updateDownloadHistory } from "../../store/actions";
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
    }, []);

    return (
        <>
            {downloadHistory.map((download) => (
                <Card key={download.id} download={download} />
            ))}
        </>
    );
};

export default DownloadHistory;
