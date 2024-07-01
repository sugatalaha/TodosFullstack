import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Login() {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const navigate=useNavigate();
    function postData(user)
    {
        fetch("http://localhost:8000/api/v1/users/login",{
            method: "POST",
            mode: "cors",
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(user), // body data type must match "Content-Type" header
        }
        )
        .then((response)=>{
            if(response.status===200){
                return response.json();
            }
            else if(response.status===400){
                alert("Enter valid password");
            }
            else if(response.status===404){
                alert("User is not registered");
            }
            else{
                alert("Some error occured")
            }
        })
        .then((data)=>{
            if(data!==undefined){
                localStorage.setItem("accessToken",data?.accessToken)
                navigate('/user-activity', { replace: true })
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
  return (
    <div className='center-box content'>
      <form action="POST">
        Username:<input type="text" value={username} onChange={(e)=>{
            setUsername(e.target.value)
        }}/>
        Email:<input type="text" value={email} onChange={(e)=>{
            setEmail(e.target.value)
        }}/>
        Password:
        <input type="password" value={password} onChange={(e)=>
            {
                setPassword(e.target.value)
            }
        }/>
        <button onClick={(e)=>{
            e.preventDefault()
            const user={username:username,email:email,password:password};
            postData(user)
        }
        }>Submit</button>
      </form>
      
    </div>
  )
}

export default Login
