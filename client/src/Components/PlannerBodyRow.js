import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function PlannerBodyRow({category, handleUpdate, handleDelete}) {
  return (

    <tr key={category.category_id}>
        <td className=''><p className="base-text caption">{category.category_name}</p></td>
        <td className=''><p className="base-text caption">{category.category_budget}</p></td>
        <td><p className="base-text caption btn-edit" onClick={() => handleUpdate(category.category_id)}>edit</p></td> 
        <td>
          {
            category.record_count === 1 ? 
                <Popup trigger=
                <p className="base-text caption btn-delete">delete</p>
                  position="right center">
                  <div>Are you sure? {category.record_count} record will be delete.</div>
                  <button onClick={() => handleDelete(category.category_id)}>Proceed</button>
                </Popup>
            :
                <Popup trigger=
                <p className="base-text caption btn-delete">delete</p>
                  position="right center">
                  <div>Are you sure? {category.record_count} records will be delete.</div>
                  <button onClick={() => handleDelete(category.category_id)}>Proceed</button>
                </Popup>
          }
        </td>
    </tr>

  )
}
