import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import './App.css';

import './sass-files/App.scss';
import './Typography.css';

import Planner from './Components/Planner';
import Tracker from './Components/Tracker';
import Dashboard from './Components/Dashboard';
import Error from './Components/Error';


function App() {
  return (
    <Router className="router">

      {/* <section className="typography">
        <div className="container">
            <p className="headers title">This is a title header in a p tag</p>
            <p className="headers h1">This is a h1 header in a p tag</p>
            <p className="headers h2">This is a h2 header in a p tag</p>
            <p className="headers h3">This is a h3 header in a p tag</p>
            <p className="headers h4">This is a h4 header in a p tag</p>
            <p className="headers h5">This is a h5 header in a p tag</p>
            <p className="base-text">This is some base text at 16px/1rem. This should be in a paragraph. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis facilis eveniet repellat consequuntur ipsam porro maiores nesciunt distinctio nisi? Cupiditate officiis maiores qui officia maxime numquam. Impedit unde quaerat doloremque?</p>
            <p className="base-text caption">This is some captions. This should be in a caption only, not a paragraph.</p>
            <p className="base-text smaller-caption">This is honestly some really small captions. This should be in a caption only, not a paragraph.</p>
        </div>
      </section> */}

      <div className="content">

        <nav className='navbar'>

          <div>
            <div className='nav-logo'>
              <p className="base-text">Logo</p>
            </div>

            <div className='nav-links'>
              <Link to="/planner"><p className="base-text">Planner</p></Link>
              <Link to="/tracker"><p className="base-text">Tracker</p></Link>
              <Link to="/"><p className="base-text">Dashboard</p></Link>
            </div>
          </div>
          

          <div className='nav-profile'>
            <p className="base-text">Profile</p>
          </div>
          


        </nav>

        <Routes>
          <Route path="/planner" element={<Planner />}></Route>
          <Route path="/tracker" element={<Tracker />}></Route>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>

      </div>
      
    </Router>
  );
}

export default App;
