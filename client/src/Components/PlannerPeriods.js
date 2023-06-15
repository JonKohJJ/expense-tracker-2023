import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function PlannerPeriods({periods}) {

    // console.log("periods", periods);

    // {periods.map(period => (
    //     console.log("period: ", period)
    // ))} 

    return (
        <div className='periods'>
            {periods.map(period => {
                return(
                    <table key={period.year} className='period'>  
                        <tr>
                            {period.months === undefined ? <></> : 
                                period.months.map(month => (
                                    <td key={month.period_id}>{month.month_name_short}</td>
                                ))
                            }
                            <td>{period.year}</td>
                        </tr>
                    </table>
                )
            })}
        </div>
    )
}
