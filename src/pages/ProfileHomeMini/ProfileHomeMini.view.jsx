import styled from '@emotion/styled';
import { Avatar, Box, Button, Card, CardContent, CircularProgress, Container, Grid, InputAdornment, TextField, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { gqlquery, QUERY_GETCAREERPROFILEPERCENTAGE, QUERY_GETEDUCATIONLIST, QUERY_GETEXPERIENCE, QUERY_GETMEMBERSHIPS, QUERY_GETPERSONALDETAILS, QUERY_GETSKILLSLIST, QUERY_LISTPROFILES } from '../../api';
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from '@mui/icons-material/Edit';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import profileImg from "../../assets/profile.png";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import { Link, useNavigate } from 'react-router-dom';
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const SearchButton = styled(Button)(() => ({
  color: "var(--clr-white) !important",
}));


const UserInfoBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "1.5rem",
}));

const profileData = {
  image: profileImg,
  name: "Manoj Kumar",
  specilization: "Cardiologist",
  location: "Bangalore",
  experience: 7,
  salary: "10 Lakhs and 50 Thousand",
  number: "+91 9009090909",
  email: "manoj@gmail.com",
  search: "Actively searching",
  strength: 90,
};



const ProfileHomeMini = () => {
  const [topFourJobs, SetTopFourJobs] = useState([]);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    jobTitle: "",
    location: "",
  })
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


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleJobsSearch = () => {
    const handleNavigate = () => {
      navigate("/job-search-list-mini", { state: values });
    };
    setTimeout(handleNavigate, 1000);
  }

  useEffect(() => {
    const QUERY_SEARCHTOPFOURJOBS = {
      query: `query MyQuery {
                        searchTop4Jobs {
                          description
                          experience
                          employmentType
                          hospitalID
                          jobTitle
                          lastDateToApply
                          location
                          maximumSalary
                          minimumSalary
                          name
                          postedOn
                          qualification
                          savedJob
                          vacancyID
                          vacancyType
                        }
                        }
                      `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_SEARCHTOPFOURJOBS, null)
      .then((res) => res.json())
      .then((data) => SetTopFourJobs(data?.data?.searchTop4Jobs))

  }, [])


  const newTopFourJobs = topFourJobs?.map((searchResult) => {
    const date_diff_indays = function () {
      const dt1 = new Date(searchResult?.postedOn);
      const dt2 = new Date();
      const days = Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
      );
      const month = Math.floor(days / 30)
      const day = days % 30
      if (days >= 30) {

        return {
          month,
          day
        }
      }
      return {
        days
      }
    };

    return {
      date_diff_indays,
      jobTitle: searchResult?.jobTitle,
      qualification: searchResult?.qualification,
      secondarySpecialization: searchResult?.secondarySpecialization,
      description: searchResult?.description,
      maximumSalary: searchResult?.maximumSalary,
      minimumSalary: searchResult?.minimumSalary,
      location: searchResult?.location,
      postedOn: searchResult?.postedOn,
      primarySpecialization: searchResult?.primarySpecialization,
      experience: searchResult?.experience,
      employmentType: searchResult?.employmentType,
      lastDateToApply: searchResult?.lastDateToApply,
      vacancyID: searchResult?.vacancyID,
      vacancyType: searchResult?.vacancyType

    }
  })

  return (
    <Box maxWidth="sm" sx={{ mx: "auto" }}>
      {/* page Title */}
      <Box
        sx={{
          backgroundColor: "#E0E0E0",
          padding: "15px 0 15px 17px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <MenuIcon sx={{ color: "#323232" }} />
        <Typography variant="h6" sx={{ lineHeight: "24px", fontWeight: "600" }}>
          My Profile
        </Typography>
      </Box>

      {/* Search Box */}
      <Box sx={{ bgcolor: "#FFFFFF", py: 3, px: 2 }}>
        <TextField
          name="jobTitle"
          onChange={handleChange("jobTitle")}
          placeholder="Enter Keyword"
          sx={{ backgroundColor: '#F2F2F2', size: 'large', width: '100%', borderRadius: '10px', }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchButton onClick={handleJobsSearch} color="primary" edge="end" size="large" sx={{ backgroundColor: '#828282', color: 'white', borderRadius: '5px', width: 110 }}>
                  Search
                </SearchButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Profile */}
      <Box
        sx={{
          p: 2.5,
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
              gap: 3,
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
                    <EditIcon sx={{ fontSize: 18 }} />
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
            <Box>
              <Button component={Link} to="/profile-mob" variant="contained" size="small" sx={{ px: 2 }}>Update Profile</Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Recommanded Jobs */}
      <Box sx={{px: 2}}>
        <Typography sx={{ my: 2 }} variant="h6" gutterBottom component="div" >Recommended Jobs</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {newTopFourJobs?.map((searchResult) =>
            <Box key={searchResult?.vacancyID} sx={{
              bgcolor: "#F2F2F2",
              borderRadius: 2,
              p: 2.5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              boxShadow: 1,
            }}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  color: "#333333",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                {searchResult?.jobTitle}
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{
                  color: "#333333",
                  fontWeight: "600",
                }}
              >
                {/* {searchResult.hospitalName} */}
                Hospital / Consultant name Here
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <ChromeReaderModeIcon />
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  {/* {searchResult.skills.map((skill) => ( */}
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      lineHeight: "16px",
                      color: "#333333",
                      fontWeight: "600",
                    }}
                  >
                    {searchResult?.primarySpecialization}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      lineHeight: "16px",
                      color: "#333333",
                      fontWeight: "600",
                    }}
                  >
                    {searchResult?.secondarySpecialization}
                  </Typography>

                </Box>
              </Box>
              <Box >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    pr: 2,
                    mb: 1,
                  }}
                >
                  <LocationOnTwoToneIcon
                    fontSize="small"
                    sx={{ color: "#323232" }}
                  />
                  <Typography
                    component="div"
                    sx={{ color: "#4F4F4F" }}
                    variant="body1"
                  >
                    {searchResult?.location}

                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    pr: 2,
                    mb: 1,
                  }}
                >
                  <WorkTwoToneIcon
                    fontSize="small"
                    sx={{ color: "#323232" }}
                  />
                  <Typography
                    component="div"
                    sx={{ color: "#4F4F4F" }}
                    variant="body1"
                  >
                    {searchResult?.experience} {searchResult.experience === 1 ? "Year" : "Years"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    pr: 2,
                    mb: 1,
                  }}
                >
                  <AccountBalanceWalletTwoToneIcon
                    fontSize="small"
                    sx={{ color: "#323232" }}
                  />
                  <Typography
                    component="div"
                    sx={{ color: "#4F4F4F" }}
                    variant="body1"
                  >
                    {searchResult?.maximumSalary} {"INR"}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "max-content",
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#E0E0E0",
                  gap: 1,
                  px: 2,
                  borderRadius: 1.5,
                }}
              >
                <AccessTimeOutlinedIcon
                  fontSize="small"
                  sx={{ color: "#828282" }}
                />
                <Typography
                  component="div"
                  sx={{ color: "#828282" }}
                  variant="body1"
                >
                  {
                    searchResult?.date_diff_indays().month ? (
                      <>
                        {searchResult.date_diff_indays().month} {searchResult.date_diff_indays().month === 1 ? "month" : "months"} {" "}
                        {
                          searchResult.date_diff_indays().day ? (
                            <>
                              {searchResult.date_diff_indays().day} {searchResult.date_diff_indays().day === 1 ? "day" : "days"} {"ago"}
                            </>
                          ) :
                            (
                              <> {"ago"}
                              </>
                            )
                        }
                      </>
                    ) :
                      (
                        <>
                          {searchResult?.date_diff_indays().days} {searchResult.date_diff_indays().days === 1 ? "day" : "days"}    {"ago"}
                        </>
                      )
                  }
                  {/* {searchResult.postedOn} */}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Button
            sx={{ borderRadius: 2, px: 2, py:1.2 }}
            variant="contained"
          >
            View All
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHomeMini;

