import React, { useState, useEffect } from 'react'
import axios from 'axios';

import '../sass-files/App.scss';

import DashboardCards from './DashboardCards';

export default function Dashboard() {


  // FETCH Dashboard Cards Information - to be passed down to DashboardCards component
  const [dashboardData, setDashboardData] = useState([]);
  const fetchDashboardData = async (filtered_year, filtered_month) => {
    try{
      const res = await axios.get("http://localhost:8800/getDashboardData/" + filtered_year + "&" + filtered_month );
      setDashboardData(res.data);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    // dashboard will always get the current year and month first
    fetchDashboardData(new Date().getFullYear(), new Date().getMonth() + 1);
  }, []);

  // reformat fetch result into an object. Previously was an array of objects
  let dashboardData_formatted = {}
  dashboardData.map(item => {
    dashboardData_formatted[item.type_name] = item.total_amount;
  });
  // add debit balance to the object
  dashboardData_formatted["debit_balance"] = (dashboardData_formatted["Income"] - dashboardData_formatted["Savings"]) - dashboardData_formatted["Expenses (Debit)"]


  // FETCH Dashboard Filters MONTHS - to be passed down to DashboardFitlers component
  const [dashboardFilterMonths, setDashboardFilterMonths] = useState([]);
  useEffect(() => {
    const fetchDashboardFilterMonths = async () => {
      try{
        const res = await axios.get("http://localhost:8800/getMonths");
        setDashboardFilterMonths(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchDashboardFilterMonths();
  }, []);


  // FETCH Dashboard Filters YEARS - to be passed down to DashboardFitlers component
  const [dashboardFilterYears, setDashboardFilterYears] = useState([]);
  useEffect(() => {
    const fetchDashboardFilterYears = async () => {
      try{
        const res = await axios.get("http://localhost:8800/getYears");
        setDashboardFilterYears(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchDashboardFilterYears();
  }, []);


  return (
    <div className='component dashboard'>
      <p className="headers h4">Dashboard</p>

      <DashboardCards
        fetchDashboardData={fetchDashboardData}
        dashboardData_formatted={dashboardData_formatted}
        dashboardFilterMonths={dashboardFilterMonths}
        dashboardFilterYears={dashboardFilterYears}
      />

    </div>
  )
}
