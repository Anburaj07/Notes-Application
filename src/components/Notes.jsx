import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Notes = () => {
    const [notes,setNotes]=useState([])
    const [update,setUpdate]=useState(false)
    const [title,setTitle]=useState('')
    const [body,setBody]=useState('')
    const [noteID,setNoteId]=useState('')
    useEffect(()=>{
        fetch("http://localhost:8080/notes",{
            headers:{
                "Authorization":localStorage.getItem('token')
            }
        }).then((res)=>res.json())
        .then(res=>{
            setNotes(res)
        }).catch(err=>console.log(err))
    },[notes])


    const handleDelete=(id)=>{
        fetch(`http://localhost:8080/notes/delete/${id}`,{
                method:"DELETE",
                headers:{
                    "Authorization":localStorage.getItem('token')
                }
            })
            .then(res=>res.json())
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
    }

    const handleUpdate=(id)=>{
        console.log('id:', id)
        const payload={
            title,body
        }        

        fetch(`http://localhost:8080/notes/update/${id}`,{
                method:"PATCH",
                headers:{
                    "Authorization":localStorage.getItem('token'),
                    "Content-type":"application/json"
                },
                body:JSON.stringify(payload)
            })
            .then(res=>res.json())
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            setUpdate(false)        
    }

    
  return (
    <div>
      {notes.map((el=>(
        <DIV key={el._id}>
        <h3>{el.title}</h3>
        <p>{el.body}</p>
        <button onClick={()=>{setUpdate(true)
            setNoteId(el._id)}}>Edit</button>
        <button onClick={()=>{handleDelete(el._id)}}>Delete</button>
        </DIV>
      )))}
     {update && <div>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" value={body} onChange={(e)=>setBody(e.target.value)}/>
            <button onClick={()=>{handleUpdate(noteID)}}>Update</button>
        </div>}
    </div>
  )
}

export default Notes

const DIV=styled.div`
border: 2px solid gray;
width: 50%;
margin: auto;
margin-top: 10px;
padding: 1%;
margin-bottom: 5px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`
