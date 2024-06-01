import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  MenuItem,
  Select,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import Slider from '@mui/material/Slider';
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { gqlOpenQuery, gqlquery, QUERY_SAVEDJOBS } from "../../api";
import banner_bg from "../../assets/images/job-search-bg.png";
import useAuth from "../../hooks/useAuth";
import MenuIcon from '@mui/icons-material/Menu';

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const values = ["Relevance", "Date"];

const CustomSelectInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    position: "relative",
    border: "none !important",
    // transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontSize: "15px",
    color: "var(--clr-blue-footer)",
    padding: "6px 26px 6px 12px",
    backgroundColor: "var(--clr-blue-light)",

    "&:focus": {
      borderRadius: "6px",
      borderColor: "red",
      outline: "none",
    },
  },
}));

const CustomSelectInputResponsive = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "56px",
    position: "relative",
    border: "none !important",
    // transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontSize: "15px",
    color: "var(--clr-blue-footer)",
    padding: "6px 26px 6px 12px",
    backgroundColor: "var(--clr-blue-light)",

    "&:focus": {
      borderRadius: "56px",
      borderColor: "red",
      outline: "none",
    },
  },
}));

// Custom style for Select dropdown
const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 180,
  },
  icon: {
    fill: "var(--clr-blue-footer)",
  },
}));

const RecommandedJobs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchJobsQueryInfo, setSearchJobsItemsQueryInfo] = useState({});
  const [searchResultsPerPage, setSearchResultsPerPage] = useState(10);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
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
    annualSalary: [0, 99],
  });
  const [userEmail, setUserEmail] = useState("");
  const [recommandedJobs, setRecommanedJobs] = useState([])
  const [update, setUpdate] = useState(false);
  const [openedItemId, setOpenedItemId] = useState(true);
  let [locationFilter, setLocationFilter] = useState([]);
  let [jobTypeFilter, setJobTypeFilter] = useState([]);
  let [specializationFilter, setSpecializationFilter] = useState([]);
  let [educationFilter, setEducationFilter] = useState([]);
  let [hospitalFilter, setHospitalFilter] = useState([]);
  const [exp, setExp] = useState(0);
  const [allSpecialization, setAllSpecialization] = useState([]);
  const [locationFilterOptions, setLocationFilterOptions] = useState([]);
  const [jobTypeFilterOptions, setJobTypeFilterOptions] = useState([]);
  const [educationFilterOptions, setEducationFilterOptions] = useState([]);
  const [primarySpecializationFilterOptions, setPrimarySpecializationFilterOptions] = useState([]);
  const [secondarySpecializationFilterOptions, setSecondarySpecializationFilterOptions] = useState([]);
  const [hospitalFilterOptions, setHospitalFilterOptions] = useState([]);
  const [experience, setExperience] = useState(0);
  const [savedJob, setSavedJob] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [newRecommandedJobs, setNewRecommandedJobs] = useState([]);
  const [loadingSkleton, setLoadingSkleton] = useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  document.title = "Recommended Jobs | MedLink Jobs";
  const handleClickAllFilter = () => {
    setOpen(!open);
  };

  const { refreshToken } = useAuth();
  // Access user
  const access_token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const getUserEmail = async () => {
    const res = await provider.getUser({ AccessToken: access_token });
    setUserEmail(res?.UserAttributes[2].Value);
  };
  useEffect(() => {
    if (!userEmail) {
      getUserEmail();
    }
  }, []);
  const filterLocation = locationFilter.toString();
  const filterJobType = jobTypeFilter.toString();
  const filterEducation = educationFilter.toString();
  const filterSpecialization = specializationFilter.toString();
  const filterHospital = hospitalFilter.toString();
  // Recommanded Jobs
  useEffect(() => {

    gqlquery(QUERY_SAVEDJOBS, null)
      .then((res) => res.json())
      .then((data) => setSavedJob(data?.data?.getSavedJobs));

    const QUERY_FOUR_RECOMMANDEDJOBS = {
      query: `query MyQuery {
        getRecommendedJobs(paginateFrom: ${pageCount}, sortBy: "vacancyType") {
          postedOn
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
          primarySpecialization
          qualification
          savedJob
          secondarySpecialization
          vacancyID
          vacancyType
        }
      }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_FOUR_RECOMMANDEDJOBS, null)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data?.data?.getRecommendedJobs);
        if (data?.data?.getRecommendedJobs) {
          console.log(data)
          setRecommanedJobs(data?.data?.getRecommendedJobs)
        }
      });
  }, [update]);


  // Date convention
  // useEffect(() => {
  //   recommandedJobs?.map((sr, i) => {
  //     const QUERY_ISJOBSAVEDORAPPLIED = {
  //       query: `query MyQuery {
  //           isJobApplied(vacancyID: ${Number(sr?.vacancyID)})  
  //                    {
  //                      appliedAt
  //                      jaID
  //                      savedJob
  //                      appliedJob
  //                      vacancyID
  //                   }
  //                 }
  //               `,
  //       variables: null,
  //       operationName: "MyMutation",
  //     };

  //     gqlquery(QUERY_ISJOBSAVEDORAPPLIED, null)
  //       .then((res) => res.json())
  //       .then((datas) => {
  //         // console.log(datas)
  //         if (datas?.data !== null) {
  //           // Object?.assign(sr, datas?.data?.isJobApplied);
  //           const newArray = [...savedJobArr, sr?.vacancyID]
  //           setSavedJobArr(newArray)
  //         }
  //         else {
  //           const newArray = [...savedJobArr, `${i}0000oo`]
  //           setSavedJobArr(newArray)
  //         }
  //       });
  //   });
  // }, [recommandedJobs]);

    
  useEffect(() => {
    setTimeout(() => {
      setLoadingSkleton(false);
    }, 2500)
  }, []);

  const tokens = async () => {
    const res = await refreshToken();
    console.log(res);
  }

  const getSavedJobs = (vacancyID) => {
    console.log(vacancyID)
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

    gqlquery(QUERY_ISJOBSAVEDORAPPLIED, null)
      .then((res) => res.json())
      .then(async (datas) => {
        // console.log(datas)
        if (datas?.data !== null) {
          // Object?.assign(sr, datas?.data?.isJobApplied);
          const result = await datas?.data?.isJobApplied.savedJob;
          return result;
        }
        else {
          return false;
        }
      });
  }
  // sort change
  const handleSortChange = (event) => {
    const QUERY_FOUR_RECOMMANDEDJOBS = {
      query: `query MyQuery {
          getRecommendedJobs(paginateFrom: 0, sortBy: ${event.target.value === "Date" ? '"postedOn desc"' : '"vacancyType"'}) {
            postedOn
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
            primarySpecialization
            qualification
            savedJob
            secondarySpecialization
            vacancyID
            vacancyType
          }
        }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_FOUR_RECOMMANDEDJOBS, null)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data?.data?.getRecommendedJobs);
        if (data?.data?.getRecommendedJobs) {
          setRecommanedJobs(data?.data?.getRecommendedJobs)
        }
      });
    setSort(event.target.value);
  };
  let maxSalary = Math.max.apply(Math, searchResults?.map(a => a?.maximumSalary));
  let minSalary = Math.min.apply(Math, searchResults?.map(a => a?.minimumSalary));
  let maxExp = Math.max.apply(Math, searchResults?.map(a => a?.experience));
  let minExp = Math.min.apply(Math, searchResults?.map(a => a?.experience));

  useEffect(() => {
    let specialization = [...primarySpecializationFilterOptions, ...secondarySpecializationFilterOptions];
    setAllSpecialization(specialization)
  }, [maxSalary, minSalary, maxExp, minExp])

  // View handle
  const handleSingleJob = (singlejob) => {
    const handleNavigate = () => {
      navigate(`/job-search-list/${singlejob.vacancyID}`, {
        state: { hospitalID: singlejob.vacancyID, location , hospitalName: singlejob.name},
      });
    };
    setTimeout(handleNavigate, 1000);
  };

  // page Count
  const handleIncreasePageCount = (eventName) => {
    if (eventName === 'increase') {
      setUpdate(prev => !prev);
      setPageCount(prev => prev + 10);
      setPage(prev => prev + 1);
    };
    if (eventName === 'decrease') {
      if (pageCount === 0) {
        setPageCount(prev => prev);
        setPage(prev => prev)
      } else {
        setPageCount(prev => prev - 10);
        setPage(prev => prev - 1);
        setUpdate(prev => !prev);
      }
    };
  };

  // handle Click
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

  // handle Change
  const handleChange = (prop) => (event) => {
    setForm({ ...values, [prop]: event.target.value });
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
        setUpdate(prev => !prev);
      })
      .finally((e) => console.log("saved this job"));
  };

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
        .then((data) => setUpdate(prev => !prev))
        .finally((e) =>
          console.log("Deleting Save Job from database")
        );
    } else {
      console.log("You don't want to delete this!");
    }
  };

  useEffect(() => {
    const QUERY_SEARCHJOBS = {
      query: `query MyQuery {
          searchJobs(
            location: "${filterLocation ? filterLocation : ''}", 
            title: "${jobsSearchInfo.jobTitle ? jobsSearchInfo.jobTitle : ''}", 
            education: "${filterEducation}", 
            experience: ${Number(experience)}, 
            hospital: "${filterHospital}", 
            jobType: "${filterJobType}", 
            maximumSalary: ${Number(form.annualSalary[1])}, 
            specialization: "${filterSpecialization}", 
            minimumSalary: ${Number(form.annualSalary[0])},
            pageNumber: ${Number(pageCount)},
            sortBy: ""
            ) {
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
              primarySpecialization
              qualification
              savedJob
              secondarySpecialization
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
        if (filterLocation !== '' || filterEducation !== '' || filterHospital !== '' || filterSpecialization !== '' || pageCount > 1) {
          setRecommanedJobs(data?.data?.searchJobs)
        }
        setSearchResults(data?.data?.searchJobs);
        // setRecommanedJobs(data?.data?.searchJobs);
        console.log(data);
        // form.annualSalary = [minSalary, maxSalary];
      });
    // getSearchQueryData();
  }, [pageCount, filterLocation, filterJobType, filterEducation, filterSpecialization, filterHospital]);

  useEffect(() => {
    const QUERY_FILTERJOBSBYLOCATION = {
      query: `query MyQuery {
          getSearchJobFilter(
              location: "${filterLocation}", 
              title: "${jobsSearchInfo?.jobTitle}", 
              specialization: "${filterSpecialization}", 
              minimumSalary: ${Number(form.annualSalary[0])}, 
              maximumSalary: ${Number(form.annualSalary[1])}, 
              jobType: "${filterJobType}", 
              hospital: "${filterHospital}", 
              filterColumn: "location", 
              experience: ${Number(experience)}, 
              education: "${filterEducation}"
                )
            }
                `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_FILTERJOBSBYLOCATION, null)
      // gqlquery(QUERY_FILTERJOBSBYLOCATION, null)
      .then((res) => res.json())
      .then((data) => {
        let json = JSON.stringify(data?.data?.getSearchJobFilter);
        let jsonbject = JSON.parse(data?.data?.getSearchJobFilter);
        setLocationFilterOptions(jsonbject);
      });

    const QUERY_FILTERJOBSBYJOBTYPE = {
      query: `query MyQuery {
          getSearchJobFilter(
              location: "${filterLocation}", 
              title: "${jobsSearchInfo?.jobTitle}", 
              specialization: "${filterSpecialization}", 
              minimumSalary: ${Number(form.annualSalary[0])}, 
              maximumSalary: ${Number(form.annualSalary[1])}, 
              jobType: "${filterJobType}", 
              hospital: "${filterHospital}", 
              filterColumn: "employmentType", 
              experience: ${Number(experience)}, 
              education: "${filterEducation}"
                )
            }
                `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_FILTERJOBSBYJOBTYPE, null)
      // gqlquery(QUERY_FILTERJOBSBYJOBTYPE, null)
      .then((res) => res.json())
      .then((data) => {
        let json = JSON.stringify(data?.data?.getSearchJobFilter);
        let jsonbject = JSON.parse(data?.data?.getSearchJobFilter);
        setJobTypeFilterOptions(jsonbject);
      });

    const QUERY_FILTERJOBSBYEDUCATION = {
      query: `query MyQuery {
          getSearchJobFilter(
              location: "${filterLocation}", 
              title: "${jobsSearchInfo?.jobTitle}", 
              specialization: "${filterSpecialization}", 
              minimumSalary: ${Number(form.annualSalary[0])}, 
              maximumSalary: ${Number(form.annualSalary[1])}, 
              jobType: "${filterJobType}", 
              hospital: "${filterHospital}", 
              filterColumn: "qualification", 
              experience: ${Number(experience)}, 
              education: "${filterEducation}"
                )
            }
                `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_FILTERJOBSBYEDUCATION, null)
      // gqlquery(QUERY_FILTERJOBSBYEDUCATION, null)
      .then((res) => res.json())
      .then((data) => {
        let json = JSON.stringify(data?.data?.getSearchJobFilter);
        let jsonbject = JSON.parse(data?.data?.getSearchJobFilter);
        setEducationFilterOptions(jsonbject);
      });

    const QUERY_FILTERJOBSBYPRIMARYSPECIALIZATION = {
      query: `query MyQuery {
          getSearchJobFilter(
              location: "${filterLocation}", 
              title: "${jobsSearchInfo?.jobTitle}", 
              specialization: "${filterSpecialization}", 
              minimumSalary: ${Number(form.annualSalary[0])}, 
              maximumSalary: ${Number(form.annualSalary[1])}, 
              jobType: "${filterJobType}", 
              hospital: "${filterHospital}", 
              filterColumn: "primarySpecialization", 
              experience: ${Number(experience)}, 
              education: "${filterEducation}"
                )
            }
                `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_FILTERJOBSBYPRIMARYSPECIALIZATION, null)
      // gqlquery(QUERY_FILTERJOBSBYPRIMARYSPECIALIZATION, null)
      .then((res) => res.json())
      .then((data) => {
        let json = JSON.stringify(data?.data?.getSearchJobFilter);
        let jsonbject = JSON.parse(data?.data?.getSearchJobFilter);
        setPrimarySpecializationFilterOptions(jsonbject);
      });

    const QUERY_FILTERJOBSBYSECONDARYSPECIALIZATION = {
      query: `query MyQuery {
          getSearchJobFilter(
              location: "${filterLocation}", 
              title: "${jobsSearchInfo?.jobTitle}", 
              specialization: "${filterSpecialization}", 
              minimumSalary: ${Number(form.annualSalary[0])}, 
              maximumSalary: ${Number(form.annualSalary[1])}, 
              jobType: "${filterJobType}", 
              hospital: "${filterHospital}", 
              filterColumn: "secondarySpecialization", 
              experience: ${Number(experience)}, 
              education: "${filterEducation}"
                )
            }
                `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_FILTERJOBSBYSECONDARYSPECIALIZATION, null)
      // gqlquery(QUERY_FILTERJOBSBYSECONDARYSPECIALIZATION, null)
      .then((res) => res.json())
      .then((data) => {
        let json = JSON.stringify(data?.data?.getSearchJobFilter);
        let jsonbject = JSON.parse(data?.data?.getSearchJobFilter);
        setSecondarySpecializationFilterOptions(jsonbject);
      });

    const QUERY_FILTERJOBSBYHOSPITAL = {
      query: `query MyQuery {
          getSearchJobFilter(
              location: "${filterLocation}", 
              title: "${jobsSearchInfo?.jobTitle}", 
              specialization: "${filterSpecialization}", 
              minimumSalary: ${Number(form.annualSalary[0])}, 
              maximumSalary: ${Number(form.annualSalary[1])}, 
              jobType: "${filterJobType}", 
              hospital: "${filterHospital}", 
              filterColumn: "name", 
              experience: ${Number(experience)}, 
              education: "${filterEducation}"
                )
            }
                `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_FILTERJOBSBYHOSPITAL, null)
      // gqlquery(QUERY_FILTERJOBSBYHOSPITAL, null)
      .then((res) => res.json())
      .then((data) => {
        let json = JSON.stringify(data?.data?.getSearchJobFilter);
        let jsonbject = JSON.parse(data?.data?.getSearchJobFilter);
        setHospitalFilterOptions(jsonbject);
      });

  }, [update, form, experience, filterLocation, filterJobType, filterEducation, filterSpecialization, filterHospital])
  if (searchResults?.length) {
    // searchJobsQueryInfo.jobTitle = searchResults[0]?.jobTitle;
    // searchJobsQueryInfo.location = searchResults[0]?.location;
    if (jobsSearchInfo?.jobTitle !== "") {
      // console.log("jobtitle needed here", jobsSearchInfo?.jobTitle)
      searchJobsQueryInfo.jobTitle = jobsSearchInfo?.jobTitle;
    }
    if (jobsSearchInfo?.location !== "") {
      // console.log("loction needed here", jobsSearchInfo?.location)
      searchJobsQueryInfo.location = jobsSearchInfo?.location;
    }
  };

  useEffect(() => {
    console.log('recommandedJobs -----', recommandedJobs)
    const newJobs = recommandedJobs?.map((searchResult) => {
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
        name: searchResult?.name,
        savedJob: searchResult?.savedJob
      };
    });
    // console.log(newJobs);
    if (newJobs.length > 0) {
      setNewRecommandedJobs(newJobs);
    }
  }, [recommandedJobs])

  return (
    <Box>
      {
        !loadingSkleton ? 
        (
          <Box>
          {access_token || userEmail ? (
            <Box>
            {
                matches &&
                <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
                <MenuIcon sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Recommended Jobs</Typography>
                </Box>
              }
              {
                !matches ? (
                  <Box>
                  <Box style={{ backgroundImage: `url(${banner_bg})`, backgroundSize: "cover" }} sx={{ px: 6, py: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{
                            color: "var(--clr-white)",
                            fontWeight: "600",
                            fontSize: "18px",
                          }}
                        >
                          Showing All Recommended Jobs
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
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
                                  placeholder="Search"
                                  style={{ borderBottom: "none" }}
                                  endAdornment={
                                    <InputAdornment position="end" style={{ outline: "none" }}>
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                      >
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
                                  value={form.annualSalary}
                                  min={0}
                                  max={99}
                                  marks={[
                                    {
                                      value: 0,
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
                                  placeholder="Search"
                                  endAdornment={
                                    <InputAdornment position="end" style={{ outline: "none" }}>
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                      >
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
                                  placeholder="Search"
                                  endAdornment={
                                    <InputAdornment position="end" style={{ outline: "none" }}>
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                      >
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
                                  placeholder="Search"
                                  style={{ borderBottom: "none" }}
                                  endAdornment={
                                    <InputAdornment position="end" style={{ outline: "none" }}>
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        edge="end"
                                      >
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
                            justifyContent: "space-between",
                            alignItems: "center",
                            py: 1,
                            mb: 1.5,
                          }}
                        >
                          <Typography variant="body2" sx={{ color: "var(--clr-secondayGray-2)" }}>
                            {pageCount + 1} - {newRecommandedJobs?.length < 10 ? pageCount + newRecommandedJobs?.length : pageCount + 10} &nbsp;
                            Jobs In All Recommended Jobs
                          </Typography>
                          <FormControl
                            size="small"
                            sx={{
                              minWidth: 130,
                            }}
                          >
                            <Select
                              value={sort}
                              onChange={handleSortChange}
                              inputProps={{ classes: { icon: classes.icon } }}
                              input={<CustomSelectInput />}
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                              displayEmpty
                            >
                              {/*  <MenuItem value="" value={values[0]} disabled>
                              Sort By
                            </MenuItem>
                            {values?.map((value) => (
                              <MenuItem value={value} key={value}>
                                {value}
                              </MenuItem>
                            ))} */}
                              <MenuItem value="" disabled>Sort By</MenuItem>
                              <MenuItem value="Salary" key={"Salary"}>Relevance</MenuItem>
                              <MenuItem value="Date" key={"Date"}>Date</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                          }}
                        >
                          {/* {console.log(newRecommandedJobs.length)}
                          {console.log(savedJobArr.length)} */}
                          {newRecommandedJobs
                            ?.map((job) => (
                              <Box
                                key={job?.id}
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
                                  onClick={() => handleSingleJob(job)}
                                  sx={{
                                    color: "#395987",
                                    fontWeight: "600",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {job?.jobTitle}
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  component="div"
                                  sx={{
                                    color: "#333333",
                                    fontWeight: "600",
                                  }}
                                >
                                  {job?.name}
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
                                    {job?.description?.replaceAll("<br />", "\n")}
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
                                    <Typography
                                      variant="subtitle2"
                                      component="div"
                                      sx={{
                                        lineHeight: "14px",
                                        color: "#333333",
                                        fontWeight: "600",
                                      }}
                                    >
                                      {job?.primarySpecialization?.replaceAll(",",", ")}
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
                                      {job?.secondarySpecialization?.replaceAll(",",", ")}
                                    </Typography>
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
                                      {job?.location}
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
                                      {job?.experience}{" "}
                                      {job?.experience === 1 ? "Year" : "Years"}
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
                                      ₹
                                      {job?.maximumSalary >= 100000 ? <>{(
                                    Math.round(
                                      (job?.maximumSalary / 100000) * 100
                                    ) / 100
                                  ).toFixed(2)} L</>  : <>{job?.maximumSalary >= 1000 ?  <>{(
                                    Math.round(
                                      (job?.maximumSalary / 1000) * 100
                                    ) / 100
                                  ).toFixed(2)}{" "}L</> : <>{job?.maximumSalary}{" "}L</>}</>}{" "}
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
                                        {job?.date_diff_indays()?.month ? (
                                          <>
                                            {job?.date_diff_indays()?.month}{" "}
                                            {job?.date_diff_indays()?.month === 1
                                              ? "month"
                                              : "months"}{" "}
                                            {job?.date_diff_indays()?.day ? (
                                              <>
                                                {job?.date_diff_indays()?.day}{" "}
                                                {job?.date_diff_indays()?.day === 1
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
                                            {job?.date_diff_indays()?.days}{" "}
                                            {job?.date_diff_indays()?.days === 1
                                              ? "day"
                                              : "days"}{" "}
                                            {"ago"}
                                          </>
                                        )}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Box>
                                    {(((savedJob?.find(idx => idx?.vacancyID === job?.vacancyID)?.vacancyID) === job?.vacancyID)) && (
                                      <Button
                                        onClick={() => handleDeleteSavedJobs(job?.vacancyID)}
                                        sx={{ width: "max-content", backgroundColor: "var(--clr-blue-light) !important", padding: "3px 12px !important", borderRadius: 16, "&:hover": { backgroundColor: "var(--clr-blue-light) !important" } }}>
                                        <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                          <StarIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Saved</span>
                                        </Typography>
                                      </Button>
                                    )}
                                    {(((savedJob?.find(idx => idx?.vacancyID === job?.vacancyID)?.vacancyID) !== job?.vacancyID)) && (
                                      <Button
                                        onClick={() => handleSaveJob(job?.vacancyID)}
                                        // diababled
                                        sx={{ width: "max-content", border: "1px solid var(--clr-blue-footer) !important", gap: 1, padding: "3px 12px !important", borderRadius: 16, color: "#395987 !important", fontWeight: "600", py: 1 }}>
                                        <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                          <StarBorderIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Save Job</span>
                                        </Typography>
                                      </Button>
                                    )}
                                  </Box>
                                </Box>
                              </Box>
                            ))}
                        </Box>
                        {
                          recommandedJobs?.length >= 1 && page >= 1 &&
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              pt: 2,
                            }}
                          >
                            <Box>
                              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {
                                  page > 1 ? <ArrowBackIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("decrease")} /> : <ArrowBackIcon sx={{ color: "#395987" }} />
                                }
                                <Typography sx={{ color: "#395987", fontWeight: 600, px: 2 }}> {page}</Typography>
                                {
                                  recommandedJobs?.length >= 10 ?
                                    <ArrowForwardIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("increase")} />
                                    :
                                    <ArrowForwardIcon sx={{ color: "#395987" }} />
                                }
                              </Box>
                            </Box>
                          </Box>
                        }
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                ) : (
                  <Box>
                  <Box sx={{ px: 2, py: 3 }}>
                  <Typography
                    sx={{
                      color: "#333333",
                      fontWeight: "600",
                      fontSize: "18px",
                    }}
                  >
                    Showing All Recommended Jobs
                  </Typography>
                    
                  </Box>
                  <Box sx={{ px: 1.5, py: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            diplay: "flex",
                            flexDirection: "column",
                            gap: 3,
                          }}
                        >
                          {/* All Filters */}
                          <Box>
                            <Box
                              onClick={handleClickAllFilter}
                              sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                                justifyContent: "space-between",
                                backgroundColor: "var(--clr-blue-light)",
                                px: 2.5,
                                py: 1.5,
                                mb: 1.5,
                                borderTopLeftRadius: "6px",
                                borderTopRightRadius: "6px",
                              }}
                            >
                              <Box
                              sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center"
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
                              <Box>
                                {open ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          color: "var(--clr-blue-footer)",
                                          textAlign: "right"
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          color: "var(--clr-blue-footer)",
                                          alignItems: "right"
                                        }}
                                      />
                                    )}
                              </Box>
                            </Box>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <Box>
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
                                          placeholder="Search"
                                          style={{ borderBottom: "none" }}
                                          endAdornment={
                                            <InputAdornment position="end" style={{ outline: "none" }}>
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                              >
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
                                        value={form.annualSalary}
                                        min={0}
                                        max={99}
                                        marks={[
                                          {
                                            value: 0,
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
                                        placeholder="Search"
                                        endAdornment={
                                          <InputAdornment position="end" style={{ outline: "none" }}>
                                            <IconButton
                                              aria-label="toggle password visibility"
                                              edge="end"
                                            >
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
                                        placeholder="Search"
                                        endAdornment={
                                          <InputAdornment position="end" style={{ outline: "none" }}>
                                            <IconButton
                                              aria-label="toggle password visibility"
                                              edge="end"
                                            >
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
                                        placeholder="Search"
                                        style={{ borderBottom: "none" }}
                                        endAdornment={
                                          <InputAdornment position="end" style={{ outline: "none" }}>
                                            <IconButton
                                              aria-label="toggle password visibility"
                                              edge="end"
                                            >
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
                            </Collapse>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                      <Typography sx={{ color: "var(--clr-secondayGray-2)", pb:"10px" }}>
                            {pageCount + 1} - {newRecommandedJobs?.length < 10 ? pageCount + newRecommandedJobs?.length : pageCount + 10} &nbsp;
                            Jobs In All Recommended Jobs
                          </Typography>
                          <FormControl
                            size="small"
                            sx={{
                              minWidth: 130,
                              pb:"25px" 
                            }}
                          >
                            <Select
                              value={sort}
                              onChange={handleSortChange}
                              inputProps={{ classes: { icon: classes.icon } }}
                              input={<CustomSelectInputResponsive />}
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                              displayEmpty
                            >
                              {/*  <MenuItem value="" value={values[0]} disabled>
                              Sort By
                            </MenuItem>
                            {values?.map((value) => (
                              <MenuItem value={value} key={value}>
                                {value}
                              </MenuItem>
                            ))} */}
                              <MenuItem value="" disabled>Sort By</MenuItem>
                              <MenuItem value="Date" key={"Date"}>Date</MenuItem>
                              <MenuItem value="Salary" key={"Salary"}>Salary</MenuItem>
                              <MenuItem value="Location" key={"location"}>Location</MenuItem>
                            </Select>
                          </FormControl>
  
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                          }}
                        >
                          {/* {console.log(newRecommandedJobs.length)}
                          {console.log(savedJobArr.length)} */}
                          {newRecommandedJobs
                            ?.map((job) => (
                              <Box
                                key={job.id}
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
                                  onClick={() => handleSingleJob(job)}
                                  sx={{
                                    color: "#395987",
                                    fontWeight: "600",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {job?.jobTitle}
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  component="div"
                                  sx={{
                                    color: "#333333",
                                    fontWeight: "600",
                                  }}
                                >
                                  {job.name}
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 1,
                                    pr: 2,
                                    pb:"17px"
                                  }}
                                >
                                  <DescriptionOutlinedIcon
                                    sx={{ color: "#C7D3E3" }}
                                  />
                                  <Typography
                                    sx={{ color: "#4F4F4F" }}
                                  >
                                    {job?.description?.replaceAll("<br />", "\n")}
                                  </Typography>
                                </Box>
  
                                <Grid container spacing={2}>
                                  <Grid item xs={4}>
                                  <Typography
                                    sx={{
                                      color: "#333333",
                                      fontWeight: "600",
                                      fontSize: "18px"
                                    }}
                                  >
                                    Key Skills
                                  </Typography>
                                  </Grid>
                                  <Grid item xs={8}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 2,
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        // lineHeight: "14px",
                                        color: "#333333",
                                        fontWeight: "600",
                                        fontSize: "14px"
                                      }}
                                    >
                                      {job?.primarySpecialization?.replaceAll(",",", ")}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        // lineHeight: "14px",
                                        color: "#333333",
                                        fontWeight: "600",
                                        fontSize: "14px"
                                      }}
                                    >
                                      {job?.secondarySpecialization?.replaceAll(",",", ")}
                                    </Typography>
                                  </Box>
                                  </Grid>
                                </Grid>
  
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
                                      {job?.location}
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
                                      {job?.experience}{" "}
                                      {job?.experience === 1 ? "Year" : "Years"}
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
                                      {job?.maximumSalary} {"INR"}
                                      
                                    </Typography>
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
                                        {job?.date_diff_indays()?.month ? (
                                          <>
                                            {job?.date_diff_indays()?.month}{" "}
                                            {job?.date_diff_indays()?.month === 1
                                              ? "month"
                                              : "months"}{" "}
                                            {job?.date_diff_indays()?.day ? (
                                              <>
                                                {job?.date_diff_indays()?.day}{" "}
                                                {job?.date_diff_indays()?.day === 1
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
                                            {job?.date_diff_indays()?.days}{" "}
                                            {job?.date_diff_indays()?.days === 1
                                              ? "day"
                                              : "days"}{" "}
                                            {"ago"}
                                          </>
                                        )}
                                      </Typography>
                                    </Box>
                                  </Box>
                                  <Box>
                                    {(((savedJob?.find(idx => idx?.vacancyID === job?.vacancyID)?.vacancyID) === job?.vacancyID)) && (
                                      <Button
                                        onClick={() => handleDeleteSavedJobs(job?.vacancyID)}
                                        sx={{ width: "max-content", backgroundColor: "var(--clr-blue-light) !important", padding: "3px 12px !important", borderRadius: 16, "&:hover": { backgroundColor: "var(--clr-blue-light) !important" } }}>
                                        <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                          <StarIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Saved</span>
                                        </Typography>
                                      </Button>
                                    )}
                                    {(((savedJob?.find(idx => idx?.vacancyID === job?.vacancyID)?.vacancyID) !== job?.vacancyID)) && (
                                      <Button
                                        onClick={() => handleSaveJob(job?.vacancyID)}
                                        // diababled
                                        sx={{ width: "max-content", border: "1px solid var(--clr-blue-footer) !important", gap: 1, padding: "3px 12px !important", borderRadius: 16, color: "#395987 !important", fontWeight: "600", py: 1 }}>
                                        <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                          <StarBorderIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Save Job</span>
                                        </Typography>
                                      </Button>
                                    )}
                                  </Box>
                                </Box>
                              </Box>
                            ))}
                        </Box>
                        {
                          recommandedJobs?.length >= 1 && page >= 1 &&
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              pt: 2,
                            }}
                          >
                            <Box>
                              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {
                                  page > 1 ? <ArrowBackIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("decrease")} /> : <ArrowBackIcon sx={{ color: "#395987" }} />
                                }
                                <Typography sx={{ color: "#395987", fontWeight: 600, px: 2 }}> {page}</Typography>
                                {
                                  recommandedJobs?.length >= 10 ?
                                    <ArrowForwardIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("increase")} />
                                    :
                                    <ArrowForwardIcon sx={{ color: "#395987" }} />
                                }
                              </Box>
                            </Box>
                          </Box>
                        }
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                )
              }
            </Box>
  
          ) : (
            <Navigate to="/login" />
          )}
        </Box>
        ) : (
          <Box>
          <Box>
            <Skeleton variant="rectangular" animation="wave" width="100%" height="10vh" />
          </Box>
          <Box mixWidth="xl" sx={{ mx: 5, px: 2, mt: 5 }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={2.5}>
                <Skeleton variant="rectangular" animation="wave" width="100%" height={matches ? "20vh" : "60vh" }/>
              </Grid>
              <Grid item xs={12} md={8} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Skeleton variant="rectangular" animation="wave" width="100%" height="20vh" />
                <Skeleton variant="rectangular" animation="wave" width="100%" height="20vh" />
                <Skeleton variant="rectangular" animation="wave" width="100%" height="20vh" />
                <Skeleton variant="rectangular" animation="wave" width="100%" height="20vh" />
              </Grid>
            </Grid>
          </Box>
         </Box>
        )
      }

    </Box>
  );
};

export default RecommandedJobs;