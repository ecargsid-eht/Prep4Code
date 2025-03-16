import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import { endpoints } from '../../endpoints'
import { axiosInstance } from '../../api/axiosInstance';
import { useCookies } from 'react-cookie';
import UserContext from '../../ctx/userContext';
import { toast } from 'react-toastify';

function Registerpage() {
    const [, setCookie] = useCookies(['token']);
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const username = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    async function handleRegister(){
        const userData = {username:username.current.value, name: name.current.value, password:password.current.value};
        try{
            const response = await axiosInstance.post('/auth/register',userData);
            if(response)
            setCookie('token',response.data.token);
            setUserData(() => response.data.user)
            navigate(endpoints.home)
            toast("New account has been created.");
        }
        catch(err){
            if(err.response.status === 400){
                toast("The username already exists.");
            }
            else{
                toast("Some error occured. Please try again.");
            }
        }
    }

    return (
        <div className="mx-auto col-lg-5 col-md-7">
            <div className="card shadow rounded-3 border border-2 border-black ">
                <div className="card-header">
                    <p className="fs-4 fw-bold m-0">Let's get you in!</p>
                </div>
                <div className="card-body">
                    <div className=" mb-3">
                        <div className="form-floating">
                            <input ref={name} type="text" className="form-control form-control-sm outline-0" placeholder='Enter your username' id="floatingInputGrid" />
                            <label htmlFor="floatingInputGrid">Enter your name</label>
                        </div>
                    </div>
                    <div className=" mb-3">
                        <div className="form-floating">
                            <input ref={username} type="text" className="form-control form-control-sm outline-0" placeholder='Enter your username' id="floatingInputGrid" />
                            <label htmlFor="floatingInputGrid">Enter your username</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating">
                            <input ref={password} type="password" className="form-control form-control-sm outline-0" placeholder='Enter your password' id="floatingInputGrid" />
                            <label htmlFor="floatingInputGrid">Enter new password</label>
                        </div>
                    </div>
                    <div className="mb-3 d-flex align-items-center justify-content-between">
                        <p className='m-0 small'>
                            Or,
                            <Link to={endpoints.login} className=' text-decoration-none mx-1 py-1 rounded-2 shadow-sm' style={{ fontFamily: 'monospace', backgroundColor: '#ddd' }}> login directly </Link>
                            if you're an old user.
                        </p>
                        <button onClick={handleRegister} className="btn rounded-0 btn-outline-dark border border-4 border-black fs-4 py-1 px-4 float-end fw-bold">REGISTER</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registerpage