// src/PageNotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import logo from './images/logo_main.png';  // Ensure this logo image exists
import errorImage from './images/error_img_v2.png';  // Ensure this image exists

const PageNotFound = () => {
  const navigate = useNavigate();  

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToLogin = () => {
    navigate('/');
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', margin: 0, fontFamily: 'Arial, sans-serif', backgroundColor: '#eeeeee', color: '#333', position: 'relative' }}>
      {/* Logo */}
      <div className="logo" style={{ position: 'absolute', top: '5px', left: '2px', display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="DriveLink Logo" style={{ height: '75px', marginRight: '10px' }} />
      </div>

      {/* Navigation Links */}
      <div className="nav-links" style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={goToLogin} className="btn" style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', color: '#eeeeee', backgroundColor: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', textDecoration: 'none', display: 'inline-block', margin: '5px' }}>Sign In</button>
        <button onClick={goToSignup} className="btn" style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', color: '#eeeeee', backgroundColor: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', textDecoration: 'none', display: 'inline-block', margin: '5px' }}>Sign Up</button>
      </div>

      {/* Content */}
      <div className="content" style={{ textAlign: 'center', maxWidth: '600px', padding: '20px' }}>
        <img src={errorImage} alt="Error Illustration" style={{ width: '100%', maxWidth: '999px', marginBottom: '20px' }} />
        <div className="title" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>Oh no. We lost this page</div>
        <div className="subtitle" style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>We searched everywhere but couldn't find what you're looking for. Let's find a better place for you to go.</div>
        <button onClick={goToDashboard} className="btn" style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', color: '#eeeeee', backgroundColor: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s', textDecoration: 'none', display: 'inline-block', margin: '5px' }}>Back to homepage</button>
      </div>
    </div>
  );
};

export default PageNotFound;
