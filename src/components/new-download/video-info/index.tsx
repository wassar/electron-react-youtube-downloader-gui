import NewDownloadHeader from "./_header";
import NewDownloadBody from "./_downloads-list";
import Error from "./_error";

interface VideoInfoProps {
    vidInfo: downloadInfoResponse;
    handleNewDownload: (i: vidFormat, f: mediaFormat, t: mediaType) => void;
}

const VideoInfo: React.FC<VideoInfoProps> = ({
    vidInfo,
    handleNewDownload,
}) => (
    <>
        {vidInfo.error ? (
            <Error error={vidInfo.error} />
        ) : (
            <>
                <NewDownloadHeader vidInfo={vidInfo} />
                <NewDownloadBody
                    handleNewDownload={handleNewDownload}
                    formats={vidInfo.formats!}
                />
            </>
        )}
    </>
);

export default VideoInfo;
