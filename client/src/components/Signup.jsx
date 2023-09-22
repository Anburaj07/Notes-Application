import React, { useState } from 'react'
import styled from 'styled-components'

const Signup = () => {
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')

    const handleSubmit=()=>{
        const payload={username,email,pass}
        console.log('payload:', payload)

        fetch("https://notes-app-server-21eg.onrender.com/users/register",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(payload)
        }).then((res)=>res.json())
        .then((res)=>console.log(res))
        .catch(err=>console.log(err))
    }
  return (
    <DIV>
      <h3>User Registration</h3>
      <input type="text" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
      <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder='password' value={pass} onChange={(e)=>setPass(e.target.value)}/>
      <button onClick={handleSubmit}>Signup!</button>
    </DIV>
  )
}

export default Signup

const DIV=styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: auto;
    text-align: center;
    font-size: 20px;

    margin-top: 30px;
    padding: 2%;

    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    h3{
        color: #1e7094;
    }
    
    input,button{
        height:30px;
        font-size: 20px;
        border-radius: 10px;
        margin-bottom: 9px;
    }
    button:hover{
        cursor: pointer;
        background-color: grey;
        color: whitesmoke;
    }
`