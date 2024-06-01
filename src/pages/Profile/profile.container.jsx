import React, { useEffect, useState } from "react";
import ProfileView from "./profile.view";
import { Box } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import { profileData, tabsData } from "./defaultData";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import Skeleton from '@mui/material/Skeleton';
import { gqlquery, QUERY_LISTPROFILES } from "../../api";
import useAuth from "../../hooks/useAuth";

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const Profile = (props) => {
  const location = useLocation();
  const { refreshToken } = useAuth();
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const access_token = sessionStorage.getItem("accessToken");
  const [isLoading, setIsLoading] = useState(true);
  //TODO: 1. CHECK IF ACCESS TOKEN IS EXIST, IF IT DOESN'T REDIRECT TO LOGIN PAGE
  // 2. CALL GETUSER AND CHECK USERNAME . IF USERNAME DOESN'T EXIST REDIRECT TO LOGIN PAGE , IF ANY ERROR OCCURS REDIRECT TO LOGIN PAGE
  
  useEffect(() => {

    const getUserName = async () => {
      await gqlquery(QUERY_LISTPROFILES, null)
        .then((res) => res.json())
        .then(datas => {
          console.log(datas)
          // if (datas?.errors?.length >= 1 && datas?.errors[0]?.message?.includes("expired")) {
          //   console.log("inside conditions")
          //   const inSequence = async () => {

          //     const getRefreshToken = async () => {
          //       console.log("before calling refreshToken")
          //       await refreshToken();
          //     }

          //     const getUserNameAgain = async () => {
          //       await gqlquery(QUERY_LISTPROFILES, null)
          //         .then((res) => res.json())
          //         .then(datas => {
          //           setUserName(datas?.data?.getProfile?.name);
          //           console.log("expired and calling refreshToken again")
          //           setIsLoading(false);
          //         })
          //     }

          //     await getRefreshToken();
          //     await getUserNameAgain();
          //   }
          //   inSequence();
          // } else if (datas?.errors?.length >= 1 && datas?.errors[0]?.message?.includes("Unable")) {
          //   console.log("inside conditions")
          //   sessionStorage.clear();
          //   setIsLoading(false);
          // } else {
            setUserName(datas?.data?.getProfile?.name);
            console.log("token not expired")
            setIsLoading(false);
          // }
          // setIsLoading(false);
        })
    };

    if (!userName) {
      getUserName();
    }
  }, []);
 
  // console.log("userNameuserNameuserNameuserName", userName)
  return (
    <Box>
      {
        isLoading ? (
          <>
            <Skeleton animation="wave" sx={{ height: "80vh" }} />
          </>
        ) : (
          <>
            {access_token ? (
              <>
                {
                  userName ? (
                    <>
                      <ProfileView profileData={profileData} tabsData={tabsData} />
                    </>
                  ) : (
                    <>
                      <Navigate to="/signup2" />
                    </>
                  )
                }
              </>
            ) : (
              <Navigate to="/login" />
            )}
          </>
        )
      }
    </Box>
  );
};

export default Profile;
