import React from 'react'

export default function DashboardFilters() {
  return (
    <div className='dashboard-filters'>

        <div className='filter'>
            <p className="base-text caption">Year:</p>
            <select>
                <option selected disabled hidden>chose year</option> 
                <option value='Current Year'>Current Year</option>
                <option value='option-1'>Option 1</option>
                <option value='option-2'>Option 2</option>
                <option value='option-3'>Option 3</option>
            </select>
        </div>
        

        <div className='filter'>
            <p className="base-text caption">Month:</p>
            <select>
                <option selected disabled hidden>choose month</option> 
                <option value='Current Month'>Current Month</option>
                <option value='option-1'>Option 1</option>
                <option value='option-2'>Option 2</option>
                <option value='option-3'>Option 3</option>
            </select>
        </div>
        
    </div>
  )
}
