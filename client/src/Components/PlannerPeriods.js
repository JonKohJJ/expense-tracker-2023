import React from 'react'

export default function PlannerPeriods({periods}) {

    // console.log("periods", periods);

    // {periods.map(period => (
    //     console.log("period: ", period)
    // ))} 

    return (
        <>
            {periods.map(period => {
                return(
                    <>
                    {period.months === undefined ? <></> : 
                        period.months.map(month => (
                            <td key={month.period_id} className={month.period_id}>{month.month_name_short}</td>
                        ))
                    }
                    <td>{period.year}</td>
                    <td className='empty-td'></td>
                    </>
                )
            })}
        </>
    )
}
