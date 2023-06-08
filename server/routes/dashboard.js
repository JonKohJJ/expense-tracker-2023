const db = require('../database');
const express = require('express');
const router = express.Router();


router.get("/getDashboardCardsInformation", (req,res) => {
    const q = `
        select
        t.type_name, 
        SUM(r.amount) as total_amount
        from records r
        inner join types t
        on r.type_id = t.type_id
        group by t.type_name;
    `
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});

module.exports = router;