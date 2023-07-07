import React, { useRef } from 'react'

export default function DashboardFilters({
    fetchDashboardCardData,
    fetchDashboardBodyData,
    fetchDashboardFooterData,
    dashboardFilterMonths, 
    dashboardFilterYears
}) {

    const ref_filter_year = useRef();
    const ref_filter_month = useRef();
    
    function handleFilters(){
        fetchDashboardCardData(ref_filter_year.current.value, ref_filter_month.current.value);
        fetchDashboardBodyData(ref_filter_year.current.value, ref_filter_month.current.value)
        fetchDashboardFooterData(ref_filter_year.current.value, ref_filter_month.current.value)
    }

  return (
    <div className='dashboard-filters'>

        <div className='filter'>
            <p className="base-text caption">Year:</p>
            <select onChange={handleFilters} ref={ref_filter_year}>

                <option selected value={new Date().getFullYear()}>Current Year</option>

                {dashboardFilterYears.map(year => (
                    <option value={year.year} key={year.year}>{year.year}</option>
                ))}
            </select>
        </div>
        

        <div className='filter'>
            <p className="base-text caption">Month:</p>
            <select onChange={handleFilters} ref={ref_filter_month}>

                <option value={new Date().getMonth() + 1}>Current Month</option>

                {dashboardFilterMonths.map(month => (
                    <option value={month.months_numerical} key={month.months_numerical}>{month.months_string}</option>
                ))}
            </select>
        </div>
        
    </div>
  )
}
