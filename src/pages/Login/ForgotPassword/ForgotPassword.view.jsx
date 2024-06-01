import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { SignupForm, Welcome } from "../../../components";
import HospitalSignUpForm from "../../../components/HospitalSignUpForm/HospitalSignUpForm.view";
import JobRelatedInfo from "../../../components/JobRelatedInfo";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ForgotPassword = () => {
  const location = useLocation();
  const banner_text = "Welcome";
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  document.title = "Forgot Password | MedLink Jobs";
  const navigate = useNavigate();

  // console.log(location)
  return (
    <Box maxWidth="xl" sx={{ backgroundColor: "#F0F6FE", mx: "auto", padding: !matches ? "1rem 3rem 3rem" : "0rem 0rem" }}>
      {
      matches &&
      <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
      <ArrowBackIcon onClick={() => navigate(-1)} sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Forgot Password</Typography>
      </Box>
      }
      <Grid
        container
        spacing={!matches ? 8 : 0}
        justifyContent="space-between"
      >
        <Grid item xs={12} md={4}>
          {location.state?.isDoctor ? <SignupForm pageType="Forgot Password" location={location} /> : <HospitalSignUpForm pageType="Forgot Password" location={location} />}
        </Grid>

        <Grid item xs={12} md={8}>{location.state?.isDoctor ? <Welcome text={banner_text} /> : <JobRelatedInfo />}</Grid>
      </Grid>
    </Box>
  );
};

export default ForgotPassword;