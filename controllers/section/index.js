const express = require("express");
const router = express.Router();
const controllers = require("./controllers")
const {isAuthenticated} = require("../../utilities/helper");

router.post("/create", controllers.createSection);
router.get("/list", controllers.getSections);

module.exports = router;