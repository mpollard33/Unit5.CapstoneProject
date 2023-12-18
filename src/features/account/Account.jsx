import React, { useState, useEffect } from 'react';
import { useGetSingleUserQuery } from './authApi';
import { useParams } from 'react-router-dom';
import { selectCurrentUser, selectUserId } from '../../store/authSlice';
import { useSelector } from 'react-redux';
import './index.css';

const Account = () => {
  const id = useSelector(selectUserId);
  console.log('user id', id);

  const selectUser = useSelector(selectCurrentUser) || [];
  console.log('current user', selectUser, id);

  const usersString = JSON.parse(sessionStorage.getItem('users'));
  console.log('usersString', usersString);

  const activeUser = usersString.find((user) => user.id === 11);
  console.log('activeUser', activeUser);

  const { username, email, name, address } = activeUser;
  if (!activeUser) return <p>No user found...</p>;
  return (
    <div className="account-container">
      <section className="account-information">
        <div className="container">
          <h2 className="account-header">Account Information</h2>
          <p className="account-item">
            <strong>Username:</strong> {activeUser && activeUser.username}
          </p>
          <p className="account-item">
            <strong>Email:</strong> {activeUser && activeUser.email}
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
            <strong>Phone:</strong> {activeUser && activeUser.phone}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Account;
