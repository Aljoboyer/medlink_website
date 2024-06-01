import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { Navigate } from "react-router-dom";
import UserList from '../../components/UserTabs/components/ManageUser/UserList';

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });
const UsersList = () => {
    const [userToken, setUserToken] = useState("");
    const access_token = sessionStorage.getItem("accessToken");

    useEffect(() => {
        if (!userToken) {
            getUserToken();
        }
    }, []);

    const getUserToken = async () => {
        const res = await provider.getUser({ AccessToken: access_token });
        setUserToken(res.Username);
    };
    return (
        <Box>
            {access_token || userToken ? (
                <UserList />
            ) : (
                <Navigate to="/hospital-login" />
            )} 
        </Box>
    );
};

export default UsersList;