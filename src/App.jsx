import { useState, useEffect } from 'react';
import './App.css'; 

const users = [
  { id: 1, name: 'rahul', avatar: 'https://img.freepik.com/premium-vector/icon-man-s-face-with-light-skin_238404-1006.jpg?w=740', email: 'user1@example.com' },
  { id: 2, name: 'sanju', avatar: 'https://img.freepik.com/premium-vector/icon-man-s-face-with-light-skin_238404-1006.jpg?w=740', email: 'user2@example.com' },
  { id: 3, name: 'raj', avatar: 'https://img.freepik.com/premium-vector/icon-man-s-face-with-light-skin_238404-1006.jpg?w=740', email: 'user3@example.com' },
 
];

const Multiselect = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user => !selectedUsers.some(selectedUser => selectedUser.id === user.id))
    );
  }, [selectedUsers]);

  useEffect(() => {
  
    setFilteredUsers(users);
  }, []);

  const handleInputChange = event => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);

    setFilteredUsers(
      users.filter(
        user =>
          !selectedUsers.some(selectedUser => selectedUser.id === user.id) &&
          (user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value))
      )
    );
  };

  const handleSelectUser = user => {
    setSelectedUsers([...selectedUsers, user]);
    setInputValue('');
  };

  const handleRemoveUser = removedUser => {
    setSelectedUsers(selectedUsers.filter(user => user.id !== removedUser.id));
  };

  return (
    <div className="multiselect-container">
      <div className="selected-users">
        {selectedUsers.map(user => (
          <div key={user.id} className="chip rounded-full w-[15%] gap-4 font-bold">
            <img
                src="https://img.freepik.com/premium-vector/icon-man-s-face-with-light-skin_238404-1006.jpg"
                alt="avatar"
                width={50}
                height={50}
                style={{ borderRadius: "50%", marginRight: '20px' }}
              />
            {user.name}
            <button className="remove-button" onClick={() => handleRemoveUser(user)}>
              X
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="input-field"
        placeholder="Type to search..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="dropdown-list">
        {filteredUsers.map(user => (
          <div key={user.id} className="dropdown-item" onClick={() => handleSelectUser(user)}>
            <img src={user.avatar} alt={user.name} style={{ width: '30px', marginRight: '10px' }} />
            {`${user.name} - ${user.email}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Multiselect;
