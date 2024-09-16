import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import './Login.css'
import logo from '../../assets/hmcLogoBlue.png';
import { Link, useNavigate, useLocation } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';
// Inside the handleLogin function


const Login = () => {
  // const history = useHistory();

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  // const { auth } = useAuth();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  let { state } = useLocation();

  const handleloginSubmit = async (e) => {
    // e.preventDefault();
    console.log(id, password)

    try {
      //  const response = await axios.post('http://localhost:4700/signup',{ id, password,role:'CLERK' });
      //roles->>> ['CLERK','REGISTRAR']

      const response = await axios.post('http://localhost:4700/login', { id, password });
      const token = response.data.accessToken;
      // Split the token and taken the second

      const base64Url = token.split(".")[1];

      // Replace "-" with "+"; "_" with "/"
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const TokenDataWithoutToken = JSON.parse(window.atob(base64));
      console.log('Response:', TokenDataWithoutToken);

      const Role = TokenDataWithoutToken.role
      console.log('brkpnt 1', Role)
      
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

    } catch (error) {
      console.log('46', e);
    }
  };

  const handlesignupSubmit = async (e) => {
    // e.preventDefault();
    console.log(id, password)

    try {
       const response = await axios.post('http://localhost:4700/signup',{ id, password,role:'PRESIDENT' });
     // roles->>> ['CLERK','REGISTRAR','ACCOUNTANT','PRESIDENT']

    }catch(e){console.log(e)}
  };


  return (

    <div className='Login'>

      <div className='loginFormContainer'>

        <div className='logoLogin'>
          <img src={logo} />
        </div>

        <div className='loginForm'>
          <input
            type="text"
            placeholder="Email ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleloginSubmit}>Log In</button>
            {/* <button onClick={handlesignupSubmit}>Sign up</button> */}

          <div className='signUpLink'>
            Don't have an account? <Link to='/Form'>Sign Up</Link> or Go to <Link to='/'>Home</Link>
          </div>

        </div>
      </div>

      <div className='loginBg'>

      </div>

    </div>
  )
}

export default Login






