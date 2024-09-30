import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import classes from "../styles/UserDetailPage.module.css";

const UserDetailPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        axios.get(`https://reqres.in/api/users/${id}`).then((response) => {
            setUser(response.data.data);
        });
    }, [id]);

    const handleBack = () => {
        navigate('/users');
    };

    return (
        <div>
            {user ? (
                <div>
                    <button onClick={handleBack} className={classes.logoutButton}>Назад</button>
                    <h3>{user.first_name} {user.last_name}</h3>
                    <img src={user.avatar} alt={user.first_name}/>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserDetailPage;