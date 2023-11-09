import React, { useState } from 'react';

const CreateUser = () => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupRole, setSignupRole] = useState('');
    const url = process.env.REACT_APP_API_URL;
    const handleSignup = () => {
        if (!signupEmail || !signupPassword || !confirmPassword || !name || !signupRole) {
            setMessage('Please fill in all fields!');
            return;
        }

        if (signupPassword !== confirmPassword) {
            setMessage("Passwords don't match!");
            return;
        }

        fetch(`${url}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: signupEmail, password: signupPassword, name, role: signupRole }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    setMessage(data.message);
                } else {
                    setMessage('User created Successfully!');
                    setConfirmPassword('');
                    setName('');
                    setSignupEmail('');
                    setSignupPassword('');
                    setSignupRole('');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="create-user">
            <h2 className="create-user-title">Add User</h2>
            <form action="" className="create-user-form">
                <input
                    className="create-user-input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="create-user-input"
                    type="email"
                    placeholder="Email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                />
                <input
                    className="create-user-input"
                    type="password"
                    placeholder="Password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                />
                <input
                    className="create-user-input"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <select
                    className="create-user-input"
                    value={signupRole}
                    onChange={(e) => setSignupRole(e.target.value)}
                >
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select>
            </form>
            <button className="create-user-button" onClick={handleSignup}>
                Create User
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateUser;