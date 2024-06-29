import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [usernmame,setUsername]=useState("")
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [fullname,setFullname]=useState("");
    const navigate = useNavigate()
    function postData(user) {
        
        fetch("http://localhost:8000/api/v1/users/register", {
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
        })
            .then((response) => {
                return response.json();
            })
            .then((data)=>{
                if(data?.accessToken!==undefined){
                    console.log(data.accessToken)
                    localStorage.setItem("accessToken",accessToken)
                    navigate('/user-activity',{replace:true})
                }
                else{
                    navigate('/login',{replace:true})
                }
            })
            .catch((error) => {
                console.log("Could not fetch because :", error)
            })
    }
  return (
    <div className='center-box content'>
      <form action="POST">
        Username:<input type="text"  id='username' value={usernmame} onChange={(event)=>{setUsername(event.target?.value)}}/>
        Email:
        <input type="text" id='email' value={email} onChange={(event)=>{
            setEmail(event.target.value)
        }}/>
        Password:
        <input type="password" id='password' value={password} onChange={(event)=>
            {
                setPassword(event.target.value)
            }
        }/>
        Fullname:
        <input type="text" id='fullname' value={fullname} onChange={(event)=>setFullname(event.target.value)}/>
        <button id='submit' onClick={(e)=>{
            e.preventDefault();
            const user = { username: usernmame, email: email, password: password,fullname:fullname }
            postData(user)
        }}> Submit</button>
      </form>
    </div>
  )
}

export default Register
