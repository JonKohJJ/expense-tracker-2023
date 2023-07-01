const db = require('../database');
const express = require('express');
const router = express.Router();


router.get("/getDashboardCardData/:filtered_year&:filtered_month", (req,res) => {

    const filtered_year = req.params.filtered_year;
    const filtered_month = req.params.filtered_month;

    const q = `
        select
        t.type_name,
        SUM(r.amount) as total_amount
        from records r
        inner join types t
        on r.type_id = t.type_id
        where year(r.record_date) = ?
        and month(r.record_date) = ?
        group by t.type_name;
    `
    db.query(q, [filtered_year, filtered_month], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});

router.get("/getYears", (req,res) => {
    const q = `
        select
        year(period_id) as year
        from periods
        group by year;
    `
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});

router.get("/getMonths", (req,res) => {
    const q = `
        select
        MONTH(period_id) as months_numerical,
        MONTHNAME(period_id) as months_string, 
        left(MONTHNAME(period_id), 3) as months_short
        from periods
        group by months_numerical, months_string, months_short;
    `
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.get("/getTypes", (req,res) => {
    const q = `
        select * from types
        order by type_id;
    `
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});

router.get("/getCategories/:filtered_year&:filtered_month&:type_id", (req,res) => {
    
    const filtered_year = req.params.filtered_year;
    const filtered_month = req.params.filtered_month;
    const type_id = req.params.type_id;
    
    const q = `
        select
        c.category_id, 
        c.category_name,
        c.category_budget,
        ifnull(sum(r.amount),0) as tracked,
        round((ifnull(sum(amount), 0)/c.category_budget)*100, 2) as '% completed',
        greatest((c.category_budget - ifnull(sum(amount), 0)), 0) as remaining,
        abs(least((c.category_budget - ifnull(sum(amount), 0)), 0)) as excess
        from categories c
        left join records r
        on c.category_id = r.category_id
        and year(r.record_date) = ?
        and month(r.record_date) = ?
        where c.type_id = ?
        group by c.category_id 
        order by tracked desc;
    `;
    db.query(q, [filtered_year, filtered_month, type_id], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.get("/getDashboardBodyData/:filtered_year&:filtered_month", (req,res) => {

    const filtered_year = req.params.filtered_year;
    const filtered_month = req.params.filtered_month;

    const q = `
        select
        t.type_name,
        SUM(r.amount) as total_amount
        from records r
        inner join types t
        on r.type_id = t.type_id
        where year(r.record_date) = ?
        and month(r.record_date) = ?
        group by t.type_name;
    `
    db.query(q, [filtered_year, filtered_month], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});

module.exports = router;