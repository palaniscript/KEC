const express = require('express');
const router = express.Router();
let Users = require('../schemas/User');
const { authJwt } = require("../middleware");

router.post('/', authJwt.verifyToken, async (req, res) => {
    try {
        const user = new Users(req.body);
        await user.save();
        res.status(201).send(user);
    } catch {
        res.status(500).send('something went wrong');
    }
});
module.exports = router;