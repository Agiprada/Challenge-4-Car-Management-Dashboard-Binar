const Car = require("../Models/carsModel")

const carsPage = async (req, res) => {
  try {
    console.log(req.query)
    const { name, category, price } = req.query
    const filter = {}

    if (category)
      filter.category = {
        $regex: category,
        $options: "i",
      }

    if (name) {
      filter.name = {
        $regex: name,
        $options: "i",
      }
    }

    const cars = await Car.find(filter)

    res.render("index.ejs", {
      category,
      cars,
      message: req.flash("message", ""),
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const createPage = async (req, res) => {
  try {
    res.render("create.ejs")
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const createCar = async (req, res) => {
  try {
    const { name, price, category } = req.body
    const image = req.file.filename
    const cars = new Car({
      name,
      price,
      category,
      image,
    })
    await cars.save()
    req.flash("message", "Ditambahkan")
    res.redirect("/dashboard")
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const editPage = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    res.render("edit.ejs", {
      car,
    })
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const editCar = async (req, res) => {
  try {
    const id = req.params.id
    const { name, price, category } = req.body
    const exisCars = await Car.findById(id)

    const newImage = req.file
      ? req.file.filename
      : exisCars.image

    await Car.findByIdAndUpdate(
      id,
      { name, price, category, image: newImage },
      {
        new: true,
      }
    )
    req.flash("message", "Diupdate")
    res.redirect("/dashboard")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

const removeCar = async (req, res) => {
  try {
    const id = req.params.id
    await Car.findByIdAndRemove(id)
    req.flash("message", "Dihapus")
    res.redirect("/dashboard")
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    })
  }
}

module.exports = {
  carsPage,
  createPage,
  createCar,
  editPage,
  editCar,
  removeCar,
}
