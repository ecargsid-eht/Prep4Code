import React, { useContext } from 'react'
import UserContext from '../../ctx/userContext'
import LinkSvg from '../../assets/link.svg?react'
import { Link } from 'react-router';

function Bookmarkspage() {
    const { userData, contestData, dateFormat, timeFormat, handleBookmarks } = useContext(UserContext);
    return (
        <div className="col-lg-10 mx-auto">
            <div className="table-responsive">
                <table className="table table-striped tabled-bordered border border-2 border-black shadow">
                    <thead className='table-light'>
                        <tr className='py-5'>
                            <th className='py-3'>Sr. No.</th>
                            <th className='py-3'>Contest</th>
                            <th className='py-3'>Platform</th>
                            <th className='py-3'>Start Date</th>
                            <th className='py-3'>Start Time</th>
                            <th className='py-3'>Solution</th>
                            <th className='py-3'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contestData?.filter(contest => userData?.bookmarks.includes(contest._id))?.map((contest, key) => (
                                <tr key={key} className='py-5'>
                                    <td className='py-3'>{key + 1}</td>
                                    <td className='py-3'><a href={contest.url}>{contest.title}</a></td>
                                    <td className='py-3'>{contest.platform}</td>
                                    <td className='py-3'>{dateFormat(new Date(contest.startTime))}</td>
                                    <td className='py-3'>{timeFormat(new Date(contest.startTime))}</td>
                                    <td className='py-3 text-center'>
                                        {contest.solutionLink === null
                                            ?
                                            "No link yet."
                                            :
                                            <a href={contest.solutionLink} target='_blank' className='btn shadow-sm text-center m-0 p-0'><LinkSvg height={30} width={30} /></a>}
                                    </td>
                                    <td className='py-3'>
                                        <button onClick={() => handleBookmarks(contest._id)} className={`btn ${userData?.bookmarks?.includes(contest._id) ? "bg-success-subtle" : "btn-light"} btn-sm rounded-pill`}>
                                            {
                                                userData?.bookmarks?.includes(contest._id)
                                                    ?
                                                    "Bookmarked"
                                                    :
                                                    "Bookmark"
                                            }
                                        </button>
                                    </td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Bookmarkspage