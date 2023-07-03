import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

export default function TrackerInputForm({
    types, 
    fetchCategories, 
    categories, 
    formValidation, 

    messageDate, 
    setMessageDate,

    messageType, 
    setMessageType,

    messageCategory, 
    setMessageCategory,

    messageAmount, 
    setMessageAmount,

    messageDetails,
    setMessageDetails

}) {


    // const ref_record_date = useRef(null);
    // const ref_type_id = useRef(null);
    // const ref_expenses_method = useRef(null);
    // const ref_category_id = useRef(null);
    // const ref_amount = useRef(null);
    // const ref_details = useRef(null);

    // async function onFormSubmit(e){
    //     e.preventDefault();

    //     const userInputs = {
    //         "record_date": ref_record_date.current.value, 
    //         "type_id": ref_type_id.current.value, 
    //         "expenses_method": ref_expenses_method.current.value,
    //         "category_id": ref_category_id.current.value, 
    //         "amount": ref_amount.current.value, 
    //         "details": ref_details.current.value
    //     }

    //     const result = formValidation(userInputs);
        
    //     try{
    //         if(result.validation){
    //             await axios.post("http://localhost:8800/tracker", userInputs);
    //             window.location.reload(false);
    //         }else{
    //             setMessageDate(result.message_date);
    //             setMessageType(result.message_type_id);
    //             setMessageCategory(result.message_category_id);
    //             setMessageAmount(result.message_amount);
    //             setMessageDetails(result.message_details);
    //             return;
    //         }
    //     }catch(err){

    //     }
    // }

    async function onFormSubmit(e){
        e.preventDefault();
        console.log("formValues: ", formValues);
    }

    const [formValues, setFormValues] = useState({
        record_date: "",
        type_id: "",
        expenses_method: "",
        category_id: "",
        amount: "",
        details: ""
    })

    function handleChange(e){ 
        setFormValues({ ...formValues, [e.target.name]:e.target.value })

        if(e.target.name === "type_id"){

            if(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text === "Expenses"){
                setExpensesSelected(true);
                setFormValues({ ...formValues, [e.target.name]:e.target.value, category_id:"" })
            }else{
                setExpensesSelected(false);
                setFormValues({ ...formValues, [e.target.name]:e.target.value, category_id:"", expenses_method:"" })
            }
        }
    }

    

    

    // handle expenses method - only when user selects 'Expenses' then this additional form will appear
    const [expensesSelected, setExpensesSelected] = useState(false);

  return (
    <form className='tracker-input-form'>

        <div className='tracker-input-form-container'>

            <div className='user-input record-date'>
                <input 
                    type='date'
                    min="2023-01-01" 
                    max="2030-12-31"
                    name='record_date'
                    value={formValues.record_date}
                    onChange={handleChange}
                >
                </input>
                <p className='message record-date base-text smaller-caption'>
                    {messageDate}
                </p>
            </div>
            

            <div className='user-input type'>
                <select 
                    name='type_id'
                    value={formValues.type_id}
                    onChange={(e) => {
                        fetchCategories(e.target.value);
                        handleChange(e);
                    }}
                >
                    <option selected hidden>select type</option>
                    {types.map(type => (
                        <option key={type.type_id} value={type.type_id}>{type.type_name}</option>
                    ))}
                </select>
                <p className='message type base-text smaller-caption'>
                    {messageType}
                </p>
                {expensesSelected === true ? 
                    <>
                        <select
                            name='expenses_method'
                            value={formValues.expenses_method}
                            onChange={handleChange}
                        >
                            <option selected hidden required>select expenses method</option>
                            <option value='Credit'>Credit</option>
                            <option value='Debit'>Debit</option>
                        </select> 
                        <p className='message expenses_method base-text smaller-caption'>
                            {messageType}
                        </p>
                    </>
                    :
                    <></>
                }
            </div>


            <div className='user-input category'>
                <select 
                    name='category_id'
                    value={formValues.category_id}
                    onChange={handleChange}
                >
                    <option selected hidden>select category</option> 
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                    ))}
                </select>
                <p className='message category base-text smaller-caption'>
                    {messageCategory}
                </p>
            </div>


            <div className='user-input amount'>
                <input 
                    name='amount'
                    value={formValues.amount}
                    onChange={handleChange}
                    placeholder='amount'
                    type='number'
                    min='0'
                >
                </input>
                <p className='message amount base-text smaller-caption'>
                    {messageAmount}
                </p>
            </div>


            <div className='user-input details'>
                <input 
                    name='details'
                    value={formValues.details}
                    onChange={handleChange}
                    placeholder="details"
                >
                </input>
                <p className='message details base-text smaller-caption'>
                    {messageDetails}
                </p>
            </div>


            <input 
                type="submit" 
                value="Submit" 
                className='btn-submit-record' 
                onClick={onFormSubmit}
            />


        </div>
    </form>
  )
}
