import { Box, Breadcrumbs, Button, Container, Tooltip, Typography } from "@mui/material";
// import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import React, { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import StarIcon from "@mui/icons-material/Star";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CheckIcon from '@mui/icons-material/Check';
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { gqlquery, QUERY_SEARCHTOP4JOBS, gqlOpenQuery, QUERY_SAVEDJOBS } from "../../api/index.js";
import {
  Link,
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import homeBanner from "../../assets/images/doctors_home_banner.png";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import YouTube from "react-youtube";
import Masonry from '@mui/lab/Masonry';
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from 'simple-react-lightbox'
import useAuth from "../../hooks/useAuth.js"; 
import MenuIcon from '@mui/icons-material/Menu';

const SingleJob = () => {
  const [vacancies, setVacancies] = useState([]);
  const [singleJobDetails, setSingleJobDetails] = useState([]);
  const [hospitalName, setHospitalName] = useState([]);
  const [isJobAppliedOrSaved, setIsJobAppliedOrSaved] = useState([]);
  const [update, setUpdate] = useState(false);
  let { vacancyID } = useParams();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [hospitalDetails, setHospitalDetails] = useState([]);
  const location = useLocation();
  const [changeRoute, setChangeRoute] = useState(true);
  const hospitalID = location.state.hospitalID;
  const navigate = useNavigate();
  const [base64Image, setBase64Image] = useState("data:image/png;base64,");
  const [allHospitalImages, setAllHospitalImages] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [getPrimarySpecialization, setGetPrimarySpecialization] = useState([]);
  const [getSecondarySpecialization, setGetSecondarySpecialization] = useState([]);
  const { user } = useAuth();
  const hospitalNames = location.state.hospitalName
  document.title = "Job Detail | MedLink Jobs";
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSingleJob = (searchResult) => {
    const handleNavigate = () => {
      navigate(`/job-search-list/${searchResult.vacancyID}`, {
        state: { hospitalID: searchResult.hospitalID },
      });
      // window.location.replace(`/job-search-list/${searchResult.vacancyID}`, { state: {hospitalID : searchResult.hospitalID}})
      setChangeRoute(!changeRoute);
    };

    setUpdate((prev) => !prev);
    setTimeout(handleNavigate, 1000);
  };

  useEffect(() => {
    gqlOpenQuery(QUERY_SEARCHTOP4JOBS, null)
      // gqlquery(QUERY_SEARCHTOP4JOBS, null)
      .then((res) => res.json())
      .then((datas) => {

        const getAllVacancyInfo = async () => {
          const primarySpec = async (searchResult) => {
            const QUERY_GETPRIMARYSPECIALIZATION = {
              query: `query MyQuery {
            getJobPostPrimarySpecialization(vacancyID: ${Number(
                searchResult?.vacancyID
              )}) {
              jpsID
              specialization
              vacancyID
            }
          }
        `,
              variables: null,
              operationName: "MyMutation",
            };
            await gqlOpenQuery(QUERY_GETPRIMARYSPECIALIZATION, null)
              .then((res) => res.json())
              .then((data) => {
                Object.assign(searchResult, data?.data);
                // setGetPrimarySpecialization(
                //   data?.data?.getJobPostPrimarySpecialization
                // );
              }); 
          };

          const secondarySpec = async (searchResult) => {
            const QUERY_GETSECONDARYSPECIALIZATION = {
              query: `query MyQuery {
            getJobPostSecondarySpecialization(vacancyID: ${Number(
                searchResult?.vacancyID
              )}) {
              jpsID
              specialization
              vacancyID
            }
          }
        `,
              variables: null,
              operationName: "MyMutation",
            };
            await gqlOpenQuery(QUERY_GETSECONDARYSPECIALIZATION, null)
              .then((res) => res.json())
              .then((data) => {
                Object.assign(searchResult, data?.data);
                // setGetSecondarySpecialization(
                // data?.data?.getJobPostSecondarySpecialization
                // );
              });
          };

          const allTopVacancies = datas?.data?.searchTop4Jobs?.map(async (sR, index) => {
            await primarySpec(sR);
            await secondarySpec(sR);
          });

          await Promise.all(allTopVacancies)

          await setVacancies(datas?.data?.searchTop4Jobs);
          await setUpdate((prev) => !prev);
        }

        getAllVacancyInfo();
      });
  }, [changeRoute]);
        console.log(223, vacancies)

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") !== null) {
      gqlquery(QUERY_SAVEDJOBS, null)
        .then((res) => res.json())
        .then((data) => setSavedJobs(data?.data?.getSavedJobs));
    }
}, [update]);


  useEffect(() => {
    const QUERY_HOSPITALDETAILS = {
      query: `query MyQuery {
        getHospitalDetails(hospitalID: "${hospitalID}") {
            about
            additionalPhone1
            additionalPhone2
            address
            city
            companyType
            contactPerson
            country
            designation
            gstin
            hospitalID
            industryType
            mobile
            pan
            pincode
            reportingManager
            role
            state
            video
            website
            name  
            profilePicURL
            }
                  }
                `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_HOSPITALDETAILS, null)
      // gqlquery(QUERY_HOSPITALDETAILS, null)
      .then((res) => res.json())
      .then((data) => {
        setHospitalDetails(data?.data?.getHospitalDetails);
        const QUERY_DOWNLOADRESUME = {
          query: `query MyQuery {
                downloadDocument (url: "${data?.data?.getHospitalDetails?.profilePicURL}")
              }`,
        };
        gqlOpenQuery(QUERY_DOWNLOADRESUME, null)
          // gqlquery(QUERY_DOWNLOADRESUME, null)
          .then((res) => res.json())
          .then((datas) => {
            const downloadDocument = JSON.parse(datas?.data?.downloadDocument);
            const imageSource = `data:image/png;base64,${downloadDocument?.response?.content}`;
            setBase64Image(imageSource);
          }).catch((err) => {
            console.log( err)
          })
      });
  }, [hospitalID, changeRoute, update]);

  useEffect(() => {
    const QUERY_ALLHOSPITALPICTURES = {
      query: `query MyQuery {
        getHospitalPictures(hospitalID: "${hospitalID}") {
          haID
          name
          type
          url
        }
      }`,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_ALLHOSPITALPICTURES, null)
      // gqlquery(QUERY_ALLHOSPITALPICTURES, null)
      .then((res) => res.json())
      .then((data) => {
        data?.data?.getHospitalPictures?.map(img => {
          const QUERY_HOSPITALPIC = {
            query: `query MyQuery {
                downloadDocument (url: "${img?.url}")
              }`,
          };
          gqlOpenQuery(QUERY_HOSPITALPIC, null)
            // gqlquery(QUERY_HOSPITALPIC, null)
            .then((res) => res.json())
            .then((datas) => {
              const downloadDocument = JSON.parse(datas?.data?.downloadDocument);
              Object.assign(img, downloadDocument);
            })
        })
        setAllHospitalImages(data?.data?.getHospitalPictures)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  let url = `${hospitalDetails?.video}`;
  function getYouTubeVideoId(url) {
    const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
  }
  const id = getYouTubeVideoId(url);

  const opts = {
    height: "270",
    width: "100%",
  };
 
  useEffect(() => {
    const QUERY_ISJOBSAVEDORAPPLIED = {
      query: `query MyQuery {
                isJobApplied(vacancyID: ${Number(vacancyID)}) 
                         {
                           appliedAt
                           jaID
                           savedJob
                           appliedJob
                           vacancyID
                        }
                      }
                    `,
      variables: null,
      operationName: "MyMutation",
    };

    if (sessionStorage.getItem("accessToken") !== null) {
      gqlquery(QUERY_ISJOBSAVEDORAPPLIED, null)
        .then((res) => res.json())
        .then((data) => setIsJobAppliedOrSaved(data?.data?.isJobApplied));
    }
  }, [vacancyID, update, changeRoute]);

  useEffect(() => { 
    const QUERY_SEARCHJOBS = {
      query: `query MyQuery {
                     getAVacancy(vacancyID: ${Number(vacancyID)}) 
                         {
                          description
                          employmentType
                          experience
                          hospitalID
                          jobTitle
                          lastDateToApply
                          location
                          maximumSalary
                          minimumSalary
                          name
                          postedOn
                          qualification
                          savedJob
                          vacancyID
                          vacancyType
                        }
                      }
                    `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_SEARCHJOBS, null)
      // gqlquery(QUERY_SEARCHJOBS, null)
      .then((res) => res.json())
      .then((data) => {
        setSingleJobDetails(data?.data?.getAVacancy);
      });

    const QUERY_GETPRIMARYSPECIALIZATION = {
      query: `query MyQuery {
        getJobPostPrimarySpecialization(vacancyID: ${Number(vacancyID)}) {
          jpsID
          specialization
          vacancyID
        }
      }
    `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_GETPRIMARYSPECIALIZATION, null)
      .then((res) => res.json())
      .then((data) => {
        setGetPrimarySpecialization(
          data?.data?.getJobPostPrimarySpecialization
        );
      });

    const QUERY_GETSECONDARYSPECIALIZATION = {
      query: `query MyQuery {
        getJobPostSecondarySpecialization(vacancyID: ${Number(vacancyID)}) {
          jpsID
          specialization
          vacancyID
        }
      }
    `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_GETSECONDARYSPECIALIZATION, null)
      .then((res) => res.json())
      .then((data) => {
        setGetSecondarySpecialization(
          data?.data?.getJobPostSecondarySpecialization
        );
      });
  }, [vacancyID, changeRoute, update]);

  useEffect(() => {
    const QUERY_HOSPITALNAME = {
      query: `query MyQuery {
                getHospitalByVacancy(vacancyID: ${Number(vacancyID)}) 
                         {
                            name
                        }
                      }
                    `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlOpenQuery(QUERY_HOSPITALNAME, null)
      // gqlquery(QUERY_HOSPITALNAME, null)
      .then((res) => res.json())
      .then((data) =>  {
      });
  }, [vacancyID, changeRoute, update]);

  // setHospitalName(data?.data?.getHospitalByVacancy)
 
  const date_diff_indays = function (dt1) {
    const dt2 = new Date();
    const days = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
    );
    const month = Math.floor(days / 30);
    const day = days % 30;
    if (days >= 30) {
      return {
        month,
        day,
      };
    }
    return {
      days,
    };
  };

  // Single Job before login redirect
  const prevlocation = `/job-search-list/${vacancyID}`

  const handleApplyForJob = (e) => {
    if (user !== null && Object.keys(user).length > 0 && user !== undefined) {
      const QUERY_APPLYFORJOB = {
        query: `mutation MyMutation {
                         applyForAJob (vacancyID: ${Number(vacancyID)})
                         }
                      `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_APPLYFORJOB, null)
        .then((res) => res.json())
        .then((datas) => {
          setUpdate((prev) => !prev);
        })
        .finally((e) => console.log("applying for a job"));
    }
    else {
      navigate('/login', { state: { history: prevlocation, hospitalID: hospitalID } })
    }
  };
  const handleSaveJob = (e) => {
    if (user !== null && Object.keys(user).length > 0 && user !== undefined) {
      // console.log(user)
      const QUERY_SAVEAJOB = {
        query: `mutation MyMutation {
                        saveAJob (vacancyID: ${Number(vacancyID)})
                         }
                      `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_SAVEAJOB, null)
        .then((res) => res.json())
        .then((data) => {
          setUpdate((prev) => !prev);
          setChangeRoute(prev => !prev)
        })
        .finally((e) => console.log("saved this job"));
    }
    else {
      navigate('/login', { state: { history: prevlocation, hospitalID: hospitalID } })
    }

  };
  const handleSaveSimilarJob = (simirlarJobID) => {

    if (user !== null && Object.keys(user).length > 0 && user !== undefined) {

      const QUERY_SAVEAJOB = {
        query: `mutation MyMutation {
                        saveAJob (vacancyID: ${Number(simirlarJobID)})
                         }
                      `,
        variables: null,
        operationName: "MyMutation",
      };
      gqlquery(QUERY_SAVEAJOB, null)
        .then((res) => res.json())
        .then((data) => {
          // console.log("save job similar", data);
          setUpdate((prev) => !prev);
          setChangeRoute((prev) => !prev);
        })
        .finally((e) => console.log("saved this job"));
    } else {
      navigate('/login', { state: { history: prevlocation, hospitalID: hospitalID } })
    }

  };

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") !== null) {
      vacancies?.map((sr) => {
        const QUERY_ISJOBSAVED = {
          query: `query MyQuery {
          isJobApplied(vacancyID: ${Number(sr?.vacancyID)})  
                   {
                     appliedAt
                     jaID
                     savedJob
                     appliedJob
                     vacancyID
                  }
                }
              `,
        variables: null,
        operationName: "MyMutation",
      };
 
      gqlquery(QUERY_ISJOBSAVED, null)
        .then((res) => res.json())
        .then((datas) => {
          // console.log("datas", datas);
          if (datas?.data?.isJobApplied !== null) {
            Object.assign(sr, datas?.data?.isJobApplied);
          }
        });
    });
    }
  }, [vacancies, changeRoute, update]);

  const handleDeleteSavedJobs = (deleteId) => {
    if (user) {
      if (window.confirm("Are you sure you want to remove from Saved Jobs?")) {
        const QUERY_REMOVEJOBFROMSAVEDLIST = {
          query: `mutation MyMutation {
            removeJobFromSavedList (vacancyID: ${Number(deleteId)})
            }`,
          variables: null,
          operationName: "MyMutation",
        };

        gqlquery(QUERY_REMOVEJOBFROMSAVEDLIST, null)
          .then((res) => res.json())
          .then((data) => {
            setUpdate((prev) => !prev);
            setChangeRoute((prev) => !prev);
          })
          .finally((e) => console.log("Deleting Save Job from database"));
      } else {
        console.log("You don't want to delete this!");
      }
    } else {
      navigate('/login', { state: { history: prevlocation, hospitalID: hospitalID } })
    }

  };

  const handleJobsSearch = () => {
    // console.log(location)
    if (location?.state?.jobTitle) {
      console.log("handleJobsSearch: 0",location)
      const handleNavigate = () => { 
        navigate("/job-search-list", { state: {...location?.state, isFromSingleJob: true} });
      };
      setTimeout(handleNavigate, 1000);
    }
    else { 
      const handleNavigate = () => {
        navigate("/job-search-list", { state: { jobTitle: '', location: '' } });
      };
      setTimeout(handleNavigate, 1000);
    }
  };
  // console.log(singleJobDetails)

  return (
    <>
     {
        matches &&
        <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
        <MenuIcon sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Job Detail</Typography>
        </Box>
      }
    <Box sx={{px : matches ? "16px" : ""}}>
      <Box
        style={{
          backgroundImage: !matches ? `url(${homeBanner})` : "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        sx={{
          bgcolor: "#E0E0E0",
          height: !matches ? "240px" : "0",
          marginTop: !matches ? "0px" : "8px"
        }}
      />

      <Box
        maxWidth="md"
        sx={{
          mt: !matches ? -15 : 0,
          mx: "auto",
        }}
      >
        {
         !matches && 
          <Box sx={{ py: 1 }}>
            <Breadcrumbs
              separator={
                <NavigateNextIcon
                  fontSize="small"
                  sx={{ color: !matches ? "var(--clr-white)" : "#333333" }}
                />
              }
              aria-label="breadcrumb"
            >
              <Link
                underline="hover"
                style={{ color: !matches ? "var(--clr-white)" : "#333333" , fontSize: "14px" }}
                to="/"
              >
                Home
              </Link>
              <span
                onClick={handleJobsSearch}
                style={{
                  color: !matches ? "var(--clr-white)" : "#333333",
                  fontWeight: "400",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Job List
              </span>
              <Typography sx={{ color: !matches ? "var(--clr-white)" : "#333333", fontSize: "14px" }}>
                {singleJobDetails?.jobTitle}
              </Typography>
            </Breadcrumbs>
          </Box>
        }

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {!matches ? (
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                p: matches ? 1.8 : 2.5,
                boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                borderRadius: "6px",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: "20px",
                }}
              >
                <Box>
                  {base64Image === "data:image/png;base64," ? (
                    <CardMedia
                      component="img"
                      sx={{
                        width: " 72px",
                        height: "72px",
                        borderRadius: "6px",
                      }}
                      // paddingBottom="29px"
                      image="https://cdn.pixabay.com/photo/2021/11/20/03/17/doctor-6810751__340.png"
                      alt={"hospital logo"}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      sx={{
                        width: " 72px",
                        height: "72px",
                        borderRadius: "6px",
                      }}
                      // paddingBottom="29px"
                      image={base64Image}
                      alt={"hospital logo"}
                    />
                  )}
                </Box>
                <Box>
                  {savedJobs?.find(
                    (job) => job?.vacancyID === singleJobDetails?.vacancyID
                  )?.vacancyID === singleJobDetails?.vacancyID && (
                    <Button
                      onClick={() =>
                        handleDeleteSavedJobs(singleJobDetails?.vacancyID)
                      }
                      sx={{
                        mr: 1,
                        backgroundColor: "var(--clr-blue-light) !important",
                        borderRadius: 16,
                        fontWeight: "600",
                        padding: "6px 16px",
                        fontSize: "16px",
                      }}
                      // disabled
                    >
                      <StarIcon
                        fontSize="small"
                        sx={{ color: "var(--clr-blue-footer)", mr: 1 }}
                      />{" "}
                      <span style={{ color: "var(--clr-blue-footer)" }}>
                        Saved
                      </span>
                    </Button>
                  )}
                  {savedJobs?.find(
                    (job) => job?.vacancyID === singleJobDetails?.vacancyID
                  )?.vacancyID !== singleJobDetails?.vacancyID && (
                    <Button
                      sx={{
                        mr: 1,
                        border: "2px solid #5A98F2",
                        color: "#5A98F2",
                        borderRadius: "20px",
                        fontWeight: "600",
                        fontSize: "16px",
                        height: "40px",
                        padding: "8px 16px 8px 16px",
                        boxSizing: "border-box",
                      }}
                      size="small"
                      // variant="outlined"
                      onClick={handleSaveJob}
                    >
                     {user?.name ? "Save" : "Login to Save"}
                    </Button>
                  )}
                  {!user?.name ? (
                    <Button
                      sx={{
                        mr: 1,
                        borderRadius: "20px",
                        fontWeight: "600",
                        padding: "8px 16px 8px 16px",
                        height: "40px",
                        // width: "76px",
                        fontSize: "16px",
                      }}
                      size="small"
                      variant="contained"
                      onClick={handleApplyForJob}
                    >
                    {/* {isJobAppliedOrSaved === undefined && "Apply1"} */}
                    Login to Apply
                    </Button>
                  ) : (
                    <>
                    {isJobAppliedOrSaved?.appliedJob === false && (
                    <Button
                      sx={{
                        mr: 1,
                        borderRadius: "20px",
                        fontWeight: "600",
                        padding: "8px 16px 8px 16px",
                        height: "40px",
                        width: "76px",
                        fontSize: "16px",
                      }}
                      size="small"
                      variant="contained"
                      onClick={handleApplyForJob}
                    >
                      Apply
                    </Button>
                  )}
                    </>
                 
                  )}
                    {/* <Button
                      sx={{
                        mr: 1,
                        borderRadius: "20px",
                        fontWeight: "600",
                        padding: "8px 16px 8px 16px",
                        height: "40px",
                        // width: "76px",
                        fontSize: "16px",
                      }}
                      size="small"
                      variant="contained"
                      onClick={handleApplyForJob}
                    >
                    {/* {isJobAppliedOrSaved === undefined && "Apply1"} */}
                    {/* Apply */}
                    {/* </Button>  */}
                  {isJobAppliedOrSaved?.appliedJob === true && (
                    <Button
                      sx={{
                        mr: 1,
                        backgroundColor: "var(--clr-blue-primary) !important",
                        borderRadius: 16,
                        fontWeight: "600",
                        padding: "6px 16px",
                        fontSize: "16px",
                      }}
                      disabled
                    >
                      <span style={{ color: "var(--clr-white)" }}>Applied</span>{" "}
                      <CheckIcon
                        fontSize="small"
                        sx={{ color: "var(--clr-white)", ml: 0.5 }}
                      />
                    </Button>
                  )}

                </Box>
              </Box>
              <Typography
                style={{
                  color: "#395987",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                {singleJobDetails?.jobTitle}
              </Typography>
              <Typography
                style={{
                  color: "#333333",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                {hospitalNames}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pr: 2,
                  }}
                >
                  <Tooltip title="Location">
                    <LocationOnTwoToneIcon
                      fontSize="small"
                      sx={{
                        color: "#C7D3E3",
                        fontWeight: "400",
                        fontSize: "16px",
                      }}
                    />
                  </Tooltip>

                  <Typography
                    component="div"
                    sx={{
                      color: "#333333",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                    variant="body1"
                  >
                    {singleJobDetails?.location}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pr: 2,
                  }}
                >
                  <Tooltip title="Experience">
                    <WorkTwoToneIcon
                      fontSize="small"
                      sx={{
                        color: "#C7D3E3",
                        fontWeight: "400",
                        fontSize: "16px",
                      }}
                    />
                  </Tooltip>
                  <Typography
                    component="div"
                    sx={{
                      color: "#333333",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                    variant="body1"
                  >
                    {singleJobDetails?.experience} Years
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pr: 2,
                  }}
                >
                  <Tooltip title="Salary Range ( Min - Max )">
                    <AccountBalanceWalletTwoToneIcon
                      fontSize="small"
                      sx={{
                        color: "#C7D3E3",
                        fontWeight: "400",
                        fontSize: "16px",
                      }}
                    />
                  </Tooltip>

                  <Typography
                    component="div"
                    sx={{
                      color: "#333333",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                    variant="body1"
                  >
                    ₹
                    {singleJobDetails?.minimumSalary >= 100000 ? <>{(
                      Math.round(
                        (singleJobDetails?.minimumSalary / 100000) * 100
                      ) / 100
                    ).toFixed(2)} L</>  : <>{singleJobDetails?.minimumSalary >= 1000 ?  <>{(
                      Math.round(
                        (singleJobDetails?.minimumSalary / 1000) * 100
                      ) / 100
                    ).toFixed(2)}{" "}L</> : <>{singleJobDetails?.minimumSalary}{" "}L</>}</>}{" "}
                     - ₹
                    {singleJobDetails?.maximumSalary >= 100000 ? <>{(
                      Math.round(
                        (singleJobDetails?.maximumSalary / 100000) * 100
                      ) / 100
                    ).toFixed(2)} L</> : <>{singleJobDetails?.maximumSalary >= 1000 ? <>{<>{(
                      Math.round(
                        (singleJobDetails?.maximumSalary / 1000) * 100
                      ) / 100
                    ).toFixed(2)}LK</>}</> : <>{singleJobDetails?.maximumSalary}{" "}L</>}</> }{" "}
                    
                  </Typography> 
                </Box>
              </Box>
              <Box
                sx={{
                  width: "max-content",
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#E4EEF5",
                  gap: 1,
                  padding: "2px 10px 2px 10px",
                  borderRadius: "20px",
                }}
              >
                <Tooltip title="Posted On">
                  <AccessTimeOutlinedIcon
                    style={{
                      color: "#395987",
                      fontWeight: "600",
                      fontSize: "12px",
                    }}
                  />
                </Tooltip>
                <Typography
                  style={{
                    color: "#395987",
                    fontWeight: "600",
                    fontSize: "12px",
                  }}
                >
                  {singleJobDetails?.postedOn && (
                    <>
                      {new Date(singleJobDetails?.postedOn)?.toLocaleString(
                        "default",
                        { day: "2-digit" }
                      )}
                      -
                      {new Date(singleJobDetails?.postedOn)?.toLocaleString(
                        "default",
                        { month: "short" }
                      )}
                      -
                      {new Date(singleJobDetails?.postedOn)?.toLocaleString(
                        "default",
                        { year: "numeric" }
                      )}
                    </>
                  )}
                  {/* {singleJobDetails?.postedOn?.split("-").reverse().join("-")} */}
                  {/* {date_diff_indays(new Date(`${singleJobDetails?.postedOn}`))
                    .month ? (
                    <>
                      {
                        date_diff_indays(
                          new Date(`${singleJobDetails?.postedOn}`)
                        ).month
                      }{" "}
                      {date_diff_indays(
                        new Date(`${singleJobDetails?.postedOn}`)
                      ).month === 1
                        ? "month"
                        : "months"}{" "}
                      {date_diff_indays(
                        new Date(`${singleJobDetails?.postedOn}`)
                      ).day ? (
                        <>
                          {
                            date_diff_indays(
                              new Date(`${singleJobDetails?.postedOn}`)
                            ).day
                          }{" "}
                          {date_diff_indays(
                            new Date(`${singleJobDetails?.postedOn}`)
                          ).day === 1
                            ? "day"
                            : "days"}{" "}
                          {"ago"}
                        </>
                      ) : (
                        <> {"ago"}</>
                      )}
                    </>
                  ) : (
                    <>
                      {
                        date_diff_indays(
                          new Date(`${singleJobDetails?.postedOn}`)
                        ).days
                      }{" "}
                      {date_diff_indays(
                        new Date(`${singleJobDetails?.postedOn}`)
                      ).days === 1
                        ? "day"
                        : "days"}{" "}
                      {"ago"}
                    </>
                  )} */}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                bgcolor: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                p: matches ? 1.8 : 3.7,
                borderRadius: "6px",
                border: "1px solid #E4EEF5",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <CardMedia
                    component="img"
                    width="54px"
                    height="54px"
                    paddingBottom="29px"
                    image="https://cdn.pixabay.com/photo/2021/11/20/03/17/doctor-6810751__340.png"
                    alt={"title"}
                  />
                </Box>
              </Box>
              <Typography
                style={{
                  color: "#395987",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                {singleJobDetails?.jobTitle}
              </Typography>
              <Typography
                style={{
                  color: "#333333",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                {hospitalName?.name}
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pr: 2,
                    mb: "20px",
                  }}
                >
                  <Tooltip title="Location">
                    <LocationOnTwoToneIcon
                      fontSize="small"
                      sx={{
                        color: "#C7D3E3",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    />
                  </Tooltip>

                  <Typography
                    component="div"
                    sx={{
                      color: "#333333",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                    variant="body1"
                  >
                    {singleJobDetails?.location}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pr: 2,
                    mb: "20px",
                  }}
                >
                  <Tooltip title="Experience">
                    <WorkTwoToneIcon
                      fontSize="small"
                      sx={{
                        color: "#C7D3E3",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    />
                  </Tooltip>
                  <Typography
                    component="div"
                    sx={{
                      color: "#333333",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                    variant="body1"
                  >
                    {singleJobDetails?.experience} Years
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pr: 2,
                    mb: "12px",
                  }}
                >
                  <Tooltip title="Salary Range ( Min - Max )">
                    <AccountBalanceWalletTwoToneIcon
                      fontSize="small"
                      sx={{
                        color: "#C7D3E3",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    />
                  </Tooltip>

                  <Typography
                    component="div"
                    sx={{
                      color: "#333333",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                    variant="body1"
                  >
                    ₹
                    {singleJobDetails?.minimumSalary >= 100000 ? <>{(
                      Math.round(
                        (singleJobDetails?.minimumSalary / 100000) * 100
                      ) / 100
                    ).toFixed(2)} L</>  : <>{singleJobDetails?.minimumSalary >= 1000 ?  <>{(
                      Math.round(
                        (singleJobDetails?.minimumSalary / 1000) * 100
                      ) / 100
                    ).toFixed(2)}{" "}L</> : <>{singleJobDetails?.minimumSalary}{" "}L</>}</>}{" "}
                     - ₹
                    {singleJobDetails?.maximumSalary >= 100000 ? <>{(
                      Math.round(
                        (singleJobDetails?.maximumSalary / 100000) * 100
                      ) / 100
                    ).toFixed(2)} L</> : <>{singleJobDetails?.maximumSalary >= 1000 ? <>{<>{(
                      Math.round(
                        (singleJobDetails?.maximumSalary / 1000) * 100
                      ) / 100
                    ).toFixed(2)}LK</>}</> : <>{singleJobDetails?.maximumSalary}{" "}L</>}</> }{" "}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "max-content",
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "#E4EEF5",
                  gap: 1,
                  p: "0px 10px",
                  borderRadius: "20px",
                }}
              >
                <Tooltip title="Posted On">
                  <AccessTimeOutlinedIcon
                    style={{
                      color: "#395987",
                      fontWeight: "600",
                      fontSize: "12px",
                    }}
                  />
                </Tooltip>
                <Typography
                  style={{
                    color: "#395987",
                    fontWeight: "600",
                    fontSize: "12px",
                  }}
                >
                  {singleJobDetails?.postedOn && (
                    <>
                      {new Date(singleJobDetails?.postedOn)?.toLocaleString(
                        "default",
                        { day: "2-digit" }
                      )}
                      -
                      {new Date(singleJobDetails?.postedOn)?.toLocaleString(
                        "default",
                        { month: "short" }
                      )}
                      -
                      {new Date(singleJobDetails?.postedOn)?.toLocaleString(
                        "default",
                        { year: "numeric" }
                      )}
                    </>
                  )}
                  {/* {jobPostedDate} */}
                  {/* {date_diff_indays(new Date(`${singleJobDetails?.postedOn}`))
                    .month ? (
                    <>
                      {
                        date_diff_indays(
                          new Date(`${singleJobDetails?.postedOn}`)
                        ).month
                      }{" "}
                      {date_diff_indays(
                        new Date(`${singleJobDetails?.postedOn}`)
                      ).month === 1
                        ? "month"
                        : "months"}{" "}
                      {date_diff_indays(
                        new Date(`${singleJobDetails?.postedOn}`)
                      ).day ? (
                        <>
                          {
                            date_diff_indays(
                              new Date(`${singleJobDetails?.postedOn}`)
                            ).day
                          }{" "}
                          {date_diff_indays(
                            new Date(`${singleJobDetails?.postedOn}`)
                          ).day === 1
                            ? "day"
                            : "days"}{" "}
                          {"ago"}
                        </>
                      ) : (
                        <> {"ago"}</>
                      )}
                    </>
                  ) : (
                    <>
                      {
                        date_diff_indays(
                          new Date(`${singleJobDetails?.postedOn}`)
                        ).days
                      }{" "}
                      {date_diff_indays(
                        new Date(`${singleJobDetails?.postedOn}`)
                      ).days === 1
                        ? "day"
                        : "days"}{" "}
                      {"ago"}
                    </>
                  )} */}
                </Typography>
              </Box>
              <Box>
                {/*    {isJobAppliedOrSaved === undefined && (
                  <Button
                    sx={{
                      mr: 1,
                      border: "2px solid #5A98F2",
                      color: "#5A98F2",
                      borderRadius: "20px",
                      fontWeight: "600",
                      fontSize: "16px",
                      height: "40px",
                      padding: "8px 16px 8px 16px",
                      boxSizing: "border-box",
                    }}
                    size="small"
                    // variant="outlined"
                    onClick={handleSaveJob}
                  >
                    Save
                  </Button>
                )}
                {isJobAppliedOrSaved?.savedJob === true && (
                  <Button
                    sx={{
                      mr: 1,
                      backgroundColor: "var(--clr-blue-light) !important",
                      borderRadius: 16,
                      fontWeight: "600",
                      padding: "6px 16px",
                      fontSize: "16px",
                    }}
                    // disabled
                  >
                    <StarIcon
                      fontSize="small"
                      sx={{ color: "var(--clr-blue-footer)", mr: 1 }}
                    />{" "}
                    <span style={{ color: "var(--clr-blue-footer)" }}>
                      Saved---
                    </span>
                  </Button>
                )}
                {isJobAppliedOrSaved?.savedJob === false && (
                  <Button
                    sx={{
                      mr: 1,
                      border: "2px solid #5A98F2",
                      color: "#5A98F2",
                      borderRadius: "20px",
                      fontWeight: "600",
                      fontSize: "16px",
                      height: "40px",
                      padding: "8px 16px 8px 16px",
                      boxSizing: "border-box",
                    }}
                    size="small"
                    // variant="outlined"
                    onClick={handleSaveJob}
                  >
                    Save
                  </Button>
                )} */}

                {savedJobs?.find(
                  (job) => job?.vacancyID === singleJobDetails?.vacancyID
                )?.vacancyID === singleJobDetails?.vacancyID && (
                  <Button
                    onClick={() =>
                      handleDeleteSavedJobs(singleJobDetails?.vacancyID)
                    }
                    sx={{
                      mr: 1,
                      backgroundColor: "var(--clr-blue-light) !important",
                      borderRadius: 16,
                      fontWeight: "600",
                      padding: "6px 16px",
                      fontSize: "16px",
                    }}
                    // disabled
                  >
                    <StarIcon
                      fontSize="small"
                      sx={{ color: "var(--clr-blue-footer)", mr: 1 }}
                    />{" "}
                    <span style={{ color: "var(--clr-blue-footer)" }}>
                      Saved
                    </span>
                  </Button>
                )}
                {savedJobs?.find(
                  (job) => job?.vacancyID === singleJobDetails?.vacancyID
                )?.vacancyID !== singleJobDetails?.vacancyID && (
                  <Button
                    sx={{
                      mr: 1,
                      border: "2px solid #5A98F2",
                      color: "#5A98F2",
                      borderRadius: "20px",
                      fontWeight: "600",
                      fontSize: "16px",
                      height: "40px",
                      padding: "8px 16px 8px 16px",
                      boxSizing: "border-box",
                    }}
                    size="small"
                    // variant="outlined"
                    onClick={handleSaveJob}
                  >
                    Save
                  </Button>
                )}
                {isJobAppliedOrSaved === undefined && (
                  <Button
                    sx={{
                      mr: 1,
                      borderRadius: "20px",
                      fontWeight: "600",
                      padding: "8px 16px 8px 16px",
                      height: "40px",
                      width: "76px",
                      fontSize: "16px",
                    }}
                    size="small"
                    variant="contained"
                    onClick={handleApplyForJob}
                  >
                    Apply
                  </Button>
                )}
                {isJobAppliedOrSaved?.appliedJob === true && (
                  <Button
                    sx={{
                      mr: 1,
                      backgroundColor: "var(--clr-blue-primary) !important",
                      borderRadius: 16,
                      fontWeight: "600",
                      padding: "6px 16px",
                      fontSize: "16px",
                    }}
                    disabled
                  >
                    <span style={{ color: "var(--clr-white)" }}>Applied</span>{" "}
                    <CheckIcon
                      fontSize="small"
                      sx={{ color: "var(--clr-white)", ml: 0.5 }}
                    />
                  </Button>
                )}
                {isJobAppliedOrSaved?.appliedJob === false && (
                  <Button
                    sx={{
                      mr: 1,
                      borderRadius: "20px",
                      fontWeight: "600",
                      padding: "8px 16px 8px 16px",
                      height: "40px",
                      width: "76px",
                      fontSize: "16px",
                    }}
                    size="small"
                    variant="contained"
                    onClick={handleApplyForJob}
                  >
                    Apply
                  </Button>
                )}
              </Box>
            </Box>
          )}

          <Box
            sx={{
              p: matches ? 1.7 : 2.5,
              bgcolor: "#FFFFFF",
              boxShadow: !matches
                ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                : " ",
              borderRadius: "6px",
              border: !matches ? "0px" : "1px solid #E4EEF5",
            }}
          >
            <Typography
              style={{
                color: "#395987",
                fontWeight: "600",
                fontSize: "18px",
                marginBottom: "15px",
              }}
            >
              Job Description
            </Typography>
            <Box
              sx={{
                width: "75%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mb: "30px"
              }}
            >
              {/* {descriptions.map((description) => ( */}
              <Typography
                sx={{
                  lineHeight: "24px",
                  color: "#333333",
                  fontWeight: "400",
                  fontSize: "14px",
                }}
                variant="body2"
              >
                {singleJobDetails?.description?.split("<br />").map((item) => (
                  <>
                    {item} <br />
                  </>
                ))}
              </Typography>
              {/* ))} */}
            </Box>
            <Grid container>
              <Grid sx={{ mb: "25px" }} item xs={12} sm={12} md={12}>
                <Grid sx={{ mb: "10px" }} container>
                  <Grid item xs={5} sm={3.5} md={3.5}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        // width: matches ? "170px" : "200px",
                        fontSize: "12px",
                        color: "#828282",
                        fontWeight: 600,
                      }}
                    >
                     Qualifications:
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={8.5} md={8.5}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        // width: matches ? "62%" : "65%",
                        color: "#4F4F4F",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >{singleJobDetails?.qualification}</Typography>
                  </Grid>
                </Grid>
                <Grid sx={{ mb: "10px" }} container>
                  <Grid item xs={5} sm={3.5} md={3.5}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        // width: matches ? "170px" : "200px",
                        fontSize: "12px",
                        color: "#828282",
                        fontWeight: 600,
                      }}
                    >
                     Employment Type:
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={8.5} md={8.5}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        // width: matches ? "62%" : "65%",
                        color: "#4F4F4F",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >{singleJobDetails?.employmentType}</Typography>
                  </Grid>
                </Grid>
                <Grid sx={{ mb: "10px" }} container>
                  <Grid item xs={5} sm={3.5} md={3.5}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        // width: matches ? "170px" : "200px",
                        fontSize: "12px",
                        color: "#828282",
                        fontWeight: 600,
                      }}
                    >
                      Primary Specialization:
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={8.5} md={8.5}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        // width: matches ? "62%" : "65%",
                        color: "#4F4F4F",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >{getPrimarySpecialization?.length > 0 && getPrimarySpecialization[0]?.specialization?.replaceAll(",",", ")}</Typography>
                  </Grid>
                </Grid>
                <Grid sx={{ mb: "10px" }} container>
                  <Grid item xs={5} sm={3.5} md={3.5}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        // width: matches ? "170px" : "200px",
                        fontSize: "12px",
                        color: "#828282",
                        fontWeight: 600,
                      }}
                    >
                      Secondary Specialization:
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={8.5} md={8.5}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        // width: matches ? "62%" : "65%",
                        color: "#4F4F4F",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >{getSecondarySpecialization?.length > 0 && getSecondarySpecialization[0]?.specialization?.replaceAll(",",", ")}</Typography>
                  </Grid>
                </Grid>
                <Grid sx={{ mb: "10px" }} container>
                  <Grid item xs={5} sm={3.5} md={3.5}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        // width: matches ? "170px" : "200px",
                        fontSize: "12px",
                        color: "#828282",
                        fontWeight: 600,
                      }}
                    >
                      Last Date to Apply:
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={8.5} md={8.5}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        // width: matches ? "62%" : "65%",
                        color: "#4F4F4F",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {/* {new Date(singleJobDetails?.lastDateToApply)?.toUTCString()?.slice(5, 16).split(' ').join('-')} */}
                      {singleJobDetails?.lastDateToApply && (
                    <>
                      {new Date(singleJobDetails?.lastDateToApply)?.toLocaleString(
                        "default",
                        { day: "2-digit" }
                      )}
                      -
                      {new Date(singleJobDetails?.lastDateToApply)?.toLocaleString(
                        "default",
                        { month: "short" }
                      )}
                      -
                      {new Date(singleJobDetails?.lastDateToApply)?.toLocaleString(
                        "default",
                        { year: "numeric" }
                      )}
                    </>
                  )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              p: matches ? 1.7 : 2.5,
              bgcolor: "#FFFFFF",
              boxShadow: !matches
                ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                : " ",
              borderRadius: "6px",
              border: !matches ? "0px" : "1px solid #E4EEF5",
            }}
          >
            <Typography
              variant="subtitle1"
              component="div"
              style={{
                color: "#395987",
                fontWeight: "600",
                fontSize: matches ? "18px" : "24px",
                paddingBottom: "10px",
              }}
            >
              About {hospitalNames}
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mb: "30px",
              }}
            >
              {/* {descriptions.map((description) => ( */}
              <Typography
                sx={{
                  lineHeight: "24px",
                  color: "#333333",
                  fontWeight: "400",
                  paddingRight: "25px",
                }}
                variant="body2"
              >
                {hospitalDetails?.about}
              </Typography>
              {/* ))} */}
            </Box>
            <Box>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6}>
                  <Grid container spacing={1}>
                    <Box sx={{ width: 500 }}>
                      <SimpleReactLightbox>
                        <SRLWrapper>
                          <Masonry columns={3} spacing={2}>
                            {allHospitalImages?.map((item, index) => (
                              <div key={index}>
                                {/* {console.log(item)} */}
                                <img
                                  src={`data:image/png;base64,${item?.response?.content}`}
                                  srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                                  alt={item.title}
                                  loading="lazy"
                                  style={{
                                    borderBottomLeftRadius: 4,
                                    borderBottomRightRadius: 4,
                                    display: "block",
                                    width: "100%",
                                  }}
                                />
                              </div>
                            ))}
                          </Masonry>
                        </SRLWrapper>
                      </SimpleReactLightbox>
                    </Box>
                  </Grid>
                  <>
                    {/* <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={`data:image/png;base64,${allHospitalImages[0]?.response?.content}`}
                        alt="companypic"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <img
                        style={{ width: "100%", height: "150%" }}
                        src={`data:image/png;base64,${allHospitalImages[1]?.response?.content}`}
                        alt="companypic"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={`data:image/png;base64,${allHospitalImages[2]?.response?.content}`}
                        alt="companypic"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={`data:image/png;base64,${allHospitalImages[3]?.response?.content}`}
                        alt="companypic"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <img
                        style={{
                          width: "100%",
                          height: "50%",
                          marginBottom: "-65%",
                        }}
                        src={`data:image/png;base64,${allHospitalImages[4]?.response?.content}`}
                        alt="companypic"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={`data:image/png;base64,${allHospitalImages[5]?.response?.content}`}
                        alt="companypic"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={`data:image/png;base64,${allHospitalImages[6]?.response?.content}`}
                        alt="companypic"
                      />
                    </Grid>
                    <Grid item xs={8} sx={{ width: "100%", height: "100%" }}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={`data:image/png;base64,${allHospitalImages[7]?.response?.content}`}
                        alt="companypic"
                      />
                    </Grid>
                  </Grid> */}
                  </>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <YouTube videoId={id} opts={opts} />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Typography
          style={{
            color: "#395987",
            paddingTop: "30px",
            paddingBottom: "20px",
            paddingLeft: "5px",
            lineHeight: "24px",
            fontWeight: "600",
            fontSize: matches ? "18px" : "24px",
          }}
          gutterBottom
        >
          Similar Jobs
        </Typography>

        {!matches ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 8,
            }}
          >
            {vacancies?.map((row) => (
              <Box
                key={row?.vacancyID}
                sx={{
                  bgcolor: "#FFFFFF",
                  borderRadius: "6px",
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  boxShadow: "0px 0px 9px rgba(69, 143, 246, 0.09)",
                  border: "1px solid #E4EEF5",
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  onClick={() => handleSingleJob(row)}
                  style={{
                    color: "#395987",
                    fontWeight: "600",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  {row?.jobTitle}{" "}
                </Typography>
                <Typography
                  style={{
                    color: "#333333",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  {row?.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pr: 2,
                  }}
                >
                  <Tooltip title="Job Description">
                    <DescriptionTwoToneIcon
                      fontSize="small"
                      sx={{
                        color: "#C7D3E3",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    />
                  </Tooltip>

                  <Typography
                    component="div"
                    sx={{
                      color: "#4F4F4F",
                      fontSize: "16px",
                      fontWeight: "400",
                    }}
                    variant="body1"
                  >
                    {row?.description?.length > 150 ? (
                      <>
                        {row?.description?.includes("<br />") && row?.description?.slice(0, 150)?.replaceAll("<br />", "")}
                        {row?.description?.includes("<br/>") && row?.description?.slice(0, 150)?.replaceAll("<br/>", "")}
                      </>
                    ) : row?.description}<span>{row?.description?.length > 150 ? "..." : ""} </span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    py: 1,
                  }}
                >
                  <Typography
                    gutterBottom
                    style={{
                      color: "#333333",
                      fontWeight: "600",
                      fontSize: "18px",
                      lineHeight: "16px",
                    }}
                  >
                    Key Skills
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    {/* {row?.secondarySpecialization.map((skill) => ( */}
                    <Typography
                      style={{
                        lineHeight: "16px",
                        color: "#333333",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      {row?.getJobPostPrimarySpecialization?.map((ps, index) => (
                        <> {ps?.specialization},</>
                      ))} {row?.getJobPostSecondarySpecialization?.map((ss, index) => (
                        <> {ss?.specialization}{row?.getJobPostSecondarySpecialization?.length - 1 === index ? "." : ", "}</>
                      ))}
                    </Typography>
                    {/* ))} */}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      pr: 2,
                      pb: 0.5,
                    }}
                  >
                    <Tooltip title="Location">
                      <LocationOnTwoToneIcon
                        fontSize="small"
                        style={{
                          color: "#C7D3E3",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      />
                    </Tooltip>

                    <Typography
                      component="div"
                      style={{
                        color: "#4F4F4F",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                      variant="body1"
                    >
                      {row?.location}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      pr: 2,
                    }}
                  >
                    <Tooltip title="Experience">
                      <WorkTwoToneIcon
                        fontSize="small"
                        sx={{
                          color: "#C7D3E3",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      />
                    </Tooltip>
                    <Typography
                      component="div"
                      sx={{
                        color: "#4F4F4F",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                      variant="body1"
                    >
                      {row?.experience} years
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      pr: 2,
                    }}
                  >
                    <Tooltip title="Salary Range ( Min - Max )">
                      <AccountBalanceWalletTwoToneIcon
                        fontSize="small"
                        sx={{
                          color: "#C7D3E3",
                          fontSize: "16px",
                          fontWeight: "400",
                        }}
                      />
                    </Tooltip>

                    <Typography
                      component="div"
                      sx={{
                        color: "#4F4F4F",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                      variant="body1"
                    >
                      {row?.minimumSalary+' Lakh - '+row?.maximumSalary} {"Lakh INR"}
                    </Typography> 
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Box
                      sx={{
                        width: "max-content",
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#E4EEF5",
                        gap: 1,
                        padding: "2px 10px 2px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      <Tooltip title="Posted On">
                        <AccessTimeOutlinedIcon
                          fontSize="small"
                          style={{
                            color: "#395987",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        />
                      </Tooltip>

                      <Typography
                        component="div"
                        style={{
                          color: "#395987",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                        variant="body1"
                      >
                        {date_diff_indays(new Date(`${row?.postedOn}`))
                          .month ? (
                          <>
                            {
                              date_diff_indays(new Date(`${row?.postedOn}`))
                                .month
                            }{" "}
                            {date_diff_indays(new Date(`${row?.postedOn}`))
                              .month === 1
                              ? "month"
                              : "months"}{" "}
                            {date_diff_indays(new Date(`${row?.postedOn}`))
                              .day ? (
                              <>
                                {
                                  date_diff_indays(new Date(`${row?.postedOn}`))
                                    .day
                                }{" "}
                                {date_diff_indays(new Date(`${row?.postedOn}`))
                                  .day === 1
                                  ? "day"
                                  : "days"}{" "}
                                {"ago"}
                              </>
                            ) : (
                              <> {"ago"}</>
                            )}
                          </>
                        ) : (
                          <>
                            {
                              date_diff_indays(new Date(`${row?.postedOn}`))
                                .days
                            }{" "}
                            {date_diff_indays(new Date(`${row?.postedOn}`))
                              .days === 1
                              ? "day"
                              : "days"}{" "}
                            {"ago"}
                          </>
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                  {savedJobs?.find(
                  (job) => job?.vacancyID === row?.vacancyID.toString()
                )?.vacancyID === row?.vacancyID.toString() && (
                  <button
                  onClick={() => handleDeleteSavedJobs(row?.vacancyID)}
                  style={{
                    width: "max-content",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E4EEF5",
                    borderRadius: "20px",
                    padding: "2px 10px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <StarIcon
                    style={{
                      color: "#395987",
                      fontWeight: "600",
                      fontSize: "12px",
                    }}
                    fontSize="small"
                  />
                  <Typography
                    style={{
                      color: "#395987",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    &nbsp; Saved{" "}
                  </Typography>
                </button>
                )}
                {savedJobs?.find(
                  (job) => job?.vacancyID === row?.vacancyID.toString()
                )?.vacancyID !== row?.vacancyID.toString() && (
                  <button
                        onClick={() => handleSaveSimilarJob(row?.vacancyID)}
                        style={{
                          width: "max-content",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E4EEF5",
                          borderRadius: "20px",
                          padding: "2px 10px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <StarBorderIcon
                          style={{
                            color: "#395987",
                            fontWeight: "600",
                            fontSize: "12px",
                          }}
                          fontSize="small"
                        />
                        <Typography
                          style={{
                            color: "#395987",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          &nbsp; Save Job{" "}
                        </Typography>
                      </button>
                )}
{/*                     {row?.savedJob ? (
                      <button
                        onClick={() => handleDeleteSavedJobs(row?.vacancyID)}
                        style={{
                          width: "max-content",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E4EEF5",
                          borderRadius: "20px",
                          padding: "2px 10px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <StarIcon
                          style={{
                            color: "#395987",
                            fontWeight: "600",
                            fontSize: "12px",
                          }}
                          fontSize="small"
                        />
                        <Typography
                          style={{
                            color: "#395987",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          &nbsp; Saved{" "}
                        </Typography>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSaveSimilarJob(row?.vacancyID)}
                        style={{
                          width: "max-content",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E4EEF5",
                          borderRadius: "20px",
                          padding: "2px 10px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <StarBorderIcon
                          style={{
                            color: "#395987",
                            fontWeight: "600",
                            fontSize: "12px",
                          }}
                          fontSize="small"
                        />
                        <Typography
                          style={{
                            color: "#395987",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          &nbsp; Save Job{" "}
                        </Typography>
                      </button>
                    )} */}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 8,
            }}
          >
            {vacancies?.map((row) => (
              <Box
                key={row?.vacancyID}
                sx={{
                  bgcolor: "#FFFFFF",
                  borderRadius: "6px",
                  p: matches ? 1.7 : 2.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  border: "1px solid #E4EEF5",
                  textDecoration: "none",
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  onClick={() => handleSingleJob(row)}
                  style={{
                    color: "#395987",
                    fontWeight: "600",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  {row?.jobTitle}
                </Typography>
                <Typography
                  sx={{
                    color: "#333333",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  {row?.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    pr: 2,
                  }}
                >
                  <Tooltip title="Job Description">
                    <DescriptionTwoToneIcon
                      fontSize="small"
                      sx={{ color: "#C7D3E3" }}
                    />
                  </Tooltip>

                  <Typography
                    component="div"
                    sx={{ color: "#4F4F4F" }}
                    variant="body1"
                  >
                    {row?.description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    py: 1,
                  }}
                >
                  <Typography
                    gutterBottom
                    style={{
                      color: "#333333",
                      fontWeight: "600",
                      fontSize: "18px",
                      lineHeight: "16px",
                    }}
                  >
                    Key Skills
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    {/* {row?.secondarySpecialization.map((skill) => ( */}
                    <Typography
                      style={{
                        lineHeight: "16px",
                        color: "#333333",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                      {row?.getJobPostPrimarySpecialization?.map((ps, index) => (
                        <> {ps?.specialization},</>
                      ))} {row?.getJobPostSecondarySpecialization?.map((ss, index) => (
                        <> {ss?.specialization}{row?.getJobPostSecondarySpecialization?.length - 1 === index ? "." : ", "}</>
                      ))}
                    </Typography>
                    {/* ))} */}
                  </Box>
                </Box>
                <Box
                  sx={{
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      pr: 2,
                      pb: 0.5,
                      mb: "10px",
                    }}
                  >
                    <Tooltip title="Location">
                      <LocationOnTwoToneIcon
                        fontSize="small"
                        sx={{ color: "#C7D3E3" }}
                      />
                    </Tooltip>

                    <Typography
                      component="div"
                      sx={{ color: "#4F4F4F" }}
                      variant="body1"
                    >
                      {row?.location}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      pr: 2,
                      pb: 0.5,
                      mb: "10px",
                    }}
                  >
                    <Tooltip title="Experience">
                      <WorkTwoToneIcon
                        fontSize="small"
                        sx={{ color: "#C7D3E3" }}
                      />
                    </Tooltip>
                    <Typography
                      component="div"
                      sx={{ color: "#4F4F4F" }}
                      variant="body1"
                    >
                      {row?.experience} years
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      pr: 2,
                      pb: 0.5,
                      mb: "3px",
                    }}
                  >
                    <Tooltip title="Salary Range ( Min - Max )">
                      <AccountBalanceWalletTwoToneIcon
                        fontSize="small"
                        sx={{ color: "#C7D3E3" }}
                      />
                    </Tooltip>

                    <Typography
                      component="div"
                      sx={{ color: "#4F4F4F" }}
                      variant="body1"
                    >
                      ₹
                      {(
                        Math.round((row?.minimumSalary / 100000) * 100) / 100
                      ).toFixed(2)}{" "}
                      L - ₹
                      {(
                        Math.round((row?.maximumSalary / 100000) * 100) / 100
                      ).toFixed(2)}{" "}
                      L
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Box
                      sx={{
                        width: "max-content",
                        display: "flex",
                        alignItems: "center",
                        bgcolor: "#E4EEF5",
                        gap: 1,
                        padding: "2px 10px 2px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      <Tooltip title="Posted On">
                        <AccessTimeOutlinedIcon
                          fontSize="small"
                          style={{
                            color: "#395987",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        />
                      </Tooltip>

                      <Typography
                        component="div"
                        style={{
                          color: "#395987",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                        variant="body1"
                      >
                        {date_diff_indays(new Date(`${row?.postedOn}`))
                          .month ? (
                          <>
                            {
                              date_diff_indays(new Date(`${row?.postedOn}`))
                                .month
                            }{" "}
                            {date_diff_indays(new Date(`${row?.postedOn}`))
                              .month === 1
                              ? "month"
                              : "months"}{" "}
                            {date_diff_indays(new Date(`${row?.postedOn}`))
                              .day ? (
                              <>
                                {
                                  date_diff_indays(new Date(`${row?.postedOn}`))
                                    .day
                                }{" "}
                                {date_diff_indays(new Date(`${row?.postedOn}`))
                                  .day === 1
                                  ? "day"
                                  : "days"}{" "}
                                {"ago"}
                              </>
                            ) : (
                              <> {"ago"}</>
                            )}
                          </>
                        ) : (
                          <>
                            {
                              date_diff_indays(new Date(`${row?.postedOn}`))
                                .days
                            }{" "}
                            {date_diff_indays(new Date(`${row?.postedOn}`))
                              .days === 1
                              ? "day"
                              : "days"}{" "}
                            {"ago"}
                          </>
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    {row?.savedJob ? (
                      <button
                        onClick={() => handleDeleteSavedJobs(row?.vacancyID)}
                        style={{
                          width: "max-content",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E4EEF5",
                          borderRadius: "20px",
                          padding: "2px 10px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <StarIcon
                          style={{
                            color: "#395987",
                            fontWeight: "600",
                            fontSize: "12px",
                          }}
                          fontSize="small"
                        />
                        <Typography
                          style={{
                            color: "#395987",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          &nbsp; Saved{" "}
                        </Typography>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSaveSimilarJob(row?.vacancyID)}
                        style={{
                          width: "max-content",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E4EEF5",
                          borderRadius: "20px",
                          padding: "2px 10px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <StarBorderIcon
                          style={{
                            color: "#395987",
                            fontWeight: "600",
                            fontSize: "12px",
                          }}
                          fontSize="small"
                        />
                        <Typography
                          style={{
                            color: "#395987",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          &nbsp; Save Job{" "}
                        </Typography>
                      </button>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
    </>
  );
};

export default SingleJob;