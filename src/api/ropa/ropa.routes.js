const express = require("express");
const Ropa = require("./ropa.model");
const upload = require("../../middlewares/file");
const { isAuth } = require("../../middlewares/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allRopas = await Ropa.find();
    return res.status(200).json(allRopas);
  } catch (error) {
    return res.status(500).json("Error en el servidor");
  }
});

router.get("/:id", [isAuth], async (req, res) => {
  try {
    const id = req.params.id;
    const ropaToFind = await Ropa.findById(id);
    return res.status(200).json(ropaToFind);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/create", upload.single("imagen"), async (req, res) => {
  try {
    const ropa = req.body;
    console.log(req.body);
    const newRopa = new Ropa(ropa);
    console.log(newRopa);
    const created = await newRopa.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("Error al crear la ropa");
  }
});

router.delete("/delete/:id", [isAuth], async (req, res) => {
  try {
    const id = req.params.id;
    await Ropa.findByIdAndDelete(id);
    return res.status(200).json("Se ha conseguido borrar la ropa");
  } catch (error) {
    return res.status(500).json("Error al borrar la ropa");
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ropa = req.body;
    const ropaModify = new Ropa(ropa);
    ropaModify._id = id;
    const ropaUpdated = await Ropa.findByIdAndUpdate(
      id,
      ropaModify
    );
    return res
      .status(200)
      .json({
        mensaje: "Se ha conseguido editar la ropa",
        ropaModificado: ropaUpdated,
      });
  } catch (error) {
    return res.status(500).json("Error al editar la ropa");
  }
});

module.exports = router;