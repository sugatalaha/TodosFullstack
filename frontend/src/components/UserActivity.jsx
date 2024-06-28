import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom"

function UserActivity() {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [todos, setTodos] = useState([]);
    const [desc,setDesc]=useState("");
    const navigate=useNavigate()

    const postData=(desc)=>{
        const token=localStorage.getItem("accessToken")
        if(!token){
            alert("You are not logged in")
            navigate('/login',{replace:true})
            return;
        }
        fetch("http://localhost:8000/api/v1/todos/add-todo",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'credentials': 'include' // Ensure cookies are sent
            },
            body:JSON.stringify({description:desc})
        })
        .then((response)=>{
            if(response.status===200){
                return response.json();
            }
            else if(response===404){
                navigate('/login',{replace:true})
            }
        })
        .then((data)=>{
            if(data.todo){
                let newtodo=todos;
                newtodo.push(data.todo)
                setTodos([...newtodo])
            }
        })
        .catch(error=>console.log(error))
    }
    const updateTodo=(todoId)=>{
        const token=localStorage.getItem("accessToken")
        if(!token){
            alert("You are not logged in")
            navigate("/login",{replace:true})
            return;
        }
        fetch("http://localhost:8000/api/v1/todos/change-status",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'credentials': 'include' // Ensure cookies are sent
            },
            body:JSON.stringify({todoId:todoId})
        })
        .then((response)=>{
            if(response===404){
                alert("You are not logged in");
                navigate('/login',{replace:true})
            }
            else if(response===400){
                alert("Todo to be updated not found")
            }
        })
        .catch(error=>console.log(error))
    }
    const deleteTodo=(todoId)=>{
        const token=localStorage.getItem("accessToken");
        if(!token){
            alert("You are not logged in");
            navigate("/login",{replace:true})
        }

        fetch("http://localhost:8000/api/v1/todos/delete-todo",
            {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'credentials': 'include' // Ensure cookies are sent
                },
                body:JSON.stringify({todoId:todoId})
            }
        )
        .then((response)=>{
            if(response.status===400){
                alert("Todo not found");
            }
            else if(response.status===404){
                alert("You are not logged in")
                navigate('/login',{replace:true})
            }
        })
    }
    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            alert('You are not logged in');
            // Optionally redirect to login page:
            navigate('/login', { replace: true });
            return; // Exit useEffect if no token found
        }

        fetch("http://localhost:8000/api/v1/users/get-user-details", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'credentials': 'include' // Ensure cookies are sent
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data?.user === undefined) {
                    alert("You are not logged in");
                    // Optionally redirect to login page:
                    navigate('/login', { replace: true });
                } else {
                    setUsername(data.user.username);
                    setFullname(data.user.fullname);
                    setEmail(data.user.email);
                    setTodos([...data.user.todos]); // Create a new array with spread operator
                }
            })
            .catch((error) => {
                console.error('Error fetching user details:', error);
            });
    }, [updateTodo,deleteTodo]); // Empty dependency array to fetch data only once on component mount

    return (
        <div>
            <h2>User Details</h2>
            <p>Username: {username}</p>
            <p>Full Name: {fullname}</p>
            <p>Email: {email}</p>
            <p>{todos.length===0?"No todos to display":""}</p>
            {todos.length > 0 && (
                <>
                    <h2>Todos</h2>
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo._id}>{todo.description}:Todo status {todo.isComplete===true?"Completed":"Not completed"} <button onClick={(e)=>{
                                updateTodo(todo._id)
                            }}>Update</button> <button onClick={(e)=>deleteTodo(todo._id)}>Delete</button></li>
                        ))}
                    </ul>
                </>
            )}
            <form action="POST">
                To add todo, enter description:
                <input type="text" placeholder='Enter your description' value={desc} onChange={(e)=>{
                    setDesc(e.target.value)
                }}/>
                <button onClick={(e)=>{
                    e.preventDefault();
                    if(desc.trim()===""){
                        alert("Description must not be empty")
                    }
                    else{
                        postData(desc)
                    }
                }}>Submit</button>
            </form>
        </div>
    );
}


export default UserActivity
