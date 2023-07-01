import React from 'react'

export default function DashboardBody({dashboardBodyData}) 
{
    console.log("dashboardBodyData: ", dashboardBodyData);
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
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>

                        </tr>
                    </tfoot>
                </table>
            )
        })}
    </div>
  )
}
