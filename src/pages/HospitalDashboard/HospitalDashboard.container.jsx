import { Box, /* Grid, Skeleton */ } from "@mui/material";
import { useEffect, useState } from "react";
import HospitalDashboardView from "./HospitalDashboard.view";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import HospitalDashboardSkeleton from "./HospitalDashboard.skeleton";

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

// User permission
export const ShowForAccessJobPosting = (props) => {
  const { getUserRole, permitUser, isLoading } = useAuth();

  useEffect(() => {
    getUserRole();
  }, [])

  if (!isLoading) {
    return permitUser?.accessJobPosting || permitUser?.accessResumeDB || permitUser?.adminUser ? props.children : <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Fix-Access-Denied-Folder-Featured.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5" style={{ width: "100%", height: "auto" }} alt="Accecss_denied" />;
  }
  else {
    return (
      <HospitalDashboardSkeleton />
    );
  }
}


export default function HospitalDashboard() {
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
    <ShowForAccessJobPosting>
      <Box>
        {access_token || userToken ? (
          <HospitalDashboardView />
        ) : (
          <Navigate to="/hospital-login" />
        )}
      </Box>
    </ShowForAccessJobPosting>

  );
}
