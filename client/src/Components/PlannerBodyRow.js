import React from 'react'

export default function PlannerBodyRow({category}) {
  return (

    <tr key={category.category_id}>
        <td className='row-headers categories'><p className="base-text caption">{category.category_name}</p></td>
        <td className='empty-td'></td>
    </tr>

  )
}
