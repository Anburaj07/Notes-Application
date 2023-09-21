import React, { useState } from 'react'
import { styled } from 'styled-components'
const Login = () => {
    const [email,setEmail]=useState('')
    const [pass,setPass]=useState('')

    const handleSubmit=()=>{
        const payload={email,pass}
        console.log('payload:', payload)

        fetch("http://localhost:8080/users/login",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(payload)
        }).then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            localStorage.setItem('token',res.token)
        })
        .catch(err=>console.log(err))
    }
  return (
    <DIV>
      <h3>User Login</h3>
      <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder='password' value={pass} onChange={(e)=>setPass(e.target.value)}/>
      <button onClick={handleSubmit}>Signup!</button>
    </DIV>
  )
}

export default Login

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