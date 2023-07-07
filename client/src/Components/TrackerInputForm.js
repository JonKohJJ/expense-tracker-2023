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

    messageExpensesMethod,
    setMessageExpensesMethod,

    messageCategory, 
    setMessageCategory,

    messageAmount, 
    setMessageAmount,

    messageDetails,
    setMessageDetails

}) {

    async function onFormSubmit(e){
        e.preventDefault();
        const result = formValidation(formValues);

        // console.log("result: ", result)

        try{
            if(result.valid_date 
                && result.valid_type_id 
                && result.valid_expenses_method 
                && result.valid_category_id
                && result.valid_amount
                && result.valid_details){
                await axios.post("http://localhost:8800/tracker", formValues);
                window.location.reload(false);
            }else{
                setMessageDate(result.message_date);
                setMessageType(result.message_type_id);
                setMessageExpensesMethod(result.message_expenses_method);
                setMessageCategory(result.message_category_id);
                setMessageAmount(result.message_amount);
                setMessageDetails(result.message_details);
                return;
            }
        }catch(err){

        }
    }

    const [formValues, setFormValues] = useState({
        record_date: "",
        type_id: "",
        type_name: "",
        expenses_method: null,
        category_id: "",
        amount: "",
        details: ""
    })
    function handleChange(e){ 
        setFormValues({ ...formValues, [e.target.name]:e.target.value })

        if(e.target.name === "type_id"){

            if(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text === "Expenses"){
                setExpensesSelected(true);
                setFormValues({ ...formValues, [e.target.name]:e.target.value, type_name:e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text,category_id:"" })
            }else{
                setExpensesSelected(false);
                setFormValues({ ...formValues, [e.target.name]:e.target.value, type_name:e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text, category_id:"", expenses_method:null })
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
                            {messageExpensesMethod}
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
