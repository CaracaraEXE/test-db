import express from "express";
const router = express.Router();
import Response from "../models/response.js";

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

router.get("/", async (_req, res) => {
  try {
    const responses = await Response.find().select("_id user choices timestamps");
    return res.status(200).send({ message: "Todas las categorías", responses });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
});

router.post("/",addResponse);

export default router;