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
        
        <div className='dashboard-title-filter'>
            <div>
                <p className="headers h4">Welcome Back, Jonathan</p>
                <p className="base-text caption">Never lose track of your finances again.</p>
            </div>
             
            <DashboardFilters
                fetchDashboardCardData={fetchDashboardCardData}
                fetchDashboardBodyData={fetchDashboardBodyData}
                fetchDashboardFooterData={fetchDashboardFooterData}
                dashboardFilterMonths={dashboardFilterMonths}
                dashboardFilterYears={dashboardFilterYears}
            />
        </div>

        <div className='dashboard-cards-container'>

            <div className='card'>
                <p className="base-text caption">Total Income</p>
                <div className='amount'>
                    <p className='dollar-sign'>$</p>
                    <p className="headers h5">{dashboardData_formatted.Income === undefined ? 0 : dashboardData_formatted.Income}</p>
                </div>
                
            </div>

            <div className='card'>
                <p className="base-text caption">Total Savings</p>

                <div className='amount'>
                    <p className='dollar-sign'>$</p>
                    <p className="headers h5">{dashboardData_formatted.Savings === undefined ? 0 : dashboardData_formatted.Savings}</p>
                </div>
                

                {((dashboardData_formatted.Savings / dashboardData_formatted.Income )*100).toFixed(2) < 20 
                ? 
                    <div>
                        <p className="base-text smaller-caption">You are saving {((dashboardData_formatted.Savings / dashboardData_formatted.Income )*100).toFixed(2)}% of your income, you can do better!</p>
                        {/* <p className="base-text smaller-caption">you can do better!</p> */}
                    </div>
                :
                    isNaN(((dashboardData_formatted.Savings / dashboardData_formatted.Income )*100).toFixed(2))
                    ?
                        <div>
                            <p className="base-text smaller-caption">You are saving 0% of your income, you can do better!</p>
                            {/* <p className="base-text smaller-caption">you can do better!</p> */}
                        </div>
                    :
                        <div>
                            <p className="base-text smaller-caption">You are saving {((dashboardData_formatted.Savings / dashboardData_formatted.Income )*100).toFixed(2)}% of your income, good job!</p>
                            {/* <p className="base-text smaller-caption">good job!</p> */}
                        </div>
                }
                
            </div>

            <div className='card'>
                <p className="base-text caption">Debit Account Balance</p>
                <div className='amount'>
                    <p className='dollar-sign'>$</p>
                    <p className="headers h5">{
                        isNaN((dashboardData_formatted.Income - dashboardData_formatted.Savings) - dashboardData_formatted["ExpensesDebit"]) 
                        ? 0 
                        : ((dashboardData_formatted.Income - dashboardData_formatted.Savings) - dashboardData_formatted["ExpensesDebit"]).toFixed(2)
                    }</p>
                </div>

            </div>

            <div className='card'>
                <p className="base-text caption">Amount charged to Credit Card</p>

                <div className='amount'>
                    <p className='dollar-sign'>$</p>
                    <p className="headers h5">{dashboardData_formatted["ExpensesCredit"] === undefined ? 0 : dashboardData_formatted["ExpensesCredit"]}</p>
                </div>
                
                
                {(((dashboardData_formatted.Income - dashboardData_formatted.Savings) - dashboardData_formatted["ExpensesDebit"]).toFixed(2))-(dashboardData_formatted["ExpensesCredit"]) > 0
                ? 
                    <div>
                        <p className="base-text smaller-caption">You are left with $
                            {((((dashboardData_formatted.Income - dashboardData_formatted.Savings) - dashboardData_formatted["ExpensesDebit"]).toFixed(2))-(dashboardData_formatted["ExpensesCredit"])).toFixed(2)} in your debit account
                        </p>
                    </div>
                :
                    isNaN((((dashboardData_formatted.Income - dashboardData_formatted.Savings) - dashboardData_formatted["ExpensesDebit"]).toFixed(2))-(dashboardData_formatted["ExpensesCredit"]))
                    ?
                        <div>
                            <p className="base-text smaller-caption">You are left with $0 in your debit account
                            </p>
                        </div>
                    :
                        <div>
                            <p className="base-text smaller-caption">You need $
                                {Math.abs(((((dashboardData_formatted.Income - dashboardData_formatted.Savings) - dashboardData_formatted["ExpensesDebit"]).toFixed(2))-(dashboardData_formatted["ExpensesCredit"])).toFixed(2))} more in your debit account
                            </p>
                            <p className="base-text smaller-caption">
                                to be able to pay for your credit card bills
                            </p>
                        </div>

                }
            
            </div>

        </div>

    </div>
  )
}
