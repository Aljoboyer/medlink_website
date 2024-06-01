import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import styled from "@emotion/styled";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";
import EditIcon from "@mui/icons-material/Edit";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormHelperText,
  Grid, IconButton, Input, TextField, InputAdornment, Tooltip, Typography, useMediaQuery, useTheme
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, createSearchParams } from "react-router-dom";
import {
  gqlOpenQuery,
  gqlquery,
  QUERY_GETCAREERPROFILEPERCENTAGE,
  QUERY_GETEDUCATION,
  QUERY_GETEDUCATIONLIST,
  QUERY_GETEXPERIENCE,
  QUERY_GETEXPERIENCELIST,
  QUERY_GETMEMBERSHIPS,
  QUERY_GETPERSONALDETAILS,
  QUERY_GETRESUME,
  QUERY_GETRESUMEHEADLINE,
  QUERY_GETSKILLSLIST,
  QUERY_LANGUAGES_KNOWN,
  QUERY_LISTPROFILES,
  QUERY_SAVEDJOBS
} from "../../api";
import homeBanner from "../../assets/images/doctors_home_banner.png";
// import profileImg from "../../assets/profile.png";
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MuiAlert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import { encode } from 'base-64';
import greenTick from "../../assets/green_tick.svg";
import useAuth from "../../hooks/useAuth";
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import MenuIcon from '@mui/icons-material/Menu';
import NoMessagesEmptynbox from '../../assets/images/NoMessagesEmptynbox.png';

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const SearchButton = styled(Button)(() => ({
  border: "none !important",
}));

const UserInfoBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "1.5rem",
  color: "var(--clr-gray-1)"
}));

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 1,
  px: 7,
  py: 5,
};

const styleResponsive = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 1,
  px: 1.2,
  py: 1.2,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProfileHome = () => {
  const tabletView = useMediaQuery("(max-width:900px)");
  const mobileView = useMediaQuery("(max-width:600px)");
  const { strengthUpdate , handleStrengthUpdate, setBase64ProfileImage, getUserProfile, jobSearch, setJobSearch} = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [phoneVerified, setPhoneVerified] = useState("");
  const [resendCode, setResendCode] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [otpError, setOtpError] = useState("");
  const [updated, setUpdated] = useState(false);
  const [base64Image, setBase64Image] = useState('');
  const [topFourJobs, SetTopFourJobs] = useState([]);
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [imgUploadError, setImgUploadError] = useState("");
  const [values, setValues] = useState({
    jobTitle: "",
    location: "",
  });
  const [profile, setProfile] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [profileStrength, setProfileStrength] = useState(0);
  const [controlStrength, setControlSrength] = useState({
    phoneVerified: 0,
    education: 0,
    personalDetails: 0,
    careerProfile: 0,
    experience: 0,
    resume: 0,
    resumeHeadline: 0,
    profilePicURL: 0,
    language: 0,
  });
  const [firstOtpSentMessage, setFirstOtpSentMessage] = useState("");
  const [error, setError] = useState("");
  const [loadAgain, setLoadAgain] = useState(false);
  const [userName, setUserName] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [totalStrength , setTotalStrength] = useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const access_token = sessionStorage.getItem("accessToken");
  const [openImg, setOpenImg] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [classShow, setClassShow] =  useState('');
  const [savedJob, setSavedJob] = useState([]);
  document.title = "Search Job | MedLink Jobs";

  
  const getUserEmail = async () => {
    const res = await provider.getUser({ AccessToken: access_token });
    setUserEmail(res?.UserAttributes[2].Value);
  };

  const getUserName = async () => {
    await gqlquery(QUERY_LISTPROFILES, null)
      .then((res) => res.json())
      .then(datas => {
        console.log(datas)
      })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!userEmail) {
      getUserProfile();
      getUserEmail();
    }

    if (!userName) {
      // getUserName();
    }
    // window.history.pushState(null, null, location.href);
    // window.onpopstate = function (event) {
    //   navigate(1);
    //   // window.history.go(1);
    // };
  }, []);

  useEffect(() => {
    let timer = null;
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    gqlquery(QUERY_LISTPROFILES, null)
      .then((res) => res.json())
      .then((datas) => {
        setUserName(datas?.data?.getProfile?.name);
        setProfile(datas?.data?.getProfile);
        setPageLoading(false);
        if (
          datas?.data?.getProfile?.phoneVerified &&
          controlStrength?.phoneVerified === 0
        ) {
          setControlSrength({ phoneVerified: 1 });
          setTimeout(
            setProfileStrength((prevData) => prevData + 20),
            10000
          );
        };

        const QUERY_DOWNLOADRESUME = {
          query: `query MyQuery {
              downloadDocument (url: "${datas?.data?.getProfile?.profilePicURL}")
            }`,
        };
        gqlquery(QUERY_DOWNLOADRESUME, null)
          .then((res) => res.json())
          .then((datas) => {
            const downloadDocument = JSON.parse(datas?.data?.downloadDocument);
            const imageSource = `data:image/png;base64,${downloadDocument?.response?.content}`;
            setBase64Image(imageSource);
            setBase64ProfileImage(imageSource);
            setClassShow(downloadDocument?.response?.content)

          })
      });
  }, [image, updated, strengthUpdate]);



  useEffect(() => {
    let strengthSum = async () => {

      await gqlquery(QUERY_GETEDUCATION, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.getEducationList.length === 0) {
            controlStrength.education = 0;
          }
          else {
            controlStrength.education = 10;
          }
        })

      await gqlquery(QUERY_LANGUAGES_KNOWN, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.getLanguagesKnown.length === 0) {
            controlStrength.language = 0;
          }
          else {
            controlStrength.language = 10;
          }
        });

      await gqlquery(QUERY_GETEXPERIENCELIST, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas.data?.getExperienceList.length === 0) {
            controlStrength.experience = 0;
          }
          else {
            controlStrength.experience = 10;
          }
        });

      await gqlquery(QUERY_GETCAREERPROFILEPERCENTAGE, null)
        .then((res) => res.json())
        .then((datas) => {
          // console.log(datas.data?.getCareerProfile)
          if (datas?.data?.getCareerProfile === undefined) {
            controlStrength.careerProfile = 0;
          }
          else {
            controlStrength.careerProfile = 20;
          }
        });

      await gqlquery(QUERY_GETPERSONALDETAILS, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.getPersonalDetails === undefined) {
            controlStrength.personalDetails = 0;
          }
          else {
            controlStrength.personalDetails = 10;
          }
        });

      await gqlquery(QUERY_GETRESUME, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.getResume?.filename === "" || datas.data?.getResume === undefined) {
            controlStrength.resume = 0;
          }
          else {
            controlStrength.resume = 20;
          }
        });

      await gqlquery(QUERY_GETRESUMEHEADLINE, null)
        .then((res) => res.json())
        .then((datas) => {
          const regex = /[a-zA-Z]/.test(datas?.data?.getResume?.headline?.replaceAll("<br />", "\n"));
          if (!regex || !datas?.data?.getResume?.headline) {
            controlStrength.resumeHeadline = 0;
          }
          else {
            controlStrength.resumeHeadline = 5;
          }
        });

      await gqlquery(QUERY_LISTPROFILES, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.getProfile?.phoneVerified === false) {
            controlStrength.phoneVerified = 0;
          }
          else {
            controlStrength.phoneVerified = 10;
          }
          
          if (!datas?.data?.getProfile?.profilePicURL) {
            controlStrength.profilePicURL = 0;
          }
          else {
            controlStrength.profilePicURL = 5;
          }
        });

      let strength = controlStrength.education + controlStrength.experience + controlStrength.language + controlStrength.personalDetails + controlStrength.careerProfile + controlStrength.resume + controlStrength.resumeHeadline + controlStrength.phoneVerified + controlStrength.profilePicURL;
      setTotalStrength(strength)
    }

  strengthSum();
  }, [[], strengthUpdate]);

  const handleChange = (prop) => (event) => {

    setValues({ ...values, [prop]: event.target.value });
    setJobSearch({...jobSearch, [prop]: event.target.value})
    setJobSearch({...jobSearch, [prop]: event.target.value.replace(/\s\s+/g, ' ').trim().replace(/[^a-zA-Z ]/g, "").replace(/[^a-zA-Z ]/g, '')})
  };

  const handleJobsSearch = (event) => {
    event.preventDefault();
    const handleNavigate = () => {
      navigate({
        pathname: "/job-search-list", 
        search: `?${createSearchParams({ jobTitle: values.jobTitle })}`,
      },{
        state: { values }
      });
    };
    setTimeout(handleNavigate, 1000);
  };

  useEffect(() => {
    const QUERY_FOUR_RECOMMANDEDJOBS = {
      query: `query MyQuery {
        getRecommendedJobs(paginateFrom: 0, sortBy: "v.vacancyType") {
          vacancyType
          vacancyID
          savedJob
          qualification
          postedOn
          name
          minimumSalary
          maximumSalary
          location
          lastDateToApply
          jobTitle
          hospitalID
          experience
          employmentType
          description
        }
      }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_FOUR_RECOMMANDEDJOBS, null)
      .then((res) => res.json())
      .then((data) => {

        
        let getRecommendedJobsData = data?.data?.getRecommendedJobs;

          const getInfo = async () => { 
            const primarySpec = async (savedJobResult) => { 
              const QUERY_GETPRIMARYSPECIALIZATION = {
                query: `query MyQuery {
                getJobPostPrimarySpecialization(vacancyID: ${Number(
                  savedJobResult?.vacancyID
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
                  Object.assign(savedJobResult, data?.data);
                });
            };
            
          const secondarySpec = async (savedJobResult) => { 
            const QUERY_GETSECONDARYSPECIALIZATION = {
              query: `query MyQuery {
              getJobPostSecondarySpecialization(vacancyID: ${Number(
                savedJobResult?.vacancyID
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
                Object.assign(savedJobResult, data?.data);
              });
          };

          
          const getAllInfo = getRecommendedJobsData?.map(async (sJ, index) => { 
            await primarySpec(sJ);
            await secondarySpec(sJ); 
          });

          const getOtherInfos = async () => { 
            const newTopFourJobs = getRecommendedJobsData?.slice(0,4).map((searchResult) => {
              const date_diff_indays = function () {
                const dt1 = new Date(searchResult?.postedOn);
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
          
              return {
                date_diff_indays,
                jobTitle: searchResult?.jobTitle,
                qualification: searchResult?.qualification,
                secondarySpecialization: searchResult?.getJobPostSecondarySpecialization,
                description: searchResult?.description,
                maximumSalary: searchResult?.maximumSalary,
                minimumSalary: searchResult?.minimumSalary,
                location: searchResult?.location,
                postedOn: searchResult?.postedOn,
                primarySpecialization: searchResult?.getJobPostPrimarySpecialization,
                experience: searchResult?.experience,
                employmentType: searchResult?.employmentType,
                lastDateToApply: searchResult?.lastDateToApply,
                vacancyID: searchResult?.vacancyID,
                vacancyType: searchResult?.vacancyType,
                name: searchResult?.name
              };
            });
          
             if (newTopFourJobs.length > 0) {
               SetTopFourJobs(newTopFourJobs);
             }
          }; 
          await Promise.all(getAllInfo);
          await getOtherInfos();
        };
        getInfo();

        // console.log(data?.data?.getRecommendedJobs);
        /* data?.data?.getRecommendedJobs.map((vacanciesData) => {

          const QUERY_GETPRIMARYSPECIALIZATION = {
            query: `query MyQuery {
            getJobPostPrimarySpecialization(vacancyID: ${Number(
              vacanciesData?.vacancyID
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
          gqlOpenQuery(QUERY_GETPRIMARYSPECIALIZATION, null)
            .then((res) => res.json())
            .then((data) => {
              Object.assign(vacanciesData, data?.data);
              // setGetPrimarySpecialization(
              //   data?.data?.getJobPostPrimarySpecialization
              // );
            });
            
            const QUERY_GETSECONDARYSPECIALIZATION = {
              query: `query MyQuery {
              getJobPostSecondarySpecialization(vacancyID: ${Number(
                vacanciesData?.vacancyID
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
            gqlOpenQuery(QUERY_GETSECONDARYSPECIALIZATION, null)
              .then((res) => res.json())
              .then((data) => {
                Object.assign(vacanciesData, data?.data);
                // setGetSecondarySpecialization(
                // data?.data?.getJobPostSecondarySpecialization
                // );
              });
        }); */
        /* if (data?.data?.getRecommendedJobs) {
          SetTopFourJobs(data?.data?.getRecommendedJobs)
        } */
        // SetTopFourJobs(data?.data?.getRecommendedJobs);
      });
  }, [updated]);


  const handleUploadProfileImage = (e) => {
    let image = e.target.files[0];
    if (image.size / 1024 / 1024 <= 1) {
      setImageName(image.name);
      var reader = new FileReader(); 
      reader.readAsBinaryString(image)
      reader.onload = function (evt) {
        let encoded = encode(evt.target.result);
        setImage(encoded)
      }
      setOpenImg(false);
      setImgUploadError("");
    }
    else {
      setImgUploadError("Image size should be less than 1 MB");
      setOpenImg(true);

    }

  };

  useEffect(() => {

    if (image) {
      setIsLoading(true);
      const QUERY_UPLOADPAPER = {
        query: `mutation MyMutation {
            uploadDocument (
              content: "${image}", 
              fileName: "${imageName}",
              url: ""
            )
          }`,
        variables: null,
        operationName: "MyMutation",
      };
      gqlquery(QUERY_UPLOADPAPER, null)
        .then((res) => res.json())
        .then((datas) => {
          const data = JSON.parse(datas?.data?.uploadDocument);
          // console.log(data)
          postProfilePic(data?.url);
          setImage(null);
        })
    }

    const postProfilePic = (fileUrl) => {
      const QUERY_POSTPROFILEPIC = {
        query: `mutation MyMutation {
            updateProfilePicURL(
                profilePicURL: "${fileUrl ? fileUrl : ""}"
                  ) {
                    profilePicURL
                }
              }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_POSTPROFILEPIC, null)
        .then((res) => res.json())
        .then((datas) => {
          // console.log(datas);
          if (datas?.data?.updateProfilePicURL) {
            handleStrengthUpdate();
          }
        })
        .finally((e) => setIsLoading(false));
    }
  }, [image]);

  let countResetCode = sessionStorage.getItem("countingResendCode");
  const handleVerifyPhoneNumber = () => {
    sessionStorage.setItem("countingResendCode", 1);
    if (countResetCode === null) {
      const QUERY_VERIFYPHONENUMBER = {
        query: `mutation MyMutation {
          sendSMS
          }
        `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_VERIFYPHONENUMBER, null)
        .then((res) => res.json())
        .then((datas) => {
          // console.log(datas);
          if (datas?.data?.sendSMS) {
            setFirstOtpSentMessage("An otp has been sent to your number.")
            setOpenSnackbar(true);
            setOpenAddModal(true);
            setSeconds(60);
            setIsActive(true);
          }
        })
    } else {
      setOpenAddModal(true);
    }
  };

  const hanldeCloseAddModal = () => {
    setOpenAddModal(false);
    setFirstOtpSentMessage("");
    setPhoneVerified("");
    setError("");
    setOtpCode("");
    setResendCode("");
    setOtpError("");
    setOpenSnackbar(false);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setPhoneVerified("");
    setFirstOtpSentMessage("");
    setResendCode("");
    setOtpError("");
    setOpenSnackbar(false);
  };
  const handleCloseImg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenImg(false);
    setImgUploadError("");
  };
  const handleVerifyOTP = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (otpCode.length === 0) {
        return setError("Please enter a valid OTP")
      } else {
        setError("");
      }
      if (otpCode.length !== 6) {
        return setError("Invalid OTP");
      } else {
        setError("");
      }
      const QUERY_VERIFYPHONENUMBER = {
        query: `mutation MyMutation {
          confirmMobileOTP(verificationCode: "${otpCode}") {
              phoneVerified
              name
            }
          }
        `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_VERIFYPHONENUMBER, null)
        .then((res) => res.json())
        .then((datas) => {
          // console.log(datas);
          if (datas?.data?.confirmMobileOTP) {
            setUpdated(pre => !pre);
            setOpenSnackbar(true);
            setLoadAgain(true);
            setOpenAddModal(false);
            setPhoneVerified("Congrats! Your phone number has been verified");
            sessionStorage.removeItem("countingResendCode");
            handleStrengthUpdate();
          } else {
            setError("OTP is either invalid or has expired.");
            // setOpenAddModal(false);
            // setOpenSnackbar(true);
          }
        })
    }
  }

  const hanldeResetCountdown = () => {
    sessionStorage.setItem("countingResendCode", Number(countResetCode) + 1);
    const QUERY_VERIFYPHONENUMBER = {
      query: `mutation MyMutation {
          sendSMS
          }
        `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_VERIFYPHONENUMBER, null)
      .then((res) => res.json())
      .then((datas) => {
        // console.log(datas);
        if (datas?.data?.sendSMS) {
          setResendCode("A new OTP has been sent.")
          setOpenSnackbar(true);
          let setCounter = sessionStorage.getItem("countingResendCode");
          if (setCounter >= 3) {
            setSeconds(300);
          } else {
            setSeconds(60);
          }
          setIsActive(true);
        }
      })
  }

/*   const newTopFourJobs = topFourJobs?.slice(0,4).map((searchResult) => {
    const date_diff_indays = function () {
      const dt1 = new Date(searchResult?.postedOn);
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

    return {
      date_diff_indays,
      jobTitle: searchResult?.jobTitle,
      qualification: searchResult?.qualification,
      secondarySpecialization: searchResult?.secondarySpecialization,
      description: searchResult?.description,
      maximumSalary: searchResult?.maximumSalary,
      minimumSalary: searchResult?.minimumSalary,
      location: searchResult?.location,
      postedOn: searchResult?.postedOn,
      primarySpecialization: searchResult?.primarySpecialization,
      experience: searchResult?.experience,
      employmentType: searchResult?.employmentType,
      lastDateToApply: searchResult?.lastDateToApply,
      vacancyID: searchResult?.vacancyID,
      vacancyType: searchResult?.vacancyType,
      name: searchResult?.name
    };
  }); */

  // View job
  const handleSingleJob = (searchResult) => {
    const handleNavigate = () => {
      navigate(`/job-search-list/${searchResult?.vacancyID}`, {
        state: { hospitalID: searchResult?.hospitalID, location,  hospitalName: searchResult?.name},
      });
    };
    setTimeout(handleNavigate, 1000);
  };


  const DeleteProfilePic = () => {

    const QUERY_UPLOADCOMPANYPROFILEPIC = {
      query: `mutation MyMutation {
          uploadDocument (
            content: "${image}", 
            fileName: "${imageName}",
            url: ""
          )
        }`,
      variables: null,
      operationName: "MyMutation",
    };
    gqlquery(QUERY_UPLOADCOMPANYPROFILEPIC, null)
      .then((res) => res.json())
      .then((datas) => {
        const data = JSON.parse(datas?.data?.uploadDocument);
        delets(data?.url);
      })

    gqlquery(QUERY_UPLOADCOMPANYPROFILEPIC, null)
      .then((res) => res.json())
      .then((datas) => {
        const data = JSON.parse(datas?.data?.uploadDocument);
        // console.log(data)
        delets(data?.url);
        setImage(null);
      })

    const delets = (urls) => {
      const QUERY_ADDRESUME = {
        query: `mutation MyMutation {
      deleteDocument(url: "${urls}")
    }`,
        variables: null,
        operationName: "MyMutation",
      };
      gqlquery(QUERY_ADDRESUME, null)
        .then((res) => res.json())
        .then((datas) => {
          const response = JSON.parse(datas?.data?.deleteDocument);
          // console.log(response);
          if (response?.response?.status === "SUCCESS") {
            handleStrengthUpdate();
            const QUERY_POSTPROFILEPIC = {
              query: `mutation MyMutation {
                  updateProfilePicURL(
                      profilePicURL: "${""}"
                        ) {
                          profilePicURL
                      }
                    }`,
              variables: null,
              operationName: "MyMutation",
            };

            gqlquery(QUERY_POSTPROFILEPIC, null)
              .then((res) => res.json())
              .then((datas) => {

                setImage(null);
                if (datas?.data?.updateProfilePicURL) {
                  setBase64ProfileImage(datas?.data?.updateProfilePicURL)
                  setBase64Image('data:image/png;base64,')
                  setDeleteModal(false)
                  setClassShow('')
                  // setAddPaperSnack(true);
                  // setOpen(true);
                  // setTimeout(handleSnackbar, 2000);
                  setUpdated(pre => !pre);
                } else {

                }
              })
          } else {
            // setOpen(true);
          }
        })
    }
  }

  useEffect(() => {
    gqlquery(QUERY_SAVEDJOBS, null)
      .then((res) => res.json())
      .then((data) => setSavedJob(data?.data?.getSavedJobs));
  },[updated])
  
  const handleDeleteSavedJobs = (deleteId) => {

    if (window.confirm("Are you sure you want to delete?")) {
      const QUERY_REMOVEJOBFROMSAVEDLIST = {
        query: `mutation MyMutation {
            removeJobFromSavedList (vacancyID: ${Number(deleteId)})
            }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_REMOVEJOBFROMSAVEDLIST, null)
        .then((res) => res.json())
        .then((data) => setUpdated(prev => !prev))
        .finally((e) =>
          console.log("Deleting Save Job from database")
        );
    } else {
      console.log("You don't want to delete this!");
    }
  };

  const handleSaveJob = (vacancyID) => {

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
      .then((datas) => {

        setUpdated(prev => !prev);
      })
      .finally((e) => console.log("saved this job"));
  };



  return (
    <Box>
   
    {
      pageLoading ? (
        <>
          <Skeleton animation="wave" sx={{ height: "80vh" }} />
        </>
      ) : (
        <>
          {
            access_token ? (
              <>
                {userName ? ( 
                  <Box>
                     {
                        matches &&
                        <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
                        {/* <MenuIcon sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/> */}
                        <Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>My Profile</Typography>
                        </Box>
                      }
                    <Box
                      style={{
                        backgroundImage: matches ? "" : `url(${homeBanner})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                      sx={{ height: matches ? "105px" : "240px" }}
                    >
                      <Box maxWidth="md" sx={{ mx: "auto", px: matches ? "16px" : "" }}>
                        <form onSubmit={handleJobsSearch}>
                          <Input
                            sx={{
                              mt: matches ? "30px" : "50px",
                              borderRadius: 16,
                              padding: matches ? "8px 8px 8px 27px  !important" : "12px 14px 12px 40px  !important",
                              py: "2 !important",
                            }}
                            disableUnderline
                            fullWidth
                            name="jobTitle"
                            onChange={handleChange("jobTitle")}
                            placeholder="Enter Keyword"
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
                                  Search Jobs
                                </SearchButton>
                              </InputAdornment>
                            }
                          />
                        </form>
                      </Box>
                    </Box>
                    <Box maxWidth="md" sx={{ mx: "auto", mt: matches ? 0 : -10, px: matches ? "16px" : "" }}>
                      {matches ? (
                        <Card
                          sx={{
                            margin: "auto",
                            borderRadius: 2,
                            boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                            border: matches ? "1px solid #E4EEF5" : ""
                          }}
                        >
                          <CardContent>
                            <Grid container spacing={2}>
                              <Grid item xs={3.5}>
                                <Box sx={{ position: "relative", mx: "auto" }}>
                                  {isLoading ? (
                                    <Button
                                      sx={{
                                        marginTop: 3,
                                        marginBottom: "1rem",
                                        px: 5,
                                        py: 1.2,
                                        borderRadius: 16,
                                      }}
                                    >
                                      <CircularProgress size="2rem" thickness={6} />
                                    </Button>
                                  ) : (
                    
                                      <Avatar
                                      
                                      variant="rounded"
                                      sx={{
                                        width: "72px",
                                        height: "72px",
                                        mt: 1,
                                      }}
                                      src={base64Image}
                                    /> 

                                  )}
                                  <IconButton
                                    sx={{
                                      position: "absolute",
                                      top: 73,
                                      left: 73,
                                      transform: "translate(-50%, -50%)",
                                      bgcolor: "#FFFFFF",
                                      p: 0.15,
                                      m: 0,
                                      fontSize: "0.5rem",
                                    }}
                                  >
                                    <label htmlFor="icon-button-file">
                                      <Input
                                        sx={{ display: "none" }}
                                        inputProps={{ accept: "image/png, image/jpeg, image/jpg" }}
                                        id="icon-button-file"
                                        type="file"
                                        onChange={handleUploadProfileImage}
                                        onClick={(event)=> {
                                          event.target.value = null
                                        }}
                                      />
                                      <IconButton
                                        sx={{ p: 0 }}
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                      >
                                        <PhotoCamera
                                          fontSize="small"
                                          sx={{ color: "var(--clr-blue-primary)" }}
                                        />
                                      </IconButton>
                                    </label>
                                  </IconButton>
                        
                                </Box>
                              </Grid>
                              <Grid item xs={6.2}>
                                
                                <Box>
                                 
                                  <Typography
                                    variant="h5"
                                    component="h2"
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: 600,
                                      color: "var(--clr-gray-1)",
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {profile?.name}
                                  </Typography>
                                  <Box sx={{ display: "flex" }}>
                                        <Typography
                                          style={{
                                            fontSize: "14px",
                                            color: "var(--clr-gray-2)",
                                            fontWeight: 500,
                                            wordBreak: "break-word",
                                          }}
                                        >
                                          {profile?.workStatus === "Fresher"
                                            && profile?.workStatus}
                                          {profile?.experiencedType === "Fellow"
                                            && profile?.experiencedType}
                                          {profile?.experiencedType === "Resident"
                                            && profile?.experiencedType}
                                          {profile?.experiencedType === ""
                                            && profile?.specialty}
                                          {profile?.experiencedType === "Practising Physician/Surgeon"
                                            && profile?.specialty}
                                        </Typography>
                                    <IconButton sx={{ p: 0.5 }}>
                                      <Tooltip title="Edit basic details">
                                        <EditIcon
                                          onClick={() =>
                                            navigate("/edit-basic-details", {
                                              state: {
                                                profile: profile,
                                                userEmail: userEmail,
                                              },
                                            })
                                          }
                                          style={{
                                            color: "var(--clr-blue-primary)",
                                            fontSize: "14px",
                                          }}
                                        />
                                      </Tooltip>
                                    </IconButton>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={2.3}>
                                <Box sx={{ position: "relative", margin: "auto" }}>
                                  <CircularProgress
                                    variant="determinate"
                                    value={totalStrength}
                                    thickness={6}
                                    sx={{
                                      width: "60px !important",
                                      height: "60px !important",
                                      transform: "rotate(0deg) !important",
                                      color: "var(--clr-green-3)",
                                    }}
                                  />
                                  <Typography
                                    component="span"
                                    variant="h4"
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: 700,
                                      position: "absolute",
                                      top: 30,
                                      left: 30,
                                      color: "var(--clr-blue-footer)",
                                      transform: "translate(-50%, -50%)",
                                    }}
                                    className="strength-value"
                                  >
                                    {totalStrength}%
                                  </Typography>

                                  <Box sx={{ textAlign: "center" }}>
                                    <Typography
                                      style={{
                                        fontSize: 8,
                                        lineHeight: "8px",
                                        fontWeight: 600,
                                        color: "var(--clr-gray-3)",
                                        mt: "10px",
                                      }}
                                    >
                                      Profile Strength
                                    </Typography>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>

                            <Grid
                              container
                              sx={{
                                marginTop: "1.5rem",
                                color: "var(--clr-gray-1)",
                                fontSize: "1rem",
                              }}
                            >
                              <Grid item xs={12} md={6}>
                                <UserInfoBox>
                                  <FmdGoodOutlinedIcon
                                    sx={{ color: "var(--clr-white-icon)" }}
                                  />
                                  {profile?.cityWithState}
                                </UserInfoBox>
                                <UserInfoBox>
                                  <WorkOutlineOutlinedIcon
                                    sx={{ color: "var(--clr-white-icon)" }}
                                  />

                                  {profile?.exp === 0 && profile?.expMonths === 0 ? (
                                    <>Fresher</>
                                  ) : (
                                    <>
                                      {((profile?.exp === 0) && (profile?.expMonths === 0)) ? (
                                          <>
                                            Fresher
                                          </>
                                        ) : (
                                          <>
                                            {(profile?.exp === 0) ? (
                                              <>
                                                {profile?.expMonths} {(profile?.expMonths === 0 || profile?.expMonths === 1) ? "Month" : "Months"}
                                              </>
                                            ) : (
                                              <>
                                                {profile?.expMonths === 0 ? (
                                                  <>{profile?.exp} {(profile?.exp === 0 || profile?.exp === 1) ? "Year" : "Years"}</>
                                                ) : (
                                                  <>{profile?.exp} {(profile?.exp === 0 || profile?.exp === 1) ? "Year" : "Years"} {profile?.expMonths} {(profile?.expMonths === 0 || profile?.expMonths === 1) ? "Month" : "Months"}</>
                                                )} 
                                              </>
                                            )} 
                                          </>
                                       )}
                                    </>
                                  )}
                                </UserInfoBox>
                                <UserInfoBox>
                                  <AccountBalanceWalletOutlinedIcon
                                    sx={{ color: "var(--clr-white-icon)" }}
                                  />
                                  {profile?.salary === 0 &&
                                    profile?.salaryThousands === 0 ? (
                                    <>Fresher</>
                                  ) : (
                                    <>
                                      {profile?.salary === 0 ? (
                                        <>
                                          {profile?.salaryThousands}{" "}
                                          {profile?.salaryThousands === 0 ||
                                            profile?.salaryThousands === 1
                                            ? "Thousand"
                                            : "Thousand"}
                                        </>
                                      ) : ( 
                                        <>
                                          {profile?.salaryThousands === 0 ? (
                                            <>
                                              {profile?.salary}{" "}{profile?.salary === 0 || profile?.salary === 1? "Lakh" : "Lakhs"}
                                            </>
                                            ) : (
                                            <>
                                              {profile?.salary}{" "}{profile?.salary === 0 || profile?.salary === 1 ? "Lakh" : "Lakhs"}{" "}{profile?.salaryThousands}{" "}{profile?.salaryThousands === 0 || profile?.salaryThousands === 1 ? "Thousand": "Thousand"}
                                            </>
                                          )} 
                                        </> 
                                      )}
                                    </>
                                  )}
                                </UserInfoBox>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <UserInfoBox>
                                  <PhoneIphoneIcon
                                    sx={{ color: "var(--clr-white-icon)" }}
                                  />
                                  +91{profile?.phone}
                                  {profile?.phoneVerified ? (
                                    <img src={greenTick} alt="greenTick" />
                                  ) : (
                                    <span
                                      onClick={handleVerifyPhoneNumber}
                                      style={{
                                        cursor: "pointer",
                                        color: "red",
                                        textDecoration: "underline",
                                      }}
                                    >
                                      verify
                                    </span>
                                  )}
                                  <Modal
                                    open={openAddModal}
                                    onClose={hanldeCloseAddModal}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Box sx={styleResponsive}>
                                      <Box
                                        sx={{ display: "flex", flexDirection: "column" }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              color: "var(--clr-blue-footer)",
                                              fontWeight: "600",
                                              fontSize: "18px",
                                            }}
                                            variant="h6"
                                            component="h2"
                                          >
                                            Verify Phone Number
                                          </Typography>
                                          <CancelIcon
                                            style={{ color: "var(--clr-white-icon)" }}
                                            onClick={hanldeCloseAddModal}
                                          />
                                        </Box>
                                        <Typography
                                          variant="body2"
                                          sx={{ mt: 2, py: 2, color: "var(--clr-gray-2)" }}
                                        >
                                          Please enter One Time Code sent to +91{profile?.phone}
                                        </Typography>
                                        <Box sx={{ width: "100%" }}>
                                          <TextField
                                            disableUnderline
                                            rows={1}
                                            fullWidth
                                            name="otpCode"
                                            type="text"
                                            placeholder="Enter OTP"
                                            // error={otpCode === "" && errInput}
                                            value={otpCode}
                                            onChange={(e) => setOtpCode(e.target.value)}
                                            sx={{
                                              py: 1,
                                              borderRadius: 1,
                                              display: "block !important",
                                            }}
                                            InputProps={{
                                              sx: {
                                                ".MuiOutlinedInput-input": { 
                                                  padding: '10.5px 14px',
                                                },
                                                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                                  border: "1px solid var(--clr-blue-light)",
                                                },
                                                "&:hover": {
                                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                                    border: "1px solid var(--clr-blue-primary)",
                                                  },
                                                },
                                              }
                                            }}
                                            size="small"
                                          />
                                          <Box
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              mr: 1,
                                            }}
                                          >
                                            <Typography
                                              sx={{
                                                color: "var(--clr-blue-footer)",
                                                fontWeight: 600,
                                                textAlign: "right",
                                                order: 2,
                                              }}
                                              variant="subtitle2"
                                            >
                                              {seconds !== 0 && (
                                                <Typography
                                                  variant="body2"
                                                  sx={{
                                                    color: "gray",
                                                    fontWeight: 500,
                                                    textAlign: "right",
                                                    py: 1,
                                                  }}
                                                >
                                                  Resend code in 0{seconds / 60 | 0}:{seconds % 60}s{" "}
                                                </Typography>
                                              )}
                                              {seconds === 0 && (
                                                <Button
                                                  onClick={hanldeResetCountdown}
                                                  sx={{
                                                    color: "var(--clr-blue-footer)",
                                                    fontWeight: 600,
                                                    textAlign: "right",
                                                  }}
                                                >
                                                  Resend code
                                                </Button>
                                              )}
                                            </Typography>
                                            <Typography sx={{ order: 1 }}>
                                              {error !== "" && (
                                                <FormHelperText
                                                  sx={{ color: "red", mt: 0 }}
                                                >
                                                  {error}
                                                </FormHelperText>
                                              )}
                                            </Typography>
                                          </Box>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "right",
                                              gap: 2,
                                              py: 1,
                                            }}
                                          >
                                            <Button
                                              variant="outlined"
                                              onClick={hanldeCloseAddModal}
                                              sx={{
                                                borderRadius: 16,
                                                borderWidth: "2px !important",
                                              }}
                                            >
                                              Cancel
                                            </Button>
                                            <Button
                                              variant="contained"
                                              className="save-btn"
                                              onClick={(event) => handleVerifyOTP(event, "onClick")}
                                              sx={{ borderRadius: 16 }}
                                            >
                                              Confirm
                                            </Button>
                                          </Box>
                                          <Typography
                                            variant="body2"
                                            sx={{ pt: 2, color: "var(--clr-gray-3)" }}
                                          >
                                            Help us to verify your contacts for relevant
                                            jobs by adding more details.
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Modal>
                                  {/* <Modal
                      disableEnforceFocus={false}
                      hideBackdrop
                      open={openAddModal}
                      onClose={hanldeCloseAddModal}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Box sx={{ display: "flex", flexDirection: "column", }}>
                          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography style={{ fontWeight: "bold", fontSize: "25px", marginBottom: "-12px", color: "gray", color: "-moz-initial" }}>
                              Verify Phone Number
                            </Typography>
                            <Typography>
                              <CancelIcon style={{ color: "var(--clr-white-icon)" }} onClick={hanldeCloseAddModal} />
                            </Typography>
                          </Box>
                          <Grid item direction={"column"} xs={12} md={12} sx={{ mt: 2 }}>
                            <FormControl fullWidth>
                              <TextField
                                variant="outlined"
                                rows={1}
                                fullWidth
                                name="otpCode"
                                type="text"
                                placeholder="Enter OTP"
                                inputProps={{ maxLength: 6 }}
                                // error={otpCode === "" && errInput}
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                sx={{ backgroundColor: "#ffffff", py: 1, }}
                              />
                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography
                                  sx={{
                                    color: "var(--clr-blue-footer)",
                                    fontWeight: 600, textAlign: "right", order: 2
                                  }}
                                  variant="subtitle2"

                                >
                                  {seconds !== 0 && <Typography sx={{
                                    color: "gray",
                                    fontWeight: 500, textAlign: "right"
                                  }}>Resend code in {seconds}s </Typography>}
                                  {seconds === 0 && <Button onClick={hanldeResetCountdown} sx={{
                                    color: "var(--clr-blue-footer)",
                                    fontWeight: 600, textAlign: "right"
                                  }}>Resend code</Button>}
                                </Typography>
                                <Typography sx={{ order: 1 }}>
                                  {error !== "" && (
                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                      {error}
                                    </FormHelperText>
                                  )}
                                </Typography>

                              </Box>

                            </FormControl>
                          </Grid>
                          <Grid
                            item
                            direction={"column"}
                            xs={12}
                            md={12}
                            justifyContent="flex-end"
                            sx={{ display: "grid" }}
                          >
                            <CardContent>
                              <CardActions className="resume-actions">
                                <Button
                                  variant="contained"
                                  className="save-btn"
                                  onClick={handleVerifyOTP}
                                  sx={{ mr: -2.8 }}
                                >
                                  Confirm phone number
                                </Button>
                              </CardActions>
                            </CardContent>
                          </Grid>
                        </Box>
                      </Box>
                    </Modal> */}
                                  <Snackbar
                                    open={openSnackbar}
                                    autoHideDuration={6000}
                                    onClose={handleCloseSnackbar}
                                  >
                                    <Alert
                                      onClose={handleCloseSnackbar}
                                      severity="success"
                                      sx={{ width: "100%" }}
                                    >
                                      {firstOtpSentMessage}
                                      {phoneVerified && <>{phoneVerified}</>}
                                      {resendCode}
                                    </Alert>
                                  </Snackbar>
                                  {/* {console.log(otpError)} */}
                                  {otpError && (
                                    <Snackbar
                                      open={openSnackbar}
                                      autoHideDuration={6000}
                                      onClose={handleCloseSnackbar}
                                    >
                                      <Alert
                                        onClose={handleCloseSnackbar}
                                        severity="error"
                                        sx={{ width: "100%" }}
                                      >
                                        {otpError}
                                      </Alert>
                                    </Snackbar>
                                  )}
                                </UserInfoBox>
                                <UserInfoBox>
                                  <EmailOutlinedIcon
                                    sx={{ color: "var(--clr-white-icon)" }}
                                  />
                                  {userEmail} <img src={greenTick} alt="greenTick" />
                                </UserInfoBox>
                                <UserInfoBox>
                                  <AssignmentIndOutlinedIcon
                                    sx={{ color: "var(--clr-white-icon)" }}
                                  />
                                  {profile?.activelySearching === true ? (
                                    <span style={{ color: "green" }}>
                                      Actively Searching Job
                                    </span>
                                  ) : (
                                    <span style={{ color: "red" }}>
                                      Not Actively Searching Job
                                    </span>
                                  )}
                                  {/* {profile?.activelySearching ? "Actively Searching Job" : "Not Actively Searching Job"} */}
                                </UserInfoBox>
                              </Grid>
                              <Button
                                sx={{ borderRadius: 16, fontSize: "0.8rem", mt: 2 }}
                                variant="outlined"
                                color="secondary"
                                onClick={() => navigate("/profile", { state: "profileHome" })}
                              >
                                Update Profile
                              </Button>
                            </Grid>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card
                          sx={{
                            margin: "auto",
                            borderRadius: 2,
                            boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                          }}
                        >
                          <CardContent
                            sx={{
                              display: "flex",
                              gap: "1.5rem",
                              flexDirection: `${mobileView ? "column" : "row"}`,
                            }}
                          >
                            <Box sx={{ position: "relative", mx: "auto" }}>
                              {/* <Avatar
                                    sx={{
                                      width: "60px",
                                      height: "60px",
                                      margin: `${tabletView ? "1rem auto" : "0 1rem"}`,
                                      mt: 1,
                                    }}
                                    src={base64Image}
                                  /> */}
                              {
                                isLoading ? (
                                  <Button
                                    sx={{
                                      marginTop: 3,
                                      marginBottom: "1rem",
                                      px: 5,
                                      py: 1.2,
                                      borderRadius: 16,
                                    }}
                                  >
                                    <CircularProgress size="2rem" thickness={6} />
                                  </Button>
                                ) : (
                                  <div>
                                  <Avatar
                                    sx={{
                                      width: "60px",
                                      height: "60px",
                                      margin: `${tabletView ? "1rem auto" : "0 1rem"}`,
                                      mt: 1,
                                      cursor: 'pointer',
                                    }}
                                    className={classShow === "" ?  'nono' : "docPP"}
                                    src={base64Image}
                                  /><div onClick={() => setDeleteModal(true)} className="doctorProfilePicIcon" ><DeleteIcon sx={{position: "absolute", right: 30, bottom: 175, color: "red", height: 30, width: 30 }} /></div>
                                  </div>
                                )
                              }
                              <IconButton
                                sx={{
                                  position: "absolute",
                                  top: 63,
                                  right: 3,
                                  transform: "translate(-50%, -50%)",
                                  bgcolor: "#FFFFFF",
                                  p: 0.15,
                                  m: 0,
                                  fontSize: "0.5rem"
                                }}
                              >
                                <label htmlFor="icon-button-file">
                                  <Input  sx={{ display: "none" }}    inputProps={{ accept: "image/png, image/jpeg, image/jpg" }} id="icon-button-file" type="file" onChange={handleUploadProfileImage}  onClick={(event)=> {
                                    event.target.value = null
                                  }}/>
                                  <IconButton sx={{ p: 0 }} color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera fontSize="small" sx={{ color: "var(--clr-blue-primary)" }} />
                                  </IconButton>
                                </label>
                                {/* <CameraEnhanceIcon fontSize="small" sx={{ color: "var(--clr-blue-primary)" }}>
                                      <input type="file" hidden onChange={handleUploadProfileImage}
                                        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf" />
                                    </CameraEnhanceIcon> */}

                                                        {/* <CameraEnhanceIcon fontSize="small" sx={{ color: "var(--clr-blue-primary)" }}>
                                      <Button
                                        variant=""
                                        component="label"
                                        sx={{ bgColor: "black" }}
                                      >
                                        <input type="file" hidden onChange={handleUploadProfileImage}
                                          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf" />
                                      </Button>
                                    </CameraEnhanceIcon> */}
                              </IconButton>
                                    <Modal
                                      open={deleteModal}
                                      onClose={() => setDeleteModal(false)}
                                      aria-labelledby="modal-modal-title"
                                      aria-describedby="modal-modal-description"
                                    >
                                      <Box sx={style}>
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              mb: 2
                                            }}
                                          >
                                            <Typography
                                              sx={{
                                                color: "var(--clr-blue-footer)",
                                                fontWeight: "600",
                                                fontSize: "18px",
                                              }}
                                              variant="h6"
                                              component="h2"
                                            >
                                              Delete Profile Picture
                                            </Typography>
                                            <CancelIcon
                                              style={{ color: "var(--clr-white-icon)" }}
                                              onClick={() => setDeleteModal(false)}
                                            />
                                          </Box>
                                          <Box sx={{ width: "85%" }}>
                                            <Typography
                                              sx={{
                                                color: "#4f4f4f",
                                                fontWeight: 500,
                                                fontSize: "16px",
                                              }}
                                            >
                                              Are you sure want to delete profile picture?
                                            </Typography>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                justifyContent: "right",
                                                gap: 2,
                                                py: 1,
                                              }}
                                            >
                                              <Button
                                                variant="outlined"
                                                onClick={() => setDeleteModal(false)}
                                                sx={{
                                                  borderRadius: 16,
                                                  borderWidth: "2px !important",
                                                }}
                                              >
                                                No
                                              </Button>
                                              <Button
                                                variant="contained"
                                                className="save-btn"
                                                onClick={DeleteProfilePic}
                                                sx={{ borderRadius: 16 }}
                                              >
                                                Yes
                                              </Button>
                                            </Box>
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Modal>
                            </Box>
                            {
                              imgUploadError && <Snackbar open={openImg} autoHideDuration={6000} onClose={handleCloseImg}>
                                <Alert onClose={handleCloseImg} severity="error" sx={{ width: '100%' }}>
                                  {imgUploadError}
                                </Alert>
                              </Snackbar>}
                            <Grid container>
                              <Grid item xs={12} md={10}>
                                <Box
                                  sx={{ textAlign: `${mobileView ? "center" : "left"}` }}
                                >
                                  <Typography
                                    variant="h5"
                                    component="h2"
                                    sx={{ fontWeight: 600, color: "var(--clr-gray-1)" }}
                                  >
                                    {profile?.name}
                                  </Typography>
                                  <Box
                                    sx={{ display: "flex", gap: 10, alignItems: "center" }}
                                  >
                                    <Typography
                                      variant="body1"
                                      component="p"
                                      sx={{ color: "var(--clr-gray-2)", fontWeight: 500 }}
                                    >
                                    {profile?.workStatus === "Fresher"
                                  &&  profile?.workStatus }

                                  {profile?.experiencedType === "Fellow"
                                    && profile?.experiencedType}
                                    
                                  {profile?.experiencedType === "Resident"
                                    && profile?.experiencedType}

                                    {profile?.experiencedType === ""
                                    && profile?.specialty}

                                    {profile?.experiencedType === "Practising Physician/Surgeon"
                                    && profile?.specialty}

                                    </Typography>
                                    <IconButton sx={{ p: 0.5 }}>
                                      <Tooltip title="Edit basic details">
                                        <EditIcon
                                          onClick={() => navigate("/edit-basic-details", { state: { profile: profile, userEmail: userEmail } })}
                                          fontSize="small"
                                          sx={{ color: "var(--clr-blue-primary)" }}
                                        />
                                      </Tooltip>
                                    </IconButton>
                                  </Box>
                                </Box>
                                <Grid
                                  container
                                  sx={{
                                    marginTop: "1.5rem",
                                    color: "var(--clr-gray-1)",
                                    fontSize: "1rem",
                                  }}
                                >
                                  <Grid item xs={12} md={6}>
                                    <UserInfoBox>
                                      <FmdGoodOutlinedIcon
                                        sx={{ color: "var(--clr-white-icon)" }}
                                      />
                                      {profile?.cityWithState}
                                    </UserInfoBox>
                                    <UserInfoBox>
                                      <WorkOutlineOutlinedIcon
                                        sx={{ color: "var(--clr-white-icon)" }}
                                      />
                                      {((profile?.exp === 0) && (profile?.expMonths === 0)) ? (
                                          <>
                                            Fresher
                                          </>
                                        ) : (
                                          <>
                                            {(profile?.exp === 0) ? (
                                              <>
                                                {profile?.expMonths} {(profile?.expMonths === 0 || profile?.expMonths === 1) ? "Month" : "Months"}
                                              </>
                                            ) : (
                                              <>
                                                {profile?.expMonths === 0 ? (
                                                <>{profile?.exp} {(profile?.exp === 0 || profile?.exp === 1) ? "Year" : "Years"}</>
                                                ) : (
                                                  <>{profile?.exp} {(profile?.exp === 0 || profile?.exp === 1) ? "Year" : "Years"} {profile?.expMonths} {(profile?.expMonths === 0 || profile?.expMonths === 1) ? "Month" : "Months"}</>
                                                )} 
                                              </>
                                            )} 
                                          </>
                                       )}
                                    </UserInfoBox>
                                    <UserInfoBox>
                                      <AccountBalanceWalletOutlinedIcon
                                        sx={{ color: "var(--clr-white-icon)" }}
                                      />
                                      {
                                        ((profile?.salary === 0) && (profile?.salaryThousands === 0)) ? (
                                          <>
                                            Fresher
                                          </>
                                        ) : (
                                          <>
                                            {(profile?.salary === 0) ? (
                                              <>
                                                {profile?.salaryThousands} {(profile?.salaryThousands === 0 || profile?.salaryThousands === 1) ? "Thousand" : "Thousand"}
                                              </>
                                            ) : (
                                              <>
                                                {profile?.salaryThousands === 0 ? (
                                                  <>
                                                    {profile?.salary}{" "}{profile?.salary === 0 || profile?.salary === 1? "Lakh" : "Lakhs"}
                                                  </>
                                                  ) : (
                                                  <>
                                                    {profile?.salary}{" "}{profile?.salary === 0 || profile?.salary === 1 ? "Lakh" : "Lakhs"}{" "}{profile?.salaryThousands}{" "}{profile?.salaryThousands === 0 || profile?.salaryThousands === 1 ? "Thousand": "Thousand"}
                                                  </>
                                                )} 
                                              </> 
                                            )
                                            }
                                          </>
                                        )
                                      }
                                    </UserInfoBox>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <UserInfoBox>
                                      <PhoneIphoneIcon
                                        sx={{ color: "var(--clr-white-icon)" }}
                                      />
                                      +91{profile?.phone}
                                      {profile?.phoneVerified ? (
                                        <img src={greenTick} alt="greenTick" />
                                      ) : (
                                        <span onClick={handleVerifyPhoneNumber} style={{ cursor: "pointer", color: "red", textDecoration: "underline" }}>verify</span>
                                      )}
                                      <Modal
                                        open={openAddModal}
                                        onClose={hanldeCloseAddModal}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                      >
                                        <Box sx={style}>
                                          <Box sx={{ display: "flex", flexDirection: "column", }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                              <Typography sx={{ color: "var(--clr-blue-footer)", fontWeight: "600", fontSize: "18px" }} variant="h6" component="h2">
                                                Verify Phone Number
                                              </Typography>
                                              <CancelIcon style={{ color: "var(--clr-white-icon)" }} onClick={hanldeCloseAddModal} />
                                            </Box>
                                            <Typography variant="body2" sx={{ mt: 2, py: 2, color: "var(--clr-gray-2)" }}>Please enter One Time Code sent to +91{profile?.phone}</Typography>
                                            <Box sx={{ width: "100%" }}>
                                              <TextField
                                                disableUnderline
                                                rows={1}
                                                fullWidth
                                                name="otpCode"
                                                type="text"
                                                placeholder="Enter OTP"
                                                // error={otpCode === "" && errInput}
                                                value={otpCode}
                                                onChange={(e) => setOtpCode(e.target.value)}
                                                onKeyDown={handleVerifyOTP}
                                                sx={{ py: 1, borderRadius: 1, display: "block !important" }}
                                                InputProps={{
                                                  sx: {
                                                    ".MuiOutlinedInput-input": { 
                                                      padding: '10.5px 14px',
                                                    },
                                                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                                      border: "1px solid var(--clr-blue-light)",
                                                    },
                                                    "&:hover": {
                                                      ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                                        border: "1px solid var(--clr-blue-primary)",
                                                      },
                                                    },
                                                  }
                                                }}
                                                size="small"
                                              />
                                              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mr: 1 }}>
                                                <Typography
                                                  sx={{
                                                    color: "var(--clr-blue-footer)",
                                                    fontWeight: 600, textAlign: "right", order: 2
                                                  }}
                                                  variant="subtitle2"
                                                >
                                                  {seconds !== 0 && <Typography variant="body2" sx={{
                                                    color: "gray",
                                                    fontWeight: 500, textAlign: "right", py: 1
                                                  }}>Resend code in 0{seconds / 60 | 0}:{seconds % 60}s </Typography>}
                                                  {seconds === 0 && <Button onClick={hanldeResetCountdown} sx={{
                                                    color: "var(--clr-blue-footer)",
                                                    fontWeight: 600, textAlign: "right"
                                                  }}>Resend code</Button>}
                                                </Typography>
                                                <Typography sx={{ order: 1 }}>
                                                  {error !== "" && (
                                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                      {error}
                                                    </FormHelperText>
                                                  )}
                                                </Typography>
                                              </Box>
                                              <Box sx={{ display: "flex", justifyContent: "right", gap: 2, py: 1 }}>
                                                <Button
                                                  variant="outlined"
                                                  onClick={hanldeCloseAddModal}
                                                  sx={{ borderRadius: 16, borderWidth: "2px !important" }}
                                                >
                                                  Cancel
                                                </Button>
                                                <Button
                                                  variant="contained"
                                                  className="save-btn"
                                                  onClick={(event) => handleVerifyOTP(event, "onClick")}
                                                  sx={{ borderRadius: 16 }}
                                                >
                                                  Confirm
                                                </Button>
                                              </Box>
                                              <Typography variant="body2" sx={{ pt: 2, color: "var(--clr-gray-3)" }}>Help us to verify your contacts for relevant jobs by adding more details.</Typography>
                                            </Box>
                                          </Box>
                                        </Box>
                                      </Modal>
                                      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                                        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                                          {firstOtpSentMessage}
                                          {
                                            phoneVerified && <>{phoneVerified}</>
                                          }
                                          {
                                            resendCode
                                          }
                                        </Alert>
                                      </Snackbar>
                                      {
                                        otpError &&
                                        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                                          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                                            {otpError}
                                          </Alert>
                                        </Snackbar>}
                                    </UserInfoBox>
                                    <UserInfoBox>
                                      <EmailOutlinedIcon
                                        sx={{ color: "var(--clr-white-icon)" }}
                                      />
                                      {userEmail}  <img src={greenTick} alt="greenTick" />
                                    </UserInfoBox>
                                    <UserInfoBox>
                                      <AssignmentIndOutlinedIcon
                                        sx={{ color: "var(--clr-white-icon)" }}
                                      />
                                      {
                                        profile?.activelySearching === true ? (
                                          <span style={{ color: "green" }}>Actively Searching Job</span>
                                        ) : (
                                          <span style={{ color: "red" }}>Not Actively Searching Job</span>
                                        )
                                      }
                                      {/*  {profile?.activelySearching
                          ? "Actively searching"
                          : (<span style={{ color: "#EB5757" }}>Not Actively searching</span>)} */}
                                    </UserInfoBox>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={12} md={2}>
                                <Box sx={{ position: "relative", margin: "auto" }}>
                                  <CircularProgress
                                    variant="determinate"
                                    value={totalStrength}
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
                                      top: 60,
                                      left: 60,
                                      transform: "translate(-50%, -50%)",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                    className="strength-value"
                                  >
                                    {totalStrength}%
                                  </Typography>

                                  <Box sx={{ textAlign: "center" }}>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: 13,
                                        lineHeight: "16px",
                                        fontWeight: 600,
                                        color: "var(--clr-gray-3)",
                                        mt: 2,
                                      }}
                                    >
                                      Profile Strength
                                    </Typography>
                                    <Button
                                      sx={{ borderRadius: 16, fontSize: "0.8rem", mt: 2 }}
                                      variant="outlined"
                                      color="secondary"
                                      onClick={() => navigate("/profile", { state: { from: "profileHome" } })}
                                    >
                                      Update Profile
                                    </Button>
                                  </Box>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      )}
                    </Box>
                    <Box maxWidth="md" sx={{ mx: "auto", mt: 4, px: matches ? "16px" : "" }}>
                      <Typography
                        variant="h5"
                        gutterBottom
                        component="div"
                        style={{
                          fontSize: matches ? "18px" : "24px",
                          fontWeight: 700,
                          color: "var(--clr-blue-footer)",
                          paddingLeft: "8px"
                        }}
                      >
                        Recommended Jobs
                      </Typography>
                      <Grid container spacing={5}>
                        {topFourJobs?.length > 0 ? topFourJobs?.map((searchResult) => (
                          <Grid key={searchResult?.vacancyID} item xs={12} md={12}>
                            <Box
                              key={searchResult?.id}
                              sx={{
                                bgcolor: "var(--clr-white)",
                                borderRadius: 1,
                                p: matches ? 1.9 : 3,
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                                border: matches ? "1px solid #E4EEF5" : ""
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                onClick={() => handleSingleJob(searchResult)}
                                style={{
                                  color: "#333333",
                                  fontWeight: 600,
                                  fontSize: "18px",
                                  margin: 0,
                                  cursor: "pointer",
                                }}
                              >
                                {searchResult?.jobTitle}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                component="div"
                                gutterBottom
                                style={{
                                  // var(--clr-gray-3)
                                  color: "#333333",
                                  fontWeight: "600",
                                  fontSize: "14px"
                                }}
                              >
                                {searchResult?.name}
                              </Typography>
                              <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                <TextSnippetOutlinedIcon
                                    fontSize="small"
                                    sx={{ color: "var(--clr-white-icon)" }}
                                  />
                                <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  style={{
                                    // var(--clr-gray-3)
                                    color: "var(--clr-gray-3)",
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    lineHeight: '16px',
                                    marginLeft: '10px'
                                  }}
                                >
                                  {searchResult?.description}
                                </Typography>
                              </Box>
                              
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 3,
                                }}
                              >
                                <Typography
                                sx={{
                                  color: "#333333",
                                  fontWeight: "600",
                                  fontSize: "14px"
                                }}
                              >
                                Key Skills
                              </Typography>
                                {/* <ChromeReaderModeOutlinedIcon
                                  fontSize="small"
                                  sx={{ color: "var(--clr-white-icon)" }}
                                /> */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 2,
                                  }}
                                >
                                  {/* {searchResult.skills.map((skill) => ( */}
                                  <Typography
                                    variant="subtitle2"
                                    component="div"
                                    style={{
                                      lineHeight: "16px",
                                      color: "#333333",
                                      fontWeight: "600",
                                      fontSize: '12px'
                                    }}
                                  >
                                     {searchResult?.primarySpecialization?.map((ps, index) => (
                                          <> {ps?.specialization},</>
                                        ))}
                                    {/* {searchResult?.primarySpecialization} */}
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    component="div"
                                    style={{
                                      lineHeight: "16px",
                                      color: "#333333",
                                      fontWeight: "600",
                                      fontSize: '12px'
                                    }}
                                  >
                                    {searchResult?.secondarySpecialization?.map((ss, index) => (
                                        <> {ss?.specialization}{searchResult?.secondarySpecialization?.length - 1 === index ? "." : ", "}</>
                                      ))}
                                    {/* {searchResult?.secondarySpecialization} */}
                                  </Typography>
                                </Box>
                              </Box>

                            <Box sx={{display:  'flex', flexDirection: matches ? 'column' : "row", alignItems: 'flex-start',  gap: matches ? 2 : 0}}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                  }}
                                >
                                  <FmdGoodOutlinedIcon
                                    fontSize="small"
                                    sx={{ color: "var(--clr-white-icon)" }}
                                  />
                                  <Typography
                                    component="div"
                                    sx={{ color: "#4F4F4F" }}
                                    variant="body1"
                                  >
                                    {searchResult?.location}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    ml: matches ? 0 : 4
                                  }}
                                >
                                  <WorkOutlineOutlinedIcon
                                    fontSize="small"
                                    sx={{ color: "var(--clr-white-icon)" }}
                                  />
                                  <Typography
                                    component="div"
                                    sx={{ color: "#4F4F4F" }}
                                    variant="body1"
                                  >
                                    {searchResult?.experience}{" "}
                                    {searchResult.experience === 1 ? "Year" : "Years"}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    ml: matches ? 0 : 4
                                  }}
                                >
                                  <AccountBalanceWalletOutlinedIcon
                                    fontSize="small"
                                    sx={{ color: "var(--clr-white-icon)" }}
                                  />
                                  <Typography
                                    component="div"
                                    sx={{ color: "#4F4F4F" }}
                                    variant="body1"
                                  >
                                    ₹
                                    {searchResult?.maximumSalary >= 100000 ? <>{(
                                    Math.round(
                                      (searchResult?.maximumSalary / 100000) * 100
                                    ) / 100
                                  ).toFixed(2)} L</>  : <>{searchResult?.maximumSalary >= 1000 ?  <>{(
                                    Math.round(
                                      (searchResult?.maximumSalary / 1000) * 100
                                    ) / 100
                                  ).toFixed(2)}{" "}L</> : <>{searchResult?.maximumSalary}{" "}L</>}</>}{" "}
                                  </Typography>
                                </Box>
                            </Box>
                                    
                              <Box sx={{display: 'flex', flexDirection: matches ? 'column' : "row", justifyContent: matches ? "" : "space-between", alignItems: 'flex-start', gap: matches ? 1.5 : 0}}>
                                <Box
                                sx={{
                                  width: "max-content",
                                  display: "flex",
                                  alignItems: "center",
                                  bgcolor: "var(--clr-white-bg)",
                                  gap: 1,
                                  px: 1.5,
                                  py: 0.3,
                                  borderRadius: 16,
                                  mt: 1,
                                }}
                              >
                                <HistoryOutlinedIcon
                                  fontSize="small"
                                  sx={{ color: "var(--clr-blue-footer)" }}
                                />
                                  <Typography
                                    component="div"
                                    style={{
                                      color: "var(--clr-blue-footer)",
                                      fontSize: "12px",
                                      fontWeight: 600,
                                    }}
                                    variant="body2"
                                  >
                                    {searchResult?.date_diff_indays().month ? (
                                      <>
                                        {searchResult.date_diff_indays().month}{" "}
                                        {searchResult.date_diff_indays().month === 1
                                          ? "month"
                                          : "months"}{" "}
                                        {searchResult.date_diff_indays().day ? (
                                          <>
                                            {searchResult.date_diff_indays().day}{" "}
                                            {searchResult.date_diff_indays().days === 0 ||
                                              searchResult.date_diff_indays().days === 1
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
                                        {searchResult?.date_diff_indays().days}{" "}
                                        {searchResult.date_diff_indays().days === 0 ||
                                          searchResult.date_diff_indays().days === 1
                                          ? "day"
                                          : "days"}{" "}
                                        {"ago"}
                                      </>
                                    )}
                                    {/* {searchResult.postedOn} */}
                                  </Typography> 
                                </Box>
                                  {(((savedJob?.find(idx => idx?.vacancyID === searchResult?.vacancyID)?.vacancyID) === searchResult?.vacancyID)) && (
                                <Button
                                  onClick={() => handleDeleteSavedJobs(searchResult?.vacancyID)}
                                  sx={{ width: "max-content", backgroundColor: "var(--clr-blue-light) !important", padding: "3px 12px !important", borderRadius: 16, "&:hover": { backgroundColor: "var(--clr-blue-light) !important" } }}>
                                  <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                    <StarIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Saved</span>
                                  </Typography>
                                </Button>
                                  )}
                                  {(((savedJob?.find(idx => idx?.vacancyID === searchResult?.vacancyID)?.vacancyID) !== searchResult?.vacancyID)) && (
                                    <Button
                                      onClick={() => handleSaveJob(searchResult?.vacancyID)}
                                      // diababled
                                      sx={{ width: "max-content", border: "1px solid var(--clr-blue-footer) !important", gap: 1, padding: "3px 12px !important", borderRadius: 16, color: "#395987 !important", fontWeight: "600", py: 1 }}>
                                      <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                        <StarBorderIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Save Job</span>
                                      </Typography>
                                    </Button>
                                  )}
                              </Box>
                            </Box>
                          </Grid>
                        )) : (<Grid item xs={12}>
                          <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <img style={{width:matches ? "80%" : "423px", height:matches ? "80%" : "423px"}} src={NoMessagesEmptynbox}/>
                          </Box>
                          <Box sx={{pt: 4 , pb: 5.25}}>
                          <Typography sx={{textAlign: "center", fontSize: matches ? "18px" : "24px", fontWeight: "600", color: "#395987"}}>No recommended jobs found.</Typography>
                          <Typography sx={{textAlign: "center", fontSize: matches ? "14px" :  "16px", fontWeight: "400"}}>Please, update profile to receive recommendation.</Typography>
                          </Box>
                          <Box sx={{textAlign: "center", mb: 4}}>
                          <Button
                            sx={{ borderRadius: 16, fontSize: "14px", fontWeight: "600", py: matches ? 0.7 : 0.7, px: matches ?  4 : 4}}
                            variant="contained"
                            onClick={() => navigate("/profile", { state: { from: "profileHome" } })}
                          >
                            Update Profile
                          </Button>
                          </Box>
                          {/* <Box sx={{ display: "flex", justifyContent: "center", px: 5, py: 8 }}> 
                            <Typography variant="h6" sx={{ color: "var(--clr-gray-3)", fontWeight: "400" }}>No recommended jobs found.<br /> Please, update profile to receive recommendation.</Typography>
                          </Box> */}
                        </Grid>)
                        }
                      </Grid>
                    </Box>
                    <Box maxWidth="md" sx={{ mx: "auto", my: 5 }}>
                      <Typography
                        variant="p"
                        component="p"
                        sx={{
                          fontSize: 13,
                          lineHeight: "16px",
                          fontWeight: 600,
                          color: "var(--clr-gray-3)",
                          marginTop: "0.5rem",
                          textAlign: matches ? "center" : "center",
                        }}
                      >
                        {
                          topFourJobs?.length > 0 && (
                            <Button
                              sx={{ borderRadius: 16, py: 1.2, px: 3, fontWeight: 600 }}
                              variant="outlined"
                              color="primary"
                              component={Link}
                              to="/recommended-jobs"
                            >
                              View All
                            </Button>
                          )
                        }

                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Navigate to="/signup2" />
                  </>
                )}
              </>
            ) : (
              <>
                <Navigate to="/login" />
              </>
            )
          }

        </>
      )
    }
  </Box>
  );
};

export default ProfileHome;
