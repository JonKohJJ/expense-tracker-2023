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





// 01. GET TYPES
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

// 02. GET CATEGORIES FOR EACH TYPE
router.get("/getCategories/:type_id", (req,res) => {
    const type_id = req.params.type_id;
    const q = `
        select
        c.category_id, 
        c.category_name
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

// 03. GET YEARS
router.get("/getYears", (req,res) => {

    const q = `
        select 
        year(period_id) as year
        from budgets
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

// 04. GET MONTH FOR EACH YEAR
router.get("/getPeriods/:year", (req,res) => {
    const year = req.params.year;
    const q = `
        select
        period_id, 
        left(monthname(period_id), 3) as month_name_short
        from periods
        where (year(period_id)) = ?
    `;
    db.query(q, [year], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});

// 04. GET BUDGETS
router.get("/getPeriods/:year", (req,res) => {
    const year = req.params.year;
    const q = `
        select
        period_id, 
        left(monthname(period_id), 3) as month_name_short
        from periods
        where (year(period_id)) = ?
    `;
    db.query(q, [year], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});









// YEAR INCREMENT - 'ADD PERIOD'
// 01. Get highest year
// 02. Add 1 to the highest year
// 03. Insert into db for all 12 months

router.get("/getMaxYear", (req,res) => {
    const q = `
        select 
        MAX(year(period_id)) as max_year
        from periods;
    `;
    db.query(q, (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});

router.post("/insertPeriod", (req,res) => {
    const q = `
        insert into 
        periods(period_id)
        values(?);
    `
    const period_id = req.body.period_id

    db.query(q, [period_id], (err, data) => {
        if(err){
            return res.json(err)
        }else{
            return res.json(data);
        }
    });
});



module.exports = router;