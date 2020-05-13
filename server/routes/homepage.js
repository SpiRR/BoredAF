const express = require("express");
const router = express.Router()

router.get('/homepage', (req, res) => {
    res.send('Homepage');
})

module.exports = router;