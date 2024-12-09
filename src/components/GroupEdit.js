import React, { useState } from 'react';
import axios from 'axios';
import './GroupEdit.css';

const url = process.env.REACT_APP_API_URL;

const GroupEdit = ({ group, onClose, fetchGroupDetails }) => {
  const [name, setName] = useState(group.name);
  const [description, setDescription] = useState(group.description);
  

  const handleSave = async () => {
    try {
      // save group name and description
      await axios.patch(`${url}/group/${group.id}`, {
        name,
        description,
      });

      alert('Group updated successfully!');
      fetchGroupDetails();  
      onClose(); 
    } catch (error) {
      console.error('Failed to update group:', error);
      alert('Failed to update group details.');
    }
  };

  return (
    <>
      <div className="group-edit-overlay" onClick={onClose}></div>
      <div className="group-edit">
        <h2>Edit Group Details</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Group Name"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Group Description"
        ></textarea>
        
        {/* <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        /> */}
        <div>
          <button onClick={handleSave} className="save-button">Save Changes</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </>
  );
};

export default GroupEdit;
