/* eslint-disable eqeqeq */
/* eslint-disable no-useless-computed-key */
import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
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
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputBase,
  MenuItem, Select, Skeleton, Typography, useMediaQuery, useTheme
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import { gqlOpenQuery, gqlquery, QUERY_SAVEDJOBS } from "../../api";
import banner_bg from "../../assets/images/job-search-bg.png";
import useAuth from "../../hooks/useAuth";
import MenuIcon from '@mui/icons-material/Menu';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const values = ["Date", "Salary", "Location"];

const SearchButton = styled(Button)(() => ({
  backgroundColor: "var(--clr-blue-primary)",
  color: "var(--clr-white) !important",
  fontSize: "14px",
  fontWeight: "600",
  borderRadius: "50px",
  "&:hover": {
    backgroundColor: "var(--clr-blue-secondary) !important",
    color: "var(--clr-white) !important",
  }
}));

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
    fontSize: "14px",
    color: "var(--clr-blue-footer)",
    padding: "6px 16px 6px 16px",
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



const RedirectToSignUpFlow = (props) => {
  const navigate = useNavigate();
  const [checkLoading, setCheckLoading] = useState(true);
  const { isLoading, getUserName, userName } = useAuth();
 
  const flow = sessionStorage.getItem('flow');
 
  useEffect(() => {
    if (sessionStorage.getItem("accessToken") !== null) {
      getUserName();
    } else{
      setCheckLoading(false);
    }
  }, []);
 
  if (!isLoading  || !checkLoading) {
    return (flow === "jobSeeker" && userName === undefined) ? <Navigate to="/signup2" /> : props.children;
  }
  else {
    return (
      <Box>
        <Box>
          <Skeleton variant="rectangular" animation="wave" width="100%" height="30vh" />
        </Box>
        <Box mixWidth="xl" sx={{ mx: 5, px: 2, mt: 5 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={2.3}>
              <Skeleton variant="rectangular" animation="wave" width="100%" height="50vh" />
            </Grid>
            <Grid item xs={8} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Skeleton variant="rectangular" animation="wave" width="100%" height="20vh" />
              <Skeleton variant="rectangular" animation="wave" width="100%" height="20vh" />
              <Skeleton variant="rectangular" animation="wave" width="100%" height="20vh" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}


// TODO : bug in filter options salaryRange in job search list;
// TODO : bug in filter options experienceRange in job search list;

const JobSearchList = () => {

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchJobsQueryInfo, setSearchJobsItemsQueryInfo] = useState({});
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);
  const [searchResultsPerPage, setSearchResultsPerPage] = useState(10);
  const {jobSearch, setJobSearch} = useAuth(); 
 
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
  const [searchForm, setSearchForm] = useState({
    location: '',
    education: '',
    jobType: '',
    hospital: '',
    specialization: '',
  })
  const [update, setUpdate] = useState(false);
  const [openedItemId, setOpenedItemId] = useState(true);
  let [allFilterOptions, setAllFilterOptions] = useState([]);
  let [locationFilter, setLocationFilter] = useState([]);
  let [jobTypeFilter, setJobTypeFilter] = useState([]);
  let [specializationFilter, setSpecializationFilter] = useState([]);
  let [educationFilter, setEducationFilter] = useState([]);
  let [hospitalFilter, setHospitalFilter] = useState([]);
  const [exp, setExp] = useState(0);
  const [allSpecialization, setAllSpecialization] = useState([]);
  const [allSpecializationTemp, setAllSpecializationTemp] = useState([])
  const [locationFilterOptions, setLocationFilterOptions] = useState([]);
  const [locationFilterTemp, setLocationFilterTemp] = useState([]);
  const [jobTypeFilterOptions, setJobTypeFilterOptions] = useState([]);
  const [educationFilterOptions, setEducationFilterOptions] = useState([]);
  const [educationFilterTemp, setEducationFilterTemp] = useState([])
  const [primarySpecializationFilterOptions, setPrimarySpecializationFilterOptions] = useState([]);
  const [specializationFilterOptions, setSpecializationFilterOptions] = useState([]);
  const [hospitalFilterOptions, setHospitalFilterOptions] = useState([]);
  const [hospitalFilterTemp, setHospitalFilterTemp] = useState([]);
  const [experience, setExperience] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  // const [disablePaginationArray, setDisablePaginationArray] = useState(false); 
  const classes = useStyles();
  const [savedJobs, setSavedJobs] = useState([]);
  const [presentSearchInfo, setPresentSearchInfo] = useState({}) 
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [newSearchResults, setNewSearchResults] = useState([])
  const [checkedLocation, setCheckedLocation] = useState('');
  const [open, setOpen] = useState(false);
  const [searchKeywords, setsearchKeywords] = useState({})
  const [filterUpdated, setFilterUpdated] = useState(false);
  let [newObj, setNewObj] = useState({});
  let [searchParams, setSearchParams] = useSearchParams();
  const initialUpdater = useRef(null);
  const initialUpdaaterLocaiton = useRef('');

  let allSearchQueryParameters = Object.fromEntries([...searchParams]);

  console.log('this is search query', allSearchQueryParameters)

  const handleClickAllFilter = () => {
    setOpen(!open);
  };

  function titleCase(string) {
    let sentence = string?.toLowerCase()?.split(" ");
    for (var i = 0; i < sentence?.length; i++) {
      sentence[i] = sentence[i][0]?.toUpperCase() + sentence[i]?.slice(1);
    }
    return sentence?.join(" ");
  }

  let title = titleCase(allSearchQueryParameters?.jobTitle);

  document.title = `${title !== "undefined" ? title : "All"} Jobs ${allSearchQueryParameters?.location ? `in ${allSearchQueryParameters?.location}` : ""} | MedLink Jobs`;
  
  const recentSearch = sessionStorage.getItem('recentSearch') && JSON.parse(sessionStorage.getItem('recentSearch'));
  // console.log('search result by ahan', searchResults)
  // http://localhost:3000/job-search-list?jobTitle=doctor&specialization=&location=Bhikiyasen%2C+Uttarakhand&annualSalaryStart=17&annualSalaryEnd=72&exp=50
  // https://ultimatecourses.com/blog/query-strings-search-params-react-router
  // https://ultimatecourses.com/blog/navigate-to-url-query-strings-search-params-react-router

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, pageCount]);

  const handleIncreasePageCount = (eventName) => {
    if (eventName === 'increase') {
      setUpdate(prev => !prev);
      setPageCount(prev => prev + 1);
      setSearchParams({...allSearchQueryParameters, "pageNo": pageCount + 1});
    };
    if (eventName === 'decrease') {
      if (pageCount === 1) {
        setPageCount(prev => prev);
        setSearchParams({...allSearchQueryParameters, "pageNo": 1});
      } else {
        setPageCount(prev => prev - 1);
        setSearchParams({...allSearchQueryParameters, "pageNo": pageCount - 1});
      }
    };
  };

  const handleSearchInput = (prop) => (event) => {
    setJobsSearchInfo({ ...jobsSearchInfo, [prop]: event.target.value });
    setJobSearch({...jobSearch, [prop]: event.target.value})
  };

  const handleChangeExperience = (event, newValue) => {
    setSearchParams({...allSearchQueryParameters, "expFilter": newValue});
    if(newValue === 0) {
      searchParams?.delete("expFilter")
      const newParams = Object.fromEntries([...searchParams]);
      navigate({
        pathname: "/job-search-list", 
        search: `?${createSearchParams({...newParams})}`,
      });
    }
    setExperience(newValue);
  };

  const handleChange = (prop) => (event) => {
    console.log(prop, event.target.value)
    setForm({ ...form, [prop]: event.target.value });
    // 
    switch (prop) {
      case "annualSalary":
        if(event.target.value[0] === 0 && event.target.value[1] === 99) {
          searchParams?.delete("annualSalaryStart")
          searchParams?.delete("annualSalaryEnd")
          const newParams = Object.fromEntries([...searchParams]);
          navigate({
            pathname: "/job-search-list", 
            search: `?${createSearchParams({...newParams})}`,
          });
          return;
        }
        setSearchParams({...allSearchQueryParameters, "annualSalaryStart": event.target.value[0], "annualSalaryEnd": event.target.value[1]});
        break;
      case "exp":

        break;
      default:
        
    }
  };

  const handleExperienceChange = () => {
    setExp(exp);
  }

  const handleClearFilter = () => {
    setSearchParams({"jobTitle": allSearchQueryParameters?.jobTitle || "", "specialization": allSearchQueryParameters?.specialization || "", "location": allSearchQueryParameters?.location || "" });
    if(allSearchQueryParameters?.pageNo){
      allSearchQueryParameters.pageNo = 1;
    }
    setPageCount(() => 1)
    setAllSpecializationTemp(allSpecialization)
    setLocationFilterTemp(locationFilterOptions)
    setEducationFilterTemp(educationFilterOptions)
    setHospitalFilterTemp(hospitalFilterOptions)
    setJobsSearchInfo({...jobsSearchInfo, ['location']: ''})
    setJobSearch({...jobSearch, ['location']: ''})
    setForm({
      ...form,
      location: "",
      qualification: "",
      employmentType: "",
      experience: 0,
      lastDateToApply: new Date(),
      description: "",
      annualSalary: [0, 99],
    });
    setExperience(0);
    initialUpdaaterLocaiton.current='';
    setLocationFilter([]);
    setEducationFilter([]);
    setJobTypeFilter([]);
    setHospitalFilter([]);
    setSpecializationFilter([]);
    setCheckedLocation('')
    sessionStorage.setItem('recentSearch', JSON.stringify({...jobsSearchInfo, ['location']: ''}));
    setSearchForm({location: '',
    education: '',
    jobType: '',
    hospital: '',
    specialization: '',})
    setTimeout(() => {
      setFilterUpdated(pre => !pre);
      setUpdate(prev => !prev);
    }, 1000)
  }

  let getFilterSearchParams = (newParams) => {
    // console.log(newParams)
    // for (var k in newParams) {
    //   if (newParams[k]?.length > 0) {
    //     newObj[k] = newParams[k]?.join(",");
    //   } else {
    //     console.log(allSearchQueryParameters[k], newObj[k])
    //     delete newObj[k];
    //   }
    // }
    // setSearchParams({ ...allSearchQueryParameters, ...newObj });
    // return newObj;
  }

  const handleCheckboxLocation = (value) => {
    let name = value?.toLowerCase();
    console.log("before katakati", locationFilter, 21, locationFilter.includes(name))
    if (locationFilter.includes(name)) {
      console.log("biyog")
      const xyz = locationFilter.indexOf(name);
      if (xyz > -1) {
        locationFilter.splice(xyz, 1);
        setSearchParams({ ...allSearchQueryParameters, "locationFilter": locationFilter?.join(",") });
        if (locationFilter.length === 0) {
          setJobsSearchInfo({ ...jobsSearchInfo, ['location']: '' })
          setJobSearch({ ...jobSearch, ['location']: '' })
          searchParams?.delete("locationFilter")
          const newParams = Object.fromEntries([...searchParams]);
          setSearchParams({...newParams})
          sessionStorage.setItem('recentSearch', JSON.stringify({ ...jobSearch, ['location']: '' }))
        }
        getFilterSearchParams(locationFilter)
      }
    }
    else {
      console.log("jog")
      setLocationFilter([...locationFilter, name]);
      let addedNewLocationFilter = [...locationFilter, name]
      setSearchParams({ ...allSearchQueryParameters, "locationFilter": addedNewLocationFilter?.join(",") });
    };
    setPageCount(1);
    setUpdate(prev => !prev);
  };
  const filterLocation = locationFilter?.join(", ");

  const handleSearchLocation = (event) => {
    const value = event.target.value;
    setSearchForm({...searchForm, ['location']: value})
    if(value.length > 2) {
      const newStr = locationFilterOptions.filter(words => {
        if (words.location.toLowerCase().includes(value.toLowerCase())) {
          return words.location;
        }
      });
      if(newStr.length > 0) {
      setLocationFilterTemp(newStr)
    } 
    }
    if(value.length <= 2) {
      setLocationFilterTemp(locationFilterOptions)
    }
  };
  const handleCheckboxJobType = (name) => {
    if (jobTypeFilter.includes(name)) {
      const xyz = jobTypeFilter.indexOf(name);
      if (xyz > -1) {
        jobTypeFilter.splice(xyz, 1);
        setSearchParams({ ...allSearchQueryParameters, "jobTypeFilter": jobTypeFilter?.join(",") });
        console.log(jobTypeFilter, 2, searchParams?.get("jobTypeFilter"))
        if (jobTypeFilter?.length === 0) {
          searchParams?.delete("jobTypeFilter")
          const newParams = Object.fromEntries([...searchParams]);
          setSearchParams({...newParams})
        }
      }
    } else {
      setJobTypeFilter([...jobTypeFilter, name]);
      let addedJobTypeFilter = [...jobTypeFilter, name]
      setSearchParams({ ...allSearchQueryParameters, "jobTypeFilter": addedJobTypeFilter?.join(",") });
    };
    setPageCount(1);
    setUpdate(prev => !prev);
  };
  const filterJobType = jobTypeFilter.toString();

  const handleCheckboxEducation = (name) => {
    // let name = value?.toLowerCase()?.replace("/", "//");
    if (educationFilter.includes(name)) {
      const xyz = educationFilter.indexOf(name);
      if (xyz > -1) {
        educationFilter.splice(xyz, 1);
        setSearchParams({ ...allSearchQueryParameters, "educationFilter": educationFilter?.join(",") });
        if (educationFilter?.length === 0) {
          searchParams?.delete("educationFilter")
          const newParams = Object.fromEntries([...searchParams]);
          setSearchParams({...newParams})
        }
      }
    } else {
      setEducationFilter([...educationFilter, name]);
      let addedNewEducationFilter = [...educationFilter, name]
      setSearchParams({ ...allSearchQueryParameters, "educationFilter": addedNewEducationFilter?.join(",") });
    };
    setPageCount(1);
    setUpdate(prev => !prev);
  };
  const filterEducation = educationFilter.toString();

  const handleSearchEducation = (event) => {
    const value = event.target.value;
    setSearchForm({...searchForm, ['education']: value})
    if(value.length > 1) {
      const newStr = educationFilterOptions.filter(words => {
        if (words.qualification.toLowerCase().includes(value.toLowerCase())) {
          return words.qualification;
        }
      });
      if(newStr.length > 0) {
        setEducationFilterTemp(newStr)
      } 
    }
    if(value.length <= 1) {
      setEducationFilterTemp(educationFilterOptions)
    }
  }

  const handleCheckboxSpecialization = (name) => {
    console.log(name)
    if (specializationFilter.includes(name)) {
      const xyz = specializationFilter.indexOf(name);
      if (xyz > -1) {
        specializationFilter.splice(xyz, 1);
        setSearchParams({ ...allSearchQueryParameters, "specializationFilter": specializationFilter?.join(",") });
        if (specializationFilter?.length === 0) {
          searchParams?.delete("specializationFilter")
          const newParams = Object.fromEntries([...searchParams]);
          setSearchParams({...newParams})
        }
      }
    } else {
      setSpecializationFilter([...specializationFilter, name]);
      let addedNewSpecFilter = [...specializationFilter, name]
      setSearchParams({ ...allSearchQueryParameters, "specializationFilter": addedNewSpecFilter?.join(",") });
    };
    setPageCount(1);
    setUpdate(prev => !prev);
  };
  const filterSpecialization = specializationFilter.toString();

  const handleSearchSpecial = (event) => {
    const value = event.target.value;
    setSearchForm({...searchForm, ['specialization']: value})
    if(value.length > 2) {
      const newStr =  [...allSpecialization].filter(words => {
        if (words.toLowerCase().includes(value.toLowerCase())) {
          return words;
        }
      });
      if(newStr.length > 0) {
        setAllSpecializationTemp([...newStr])
      }
    }
    if(value.length <= 2) {
      setAllSpecializationTemp([...allSpecialization])
    }
  }

  const handleCheckboxHospital = (name) => {
    if (hospitalFilter.includes(name)) {
      const xyz = hospitalFilter.indexOf(name);
      if (xyz > -1) {
        hospitalFilter.splice(xyz, 1);
        setSearchParams({ ...allSearchQueryParameters, "hospitalFilter": hospitalFilter?.join(",") });
        if (hospitalFilter?.length === 0) {
          searchParams?.delete("hospitalFilter")
          const newParams = Object.fromEntries([...searchParams]);
          setSearchParams({...newParams})
        }
      }
    } else {
      setHospitalFilter([...hospitalFilter, name]);
      let addedNewHospitalFilter = [...hospitalFilter, name]
      setSearchParams({ ...allSearchQueryParameters, "hospitalFilter": addedNewHospitalFilter?.join(",") });
    };
    setPageCount(1);
    setUpdate(prev => !prev);
  };
  const filterHospital = hospitalFilter.toString();

  const handleSearchHospital = (event) => {
    const value = event.target.value;
    setSearchForm({...searchForm, ['hospital']: value})
    if(value.length > 2) {
      const newStr = hospitalFilterOptions.filter(words => {
        if (words.name.toLowerCase().includes(value.toLowerCase())) {
          return words.name;
        }
      });
      if(newStr.length > 0) {
        // setHospitalFilter([newStr[0]?.name])
        setHospitalFilterTemp(newStr);
      }
    }
    if(value.length <= 2){
      // setHospitalFilter([]);
      setHospitalFilterTemp(hospitalFilterOptions);
    }
  }


  let maxSalary = Math.max.apply(Math, searchResults?.map(a => a?.maximumSalary));
  let minSalary = Math.min.apply(Math, searchResults?.map(a => a?.minimumSalary));
  let maxExp = Math.max.apply(Math, searchResults?.map(a => a?.experience));
  let minExp = Math.min.apply(Math, searchResults?.map(a => a?.experience));


  // useEffect(() => {
  //   const newArray = new Set([]);
    // primarySpecializationFilterOptions?.forEach(elem => {
    //   newArray?.add(elem.specialization)
    // });
    // allFilterOptions?specialization?.forEach(elem => {
    //   newArray?.add(elem.specialization)
    // })
    // let specialization = [...primarySpecializationFilterOptions, ...specializationFilterOptions];
  //   setAllSpecialization(newArray);
  //   if([...allSpecializationTemp].length === [...allSpecialization].length) {
  //     setAllSpecializationTemp(newArray);
  //   }
  // }, [maxSalary, minSalary, maxExp, minExp, specializationFilterOptions])

/*   useEffect(() => {
    const isSession = sessionStorage.getItem('recentSearch') && JSON.parse(sessionStorage.getItem('recentSearch'));
   if(isSession == null || isSession == undefined) {
     if(jobSearch.jobTitle && jobSearch.location) {
       const list = {
         jobTitle: jobSearch?.jobTitle,
         location: jobSearch?.location
        };
        // initialUpdaaterLocaiton.current = location?.state?.location;
        // initialUpdater.current = location?.state?.jobTitle;
        setJobsSearchInfo(list);
        // console.log(list);
        setLocationFilter([...locationFilter, jobSearch?.location?.toLowerCase()]);

      sessionStorage.setItem("recentSearch", JSON.stringify(list));
    } 
    else if(location?.state?.isFromSingleJob){
      const oldStorage = sessionStorage.getItem('recentSearch') && JSON.parse(sessionStorage.getItem('recentSearch'))
      if(location?.state?.isFromSingleJob){
        setJobsSearchInfo(location.state);
      } else{
        const newList = {
          jobTitle: jobSearch?.jobTitle,
          location: oldStorage?.location || ''
        }
        setJobsSearchInfo(newList);
      }
    }
    else if(jobSearch?.jobTitle){
      const oldStorage = sessionStorage.getItem('recentSearch') && JSON.parse(sessionStorage.getItem('recentSearch'))
      const newList = {
        jobTitle: jobSearch?.jobTitle,
        location: oldStorage?.location || ''
      }
      // console.log(list);
      if(jobSearch?.location !== "" && setLocationFilter([...locationFilter, jobSearch?.location?.toLowerCase()]));
      sessionStorage.setItem("recentSearch", JSON.stringify(newList));
    }
    else if(jobSearch?.location) {
      console.log('wererr', jobSearch);
      const oldStorage = sessionStorage.getItem('recentSearch') && JSON.parse(sessionStorage.getItem('recentSearch'));
      // console.log(list);
      const newList = {
        jobTitle: oldStorage?.jobTitle || '',
        location: jobSearch?.location
      }
      console.log('location updatess',newList);
      // initialUpdaaterLocaiton.current = location?.state?.location;
      setJobsSearchInfo(newList);
      setLocationFilter([...locationFilter, jobSearch?.location?.toLowerCase()]);
      sessionStorage.setItem("recentSearch", JSON.stringify(newList));
    }
  }
  else {
    const oldStorage = sessionStorage.getItem('recentSearch') && JSON.parse(sessionStorage.getItem('recentSearch'));
    setJobsSearchInfo(oldStorage);
    setLocationFilter([...locationFilter, oldStorage?.location?.toLowerCase()]);
    // setCheckedLocation(oldStorage?.location);
  }
  return () => {
    sessionStorage.removeItem('recentSearch')
    setJobsSearchInfo({jobTitle: '', location: ''})
    setJobSearch({jobTitle: '', location: ''})
  }
  },[]); */

/*   useEffect(() => {
    const keywords = sessionStorage.getItem("recentSearch") && JSON.parse(sessionStorage.getItem("recentSearch"));
    if(keywords != null || keywords != undefined) {
      initialUpdater.current = keywords
      console.log(keywords)
      setsearchKeywords(keywords);
      setJobsSearchInfo(keywords);

    }
    // setCheckedLocation(keywords?.location);
  },[checkedLocation]); */

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

  const onClick = (e) => {
    e.preventDefault();
    setJobsSearchInfo({jobTitle: `${allSearchQueryParameters.jobTitle || ""}`, location: `${allSearchQueryParameters.location || ""}`})
    setFlag((prevData) => !prevData);
  };

  const handleSortChange = (event) => {
    // const sortBy = event.target.value;
    // if(sortBy === "Date"){
    //   setSort("postedOn desc");
    // }
    // if(sortBy === "Salary"){
    //   setSort("maximumSalary desc");
    // }
    // if(sortBy === "Location"){
    //   setSort("location");
    // }
    setSort(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeSearchResultsPerPage = (event) => {
    setSearchResultsPerPage(parseInt(event.target.value, 3));
    setPage(0);
  };

  const getSearchQueryData = () => {
    searchJobsQueryInfo.jobTitle = location?.state?.jobTitle;
    searchJobsQueryInfo.location = location.state.location;
    jobsSearchInfo.jobTitle = location?.state?.jobTitle;
    jobsSearchInfo.location = location.state.location; 
  };

  const handleSingleJob = (searchResult) => {
    const handleNavigate = () => {
      navigate(`/job-search-list/${searchResult.vacancyID}`, {
        state: { hospitalID: searchResult.hospitalID, location,  hospitalName: searchResult.name, ...presentSearchInfo, }, 
      });
    };
    setTimeout(handleNavigate, 1000); 
  };

  const handleRefineSearch = () => {

    // update, experience, filterLocation, filterJobType, filterEducation, filterSpecialization, filterHospital,
    // update, form, experience, filterLocation, filterJobType, filterEducation, filterSpecialization, filterHospital
    setFilterUpdated(pre => !pre);
    setOpen(!open);
  }

  // search jobs query ****************************
  useEffect(() => {
    // console.log('filter',filterLocation, jobsSearchInfo, jobSearch, recentSearch)
    if (sessionStorage.getItem("accessToken") !== null) {
      gqlquery(QUERY_SAVEDJOBS, null)
        .then((res) => res.json())
        .then((data) => setSavedJobs(data?.data?.getSavedJobs));
    }
 
    const QUERY_SEARCHJOBS = {
      query: `query MyQuery {
          searchJobs(
            location: "${allSearchQueryParameters?.locationFilter || allSearchQueryParameters?.location || ""}",
            title: "${allSearchQueryParameters?.jobTitle || ""}", 
            education: "${allSearchQueryParameters?.educationFilter || ""}", 
            experience: ${Number(allSearchQueryParameters?.expFilter || 0)}, 
            hospital: "${allSearchQueryParameters?.hospitalFilter || ""}", 
            jobType: "${allSearchQueryParameters?.jobTypeFilter || ""}", 
            maximumSalary: ${Number(allSearchQueryParameters?.annualSalaryEnd || 99)}, 
            specialization: "${allSearchQueryParameters?.specializationFilter || ""}", 
            minimumSalary: ${Number(allSearchQueryParameters?.annualSalaryStart || 0)},
            pageNumber: ${Number(allSearchQueryParameters?.pageNo || 1)},
            sortBy: "${(sort === "" && "postedOn desc") || (sort === "Date" && "postedOn desc") || (sort === "Salary" && "maximumSalary desc")}"
            )
        }
                `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_SEARCHJOBS, null)
      // gqlquery(QUERY_SEARCHJOBS, null)
      .then((res) => res.json()) 
      .then((data) => {
        setPresentSearchInfo({
          location: filterLocation ? filterLocation : allSearchQueryParameters?.location || '',
          jobTitle: jobsSearchInfo.jobTitle ? jobsSearchInfo.jobTitle : jobSearch?.jobTitle ? jobSearch?.jobTitle : recentSearch?.jobTitle ? recentSearch?.jobTitle: '',
        })
        const parsedSearchResult = JSON?.parse(data?.data?.searchJobs)?.data;
        console.log('searchs jobs', parsedSearchResult);
        setSearchResults(parsedSearchResult);

        getInfo(parsedSearchResult);
        window.scrollTo(0, 0); 
      });
    // getSearchQueryData();
  }, [pageCount, filterUpdated, sort]);

    const getInfo = async (searchResultsParams) => {
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

      const getAllInfo = searchResultsParams?.map(async (sR, index) => {
        await primarySpec(sR);
        await secondarySpec(sR);
      });

      const getOtherInfos = async () => {
        const newJobs = searchResultsParams?.map((searchResult, index) => {
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
            primarySpecialization:
              searchResult?.getJobPostPrimarySpecialization,
            secondarySpecialization:
              searchResult?.getJobPostSecondarySpecialization,
            description: searchResult?.description,
            maximumSalary: searchResult?.maximumSalary,
            minimumSalary: searchResult?.minimumSalary,
            maxExp: maxExp,
            minExp: minExp,
            location: searchResult?.location,
            postedOn: searchResult?.postedOn,
            experience: searchResult?.experience,
            vacancyID: searchResult?.vacancyID,
            hospitalID: searchResult?.hospitalID,
            savedJob: searchResult?.savedJob,
            hospitalName: searchResult?.hospitalName,
            employmentType: searchResult?.employmentType,
          };
        });
        setNewSearchResults(newJobs);
      };

      await Promise.all(getAllInfo);
      await getOtherInfos();
    };

  // console.log( 10, allSearchQueryParameters)
  const handleJobsSearch = () => {
      setSearchParams({jobTitle: jobsSearchInfo.jobTitle, specialization: allSearchQueryParameters?.specialization || "", location: jobsSearchInfo.location || ""})

    setLocationFilter([])
    const list = {
      jobTitle: jobsSearchInfo.jobTitle,
      location: jobsSearchInfo.location || ''
    }
    initialUpdater.current = {}
    initialUpdaaterLocaiton.current='';
    // setCheckedLocation(jobsSearchInfo.location);
    // if(jobsSearchInfo?.location !== "" && setLocationFilter([jobsSearchInfo?.location?.toLowerCase()]));
    sessionStorage.setItem("recentSearch", JSON.stringify(list));
    setFilterUpdated(pre => !pre);
    setUpdate(prev => !prev);
    setFlag((prevData) => !prevData);
  };

  useEffect(() => { 
    if(allSearchQueryParameters?.annualSalaryStart && allSearchQueryParameters?.annualSalaryEnd){
      setForm({...form, "annualSalary": [Number(allSearchQueryParameters?.annualSalaryStart), Number(allSearchQueryParameters?.annualSalaryEnd)]})
    }
    if(allSearchQueryParameters?.expFilter){
      setExperience(Number(allSearchQueryParameters?.expFilter))
    }
    const QUERY_FILTERJOBSBYLOCATION = {
      query: `query MyQuery {
          getSearchJobFilter(
              location: "${allSearchQueryParameters?.locationFilter ? allSearchQueryParameters?.locationFilter : allSearchQueryParameters?.location || ""}",
              title: "${allSearchQueryParameters?.jobTitle || ""}",
              specialization: "${allSearchQueryParameters?.specializationFilter || ""}",
              minimumSalary: ${Number(allSearchQueryParameters?.annualSalaryStart || 0)},
              maximumSalary: ${Number(allSearchQueryParameters?.annualSalaryEnd || 99)},
              jobType: "${allSearchQueryParameters?.jobTypeFilter || ""}"
              hospital: "${allSearchQueryParameters?.hospitalFilter || ""}",
              experience: ${Number(allSearchQueryParameters?.expFilter || 0)},
              education: "${allSearchQueryParameters?.educationFilter || ""}",
              filterColumn: "all",
              pageNumber: ${Number(allSearchQueryParameters?.pageNo || 1)},
              sortBy: "${(sort === "" && "postedOn desc") || (sort === "Date" && "postedOn desc") || (sort === "Salary" && "maximumSalary desc")}"
            )
          }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlOpenQuery(QUERY_FILTERJOBSBYLOCATION, null) 
      .then((res) => res.json())
      .then((data) => {
        window.scrollTo(0, 0);
        let jsonobject = JSON.parse(data?.data?.getSearchJobFilter);
        setAllFilterOptions(jsonobject);
        console.log(jsonobject);
        setLocationFilterOptions(jsonobject);
        setForm({...form, "annualSalary": jsonobject?.salary[0] ? jsonobject?.salary : [0, 99]})
        setExperience(jsonobject?.experience?.join(",")?.length > 1 ? jsonobject?.experience[1] : 0)
        if(locationFilterTemp?.length === locationFilterOptions?.length) {
          setLocationFilterTemp(jsonobject);
        }
      });
 
  }, [pageCount, filterUpdated])

  if (searchResults?.length) {
    if (jobsSearchInfo?.jobTitle !== "") {
      searchJobsQueryInfo.jobTitle = jobsSearchInfo?.jobTitle;
    }
    if (jobsSearchInfo?.location !== "") {
      searchJobsQueryInfo.location = jobsSearchInfo?.location;
    }
  }
/* 
  useEffect(() => {
    searchResults?.map(sr => {
      const QUERY_ISJOBSAVEDORAPPLIED = {
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

      gqlquery(QUERY_ISJOBSAVEDORAPPLIED, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.isJobApplied !== null) {
            Object?.assign(sr, datas?.data);
          }
        });
    });
  }, [update]); */

  const handleSaveJob = (vacancyID) => {
    if (user !== null && Object.keys(user).length > 0 && user !== undefined) {
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
    }
    else {
      navigate("/login")
    }

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

  return (
    <RedirectToSignUpFlow>
      {
        matches &&
        <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
        <MenuIcon sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Search Results</Typography>
        </Box>
      }
      {
        !matches ? (
          // laptop screen
          <Box>
          <Box style={{ backgroundImage: `url(${banner_bg})`, backgroundSize: "cover" }} sx={{ px: 6, py: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {!flag ? (
                <>
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
                    Showing Jobs for {allSearchQueryParameters?.jobTitle || "all"} {allSearchQueryParameters?.location && `in ${allSearchQueryParameters?.location}`}
                    </Typography>
                    <EditIcon
                      onClick={onClick}
                      sx={{ color: "var(--clr-white)", fontSize: "16px" }}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <form onSubmit={handleJobsSearch} style={{ display: "flex" }}>
                    <Input
                      name="jobTitle"
                      // defaultValue={searchJobsQueryInfo?.jobTitle ? searchJobsQueryInfo?.jobTitle : location?.state?.jobTitle}
                      defaultValue={allSearchQueryParameters?.jobTitle}
                      onChange={handleSearchInput("jobTitle")}
                      placeholder="Job Title"
                      disableUnderline
                      sx={{
                        backgroundColor: "white",
                        width: "95%",
                        borderTopLeftRadius: "55px",
                        borderBottomLeftRadius: "55px",
                        zIndex: "1",
                        padding: "8px 25px !important",
                      }}
                    />
                    <Input
                      name="location"
                      // defaultValue={searchJobsQueryInfo?.location ? searchJobsQueryInfo?.location : location.state.location}
                      defaultValue={allSearchQueryParameters?.location}
                      placeholder="Location"
                      onChange={handleSearchInput("location")}
                      sx={{
                        backgroundColor: "white",
                        size: "large",
                        width: "105%",
                        borderTopRightRadius: "55px",
                        borderBottomRightRadius: "55px",
                        zIndex: "1",
                        padding: "8px 10px !important",
                        // "& .MuiInputBase-input": { height: 20 },
                      }}
                      disableUnderline
                      endAdornment={
                        <InputAdornment position="end">
                          <SearchButton
                            type="submit"
                            edge="end"
                            size="small"
                            sx={{
                              padding: "6px 25px !important",
                            }}
                          >
                            Search
                          </SearchButton>
                        </InputAdornment>
                      }
                    />
                  </form>
                </>
              )}
              <Box>
                <Button
                  size="medium"
                  variant="contained"
                  sx={{
                    borderRadius: 16,
                  }}
                >
                  Save as Alert
                </Button>
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
                    <Box sx={{
                      display: "flex", alignItems: 'center', justifyContent: 'space-between', backgroundColor: "var(--clr-blue-light)", px: 2.5,
                      py: 1.5,
                      mb: 1.5,
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                    }}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
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
                      {
                        (allSearchQueryParameters?.locationFilter?.length > 0 || allSearchQueryParameters?.jobTypeFilter?.length > 0 || allSearchQueryParameters?.specializationFilter?.length > 0 || allSearchQueryParameters?.educationFilter?.length > 0 || allSearchQueryParameters?.hospitalFilter?.length > 0 || (Number(allSearchQueryParameters?.annualSalaryStart) >  (allFilterOptions?.salary && allFilterOptions?.salary[0])) || (Number(allSearchQueryParameters?.annualSalaryEnd) > (allFilterOptions?.salary && allFilterOptions?.salary[1])) || (Number(allSearchQueryParameters?.annualSalaryStart) <  (allFilterOptions?.salary && allFilterOptions?.salary[0])) || (Number(allSearchQueryParameters?.annualSalaryEnd) < (allFilterOptions?.salary && allFilterOptions?.salary[1])) || Number(allSearchQueryParameters?.pageNo) > 1 ) &&
                        <Tooltip title="Clear All Filters" placement="right-start">
                          <IconButton onClick={handleClearFilter}>
                            <FilterAltOffIcon sx={{ color: "var(--clr-blue-footer)" }} />
                          </IconButton>
                        </Tooltip>
                      }
                    </Box>
                    {/* location   */}
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          py: 1,
                          px: 3,
                          mb: 1.5,
                          border: "1px solid var(--clr-blue-light)",
                          borderRadius: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          onClick={handleClick}
                          id="location"
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
                        <Box>
                          <Collapse in={openedItemId === "location"} timeout="auto" unmountOnExit>
                            <Box sx={{ pt: 1 }}>
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
                                onChange={handleSearchLocation}
                                // value={values.password}
                                // onChange={handleChange("password")}
                                value={searchForm.location}
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
                            <Box
                              sx={{
                                pt: 1.5,
                                pb: 0,
                                ml: -1.4,
                                maxHeight: "250px",
                                overflowX: "auto",
                              }}
                            >
                              {
                                allFilterOptions?.location?.map((sr, index) => (
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
                                      checked={allSearchQueryParameters?.locationFilter?.includes(sr?.location?.toLowerCase()) === true}
                                      onChange={() => handleCheckboxLocation(sr?.location)}
                                      key={index}
                                      name={sr?.location} />
                                    &nbsp;{sr?.location}
                                  </Typography>
                                ))
                              }
                            </Box>
                          </Collapse>
                        </Box>
                      </Box>
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
                            min={allFilterOptions?.salary?.join(",")?.length > 1 ? allFilterOptions?.salary[0] : 0}
                            max={allFilterOptions?.salary?.join(",")?.length > 1 ? allFilterOptions?.salary[1] : 99}
                            marks={[
                              {
                                value: 0,
                                label: `${Math.round(
                                  form.annualSalary[0] || 0
                                )} Lakh INR`,
                              },
                              {
                                value: 99,
                                label: `${Math.round(
                                  form.annualSalary[1] || 99
                                )} Lakh INR`,
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
                          <Slider 
                            value={experience} 
                            onChange={handleChangeExperience} 
                            // defaultValue={allFilterOptions?.experience && allFilterOptions?.experience[1]} 
                            aria-label="Default" 
                            valueLabelDisplay="auto"
                            max={allFilterOptions?.experience?.join(",")?.length > 1 ? allFilterOptions?.experience[1] : 99}
                            marks={[{
                              value: Number(allSearchQueryParameters?.expFilter || experience), 
                              label: `${Number(allSearchQueryParameters?.expFilter || experience)} Years`
                            }]}
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
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          py: 1,
                          px: 3,
                          mb: 1.5,
                          border: "1px solid var(--clr-blue-light)",
                          borderRadius: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          onClick={handleClick}
                          id="keywords"
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
                        <Box>
                          <Collapse in={openedItemId === "keywords"} timeout="auto" unmountOnExit>
                            <Box sx={{ pb: 2 }}>
                              <Box
                                sx={{
                                  pt: 1.5,
                                  pb: 0,
                                  ml: -1.4,
                                  maxHeight: "250px",
                                  overflowX: "auto",
                                }}
                              >
                                {allFilterOptions?.jobsType?.map((jobType, index) => (
                                  <Typography
                                    variant="body1"
                                    sx={{ color: "var(--clr-gray-1)" }}
                                  >
                                    <Checkbox
                                      onChange={() => handleCheckboxJobType(jobType?.employmentType)}
                                      checked={allSearchQueryParameters?.jobTypeFilter?.includes(jobType?.employmentType) === true && true}
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
                            </Box>
                          </Collapse>
                        </Box>
                      </Box>
                    </Box>
                    {/* Education */}
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          py: 1,
                          px: 3,
                          mb: 1.5,
                          border: "1px solid var(--clr-blue-light)",
                          borderRadius: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          onClick={handleClick}
                          id="education"
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontSize: "18px", color: "#333333" }}
                          >
                            Education
                          </Typography>
                          {openedItemId === "education" ? (
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
                        <Box>
                          <Collapse in={openedItemId === "education"} timeout="auto" unmountOnExit>
                            <Box sx={{ pt: 1 }}>
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
                                onChange={handleSearchLocation}
                                // value={values.password}
                                // onChange={handleChange("password")}
                                value={searchForm.education}
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
                            <Box
                              sx={{
                                pt: 1.5,
                                pb: 0,
                                ml: -1.4,
                                maxHeight: "250px",
                                overflowX: "auto",
                              }}
                            >
                              {allFilterOptions?.educaiton?.map((sr, index) => (
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
                                    onChange={() => handleCheckboxEducation(sr?.qualifications)}
                                    checked={allSearchQueryParameters?.educationFilter?.includes(sr?.qualifications) === true && true}
                                    key={index}
                                    name={sr?.qualifications}
                                  />
                                  &nbsp;{sr?.qualifications}
                                </Typography>
                              ))}
                            </Box>
                          </Collapse>
                        </Box>
                      </Box>
                    </Box>
                    {/* Specialization */}
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          py: 1,
                          px: 3,
                          mb: 1.5,
                          border: "1px solid var(--clr-blue-light)",
                          borderRadius: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          onClick={handleClick}
                          id="specialization"
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
                        <Box>
                          <Collapse in={openedItemId === "specialization"} timeout="auto" unmountOnExit>
                            <Box sx={{ pt: 1 }}>
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
                                onChange={handleSearchLocation}
                                // value={values.password}
                                // onChange={handleChange("password")}
                                value={searchForm.specialization}
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
                            <Box
                              sx={{
                                pt: 1.5,
                                pb: 0,
                                ml: -1.4,
                                maxHeight: "250px",
                                overflowX: "auto",
                              }}
                            >
                              {
                                allFilterOptions?.specialization?.map((sr, index) => (
                                  <Typography
                                    variant="body1"
                                    sx={{ color: "var(--clr-gray-1)" }}>
                                    <Checkbox
                                      onChange={() => handleCheckboxSpecialization(sr?.specialization)}
                                      checked={allSearchQueryParameters?.specializationFilter?.includes(sr?.specialization) === true && true}
                                      key={index}
                                      name={sr}
                                      sx={{
                                        color: "#C7D3E3",
                                        "&.Mui-checked": {
                                          color: "var(--clr-blue-primary)",
                                        },
                                      }}
                                    />
                                    &nbsp;{sr?.specialization}
                                  </Typography>
                                ))
                              }
                            </Box>
                          </Collapse>
                        </Box>
                      </Box>
                    </Box>
                    {/* Hospitals */}
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          py: 1,
                          px: 3,
                          mb: 1.5,
                          border: "1px solid var(--clr-blue-light)",
                          borderRadius: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                          onClick={handleClick}
                          id="hospital"
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
                        <Box>
                          <Collapse in={openedItemId === "hospital"} timeout="auto" unmountOnExit>
                            <Box sx={{ pt: 1 }}>
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
                                onChange={handleSearchLocation}
                                // value={values.password}
                                // onChange={handleChange("password")}
                                value={searchForm.hospital}
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
                            <Box
                              sx={{
                                pt: 1.5,
                                pb: 0,
                                ml: -1.4,
                                maxHeight: "250px",
                                overflowX: "auto",
                              }}
                            >
                              {allFilterOptions?.hospital?.map((sr, index) => (
                                <Box sx={{ display: "flex", gap: 1, alignItems: "center", pb: 1 }}>
                                  <Checkbox
                                    checked={allSearchQueryParameters?.hospitalFilter?.includes(sr?.name) === true && true}
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
                    </Box>
                    <Box sx={{ textAlign: "right", my: 3 }}>
                        <Button
                              onClick={handleClearFilter}
                              size="large"
                              variant="outlined"
                              sx={{
                                borderRadius: 16,
                                py: 1,
                                mr: 2,
                              }}
                            >
                              Clear Filter
                        </Button>
                        <Button
                              onClick={handleRefineSearch}
                              size="large"
                              variant="contained"
                              sx={{
                                borderRadius: 16,
                                py: 1,
                              }}
                            >
                              Refine Search
                          </Button>
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
                    {((pageCount - 1) * 10) + 1} - {newSearchResults?.length < 10 ? pageCount > 1 ?(pageCount-1) * 10 + newSearchResults?.length : newSearchResults?.length : pageCount * 10} &nbsp;
                    {/* Jobs In  {searchJobsQueryInfo?.location ? searchJobsQueryInfo?.location : location.state.location} */}
                    Jobs
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
                     {/*  <MenuItem value={values[0]} disabled>
                        <b>Sort By</b>
                      </MenuItem>
                      {values?.map((value) => (
                        <MenuItem value={value} key={value}>
                          {value}
                        </MenuItem>
                      ))} */}
                     <MenuItem value="" disabled>Sort By</MenuItem>
                      <MenuItem value="Date" key={"Date"}>Date</MenuItem>
                      <MenuItem value="Salary" key={"Salary"}>Salary</MenuItem>
                      {/* <MenuItem value="Location" key={"location"}>Location</MenuItem> */}
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
                          onClick={() => handleSingleJob(searchResult)}
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
                          {searchResult?.hospitalName}
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
                            {searchResult?.description?.length > 150 ? (
                              <>
                             {searchResult?.description?.includes("<br />") && searchResult?.description?.slice(0, 150)?.replaceAll("<br />", "")}
                             {searchResult?.description?.includes("<br/>") && searchResult?.description?.slice(0, 150)?.replaceAll("<br/>", "")}
                              </>
                            ) : searchResult?.description}<span>{searchResult?.description?.length > 150 ? "..." : ""} </span>
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
                            Key&nbsp;Skills
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
                              {searchResult?.primarySpecialization?.map((ps, index) => (
                                <> {ps?.specialization},</>
                              ))}
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
                              {searchResult?.secondarySpecialization?.map((ss, index) => (
                                <> {ss?.specialization}{searchResult?.secondarySpecialization?.length - 1 === index ? "." : ", "}</>
                              ))}
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
                              {/* {searchResult?.maximumSalary >= 100000 ? <>{(
                                  Math.round(
                                    (searchResult?.maximumSalary / 100000) * 100
                                  ) / 100
                                ).toFixed(2)} L</>  : <>{searchResult?.maximumSalary >= 1000 ?  <>{(
                                  Math.round(
                                    (searchResult?.maximumSalary / 1000) * 100
                                  ) / 100
                                ).toFixed(2)}{" "}K</> : <>{searchResult?.maximumSalary}{" "}INR</>}</>}{" "} */}
                              {searchResult?.minimumSalary+' Lakh - '+searchResult?.maximumSalary} {"Lakh INR"}
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
                           {/*  {
                              !(searchResult?.savedJob) === false ? (
                                <Button
                                  onClick={() => handleDeleteSavedJobs(searchResult?.vacancyID)}
                                  sx={{ width: "max-content", backgroundColor: "var(--clr-blue-light) !important", padding: "3px 12px !important", borderRadius: 16, "&:hover": { backgroundColor: "var(--clr-blue-light) !important" } }}>
                                  <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                    <StarIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Saved</span>
                                  </Typography>
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handleSaveJob(searchResult?.vacancyID)}
                                  diababled
                                  sx={{ width: "max-content", border: "1px solid var(--clr-blue-footer) !important", gap: 1, padding: "3px 12px !important", borderRadius: 16, color: "#395987 !important", fontWeight: "600", py: 1 }}>
                                  <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                    <StarBorderIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Save Job</span>
                                  </Typography>
                                </Button>
                              )
                            } */}
                          {/*  {searchResult?.savedJob  === undefined && (
                              <Button
                              onClick={() => handleSaveJob(searchResult?.vacancyID)}
                              diababled
                              sx={{ width: "max-content", border: "1px solid var(--clr-blue-footer) !important", gap: 1, padding: "3px 12px !important", borderRadius: 16, color: "#395987 !important", fontWeight: "600", py: 1 }}>
                              <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                <StarBorderIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Save Job</span>
                              </Typography>
                            </Button>
                              )} */}
                              {(((savedJobs?.find(job => job?.vacancyID === searchResult?.vacancyID)?.vacancyID) === searchResult?.vacancyID)) && (
                                <Button
                                onClick={() => handleDeleteSavedJobs(searchResult?.vacancyID)}
                                sx={{ width: "max-content", backgroundColor: "var(--clr-blue-light) !important", padding: "3px 12px !important", borderRadius: 16, "&:hover": { backgroundColor: "var(--clr-blue-light) !important" } }}>
                                <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                  <StarIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Saved</span>
                                </Typography>
                                </Button>
                              )}
                              {(((savedJobs?.find(job => job?.vacancyID === searchResult?.vacancyID)?.vacancyID) !== searchResult?.vacancyID)) && (
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
                      </Box>
                    ))}
                </Box>
                {
                  newSearchResults?.length <= 0 && pageCount > 1 && 

                  <Box sx={{position: 'absolute', bottom: 0, right: 0, px: 6}}>
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
                              pageCount > 1 && <ArrowBackIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("decrease")} /> 
                            }
                            <Typography sx={{ color: "#395987", fontWeight: 600, px: 2 }}> {pageCount}</Typography>
                            {
                              newSearchResults?.length >= 10 &&
                                <ArrowForwardIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("increase")} />
                            }
                          </Box>
                        </Box>
                      </Box>
                  </Box>
                }
                {
                      (newSearchResults?.length >= 1 ? pageCount > 1  ? true : newSearchResults?.length >= 10 && pageCount === 1 ? true: false: false) &&
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
                              pageCount > 1 && <ArrowBackIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("decrease")} /> 
                                
                            }
                            <Typography sx={{ color: "#395987", fontWeight: 600, px: 2 }}> {pageCount}</Typography>
                            {
                              newSearchResults?.length >= 10 &&
                                <ArrowForwardIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("increase")} />
                               
                            }
                          </Box>
                        </Box>
                      </Box>
                    }
                {/* {
                  newSearchResults?.length >= 10 &&
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
                        <ArrowForwardIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("increase")} />
                      </Box>
                    </Box>
                  </Box>
                } */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        )  : (
          // tab and mobile screen
          <Container>
          
          {/* search input box */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {!flag ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      marginBottom : "28px",
                      marginTop: "30px"
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#333333",
                        fontWeight: "600",
                        fontSize: "14px",
                      }}
                    >
                    Showing Jobs for {allSearchQueryParameters?.jobTitle} {allSearchQueryParameters?.location && `in ${allSearchQueryParameters?.location}`}
                    {/* {
                        newSearchResults.length <= 0  &&  (jobsSearchInfo?.jobTitle ? `01Showing Jobs for '${jobsSearchInfo?.jobTitle} ${jobsSearchInfo?.location ? ' in '+ jobsSearchInfo?.location+"'": "'"}`: jobsSearchInfo?.location ? jobsSearchInfo?.jobTitle ? `in ${jobsSearchInfo?.location}`:  `02Showing Job ' in ${jobsSearchInfo?.location}'`: (jobsSearchInfo?.jobTitle === '' && jobsSearchInfo?.location) ? '': `'`) 
                      }
                      {
                        (newSearchResults.length > 0 && (jobsSearchInfo?.jobTitle === '' && jobsSearchInfo?.location === '')) && "03Showing Jobs for all"
                      }
                      {
                        (newSearchResults.length > 0 && (jobsSearchInfo?.jobTitle !== '' && jobsSearchInfo?.location !== '')) && `04Showing jobs for '${jobsSearchInfo?.jobTitle} in ${jobsSearchInfo?.location}'`
                      }
                      {
                        (newSearchResults.length > 0 && (jobsSearchInfo?.jobTitle === '' && jobsSearchInfo?.location !== '')) && `05Showing jobs' in ${jobsSearchInfo?.location}'`
                      }
                      {
                        (newSearchResults.length > 0 && (jobsSearchInfo?.jobTitle !== '' && jobsSearchInfo?.location === '')) && `06Showing jobs for '${jobsSearchInfo?.jobTitle}'`
                      } */}
                    </Typography>
                    <EditIcon
                      onClick={onClick}
                      sx={{ color: "#5A98F2", fontSize: "13px" }}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <form onSubmit={handleJobsSearch} style={{marginTop : "30px"}}>
                    <Input
                      name="jobTitle"
                      // defaultValue={searchJobsQueryInfo?.jobTitle ? searchJobsQueryInfo?.jobTitle : location?.state?.jobTitle}
                      defaultValue={allSearchQueryParameters?.jobTitle}
                      onChange={handleSearchInput("jobTitle")}
                      placeholder="Job Title"
                      disableUnderline
                      sx={{
                        backgroundColor: "white",
                        width: "100%",
                        // borderTopLeftRadius: "55px",
                        // borderBottomLeftRadius: "55px",
                        borderRadius: "5px",
                        marginBottom: "15px",
                        zIndex: "1",
                        padding: "8px 25px !important",
                      }}
                    />
                    <Input
                      name="location"
                      // defaultValue={searchJobsQueryInfo?.location ? searchJobsQueryInfo?.location : location.state.location}
                      defaultValue={allSearchQueryParameters?.location}
                      placeholder="Location"
                      onChange={handleSearchInput("location")}
                      sx={{
                        backgroundColor: "white",
                        size: "large",
                        width: "100%",
                        // borderTopRightRadius: "55px",
                        // borderBottomRightRadius: "55px",
                        borderRadius: "5px",
                        marginBottom: "28px",
                        zIndex: "1",
                        padding: "8px 10px !important",
                        // "& .MuiInputBase-input": { height: 20 },
                      }}
                      disableUnderline
                      endAdornment={
                        <InputAdornment position="end">
                          <SearchButton
                            type="submit"
                            edge="end"
                            // size="small"
                            sx={{
                              padding: "6px 25px !important",
                              fontSize: "12px"
                            }}
                          >
                            Search
                          </SearchButton>
                        </InputAdornment>
                      }
                    />
                  </form>
                </>
              )}
            </Box>
            <Box>
                <Button
                  // size="medium"
                  variant="contained"
                  sx={{
                    borderRadius: 16,
                    fontSize: "16px"
                  }}
                >
                  Save as Alert
                </Button>
              </Box>


            <Grid container spacing={3} sx={{mt : "40px", mb: "60px"}}>
              {/* filter part */}
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
                        <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
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
                              sx={{ color: "var(--clr-blue-footer)", fontWeight: 600, fontSize: "18px" }}
                            >
                              All Filters
                            </Typography>
                          </Box>
                          {
                            (allSearchQueryParameters?.locationFilter?.length > 0 || allSearchQueryParameters?.jobTypeFilter?.length > 0 || allSearchQueryParameters?.specializationFilter?.length > 0 || allSearchQueryParameters?.educationFilter?.length > 0 || allSearchQueryParameters?.hospitalFilter?.length > 0 || (Number(allSearchQueryParameters?.annualSalaryStart) >  (allFilterOptions?.salary && allFilterOptions?.salary[0])) || (Number(allSearchQueryParameters?.annualSalaryEnd) > (allFilterOptions?.salary && allFilterOptions?.salary[1])) || (Number(allSearchQueryParameters?.annualSalaryStart) <  (allFilterOptions?.salary && allFilterOptions?.salary[0])) || (Number(allSearchQueryParameters?.annualSalaryEnd) < (allFilterOptions?.salary && allFilterOptions?.salary[1])) || Number(allSearchQueryParameters?.pageNo) > 1 ) && 
                            <IconButton onClick={handleClearFilter}>
                              <FilterAltOffIcon sx={{ color: "var(--clr-blue-footer)" }} />
                            </IconButton>
                          }

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
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                py: 1,
                                px: 3,
                                mb: 1.5,
                                border: "1px solid var(--clr-blue-light)",
                                borderRadius: 1,
                              }}
                            >
                              <Box
                                onClick={handleClick}
                                id="location"
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
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
                              <Box>
                                <Collapse in={openedItemId === "location"} timeout="auto" unmountOnExit>
                                  <Box sx={{ pt: 1 }}>
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
                                      value={searchForm.location}
                                      // onChange={handleChange("password")}
                                      onChange={handleSearchLocation}
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
                                    <Box
                                      sx={{
                                        pt: 1.5,
                                        pb: 0,
                                        ml: -1.4,
                                        maxHeight: "250px",
                                        overflowX: "auto",
                                      }}
                                    >
                                      {
                                        allFilterOptions?.location?.map((sr, index) => (
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
                                              checked={allSearchQueryParameters?.locationFilter?.includes(sr?.location?.toLowerCase()) === true && true}
                                              onChange={() => handleCheckboxLocation(sr?.location)}
                                              key={index}
                                              name={sr?.location} />
                                            &nbsp;{sr?.location}
                                          </Typography>
                                        ))
                                      }
                                    </Box>
                                  </Box>
                                </Collapse>
                              </Box>
                            </Box>
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
                                  min={allFilterOptions?.salary?.join(",")?.length > 1 ? allFilterOptions?.salary[0] : 0}
                                  max={allFilterOptions?.salary?.join(",")?.length > 1 ? allFilterOptions?.     salary[1] : 99}
                                  marks={[
                                    {
                                      value: 0,
                                      label: `${Math.round(
                                        form.annualSalary[0] || 0
                                      )} Lakh INR`,
                                    },
                                    {
                                      value: 99,
                                      label: `${Math.round(
                                        form.annualSalary[1] || 99
                                      )} Lakh INR`,
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
                                <Slider 
                                  value={experience} 
                                  onChange={handleChangeExperience} 
                                  // defaultValue={allFilterOptions?.experience && allFilterOptions?.     experience[1]} 
                                  aria-label="Default" 
                                  valueLabelDisplay="auto"
                                  max={allFilterOptions?.experience?.join(",")?.length > 1 ? allFilterOptions?.experience[1] : 99}
                                  marks={[{
                                    value: Number(allSearchQueryParameters?.expFilter || experience), label: `${Number(allSearchQueryParameters?.expFilter || experience)} Years`
                                  }]}
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
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                py: 1,
                                px: 3,
                                mb: 1.5,
                                border: "1px solid var(--clr-blue-light)",
                                borderRadius: 1,
                              }}
                            >
                              <Box
                                onClick={handleClick}
                                id="keywords"
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
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
                              <Box>
                                <Collapse in={openedItemId === "keywords"} timeout="auto" unmountOnExit>
                                  <Box sx={{ pb: 2 }}>

                                    <Box
                                      sx={{
                                        pt: 1.5,
                                        pb: 0,
                                        ml: -1.4,
                                        maxHeight: "250px",
                                        overflowX: "auto",
                                      }}
                                    >
                                      {allFilterOptions?.jobsType?.map((jobType, index) => (
                                        <Typography
                                          variant="body1"
                                          sx={{ color: "var(--clr-gray-1)" }}
                                        >
                                          <Checkbox
                                            onChange={() => handleCheckboxJobType(jobType?.employmentType)}
                                            checked={allSearchQueryParameters?.jobTypeFilter?.includes(jobType?.employmentType)}
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
                                  </Box>
                                </Collapse>
                              </Box>
                            </Box>
                          </Box>
                          {/* Education */}
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                py: 1,
                                px: 3,
                                mb: 1.5,
                                border: "1px solid var(--clr-blue-light)",
                                borderRadius: 1,
                              }}
                            >
                              <Box
                                onClick={handleClick}
                                id="education"
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "18px", color: "#333333" }}
                                >
                                  Education
                                </Typography>
                                {openedItemId === "education" ? (
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
                              <Box>
                                <Collapse in={openedItemId === "education"} timeout="auto" unmountOnExit>
                                  <Box sx={{ pt: 1 }}>
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
                                      value={searchForm.education}
                                      // onChange={handleChange("password")}
                                      onChange={handleSearchLocation}
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
                                    <Box
                                      sx={{
                                        pt: 1.5,
                                        pb: 0,
                                        ml: -1.4,
                                        maxHeight: "250px",
                                        overflowX: "auto",
                                      }}
                                    >
                                      {allFilterOptions?.educaiton?.map((sr, index) => (
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
                                            onChange={() => handleCheckboxEducation(sr?.qualifications)}
                                            checked={allSearchQueryParameters?.educationFilter?.includes(sr?.qualifications)}
                                            key={index}
                                            name={sr?.qualifications}
                                          />
                                          &nbsp;{sr?.qualifications}
                                        </Typography>
                                      ))}
                                    </Box>
                                  </Box>
                                </Collapse>
                              </Box>
                            </Box>
                          </Box>
                          {/* Specialization */}
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                py: 1,
                                px: 3,
                                mb: 1.5,
                                border: "1px solid var(--clr-blue-light)",
                                borderRadius: 1,
                              }}
                            >
                              <Box
                                onClick={handleClick}
                                id="specialization"
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
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
                              <Box>
                                <Collapse in={openedItemId === "specialization"} timeout="auto" unmountOnExit>
                                  <Box sx={{ pt: 1 }}>
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
                                      value={searchForm.specialization}
                                      // onChange={handleChange("password")}
                                      onChange={handleSearchLocation}
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
                                    <Box
                                      sx={{
                                        pt: 1.5,
                                        pb: 0,
                                        ml: -1.4,
                                        maxHeight: "250px",
                                        overflowX: "auto",
                                      }}
                                    >
                                      {
                                        allFilterOptions?.specialization?.map((sr, index) => (
                                          <Typography
                                            variant="body1"
                                            sx={{ color: "var(--clr-gray-1)" }}>
                                            <Checkbox
                                              onChange={() => handleCheckboxSpecialization(sr)}
                                              checked={allSearchQueryParameters?.specializationFilter?.includes(sr)}
                                              key={index}
                                              name={sr}
                                              sx={{
                                                color: "#C7D3E3",
                                                "&.Mui-checked": {
                                                  color: "var(--clr-blue-primary)",
                                                },
                                              }}
                                            />
                                            &nbsp;{sr?.specialization}
                                          </Typography>
                                        ))
                                      }
                                    </Box>
                                  </Box>
                                </Collapse>
                              </Box>
                            </Box>
                          </Box>
                          {/* Hospitals */}
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                py: 1,
                                px: 3,
                                mb: 1.5,
                                border: "1px solid var(--clr-blue-light)",
                                borderRadius: 1,
                              }}
                            >
                              <Box
                                onClick={handleClick}
                                id="hospital"
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "18px", color: "#333333" }}
                                >
                                  Hospital
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
                              <Box>
                                <Collapse in={openedItemId === "hospital"} timeout="auto" unmountOnExit>
                                  <Box sx={{ pt: 1 }}>
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
                                      value={searchForm.hospital}
                                      // onChange={handleChange("password")}
                                      onChange={handleSearchLocation}
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
                                    <Box
                                      sx={{
                                        pt: 1.5,
                                        pb: 0,
                                        ml: -1.4,
                                        maxHeight: "250px",
                                        overflowX: "auto",
                                      }}
                                    >
                                      {allFilterOptions?.hospital?.map((sr, index) => (
                                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", pb: 1 }}>
                                          <Checkbox
                                            checked={allSearchQueryParameters?.hospitalFilter?.includes(sr?.name)}
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
                                  </Box>
                                </Collapse>
                              </Box>
                            </Box>
                          </Box>
                          <Box sx={{ textAlign: "right", my: 2 }}>
                        <Button
                              onClick={handleClearFilter}
                              size="large"
                              variant="outlined"
                              sx={{
                                borderRadius: 16,
                                py: 1,
                                mr: 2,
                              }}
                            >
                              Clear Filter
                        </Button>
                        <Button
                              onClick={handleRefineSearch}
                              size="large"
                              variant="contained"
                              sx={{
                                borderRadius: 16,
                                py: 1,
                              }}
                            >
                              Refine Search
                          </Button>
                      </Box>
                        </Box>
                      </Collapse>
                    </Box>
                  </Box>
                </Grid>

              {/* job result part */}
              <Grid item xs={12}>

              <Typography sx={{ color: "var(--clr-secondayGray-2)", fontSize: "12px", fontWeight: "400", mb: "10px", pl:"5px"  }}>
                    {((pageCount - 1) * 10) + 1} - {newSearchResults?.length < 10 ? newSearchResults?.length : pageCount * 10} &nbsp;
                    {/* Jobs In  {searchJobsQueryInfo?.location ? searchJobsQueryInfo?.location : location.state.location} */}
                    Jobs 
                  </Typography>
                  <FormControl
                    sx={{
                      minWidth: 130,
                      pl:"5px"
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
                     {/*  <MenuItem value={values[0]} disabled>
                        <b>Sort By</b>
                      </MenuItem>
                      {values?.map((value) => (
                        <MenuItem value={value} key={value}>
                          {value}
                        </MenuItem>
                      ))} */}
                     <MenuItem value="" disabled>Sort By</MenuItem>
                      <MenuItem value="Date" key={"Date"}>Date</MenuItem>
                      <MenuItem value="Salary" key={"Salary"}>Salary</MenuItem>
                      {/* <MenuItem value="Location" key={"location"}>Location</MenuItem> */}
                    </Select>
                  </FormControl>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mt: "30px"
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
                          onClick={() => handleSingleJob(searchResult)}
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
                          {searchResult?.hospitalName}
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
                            {searchResult?.description?.length > 150 ? (
                              <>
                             {searchResult?.description?.includes("<br />") && searchResult?.description?.slice(0, 150)?.replaceAll("<br />", "")}
                             {searchResult?.description?.includes("<br/>") && searchResult?.description?.slice(0, 150)?.replaceAll("<br/>", "")}
                              </>
                            ) : searchResult?.description}<span>{searchResult?.description?.length > 150 ? "..." : ""} </span>
                          </Typography>
                        </Box>
                        <Grid container spacing={2}>
                        <Grid item xs={4}>
                        <Typography
                            sx={{
                              color: "#333333",
                              fontWeight: "600",
                              fontSize: "16px",
                              // lineHeight: "16px",
                            }}
                          >
                            Key&nbsp;Skills
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                        <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 1.5,
                            }}
                          >
                            {/* {searchResult.skills.map((skill) => ( */}
                            <Typography
                              sx={{
                                // lineHeight: "14px",
                                color: "#333333",
                                fontWeight: "600",
                                fontSize : "14px"
                              }}
                            >
                              {searchResult?.primarySpecialization?.map((ps, index) => (
                                <> {ps?.specialization},</>
                              ))}
                            </Typography>
                            <Typography
                              sx={{
                                // lineHeight: "14px",
                                color: "#333333",
                                fontWeight: "600",
                                fontSize : "14px"
                              }}
                            >
                              {searchResult?.secondarySpecialization?.map((ss, index) => (
                                <> {ss?.specialization}{searchResult?.secondarySpecialization?.length - 1 === index ? "." : ", "}</>
                              ))}
                            </Typography>
                            {/* ))}  */}
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
                              {searchResult?.minimumSalary+'L - '+searchResult?.maximumSalary} {"Lakh INR"}
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
                           {/*  {
                              !(searchResult?.savedJob) === false ? (
                                <Button
                                  onClick={() => handleDeleteSavedJobs(searchResult?.vacancyID)}
                                  sx={{ width: "max-content", backgroundColor: "var(--clr-blue-light) !important", padding: "3px 12px !important", borderRadius: 16, "&:hover": { backgroundColor: "var(--clr-blue-light) !important" } }}>
                                  <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                    <StarIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Saved</span>
                                  </Typography>
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => handleSaveJob(searchResult?.vacancyID)}
                                  diababled
                                  sx={{ width: "max-content", border: "1px solid var(--clr-blue-footer) !important", gap: 1, padding: "3px 12px !important", borderRadius: 16, color: "#395987 !important", fontWeight: "600", py: 1 }}>
                                  <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                    <StarBorderIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Save Job</span>
                                  </Typography>
                                </Button>
                              )
                            } */}
                          {/*  {searchResult?.savedJob  === undefined && (
                              <Button
                              onClick={() => handleSaveJob(searchResult?.vacancyID)}
                              diababled
                              sx={{ width: "max-content", border: "1px solid var(--clr-blue-footer) !important", gap: 1, padding: "3px 12px !important", borderRadius: 16, color: "#395987 !important", fontWeight: "600", py: 1 }}>
                              <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                <StarBorderIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Save Job</span>
                              </Typography>
                            </Button>
                              )} */}
                              {(((savedJobs?.find(job => job?.vacancyID === searchResult?.vacancyID)?.vacancyID) === searchResult?.vacancyID)) && (
                                <Button
                                onClick={() => handleDeleteSavedJobs(searchResult?.vacancyID)}
                                sx={{ width: "max-content", backgroundColor: "var(--clr-blue-light) !important", padding: "3px 12px !important", borderRadius: 16, "&:hover": { backgroundColor: "var(--clr-blue-light) !important" } }}>
                                <Typography sx={{ color: "#395987 !important", fontWeight: "600", fontSize: "12px", display: "flex", gap: 1, }}>
                                  <StarIcon sx={{ color: "#395987", fontSize: "1rem" }} /> <span>Saved</span>
                                </Typography>
                                </Button>
                              )}
                              {(((savedJobs?.find(job => job?.vacancyID === searchResult?.vacancyID)?.vacancyID) !== searchResult?.vacancyID)) && (
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
                      </Box>
                    ))}
                </Box>
                {
                      (newSearchResults?.length >= 1 ? pageCount > 1  ? true : newSearchResults?.length >= 10 && pageCount === 1 ? true: false: false) &&
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
                              pageCount > 1 && <ArrowBackIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("decrease")} /> 
                                
                            }
                            <Typography sx={{ color: "#395987", fontWeight: 600, px: 2 }}> {pageCount}</Typography>
                            {
                              newSearchResults?.length >= 10 &&
                                <ArrowForwardIcon sx={{ color: "#395987" }} onClick={() => handleIncreasePageCount("increase")} />
                               
                            }
                          </Box>
                        </Box>
                      </Box>
                    }
              </Grid>
            </Grid>
        </Container>
        )
      }
    </RedirectToSignUpFlow>
  );
};

export default JobSearchList;
