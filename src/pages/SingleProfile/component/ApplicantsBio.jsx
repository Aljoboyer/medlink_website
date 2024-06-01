import { Box, Card, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import ReactReadMoreReadLess from "react-read-more-read-less";
// import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import WorkIcon from "@mui/icons-material/Work";
// import AddCardIcon from "@mui/icons-material/AddCard";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { styled } from "@mui/material/styles";
import moment from 'moment';
import { gqlquery } from "../../../api/hospitalIndex";
const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const UserInfoBox = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
    color: "var(--clr-gray-1)"
}));
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
    const [latestExperience, setLatestExperiences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [latestEducation, setLatestEducation] = useState([]);
    const [educationDetails, setEducationDetails] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [applicantEmails, setApplicantEmails] = useState("");
    const access_token = sessionStorage.getItem("accessToken");
    const [base64Image, setBase64Image] = useState("base64");
    const [imageLoading, setImageLoading] = useState(false);
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
                    // console.log(datas?.data)
                    // console.log(typeof (datas?.data?.getApplicantEmail))
                    // console.log(JSON.parse(datas.data.getApplicantEmail).email)
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
              
                console.log(props.data)
                //   Object.assign(getcontactdetails[0], downloadDocument);
                if(downloadDocument?.response?.content) {
                    console.log('dasdfas',downloadDocument?.response?.content.slice(0,5))
                    setBase64Image(downloadDocument)
                }

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
                    startingMonth
                    startingYear
                    workingMonth
                    workingYear
                   }
                }`,
        };
        gqlquery(QUERY_GETEXPERIENCELISTBYAPPLICANT, null)
            .then((res) => res.json())
            .then((datas) => {
                console.log(datas)
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
        const currentJob = getExperiencedList.filter(idx => idx.currentlyWorking === true);
        if (currentJob.length > 0) {
            setLatestExperiences(currentJob);
        }
        else {
            const newArray = getExperiencedList?.sort((a, b) => new Date(b.workingYear + b.workingYear) - new Date(a.workingYear + a.workingMonth));
            setLatestExperiences(newArray);
        }
    }, [getExperiencedList])
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
        const newArray = educationDetails?.sort((a, b) => new Date(b.yearOfPassing) - new Date(a.yearOfPassing));
        // console.log(newArray);
        setLatestEducation(newArray);
    }, [educationDetails])
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
                    exp
                    expMonths
                    name 
                    newsletter
                    phone
                    phoneVerified
                    salary
                    salaryThousands
                    specialization
                    lastLogin
                   }
                }`,
        };
        gqlquery(QUERY_GETPROFILEBYAPPLICANT, null)
            .then((res) => res.json())
            .then((data) => {
                console.log('get applicant details', data)
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
                    boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                    p: 2,
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={2.5}>
                        <Box>
                            {/* {console.log(base64Image)} */}
                            {
                                imageLoading ? (
                                    <Skeleton variant="rectangular" height="72px" />
                                ) : (

                                    base64Image === "base64" ? <img
                                        src={`https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png`}
                                        height="150px"

                                        maxWidth="100px"
                                        style={{ borderRadius: '5px' }}
                                        alt={getProfileByApplicant?.name}
                                    /> :
                                        <img
                                            src={`data:image/png;base64,${base64Image?.response?.content}`}
                                            height="150px"
                                            // maxWidth="150px"
                                            width="170px"
                                            style={{ borderRadius: '5px' }}
                                            alt={getProfileByApplicant?.name}
                                        />
                                )
                            }
                        </Box>
                        <Box>
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

                            <Box>
                                {availableTime?.length > 0 ? availableTime?.map((time) => (
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
                        </Box>
                    </Grid>
                    <Grid item xs={8.6} md={9.5}>
                        <Box sx={{ pb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                                {getProfileByApplicant?.activelySearching && <Box sx={{
                                    bgcolor: "#6FCF97",
                                    px: 2,
                                    py: 0.8,
                                    borderRadius: 16,
                                    display: "flex",
                                    // gap: 3,
                                }}>
                                    <Typography sx={{ color: 'var(--clr-white)', fontWeight: 600, fontSize: '12px', lineHeight: '12px' }}>
                                        Actively Searching
                                    </Typography>
                                </Box>}

                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", py: 2, gap: 2 }}>
                                <UserInfoBox>
                                    <PhoneIphoneIcon sx={{ color: "var(--clr-white-icon)" }} />
                                    {getProfileByApplicant?.phone}
                                    {getProfileByApplicant?.phoneVerified ?
                                        <CheckCircleIcon
                                            fontSize="small"
                                            sx={{ color: "var(--clr-green-2)" }}
                                        />
                                        :
                                        <IconButton size="small"  sx={{backgroundColor: "#F2B45A !important", borderRadius: 16, padding: '3px !important'}}>
                                        <PriorityHighIcon 
                                            sx={{ color: "#FFF", fontSize:"0.8rem" }} />
                                    </IconButton>
                                    }
                                </UserInfoBox>
                                <UserInfoBox>
                                    <EmailOutlinedIcon sx={{ color: "var(--clr-white-icon)" }} />
                                    {props?.data?.email || applicantEmails}
                                    <CheckCircleIcon
                                        fontSize="small"
                                        sx={{ color: "var(--clr-green-2)" }}
                                    />
                                </UserInfoBox>
                                <UserInfoBox>
                                    <FmdGoodOutlinedIcon sx={{ color: "var(--clr-white-icon)" }} />
                                    {getProfileByApplicant?.city}
                                </UserInfoBox>
                                <UserInfoBox>
                                    <WorkOutlineOutlinedIcon sx={{ color: "var(--clr-white-icon)" }} />
                                    {getProfileByApplicant?.exp}
                                </UserInfoBox>
                                <UserInfoBox>
                                    <AccountBalanceWalletOutlinedIcon sx={{ color: "var(--clr-white-icon)" }} />
                                    {/* {getProfileByApplicant?.salaryThousands} Lakhs  */}

                                    {(getProfileByApplicant?.salary === 0) ? (
                                        <>
                                            {getProfileByApplicant?.salaryThousands && `${(getProfileByApplicant?.salaryThousands === 0 || getProfileByApplicant?.salaryThousands === 1) ? getProfileByApplicant?.salaryThousands+" Thousand" : getProfileByApplicant?.salaryThousands+" Thousands"}`}
                                        </>
                                    ) : (
                                        <>
                                            {getProfileByApplicant?.salary && `${(getProfileByApplicant?.salary === 0 || getProfileByApplicant?.salary === 1) ? getProfileByApplicant?.salary+" Lakh" : (getProfileByApplicant?.salary)+" Lakhs"}`}  {getProfileByApplicant?.salaryThousands && `${(getProfileByApplicant?.salaryThousands === 0 || getProfileByApplicant?.salaryThousands === 1) ? getProfileByApplicant?.salaryThousands+" Thousand" : getProfileByApplicant?.salaryThousands+" Thousands"}`} 
                                        </>
                                    )
                                    }
                                </UserInfoBox>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Box sx={{ pb: 1 }}>
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                            component="div"
                                            sx={{
                                                // width: "200px",
                                                color: "var(--clr-gray-3)",
                                                fontSize: "0.8rem",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Current Industry
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                            component="div"
                                            sx={{
                                                // width: "200px",
                                                color: "#3B4256",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {applicantsBio?.industry || 'N/A'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ pb: 1 }}>
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                            component="div"
                                            sx={{
                                                // width: "200px",
                                                color: "var(--clr-gray-3)",
                                                fontSize: "0.8rem",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Education
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                            component="div"
                                            sx={{
                                                // width: "200px",
                                                color: "#3B4256",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {latestEducation?.length > 0 ? latestEducation.slice(0, 1).map((info, index) => (
                                                <Box key={info.id}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{ color: "var(--clr-gray-1)", fontWeight: "600", fontSize: "1rem" }}
                                                        component="div"
                                                    >
                                                        {info?.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{ color: "var(--clr-gray-3)", fontWeight: "600", fontSize: "0.8rem" }}
                                                        component="div"
                                                    >
                                                        {info?.specialization}
                                                    </Typography>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{ color: "var(--clr-gray-3)", fontWeight: "600", fontSize: "0.8rem" }}
                                                        component="div"
                                                    >
                                                        {info?.courseName}
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{ color: "var(--clr-gray-3)", fontSize: "0.8rem", fontWeight: 500 }}
                                                        gutterBottom
                                                        component="div"
                                                    >
                                                        {info?.university}
                                                    </Typography>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{ color: "var(--clr-gray-3)", fontSize: "0.8rem", fontWeight: 500 }}
                                                        gutterBottom
                                                        component="div"
                                                    >
                                                        {info?.yearOfPassing} ({info?.courseType})
                                                    </Typography>
                                                </Box>
                                            ))
                                                :

                                                <Typography variant="body2"
                                                    gutterBottom sx={{
                                                        color: "var(--clr-gray-3)",
                                                        fontSize: "14px",
                                                        fontWeight: "600 !important",
                                                        mb: 1,
                                                    }}>
                                                    No Details Found
                                                </Typography>
                                            }
                                            {/* {applicantsBio?.industry || 'N/A'} */}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ pb: 1 }}>
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                            component="div"
                                            sx={{
                                                // width: "200px",
                                                color: "var(--clr-gray-3)",
                                                fontSize: "0.8rem",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Preferred Location
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                            component="div"
                                            sx={{
                                                // width: "200px",
                                                color: "#3B4256",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {applicantsBio?.preferredWorkLocation || 'N/A'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ pb: 1 }}>
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                            component="div"
                                            sx={{
                                                // width: "200px",
                                                color: "var(--clr-gray-3)",
                                                fontSize: "0.8rem",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Notice Period
                                        </Typography>
                                        {latestExperience?.slice(0, 1)?.map((item, i) => (
                                            <Typography
                                                variant="subtitle2"
                                                gutterBottom
                                                component="div"
                                                sx={{
                                                    // width: "200px",
                                                    color: "#3B4256",
                                                    fontSize: "14px",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {item.notice || 'N/A'}
                                            </Typography>
                                        ))}

                                    </Box>
                                    <Box sx={{ pb: 1 }}>
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                            component="div"
                                            sx={{
                                                // width: "200px",
                                                color: "var(--clr-gray-3)",
                                                fontSize: "0.8rem",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Communication Preference
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                            component="div"
                                            sx={{
                                                // width: "200px",
                                                color: "#3B4256",
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {applicantsBio?.communicationPreference || 'Phone'}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: "var(--clr-gray-1)", lineHeight: "24px" }}>
                                            {props.resumeHeadline || 'No resume headline available'}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        {/* <Box sx={{ pb: 2 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
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
                                <Grid item xs={8}>
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
                        </Box> */}
                    </Grid>
                </Grid>
            </Card >
            <Box sx={{backgroundColor: '#E4EEF5', boxShadow: '0px 0px 9px rgba(69, 143, 246, 0.09)', borderRadius: '0px 0px 6px 6px', px: 1, py: 1}}>
                    <Typography sx={{color: '#395987', fontSize: '14px', fontWeight: '600', textAlign: 'center'}}>Last Active: {moment(getProfileByApplicant?.lastLogin).format('DD-MMM-YYYY HH:mm:ss')}</Typography>
                </Box>
        </Box >
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