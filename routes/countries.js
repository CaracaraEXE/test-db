import express from "express";
import Country from "../models/country.js";
 
const router = express.Router();
 
// Crear categoría (name + slug)
router.post("/", async (req, res) => {
  try {
    const { name, slug, team } = req.body;
    const country = new Country({ name, slug, team });
    await country.save();
    return res.status(201).send({ message: "Categoría creada", country });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
});
 
// Listar categorías (simple)
router.get("/", async (_req, res) => {
  try {
    const countries = await Country.find().select("_id name slug team");
    return res.status(200).send({ message: "Todas las categorías", countries });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
});
 
// Productos por categoría (slug o id)  -> ya lo teníamos
router.get("/:key/players", async (req, res) => {
  const { key } = req.params;
  try {
    const isId = key.match(/^[0-9a-fA-F]{24}$/);
    const country = isId
      ? await Country.findById(key)
      : await Country.findOne({ slug: key });
 
    if (!country) return res.status(404).send({ message: "Categoría no encontrada" });
 
    const players = await (await import("../models/player.js")).default
      .find({ countries: country._id })
      .select("_id name countries img")
      .populate("countries", "name slug");
 
    return res.status(200).send({
      message: "Productos por categoría",
      country: { _id: country._id, name: country.name, slug: country.slug, img: country.img },
      players
    });
  } catch (error) {
    return res.status(500).send({ message: "Hubo un error", error });
  }
});

//http://localhost:4000/countries/jewelry/players
 
export default router;