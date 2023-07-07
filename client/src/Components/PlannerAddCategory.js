import React, { useState } from 'react'

export default function PlannerAddCategory({
    type, 
    handleAddCategory,
    income_adding,
    savings_adding,
    expenses_adding
}) {

    console.log(income_adding, savings_adding, expenses_adding);
  return (
    <>
        <div
            className='add-category-div'
            type_name={type.type_name}
            onClick={handleAddCategory}
        >
            <button className='btn btn-add-category'>+</button>
            Add New {type.type_name}
        </div>

        {
            
        }


        {/* <form 
            className='form form-add-category'
            type_id={type.type_id}
        >
            <input
                placeholder='enter category'
            >

            </input>
            <input
                placeholder='enter monthly budget'
            >
            </input>
        </form> */}
    </>
  )
}
