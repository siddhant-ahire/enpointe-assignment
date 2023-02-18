const express = require("express");
const router = express.Router();
const controllers = require("./controllers");
const {isAuthenticated} = require("../../utilities/helper");

router.post("/create", isAuthenticated, controllers.createWarehouse);
router.get("/list", isAuthenticated, controllers.getWarehouses);

module.exports = router;