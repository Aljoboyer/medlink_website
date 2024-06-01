import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Link, useLocation } from "react-router-dom";
import { gqlquery, gqlOpenQuery } from "../../api";
import styled from "@emotion/styled";
import banner from '../../../src/assets/banner.png';
import logo from '../../../src/assets/LifeStanceLogo.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";

// Slider
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ExpandLess from "@mui/icons-material/ExpandLess";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];



const values = ["column", "Grid", "Flex"];

const SearchButton = styled(Button)(() => ({
  color: "var(--clr-white) !important",
}));

const FeaturedHospital = () => {
  const location = useLocation();
  const [flag, setFlag] = useState(false);
  const [update, setUpdate] = useState(false);
  const [openedItemId, setOpenedItemId] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchJobsQueryInfo, setSearchJobsItemsQueryInfo] = useState({});
  let [locationFilter, setLocationFilter] = useState([]);
  let [jobTypeFilter, setJobTypeFilter] = useState([]);
  let [specializationFilter, setSpecializationFilter] = useState([]);
  let [educationFilter, setEducationFilter] = useState([]);
  let [hospitalFilter, setHospitalFilter] = useState([]);
  const [allSpecialization, setAllSpecialization] = useState([]);
  const [locationFilterOptions, setLocationFilterOptions] = useState([]);
  const [jobTypeFilterOptions, setJobTypeFilterOptions] = useState([]);
  const [educationFilterOptions, setEducationFilterOptions] = useState([]);
  const [hospitalFilterOptions, setHospitalFilterOptions] = useState([]);
  const [experience, setExperience] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);
  const [searchResultsPerPage, setSearchResultsPerPage] = useState(10);
  const [jobsSearchInfo, setJobsSearchInfo] = useState({
    jobTitle: "",
    location: "",
  });
  const [form, setForm] = useState({
    jobTitle: "",
    location: "",
    qualification: "",
    employmentType: "",
    experience: 0,
    lastDateToApply: new Date(),
    description: "",
    annualSalary: [1, 99],
  });
  const [hospitalDetails, setHospitalDetails] = useState({})

  // Slider
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  document.title = "Featured Hospital | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  // Slider

  const handleChange = (prop) => (event) => {
    setJobsSearchInfo({ ...jobsSearchInfo, [prop]: event.target.value });
  };

  const onClick = (e) => {
    e.preventDefault();
    setFlag((prevData) => !prevData);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeSearchResultsPerPage = (event) => {
    setSearchResultsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSearchQueryData = () => {
    searchJobsQueryInfo.jobTitle = location?.state?.jobTitle;
    searchJobsQueryInfo.location = location?.state?.location;
    jobsSearchInfo.jobTitle = location?.state?.jobTitle;
    jobsSearchInfo.location = location?.state?.location;
  };

  const hospitalID = "3b2ff1b3-cdca-11ec-96ec-0a2cb187d31a";

  useEffect(() => { 
    const QUERY_HOSPITALDETAILS = {
      query: `query MyQuery {
        getHospitalDetails(
          hospitalID: "${String(hospitalID)}"
          ) {
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
            name
            pan
            pincode
            profilePicURL
            reportingManager
            role
            state
            website
            video
        }
      }`,
      variables: null,
      operationName: "MyMutation",
    };

    const getJobsByHospitalName = (name) => {

    }


    const getHospitalDetails = async () => {
      await gqlOpenQuery(QUERY_HOSPITALDETAILS, null)
        .then((res) => res.json())
        .then((data) => {
          setHospitalDetails(data?.data?.data?.data?.getHospitalDetails)
          handleJobsSearch(data?.data?.getHospitalDetails?.name) 
        });
    }
    getHospitalDetails();





    // getSearchQueryData();




  }, []);

  const handleJobsSearch = (hospitalName) => {
    const QUERY_SEARCHJOBS = {
      query: `query MyQuery {
                        searchJobs(
                          location: "${hospitalName}",
                          title: "${jobsSearchInfo?.jobTitle}"
                         ) {
                              jobTitle
                              qualification
                              secondarySpecialization
                              description
                              maximumSalary
                              minimumSalary
                              postedOn
                              location
                              primarySpecialization
                              experience
                              vacancyID
                              savedJob
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
        console.log("getJobsbyHospital:::",data)
        setSearchResults(data?.data?.searchJobs)
      });
    setFlag((prevData) => !prevData);
  };

  if (searchResults?.length) {
    searchJobsQueryInfo.jobTitle = searchResults[0]?.jobTitle;
    searchJobsQueryInfo.location = searchResults[0]?.location;
    if (jobsSearchInfo?.location === "") {
      searchJobsQueryInfo.location = jobsSearchInfo?.location
    }
  }
  console.log(searchResults)

  // date configure
  const newSearchResults = searchResults?.map((searchResult) => {
    const date_diff_indays = function () {
      const dt1 = new Date(searchResult?.postedOn);
      const dt2 = new Date();
      const days = Math?.floor(
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
      vacancyID: searchResult?.vacancyID,
    };
  });

  // Filter collaps
  const handleClick = orgEvent => {
    // form.annualSalary = [minSalary, maxSalary];
    // form.annualSalary[0] = minSalary;
    // form.annualSalary[1] = maxSalary;
    let clickedItemId = orgEvent.currentTarget.id;
    if (openedItemId === clickedItemId) {
      setOpenedItemId("");
    } else {
      setOpenedItemId(clickedItemId);
    }
    //setOpen(!open);
  };

  // Filter location
  const handleCheckboxLocation = (name) => {
    if (locationFilter.includes(name)) {
      const xyz = locationFilter.indexOf(name);
      if (xyz > -1) {
        locationFilter.splice(xyz, 1);
      }
    } else {
      setLocationFilter([...locationFilter, name]);
    };
    setUpdate(prev => !prev);
  };
  // const filterLocation = locationFilter.toString();

  // Handle Experience
  const handleChangeExperience = (event, newValue) => {
    setExperience(newValue);
  };

  // Handle job type checkbox
  const handleCheckboxJobType = (name) => {
    if (jobTypeFilter.includes(name)) {
      const xyz = jobTypeFilter.indexOf(name);
      if (xyz > -1) {
        jobTypeFilter.splice(xyz, 1);
      }
    } else {
      setJobTypeFilter([...jobTypeFilter, name]);
    };
    setUpdate(prev => !prev);
  };
  // const filterJobType = jobTypeFilter.toString();

  // handle Education Checkbox
  const handleCheckboxEducation = (name) => {
    if (educationFilter.includes(name)) {
      const xyz = educationFilter.indexOf(name);
      if (xyz > -1) {
        educationFilter.splice(xyz, 1);
      }
    } else {
      setEducationFilter([...educationFilter, name]);
    };
    setUpdate(prev => !prev);
  };
  // const filterEducation = educationFilter.toString();

  // handle Spacialization Checkbox
  const handleCheckboxSpecialization = (name) => {
    console.log(name)
    if (specializationFilter.includes(name)) {
      const xyz = specializationFilter.indexOf(name);
      if (xyz > -1) {
        specializationFilter.splice(xyz, 1);
      }
    } else {
      setSpecializationFilter([...specializationFilter, name]);
    };
    setUpdate(prev => !prev);
  };
  // const filterSpecialization = specializationFilter.toString();

  // handle Hospital Checkbox
  const handleCheckboxHospital = (name) => {
    if (hospitalFilter.includes(name)) {
      const xyz = hospitalFilter.indexOf(name);
      if (xyz > -1) {
        hospitalFilter.splice(xyz, 1);
      }
    } else {
      setHospitalFilter([...hospitalFilter, name]);
    };
    setUpdate(prev => !prev);
  };
  // const filterHospital = hospitalFilter.toString();

  // page Count
  const handleIncreasePageCount = (eventName) => {
    if (eventName === 'increase') {
      setUpdate(prev => !prev);
      setPageCount(prev => prev + 1);
    };
    if (eventName === 'decrease') {
      if (pageCount === 1) {
        setPageCount(prev => prev);
      } else {
        setPageCount(prev => prev - 1);
      }
    };
  };

  console.log(jobsSearchInfo)
  return (
    <Box>
      <Box>
        <Grid container>
          <Grid item xs={4} sx={{ backgroundColor: "var(--clr-blue-primary)" }}></Grid>
          <Grid item xs={8}>
            <Box style={{ marginLeft: "-22.5rem", padding: "5rem" }}>
              <Grid container>
                <Grid item xs={6} md={1} lg={1}>
                  <Box sx={{ mt: 20 }}>
                    <MobileStepper
                      variant="progress"
                      steps={6}
                      position="static"
                      activeStep={activeStep}
                      sx={{ maxWidth: 400, marginLeft: -20, marginRight: -10, backgroundColor: 'none', background: 'none', flexGrow: 1, transform: 'translateX(-10%) translateY(-50%) rotate(-90deg)' }}
                      nextButton={
                        <Button sx={{ color: "var(--clr-white) !important" }} size="small" onClick={handleNext} disabled={activeStep === 5}>
                          05
                          {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                          ) : (
                            <KeyboardArrowRight />
                          )}
                        </Button>
                      }
                      backButton={
                        <Button sx={{ color: "var(--clr-white) !important" }} size="small" onClick={handleBack} disabled={activeStep === 0}>
                          {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                          ) : (
                            <KeyboardArrowLeft />
                          )}
                          01
                        </Button>
                      }
                    />
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                    <AutoPlaySwipeableViews
                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      index={activeStep}
                      onChangeIndex={handleStepChange}
                      enableMouseEvents
                    >
                      {images.map((step, index) => (
                        <div key={step.label}>
                          {Math.abs(activeStep - index) <= 2 ? (
                            <Box sx={{ border: "4px solid var(--clr-white)" }}>
                              <Box
                                component="img"
                                sx={{
                                  height: 432,
                                  display: 'block',
                                  maxWidth: 432,
                                  overflow: 'hidden',
                                  width: '100%',
                                }}
                                src={step.imgPath}
                                alt={step.label}
                              />
                            </Box>
                          ) : null}
                        </div>
                      ))}
                    </AutoPlaySwipeableViews>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: 4 }}>
                    <img src={logo} alt="" width="200px" height="44px" />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: "var(--clr-blue-footer)" }}>
                    Hospital Name
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 2, my: 2, color: "var(--clr-gray-3)" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet massa quam ornare laoreet nisl, nunc. Pellentesque vitae gravida et dignissim sit commodo dignissim molestie. Praesent tellus fames diam at. Feugiat ullamcorper tristique nunc tincidunt enim. Pellentesque vitae ac pulvinar eu viverra rhoncus elementum nunc, massa.
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 2, my: 2, color: "var(--clr-gray-3)" }}>
                    Interdum posuere libero ut purus at volutpat, placerat. Vitae, semper malesuada etiam malesuada a proin tincidunt. Eget cras tristique vitae tincidunt vestibulum, diam, fames lobortis a. Sit vulputate elementum, facilisis ornare. Libero in donec sit turpis. Mauris vulputate egestas ac leo. Sem ut nulla feugiat arcu malesuada nisl. Sollicitudin dui semper metus aliquet vel.
                  </Typography>
                  <Button variant="contained" sx={{ borderRadius: 16 }}>View Jobs</Button>
                  <Button sx={{ ml: 4 }} variant="text" startIcon={<PlayCircleFilledIcon size="large" sx={{ color: "#F2B45A", height: "30px", width: "30px", margin: "2px", border: "2px solid #F2B45A", borderRadius: 16 }} />}> <u style={{ fontWeight: "600" }}>Watch video</u> </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box maxWidth="xl" sx={{ mx: "auto" }}>
        <Box sx={{ px: 6, py: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Box
                sx={{
                  diplay: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {/* All Filters */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    backgroundColor: "var(--clr-blue-light)",
                    px: 2.5,
                    py: 1.5,
                    mb: 1.5,
                    borderTopLeftRadius: "6px",
                    borderTopRightRadius: "6px",
                  }}
                >
                  <FilterAltTwoToneIcon
                    sx={{ color: "var(--clr-blue-footer)" }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "var(--clr-blue-footer)", fontWeight: 600 }}
                  >
                    All Filters
                  </Typography>
                </Box>
                {/* location   */}
                <Box>
                  <Box
                    onClick={handleClick}
                    id="location"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      px: 3,
                      mb: 1.5,
                      border: "1px solid var(--clr-blue-light)",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "18px", color: "#333333" }}
                    >
                      Location
                    </Typography>
                    {openedItemId === "location" ? (
                      <ExpandLess
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    ) : (
                      <ExpandMore
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    )}
                  </Box>
                  <Collapse in={openedItemId === "location"} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 1 }}>
                      <Input
                        fullWidth
                        sx={{
                          px: 1,
                          py: 0.5,
                          border: "none",
                          borderRadius: 1,
                        }}
                        disableUnderline
                        id="outlined-adornment-password"
                        type="text"
                        // value={values.password}
                        // onChange={handleChange("password")}
                        placeholder="Search"
                        style={{ borderBottom: "none" }}
                        endAdornment={
                          <InputAdornment position="end" style={{ outline: "none" }}>
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              {/* {values.searchUser} */}
                              <SearchIcon sx={{ color: "var(--clr-blue-footer)" }} />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Search User"
                      />
                    </Box>
                    {
                      locationFilterOptions?.map((sr, index) => (
                        <Typography
                          variant="body1"
                          sx={{ color: "var(--clr-gray-1)" }}
                        >
                          <Checkbox
                            sx={{
                              color: "#C7D3E3",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                            checked={locationFilter.includes(sr?.location)}
                            onChange={() => handleCheckboxLocation(sr?.location)}
                            key={index}
                            name={sr?.location} />
                          &nbsp;{sr?.location}
                        </Typography>
                      ))
                    }
                  </Collapse>
                </Box>
                {/* Salary */}
                <Box>
                  <Box
                    onClick={handleClick}
                    id="ctc"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      px: 3,
                      mb: 1.5,
                      border: "1px solid var(--clr-blue-light)",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "18px", color: "#333333" }}
                    >
                      Salary
                    </Typography>
                    {openedItemId === "ctc" ? (
                      <ExpandLess
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    ) : (
                      <ExpandMore
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    )}
                  </Box>
                  <Collapse in={openedItemId === "ctc"} timeout="auto" unmountOnExit>
                    <Box sx={{ px: 4, py: 2 }}>
                      <Slider
                        name="annualSalary"
                        getAriaLabel={() => "Annual Salary"}
                        onChange={handleChange("annualSalary")}
                        valueLabelDisplay="auto"
                        // defaultValue={form.annualSalary}
                        value={form.annualSalary}
                        min={1}
                        max={99}
                        marks={[
                          {
                            value: 1,
                            label: `${Math.round(
                              form.annualSalary[0]
                            )} lakh INR`,
                          },
                          {
                            value: 99,
                            label: `${Math.round(
                              form.annualSalary[1]
                            )} lakh INR`,
                          },
                        ]}
                        sx={{
                          "& .MuiSlider-thumb": {
                            height: 24,
                            width: 24,
                            color: "var(--clr-white)",
                            border: "2px solid var(--clr-blue-footer)",
                          },
                          "& .MuiSlider-track": {
                            height: 10,
                            color: "var(--clr-blue-footer)",
                          },
                          "& .MuiSlider-rail": {
                            height: 10,
                            color: "var(--clr-white)",
                            border: "2px solid #C7D3E3",
                          },
                        }}
                      />
                    </Box>
                  </Collapse>
                </Box>
                {/* experience  */}
                <Box>
                  <Box
                    onClick={handleClick}
                    id="experience"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      px: 3,
                      mb: 1.5,
                      border: "1px solid var(--clr-blue-light)",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "18px", color: "#333333" }}
                    >
                      Experience
                    </Typography>
                    {openedItemId === "experience" ? (
                      <ExpandLess
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    ) : (
                      <ExpandMore
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    )}
                  </Box>
                  <Collapse in={openedItemId === "experience"} timeout="auto" unmountOnExit>
                    <Box sx={{ px: 4, py: 2 }}>
                      <Slider value={experience} onChange={handleChangeExperience} defaultValue={50} aria-label="Default" valueLabelDisplay="auto"
                        sx={{
                          "& .MuiSlider-thumb": {
                            height: 24,
                            width: 24,
                            color: "var(--clr-white)",
                            border: "2px solid var(--clr-blue-footer)",
                          },
                          "& .MuiSlider-track": {
                            height: 10,
                            color: "var(--clr-blue-footer)",
                          },
                          "& .MuiSlider-rail": {
                            height: 10,
                            color: "var(--clr-white)",
                            border: "2px solid #C7D3E3",
                          },
                        }}
                      />
                    </Box>
                  </Collapse>
                </Box>
                {/* Job Type  */}
                <Box>
                  <Box
                    onClick={handleClick}
                    id="keywords"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      px: 3,
                      mb: 1.5,
                      border: "1px solid var(--clr-blue-light)",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "18px", color: "#333333" }}
                    >
                      Job Type
                    </Typography>
                    {openedItemId === "keywords" ? (
                      <ExpandLess
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    ) : (
                      <ExpandMore
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    )}
                  </Box>
                  <Collapse in={openedItemId === "keywords"} timeout="auto" unmountOnExit>
                    <Box sx={{ pb: 2 }}>
                      {jobTypeFilterOptions?.map((jobType, index) => (
                        <Typography
                          variant="body1"
                          sx={{ color: "var(--clr-gray-1)" }}
                        >
                          <Checkbox
                            onChange={() => handleCheckboxJobType(jobType?.employmentType)}
                            checked={jobTypeFilter.includes(jobType?.employmentType)}
                            key={index}
                            name={jobType?.employmentType}
                            sx={{
                              color: "#C7D3E3",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                          />
                          &nbsp;{jobType?.employmentType}
                        </Typography>
                      ))}
                    </Box>
                  </Collapse>
                </Box>
                {/* Education */}
                <Box>
                  <Box
                    onClick={handleClick}
                    id="company"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      px: 3,
                      mb: 1.5,
                      border: "1px solid var(--clr-blue-light)",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "18px", color: "#333333" }}
                    >
                      Education
                    </Typography>
                    {openedItemId === "company" ? (
                      <ExpandLess
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    ) : (
                      <ExpandMore
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    )}
                  </Box>
                  <Collapse in={openedItemId === "company"} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 1 }}>
                      <Input
                        fullWidth
                        sx={{
                          px: 1,
                          py: 0.5,
                          border: "none",
                          borderRadius: 1,
                        }}
                        disableUnderline
                        id="outlined-adornment-password"
                        type="text"
                        // value={values.password}
                        // onChange={handleChange("password")}
                        placeholder="Search"
                        endAdornment={
                          <InputAdornment position="end" style={{ outline: "none" }}>
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              {/* {values.searchUser} */}
                              <SearchIcon sx={{ color: "var(--clr-blue-footer)" }} />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Search User"
                      />
                      <Box sx={{ pb: 2 }}>
                        {educationFilterOptions?.map((sr, index) => (
                          <Typography
                            variant="body1"
                            sx={{ color: "var(--clr-gray-1)" }}
                          >
                            <Checkbox
                              sx={{
                                color: "#C7D3E3",
                                "&.Mui-checked": {
                                  color: "var(--clr-blue-primary)",
                                },
                              }}
                              onChange={() => handleCheckboxEducation(sr?.qualification)}
                              checked={educationFilter.includes(sr?.qualification)}
                              key={index}
                              name={sr?.qualification}
                            />
                            &nbsp;{sr?.qualification}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Collapse>
                </Box>
                {/* Specialization */}
                <Box>
                  <Box
                    onClick={handleClick}
                    id="specialization"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      px: 3,
                      mb: 1.5,
                      border: "1px solid var(--clr-blue-light)",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "18px", color: "#333333" }}
                    >
                      Specialization
                    </Typography>
                    {openedItemId === "specialization" ? (
                      <ExpandLess
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    ) : (
                      <ExpandMore
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    )}
                  </Box>
                  <Collapse in={openedItemId === "specialization"} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 1 }}>
                      <Input
                        fullWidth
                        sx={{
                          px: 1,
                          py: 0.5,
                          border: "none",
                          borderRadius: 1,
                        }}
                        disableUnderline
                        id="outlined-adornment-password"
                        type="text"
                        // value={values.password}
                        // onChange={handleChange("password")}
                        placeholder="Search"
                        endAdornment={
                          <InputAdornment position="end" style={{ outline: "none" }}>
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              {/* {values.searchUser} */}
                              <SearchIcon sx={{ color: "var(--clr-blue-footer)" }} />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Search User"
                      />
                    </Box>
                    <Box sx={{ pb: 2 }}>
                      {
                        allSpecialization?.map((sr, index) => (
                          <Typography
                            variant="body1"
                            sx={{ color: "var(--clr-gray-1)" }}>
                            <Checkbox
                              onChange={() => handleCheckboxSpecialization(sr?.primarySpecialization || sr?.secondarySpecialization)}
                              checked={specializationFilter.includes(sr?.primarySpecialization || sr?.secondarySpecialization)}
                              key={index}
                              name={sr?.primarySpecialization || sr?.secondarySpecialization}
                              sx={{
                                color: "#C7D3E3",
                                "&.Mui-checked": {
                                  color: "var(--clr-blue-primary)",
                                },
                              }}
                            />
                            &nbsp;{sr?.primarySpecialization || sr?.secondarySpecialization}
                          </Typography>
                        ))
                      }
                    </Box>
                  </Collapse>
                </Box>
                {/* Hospitals */}
                <Box>
                  <Box
                    onClick={handleClick}
                    id="hospital"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      px: 3,
                      mb: 1.5,
                      border: "1px solid var(--clr-blue-light)",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "18px", color: "#333333" }}
                    >
                      Hospitals
                    </Typography>
                    {openedItemId === "hospital" ? (
                      <ExpandLess
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    ) : (
                      <ExpandMore
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "var(--clr-blue-footer)",
                        }}
                      />
                    )}
                  </Box>
                  <Collapse in={openedItemId === "hospital"} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 1 }}>
                      <Input
                        fullWidth
                        sx={{
                          px: 1,
                          py: 0.5,
                          border: "none",
                          borderRadius: 1,
                        }}
                        disableUnderline
                        id="outlined-adornment-password"
                        type="text"
                        // value={values.password}
                        // onChange={handleChange("password")}
                        placeholder="Search"
                        style={{ borderBottom: "none" }}
                        endAdornment={
                          <InputAdornment position="end" style={{ outline: "none" }}>
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              {/* {values.searchUser} */}
                              <SearchIcon sx={{ color: "var(--clr-blue-footer)" }} />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Search User"
                      />
                    </Box>
                    <Box sx={{ pb: 2 }}>
                      {hospitalFilterOptions?.map((sr, index) => (
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", pb: 1 }}>
                          <Checkbox
                            checked={hospitalFilter.includes(sr?.name)}
                            onChange={() => handleCheckboxHospital(sr?.name)}
                            key={index}
                            name={sr?.name}
                            sx={{
                              color: "#C7D3E3",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                          />
                          <Typography
                            variant="body1"
                            sx={{ color: "var(--clr-gray-1)" }}
                          >
                            {sr?.name}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Collapse>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box
                sx={{
                  display: "flex",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                  mb: 1.5,
                }}
              >
                <Typography variant="body2" sx={{ color: "var(--clr-secondayGray-2)" }}>
                  {((pageCount - 1) * 10) + 1} - {newSearchResults?.length < 10 ? newSearchResults?.length : pageCount * 10} &nbsp;
                  Jobs In  "Hospital Name"
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {newSearchResults
                  ?.map((searchResult) => (
                    <Box
                      key={searchResult.id}
                      sx={{
                        bgcolor: "var(--clr-white)",
                        borderRadius: 1,
                        border: "1px solid var(--clr-blue-light)",
                        p: 2.5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        boxShadow: "0px 0px 9px rgba(69, 143, 246, 0.09)",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        component="div"
                        // onClick={() => handleSingleJob(searchResult?.vacancyID , searchResult?.hospitalID)}
                        // onClick={() => handleSingleJob(searchResult)}
                        sx={{
                          color: "#395987",
                          fontWeight: "600",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                      >
                        {/* <Link to={`/job-search-list/${searchResult?.vacancyID}`}>
                          {searchResult?.jobTitle}
                        </Link> */}
                        {/*  <Button  sx={{
                          color: "#395987",
                          fontWeight: "600",
                          fontSize: "18px",
                        }} onClick={() => handleSingleJob(searchResult?.vacancyID , searchResult?.hospitalID)}>
                          {searchResult?.jobTitle}
                        </Button> */}
                        {searchResult?.jobTitle}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{
                          color: "#333333",
                          fontWeight: "600",
                        }}
                      >
                        {searchResult.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          pr: 2,
                        }}
                      >
                        <DescriptionOutlinedIcon
                          sx={{ color: "#C7D3E3" }}
                        />
                        <Typography
                          component="div"
                          sx={{ color: "#4F4F4F" }}
                          variant="body1"
                        >
                          {searchResult?.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{
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
                          {/* {searchResult.skills.map((skill) => ( */}
                          <Typography
                            variant="subtitle2"
                            component="div"
                            sx={{
                              lineHeight: "14px",
                              color: "#333333",
                              fontWeight: "600",
                            }}
                          >
                            {searchResult?.primarySpecialization}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            component="div"
                            sx={{
                              lineHeight: "14px",
                              color: "#333333",
                              fontWeight: "600",
                            }}
                          >
                            {searchResult?.secondarySpecialization}
                          </Typography>
                          {/* ))}  */}
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
                          }}
                        >
                          <FmdGoodOutlinedIcon
                            fontSize="small"
                            sx={{ color: "var(--clr-white-icon)" }}
                          />
                          <Typography
                            component="div"
                            sx={{ color: "#333333" }}
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
                            pr: 2,
                          }}
                        >
                          <WorkOutlineRoundedIcon
                            fontSize="small"
                            sx={{ color: "var(--clr-white-icon)" }}
                          />
                          <Typography
                            component="div"
                            sx={{ color: "#333333" }}
                            variant="body1"
                          >
                            {searchResult?.experience}{" "}
                            {searchResult?.experience === 1 ? "Year" : "Years"}
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
                          <AccountBalanceWalletOutlinedIcon
                            fontSize="small"
                            sx={{ color: "var(--clr-white-icon)" }}
                          />
                          <Typography
                            component="div"
                            sx={{ color: "#333333" }}
                            variant="body1"
                          >
                            {searchResult?.maximumSalary} {"INR"}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                      >
                        <Box>
                          <Box
                            sx={{
                              width: "max-content",
                              display: "flex",
                              alignItems: "center",
                              bgcolor: "var(--clr-blue-light)",
                              gap: 1,
                              px: 1.5,
                              py: 0.3,
                              borderRadius: 16,
                            }}
                          >
                            <HistoryOutlinedIcon
                              fontSize="small"
                              sx={{ color: "var(--clr-blue-footer)" }}
                            />
                            <Typography
                              component="div"
                              sx={{ color: "#395987", fontSize: "12px", fontWeight: 600 }}
                              variant="caption"
                            >
                              {searchResult?.date_diff_indays()?.month ? (
                                <>
                                  {searchResult?.date_diff_indays()?.month}{" "}
                                  {searchResult?.date_diff_indays()?.month === 1
                                    ? "month"
                                    : "months"}{" "}
                                  {searchResult?.date_diff_indays()?.day ? (
                                    <>
                                      {searchResult?.date_diff_indays()?.day}{" "}
                                      {searchResult?.date_diff_indays()?.day === 1
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
                                  {searchResult?.date_diff_indays()?.days}{" "}
                                  {searchResult?.date_diff_indays()?.days === 1
                                    ? "day"
                                    : "days"}{" "}
                                  {"ago"}
                                </>
                              )}

                              {/* {searchResult.postedOn} */}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          {
                            searchResult?.savedJob ? (
                              <Button
                                // onClick={() => handleDeleteSavedJobs(searchResult?.vacancyID)}
                                sx={{ width: "max-content", bgcolor: "var(--clr-blue-light)", padding: "3px 10px !important", borderRadius: 16, }}>
                                <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                  <StarIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Saved</span>
                                </Typography>
                              </Button>
                            ) : (
                              <Button
                                // onClick={() => handleSaveJob(searchResult?.vacancyID)}
                                diababled
                                sx={{ width: "max-content", bgcolor: "var(--clr-blue-light)", gap: 1, padding: "0px 10px !important", borderRadius: 16, color: "#395987 !important", fontWeight: "600" }}>
                                <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                  <StarBorderIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Save Job</span>
                                </Typography>
                              </Button>
                            )
                          }
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  pt: 2,
                }}
              >
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ArrowBackIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("decrease")} />
                    <Typography sx={{ color: "#395987", fontWeight: 600, px: 2 }}> {pageCount}</Typography>
                    {/* {pageCount >= Math.ceil(searchResults.length / 3) ? (
                      <ArrowForwardIcon sx={{ color: "gray", }} />
                    ) : ( */}
                    <ArrowForwardIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("increase")} />
                    {/* )} */}
                    {/* {console.log(pageCount)} */}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedHospital;
