const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: { type:String,required:true },
    description: { type:String, required:true },
    image:{ type:String, required:true },
    tags:{ type:Array}
})

module.exports = mongoose.model("News", schema)