// // src/components/GroupList.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const GroupList = () => {
//   const [groups, setGroups] = useState([]);

//   useEffect(() => {
//     const fetchGroups = async () => {
//       const response = await axios.get('http://localhost:5000/api/groups');
//       setGroups(response.data);
//     };
//     fetchGroups();
//   }, []);

//   return (
//     <div>
//       <h2>Group List</h2>
//       <ul>
//         {groups.map((group) => (
//           <li key={group.id}>
//             <Link to={`/groups/${group.id}`}>{group.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default GroupList;
import React from 'react'

export default function GroupList() {
  return (
    <div>GroupList</div>
  )
}

