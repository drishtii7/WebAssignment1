import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProfessionalDetailsForm from './components/ProfessionalDetailsForm';
import UserProfile from './components/UserProfile';
import Feedback from './components/Feedback';

const Routing = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<UserProfile />} />
            <Route path="/professional-details" element={<ProfessionalDetailsForm />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Routing;
