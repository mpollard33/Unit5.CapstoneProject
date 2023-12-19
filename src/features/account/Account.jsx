import React, { useState, useEffect } from 'react';
import { useGetSingleUserQuery } from './authApi';
import { useParams } from 'react-router-dom';
import { selectCurrentUser, selectUserId } from '../../store/authSlice';
import { useSelector } from 'react-redux';
import './index.css';

const Account = () => {
  const id = useSelector(selectUserId);

  const selectUser = useSelector(selectCurrentUser) || [];

  const usersString = JSON.parse(sessionStorage.getItem('users'));

  const activeUser = usersString.find((user) => user.id === 11);

  if (!activeUser) return <p>No user found...</p>;
  const { username, email, name, address, phone } = activeUser;

  return (
    <div className="account-container">
      <section className="account-information">
        <div className="container">
          <h2 className="account-header">Account Information</h2>
          <p className="account-item">
            <strong>Username:</strong> {activeUser && username}
          </p>
          <p className="account-item">
            <strong>Email:</strong> {activeUser && email}
          </p>
          <p className="account-item">
            <strong>Name:</strong>{' '}
            {activeUser && `${name.firstname} ${name.lastname}`}
          </p>
          <p className="account-item">
            <strong>Address:</strong>
            {activeUser &&
              `${address.number} ${address.street}, ${address.city}, ${address.zipcode}`}
          </p>
          <p className="account-item">
            <strong>Phone:</strong> {activeUser && phone}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Account;
