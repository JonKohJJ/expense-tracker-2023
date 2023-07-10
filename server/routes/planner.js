const db = require('../database');
const express = require('express');
const router = express.Router();


// GET TYPES
router.get("/getTypes", (req,res) => {

    const q = `
        select
        t.type_id,
        t.type_name
        from categories c
        inner join types t
        group by t.type_id
        order by t.type_id
    `;
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});

// GET CATEGORIES FOR EACH TYPE
router.get("/getCategories/:type_id", (req,res) => {
    const type_id = req.params.type_id;

    const q = `
        select
        c.category_id, 
        c.category_name,
        c.category_budget
        from categories c
        where type_id = ?
    `;
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
        categories(type_id, category_name, category_budget)
        values(?);
    `
    const values = [
        req.body.type_id,
        req.body.category_name,
        req.body.category_budget
    ];
    db.query(q, [values], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});

// GET YEARS
router.get("/getYears", (req,res) => {

    const q = `
        select 
        year(period_id) as year
        from periods
        group by year;
    `;
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});

// GET MONTHS FOR EACH YEAR
router.get("/getMonths/:year", (req,res) => {
    const year = req.params.year;
    const q = `
        select 
        period_id,
        left(monthname(period_id), 3) as month_name_short
        from periods
        where year(period_id) = ?;
    `;
    db.query(q, [year], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


// update
router.put("/:category_id", (req,res) => {
    const category_id = req.params.category_id;

    const q = `
        update categories
        set 
        category_name = ?,
        category_budget = ?
        where category_id = ?
    `
    const updateValues = [
        req.body.category_name,
        req.body.category_budget
    ];

    db.query(q, [...updateValues, category_id], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


// delete
router.delete("/:category_id", (req,res) => {
    const category_id = req.params.category_id;

    const q = `
        delete from categories
        where category_id = ?
    `
    db.query(q, [category_id], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});








module.exports = router;