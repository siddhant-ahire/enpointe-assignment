const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
var path = require('path');
require('dotenv').config({ path: __dirname + '/.env' });
const routes = require('./routes')

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get("/health", (req, res) => {
    const data = {
        uptime: process.uptime(),
        message: "Ok",
        date: new Date(),
    };
    res.status(200).send(data);
});
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

app.listen(process.env.PORT, async () => {
    console.log(`🚀 backend app running on port ${process.env.PORT}`);
})