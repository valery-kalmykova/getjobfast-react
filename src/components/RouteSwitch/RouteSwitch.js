import React from 'react';
import { Routes, useLocation, Route }from 'react-router-dom';
import HomePage from '../../pages/home';

const RouteSwitch = () => {
  const location = useLocation();    
  
  return (    
    <Routes>               
      <Route exact path="/" element={<HomePage />} />              
    </Routes>    
  )
}

export default RouteSwitch;