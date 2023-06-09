import React from 'react'

export default function DashboardBody({dashboardBodyData, dashboardFooterData}) 
{
    // console.log("dashboardFooterData: ", dashboardFooterData);
    
  return (
    <div className='dashboard-body-container'>
        {dashboardBodyData.map((type, index) => {
            return( 
                <table key={type.type_id} className='dashboard-table-type'>
                    <thead>
                        <td>{type.type_name}</td>
                        <td>Tracked</td>
                        <td>Budget</td>
                        <td>% Completed</td>
                        <td>Remaining</td>
                        <td>Excess</td>
                    </thead>
                    <tbody>
                        {type.categories.map((category, index) => {

                            if(Math.round(category["% completed"]) > 100){
                                return(
                                    <tr className='category_exceeded' style={{fontWeight:600, color: "red"}}>
                                        <td><p className="base-text caption">{category.category_name}</p></td>
                                        <td><p className="base-text caption">{category.tracked}</p></td>
                                        <td><p className="base-text caption">{category.category_budget}</p></td>
                                        <td className='td-percentage'>
                                            <p className="base-text caption">{Math.round(category["% completed"])}%</p>
                                            <p className='td-percentage-progress-bar' style={{width: `${Math.round(category["% completed"])}%`}}></p>
                                        </td>
                                        <td><p className="base-text caption">{category.remaining}</p></td>
                                        <td><p className="base-text caption">{category.excess}</p></td>
                                    </tr>
                                )
                            }else{
                                return(
                                    <tr>
                                        <td><p className="base-text caption">{category.category_name}</p></td>
                                        <td><p className="base-text caption">{category.tracked}</p></td>
                                        <td><p className="base-text caption">{category.category_budget}</p></td>
                                        <td className='td-percentage'>
                                            <p className="base-text caption">{Math.round(category["% completed"])}%</p>
                                            <p className='td-percentage-progress-bar' style={{width: `${Math.round(category["% completed"])}%`}}></p>
                                        </td>
                                        <td><p className="base-text caption">{category.remaining}</p></td>
                                        <td><p className="base-text caption">{category.excess}</p></td>
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
                                            <td>{total.footerData.total_tracked}</td>
                                            <td>{total.footerData.total_budget}</td>
                                            <td>{total.footerData.total_percentage_completed}%</td>
                                            <td>{total.footerData.total_remaining}</td>
                                            <td>{total.footerData.total_excess}</td>
                                        </tr>
                                    </tfoot>
                                )
                            }
                        })
                    }
                </table>
            )
        })}
    </div>
  )
}
