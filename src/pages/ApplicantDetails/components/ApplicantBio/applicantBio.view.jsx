import { Box, Card, Grid, IconButton, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
// import ReactReadMoreReadLess from "react-read-more-read-less";
import { gqlquery } from "../../../../api/hospitalIndex.js";
// import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import WorkIcon from "@mui/icons-material/Work";
// import AddCardIcon from "@mui/icons-material/AddCard";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import dummyPicture from "../../../../assets/images/dummy-profile-pic-300x300-1.png";
import ErrorIcon from '@mui/icons-material/Error';
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import moment from 'moment';
const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const fromTime = [
    "12 AM",
    "01 AM",
    "02 AM",
    "03 AM",
    "04 AM",
    "05 AM",
    "06 AM",
    "07 AM",
    "08 AM",
    "09 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "01 PM",
    "02 PM",
    "03 PM",
    "04 PM",
    "05 PM",
    "06 PM",
    "07 PM",
    "08 PM",
    "09 PM",
    "10 PM",
    "11 PM",
];
const toTime = [
    "12 AM",
    "01 AM",
    "02 AM",
    "03 AM",
    "04 AM",
    "05 AM",
    "06 AM",
    "07 AM",
    "08 AM",
    "09 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "01 PM",
    "02 PM",
    "03 PM",
    "04 PM",
    "05 PM",
    "06 PM",
    "07 PM",
    "08 PM",
    "09 PM",
    "10 PM",
    "11 PM",
];

const ApplicantBio = (props) => {
    const [availableTime, setAvailableTime] = useState([]);
    const [applicantsBio, setApplicantsBio] = useState([]);
    const [getProfileByApplicant, setGetProfileByApplicant] = useState([]);
    const [getExperiencedList, setGetExperiencedList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [educationDetails, setEducationDetails] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [applicantEmails, setApplicantEmails] = useState("");
    const access_token = sessionStorage.getItem("accessToken");
    const [base64Image, setBase64Image] = useState();
    // const [base64Image, setBase64Image] = useState("base64");
    const [imageLoading, setImageLoading] = useState(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const getUserEmail = async () => {
        const res = await provider.getUser({ AccessToken: access_token });
        setUserEmail(res?.UserAttributes[2]?.Value);
    };

    useEffect(() => {
        if (!userEmail) {
            getUserEmail();
        }
    }, []);

    useEffect(() => {
        const QUERY_GETAPPLICANTEMAIL = {
            query: `query MyQuery {
                getApplicantEmail(candidateID: "${props.userID}")
            }
             `,
        };
        gqlquery(QUERY_GETAPPLICANTEMAIL, null)
            .then((res) => res.json())
            .then((datas) => {
                if (datas?.data?.getApplicantEmail) {
                    // console.log(typeof(datas?.data?.getApplicantEmail))
                    setApplicantEmails(JSON.parse(datas?.data?.getApplicantEmail).email)
                }
            })
            .finally((e) => setIsLoading(false));
    }, [])

    useEffect(() => {
        setImageLoading(true);
        const QUERY_DOWNLOADRESUME = {
            query: `query MyQuery {
                  downloadDocument (url: "${props.data?.profilePicURL}")
                }`,
        };
        gqlquery(QUERY_DOWNLOADRESUME, null)
            .then((res) => res.json())
            .then((datas) => {

                const downloadDocument = JSON.parse(datas?.data?.downloadDocument);
                const imageSource = `data:image/png;base64,${downloadDocument?.response?.content}`;
                // console.log(downloadDocument)
                // console.log(props.data)
                //   Object.assign(getcontactdetails[0], downloadDocument);
                setBase64Image(imageSource)
                // setBase64Image(downloadDocument)

            })
            .finally(() => setImageLoading(false));
    }, [])
    useEffect(() => {
        const QUERY_GETEDUCATIONLISTBYAPPLICANT = {
            query: `query MyQuery {
                getEducationListByApplicant(userID : "${props.userID}") {
                    eduID
                    title
                    courseType
                    yearOfPassing
                    courseName
                    specialization
                    university
                    courseID
                    universityID
                   }
                }`,
        };
        gqlquery(QUERY_GETEDUCATIONLISTBYAPPLICANT, null)
            .then((res) => res.json())
            .then((datas) => {
                if (datas?.data?.getEducationListByApplicant) {
                    setEducationDetails(datas?.data?.getEducationListByApplicant)
                }
            })
            .finally((e) => setIsLoading(false));
    }, []);

    useEffect(() => {
        const QUERY_GETEXPERIENCELISTBYAPPLICANT = {
            query: `query MyQuery {
                getExperienceListByApplicant(userID : "${props.userID}") {
                    currentlyWorking 
                    hospital
                    hospitalID 
                    notice
                    noticePeriodID
                   }
                }`,
        };
        gqlquery(QUERY_GETEXPERIENCELISTBYAPPLICANT, null)
            .then((res) => res.json())
            .then((datas) => {
                if (datas?.data?.getExperienceListByApplicant) {
                    setGetExperiencedList(datas?.data?.getExperienceListByApplicant)
                }
            }
            )
            .finally((e) => setIsLoading(false));
    }, []);
    const expData = getExperiencedList?.filter(
        (experience) => experience?.currentlyWorking !== false
    );

    useEffect(() => {
        // For defaut value
        const QUERY_GETCANDIDATEAVAILABILITYBYAPPLICANT = {
            query: `query MyQuery {
                getCandidateAvailabilityByApplicant(userID : "${props?.userID}") {
                    availID
                    day
                    fromTime
                    toTime
                   }
                }`,
        };
        gqlquery(QUERY_GETCANDIDATEAVAILABILITYBYAPPLICANT, null)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                setAvailableTime(data?.data?.getCandidateAvailabilityByApplicant)
            })
            .finally((e) => setIsLoading(false));
    }, []);

    useEffect(() => {
        // For defaut value
        const QUERY_GETCAREERPROFILEBYAPPLICANT = {
            query: `query MyQuery {
                getCareerProfileByApplicant(userID : "${props?.userID}") {
                    cpID
                    departmentID
                    desiredEmploymentType
                    departmentName
                    desiredJobType
                    desiredShift
                    expectedSalaryStart
                    expectedSalaryEnd
                    industry
                    jobRole
                    preferredWorkLocation
                    roleCategory
                   }
                }`,
        };
        gqlquery(QUERY_GETCAREERPROFILEBYAPPLICANT, null)
            .then((res) => res.json())
            .then((data) => setApplicantsBio(data?.data?.getCareerProfileByApplicant))
            .finally((e) => setIsLoading(false));
    }, []);

    useEffect(() => {
        // For defaut value
        const QUERY_GETPROFILEBYAPPLICANT = {
            query: `query MyQuery {
                getProfileByApplicant(userID : "${props?.userID}") {
                    activelySearching
                    city
                    country
                    exp
                    expMonths
                    industry
                    lastLogin
                    locationID
                    name
                    newsletter
                    phone
                    phoneVerified
                    profilePicURL
                    salary
                    salaryThousands
                    specialty
                    state
                    userID
                   }
                }`,
        };
        gqlquery(QUERY_GETPROFILEBYAPPLICANT, null)
            .then((res) => res.json())
            .then((data) => {
                // console.log('get applicant details', data)
                setGetProfileByApplicant(data?.data?.getProfileByApplicant)
            }
            )
            .finally((e) => setIsLoading(false));
    }, []);
    // console.log(getProfileByApplicant)

    return (
        <Box>
            <Card
                sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches ? "0px 9px 18px rgba(69, 143, 246, 0.09)" : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5" ,
                    p: 2,
                    borderRadius: '6px 6px 0px 0px',
                }}
            >
                <Grid container spacing={ matches ? 2 : 3}>
                    <Grid item xs={12} md={3.4}>
                        <Box>
                        { !imageLoading ? 
                              (base64Image === "data:image/png;base64," ? (
                                <img
                                  height="72px"
                                  width="72px"
                                  src={`${dummyPicture}`}
                                  alt={getProfileByApplicant?.name}
                                />
                              ) : (
                                <img
                                  height="72px"
                                  width="72px"
                                  src={base64Image}
                                  alt={getProfileByApplicant?.name}
                                />
                              )) : (<Skeleton variant="rectangular" animation="wave" width="72px" height="72px" sx={{ borderRadius: 1 }} />)
                            } 
                        </Box>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: "var(--clr-blue-footer)",
                                    fontWeight: 600,
                                    fontSize: "18px",
                                }}
                            >
                                {getProfileByApplicant?.name}
                            </Typography>
                            <Box
                                sx={{ display: "flex", gap: 1, textAlign: "center", my: 0.8 }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: "14px", color: "var(--clr-gray-1)" }}
                                >
                                    +91{getProfileByApplicant?.phone}
                                </Typography>
                                {getProfileByApplicant?.phoneVerified ? (
                                    <CheckCircleIcon fontSize="small" sx={{ color: "var(--clr-green-2)" }} />
                                ) : (
                                    <ErrorIcon fontSize="small" sx={{color: "#F2B45A"}} />
                                )}
                                    {/* <IconButton size="small"  sx={{backgroundColor: "#F2B45A !important", borderRadius: 16, padding: '3px !important'}}>
                                        <PriorityHighIcon 
                                            sx={{ color: "#FFF", fontSize:"0.8rem" }} />
                                    </IconButton> */} 
                            </Box>
                            <Box
                                sx={{ display: "flex", gap: 2, textAlign: "center", my: 0.5 }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ color: "var(--clr-gray-1)", fontSize: "14px" }}
                                >
                                    {props?.data?.email || applicantEmails}
                                </Typography>
                                <CheckCircleIcon
                                    fontSize="small"
                                    sx={{ color: "var(--clr-green-2)" }}
                                />
                            </Box>
                            <Box
                                sx={{ display: "flex", gap: 2, textAlign: "center", my: 0.5 }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ color: "var(--clr-gray-1)", fontSize: "14px" }}
                                >
                                     {getProfileByApplicant?.specialty}
                                </Typography>
                                {/* <WorkOutlineOutlinedIcon
                                    sx={{ color: "var(--clr-white-icon)" }}
                                /> */}
                            </Box>
                            <Box
                                sx={{ display: "flex", gap: 2, textAlign: "center", my: 0.5 }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ color: "var(--clr-gray-1)", fontSize: "14px" }}
                                >
                                    {getProfileByApplicant?.city}
                                </Typography>
                                {/* <FmdGoodOutlinedIcon
                                    sx={{ color: "var(--clr-white-icon)" }}
                                /> */}
                            </Box>
                            <Box
                                sx={{ display: "flex", gap: 2, textAlign: "center", my: 0.5 }}
                            >                         
                          {getProfileByApplicant?.activelySearching === true ? (
                            <span style={{ color: "green", fontSize: "14px"}}>
                              Actively Searching Job
                            </span>
                          ) : (
                            <span style={{ color: "red", fontSize: "14px"}}>
                              Not Actively Searching Job
                            </span>
                          )}
                           {/* <AssignmentIndOutlinedIcon
                            sx={{ color: "var(--clr-white-icon)" }}
                          /> */}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8.6}>
                        <Box sx={{ pb: matches ? 0.8 : 2 }}>
                            <Grid container spacing={ matches ? 1 : 3}>
                                <Grid item xs={5} md={4}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "var(--clr-gray-3)",
                                            fontSize: "12px",
                                            fontWeight: "600 !important",
                                        }}
                                    >
                                        Avaialable Time
                                    </Typography>
                                </Grid>
                                <Grid item xs={7} md={8}>
                                    <Box>
                                        {availableTime.length > 0 ? availableTime?.map((time) => (
                                            <Typography
                                                variant="body2"
                                                gutterBottom
                                                key={time?.availID}
                                                sx={{
                                                    color: "var(--clr-gray-2)",
                                                    fontSize: "12px",
                                                    fontWeight: "600 !important",
                                                    mb: 1,
                                                }}
                                            >
                                                {time?.day} {fromTime[time?.fromTime]} {"-"}{" "}
                                                {toTime[time?.toTime]}
                                            </Typography>
                                        )) : <Typography variant="body2"
                                            gutterBottom
                                            sx={{
                                                color: "var(--clr-gray-2)",
                                                fontSize: "12px",
                                                fontWeight: "600 !important",
                                                mb: 1,
                                            }}>
                                            No Available Time found
                                        </Typography>}

                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ pb: matches ? 0.8 : 2 }}>
                            <Grid container spacing={ matches ? 1 : 3}>
                                <Grid item xs={5} md={4}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "var(--clr-gray-3)",
                                            fontSize: "12px",
                                            fontWeight: "600 !important",
                                        }}
                                    >
                                        Communication Preference
                                    </Typography>
                                </Grid>
                                <Grid item xs={7} md={8}>
                                    <Typography
                                        variant="body2"
                                        gutterBottom
                                        sx={{
                                            color: "var(--clr-gray-2)",
                                            fontSize: "12px",
                                            fontWeight: "600 !important",
                                            mb: 1,
                                        }}
                                    > Phone
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ color: "var(--clr-gray-1)", lineHeight: "24px" }}>
                                {props.resumeHeadline}
                            </Typography>
                        </Box>

                    </Grid>
                </Grid>
                
            </Card>
            <Box sx={{backgroundColor: '#E4EEF5', boxShadow:  !matches ? "0px 9px 18px rgba(69, 143, 246, 0.09)" : "0px 0px 0px 0px", borderRadius: '0px 0px 6px 6px', px: 1, py: 1}}>
                    <Typography sx={{color: '#395987', fontSize: matches ? '12px' : '14px', fontWeight: '600', textAlign: 'center'}}>Last Active: {moment(getProfileByApplicant?.lastLogin).format('DD-MMM-YYYY HH:mm:ss')}</Typography>
            </Box>
        </Box>
    );
};

export default ApplicantBio;




/* 
<Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                            {getProfileByApplicant?.activelySearching && (
                                <Typography
                                    sx={{
                                        backgroundColor: "#6FCF97",
                                        px: 3,
                                        py: 0.7,
                                        borderRadius: "24px",
                                        fontSize: "14px",
                                        color: "white",
                                        fontWeight: 500,
                                    }}
                                >
                                    Acitvely Searching
                                </Typography>
                            )}
                        </Box>
                        <Box sx={{ display: "flex", gap: 3, pl: 4, pr: 1, mb: 4 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyCotent: "center",
                                }}
                            >
                                <Typography variant="body2" gutterBottom>
                                    <PhoneAndroidIcon color=" " fontSize="medium" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ fontSize: 18, color: "#333333" }}
                                >
                                    &nbsp;
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyCotent: "center",
                                }}
                            >
                                <Typography variant="body2" gutterBottom>
                                    <MailOutlineIcon color=" " fontSize="medium" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ fontSize: 18, color: "#333333" }}
                                >
                                    &nbsp;
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyCotent: "center",
                                }}
                            >
                                <Typography variant="body2" gutterBottom>
                                    <LocationOnIcon color=" " fontSize="medium" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ fontSize: 18, color: "#333333" }}
                                >
                                    &nbsp; {getProfileByApplicant?.city}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyCotent: "center",
                                }}
                            >
                                <Typography variant="body2" gutterBottom>
                                    <WorkIcon color=" " fontSize="medium" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ fontSize: 18, color: "#333333" }}
                                >
                                    &nbsp; {getProfileByApplicant?.exp} Years 
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyCotent: "center",
                                }}
                            >
                                <Typography variant="body2" gutterBottom>
                                    <AddCardIcon color=" " fontSize="medium" />
                                </Typography>
                                <Typography
                                    variant="body2"
                                    gutterBottom
                                    sx={{ fontSize: 18, color: "#333333" }}
                                >
                                    &nbsp; {applicantsBio?.expectedSalaryStart} -{" "}
                                    {applicantsBio?.expectedSalaryEnd} Lakhs 
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: 3 }}>
                            <Grid
                                item
                                xs={5}
                                sx={{
                                    pl: 4,
                                    pr: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                <Box>
                                    <Typography sx={{ color: "#6F7482", fontWeight: 500 }}>
                                        Current
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: "17px" }}>
                                        {expData[0]?.hospital}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{ color: "#6F7482", fontWeight: 500 }}>
                                        Education
                                    </Typography>
                                    {educationDetails?.map((edu) => (
                                        <Typography
                                            sx={{ fontWeight: 500, fontSize: "17px", mb: 0.5 }}
                                        >
                                            {edu?.courseName}
                                        </Typography>
                                    ))}
                                </Box>
                                <Box>
                                    <Typography sx={{ color: "#6F7482", fontWeight: 500 }}>
                                        Preffered Location
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: "17px" }}>
                                        {applicantsBio?.preferredWorkLocation}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{ color: "#6F7482", fontWeight: 500 }}>
                                        Notice Period
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, fontSize: "17px" }}>
                                        {expData[0]?.notice}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={7} sx={{}}>
                                <Typography
                                    variant="body1"
                                    gutterBottom
                                    sx={{ fontSize: "24px", fontWeight: 500 }}
                                >
                                    Resume Headline
                                </Typography>
                                <Typography sx={{ color: "GrayText", pr: 3 }}>
                                      <ReactReadMoreReadLess
                                        charLimit={200}
                                        readMoreText={"Read more"}
                                        readLessText={"Read less"}
                                        readMoreClassName="read-more-less--more"
                                        readLessClassName="read-more-less--less"  
                                        
                                    >  

                                     </ReactReadMoreReadLess>  
                                </Typography>
                            </Grid>
                        </Box>

*/