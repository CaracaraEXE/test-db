import express from "express";
const router = express.Router();
import response from "../models/response.js";

const addResponse = async(req,res) => {
    try{
        const response = new Response(req.body);
        await response.save();
        return res.status(200).send({message:"Response sent",response})
    }
    catch(error){
        return res.status(501).send({ message: "Hubo un error", error });
    }
}
router.post("/",addResponse);

export default router;