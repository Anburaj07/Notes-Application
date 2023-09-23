const express=require("express")
const { NoteModel } = require("../model/note.model")
const { auth } = require("../middleware/auth.middleware")

const noteRouter=express.Router()

noteRouter.use(auth)

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *          id:
 *             type: string
 *             description: The auto-generated id of the note
 *          title:
 *              type: string
 *              description: The title of the Note
 *          body:
 *              type: string
 *              description: The title of the body
 *          userID:
 *              type: string
 *              description: The user id of the owner of post
 *          username:
 *              type: string
 *              description: The username of the owner of post
 */

/**
 * @swagger
 * tags:
 *  name: Notes
 *  description: All the API routes related to Notes
 */

/**
 * @swagger
 * /notes/create:
 *  post:
 *      summary: To post the details of new note
 *      tags: [Notes]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Note"
 *      responses:
 *          200:
 *              description: A new note has been Created
 *              content:
 *                  application/jon:
 *                      schema:
 *                          $ref: "#/components/schemas/Note"
 *              
 *          500:
 *              description: Internal server Error
 */

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
/**
 * @swagger
 * /notes:
 *  get:
 *     summary: This will get all the notes from the database
 *     tags: [Notes]
 *     responses:
 *         200:
 *             description: The list of all the notes
 *             content:
 *                 application/json:
 *                      schema:
 *                          type: array
 *                          item: 
 *                               $ref: "#/components/schemas/Note"
 */
noteRouter.get("/",async(req,res)=>{
    try {
        const notes=await NoteModel.find({userID:req.body.userID})
        res.status(200).json(notes)
    } catch (error) {
        res.status(400).json({error})
    }
})

/**
 * @swagger
 * /notes/update/{id}:
 *  patch:
 *     summary: This will get update the note details
 *     tags: [Notes]
 *     parameters:
 *             id: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: The note id
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: "#/components/schemas/Note"
 *     responses:
 *          200:
 *             description: Note with ${id} updated
 *             content:
 *                 application/json:
 *                      schema:
 *                        $ref: "#/components/schemas/Note"
 *          404:
 *              description: The Note was not found
 *          500:
 *              description: Some error happened 
 */

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

/**
 * @swagger
 * /notes/delete/{id}:
 *  delete:
 *     summary: Remove the Note by id
 *     tags: [Notes]
 *     parameters:
 *             id: path
 *             name: id
 *             schema:
 *               type: string
 *             required: true
 *             description: The note id
 *     responses:
 *          200:
 *             description: Note with ${id} deleted
 *          404:
 *              description: The Note was not found
 *          500:
 *              description: Some error happened 
 */
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