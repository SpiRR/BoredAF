const router = require('express').Router();

router.get('/homepage', (req, res) => {
    res.send('Homepage');
})