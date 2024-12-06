import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUser from '../context/useUser';
import axios from 'axios';
import dayjs from 'dayjs';
import ManageRequests from '../components/ManageRequest';
import GroupEdit from '../components/GroupEdit'
import './GroupPage.css';
import MyFavoritesList from '../components/MyFavoritesList';
import ShowtimeList from '../components/ShowtimeList';
//import DisplayCustomData from '../components/DisplayCustomData';

const url = process.env.REACT_APP_API_URL

const GroupPage = () => {
  const { groupId } = useParams();
  const { user } = useUser();
  const [group, setGroup] = useState('');
  const [members, setMembers] = useState([]);
  const [groupContent, setGroupContent] = useState([]);
  const [movieContent, setMovieContent] = useState([]);
  const [showtimeContent, setShowtimeContent] = useState([]);
  const [activeTab, setActiveTab] = useState('movie');
  const [isEditing, setIsEditing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroupDetails();
    fetchGroupContent();
    fetchShowtimeContent();
  }, [groupId]);

  useEffect(() => {
    fetchMovieDetails();
  }, [groupContent]);

  const fetchGroupDetails = async () => {
    try {
      const response = await axios.get(`${url}/group/${groupId}`);
      console.log(response.data)
      setGroup(response.data.groupDetails);
      setMembers(response.data.members);
      if (response.data.groupDetails.owner_id === user.id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } catch (error) {
      console.error('Error fetching group details:', error);
      alert('Failed to fetch group details.');
    }
  };

  //get content from customs
  const fetchGroupContent = async () => {
    try {
      const response = await axios.get(`${url}/group/${groupId}/movies`);
      setGroupContent(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching group content:', error);
      alert('Failed to fetch group content.');
    }
  };
  console.log(groupContent)
   // fecth datail data by contentId 
  const fetchMovieDetails = async () => {
    try {
      const moviePromises = groupContent
        .filter((content) => content.content_type === 'movie')
        .map((content) =>
          axios.get(`https://api.themoviedb.org/3/movie/${content.content_id}?api_key=54c539f0a2dca863d152652c08d28924`)
        );

      const movieResponses = await Promise.all(moviePromises);
      const movieDetails = movieResponses.map((res, index) => ({
        ...res.data,
        username: groupContent[index].username,
        description: groupContent[index].description,
        added_by: groupContent[index].added_by,
        created_at: groupContent[index].created_at
      }));
      

      setMovieContent(movieDetails);
      console.log(movieDetails)
    } catch (error) {
      console.error('Error fetching movie details:', error);
      alert('Failed to fetch movie details.');
    }
  };
  
  const fetchShowtimeContent = async () => {
    try {
      const response = await axios.get(`${url}/group/${groupId}/showtimes`);
      setShowtimeContent(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching showtime content:', error);
      alert('Failed to fetch showtime content.');
    }
  };
  

  const handleRemoveGroup = async () => {
    if (!window.confirm('Are you sure you want to delete this group?')) return;
    try {
      await axios.delete(`${url}/group/${groupId}/delete`);
      alert('Group removed successfully!');
      navigate('/groups');
    } catch (error) {
      console.error('Error removing group:', error);
      alert('Failed to remove group.');
    }
  };

  const handleLeaveGroup = async (user) => {
    console.log(user.id)
    if (!window.confirm('Are you sure you want to leave this group?')) return;
    try {
      await axios.delete(`${url}/group/${groupId}/members/${user.id}/leave`);
      alert('leave group successfully!');
      navigate('/groups');
    }catch (error) {
      console.error('Error leaving group:', error);
      alert('Failed to leave group.');
    }
  };

  const handleRemoveMember = async (accountId) => {
    try {
      await axios.delete(`${url}/group/${groupId}/members/${accountId}/delete`);
      alert('Member removed successfully!');
      fetchGroupDetails();
    } catch (error) {
      console.error('Error removing member:', error);
      alert('Failed to remove member.');
    }
  };

  const handleAddMovie = () => {
    navigate('/'); // Redirect to movies page with a parameter to add to group
  };

  const handleAddShowtime = () => {
    navigate(`/showtimes?addToGroup=${group.id}`); // Redirect to showtimes page with a parameter to add to group
  };

  return (
    <div className="group-page">
      <div className="group-header">
        <img
          src={group.image_url || 'default_image.png'}
          alt={group.name}
          className="group-image"
        />
        <div className="group-header-info">
          <h1>{group.name}</h1>
          <p>Description: {group.description}</p>
          <h3>Created by: {group.owner_name}</h3>
          <span>created at: {dayjs(group.created_at).format('YYYY-MM-DD')}</span>
        </div>
      </div>

      <div className="button-container">
        {isOwner ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="button button-edit"
            >
              Edit Group
            </button>
            <button
              onClick={handleRemoveGroup}
              className="button button-delete"
            >
              Delete Group
            </button>
          </>
        ) : (
          <button
            onClick={()=>handleLeaveGroup(user)}
            className="button button-leave"
          >
            Leave Group
          </button>
        )}
      </div>

      {isEditing && (
        <GroupEdit
          group={group}
          onClose={() => setIsEditing(false)}
          fetchGroupDetails={fetchGroupDetails}
        />
      )}

      <div className="members-section">
        <h2>Members</h2>
        <ul className="member-list">
          {members.map((member) => (
            <li key={member.id}>
              <span className="member-name">{member.username}</span>
              {isOwner && member.id !== user.id && (
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {isOwner && <ManageRequests groupId={groupId} />}

      {/* group content section */}
      <h2>Custom Data</h2>
      
      <div className="group-actions">
        <button onClick={handleAddMovie}>Add Movie</button>
        <button onClick={handleAddShowtime}>Add Showtime</button>
      </div>
      
      {/* Tabs for Movie and Showtime */}
      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'movie' ? 'active' : ''}`}
          onClick={() => setActiveTab('movie')}
        >
          Movies
        </button>
        <button
          className={`tab-button ${activeTab === 'showtime' ? 'active' : ''}`}
          onClick={() => setActiveTab('showtime')}
        >
          Showtimes
        </button>
      </div>
      
      {activeTab === 'movie' && (
        <div>
          <h2>Movies in Group</h2>
          <ul>
            {movieContent.length > 0 ? (
              movieContent.map((movie) => (
                <li key={movie.id} className="movie-content-item">
                  <div className="content-header">
                    <span className="username"><strong>{movie.username}</strong></span>
                    <span className="created-at">Added at: {dayjs(movie.created_at).format('YYYY-MM-DD')}</span>
                  </div>
                  <div className="content-description">
                    <span>{movie.description}</span>
                  </div>
                  <MyFavoritesList movie={movie} />
                </li>
              ))
            ) : (
            <p>No content added yet.</p>
            )}
          </ul>
        </div>
      )}
      

      {activeTab === 'showtime' && (
        <div>
        <h2>Movies in Group</h2>
        <ul>
          {showtimeContent.length > 0 ? (
            showtimeContent.map((showtime) => (
              <ShowtimeList showtime={showtime} />
            ))
          ) : (
          <p>No content added yet.</p>
          )}
        </ul>
      </div> 
      )}
    </div>
  );
};

export default GroupPage;

// import React, { useState, useEffect } from 'react';
// import GroupMembersList from '../components/GroupMembersList';
// // import JoinRequests from '../components/JoinRequests';
// // import AddInformation from '../components/AddInformation';
// import axios from 'axios';

// const url = process.env.REACT_APP_API_URL

// function GroupPage({ groupId }) {
//   const [group, setGroup] = useState({});
//   const [members, setMembers] = useState([]);
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     axios.get(`${url}/group/${groupId}`).then((res) => setGroup(res.data));
//     //axios.get(`/groups/${groupId}/members`).then((res) => setMembers(res.data));
//     // axios.get(`/groups/${groupId}/join`).then((res) => setRequests(res.data));
//   }, [groupId]);

//   const handleRemove = (memberId) => {
//     // axios.delete(`${url}/group/${groupId}/members/${memberId}`).then(() =>
//     //   setMembers(members.filter((member) => member.id !== memberId))
//     // );
//   };

//   const handleLeave = () => {
//     //axios.delete(`/groups/${groupId}/members/self`).then(() => alert('You left the group!'));
//   };

//   // const handleApprove = (requestId) => {
//   //   axios.post(`/groups/${groupId}/manage/${requestId}`, { action: 'approve' }).then(() =>
//   //     setRequests(requests.filter((req) => req.id !== requestId))
//   //   );
//   // };

//   // const handleReject = (requestId) => {
//   //   axios.post(`/groups/${groupId}/manage/${requestId}`, { action: 'reject' }).then(() =>
//   //     setRequests(requests.filter((req) => req.id !== requestId))
//   //   );
//   // };

//   // const handleAddInfo = (info) => {
//   //   axios.post(`/groups/${groupId}/information`, info).then(() => alert('Information added!'));
//   // };

//   return (
//     <div>
//       <h2>{group.name}</h2>
//       <p>Owner: {group.owner}</p>
//       <GroupMembersList members={members} onRemove={handleRemove} onLeave={handleLeave} />
//       {/* <JoinRequests requests={requests} onApprove={handleApprove} onReject={handleReject} />
//       <AddInformation onAdd={handleAddInfo} /> */}
//     </div>
//   );
// }

// export default GroupPage;


