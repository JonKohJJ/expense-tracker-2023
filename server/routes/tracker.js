const db = require('../database');
const express = require('express');
const router = express.Router();

router.get("/", (req,res) => {
    const q = `
        select 
        r.record_id, 
        date_format(r.record_date, "%d-%b-%y") as record_date, 
        date_format(r.record_date, "%Y-%m-%d") as record_date_update_format, 
        t.type_name, 
        t.type_id, 
        c.category_name, 
        r.amount, 
        r.details,
        r.created_at
        
        from records r
        inner join types t
        on r.type_id = t.type_id
        inner join categories c
        on r.category_id = c.category_id
        order by 
            r.record_date,
            r.created_at

    `
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});

router.get("/getCardsInformation", (req,res) => {
    const q = `
        select 
        CURDATE(),
        max(record_date) as last_record_date,
        date_format(CURDATE(), "%d-%b-%y") as current_date_formatted,
        date_format(max(record_date), "%d-%b-%y") as last_record_date_formatted,
        DATEDIFF(CURDATE(), max(record_date)) as days_difference
        from records;
    `;
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.get("/getTypes", (req,res) => {
    const q = "select * from types order by type_id;;"
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.get("/getCategories/:type_id", (req,res) => {
    const type_id = req.params.type_id;
    const q = "select * from categories where type_id = ?"
    db.query(q, [type_id], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.post("/", (req,res) => {
    const q = `
        insert into 
        records(record_date, type_id, category_id, amount, details)
        values(?);
    `
    const values = [
        req.body.record_date,
        req.body.type_id,
        req.body.category_id,
        req.body.amount,
        req.body.details,
    ];
    db.query(q, [values], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.put("/:record_id", (req,res) => {
    const record_id = req.params.record_id;

    const q = `
        update records
        set 
        record_date = ?, 
        type_id = ?, 
        category_id = ?, 
        amount = ?, 
        details = ?
        where record_id = ?
    `
    const updateValues = [
        req.body.record_date,
        req.body.type_id,
        req.body.category_id,
        req.body.amount,
        req.body.details,
    ];

    db.query(q, [...updateValues, record_id], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.delete("/:record_id", (req,res) => {
    const record_id = req.params.record_id;

    const q = `
        delete from records
        where record_id = ?
    `
    db.query(q, [record_id], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});

module.exports = router;