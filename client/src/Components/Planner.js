import React, { useState, useEffect } from 'react'
import axios from 'axios';

import '../sass-files/App.scss';
import '../sass-files/Planner.scss';

export default function Planner() {

  // const data = [
  //   {
  //     type_id: 1,
  //     type_name: "Income",
  //     categories: [
  //       { category_id:1, category_name: "Employment (Jonathan)" },
  //       { category_id:2, category_name: "Employment (Joy)" },
  //       { category_id:3, category_name: "Paynow Transfers" }
  //     ],
  //     periods: [
  //       {year: 2023, months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]},
  //       {year: 2024, months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
  //     ],
  //     budgets: [
  //       [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 120, "", 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 120, ""],
  //       [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 120, "", 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 120, ""],
  //       [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 120, "", 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 120, ""]
  //     ],
  //     total: {
  //       name: "Total", totals: [30,30,30,30,30,30,30,30,30,30,30,30,360,"", 30,30,30,30,30,30,30,30,30,30,30,30,360,""]
  //     }
  //   },
  //   {
  //     type_id: 2,
  //     type_name: "Savings",
  //     categories: [
  //       { category_id:1, category_name: "Combined Savings" },
  //       { category_id:2, category_name: "Gear Savings" }
  //     ],
  //     periods: [
  //       {year: 2023, months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]},
  //       {year: 2024, months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
  //     ],
  //     budgets: [
  //       [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 240, "", 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 240, ""],
  //       [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 240, "", 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 240, ""]
  //     ],
  //     total: {
  //       name: "Total", totals: [40,40,40,40,40,40,40,40,40,40,40,40,480,"", 40,40,40,40,40,40,40,40,40,40,40,40,480,""]
  //     }
  //   }
  // ]


  // 01. GET TYPES
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchTypes = async () => {
      try{
        const res = await axios.get("http://localhost:8800/planner/getTypes");
        setData(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchTypes();
  }, []);


  // 02. GET CATEGORIES FOR EACH TYPE
  data.map(async (type, index) => {
    try{
      const res = await axios.get("http://localhost:8800/planner/getCategories/" + type.type_id);
      data[index] = {...data[index], "categories": res.data}
    }catch(err){
      console.log(err);
    }
  })

  // 03. GET YEARS
  const [periods, setPeriods] = useState([]);
  useEffect(() => {
    const fetchYears = async () => {
      try{
        const res = await axios.get("http://localhost:8800/planner/getYears");
        setPeriods(res.data)
      }catch(err){
        console.log(err);
      }
    }
    fetchYears();
  }, []);

  // 04. GET MONTH FOR EACH YEAR
  periods.map(async (period, index) => {

    try{

      const res = await axios.get("http://localhost:8800/planner/getPeriods/" + period.year);
      periods[index] = {...periods[index], "months":res.data}

    }catch(err){
      console.log(err);
    }
  })

  // 04.5. ADD PERIODS TO DATA
  data.map((d, index) => {
    data[index] = {...data[index], "periods": periods}
  });
  // console.log("periods: ", data);



  // YEAR INCREMENT - 'ADD PERIOD'
  const [maxYear, setMaxYear] = useState();
  useEffect(() => {
    const fetchMaxYear = async () => {
      try{
        const res = await axios.get("http://localhost:8800/planner/getMaxYear");
        setMaxYear(res.data[0].max_year)
      }catch(err){
        console.log(err);
      }
    }
    fetchMaxYear();
  }, []);




  function addPeriod(maxYear, month){

    let year = maxYear + 1;
    month = ("0"+month).slice(-2)
    let day = "01";
    let period_id = year + "-" + month + "-" + day

    try{

      console.log(period_id);
      axios.post("http://localhost:8800/planner/insertPeriod", period_id);
      // window.location.reload(false);
    }catch(err){
      console.log(err);
    }
  }

  function handleAddPeriod(){

    console.log("add period clicked", maxYear);
    for(let i=1; i<13; i++){
      addPeriod(maxYear, i);
    }

  }




  // const [rawData, setRawData] = useState([]);

  // useEffect(() => {
  //   const fetchTableData = async (type_name) => {
  //     try{
  //       const res = await axios.get("http://localhost:8800/planner/getTableData/" + type_name);
  //       setRawData(res.data);
  //     }catch(err){
  //       console.log(err);
  //     }
  //   }
  //   fetchTableData("Income");
  // }, []);

  // console.log(rawData);

  







  return (
    <div className='component planner'>
      <p className="headers h4">Planner</p>


        {/* {data.map(item => {
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

              <tr className='table-totals'>
                <td className='row-headers'>{item.total.name}</td>
                <td className='empty-td'></td>

                {item.total.totals.map(item => {
                  return(
                    item === "" ? <td className='empty-td'></td> : <td>{item}</td>
                  )
                })}


              </tr>

            </div>
          )
        })} */}

        <button onClick={handleAddPeriod}>Add Period</button>

    </div>
  )
}
