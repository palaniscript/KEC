const express = require('express');
const router = express.Router();
let Users = require('../schemas/User');
const { authJwt } = require("../middleware");

router.get('/:id', authJwt.verifyToken, async (req, res) => {
    console.log(req.params.id)
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error fetching user: ${err.message}`);
    }

});
module.exports = router;