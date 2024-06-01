import { Box, TextField, InputAdornment, Button, Typography, Grid, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { gqlquery, QUERY_GETMYPROFILE } from "../../api/hospitalIndex";
import { Link } from "react-router-dom";


const useStyles = makeStyles({
    routeContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    routeBox: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#F2F2F2",
        marginBottom: "",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.15)",
        borderRadius: "5px"
    },

});

export default function HospitalDashboardMob() {
    const classes = useStyles();
    const [accessJobPosting, setAccessJobPosting] = useState([]);

    useEffect(() => {
        gqlquery(QUERY_GETMYPROFILE, null)
            .then((res) => res.json())
            .then((datas) => {
                setAccessJobPosting(datas?.data?.getMyProfile);
                console.log("successfull 2", datas);
            });
    }, []);

    return (
        <Box maxWidth="sm" sx={{ mx: "auto", mb: 10 }}>
            <Box sx={{ backgroundColor: "#E0E0E0", padding: "15px 0 15px 17px", display: "flex", alignItems: "center", gap: "20px" }}>
                {/* <MenuIcon sx={{ height: "24px", width: "24px" }} /> */}
                <Typography sx={{ lineHeight: "24px", fontWeight: "600" }}> My Profile  </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", px: 2 }}>
                {/* SearchBar */}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", pt: 1.5, pb: 3 }}>
                    <TextField
                        name="keywordCTC"
                        placeholder="Enter Keyword/CTC"
                        sx={{ backgroundColor: "", size: "large", borderRadius: "7px", zIndex: "1", "& .MuiInputBase-input": { height: 16 }, width: "100%", border: "none !important", }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        <SearchIcon sx={{ fontSize: "30px" }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Grid container spacing={3} sx={{}}>
                    <Grid item xs={12} className={classes.routeContainer}>
                        <Box className={classes.routeBox}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Search Resumes</Typography> <ChevronRightIcon />
                        </Box>
                        {
                            accessJobPosting?.accessJobPosting ? (
                                <Box component={Link} to="/create-vacancy-mob" className={classes.routeBox}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Post Hot Vacancy</Typography>
                                    <ChevronRightIcon />
                                </Box>
                            ) : (
                                <Box className={classes.routeBox}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Post Hot Vacancy</Typography>
                                    <ChevronRightIcon />
                                </Box>
                            )
                        }
                        {
                            accessJobPosting?.accessJobPosting ? (
                                <Box component={Link} to="/post-job-mob" className={classes.routeBox}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Post a Job</Typography>
                                    <ChevronRightIcon />
                                </Box>
                            ) : (
                                <Box className={classes.routeBox}>
                                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Post a Job</Typography> <ChevronRightIcon />
                                </Box>
                            )
                        } 
                        <Box className={classes.routeBox}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Product Setting</Typography> <ChevronRightIcon />
                        </Box>
                        <Box className={classes.routeBox}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Manage Sub-users</Typography> <ChevronRightIcon />
                        </Box>
                        <Box className={classes.routeBox}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Subscription Status</Typography> <ChevronRightIcon />
                        </Box>
                        <Box className={classes.routeBox}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Usage Status</Typography> <ChevronRightIcon />
                        </Box>
                        <Box className={classes.routeBox}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Company Profile</Typography> <ChevronRightIcon />
                        </Box>
                        <Box className={classes.routeBox}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Change Password</Typography> <ChevronRightIcon />
                        </Box>
                    </Grid>
                    <Grid item sx={{ display: "grid", flexDirection: "column", gap: 3 }} xs={12}>
                        <Box sx={{ backgroundColor: "#f2f2f2", borderRadius: "10px", boxShadow: 1, p: 1.2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 2, }}>Job Posting</Typography>
                            <Typography variant="body2" sx={{ mb: 2, color: "#1A1A1A" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non mi ac felis faucibus aliquam eu tincidunt neque. Mauris dapibus facilisis ex, sed imperdiet odio posuere id.</Typography>
                            <Button size="medium" sx={{ backgroundColor: "white", color: "#BDBDBD", border: "2px solid #a1a1a1", borderRadius: "7px", fontWeight: 600, fontSize: "16px", px: 2, ml: "1px" }}>Know More</Button>
                        </Box>
                        <Box sx={{ backgroundColor: "#f2f2f2", borderRadius: "10px", boxShadow: 1, p: 1.2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 2, }}>Resume Database</Typography>
                            <Typography variant="body2" sx={{ mb: 2, color: "#1A1A1A" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non mi ac felis faucibus aliquam eu tincidunt neque. Mauris dapibus facilisis ex, sed imperdiet odio posuere id. Donec at lobortis massa. Vestibulum odio dui, pretium in aliquam eget, venenatis a lacus.</Typography>
                            <Button size="medium" sx={{ backgroundColor: "white", color: "#BDBDBD", border: "2px solid #a1a1a1", borderRadius: "7px", fontWeight: 600, fontSize: "16px", px: 2, ml: "1px" }}>Know More</Button>
                        </Box>
                        <Box sx={{ backgroundColor: "#f2f2f2", borderRadius: "10px", boxShadow: 1, p: 1.2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "600", mb: 2, }}>Advertisement</Typography>
                            <Typography variant="body2" sx={{ mb: 2, color: "#1A1A1A" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non mi ac felis faucibus aliquam eu tincidunt neque. Mauris dapibus facilisis ex, sed imperdiet odio posuere id. Donec at lobortis massa. Vestibulum odio dui, pretium in aliquam eget, venenatis a lacus.</Typography>
                            <Button size="medium" sx={{ backgroundColor: "white", color: "#BDBDBD", border: "2px solid #a1a1a1", borderRadius: "7px", fontWeight: 600, fontSize: "16px", px: 2, ml: "1px" }}>Know More</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
