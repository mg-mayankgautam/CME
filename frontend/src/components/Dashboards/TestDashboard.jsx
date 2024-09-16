import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import ClerkDash from './ClerkDash';
import RegistrarDash from './RegistrarDash';
import PresidentDash from './PresidentDash';
import AccountantDash from './AccountantDash';
import { Link, useNavigate, useLocation } from 'react-router-dom'

const TestDashboard = () => {

    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    // console.log(auth)
    
    // useEffect(() => {

    //     console.log('auth hai ki nahi',auth)
    //     const checkauthentication = async () => {
    //         try {

    //             const response = await axios.get('http://localhost:4700/refresh');
    //             console.log(response)
    //             // const token = response.data.accessToken;
    //             // // Split the token and taken the second

    //             // const base64Url = token.split(".")[1];

    //             // // Replace "-" with "+"; "_" with "/"
    //             // const base64 = base64Url.replace("-", "+").replace("_", "/");
    //             // const TokenData = JSON.parse(window.atob(base64));
    //             // console.log('Response:', TokenData);

    //             // const Role = TokenData.role
    //             // console.log('brkpnt 1', Role)

    //             // try {
    //             //     if (Role) {
    //             //         console.log(Role, 'brkpnt 2')
    //             //         setAuth(TokenData);//isme role set nahi ho raha
    //             //         console.log(Role, 'brkpnt 3')
    //             //         // console.log(state.prev.pathname)
    //             //         navigate('/dashboard');
    //             //     }
    //             //     else {
    //             //         console.log(Role, 'role not found')
    //             //     }
    //             // } catch (e) {
    //             //     console.log('e', e);
    //             // }

    //         } catch (e) { console.log(e) }
    //     }

    //      if(!auth) checkauthentication();
    // }, [])


    return (

        <div>
            {/* this is clerk dash */}

            {auth.role === 'CLERK' && <ClerkDash />}
            {auth.role === 'REGISTRAR' && <RegistrarDash />}
            {auth.role === 'PRESIDENT' && <PresidentDash/>}
            {auth.role === 'ACCOUNTANT' && <AccountantDash />}
        </div>
    )
}

export default TestDashboard
