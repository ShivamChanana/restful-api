const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    mobile:{
        type: Number,
        match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, "It's not a valid mobile number." ]
    },
    email:{
        type: String,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "It's not an email"],
        unique: true
    }
})

const users = mongoose.model("list", userSchema)
module.exports = users