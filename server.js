import express from "express"
import mongoose from "mongoose"
const app = express();


app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.get('/qrGenerator',(req,res)=>{
    res.send("Welcome to QR Generator!")
})

mongoose.set('strictQuery',false);

mongoose.connect('mongodb://localhost:27017').then(()=>{
    app.listen(3000,()=>{
        console.log("Server is listening on 3000");
    })
    console.log("Connected!")
}).catch((error)=>{
    console.log(error);
})