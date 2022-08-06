import express, {json, NextFunction, Request, Response } from "express";
import router from "./Routes/ProductRoutes";
const app = express();
app.use(json())
app.use('/products',router)

app.use((err:Error,req:Request,res:Response,next:NextFunction) => {
    res.json({error:err.message})
})


app.listen(5000,()=>{
    console.log("app is running");
    
});