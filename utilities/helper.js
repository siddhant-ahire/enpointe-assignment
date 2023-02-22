const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: __dirname + '/.env' });


function joiModelValidation(req, res, modelName, joiModel) {
    console.log(req.form)
    const validation = joiModel[modelName].validate(req.body);
    if (validation.error) {
        return res.status(400).send({
            message: validation.error.message,
            success: false,
            data: {}
        });
    } else {
        return true;
    }
}

function bcryptCompare(data, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(data, hash, function (err, res) {
            resolve(res)
        });
    })
}

function cryptHash(data) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(data, saltRounds, function (err, hash) {
            resolve(hash)
        });
    })
}

function signToken(entity) {
    return jwt.sign(entity, process.env.JWT_SECRET);
};

function isAuthenticated(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).send({ error: "user is not logged in!" });;
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(401).send({ error: "user is not logged in!" });
    req.user = user;
    next();
  });  
};

module.exports = {
    joiModelValidation,
    bcryptCompare,
    cryptHash,
    signToken,
    isAuthenticated
}