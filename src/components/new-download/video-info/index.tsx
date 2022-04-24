import NewDownloadHeader from "./_header";
import NewDownloadBody from "./_downloads-list";
import Error from "./_error";

interface VideoInfoProps {
    vidInfo: downloadInfoResponse;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ vidInfo }) => {
    return (
        <>
            {vidInfo.error ? (
                <Error error={vidInfo.error} />
            ) : (
                <>
                    <NewDownloadHeader vidInfo={vidInfo} />
                    <NewDownloadBody formats={vidInfo.formats!} />
                </>
            )}
        </>
    );
};

export default VideoInfo;
