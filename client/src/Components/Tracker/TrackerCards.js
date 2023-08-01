import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay, faHandPointLeft } from "@fortawesome/free-solid-svg-icons"


export default function TrackerCards({currentDate, lastRecordedDate, daysDifference}) {

  return (
    <div className='tracker-cards-container'>

        <div className='card'>
            <FontAwesomeIcon icon={faCalendarDay} className='card-icons' />
            <div>
                <p className="base-text caption">Today's date</p>
                <p className="headers h5">{currentDate}</p>
            </div>
            <div>
                <p className="base-text smaller-caption">
                    {daysDifference > 1 ? <>{daysDifference} days since last record ({lastRecordedDate})</> : <>{daysDifference} day since last record ({lastRecordedDate})</>}
                </p>
            </div>
        </div>

        <div className='card'>
        </div>

        <div className='card'>
        </div>

        <div className='card'>
        </div>

    </div>
  )
}
