import React, { useState, useEffect } from 'react'
import axios from 'axios';

import '../sass-files/App.scss';
import '../sass-files/Planner.scss';

export default function Planner() {


  // const [headerData, setHeaderData] = useState([]);

  // useEffect(() => {
  //   const fetchYears = async () => {
  //     try{
  //       const res = await axios.get("http://localhost:8800/planner/getYears");
  //       setHeaderData(res.data);
  //     }catch(err){
  //       console.log(err);
  //     }
  //   }
  //   fetchYears();
  // }, []);


  // GET RESPECTIVE MONTHS FOR EACH YEAR
  // headerData.map(async (item, index) => {
  //   try{
  //     const res = await axios.get("http://localhost:8800/planner/getMonths/" + item.year);
  //     headerData[index] = {...headerData[index], "months":res.data}
  //   }catch(err){
  //     console.log(err);
  //   }
  // });


  //console.log("Header Data: ", headerData);


  const data = [
    {
      type_id: 1,
      type_name: "Income",
      categories: [
        { category_id:1, category_name: "Employment (Jonathan)" },
        { category_id:2, category_name: "Employment (Joy)" },
        { category_id:3, category_name: "Paynow Transfers" }
      ],
      periods: [
        {year: 2023, months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]},
        {year: 2024, months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
      ],
      budgets: [
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 120, "", 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 120, ""],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 120, "", 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 120, ""],
        [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 120, "", 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 120, ""]
      ]
    },
    {
      type_id: 2,
      type_name: "Savings",
      categories: [
        { category_id:1, category_name: "Combined Savings" },
        { category_id:2, category_name: "Gear Savings" }
      ],
      periods: [
        {year: 2023, months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]},
        {year: 2024, months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
      ],
      budgets: [
        [20, 20, 20, 20, 20, 2000.54, 20, 20, 20, 20, 20, 20, 240, "", 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 240, ""],
        [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 240, "", 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 240, ""]
      ]
    }
  ]

  // X categories
  // Y years

  // BUDGETS / X of Sub Arrays / Y*14 VALUES in each Sub Array





  return (
    <div className='component planner'>
      <p className="headers h4">Planner</p>


        {data.map(item => {
          console.log(item);
          return(
            <div key={item.type_id} className='type-div'>

              <tr className='column-headers'>
                <td className='row-headers'>{item.type_name}</td>
                <td className='empty-td'></td>

                {item.periods.map(period => {

                  return(
                    <div key={period.year} className='period-div'>
                      {period.months.map(month => (
                        <td>{month}</td>  
                      ))}
                      <td>{period.year}</td>
                      <td className='empty-td'></td>
                    </div>
                  )

                })}
              </tr>

              {item.categories.map((category, index) => {

                return(
                  <tr className='table-body-row'>

                    <td className='row-headers'><p className="base-text caption">{category.category_name}</p></td>
                    <td className='empty-td'></td>

                    {item.budgets[index].map((budget, i) => (
                        budget === "" ? 
                          <td key={"empty-key"} className='empty-td'></td> : 
                          <td key={budget}><p className="base-text caption">{budget}</p></td>
                    ))}
              
                  </tr>
                )

              })}

              <div className='table-totals'>

              </div>

            </div>
          )
        })}

    </div>
  )
}
