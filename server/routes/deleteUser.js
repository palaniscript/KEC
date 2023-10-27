const express = require('express');
const router = express.Router();
let Users = require('../schemas/User');
const { authJwt } = require("../middleware");

router.delete('/:id', authJwt.verifyToken, async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted');
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;