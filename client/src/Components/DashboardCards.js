import React, {  useEffect, useState } from 'react'
import '../sass-files/Dashboard.scss'

export default function DashboardCards({dashboardCardsData}) {
    
    console.log("dashboardCardsData", dashboardCardsData);
    
  return (
    <div>

        {/* <div className='dashboard-cards-container'>

            {dashboardCardsInformation.map(item => {

                return(

                    <div key={item.type_name} className='card'>

                        {item.type_name === "Expenses (Debit)" ? 
                            <p className="base-text caption">Debit Balance</p> : 
                            
                            item.type_name === "Expenses (Credit)" ? 
                                <p className="base-text caption">Amount charged to Credit Card</p> : 
                                <p className="base-text caption">Total {item.type_name}</p>
                        }
                        

                        {item.type_name === "Expenses (Debit)" ? 
                            <p className="base-text">$placeholder</p> :
                            <p className="base-text">${item.total_amount}</p>
                        }
                        

                        {item.type_name === "Savings" ? 
                            <div>
                                <p className="base-text smaller-caption">You are saving 30% of your income,</p>
                                <p className="base-text smaller-caption">good job!</p>  
                            </div> :

                            item.type_name === "Expenses (Credit)" ? 
                            <p className="base-text smaller-caption">try not to exceed debit balance</p>   :
                            <></>


                            
                        }

                    </div>
                )

            })}

        </div> */}


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
                <p className="base-text caption">Debit Balance</p>
                <p className="base-text">${(dashboardCardsData.Income - dashboardCardsData.Savings) - dashboardCardsData["Expenses (Debit)"]}</p>
            </div>

            <div className='card'>
                <p className="base-text caption">Amount charged to Credit Card</p>
                <p className="base-text">${dashboardCardsData["Expenses (Credit)"]}</p>
            </div>
            
        </div>



    </div>
  )
}
