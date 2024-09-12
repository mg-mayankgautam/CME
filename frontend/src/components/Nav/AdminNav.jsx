import React from 'react'
import './Nav.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Nav = () => {
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    // const lh= location.hostname

    const signout = async () => {
        console.log('here')
        const logout = await axios.post('http://localhost:4700/logout');
        setAuth({});
        //write signout logic
        //   document.cookie = "username=jwt; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        //   document.cookie = 'COOKIE_NAME=jwt; Max-Age=0; path=/; domain=' + 'localhost:3009';

        // console.log(auth)
    }

    return (

        <div className='Nav'>

            <div className='navMain'>
                CME PORTAL
            </div>

            <div className='navItems'>


                <button onClick={() => { signout() }}>
                    SignOut
                </button>
            </div>
        </div>
    )
}

export default Nav