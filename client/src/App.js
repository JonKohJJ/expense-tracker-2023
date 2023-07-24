import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowTrendUp, faTableColumns,faChartGantt, faGear, faEllipsisV, faFont } from "@fortawesome/free-solid-svg-icons";

import './sass-files/App.scss';
import profile from './images/profile.jpg';
import logo from './images/logo_transparent.png'
import logo_dark from './images/logo_dark_transparent.png'
import tracked from './images/tracked_transparent.png'

import Planner from './Components/Planner';
import Tracker from './Components/Tracker';
import Dashboard from './Components/Dashboard';
import Savings from './Components/Savings/Savings';

import Typography from './Components/Typography';
import Error from './Components/Error';


function App() {

  // ===== logic to handle active nav links =====

  return (
    <Router className="router">

      <div className="content">

        <nav className='navbar'>

          <div className='nav-bar-top'>

            <div className='nav-logo'>
                {/* <img className='logo' src={logo} />
                <img className='tracked' src={tracked} /> */}
            </div>

            <div className='nav-links-div'>
              <p className='nav-titles'>Dashboard</p>
              <Link className='nav-links active' to="/">
                  <FontAwesomeIcon icon={faHouse} className='nav-icons' />
                  <p className="base-text">Overview</p>
              </Link>
              <Link className='nav-links' to="/savings">
                  <FontAwesomeIcon icon={faArrowTrendUp} className='nav-icons' />
                  <p className="base-text">Savings</p>
              </Link>
              <Link className='nav-links' to="/typography">
                <FontAwesomeIcon icon={faFont} className='nav-icons' />
                <p className="base-text">Typography</p>
              </Link>
            </div>

            <div className='nav-links-div'>
              <p className='nav-titles'>Editor</p>
              <Link className='nav-links' to="/planner">
                  <FontAwesomeIcon icon={faTableColumns} className='nav-icons' />
                  <p className="base-text">Planner</p>
              </Link>
              <Link className='nav-links' to="/tracker">
                  <FontAwesomeIcon icon={faChartGantt} className='nav-icons' />
                  <p className="base-text">Tracker</p>
              </Link>
            </div>

          </div>
          

          <div className='nav-bar-bottom'>

            <div className='ads'></div>
            
            <div className='nav-links-div settings'>
              <Link className='nav-links' to="/">
                  <FontAwesomeIcon icon={faGear} className='nav-icons' />
                  <p className="base-text">Settings</p>
              </Link>
            </div>

            <div className='horizontal-line'></div>

            <div className='profile-div'>

                <div className='user-picture'>
                    <img src={profile} alt="Profile Picture" />
                </div>

                <div className='user-info'>
                    <p className="base-text bold">Jonathan Koh</p>
                    <p className="base-text smaller-caption">jonathan.koh75@gmail.com</p>
                </div>

                <a href='#' className='profile-edit'>
                    <FontAwesomeIcon icon={faEllipsisV} className='nav-icons' />
                </a>
            </div>

          </div>
        
        </nav>

        <Routes>
          <Route path="/planner" element={<Planner />}></Route>
          <Route path="/tracker" element={<Tracker />}></Route>

          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/savings" element={<Savings />}></Route>

          <Route path="/typography" element={<Typography />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>

      </div>
      
    </Router>
  );
}

export default App;
