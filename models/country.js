import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
    name:{type:String, required:true, trim:true},
    slug:{type:String, requited:true, unique:true, lowercase:true,trim:true},
    team:{type:String, required:true, trim:true},
})

export default mongoose.model("Country",categorySchema, "Countries");