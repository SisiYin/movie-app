import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from '../context/useUser';
import {useNavigate} from 'react-router-dom';
import './GroupSelection.css'

const url = process.env.REACT_APP_API_URL

const GroupSelectionModal = ({ movie, onClose }) => {
  const { user } = useUser();
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    fetchUserGroups();
  }, []);

  const fetchUserGroups = async () => {
    try {
      //get user's group
      const response = await axios.get(`${url}/group/user/${user.id}`);
      console.log(response.data)
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching user groups:', error);
    }
  };

  const handleAddMovieToGroup = async () => {
    if (!selectedGroupId) {
      alert('Chose one group');
      return;
    }

    try {
      
      await axios.post(`${url}/group/${selectedGroupId}/addmovie`, {
        userId:user.id,
        contentType: 'movie',
        contentId: movie.id,
        description: description
      });

      alert('Add movie to group successfully!');
      navigate(`/groups/${selectedGroupId}`) ; // 
    } catch (error) {
      console.error('Error adding movie to group:', error);
      alert('Fail to add movie to group, please try again');
    }
  };

  return (
    <div className="group-selection">
      <div className="modal-content">
        <h2>Chose one group to add: {movie.title}</h2>
        <select
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(e.target.value)}
        >
          <option value="">chose one group</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
        <textarea
          className="description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description for this movie (optional)"
          ></textarea>
        
        <div className="modal-actions">
          <button className='add-button' onClick={handleAddMovieToGroup} disabled={!selectedGroupId}>Comfirm</button>
          <button className='cancle-button' onClick={onClose}>Cancle</button>
        </div>
      </div>
    </div>
  );
};

export default GroupSelectionModal;
