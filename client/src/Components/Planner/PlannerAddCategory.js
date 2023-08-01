import React, { useState, useRef } from 'react'
import axios from 'axios';

export default function PlannerAddCategory({
    type,
    formValidation,

    messageCategoryName,
    setMessageCategoryName,

    messageCategoryBudget,
    setMessageCategoryBudget
}) {

    // console.log("type: ", type)
    const [isAdding, setIsAdding] = useState();

    function handleAddCategoryForm(){
        if(isAdding){
            setIsAdding(false)
        }else{
            setIsAdding(true)
        }
    }

    const [userInputs, setUserInputs] = useState(
        {
            type_id: null,
            category_name: "",
            category_budget: ""
        }
    );

    function handleChange(e, type_id){ 
        setUserInputs({ ...userInputs, [e.target.name]:e.target.value, type_id:type_id })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const result = formValidation(userInputs);

        try{
            if(result.valid_category_budget && result.valid_category_name){

                // console.log("userInputs: ", userInputs);
                await axios.post("http://localhost:8800/planner", userInputs);
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
    <>
        {
            isAdding ? 
                <>
                    <div
                        className='add-category-div'
                        type_name={type.type_name}
                        onClick={handleAddCategoryForm}
                    >
                        <button className='btn btn-add-category'>x</button>
                        Close
                    </div>
                    <form 
                        className='form form-add-category'
                        onSubmit={onSubmit}
                    >
                        
                        <div>
                            <input
                                name='category_name'
                                placeholder='enter category'
                                onChange={(e) => {
                                    handleChange(e, type.type_id)
                                }}
                            >
                            </input>
                            <p className='message category-name base-text smaller-caption'>
                                {messageCategoryName}
                            </p>
                        </div>

                        <div>
                            <input
                                name='category_budget'
                                type='number'
                                min='0'
                                placeholder='enter monthly budget'
                                onChange={(e) => {
                                    handleChange(e, type.type_id)
                                }}
                            >
                            </input>
                            <p className='message category-budget base-text smaller-caption'>
                                {messageCategoryBudget}
                            </p>
                        </div>
                        
                        <input type="submit" value="Add"></input>
                    </form>
                </>
            :
                <div
                    className='add-category-div'
                    type_name={type.type_name}
                    onClick={handleAddCategoryForm}
                >
                    <button className='btn btn-add-category'>+</button>
                    Add New {type.type_name}
                </div>
        }
    </>
  )
}
