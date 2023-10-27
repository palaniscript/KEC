const express = require('express');
const router = express.Router();
let Users = require('../schemas/User');
const { authJwt } = require("../middleware");

router.get('/', authJwt.verifyToken, async (req, res) => {
    try {
        const response = await Users.find();
        res.json(response);
    } catch (err) {
        res.status(500).send(`Error fectching users: ${err.message}`);
    }
});

module.exports = router;
