import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Breadcrumbs,
  Card, CardActions, CardContent, CircularProgress,
  /* FormControl, */ FormHelperText, /* FormLabel, */ Grid, IconButton, Input, TextField,
  InputLabel, /* Link,  MenuItem, Select,*/ Tooltip, Typography,
  Tab, Tabs, Skeleton
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import scletonImg from "../../assets/square_img.png";
// Swiper react slider
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { makeStyles } from "@material-ui/core/styles";
// import {  } from "@material-ui/styles";
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MuiAlert from '@mui/material/Alert';
import InputBase from "@mui/material/InputBase";
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { encode } from 'base-64';
// import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
// import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
// import { Swiper, SwiperSlide } from "swiper/react";
import { gqlquery, QUERY_GETHOSPITAL, QUERY_GETMYPROFILE, QUERY_HOSPITALDETAILS, QUERY_HOSPITALPICTURES } from "../../api/hospitalIndex";
import greenTick from "../../assets/green_tick.svg";
import useAuth from "../../hooks/useAuth";
import { AboutTab } from "./components/AboutTab";
import { AccountDetails } from "./components/AccountDetails";
import { CompanyDetailsTab } from "./components/CompanyDetailsTab";
import { KYCDetials } from "./components/KYCDetials";
import CompanySettings from "./components/CompanySettings";
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    position: "relative",
    border: "1px solid #E4EEF5",
    padding: "12px",

    "&:focus": {
      borderRadius: "6px",
      border: "1px solid #E4EEF5",
    },
  },
}));

// Custom style for Select dropdown
const selectPlaceholderStyles = makeStyles((theme) => ({
  placeholder: {
    color: "#B8BCCA",
  },
}));

const SelectPlaceholder = ({ children }) => {
  const classes = selectPlaceholderStyles();
  return <div className={classes.placeholder}>{children}</div>;
};

const useStyles = makeStyles({
  icon: {
    fill: "var(--clr-blue-footer)",
  },
});

const InputUpload = styled("input")({
  display: "none",
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
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 1,
  px: 1.5,
  py: 1.5,
};

const CompanyProfile = () => {
  const navigate = useNavigate();
  const { setHospitalUserName, getUserProfile, setHospitalImage } = useAuth();
  const classes = useStyles();
  const [updateList, setUpdateList] = useState(false);
  const [updateAbout, setUpdateAbout] = useState(false);
  const [updateCompanyVideo, setUpdateCompanyVideo] = useState(false);
  const [showUpdateAccountDetails, setShowUpdateAccountDetails] =
    useState(false);
  const [showUpdateCompanyDetails, setShowUpdateCompanyDetails] =
    useState(false);
  const [showUpdateKYCComplianceDetails, setShowUpdateKYCComplianceDetails] =
    useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  let [error, setError] = useState("");
  const [validPinNumErr, setValidPinNumErr] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  let [errInput, setErrInput] = useState("");
  const [validGstin, setValidGstin] = useState("");
  const [youtubeErrInput, setYoutubeErrInput] = useState("");
  const [errUrl, setErrUrl] = useState("");
  const [about, setAbout] = useState("");
  const [companyVideo, setCompanyVideo] = useState({ videoLink: "" });
  const [allState, setAllState] = useState([]);
  const [allCityLocation, setAllCityLocation] = useState([]);
  const [updateAccountDeatils, setUpdateAccountDeatils] = useState({
    role: "",
    reportingManager: "",
    mobileNumber: "",
  });
  const [updateCompanyDetails, setUpdateCompanyDetails] = useState({
    companyName: "",
    additionalPhone1: "",
    additionalPhone2: "",
    companyType: "",
    contactPerson: "",
    designation: "",
    industryType: "",
    website: "",
  });
  const [updateKycComplianceDetails, setUpdateKycComplianceDetails] = useState({
    address: "",
    city: "",
    country: "",
    gstin: "",
    pan: "",
    pincode: "",
    state: "",
    location : null, 
  });
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState();
  const [hospitalImg, setHospitalImg] = useState();
  const [updated, setUpdated] = useState(false);
  const [base64Image, setBase64Image] = useState('data:image/png;base64');
  const [imageLoading, setImageLoading] = useState(true);
  const [hospitalDetails, setHospitalDetails] = useState([]);
  const [getUserNameAndEmail, setGetUserNameAndEmail] = useState({});
  const [allHospitalImages, setAllHospitalImages] = useState([]);
  const [copyHospitalImages, setCopyHospitalImages] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [adminHospitalData, setAdminHospitalData] = useState([]);
  const [isLoadingProfileImg, setIsLoadingProfileImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [firstOtpSentMessage, setFirstOtpSentMessage] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [phoneVerified, setPhoneVerified] = useState("");
  const [resendCode, setResendCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const access_token = sessionStorage.getItem("accessToken");
  const [openImg, setOpenImg] = useState(false);
  const [imgUploadError, setImgUploadError] = useState("");
  const location = useLocation()
  const [deleteModal, setDeleteModal] = useState(false);
  document.title = "Company Profile | MedLink Jobs";
  // document.title = hospital?.name;
  const [open, setOpen] = useState(false);
  const [updateAboutSuccess, setUpdateAboutSuccess] = useState(false);
  const [updateAboutFailure, setUpdateAboutFailure] = useState(false);
  const [addProfilePicSuccess, setAddProfilePicSuccess] = useState(false);
  const [addProfilePicFailure, setAddProfilePicFailure] = useState(false);
  const [deleteProfilePicSuccess, setDeleteProfilePicSuccess] = useState(false);
  const [deleteProfilePicFailure, setDeleteProfilePicFailure] = useState(false);
  const [companyPicAddSuccess, setCompanyPicAddSuccess] = useState(false);
  const [companyPicAddFailure, setCompanyPicAddFailure] = useState(false);
  const [companyVideoAddSuccess, setCompanyVideoAddSuccess] = useState(false);
  const [companyVideoAddFailure, setCompanyVideoAddFailure] = useState(false);
  const [updateAccountDetailsSuccess, setUpdateAccountDetailsSuccess] = useState(false);
  const [updateAccountDetailsFailure, setUpdateAccountDetailsFailure] = useState(false);
  const [updateCompanyDetailsSuccess, setUpdateCompanyDetailsSuccess] = useState(false);
  const [updateCompanyDetailsFailure, setUpdateCompanyDetailsFailure] = useState(false);
  const [updateKYCComplianceDetailsSuccess, setUpdateKYCComplianceDetailsSuccess] = useState(false);
  const [updateKYCComplianceDetailsFailure, setUpdateKYCComplianceDetailsFailure] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
    var AuthParams = {
      AccessToken: access_token,
    };
    async function accountDetailsGetUser() {
      const user = await provider.getUser(AuthParams);
      setGetUserNameAndEmail(user);
      setHospitalUserName(user);

    }
    accountDetailsGetUser();

  }, []);

  useEffect(() => {

    gqlquery(QUERY_GETMYPROFILE, null)
    .then((res) => res.json())
    .then((data) => {
      setAdminHospitalData(data?.data?.getMyProfile);
    })
    
    gqlquery(QUERY_GETHOSPITAL, null)
      .then((res) => res.json())
      .then((data) => {
        setHospital(data?.data?.getHospital);
      })

    gqlquery(QUERY_HOSPITALDETAILS, null)
      .then((res) => res.json())
      .then((data) => {
        setHospitalDetails(data?.data?.getHospitalDetails);
        const QUERY_GETPROFILEPIC = {
          query: `query MyQuery {
                downloadDocument (url: "${data?.data?.getHospitalDetails?.profilePicURL}")
              }`,
        };
        gqlquery(QUERY_GETPROFILEPIC, null)
          .then((res) => res.json())
          .then((datas) => {
            setUpdated(pre => !pre);
            const downloadDocument = JSON.parse(datas?.data?.downloadDocument);
            const imageSource = `data:image/png;base64,${downloadDocument?.response?.content}`;
            setBase64Image(imageSource);
            setImageLoading(false);
            setHospitalImage(imageSource);
          })
      });
  }, [image, updateList, openImg, base64Image]);

  useEffect(() => {

    gqlquery(QUERY_HOSPITALPICTURES, null)
      .then((res) => res.json())
      .then((data) => {
        setCopyHospitalImages(data?.data?.getHospitalPictures);
        setAllHospitalImages(data?.data?.getHospitalPictures);

        data?.data?.getHospitalPictures?.map(img => {
          const QUERY_HOSPITALPIC = {
            query: `query MyQuery {
                downloadDocument (url: "${img?.url}")
              }`,
          };
          gqlquery(QUERY_HOSPITALPIC, null)
            .then((res) => res.json())
            .then((datas) => {
              const downloadDocument = JSON.parse(datas?.data?.downloadDocument); 
              Object.assign(img, downloadDocument);
            })
        })
      });
  }, [hospitalImg]);

  const getCityAndState = async () => {
    const GET_COUNTRY = {
      query: `query MyQuery {
        getStateMaster(country: "${updateKycComplianceDetails.country}") {
          state
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };

    gqlquery(GET_COUNTRY, null)
      .then((res) => res.json())
      .then((datas) => setAllState(datas?.data?.getStateMaster));

    const GET_CITY = {
      query: `query MyQuery {
      getCityByState(country: "${updateKycComplianceDetails.country}", state: "${updateKycComplianceDetails.state}") {
        city 
        lmID 
      }
    }
  `,
      variables: null,
      operationName: "MyQuery",
    };

    gqlquery(GET_CITY, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllCityLocation(datas?.data?.getCityByState)
      });
  } 

  useEffect(()=>{
    getCityAndState();
  }, [updateKycComplianceDetails.country, updateKycComplianceDetails.state])


  const SearchPresentCity = (event) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val
  
    if(event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2){
  
      const GET_CITY= {
        query: `query MyQuery {
          searchCityByState(city: "${event.target.value}", country: "${updateKycComplianceDetails.country}", state: "${updateKycComplianceDetails.state}") {
            city
            lmID 
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      
      gqlquery(GET_CITY, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllCityLocation(datas?.data?.searchCityByState) 
      });
    }
    else {
      const GET_CITY = {
        query: `query MyQuery {
          getCityByState(country: "${updateKycComplianceDetails.country}", state: "${updateKycComplianceDetails.state}") {
            city 
            lmID 
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      
      gqlquery(GET_CITY, null)
      .then((res) => res.json())
      .then((datas) => setAllCityLocation(datas?.data?.getCityByState));
    }
  }

  const onClickUpdateAbout = () => {
    // e.preventDefault();
    setAbout(hospitalDetails?.about)
    setUpdateAbout((prevData) => !prevData);
  };

  const onClickUpdateCompanyVideo = () => {
    // e.preventDefault();
    companyVideo.videoLink = hospitalDetails?.video;
    setUpdateCompanyVideo((prevData) => !prevData);
  };

  const onClickUpdateAccountDetails = () => {
    // e.preventDefault();
    setError("");
    setMobileNumberError("");
    setValidPinNumErr("");
    setErrInput("");
    setValidGstin("");
    setErrUrl("");
    updateAccountDeatils.role = hospitalDetails?.role;
    updateAccountDeatils.reportingManager = hospitalDetails?.reportingManager;
    updateAccountDeatils.mobileNumber = hospitalDetails?.mobile || hospital?.contactPhone;
    setShowUpdateAccountDetails((prevData) => !prevData);
  };

  const onClickUpdateCompanyDetails = () => {
    // e.preventDefault();
    setError("");
    setMobileNumberError("");
    setValidPinNumErr("");
    setErrInput("");
    setValidGstin("");
    setErrUrl(""); 
    updateCompanyDetails.companyName = hospitalDetails?.companyName
    updateCompanyDetails.additionalPhone1 = hospitalDetails?.additionalPhone1;
    updateCompanyDetails.additionalPhone2 = hospitalDetails?.additionalPhone2;
    updateCompanyDetails.companyType = hospitalDetails?.companyType || hospital?.type;
    updateCompanyDetails.contactPerson = hospitalDetails?.contactPerson;
    updateCompanyDetails.designation = hospitalDetails?.designation;
    updateCompanyDetails.industryType = hospitalDetails?.industryType;
    updateCompanyDetails.website = hospitalDetails?.website;
    setShowUpdateCompanyDetails((prevData) => !prevData);
  };
  const onClickUpdateKYCComplianceDetails = () => { 
    // e.preventDefault();
    setError("");
    setMobileNumberError("");
    setValidPinNumErr("");
    setErrInput("");
    setValidGstin("");
    setErrUrl(""); 
    updateKycComplianceDetails.pan = hospitalDetails?.pan ? hospitalDetails?.pan : "" ;
    updateKycComplianceDetails.address = hospitalDetails?.address ? hospitalDetails?.address : ""; 
    updateKycComplianceDetails.country = hospitalDetails?.country ? hospitalDetails?.country?.charAt(0) + hospitalDetails?.country?.slice(1)?.toLowerCase() : "India";
    updateKycComplianceDetails.state = hospitalDetails?.state ? hospitalDetails?.state : "" ;
    updateKycComplianceDetails.gstin = hospitalDetails?.gstin ? hospitalDetails?.gstin : "";
    updateKycComplianceDetails.city = hospitalDetails?.city ? hospitalDetails?.city : "" ;
    updateKycComplianceDetails.location = hospitalDetails?.locationID ? { lmID: hospitalDetails?.locationID, city: hospitalDetails?.city || "" } : {city: "", lmID: ""};
    updateKycComplianceDetails.pincode = hospitalDetails?.pincode ? hospitalDetails?.pincode : "";
    setShowUpdateKYCComplianceDetails((prevData) => !prevData);
  };

  const handleCancelAboutUpdate = (e) => {
    setUpdateAbout((prevData) => !prevData);
  };

  const handleCancelCompanyVideoUpdate = (e) => {
    setUpdateCompanyVideo((prevData) => !prevData);
  };

  const handleCancelUpdateAccountDetails = (e) => {
    setShowUpdateAccountDetails((prevData) => !prevData);
  };

  const handleCancelUpdateCompanyDetails = (e) => {
    setShowUpdateCompanyDetails((prevData) => !prevData);
  };

  const handleCancelUpdateKYCComplianceDetails = (e) => {
    setShowUpdateKYCComplianceDetails((prevData) => !prevData);
  };

  const handleAboutChange = (event) => { 
    setAbout(event.target.value);
  };

  const onlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  let countResetCodeRecruiter = sessionStorage.getItem("countingResendCodeRecruiter");
  const handleVerifyPhoneNumber = async () => {
    if (countResetCodeRecruiter === null) {

      const sendSMS = () => {
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
            if (datas?.data?.sendSMS) {
              sessionStorage.setItem("countingResendCodeRecruiter", 1);
              setFirstOtpSentMessage("An otp has been sent to your number.")
              setOpenSnackbar(true);
              setOpenAddModal(true);
              setSeconds(60);
              setIsActive(true);
            }
          })
      }

      if (hospitalDetails?.mobile) {
        sendSMS();
      } else {
        const QUERY_UPDATEHOSPITALACCOUNTDETAILS = {
          query: `mutation MyMutation {
        updateHospitalAccountDetails(
          role: "",
          reportingManager: "",
          mobile: "${hospital?.contactPhone}"
          ) {
            about
            hospitalID
            mobile
            reportingManager
            role
            video
          }
            }`,
          variables: null,
          operationName: "MyMutation",
        };

        gqlquery(QUERY_UPDATEHOSPITALACCOUNTDETAILS, null)
          .then((res) => res.json())
          .then((datas) => { 
            sendSMS();
          })
      }


    } else {
      setOpenAddModal(true);
    }
  }

  const handleVerifyOTP = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (otpCode?.length === 0) {
        return setError("Please enter a valid OTP")
      } else {
        setError("");
      }
      if (otpCode?.length !== 6) {
        return setError("Invalid OTP");
      } else {
        setError("");
      }
      const QUERY_VERIFYPHONENUMBER = {
        query: `mutation MyMutation {
        confirmMobileOTP(verificationCode: "${otpCode}") {
          about
          website
          video
          state
          role
          reportingManager
          profilePicURL
          pincode
          pan
          mobile
          industryType
          hospitalID
          gstin
          designation
          country
          contactPerson
          companyType
          city
          address
          additionalPhone2
          additionalPhone1
        }
      }
        `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_VERIFYPHONENUMBER, null)
        .then((res) => res.json())
        .then((datas) => { 
          if (datas?.data?.confirmMobileOTP) {
            setOpenSnackbar(true);
            setOpenAddModal(false);
            setPhoneVerified("Congrats! Your phone number has been verified")
          } else {
            setError("OTP is either invalid or has expired.");
            // setOpenAddModal(false);
            // setOpenSnackbar(true);
          }
        })


    }
  };

  const hanldeResetCountdown = () => {
    sessionStorage.setItem("countingResendCodeRecruiter", Number(countResetCodeRecruiter) + 1);
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
        if (datas?.data?.sendSMS) {
          setResendCode("A new OTP has been sent.")
          setOpenSnackbar(true);
          let setCounter = sessionStorage.getItem("countingResendCodeRecruiter");
          if (setCounter >= 3) {
            setSeconds(300);
          } else {
            setSeconds(60);
          }
          setIsActive(true);
        }
      })
  }

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
    setOpen(false);
    setAddProfilePicSuccess(false);
    setAddProfilePicFailure(false);
    setDeleteProfilePicSuccess(false);
    setDeleteProfilePicFailure(false);
    setCompanyVideoAddFailure(false);
    setCompanyVideoAddSuccess(false);
    setCompanyPicAddFailure(false);
    setCompanyPicAddSuccess(false);
    setUpdateAboutSuccess(false);
    setUpdateAboutFailure(false);
    setUpdateAccountDetailsSuccess(false);
    setUpdateAccountDetailsFailure(false);
    setUpdateCompanyDetailsFailure(false);
    setUpdateCompanyDetailsSuccess(false);
    setUpdateKYCComplianceDetailsFailure(false);
    setUpdateKYCComplianceDetailsSuccess(false);
    setPhoneVerified("");
    setFirstOtpSentMessage("");
    setResendCode("");
    setOtpError("");
    setOpenSnackbar(false);
  };

  const handleKeyDown = event => {
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      handleUpdateAboutData(event);
      return;
    }
  };

  const handleUpdateAboutData = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (about === "") {
        setErrInput("About Text field can not be empty.");
        return
      }

      const QUERY_UPDATEHOSPITALABOUT = {
        query: `mutation MyMutation {
        updateHospitalAbout(
          about: "${about?.replaceAll("\n", "<br />")}"
          ) {
          about
          hospitalID
          }
            }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_UPDATEHOSPITALABOUT, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.updateHospitalAbout) {
            setUpdateList(!updateList);
            setOpen(true);
            setUpdateAboutSuccess(true);
          } else {
            setUpdateList(!updateList);
            setOpen(true);
            setUpdateAboutFailure(true)
          }

        })
        .finally((e) => setUpdateAbout((prevData) => !prevData));

      // setUpdateAbout((prevData) => !prevData);)

      // about = "";

      setErrInput("");
      setError("");
    }
  };

  const handleCompanyVideoChange = (prop) => (event) => {
    setCompanyVideo({ ...companyVideo, [prop]: event.target.value });
  };

  const handleUpdateCompanyVideo = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      let re = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

      if (companyVideo.videoLink === "" || (re.test(companyVideo.videoLink)) === false) {
        setErrInput("Company video Text field can not be empty.");
        setYoutubeErrInput("Invalid youtube video link.")
        return
      }

      const QUERY_UPDATEHOSPITALVIDEO = {
        query: `mutation MyMutation {
        updateHospitalVideo(
          video: "${companyVideo.videoLink}"
          ) {
            about
            hospitalID
            video
          }
            }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_UPDATEHOSPITALVIDEO, null)
        .then((res) => res.json())
        .then((datas) => {
          setUpdateList(!updateList);
          if (datas?.data?.updateHospitalVideo) {
            setOpen(true);
            setCompanyVideoAddSuccess(true);
          } else {
            setOpen(true);
            setCompanyVideoAddFailure(true)
          }
        })
        .finally((e) => console.log("Updated Company Video"));

      setUpdateCompanyVideo((prevData) => !prevData);

      companyVideo.videoLink = "";

      setErrInput("");
      setError("");
      setYoutubeErrInput("");
    }
  };

  const handleAccountDetailsChange = (prop) => (event) => {
    setUpdateAccountDeatils({
      ...updateAccountDeatils,
      [prop]: event.target.value,
    });
  };

  const handleUpdateAccountDetails = (event, from) => { 
    if (event.key === "Enter" || from === "onClick") {
      if (
        (!updateAccountDeatils?.role || updateAccountDeatils.role === "") ||
        (!updateAccountDeatils?.reportingManager || updateAccountDeatils?.reportingManager === "") ||
        updateAccountDeatils?.mobileNumber?.length !== 10 ||
        updateAccountDeatils?.mobileNumber === ""
      ) {
        setErrInput("Text field can not be empty.");
        setMobileNumberError("Invalid mobile number.")
        return;
      } else {
        setErrInput("")
        setMobileNumberError("")
      }
 

      const QUERY_UPDATEHOSPITALACCOUNTDETAILS = {
        query: `mutation MyMutation {
        updateHospitalAccountDetails(
          role: "${updateAccountDeatils?.role}",
          reportingManager: "${updateAccountDeatils?.reportingManager}",
          mobile: "${updateAccountDeatils?.mobileNumber}"
          ) {
            about
            hospitalID
            mobile
            reportingManager
            role
            video
          }
            }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_UPDATEHOSPITALACCOUNTDETAILS, null)
        .then((res) => res.json())
        .then((datas) => {  
          if (datas?.data?.updateHospitalAccountDetails) { 
            setUpdateList(!updateList);
            setOpen(true);
            setUpdateAccountDetailsSuccess(true);
          } else {
            setUpdateList(!updateList);
            setOpen(true);
            setUpdateAccountDetailsFailure(true)
          }
        })
        .finally((e) => console.log("Updated Account details"));

      setShowUpdateAccountDetails((prevData) => !prevData);

      updateAccountDeatils.videoLink = "";

      setErrInput("");
      setError("");
    }
  };

  const handleCompanyDetailsChange = (prop) => (event) => {
    setUpdateCompanyDetails({
      ...updateCompanyDetails,
      [prop]: event.target.value,
    });
  };

  let regex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

  useEffect(() => {
    if ((updateCompanyDetails.website !== undefined) && (regex.test(updateCompanyDetails.website) === false)) {
      setErrUrl("Please enter a valid link.");
    } else {
      setErrUrl("");
    }
  }, [updateCompanyDetails.website]);

  useEffect(() => {
    if (((updateCompanyDetails.additionalPhone1 !== undefined) && updateCompanyDetails?.additionalPhone1?.length !== 10)) {
      console.log("inside error of number1");
      setMobileNumberError("Invalid mobile number.");
    } else {
      setMobileNumberError("");
    }
  }, [updateCompanyDetails.additionalPhone1]);

  useEffect(() => {
    if (((updateCompanyDetails.additionalPhone2 !== undefined) && updateCompanyDetails?.additionalPhone2?.length !== 10)) {
      console.log("inside error of number2");
      setMobileNumberError("Invalid mobile number.");
    } else {
      setMobileNumberError("");
    }
  }, [updateCompanyDetails.additionalPhone2]);

  const handleUpdateCompanyDetails = (event, from) => { 
    if (event.key === "Enter" || from === "onClick") {
      // if((regex.test(updateCompanyDetails.website)) === false) {
      //     console.log("false, not a valid url");
      // } else {
      //   console.log("true, valid url")
      // }

      if (
        updateCompanyDetails.companyName === undefined || updateCompanyDetails.companyName === "" ||
        updateCompanyDetails.companyType === undefined || updateCompanyDetails.companyType === "" ||
        updateCompanyDetails.industryType === undefined || updateCompanyDetails.industryType === "" ||
        updateCompanyDetails.contactPerson === undefined || updateCompanyDetails.contactPerson === "" ||
        updateCompanyDetails.designation === undefined || updateCompanyDetails.designation === "" ||
        updateCompanyDetails.website === undefined || updateCompanyDetails.website === "" ||
        updateCompanyDetails.additionalPhone1 === undefined || updateCompanyDetails.additionalPhone1 === "" ||
        updateCompanyDetails.additionalPhone2 === undefined || updateCompanyDetails.additionalPhone2 === ""
        // (regex.test(updateCompanyDetails.website)) === false ||
        // updateCompanyDetails.additionalPhone1 === "" ||
        // updateCompanyDetails?.additionalPhone1?.length !== 10 ||
        // updateCompanyDetails.additionalPhone2 === "" ||
        // updateCompanyDetails?.additionalPhone2?.length !== 10
      ) {
        console.log("the first stand", error, errInput, errUrl, mobileNumberError)
        setError("Please, select an option.");
        setErrInput("This field can not be empty.");
        // setMobileNumberError("Invalid mobile number.");
        return;
      }
      else {
        console.log("clear error", error, errInput, errUrl, mobileNumberError)
        error = "";
        errInput = "";
        // setMobileNumberError("");
      };

      if (error !== "" || errInput !== "" || errUrl !== "" || mobileNumberError !== "") {
        console.log("the last stand", error, errInput, errUrl, mobileNumberError)
        return;
      }

      const QUERY_UPDATEHOSPITALCOMPANYDETAILS = {
        query: `mutation MyMutation {
        updateHospitalCompanyDetails(
          companyName: "${updateCompanyDetails.companyName}",
          additionalPhone1: "${updateCompanyDetails.additionalPhone1}",
          additionalPhone2: "${updateCompanyDetails.additionalPhone2}",
          companyType: "${updateCompanyDetails.companyType}",
          contactPerson: "${updateCompanyDetails.contactPerson}",
          designation: "${updateCompanyDetails.designation}",
          industryType: "${updateCompanyDetails.industryType}",
          website: "${updateCompanyDetails.website}"
          ) {
            companyName
            about
            additionalPhone1
            additionalPhone2
            companyType
            contactPerson
            designation
            hospitalID
            industryType
            mobile
            reportingManager
            role
            video
            website
          }
            }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_UPDATEHOSPITALCOMPANYDETAILS, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.updateHospitalCompanyDetails) {
            setUpdateList(!updateList);
            setOpen(true);
            setUpdateCompanyDetailsSuccess(true);
          } else {
            setUpdateList(!updateList);
            setOpen(true);
            setUpdateCompanyDetailsFailure(true)
          }
        })
        .finally((e) => console.log("Updated Company details"));

      setShowUpdateCompanyDetails((prevData) => !prevData);

      updateCompanyDetails.additionalPhone1 = "";
      updateCompanyDetails.additionalPhone2 = "";
      updateCompanyDetails.companyType = "";
      updateCompanyDetails.contactPerson = "";
      updateCompanyDetails.designation = "";
      updateCompanyDetails.industryType = "";
      updateCompanyDetails.website = "";

      setErrInput("");
      setError("");
    }
  };

  const handleKYCComplianceDetailsChange = (prop) => (event) => {
    if( prop === "state"){
      updateKycComplianceDetails.location = {city: "", lmID: ""};
      updateKycComplianceDetails.city = ""; 
    } 
    setUpdateKycComplianceDetails({
      ...updateKycComplianceDetails,
      [prop]: event.target.value,
    });
     
  };

  let gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  const handleUpdateKYCComplianceDetails = (event, from) => {  
    if (event.key === "Enter" || from === "onClick") {
      if (
        updateKycComplianceDetails.pan === "" ||
        updateKycComplianceDetails.pan === undefined ||
        updateKycComplianceDetails.address === "" ||
        updateKycComplianceDetails.address === undefined ||
        updateKycComplianceDetails.city === "" ||
        updateKycComplianceDetails.city === undefined ||
        updateKycComplianceDetails.location?.lmID === null ||
        updateKycComplianceDetails.location?.lmID === undefined ||
        updateKycComplianceDetails.country === "" ||
        updateKycComplianceDetails.country === undefined ||
        /* updateKycComplianceDetails.gstin === "" ||
        updateKycComplianceDetails.gstin === undefined || */
        ((updateKycComplianceDetails.gstin !== "") && (gstRegex.test(updateKycComplianceDetails.gstin) === false)) ||
        updateKycComplianceDetails.pincode === "" ||
        updateKycComplianceDetails.pincode === undefined ||
        updateKycComplianceDetails.pincode.length !== 6 ||
        updateKycComplianceDetails.state === "" ||
        updateKycComplianceDetails.state === undefined
      ) {
        setError("Please , select an option.");
        setErrInput("Text field can not be empty.");
        setValidGstin("Invalid GST Identification Number.");
        setValidPinNumErr("Invalid pin number.");
        return
      }  
 

      const QUERY_UPDATEHOSPITALKYC = {
        query: `mutation MyMutation {
        updateHospitalKYC(
          address: "${updateKycComplianceDetails.address}",
          locationID: ${updateKycComplianceDetails?.location?.lmID},
          gstin: "${updateKycComplianceDetails.gstin}",
          pan: "${updateKycComplianceDetails.pan}",
          pincode: "${updateKycComplianceDetails.pincode}",
          ) {
            about
            additionalPhone1
            additionalPhone2
            address
            city
            companyName
            companyType
            contactPerson
            country
            designation
            gstin
            hospitalID
            industryType
            locationID
            mobile
            pan
            phoneVerified
            pincode
            profilePicURL
            reportingManager
            role
            state
            video
            website
          }
            }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_UPDATEHOSPITALKYC, null)
        .then((res) => res.json())
        .then((datas) => { 
          if (datas?.data?.updateHospitalKYC) {
            setUpdateList(!updateList);
            setOpen(true);
            setUpdateKYCComplianceDetailsSuccess(true);
          } else {
            setUpdateList(!updateList);
            setOpen(true);
            setUpdateKYCComplianceDetailsFailure(true)
          }
        })
        .finally((e) => console.log("Updated KYC details"));

      setShowUpdateKYCComplianceDetails((prevData) => !prevData);

      updateKycComplianceDetails.address = "";
      updateKycComplianceDetails.city = "";
      updateKycComplianceDetails.country = "";
      updateKycComplianceDetails.gstin = "";
      updateKycComplianceDetails.pan = "";
      updateKycComplianceDetails.pincode = "";
      updateKycComplianceDetails.state = "";

      setErrInput("");
      setError("");
      setValidGstin("");
      setValidPinNumErr("");
    }
  };

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
      setImgUploadError("");
      setOpenImg(false);

    }
    else {
      setImgUploadError("Image size should be less than 1 MB");
      setOpenImg(true);

    }

  };

  useEffect(() => {
    if (image) {
      setIsLoadingProfileImg(true);
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
          postCompanyProfilePic(data?.url);
        })
    }

    const postCompanyProfilePic = (fileUrl) => {
      const QUERY_POSTCOMPANYPROFILEPIC = {
        query: `mutation MyMutation {
            updateProfilePicURL(profilePicURL: "${fileUrl ? fileUrl : ""}") {
              about
              additionalPhone1
              profilePicURL
            }
          }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_POSTCOMPANYPROFILEPIC, null)
        .then((res) => res.json())
        .then((datas) => { 
          setImage(null);
          if (datas?.data?.updateProfilePicURL) {
            setAddProfilePicSuccess(true);
            setOpen(true);
            setUpdated(pre => !pre);
          } else {
            setAddProfilePicFailure(true);
            setOpen(true);
            setUpdated(pre => !pre);
          }
        })
        .finally((e) => setIsLoadingProfileImg(false));
    }
  }, [image]);


  const handleUploadHospitalImage = (e) => {
    let image = e.target.files[0];
    setImageName(image.name);
    var reader = new FileReader();
    reader.readAsBinaryString(image);
    reader.onload = function (evt) {
      let encoded = encode(evt.target.result);
      setHospitalImg(encoded);
      getUserProfile()
    }
  };

  useEffect(() => {
    if (hospitalImg) {
      setIsLoading(true);
      const QUERY_UPLOADCOMPANYPROFILEPIC = {
        query: `mutation MyMutation {
            uploadDocument (
              content: "${hospitalImg}", 
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
          postCompanyPic(data?.url);
          setHospitalImg(null);
        })
    }

    const postCompanyPic = (fileUrl) => {
      const QUERY_POSTCOMPANYPROFILEPIC = {
        query: `mutation MyMutation {
            addHospitalPicture(url: "${fileUrl ? fileUrl : ""}")
          }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_POSTCOMPANYPROFILEPIC, null)
        .then((res) => res.json())
        .then((datas) => { 
          if (datas?.data?.addHospitalPicture) {
            setOpen(true);
            setCompanyPicAddSuccess(true);
            setUpdated(pre => !pre);
          } else {
            setOpen(true);
            setCompanyPicAddFailure(true);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [hospitalImg]);

  const handleCloseImg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenImg(false);
    setImgUploadError("");

  };

  const [value, setValue] = useState(location?.state?.stateIndex ? location?.state?.stateIndex : 0);

  const handleChange = (event, newValue) => {

    setValue(newValue);
  };

  const styles = {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  };

  const handleDeleteProfilePic = () => {
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
          if (response?.response?.status === "SUCCESS") {
            const QUERY_DELETERESUME = {
              query: `mutation MyMutation {
              deleteResume
          }`,
              variables: null,
              operationName: "MyMutation",
            };
            gqlquery(QUERY_DELETERESUME, null)
              .then((res) => res.json())
              .then((datas) => {

                const QUERY_POSTCOMPANYPROFILEPIC = {
                  query: `mutation MyMutation {
                    updateProfilePicURL(profilePicURL: "${""}") {
                      about
                      additionalPhone1
                      profilePicURL
                    }
                  }`,
                  variables: null,
                  operationName: "MyMutation",
                };

                gqlquery(QUERY_POSTCOMPANYPROFILEPIC, null)
                  .then((res) => res.json())
                  .then((datas) => {

                    setImage(null);
                    if (datas?.data?.updateProfilePicURL) {
                      setOpen(true);
                      setDeleteProfilePicSuccess(true);
                      setHospitalImage(datas?.data?.updateProfilePicURL)
                      setBase64Image('data:image/png;base64,')
                      setDeleteModal(false)
                      // setAddPaperSnack(true);
                      // setOpen(true);
                      // setTimeout(handleSnackbar, 2000);
                      setUpdated(pre => !pre);
                    } else {
                      setOpen(true);
                      setDeleteProfilePicFailure(true);
                    }
                  })
                  .finally((e) => setIsLoadingProfileImg(false));

              });
          } else {
            // setOpen(true);
          }
        })
    }
  }

  const showNewTab = (tab) => {
    if (tab === "leftTab") {
      setValue((prev) => prev - 1);
    } else {
      setValue((prev) => prev + 1);
    }
  };

  return (
    <>
      {
        matches &&
        <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px", display: "flex", alignItems: "center" }}>
          <ArrowBackIosNewIcon sx={{ color: "var(--clr-blue-footer)", mr: 3.1 }} /><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>{hospital?.name}</Typography>
        </Box>
      }
      <Box maxWidth="md" sx={{ mx: "auto", px: matches ? "15px" : "", py: matches ? "20px" : "" }}>
        {
          !matches &&
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" sx={{ color: "var(--clr-blue-footer)" }} />}
            aria-label="breadcrumb"
            sx={{ py: 2, color: "#395987", fontWeight: "400" }}
          >
            <Link
              underline="hover"
              style={{ color: "var(--clr-blue-footer)" }}
              to="/hospital-dashboard"
            >
              Dashboard
            </Link>
            <Typography sx={{ color: "var(--clr-blue-footer)" }}>
              Company Profile
            </Typography>
            {/*  <Link underline="hover" color="inherit" onClick={(() => navigate("/"))} sx={{ cursor: "pointer" }}>
              Home
            </Link> */}
            {/* <Link underline="hover" color="inherit" href="/profile">
              Profile
            </Link> */}
            {/* <Link underline="hover" color="inherit" sx={{ cursor: "pointer" }}>
              Company Profile
            </Link> */}
            {/* <Typography color="text.primary">Company Profile</Typography> */}
          </Breadcrumbs>
        }
        <Box sx={{ mt: 2, mb: 6 }}>
          <Card sx={{
            borderRadius: "0.5rem",
            my: 2,
            boxShadow: matches ? "0px 0px 0px 0px" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
            border: matches && "1px solid #E4EEF5"
          }}
          >
            <Typography
              variant="h5"
              sx={{ mb: "0.825rem", fontWeight: "600", color: "#395987", marginLeft: !matches && '30px', p: matches && 1.25, fontSize: matches ? "18px" : "24px" }}
              gutterBottom
              component="div"
            >
              {hospitalDetails?.companyName || hospital?.name}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={12} sm={12} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "flexEnd",
                    p: matches ? 1.25 : 4.5,
                    gap: 2,
                  }}
                >
                  <Box sx={{ position: "relative", margin: "auto" }}>
                    {/* base64Image === "data:image/png;base64," ? ( */}
                    {!imageLoading ? 
                      (base64Image === 'data:image/png;base64,' ? (
                      <>
                        {isLoadingProfileImg ? (
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
                          <img
                            style={{ marginRight: "38px" }}
                            height="108px"
                            width="108px"
                            src={scletonImg}
                            alt="image_template"
                          />
                        )}
                      </>
                    ) : (
                      <>
                        {isLoadingProfileImg ? (
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
                            <img
                              className="proPics"
                              style={{ marginRight: "38px", }}
                              height="108px"
                              width="108px"
                              src={base64Image}
                              alt="image_template"
                            /> <div onClick={() => setDeleteModal(true)} className="propicDeleteIcon"><DeleteIcon sx={{ position: "absolute", right: 70, bottom: 40, color: "red", height: 50, width: 50 }} /></div>
                          </div>
                        )}
                      </>
                    )) : (
                      <Skeleton variant="rectangular" animation="wave" width="108px" height="108px" sx={{ borderRadius: 1, m: 0 }} />
                    )}

                    <Box
                      sx={{
                        position: "absolute",
                        bottom: -20,
                        right: 10,
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#FFFFFF",
                        padding: "3px",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {!imageLoading  && (
                        <label htmlFor="icon-button-file">
                          <Input
                            sx={{ display: "none" }}
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            onChange={handleUploadProfileImage}
                            onClick={(event) => {
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
                      )}
                    </Box>
                    {imgUploadError && <Snackbar open={openImg} autoHideDuration={6000} onClose={handleCloseImg}>
                      <Alert onClose={handleCloseImg} severity="error" sx={{ width: '100%' }}>
                        {imgUploadError}
                      </Alert>
                    </Snackbar>}
                  </Box>
                  <Modal
                    open={deleteModal}
                    onClose={() => setDeleteModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={matches ? styleResponsive : style}>
                      <Box sx={{ display: "flex", flexDirection: "column", }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography sx={{ color: "var(--clr-blue-footer)", fontWeight: "600", fontSize: "18px" }} variant="h6" component="h2">
                            {" "}
                          </Typography>
                          <CancelIcon style={{ color: "var(--clr-white-icon)" }} onClick={() => setDeleteModal(false)} />
                        </Box>
                        <Box sx={{ width: "85%" }}>
                          <Typography sx={{ color: 'red', fontWeight: 500, fontSize: '16px' }}>Are you sure want to delete profile picture !</Typography>
                          <Box sx={{ display: "flex", justifyContent: "right", gap: 2, py: 1 }}>
                            <Button
                              variant="outlined"
                              onClick={() => setDeleteModal(false)}
                              sx={{ borderRadius: 16, borderWidth: "2px !important" }}
                            >
                              cancel
                            </Button>
                            <Button
                              variant="contained"
                              className="save-btn"
                              onClick={handleDeleteProfilePic}
                              sx={{ borderRadius: 16 }}
                            >
                              Confirm
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Modal>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Box sx={{ p: matches ? 1.25 : 1 }}>
                  {!updateAbout ? (
                    <>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ color: "#395987", fontWeight: "600", fontSize: matches ? "18px" : "24px" }}
                        >
                          About
                        </Typography>
                        <Tooltip title="Edit About"> 
                          <IconButton sx={{ ml: "21px",mb: "5px", }} onClick={onClickUpdateAbout}>
                            <EditIcon
                              fontSize="small"
                              sx={{
                                color: "#5A98F2",
                                cursor: "pointer",
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Typography variant="body2" sx={{ color: "#4F4F4F" }}>
                        {hospitalDetails?.about?.split("<br />").map(item => (
                          <>
                            {item} <br />
                          </>
                        ))}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Box>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Update About<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            variant="outlined"
                            placeholder="About"
                            onChange={handleAboutChange}
                            onKeyDown={handleKeyDown}
                            defaultValue={hospitalDetails?.about?.replaceAll("<br />", "\n")}
                            id="aboutData"
                            size="small"
                            type="text"
                            fullWidth
                            multiline
                            rows={5}
                            disableUnderline
                            error={about === "" && errInput}
                            helpertext={error}
                            sx={{
                              color: "var(--clr-blue-footer)",
                              bgcolor: "#FFFFFF",
                              borderRadius: "4px",
                              mt: 0,
                            }}
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": {
                                  // padding: '10.5px 14px',
                                },
                                /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid var(--clr-blue-light)",
                                },
                                "&:hover": {
                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid var(--clr-blue-primary)",
                                  },
                                }, */
                              }
                            }}
                          />
                          {about === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                        </Box>
                        <Grid
                          item
                          direction={"column"}
                          xs={12}
                          md={12}
                          justifyContent="flex-end"
                          sx={{ display: "grid" }}
                        >
                          <CardContent>
                            <CardActions
                              sx={{
                                justifyContent: "flex-end",
                                gap: "1rem",
                                padding: 0,
                              }}
                            >
                              <Button
                                sx={{ borderRadius: "28px", fontWeight: "600" }}
                                variant="outlined"
                                onClick={handleCancelAboutUpdate}
                              >
                                Cancel
                              </Button>

                              <Button
                                sx={{ borderRadius: "28px", fontWeight: "600" }}
                                variant="contained"
                                onClick={(event) => handleUpdateAboutData(event, "onClick")}
                              >
                                Save
                              </Button>
                            </CardActions>
                          </CardContent>
                        </Grid>
                      </Box>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* ----------------------TAB VIEW------------- */}
          <Box maxWidth="md" sx={{ /* width: `${mobileView ? "90%" : "100%"}`, */ mx: "auto", }}>
            <Box sx={{ borderBottom: 1, borderColor: "var(--clr-blue-light)", color: "var(--clr-blue-footer)" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile={true}
                aria-label="basic tabs"
                textColor="inherit"
                TabIndicatorProps={{
                  sx: {
                    backgroundColor: "#F2B45A",
                    height: "4px",
                    borderBottom: 0,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,

                  },
                }}
                ScrollButtonComponent={(props) => {
            if (
              props.direction === "left"
            ) {
              return (
                <IconButton {...props}>
                  <ArrowBackIosNewIcon sx={{ fontSize: 12 }} onClick={() => showNewTab("leftTab")} />
                </IconButton>
              );
            } else if (
              props.direction === "right"
            ) {
              return (
                <IconButton {...props}>
                  <ArrowForwardIosIcon sx={{ fontSize: 12 }} onClick={() => showNewTab("rightTab")} />
                </IconButton>
              );
            } else {
              return null;
            }
          }}
              >
                <Tab style={{ fontWeight: 600, width: "auto !important" }} label="Gallery" key="Gallery" sx={styles} />
                <Tab style={{ fontWeight: 600, width: "auto !important" }} label="Account Details" key="Account Details" sx={[styles, { ml: 2 }]} />
                <Tab style={{ fontWeight: 600, width: "auto !important" }} label="Company Details" key="Company Details" sx={[styles, { ml: 2 }]} />
                <Tab style={{ fontWeight: 600, width: "auto !important" }} label="KYC Compliance Details" key="KYC Compliance Details" sx={[styles, { ml: 2 }]} />
                <Tab style={{ fontWeight: 600, width: "auto !important" }} label="Settings" key="Settings" sx={[styles, { ml: 2 }]} />
              </Tabs>

            </Box>

            {/* -----------------------ABOUT TAB-------------------- */}
            <TabPanel value={value} index={0} key={'Media'}>
              <AboutTab showUpdateAccountDetails={showUpdateAccountDetails} getUserNameAndEmail={getUserNameAndEmail} hospitalDetails={hospitalDetails} openAddModal={openAddModal} hanldeCloseAddModal={hanldeCloseAddModal}
                greenTick={greenTick} handleVerifyPhoneNumber={handleVerifyPhoneNumber} base64Image={base64Image} isLoadingProfileImg={isLoadingProfileImg} scletonImg={scletonImg} handleUploadProfileImage={handleUploadProfileImage} imgUploadError={imgUploadError} openImg={openImg} handleCloseImg={handleCloseImg} updateAbout={updateAbout} onClickUpdateAbout={onClickUpdateAbout} errInput={errInput} about={about} handleCancelAboutUpdate={handleCancelAboutUpdate} handleUpdateAboutData={handleUpdateAboutData} handleUploadHospitalImage={handleUploadHospitalImage} copyHospitalImages={copyHospitalImages} updateCompanyVideo={updateCompanyVideo} onClickUpdateCompanyVideo={onClickUpdateCompanyVideo} handleCompanyVideoChange={handleCompanyVideoChange} companyVideo={companyVideo} youtubeErrInput={youtubeErrInput} handleCancelCompanyVideoUpdate={handleCancelCompanyVideoUpdate} handleUpdateCompanyVideo={handleUpdateCompanyVideo} onClickUpdateAccountDetails={onClickUpdateAccountDetails} setOtpCode={setOtpCode} otpCode={otpCode} seconds={seconds} hanldeResetCountdown={hanldeResetCountdown} error={error} handleVerifyOTP={handleVerifyOTP} openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} phoneVerified={phoneVerified} resendCode={resendCode} otpError={otpError} handleAccountDetailsChange={handleAccountDetailsChange} updateAccountDeatils={updateAccountDeatils} handleCancelUpdateAccountDetails={handleCancelUpdateAccountDetails} handleUpdateAccountDetails={handleUpdateAccountDetails} mobileNumberError={mobileNumberError} onlyNumbers={onlyNumbers} firstOtpSentMessage={firstOtpSentMessage} handleKeyDown={handleKeyDown} handleAboutChange={handleAboutChange} isLoading={isLoading} Alert={Alert} InputUpload={InputUpload} matches={matches} style={style} />
            </TabPanel>

            {/* ------------------------ACCOUNT DETAILS------------------------ */}

            <TabPanel value={value} index={1} key={'Profile Details'}>
              <AccountDetails showUpdateAccountDetails={showUpdateAccountDetails} getUserNameAndEmail={getUserNameAndEmail} hospital={hospital} hospitalDetails={hospitalDetails} openAddModal={openAddModal} hanldeCloseAddModal={hanldeCloseAddModal}
                greenTick={greenTick} handleVerifyPhoneNumber={handleVerifyPhoneNumber} base64Image={base64Image} isLoadingProfileImg={isLoadingProfileImg} scletonImg={scletonImg} handleUploadProfileImage={handleUploadProfileImage} imgUploadError={imgUploadError} openImg={openImg} handleCloseImg={handleCloseImg} updateAbout={updateAbout} onClickUpdateAbout={onClickUpdateAbout} errInput={errInput} about={about} handleCancelAboutUpdate={handleCancelAboutUpdate} handleUpdateAboutData={handleUpdateAboutData} handleUploadHospitalImage={handleUploadHospitalImage} copyHospitalImages={copyHospitalImages} updateCompanyVideo={updateCompanyVideo} onClickUpdateCompanyVideo={onClickUpdateCompanyVideo} handleCompanyVideoChange={handleCompanyVideoChange} companyVideo={companyVideo} youtubeErrInput={youtubeErrInput} handleCancelCompanyVideoUpdate={handleCancelCompanyVideoUpdate} handleUpdateCompanyVideo={handleUpdateCompanyVideo} onClickUpdateAccountDetails={onClickUpdateAccountDetails} setOtpCode={setOtpCode} otpCode={otpCode} seconds={seconds} hanldeResetCountdown={hanldeResetCountdown} error={error} handleVerifyOTP={handleVerifyOTP} openSnackbar={openSnackbar} handleCloseSnackbar={handleCloseSnackbar} phoneVerified={phoneVerified} resendCode={resendCode} otpError={otpError} handleAccountDetailsChange={handleAccountDetailsChange} updateAccountDeatils={updateAccountDeatils} handleCancelUpdateAccountDetails={handleCancelUpdateAccountDetails} handleUpdateAccountDetails={handleUpdateAccountDetails} mobileNumberError={mobileNumberError} onlyNumbers={onlyNumbers} firstOtpSentMessage={firstOtpSentMessage} handleKeyDown={handleKeyDown} handleAboutChange={handleAboutChange} isLoading={isLoading} Alert={Alert} InputUpload={InputUpload} matches={matches} style={style} />
            </TabPanel>

            {/* -----------------------------------COMPANY DETAILS------------------ */}

            <TabPanel value={value} index={2} key={'Company Details'}>
              <CompanyDetailsTab showUpdateCompanyDetails={showUpdateCompanyDetails} hospital={hospital} hospitalDetails={hospitalDetails} onClickUpdateCompanyDetails={onClickUpdateCompanyDetails} BootstrapInput={BootstrapInput} handleCompanyDetailsChange={handleCompanyDetailsChange} handleUpdateCompanyDetails={handleUpdateCompanyDetails} updateCompanyDetails={updateCompanyDetails} error={error} errInput={errInput} mobileNumberError={mobileNumberError} onlyNumbers={onlyNumbers} handleCancelUpdateCompanyDetails={handleCancelUpdateCompanyDetails} matches={matches} regex={regex} errUrl={errUrl} SelectPlaceholder={SelectPlaceholder} />
            </TabPanel>

            {/* --------------------------------------KYC DETAILS--------------------- */}

            <TabPanel value={value} index={3} key={'Billing Details'}>
              <KYCDetials showUpdateKYCComplianceDetails={showUpdateKYCComplianceDetails} hospital={hospital} hospitalDetails={hospitalDetails} onClickUpdateKYCComplianceDetails={onClickUpdateKYCComplianceDetails} handleKYCComplianceDetailsChange={handleKYCComplianceDetailsChange} handleUpdateKYCComplianceDetails={handleUpdateKYCComplianceDetails} onlyNumbers={onlyNumbers} updateKycComplianceDetails={updateKycComplianceDetails} matches={matches} errInput={errInput} error={error} validPinNumErr={validPinNumErr} gstRegex={gstRegex} validGstin={validGstin} handleCancelUpdateKYCComplianceDetails={handleCancelUpdateKYCComplianceDetails}  SelectPlaceholder={SelectPlaceholder} setUpdateKycComplianceDetails={setUpdateKycComplianceDetails} SearchPresentCity={SearchPresentCity} allState={allState} allCityLocation={allCityLocation} />
            </TabPanel>

            {/* --------------------------------------Settings--------------------- */}

            <TabPanel value={value} index={4} key={'Settings'}>
              <CompanySettings matches={matches} hospital={hospital} adminHospitalData={adminHospitalData} updateList={setUpdateList} />
            </TabPanel>

          </Box>
        </Box>

        {(addProfilePicSuccess || updateAboutSuccess || companyPicAddSuccess || companyVideoAddSuccess || updateAccountDetailsSuccess || updateCompanyDetailsSuccess || updateKYCComplianceDetailsSuccess || deleteProfilePicSuccess) && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar} >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }} >
              {addProfilePicSuccess && "Profile picture updated successfully."}
              {updateAboutSuccess && "Company about updated successfully."}
              {companyPicAddSuccess && "Company gallery image updated successfully."}
              {companyVideoAddSuccess && "Company video updated successfully."}
              {updateAccountDetailsSuccess && "Account details updated successfully."}
              {updateCompanyDetailsSuccess && "Company details updated successfully."}
              {updateKYCComplianceDetailsSuccess && "Company KYC compliance details updated successfully."}
              {deleteProfilePicSuccess && "Profile picture deleted successfully."}
            </Alert>
          </Snackbar>
        )}
        {(addProfilePicFailure || deleteProfilePicFailure || updateAboutFailure || companyPicAddFailure || companyVideoAddFailure || updateAccountDetailsFailure || updateCompanyDetailsFailure || updateKYCComplianceDetailsFailure) && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar} >
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }} >
              Operation failed. Please try again.
            </Alert>
          </Snackbar>
        )}
      </Box>
    </>
  );
};

export default CompanyProfile;