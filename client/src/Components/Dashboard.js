import React, { useState, useEffect } from 'react'
import axios from 'axios';

import '../sass-files/App.scss';

import DashboardCards from './DashboardCards';

export default function Dashboard() {


  // FETCH Dashboard Cards Information - to be passed down to DashboardCards component
  const [dashboardCardsInformation, setDashboardCardsInformation] = useState([]);
  useEffect(() => {
    const fetchDashboardCardsInformation = async () => {
      try{
        const res = await axios.get("http://localhost:8800/getDashboardCardsInformation");
        setDashboardCardsInformation(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchDashboardCardsInformation();
  }, []);

  // reformat fetch result into an object. Previously was an array of objects
  let dashboardCardsData = {}
  dashboardCardsInformation.map(item => {
    dashboardCardsData[item.type_name] = item.total_amount;
  });

  // add debit balance to the object
  dashboardCardsData["debit_balance"] = (dashboardCardsData["Income"] - dashboardCardsData["Savings"]) - dashboardCardsData["Expenses (Debit)"]

  return (
    <div className='component dashboard'>
      <p className="headers h4">Dashboard</p>

      <DashboardCards 
        dashboardCardsData={dashboardCardsData}
      />

    </div>
  )
}
