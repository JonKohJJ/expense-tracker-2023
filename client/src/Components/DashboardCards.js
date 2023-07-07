import React from 'react'
import '../sass-files/Dashboard.scss'

import DashboardFilters from './DashboardFilters';

export default function DashboardCards({
    fetchDashboardCardData,
    fetchDashboardBodyData,
    fetchDashboardFooterData,
    dashboardData_formatted, 
    dashboardFilterMonths, 
    dashboardFilterYears
}) {

    // console.log("dashboardData_formatted: ", dashboardData_formatted);

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

                {((dashboardData_formatted.Savings / dashboardData_formatted.Income )*100).toFixed(2) < 20 
                ? 
                    <div>
                        <p className="base-text smaller-caption">You are saving {((dashboardData_formatted.Savings / dashboardData_formatted.Income )*100).toFixed(2)}% of your income,</p>
                        <p className="base-text smaller-caption">you can do better!</p>
                    </div>
                :
                    isNaN(((dashboardData_formatted.Savings / dashboardData_formatted.Income )*100).toFixed(2))
                    ?
                        <div>
                            <p className="base-text smaller-caption">You are saving 0% of your income,</p>
                            <p className="base-text smaller-caption">good job!</p>
                        </div>
                    :
                        <div>
                            <p className="base-text smaller-caption">You are saving {((dashboardData_formatted.Savings / dashboardData_formatted.Income )*100).toFixed(2)}% of your income,</p>
                            <p className="base-text smaller-caption">good job!</p>
                        </div>
                }
                
            </div>

            <div className='card'>
                <p className="base-text caption">Debit Account Balance</p>
                <p className="base-text">${
                    isNaN((dashboardData_formatted.Income - dashboardData_formatted.Savings) - dashboardData_formatted["ExpensesDebit"]) ? 0 : (dashboardData_formatted.Income - dashboardData_formatted.Savings) - dashboardData_formatted["ExpensesDebit"]
                }</p>
            </div>

            <div className='card'>
                <p className="base-text caption">Amount charged to Credit Card</p>
                <p className="base-text">${dashboardData_formatted["ExpensesCredit"] === undefined ? 0 : dashboardData_formatted["ExpensesCredit"]}</p>
            </div>

            <div>
                <DashboardFilters
                    fetchDashboardCardData={fetchDashboardCardData}
                    fetchDashboardBodyData={fetchDashboardBodyData}
                    fetchDashboardFooterData={fetchDashboardFooterData}
                    dashboardFilterMonths={dashboardFilterMonths}
                    dashboardFilterYears={dashboardFilterYears}
                />
            </div>
            
        </div>

    </div>
  )
}
