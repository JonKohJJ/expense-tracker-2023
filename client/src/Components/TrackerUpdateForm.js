import React, {useEffect, useRef} from 'react';
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

    messageCategory, 
    setMessageCategory,

    messageAmount, 
    setMessageAmount,

    messageDetails,
    setMessageDetails
}) {

    // run this code ONCE to fetch categories under a specific type
    useEffect(() => {
        fetchCategories(record.type_id);
    }, []);

    const ref_update_record_date = useRef(null);
    const ref_update_type_id = useRef(null);
    const ref_update_category_id = useRef(null);
    const ref_update_amount = useRef(null);
    const ref_update_details = useRef(null);

    async function onUpdateFormSubmit(e){
        e.preventDefault();

        const userInputs = {
            "record_date": ref_update_record_date.current.value, 
            "type_id": ref_update_type_id.current.value, 
            "category_id": ref_update_category_id.current.value, 
            "amount": ref_update_amount.current.value, 
            "details": ref_update_details.current.value
        }

        const result = formValidation(userInputs);

        try{
            if(result.validation){
                await axios.put("http://localhost:8800/tracker/" + record.record_id, userInputs);
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
    <tr className='updating-row'>
        <td>
            <input
                ref={ref_update_record_date}
                type='date'
                defaultValue={record.record_date_update_format}
                min="2023-01-01" 
                max="2030-12-31"
                required
            >
            </input>
            <p className='message record-date base-text smaller-caption'>
                {messageDate}
             </p>
        </td>


        <td>
            <select 
                ref={ref_update_type_id} 
                onChange={(e) => { fetchCategories(e.target.value) }}
                required
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
        </td>


        <td>
            <select 
                ref={ref_update_category_id}
                required
            >
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
                ref={ref_update_amount} 
                placeholder='amount'
                defaultValue={record.amount}
                type='number'
                min='0'
                required
            >
            </input>
            <p className='message amount base-text smaller-caption'>
                {messageAmount}
            </p>
        </td>


        <td>
            <input 
                ref={ref_update_details} 
                placeholder="details"
                defaultValue={record.details}
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
