const express = require("express");
const { isAuthenticated } = require("../../utilities/helper");
const router = express.Router();
const controllers = require("./controllers")

router.post("/create", controllers.createProduct);
router.get("/list", controllers.getProducts);
router.post("/move-product", controllers.moveProductToOtherSection);

module.exports = router;