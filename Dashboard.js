// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (!user) {
        navigate('/login'); // Redirect to login page if not authenticated
        return;
      }

      try {
        // Fetch user data from Firestore using user UID
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setError('No user data found');
        }
      } catch (err) {
        setError('Error fetching user data');
      }
    };

    fetchUserData();
  }, [navigate]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Welcome, {userData.name}</h2>
      <p>Email: {userData.email}</p>
      <p>Vehicle Make: {userData.vehicleMake}</p>
      <p>Vehicle Model: {userData.vehicleModel}</p>
      <p>Vehicle Year: {userData.vehicleYear}</p>
      <p>Driving Hours per Week: {userData.drivingHours}</p>
      {/* Add a graph here once you integrate the data */}
    </div>
  );
};

export default Dashboard;
