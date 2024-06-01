import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { useEffect, useState } from "react";
import {
  gqlquery as hospitalquery,
  QUERY_GETHOSPITAL,
  QUERY_GETMYPROFILE,
  QUERY_HOSPITALDETAILS
} from "../api/hospitalIndex";
import { gqlquery, QUERY_LISTPROFILES } from "../api/index";

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });
const useUserState = () => {
  const [user, setUser] = useState({});
  const [jobSearch, setJobSearch] = useState({
    jobTitle: '',
    location: ''
  })
  const [permitUser, setPermitUser] = useState({});
  const [hospitalUser, setHospitalUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [base64Image, setBase64ProfileImage] = useState();
  const [hospitalImage, setHospitalImage] = useState();
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [strengthUpdate, setStrengthUpdate] = useState(false);

  const refresh_token = sessionStorage.getItem("refreshToken");

  useEffect(() => {
    setInterval(() => {
      // refreshToken();
    }, `${Number(process.env.REACT_APP_DOCTORS_FLOW_REFRESH_TOKEN_TIME_INTERVAL)}`);
  });

  const refreshToken = async () => {
    var refreshTokenParams = {
      ClientId: "4mb15m3s257i8lh7d7ts15irtt",
      AuthFlow: "REFRESH_TOKEN_AUTH",
      AuthParameters: {
        REFRESH_TOKEN: refresh_token,
      },
    };

    gqlquery(QUERY_LISTPROFILES, null)
      .then((res) => res.json())
      .then(async (datas) => {
        setUserInfo(datas?.data?.getProfile);
        // console.log("error baba here", datas?.errors?.length >= 1 && datas?.errors[0]?.message?.includes("expired"))
        if (datas?.errors?.length >= 1 && datas?.errors[0]?.message?.includes("expired")) {

          try {
            const res = await provider.initiateAuth(refreshTokenParams);
            var access_token = res["AuthenticationResult"]["AccessToken"];
            var idToken = res["AuthenticationResult"]["IdToken"];
            sessionStorage.setItem("accessToken", access_token);
            sessionStorage.setItem("idToken", idToken);
            console.log(access_token ? "Access token is here." : "Access token is missing.");
          } catch (error) { }
          console.log("after refreshtoken hi")
          // window.location.assign("/login")
        }
        if (datas?.errors?.length >= 1 && datas?.errors[0]?.message?.includes("Unable")) {
          // sessionStorage.clear();
          // setUser(null);
          // console.log("after clearing sessionstorage")
          // window.location.assign("/login")
        }
      })

  };

  // console.log(userInfo?.name, "from useUserState");

  // !userInfo?.name && refreshToken();

  useEffect(() => {
    // if (sessionStorage.getItem("accessToken") !== null) {
      // gqlquery(QUERY_LISTPROFILES, null)
      //   .then((res) => res.json())
      //   .then(async (datas) => {
      //     setUserInfo(datas?.data?.getProfile);
      //     console.log("error baba here in useEFfect", datas?.errors?.length >= 1 && datas?.errors[0]?.message?.includes("expired"))
      //     if (datas?.errors?.length >= 1 && datas?.errors[0]?.message?.includes("expired")) {
            // await refreshToken();
            // console.log("after refreshtoken hi")
            // window.location.assign("/login")
          // }
          // if (datas?.errors?.length >= 1 && datas?.errors[0]?.message?.includes("Unable")) {
            // sessionStorage.clear();
            // setUser(null);
            // console.log("after clearing sessionstorage")
            // window.location.assign("/login")
        //   }
        // })
      // const res = gqlquery(QUERY_LISTPROFILES, null)
      // const result = res.json();
    // }
  }, [])


  const tokenCheckers = async () => {
    const res = await gqlquery(QUERY_LISTPROFILES, null)
    const result = await res.json();
    return result;
  };
  const hospitalTokenCheckers = async () => {
    const res = await gqlquery(QUERY_HOSPITALDETAILS, null)
    const result = await res.json();
    // console.log(result)
    return result;
  }
  const getUserProfile = async () => {
    await gqlquery(QUERY_LISTPROFILES, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data?.getProfile?.name) {
          setUser(datas?.data?.getProfile);
        }
        const QUERY_DOWNLOADRESUME = {
          query: `query MyQuery {
              downloadDocument (url: "${datas?.data?.getProfile?.profilePicURL}")
            }`,
        };
        gqlquery(QUERY_DOWNLOADRESUME, null)
          .then((res) => res.json())
          .then((datas) => {
            if (datas?.data?.downloadDocument) {
              const downloadDocument = JSON?.parse(datas?.data?.downloadDocument);
              const imageSource = `data:image/png;base64,${downloadDocument?.response?.content}`;
              setBase64ProfileImage(imageSource);
            } else{
              setBase64ProfileImage("data:image/png;base64,");
            }
          });
      });
    gqlquery(QUERY_HOSPITALDETAILS, null)
      .then((res) => res.json())
      .then((data) => {
        const QUERY_DOWNLOADRESUME = {
          query: `query MyQuery {
                downloadDocument (url: "${data?.data?.getHospitalDetails?.profilePicURL}")
              }`,
        };
        gqlquery(QUERY_DOWNLOADRESUME, null)
          .then((res) => res.json())
          .then((datas) => {
            if (datas?.data?.downloadDocument) {
              const downloadDocument = JSON?.parse(datas?.data?.downloadDocument);
              const imageSource = `data:image/png;base64,${downloadDocument?.response?.content}`;
              setHospitalImage(imageSource);
            } else {
              setHospitalImage("data:image/png;base64,");
            }
          });
      });
    hospitalquery(QUERY_GETHOSPITAL, null)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.getHospital?.contactEmail) {
          setHospitalUser(data?.data?.getHospital);
        }
      });
  };

  const getNotifications = () => {
    const QUERY_GET_NOTIFICATION = {
      query: `query MyQuery {
      getNotifications {
        description
        nID
        status
        title
        createdAt
      }
    } 
    `,
    };

    gqlquery(QUERY_GET_NOTIFICATION, null)
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas)
        setNotifications(datas?.data?.getNotifications);
        // setTimeStamp(datas.data.getNotifications.createdAt)
        // console.log(notifications);
      }).catch((err) => {
        console.log(err)
      })
  };

  const logOut = () => {
    sessionStorage.clear();
    setUser(null);
  };

  const logOutHospital = () => {
    sessionStorage.clear();
    setHospitalUser(null);
  };

  const getUserRole = () => {
    setIsLoading(true);
    hospitalquery(QUERY_GETMYPROFILE, null)
      .then((res) => res.json())
      .then((data) => setPermitUser(data?.data?.getMyProfile))
      .finally(() => setIsLoading(false));
  };

  const getUserName = () => {
    setIsLoading(true);
    gqlquery(QUERY_LISTPROFILES, null)
      .then((res) => res.json())
      .then(datas => {
        console.log("from the top", datas)
        setUserName(datas?.data?.getProfile?.name);
        setIsLoading(false);
      })
  }

  const handleStrengthUpdate = () => {
    setStrengthUpdate((prevData) => (!prevData))
  }


  return {
    refreshToken,
    getUserProfile,
    hospitalUser,
    user,
    getUserRole,
    isLoading,
    permitUser,
    logOut,
    base64Image,
    hospitalImage,
    logOutHospital,
    getNotifications,
    notifications,
    setHospitalImage,
    tokenCheckers,
    hospitalTokenCheckers,
    getUserName,
    userName,
    handleStrengthUpdate,
    strengthUpdate,
    setBase64ProfileImage,
    setJobSearch,
    jobSearch
  };
};

export default useUserState;
