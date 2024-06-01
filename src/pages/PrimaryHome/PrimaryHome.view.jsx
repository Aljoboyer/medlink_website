import { styled } from "@material-ui/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import illustrationSvg from "../../assets/images/illustration.svg";
import element from "../../assets/images/element.svg";
import elementCustomer from "../../assets/images/footerEelement.svg";
import IconSlider from "../../assets/images/Icons.svg";
import IconSlider2 from "../../assets/images/icon2.svg";
import IconSlider3 from "../../assets/images/icon3.svg";
import Vector from "../../assets/images/Vector.svg";
import backgroundImageForLandingPage from "../../assets/images/backgroundImageForLandingPage.png";
import bgelement from "../../assets/images/bg element (1).svg";
import frame1 from "../../assets/images/Frame (1).png";
import frame2 from "../../assets/images/Frame (2).png";
import frame3 from "../../assets/images/Frame (3).png";
import AashlokHospital from "../../assets/images/Aashlok.png";
import AnkuraHospital from "../../assets/images/Ankura.png";
import IrisHospital from "../../assets/images/Iris.png";
import JaslokHospital from "../../assets/images/Jaslok.png";
import ShalbyHospitals from "../../assets/images/Shalby.png";
import YashodaHospitals from "../../assets/images/Yashoda Hospital.png";
import AddCircleOutlineOutlined from "../../assets/images/AddCircleOutlineOutlined.svg";
import CheckOutlined from "../../assets/images/CheckOutlined.svg";
import JobSeeker_Vector1Converted1 from "../../assets/images/JobSeeker_Vector (1) [Converted] 1.svg";
import Illustration from "../../assets/images/Illustration.png";
import SubscribeWithMedlink from "../../assets/images/aboutUsImage.svg";
import googlePlayBadge1 from "../../assets/images/google-play-badge (1) 1.svg";
import appleStoreBadge1 from "../../assets/images/google-play-badge (1) 2.svg";
import forRecruiters from "../../assets/images/forRecruiters.svg";
import trafalgarHeaderIllustration1 from "../../assets/images/trafalgar-header illustration 1.png";
import trafalgarIllustrationSec031 from "../../assets/images/trafalgar-illustration sec03 1.png";
import useAuth from "../../hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper";
import "./styles.css";
import { gqlOpenQuery } from "../../api/index";
// import lottie from 'lottie-web';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label:
      "MedLink is a very ethical organization which works well as an extension of an internal recruiting team. MedLink would truly be an asset to any organization looking to grow their organization quickly with a trust worthy agency. One of MedLink strengths was building strong relationships with their candidates and with their clients.  I would highly recommend MedLink!",
    name: "Chief Operating Officer",
    position: "Siddarth Gastro Hospital",
    imgPath: `${frame1}`,
  },
  {
    label:
      "The experience I have had with MedLink has always been positive. In two separate occasions, when applying for a job there the result was that I got hired on both of them. I couldn't be more grateful with their service.",
    name: "Dr. Srinivas Jupally",
    position: "",
    imgPath: `${frame2}`,
  },
  {
    label:
      "MedLink assisted us in filling all of our current openings with the best talent available to physicians, surgeons, nurses and paramedical professionals. This access to job seeker profiles will give us a wider approach in finding the right match for our healthcare companies. We would love to seek help from you on all upcoming jobs openings that we might have!",
    name: "Head HR",
    position: "Srujana Multi-Speciality Hospital",
    imgPath: `${frame3}`,
  },
  {
    label:
      "We were in a rapid growth phase in our healthcare company and needed to hire rapidly but control costs. By working with MedLink exclusively, we reduced recruiting costs by 20%—the platform allowed us to set monthly hiring targets and they delivered!",
    name: "CEO",
    position: "Sairam Speciality Hospital",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

const images1 = [
  {
    imgPath: `${IconSlider}`,
  },
  {
    imgPath: `${IconSlider2}`,
  },
  {
    imgPath: `${IconSlider3}`,
  },
];

const exploreTopCompanies = [
  {
    id: 1,
    img: `${YashodaHospitals}`,
    Title: "Yashoda Hospitals",
    des: "Yashoda Hospitals",
  },
  {
    id: 2,
    img: `${JaslokHospital}`,
    Title: "Jaslok Hospital",
    des: "Jaslok Hospital",
  },
  {
    id: 3,
    img: `${ShalbyHospitals}`,
    Title: "Shalby Hospitals",
    des: "Shalby Hospitals",
  },
  {
    id: 4,
    img: `${IrisHospital}`,
    Title: "Iris Hospital",
    des: "Iris Hospital",
  },
  {
    id: 5,
    img: `${AashlokHospital}`,
    Title: "Aashlok Hospital",
    des: "Aashlok Hospital",
  },
  {
    id: 6,
    img: `${AnkuraHospital}`,
    Title: "Ankura Hospital",
    des: "Ankura Hospital",
  }
];

const SearchButton = styled(Button)(() => ({
  color: "var(--clr-white) !important",
}));
const PrimaryHome = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { jobSearch, setJobSearch } = useAuth();
  const [values, setValues] = useState({
    jobTitle: "",
    location: "",
    specialization: "",
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  document.title = "MedLink Jobs";
  const [allCityLocation, setAllCityLocation] = useState([]);
  const [allSpecialty, setAllSpecialty] = useState([]);
  const [errInput, setErrInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setJobSearch({ ...jobSearch, [prop]: event.target.value });
  };
  console.log(45424, jobSearch);
  const SearchLocation = (event) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val;

    if (
      event.target.value &&
      event.target.value !== " " &&
      event.target.value !== "" &&
      valtwo >= 2
    ) {
      const GET_CITY = {
        query: `query MyQuery {
          searchCity(city: "${event.target.value}") {
            city
            cityWithState
            country
            lmID
            state
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };

      gqlOpenQuery(GET_CITY, null)
        .then((res) => res.json())
        .then((datas) => {
          setAllCityLocation([...datas?.data?.searchCity]);
          // console.log('this is search data', datas)
        });
    }
  };
  const SearchSpecialty = (event) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val;

    if (
      event.target.value &&
      event.target.value !== " " &&
      event.target.value !== "" &&
      valtwo >= 2
    ) {
      const GET_SPECIALTY = {
        query: `query MyQuery {
          searchSpecialty(specialty: "${event.target.value}") {
            specialty
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };

      gqlOpenQuery(GET_SPECIALTY, null)
        .then((res) => res.json())
        .then((datas) => {
          setAllSpecialty([...datas?.data?.searchSpecialty]);
          // console.log('this is search data', datas)
        });
    }
  };

  values.jobTitle = values.jobTitle.replace(/  +/g, " ");
  let resText = /^[a-zA-Z ]*$/;

  const handleJobsSearch = (e) => {
    e.preventDefault();
    if (
      values.jobTitle === "" ||
      values.jobTitle === " " ||
      resText.test(values.jobTitle) === false
    ) {
      setErrInput("Please enter keyword.");
      setError("This field accept only Alphabets.");
    } else {
      const handleNavigate = () => {
        navigate("/job-search-list", {
          state: { ...values, location: values.location.split(", ")[0] },
        });
      };
      setTimeout(handleNavigate, 1000);
      setErrInput("");
      setError("");
    }
  };

  const handleNavigate = (param) => {
    const prop = "jobTitle";
    setJobSearch({ ...jobSearch, [prop]: param });
    navigate("/job-search-list");
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  // const container = useRef(null)

  // useEffect(() => {
  //   lottie.loadAnimation({
  //     container: container.current,
  //     renderer: 'svg',
  //     loop: true,
  //     autoplay: true,
  //     animationData: require('./HomeLottieAnimation.json')
  //   })
  // }, [])

  return (
    <Box>
      <div
        style={{
          backgroundImage: !matches && `url(${backgroundImageForLandingPage})`,
          // backgroundColor: "#F1F8FF",
          height: !matches && "585px",
          backgroundPosition: "center",
          backgroundRepeat: !matches && "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box
          maxWidth="980px"
          sx={{ mx: "auto", textAlign: matches && "center" }}
        >
          <Typography
            sx={{
              fontSize: matches ? "20px" : "40px",
              fontWeight: "600",
              color: "#4F4F4F",
              textAlign: "center",
              pt: "36px",
            }}
          >
            Search Jobs on the{" "}
            <span style={{ color: "#5A98F2" }}>Go!</span>
          </Typography>
          <Box /* maxWidth="xl" */ sx={{ pt: matches ? "26px" : "47px" }}>
            {!matches ? (
              <>
                <form onSubmit={handleJobsSearch} style={{ display: "flex" }}>
                  {/* <Input
                    sx={{
                      borderRadius: "100px",
                      padding: "12px 14px 12px 30px  !important",
                      // py: "2 !important",
                      boxShadow: "0px 8px 18px rgba(69, 143, 246, 0.13)",
                      width: "27%",
                      border: "1px solid rgba(69, 143, 246, 0.5) !important",
                    }}
                    disableUnderline
                    fullWidth
                    name="jobTitle"
                    onChange={handleChange("jobTitle")}
                    placeholder="Enter Keyword"
                  /> */}
                  <TextField
                        variant="outlined"
                        disableUnderline
                        fullWidth
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": { 
                              padding: '19px 14px 19px 30px',
                              backgroundColor: "white",
                              borderRadius: "100px",
                              // border: "1px solid rgba(69, 143, 246, 0.5)"
                            },
                           /*  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-light)",
                              borderRadius: "100px",
                            },
                            "&:hover": {
                              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                border: "1px solid var(--clr-blue-primary)",
                                borderRadius: "100px",
                              },
                            }, */
                          }
                        }}
                        size="small"
                        placeholder="Enter Keyword"
                        value={values.jobTitle}
                        onChange={handleChange("jobTitle")}
                        sx={{
                          width: "28%", 
                          backgroundColor: "white", 
                          borderRadius: '100px',
                          // border: "1px solid rgba(69, 143, 246, 0.5)", 
                        '& fieldset': {
                          borderRadius: '100px',
                        }
                        }}
                        inputProps={{
                          maxLength: 100,
                        }}
                      />
                  <Autocomplete
                    disablePortal
                    noOptionsText={"Start typing"}
                    id="combo-box-demo"
                    sx={{
                      "& .MuiAutocomplete-inputRoot": {
                        padding: "12.3px 14px 12.3px 14px  !important",
                        borderRadius: "100px",
                      },
                      width: "27%",
                      boxShadow: "0px 8px 18px rgba(69, 143, 246, 0.13)",
                      borderRadius: "100px",
                      // border: "1px solid rgba(69, 143, 246, 0.5) !important",
                      backgroundColor: "white",
                      mr: "12px",
                      ml: "12px",
                    }}
                    onChange={(event, val, params) => {
                      setValues({ ...values, specialization: val });
                      setJobSearch({ ...jobSearch, specialization: val });
                    }}
                    options={allSpecialty?.map((option) => option.specialty)}
                    renderInput={(params) => (
                      <TextField
                        onChange={(e) => {
                          SearchSpecialty(e);
                        }}
                        placeholder="Select Profession"
                        {...params}
                      />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    noOptionsText={"Start typing"}
                    id="combo-box-demo"
                    sx={{
                      "& .MuiAutocomplete-inputRoot": {
                        padding: "12.3px 14px 12.3px 14px  !important",
                        borderRadius: "100px",
                      },
                      width: "27%",
                      boxShadow: "0px 8px 18px rgba(69, 143, 246, 0.13)",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      // border: "1px solid rgba(69, 143, 246, 0.5) !important",
                      mr: "12px",
                    }}
                    onChange={(event, val, params) => {
                      setValues({ ...values, location: val });
                      setJobSearch({ ...jobSearch, location: val });
                    }}
                    options={allCityLocation?.map(
                      (option) => option.cityWithState
                    )}
                    renderInput={(params) => (
                      <TextField
                        onChange={(e) => {
                          SearchLocation(e);
                        }}
                        placeholder="Select Location"
                        {...params}
                      />
                    )}
                  />
                  <Box sx={{ width: "19%" }}>
                    <SearchButton
                      type="submit"
                      color="primary"
                      variant="contained"
                      edge="end"
                      size="large"
                      sx={{
                        color: "white",
                        borderRadius: "100px",
                        padding: "16.7px 59px 16.7px 59px  !important",
                        fontWeight: "400 !important",
                      }}
                    >
                      Search
                    </SearchButton>
                  </Box>
                </form>
                {values.jobTitle === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {errInput}
                  </FormHelperText>
                )}
                {values.jobTitle !== "" &&
                  (values.jobTitle === " " ||
                    resText.test(values.jobTitle) === false) && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
              </>
            ) : (
              <>
                <div>
                  <Box maxWidth="md" sx={{ mx: "auto", px: "12px" }}>
                    <form onSubmit={handleJobsSearch}>
                      {/* <Input
                            sx={{
                              mt: "6px",
                              borderRadius: "32px",
                              padding: "12px 14px 12px 30px  !important",
                              py: "2 !important",
                              boxShadow: "0px 8px 18px rgba(69, 143, 246, 0.13)",
                              width: "100%",
                              border:
                                "1px solid rgba(69, 143, 246, 0.5) !important",
                            }}
                            disableUnderline
                            fullWidth
                            name="jobTitle"
                            onChange={handleChange("jobTitle")}
                            placeholder="Enter Keyword"
                          /> */}
                      <TextField
                        variant="outlined"
                        disableUnderline
                        fullWidth
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": {
                              padding: "16.5px 14px 16.5px 22px",
                              backgroundColor: "white",
                              borderRadius: "100px",
                            },
                           /*  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-light)",
                              borderRadius: "100px",
                            },
                            "&:hover": {
                              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                border: "1px solid var(--clr-blue-primary)",
                                borderRadius: "100px",
                              },
                            }, */
                          },
                        }}
                        size="small"
                        placeholder="Enter Keyword"
                        value={values.jobTitle}
                        onChange={handleChange("jobTitle")}
                        onKeyDown={handleJobsSearch}
                        sx={{
                          // border: "1px solid rgba(69, 143, 246, 0.5)!important",
                          borderRadius: "100px",
                          width: "100%",
                          backgroundColor: "white",
                          boxShadow: "0px 8px 18px rgba(69, 143, 246, 0.13)",
                          '& fieldset': {
                            borderRadius: '100px',
                          },
                        }}
                      />
                      {values.jobTitle === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {errInput}
                        </FormHelperText>
                      )}
                      {values.jobTitle !== "" && values.jobTitle === " " && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {errInput}
                        </FormHelperText>
                      )}
                      <Autocomplete
                        disablePortal
                        noOptionsText={"Start typing"}
                        id="combo-box-demo"
                        sx={{
                          "& .MuiAutocomplete-inputRoot": {
                            padding: "10px 14px 10px 14px  !important",
                            borderRadius: "32px",
                            // border: "1px solid rgba(69, 143, 246, 0.5) !important",
                            boxShadow: "0px 8px 18px rgba(69, 143, 246, 0.13)",
                            width: "100%",
                            mt: "9px",
                            backgroundColor: "white",
                          },
                        }}
                        onChange={(event, val, params) => {
                          setValues({ ...values, specialization: val });
                          setJobSearch({ ...jobSearch, specialization: val });
                        }}
                        options={allSpecialty?.map(
                          (option) => option.specialty
                        )}
                        renderInput={(params) => (
                          <TextField
                            onChange={(e) => {
                              SearchSpecialty(e);
                            }}
                            placeholder="Select Profession"
                            {...params}
                          />
                        )}
                      />
                      <Autocomplete
                        disablePortal
                        noOptionsText={"Start typing"}
                        id="combo-box-demo"
                        sx={{
                          "& .MuiAutocomplete-inputRoot": {
                            padding: "10px 14px 10px 14px  !important",
                            borderRadius: "32px",
                            // border: "1px solid rgba(69, 143, 246, 0.5) !important",
                            boxShadow: "0px 8px 18px rgba(69, 143, 246, 0.13)",
                            width: "100%",
                            mt: "16px",
                            backgroundColor: "white",
                          },
                        }}
                        onChange={(event, val, params) => {
                          setValues({ ...values, location: val });
                          setJobSearch({ ...jobSearch, location: val });
                        }}
                        options={allCityLocation?.map(
                          (option) => option.cityWithState
                        )}
                        renderInput={(params) => (
                          <TextField
                            onChange={(e) => {
                              SearchLocation(e);
                            }}
                            placeholder="Select Location"
                            {...params}
                          />
                        )}
                      />
                      <SearchButton
                        type="submit"
                        color="primary"
                        variant="contained"
                        edge="end"
                        size="large"
                        sx={{
                          color: "white",
                          borderRadius: 16,
                          p: "12px 34px",
                          fontWeight: "400 !important",
                          width: "40%",
                          mt: "28px",
                        }}
                      >
                        Search
                      </SearchButton>
                    </form>
                  </Box>
                </div>
              </>
            )}
          </Box>
          {!matches && (
            <Box>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "20px",
                  fontWeight: "600",
                  textAlign: "center",
                  mt: "100px",
                }}
              >
                Popular searches:
              </Typography>
              <div
                style={{
                  display: "flex",
                  marginTop: "30px",
                  flexWrap: "wrap",
                  // overflowWrap: "break-word",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  onClick={() => handleNavigate("General Surgeon")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#888888",
                    fontSize: "13px",
                    fontWeight: "400",
                    cursor: "pointer",
                    padding: "10px 16px 10px 16px",
                    border: "1px solid rgba(69, 143, 246, 0.2)",
                    borderRadius: "200px",
                    marginRight: "6px",
                    marginBottom: "24px",
                  }}
                >
                  General Surgeon
                </Typography>
                <Typography
                  onClick={() => handleNavigate("Obstetrician / Gynecologist")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#888888",
                    fontSize: "13px",
                    fontWeight: "400",
                    cursor: "pointer",
                    padding: "10px 16px 10px 16px",
                    border: "1px solid rgba(69, 143, 246, 0.2)",
                    borderRadius: "200px",
                    marginRight: "6px",
                    marginBottom: "24px",
                  }}
                >
                  Obstetrician / Gynecologist
                </Typography>
                <Typography
                  onClick={() => handleNavigate("Cardiologist")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#888888",
                    fontSize: "13px",
                    fontWeight: "400",
                    cursor: "pointer",
                    padding: "10px 16px 10px 16px",
                    border: "1px solid rgba(69, 143, 246, 0.2)",
                    borderRadius: "200px",
                    marginRight: "6px",
                    marginBottom: "24px",
                  }}
                >
                  Cardiologist
                </Typography>
                <Typography
                  onClick={() => handleNavigate("Microbiology")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#888888",
                    fontSize: "13px",
                    fontWeight: "400",
                    cursor: "pointer",
                    padding: "10px 16px 10px 16px",
                    border: "1px solid rgba(69, 143, 246, 0.2)",
                    borderRadius: "200px",
                    marginRight: "6px",
                    marginBottom: "24px",
                  }}
                >
                  Microbiology
                </Typography>
                <Typography
                  onClick={() => handleNavigate("Obstetrician / Gynecologist")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#888888",
                    fontSize: "13px",
                    fontWeight: "400",
                    cursor: "pointer",
                    padding: "10px 16px 10px 16px",
                    border: "1px solid rgba(69, 143, 246, 0.2)",
                    borderRadius: "200px",
                    marginRight: "6px",
                    marginBottom: "24px",
                  }}
                >
                  Obstetrician / Gynecologist
                </Typography>
                <Typography
                  onClick={() => handleNavigate("Cardiologist")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#888888",
                    fontSize: "13px",
                    fontWeight: "400",
                    cursor: "pointer",
                    padding: "10px 16px 10px 16px",
                    border: "1px solid rgba(69, 143, 246, 0.2)",
                    borderRadius: "200px",
                    marginRight: "6px",
                    marginBottom: "24px",
                  }}
                >
                  Cardiologist
                </Typography>
                <Typography
                  onClick={() => handleNavigate("Microbiology")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#888888",
                    fontSize: "13px",
                    fontWeight: "400",
                    cursor: "pointer",
                    padding: "10px 16px 10px 16px",
                    border: "1px solid rgba(69, 143, 246, 0.2)",
                    borderRadius: "200px",
                    marginRight: "6px",
                    marginBottom: "24px",
                  }}
                >
                  Microbiology
                </Typography>
                <Typography
                  onClick={() => handleNavigate("Microbiology")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#888888",
                    fontSize: "13px",
                    fontWeight: "400",
                    cursor: "pointer",
                    padding: "10px 16px 10px 16px",
                    border: "1px solid rgba(69, 143, 246, 0.2)",
                    borderRadius: "200px",
                    marginRight: "6px",
                    marginBottom: "24px",
                  }}
                >
                  Microbiology
                </Typography>
                <Typography
                  onClick={() => handleNavigate("General Surgeon")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#888888",
                    fontSize: "13px",
                    fontWeight: "400",
                    cursor: "pointer",
                    padding: "10px 16px 10px 16px",
                    border: "1px solid rgba(69, 143, 246, 0.2)",
                    borderRadius: "200px",
                    marginRight: "6px",
                    marginBottom: "24px",
                  }}
                >
                  General Surgeon
                </Typography>
                <Typography
                  onClick={() => handleNavigate("Obstetrician / Gynecologist")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#888888",
                    fontSize: "13px",
                    fontWeight: "400",
                    cursor: "pointer",
                    padding: "10px 16px 10px 16px",
                    border: "1px solid rgba(69, 143, 246, 0.2)",
                    borderRadius: "200px",
                    marginRight: "6px",
                    marginBottom: "24px",
                  }}
                >
                  Obstetrician / Gynecologist
                </Typography>
                <Typography
                  onClick={() => handleNavigate("Cardiologist")}
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#888888",
                    fontSize: "13px",
                    fontWeight: "400",
                    cursor: "pointer",
                    padding: "10px 16px 10px 16px",
                    border: "1px solid rgba(69, 143, 246, 0.2)",
                    borderRadius: "200px",
                    marginRight: "6px",
                    marginBottom: "24px",
                  }}
                >
                  Cardiologist
                </Typography>
              </div>
            </Box>
          )}
        </Box>
      </div>
      <Grid container spacing={1.5} sx={{ pt: matches && "65px" }}>
        <Grid item xs={12} sm={12} md={6}>
          {/* {!matches && (
            <Box sx={{ pt: "55px" }}>
              <img
                style={{
                  width: "115px",
                  height: "107px",
                }}
                src={element}
                alt="Home-page-element"
              />
            </Box>
          )} */}
          <Box
            sx={{
              backgroundImage: matches && `url(${element})`,
              backgroundRepeat: matches && "no-repeat",
              backgroundPosition: matches && "0% 25%",
            }}
          >
            <Box
              sx={{
                pl: matches ? "28px" : "60px",
                pt: matches ? "0px" : "161px",
                pr: matches ? "28px" : "5px",
              }}
            >
              <Typography
                sx={{
                  fontSize: matches ? "24px" : "48px",
                  fontWeight: "600",
                  color: "#4F4F4F",
                  textAlign: matches && "center",
                }}
              >
                It's Time to Revolutionize Healthcare{" "}
                <span style={{ color: "#5A98F2" }}>Recruitment!</span>
              </Typography>
              <Typography
                sx={{
                  fontSize: matches ? "18px" : "21px",
                  fontWeight: "600",
                  color: "#395987",
                  pt: matches ? "12px" : "18px",
                  textAlign: matches && "center",
                }}
              >
                Move beyond the tiring hiring process in healthcare! With MedLink, explore the top healthcare companies currently hiring, filter your search according to your requirements, and land your favorite job with a few simple steps.  
              </Typography>
              <Box sx={{ pt: matches ? "20px" : "46px" }}>
                <a
                  href="https://play.google.com/store/apps"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    style={{
                      width: matches ? "123px" : "170px",
                      height: matches ? "36px" : "54px",
                    }}
                    src={googlePlayBadge1}
                    alt="google play store link"
                  />
                </a>
                <a
                  style={{ paddingLeft: matches ? "14px" : "24px" }}
                  href="https://apps.apple.com/us/app"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    style={{
                      width: matches ? "123px" : "170px",
                      height: matches ? "36px" : "54px",
                    }}
                    src={appleStoreBadge1}
                    alt="apple app store link"
                  />
                </a>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={0} sm={0} md={1}></Grid>
        <Grid item xs={12} sm={12} md={5}>
          {/* <div className="container" ref={container}></div> */}
          <img
            style={{
              width: "100%",
              height: matches ? "100%" : "598px",
              paddingLeft: matches && "30px",
              paddingRight: matches && "30px",
              paddingTop: matches && "18px",
              paddingBottom: matches && "44px",
            }}
            src={illustrationSvg}
            alt="Home-page-header-pic"
          />
        </Grid>
      </Grid>

      <section
        style={{
          backgroundImage: !matches && `url(${bgelement})`,
          backgroundRepeat: !matches && "no-repeat",
          backgroundPosition: !matches && "0% 25%",
        }}
      >
        <section
          style={{
            backgroundImage: `url(${element})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: matches ? "95% 19%" : "83% 42%",
          }}
        >
          {/*--------------- Explore top companies hiring now----------------*/}
          <Box sx={{ mt: matches ? "62px" : "90px" }}>
            <Typography
              sx={{
                fontSize: matches ? "22px" : "36px",
                fontWeight: "700",
                color: "#000000",
                textAlign: "center",
                mb: matches ? "20px" : "26px",
              }}
            >
              Explore top companies hiring now
            </Typography>
            {!matches ? (
              <Divider
                sx={{
                  width: "56px",
                  borderBottom: "2px solid #000000",
                  borderRadius: "5px",
                  m: "auto",
                }}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Divider
                  sx={{
                    width: "56px",
                    borderBottom: "2px solid #000000",
                    borderRadius: "5px",
                    ml: "-110px",
                  }}
                />
              </Box>
            )}
            {!matches ? (
              <Box sx={{ px: "134px", mt: "72px" }}>
                <Swiper
                  slidesPerView={5}
                  spaceBetween={35}
                  slidesPerGroup={1}
                  loop={true}
                  loopFillGroupWithBlank={true}
                  // pagination={{
                  // clickable: true,
                  // }}
                  navigation={true}
                  modules={[/* Pagination, */ Navigation]}
                  // className="mySwiper"
                  style={{
                    "--swiper-navigation-size": "18px",
                  }}
                >
                  {exploreTopCompanies?.map((exploreTopCompanie) => (
                    <SwiperSlide>
                      <Box
                        sx={{
                          boxShadow: "5px 12px 19px rgba(229, 233, 246, 0.3)",
                          borderRadius: "20px",
                          justifyContent: "center",
                          my: 4,
                          height: "210px",
                          width: "244px",
                        }}
                      >
                        <Box
                          sx={{
                            paddingTop: "44px",
                            paddingBottom: "20px",
                            paddingRight: "78px",
                            paddingLeft: "78px",
                          }}
                        >
                          <img
                            // style={{ width: "88.54px", height: "88.54px" }}
                            src={exploreTopCompanie?.img}
                          />
                        </Box>
                        <Typography
                          sx={{ fontSize: "18px", fontWeight: "700" }}
                        >
                          {exploreTopCompanie?.Title}
                        </Typography>
                        {/* <Button
                          sx={{
                            color: "#4089ED",
                            fontWeight: "600",
                            fontSize: "17px",
                            // px: "30px",
                            pt: "17px",
                            pb: "30px",
                          }}
                          variant="text"
                          endIcon={<ArrowRightAltIcon />}
                        >
                          View Now
                        </Button> */}
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            ) : (
              <Box sx={{ px: "17px", mt: "37px" }}>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  slidesPerGroup={1}
                  loop={true}
                  loopFillGroupWithBlank={true}
                  // pagination={{
                  // clickable: true,
                  // }}
                  navigation={true}
                  modules={[/* Pagination, */ Navigation]}
                  // className="mySwiper"
                  style={{
                    "--swiper-navigation-size": "12px",
                  }}
                >
                  {exploreTopCompanies?.map((exploreTopCompanie) => (
                    <SwiperSlide>
                      <Box
                        sx={{
                          boxShadow: "5px 12px 19px rgba(229, 233, 246, 0.3)",
                          borderRadius: "20px",
                          justifyContent: "center",
                          my: 2,
                          height: "135px",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            paddingTop: "21px",
                            paddingBottom: "8px",
                            paddingRight: "42px",
                            paddingLeft: "42px",
                          }}
                        >
                          <img
                            style={{ width: "42px", height: "42px" }}
                            src={exploreTopCompanie?.img}
                          />
                        </Box>
                        <Typography
                          sx={{ fontSize: "13px", fontWeight: "700" }}
                        >
                          {exploreTopCompanie?.Title}
                        </Typography>
                        {/* <Button
                          sx={{
                            color: "#4089ED",
                            fontWeight: "600",
                            fontSize: "12px",
                            // px: "30px",
                            pt: "7px",
                            pb: "14px",
                          }}
                          variant="text"
                          endIcon={<ArrowRightAltIcon />}
                        >
                          View Now
                        </Button> */}
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            )}
          </Box>

          {/*--------------- Welcome ----------------*/}
          <Box
            sx={{
              mt: !matches ? "133px" : "71px",
              backgroundImage: !matches && `url(${element})`,
              backgroundRepeat: !matches && "no-repeat",
              backgroundPosition: !matches && "93% 98%",
            }}
          >
            <Typography
              sx={{
                fontSize: matches ? "25px" : "40px",
                fontWeight: "700",
                color: "#395987",
                textAlign: "center",
                mb: matches ? "19px" : "14px",
              }}
            >
              Welcome!
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Divider
                sx={{
                  width: "220px",
                  borderBottom: "4px solid #5A98F2",
                  borderRadius: "10px 10px 0px 0px",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Divider
                sx={{
                  width: "80px",
                  borderBottom: "4px solid #F2B45A",
                  borderRadius: "0px 0px 10px 10px",
                  mt: "-0.5px",
                  mr: "140px",
                }}
              />
            </Box>

            <Grid
              container
              spacing={1.5}
              sx={{ mt: matches ? "15px" : "120px" }}
            >
              <Grid item xs={12} sm={12} md={5.7}>
                <Box
                  sx={{
                    pl: matches ? "29px" : "107px",
                    pr: matches ? "25px" : "90px",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src={JobSeeker_Vector1Converted1}
                    alt="JobSeeker_Vector1Converted1"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6.3}>
                <Box
                  sx={{
                    display: "flex",
                    pt: "6px",
                    pl: matches && "29px",
                    pr: matches && "25px",
                    backgroundImage: matches && `url(${element})`,
                    backgroundRepeat: matches && "no-repeat",
                    backgroundPosition: matches && "right bottom",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#395987",
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      WELCOME TO THE SIMPLEST HEALTHCARE JOB-SEARCH PORTAL - MEDLINK
                    </Typography>

                    <Typography
                      sx={{
                        pt: "20px",
                        color: "#6F7482",
                        fontSize: "18px",
                        fontWeight: "300",
                      }}
                    >
                      <i>The need for quality medical professionals is never ending and is set to grow exponentially in the upcoming years.</i>
                    </Typography>
                    <Typography
                      sx={{
                        pt: "20px",
                        color: "#6F7482",
                        fontSize: "18px",
                        fontWeight: "300",
                      }}
                    >
                      A recent WHO report mentions that India needs at least 1.8 million doctors, nurses and midwives to achieve the minimum threshold of 44.5 health workers per 10,000 population in 2030 (The Decade for Health Workforce Strengthening in the SEA Region 2015-2024: mid-term review of progress, 2020 <a style={{wordBreak:"break-word"}} href="https://apps.who.int/iris/handle/10665/333611">https://apps.who.int/iris/handle/10665/333611).</a>
                    </Typography>
                    <Typography
                      sx={{
                        pt: "20px",
                        color: "#6F7482",
                        fontSize: "18px",
                        fontWeight: "300",
                      }}
                    >
                      The statistics indicate the enormous need for qualified medical professionals in the upcoming years. MedLink aims to facilitate bridging the gap between the practitioners with specific skills and the recruiters in need of them. That's why we have built a platform where searching for medical jobs that align with your skills and preferences is hassle-free and efficient.
                    </Typography>
                    <Typography
                      sx={{
                        pt: "20px",
                        color: "#6F7482",
                        fontSize: "18px",
                        fontWeight: "300",
                      }}
                    >
                      So, if you are a medical professional, what are you waiting for?
                    </Typography>
                    <Typography
                      sx={{
                        pt: "20px",
                        color: "#6F7482",
                        fontSize: "18px",
                        fontWeight: "300",
                      }}
                    > 
                    Hurry Up and get registered to not miss any job notifications from dream healthcare institutions.
                    </Typography>
                    <Typography
                      sx={{
                        pt: "20px",
                        color: "#6F7482",
                        fontSize: "18px",
                        fontWeight: "300",
                      }}
                    >
                      And if you are a healthcare company finding suitable employees, you have landed on the perfect page.
                    </Typography>
                    <Typography
                      sx={{
                        pt: "20px",
                        color: "#6F7482",
                        fontSize: "18px",
                        fontWeight: "300",
                      }}
                    >
                      Register your business with MedLink to find suitable medical professionals across India with utmost ease. 
                    </Typography>
                    {/* <Typography
                      sx={{
                        mt: matches ? "35px" : "48px",
                        mb: !matches && "48px",
                      }}
                    >
                      <button
                        style={{
                          color: "#458FF6",
                          border: "1.4px solid #458FF6",
                          backgroundColor: "white",
                          fontWeight: "700",
                          fontSize: "18px",
                          padding: "13px 51px",
                          borderRadius: "55px",
                        }}
                      >
                        Learn more
                      </button>
                    </Typography> */}
                  </Box>
                  {!matches && (
                    <Box sx={{ pt: "285px" }}>
                      <img
                        style={{
                          width: "115px",
                          height: "107px",
                        }}
                        src={element}
                        alt="Home-page-element"
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </section>
      </section>

      {/* For Job Seekers part */}
      <Box
        sx={{ px: matches ? "23px" : "55px", mt: matches ? "25px" : "80px" }}
      >
         <>
            <Typography
                  sx={{
                    fontSize: matches ? "25px" : "36px",
                    fontWeight: "700",
                    color: "#395987",
                    mb: "20px",
                    mt: matches && "30px",
                    textAlign: "center"
                  }}
                >
                 For Job Seekers
                </Typography>
                <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Divider
                  sx={{
                    width: "220px",
                    borderBottom: "4px solid #5A98F2",
                    borderRadius: "10px 10px 0px 0px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Divider
                  sx={{
                    width: "80px",
                    borderBottom: "4px solid #F2B45A",
                    borderRadius: "0px 0px 10px 10px",
                    mt: "-0.5px",
                    mb: "45px",
                    ml: "-140px",
                  }}
                />
              </Box>
          </>
           <Grid
              container
              spacing={1.5}
              // sx={{ mt: matches ? "15px" : "120px" }}
            >
              <Grid item xs={12} sm={12} md={5.7}>
              <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pl: matches ? "29px" : "107px",
                    pr: matches ? "25px" : "90px",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src={SubscribeWithMedlink}
                    alt="For Job Seekers"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6.3}>
             
              <Grid
                container
                rowSpacing={4}
                sx={{mt: "20px"}}
              >
                <Grid item xs={12} sm={12} md={12}>
                  <Box>            
                  <Typography sx={{color: "#395987", fontSize: "16px", fontWeight: "600", mb: "10px"}}>WE OFFER:</Typography>
                  <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2}}>
                  <img src={AddCircleOutlineOutlined} alt="ArrowRightAltIcon" /> 
                  <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                    A Centralized platform to explore Career Opportunities for Medical Professionals
                    </Typography>
                  </Box>
                  <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2, pt: "6px"}}>
                  <img src={AddCircleOutlineOutlined} alt="ArrowRightAltIcon" /> 
                  <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                  Filtered and preferential search  options to help healthcare professionals secure their dream jobs
                    </Typography>
                  </Box>
                  <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2, pt: "6px"}}>
                  <img src={AddCircleOutlineOutlined} alt="ArrowRightAltIcon" /> 
                  <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                    Access to opportunities across India at their fingertips
                  </Typography>
                  </Box>
                  </Box>
                  {/*  <Typography
                    sx={{
                      pt: "30px",
                      color: "#395987",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    MedLink offers career opportunities, news and relevant
                    information to get your dream job.
                  </Typography>
                  <Typography
                    sx={{
                      pt: "20px",
                      color: "#6F7482",
                      fontSize: "16px",
                      fontWeight: "300",
                    }}
                  >
                    MedLink provides its subscribers with career opportunities, news
                    and information relevant to their job search. MedLink provides
                    the healthcare organizations it serves with access to an
                    extensive database of candidates who are suited for a wide range
                    of positions.
                  </Typography>
                  <Typography sx={{ my: "30px" }}>
                    <button
                      style={{
                        color: "#458FF6",
                        border: "1.4px solid #458FF6",
                        backgroundColor: "white",
                        fontWeight: "700",
                        fontSize: "18px",
                        padding: "13px 51px",
                        borderRadius: "55px",
                      }}
                    >
                      Learn more
                    </button>
                  </Typography> */}
                </Grid>
                <Grid item xs={12} sm={12} md={12} 
                // sx={{ py: matches ? "30px" : "50px", px: "0px" }}
                >
                  <Box>            
                    <Typography 
                      sx={{ 
                        color: "#395987",
                        fontSize: "16px",
                        fontWeight: "600",
                        mb: "10px",
                        }}>HOW TO USE MEDLINK:</Typography>
                        <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2}}>
                    <img src={CheckOutlined} alt="ArrowRightAltIcon" /> 
                    <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                    Sign up and create a profile
                      </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2, pt: "6px"}}>
                    <img src={CheckOutlined} alt="ArrowRightAltIcon" /> 
                    <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                    Search and Filter your way to your dream job - Brand, Location, Specialization, Experience, Work Preference and Salary
                      </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2, pt: "6px"}}>
                    <img src={CheckOutlined} alt="ArrowRightAltIcon" /> 
                    <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                    Apply for suitable openings and / or the recruiter will contact and schedule an interview
                    </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2, pt: "6px"}}>
                    <img src={CheckOutlined} alt="ArrowRightAltIcon" /> 
                    <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                    Voila! You are recruited
                    </Typography>
                    </Box>
                  </Box>
                  {/* <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    {images1.map((step, index) => (
                      <>
                        {Math.abs(activeStep - index) <= 2 ? (
                          <img
                            style={{
                              width: "100%",
                              height: matches ? "98%" : "427px",
                            }}
                            src={step.imgPath}
                            alt="medlink slider"
                          />
                        ) : null}
                      </>
                    ))}
                  </AutoPlaySwipeableViews> */}
                </Grid>
              </Grid>
              </Grid>
            </Grid>
      </Box>


      {/* For Recruiters  part */}

      <Box
        sx={{ px: matches ? "23px" : "55px", mt: matches ? "25px" : "80px" }}
      >
         <>
            <Typography
                  sx={{
                    fontSize: matches ? "25px" : "36px",
                    fontWeight: "700",
                    color: "#395987",
                    mb: "20px",
                    mt: matches && "30px",
                    textAlign: "center"
                  }}
                >
                  For Recruiters
                </Typography>
                <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Divider
                  sx={{
                    width: "220px",
                    borderBottom: "4px solid #5A98F2",
                    borderRadius: "10px 10px 0px 0px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Divider
                  sx={{
                    width: "80px",
                    borderBottom: "4px solid #F2B45A",
                    borderRadius: "0px 0px 10px 10px",
                    mt: "-0.5px",
                    mb: "45px",
                    ml: "-140px",
                  }}
                />
              </Box>
          </>
          <Grid
              container
              spacing={1.5}
              // sx={{ mt: matches ? "15px" : "120px" }}
            >
              <Grid item xs={12} sm={12} md={5.7}>
              <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pl: matches ? "29px" : "107px",
                    pr: matches ? "25px" : "90px",
                  }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    src={forRecruiters}
                    alt="For Recruiters"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6.3}>
              <Grid
                container
                rowSpacing={4}
                sx={{mt: "20px"}}
              >
                <Grid item xs={12} sm={12} md={12}>


                <Box /* sx={{mt: "78px"}} */>
                          <Typography 
                          sx={{ 
                            color: "#395987",
                            fontSize: "16px",
                            fontWeight: "600",
                            mb: "10px",
                            mt: matches && "20px"
                            }}>WE OFFER:</Typography>
                            <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2}}>
                        <img src={AddCircleOutlineOutlined} alt="ArrowRightAltIcon" /> 
                        <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                        A centralized platform to post jobs and access suitable talent across India.
                          </Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2, pt: "6px"}}>
                        <img src={AddCircleOutlineOutlined} alt="ArrowRightAltIcon" /> 
                        <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                        Filtered and preferential candidate search to increase hiring efficiency.
                          </Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2, pt: "6px"}}>
                        <img src={AddCircleOutlineOutlined} alt="ArrowRightAltIcon" /> 
                        <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                        Branding and advertising solutions for pan India outreach.
                        </Typography>
                        </Box>
                        </Box>
                  {/*  <Typography
                    sx={{
                      pt: "30px",
                      color: "#395987",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    MedLink offers career opportunities, news and relevant
                    information to get your dream job.
                  </Typography>
                  <Typography
                    sx={{
                      pt: "20px",
                      color: "#6F7482",
                      fontSize: "16px",
                      fontWeight: "300",
                    }}
                  >
                    MedLink provides its subscribers with career opportunities, news
                    and information relevant to their job search. MedLink provides
                    the healthcare organizations it serves with access to an
                    extensive database of candidates who are suited for a wide range
                    of positions.
                  </Typography>
                  <Typography sx={{ my: "30px" }}>
                    <button
                      style={{
                        color: "#458FF6",
                        border: "1.4px solid #458FF6",
                        backgroundColor: "white",
                        fontWeight: "700",
                        fontSize: "18px",
                        padding: "13px 51px",
                        borderRadius: "55px",
                      }}
                    >
                      Learn more
                    </button>
                  </Typography> */}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  // sx={{ py: matches ? "30px" : "50px", px: "0px" }}
                >
                  <Box /* sx={{mt: "78px"}} */>
                    <Typography 
                    sx={{ 
                      color: "#395987",
                      fontSize: "16px",
                      fontWeight: "600",
                      mb: "10px",
                      mt: matches && "20px"
                      }}>HOW TO USE MEDLINK:</Typography>
                      <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2}}>
                  <img src={CheckOutlined} alt="ArrowRightAltIcon" /> 
                  <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                  Sign up and create a profile for your company
                    </Typography>
                  </Box>
                  <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2, pt: "6px"}}>
                  <img src={CheckOutlined} alt="ArrowRightAltIcon" /> 
                  <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                  Create job listings and make them public
                    </Typography>
                  </Box>
                  <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2, pt: "6px"}}>
                  <img src={CheckOutlined} alt="ArrowRightAltIcon" /> 
                  <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                  Choose from a wide range of applicants and / or from resume database according to the requirements - Location, Specialization, Experience, Work Preference and Salary
                  </Typography>
                  </Box>
                  <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2, pt: "6px"}}>
                  <img src={CheckOutlined} alt="ArrowRightAltIcon" /> 
                  <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                  Negotiate, Conduct Interviews and hire suitable candidates
                  </Typography>
                  </Box>
                  <Box sx={{display: "flex", alignItems: "center", /* justifyContent: "center", */ gap: 2, pt: "6px"}}>
                  <img src={CheckOutlined} alt="ArrowRightAltIcon" /> 
                  <Typography style={{color: "#6F7482", fontSize: "16px", fontWeight: "400"}}>
                  Advertise and brand your organization to suitable candidates across India.
                  </Typography>
                  </Box>
                  </Box>
                  {/* <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    {images1.map((step, index) => (
                      <>
                        {Math.abs(activeStep - index) <= 2 ? (
                          <img
                            style={{
                              width: "100%",
                              height: matches ? "98%" : "427px",
                            }}
                            src={step.imgPath}
                            alt="medlink slider"
                          />
                        ) : null}
                      </>
                    ))}
                  </AutoPlaySwipeableViews> */}
                </Grid>
              </Grid>
              </Grid>
            </Grid>
      </Box>

      {/* Subscribe with MedLink part */}
      {/* <Box
        sx={{ px: matches ? "23px" : "85px", mt: matches ? "41px" : "130px" }}
      >
        <Grid container spacing={matches ? 0 : 8}>
          {matches && (
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                sx={{
                  fontSize: matches ? "25px" : "36px",
                  fontWeight: "700",
                  mb: matches ? "25px" : "32px",
                  color: "#395987",
                  textAlign: matches && "center",
                }}
              >
                Subscribe with MedLink
              </Typography>
              <Box
                sx={{
                  display: matches && "flex",
                  alignItems: matches && "center",
                  justifyContent: matches && "center",
                }}
              >
                <Divider
                  sx={{
                    width: "220px",
                    borderBottom: "4px solid #5A98F2",
                    borderRadius: "10px 10px 0px 0px",
                    ml: "-50px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: matches && "flex",
                  alignItems: matches && "center",
                  justifyContent: matches && "center",
                }}
              >
                <Divider
                  sx={{
                    width: "80px",
                    borderBottom: "4px solid #F2B45A",
                    borderRadius: "0px 0px 10px 10px",
                    mt: "-0.5px",
                    ml: "-190px",
                  }}
                />
              </Box>
              <img
                style={{
                  width: "100%",
                  height: matches ? "100%" : "434px",
                  paddingTop: "45px",
                }}
                src={SubscribeWithMedlink}
                alt="Subscribe With MedLink"
              />
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={6}>
            {!matches && (
              <>
                <Typography
                  sx={{
                    fontSize: "36px",
                    fontWeight: "700",
                    mb: "32px",
                    color: "#395987",
                  }}
                >
                  Subscribe with MedLink
                </Typography>
                <Divider
                  sx={{
                    width: "220px",
                    borderBottom: "4px solid #5A98F2",
                    borderRadius: "10px 10px 0px 0px",
                  }}
                />
                <Divider
                  sx={{
                    width: "80px",
                    borderBottom: "4px solid #F2B45A",
                    borderRadius: "0px 0px 10px 10px",
                    mt: "-0.5px",
                  }}
                />
              </>
            )}
            <Typography
              sx={{
                pt: "28px",
                fontSize: "18px",
                fontWeight: "600",
                mt: matches && "98px",
                color: "#395987",
              }}
            >
              Register with MedLink, and we'll get you recruited.
            </Typography>
            <Typography
              sx={{
                pt: matches ? "20px" : "28px",
                color: "#7D7987",
                fontSize: "18px",
                fontWeight: "300",
              }}
            >
              MedLink is the Best Online Job Search Platform for doctors and the
              healthcare community in India. MedLink provides a convenient
              Digital platform to simplify healthcare job search for healthcare
              professionals like Doctors, Nurses, Midwives and Allied Healthcare
              Professionals. Please register with us to get notifications on
              jobs available across India's best hospitals.
            </Typography>
          </Grid>
          {!matches && (
            <Grid item xs={12} sm={12} md={6}>
              <img
                style={{
                  width: "100%",
                  height: "434px",
                }}
                src={SubscribeWithMedlink}
                alt="Subscribe With MedLink"
              />
            </Grid>
          )}
        </Grid>
      </Box> */}

      {/*--------------- What our customer are saying part----------------*/}
      <Box
        sx={{
          backgroundImage: !matches && `url(${Vector})`,
          backgroundRepeat: !matches && "no-repeat",
          backgroundPosition: !matches && "right",
          mt: matches ? "75px" : "161px",
        }}
      >
        <Container sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              flexGrow: 1,
              backgroundImage:
                "linear-gradient(208.18deg, #67C3F3 9.05%, #5A98F2 76.74%)",
              borderRadius: "24px",
              mb: "44px",
            }}
          >
            <Box
              sx={{
                backgroundImage: !matches && `url(${elementCustomer})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "3% 3%",
              }}
            >
              <Box>
                {" "}
                <Typography
                  sx={{
                    fontSize: matches ? "16px" : "36px",
                    fontWeight: "700",
                    color: "#FFFFFF",
                    mb: matches ? "9px" : "25px",
                    pt: matches ? "22px" : "43px",
                    textAlign: "center",
                  }}
                >
                  What our customer are saying
                </Typography>
                {!matches && (
                  <Divider
                    sx={{
                      width: "56px",
                      borderBottom: "2px solid #FFFFFF",
                      borderRadius: "6px",
                      m: "auto",
                    }}
                  />
                )}
              </Box>
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {images.map((step, index) => (
                  <div
                    style={{
                      paddingTop: matches ? "15px" : "30px",
                      paddingLeft: matches ? "34px" : "187px",
                      paddingBottom: matches ? "15px" : "25px",
                      paddingRight: matches ? "34px" : "187px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#FFFFFFE5",
                        fontSize: matches ? "14px" : "18px",
                        fontWeight: "400",
                        textAlign: "center",
                      }}
                    >
                      {!matches && <>&nbsp; &nbsp; &nbsp; &nbsp;</>}“
                      {images[activeStep].label}”
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FFFFFFE5",
                        fontSize: matches ? "16px" : "22px",
                        fontWeight: "700",
                        textAlign: "center",
                        pt: "23px",
                        pb: "5px",
                      }}
                    >
                      {images[activeStep].name === "" ? (
                        <>&nbsp;</>
                      ) : (
                        <>{images[activeStep].name}</>
                      )}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FFFFFFE5",
                        fontSize: matches ? "14px" : "18px",
                        fontWeight: "400",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      {images[activeStep].position === "" ? (
                        <>&nbsp;</>
                      ) : (
                        <>{images[activeStep].position}</>
                      )}
                    </Typography>

                    {/*                   <Grid container key={step.label} spacing={2}>
                        <Grid items xs={12} sm={6} md={6}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                  component="img"
                                  sx={{
                                    height: "170px",
                                    width: "170px",
                                    display: "block",
                                    overflow: "hidden",
                                    borderRadius: "50%",
                                  }}
                                  src={step.imgPath}
                                  alt={step.label}
                                />
                              ) : null}
                            </Grid>
                            <Grid sx={{ marginTop: "50px" }} item xs={6}>
                              <Typography
                                sx={{
                                  color: "#FFFFFFE5",
                                  fontSize: "22px",
                                  fontWeight: "700",
                                }}
                              >
                                {images[activeStep].name}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#FFFFFFE5",
                                  fontSize: "18px",
                                  fontWeight: "400",
                                }}
                              >
                                {" "}
                                {images[activeStep].position}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          sx={{
                            color: "#FFFFFFE5",
                            fontSize: "19px",
                            fontWeight: "400",
                            paddingLeft: "30px",
                          }}
                          items
                          xs={12}
                          sm={6}
                          md={6}
                        >
                          &nbsp; &nbsp; &nbsp;"{images[activeStep].label}"
                        </Grid>
                      </Grid> */}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
            </Box>
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: matches ? "space-between" : "center",
              paddingBottom: "61px",
            }}
          >
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardBackspaceIcon />
              ) : (
                <KeyboardBackspaceIcon />
              )}
            </Button>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
            />
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <ArrowRightAltIcon />
              ) : (
                <ArrowRightAltIcon />
              )}
            </Button>
          </div>
        </Container>
      </Box>
    </Box>
  );
};

export default PrimaryHome;
