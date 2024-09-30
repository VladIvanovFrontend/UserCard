import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import classes from '../styles/LoginPage.module.css'

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://reqres.in/api/login', {
                firstName,
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/users');
        } catch (err) {
            setError('Введите email с сайта');
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.mainContainer}>
                <h1>Регистрация</h1>
                <form
                    onSubmit={handleLogin}
                    className={classes.formInput}
                >
                    <span>
                        <h4>Имя</h4>
                        <input
                            type="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Michael"
                            required
                        />
                </span>
                    <span>
                        <h4>Email</h4>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="michael.lawson@reqres.in"
                            required
                        />
                    </span>
                    <span>
                        <h4>Пароль</h4>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="***"
                            required
                        />
                    </span>
                    <button type="submit">Login</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;