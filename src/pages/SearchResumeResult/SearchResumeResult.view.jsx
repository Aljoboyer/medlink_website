import { makeStyles } from "@material-ui/core/styles";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  Input,
  TextField,
  InputAdornment,
  InputBase,
  Skeleton,
  Slider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import * as FileSaver from "file-saver";
// import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  gqlquery,
  QUERY_GETACTIVESUBSCRIPTIONS,
  QUERY_NOTICEMASTER,
} from "../../api/hospitalIndex";
import green_verified_badge from "../../assets/green_verified_badge.svg";
import Pagination from "@mui/material/Pagination";
import useAuth from "../../hooks/useAuth";
import ToastTitle from "../ToastTitle";
import moment from "moment/moment";

const times = [
  "1 day",
  "7 days",
  "15 days",
  "1 month",
  "2 months",
  "3 months",
  "6 months",
];

const resultNumber = [20, 50];

// Custom style for mui Select border
const CustomSelectInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "4px",
    position: "relative",
    border: "1px solid var(--clr-blue-light) !important",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontSize: "15px",
    color: "var(--clr-blue-footer)",
    padding: "10px 26px 10px 12px",

    "&:focus": {
      borderRadius: 4,
      borderColor: "red",
    },
  },
}));

const CustomSelectInputSm = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    position: "relative",
    border: "none !important",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
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
  blurProfileImg: {
    filter: "blur(10px)",
  },
}));

// user permission
export const ShowForAccessResumeDB = (props) => {
  const { getUserRole, permitUser, isLoading } = useAuth();

  useEffect(() => {
    getUserRole();
  }, []);

  if (!isLoading) {
    return permitUser?.accessResumeDB || permitUser?.adminUser ? (
      props.children
    ) : (
      <img
        src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Fix-Access-Denied-Folder-Featured.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5"
        style={{ width: "100%", height: "auto" }}
        alt="Accecss_denied"
      />
    );
  } else {
    return (
      <Container maxWidth="xl" sx={{ mx: "auto", mb: 8 }}>
        <Box sx={{ px: 3 }}>
          <Skeleton
            variant="text"
            animation="wave"
            width="50%"
            height={30}
            sx={{ my: 2 }}
          />
          <Box
            sx={{
              backgroundColor: "var(--clr-white)",
              borderRadius: 2,
              boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
              p: 2,
            }}
          >
            <Grid
              container
              justifyContent="space-between"
              rowSpacing={3}
              columnSpacing={5}
            >
              <Grid item xs={6}>
                <Skeleton sx={{ my: 2, width: "30%" }} />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Skeleton sx={{ my: 2, width: "30%" }} />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Skeleton
                variant="text"
                animation="wave"
                width={120}
                height={50}
                sx={{ borderRadius: 8, py: 3 }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={100}
                height={50}
                sx={{ borderRadius: 8, py: 3 }}
              />
            </Box>
          </Box>
          <Box sx={{ py: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={9}>
                <Skeleton
                  variant="rectangular"
                  height={180}
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  height={180}
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  height={180}
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
};

const SearchResumeResult = (props) => {
  const location = useLocation();
  const classes = useStyles();
  const [date, setDate] = React.useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [form, setForm] = useState({
    jobTitle: "",
    location: "",
    qualification: "",
    employmentType: "",
    experience: [0, 99],
    lastDateToApply: new Date(),
    description: "",
    ctc: [0, 99],
    activeIn: "",
  });
  const [values, setValues] = useState({
    activeIn: "",
    resultShowed: "",
    setReminder: "",
    sortBy: "",
    pageNo: "",
  });
  const [openedItemId, setOpenedItemId] = useState(true);
  const [isModifySearch, setIsModifySearch] = useState(false);
  const [resultMerged, setResultMerged] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [update, setUpdate] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  // const [searchResultWithPic, setSearchResultWithPic] = useState([]);
  // const [picURLdependency, setPicURLdependency] = useState(true);
  const [contactDetails, setContactDetails] = useState([]);
  const [loadProfileDetails, setLoadProfileDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [singleContact, setSingleContact] = useState({});
  const [shareImage, setShareImage] = useState("data:image/png;base64");
  let [profileContainer, setProfileContainer] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingItemID, setLoadingItemID] = useState({});
  const [filterOpen, setFilterOpen] = useState(false);
  const [allFilterOptions, setAllFilterOptions] = useState([]);
  const [allCheckboxFilter, setAllCheckboxFilter] = useState({
    locationFilter: [],
    healthCareIndustry: [],
    qualification: [],
    studiedCourse: [],
    studiedSpecialization: [],
    studiedUniversity: [],
    designation: [],
    healthInstituteType: [],
    healthInstituteName: [],
    noticePeriod: [],
    activeIn: [],
  });
  const [matchedNoticePeriod, setMatchedNoticePeriod] = useState([]);
  const [filterFromOptions, setFilterFromOptions] = useState({
    locationFilter: "",
    healthCareIndustry: "",
    qualification: "",
    studiedCourse: "",
    studiedSpecialization: "",
    studiedUniversity: "",
    designation: "",
    healthInstituteType: "",
    healthInstituteName: "",
    noticePeriod: "",
  });
  const [pagination, setPagination] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const handleShowAllFilter = () => {
    setFilterOpen((prevData) => !prevData);
  };
  document.title = "Resume Search Result | MedLink Jobs";
  const navigate = useNavigate();

  const modifyKeywords =
    sessionStorage.getItem("keywords") &&
    JSON.parse(sessionStorage.getItem("keywords"));
  let searchQueryInfo;
  // console.log(location.state)
  if (location?.state?.formHospitalHome) {
    searchQueryInfo = location?.state;
  } else {
    searchQueryInfo = location?.state?.searchQueryInfo;
  }

  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e.target.name] = e.target.value;
      return __form;
    });
    // console.log(form);
  };

  // console.log("228", searchQueryInfo);
  // console.log(values.sortBy);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, pageCount]);

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value})
    setFilterFromOptions({ ...filterFromOptions, [prop]: event.target.value });
  };

  const handleClick = (orgEvent) => {
    // setForm({...form, experience: allFilterOptions?.ctc})
    // setForm((_form) => {
    //   let __form = { ..._form };
    //   __form["experience"] = allFilterOptions?.experience;
    //   return __form;
    // });
    let clickedItemId = orgEvent.currentTarget.id;
    if (openedItemId === clickedItemId) {
      setOpenedItemId("");
    } else {
      setOpenedItemId(clickedItemId);
    }
    //setOpen(!open);
  };

  useEffect(() => {
    if (searchQueryInfo.anyKeywords) {
      form.jobTitle = searchQueryInfo?.anyKeywords;
      form.location = searchQueryInfo?.industry;
      form.activeIn = searchQueryInfo?.activeIn;
    }
  }, []);

  const handleAllCheckboxFilter = (value, from) => {
    const name = value?.toLowerCase();
    // console.log(
    //   value,
    //   "inside checkpost",
    //   999,
    //   from,
    //   999,
    //   allCheckboxFilter[from],
    //   allCheckboxFilter[from]?.includes(name)
    // );
    if (allCheckboxFilter[from]?.includes(name)) {
      const xyz = allCheckboxFilter[from]?.indexOf(name);
      // console.log(xyz);
      if (xyz > -1) {
        allCheckboxFilter[from]?.splice(xyz, 1);
      }

      const abc = [...allCheckboxFilter[from]];
      const oldState = { ...allCheckboxFilter };
      oldState[from] = abc;
      setAllCheckboxFilter(oldState);
      // console.log(allCheckboxFilter[from]);
    } else {
      const abc = [...allCheckboxFilter[from], name];
      // allCheckboxFilter[from] = [...allCheckboxFilter[from], name];
      // Object.assign(allCheckboxFilter[from], allCheckboxFilter[from]);
      const oldState = { ...allCheckboxFilter };
      oldState[from] = abc;
      setAllCheckboxFilter(oldState);
    }

    // setPageCount(1);
    // setUpdate((prev) => !prev);
  };

  const handleCheckboxProfile = (profile) => {
    if (profile === "selectAll") {
      setProfileContainer([...searchResult]);

      if (profileContainer?.length === searchResult?.length) {
        setProfileContainer([]);
      }
    }

    if (profile !== "selectAll") {
      if (profileContainer.includes(profile)) {
        const xyz = profileContainer.indexOf(profile);
        if (xyz > -1) {
          profileContainer.splice(xyz, 1);
        }
      } else {
        setProfileContainer([...profileContainer, profile]);
      }
    }

    setUpdate((prev) => !prev);
  };

  // console.log("values.sortBy", values.sortBy);
  // sortBy: "${values.sortBy === "date" ? "lastLogin desc" : ""}"

  const handleRefineSearch = (e) => {
    const QUERY_FILTERRESUME = {
      query: `query MyQuery {
        searchResumeFilter(
              anyKeywords: "${
                modifyKeywords?.jobTitle || searchQueryInfo?.anyKeywords
              }",
              allKeywords: "${
                modifyKeywords?.jobTitle || searchQueryInfo?.allKeywords
              }",
              employmentType: "${searchQueryInfo?.employmentType}",
              experienceFrom: ${
                form.experience[0] || Number(searchQueryInfo?.experienceFrom)
              },
              experienceTo: ${
                form.experience[1] || Number(searchQueryInfo?.experienceTo)
              },
              industry: "",
              currentLocation: "${
                modifyKeywords?.location || searchQueryInfo?.currentLocation
              }",
              preferredLocation: "${
                allCheckboxFilter.locationFilter.toString() ||
                modifyKeywords?.location ||
                searchQueryInfo?.preferredLocation
              }",
              salaryRangeEnd: ${
                form.ctc[1] || Number(searchQueryInfo?.salaryRangeEnd)
              },
              salaryRangeStart: ${
                form.ctc[0] || Number(searchQueryInfo?.salaryRangeStart)
              },
              pageNumber: ${Number(pageCount)},
              sortBy: "${values.sortBy === "date" ? "date" : ""}",
              emp_designation: "${
                allCheckboxFilter.designation.toString() ||
                searchQueryInfo?.emp_designation
              }",
              emp_instituteType: "${
                allCheckboxFilter.healthInstituteType.toString() ||
                searchQueryInfo?.emp_instituteType
              }",
              emp_instituteName: "${
                allCheckboxFilter.healthInstituteName.toString() ||
                searchQueryInfo?.emp_institution
              }",
              emp_noticePeriodID: "${
                allCheckboxFilter.noticePeriod.toString() ||
                searchQueryInfo?.emp_noticePeriod
              }",
              ed_healthcareIndustry: "${
                allCheckboxFilter.healthCareIndustry.toString() ||
                searchQueryInfo?.ed_healthcareIndustry
              }",
              ed_qualification: "${
                allCheckboxFilter.qualification.toString() ||
                searchQueryInfo?.ed_qualification
              }",
              ed_course: "${
                allCheckboxFilter.studiedCourse.toString() ||
                searchQueryInfo?.ed_course
              }",
              ed_specialization: "${
                allCheckboxFilter.studiedSpecialization.toString() ||
                searchQueryInfo?.ed_specialization
              }",
              ed_university: "${
                allCheckboxFilter.studiedUniversity.toString() ||
                searchQueryInfo?.ed_university
              }",
              ed_yearOfPassing: ${Number(searchQueryInfo?.ed_yearOfPassing)},
              ed_courseType: "${searchQueryInfo?.ed_courseType}",
              ps_maritalStatus: "${searchQueryInfo?.ps_maritalStatus}",
              ps_gender: "${searchQueryInfo?.ps_gender}",
              ps_maximumAge: ${Number(searchQueryInfo?.ps_maximumAge)},
              ps_minimumAge: ${Number(searchQueryInfo?.ps_minimumAge)},
              cp_industry: "${searchQueryInfo?.cp_industry?.industry || ""}",
              cp_roleCategory: "${searchQueryInfo?.cp_roleCategory}",
              cp_jobType: "${searchQueryInfo?.cp_jobType}",
              cp_employmentType: "${searchQueryInfo?.cp_employmentType}",
              cp_shift: "${searchQueryInfo?.cp_shift}",
              cp_expectedSalaryStart: ${Number(
                searchQueryInfo?.cp_expectedSalaryStart
              )},
              cp_expectedSalaryEnd: ${Number(
                searchQueryInfo?.cp_expectedSalaryEnd
              )},
              activeIn: "${form.activeIn || searchQueryInfo?.activeIn}",
              filterColumn: "all"
          )
      }`,
      variables: null,
      operationName: "MyMutation",
    };
    gqlquery(QUERY_FILTERRESUME, null)
      // gqlquery(QUERY_SEARCHJOBS, null)
      .then((res) => res.json())
      .then((data) => {
        // console.log(111, JSON?.parse(data?.data?.searchResumeFilter));
        setAllFilterOptions(JSON?.parse(data?.data?.searchResumeFilter));
        // const allFilterOptions = JSON?.parse(data?.data?.searchResumeFilter);
        // setForm({...form, "ctc": allFilterOptions?.ctc})

        getMatchedNoticePeriod(
          JSON?.parse(data?.data?.searchResumeFilter)?.noticePeriod
        );
      });

    const getMatchedNoticePeriod = (n) => {
      gqlquery(QUERY_NOTICEMASTER, null)
        .then((res) => res.json())
        .then((data) => {
          const noticePeriod = data?.data?.getNoticePeriodMasters;

          function getDifference(array1, array2) {
            return array1.filter((object1) => {
              return array2?.some((object2) => {
                return Number(object1.npID) === object2.noticePeriodID;
              });
            });
          }
          const matchedNP = getDifference(noticePeriod, n);
          setMatchedNoticePeriod(matchedNP);
          // console.log(allCheckboxFilter, 329, abc)
          // allCheckboxFilter[from] = [...allCheckboxFilter[from], name];
          // Object.assign(allCheckboxFilter[from], allCheckboxFilter[from]);
          // const oldState = {...allCheckboxFilter};
          // oldState.noticePeriod = matchedNP;
          // console.log(" heloow", matchedNP, 4, oldState);
          // setAllCheckboxFilter(oldState);
        });
    };

    // search resume
    const QUERY_SEARCHRESUME = {
      query: `query MyQuery {
          searchResume(
              anyKeywords: "${
                modifyKeywords?.jobTitle || searchQueryInfo?.anyKeywords
              }",
              allKeywords: "${
                modifyKeywords?.jobTitle || searchQueryInfo?.allKeywords
              }",
              employmentType: "${searchQueryInfo?.employmentType}",
              experienceFrom: ${
                form.experience[0] || Number(searchQueryInfo?.experienceFrom)
              },
              experienceTo: ${
                form.experience[1] || Number(searchQueryInfo?.experienceTo)
              },
              industry: "",
              currentLocation: "${
                modifyKeywords?.location || searchQueryInfo?.currentLocation
              }",
              preferredLocation: "${
                allCheckboxFilter.locationFilter.toString() ||
                modifyKeywords?.location ||
                searchQueryInfo?.preferredLocation
              }",
              salaryRangeEnd: ${
                form.ctc[1] || Number(searchQueryInfo?.salaryRangeEnd)
              },
              salaryRangeStart: ${
                form.ctc[0] || Number(searchQueryInfo?.salaryRangeStart)
              },
              pageNumber: ${Number(pageCount)},
              sortBy: "${values.sortBy === "date" ? "date" : ""}",
              emp_designation: "${
                allCheckboxFilter.designation.toString() ||
                searchQueryInfo?.emp_designation
              }",
              emp_instituteType: "${
                allCheckboxFilter.healthInstituteType.toString() ||
                searchQueryInfo?.emp_instituteType
              }",
              emp_instituteName: "${
                allCheckboxFilter.healthInstituteName.toString() ||
                searchQueryInfo?.emp_institution
              }",
              emp_noticePeriodID: "${
                allCheckboxFilter.noticePeriod.toString() ||
                searchQueryInfo?.emp_noticePeriod
              }",
              ed_healthcareIndustry: "${
                allCheckboxFilter.healthCareIndustry.toString() ||
                searchQueryInfo?.ed_healthcareIndustry
              }",
              ed_qualification: "${
                allCheckboxFilter.qualification.toString() ||
                searchQueryInfo?.ed_qualification
              }",
              ed_course: "${
                allCheckboxFilter.studiedCourse.toString() ||
                searchQueryInfo?.ed_course
              }",
              ed_specialization: "${
                allCheckboxFilter.studiedSpecialization.toString() ||
                searchQueryInfo?.ed_specialization
              }",
              ed_university: "${
                allCheckboxFilter.studiedUniversity.toString() ||
                searchQueryInfo?.ed_university
              }",
              ed_yearOfPassing: ${Number(searchQueryInfo?.ed_yearOfPassing)},
              ed_courseType: "${searchQueryInfo?.ed_courseType}",
              ps_maritalStatus: "${searchQueryInfo?.ps_maritalStatus}",
              ps_gender: "${searchQueryInfo?.ps_gender}",
              ps_maximumAge: ${Number(searchQueryInfo?.ps_maximumAge)},
              ps_minimumAge: ${Number(searchQueryInfo?.ps_minimumAge)},
              cp_industry: "${searchQueryInfo?.cp_industry?.industry || ""}",
              cp_roleCategory: "${searchQueryInfo?.cp_roleCategory}",
              cp_jobType: "${searchQueryInfo?.cp_jobType}",
              cp_employmentType: "${searchQueryInfo?.cp_employmentType}",
              cp_shift: "${searchQueryInfo?.cp_shift}",
              cp_expectedSalaryStart: ${Number(
                searchQueryInfo?.cp_expectedSalaryStart
              )},
              cp_expectedSalaryEnd: ${Number(
                searchQueryInfo?.cp_expectedSalaryEnd
              )},
              activeIn: "${form.activeIn || searchQueryInfo?.activeIn}",
              )}`,
    };
    gqlquery(QUERY_SEARCHRESUME, null)
      .then((res) => res.json())
      .then((datas) => {
        const parsedSearchResult = JSON?.parse(datas?.data?.searchResume)?.data;
        setPagination(JSON?.parse(datas?.data?.searchResume));
        // console.log("resume result & length ==>>", parsedSearchResult, parsedSearchResult?.length)
        // console.log("search resume result on button ==>>", JSON?.parse(datas?.data?.searchResume));
        parsedSearchResult?.map((result) => {
          const QUERY_ISCANDIDATEPROFILEVIEWED = {
            query: `query MyQuery {
                      isCandidateProfileViewed(candidateID: "${result?.userID}")
                    }`,
          };

          gqlquery(QUERY_ISCANDIDATEPROFILEVIEWED, null)
            .then((res) => res.json())
            .then((data) => {
              const parsed = JSON.parse(data.data?.isCandidateProfileViewed);
              Object.assign(result, parsed);
              callSearchResult();
            });
        });
        const callSearchResult = () => {
          setSearchResult(parsedSearchResult);
          window.scrollTo(0, 0);
          // console.log("hit refine search and show result.");
        };
      });
  };

  const handleClearFilter = (e) => {
    if (
      allCheckboxFilter.locationFilter.length > 0 ||
      allCheckboxFilter.healthCareIndustry.length > 0 ||
      allCheckboxFilter.qualification.length > 0 ||
      allCheckboxFilter.studiedCourse.length > 0 ||
      allCheckboxFilter.studiedSpecialization.length > 0 ||
      allCheckboxFilter.studiedUniversity.length > 0 ||
      allCheckboxFilter.designation.length > 0 ||
      allCheckboxFilter.healthInstituteType.length > 0 ||
      allCheckboxFilter.healthInstituteName.length > 0 ||
      allCheckboxFilter.noticePeriod.length > 0 ||
      allCheckboxFilter.activeIn.length > 0 ||
      form.experience[0] !== allFilterOptions?.experience[0] ||
      form.experience[1] !== allFilterOptions?.experience[1] ||
      form.ctc[0] !== allFilterOptions?.ctc[0] ||
      form.ctc[1] !== allFilterOptions?.ctc[1]
    ) {
      // console.log(allCheckboxFilter, form)
      allCheckboxFilter.locationFilter = [];
      allCheckboxFilter.healthCareIndustry = [];
      allCheckboxFilter.qualification = [];
      allCheckboxFilter.studiedCourse = [];
      allCheckboxFilter.studiedSpecialization = [];
      allCheckboxFilter.studiedUniversity = [];
      allCheckboxFilter.designation = [];
      allCheckboxFilter.healthInstituteType = [];
      allCheckboxFilter.healthInstituteName = [];
      allCheckboxFilter.noticePeriod = [];
      allCheckboxFilter.activeIn = [];
      form.activeIn = searchQueryInfo?.activeIn;

      setOpenedItemId((prev) => "");
      handleRefineSearch();
    }
  };

  useEffect(() => {
    const QUERY_FILTERRESUME = {
      query: `query MyQuery {
        searchResumeFilter(
              anyKeywords: "${
                modifyKeywords?.jobTitle || searchQueryInfo?.anyKeywords
              }",
              allKeywords: "${
                modifyKeywords?.jobTitle || searchQueryInfo?.allKeywords
              }",
              employmentType: "${searchQueryInfo?.employmentType}",
              experienceFrom: ${
                form.experience[0] || Number(searchQueryInfo?.experienceFrom)
              },
              experienceTo: ${
                form.experience[1] || Number(searchQueryInfo?.experienceTo)
              },
              industry: "",
              currentLocation: "${
                modifyKeywords?.location || searchQueryInfo?.currentLocation
              }",
              preferredLocation: "${
                allCheckboxFilter.locationFilter.toString() ||
                modifyKeywords?.location ||
                searchQueryInfo?.preferredLocation
              }",
              salaryRangeEnd: ${
                form.ctc[1] || Number(searchQueryInfo?.salaryRangeEnd)
              },
              salaryRangeStart: ${
                form.ctc[0] || Number(searchQueryInfo?.salaryRangeStart)
              },
              pageNumber: ${Number(pageCount)},
              sortBy: "${values.sortBy === "date" ? "date" : ""}",
              emp_designation: "${
                allCheckboxFilter.designation.toString() ||
                searchQueryInfo?.emp_designation
              }",
              emp_instituteType: "${
                allCheckboxFilter.healthInstituteType.toString() ||
                searchQueryInfo?.emp_instituteType
              }",
              emp_instituteName: "${
                allCheckboxFilter.healthInstituteName.toString() ||
                searchQueryInfo?.emp_institution
              }",
              emp_noticePeriodID: "${
                allCheckboxFilter.noticePeriod.toString() ||
                searchQueryInfo?.emp_noticePeriod
              }",
              ed_healthcareIndustry: "${
                allCheckboxFilter.healthCareIndustry.toString() ||
                searchQueryInfo?.ed_healthcareIndustry
              }",
              ed_qualification: "${
                allCheckboxFilter.qualification.toString() ||
                searchQueryInfo?.ed_qualification
              }",
              ed_course: "${
                allCheckboxFilter.studiedCourse.toString() ||
                searchQueryInfo?.ed_course
              }",
              ed_specialization: "${
                allCheckboxFilter.studiedSpecialization.toString() ||
                searchQueryInfo?.ed_specialization
              }",
              ed_university: "${
                allCheckboxFilter.studiedUniversity.toString() ||
                searchQueryInfo?.ed_university
              }",
              ed_yearOfPassing: ${Number(searchQueryInfo?.ed_yearOfPassing)},
              ed_courseType: "${searchQueryInfo?.ed_courseType}",
              ps_maritalStatus: "${searchQueryInfo?.ps_maritalStatus}",
              ps_gender: "${searchQueryInfo?.ps_gender}",
              ps_maximumAge: ${Number(searchQueryInfo?.ps_maximumAge)},
              ps_minimumAge: ${Number(searchQueryInfo?.ps_minimumAge)},
              cp_industry: "${searchQueryInfo?.cp_industry?.industry || ""}",
              cp_roleCategory: "${searchQueryInfo?.cp_roleCategory}",
              cp_jobType: "${searchQueryInfo?.cp_jobType}",
              cp_employmentType: "${searchQueryInfo?.cp_employmentType}",
              cp_shift: "${searchQueryInfo?.cp_shift}",
              cp_expectedSalaryStart: ${Number(
                searchQueryInfo?.cp_expectedSalaryStart
              )},
              cp_expectedSalaryEnd: ${Number(
                searchQueryInfo?.cp_expectedSalaryEnd
              )},
              activeIn: "${form.activeIn || searchQueryInfo?.activeIn}",
              filterColumn: "all"
          )
      }`,
      variables: null,
      operationName: "MyMutation",
    };
    gqlquery(QUERY_FILTERRESUME, null)
      // gqlquery(QUERY_SEARCHJOBS, null)
      .then((res) => res.json())
      .then((data) => {
        // console.log(111, JSON?.parse(data?.data?.searchResumeFilter));
        setAllFilterOptions(JSON?.parse(data?.data?.searchResumeFilter));
        const allFilterOptions = JSON?.parse(data?.data?.searchResumeFilter);
        // console.log("experience:", allFilterOptions?.experience);
        setForm({
          ...form,
          experience: allFilterOptions?.experience,
          ctc: allFilterOptions?.ctc,
        });
        // setForm({...form, "ctc": allFilterOptions?.ctc})

        getMatchedNoticePeriod(
          JSON?.parse(data?.data?.searchResumeFilter)?.noticePeriod
        );
      });

    const getMatchedNoticePeriod = (n) => {
      gqlquery(QUERY_NOTICEMASTER, null)
        .then((res) => res.json())
        .then((data) => {
          const noticePeriod = data?.data?.getNoticePeriodMasters;

          function getDifference(array1, array2) {
            return array1.filter((object1) => {
              return array2?.some((object2) => {
                return Number(object1.npID) === object2.noticePeriodID;
              });
            });
          }
          const matchedNP = getDifference(noticePeriod, n);
          setMatchedNoticePeriod(matchedNP);
          // console.log(allCheckboxFilter, 329, abc)
          // allCheckboxFilter[from] = [...allCheckboxFilter[from], name];
          // Object.assign(allCheckboxFilter[from], allCheckboxFilter[from]);
          // const oldState = {...allCheckboxFilter};
          // oldState.noticePeriod = matchedNP;
          // console.log(" heloow", matchedNP, 4, oldState);
          // setAllCheckboxFilter(oldState);
        });
    };
  }, []);

  // console.log(4353454, searchQueryInfo);

  useEffect(() => {
    const QUERY_SEARCHRESUME = {
      query: `query MyQuery {
          searchResume(
              anyKeywords: "${
                modifyKeywords?.jobTitle || searchQueryInfo?.anyKeywords
              }",
              allKeywords: "${
                modifyKeywords?.jobTitle || searchQueryInfo?.allKeywords
              }",
              employmentType: "${searchQueryInfo?.employmentType}",
              experienceFrom: ${
                form.experience[0] || Number(searchQueryInfo?.experienceFrom)
              },
              experienceTo: ${
                form.experience[1] || Number(searchQueryInfo?.experienceTo)
              },
              industry: "",
              currentLocation: "${
                modifyKeywords?.location || searchQueryInfo?.currentLocation
              }",
              preferredLocation: "${
                allCheckboxFilter.locationFilter.toString() ||
                modifyKeywords?.location ||
                searchQueryInfo?.preferredLocation
              }",
              salaryRangeEnd: ${
                form.ctc[1] || Number(searchQueryInfo?.salaryRangeEnd)
              },
              salaryRangeStart: ${
                form.ctc[0] || Number(searchQueryInfo?.salaryRangeStart)
              },
              pageNumber: ${Number(pageCount)},
              sortBy: "${values.sortBy === "date" ? "date" : ""}",
              emp_designation: "${
                allCheckboxFilter.designation.toString() ||
                searchQueryInfo?.emp_designation
              }",
              emp_instituteType: "${
                allCheckboxFilter.healthInstituteType.toString() ||
                searchQueryInfo?.emp_instituteType
              }",
              emp_instituteName: "${
                allCheckboxFilter.healthInstituteName.toString() ||
                searchQueryInfo?.emp_institution
              }",
              emp_noticePeriodID: "${
                allCheckboxFilter.noticePeriod.toString() ||
                searchQueryInfo?.emp_noticePeriod
              }",
              ed_healthcareIndustry: "${
                allCheckboxFilter.healthCareIndustry.toString() ||
                searchQueryInfo?.ed_healthcareIndustry
              }",
              ed_qualification: "${
                allCheckboxFilter.qualification.toString() ||
                searchQueryInfo?.ed_qualification
              }",
              ed_course: "${
                allCheckboxFilter.studiedCourse.toString() ||
                searchQueryInfo?.ed_course
              }",
              ed_specialization: "${
                allCheckboxFilter.studiedSpecialization.toString() ||
                searchQueryInfo?.ed_specialization
              }",
              ed_university: "${
                allCheckboxFilter.studiedUniversity.toString() ||
                searchQueryInfo?.ed_university
              }",
              ed_yearOfPassing: ${Number(searchQueryInfo?.ed_yearOfPassing)},
              ed_courseType: "${searchQueryInfo?.ed_courseType}",
              ps_maritalStatus: "${searchQueryInfo?.ps_maritalStatus}",
              ps_gender: "${searchQueryInfo?.ps_gender}",
              ps_maximumAge: ${Number(searchQueryInfo?.ps_maximumAge)},
              ps_minimumAge: ${Number(searchQueryInfo?.ps_minimumAge)},
              cp_industry: "${searchQueryInfo?.cp_industry?.industry || ""}",
              cp_roleCategory: "${searchQueryInfo?.cp_roleCategory}",
              cp_jobType: "${searchQueryInfo?.cp_jobType}",
              cp_employmentType: "${searchQueryInfo?.cp_employmentType}",
              cp_shift: "${searchQueryInfo?.cp_shift}",
              cp_expectedSalaryStart: ${Number(
                searchQueryInfo?.cp_expectedSalaryStart
              )},
              cp_expectedSalaryEnd: ${Number(
                searchQueryInfo?.cp_expectedSalaryEnd
              )},
              activeIn: "${form.activeIn || searchQueryInfo?.activeIn}",
              )}`,
    };
    gqlquery(QUERY_SEARCHRESUME, null)
      .then((res) => res.json())
      .then((datas) => {
        const parsedSearchResult = JSON?.parse(datas?.data?.searchResume)?.data;
        setPagination(JSON?.parse(datas?.data?.searchResume));
        // console.log(
        //   "resume result & length ==>>",
        //   JSON?.parse(datas?.data?.searchResume),
        //   parsedSearchResult?.length
        // );
        // console.log("search resume result ==>>", parsedSearchResult)
        parsedSearchResult?.map((result) => {
          const QUERY_ISCANDIDATEPROFILEVIEWED = {
            query: `query MyQuery {
                      isCandidateProfileViewed(candidateID: "${result?.userID}")
                    }`,
          };

          gqlquery(QUERY_ISCANDIDATEPROFILEVIEWED, null)
            .then((res) => res.json())
            .then((data) => {
              const parsed = JSON.parse(data.data?.isCandidateProfileViewed);
              Object.assign(result, parsed);
              callSearchResult();
            });
        });
        const callSearchResult = () => {
          setSearchResult(parsedSearchResult);
        };
      });
    // console.log('execute')
  }, [pageCount, values.sortBy]);

  const handleModifySeaerch = () => {
    const keywords = {
      location: form.location,
      jobTitle: form.jobTitle,
    };
    sessionStorage.setItem("keywords", JSON.stringify(keywords));

    window.location.reload();
    // const QUERY_SEARCHRESUME = {
    //   query: `query MyQuery {
    //       searchResume(
    //           anyKeywords: "${form.jobTitle}",
    //           allKeywords: "${form.jobTitle}",
    //           employmentType: "${searchQueryInfo?.employmentType}",
    //           experienceFrom: ${Number(searchQueryInfo?.experienceFrom)},
    //           experienceTo: ${Number(searchQueryInfo?.experienceTo)},
    //           functionAreaID: ${Number(searchQueryInfo?.functionAreaID)},
    //           industry: "${searchQueryInfo?.industry}",
    //           preferredLocation: "${searchQueryInfo?.preferredLocation}",
    //           salaryRangeEnd: ${Number(searchQueryInfo?.salaryRangeEnd)},
    //           salaryRangeStart: ${Number(searchQueryInfo?.salaryRangeStart)},
    //           pageNumber: ${Number(pageCount)},
    //           sortBy: "${values.sortBy === "date" ? "date" : ""}"
    //           ) {
    //              activelySearching
    //              city
    //              exp
    //              name
    //              salary
    //              specialization
    //              userID
    //              profilePicURL
    //              phoneVerified
    //             }
    //           }`
    // };
    // gqlquery(QUERY_SEARCHRESUME, null)
    //   .then((res) => res.json())
    //   .then((datas) => {
    //     console.log("first console 212", datas)
    //     window.scrollTo(0, 0);
    //     datas?.data?.searchResume?.map((result) => {

    //       const QUERY_ISCANDIDATEPROFILEVIEWED = {
    //         query: `query MyQuery {
    //                   isCandidateProfileViewed(candidateID: "${result?.userID}")
    //                 }`
    //       };

    //       gqlquery(QUERY_ISCANDIDATEPROFILEVIEWED, null)
    //         .then((res) => res.json())
    //         .then(data => {
    //           const parsed = JSON.parse(data.data?.isCandidateProfileViewed);
    //           Object.assign(result, parsed)
    //           callSearchResult();
    //         })
    //     });
    //     const callSearchResult = () => {
    //       setSearchResult(datas?.data?.searchResume);
    //     }
    //   });
    // console.log(form);
  };

  const newSearchResume = () => {
    sessionStorage.removeItem("keywords");
    navigate("/advance-search");
  };

  const handleIncreasePageCount = (eventName) => {
    if (eventName === "increase") {
      setUpdate((prev) => !prev);
      setPageCount((prev) => prev + 1);
    }
    if (eventName === "decrease") {
      if (pageCount === 1) {
        setPageCount((prev) => prev);
      } else {
        setPageCount((prev) => prev - 1);
      }
    }
  };

  useEffect(() => {
    setProfileContainer([]);
  }, [pageCount]);

  const handleChangePage = (event, newPage) => {
    // console.log("pageCount, newPage, then ", pageCount, newPage)
    setPageCount(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // console.log(`activeIn: ${searchQueryInfo?.activeIn}, `, form.activeIn)
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const pageNo = pageCount / 10;

  useEffect(() => {
    searchResult?.map((result) => {
      const QUERY_SEARCHRESUME = {
        query: `query MyQuery {
          getCandidateCurrentExperience (userID: "${result?.userID}") {
              currentlyWorking
              description
              designationID
              employmentType
              hospitalID
              hospital
              jobType
              noticePeriodID
              startingMonth
              startingYear
              workingMonth
              workingYear
            }
        }`,
      };
      gqlquery(QUERY_SEARCHRESUME, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.getCandidateCurrentExperience !== null) {
            Object.assign(result, datas?.data);
          }
        });

      const QUERY_GETCANDIDATEEDUCATION = {
        query: `query MyQuery {
          getCandidateEducation (userID: "${result?.userID}") {
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
      gqlquery(QUERY_GETCANDIDATEEDUCATION, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.getCandidateEducation?.length) {
            Object.assign(result, datas?.data);
          }
        });

      const QUERY_GETCANDIDATESKILLS = {
        query: `query MyQuery {
            getCandidateSkills (userID: "${result?.userID}") {
                name
                sID
                smID
              }
          }`,
      };
      gqlquery(QUERY_GETCANDIDATESKILLS, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.getCandidateSkills !== null) {
            Object.assign(result, datas?.data);
            setResultMerged(result);
          }
        });
    });
  }, [searchResult, pageCount]);

  // Resume access check
  useEffect(() => {
    gqlquery(QUERY_GETACTIVESUBSCRIPTIONS, null)
      .then((res) => res.json())
      .then((data) => {
        setActiveSubscription(data?.data?.getActiveSubscriptions);
      })
      .finally(() => setInitialLoading(false));
  }, []);

  // Verify Access
  const accessResumeDBObj = activeSubscription?.find(
    (aS) => aS?.type === "ResumeDB"
  );

  const handleGetContactDetails = (id) => {
    setLoadingItemID(id);
    setIsLoading(true);
    const QUERY_GETCONTACTDETAILS = {
      query: `query MyQuery {
        getContactDetails(candidateID: "${id}") {
          candidateID
          email
          phone
          phoneVerified
          profilePicURL
        }
      }`,
    };

    gqlquery(QUERY_GETCONTACTDETAILS, null)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setContactDetails(() => [
          ...contactDetails,
          data?.data?.getContactDetails,
        ]);

        const getcontactdetails = searchResult?.filter(
          (profile) =>
            profile?.userID === data?.data?.getContactDetails?.candidateID
        );
        if (getcontactdetails.length > 0) {
          setLoadProfileDetails((pre) => !pre);
          Object.assign(getcontactdetails[0], data?.data?.getContactDetails);
          setSearchResult((pre) => pre);
          setSingleContact(data?.data?.getContactDetails);
        }

        if (data?.data?.getContactDetails?.profilePicURL) {
          setImageLoading(true);
          const QUERY_DOWNLOADRESUME = {
            query: `query MyQuery {
                  downloadDocument (url: "${data?.data?.getContactDetails?.profilePicURL}")
                }`,
          };
          gqlquery(QUERY_DOWNLOADRESUME, null)
            .then((res) => res.json())
            .then((datas) => {
              const downloadDocument = JSON.parse(
                datas?.data?.downloadDocument
              );
              Object.assign(getcontactdetails[0], downloadDocument);
              setShareImage(downloadDocument);
            })
            .finally(() => setImageLoading(false));
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleNavigateSingleApplicantsDetails = async (id, candidateInfo) => {
    setIsLoading(true);
    const QUERY_GETCONTACTDETAILS = {
      query: `query MyQuery {
        getContactDetails(candidateID: "${id}") {
          candidateID
          email
          phone
          phoneVerified
          profilePicURL
        }
      }`,
    };

    gqlquery(QUERY_GETCONTACTDETAILS, null)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setContactDetails(() => [
          ...contactDetails,
          data?.data?.getContactDetails,
        ]);

        const getcontactdetails = searchResult?.filter(
          (profile) =>
            profile?.userID === data?.data?.getContactDetails?.candidateID
        );
        if (getcontactdetails.length > 0) {
          setLoadProfileDetails((pre) => !pre);
          Object.assign(getcontactdetails[0], data?.data?.getContactDetails);
          setSearchResult((pre) => pre);
          // if(Object.keys(singleContact).length > 0) {
          // console.log(singleContact)
          // }
          // setSingleContact(data?.data?.getContactDetails);
        }
        navigate(`/applicants-detail/${id}`, {
          state: {
            data: data?.data?.getContactDetails,
            picture: shareImage,
            user: candidateInfo,
            from: `Resume Search for ${
              modifyKeywords?.jobTitle ||
              location.state?.anyKeywords ||
              searchQueryInfo?.anyKeywords
            }`,
            searchQueryInfo:
              modifyKeywords?.jobTitle ||
              location.state?.anyKeywords ||
              searchQueryInfo?.anyKeywords,
          },
        });
        if (data?.data?.getContactDetails?.profilePicURL) {
          setImageLoading(true);
          const QUERY_DOWNLOADRESUME = {
            query: `query MyQuery {
                  downloadDocument (url: "${data?.data?.getContactDetails?.profilePicURL}")
                }`,
          };
          gqlquery(QUERY_DOWNLOADRESUME, null)
            .then((res) => res.json())
            .then((datas) => {
              const downloadDocument = JSON.parse(
                datas?.data?.downloadDocument
              );
              Object.assign(getcontactdetails[0], downloadDocument);
              setShareImage(downloadDocument);
            })
            .finally(() => setImageLoading(false));
        }
      })
      .finally(() => setIsLoading(false));
  };

  if (!initialLoading) {
    return (
      <ShowForAccessResumeDB>
        {accessResumeDBObj?.validUpto >=
          new Date().toISOString().slice(0, 10) &&
        accessResumeDBObj?.creditsLeft > 0 ? (
          <Box maxWidth="xl" sx={{ mx: "auto", mb: 8, px: { xs: 0, lg: 3 } }}>
            <Box sx={{ px: { xs: 0, md: 3 } }}>
              {!matches ? (
                <Breadcrumbs
                  separator={
                    <NavigateNextIcon
                      fontSize="small"
                      sx={{ color: "var(--clr-blue-footer)" }}
                    />
                  }
                  aria-label="breadcrumb"
                  sx={{ marginTop: "15px" }}
                  style={{ marginBottom: "15px" }}
                >
                  <Link
                    underline="hover"
                    style={{ color: "var(--clr-blue-footer)" }}
                    to="/hospital-dashboard"
                  >
                    Dashboard
                  </Link>
                  <Link
                    underline="hover"
                    style={{ color: "var(--clr-blue-footer)" }}
                    to="/advance-search"
                  >
                    Search Resume
                  </Link>
                  <Typography sx={{ color: "var(--clr-blue-footer)" }}>
                    Results
                  </Typography>
                </Breadcrumbs>
              ) : (
                <Box
                  sx={{
                    p: 2,
                    mb: 1,
                    display: "flex",
                    gap: 1.5,
                    alignItems: "center",
                    backgroundColor: "var(--clr-blue-light)",
                  }}
                >
                  <NavigateBeforeIcon
                    sx={{ fontSize: "2rem", color: "var(--clr-blue-footer)" }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "var(--clr-blue-footer)",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    Search Result
                  </Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ px: { xs: 2, md: 3 } }}>
              {/* Search Resume with any keyword and Industry wise.  */}
              <Box
                sx={{
                  backgroundColor: "var(--clr-white)",
                  borderRadius: 1,
                  boxShadow: {
                    xs: "none",
                    md: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                  },
                  border: { xs: "1px solid var(--clr-blue-light)", md: "none" },
                  p: 2,
                }}
              >
                <Typography>
                  Showing Resume for '
                  {modifyKeywords?.jobTitle ||
                    location.state?.anyKeywords ||
                    searchQueryInfo?.anyKeywords}
                  '{" "}
                  {(modifyKeywords?.location ||
                    searchQueryInfo?.preferredLocation) &&
                    ",  in " + modifyKeywords?.location}
                </Typography>
                {isModifySearch && (
                  <Grid
                    container
                    justifyContent="space-between"
                    rowSpacing={3}
                    columnSpacing={5}
                  >
                    <Grid item xs={12} md={6}>
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>Any Keywords</InputLabel>
                        <TextField
                          disableUnderline
                          variant="outlined"
                          name="jobTitle"
                          type="text"
                          placeholder="Text"
                          defaultValue={searchQueryInfo?.anyKeywords}
                          // value={form.jobTitle}
                          onChange={formValueChange}
                          fullWidth
                          sx={{
                            borderRadius: 1,
                          }}
                          InputProps={{
                            sx: {
                              ".MuiOutlinedInput-input": {
                                padding: "12.5px 14px",
                              },
                              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                border: "1px solid var(--clr-blue-light)",
                              },
                              "&:hover": {
                                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "1px solid var(--clr-blue-primary)",
                                  },
                              },
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>Industry</InputLabel>
                        <TextField
                          disableUnderline
                          variant="outlined"
                          name="location"
                          type="text"
                          placeholder="Text"
                          defaultValue={searchQueryInfo?.industry}
                          // value={form.location}
                          onChange={formValueChange}
                          fullWidth
                          sx={{
                            borderRadius: 1,
                          }}
                          InputProps={{
                            sx: {
                              ".MuiOutlinedInput-input": {
                                padding: "12.5px 14px",
                              },
                              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                border: "1px solid var(--clr-blue-light)",
                              },
                              "&:hover": {
                                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "1px solid var(--clr-blue-primary)",
                                  },
                              },
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                )}
                {isModifySearch ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: 4,
                      justifyContent: { xs: "space-between", md: "flex-start" },
                      gap: { xs: 1, md: 4 },
                    }}
                  >
                    <Button
                      size="medium"
                      variant="contained"
                      sx={{
                        borderRadius: 16,
                        py: 1,
                      }}
                      onClick={handleModifySeaerch}
                    >
                      Modify&nbsp;Search
                    </Button>
                    <Button
                      size="medium"
                      variant="outlined"
                      sx={{
                        borderWidth: "2px",
                        borderRadius: 16,
                      }}
                      onClick={() => setIsModifySearch(!isModifySearch)}
                    >
                      Cancel
                    </Button>
                    {/* <Button
                  size="large"
                  variant="text" 
                >
                  Save Search
                </Button> */}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: 4,
                      justifyContent: { xs: "space-between", md: "flex-start" },
                      gap: { xs: 1, md: 4 },
                    }}
                  >
                    <Button
                      size="medium"
                      variant="contained"
                      sx={{
                        borderRadius: 16,
                        py: 1,
                      }}
                      onClick={() => setIsModifySearch(!isModifySearch)}
                    >
                      Modify&nbsp;Search
                    </Button>
                    <Button
                      size="medium"
                      variant="outlined"
                      sx={{
                        borderWidth: "2px",
                        borderRadius: 16,
                      }}
                      onClick={newSearchResume}
                    >
                      New&nbsp;Search
                    </Button>
                    {/* <Button
                size="large"
                variant="text" 
              >
                Save Search
              </Button> */}
                  </Box>
                )}
              </Box>
              {/* Resume result and drop down container */}
              <Box sx={{ py: 3 }}>
                <Grid container spacing={{ xs: 1, md: 3 }}>
                  <Grid item xs={12} md={3}>
                    <Box
                      sx={{
                        diplay: "flex",
                        flexDirection: "column",
                        gap: 3,
                        pt: { xs: 3, md: 11.5 },
                      }}
                    >
                      {/* Box head */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                          justifyContent: {
                            xs: "space-between",
                            md: "flex-start",
                          },
                          backgroundColor: "var(--clr-blue-light)",
                          px: 2.5,
                          py: 1.5,
                          mb: 1.5,
                          borderTopLeftRadius: "6px",
                          borderTopRightRadius: "6px",
                        }}
                      >
                        <Box
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <FilterAltTwoToneIcon
                            sx={{ color: "var(--clr-blue-footer)" }}
                          />
                          <Typography
                            variant="subtitle1"
                            sx={{
                              color: "var(--clr-blue-footer)",
                              fontWeight: 600,
                            }}
                          >
                            All Filters
                          </Typography>
                        </Box>
                        {matches && (
                          <Box sx={{ pt: 0.5 }}>
                            {filterOpen ? (
                              <ExpandLess
                                onClick={handleShowAllFilter}
                                style={{
                                  height: "35px",
                                  width: "40px",
                                  color: "var(--clr-blue-footer)",
                                }}
                              />
                            ) : (
                              <ExpandMore
                                onClick={handleShowAllFilter}
                                style={{
                                  height: "35px",
                                  width: "40px",
                                  color: "var(--clr-blue-footer)",
                                }}
                              />
                            )}
                          </Box>
                        )}
                      </Box>
                      {matches ? (
                        <Box>
                          {/* Filter for Mobile and tab */}
                          {filterOpen && (
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
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      Preferred Location
                                    </Typography>
                                    {openedItemId === "location" ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={openedItemId === "location"}
                                      timeout="auto"
                                      unmountOnExit
                                    >
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
                                          type="text"
                                          value={
                                            filterFromOptions?.locationFilter
                                          }
                                          onChange={handleChange(
                                            "locationFilter"
                                          )}
                                          placeholder="Search Preferred Location..."
                                          endAdornment={
                                            <InputAdornment
                                              position="end"
                                              style={{ outline: "none" }}
                                            >
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                              >
                                                {/* {values.searchUser} */}
                                                <SearchIcon
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-footer)",
                                                  }}
                                                />
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
                                          {allFilterOptions?.location
                                            ?.filter((loc) => {
                                              if (
                                                filterFromOptions?.locationFilter ===
                                                ""
                                              ) {
                                                return loc;
                                              } else if (
                                                loc?.cityWithState
                                                  ?.toLowerCase()
                                                  ?.includes(
                                                    filterFromOptions?.locationFilter?.toLowerCase()
                                                  )
                                              ) {
                                                return loc;
                                              }
                                            })
                                            ?.map((loc, index) => (
                                              <Typography
                                                variant="body1"
                                                sx={{
                                                  color: "var(--clr-gray-1)",
                                                }}
                                              >
                                                <Checkbox
                                                  sx={{
                                                    color: "#C7D3E3",
                                                    "&.Mui-checked": {
                                                      color:
                                                        "var(--clr-blue-primary)",
                                                    },
                                                  }}
                                                  checked={allCheckboxFilter.locationFilter.includes(
                                                    loc?.cityWithState?.toLowerCase()
                                                  )}
                                                  onChange={() =>
                                                    handleAllCheckboxFilter(
                                                      loc?.cityWithState,
                                                      "locationFilter"
                                                    )
                                                  }
                                                  key={index}
                                                  name={loc?.cityWithState}
                                                />
                                                {loc?.cityWithState}
                                              </Typography>
                                            ))}
                                        </Box>
                                      </Box>
                                    </Collapse>
                                  </Box>
                                </Box>
                              </Box>
                              {/* experience  */}
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
                                    id="experience"
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      Experience
                                    </Typography>
                                    {openedItemId === "experience" ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={openedItemId === "experience"}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <Box sx={{ px: 4, py: 2 }}>
                                        <Slider
                                          name="experience"
                                          getAriaLabel={() =>
                                            "Experience range"
                                          }
                                          onChange={formValueChange}
                                          valueLabelDisplay="auto"
                                          value={form.experience}
                                          min={0}
                                          max={100}
                                          marks={[
                                            {
                                              value: 0,
                                              label: `${Math.round(
                                                form.experience[0]
                                              )} year`,
                                            },
                                            {
                                              value: 99,
                                              label: `${Math.round(
                                                form.experience[1]
                                              )} year`,
                                            },
                                          ]}
                                          sx={{
                                            "& .MuiSlider-thumb": {
                                              height: 24,
                                              width: 24,
                                              color: "var(--clr-white)",
                                              border:
                                                "2px solid var(--clr-blue-footer)",
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
                                </Box>
                              </Box>
                              {/* ctc */}
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
                                    id="ctc"
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      CTC
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
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={openedItemId === "ctc"}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <Box sx={{ px: 4, py: 2 }}>
                                        <Slider
                                          name="ctc"
                                          getAriaLabel={() => "Salary range"}
                                          onChange={formValueChange}
                                          valueLabelDisplay="auto"
                                          value={form.ctc}
                                          min={form.ctc[0]}
                                          max={form.ctc[1]}
                                          marks={[
                                            {
                                              value: form.ctc[0],
                                              label: `₹${Math.round(
                                                form.ctc[0]
                                              )} lakh`,
                                            },
                                            {
                                              value: form.ctc[1],
                                              label: `₹${Math.round(
                                                form.ctc[1]
                                              )} lakh`,
                                            },
                                          ]}
                                          sx={{
                                            "& .MuiSlider-thumb": {
                                              height: 24,
                                              width: 24,
                                              color: "var(--clr-white)",
                                              border:
                                                "2px solid var(--clr-blue-footer)",
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
                                </Box>
                              </Box>
                              {/* healthcare industry */}
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
                                    id="healthcareIndustry"
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      Healthcare Indsutry
                                    </Typography>
                                    {openedItemId === "healthcareIndustry" ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={openedItemId === "healthcareIndustry"}
                                      timeout="auto"
                                      unmountOnExit
                                    >
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
                                          type="text"
                                          value={
                                            filterFromOptions?.healthCareIndustry
                                          }
                                          onChange={handleChange(
                                            "healthCareIndustry"
                                          )}
                                          placeholder="Search Healthcare Indsutry..."
                                          endAdornment={
                                            <InputAdornment
                                              position="end"
                                              style={{ outline: "none" }}
                                            >
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                              >
                                                {/* {values.searchUser} */}
                                                <SearchIcon
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-footer)",
                                                  }}
                                                />
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
                                          maxHeight: "300px",
                                          overflowX: "auto",
                                        }}
                                      >
                                        {allFilterOptions?.healthcareIndustry
                                          ?.filter((hci) => {
                                            if (
                                              filterFromOptions?.healthCareIndustry ===
                                              ""
                                            ) {
                                              return hci;
                                            } else if (
                                              hci?.healthcareIndustry
                                                ?.toLowerCase()
                                                ?.includes(
                                                  filterFromOptions?.healthCareIndustry?.toLowerCase()
                                                )
                                            ) {
                                              return hci;
                                            }
                                          })
                                          ?.map((hci, index) => (
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                color: "var(--clr-gray-1)",
                                              }}
                                            >
                                              <Checkbox
                                                sx={{
                                                  color: "#C7D3E3",
                                                  "&.Mui-checked": {
                                                    color:
                                                      "var(--clr-blue-primary)",
                                                  },
                                                }}
                                                checked={allCheckboxFilter.healthCareIndustry.includes(
                                                  hci?.healthcareIndustry?.toLowerCase()
                                                )}
                                                onChange={() =>
                                                  handleAllCheckboxFilter(
                                                    hci?.healthcareIndustry,
                                                    "healthCareIndustry"
                                                  )
                                                }
                                                key={index}
                                                name={hci?.healthcareIndustry}
                                              />
                                              {hci?.healthcareIndustry}
                                            </Typography>
                                          ))}
                                      </Box>
                                    </Collapse>
                                  </Box>
                                </Box>
                              </Box>
                              {/* qualification */}
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
                                    id="qualification"
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      Qualification
                                    </Typography>
                                    {openedItemId === "qualification" ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={openedItemId === "qualification"}
                                      timeout="auto"
                                      unmountOnExit
                                    >
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
                                          type="text"
                                          value={
                                            filterFromOptions?.qualification
                                          }
                                          onChange={handleChange(
                                            "qualification"
                                          )}
                                          placeholder="Search Qualification..."
                                          endAdornment={
                                            <InputAdornment
                                              position="end"
                                              style={{ outline: "none" }}
                                            >
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                              >
                                                {/* {values.searchUser} */}
                                                <SearchIcon
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-footer)",
                                                  }}
                                                />
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
                                          maxHeight: "300px",
                                          overflowX: "auto",
                                        }}
                                      >
                                        {allFilterOptions?.qualifications
                                          ?.filter((qualify) => {
                                            if (
                                              filterFromOptions?.qualification ===
                                              ""
                                            ) {
                                              return qualify;
                                            } else if (
                                              qualify?.qualification
                                                ?.toLowerCase()
                                                ?.includes(
                                                  filterFromOptions?.qualification?.toLowerCase()
                                                )
                                            ) {
                                              return qualify;
                                            }
                                          })
                                          ?.map((qualification, index) => (
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                color: "var(--clr-gray-1)",
                                              }}
                                            >
                                              <Checkbox
                                                sx={{
                                                  color: "#C7D3E3",
                                                  "&.Mui-checked": {
                                                    color:
                                                      "var(--clr-blue-primary)",
                                                  },
                                                }}
                                                checked={allCheckboxFilter?.qualification?.includes(
                                                  qualification?.qualification?.toLowerCase()
                                                )}
                                                onChange={() =>
                                                  handleAllCheckboxFilter(
                                                    qualification?.qualification,
                                                    "qualification"
                                                  )
                                                }
                                                key={index}
                                                name={
                                                  qualification?.qualification
                                                }
                                              />
                                              {qualification?.qualification}
                                            </Typography>
                                          ))}
                                      </Box>
                                    </Collapse>
                                  </Box>
                                </Box>
                              </Box>
                              {/* studied course */}
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
                                    id="studiedCourse"
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      Studied Course
                                    </Typography>
                                    {openedItemId === "studiedCourse" ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={openedItemId === "studiedCourse"}
                                      timeout="auto"
                                      unmountOnExit
                                    >
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
                                          type="text"
                                          value={
                                            filterFromOptions?.studiedCourse
                                          }
                                          onChange={handleChange(
                                            "studiedCourse"
                                          )}
                                          placeholder="Search Studied Course..."
                                          endAdornment={
                                            <InputAdornment
                                              position="end"
                                              style={{ outline: "none" }}
                                            >
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                              >
                                                {/* {values.searchUser} */}
                                                <SearchIcon
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-footer)",
                                                  }}
                                                />
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
                                          maxHeight: "300px",
                                          overflowX: "auto",
                                        }}
                                      >
                                        {allFilterOptions?.course
                                          ?.filter((sc) => {
                                            if (
                                              filterFromOptions?.studiedCourse ===
                                              ""
                                            ) {
                                              return sc;
                                            } else if (
                                              sc?.course
                                                ?.toLowerCase()
                                                ?.includes(
                                                  filterFromOptions?.studiedCourse?.toLowerCase()
                                                )
                                            ) {
                                              return sc;
                                            }
                                          })
                                          ?.map((course, index) => (
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                color: "var(--clr-gray-1)",
                                              }}
                                            >
                                              <Checkbox
                                                sx={{
                                                  color: "#C7D3E3",
                                                  "&.Mui-checked": {
                                                    color:
                                                      "var(--clr-blue-primary)",
                                                  },
                                                }}
                                                checked={allCheckboxFilter.studiedCourse.includes(
                                                  course?.course?.toLowerCase()
                                                )}
                                                onChange={() =>
                                                  handleAllCheckboxFilter(
                                                    course?.course,
                                                    "studiedCourse"
                                                  )
                                                }
                                                key={index}
                                                name={course?.course}
                                              />
                                              {course?.course}
                                            </Typography>
                                          ))}
                                      </Box>
                                    </Collapse>
                                  </Box>
                                </Box>
                              </Box>
                              {/* Studied specialization */}
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
                                    id="studiedSpecialization"
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      Studied Specializations
                                    </Typography>
                                    {openedItemId ===
                                    "studiedSpecialization" ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={
                                        openedItemId === "studiedSpecialization"
                                      }
                                      timeout="auto"
                                      unmountOnExit
                                    >
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
                                          type="text"
                                          value={
                                            filterFromOptions?.studiedSpecialization
                                          }
                                          onChange={handleChange(
                                            "studiedSpecialization"
                                          )}
                                          placeholder="Search Studied Specializations..."
                                          endAdornment={
                                            <InputAdornment
                                              position="end"
                                              style={{ outline: "none" }}
                                            >
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                              >
                                                {/* {values.searchUser} */}
                                                <SearchIcon
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-footer)",
                                                  }}
                                                />
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
                                          maxHeight: "300px",
                                          overflowX: "auto",
                                        }}
                                      >
                                        {allFilterOptions?.specializations
                                          ?.filter((spec) => {
                                            if (
                                              filterFromOptions?.studiedSpecialization ===
                                              ""
                                            ) {
                                              return spec;
                                            } else if (
                                              spec?.specialization
                                                ?.toLowerCase()
                                                ?.includes(
                                                  filterFromOptions?.studiedSpecialization?.toLowerCase()
                                                )
                                            ) {
                                              return spec;
                                            }
                                          })
                                          ?.map((specialization, index) => (
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                color: "var(--clr-gray-1)",
                                              }}
                                            >
                                              <Checkbox
                                                sx={{
                                                  color: "#C7D3E3",
                                                  "&.Mui-checked": {
                                                    color:
                                                      "var(--clr-blue-primary)",
                                                  },
                                                }}
                                                checked={allCheckboxFilter.studiedSpecialization.includes(
                                                  specialization?.specialization?.toLowerCase()
                                                )}
                                                onChange={() =>
                                                  handleAllCheckboxFilter(
                                                    specialization?.specialization,
                                                    "studiedSpecialization"
                                                  )
                                                }
                                                key={index}
                                                name={
                                                  specialization?.specialization
                                                }
                                              />
                                              {specialization?.specialization}
                                            </Typography>
                                          ))}
                                      </Box>
                                    </Collapse>
                                  </Box>
                                </Box>
                              </Box>
                              {/* Studied University */}
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
                                    id="studiedUniversity"
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      Studied University
                                    </Typography>
                                    {openedItemId === "studiedUniversity" ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={openedItemId === "studiedUniversity"}
                                      timeout="auto"
                                      unmountOnExit
                                    >
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
                                          type="text"
                                          value={
                                            filterFromOptions?.studiedUniversity
                                          }
                                          onChange={handleChange(
                                            "studiedUniversity"
                                          )}
                                          placeholder="Search Studied University..."
                                          endAdornment={
                                            <InputAdornment
                                              position="end"
                                              style={{ outline: "none" }}
                                            >
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                              >
                                                {/* {values.searchUser} */}
                                                <SearchIcon
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-footer)",
                                                  }}
                                                />
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
                                          maxHeight: "300px",
                                          overflowX: "auto",
                                        }}
                                      >
                                        {allFilterOptions?.university
                                          ?.filter((varsity) => {
                                            if (
                                              filterFromOptions?.studiedUniversity ===
                                              ""
                                            ) {
                                              return varsity;
                                            } else if (
                                              varsity?.university
                                                ?.toLowerCase()
                                                ?.includes(
                                                  filterFromOptions?.studiedUniversity?.toLowerCase()
                                                )
                                            ) {
                                              return varsity;
                                            }
                                          })
                                          ?.map((varsity, index) => (
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                color: "var(--clr-gray-1)",
                                              }}
                                            >
                                              <Checkbox
                                                sx={{
                                                  color: "#C7D3E3",
                                                  "&.Mui-checked": {
                                                    color:
                                                      "var(--clr-blue-primary)",
                                                  },
                                                }}
                                                checked={allCheckboxFilter.studiedUniversity.includes(
                                                  varsity?.university?.toLowerCase()
                                                )}
                                                onChange={() =>
                                                  handleAllCheckboxFilter(
                                                    varsity?.university,
                                                    "studiedUniversity"
                                                  )
                                                }
                                                key={index}
                                                name={varsity?.university}
                                              />
                                              {varsity?.university}
                                            </Typography>
                                          ))}
                                      </Box>
                                    </Collapse>
                                  </Box>
                                </Box>
                              </Box>
                              {/* designation */}
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
                                    id="designation"
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      Designation
                                    </Typography>
                                    {openedItemId === "designation" ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={openedItemId === "designation"}
                                      timeout="auto"
                                      unmountOnExit
                                    >
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
                                          type="text"
                                          value={filterFromOptions?.designation}
                                          onChange={handleChange("designation")}
                                          placeholder="Search Designation..."
                                          endAdornment={
                                            <InputAdornment
                                              position="end"
                                              style={{ outline: "none" }}
                                            >
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                              >
                                                {/* {values.searchUser} */}
                                                <SearchIcon
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-footer)",
                                                  }}
                                                />
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
                                          maxHeight: "300px",
                                          overflowX: "auto",
                                        }}
                                      >
                                        {allFilterOptions?.designation
                                          ?.filter((role) => {
                                            if (
                                              filterFromOptions?.designation ===
                                              ""
                                            ) {
                                              return role;
                                            } else if (
                                              role?.designation
                                                ?.toLowerCase()
                                                ?.includes(
                                                  filterFromOptions?.designation?.toLowerCase()
                                                )
                                            ) {
                                              return role;
                                            }
                                          })
                                          ?.map((designate, index) => (
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                color: "var(--clr-gray-1)",
                                              }}
                                            >
                                              <Checkbox
                                                sx={{
                                                  color: "#C7D3E3",
                                                  "&.Mui-checked": {
                                                    color:
                                                      "var(--clr-blue-primary)",
                                                  },
                                                }}
                                                checked={allCheckboxFilter.designation.includes(
                                                  designate?.designation?.toLowerCase()
                                                )}
                                                onChange={() =>
                                                  handleAllCheckboxFilter(
                                                    designate?.designation,
                                                    "designation"
                                                  )
                                                }
                                                key={index}
                                                name={designate?.designation}
                                              />
                                              {designate?.designation}
                                            </Typography>
                                          ))}
                                      </Box>
                                    </Collapse>
                                  </Box>
                                </Box>
                              </Box>
                              {/* health instititute type */}
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
                                    id="healthInstituteType"
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      Health Institute Type
                                    </Typography>
                                    {openedItemId === "healthInstituteType" ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={
                                        openedItemId === "healthInstituteType"
                                      }
                                      timeout="auto"
                                      unmountOnExit
                                    >
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
                                          type="text"
                                          value={
                                            filterFromOptions?.healthInstituteType
                                          }
                                          onChange={handleChange(
                                            "healthInstituteType"
                                          )}
                                          placeholder="Search Health Institute Type..."
                                          endAdornment={
                                            <InputAdornment
                                              position="end"
                                              style={{ outline: "none" }}
                                            >
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                              >
                                                {/* {values.searchUser} */}
                                                <SearchIcon
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-footer)",
                                                  }}
                                                />
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
                                          maxHeight: "300px",
                                          overflowX: "auto",
                                        }}
                                      >
                                        {allFilterOptions?.healthInsType
                                          ?.filter((hist) => {
                                            if (
                                              filterFromOptions?.healthInstituteType ===
                                              ""
                                            ) {
                                              return hist;
                                            } else if (
                                              hist?.instituteType
                                                ?.toLowerCase()
                                                ?.includes(
                                                  filterFromOptions?.healthInstituteType?.toLowerCase()
                                                )
                                            ) {
                                              return hist;
                                            }
                                          })
                                          ?.map((hiType, index) => (
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                color: "var(--clr-gray-1)",
                                              }}
                                            >
                                              <Checkbox
                                                sx={{
                                                  color: "#C7D3E3",
                                                  "&.Mui-checked": {
                                                    color:
                                                      "var(--clr-blue-primary)",
                                                  },
                                                }}
                                                checked={allCheckboxFilter.healthInstituteType.includes(
                                                  hiType?.instituteType?.toLowerCase()
                                                )}
                                                onChange={() =>
                                                  handleAllCheckboxFilter(
                                                    hiType?.instituteType,
                                                    "healthInstituteType"
                                                  )
                                                }
                                                key={index}
                                                name={hiType?.instituteType}
                                              />
                                              {hiType?.instituteType}
                                            </Typography>
                                          ))}
                                      </Box>
                                    </Collapse>
                                  </Box>
                                </Box>
                              </Box>
                              {/* health instititute naem */}
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
                                    id="healthInstituteName"
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      Health Institute
                                    </Typography>
                                    {openedItemId === "healthInstituteName" ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={
                                        openedItemId === "healthInstituteName"
                                      }
                                      timeout="auto"
                                      unmountOnExit
                                    >
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
                                          type="text"
                                          value={
                                            filterFromOptions?.healthInstituteName
                                          }
                                          onChange={handleChange(
                                            "healthInstituteName"
                                          )}
                                          placeholder="Search Health Institute..."
                                          endAdornment={
                                            <InputAdornment
                                              position="end"
                                              style={{ outline: "none" }}
                                            >
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                              >
                                                {/* {values.searchUser} */}
                                                <SearchIcon
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-footer)",
                                                  }}
                                                />
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
                                          maxHeight: "300px",
                                          overflowX: "auto",
                                        }}
                                      >
                                        {allFilterOptions?.healthInsName
                                          ?.filter((hiName) => {
                                            if (
                                              filterFromOptions?.healthInstituteName ===
                                              ""
                                            ) {
                                              return hiName;
                                            } else if (
                                              hiName?.instituteName
                                                ?.toLowerCase()
                                                ?.includes(
                                                  filterFromOptions?.healthInstituteName?.toLowerCase()
                                                )
                                            ) {
                                              return hiName;
                                            }
                                          })
                                          ?.map((hiName, index) => (
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                color: "var(--clr-gray-1)",
                                              }}
                                            >
                                              <Checkbox
                                                sx={{
                                                  color: "#C7D3E3",
                                                  "&.Mui-checked": {
                                                    color:
                                                      "var(--clr-blue-primary)",
                                                  },
                                                }}
                                                checked={allCheckboxFilter.healthInstituteName.includes(
                                                  hiName?.instituteName?.toLowerCase()
                                                )}
                                                onChange={() =>
                                                  handleAllCheckboxFilter(
                                                    hiName?.instituteName,
                                                    "healthInstituteName"
                                                  )
                                                }
                                                key={index}
                                                name={hiName?.instituteName}
                                              />
                                              {hiName?.instituteName}
                                            </Typography>
                                          ))}
                                      </Box>
                                    </Collapse>
                                  </Box>
                                </Box>
                              </Box>
                              {/* notice period*/}
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
                                    id="noticePeriod"
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      Notice Period
                                    </Typography>
                                    {openedItemId === "noticePeriod" ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={openedItemId === "noticePeriod"}
                                      timeout="auto"
                                      unmountOnExit
                                    >
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
                                          type="text"
                                          value={
                                            filterFromOptions?.noticePeriod
                                          }
                                          onChange={handleChange(
                                            "noticePeriod"
                                          )}
                                          placeholder="Search Notice Period..."
                                          endAdornment={
                                            <InputAdornment
                                              position="end"
                                              style={{ outline: "none" }}
                                            >
                                              <IconButton
                                                aria-label="toggle password visibility"
                                                edge="end"
                                              >
                                                {/* {values.searchUser} */}
                                                <SearchIcon
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-footer)",
                                                  }}
                                                />
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
                                          maxHeight: "300px",
                                          overflowX: "auto",
                                        }}
                                      >
                                        {matchedNoticePeriod
                                          ?.filter((np) => {
                                            if (
                                              filterFromOptions?.noticePeriod ===
                                              ""
                                            ) {
                                              return np;
                                            } else if (
                                              np?.notice
                                                ?.toLowerCase()
                                                ?.includes(
                                                  filterFromOptions?.noticePeriod?.toLowerCase()
                                                )
                                            ) {
                                              return np;
                                            }
                                          })
                                          ?.map((nP, index) => (
                                            <Typography
                                              variant="body1"
                                              sx={{
                                                color: "var(--clr-gray-1)",
                                              }}
                                            >
                                              <Checkbox
                                                sx={{
                                                  color: "#C7D3E3",
                                                  "&.Mui-checked": {
                                                    color:
                                                      "var(--clr-blue-primary)",
                                                  },
                                                }}
                                                checked={allCheckboxFilter.noticePeriod.includes(
                                                  nP?.npID?.toString()
                                                )}
                                                onChange={() =>
                                                  handleAllCheckboxFilter(
                                                    nP?.npID,
                                                    "noticePeriod"
                                                  )
                                                }
                                                key={index}
                                                name={nP?.npID}
                                              />
                                              {nP?.notice}
                                            </Typography>
                                          ))}
                                      </Box>
                                    </Collapse>
                                  </Box>
                                </Box>
                              </Box>
                              {/* active in  */}
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
                                    id="activeIn"
                                  >
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "18px",
                                        color: "#333333",
                                      }}
                                    >
                                      Active In
                                    </Typography>
                                    {openedItemId === "activeIn" ? (
                                      <ExpandLess
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    ) : (
                                      <ExpandMore
                                        style={{
                                          height: "35px",
                                          width: "40px",
                                          marginRight: "-10px",
                                          color: "var(--clr-blue-footer)",
                                        }}
                                      />
                                    )}
                                  </Box>
                                  <Box>
                                    <Collapse
                                      in={openedItemId === "activeIn"}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexDirection: "row",
                                          margin: "0 0 0 3%",
                                          p: 1,
                                        }}
                                      >
                                        <Box>
                                          <span sx={{ py: 0.5 }}>
                                            Notice Period
                                          </span>
                                          <RadioGroup
                                            row
                                            name="row-radio-buttons-group"
                                          >
                                            <FormControlLabel
                                              value={moment()
                                                .subtract(1, "days")
                                                .format("YYYY-MM-DD")}
                                              onChange={formValueChange}
                                              name="activeIn"
                                              checked={
                                                form.activeIn ===
                                                moment()
                                                  .subtract(1, "days")
                                                  .format("YYYY-MM-DD")
                                              }
                                              control={
                                                <Radio
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-light)",
                                                    "&.Mui-checked": {
                                                      color:
                                                        "var(--clr-blue-primary)",
                                                    },
                                                  }}
                                                />
                                              }
                                              label="1 day"
                                            />
                                            <FormControlLabel
                                              value={moment()
                                                .subtract(7, "days")
                                                .format("YYYY-MM-DD")}
                                              onChange={formValueChange}
                                              name="activeIn"
                                              checked={
                                                form.activeIn ===
                                                moment()
                                                  .subtract(7, "days")
                                                  .format("YYYY-MM-DD")
                                              }
                                              control={
                                                <Radio
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-light)",
                                                    "&.Mui-checked": {
                                                      color:
                                                        "var(--clr-blue-primary)",
                                                    },
                                                  }}
                                                />
                                              }
                                              label="7 days"
                                            />
                                            <FormControlLabel
                                              value={moment()
                                                .subtract(15, "days")
                                                .format("YYYY-MM-DD")}
                                              onChange={formValueChange}
                                              name="activeIn"
                                              checked={
                                                form.activeIn ===
                                                moment()
                                                  .subtract(15, "days")
                                                  .format("YYYY-MM-DD")
                                              }
                                              control={
                                                <Radio
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-light)",
                                                    "&.Mui-checked": {
                                                      color:
                                                        "var(--clr-blue-primary)",
                                                    },
                                                  }}
                                                />
                                              }
                                              label="15 days"
                                            />
                                            <FormControlLabel
                                              value={moment()
                                                .subtract(1, "month")
                                                .format("YYYY-MM-DD")}
                                              onChange={formValueChange}
                                              name="activeIn"
                                              checked={
                                                form.activeIn ===
                                                moment()
                                                  .subtract(1, "month")
                                                  .format("YYYY-MM-DD")
                                              }
                                              control={
                                                <Radio
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-light)",
                                                    "&.Mui-checked": {
                                                      color:
                                                        "var(--clr-blue-primary)",
                                                    },
                                                  }}
                                                />
                                              }
                                              label="1 month"
                                            />
                                            <FormControlLabel
                                              value={moment()
                                                .subtract(2, "months")
                                                .format("YYYY-MM-DD")}
                                              onChange={formValueChange}
                                              name="activeIn"
                                              checked={
                                                form.activeIn ===
                                                moment()
                                                  .subtract(2, "months")
                                                  .format("YYYY-MM-DD")
                                              }
                                              control={
                                                <Radio
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-light)",
                                                    "&.Mui-checked": {
                                                      color:
                                                        "var(--clr-blue-primary)",
                                                    },
                                                  }}
                                                />
                                              }
                                              label="2 months"
                                            />
                                            <FormControlLabel
                                              value={moment()
                                                .subtract(3, "months")
                                                .format("YYYY-MM-DD")}
                                              onChange={formValueChange}
                                              name="activeIn"
                                              checked={
                                                form.activeIn ===
                                                moment()
                                                  .subtract(3, "months")
                                                  .format("YYYY-MM-DD")
                                              }
                                              control={
                                                <Radio
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-light)",
                                                    "&.Mui-checked": {
                                                      color:
                                                        "var(--clr-blue-primary)",
                                                    },
                                                  }}
                                                />
                                              }
                                              label="3 months"
                                            />
                                            <FormControlLabel
                                              value={moment()
                                                .subtract(6, "months")
                                                .format("YYYY-MM-DD")}
                                              onChange={formValueChange}
                                              name="activeIn"
                                              checked={
                                                form.activeIn ===
                                                moment()
                                                  .subtract(6, "months")
                                                  .format("YYYY-MM-DD")
                                              }
                                              control={
                                                <Radio
                                                  sx={{
                                                    color:
                                                      "var(--clr-blue-light)",
                                                    "&.Mui-checked": {
                                                      color:
                                                        "var(--clr-blue-primary)",
                                                    },
                                                  }}
                                                />
                                              }
                                              label="6 months"
                                            />
                                          </RadioGroup>
                                        </Box>
                                      </Box>
                                    </Collapse>
                                  </Box>
                                </Box>
                              </Box>
                              {/* refine search  */}
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
                          )}
                        </Box>
                      ) : (
                        // Filter for large screen
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
                                  Preferred Location
                                </Typography>
                                {openedItemId === "location" ? (
                                  <ExpandLess
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                ) : (
                                  <ExpandMore
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                )}
                              </Box>
                              <Collapse
                                in={openedItemId === "location"}
                                timeout="auto"
                                unmountOnExit
                              >
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
                                    type="text"
                                    value={filterFromOptions?.locationFilter}
                                    onChange={handleChange("locationFilter")}
                                    placeholder="Search Preferred Location..."
                                    endAdornment={
                                      <InputAdornment
                                        position="end"
                                        style={{ outline: "none" }}
                                      >
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          edge="end"
                                        >
                                          {/* {values.searchUser} */}
                                          <SearchIcon
                                            sx={{
                                              color: "var(--clr-blue-footer)",
                                            }}
                                          />
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
                                    maxHeight: "300px",
                                    overflowX: "auto",
                                  }}
                                >
                                  {allFilterOptions?.location
                                    ?.filter((loc) => {
                                      if (
                                        filterFromOptions?.locationFilter === ""
                                      ) {
                                        return loc;
                                      } else if (
                                        loc?.cityWithState
                                          ?.toLowerCase()
                                          ?.includes(
                                            filterFromOptions?.locationFilter?.toLowerCase()
                                          )
                                      ) {
                                        return loc;
                                      }
                                    })
                                    ?.map((loc, index) => (
                                      <Typography
                                        variant="body1"
                                        sx={{ color: "var(--clr-gray-1)" }}
                                      >
                                        {/* {console.log(allCheckboxFilter.locationFilter.includes(loc?.cityWithState?.toLowerCase()), allCheckboxFilter.locationFilter, loc?.cityWithState?.toLowerCase())} */}
                                        <Checkbox
                                          sx={{
                                            color: "#C7D3E3",
                                            "&.Mui-checked": {
                                              color: "var(--clr-blue-primary)",
                                            },
                                          }}
                                          checked={allCheckboxFilter.locationFilter.includes(
                                            loc?.cityWithState?.toLowerCase()
                                          )}
                                          onChange={() =>
                                            handleAllCheckboxFilter(
                                              loc?.cityWithState,
                                              "locationFilter"
                                            )
                                          }
                                          key={index}
                                          name={loc?.cityWithState}
                                        />
                                        {loc?.cityWithState}
                                      </Typography>
                                    ))}
                                </Box>
                              </Collapse>
                            </Box>
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
                                    marginRight: "-10px",
                                    color: "var(--clr-blue-footer)",
                                  }}
                                />
                              ) : (
                                <ExpandMore
                                  style={{
                                    height: "35px",
                                    width: "40px",
                                    marginRight: "-10px",
                                    color: "var(--clr-blue-footer)",
                                  }}
                                />
                              )}
                            </Box>
                            <Collapse
                              in={openedItemId === "experience"}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ px: 4, py: 2 }}>
                                <Slider
                                  name="experience"
                                  getAriaLabel={() => "Experience range"}
                                  onChange={formValueChange}
                                  valueLabelDisplay="auto"
                                  value={form.experience}
                                  min={form.experience[0]}
                                  max={form.experience[1]}
                                  marks={[
                                    {
                                      value: form.experience[0],
                                      label: `${Math.round(
                                        form.experience[0]
                                      )} year`,
                                    },
                                    {
                                      value: form.experience[1],
                                      label: `${Math.round(
                                        form.experience[1]
                                      )} year`,
                                    },
                                  ]}
                                  sx={{
                                    "& .MuiSlider-thumb": {
                                      height: 24,
                                      width: 24,
                                      color: "var(--clr-white)",
                                      border:
                                        "2px solid var(--clr-blue-footer)",
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
                          {/* ctc */}
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
                                CTC
                              </Typography>
                              {openedItemId === "ctc" ? (
                                <ExpandLess
                                  style={{
                                    height: "35px",
                                    width: "40px",
                                    marginRight: "-10px",
                                    color: "var(--clr-blue-footer)",
                                  }}
                                />
                              ) : (
                                <ExpandMore
                                  style={{
                                    height: "35px",
                                    width: "40px",
                                    marginRight: "-10px",
                                    color: "var(--clr-blue-footer)",
                                  }}
                                />
                              )}
                            </Box>
                            <Collapse
                              in={openedItemId === "ctc"}
                              timeout="auto"
                              unmountOnExit
                            >
                              <Box sx={{ px: 4, py: 2 }}>
                                <Slider
                                  name="ctc"
                                  getAriaLabel={() => "Salary range"}
                                  onChange={formValueChange}
                                  valueLabelDisplay="auto"
                                  value={form.ctc}
                                  min={form.ctc[0]}
                                  max={form.ctc[1]}
                                  marks={[
                                    {
                                      value: form.ctc[0],
                                      label: `₹${Math.round(form.ctc[0])} lakh`,
                                    },
                                    {
                                      value: form.ctc[1],
                                      label: `₹${Math.round(form.ctc[1])} lakh`,
                                    },
                                  ]}
                                  sx={{
                                    "& .MuiSlider-thumb": {
                                      height: 24,
                                      width: 24,
                                      color: "var(--clr-white)",
                                      border:
                                        "2px solid var(--clr-blue-footer)",
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
                          {/* healthcare industry */}
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
                                id="healthcareIndustry"
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "18px", color: "#333333" }}
                                >
                                  Healthcare Industry
                                </Typography>
                                {openedItemId === "healthcareIndustry" ? (
                                  <ExpandLess
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                ) : (
                                  <ExpandMore
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                )}
                              </Box>
                              <Collapse
                                in={openedItemId === "healthcareIndustry"}
                                timeout="auto"
                                unmountOnExit
                              >
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
                                    type="text"
                                    value={
                                      filterFromOptions?.healthCareIndustry
                                    }
                                    onChange={handleChange(
                                      "healthCareIndustry"
                                    )}
                                    placeholder="Search Healthcare Indsutry..."
                                    endAdornment={
                                      <InputAdornment
                                        position="end"
                                        style={{ outline: "none" }}
                                      >
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          edge="end"
                                        >
                                          {/* {values.searchUser} */}
                                          <SearchIcon
                                            sx={{
                                              color: "var(--clr-blue-footer)",
                                            }}
                                          />
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
                                    maxHeight: "300px",
                                    overflowX: "auto",
                                  }}
                                >
                                  {allFilterOptions?.healthcareIndustry
                                    ?.filter((hci) => {
                                      if (
                                        filterFromOptions?.healthCareIndustry ===
                                        ""
                                      ) {
                                        return hci;
                                      } else if (
                                        hci?.healthcareIndustry
                                          ?.toLowerCase()
                                          ?.includes(
                                            filterFromOptions?.healthCareIndustry?.toLowerCase()
                                          )
                                      ) {
                                        return hci;
                                      }
                                    })
                                    ?.map((hci, index) => (
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
                                          checked={allCheckboxFilter.healthCareIndustry.includes(
                                            hci?.healthcareIndustry?.toLowerCase()
                                          )}
                                          onChange={() =>
                                            handleAllCheckboxFilter(
                                              hci?.healthcareIndustry,
                                              "healthCareIndustry"
                                            )
                                          }
                                          key={index}
                                          name={hci?.healthcareIndustry}
                                        />
                                        {hci?.healthcareIndustry}
                                      </Typography>
                                    ))}
                                </Box>
                              </Collapse>
                            </Box>
                          </Box>
                          {/* qualification */}
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
                                id="qualification"
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "18px", color: "#333333" }}
                                >
                                  Qualification
                                </Typography>
                                {openedItemId === "qualification" ? (
                                  <ExpandLess
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                ) : (
                                  <ExpandMore
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                )}
                              </Box>
                              <Collapse
                                in={openedItemId === "qualification"}
                                timeout="auto"
                                unmountOnExit
                              >
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
                                    type="text"
                                    value={filterFromOptions?.qualification}
                                    onChange={handleChange("qualification")}
                                    placeholder="Search Qualification..."
                                    endAdornment={
                                      <InputAdornment
                                        position="end"
                                        style={{ outline: "none" }}
                                      >
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          edge="end"
                                        >
                                          {/* {values.searchUser} */}
                                          <SearchIcon
                                            sx={{
                                              color: "var(--clr-blue-footer)",
                                            }}
                                          />
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
                                    maxHeight: "300px",
                                    overflowX: "auto",
                                  }}
                                >
                                  {allFilterOptions?.qualifications
                                    ?.filter((qualify) => {
                                      if (
                                        filterFromOptions?.qualification === ""
                                      ) {
                                        return qualify;
                                      } else if (
                                        qualify?.qualification
                                          ?.toLowerCase()
                                          ?.includes(
                                            filterFromOptions?.qualification?.toLowerCase()
                                          )
                                      ) {
                                        return qualify;
                                      }
                                    })
                                    ?.map((qualification, index) => (
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
                                          checked={allCheckboxFilter.qualification.includes(
                                            qualification?.qualification?.toLowerCase()
                                          )}
                                          onChange={() =>
                                            handleAllCheckboxFilter(
                                              qualification?.qualification,
                                              "qualification"
                                            )
                                          }
                                          key={index}
                                          name={qualification?.qualification}
                                        />
                                        {qualification?.qualification}
                                      </Typography>
                                    ))}
                                </Box>
                              </Collapse>
                            </Box>
                          </Box>
                          {/* Studied Course */}
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
                                id="studiedCourse"
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "18px", color: "#333333" }}
                                >
                                  Studied Course
                                </Typography>
                                {openedItemId === "studiedCourse" ? (
                                  <ExpandLess
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                ) : (
                                  <ExpandMore
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                )}
                              </Box>
                              <Collapse
                                in={openedItemId === "studiedCourse"}
                                timeout="auto"
                                unmountOnExit
                              >
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
                                    type="text"
                                    value={filterFromOptions?.studiedCourse}
                                    onChange={handleChange("studiedCourse")}
                                    placeholder="Search Studied Course..."
                                    endAdornment={
                                      <InputAdornment
                                        position="end"
                                        style={{ outline: "none" }}
                                      >
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          edge="end"
                                        >
                                          {/* {values.searchUser} */}
                                          <SearchIcon
                                            sx={{
                                              color: "var(--clr-blue-footer)",
                                            }}
                                          />
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
                                    maxHeight: "300px",
                                    overflowX: "auto",
                                  }}
                                >
                                  {allFilterOptions?.course
                                    ?.filter((sc) => {
                                      if (
                                        filterFromOptions?.studiedCourse === ""
                                      ) {
                                        return sc;
                                      } else if (
                                        sc?.course
                                          ?.toLowerCase()
                                          ?.includes(
                                            filterFromOptions?.studiedCourse?.toLowerCase()
                                          )
                                      ) {
                                        return sc;
                                      }
                                    })
                                    ?.map((course, index) => (
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
                                          checked={allCheckboxFilter.studiedCourse.includes(
                                            course?.course?.toLowerCase()
                                          )}
                                          onChange={() =>
                                            handleAllCheckboxFilter(
                                              course?.course,
                                              "studiedCourse"
                                            )
                                          }
                                          key={index}
                                          name={course?.course}
                                        />
                                        {course?.course}
                                      </Typography>
                                    ))}
                                </Box>
                              </Collapse>
                            </Box>
                          </Box>
                          {/* Studied Specialization */}
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
                                  Studied Specializations
                                </Typography>
                                {openedItemId === "specialization" ? (
                                  <ExpandLess
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                ) : (
                                  <ExpandMore
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                )}
                              </Box>
                              <Collapse
                                in={openedItemId === "specialization"}
                                timeout="auto"
                                unmountOnExit
                              >
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
                                    type="text"
                                    value={
                                      filterFromOptions?.studiedSpecialization
                                    }
                                    onChange={handleChange(
                                      "studiedSpecialization"
                                    )}
                                    placeholder="Search Studied Specializations..."
                                    endAdornment={
                                      <InputAdornment
                                        position="end"
                                        style={{ outline: "none" }}
                                      >
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          edge="end"
                                        >
                                          {/* {values.searchUser} */}
                                          <SearchIcon
                                            sx={{
                                              color: "var(--clr-blue-footer)",
                                            }}
                                          />
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
                                    maxHeight: "300px",
                                    overflowX: "auto",
                                  }}
                                >
                                  {allFilterOptions?.specializations
                                    ?.filter((spec) => {
                                      if (
                                        filterFromOptions?.studiedSpecialization ===
                                        ""
                                      ) {
                                        return spec;
                                      } else if (
                                        spec?.specialization
                                          ?.toLowerCase()
                                          ?.includes(
                                            filterFromOptions?.studiedSpecialization?.toLowerCase()
                                          )
                                      ) {
                                        return spec;
                                      }
                                    })
                                    ?.map((specialization, index) => (
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
                                          checked={allCheckboxFilter.studiedSpecialization.includes(
                                            specialization?.specialization?.toLowerCase()
                                          )}
                                          onChange={() =>
                                            handleAllCheckboxFilter(
                                              specialization?.specialization,
                                              "studiedSpecialization"
                                            )
                                          }
                                          key={index}
                                          name={specialization?.specialization}
                                        />
                                        {specialization?.specialization}
                                      </Typography>
                                    ))}
                                </Box>
                              </Collapse>
                            </Box>
                          </Box>
                          {/* Studied University */}
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
                                id="university"
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "18px", color: "#333333" }}
                                >
                                  Studied University
                                </Typography>
                                {openedItemId === "university" ? (
                                  <ExpandLess
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                ) : (
                                  <ExpandMore
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                )}
                              </Box>
                              <Collapse
                                in={openedItemId === "university"}
                                timeout="auto"
                                unmountOnExit
                              >
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
                                    type="text"
                                    value={filterFromOptions?.studiedUniversity}
                                    onChange={handleChange("studiedUniversity")}
                                    placeholder="Search Studied University..."
                                    endAdornment={
                                      <InputAdornment
                                        position="end"
                                        style={{ outline: "none" }}
                                      >
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          edge="end"
                                        >
                                          {/* {values.searchUser} */}
                                          <SearchIcon
                                            sx={{
                                              color: "var(--clr-blue-footer)",
                                            }}
                                          />
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
                                    maxHeight: "300px",
                                    overflowX: "auto",
                                  }}
                                >
                                  {allFilterOptions?.university
                                    ?.filter((varsity) => {
                                      if (
                                        filterFromOptions?.studiedUniversity ===
                                        ""
                                      ) {
                                        return varsity;
                                      } else if (
                                        varsity?.university
                                          ?.toLowerCase()
                                          ?.includes(
                                            filterFromOptions?.studiedUniversity?.toLowerCase()
                                          )
                                      ) {
                                        return varsity;
                                      }
                                    })
                                    ?.map((varsity, index) => (
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
                                          checked={allCheckboxFilter.studiedUniversity.includes(
                                            varsity?.university?.toLowerCase()
                                          )}
                                          onChange={() =>
                                            handleAllCheckboxFilter(
                                              varsity?.university,
                                              "studiedUniversity"
                                            )
                                          }
                                          key={index}
                                          name={varsity?.university}
                                        />
                                        {varsity?.university}
                                      </Typography>
                                    ))}
                                </Box>
                              </Collapse>
                            </Box>
                          </Box>
                          {/* designation */}
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
                                id="designation"
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "18px", color: "#333333" }}
                                >
                                  Designation
                                </Typography>
                                {openedItemId === "designation" ? (
                                  <ExpandLess
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                ) : (
                                  <ExpandMore
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                )}
                              </Box>
                              <Collapse
                                in={openedItemId === "designation"}
                                timeout="auto"
                                unmountOnExit
                              >
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
                                    type="text"
                                    value={filterFromOptions?.designation}
                                    onChange={handleChange("designation")}
                                    placeholder="Search Designation..."
                                    endAdornment={
                                      <InputAdornment
                                        position="end"
                                        style={{ outline: "none" }}
                                      >
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          edge="end"
                                        >
                                          {/* {values.searchUser} */}
                                          <SearchIcon
                                            sx={{
                                              color: "var(--clr-blue-footer)",
                                            }}
                                          />
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
                                    maxHeight: "300px",
                                    overflowX: "auto",
                                  }}
                                >
                                  {allFilterOptions?.designation
                                    ?.filter((role) => {
                                      if (
                                        filterFromOptions?.designation === ""
                                      ) {
                                        return role;
                                      } else if (
                                        role?.designation
                                          ?.toLowerCase()
                                          ?.includes(
                                            filterFromOptions?.designation?.toLowerCase()
                                          )
                                      ) {
                                        return role;
                                      }
                                    })
                                    ?.map((designate, index) => (
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
                                          checked={allCheckboxFilter.designation.includes(
                                            designate?.designation?.toLowerCase()
                                          )}
                                          onChange={() =>
                                            handleAllCheckboxFilter(
                                              designate?.designation,
                                              "designation"
                                            )
                                          }
                                          key={index}
                                          name={designate?.designation}
                                        />
                                        {designate?.designation}
                                      </Typography>
                                    ))}
                                </Box>
                              </Collapse>
                            </Box>
                          </Box>
                          {/* Health Institute Type */}
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
                                id="healthInstituteType"
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "18px", color: "#333333" }}
                                >
                                  Health Institute Type
                                </Typography>
                                {openedItemId === "healthInstituteType" ? (
                                  <ExpandLess
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                ) : (
                                  <ExpandMore
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                )}
                              </Box>
                              <Collapse
                                in={openedItemId === "healthInstituteType"}
                                timeout="auto"
                                unmountOnExit
                              >
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
                                    type="text"
                                    value={
                                      filterFromOptions?.healthInstituteType
                                    }
                                    onChange={handleChange(
                                      "healthInstituteType"
                                    )}
                                    placeholder="Search Health Institute Type..."
                                    endAdornment={
                                      <InputAdornment
                                        position="end"
                                        style={{ outline: "none" }}
                                      >
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          edge="end"
                                        >
                                          {/* {values.searchUser} */}
                                          <SearchIcon
                                            sx={{
                                              color: "var(--clr-blue-footer)",
                                            }}
                                          />
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
                                    maxHeight: "300px",
                                    overflowX: "auto",
                                  }}
                                >
                                  {allFilterOptions?.healthInsType
                                    ?.filter((hist) => {
                                      if (
                                        filterFromOptions?.healthInstituteType ===
                                        ""
                                      ) {
                                        return hist;
                                      } else if (
                                        hist?.instituteType
                                          ?.toLowerCase()
                                          ?.includes(
                                            filterFromOptions?.healthInstituteType?.toLowerCase()
                                          )
                                      ) {
                                        return hist;
                                      }
                                    })
                                    ?.map((hiType, index) => (
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
                                          checked={allCheckboxFilter.healthInstituteType.includes(
                                            hiType?.instituteType?.toLowerCase()
                                          )}
                                          onChange={() =>
                                            handleAllCheckboxFilter(
                                              hiType?.instituteType,
                                              "healthInstituteType"
                                            )
                                          }
                                          key={index}
                                          name={hiType?.instituteType}
                                        />
                                        {hiType?.instituteType}
                                      </Typography>
                                    ))}
                                </Box>
                              </Collapse>
                            </Box>
                          </Box>
                          {/* Health Institute Name */}
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
                                id="healthInstituteName"
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "18px", color: "#333333" }}
                                >
                                  Health Institute
                                </Typography>
                                {openedItemId === "healthInstituteName" ? (
                                  <ExpandLess
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                ) : (
                                  <ExpandMore
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                )}
                              </Box>
                              <Collapse
                                in={openedItemId === "healthInstituteName"}
                                timeout="auto"
                                unmountOnExit
                              >
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
                                    type="text"
                                    value={
                                      filterFromOptions?.healthInstituteName
                                    }
                                    onChange={handleChange(
                                      "healthInstituteName"
                                    )}
                                    placeholder="Search Health Institute..."
                                    endAdornment={
                                      <InputAdornment
                                        position="end"
                                        style={{ outline: "none" }}
                                      >
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          edge="end"
                                        >
                                          {/* {values.searchUser} */}
                                          <SearchIcon
                                            sx={{
                                              color: "var(--clr-blue-footer)",
                                            }}
                                          />
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
                                    maxHeight: "300px",
                                    overflowX: "auto",
                                  }}
                                >
                                  {allFilterOptions?.healthInsName
                                    ?.filter((hiName) => {
                                      if (
                                        filterFromOptions?.healthInstituteName ===
                                        ""
                                      ) {
                                        return hiName;
                                      } else if (
                                        hiName?.instituteName
                                          ?.toLowerCase()
                                          ?.includes(
                                            filterFromOptions?.healthInstituteName?.toLowerCase()
                                          )
                                      ) {
                                        return hiName;
                                      }
                                    })
                                    ?.map((hiName, index) => (
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
                                          checked={allCheckboxFilter.healthInstituteName.includes(
                                            hiName?.instituteName?.toLowerCase()
                                          )}
                                          onChange={() =>
                                            handleAllCheckboxFilter(
                                              hiName?.instituteName,
                                              "healthInstituteName"
                                            )
                                          }
                                          key={index}
                                          name={hiName?.instituteName}
                                        />
                                        {hiName?.instituteName}
                                      </Typography>
                                    ))}
                                </Box>
                              </Collapse>
                            </Box>
                          </Box>
                          {/* Notice Period */}
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
                                id="noticePeriod"
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "18px", color: "#333333" }}
                                >
                                  Notice Period
                                </Typography>
                                {openedItemId === "noticePeriod" ? (
                                  <ExpandLess
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                ) : (
                                  <ExpandMore
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                )}
                              </Box>
                              <Collapse
                                in={openedItemId === "noticePeriod"}
                                timeout="auto"
                                unmountOnExit
                              >
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
                                    type="text"
                                    value={filterFromOptions?.noticePeriod}
                                    onChange={handleChange("noticePeriod")}
                                    placeholder="Search Notice Period..."
                                    endAdornment={
                                      <InputAdornment
                                        position="end"
                                        style={{ outline: "none" }}
                                      >
                                        <IconButton
                                          aria-label="toggle password visibility"
                                          edge="end"
                                        >
                                          {/* {values.searchUser} */}
                                          <SearchIcon
                                            sx={{
                                              color: "var(--clr-blue-footer)",
                                            }}
                                          />
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
                                    maxHeight: "300px",
                                    overflowX: "auto",
                                  }}
                                >
                                  {matchedNoticePeriod
                                    ?.filter((np) => {
                                      if (
                                        filterFromOptions?.noticePeriod === ""
                                      ) {
                                        return np;
                                      } else if (
                                        np?.notice
                                          ?.toLowerCase()
                                          ?.includes(
                                            filterFromOptions?.noticePeriod?.toLowerCase()
                                          )
                                      ) {
                                        return np;
                                      }
                                    })
                                    ?.map((nP, index) => (
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
                                          checked={allCheckboxFilter.noticePeriod.includes(
                                            nP?.npID?.toString()
                                          )}
                                          onChange={() =>
                                            handleAllCheckboxFilter(
                                              nP?.npID,
                                              "noticePeriod"
                                            )
                                          }
                                          key={index}
                                          name={nP?.npID}
                                        />
                                        {nP?.notice}
                                      </Typography>
                                    ))}
                                </Box>
                              </Collapse>
                            </Box>
                          </Box>
                          {/* active in */}
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
                                id="activeIn"
                              >
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: "18px", color: "#333333" }}
                                >
                                  Active In
                                </Typography>
                                {openedItemId === "activeIn" ? (
                                  <ExpandLess
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                ) : (
                                  <ExpandMore
                                    style={{
                                      height: "35px",
                                      width: "40px",
                                      marginRight: "-10px",
                                      color: "var(--clr-blue-footer)",
                                    }}
                                  />
                                )}
                              </Box>
                              <Collapse
                                in={openedItemId === "activeIn"}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Box sx={{ pt: 1.5, pb: 0, ml: 0 }}>
                                  <RadioGroup
                                    row
                                    name="row-radio-buttons-group"
                                  >
                                    <FormControlLabel
                                      value={moment()
                                        .subtract(1, "days")
                                        .format("YYYY-MM-DD")}
                                      onChange={formValueChange}
                                      name="activeIn"
                                      checked={
                                        form.activeIn ===
                                        moment()
                                          .subtract(1, "days")
                                          .format("YYYY-MM-DD")
                                      }
                                      control={
                                        <Radio
                                          sx={{
                                            color: "var(--clr-blue-light)",
                                            "&.Mui-checked": {
                                              color: "var(--clr-blue-primary)",
                                            },
                                          }}
                                        />
                                      }
                                      label="1 day"
                                    />
                                    <FormControlLabel
                                      value={moment()
                                        .subtract(7, "days")
                                        .format("YYYY-MM-DD")}
                                      onChange={formValueChange}
                                      name="activeIn"
                                      checked={
                                        form.activeIn ===
                                        moment()
                                          .subtract(7, "days")
                                          .format("YYYY-MM-DD")
                                      }
                                      control={
                                        <Radio
                                          sx={{
                                            color: "var(--clr-blue-light)",
                                            "&.Mui-checked": {
                                              color: "var(--clr-blue-primary)",
                                            },
                                          }}
                                        />
                                      }
                                      label="7 days"
                                    />
                                    <FormControlLabel
                                      value={moment()
                                        .subtract(15, "days")
                                        .format("YYYY-MM-DD")}
                                      onChange={formValueChange}
                                      name="activeIn"
                                      checked={
                                        form.activeIn ===
                                        moment()
                                          .subtract(15, "days")
                                          .format("YYYY-MM-DD")
                                      }
                                      control={
                                        <Radio
                                          sx={{
                                            color: "var(--clr-blue-light)",
                                            "&.Mui-checked": {
                                              color: "var(--clr-blue-primary)",
                                            },
                                          }}
                                        />
                                      }
                                      label="15 days"
                                    />
                                    <FormControlLabel
                                      value={moment()
                                        .subtract(1, "month")
                                        .format("YYYY-MM-DD")}
                                      onChange={formValueChange}
                                      name="activeIn"
                                      checked={
                                        form.activeIn ===
                                        moment()
                                          .subtract(1, "month")
                                          .format("YYYY-MM-DD")
                                      }
                                      control={
                                        <Radio
                                          sx={{
                                            color: "var(--clr-blue-light)",
                                            "&.Mui-checked": {
                                              color: "var(--clr-blue-primary)",
                                            },
                                          }}
                                        />
                                      }
                                      label="1 month"
                                    />
                                    <FormControlLabel
                                      value={moment()
                                        .subtract(2, "months")
                                        .format("YYYY-MM-DD")}
                                      onChange={formValueChange}
                                      name="activeIn"
                                      checked={
                                        form.activeIn ===
                                        moment()
                                          .subtract(2, "months")
                                          .format("YYYY-MM-DD")
                                      }
                                      control={
                                        <Radio
                                          sx={{
                                            color: "var(--clr-blue-light)",
                                            "&.Mui-checked": {
                                              color: "var(--clr-blue-primary)",
                                            },
                                          }}
                                        />
                                      }
                                      label="2 months"
                                    />
                                    <FormControlLabel
                                      value={moment()
                                        .subtract(3, "months")
                                        .format("YYYY-MM-DD")}
                                      onChange={formValueChange}
                                      name="activeIn"
                                      checked={
                                        form.activeIn ===
                                        moment()
                                          .subtract(3, "months")
                                          .format("YYYY-MM-DD")
                                      }
                                      control={
                                        <Radio
                                          sx={{
                                            color: "var(--clr-blue-light)",
                                            "&.Mui-checked": {
                                              color: "var(--clr-blue-primary)",
                                            },
                                          }}
                                        />
                                      }
                                      label="3 months"
                                    />
                                    <FormControlLabel
                                      value={moment()
                                        .subtract(6, "months")
                                        .format("YYYY-MM-DD")}
                                      onChange={formValueChange}
                                      name="activeIn"
                                      checked={
                                        form.activeIn ===
                                        moment()
                                          .subtract(6, "months")
                                          .format("YYYY-MM-DD")
                                      }
                                      control={
                                        <Radio
                                          sx={{
                                            color: "var(--clr-blue-light)",
                                            "&.Mui-checked": {
                                              color: "var(--clr-blue-primary)",
                                            },
                                          }}
                                        />
                                      }
                                      label="6 months"
                                    />
                                  </RadioGroup>
                                </Box>
                              </Collapse>
                            </Box>
                          </Box>
                          {/* refine search  */}
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
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Box>
                      <Box
                        sx={{
                          display: { xs: "block", md: "flex" },
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            pb: { xs: 1, md: 0 },
                          }}
                        >
                          {/* Don't remove the comment */}
                          {/* <Typography
                            variant="subtitle2"
                            component="div"
                            sx={{
                              fontSize: "0.8rem",
                              color: "#6F7482",
                              fontWeight: 600,
                            }}
                          >
                            Result Found
                          </Typography>
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{
                              fontSize: "24px",
                              color: "var(--clr-blue-footer)",
                              fontWeight: 600,
                            }}
                          >
                            {searchResult?.length}
                          </Typography> */}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            justifyContent: {
                              xs: "space-between",
                              md: "flex-end",
                            },
                          }}
                        >
                          <Box>
                            <InputLabel sx={{ py: 0.5 }}>Active In</InputLabel>
                            <Select
                              value={values.activeIn}
                              onChange={handleChange("activeIn")}
                              inputProps={{ classes: { icon: classes.icon } }}
                              input={<CustomSelectInput />}
                              displayEmpty
                              MenuProps={{
                                classes: { paper: classes.menuPaper },
                              }}
                              sx={{ minWidth: { xs: 110, md: 150, lg: 200 } }}
                            >
                              <MenuItem value="" disabled>
                                <b>Active</b>
                              </MenuItem>
                              {times?.map((time) => (
                                <MenuItem value={time} key={time}>
                                  {time}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>
                          <Box>
                            <InputLabel sx={{ py: 0.5 }}>Show</InputLabel>
                            <Select
                              value={values.resultShowed}
                              onChange={handleChange("resultShowed")}
                              inputProps={{ classes: { icon: classes.icon } }}
                              input={<CustomSelectInput />}
                              displayEmpty
                              MenuProps={{
                                classes: { paper: classes.menuPaper },
                              }}
                              sx={{ minWidth: { xs: 110, md: 150, lg: 200 } }}
                            >
                              <MenuItem value="" disabled>
                                <b>Result Number</b>
                              </MenuItem>
                              {resultNumber?.map((rn) => (
                                <MenuItem value={rn} key={rn}>
                                  {rn}
                                </MenuItem>
                              ))}
                            </Select>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          // display: "flex",
                          display: { xs: "block", md: "flex" },
                          flexDirection: { xs: "column-reverse", md: "row" },
                          justifyContent: "space-between",
                          alignItems: "center",
                          py: { xs: 1.5, md: 3 },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            justifyContent: {
                              xs: "space-between",
                              md: "flex-start",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              // order: {xs: 3, md: 1}
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                color: "#9A9EA7",
                                fontSize: "18px",
                                fontWeight: "600",
                              }}
                            >
                              <Checkbox
                                onChange={() =>
                                  handleCheckboxProfile("selectAll")
                                }
                                checked={
                                  searchResult?.length ===
                                  profileContainer?.length
                                }
                                sx={{
                                  color: "#C7D3E3",
                                  "&.Mui-checked": {
                                    color: "var(--clr-blue-primary)",
                                  },
                                }}
                              />
                              &nbsp;Select All
                            </Typography>
                          </Box>
                          {profileContainer.length > 0 && (
                            <Box>
                              <FormControl
                                size="small"
                                sx={{
                                  minWidth: { xs: 110, md: 150, lg: 200 },
                                  border: "none",
                                  bgcolor: "#e4eef5",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  borderRadius: "6px",
                                }}
                              >
                                <Typography>
                                  <ExportCSV
                                    selectedCandidates={profileContainer}
                                    fileName={`Medlink-${
                                      searchQueryInfo?.anyKeywords
                                    }- ${new Date()?.toLocaleString("default", {
                                      day: "2-digit",
                                    })} ${new Date()?.toLocaleString(
                                      "default",
                                      { month: "short" }
                                    )} ${new Date()?.toLocaleString("default", {
                                      year: "numeric",
                                    })}`}
                                  />
                                </Typography>
                              </FormControl>
                            </Box>
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            justifyContent: {
                              xs: "space-between",
                              md: "flex-end",
                            },
                            pb: { xs: 1, md: 0 },
                          }}
                        >
                          {/*<Box>
                             <FormControl
                              size="small"
                              sx={{
                                minWidth: 150,
                                border: "none",
                              }}
                            >
                              <Select
                                value={date}
                                onChange={handleDateChange}
                                inputProps={{ classes: { icon: classes.icon } }}
                                input={<CustomSelectInputSm />}
                                displayEmpty
                                MenuProps={{ classes: { paper: classes.menuPaper } }}
                              >
                                <MenuItem value="" disabled>
                                  <b>Set Reminder</b>

                                </MenuItem>
                                {times?.map((time) => (
                                  <MenuItem value={time} key={time}>
                                    {time}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl> 
                          </Box>*/}
                          <Box>
                            <FormControl
                              size="small"
                              sx={{
                                minWidth: { xs: 110, md: 150, lg: 200 },
                                border: "none",
                                borderRadius: { xs: 16, md: 1 },
                              }}
                            >
                              <Select
                                value={values.sortBy}
                                onChange={handleChange("sortBy")}
                                inputProps={{ classes: { icon: classes.icon } }}
                                input={<CustomSelectInputSm />}
                                displayEmpty
                                MenuProps={{
                                  classes: { paper: classes.menuPaper },
                                }}
                              >
                                <MenuItem value="" disabled>
                                  <b>Sort By</b>
                                </MenuItem>
                                <MenuItem value="relevance">
                                  <b>Relevance</b>
                                </MenuItem>
                                <MenuItem value="date">
                                  <b>Date</b>
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <Box>
                            <FormControl
                              size="small"
                              sx={{
                                minWidth: { xs: 110, md: 150, lg: 200 },
                                border: "none",
                                bgcolor: "#e4eef5",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: { xs: 16, md: 1 },
                              }}
                            >
                              {pageCount > 1 && (
                                <ArrowLeftIcon
                                  onClick={() =>
                                    handleIncreasePageCount("decrease")
                                  }
                                  disabled
                                  sx={{
                                    mr: -1.5,
                                    color: "var(--clr-blue-footer)",
                                  }}
                                />
                              )}
                              <Typography
                                sx={{
                                  p: "6px 26px 6px 12px",
                                  fontWeight: "bold",
                                  color: "#395987",
                                  fontFamily:
                                    "'Open Sans', sans-serif !important",
                                  fontSize: "15px",
                                }}
                              >
                                Page No {pageCount}
                              </Typography>
                              {pageCount === pagination?.number_of_page || (
                                <ArrowRightIcon
                                  sx={{
                                    ml: -1.5,
                                    color: "var(--clr-blue-footer)",
                                  }}
                                  onClick={() =>
                                    handleIncreasePageCount("increase")
                                  }
                                />
                              )}
                            </FormControl>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        pt: 1,
                      }}
                    >
                      {searchResult?.map((row) => (
                        <>
                          <Box
                            sx={{
                              bgcolor: "var(--clr-white)",
                              border: "1px solid #E4EEF5",
                              boxShadow: "0px 0px 9px rgba(69, 143, 246, 0.09)",
                              borderRadius: 1,
                              position: "relative",
                            }}
                          >
                            {row?.phoneVerified && (
                              <Box
                                sx={{ position: "absolute", top: 0, right: 0 }}
                              >
                                <img
                                  src={green_verified_badge}
                                  alt="verified_applicant_badge"
                                />
                              </Box>
                            )}
                            {(row?.viewCount === 1 || row?.phone) && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  p: 0,
                                }}
                              >
                                <VisibilityIcon
                                  sx={{
                                    backgroundColor: "#6FCF97",
                                    color: "white",
                                    p: 0.3,
                                    borderRadius: "8px 0px 8px 0px",
                                    fontSize: "10px",
                                    width: "24px",
                                    height: "24px",
                                  }}
                                />
                              </Box>
                            )}

                            <Grid container spacing={{ xs: 0, md: 1 }}>
                              <Grid
                                item
                                xs={3}
                                md={2}
                                lg={1}
                                sx={{ textAlign: "center" }}
                              >
                                <Box>
                                  <FormControl
                                    sx={{
                                      p: { xs: 0, md: 1 },
                                      textAlign: "left",
                                      pt: { xs: 3, md: 0 },
                                      ml: { xs: "-20px", md: 2, lg: 1 },
                                    }}
                                    // onClick={handleChackbox}
                                  >
                                    <Checkbox
                                      checked={
                                        profileContainer?.filter(
                                          (pC) => pC?.userID === row?.userID
                                        )?.length !== 0
                                      }
                                      onChange={() =>
                                        handleCheckboxProfile(row)
                                      }
                                      sx={{
                                        color: "#C7D3E3",
                                        "&.Mui-checked": {
                                          color: "var(--clr-blue-primary)",
                                        },
                                      }}
                                    />
                                  </FormControl>
                                </Box>
                              </Grid>
                              <Grid item xs={12} md={4} lg={4}>
                                <Box
                                  sx={{
                                    cursor: "pointer",
                                    px: { xs: 2, md: 0 },
                                  }}
                                  onClick={() =>
                                    handleNavigateSingleApplicantsDetails(
                                      row?.userID,
                                      row
                                    )
                                  }
                                >
                                  <Box sx={{ pt: 2, pr: 2, pb: 1 }}>
                                    {imageLoading ? (
                                      <Skeleton
                                        variant="circular"
                                        width={80}
                                        height={80}
                                      />
                                    ) : (
                                      <>
                                        {row?.viewCount === 1 || row?.phone ? (
                                          <>
                                            {row?.response?.content ? (
                                              <img
                                                src={`data:image/png;base64,${row?.response?.content}`}
                                                // src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
                                                height="144px"
                                                // width="144px"
                                                maxWidth="144px"
                                                // className={classes.blurProfileImg}
                                                alt="Applicant_avater"
                                              />
                                            ) : (
                                              <img
                                                // src={`data:image/png;base64,${row?.response?.content}`}
                                                src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
                                                height="144px"
                                                maxWidth="144px"
                                                // width="144px"
                                                // className={classes.blurProfileImg}
                                                alt="Applicant_avater"
                                              />
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            {/* <Skeleton variant="rectangular" height="144px" /> */}
                                            <img
                                              // src={`data:image/png;base64,${row?.response?.content}`}
                                              src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
                                              height="144px"
                                              maxWidth="144px"
                                              // width="144px"
                                              // className={classes.blurProfileImg}
                                              alt="Applicant_avater"
                                            />
                                          </>
                                        )}
                                      </>
                                    )}
                                  </Box>
                                  <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{
                                      color: "var(--clr-blue-footer)",
                                      pb: 1,
                                      fontWeight: 600,
                                    }}
                                  >
                                    {row?.name}
                                  </Typography>
                                </Box>
                                <Box sx={{ px: { xs: 2, md: 0 } }}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      color: "var(--clr-blue-primary)",
                                      pb: 0.5,
                                      fontSize: "1rem",
                                    }}
                                  >
                                    <PhoneIphoneIcon
                                      sx={{ color: "var(--clr-white-icon)" }}
                                    />
                                    <Link
                                      to="/search-resume-result"
                                      state={{
                                        searchQueryInfo: searchQueryInfo,
                                      }}
                                    >
                                      <span
                                        onClick={() =>
                                          handleGetContactDetails(row?.userID)
                                        }
                                        style={{ textDecoration: "underline" }}
                                      >
                                        {!isLoading ? (
                                          <Box
                                            sx={{
                                              pb: 0.8,
                                              display: "flex",
                                              alignItems: "center",
                                              gap: 1,
                                            }}
                                          >
                                            {row?.phone ? (
                                              <Box
                                                sx={{
                                                  pb: 0,
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: 1,
                                                }}
                                              >
                                                {row?.phone}
                                              </Box>
                                            ) : (
                                              "View contact"
                                            )}
                                            {row?.phoneVerified && (
                                              <Box sx={{ pt: 1, position: "" }}>
                                                <CheckCircleIcon
                                                  fontSize="small"
                                                  sx={{
                                                    color: "var(--clr-green-2)",
                                                  }}
                                                />
                                              </Box>
                                            )}
                                          </Box>
                                        ) : (
                                          <>
                                            {loadingItemID !== row.userID ? (
                                              "View contact"
                                            ) : (
                                              <CircularProgress
                                                size="1rem"
                                                sx={{}}
                                              />
                                            )}
                                          </>
                                        )}
                                      </span>
                                    </Link>
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      color: "var(--clr-blue-primary)",
                                      py: 0.5,
                                      fontSize: "1rem",
                                    }}
                                  >
                                    <EmailOutlinedIcon
                                      sx={{ color: "var(--clr-white-icon)" }}
                                    />
                                    <Link
                                      to="/search-resume-result"
                                      state={{
                                        searchQueryInfo: searchQueryInfo,
                                      }}
                                    >
                                      <span
                                        onClick={() =>
                                          handleGetContactDetails(row?.userID)
                                        }
                                        style={{ textDecoration: "underline" }}
                                      >
                                        {!isLoading ? (
                                          <Box
                                            sx={{
                                              pb: 0.8,
                                              display: "flex",
                                              alignItems: "center",
                                              gap: 1,
                                            }}
                                          >
                                            {row?.email ? (
                                              <Box
                                                sx={{
                                                  pb: 0,
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: 1,
                                                }}
                                              >
                                                {row?.email?.length >= 23
                                                  ? row?.email?.slice(0, 23)
                                                  : row?.email}{" "}
                                                {row?.email?.length >= 23 &&
                                                  "..."}
                                              </Box>
                                            ) : (
                                              "View contact"
                                            )}
                                            {true && (
                                              <Box sx={{ pt: 1, position: "" }}>
                                                <CheckCircleIcon
                                                  fontSize="small"
                                                  sx={{
                                                    color: "var(--clr-green-2)",
                                                  }}
                                                />
                                              </Box>
                                            )}
                                          </Box>
                                        ) : (
                                          <>
                                            {loadingItemID !== row.userID ? (
                                              "View contact"
                                            ) : (
                                              <CircularProgress
                                                size="1rem"
                                                sx={{}}
                                              />
                                            )}
                                          </>
                                        )}
                                      </span>
                                    </Link>
                                  </Typography>
                                  <Box
                                    onClick={() =>
                                      handleNavigateSingleApplicantsDetails(
                                        row?.userID,
                                        row
                                      )
                                    }
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: "#333333",
                                        pb: 1,
                                        fontSize: "1rem",
                                      }}
                                    >
                                      <FmdGoodOutlinedIcon
                                        fontSize="small"
                                        sx={{ color: "var(--clr-white-icon)" }}
                                      />
                                      <span>{row?.cityWithState}</span>
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: "#333333",
                                        py: 1,
                                        fontSize: "1rem",
                                      }}
                                    >
                                      <WorkOutlineOutlinedIcon
                                        fontSize="small"
                                        sx={{ color: "var(--clr-white-icon)" }}
                                      />
                                      <span>
                                        {row?.exp}{" "}
                                        {row?.exp > 1 ? "Years" : "Year"}{" "}
                                        {row?.expMonths}{" "}
                                        {row?.expMonths > 1
                                          ? "Months"
                                          : "Month"}
                                      </span>
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: "#333333",
                                        py: 1,
                                        mb: 2,
                                        fontSize: "1rem",
                                      }}
                                    >
                                      <AccountBalanceWalletOutlinedIcon
                                        fontSize="small"
                                        sx={{ color: "var(--clr-white-icon)" }}
                                      />
                                      <span>
                                        {row?.salary}{" "}
                                        {row?.salary > 1 ? "Lakhs" : "Lakh"}{" "}
                                        {row?.salaryThousands}{" "}
                                        {row?.salaryThousands > 1
                                          ? "Thousands"
                                          : "Thousand"}
                                      </span>
                                    </Typography>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item xs={12} md={6} lg={7}>
                                <Box
                                  // sx={{ px: { xs: 2, md: 0 } }}
                                  onClick={() =>
                                    handleNavigateSingleApplicantsDetails(
                                      row?.userID,
                                      row
                                    )
                                  }
                                >
                                  <Box
                                    sx={{
                                      px: 2,
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: 3,
                                      py: 1.5,
                                    }}
                                  >
                                    <Box>
                                      <Typography
                                        variant="subtitle2"
                                        display="block"
                                        sx={{
                                          color: "#6F7482",
                                          fontWeight: "600",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {row?.experience?.find(
                                          (exp) =>
                                            exp?.currentlyWorking === true
                                        )
                                          ? "Current"
                                          : "Experience"}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          color: "#3B4256",
                                          fontSize: "16px",
                                        }}
                                      >
                                        {row?.experience?.length > 0 ? (
                                          <>
                                            {row?.experience?.find(
                                              (exp) =>
                                                exp?.currentlyWorking === true
                                            ) ? (
                                              <>
                                                {
                                                  row?.experience?.find(
                                                    (exp) =>
                                                      exp?.currentlyWorking ===
                                                      true
                                                  )?.designation
                                                }{" "}
                                                -{" "}
                                                {
                                                  row?.experience?.find(
                                                    (exp) =>
                                                      exp?.currentlyWorking ===
                                                      true
                                                  )?.instituteName
                                                }
                                              </>
                                            ) : (
                                              <>
                                                {
                                                  row?.experience?.find(
                                                    (exp) =>
                                                      exp?.currentlyWorking ===
                                                      false
                                                  )?.designation
                                                }{" "}
                                                -{" "}
                                                {
                                                  row?.experience?.find(
                                                    (exp) =>
                                                      exp?.currentlyWorking ===
                                                      false
                                                  )?.instituteName
                                                }
                                              </>
                                            )}
                                          </>
                                        ) : (
                                          "No Data Found"
                                        )}
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Typography
                                        variant="subtitle2"
                                        display="block"
                                        sx={{
                                          color: "#6F7482",
                                          fontWeight: "600",
                                          fontSize: "12px",
                                        }}
                                      >
                                        Education
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          color: "#3B4256",
                                          fontSize: "16px",
                                        }}
                                      >
                                        <span style={{ fontWeight: "lighter" }}>
                                          {row?.education?.length > 0
                                            ? `${
                                                row?.education?.reduce(
                                                  (prev, current) =>
                                                    prev?.yearOfPassing >
                                                    current?.yearOfPassing
                                                      ? prev
                                                      : current
                                                )?.course
                                              } in ${
                                                row?.education?.reduce(
                                                  (prev, current) =>
                                                    prev?.yearOfPassing >
                                                    current?.yearOfPassing
                                                      ? prev
                                                      : current
                                                )?.specialization
                                              }
                                            from ${
                                              row?.education?.reduce(
                                                (prev, current) =>
                                                  prev?.yearOfPassing >
                                                  current?.yearOfPassing
                                                    ? prev
                                                    : current
                                              )?.university
                                            }`
                                            : "No Data Found"}
                                        </span>
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Typography
                                        variant="subtitle2"
                                        display="block"
                                        sx={{
                                          color: "#6F7482",
                                          fontWeight: "600",
                                          fontSize: "12px",
                                        }}
                                      >
                                        Preferred Location
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          color: "#3B4256",
                                          fontSize: "16px",
                                        }}
                                      >
                                        {row?.preferredWorkLocation?.length > 0
                                          ? row?.preferredWorkLocation?.map(
                                              (pwl, index) => (
                                                <>
                                                  {pwl?.cityWithState?.replace(
                                                    ",",
                                                    " -"
                                                  )}
                                                  {row?.preferredWorkLocation
                                                    ?.length -
                                                    1 ===
                                                  index
                                                    ? "."
                                                    : ", "}
                                                </>
                                              )
                                            )
                                          : "No Data Found"}
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Typography
                                        variant="subtitle2"
                                        display="block"
                                        sx={{
                                          color: "#6F7482",
                                          fontWeight: "600",
                                          fontSize: "12px",
                                        }}
                                      >
                                        Key Skill
                                      </Typography>
                                      <Box
                                        sx={{
                                          diplay: "flex",
                                          flexDirection: "row",
                                          flexWrap: "wrap",
                                        }}
                                      >
                                        {row?.getCandidateSkills?.length > 1
                                          ? row?.getCandidateSkills?.map(
                                              (skill) => (
                                                <Typography
                                                  variant="body2"
                                                  sx={{
                                                    color: "#333333",
                                                    // fontWeight: 600,
                                                    fontSize: "16px",
                                                    display: "inline-block",
                                                    pr: 2,
                                                    py: 0.5,
                                                  }}
                                                >
                                                  {skill?.name}
                                                </Typography>
                                              )
                                            )
                                          : "No Data Found"}
                                      </Box>
                                    </Box>
                                  </Box>
                                </Box>
                              </Grid>
                              {/* <Grid item xs={0} lg={1}></Grid> */}
                            </Grid>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "600",
                                textAlign: "center",
                                color: "#395987",
                                borderTop: "1px solid #E4EEF5",
                                py: 0.5,
                              }}
                            >
                              Last Active:{" "}
                              {moment(row?.lastLogin?.slice(0, 10)).format(
                                "DD-MMM-YYYY"
                              )}
                            </Typography>
                          </Box>
                        </>
                      ))}
                    </Box>

                    {/* Pagination */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        pt: 2,
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {/* {pageCount !== 1 && (
                            <ArrowBackIcon
                              onClick={() =>
                                handleIncreasePageCount("decrease")
                              }
                            />
                          )}
                          <Typography> {pageCount}</Typography>
                          {searchResult?.length === 10 && (
                            <ArrowForwardIcon
                              onClick={() =>
                                handleIncreasePageCount("increase")
                              }
                            />
                          )} */}
                          <Pagination
                            count={pagination?.number_of_page}
                            variant="outlined"
                            shape="rounded"
                            page={pageCount}
                            // defaultPage={1}
                            getItemAriaLabel={function (
                              type: "page",
                              page: pageNo,
                              selected: true
                            ) {
                              return "page";
                            }}
                            onChange={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        ) : (
          <ToastTitle />
        )}
      </ShowForAccessResumeDB>
    );
  } else {
    return (
      <Container maxWidth="xl" sx={{ mx: "auto", mb: 8 }}>
        <Box sx={{ px: 3 }}>
          <Skeleton
            variant="text"
            animation="wave"
            width="50%"
            height={30}
            sx={{ my: 2 }}
          />
          <Box
            sx={{
              backgroundColor: "var(--clr-white)",
              borderRadius: 2,
              boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
              p: 2,
            }}
          >
            <Grid
              container
              justifyContent="space-between"
              rowSpacing={3}
              columnSpacing={5}
            >
              <Grid item xs={6}>
                <Skeleton sx={{ my: 2, width: "30%" }} />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Skeleton sx={{ my: 2, width: "30%" }} />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Skeleton
                variant="text"
                animation="wave"
                width={120}
                height={50}
                sx={{ borderRadius: 8, py: 3 }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={100}
                height={50}
                sx={{ borderRadius: 8, py: 3 }}
              />
            </Box>
          </Box>
          <Box sx={{ py: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={9}>
                <Skeleton
                  variant="rectangular"
                  height={180}
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  height={180}
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
                <Skeleton
                  variant="rectangular"
                  height={180}
                  sx={{ my: 2, py: 3, borderRadius: 1 }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
};

export default SearchResumeResult;

const ExportCSV = ({ selectedCandidates, fileName }) => {
  const [isLoading, setIsLoading] = useState(false);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = async (selectedCandidates, fileName) => {
    // console.log(fileName, selectedCandidates);

    setIsLoading(true);

    const downloadExel = async () => {
      selectedCandidates?.map((sC) => {
        const candidateSkills = sC?.getCandidateSkills
          ?.map((u) => u?.name)
          ?.join(", ");
        const candidateEducation = sC?.getCandidateEducation
          ?.map((u) => u?.title)
          ?.join(", ");

        Object.assign(sC, { candidateSkills });
        Object.assign(sC, { candidateEducation });
      });

      const newArray = selectedCandidates.map(
        ({
          activelySearching,
          candidateEducation,
          candidateSkills,
          dateofBirth,
          gender,
          maritalStatus,
          homeTown,
          address,
          industry,
          departmentName,
          roleCategory,
          jobRole,
          desiredJobType,
          desiredShift,
          desiredEmploymentType,
          preferredWorkLocation,
          email,
          exp,
          name,
          phone,
          expectedSalaryStart,
          expectedSalaryEnd,
        }) => ({
          Name: name,
          Phone: phone,
          Email: email,
          "Actively Searching": activelySearching ? "Yes" : "No",
          "Years of Experience": `${exp} years`,
          Specializations: candidateSkills,
          "Date of Birth": dateofBirth,
          Gender: gender,
          "Merital Status": maritalStatus,
          "Home Town": homeTown,
          "Permanent Address": address,
          "Current Industry": industry,
          Department: departmentName,
          "Role Category": roleCategory,
          "Job Role": jobRole,
          "Desired Job Type": desiredJobType,
          "Desired Shift": desiredShift,
          "Desired Employment Type": desiredEmploymentType,
          "Preferred Work Location": preferredWorkLocation,
          Education: candidateEducation,
          "Expected Salary": `${expectedSalaryStart || 0} to ${expectedSalaryEnd || 0} Lakhs`,
        })
      );

      // console.log("down here", selectedCandidates);
      setIsLoading(false);
      // return;
      const ws = XLSX.utils.json_to_sheet(newArray);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });

      FileSaver.saveAs(data, fileName + fileExtension);
    };

    async function getContactDetails(candidatePrfoile) {
      const QUERY_GETCONTACTDETAILS = {
        query: `query MyQuery {
        getContactDetails(candidateID: "${candidatePrfoile?.userID}") {
          candidateID
          email
          phone
          phoneVerified
          profilePicURL
        }
      }`,
      };

      await gqlquery(QUERY_GETCONTACTDETAILS, null)
        .then((res) => res.json())
        .then((data) => {
          Object.assign(candidatePrfoile, data?.data?.getContactDetails);
        });
    }

    async function getCareerProfile(candidatePrfoile) {
      const QUERY_GETCAREERPROFILEBYAPPLICANT = {
        query: `query MyQuery {
                getCareerProfileByApplicant(userID: "${candidatePrfoile?.userID}") {
                  roleCategoryName
                  roleCategoryID
                  phoneOpted
                  industryName
                  industryID
                  expectedSalaryStart
                  expectedSalaryEnd
                  emailOpted
                  desiredShift
                  desiredJobType
                  desiredEmploymentType
                  departmentName
                  cpID
                }
              }`,
      };

      await gqlquery(QUERY_GETCAREERPROFILEBYAPPLICANT, null)
        .then((res) => res.json())
        .then((data) => {
          // console.log(candidatePrfoile?.userID, "salary", data)
          Object.assign(
            candidatePrfoile,
            data?.data?.getCareerProfileByApplicant
          );
        });
    }

    async function getPersonalDetails(candidatePrfoile) {
      const QUERY_GETPERSONALDETAILSBYAPPLICANT = {
        query: `query MyQuery {
              getPersonalDetailsByApplicant(userID: "${candidatePrfoile?.userID}") {
                bothAddressSame
                dateofBirth
                differentlyAbled
                gender
                maritalStatus
                pdID
                permanentAddressL1
                permanentAddressL2
                permanentCity
                permanentCountry
                permanentLocationID
                permanentState
                permanentZip
                personalInterest
                presentAddressL1
                presentAddressL2
                presentCity
                presentCountry
                presentLocationID
                presentState
                presentZip
                professionalInterest
                spouseName
                spouseOccupation
              }
            }`,
      };

      await gqlquery(QUERY_GETPERSONALDETAILSBYAPPLICANT, null)
        .then((res) => res.json())
        .then((data) => {
          // console.log(4444444, data?.data?.getPersonalDetailsByApplicant)
          Object.assign(
            candidatePrfoile,
            data?.data?.getPersonalDetailsByApplicant
          );
        });
    }

    const getInfo = selectedCandidates?.map(async (candidatePrfoile, index) => {
      await getContactDetails(candidatePrfoile);
      await getCareerProfile(candidatePrfoile);
      await getPersonalDetails(candidatePrfoile);
    });

    await Promise.all(getInfo);

    await downloadExel();
  };

  return (
    <>
      {isLoading ? (
        <Button
          variant=""
          sx={{
            p: "6px 12px 6px 12px",
            fontWeight: "bold",
            color: "#395987",
            fontFamily: "'Open Sans', sans-serif !important",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          <CircularProgress size="1.5rem" thickness={6} />
        </Button>
      ) : (
        <Button
          variant=""
          sx={{
            p: "6px 26px 6px 12px",
            fontWeight: "bold",
            color: "#395987",
            fontFamily: "'Open Sans', sans-serif !important",
            fontSize: "15px",
            cursor: "pointer",
          }}
          onClick={(e) => exportToCSV(selectedCandidates, fileName)}
        >
          Download
        </Button>
      )}
    </>
  );
};
