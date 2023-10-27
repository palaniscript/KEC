const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let Users = require('../schemas/User');

router.post('/', async (req, res) => {
  console.log(req.body.email);
  try {
    const user = await Users.findOne({ email: req.body.email, password: req.body.password });

    console.log(user);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const token = jwt.sign({ id: user._id },
      "SECRET_COMES_HERE",
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

    return res.status(200).send({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: token
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});
module.exports = router;