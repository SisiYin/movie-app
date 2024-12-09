import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from '../context/useUser';
import dayjs from 'dayjs';
import './MyAccountPage.css'; 

const url = process.env.REACT_APP_API_URL

const MyAccountPage = () => {
  const { user } = useUser();
  const [base64Image,setBase64Image] = useState('')
  const [account, setAccount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [username,setUsername] = useState('')
  const [country,setCountry] = useState('')
  const [gender,setGender] = useState('')
  const [birthday,setBirthday] = useState('')

  useEffect(() => {
    fetchAccountInfo();
    fetchUserAvatar()
  }, []);

  const fetchAccountInfo = async () =>{
    try{
      const response = await axios.get(`${url}/user/${user.id}/account`)
      console.log(response.data[0])
      setAccount(response.data[0])
      setUsername(response.data[0].username);
      setCountry(response.data[0].country);
      setGender(response.data[0].gender);
      setBirthday(response.data[0].birthday);

    }catch (error) {
      console.error('Error fetching share info:', error);
    }
  }

  const fetchUserAvatar = async () => {
    try {
      const response = await axios.get(`${url}/user/${user.id}/avatar`);
      console.log(response.data.base64Image)
      setBase64Image(response.data.base64Image);
    } catch (error) {
      console.error('Error fetching user avatar:', error);
    }
  };
  
  //upload avatar
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('accountId', user.id);

    try {
      await axios.post(`${url}/user/${user.id}/uploadavatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchUserAvatar()
      alert('Avatar uploaded successfully!'); 
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload avatar.');
    }
  };      

  const handleSave = async () => {
    try {
      // save group name and description
      await axios.patch(`${url}/user/${user.id}/editaccount`, {username,country,gender,birthday}, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('Account updated successfully!');
      setIsEditing(false)
      fetchAccountInfo();  
    } catch (error) {
      console.error('Failed to update account:', error);
      alert('Failed to update account information.');
    }
  };

  return (
    <div className="container">
      <label htmlFor="avatar-upload">
        <img
          src={base64Image|| 'default-avatar.png'}
          alt={account.username}
          className="user-avatar"
          style={{ cursor: 'pointer' }}
        />
      </label>
      <input
        type="file"
        name="image"
        id="avatar-upload"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleAvatarUpload}
      />
      <h1>My Account</h1>
      <div className="form-group">
        <label>Account ID:</label>
          <input type="text" value={account.id} readOnly className="read-only" />
      </div>
      <div className="form-group">
        <label>Username:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            <input type="text" value={account.username} readOnly className="read-only" />
          )}
      </div>
      <div className="form-group">
        <label>Email:</label>
          <input type="text" value={account.email} readOnly className="read-only" />
      </div>
      <div className="form-group">
        <label>Country:</label>
        {isEditing ? (
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        ) : (
          <input type="text" value={account.country} readOnly className="read-only" />
        )}
      </div>
      <div className="form-group">
        <label>Gender:</label>
        {isEditing ? (
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        ) : (
          <input type="text" value={account.gender} readOnly className="read-only" />
        )}
      </div>
      <div className="form-group">
                <label>Birthday:</label>
                {isEditing ? (
                    <input
                        type="date"
                        name="birthday"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                ) : (
                    <input type="text" value={dayjs(account.birthday).format('YYYY-MM-DD')} readOnly className="read-only" />
                )}
            </div>
            <div className="button-group">
                {isEditing ? (
                    <>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                )}
            </div>
        </div>
    );
};

export default MyAccountPage;

