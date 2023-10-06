const express = require("express")
const adminController = require("../Controllers/adminController")
const upload = require("../middleware/upload")

const router = express.Router()

router
  .route("/dashboard")
  .get(adminController.carsPage)

router
  .route("/dashboard/create")
  .get(adminController.createPage)

router
  .route("/car/create")
  .post(
    upload.single("image"),
    adminController.createCar
  )

router
  .route("/dashboard/edit/:id")
  .get(adminController.editPage)

router
  .route("/car/update/:id")
  .post(
    upload.single("image"),
    adminController.editCar
  )

router
  .route("/car/delete/:id")
  .get(adminController.removeCar)

module.exports = router
