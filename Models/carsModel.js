const mongoose = require("mongoose")

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name harus ada"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "category harus ada"],
    },
    price: {
      type: Number,
      required: [true, "harga harus ada"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Car = mongoose.model("Car", carSchema)

module.exports = Car
