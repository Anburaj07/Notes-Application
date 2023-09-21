const express= require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.route")
const { noteRouter } = require("./routes/note.route")
const app=express()
const cors=require("cors")
app.use(cors({
    origin:'*'
}))
app.use(express.json())

app.use("/users",userRouter)
app.use("/notes",noteRouter)

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"Welcome to Base Point"})
})

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connencted to DB")
        console.log("Server is running at 8080")
    } catch (error) {
        console.log("Error while connectiong to Db")
        console.log(error)
    }
})