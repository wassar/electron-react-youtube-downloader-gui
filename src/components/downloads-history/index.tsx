import { useSelector } from "react-redux";

interface DownloadHistoryProps {}

const DownloadHistory: React.FC<DownloadHistoryProps> = () => {
    const { downloadHistory } = useSelector((store: RootState) => store);

    return (
        <>
            APP HOME
            {downloadHistory.map((download) => (
                <>{download.title}</>
            ))}
        </>
    );
};

export default DownloadHistory;
