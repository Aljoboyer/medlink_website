import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import HospitalSignUpForm from "../../components/HospitalSignUpForm/HospitalSignUpForm.view";
import JobRelatedInfo from "../../components/JobRelatedInfo";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const HospitalSignUp = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    document.title = "Recruiter Register | MedLink Jobs";
    const navigate = useNavigate();

    return (
        <Box sx={{backgroundColor: !matches ? "#F0F6FE" : "#FFFFFF"}}>
             {
                matches &&
                <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
                <ArrowBackIcon onClick={() => navigate(-1)} sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Register</Typography>
                </Box>
             }
            <Box maxWidth="xl" sx={{ backgroundColor: !matches ? "#F0F6FE" : "#FFFFFF", mx: "auto", padding: !matches ? "1rem 3rem 3rem" : "0rem 0rem" }}>
                <Grid
                    container
                    spacing={!matches ? 8 : 0}
                >
                    <Grid item xs={12} md={4}><HospitalSignUpForm pageType="HospitalSignUp" /></Grid>
                    <Grid item xs={12} md={8}><JobRelatedInfo /></Grid>

                </Grid>
            </Box>
        </Box>
    )
}

export default HospitalSignUp;