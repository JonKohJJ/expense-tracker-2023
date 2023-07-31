import React from 'react'

export default function DashboardBody({dashboardBodyData, dashboardFooterData}) 
{
    // console.log("dashboardFooterData: ", dashboardFooterData);
    
  return (
    <div className='dashboard-body-container'>
        {dashboardBodyData.map((type, index) => {
            return(
                
                // <div className='dashboard-inner-flex'>
                //     <div className='dashboard-pie-charts'>
                //         <div className='pie-chart'></div>
                //     </div>
                    <div className={`table-container ${type.type_name}`}>
                        <table key={type.type_id} className='dashboard-table-type'>
                            <tr className='table-title'><p className='headers h5'>{type.type_name}</p></tr>
                            <tr className='table-headers'>
                                <td><p className='base-text smaller-caption'>Categories</p></td>
                                <td><p className='base-text smaller-caption'>Tracked</p></td>
                                <td><p className='base-text smaller-caption'>Budget</p></td>
                                <td><p className='base-text smaller-caption'>% Completed</p></td>
                                <td><p className='base-text smaller-caption'>Remaining</p></td>
                                <td><p className='base-text smaller-caption'>Excess</p></td>
                            </tr>
                            <tbody>
                                {type.categories.map((category, index) => {

                                    if(Math.round(category["% completed"]) > 100){
                                        return(
                                            <tr className='category_exceeded'>
                                                <td><p className="base-text caption">{category.category_name}</p></td>
                                                <td><p className="base-text caption">${category.tracked}</p></td>
                                                <td><p className="base-text caption">${category.category_budget}</p></td>
                                                <td className='td-percentage'>
                                                    <p className="base-text smaller-caption">{Math.round(category["% completed"])}%</p>
                                                    <p className='td-percentage-progress-bar' style={{width: `${Math.round(category["% completed"])}%`}}></p>
                                                </td>
                                                <td><p className="base-text caption">${category.remaining}</p></td>
                                                <td><p className="base-text caption">${category.excess}</p></td>
                                            </tr>
                                        )
                                    }else{
                                        return(
                                            <tr>
                                                <td><p className="base-text caption">{category.category_name}</p></td>
                                                <td><p className="base-text caption">${category.tracked}</p></td>
                                                <td><p className="base-text caption">${category.category_budget}</p></td>
                                                <td className='td-percentage'>
                                                    <p className="base-text smaller-caption">{Math.round(category["% completed"])}%</p>
                                                    <p className='td-percentage-progress-bar' style={{width: `${Math.round(category["% completed"])}%`}}></p>
                                                </td>
                                                <td><p className="base-text caption">${category.remaining}</p></td>
                                                <td><p className="base-text caption">${category.excess}</p></td>
                                            </tr>
                                        )

                                    }

                                })}
                            </tbody>                 
                            {
                                dashboardFooterData.map((total, index) => {

                                    if(type.type_id === total.type_id){
                                        // console.log("total: ", total.footerData)
                                        return(
                                            <tfoot>
                                                <tr>
                                                    <td>Total</td>
                                                    <td>${total.footerData.total_tracked}</td>
                                                    <td>${total.footerData.total_budget}</td>
                                                    <td>{total.footerData.total_percentage_completed}%</td>
                                                    <td>${total.footerData.total_remaining}</td>
                                                    <td>${total.footerData.total_excess}</td>
                                                </tr>
                                            </tfoot>
                                        )
                                    }
                                })
                            }
                        </table>

                    </div>
                // </div>
            )
        })}
    </div>
  )
}
