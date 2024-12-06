import React, { useState, useEffect } from "react";
import axios from "axios";
import './ManageRequests.css'

const url = process.env.REACT_APP_API_URL

export default function ManageRequests({ groupId,isOwner }) {
  const [requests, setRequests] = useState([]); 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [error, setError] = useState(""); 

  useEffect(() => {
    fetchRequests(); 
  }, [groupId]);

  //fetch requests
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${url}/group/${groupId}/requests`);
      setRequests(response.data); 
    } catch (err) {
      setError("Failed to load requests.");
    } 
  };

  
  
  // post approve or reject
  const handleRequest = async (accountId, action) => {
    console.log(accountId)
    console.log(action)
    try {
      await axios.patch(`${url}/group/${groupId}/members/${accountId}`, {
        groupId,
        accountId,
        action
      });

      //update requests list, removed 
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.account_id !== accountId)
      );
    } catch (err) {
      setError("Failed to update membership.");
    }
  };

  return (
    <div className="manage-requests">
      {/* <h3>Manage Join Requests</h3>
      {requests.length > 0 ? (
        <ul>
          {requests.map((req) => (
            <li key={req.account_id} className="request-item">
              <span>{req.username}</span>
              <button
                onClick={() => handleRequest(req.account_id, "approve")}
                className="approve-btn"
              >
                Approve
              </button>
              <button
                onClick={() => handleRequest(req.account_id, "reject")}
                className="reject-btn"
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending requests.</p>
      )} */}

      {requests.length > 0 && (
        <div className="floating-button" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
          <span className="arrow">{'>'}</span>
          <span className="badge">{requests.length}</span>
        </div>
      )}
      <div className={`manage-requests-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h3>Requests</h3>
          <button onClick={() => setIsDrawerOpen(false)}>Close</button>
        </div>
        {requests.length > 0 ? (
          <ul>
            {requests.map((req) => (
              <li key={req.account_id} className="request-item">
                <span>{req.username}</span>
                <button
                  onClick={() => handleRequest(req.account_id, 'approve')}
                  className="approve-btn"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRequest(req.account_id, 'reject')}
                  className="reject-btn"
                >
                  Reject
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending requests.</p>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

