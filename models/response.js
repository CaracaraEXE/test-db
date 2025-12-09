import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true}
})

const ChoiceSchema = new mongoose.Schema({
    player:{type:String,required:true},
    team:{type:String,required:true}
})

const ResponseSchema = new mongoose.Schema(
    {
        user:{type:UserSchema,required:true},
        choices:{type:[ChoiceSchema], required:true}
    },
    {timestamps:true}
)

export default mongoose.model("Reponse",ResponseSchema,"Responses");