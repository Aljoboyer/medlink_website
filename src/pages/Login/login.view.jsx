import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { SignupForm, Welcome } from "../../components";
import Skeleton from '@mui/material/Skeleton';
import { gqlquery, QUERY_LISTPROFILES } from "../../api";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tokenToAccess, setTokenToAccess] = useState(null);
  const banner_text = "Welcome";
  const token = sessionStorage.getItem("accessToken");
  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  document.title = "Login | MedLink Jobs";
  const navigate = useNavigate();
  // console.log("login page location", location)

  // useEffect(() => {
  // setTimeout(() => { setToken(); }, 2000)
  // const setToken = () => {
  // setTokenToAccess(token);
  // }
  // }, [token]);

  useEffect(() => {

    const getNameEmail = async () => {
      const getUserName = async () => {
        console.log("from login;",)
        await gqlquery(QUERY_LISTPROFILES, null)
          .then((res) => res.json())
          .then(datas => {
            setUserName(datas?.data?.getProfile?.name);
            setIsLoading(false);
          })
      };

      await getUserName();
    }

    if (sessionStorage.getItem("accessToken") !== null) {
      if (!userName) {
        getNameEmail();
      }
    } else{
      setIsLoading(false);
    }
    
  }, []);

  // console.log("isLoading: " + isLoading, token ? "token is available" : "token is not available", userName ? userName : "user name is not available");

  return (
    <>
      {
        isLoading ? (
          <>
            <Skeleton animation="wave" sx={{ height: "100vh", mx: "20%" }} />
          </>
        ) : (
          <>
            {
              token ? (
                <>
                  {
                    userName ? (
                      <Navigate to="/profile-home" />
                    ) : (
                      <>
                      <Navigate to="/signup2" /> 
                      </>
                    )
                  }
                </>
              ) : (
                <Box sx={{backgroundColor: "#F0F6FE"}}>
                  {
                    matches &&
                    <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
                    <ArrowBackIcon onClick={() => navigate(-1)} sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Login</Typography>
                    </Box>
                    }
                  <Box maxWidth="xl" sx={{ backgroundColor: "#F0F6FE", mx: "auto", padding: !matches ? "1rem 3rem 3rem" : "0rem 0rem" }}>
                    <Grid
                      container
                      spacing={!matches ? 8 : 0}
                      justifyContent="space-between"
                    >
                      <Grid item xs={12} md={4}><SignupForm pageType="Login" location={location} /></Grid>
                      <Grid item xs={12} md={8}><Welcome text={banner_text} /></Grid>
                    </Grid>
                  </Box>
                </Box>
              )
            }
          </>
        )
      }
    </>
  );
};

export default Login;