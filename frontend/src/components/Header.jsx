import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Header() {
  const liststyle={
    "marginRight":"60px",
  }
  const navigate=useNavigate()
  function logout(){
    const token = localStorage.getItem('accessToken')
    fetch("http://localhost:8000/api/v1/users/logout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'credentials': 'include' // Ensure cookies are sent
      }
    }
    )
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      if(data.message==="User logged out"){
        localStorage.setItem("accessToken",undefined)
        navigate('/',{replace:true})
      }
    })
  }
  return (
    <>
      <div style={{ listStyle: "none", display: "flex", justifyContent: "space-between" }}>
        <h1>Your personal todo app</h1>
        <ul style={{display:"flex","justifyContent":"space-evenly","listStyle":"none","padding":"12px"}}>
            <li style={liststyle}>
                <Link to={'/'}>Home</Link>
            </li>
            <li style={liststyle}>
                <Link to={'/register'}>Sign up</Link>
            </li>
            <li style={liststyle}>
                <Link to={'/login'}>Login</Link>
            </li>
            <li style={liststyle}>
              <Link to={'/user-activity'}>User dashboard</Link>
            </li>
        </ul>
        <button onClick={logout}>Logout</button>
     </div>
    </>
  )
}

export default Header
