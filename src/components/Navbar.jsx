import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = () => {
  return (
    <DIV>
      <h2>Notes App</h2>
      <Link to={"/"}>Home</Link>
      <Link to={"/signup"}>Register</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/notes"}>Notes</Link>
    </DIV>
  )
}

export default Navbar

const DIV=styled.div`
    width: 100%;
    margin: auto;
    align-items: center;
    display: flex;
    justify-content: space-around;
    border-bottom: 2px solid gray;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 1%;
    h2{
        color: #1e7094;
    }
`
