import React, { useState, useEffect } from 'react'
import axios from 'axios';


import PlannerColumnHeaders from './PlannerColumnHeaders';
import PlannerBodyRow from './PlannerBodyRow';
import PlannerAddCategory from './PlannerAddCategory';

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
              setBodyData(result);
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


  
  const [income_adding, setIncome_adding] = useState(false);
  const [savings_adding, setSavings_adding] = useState(false);
  const [expenses_adding, setExpenses_adding] = useState(false);

  const handleAddCategory = (e) => {
    if(e.target.getAttribute("type_name") === "Income"){
      if(income_adding){
        setIncome_adding(false);
      }else{
        setIncome_adding(true);
      }
    }else if(e.target.getAttribute("type_name") === "Savings"){
      if(savings_adding){
        setSavings_adding(false);
      }else{
        setSavings_adding(true);
      }
    }else{
      if(expenses_adding){
        setExpenses_adding(false);
      }else{
        setExpenses_adding(true);
      }
    }
  }

  const handleUpdate = (category_id) => {
    console.log("handleUpdate: ", category_id);
  }

  const handleDelete = (category_id) => {
    console.log("handleDelete: ", category_id);
  }



  return (
    <div className='component planner'>
      <p className="headers h4">Planner</p>

        <div className='tables-wrapper'>
          {bodyData.map(type => {
            return(
              <>
                <table key={type.type_id} className={'types-table ' + type.type_name}>

                  <thead>
                    <PlannerColumnHeaders type={type}/>
                  </thead>

                  <tbody>
                    { type.categories === undefined ? 
                        <></> : 
                        type.categories.map(category => (
                          // PlannerBodyRow - category name, budgets
                          <PlannerBodyRow 
                            category={category} 
                            handleUpdate={handleUpdate} 
                            handleDelete={handleDelete}/>
                        ))
                    }
                  </tbody>

                </table>

                <PlannerAddCategory 
                  type={type} 
                  handleAddCategory={handleAddCategory}
                  income_adding={income_adding}
                  savings_adding={savings_adding}
                  expenses_adding={expenses_adding}
                />

              </>
            )
          })}
        </div>

    </div>
  )
}
