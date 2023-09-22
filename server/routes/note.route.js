const express=require("express")
const { NoteModel } = require("../model/note.model")
const { auth } = require("../middleware/auth.middleware")

const noteRouter=express.Router()

noteRouter.use(auth)

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    try {
        const note=new NoteModel(payload)
        await note.save()
        res.status(200).json({msg:"A new note has been Created"})
    } catch (error) {
        res.status(400).json({error})
    }
})

noteRouter.get("/",async(req,res)=>{
    try {
        const notes=await NoteModel.find({userID:req.body.userID})
        res.status(200).json(notes)
    } catch (error) {
        res.status(400).json({error})
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const payload=req.body;        
        let note=await NoteModel.findById({_id:id})

        if(note.userID==req.body.userID){
            await NoteModel.findByIdAndUpdate({_id:id},payload)
            res.status(200).json({msg:`Note with ${id} Updated`})
        }else{
            res.status(200).json({error:"You don't have the access to update"})
        }
    } catch (error) {
        res.status(400).json({error})
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        let note=await NoteModel.findById({_id:id})

        if(note.userID==req.body.userID){
            await NoteModel.findByIdAndDelete({_id:id})
            res.status(200).json({msg:`Note with ${id} deleted`})
        }else{
            res.status(200).json({error:"You don't have the access to delete"})
        }
    } catch (error) {
        res.status(400).json({error})
    }
})
module.exports={noteRouter}