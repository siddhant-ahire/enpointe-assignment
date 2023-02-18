const express = require("express");
const { isAuthenticated } = require("../../utilities/helper");
const router = express.Router();
const controllers = require("./controllers")

router.post("/create", isAuthenticated, controllers.createCategory);
router.get("/list", isAuthenticated, controllers.getCategories);

module.exports = router;