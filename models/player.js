import mongoose from "mongoose";
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { type: String },
    position:{type:String},
    country: [{type:Schema.Types.ObjectId,ref:"Country"}],
        element:{type:String},
            profile:{type:String},
                img:{type:String},


});

export default mongoose.model("Player", playerSchema, "Players");
