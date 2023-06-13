const db = require('../database');
const express = require('express');
const router = express.Router();

router.get("/", (req,res) => {
    const q = "select t.type_name, c.category_name from Categories c inner join Types t on t.type_id = c.type_id";
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


// router.get("/all_categories_length", (req,res) => {
//     const q = `select count(*) from categories c
//     inner join types t
//     on c.type_id = t.type_id;`;
//     db.query(q, (err, data) => {
//         if(err){
//             return res.json(err)
//         }else{
//             return res.json(data);
//         }
//     });
// });



router.get("/income", (req,res) => {
    const q = "select c.category_id, t.type_name, c.category_name from Categories c inner join Types t on t.type_id = c.type_id where t.type_name = 'Income'";
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.get("/income/budgets", (req,res) => {
    const q = `
        select c.category_name, b.budget_amount 
        from budgets b
        inner join categories c
        on b.category_id = c.category_id;
    `;
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.get("/compulsory", (req,res) => {
    const q = "select c.category_id, t.type_name, c.category_name from Categories c inner join Types t on t.type_id = c.type_id where t.type_name = 'Expenses Compulsory'";
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.get("/debit", (req,res) => {
    const q = "select c.category_id, t.type_name, c.category_name from Categories c inner join Types t on t.type_id = c.type_id where t.type_name = 'Expenses Debit'";
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.get("/credit", (req,res) => {
    const q = "select c.category_id, t.type_name, c.category_name from Categories c inner join Types t on t.type_id = c.type_id where t.type_name = 'Expenses Credit'";
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.get("/savings", (req,res) => {
    const q = "select c.category_id, t.type_name, c.category_name from Categories c inner join Types t on t.type_id = c.type_id where t.type_name = 'Savings'";
    db.query(q, (err, data) => {
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
        group by year(period_id);
    `;
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.get("/getMonths/:year", (req,res) => {
    const year = req.params.year;
    const q = `
        select 
        month(period_id) as month,
        left(monthname(period_id), 3) as month_name
        from periods 
        where year(period_id) = ?
    `;
    db.query(q, [year], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});


router.get("/getHeaderData", (req,res) => {
    const q = `
        select 
        month(period_id)
        from periods 
        where year(period_id) = ?
    `;
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});



module.exports = router;