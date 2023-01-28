import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();

    const [user, setUser] = useState(storedUser);

    const handleUpdateUser = event => {
        event.preventDefault();
        console.log(user);
        event.target.reset();

        fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('User Updated');
                }

            })


    };


    const handleInputChange = event => {
        const field = event.target.name;
        const value = event.target.value;

        const newUser = { ...user };
        newUser[field] = value;
        setUser(newUser);
        // console.log(newUser);
    }


    return (
        <div>
            <h2>Please Update: {storedUser.name} </h2>
            <form onSubmit={handleUpdateUser}>
                <label htmlFor="">Name:</label><br />
                <input onChange={handleInputChange} defaultValue={storedUser.name} type="text" name="name" id="" placeholder='name' required />
                <br />
                <label htmlFor="">Address:</label><br />
                <input onChange={handleInputChange} defaultValue={storedUser.address} type="text" name="address" id="" placeholder='address' required />
                <br />
                <label htmlFor="">Email:</label><br />
                <input onChange={handleInputChange} defaultValue={storedUser.email} type="email" name="email" id="" placeholder='email' required readOnly />
                <br />
                <br />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default Update;