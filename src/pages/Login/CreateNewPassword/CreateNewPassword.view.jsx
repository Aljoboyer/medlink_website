import { Box, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { SignupForm, Welcome } from "../../../components";
import HospitalSignUpForm from "../../../components/HospitalSignUpForm/HospitalSignUpForm.view";
import JobRelatedInfo from "../../../components/JobRelatedInfo";

const CreateNewPassword = () => {
  const location = useLocation();
  const banner_text = "Welcome";
  return (
    <Box maxWidth="xl" sx={{ backgroundColor: "#F0F6FE", mx: "auto", padding: "1rem 3rem 3rem" }}>
     <Grid
        container
        spacing={8}
        justifyContent="space-between"
      >
        <Grid item xs={4}>
          {location.state?.isDoctor ? <SignupForm pageType="Create New Password" location={location} /> : <HospitalSignUpForm pageType="Create New Password" location={location} />}

        </Grid>

        <Grid item xs={8}>{location.state?.isDoctor ? <Welcome text={banner_text} /> : <JobRelatedInfo />}</Grid>
      </Grid>
    </Box>
  );
};

export default CreateNewPassword;
