import React, { useState, useEffect } from 'react';
import useUser from '../context/useUser';
import axios from 'axios';
import './GroupList.css'
import { useNavigate } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL

const GroupList = () => {
  const { user } = useUser();
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateInput, setShowCreateInput] = useState(false);
  //const [activeTab, setActiveTab] = useState('all'); 

  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(url+'/group');
      
      console.log(response.data)
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const response = await axios.post(url+'/group/newgroup', { name: groupName, ownerId:user.id });
      alert('Group created successfully!');
      setGroupName('');
      fetchGroups(); // Refresh the list
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group.');
    }
  };

  const handleJoinRequest = async (groupId) => {
    console.log(groupId)
    console.log(user.id)
    try {
      await axios.post(`${url}/group/${groupId}/join`,{groupId:groupId,accountId:user.id});
      alert('Join request sent!');
    } catch (error) {
      console.error('Error sending join request:', error);
      alert('Failed to send join request.');
    }
  };

  const filteredGroups = groups.filter((group) =>
    group.group_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewGroup = async (groupId) => {
    navigate(`/groups/${groupId}`)
  }

  return (
    <div className="group-page-container">
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
      <div className='group-list-header'>
        <h2 className="group-title">Groups</h2>
        <button onClick={() => setShowCreateInput(!showCreateInput)} className="create-button">
          {showCreateInput ? 'Cancel' : 'Create'}
        </button>
      </div>
        
      {/* All Or My Joined Groups */}
      {/* <div className="filter-container">
        <label htmlFor="filter">Filter: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Groups</option>
          <option value="joined">My Joined Groups</option>
        </select>
      </div> */}

      {/* 创建新小组输入框 */}
      {showCreateInput && (
        <div className="create-group-container">
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="create-input"
          />
          <button onClick={handleCreateGroup} className="submit-button">
            Create Group
          </button>
        </div>
      )}

      {/* 小组列表 */}
      <div className="group-list">
        {filteredGroups.map((group) => (
          <div className="group-card" key={group.group_id}>
            <h3 onClick={() => handleViewGroup(group.group_id)}>{group.group_name}</h3>
            <p>Created by: {group.owner_name}</p>
            <button onClick={() => handleJoinRequest(group.group_id)}>Join</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;

// import React, { useState } from 'react';
// import CreateGroupModal from '../components/CreateGroupModal';

// const ParentComponent = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [groups, setGroups] = useState([]);

//   const handleGroupCreated = (newGroup) => {
//     setGroups([...groups, newGroup]); // 更新群组列表
//   };

//   return (
//     <div>
//       <button onClick={() => setShowModal(true)}>Create Group</button>
//       {showModal && (
//         <CreateGroupModal
//           onClose={() => setShowModal(false)}
//           onGroupCreated={handleGroupCreated}
//         />
//       )}
//       {/* 这里可以显示群组列表 */}
//     </div>
//   );
// };

// export default ParentComponent;

