import React from 'react'
import '../sass-files/Dashboard.scss'

import DashboardFilters from './DashboardFilters';

export default function DashboardCards({dashboardCardsData}) {
    
    console.log("dashboardCardsData", dashboardCardsData);
    
  return (
    <div>

        <div className='dashboard-cards-container'>

            <div className='card'>
                <p className="base-text caption">Total Income</p>
                <p className="base-text">${dashboardCardsData.Income}</p>
            </div>

            <div className='card'>
                <p className="base-text caption">Total Savings</p>
                <p className="base-text">${dashboardCardsData.Savings}</p>
                <div>
                    <p className="base-text smaller-caption">You are saving {((dashboardCardsData.Savings / dashboardCardsData.Income )*100).toFixed(2)}% of your income,</p>
                    <p className="base-text smaller-caption">good job!</p>
                </div>
            </div>

            <div className='card'>
                <p className="base-text caption">Debit Account Balance</p>
                <p className="base-text">${(dashboardCardsData.Income - dashboardCardsData.Savings) - dashboardCardsData["Expenses (Debit)"]}</p>
            </div>

            <div className='card'>
                <p className="base-text caption">Amount charged to Credit Card</p>
                <p className="base-text">${dashboardCardsData["Expenses (Credit)"]}</p>
            </div>

            <div>
                <DashboardFilters />
            </div>
            
        </div>

    </div>
  )
}
