import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Form from './Form';
import Homepage from './Homepage';


function App() {
 
  return (
    <>
      <Routes>
        
        <Route  path="/" element={<Layout />}>
              
                <Route 
                  index element={<Homepage />} /> 

                <Route path="/Form" element={<Form/>}/>  
  
                {/* <Route path="about" element={<AboutPage/>}/>   
                <Route path="sharerequirements" element={<ShareReq/>}/>   
                <Route path="service" element={<ServicePage/>}/>   
                <Route path="login" element={<LoginPage/>}/>    */}
        
             
        </Route>
      
      </Routes> 
    </>
  );
}

export default App;