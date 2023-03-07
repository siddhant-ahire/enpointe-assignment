const express = require("express");
const router = express.Router();
const controllers = require("./controllers");
const {isAuthenticated} = require("../../utilities/helper");

router.post("/create", controllers.createWarehouse);
router.get("/list", controllers.getWarehouses);

module.exports = router;