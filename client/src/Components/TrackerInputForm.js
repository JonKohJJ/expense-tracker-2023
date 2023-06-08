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


    const ref_record_date = useRef(null);
    const ref_type_id = useRef(null);
    const ref_category_id = useRef(null);
    const ref_amount = useRef(null);
    const ref_details = useRef(null);

    async function onFormSubmit(e){
        e.preventDefault();

        const userInputs = {
            "record_date": ref_record_date.current.value, 
            "type_id": ref_type_id.current.value, 
            "category_id": ref_category_id.current.value, 
            "amount": ref_amount.current.value, 
            "details": ref_details.current.value
        }

        const result = formValidation(userInputs);
        
        try{
            if(result.validation){
                await axios.post("http://localhost:8800/tracker", userInputs);
                window.location.reload(false);
            }else{
                setMessageDate(result.message_date);
                setMessageType(result.message_type_id);
                setMessageCategory(result.message_category_id);
                setMessageAmount(result.message_amount);
                setMessageDetails(result.message_details);
                return;
            }
        }catch(err){

        }
    }


  return (
    <form className='tracker-input-form'>

        <div className='tracker-input-form-container'>

            <div className='user-input record-date'>
                <input 
                    ref={ref_record_date}
                    type='date'
                    // type="text"
                    // placeholder="select date"
                    // onFocus={
                    //     (e)=> {
                    //         e.currentTarget.type = "date";
                    //         e.currentTarget.focus();
                    //         }
                    // }
                    min="2023-01-01" 
                    max="2030-12-31"
                    required
                >
                </input>
                <p className='message record-date base-text smaller-caption'>
                    {messageDate}
                </p>
            </div>
            

            <div className='user-input type'>
                <select 
                    ref={ref_type_id} 
                    onChange={(e) => { fetchCategories(e.target.value) }}
                >
                    <option selected disabled hidden required>select type</option>
                    {types.map(type => (
                        <option key={type.type_id} value={type.type_id}>{type.type_name}</option>
                    ))}
                </select>
                <p className='message type base-text smaller-caption'>
                    {messageType}
                </p>
            </div>


            <div className='user-input category'>
                <select 
                    ref={ref_category_id}
                >
                    <option selected disabled hidden>select category</option> 
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
                    ref={ref_amount} 
                    placeholder='amount'
                    type='number'
                    min='0'
                    required
                >
                </input>
                <p className='message amount base-text smaller-caption'>
                    {messageAmount}
                </p>
            </div>


            <div className='user-input details'>
                <input 
                    ref={ref_details} 
                    placeholder="details"
                    required
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
