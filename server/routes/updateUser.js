const express = require('express');
const router = express.Router();
let Users = require('../schemas/User');
const { authJwt } = require("../middleware");

router.put('/:id', authJwt.verifyToken, async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        )
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send('User updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error updating user: ${err.message}`);
    }
});
module.exports = router;