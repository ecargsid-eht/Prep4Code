import { Link, useNavigate } from 'react-router';
import { endpoints } from '../endpoints';
import { useContext } from 'react';
import UserContext from '../ctx/userContext';
import { useCookies } from 'react-cookie';


function Navbar() {
    const {userData,setUserData} = useContext(UserContext);
    const navigate = useNavigate();
    const [,,removeCookie] = useCookies(['token'])
    async function handleLogout(){
        setUserData(null);
        removeCookie('token')
        navigate(endpoints.login)
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light m-3 border border-3 shadow rounded-4 border-black mb-5 " style={{ backgroundColor: "#eee" }}>
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="#">TLE</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to={endpoints.home} className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        {
                            userData !== null
                            ?
                                <>
                                    <li className="nav-item">
                                        <Link to={endpoints.bookmarks} className="nav-link">My Bookmarks</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            :
                                <>
                                    <li className="nav-item">
                                        <Link to={endpoints.login} className="nav-link" >Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={endpoints.register} className="nav-link">Register</Link>
                                    </li>
                                </>

                      }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar