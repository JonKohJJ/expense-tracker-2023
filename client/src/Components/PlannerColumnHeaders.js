import React from 'react'

export default function PlannerTypes({type}) {

    return (
        <>
            <td className={"row-headers " + type.type_id}>
                {type.type_name}
            </td>
            <td className={"row-headers " + type.type_id} colSpan={3}>Budget</td>
        </>
    )
}
