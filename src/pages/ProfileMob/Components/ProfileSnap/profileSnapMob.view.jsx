import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { styled } from "@mui/material/styles";
import profileImg from "../../../../assets/profile.png";
import { Edit } from "@mui/icons-material";
import React, { useEffect, useState } from "react"
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { gqlquery, QUERY_LISTPROFILES, QUERY_GETSKILLSLIST, QUERY_GETEDUCATIONLIST, QUERY_GETEXPERIENCE, QUERY_GETMEMBERSHIPS, QUERY_GETPERSONALDETAILS, QUERY_GETCAREERPROFILEPERCENTAGE } from "../../../../api";

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const UserInfoBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "0.8rem",
}));

export const profileData = {
  image: profileImg,
  name: "Manoj Kumar",
  specilization: "Cardiologist",
  location: "Bangalore",
  experience: 7,
  salary: "10 Lakhs and 50 Thousand",
  number: "+91 9009090909",
  email: "manoj@gmail.com",
  strength: 90,
};

const ProfileSnap = () => {
  const [profile, setProfile] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [profileStrength, setProfileStrength] = useState(0);
  const [controlStrength, setControlSrength] = useState({
    education: 0,
    personalDetails: 0,
    careerProfile: 0,
    membership: 0,
    experience: 0,
    skillsList: 0,
  })

  const access_token = sessionStorage.getItem("accessToken");

  const getUserEmail = async () => {
    const res = await provider.getUser({ AccessToken: access_token });
    setUserEmail(res?.UserAttributes[2].Value);
  };

  useEffect(() => {
    if (!userEmail) {
      getUserEmail();
    }
  }, []);

  useEffect(() => {
    gqlquery(QUERY_LISTPROFILES, null)
      .then((res) => res.json())
      .then((datas) => setProfile(datas?.data?.getProfile));
  }, [])

  console.log("profile in profile snap", profile);

  useEffect(() => {
    gqlquery(QUERY_GETEDUCATIONLIST, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data?.getEducationList[0]?.courseName && controlStrength?.education === 0) {
          setControlSrength({ education: 1 })
          setTimeout(setProfileStrength((prevData) => prevData + 20), 10000);
        }
      });

    gqlquery(QUERY_GETSKILLSLIST, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data?.getSkillsList[0]?.name && controlStrength?.skillsList === 0) {
          setControlSrength({ skillsList: 1 })
          setTimeout(setProfileStrength((prevData) => prevData + 10), 10000);
        }
      });

    gqlquery(QUERY_GETEXPERIENCE, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data?.getExperienceList[0]?.hospital && controlStrength?.experience === 0) {
          setControlSrength({ experience: 1 })
          setTimeout(setProfileStrength((prevData) => prevData + 20), 10000);
        }
      });

    gqlquery(QUERY_GETCAREERPROFILEPERCENTAGE, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data?.getCareerProfile?.departmentName && controlStrength?.careerProfile === 0) {
          setControlSrength({ careerProfile: 1 })
          setTimeout(setProfileStrength((prevData) => prevData + 10), 10000);
        }
      });

    gqlquery(QUERY_GETPERSONALDETAILS, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data?.getPersonalDetails?.gender && controlStrength?.personalDetails === 0) {
          setControlSrength({ personalDetails: 1 })
          setTimeout(setProfileStrength((prevData) => prevData + 10), 10000);
        }
      });

    gqlquery(QUERY_GETMEMBERSHIPS, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data?.getMemberships[0]?.organization && controlStrength?.membership === 0) {
          setControlSrength({ membership: 1 })
          setTimeout(setProfileStrength((prevData) => prevData + 10), 10000);
        }
      });
  }, []);


  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "12px",
        backgroundColor: "#F2F2F2",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "",
            gap: 6,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
            <Avatar
              sx={{
                width: "70px",
                height: "70px",
                color: "#828282",
                // margin: `${tabletView ? "1rem auto" : "0 1rem"}`,
              }}
              src={profileData.image}
            />
            <Box>
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="p" component="h3">
                  {profile?.name}
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  sx={{ color: "GrayText", mt: 0.5 }}
                >
                  {profile?.specialization} &nbsp; &nbsp; &nbsp;
                  <Edit sx={{ fontSize: 18 }} />
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ position: "relative", margin: "auto" }}>
            <CircularProgress
              variant="determinate"
              value={90}
              thickness={5}
              sx={{
                width: "64px !important",
                height: "64px !important",
                transform: "rotate(0deg) !important",
                color: "var(--clr-gray-3)",
              }}
            />
            <Typography
              component="span"
              variant="h6"
              sx={{
                fontWeight: 600,
                position: "absolute",
                top: 32,
                left: 32,
                transform: "translate(-50%, -50%)",
              }}
              className="strength-value"
            >
              {profileStrength}%
            </Typography>
            <Typography
              variant="p"
              component="p"
              sx={{
                fontSize: 10,
                lineHeight: "16px",
                fontWeight: 600,
                color: "var(--clr-gray-3)",
                textAlign: "center",
                marginTop: "0.5rem",
              }}
            >
              Profile Strength
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", mt: -2 }}>
          <UserInfoBox>
            <LocationOnIcon sx={{ color: "gray" }} />
            {profile?.city}
          </UserInfoBox>
          <UserInfoBox>
            <WorkIcon sx={{ color: "gray" }} />
            {profile?.exp} years
          </UserInfoBox>
          <UserInfoBox>
            <AccountBalanceWalletIcon sx={{ color: "gray" }} />
            {(profile?.salary / 100000).toFixed(0)} Lakh
          </UserInfoBox>

          <UserInfoBox>
            <PhoneIphoneIcon sx={{ color: "gray" }} />
            {profile?.phone}
          </UserInfoBox>
          <UserInfoBox>
            <EmailIcon sx={{ color: "gray" }} />
            {userEmail}
          </UserInfoBox>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSnap;
