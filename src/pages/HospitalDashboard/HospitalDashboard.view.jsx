import {
  Box,
  InputAdornment,
  Button,
  Typography,
  Card,
  Grid,
  CircularProgress,
  Input,
  IconButton,
  Divider,
  Snackbar,
  Skeleton,
} from "@mui/material";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  gqlquery,
  QUERY_GETACTIVEJOBPOSTSUBSCRIPTION,
  QUERY_GETACTIVERESUMEDBSUBSCRIPTION,
  QUERY_GETACTIVESUBSCRIPTIONS,
  QUERY_GETHOSPITAL,
  QUERY_GETMYPROFILE,
  QUERY_HOSPITALDETAILS,
  QUERY_HOSPITALPICTURES,
} from "../../api/hospitalIndex";
import homeBanner from "../../assets/images/doctors_home_banner.png";
import scletonImg from "../../assets/square_img.png";
import MuiAlert from '@mui/material/Alert';
import useAuth from "../../hooks/useAuth";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SearchButton = styled(Button)(() => ({
  border: "none !important",
}));

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
    backgroundColor: "var(--clr-white)",
    border: "1px solid var(--clr-blue-light)",
    borderRadius: "6px",
  },

});

export default function HospitalDashboardView() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [hospitalData, setHospitalData] = useState([]);
  const [accessJobPosting, setAccessJobPosting] = useState([]);
  const [base64Image, setBase64Image] = useState();
  const [hospitalDetails, setHospitalDetails] = useState([]);
  const [controlStrength, setControlSrength] = useState({
    logo: 0,
    about: 0,
    gallery: 0,
    video: 0,
    phoneVerified: 0,
    website: 0,
    pan: 0,
    gstin: 0,
    address: 0,
  });
  const [profileStrength, setProfileStrength] = useState(0);
  const [lackingStrength, setLackingStrength] = useState({
    logo: 0,
    about: 0,
    gallery: 0,
    video: 0,
    phoneVerified: 0,
    website: 0,
    pan: 0,
    gstin: 0,
    address: 0,
  });
  const [activeJobPostSubscription, setActiveJobPostSubscription] = useState([]);
  const [activeResumeSubscription, setActiveResumeSubscription] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [resumeSubSnackbar, setResumeSubSnackbar] = useState(false);
  const [values, setValues] = useState({
    keyword: "",
    employmentType: "",
    experienceFrom: "1",
    experienceTo: "20",
    functionAreaID: "0",
    industry: "",
    pageNumber: "1",
    preferredLocation: "",
    salaryRangeEnd: "100",
    salaryRangeStart: "0",
    formHospitalHome: true,
  });
  const [imageLoading, setImageLoading] = useState(true);
  const { setHospitalImage } = useAuth();
  document.title = "Dashboard | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  useEffect(() => {
    let gstinAddedInRegisterPhase = false;
    // console.log('hospitalData by ahan', hospitalData)
    gqlquery(QUERY_GETHOSPITAL, null)
      .then((res) => res.json())
      .then((datas) => {
        setHospitalData(datas?.data?.getHospital);
        if (!datas?.data?.getHospital?.taxNumber) {
          setLackingStrength((prev) => ({ ...prev, "gstin": 1 }))
        }
        if (
          datas?.data?.getHospital?.taxNumber &&
          controlStrength?.gstin === 0
        ) {
          gstinAddedInRegisterPhase = true;
          setControlSrength({ gstin: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 10),
            10000
          );
        };
      });

      console.log("before controlStrength?.gstin", controlStrength);

    gqlquery(QUERY_HOSPITALDETAILS, null)
      .then((res) => res.json())
      .then((data) => {
        setHospitalDetails(data?.data?.getHospitalDetails);
        console.log(gstinAddedInRegisterPhase, 122334, data?.data?.getHospitalDetails);


        // percentage for profile picture
        if (!data?.data?.getHospitalDetails?.profilePicURL) {
          setLackingStrength((prev) => ({ ...prev, logo: 1 }));
        }
        if (
          data?.data?.getHospitalDetails?.profilePicURL &&
          controlStrength?.logo === 0
        ) {
          setControlSrength({ logo: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 15),
            10000
          );
        }

        // percentage for about us
        if (!data?.data?.getHospitalDetails?.about) {
          setLackingStrength((prev) => ({ ...prev, about: 1 }));
        }
        if (
          data?.data?.getHospitalDetails?.about &&
          controlStrength?.about === 0
        ) {
          setControlSrength({ about: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 10),
            10000
          );
        }

        // percentage for video
        if (!data?.data?.getHospitalDetails?.video) {
          setLackingStrength((prev) => ({ ...prev, video: 1 }));
        }
        if (
          data?.data?.getHospitalDetails?.video &&
          controlStrength?.video === 0
        ) {
          setControlSrength({ video: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 5),
            10000
          );
        }

        // percentage for phone verified
        if (!data?.data?.getHospitalDetails?.phoneVerified) {
          setLackingStrength((prev) => ({ ...prev, phoneVerified: 1 }));
        }
        if (
          data?.data?.getHospitalDetails?.phoneVerified &&
          controlStrength?.phoneVerified === 0
        ) {
          setControlSrength({ phoneVerified: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 20),
            10000
          );
        }

        // percentage for website
        if (!data?.data?.getHospitalDetails?.website) {
          setLackingStrength((prev) => ({ ...prev, website: 1 }));
        }
        if (
          data?.data?.getHospitalDetails?.website &&
          controlStrength?.website === 0
        ) {
          setControlSrength({ website: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 10),
            10000
          );
        }

        // percentage for pan
        if (!data?.data?.getHospitalDetails?.pan) {
          setLackingStrength((prev) => ({ ...prev, pan: 1 }));
        }
        if (data?.data?.getHospitalDetails?.pan && controlStrength?.pan === 0) {
          setControlSrength({ pan: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 10),
            10000
          );
        }

        // percentage for gstin number
        if (!data?.data?.getHospitalDetails?.gstin) {
          setLackingStrength((prev) => ({ ...prev, gstin: 1 }));
        }
        if (
          data?.data?.getHospitalDetails?.gstin &&
          controlStrength?.gstin === 0 && !gstinAddedInRegisterPhase
        ) {
          setControlSrength({ gstin: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 10),
            10000
          );
        }

        // percentage for address
        if (!data?.data?.getHospitalDetails?.address) {
          setLackingStrength((prev) => ({ ...prev, address: 1 }));
        }
        if (
          data?.data?.getHospitalDetails?.address &&
          controlStrength?.address === 0
        ) {
          setControlSrength({ address: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 10),
            10000
          );
        }
      });

    // percentage for gallery images
    gqlquery(QUERY_HOSPITALPICTURES, null)
      .then((res) => res.json())
      .then((data) => {
        if (!data?.data?.getHospitalPictures) {
          setLackingStrength((prev) => ({ ...prev, gallery: 1 }));
        }
        if (
          data?.data?.getHospitalPictures.length > 0 &&
          controlStrength?.gallery === 0
        ) {
          setControlSrength({ gallery: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 10),
            10000
          );
        }
      });
  }, []);

  useEffect(() => {
    // gqlquery(QUERY_GETHOSPITAL, null)
    //   .then((res) => res.json())
    //   .then((datas) => {
    //     setHospitalData(datas?.data?.getHospital);
    //   });

    gqlquery(QUERY_GETMYPROFILE, null)
      .then((res) => res.json())
      .then((datas) => {
        setAccessJobPosting(datas?.data?.getMyProfile);
      });

    gqlquery(QUERY_HOSPITALDETAILS, null)
      .then((res) => res.json())
      .then((data) => {

        const QUERY_DOWNLOADRESUME = {
          query: `query MyQuery {
                downloadDocument (url: "${data?.data?.getHospitalDetails?.profilePicURL}")
              }`,
        };
        gqlquery(QUERY_DOWNLOADRESUME, null)
          .then((res) => res.json())
          .then((datas) => {
            const downloadDocument = JSON.parse(datas?.data?.downloadDocument);
            const imageSource = `data:image/png;base64,${downloadDocument?.response?.content}`;
            setBase64Image(imageSource);
            setImageLoading(false);
            setHospitalImage(imageSource);
          })
      });
  }, []);

  useEffect(() => {
    gqlquery(QUERY_GETACTIVEJOBPOSTSUBSCRIPTION, null)
      .then((res) => res.json())
      .then((data) => {
        setActiveJobPostSubscription(data?.data?.getActiveJobPostSubscription)
      });

    gqlquery(QUERY_GETACTIVERESUMEDBSUBSCRIPTION, null)
      .then((res) => res.json())
      .then((data) => {
        setActiveResumeSubscription(data?.data?.getActiveResumeDBSubscription)
      });

    gqlquery(QUERY_GETACTIVESUBSCRIPTIONS, null)
      .then((res) => res.json())
      .then((data) => {
        setActiveSubscription(data?.data?.getActiveSubscriptions);
      });
  }, [])

  const accessJobPostingObj = activeSubscription?.find(aS => aS?.type === "JobPosting");
  const resumeDB = activeSubscription?.filter(aS => aS?.type === "ResumeDB");
  const accessHotJobObj = activeSubscription?.find(aS => aS?.type === "HotVacancy");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // Handle job search
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleJobsSearch = (event) => {
    event.preventDefault();
    values.anyKeywords = values?.keyword;
    values.allKeywords = values?.keyword;
    const handleNavigate = () => {
      navigate("/search-resume-result", { state: values });
    };
    if (resumeDB[0]?.creditsLeft > 0) {
      setTimeout(handleNavigate, 1000);
    } else {
      console.log("snacks bar click")
      setOpenSnackbar(true);
      setResumeSubSnackbar(true);
    }

  };

  return (
    <Box>
      {/* large screen view */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Box
          style={{
            backgroundImage: `url(${homeBanner})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          sx={{ bgcolor: "#E0E0E0", height: "240px" }}
        >
        </Box>
        <Box sx={{ mx: "auto", mb: 10 }}>
          <Box mixWidth="xl" sx={{ mx: 5, px: 2 }}>
            <Grid container spacing={2.5}>
              <Grid item xs={2.3}>
                <Box
                  sx={{
                    boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                    backgroundColor: "var(--clr-white)",
                    borderRadius: 1,
                    mt: 17.5,
                    px: 1.3,
                    pb: 1.3,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "18px",
                      color: "#333333",
                      px: 1.5,
                      py: 1.5,
                    }}
                  >
                    <Link to="/advance-search">Search Resumes</Link>
                  </Typography>

                  {/* {
                    activeResumeSubscription?.creditsLeft > 0 ? (
                      <Link to="/advance-search">
                        <Typography
                          sx={{
                            fontSize: "18px",
                            color: "#333333",
                            px: 1.5,
                            py: 1.5,
                          }}
                        >
                          Search Resumes
                        </Typography>
                      </Link>
                    ) : (
                      <Typography
                        onClick={hanldeShowResumeActiveSubscription}
                        sx={{
                          fontSize: "18px",
                          color: "#333333",
                          px: 1.5,
                          py: 1.5,
                          cursor: "pointer"
                        }}
                      >
                        Search Resumes
                      </Typography>
                    )
                  } */}


                  <Divider sx={{ color: "var(--clr-blue-light)" }} />
                  {accessJobPosting?.accessJobPosting ? (
                    <Typography
                      noWrap
                      sx={{
                        fontSize: "18px",
                        color: "#333333",
                        px: 1.5,
                        py: 1.5,
                      }}
                    >
                      {accessJobPosting?.accessJobPosting ? (
                        <>
                          <Link to="/create-vacancies"> Post Hot Vacancy </Link>
                          {/* {activeJobPostSubscription?.creditsLeft > 0 ? (
                            <Link to="/create-vacancies"> Post Hot Vacancy </Link>
                          ) : (
                            <Link to="/toast-title"> Post Hot Vacancy </Link>
                          )} */}
                        </>
                      ) : (
                        "Post Hot Vacancy"
                      )}
                    </Typography>
                  ) : (
                    <Typography
                      noWrap
                      sx={{
                        fontSize: "18px",
                        color: "#333333",
                        px: 1.5,
                        py: 1.5,
                      }}
                    >
                      Post Hot Vacancy
                    </Typography>
                  )}
                  {/* {
                    jobPostSubSnackbar && (
                      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                          No active subsription, please contact your administrator.
                        </Alert>
                      </Snackbar>
                    )
                  } */}
                  <Divider sx={{ color: "var(--clr-blue-light)" }} />
                  {accessJobPosting?.accessJobPosting ? (
                    <Typography
                      noWrap
                      sx={{
                        fontSize: "18px",
                        color: "#333333",
                        px: 1.5,
                        py: 1.5,
                      }}
                    >
                      {accessJobPosting?.accessJobPosting ? (
                        <>
                          <>
                            <Link to="/post-job"> Post a Job </Link>
                            {/* {activeJobPostSubscription?.creditsLeft > 0 ? (
                              <Link to="/post-job"> Post a Job </Link>
                            ) : (
                              <Typography
                                onClick={hanldeShowJobPostActiveSubscription}
                                noWrap
                                sx={{
                                  fontSize: "18px",
                                  color: "#333333",
                                  cursor: "pointer"
                                }}>
                                Post a Job
                              </Typography>
                            )} */}
                          </>
                        </>
                      ) : (
                        "Post a Job"
                      )}
                    </Typography>
                  ) : (
                    <Typography
                      noWrap
                      sx={{
                        fontSize: "18px",
                        color: "#333333",
                        px: 1.5,
                        py: 1.5,
                      }}
                    >
                      Post a Job
                    </Typography>
                  )}

                  {/* !!! Don't remove */}
                  {/* <Divider sx={{ color: "var(--clr-blue-light)" }} />
                  <Typography
                    noWrap
                    sx={{ fontSize: "18px", color: "#333333", px: 1.5, py: 1.5 }}
                  >
                    Product Setting
                  </Typography> */}

                  <Divider sx={{ color: "var(--clr-blue-light)" }} />
                  <Typography
                    noWrap
                    sx={{ fontSize: "18px", color: "#333333", px: 1.5, py: 1.5 }}
                  >
                    <Link to="/profile/plans"> Pricing</Link>
                  </Typography>
                  <Divider sx={{ color: "var(--clr-blue-light)" }} />
                  {accessJobPosting?.adminUser && (
                    <>
                      {" "}
                      <Typography
                        noWrap
                        sx={{
                          fontSize: "18px",
                          color: "#333333",
                          px: 1.5,
                          py: 1.5,
                        }}
                      >
                        <Link to="/userslist"> Manage Sub-users </Link>
                      </Typography>{" "}
                      <Divider sx={{ color: "var(--clr-blue-light)" }} />
                    </>
                  )}
                  <Link to="/subscription-status">
                    <Typography
                      noWrap
                      sx={{ fontSize: "18px", color: "#333333", px: 1.5, py: 1.5 }}
                    >
                      Subscription Status
                    </Typography>
                  </Link>

                  {/* !!! Don't remove */}
                  {/* <Divider sx={{ color: "var(--clr-blue-light)" }} />
                  <Typography
                    noWrap
                    sx={{ fontSize: "18px", color: "#333333", px: 1.5, py: 1.5 }}
                  >
                    Usage Status
                  </Typography> */}

                  <Divider sx={{ color: "var(--clr-blue-light)" }} />
                  <Link to="/profile/company-profile">
                    <Typography
                      noWrap
                      sx={{ fontSize: "18px", color: "#333333", px: 1.5, py: 1.5 }}
                    >
                      Company Profile
                    </Typography>
                  </Link>

                  {/* !!! Don't remove */}
                  {/* <Divider sx={{ color: "var(--clr-blue-light)" }} />
                  <Typography
                    noWrap
                    sx={{ fontSize: "18px", color: "#333333", px: 1.5, py: 1.5 }}
                  >
                    Change Password
                  </Typography> */}
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box sx={{ display: "flex", flexDirection: "column", mt: -27 }}>
                  <Box>
                    <form onSubmit={handleJobsSearch}>
                      <Input
                        sx={{
                          mt: "30px",
                          borderRadius: 16,
                          padding: "12px 14px 12px 35px  !important",
                          marginBottom: "50px !important",
                        }}
                        disableUnderline
                        fullWidth
                        name="jobTitle"
                        onChange={handleChange("keyword")}
                        placeholder="Enter Keyword/CTC"
                        endAdornment={
                          <InputAdornment position="end" style={{ outline: "none" }}>
                            <SearchButton
                              type="submit"
                              color="primary"
                              variant="contained"
                              edge="end"
                              size="large"
                              sx={{
                                color: "white",
                                borderRadius: 16,
                                px: 4,
                                py: 0.7,
                                fontWeight: "400 !important",
                              }}
                            >
                              Search Profiles
                            </SearchButton>
                          </InputAdornment>
                        }
                      />
                    </form>
                    {
                      resumeSubSnackbar && (
                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                            No active subsription, please contact your administrator.
                          </Alert>
                        </Snackbar>
                      )
                    }
                  </Box>
                  <Box
                    sx={{
                      borderRadious: "10px",
                      // mt: -11,
                      mb: 5,
                      zIndex: "3",
                    }}
                  >
                    <Card
                      sx={{
                        backgroundColor: "var(--clr-white)",
                        boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                        borderRadius: 2,
                        px: 4,
                        py: 2.5,
                      }}
                    >
                      <Grid container justifyContent="space-between" specing={3}>
                        <Grid item xs={5} sx={{ pr: 1.5 }}>
                          <Box> 
                            { !imageLoading ? 
                              (base64Image === "data:image/png;base64," ? (
                                <img
                                  height="72px"
                                  width="72px"
                                  src={scletonImg}
                                  alt="image_template"
                                />
                              ) : (
                                <img
                                  height="72px"
                                  width="72px"
                                  src={base64Image}
                                  alt="image_template"
                                />
                              )) : (<Skeleton variant="rectangular" animation="wave" width="72px" height="72px" sx={{ borderRadius: 1 }} />)
                            } 
                          </Box>
                          <Typography variant="h6" sx={{ color: "var(--clr-blue-footer)", my: 1, fontWeight: 600, fontSize: '18px' }}>
                            {hospitalData?.contactName}
                          </Typography>

                          <Typography

                            sx={{
                              fontWeight: 400,
                              fontSize: "16px",
                              color: "#333333",
                            }}>
                            {/* {hospitalData?.name} */}
                            {hospitalDetails?.city}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          {
                            profileStrength >= 100 || (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 2,
                                  borderRadius: 1,
                                  bgcolor: "var(--clr-white)",
                                  border: "1px solid var(--clr-orange-2)",
                                  px: 2.5,
                                  pt: 1,
                                  pb: 2,
                                }}
                              >
                                <Typography variant="h6" sx={{ color: "var(--clr-blue-footer)", fontWeight: 600, fontSize: '18px' }}>
                                  {/* Pending Actions */}
                                  {(lackingStrength.logo === 1 && "Company logo missing") || (lackingStrength.about === 1 && "Company about is missing") || (lackingStrength.gallery === 1 && "Company image gallery is missing") || (lackingStrength.gstin === 1 && "Company gstin is missing") || (lackingStrength.companyName === 1 && "Company name is missing") || (lackingStrength.mobile === 1 && "Company mobile number is missing")}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: "14px", color: "#4F4F4F" }}>
                                  {(lackingStrength.logo === 1 && "Upload your company logo") || (lackingStrength.about === 1 && "Add company about") || (lackingStrength.gallery === 1 && "Upload company image gallery") || (lackingStrength.gstin === 1 && "Add compnay gstin") || (lackingStrength.companyName === 1 && "Add company name") || (lackingStrength.phoneVerified === 1 && "Please verify your phone number")}
                                </Typography>
                                <Box sx={{ textAlign: "right" }}>
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                    component={Link}
                                    to="/profile/company-profile"
                                    sx={{
                                      bgcolor: "#FFFFFF",
                                      color: "#BDBDBD",
                                      borderRadius: 16,
                                      borderWidth: "2px !important"
                                    }}
                                  >
                                    Edit profile
                                  </Button>
                                </Box>
                              </Box>
                            )
                          }
                        </Grid>
                        <Grid item xs={3} sx={{ mx: "auto", pl: { xl: 8, lg: 3, md: 0 }, textAlign: "center" }}>
                          <Box sx={{ position: "relative", margin: "auto" }}>
                            <CircularProgress
                              variant="determinate"
                              value={profileStrength}
                              thickness={6}
                              sx={{
                                width: "120px !important",
                                height: "120px !important",
                                transform: "rotate(0deg) !important",
                                color: "var(--clr-green-3)",
                              }}
                            />
                            <Typography
                              component="span"
                              variant="h4"
                              sx={{
                                fontSize: "2rem",
                                fontWeight: 700,
                                position: "absolute",
                                top: "40%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                color: "var(--clr-blue-footer)",
                              }}
                              className="strength-value"
                            >
                              {profileStrength}%
                            </Typography>
                            <Typography
                              variant="caption"
                              component="p"
                              sx={{
                                fontSize: 13,
                                lineHeight: "16px",
                                fontWeight: 600,
                                color: "var(--clr-gray-3)",
                                marginTop: "0.5rem",
                                pl: 1.5,
                              }}
                            >
                              Profile Strength
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  </Box>
                  <Box maxWidth="md" sx={{ mx: "auto" }}>
                    <Box>
                      <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        backgroundColor: "var(--clr-white)",
                        borderRadius: 2,
                        boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                        px: 3,
                        py: 2
                      }}>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{
                            fontWeight: 600,
                            color: "var(--clr-blue-footer)",
                          }}
                        >
                          Job Posting
                        </Typography>
                        <>
                          {accessJobPostingObj?.creditsLeft > 0 && (
                            <Typography
                              variant="body1"
                              sx={{ pt: 1.5, color: "var(--clr-gray-2)" }}
                            >
                              <Box>
                                <Typography sx={{ fontSize: 18, fontWeight: 600, color: "var(--clr-gray-2)" }}>Job Posting — {accessJobPostingObj?.name} </Typography>
                                <Typography sx={{ fontWeight: "small", color: "gray", mb: 1.5 }}>Activated On: {new Date(accessJobPostingObj?.createdOn)?.toUTCString()?.slice(5, 16)} </Typography>
                                <Typography sx={{ fontWeight: "bold" }}>{accessJobPostingObj?.subtext} </Typography>
                                <Typography sx={{ fontWeight: "bold" }}> Credits left: {accessJobPostingObj?.creditsLeft} out of {accessJobPostingObj?.credits} </Typography>
                                <Typography sx={{ color: "red", fontWeight: "bold", mt: 1.5 }}>
                                  Valid till: {new Date(accessJobPostingObj?.validUpto)?.toUTCString()?.slice(5, 16)}
                                </Typography>
                              </Box>
                            </Typography>
                          )}
                          {accessHotJobObj?.creditsLeft > 0 && (
                            <Typography
                              variant="body1"
                              sx={{ pb: 1.5, color: "var(--clr-gray-2)" }}
                            >
                              <Box sx={{ pt: 3 }}>
                                <Typography sx={{ fontSize: 18, fontWeight: 600, color: "var(--clr-gray-2)" }}>Job Posting — {accessHotJobObj?.name} </Typography>
                                <Typography sx={{ fontWeight: "small", color: "gray", mb: 1.5 }}>Activated On: {new Date(accessHotJobObj?.createdOn)?.toUTCString()?.slice(5, 16)} </Typography>
                                <Typography sx={{ fontWeight: "bold" }}>{accessHotJobObj?.subtext} </Typography>
                                <Typography sx={{ fontWeight: "bold" }}> Credits left: {accessHotJobObj?.creditsLeft} out of {accessHotJobObj?.credits} </Typography>
                                <Typography sx={{ color: "red", fontWeight: "bold", mt: 1.5 }}>
                                  Valid till: {new Date(accessHotJobObj?.validUpto)?.toUTCString()?.slice(5, 16)}
                                </Typography>
                              </Box>
                            </Typography>
                          )}
                          {
                            !accessJobPostingObj?.creditsLeft > 0 && !accessHotJobObj?.creditsLeft > 0 && (
                              <Typography
                                variant="body1"
                                sx={{ py: 1.5, color: "var(--clr-gray-2)" }}
                              >
                                Register with MedLink and post new job requirements. List your hospital or healthcare organization's requirements for the job, the skills and qualifications required, and the description of the organization's hires. With MedLink, you will have access to choose among a wide range of job aspirants.
                              </Typography>
                            )
                          }
                        </>
                        <Box>
                          {
                            activeJobPostSubscription?.creditsLeft > 0 ? (
                              <Link to="/manage-jobs-and-responses">
                                <Button
                                  variant="outlined"
                                  sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                                >
                                  View Job Posting
                                </Button>
                              </Link>
                            ) : (
                              <Link to="/profile/plans">
                                <Button
                                  variant="outlined"
                                  sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                                >
                                  View plans
                                </Button>
                              </Link>
                            )
                          }
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ marginTop: "3%" }}>
                      <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        backgroundColor: "var(--clr-white)",
                        borderRadius: 2,
                        boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                        px: 3,
                        py: 2
                      }}>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{
                            fontWeight: 600,
                            color: "var(--clr-blue-footer)",
                          }}
                        >
                          Jobseeker Resume Access (JRA)
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ py: 1.5, color: "var(--clr-gray-2)" }}
                        >
                          {
                            activeResumeSubscription?.creditsLeft > 0 ? (
                              <>
                                {
                                  resumeDB?.map(resdb => (
                                    <>
                                      <Typography sx={{ fontSize: 18, fontWeight: 600, color: "var(--clr-gray-2)" }}>RESDB — {resdb?.name} </Typography>
                                      <Typography sx={{ fontWeight: "small", color: "gray", mb: 1.5 }}>Activated On: {new Date(resdb?.createdOn)?.toUTCString()?.slice(5, 16)} </Typography>
                                      <Typography sx={{ fontWeight: "bold" }}>{resdb?.subtext} </Typography>
                                      <Typography sx={{ fontWeight: "bold" }}> Credits left: {resdb?.creditsLeft} out of {resdb?.credits} </Typography>
                                      <Typography sx={{ color: "red", fontWeight: "bold", mt: 1.5 }}>
                                        Valid till: {new Date(resdb?.validUpto)?.toUTCString()?.slice(5, 16)}
                                      </Typography>
                                    </>
                                  ))
                                }
                              </>
                            ) : (
                              "We welcome the HR Teams of hospitals and healthcare organizations to join hands in building a solid network of doctors and recruiters to strengthen India's healthcare community. Subscribe with us to surf our website and mobile applications for the profiles of talented doctors, advanced practitioners, physicians, Allied Healthcare professionals, Nurses and Midwives."
                            )
                          }
                        </Typography>
                        <Box>
                          {
                            activeResumeSubscription?.creditsLeft > 0 ? (
                              <Link to="/advance-search">
                                <Button
                                  variant="outlined"
                                  sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                                >
                                  Search Resumes
                                </Button>
                              </Link>
                            ) : (
                              <Link to="/profile/plans">
                                <Button
                                  variant="outlined"
                                  sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                                >
                                  View plans
                                </Button>
                              </Link>
                            )
                          }
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ marginTop: "3%" }}>
                      <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        backgroundColor: "var(--clr-white)",
                        borderRadius: 2,
                        boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                        px: 3,
                        py: 2
                      }}>
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{
                            fontWeight: 600,
                            color: "var(--clr-blue-footer)",
                          }}
                        >
                          Advertisement
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ py: 1.5, color: "var(--clr-gray-2)" }}
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
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      {/* small screen view */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ mx: "auto", mb: 10 }}>
          <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" }}>
            <Typography variant="h6" sx={{ lineHeight: "24px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Dashboard</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", px: 2 }}>
            {/* SearchBar */}
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", pt: 1.5, pb: 3 }}>
              <Input
                fullWidth
                disableUnderline
                name="keywordCTC"
                placeholder="Search Profiles"
                sx={{ size: "large", borderRadius: 16, zIndex: "1", "& .MuiInputBase-input": { height: 16 }, padding: "8px 30px  !important", }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      <SearchIcon sx={{ fontSize: "30px", color: "var(--clr-blue-light)" }} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.routeContainer}>
                <Box component={Link} to="/advance-search" className={classes.routeBox}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Search Resumes</Typography> <ChevronRightIcon />
                </Box>
                {
                  accessJobPosting?.accessJobPosting ? (
                    <Box component={Link} to="/create-vacancies" className={classes.routeBox}>
                      <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Post Hot Vacancy</Typography>
                      <ChevronRightIcon sx={{ color: "var(--clr-blue-footer)" }} />
                    </Box>
                  ) : (
                    <Box className={classes.routeBox}>
                      <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Post Hot Vacancy</Typography>
                      <ChevronRightIcon sx={{ color: "var(--clr-blue-footer)" }} />
                    </Box>
                  )
                }
                {
                  accessJobPosting?.accessJobPosting ? (
                    <Box component={Link} to="/post-job" className={classes.routeBox}>
                      <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Post a Job</Typography>
                      <ChevronRightIcon sx={{ color: "var(--clr-blue-footer)" }} />
                    </Box>
                  ) : (
                    <Box className={classes.routeBox}>
                      <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Post a Job</Typography> <ChevronRightIcon sx={{ color: "var(--clr-blue-footer)" }} />
                    </Box>
                  )
                }

                {/* !!! Don't remove */}
                {/* <Box className={classes.routeBox}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Product Setting</Typography> <ChevronRightIcon sx={{ color: "var(--clr-blue-footer)" }} />
                </Box> */}

                <Box component={Link} to="/profile/plans" className={classes.routeBox}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Pricing</Typography> <ChevronRightIcon sx={{ color: "var(--clr-blue-footer)" }} />
                </Box>
                {accessJobPosting?.adminUser && (
                  <Box component={Link} to="/userslist" className={classes.routeBox}>
                    <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Manage Sub-users</Typography> <ChevronRightIcon sx={{ color: "var(--clr-blue-footer)" }} />
                  </Box>
                )}

                <Box component={Link} to="/subscription-status" className={classes.routeBox}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Subscription Status</Typography> <ChevronRightIcon sx={{ color: "var(--clr-blue-footer)" }} />
                </Box>

                {/* !!! Don't remove */}
                {/* <Box className={classes.routeBox}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Usage Status</Typography> <ChevronRightIcon sx={{ color: "var(--clr-blue-footer)" }} />
                </Box> */}

                <Box component={Link} to="/profile/company-profile" className={classes.routeBox}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Company Profile</Typography> <ChevronRightIcon sx={{ color: "var(--clr-blue-footer)" }} />
                </Box>

                {/* !!! Don't remove */}
                {/* <Box className={classes.routeBox}>
                  <Typography sx={{ fontSize: "14px", fontWeight: "400", color: "#333333", }}>Change Password</Typography> <ChevronRightIcon sx={{ color: "var(--clr-blue-footer)" }} />
                </Box> */}
              </Grid>

              <Grid item sx={{ display: "grid", flexDirection: "column", gap: 3 }} xs={12}>
                <Box
                  sx={{
                    backgroundColor: "var(--clr-white)",
                    borderRadius: 1,
                    border: "1px solid var(--clr-blue-light)",
                    p: 1.3
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "var(--clr-blue-footer)",
                      fontSize: "18px",
                    }}
                  >
                    Job Posting
                  </Typography>
                  <>
                    {accessJobPostingObj?.creditsLeft > 0 && (
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "var(--clr-gray-2)"
                          }}
                        >
                          Job Posting — {accessJobPostingObj?.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "small",
                            color: "gray",
                            mb: 1
                          }}
                        >
                          Activated On: {new Date(accessJobPostingObj?.createdOn)?.toUTCString()?.slice(5, 16)}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "600" }}
                        >
                          {accessJobPostingObj?.subtext}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "600" }}
                        >
                          Credits left: {accessJobPostingObj?.creditsLeft} out of {accessJobPostingObj?.credits}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "red",
                            fontWeight: "600",
                            mt: 1
                          }}
                        >
                          Valid till: {new Date(accessJobPostingObj?.validUpto)?.toUTCString()?.slice(5, 16)}
                        </Typography>
                      </Box>
                    )}
                    {accessHotJobObj?.creditsLeft > 0 && (
                      <Box sx={{ pt: 3 }}>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "var(--clr-gray-2)"
                          }}
                        >
                          Job Posting — {accessHotJobObj?.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "small",
                            color: "gray",
                            mb: 1
                          }}
                        >
                          Activated On: {new Date(accessHotJobObj?.createdOn)?.toUTCString()?.slice(5, 16)}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "600" }}
                        >
                          {accessHotJobObj?.subtext}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "600" }}
                        >
                          Credits left: {accessHotJobObj?.creditsLeft} out of {accessHotJobObj?.credits}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "red",
                            fontWeight: "600",
                            mt: 1
                          }}
                        >
                          Valid till: {new Date(accessHotJobObj?.validUpto)?.toUTCString()?.slice(5, 16)}
                        </Typography>
                      </Box>
                    )}
                    {
                      !accessJobPostingObj?.creditsLeft > 0 && !accessHotJobObj?.creditsLeft > 0 && (
                        <Typography
                          variant="body2"
                          sx={{ py: 1.5, color: "var(--clr-gray-2)" }}
                        >
                          Register with MedLink and post new job requirements. List your hospital or healthcare organization's requirements for the job, the skills and qualifications required, and the description of the organization's hires. With MedLink, you will have access to choose among a wide range of job aspirants.
                        </Typography>
                      )}
                  </>
                  <Box>
                    {
                      activeJobPostSubscription?.creditsLeft > 0 ? (
                        <Link to="/manage-jobs-and-responses">
                          <Button
                            variant="outlined"
                            sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                          >
                            View Job Posting
                          </Button>
                        </Link>
                      ) : (
                        <Link to="/profile/plans">
                          <Button
                            variant="outlined"
                            sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                          >
                            View plans
                          </Button>
                        </Link>
                      )
                    }
                  </Box>
                </Box>
                <Box
                  sx={{
                    backgroundColor: "var(--clr-white)",
                    borderRadius: 1,
                    border: "1px solid var(--clr-blue-light)",
                    p: 1.3
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "var(--clr-blue-footer)",
                      fontSize: "18px",
                    }}
                  >
                    Jobseeker Resume Access (JRA)
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ py: 1, color: "#1A1A1A" }}
                  >
                    {
                      activeJobPostSubscription?.creditsLeft > 0 ? (
                        <>
                          {
                            resumeDB?.map(resdb => (
                              <>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    color: "var(--clr-gray-2)"
                                  }}
                                >
                                  RESDB — {resdb?.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: "small",
                                    color: "gray",
                                    mb: 1
                                  }}
                                >
                                  Activated On: {new Date(resdb?.createdOn)?.toUTCString()?.slice(5, 16)}
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  sx={{ fontWeight: "600" }}
                                >
                                  {resdb?.subtext}
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  sx={{ fontWeight: "600" }}
                                >
                                  Credits left: {resdb?.creditsLeft} out of {resdb?.credits}
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    color: "red",
                                    fontWeight: "600",
                                    mt: 1
                                  }}
                                >
                                  Valid till: {new Date(resdb?.validUpto)?.toUTCString()?.slice(5, 16)}
                                </Typography>
                              </>
                            ))
                          }
                        </>
                      ) : (
                        "We welcome the HR Teams of hospitals and healthcare organizations to join hands in building a solid network of doctors and recruiters to strengthen India's healthcare community. Subscribe with us to surf our website and mobile applications for the profiles of talented doctors, advanced practitioners, physicians, Allied Healthcare professionals, Nurses and Midwives."
                      )
                    }
                  </Typography>
                  <Box>
                    {
                      activeResumeSubscription?.creditsLeft > 0 ? (
                        <Link to="/advance-search">
                          <Button
                            variant="outlined"
                            sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                          >
                            Search Resumes
                          </Button>
                        </Link>
                      ) : (
                        <Link to="/profile/plans">
                          <Button
                            variant="outlined"
                            sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                          >
                            View plans
                          </Button>
                        </Link>
                      )
                    }
                  </Box>
                </Box>
                <Box sx={{ backgroundColor: "var(--clr-white)", borderRadius: 1, border: "1px solid var(--clr-blue-light)", p: 1.3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: "var(--clr-blue-footer)",
                      mb: 1,
                    }}
                  >Advertisement</Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: "#1A1A1A" }}>Contact us for more details </Typography>
                  <Button
                    component={Link}
                    to="/contact-us"
                    variant="outlined"
                    sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                  >
                    Know More
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box >
  );
}
