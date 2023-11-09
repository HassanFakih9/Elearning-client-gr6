import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/AdminDashboard.css'

const UserTable = ({ users, role }) => {
  const [editUserId, setEditUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({ id: '', name: '', email: '' });
  const url = process.env.REACT_APP_API_URL;
  const deleteUser = (id) => {
    axios
      .delete(`${url}/users/delete/${id}`, { params: { role } })
      .then((response) => {
        console.log('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user', error);
      });
  };

  const updateUser = (id) => {
    if (editUserId === id) {
      const { name, email, password } = updatedUserData;

      axios
        .put(`${url}/users/update/${id}`, { name, email, password })
        .then((response) => {
          console.log('User updated successfully');
          setEditUserId(null);
        })
        .catch((error) => {
          console.error('Error updating user', error);
        });
    } else {
      setEditUserId(id);

      const userToEdit = users.find((user) => user.id === id);
      setUpdatedUserData(userToEdit);
    }
  };




  return (
    <table className='admin-table'>
      <thead className='admin-thead'>
        <tr>
          <th className='admin-table-th'>Name</th>
          <th className='admin-table-th'>Email</th>
          <th className='admin-table-th'>Actions</th>
        </tr>
      </thead>
      <tbody className='admin-thead'>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id}>
              <td className='user-name'>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={updatedUserData.name}
                    onChange={(e) => setUpdatedUserData({ ...updatedUserData, name: e.target.value })}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className='user-name'>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={updatedUserData.email}
                    onChange={(e) => setUpdatedUserData({ ...updatedUserData, email: e.target.value })}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className='user-name'>
                <button className='edit-delete-btn-admin' onClick={() => deleteUser(user.id)}>Delete</button>
                <button className='edit-delete-btn-admin' onClick={() => updateUser(user.id)}>
                  {editUserId === user.id ? 'Save' : 'Edit'}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No users to display.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const NewUsers = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('student');
  const url = process.env.REACT_APP_API_URL;
  const fetchUsersByRole = async (role, usersState) => {
    try {
      const response = await axios.get(`${url}/users/getAll/${role}`);
      const users = response.data.data;
      console.log(response.data.data)
      usersState(users);
      return users;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchUsersByRole(role, setUsers);
  }, [role]);

  return (
    <div>
      <h1 className='users-admin'>Users</h1>
      <select className='select-users-admin' value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Students</option>
        <option value="teacher">Teachers</option>
        <option value="admin">Admins</option>
      </select>
      <UserTable users={users} role={role} />
    </div>
  );
};

export default NewUsers;
