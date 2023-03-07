const express = require("express");
const router = express.Router();
const controllers = require("./controllers")
const {isAuthenticated} = require("../../utilities/helper");

router.post("/create", isAuthenticated, controllers.createSection);
router.get("/list", isAuthenticated, controllers.getSections);

module.exports = router;