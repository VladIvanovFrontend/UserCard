import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const token = localStorage.getItem('token');

    return token ? (
        <>{children}</>
    ) : (
        <Navigate to="/" />
    );
};

export default PrivateRoute;
