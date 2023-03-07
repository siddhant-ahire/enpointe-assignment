const express = require("express");
const { isAuthenticated } = require("../../utilities/helper");
const router = express.Router();
const controllers = require("./controllers")

router.post("/create", isAuthenticated, controllers.createProduct);
router.get("/list", isAuthenticated, controllers.getProducts);
router.post("/move-product", isAuthenticated, controllers.moveProductToOtherSection);

module.exports = router;