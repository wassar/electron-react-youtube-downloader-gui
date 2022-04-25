export const generateHistoryItem = (
    vidDetails: vidDetails,
    format: mediaFormat,
    type: mediaType,
    status: downloadHistory["status"] = "pending"
): downloadHistory => ({
    videoId: vidDetails.videoId,
    video_url: vidDetails.video_url,
    title: vidDetails.title,
    lengthSeconds: parseInt(vidDetails.lengthSeconds),
    viewCount: parseInt(vidDetails.viewCount),
    author: JSON.stringify(vidDetails.author),
    thumbnails: JSON.stringify(vidDetails.thumbnails),
    channelId: vidDetails.channelId,
    downloaded_at: new Date().getTime(),
    format,
    type,
    status,
});
