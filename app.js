const express = require("express")
const app = express()
const port = 3001
const bodyParser = require("body-parser")
const mongoose = require("mongoose")


const users = require("./models/Users")


mongoose.connect("mongodb://localhost:27017/test12")
.then(()=>{
    console.log("DB conected")
})
.catch((err)=>{
    console.log(err)
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req,res)=>{
    users.find({})
    .then((data)=>{
        res.status(200).json({ message: "API hit successfully", data:data})
    })
    .catch((err)=>{
        res.status(400).json({ error: err})
    })
})

//validators
const {userValidationRules, validate} = require("./config/validator")

app.post("/", userValidationRules(), validate, (req,res) =>{

    users.create({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,     
    })
    .then(()=>{
        res.status(200).json({ message: "Stored Successfully"})
    })
    .catch((err)=>{
        res.status(400).json({ error: err})
    })
})

//update
app.put("/update/:id", (req,res)=>{
    users.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email
    })
    .then(()=>{
        res.status(200).json({ message: "Updated Successfully!"})
    })
    .catch((err)=>{
        res.status(400).json({error: err})
    })
})

//delete
app.delete("/delete/:id", (req,res)=>{
    users.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(200).json({ message: "Deleted Successfully"})
    })
    .catch((err)=>{
        res.status(400).json({error : err})
    })
})



app.listen(port, (req,res)=>{
    console.log(`App is running at port ${port}`)
})