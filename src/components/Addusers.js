import React from 'react';
import { useState } from 'react';

const Addusers = () => {
    // const [user, setUser] = useState({ name: 'default', email: 'de@gmail.com' });
    const [user, setUser] = useState({});
    const handleAddUser = event => {
        event.preventDefault();
        console.log(user);
        event.target.reset();

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)

        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('User added successfully!');
                }
                // console.log(data);
            })

    };

    const handleInputBlur = event => {
        const field = event.target.name;
        const value = event.target.value;

        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
        // console.log(newUser);
    }

    return (
        <div>
            <h2>Please add a new user</h2>
            <form onSubmit={handleAddUser}>
                <label htmlFor="">Name:</label><br />
                <input onChange={handleInputBlur} type="text" name="name" id="" placeholder='name' required />
                <br />
                <label htmlFor="">Address:</label><br />
                <input onChange={handleInputBlur} type="text" name="address" id="" placeholder='address' required />
                <br />
                <label htmlFor="">Email:</label><br />
                <input onChange={handleInputBlur} type="email" name="email" id="" placeholder='email' required />
                <br />
                <br />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default Addusers;