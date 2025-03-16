import Contest from "../models/ContestModel.js";
import axios from 'axios'

export const fetchAndSaveContests = async () => {
    const platforms = [
        {
            name: "Codeforces",
            url: "https://competeapi.vercel.app/contests/codeforces/",
            processData: (contest) => ({
                title: contest.title,
                platform: "Codeforces",
                startTime: new Date(contest.startTime),
                url: contest.url,
                solutionLink: null, // Set this later if needed
                isPast: new Date(contest.startTime) < new Date(),
            }),
        },
        {
            name: "CodeChef",
            url: "https://competeapi.vercel.app/contests/codechef/",
            processData: (contest) => ({
                title: contest.contest_name,
                platform: "CodeChef",
                startTime: new Date(contest.contest_start_date_iso),
                url: `https://codechef.com/${contest.contest_code}`,
                solutionLink: null, // Set this later if needed
                isPast: new Date(contest.contest_start_date_iso) < new Date(),
            }),
        },
        {
            name: "LeetCode",
            url: "https://competeapi.vercel.app/contests/leetcode/",
            processData: (contest) => ({
                title: contest.title,
                platform: "LeetCode",
                startTime: new Date(contest.startTime * 1000), // Convert seconds to milliseconds
                url: `https://leetcode.com/contest/${contest.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')}`,
                solutionLink: null, // Set this later if needed
                isPast: new Date(contest.startTime * 1000) < new Date(),
            }),
        },
    ];

    for (const platform of platforms) {
        try {
            const response = await axios.get(platform.url);

            // Determine contests based on platform
            let contests;
            if (platform.name === "Codeforces") {
                contests = response.data; // Directly an array
            } else if (platform.name === "CodeChef") {
                contests = [...response.data.future_contests, ...response.data.past_contests]; // Access future contests
            } else if (platform.name === "LeetCode") {
                contests = response.data.data.topTwoContests; // Access top two contests
            }

            // Check if contests is an array
            if (!Array.isArray(contests)) {
                console.error(`Expected an array but got:`, contests);
                continue; // Skip to the next platform
            }

            for (const contest of contests) {
                const contestData = platform.processData(contest);

                // Check if the contest already exists in the database
                const existingContest = await Contest.findOne({
                    title: contestData.title,
                    platform: contestData.platform,
                    startTime: contestData.startTime,
                });

                if (!existingContest) {
                    // Save the contest to the database
                    const newContest = new Contest(contestData);
                    await newContest.save();
                    console.log(`Saved contest: ${contestData.title} from ${platform.name}`);
                } else {
                    console.log(`Contest already exists: ${contestData.title} from ${platform.name}`);
                }
            }
        } catch (error) {
            console.error(`Error fetching contests from ${platform.name}:`, error);
        }
    }
};