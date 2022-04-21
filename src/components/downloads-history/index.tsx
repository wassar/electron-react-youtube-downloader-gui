import { useSelector } from "react-redux";
import Card from "./_download-card";

const DownloadHistory: React.FC = () => {
    const { downloadHistory } = useSelector((store: RootState) => store);

    return (
        <>
            {downloadHistory.map((download) => (
                <Card key={download.id} download={download} />
            ))}
        </>
    );
};

export default DownloadHistory;
