import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';


const Layout = () => {
  return (
    <div>
       <Outlet />

    </div>
  )
}

export default Layout
