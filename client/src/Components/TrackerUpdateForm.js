import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';

export default function TrackerUpdateForm({
    record, 
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

    console.log("messageExpensesMethod: ", messageExpensesMethod);

    // run this code ONCE to fetch categories under a specific type
    useEffect(() => {
        fetchCategories(record.type_id);
    }, []);

    async function onUpdateFormSubmit(e){
        e.preventDefault();

        const result = formValidation(formValues);
        console.log("result: ", result);

        try{
            if(result.valid_date 
                && result.valid_type_id 
                && result.valid_expenses_method 
                && result.valid_category_id
                && result.valid_amount
                && result.valid_details){
                await axios.put("http://localhost:8800/tracker/" + record.record_id, formValues);
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
        record_date: record.record_date_update_format,
        type_id: record.type_id,
        type_name: record.type_name,
        expenses_method: record.expenses_method,
        category_id: record.category_id,
        amount: record.amount.toString(),
        details: record.details
    })

    console.log("formValues: ", formValues);

    function handleChange(e){ 
        if(e.target.name === "type_id"){
            if(e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text === "Expenses"){
                setFormValues({ ...formValues, [e.target.name]:e.target.value, type_name:e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text,category_id:"" })
            }else{
                setFormValues({ ...formValues, [e.target.name]:e.target.value, type_name:e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text, category_id:"", expenses_method:"" })
            }
        }
        else{
            console.log("handleChange: ", e.target);
            setFormValues({ ...formValues, [e.target.name]:e.target.value })
        }
    }

    const ref_expenses_methods = [
        {expenses_method: "Credit"},
        {expenses_method: "Debit"}
    ]

  return (
    <tr className='updating-row'>
        <td>
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
        </td>


        <td>
            <select 
                name='type_id'
                value={formValues.type_id}
                onChange={(e) => {
                    fetchCategories(e.target.value);
                    handleChange(e);
                }}
            >
                {types.map(type => (
                    record.type_name === type.type_name ? 
                        <option key={type.type_id} value={type.type_id} selected>{type.type_name}</option> :
                        <option key={type.type_id} value={type.type_id}>{type.type_name}</option>
                ))}

            </select>
            <p className='message type base-text smaller-caption'>
                {messageType}
            </p>
            {
                // display the expenses method option only if 'Expenses' is selected
                (formValues.type_name === 'Income' || formValues.type_name === 'Savings') ? <></> :
                <>
                    <select
                        name='expenses_method'
                        value={formValues.expenses_method}
                        onChange={handleChange}
                    >
                        <option selected hidden required>select expenses method</option>
                        {ref_expenses_methods.map(method => (
                            record.expenses_method === method.expenses_method ? 
                                <option key={method.expenses_method} value={method.expenses_method} selected>{method.expenses_method}</option> :
                                <option key={method.expenses_method} value={method.expenses_method}>{method.expenses_method}</option>
                        ))}
                    </select>
                    <p className='message expenses_method base-text smaller-caption'>
                        {messageExpensesMethod}
                    </p>
                </>
            }

        </td>


        <td>
            <select
                name='category_id'
                value={formValues.category_id}
                onChange={handleChange}
            >
                <option selected hidden>select category</option> 
                {categories.map(category => (
                    record.category_name === category.category_name ? 
                        <option key={category.category_id} value={category.category_id} selected>{category.category_name}</option> :
                        <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                ))}
            </select>
            <p className='message category base-text smaller-caption'>
                {messageCategory}
            </p>
        </td>


        <td>
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
        </td>


        <td>
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
        </td>


        <td colSpan={2}>
            <input 
                type="submit" 
                value="Update"
                className='btn-update-record' 
                onClick={onUpdateFormSubmit}
            />
        </td>
    </tr>
  )
}
