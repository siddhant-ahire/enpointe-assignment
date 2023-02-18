const express = require("express");
const router = express.Router();
const controllers = require("./controllers")

router.post("/create", controllers.createProduct);

module.exports = router;