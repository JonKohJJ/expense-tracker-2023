import React from 'react'

export default function TrackerCards({currentDate, lastRecordedDate, daysDifference}) {

  return (
    <div className='tracker-cards-container'>
        <div className='card'>
            <p className="base-text caption">Today's date</p>
            <p className="base-text">{currentDate}</p>
        </div>

        <div className='card'>
            <p className="base-text caption">Date of last record</p>

            <div className='card-flex'>
                <p className="base-text">{lastRecordedDate}</p>
                <p className="base-text caption">
                    {daysDifference > 1 ? <>({daysDifference} days ago)</> : <>({daysDifference} day ago)</>}
                </p>
            </div>
            
        </div>

        {/* <div className='card'>
            <p className="base-text">filters here - year, current month, month</p>
        </div>

        <div className='card'>
            <p className="base-text">amount left / over exceed</p>
        </div> */}

    </div>
  )
}
