import Contest from "../models/ContestModel.js";
import axios from 'axios';
const PLAYLIST_IDS = {
    leetcode: 'PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr',
    codeforces: 'PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB',
    codechef: 'PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr',
};

const fetchPlaylistVideos = async (playlistId) => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}&maxResults=50`;
    try {
        const response = await axios.get(url);
        return response.data.items.map(item => ({
            title: item.snippet.title,
            videoId: item.snippet.resourceId.videoId,
        }));
    } catch (error) {
        console.error('Error fetching playlist videos:', error);
        return [];
    }
};

// Function to extract relevant keywords from the contest title
const extractKeywords = (title) => {
    // Split the title into words and filter out short words
    return title.split(' ').filter(word => word.length > 2);
};

// Function to update contests with matching video links
export const updateContestsWithVideos = async () => {
    const allVideos = [
        ...(await fetchPlaylistVideos(PLAYLIST_IDS.leetcode)),
        ...(await fetchPlaylistVideos(PLAYLIST_IDS.codeforces)),
        ...(await fetchPlaylistVideos(PLAYLIST_IDS.codechef)),
    ];

    for (const contest of await Contest.find({ isPast: true })) {
        const keywords = extractKeywords(contest.title);

        // Check if any video title contains any of the keywords
        const matchingVideo = allVideos.find(video =>
            keywords.some(keyword => video.title.includes(keyword))
        );

        if (matchingVideo && !contest.solutionLink) {
            contest.solutionLink = `https://www.youtube.com/watch?v=${matchingVideo.videoId}`;
            await contest.save();
            console.log(`Updated contest: ${contest.title} with video link: ${contest.solutionLink}`);
        } else {
            console.log(`No matching video found for contest: ${contest.title}`);
        }
    }
};
