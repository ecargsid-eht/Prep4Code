import React, { useContext, useState } from 'react';
import UserContext from '../../ctx/userContext';
import Link from '../../assets/link.svg?react';
import CountdownTimer from '../../components/CountdownTimer';

function Homepage() {
  const { userData, contestData, dateFormat, timeFormat, handleBookmarks } = useContext(UserContext);
  const now = new Date();

  // State to manage selected platforms
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  // Function to toggle platform selection
  const togglePlatform = (platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  // Get unique platforms from contestData
  const uniquePlatforms = [...new Set(contestData?.map(contest => contest.platform))];

  // Filter contests based on selected platforms
  const filteredContests = contestData?.filter(contest =>
    (selectedPlatforms.length === 0 || selectedPlatforms.includes(contest.platform)) &&
    (new Date(contest.startTime) > now || new Date(contest.startTime) <= now)
  );

  return (
    <div className="col-lg-11 mx-auto">
      <div className="mb-3">
        <h5>Filter by Platform:</h5>
        <div className="input-group">

          {uniquePlatforms.map(platform => (
            <button
              key={platform}
              className={`btn btn-sm fw-bold ${selectedPlatforms.includes(platform) ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => togglePlatform(platform)}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>
      <div className="table-responsive">
        <h3 className="mt-4">Contests</h3>
        <table className="table table-striped border border-2 border-black shadow">
          <thead className='table-light'>
            <tr className='py-5'>
              <th className='py-3'>Sr. No.</th>
              <th className='py-3'>Contest</th>
              <th className='py-3'>Platform</th>
              <th className='py-3'>Start Date</th>
              <th className='py-3'>Start Time</th>
              <th className='py-3'>Time remaining</th>
              <th className='py-3'>Solution</th>
              <th className='py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Upcoming Contests Section */}
            {filteredContests?.some(contest => new Date(contest.startTime) > now) && (
              <>
                <tr>
                  <td colSpan="8" className="fs-3 fw-bold">Upcoming Contests</td>
                </tr>
                {filteredContests?.filter(contest => new Date(contest.startTime) > now).map((contest, key) => (
                  <tr key={key} className='py-5'>
                    <td className='py-3'>{key + 1}</td>
                    <td className='py-3'><a href={contest.url}>{contest.title}</a></td>
                    <td className='py-3'>{contest.platform}</td>
                    <td className='py-3'>{dateFormat(new Date(contest.startTime))}</td>
                    <td className='py-3'>{timeFormat(new Date(contest.startTime))}</td>
                    <td className='py-3'><CountdownTimer contestStartDate={contest.startTime} /></td>
                    <td className='py-3 text-center'>
                      {contest.solutionLink === null
                        ? "No link yet."
                        : <a href={contest.solutionLink} target='_blank' rel="noopener noreferrer" className='btn shadow-sm text-center m-0 p-0'><Link height={30} width={30} /></a>}
                    </td>
                    <td className='py-3'>
                      <button onClick={() => handleBookmarks(contest._id)} className={`btn ${userData?.bookmarks?.includes(contest._id) ? "bg-success-subtle" : "btn-light"} btn-sm rounded-pill`}>
                        {userData?.bookmarks?.includes(contest._id) ? "Bookmarked" : "Bookmark"}
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}

            {/* Past Contests Section */}
            {filteredContests?.some(contest => new Date(contest.startTime) <= now) && (
              <>
                <tr>
                  <td colSpan="8" className="fs-3 fw-bold">Past Contests</td>
                </tr>
                {filteredContests?.filter(contest => new Date(contest.startTime) <= now).map((contest, key) => (
                  <tr key={key} className='py-5'>
                    <td className='py-3'>{key + 1}</td>
                    <td className='py-3'><a href={contest.url}>{contest.title}</a></td>
                    <td className='py-3'>{contest.platform}</td>
                    <td className='py-3'>{dateFormat(new Date(contest.startTime))}</td>
                    <td className='py-3'>{timeFormat(new Date(contest.startTime))}</td>
                    <td className='py-3'><small>Contest Finished</small></td>
                    <td className='py-3 text-center'>
                      {contest.solutionLink === null
                        ? "No link yet."
                        : <a href={contest.solutionLink} target='_blank' rel="noopener noreferrer" className='btn shadow-sm text-center m-0 p-0'><Link height={30} width={30} /></a>}
                    </td>
                    <td className='py-3'>
                      <button onClick={() => handleBookmarks(contest._id)} className={`btn ${userData?.bookmarks?.includes(contest._id) ? "bg-success-subtle" : "btn-light"} btn-sm rounded-pill`}>
                        {userData?.bookmarks?.includes(contest._id) ? "Bookmarked" : "Bookmark"}
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Homepage;