const express = require("express");
const router = express.Router({ mergeParams : true });
const jwt = require("jsonwebtoken");

router.use("/", function(req, res) {
    // const { UserName, Password } = req.body;
    
    const token = jwt.sign({ Name : 'İpek', Surname : 'Erten' }, global.secretKey, {
        expiresIn : '1h'
    });
    res.send(token);
});
module.exports = router;