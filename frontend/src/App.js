import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import Form from './components/Form/Form';
import Homepage from './components/Homepage/Homepage';
import Login from './components/Login/Login';
import ViewStatus from './components/ViewStatus/ViewStatus';
import RegistrarDash from './components/Dashboards/RegistrarDash';
import ClerkDash from './components/Dashboards/ClerkDash';
import TestDash from './components/Dashboards/TestDashboard'
import Payments from './components/Payment'
import RequireAuth from './components/RequireAuth';
import ClerkApprovalPage from './components/Dashboards/ClerkApprovalPage'
import PresidentApprovalPage from './components/Dashboards/PresidentApprovalPage'
import RegistrarApprovalPage from './components/Dashboards/RegistrarApprovalPage'
import './App.css'

function App() {

  return (
    <>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route
            index element={<Homepage />} />

          <Route path="/Form" element={<Form />} />

          <Route path="/Login" element={<Login />} />

          {/* <Route element={<RequireloginAuth/>}> */}
          {/* <Route path="admin" element={<AdminLogin />} /> */}
          {/* </Route> */}
          <Route path="/payments" element={<Payments />} />
          <Route path="/viewregistrationstatus" element={<ViewStatus />} />
          {/* <Route path="/RegistrarDash" element={<RegistrarDash />} /> */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<TestDash />} />
            <Route path="/dashboard/clerk/:_id" element={<ClerkApprovalPage />} />
            <Route path="/dashboard/president/:_id" element={<PresidentApprovalPage />} />
            <Route path="/dashboard/registrar/:_id" element={<RegistrarApprovalPage />} />
          </Route>



        </Route>

      </Routes>
    </>
  );
}

export default App;