import React, { useState, useEffect } from 'react'
import axios from 'axios';

import '../sass-files/App.scss';

import DashboardCards from './DashboardCards';
import DashboardBody from './DashboardBody';

export default function Dashboard() {


  // FETCH Dashboard CARDS Information - to be passed down to DashboardCards component
  const [dashboardCardData, setDashboardCardData] = useState([]);
  const fetchDashboardCardData = async (filtered_year, filtered_month) => {
    try{
      const res = await axios.get("http://localhost:8800/getDashboardCardData/" + filtered_year + "&" + filtered_month );
      setDashboardCardData(res.data);
    }catch(err){
      console.log(err);
    }
  }

  // FETCH Dashboard BODY Information
  const [dashboardBodyData, setDashboardBodyData] = useState([]);
  const fetchDashboardBodyData = (filtered_year, filtered_month) => {
    try{
      // const res = await axios.get("http://localhost:8800/getDashboardBodyData/" + filtered_year + "&" + filtered_month );
      // console.log("Body data: ", res.data);
      // // setDashboardData(res.data);
      
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
            const res = await axios.get("http://localhost:8800/getDashboardFooterData/" + filtered_year + "&" + filtered_month + "&" + type.type_id);
            return {...type, footer_data:res.data}
          })
          Promise.all(footerData)
            .then((footerData) => {
              // console.log("categories (tracked & budget): ", categories);
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
      <p className="headers h4">Dashboard</p>

      <DashboardCards
        fetchDashboardCardData={fetchDashboardCardData}
        fetchDashboardBodyData={fetchDashboardBodyData}
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
