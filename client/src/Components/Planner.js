import React, { useState, useEffect } from 'react'
import axios from 'axios';

import '../sass-files/App.scss';

export default function Planner() {

  // get all types of categories
  const [compulsory, setCompulsory] = useState([]);
  const [debit, setDebit] = useState([]);
  const [credit, setCredit] = useState([]);
  const [savings, setSavings] = useState([]);

  const [income, setIncome] = useState([]);
  useEffect(() => {
    const fetchIncome = async () => {
      try{
        const income_categories = await axios.get("http://localhost:8800/planner/income");
        const income_budgets = await axios.get("http://localhost:8800/planner/income/budgets");

        let holdingArray = [];
        let finalArray = [];
        let holdingSum = 0;
        income_categories.data.map(item => {
          // category name
          holdingArray.push(item.category_name);
          // category budgets
          for(let i=0; i<income_budgets.data.length; i++){
            if (income_budgets.data[i].category_name === item.category_name){
              holdingArray.push(income_budgets.data[i].budget_amount);
              holdingSum = holdingSum + income_budgets.data[i].budget_amount;
            }
          }
          // push sum to holding array
          holdingArray.push(holdingSum);
          // push holding array to final array
          finalArray.push(holdingArray);
          // clear holding array
          holdingArray = [];
          holdingSum = 0;
        });
        setIncome(finalArray);
      }catch(err){
        console.log(err);
      }
    }
    fetchIncome();
  }, []);
  // console.log("INCOME: ", income);

  useEffect(() => {
    const fetchCompulsory = async () => {
      try{
        const res = await axios.get("http://localhost:8800/planner/compulsory");
        setCompulsory(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchCompulsory();
  }, []);

  useEffect(() => {
    const fetchDebit = async () => {
      try{
        const res = await axios.get("http://localhost:8800/planner/debit");
        setDebit(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchDebit();
  }, []);

  useEffect(() => {
    const fetchCredit = async () => {
      try{
        const res = await axios.get("http://localhost:8800/planner/credit");
        setCredit(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchCredit();
  }, []);

  useEffect(() => {
    const fetchSavings = async () => {
      try{
        const res = await axios.get("http://localhost:8800/planner/savings");
        setSavings(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchSavings();
  }, []);


  const idealPeriods = [
    {year: "2023", months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]},
    {year: "2024", months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
  ];

  return (
    <div className='component planner'>
      <p className="headers h5">Planner</p>
      <table className='planner-table'>
      
        {/* <tr>
          <td><p className="base-text smaller-caption">Year</p></td>
          {idealPeriods.map(period => (
            <td key={period.year} colSpan="13" className="period-headers">
              {period.year}
            </td>
          ))}
        </tr>
        <tr>
          <td><p className="base-text smaller-caption">Month</p></td>
          {idealPeriods.map(period => {
            let holdingArray = [...period.months];
            holdingArray.push("Total");
            return(
              holdingArray.map(item => (
                  <td className='period-headers'>{item}</td>
              ))
            )
          })}
        </tr>
        <tr>
          <td><p className="base-text smaller-caption">To be allocated:</p></td>
        </tr>

        <tr className='empty-row'></tr>

        <tr>
          <td>Income</td>
          {idealPeriods.map(period => {
            let holdingArray = [...period.months];
            holdingArray.push(period.year);
            return(
              holdingArray.map(item => (
                <td className='period-headers'>{item}</td>
              ))
            )
          })}
        </tr>
        {income.map(categoryArray => {
          return(
            <tr key={categoryArray[0]} className='data'>
              {categoryArray.map(item => (
                <td><p className="base-text caption">{item}</p></td>
              ))}
            </tr>
          )
        })}
        <tr>
          <td>Total</td>
        </tr>

        <tr className='empty-row'></tr>



        <tr className='empty-row'></tr>
        <tr className='row-header'><p className="base-text">Income</p></tr>
        {income.map(object => {
          return <tr key={object.category_id}>
                      <td><p className="base-text caption">{object.category_name}</p></td>
                </tr>
        })}


        /* <tr className='empty-row'></tr>
        <tr className='row-header'><p className="base-text">Compulsory</p></tr>
        {compulsory.map(object => {
          return <tr key={object.category_id}><p className="base-text caption">{object.category_name}</p></tr>
        })}


        <tr className='empty-row'></tr>
        <tr className='row-header'><p className="base-text">Debit</p></tr>
        {debit.map(object => {
          return <tr key={object.category_id}><p className="base-text caption">{object.category_name}</p></tr>
        })}


        <tr className='empty-row'></tr>
        <tr className='row-header'><p className="base-text">Credit</p></tr>
        {credit.map(object => {
          return <tr key={object.category_id}><p className="base-text caption">{object.category_name}</p></tr>
        })}


        <tr className='empty-row'></tr>
        <tr><p className="base-text">Savings</p></tr>
        {savings.map(object => {
          return <tr key={object.category_id}><p className="base-text caption">{object.category_name}</p></tr>
        })} */}
      
      </table>

    </div>
  )
}
