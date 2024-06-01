import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react"; 
import { createTheme, useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const theme = createTheme();
const useStyles = makeStyles({
    jobRelatedInfoSection: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}); 

const JobRelatedInfo = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box className={classes.jobRelatedInfoSection} sx={{ padding: !matches ? "12px 0px 12px 0px" : "20px 10px 30px 18px", mr: matches ? 1.5 : 3 }}>
            <Grid
                container
                rowSpacing={3}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        backgroundColor: "var(--clr-white)",
                        borderRadius: 2,
                        boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                        border: matches ? "1px solid #E4EEF5" : "",
                        px: matches ? 1.25 : 3,
                        py: matches ? 1.25 : 2
                    }}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                color: "var(--clr-blue-footer)",
                                fontSize: matches ? "18px" : "24px"
                            }}
                        >
                            Job Posting
                        </Typography>
                        <Typography
                            sx={{ py: 2.5, color: "var(--clr-gray-2)", fontSize : !matches ? "16px" : "14px", fontWeight: "400" }}
                        >
                            Register with MedLink and post new job requirements. List your hospital or healthcare organization's requirements for the job, the skills and qualifications required, and the description of the organization's hires. With MedLink, you will have access to choose among a wide range of job aspirants.
                        </Typography>
                        <Box>
                            <Button
                                variant="outlined"
                                sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                            >
                                Know More
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        backgroundColor: "var(--clr-white)",
                        boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                        border: matches ? "1px solid #E4EEF5" : "",
                        borderRadius: 2,
                        px: matches ? 1.25 : 3,
                        py: matches ? 1.25 : 2
                    }}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                color: "var(--clr-blue-footer)",
                                fontSize: matches ? "18px" : "24px"
                            }}
                        >
                            Jobseeker Resume Access (JRA)
                        </Typography>
                        <Typography
                            sx={{ py: 2.5, color: "var(--clr-gray-2)", fontSize : !matches ? "16px" : "14px", fontWeight: "400" }}
                        >
                            We welcome the HR Teams of hospitals and healthcare organizations to join hands in building a solid network of doctors and recruiters to strengthen India's healthcare community. Subscribe with us to surf our website and mobile applications for the profiles of talented doctors, advanced practitioners, physicians, Allied Healthcare professionals, Nurses and Midwives.
                        </Typography>
                        <Box>
                            <Button 
                                variant="outlined"
                                sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                            >
                                Know More
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        backgroundColor: "var(--clr-white)",
                        boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                        border: matches ? "1px solid #E4EEF5" : "",
                        borderRadius: 2,
                        px: matches ? 1.25 : 3,
                        py: matches ? 1.25 : 2
                    }}>
                        <Typography
                            sx={{
                                fontWeight: 600,
                                color: "var(--clr-blue-footer)",
                                fontSize: matches ? "18px" : "24px"
                            }}
                        >
                            Advertisement
                        </Typography>
                        <Typography
                            sx={{ py: 2.5, color: "var(--clr-gray-2)", fontSize : !matches ? "16px" : "14px", fontWeight: "400" }}
                        >
                            Contact us for more details 
                        </Typography>
                        <Box> 
                            <Button
                                component={Link}
                                to="/contact-us"
                                variant="outlined"
                                sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                            >
                                Know More
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default JobRelatedInfo;