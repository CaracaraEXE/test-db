import express from "express";
const router = express.Router();
import Player from "../models/player.js";

const findAllPlayers = async (req, res) => {
    try {
        const players = await Player.find().select("_id name country element profile img")
        return res.status(200).send({message: "Todos los playeros",players: players})
    } catch (error) {
        return res.status(501).send({message:"Lol you failed",error})
    }
};

const findOnePlayer = async (req, res) => {
    const {id} = req.params
    try{
        const player = await Player.findOne({_id: id}).select("_id name country element profile img")
        return res.status(200).send({message:"Playero encontrado", player})
    } catch (error) {
        return res.status(501).send({message:"Lol you failed",error})
    }
}

const addPlayer = async (req,res) => {
    const {name, country, element, profile, img} = req.body
    try {
        const player = new Player({name, country, element, profile, img})
        await player.save()
        return res.status(200).send({message:"Playero creado", player})
    } catch(error){
        return res.status(501).send({message:"Lol you failed",error})
    }
}

const deletePlayer = async(req,res) => {
    const {id} = req.params
    try {
        const playerToDelete = await Player.findOne({_id:id})

        if(!playerToDelete){
            return res.status(404).send({message:"No existe el playero",_id:id})
        }

        await Player.deleteOne({_id: id})
        return res.status(200).send({message:"Playero eliminado", player:playerToDelete})
    } catch(error) {
                return res.status(501).send({message:"Lol you failed",error})
    }
}



//CRUD endpoints
router.get("/", findAllPlayers);
router.get("/:id",findOnePlayer);
router.post('/',addPlayer);
router.delete("/:id",deletePlayer)

export default router;
