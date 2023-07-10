import React, { useState } from 'react'
import axios from 'axios';

export default function PlannerUpdateForm({
  category,
  type,
  formValidation,

  messageCategoryName,
  setMessageCategoryName,

  messageCategoryBudget,
  setMessageCategoryBudget
}) {

  console.log("category: ", category);

  const [userInputs, setUserInputs] = useState(
    {
        category_name: category.category_name,
        category_budget: category.category_budget,
        category_id: category.category_id
    }
  );

  function handleChange(e){ 
    setUserInputs({ ...userInputs, [e.target.name]:e.target.value })
  }

  const onUpdateFormSubmit = async (e) => {
    e.preventDefault();
    const result = formValidation(userInputs);

    try{
        if(result.valid_category_budget && result.valid_category_name){

            // console.log("userInputs: ", userInputs);
            await axios.put("http://localhost:8800/planner/" + userInputs.category_id, userInputs);
            window.location.reload(false);

        }else{
            setMessageCategoryName(result.message_category_name);
            setMessageCategoryBudget(result.message_category_budget);
            return;
        }
    }catch(err){

    }
}


  return (
    <tr className='updating-row'>
        <td>
          <input
              name='category_name'
              placeholder='enter category'
              value={userInputs.category_name}
              onChange={handleChange}
          >
          </input>
            <p className='message category-name base-text smaller-caption'>
                {messageCategoryName}
            </p>
        </td>

        <td>
            <input
                name='category_budget'
                type='number'
                min='0'
                placeholder='enter monthly budget'
                value={userInputs.category_budget}
                onChange={handleChange}
            >
            </input>
            <p className='message category-budget base-text smaller-caption'>
                {messageCategoryBudget}
            </p>
        </td>

        <td>
          <input 
            type="submit" 
            value="Update"
            className='btn-update-category' 
            onClick={onUpdateFormSubmit}
          />
        </td>
    </tr>
  )
}
