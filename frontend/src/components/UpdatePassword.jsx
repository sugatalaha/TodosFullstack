import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate=useNavigate();
    function postData(password){
        const token=localStorage.getItem("accessToken")
        if(token===undefined){
            console.log("Invalid")
            alert("You are not logged in")
            navigate('/login',{replace:true})
            return;
        }
        fetch("http://localhost:8000/api/v1/users/update-password",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'credentials': 'include' // Ensure cookies are sent
            },
            body:JSON.stringify({password:password})
        })
        .then((response)=>{
            console.log(response)
            if(response.status===200){
                navigate('/',{replace:true})
            }
            else{
                alert("User is not logged in")
                navigate('/login',{replace:true})
            }
        })
        .catch((error)=>{
            console.log("Error:",error)
        })
    }
  return (
    <div className='center-box content' >
      <form action="POST">
        Enter new password:
        <input type="password" value={password1} onChange={(e)=>{
            setPassword1(e.target.value)
        }}/>
        Confirm your password:
        <input type="password" value={password2} onChange={(e)=>{
            setPassword2(e.target.value)
        }}/>
        <button onClick={(e)=>{
            e.preventDefault();
            if(password1==="" || password2===""){
                alert("Password fields must not be empty")
            }
            else if(password1 !=="" && password1!==password2){
                alert("Confirmed password must be same as the new password");
                setPassword1("")
                setPassword2("")
            }
            else{
                postData(password1)
            }
        }}>Submit</button>
      </form>
    </div>
  )
}

export default UpdatePassword
