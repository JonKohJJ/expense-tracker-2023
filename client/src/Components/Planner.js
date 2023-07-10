import React, { useState, useEffect } from 'react'
import axios from 'axios';


import PlannerColumnHeaders from './PlannerColumnHeaders';
import PlannerBodyRow from './PlannerBodyRow';
import PlannerAddCategory from './PlannerAddCategory';
import PlannerUpdateForm from './PlannerUpdateForm';

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

  // add category form validation
  const formValidation = (userInputs) => {

    let validationResult = {

        valid_category_name: false,
        message_category_name: "",

        valid_category_budget: false,
        message_category_budget: ""

    };

    if (userInputs.category_name === ''){
        validationResult.message_category_name = "*empty name";
    }else{
      validationResult.valid_category_name = true;
    }

    if (userInputs.category_budget === ''){
        validationResult.message_category_budget = "*empty budget";
    }else{
      if (userInputs.category_budget.includes(".")){
        if(userInputs.category_budget.split(".")[0].length > 4){
          validationResult.message_category_budget = "*up to '0000";
        }else if(userInputs.category_budget.split(".")[1].length > 2){
          validationResult.message_category_budget = "*only 2.dps";
        }else{
          validationResult.valid_category_budget = true;
        }
      }else{ // does NOT include . - whole number
        if(userInputs.category_budget.length > 4){
          validationResult.message_category_budget = "*up to '0000";
        }else{
          validationResult.valid_category_budget = true;
        }
      }
    }

    return validationResult;
  }
  const [messageCategoryName, setMessageCategoryName] = useState("");
  const [messageCategoryBudget, setMessageCategoryBudget] = useState("");



  // handle update function
  const [updateId, setUpdateId] = useState(-1);
  const handleUpdate = (category_id) => {
    // console.log("handleUpdate: ", category_id);
    setUpdateId(category_id);
  }

  // handle delete function
  const handleDelete = async (category_id) => {
    try{
      await axios.delete("http://localhost:8800/planner/" + category_id);
      window.location.reload(false);
    }catch(err){
      console.log(err);
    }
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
                          updateId === category.category_id ?
                            <PlannerUpdateForm
                              category={category}

                              type={type}
                              formValidation={formValidation}

                              messageCategoryName={messageCategoryName}
                              setMessageCategoryName={setMessageCategoryName}

                              messageCategoryBudget={messageCategoryBudget}
                              setMessageCategoryBudget={setMessageCategoryBudget}
                            />
                          :
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
                  formValidation={formValidation}

                  messageCategoryName={messageCategoryName}
                  setMessageCategoryName={setMessageCategoryName}

                  messageCategoryBudget={messageCategoryBudget}
                  setMessageCategoryBudget={setMessageCategoryBudget}

                />
              </>
            )
          })}
        </div>

    </div>
  )
}
