import React from 'react'
import Header from "./Header.jsx"
import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'

function Layout() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
