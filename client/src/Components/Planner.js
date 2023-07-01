import React, { useState, useEffect } from 'react'
import axios from 'axios';


import PlannerColumnHeaders from './PlannerColumnHeaders';
import PlannerBodyRow from './PlannerBodyRow';
import PlannerPeriods from './PlannerPeriods';

import '../sass-files/App.scss';
import '../sass-files/Planner.scss';


export default function Planner() {


  // GET BODY DATA
  const [temp, setTemp] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  useEffect(() => {
    const fetchBodyData = () => {
      try{
        const res = axios.get("http://localhost:8800/planner/getTypes");
        res.then((values) => {
          setBodyData(values.data);

          // fetch respective categories here
          const promises = values.data.map(async(item, index) => {
            const res = await axios.get("http://localhost:8800/planner/getCategories/" + item.type_id);
            return {...item, categories:res.data}
          })

          Promise.all(promises)
            .then((result) => {
              console.log("categories: ", result);
              setBodyData(result);
              return result;
            })
            .then((result) => {
              // fetch budgets here
              const outer_promises = result.map((type, index) => {

                const inner_promises = type.categories.map(async(category, index) => {
                  const res = await axios.get("http://localhost:8800/planner/getBudgets/" + category.category_id);
                  // console.log("values: ", values.data);
                  return {...category, budgets:res.data}
                }); // end of inner promise

                Promise.all(inner_promises)
                  .then((result) => {
                    console.log("budgets: ", result);
                    // setTemp(prev => [...prev, {...type, categories:result}]) 
                  })
                  .catch((err) => {console.log("err: ", err);})
              })

              // console.log("temp: ", temp);

            }) 
            .catch((err) => {
              console.log("error: ", err);
            })

        })
      }catch(err){
        console.log(err);
      }
    }
    fetchBodyData();
  }, []);

  // console.log("temp: ", temp);
  // console.log("bodyData: ", bodyData);


  // GET PERIODS
  const [periods, setPeriods] = useState([]);
  useEffect(() => {
    const fetchPeriods = () => {
      try{
        // 01. Fetch Years - Not ASYNC, it has to be synchronous - you need the years before getting the months  
        const res = axios.get("http://localhost:8800/planner/getYears");
        res.then((values) => {

          // 02. Set years to state
          setPeriods(values.data);

          // 03. fetch all respective months for each year - this can be ASYNC
          // map function returns as array of promises
          const promises = values.data.map(async (period, index) => {
            const res = await axios.get("http://localhost:8800/planner/getMonths/" + period.year);
            return {...period, "months":res.data}
          })

          // 04. resolve the array of promises using promise.all()
          Promise.all(promises)
            .then((result)=>{
              // 05. Set results (array, which is what we want) to 'periods' state
              setPeriods(result);
            })
            .catch((err) => {
              console.log("error: ", err);
            })

        })
      }catch(err){
        console.log(err);
      }
    }
    fetchPeriods();
  }, []);




  // // YEAR INCREMENT - 'ADD PERIOD'
  // const [maxYear, setMaxYear] = useState();
  // useEffect(() => {
  //   const fetchMaxYear = async () => {
  //     try{
  //       const res = await axios.get("http://localhost:8800/planner/getMaxYear");
  //       setMaxYear(res.data[0].max_year)
  //     }catch(err){
  //       console.log(err);
  //     }
  //   }
  //   fetchMaxYear();
  // }, []);




  // function addPeriod(maxYear, month){

  //   let year = maxYear + 1;
  //   month = ("0"+month).slice(-2)
  //   let day = "01";
  //   let period_id = year + "-" + month + "-" + day

  //   try{

  //     console.log(period_id);
  //     axios.post("http://localhost:8800/planner/insertPeriod", period_id);
  //     // window.location.reload(false);
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  // function handleAddPeriod(){

  //   console.log("add period clicked", maxYear);
  //   for(let i=1; i<13; i++){
  //     addPeriod(maxYear, i);
  //   }

  // }





  return (
    <div className='component planner'>
      <p className="headers h4">Planner</p>

        <div className='tables-wrapper'>
          {bodyData.map(type => {
            return(
              <>
                <table key={type.type_id} className={'types-table ' + type.type_name}>

                  <thead>
                    <PlannerColumnHeaders type={type} periods={periods}/>
                  </thead>

                  <tbody>
                    { type.categories === undefined ? 
                        <></> : 
                        type.categories.map(category => (
                          // PlannerBodyRow - category name, budgets
                          <PlannerBodyRow category={category}/>
                        ))
                    }
                  </tbody>

                  <tfoot>
                    <tr>
                      <td>total</td>
                      <td className='empty-td'></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className='empty-td'></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td className='empty-td'></td>
                    </tr>
                  </tfoot>
                </table>
                <button className='btn add-category'>Add</button>
                
              </>
            )
          })}
        </div>




        


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

        {/* <button onClick={handleAddPeriod}>Add Period</button> */}

    </div>
  )
}
