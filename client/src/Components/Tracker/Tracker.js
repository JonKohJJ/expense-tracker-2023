import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


import '../../sass-files/Tracker.scss';

import TrackerInputForm from './TrackerInputForm';
import TrackerUpdateForm from './TrackerUpdateForm';
import TrackerCards from './TrackerCards';

export default function Tracker() {

  // FETCH ALL RECORDS TO BE DISPLAYED
  const [records, setRecords] = useState([]);
  useEffect(() => {
    const fetchAllRecords = async () => {
      try{
        const res = await axios.get("http://localhost:8800/tracker");
        setRecords(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllRecords();
  }, []);


  // FETCH ALL TYPES - to be passed down to TrackerInputForm & TrackerUpdateForm
  const [types, setTypes] = useState([]);
  useEffect(() => {
    const fetchAllTypes = async () => {
      try{
        const res = await axios.get("http://localhost:8800/tracker/getTypes");
        setTypes(res.data);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllTypes();
  }, []);

  // FETCH ALL CATEGORIES - to be passed down to TrackerInputForm & TrackerUpdateForm
  const [categories, setCategories] = useState([]);
  const fetchCategories = async (type_id) => {
      try{
          const res = await axios.get("http://localhost:8800/tracker/getCategories/" + type_id);
          setCategories(res.data);
      }catch(err){
          console.log(err);
      }
  }


  // INPUT AND UPDATE FORM VALIDATION - they are basically the same thing
  const [messageDate, setMessageDate] = useState("");
  const [messageType, setMessageType] = useState("");
  const [messageExpensesMethod, setMessageExpensesMethod] = useState("");
  const [messageCategory, setMessageCategory] = useState("");
  const [messageAmount, setMessageAmount] = useState("");
  const [messageDetails, setMessageDetails] = useState("");


  // FORM VALIDATION - to be passed down to TrackerInputForm & TrackerUpdateForm
  const formValidation = (userInputs) => {

      let validationResult = {

          valid_date: false,
          message_date: "",

          valid_type_id: false,
          message_type_id: "",

          valid_expenses_method: false,
          message_expenses_method: "",

          valid_category_id: false,
          message_category_id: "",

          valid_amount: false,
          message_amount: "",

          valid_details: false,
          message_details: ""
      };

      if (userInputs.record_date === ''){
          validationResult.message_date = "*empty date";
      }else{
        validationResult.valid_date = true;
      }

      if (userInputs.type_id === ''){
          validationResult.message_type_id = "*empty type";
      }else{
        validationResult.valid_type_id = true;
      }

      if(userInputs.type_name === 'Expenses'){
        
        if(userInputs.expenses_method === null){
          validationResult.message_expenses_method = "*empty expenses method";
        }else{
          validationResult.valid_expenses_method = true;
        }
      }else{
        validationResult.valid_expenses_method = true;
      }

      if (userInputs.category_id === ''){
          validationResult.message_category_id = "*empty category";
      }else{
        validationResult.valid_category_id = true;
      }

      if (userInputs.amount === ''){
          validationResult.message_amount = "*empty amount";
      }else{
        if (userInputs.amount.includes(".")){
          if(userInputs.amount.split(".")[0].length > 4){
            validationResult.message_amount = "*up to '0000";
          }else if(userInputs.amount.split(".")[1].length > 2){
            validationResult.message_amount = "*only 2.dps";
          }else{
            validationResult.valid_amount = true;
          }
        }else{ // does NOT include . - whole number
          if(userInputs.amount.length > 4){
            validationResult.message_amount = "*up to '0000";
          }else{
            validationResult.valid_amount = true;
          }
        }
      }

      if (userInputs.details === ''){
          validationResult.message_details = "*empty details";
      }else{
        validationResult.valid_details = true;
      }

      return validationResult;
  }


  // handle update function
  const [updateId, setUpdateId] = useState(-1);
  function handleUpdate(record_id){
    setUpdateId(record_id);
  }


  // handle delete function
  const handleDelete = async (record_id) => { 
    try{
      await axios.delete("http://localhost:8800/tracker/" + record_id);
      window.location.reload(false);
    }catch(err){
      console.log(err);
    }
  }

  // handle add button - conditional rendering
  const [isToggledAddBtn, SetIsToggledAddBtn] = useState(false);
  const [addBtnContent, SetAddBtnContent] = useState("Add")


  // handle tracker cards information
  const [currentDate, setCurrentDate] = useState();
  const [lastRecordedDate, setLastRecordedDate] = useState();
  const [daysDifference, setDaysDifference] = useState();
  useEffect(() => {
    const fetchTrackerCardsInformation = async () => {
      try{

        const res = await axios.get("http://localhost:8800/tracker/getCardsInformation");
        setCurrentDate(res.data[0].current_date_formatted);
        setLastRecordedDate(res.data[0].last_record_date_formatted);
        setDaysDifference(res.data[0].days_difference);

      }catch(err){
        console.log(err);
      }
    }
    fetchTrackerCardsInformation();
  }, []);


  return (
    <div className='component tracker'>

      <p className="headers h4">Tracker</p>
      
      <TrackerCards 
        currentDate={currentDate} 
        lastRecordedDate={lastRecordedDate}
        daysDifference={daysDifference}
      />

      <button 
          className='btn-add-record' 
          onClick={() => {
            isToggledAddBtn ? SetIsToggledAddBtn(false) : SetIsToggledAddBtn(true);
            isToggledAddBtn ? SetAddBtnContent("Add") : SetAddBtnContent("Close");
          }}>
          {addBtnContent}
      </button>

      {isToggledAddBtn ? <TrackerInputForm 
                            types={types} 
                            fetchCategories={fetchCategories} 
                            categories={categories}
                            formValidation={formValidation}

                            messageDate={messageDate}
                            setMessageDate={setMessageDate}

                            messageType={messageType}
                            setMessageType={setMessageType}

                            messageExpensesMethod={messageExpensesMethod}
                            setMessageExpensesMethod={setMessageExpensesMethod}

                            messageCategory={messageCategory}
                            setMessageCategory={setMessageCategory}

                            messageAmount={messageAmount}
                            setMessageAmount={setMessageAmount}

                            messageDetails={messageDetails}
                            setMessageDetails={setMessageDetails}
                          /> : <></>
      }


    <div className='table-container'>
        <table className='tracker-table'>

        <tr className='table-title'><p className='headers h5'>Transactions</p></tr>
        <tr className='table-headers'>
            <td><p className='base-text smaller-caption'>Date</p></td>
            <td><p className='base-text smaller-caption'>Type</p></td>
            <td><p className='base-text smaller-caption'>Category</p></td>
            <td><p className='base-text smaller-caption'>Amount</p></td>
            <td><p className='base-text smaller-caption'>Details</p></td>
            <td colSpan={2}><p className='base-text smaller-caption'>Actions</p></td>
        </tr>

        <tbody>
          {records.map(record => (

            updateId === record.record_id ? <TrackerUpdateForm 
                                              record={record} 
                                              types={types} 

                                              fetchCategories={fetchCategories}
                                              categories={categories}
                                              formValidation={formValidation}

                                              messageDate={messageDate}
                                              setMessageDate={setMessageDate}

                                              messageType={messageType}
                                              setMessageType={setMessageType}

                                              messageExpensesMethod={messageExpensesMethod}
                                              setMessageExpensesMethod={setMessageExpensesMethod}

                                              messageCategory={messageCategory}
                                              setMessageCategory={setMessageCategory}

                                              messageAmount={messageAmount}
                                              setMessageAmount={setMessageAmount}

                                              messageDetails={messageDetails}
                                              setMessageDetails={setMessageDetails}

                                            /> :

            <tr key={record.record_id}>
              <td><p className="base-text caption">{record.record_date}</p></td>
              <td>
                { record.type_name === 'Expenses' ? 
                    <p className="base-text caption">{record.type_name} <i className="base-text smaller-caption inline"> - {record.expenses_method}</i></p> :
                    <p className="base-text caption">{record.type_name}</p>
                }
              </td>
              <td><p className="base-text caption">{record.category_name}</p></td>
              <td><p className="base-text caption">{record.amount}</p></td>
              <td><p className="base-text caption">{record.details}</p></td>
              <td><p className="base-text caption btn-edit" onClick={() => handleUpdate(record.record_id)}>edit</p></td> 
              <td>
              <Popup trigger=
                  <p className="base-text caption btn-delete">delete</p>
                  position="left center">
                  <div>Are you sure?</div>
                  <button onClick={() => handleDelete(record.record_id)}>Yes, I'm sure</button>
              </Popup>
                {/* <p className="base-text caption btn-delete" onClick={() => handleDelete(record.record_id)}>delete</p> */}
              </td>
            </tr>

            ))}
        </tbody>
          
          
        </table>

    </div>

    
    </div>
  )
}
