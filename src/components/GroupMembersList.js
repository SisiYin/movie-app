import React from 'react';

function GroupMembersList({ members, onRemove, onLeave }) {
  return (
    <div>
      <h3>Members</h3>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.name} ({member.role})
            {member.role !== 'owner' && (
              <button onClick={() => onRemove(member.id)}>Remove</button>
            )}
          </li>
        ))}
        <li>
          <button onClick={onLeave}>Leave Group</button>
        </li>
      </ul>
    </div>
  );
}

export default GroupMembersList;
