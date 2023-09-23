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

const swaggerJsdoc=require("swagger-jsdoc")
const swaggerUi=require("swagger-ui-express")

//openapi definitions
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Learning Swagger",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http://localhost:4500/"
            }
        ]
    },
    apis:["./routes/*.js"]
}

const swaggerSpec=swaggerJsdoc(options)

//specification
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

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