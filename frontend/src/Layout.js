import React, { useEffect } from 'react'
import { Outlet, useLocation,useNavigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import axios from 'axios';



const Layout = () => {
  axios.defaults.withCredentials = true
  // const { auth } = useAuth();

  // useEffect(() => {
  //   console.log(auth);
  // }, [auth])

  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  // console.log(auth)
  
  useEffect(() => {

      // console.log('auth hai ki nahi',auth)
      const checkauthentication = async () => {
          try {

              const response = await axios.get('http://localhost:4700/refresh',);
              // console.log(response)
               const token = response.data.accessToken;
              // // Split the token and taken the second

               const base64Url = token.split(".")[1];

              // // Replace "-" with "+"; "_" with "/"
              const base64 = base64Url.replace("-", "+").replace("_", "/");

               const TokenDataWithoutToken = JSON.parse(window.atob(base64));
             console.log('Response:', TokenDataWithoutToken);

             const Role = TokenDataWithoutToken.role

             const TokenData = {username: TokenDataWithoutToken.username, role: TokenDataWithoutToken.role,RawToken:token }

             try {
              if (Role) {
                console.log(Role, 'brkpnt 2')
                setAuth(TokenData);//isme role set nahi ho raha
                console.log(Role, 'brkpnt 3')
                // console.log(state.prev.pathname)
                navigate('/dashboard');
              }
              else {
                console.log(Role, 'role not found')
              }
            } catch (e) {
              console.log('e', e);
            }

          } catch (e) { console.log(e) }
      }

       if(!auth.role) checkauthentication();
  }, [])


  return (
    <div>
      <Outlet />

    </div>
  )
}

export default Layout
