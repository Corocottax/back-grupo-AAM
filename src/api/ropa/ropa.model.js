const mongoose = require("mongoose");

const ropaSchema = new mongoose.Schema(
  {
    tipo: { type: String, trim: true, required: true },
    color: { type: String, trim: true, required: true },
    precio: { type: Number, trim: true, required: true },
    imagen: { type: String, trim: true, required: true },
    talla: { type: String, trim: true, required: true }
  },
  { timestamps: true, collection: "ropas" }
);

const Ropa = mongoose.model("ropas", ropaSchema);
module.exports = Ropa;
