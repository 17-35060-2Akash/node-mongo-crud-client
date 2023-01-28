import React from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(users);

    const handleDelete = (_id, name) => {
        const agree = window.confirm(`Are You sure You want to delete ${name}`);
        // console.log(_id);
        // console.log(agree)
        if (agree) {
            fetch(`http://localhost:5000/users/${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('user deleted successfully');

                        const remainingUsers = displayUsers.filter(usr => usr._id != _id);
                        setDisplayUsers(remainingUsers);
                    }
                });

        }

    };

    return (
        <div>
            <h2>Users: {displayUsers.length}</h2>
            <div>
                {
                    displayUsers.map(user => <p key={user._id}>
                        {user.name} {user.email}
                        <Link to={`/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleDelete(user._id, user.name)}>x</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Home;