import React from 'react'

import PlannerPeriods from './PlannerPeriods'

export default function PlannerTypes({type, periods}) {

    return (
        <>
            <td className={"row-headers " + type.type_id}>{type.type_name}</td>
            <td className='empty-td'></td>
            <PlannerPeriods periods={periods}/>
        </>
    )
}
