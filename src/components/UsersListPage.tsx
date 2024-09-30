import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../store/store";
import {Link, useNavigate} from 'react-router-dom';
import { fetchUsers } from '../users/usersSlice';
import classes from "../styles/UsersListPage.module.css";

const UsersListPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.users);
    const status = useSelector((state: RootState) => state.users.status);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsers(1));
    }, [dispatch]);

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className={classes.wrapper}>
            <h2>Наша команда</h2>
            {status === 'loading' ? (
                <p>Loading...</p>
            ) : (
                <div className={classes.cardContainer}>
                    <button onClick={handleBack} className={classes.logoutButton}>Выйти</button>
                    {users.map((user) => (
                        <Link to={`/users/${user.id}`} key={user.id} className={classes.userCard}>
                            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`}/>
                            <h4>{user.first_name} {user.last_name}</h4>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UsersListPage;