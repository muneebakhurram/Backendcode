import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mainslider from './pages/MainPage/mainpage.jsx';
import HomePage from './pages/Homepage/HomePage.jsx';
import Servicesignup from './pages/Providersignup/Signupp.jsx';
import EditProfile from './pages/Editprofile/Profile.jsx';
import AddService from './pages/Services/AddService.jsx';
import EditProviders from './pages/Providerprofile/ProviderProfile.jsx';

function App() {
  return (
    <Router>
      <div className="App">

        
        <Routes> {/* Replacing Switch with Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/main-slider" element={<Mainslider />} />
          <Route path="/service-signup" element={<Servicesignup />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/add-service" element={<AddService />} />
          <Route path="/edit-provider" element={<EditProviders />} />
          {/* Add more routes as needed */}
        </Routes>

    
      </div>
    </Router>
  );
}

export default App;
