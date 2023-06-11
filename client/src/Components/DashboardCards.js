import React from 'react'
import '../sass-files/Dashboard.scss'

import DashboardFilters from './DashboardFilters';

export default function DashboardCards({
    fetchDashboardData,
    dashboardData_formatted, 
    dashboardFilterMonths, 
    dashboardFilterYears
}) {

  return (
    <div>
        <div className='dashboard-cards-container'>

            <div className='card'>
                <p className="base-text caption">Total Income</p>
                <p className="base-text">${dashboardData_formatted.Income === undefined ? 0 : dashboardData_formatted.Income}</p>
            </div>

            <div className='card'>
                <p className="base-text caption">Total Savings</p>
                <p className="base-text">${dashboardData_formatted.Savings === undefined ? 0 : dashboardData_formatted.Savings}</p>
                <div>
                    <p className="base-text smaller-caption">You are saving {((dashboardData_formatted.Savings / dashboardData_formatted.Income )*100).toFixed(2)}% of your income,</p>
                    <p className="base-text smaller-caption">good job!</p>
                </div>
            </div>

            <div className='card'>
                <p className="base-text caption">Debit Account Balance</p>
                <p className="base-text">${
                    isNaN(((dashboardData_formatted.Income - dashboardData_formatted.Savings) - dashboardData_formatted["Expenses (Debit)"])) ? 0 : ((dashboardData_formatted.Income - dashboardData_formatted.Savings) - dashboardData_formatted["Expenses (Debit)"])
                }</p>
            </div>

            <div className='card'>
                <p className="base-text caption">Amount charged to Credit Card</p>
                <p className="base-text">${dashboardData_formatted["Expenses (Credit)"] === undefined ? 0 : dashboardData_formatted["Expenses (Credit)"]}</p>
            </div>

            <div>
                <DashboardFilters
                    fetchDashboardData={fetchDashboardData}
                    dashboardFilterMonths={dashboardFilterMonths}
                    dashboardFilterYears={dashboardFilterYears}
                />
            </div>
            
        </div>

    </div>
  )
}
