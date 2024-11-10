// src/screens/GroupDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUser from '../context/useUser';

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const url = 'http://localhost:3001'

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get( url + '/groups/groupId', {
          headers: { Authorization: user.token },
        });
        setGroup(response.data);
        setIsMember(true); //is group member
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setIsMember(false); //is not group member
        }
      }
    };
    fetchGroup();
  }, [groupId, user]);

  // 删除小组
  const handleDeleteGroup = async () => {
    try {
      await axios.delete( url + '/groups/groupId', {
        headers: { Authorization: user.token },
      });
      alert('Group has been cancled');
      navigate('/groups');
    } catch (error) {
      console.error('Fail', error);
    }
  };

  return (
    <div>
      {group ? (
        <>
          <h2>{group.name}</h2>
          {isMember ? (
            <>
              <p>You are allowed to visit</p>
              {user.id === group.ownerId && (
                <button onClick={handleDeleteGroup}>Delete Group</button>
              )}
            </>
          ) : (
            <p>You are not group member</p>
          )}
        </>
      ) : (
        <p>Lodading</p>
      )}
    </div>
  );
};

export default GroupDetails;
