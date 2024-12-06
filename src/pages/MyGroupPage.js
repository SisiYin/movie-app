import React, { useState, useEffect } from 'react';
import useUser from '../context/useUser';
import axios from 'axios';
import './MyGroupPage.css'
import { useNavigate } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL

export default function MyGroupPage() {
  const { user } = useUser();
  const [groups, setGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
 

  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${url}/group/user/${user.id}`);
      
      console.log(response.data)
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  // const fetchGroupMembers = async (groupId) => {
  //   try {
  //     const response = await axios.get(`${url}/group/${groupId}`);
  //     console.log(response.data)
  //     return response.data.members; 
  //   } catch (error) {
  //     console.error('Error fetching group details:', error);
  //     alert('Failed to fetch group details.');
  //     return [];
  //   }
  // };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewGroup = async (group) => {
    const groupId=group.id
    // const groupMembers = await fetchGroupMembers(groupId);
    // const isMember = groupMembers.some(member => member.id === user.id);
    // const isOwner = group.owner_id === user.id

    // if (isMember||isOwner) {
      navigate(`/groups/${groupId}`);
    // } else {
    //   alert('Only group members can view this group.');
    // }
  }

  return (
    <div className="my-group-container">
      {/* search and create */}
      <div>
        <input
          type="text"
          placeholder="Search groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* groups list*/}
      <h2>My Groups</h2>
      <div className="group-list">
        {filteredGroups.map((group) => (
          <div className="group-card" key={group.id}>
            <h3 onClick={() => handleViewGroup(group)}>{group.name}</h3>
            <p>Created by: {group.ownername}</p>
            {group.description?(
              <p className='group-description'>Description: {group.description}</p>
            ):(
              <p className='group-description'></p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
