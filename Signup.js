// src/Signup.js
import React, { useState } from 'react';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Sample vehicle data (Make and Models)
const vehicleMakes = {
  Toyota: ['Corolla', 'Camry', 'Hilux'],
  Honda: ['Civic', 'Accord', 'CR-V'],
  Ford: ['Focus', 'Fusion', 'Mustang'],
  BMW: ['X5', 'M3', '5 Series'],
  Hyundai: ['Creta', 'Alcazar', 'I20', 'Grand i10 Nios', 'Ioniq 5', 'Kona Electric', 'Verna', 'Tucson', 'Venue', 'Santro (New)', 'Aura', 'Exter', 'Venue N Line', 'Creta N Line', 'I20 N Line'],
  'Maruti-Suzuki': ['XL6', 'Fronx', 'Baleno', 'Brezza', 'Celerio', 'Ciaz', 'Dzire', 'Ertiga', 'Grand Vitara', 'Invicto', 'Jimny', 'S-Presso', 'Swift', 'Wagon-R', 'Alto', 'Alto K-10', 'Ignis'],
};

// Generate vehicle years from 2010 to 2023
const currentYear = new Date().getFullYear();
const vehicleYears = Array.from({ length: currentYear - 2009 }, (_, index) => currentYear - index);

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [drivingHours, setDrivingHours] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  // Handle vehicle make change
  const handleMakeChange = (e) => {
    const selectedMake = e.target.value;
    setVehicleMake(selectedMake);
    setVehicleModel(''); // Reset model when make changes
  };

  // Handle form submission for signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        drivingHours,
        createdAt: serverTimestamp(),
        tripSessions: [],
      });

      alert('User registered successfully');
      navigate('/login'); // Redirect to login page after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {/* Vehicle Make Dropdown */}
        <select value={vehicleMake} onChange={handleMakeChange} required>
          <option value="">Select Vehicle Make</option>
          {Object.keys(vehicleMakes).map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>

        {/* Vehicle Model Dropdown */}
        <select
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
          required
          disabled={!vehicleMake}
        >
          <option value="">Select Vehicle Model</option>
          {vehicleMake &&
            vehicleMakes[vehicleMake].map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
        </select>

        {/* Vehicle Year Dropdown */}
        <select value={vehicleYear} onChange={(e) => setVehicleYear(e.target.value)} required>
          <option value="">Select Vehicle Year</option>
          {vehicleYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Driving Hours Dropdown */}
        <select value={drivingHours} onChange={(e) => setDrivingHours(e.target.value)} required>
          <option value="">Select Driving Hours per Week</option>
          <option value="20-40">20-40 hours</option>
          <option value="40-60">40-60 hours</option>
          <option value="60-80">60-80 hours</option>
          <option value="80+">80+ hours</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Signup;
