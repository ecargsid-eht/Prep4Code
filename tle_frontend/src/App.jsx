import { Route, Routes } from 'react-router'
import './App.css'
import { endpoints } from './endpoints'
import Homepage from './pages/home/Homepage'
import Navbar from './components/Navbar'
import UserContext from './ctx/userContext'
import { useEffect, useState } from 'react'
import { axiosInstance } from './api/axiosInstance'
import Loginpage from './pages/login/Loginpage'
import Registerpage from './pages/register/Registerpage'
import {ToastContainer, toast} from 'react-toastify'
import { useCookies } from 'react-cookie'
import Bookmarkspage from './pages/bookmarks/Bookmarkspage'

function App() {
  const [contestData, setContestData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [cookies,,removeCookie] = useCookies(['token']);

  function dateFormat(date) {
    const day = date.getUTCDate();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    const formattedDate = `${String(day).padStart(2, '0')}/${month}/${year}`;
    return formattedDate
  }
  
  function timeFormat(date) {
    let hours = date.getUTCHours() + 5;
    let minutes = date.getUTCMinutes() + 30;
    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }
    const newformat = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    
    return `${hours}:${formattedMinutes} ${newformat}`;
  }
  async function handleBookmarks(contestId){
    try{
      if(userData !== null || userData !== undefined){
        const response = await axiosInstance.post(`/auth/bookmark/${contestId}`,{},
          {
            headers:{'Authorization':`Authorization ${cookies.token}`}
          }
        )
        if(response.status === 201){
          setUserData(prev => ({...prev, bookmarks:[...prev.bookmarks,contestId]}));
          toast("Contest has been bookmarked.")
        }
        if(response.status === 200){
          setUserData(prev => ({ ...prev, bookmarks: (prev.bookmarks.filter(book => book !== contestId)) }));
          toast("Bookmark removed.");
        }
      }
      else{
        toast("Please login to bookmark")
      }
    }
    catch(err){
      if(err.status === 401){
        toast("Please login to bookmark contests.");
      }
      else{
        toast("Some error occured.");
      }
    }
  }
  useEffect(() => {
    async function loadUser() {
      try {
        const response = await axiosInstance.get('/auth/get-user', { headers: { 'Authorization': `Authorization ${cookies.token}` } });
        
        if (response.status === 200) {
          setUserData(() => response.data.user)
        }
      }
      catch {
        removeCookie('token');
        setUserData(null);
      }

    }
    loadUser();
  },[])

  const value = {contestData,setContestData,userData,setUserData,dateFormat,timeFormat,handleBookmarks}
  useEffect(() => {
    async function getContest(){
      try{
        const response = await axiosInstance.get('/contests');
        setContestData(() => response.data);
      }
      catch(err){
        console.log(err);
      }
    }
    getContest();
  },[userData])
  return (
    <UserContext.Provider value={value}>
    <Navbar />
      <div className="container">
        <Routes>
          <Route path={endpoints.home} element={<Homepage />} />
          <Route path={endpoints.login} element={<Loginpage />} />
          <Route path={endpoints.register} element={<Registerpage />} />
          <Route path={endpoints.bookmarks} element={<Bookmarkspage />} />
        </Routes>
        <ToastContainer />
      </div>
    </UserContext.Provider>
  )
}

export default App
