import React from 'react'

export default function PlannerBodyRow({category, handleUpdate, handleDelete}) {
  return (

    <tr key={category.category_id}>
        <td className='row-headers categories'><p className="base-text caption">{category.category_name}</p></td>
        <td className='row-headers categories'><p className="base-text caption">{category.category_budget}</p></td>
        <td><p className="base-text caption btn-edit" onClick={() => handleUpdate(category.category_id)}>edit</p></td> 
        <td><p className="base-text caption btn-delete" onClick={() => handleDelete(category.category_id)}>delete</p></td>
    </tr>

  )
}
