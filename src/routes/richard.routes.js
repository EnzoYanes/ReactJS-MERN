const express=require('express');
const router=express.Router();

router.get('/', (req, res)=>{
    console.log('estoy en route richard');
    
    res.json({
        status: 'levanto'
    });
});

module.exports = router;