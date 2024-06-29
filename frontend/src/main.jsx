import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import UserActivity from './components/UserActivity.jsx'
import UpdatePassword from './components/UpdatePassword.jsx'
import './index.css'
import Home from './components/Home.jsx'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'',
        element:<Home/>
      },
       {
        path:'/register',
       element:<Register/>
     },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/user-activity',
        element:<UserActivity/>
      },
      {
        path:"/update-password",
        element:<UpdatePassword/>
      }
    //   {
    //     path:'/user-activity',
    //     element:<UserAction/>
    //   }
    ]
  }]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
