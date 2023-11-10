import { app } from "./app.js";
import dotenv from "dotenv"
import { connectdb } from "./DB/_db.js";
dotenv.config({path:"./env"})

connectdb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>
    console.log(`Server is listening on https://localhost:${process.env.PORT}`))
})
.catch((err)=>console.log("MONGO_DB Connection Failed!!",err))