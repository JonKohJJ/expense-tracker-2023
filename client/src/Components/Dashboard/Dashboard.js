import React, { useState, useEffect } from 'react'
import axios from 'axios';

import '../../sass-files/Dashboard.scss';

import DashboardCards from './DashboardCards';
import DashboardBody from './DashboardBody';

export default function Dashboard() {


  // FETCH Dashboard CARDS Information - to be passed down to DashboardCards component
  const [dashboardCardData, setDashboardCardData] = useState([]);
  const fetchDashboardCardData = async (filtered_year, filtered_month) => {
    try{
      const res = await axios.get("http://localhost:8800/getDashboardCardData/" + filtered_year + "&" + filtered_month );
      // console.log(res.data);
      setDashboardCardData(res.data);
    }catch(err){
      console.log(err);
    }
  }

  // FETCH Dashboard BODY Information
  const [dashboardBodyData, setDashboardBodyData] = useState([]);
  const fetchDashboardBodyData = (filtered_year, filtered_month) => {
    try{
      
      // fetch types and their respective categories and budgets
      axios.get("http://localhost:8800/getTypes/")
        .then((types) => {
          // fetch categories (tracked and budget) for each type
          const categories = types.data.map(async(type, index) => {
            const res = await axios.get("http://localhost:8800/getCategories/" + filtered_year + "&" + filtered_month + "&" + type.type_id);
            return {...type, categories:res.data}
          })
          Promise.all(categories)
            .then((categories) => {
              // console.log("categories (tracked & budget): ", categories);
              setDashboardBodyData(categories);
            })
        })


    }catch(err){
      console.log(err);
    }
  }

  // FETCH Dashboard FOOTER Information
  const [dashboardFooterData, setDashboardFooterData] = useState([]);
  const fetchDashboardFooterData = (filtered_year, filtered_month) => {
    try{
      // fetch types and their respective footer data
      axios.get("http://localhost:8800/getTypes/")
        .then((types) => {
          // fetch footer data for each type
          const footerData = types.data.map(async(type, index) => {
            const t_tracked = await axios.get("http://localhost:8800/getDashboardFooterData/getTotalTracked/" + filtered_year + "&" + filtered_month + "&" + type.type_id);
            const t_budget =  await axios.get("http://localhost:8800/getDashboardFooterData/getTotalBudget/" + type.type_id);
            
            // calculate % completed, remaining and excess
            const v_tracked = t_tracked.data[0].total_tracked;
            const v_budget =  t_budget.data[0].total_budget;

            const percentage_completed = Math.round((v_tracked/v_budget)*100);
            const remaining = Math.max(v_budget-v_tracked,0).toFixed(2);
            const excess = Math.abs(Math.min(v_budget-v_tracked,0).toFixed(2));

            return {...type, footerData:{
              total_tracked:              t_tracked.data[0].total_tracked, 
              total_budget:               t_budget.data[0].total_budget,
              total_percentage_completed: percentage_completed,
              total_remaining:            remaining,
              total_excess:               excess
            }}
          })
          Promise.all(footerData)
            .then((footerData) => {
              // console.log(footerData);
              setDashboardFooterData(footerData);
            })
        })
    }catch(err){
      console.log(err);
    }
  }


  useEffect(() => {
    // dashboard will always get the current year and month first
    fetchDashboardCardData(new Date().getFullYear(), new Date().getMonth() + 1);
    fetchDashboardBodyData(new Date().getFullYear(), new Date().getMonth() + 1);
    fetchDashboardFooterData(new Date().getFullYear(), new Date().getMonth() + 1);
  }, []);

  // reformat fetch result into an object. Previously was an array of objects
  let dashboardData_formatted = {}
  dashboardCardData.map(item => {
    if(item.type_name === "Expenses"){
      dashboardData_formatted[item.type_name + item.expenses_method] = item.total_amount;
    }else{
      dashboardData_formatted[item.type_name] = item.total_amount;
    }
  });

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

      {/* <div className='search'>
      
      </div> */}


      <DashboardCards
        fetchDashboardCardData={fetchDashboardCardData}
        fetchDashboardBodyData={fetchDashboardBodyData}
        fetchDashboardFooterData={fetchDashboardFooterData}
        dashboardData_formatted={dashboardData_formatted}
        dashboardFilterMonths={dashboardFilterMonths}
        dashboardFilterYears={dashboardFilterYears}
      />

      <DashboardBody 
        dashboardBodyData={dashboardBodyData}
        dashboardFooterData={dashboardFooterData}
      />

    </div>
  )
}
