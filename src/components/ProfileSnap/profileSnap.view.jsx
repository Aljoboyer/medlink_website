import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  TextField,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
  gqlquery,
  QUERY_LISTPROFILES,
  QUERY_GETEDUCATIONLIST,
  QUERY_GETEXPERIENCE,
  QUERY_GETPERSONALDETAILS,
  QUERY_GETCAREERPROFILEPERCENTAGE,
  QUERY_GETRESUME,
  QUERY_GETRESUMEHEADLINE,
  QUERY_LANGUAGES_KNOWN,
  QUERY_GETEDUCATION,
  QUERY_GETEXPERIENCELIST,
} from "../../api";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { decode, encode } from "base-64";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import greenTick from "../../assets/green_tick.svg";
import { typeOf } from "react-read-more-read-less";
import useAuth from "../../hooks/useAuth";
import DeleteIcon from '@mui/icons-material/Delete';

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const UserInfoBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginBottom: "1rem",
  color: "var(--clr-gray-1)",
}));

// const Input = styled('input')({
//   display: 'none',
// });

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  px: 2,
  py: 2,
};

const ProfileSnap = (props) => {
  const { strengthUpdate, handleStrengthUpdate, getUserProfile, setBase64ProfileImage } = useAuth();
  const tabletView = useMediaQuery("(max-width:900px)");
  const mobileView = useMediaQuery("(max-width:600px)");
  const access_token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [profileStrength, setProfileStrength] = useState(0);
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState();
  const [updated, setUpdated] = useState(false);
  const [base64Image, setBase64Image] = useState();
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
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [firstOtpSentMessage, setFirstOtpSentMessage] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [phoneVerified, setPhoneVerified] = useState("");
  const [resendCode, setResendCode] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadAgain, setLoadAgain] = useState(false);
  const [loadingSkleton, setLoadingSkleton] = useState(true);
  const [totalStrength, setTotalStrength] = useState(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [openImg, setOpenImg] = useState(false);
  const [imgUploadError, setImgUploadError] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [classShow, setClassShow] = useState('');

  const getUserEmail = async () => {
    const res = await provider.getUser({ AccessToken: access_token });
    setUserEmail(res?.UserAttributes[2].Value);
  };

  useEffect(() => {
    if (!userEmail) {
      getUserEmail();
    }
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

  const handleEditBasicDetails = () => {
    navigate("/edit-basic-details", {
      state: { profile: profile, userEmail: userEmail },
    });
  };

  useEffect(() => {
    gqlquery(QUERY_LISTPROFILES, null)
      .then((res) => res.json())
      .then((datas) => {
        setProfile(datas?.data?.getProfile);

        if (datas?.data?.getProfile?.phoneVerified === false) {
          controlStrength.phoneVerified = 0;
        }
        else {
          controlStrength.phoneVerified = 10;
        }
        const QUERY_DOWNLOADRESUME = {
          query: `query MyQuery {
                downloadDocument (url: "${datas?.data?.getProfile?.profilePicURL}")
              }`,
        };
        gqlquery(QUERY_DOWNLOADRESUME, null)
          .then((res) => res.json())
          .then((datas) => {
            setUpdated((pre) => !pre);
            const downloadDocument = JSON.parse(datas?.data?.downloadDocument);
            const imageSource = `data:image/png;base64,${downloadDocument?.response?.content}`;
            setBase64Image(imageSource);
            setBase64ProfileImage(imageSource)
            setClassShow(downloadDocument?.response?.content)
          });
      });

  }, [image, loadAgain, strengthUpdate, openImg]);

  useEffect(() => {
    gqlquery(QUERY_GETEDUCATION, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data?.getEducationList.length === 0) {
          controlStrength.education = 0;
        }
        else {
          controlStrength.education = 10;
        }
      })
      .finally(() => setLoadingSkleton(false));

    gqlquery(QUERY_LANGUAGES_KNOWN, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data?.getLanguagesKnown.length === 0) {
          controlStrength.language = 0;
        }
        else {
          controlStrength.language = 10;
        }
      });

    gqlquery(QUERY_GETEXPERIENCELIST, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas.data?.getExperienceList.length === 0) {
          controlStrength.experience = 0;
        }
        else {
          controlStrength.experience = 10;
        }
      });

    gqlquery(QUERY_GETCAREERPROFILEPERCENTAGE, null)
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

    gqlquery(QUERY_GETPERSONALDETAILS, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data?.getPersonalDetails === undefined) {
          controlStrength.personalDetails = 0;
        }
        else {
          controlStrength.personalDetails = 10;
        }
      });

    gqlquery(QUERY_GETRESUME, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data?.getResume?.filename === "" || datas.data?.getResume === undefined) {
          controlStrength.resume = 0;
        }
        else {
          controlStrength.resume = 20;
        }
      });

      gqlquery(QUERY_GETRESUMEHEADLINE, null)
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

    gqlquery(QUERY_LISTPROFILES, null)
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

    const strength = controlStrength.education + controlStrength.experience + controlStrength.language + controlStrength.personalDetails + controlStrength.careerProfile + controlStrength.resume + controlStrength.resumeHeadline + controlStrength.phoneVerified + controlStrength.profilePicURL;
    setTotalStrength(strength)
  }, [[], strengthUpdate]);

  /*   useEffect(() => {
      const QUERY_DOWNLOADRESUME = {
        query: `query MyQuery {
              downloadDocument (url: "${profile?.profilePicURL}")
            }`,
      };
      gqlquery(QUERY_DOWNLOADRESUME, null)
        .then((res) => res.json())
        .then((datas) => {
          setUpdated(pre => !pre);
          const downloadDocument = JSON.parse(datas?.data?.downloadDocument);
          console.log(downloadDocument);
          savePdf(downloadDocument)
        })
  
  
      const savePdf = item => {
        const byteCharacters = atob(item?.response?.content);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/octet-stream" });
        // const fileName = resume?.filename;
        // FileSaver.saveAs(blob, fileName);
      }
    }, []) */

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
      getUserProfile()
    }
    else {
      setImgUploadError("Image size should be less than 1 MB");
      setOpenImg(true);

    }

  };

  // first upload doucment then update updateprofilepicurl mutation
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
        });
    }
    // 51f56c64-8883-4662-aff5-771399b9c9b8
    // 83a97695-76a5-49bc-8253-59014e8f325d

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
            // setAddPaperSnack(true);
            // setOpen(true);
            // setTimeout(handleSnackbar, 2000);
            handleStrengthUpdate();
            setUpdated((pre) => !pre);
          } else {
          }
        })
        .finally((e) => setIsLoading(false));
    };
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
            setFirstOtpSentMessage("An otp has been sent to your number.");
            setOpenSnackbar(true);
            setOpenAddModal(true);
            setSeconds(60);
            setIsActive(true);
          }
        });
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
    if (reason === "clickaway") {
      return;
    }
    setPhoneVerified("");
    setFirstOtpSentMessage("");
    setResendCode("");
    setOtpError("");
    setOpenSnackbar(false);
  };

  const handleVerifyOTP = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (otpCode.length === 0) {
        return setError("Please enter a valid OTP");
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
            sessionStorage.removeItem("countingResendCode");
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
        });
    }
  };

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
          setResendCode("A new OTP has been sent.");
          setOpenSnackbar(true);
          let setCounter = sessionStorage.getItem("countingResendCode");
          if (setCounter >= 3) {
            setSeconds(300);
          } else {
            setSeconds(60);
          }
          setIsActive(true);
        }
      });
  };
  const handleCloseImg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenImg(false);
    setImgUploadError("");
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
        console.log(data)
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

  return (
    <Box maxWidth="md" sx={{ mx: "auto", mt: -10, mb: 4 }}>
      <Card
        sx={{
          margin: "auto",
          borderRadius: 2,
          boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
          border: matches ? "1px solid #E4EEF5" : "",
        }}
      >
        {matches ? (
          // tab view
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={3.5}>
              {!loadingSkleton ? (
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
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={handleUploadProfileImage}
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
                ) : (
                  <Skeleton sx={{width: "80px", height: "120px", mt: 1}}/>
                )}
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
                    {!loadingSkleton ? <>{profile?.name}</> : <Skeleton sx={{fontSize: "16px", width: "85%"}}/>}
                  </Typography>
                  {!loadingSkleton ? (                      
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
                    {props?.pageType !== "EditBasicDetials" && (
                      <IconButton sx={{ p: 0.5 }}>
                        <Tooltip title="Edit basic details">
                          <EditIcon
                            onClick={handleEditBasicDetails}
                            sx={{
                              color: "var(--clr-blue-primary)",
                              fontSize: "14px",
                            }}
                          />
                        </Tooltip>
                      </IconButton>
                    )}
                  </Box>
                      ) : (
                        <Skeleton sx={{fontSize: "14px", width: "95%"}}/>
                      )}
                </Box>
              </Grid>
              <Grid item xs={2.3}>
                <Box sx={{ position: "relative", margin: "auto" }}>
                {!loadingSkleton ? (
                        <>                          
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
                        </>
                      ) : (
                        <Skeleton variant="circular" width={60} height={60} />
                      )}
                  <Box sx={{ textAlign: "start", pt:"6px" }}>
                    <Typography
                      style={{
                        fontSize: 8,
                        lineHeight: "8px",
                        fontWeight: 600,
                        color: "var(--clr-gray-3)",
                        mt: "10px",
                      }}
                    >
                      {!loadingSkleton ? "Profile Strength" : <Skeleton style={{ fontSize: 8, mt: "10px", }}/>}
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
                {!loadingSkleton ? (
                        <>                          
                          <FmdGoodOutlinedIcon
                            sx={{ color: "var(--clr-white-icon)" }}
                          />
                          {profile?.cityWithState}
                        </>
                      ) : (
                        <Skeleton sx={{ fontSize: "16px", width: "40%" }} />
                      )}
                </UserInfoBox>
                <UserInfoBox>
                {!loadingSkleton ? (
                        <>                          
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
                        </>
                      ) : (
                        <Skeleton sx={{ fontSize: "16px", width: "62%" }} />
                      )}
                </UserInfoBox>
                <UserInfoBox>
                {!loadingSkleton ? (
                        <>                          
                          <AccountBalanceWalletOutlinedIcon
                            sx={{ color: "var(--clr-white-icon)" }}
                          />
                          {profile?.salary === 0 && profile?.salaryThousands === 0 ? (
                            <>Fresher</>
                          ) : (
                            <>
                              {profile?.salary === 0 ? (
                                <>
                                  {profile?.salaryThousands}{" "}
                                  {profile?.salaryThousands === 0 ||
                                  profile?.salaryThousands === 1
                                    ? "Thousand"
                                    : "Thousands"}
                                </>
                              ) : (
                                <>
                                  {profile?.salaryThousands === 0 ? (
                                    <>
                                      {profile?.salary}{" "}{profile?.salary === 0 || profile?.salary === 1? "Lakh" : "Lakhs"}
                                    </>
                                    ) : (
                                    <>
                                      {profile?.salary}{" "}{profile?.salary === 0 || profile?.salary === 1 ? "Lakh" : "Lakhs"}{" "}{profile?.salaryThousands}{" "}{profile?.salaryThousands === 0 || profile?.salaryThousands === 1 ? "Thousand": "Thousands"}
                                    </>
                                  )} 
                                </> 
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <Skeleton sx={{ fontSize: "16px", width: "65%" }} />
                      )}
                </UserInfoBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <UserInfoBox>
                {!loadingSkleton ? (
                        <>
                          <PhoneIphoneIcon sx={{ color: "var(--clr-white-icon)" }} />
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
                              <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                                          padding: "10.5px 14px",
                                        },
                                        ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                          {
                                            border: "1px solid var(--clr-blue-light)",
                                          },
                                        "&:hover": {
                                          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                            {
                                              border:
                                                "1px solid var(--clr-blue-primary)",
                                            },
                                        },
                                      },
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
                                          Resend code in 0{(seconds / 60) | 0}:
                                          {seconds % 60}s{" "}
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
                                        <FormHelperText sx={{ color: "red", mt: 0 }}>
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
                                      onClick={(event) =>
                                        handleVerifyOTP(event, "onClick")
                                      }
                                      sx={{ borderRadius: 16 }}
                                    >
                                      Confirm
                                    </Button>
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    sx={{ pt: 2, color: "var(--clr-gray-3)" }}
                                  >
                                    Help us to verify your contacts for relevant jobs by
                                    adding more details.
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
                        </>
                      ) : (
                        <Skeleton sx={{ fontSize: "16px", width: "68%" }} />
                      )}
                </UserInfoBox>
                <UserInfoBox>
                {!loadingSkleton ? (
                        <>                          
                          <EmailOutlinedIcon sx={{ color: "var(--clr-white-icon)" }} />
                          {userEmail} <img src={greenTick} alt="greenTick" />
                        </>
                      ) : (
                        <Skeleton sx={{ fontSize: "16px", width: "85%" }} />
                      )}
                </UserInfoBox>
                <UserInfoBox>
                {!loadingSkleton ? (
                        <>                          
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
                        </>
                      ) : (
                        <Skeleton sx={{ fontSize: "16px", width: "80%" }} />
                      )}
                </UserInfoBox>
              </Grid>
              {!loadingSkleton ? (
                  <>                    
                    {props?.pageType !== "EditProfile" && (
                      <Button
                        sx={{ borderRadius: 16, fontSize: "0.8rem", mt: 2 }}
                        variant="outlined"
                        color="secondary"
                        onClick={() => navigate("/profile")}
                      >
                        Update Profile
                      </Button>
                    )}
                  </>
                ) : (
                  <Skeleton sx={{ fontSize: "36px", width: "40%", borderRadius: "56px" }} />
                )}
            </Grid>
          </CardContent>
        ) : (
          // web view
          <CardContent
            sx={{
              display: "flex",
              gap: "1.5rem",
              flexDirection: `${mobileView ? "column" : "row"}`,
            }}
          >
            {!loadingSkleton ? (
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
                  <div>
                    <Avatar
                      sx={{
                        width: "60px",
                        height: "60px",
                        margin: `${tabletView ? "1rem auto" : "0 1rem"}`,
                        mt: 1,
                      }}
                      className={classShow === "" ? "nono" : "docPP"}
                      src={base64Image}
                    />
                    <div
                      onClick={() => setDeleteModal(true)}
                      className="doctorProfilePicIcon"
                    >
                      <DeleteIcon
                        sx={{
                          position: "absolute",
                          right: 30,
                          bottom: 150,
                          color: "red",
                          height: 30,
                          width: 30,
                        }}
                      />
                    </div>
                  </div>
                )}
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 63,
                    right: 3,
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
                      onClick={(event) => {
                        event.target.value = null;
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
            ) : (
              <Skeleton variant="circular" width={80} height={80} />
            )}
            <Grid container>
              <Grid item xs={12} md={10}>
                <Box sx={{ textAlign: `${mobileView ? "center" : "left"}` }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: 600, color: "var(--clr-gray-1)" }}
                  >
                    {!loadingSkleton ? (
                      <>{profile?.name}</>
                    ) : (
                      <Skeleton sx={{ fontSize: "24px", width: "30%" }} />
                    )}
                  </Typography>
                  {!loadingSkleton ? (
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
                      {props?.pageType !== "EditBasicDetials" && (
                        <IconButton sx={{ p: 0.5 }}>
                          <Tooltip title="Edit basic details">
                            <EditIcon
                              onClick={handleEditBasicDetails}
                              fontSize="small"
                              sx={{ color: "var(--clr-blue-primary)" }}
                            />
                          </Tooltip>
                        </IconButton>
                      )}
                    </Box>
                  ) : (
                    <Skeleton sx={{ fontSize: "16px", width: "60%" }} />
                  )}
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
                    {!loadingSkleton ? (
                          <>
                            <FmdGoodOutlinedIcon
                              sx={{ color: "var(--clr-white-icon)" }}
                            />
                            {profile?.cityWithState}
                          </>
                        ) : (
                          <Skeleton sx={{ fontSize: "16px", width: "40%" }} />
                        )}
                    </UserInfoBox>
                    <UserInfoBox>
                    {!loadingSkleton ? (
                        <>                          
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
                        </>
                      ) : (
                        <Skeleton sx={{ fontSize: "16px", width: "55%" }} />
                      )}
                    </UserInfoBox>
                    <UserInfoBox>
                    {!loadingSkleton ? (
                        <>                          
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
                                    : "Thousands"}
                                </>
                              ) : (
                                <>
                                  {profile?.salaryThousands === 0 ? (
                                    <>
                                      {profile?.salary}{" "}{profile?.salary === 0 || profile?.salary === 1? "Lakh" : "Lakhs"}
                                    </>
                                    ) : (
                                      <>
                                        {profile?.salaryThousands === 0 ? (
                                          <>
                                            {profile?.salary}{" "}{profile?.salary === 0 || profile?.salary === 1? "Lakh" : "Lakhs"}
                                          </>
                                          ) : (
                                          <>
                                            {profile?.salary}{" "}{profile?.salary === 0 || profile?.salary === 1 ? "Lakh" : "Lakhs"}{" "}{profile?.salaryThousands}{" "}{profile?.salaryThousands === 0 || profile?.salaryThousands === 1 ? "Thousand": "Thousands"}
                                          </>
                                        )} 
                                      </> 
                                  )} 
                                </> 
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <Skeleton sx={{ fontSize: "16px", width: "65%" }} />
                      )}
                    </UserInfoBox>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <UserInfoBox>
                    {!loadingSkleton ? (
                        <>                          
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
                            <Box sx={style}>
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
                                    onKeyDown={handleVerifyOTP}
                                    sx={{
                                      py: 1,
                                      borderRadius: 1,
                                      display: "block !important",
                                    }}
                                    InputProps={{
                                      sx: {
                                        ".MuiOutlinedInput-input": {
                                          padding: "10.5px 14px",
                                        },
                                        ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                          {
                                            border:
                                              "1px solid var(--clr-blue-light)",
                                          },
                                        "&:hover": {
                                          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                            {
                                              border:
                                                "1px solid var(--clr-blue-primary)",
                                            },
                                        },
                                      },
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
                                          Resend code in 0{(seconds / 60) | 0}:
                                          {seconds % 60}s{" "}
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
                                      onClick={(event) =>
                                        handleVerifyOTP(event, "onClick")
                                      }
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
                        </>
                      ) : (
                        <Skeleton sx={{ fontSize: "16px", width: "67%" }} />
                      )}
                    </UserInfoBox>
                    <UserInfoBox>
                    {!loadingSkleton ? (
                        <>                          
                          <EmailOutlinedIcon
                            sx={{ color: "var(--clr-white-icon)" }}
                          />
                          {userEmail} <img src={greenTick} alt="greenTick" />
                        </>
                      ) : (
                        <Skeleton sx={{ fontSize: "16px", width: "83%" }} />
                      )}
                    </UserInfoBox>
                    <UserInfoBox>
                    {!loadingSkleton ? (
                        <>
                          
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
                        </>
                      ) : (
                        <Skeleton sx={{ fontSize: "16px", width: "71%" }} />
                      )}
                    </UserInfoBox>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box sx={{ position: "relative", margin: "auto" }}>
                  {!loadingSkleton ? (
                    <>
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
                          color: "var(--clr-blue-footer)",
                          transform: "translate(-50%, -50%)",
                        }}
                        className="strength-value"
                      >
                        {totalStrength}%
                      </Typography>
                    </>
                  ) : (
                    <Skeleton variant="circular" width={120} height={120} />
                  )}

                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: 13,
                        lineHeight: "16px",
                        fontWeight: 600,
                        color: "var(--clr-gray-3)",
                        mt: 1,
                      }}
                    >
                    {!loadingSkleton ? (
                       "Profile Strength"
                      ) : (
                        <Skeleton sx={{ fontSize: "12px", width: "100%" }} />
                      )}
                    </Typography>
                    {!loadingSkleton ? (
                        <>                          
                          {props?.pageType !== "EditProfile" && (
                            <Button
                              sx={{ borderRadius: 16, fontSize: "0.8rem", mt: 2 }}
                              variant="outlined"
                              color="secondary"
                              onClick={() => navigate("/profile")}
                            >
                              Update Profile
                            </Button>
                          )}
                        </>
                      ) : (
                        <Skeleton sx={{ fontSize: "36px", width: "100%", borderRadius: 16 }} />
                      )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
      {imgUploadError && (
        <Snackbar
          open={openImg}
          autoHideDuration={6000}
          onClose={handleCloseImg}
        >
          <Alert
            onClose={handleCloseImg}
            severity="error"
            sx={{ width: "100%" }}
          >
            {imgUploadError}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ProfileSnap;

ProfileSnap.prototype = {
  profileData: {
    image: PropTypes.any,
    name: PropTypes.string,
    specilization: PropTypes.string,
    location: PropTypes.string,
    experience: PropTypes.number,
    salary: PropTypes.string,
    number: PropTypes.string,
    email: PropTypes.string,
    strength: PropTypes.number,
  },
};
