import { Box, Card, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import CircularProgress from "@mui/material/CircularProgress";
import moment from 'moment'

const Experience = (props) => {
    const [getExperiencedList, setGetExperiencedList] = useState([]);
    const [noticePeriods, setNoticePeriods] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isNoticeLoaded, setIsNoticeLoaded] = useState(false)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {

        const QUERY_NOTICEMASTER = {
            query: `query MyQuery {
                getNoticePeriodMasters {
                    npID 
                    notice
                }
            }`
        };
        gqlquery(QUERY_NOTICEMASTER, null)
            .then((res) => res.json())
            .then((data) => setNoticePeriods(data?.data?.getNoticePeriodMasters))

        const QUERY_GETEXPERIENCELISTBYAPPLICANT = {
            query: `query MyQuery {
                getExperienceListByApplicant(userID : "${props.userID}") {
                    expID
                    designationID
                    designation
                    instituteName
                    instituteType
                    currentlyWorking
                    jobType
                    workingYear
                    workingMonth
                    startingYear
                    startingMonth
                    description
                    employmentType
                    noticePeriodID
                    healthInstituteTypeID
                    healthInstituteID 
                   }
                }`
        };
        gqlquery(QUERY_GETEXPERIENCELISTBYAPPLICANT, null)
            .then((res) => res.json())
            .then((datas) => {
                // console.log("console 54: ",datas);
                setGetExperiencedList(datas?.data?.getExperienceListByApplicant)
            })
            .finally((e) => setIsLoading(false));

    }, []);

    function toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('en-US', {
            month: 'long',
        });
    };

    return (
        <Box>
            <Card sx={{
                bgcolor: "var(--clr-white)",
                boxShadow: !matches ? "0px 9px 18px rgba(69, 143, 246, 0.09)" : "0px 0px 0px 0px",
                border: !matches ? "" : "1px solid #E4EEF5",
                px: matches ? 1.25 : 2.5,
                py: matches ? 1.25 : 2
            }}
            >
                <Typography
                    variant="h5"
                    sx={{ color: "var(--clr-blue-footer)", fontWeight: "bold", pb: matches ? 1.72 : 2, fontSize: matches ? "18px" : "24px" }}
                    gutterBottom
                    component="div"
                >
                    Experience
                </Typography>
                {isLoading ? (
                    <Box sx={{ textAlign: "center" }}>
                        <CircularProgress color="inherit" />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            gap: matches ? 1.7 : 3,
                            px: matches ? 0.1 : 0.5,
                        }}
                    >
                        {
                            getExperiencedList?.length > 0 ? (
                                getExperiencedList?.map((info) => (
                                    <>
                                        {/* {console.log("item: ", info)} */}
                                        <Grid
                                            container
                                            direction={"row"}
                                            alignItems="flex-start"
                                            key={info?.designationID}
                                            rowSpacing={2.5}
                                            columnSpacing={4}
                                        >
                                            <Grid item direction={"column"} xs={12} md={3}>
                                                <Typography variant="subtitle1" sx={{ ...textStyle, pt: 0.1, fontWeight: "600" }}>
                                                    <div style={{ marginBottom: matches ? "12px" : "" }}>
                                                        {
                                                            info?.startingMonth && toMonthName(info?.startingMonth)
                                                        }
                                                        &nbsp;
                                                        {info?.startingYear} to &nbsp;
                                                        {info?.currentlyWorking ? (
                                                            "Current"
                                                        ) : (
                                                            <span>
                                                                {
                                                                    info?.workingMonth && toMonthName(info?.workingMonth)
                                                                }
                                                                &nbsp;
                                                                {info?.workingYear}
                                                            </span>
                                                        )}
                                                    </div>
                                                </Typography>
                                            </Grid>
                                            <Grid item direction={"column"} xs={12} md={8}>
                                                <Box
                                                    sx={{
                                                        display: "grid",
                                                        lineHeight: "24px",
                                                    }}
                                                >
                                                    <Box sx={{ display: "flex", alignItems: 'flex-start', pb: 1 }}>
                                                        <Typography
                                                            variant="subtile1"
                                                            sx={{
                                                                fontSize: "1rem",
                                                                fontWeight: 600,
                                                                color: "var(--clr-gray-1)",
                                                            }}
                                                        >
                                                            {info?.designation}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ mt: -0.5, display: "flex", flexDirection: "column", gap: 0.3 }}>
                                                        <Typography variant="info" sx={{ fontSize: "12px", fontWeight: "600", color: "#828282", }}>
                                                            {info?.instituteType}
                                                        </Typography>
                                                        <Typography variant="info" sx={{ fontSize: "12px", fontWeight: "600", color: "#828282", }}>
                                                            {info?.instituteName}
                                                        </Typography>
                                                        <Typography variant="info" sx={{ fontSize: "12px", fontWeight: "600", color: "#828282", }}>
                                                            Currently Working: {info?.currentlyWorking ? 'Yes' : 'No'}
                                                        </Typography>
                                                        <Typography variant="info" sx={boldText}>
                                                            Job Type: &nbsp;
                                                            {info?.jobType}
                                                        </Typography>
                                                        <Typography variant="info" sx={boldText}>
                                                            Employment Type: &nbsp;
                                                            {info?.employmentType}
                                                        </Typography>
                                                    </Box>
                                                    <Typography variant="info" sx={boldText}>
                                                        Notice Period: &nbsp; 
                                                         {
                                                            noticePeriods?.map((notice) => (
                                                                info?.noticePeriodID == notice?.npID ? notice?.notice : ''
                                                            ))
                                                        } 
                                                    </Typography>
                                                    <Typography sx={{ fontSize: "12px", fontWeight: "400px", color: "#828282", mt: "6px", mb: 2 }}>
                                                        {info?.description} 
                                                    </Typography> 
                                                </Box>
                                            </Grid> 
                                        </Grid>
                                    </>
                                ))) : (
                                <Typography variant="body2"
                                    gutterBottom sx={{
                                        color: "var(--clr-gray-3)",
                                        fontSize: "12px",
                                        fontWeight: "600 !important",
                                        mb: 1,
                                    }}>
                                    No Details Found
                                </Typography>)
                        }
                    </Box>
                )}
            </Card>
        </Box>
    );
};

export default Experience;
const textStyle = { fontSize: "12px", color: "#828282" };
const boldText = { ...textStyle, fontWeight: "bolder" };