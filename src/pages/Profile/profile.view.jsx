import React from "react";
import { Box, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ProfileSnap, UserTabs } from "../../components";
import homeBanner from "../../assets/images/doctors_home_banner.png";
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Profile = (props) => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  // document.title = "Update Profile | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box className="profile" style={{ minHeight: "100vh" }}>
     {
        matches &&
        <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
        {/* <MenuIcon sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/> */}
        <Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>My Profile</Typography>
        </Box>
      }
      <Box style={{ backgroundImage: !matches?  `url(${homeBanner})` : "", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} sx={{ bgcolor: !matches ? "#E0E0E0" : "#FFFFFF", height: !matches ? "240px" : "140px" }} ></Box>
      <Container sx={{ mx: "auto", marginTop: "-120px" }}>
        <ProfileSnap pageType="EditProfile" profileData={props.profileData} />
        <UserTabs tabsData={props.tabsData} />
      </Container>
        
    </Box>
  );
};

export default Profile;
