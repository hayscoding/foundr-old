const router = require('express').Router();

router.get('/', function(req, res){    
    res.send("Connected to ChainPointers API.");
});

//Group routers here
router.use('/posts', require('./posts'))

module.exports = router;