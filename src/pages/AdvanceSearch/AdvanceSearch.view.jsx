import { useEffect, useState, /* useEffect */ } from "react";
import { Grid, Typography, Button, InputLabel, Select, MenuItem, InputBase, Skeleton, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme } from "@mui/material/styles";
import AdvSearch from "./AdvSearch";
import EmploymentDetails from "./EmploymentDetails";
import EducationDetails from "./EducationDetails";
import AdditionalDetails from "./AddtionalDetails";
import DisplayDetails from "./DisplayDetails";
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import { gqlquery, QUERY_GETACTIVESUBSCRIPTIONS, QUERY_NOTICEMASTER } from "../../api/hospitalIndex";
import ToastTitle from "../ToastTitle";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import moment from "moment/moment";


// Custom style for mui Select border
const CustomSelectInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "4px",
    position: "relative",
    border: "1px solid var(--clr-blue-light) !important",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontSize: "15px",
    color: "var(--clr-blue-footer)",
    padding: "11px 26px 12px 12px",

    "&:focus": {
      borderRadius: 4,
      borderColor: "red",
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

const selectPlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#B8BCCA"
  }
}))

const SelectPlaceholder = ({ children }) => {
  const classes = selectPlaceholderStyles();
  return (<div className={classes.placeholder}>{children}</div>);
}

// User permission
export const ShowForAccessResumeDB = (props) => {
  const { getUserRole, permitUser, isLoading } = useAuth();

  useEffect(() => {
    getUserRole();
  }, [])

  if (!isLoading) {
    return permitUser?.accessResumeDB || permitUser?.adminUser ? props.children : <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Fix-Access-Denied-Folder-Featured.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5" style={{ width: "100%", height: "auto" }} alt="Accecss_denied" />;
  } else {
    return (
      <Box maxWidth="md" sx={{ mx: "auto" }}>
        <Skeleton variant="text" animation="wave" width="50%" height={30} sx={{ my: 2 }} />
        <Box sx={{ px: 4, bgcolor: "#ffffff", boxShadow: "5px 19px 28px rgba(69, 143, 246, 0.09)", borderRadius: 1, mb: 5 }}>
          <Grid container rowSpacing={3} columnSpacing={8}>
            <Grid item xs={12}>
              <Skeleton sx={{ my: 2, width: "30%", py: 3 }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="rectangular" sx={{ my: 2, py: 3, borderRadius: 1 }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="rectangular" sx={{ my: 2, py: 3, borderRadius: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="rectangular" sx={{ my: 2, py: 3, borderRadius: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="rectangular" sx={{ my: 2, py: 3, borderRadius: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="rectangular" sx={{ my: 2, py: 3, borderRadius: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="rectangular" sx={{ my: 2, py: 3, borderRadius: 1 }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="text" animation="wave" height={30} sx={{ my: 2 }} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}

function createData(queries) {
  return { queries };
}
let searched = [
  createData("Search Keyword 1"),
  createData("Search Keyword 2"),
  createData("Search Keyword 3"),
  createData("Search Keyword 4"),
  createData("Search Keyword 5"),
  createData("Search Keyword 6"),
  createData("Search Keyword 7"),
  createData("Search Keyword 8"),
  createData("Search Keyword 9"),
  createData("Search Keyword 10"),
  createData("Search Keyword 11"),
];

const lastActiveInDate = [
  { laId: 1, label: "1 day", date: moment().subtract(1, 'days').format("YYYY-MM-DD") },
  { laId: 2, label: "7 days", date: moment().subtract(7, 'days').format("YYYY-MM-DD") },
  { laId: 3, label: "15 days", date: moment().subtract(15, 'days').format("YYYY-MM-DD") },
  { laId: 4, label: "1 month", date: moment().subtract(1, 'month').format("YYYY-MM-DD") },
  { laId: 5, label: "2 months", date: moment().subtract(2, 'months').format("YYYY-MM-DD") },
  { laId: 6, label: "3 months", date: moment().subtract(3, 'months').format("YYYY-MM-DD") },
  { laId: 7, label: "6 months", date: moment().subtract(6, 'months').format("YYYY-MM-DD") },
];

const AdvanceSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [searches, setSearches] = useState(searched);
  const [age, setAge] = useState("");
  const [getAdvanceSearch, setGetAdvanceSearch] = useState([]);
  const [getEmploymentData, setGetEmploymentData] = useState([]);
  const [getEducationData, setGetEducationData] = useState([]);
  const [getAdditionalData, setGetAdditionalData] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [values, setValues] = useState({
    activeIn: "",
  });
  const [lastActiveIn, setLastActiveIn] = useState([]);
  const [anyKeywordError, setAnyKeywordsError] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  document.title = "Search Profile | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setValues({ ...values, "activeIn": moment().subtract(6, 'months').format("YYYY-MM-DD") })
    gqlquery(QUERY_GETACTIVESUBSCRIPTIONS, null)
      .then((res) => res.json())
      .then((data) => {
        setActiveSubscription(data?.data?.getActiveSubscriptions);
      })
      .finally(() => setInitialLoading(false));
    ;

  }, []);

  const accessResumeDBObj = activeSubscription?.find(aS => aS?.type === "ResumeDB");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleGetAdvanceSearch = (advSearchData) => {
    setGetAdvanceSearch({ advSearchData: advSearchData })
  }

  const handleGetEmploymentData = (employmentData) => {
    setGetEmploymentData({ employmentData: employmentData })
  };

  const handleGetEducationalDetails = (educationalDetails) => {
    setGetEducationData({ educationalDetails: educationalDetails.values })
  }

  const handleGetAdditionalDetails = (additionalDetails) => {
    setGetAdditionalData({ additionalDetails: additionalDetails.values })
  }
  const employmentQueryInfo = getEmploymentData.employmentData;
  const educationQueryInfo = getEducationData.educationalDetails;
  const additionalQueryInfo = getAdditionalData.additionalDetails;

  const searchQueryInfo = {
    anyKeywords: `${getAdvanceSearch?.advSearchData?.keyword1 ? getAdvanceSearch?.advSearchData?.keyword1?.join(", ") : ""}`,
    allKeywords: `${getAdvanceSearch?.advSearchData?.keyword2 ? getAdvanceSearch?.advSearchData?.keyword2?.join(", ") : ""}`,
    employmentType: `${getAdvanceSearch?.advSearchData?.inputValues?.employmentType}`,
    experienceFrom: `${Number(
      getAdvanceSearch?.advSearchData?.inputValues?.experienceFrom
    )}`,
    experienceTo: `${Number(
      getAdvanceSearch?.advSearchData?.inputValues?.experienceTo
    )}`,
    currentLocation: `${getAdvanceSearch?.advSearchData?.currentLocation}`,
    preferredLocation: `${getAdvanceSearch?.advSearchData?.preferredLocation}`,
    salaryRangeEnd: `${Number(
      getAdvanceSearch?.advSearchData?.inputValues?.salaryRange?.[1]
    )}`,
    salaryRangeStart: `${Number(
      getAdvanceSearch?.advSearchData?.inputValues?.salaryRange?.[0]
    )}`,
    pageNumber: `${Number(1)}`,
    emp_designation: `${employmentQueryInfo?.designation}`,
    emp_instituteType: `${employmentQueryInfo?.instituteType}`,
    emp_institution: `${employmentQueryInfo?.institution}`,
    emp_noticePeriod: `${employmentQueryInfo?.noticePeriod}`,
    ed_healthcareIndustry: `${educationQueryInfo?.healtCareIndustry}`,
    ed_qualification: `${educationQueryInfo?.qualification}`,
    ed_course: `${educationQueryInfo?.course}`,
    ed_specialization: `${educationQueryInfo?.specialization}`,
    ed_university: `${educationQueryInfo?.institute}`,
    ed_yearOfPassing: `${educationQueryInfo?.passingyear}`,
    ed_courseType: `${educationQueryInfo?.coursetype}`,
    ps_maritalStatus: `${additionalQueryInfo?.maritalStatus}`,
    ps_gender: `${additionalQueryInfo?.gender}`,
    ps_maximumAge: `${additionalQueryInfo?.maximumAge}`,
    ps_minimumAge: `${additionalQueryInfo?.minimumAge}`,
    cp_industry: `${additionalQueryInfo?.industry?.industry || ""}`,
    cp_roleCategory: `${additionalQueryInfo?.roleCategory}`,
    cp_jobType: `${additionalQueryInfo?.jobType}`,
    cp_employmentType: `${additionalQueryInfo?.employmentType}`,
    cp_shift: `${additionalQueryInfo?.shift}`,
    cp_expectedSalaryStart: `${additionalQueryInfo?.expectedSalary[0]}`,
    cp_expectedSalaryEnd: `${additionalQueryInfo?.expectedSalary[1]}`,
    activeIn: `${values?.activeIn}`
  };

  // console.log(values.activeIn, "whassup", searchQueryInfo);
  const handleSearch = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (searchQueryInfo?.anyKeywords === null || searchQueryInfo?.anyKeywords === undefined || searchQueryInfo?.anyKeywords === "undefined" || searchQueryInfo?.anyKeywords === "" || searchQueryInfo?.anyKeywords === []) {
        setAnyKeywordsError("Any keyword field can't be empty.")
        return;
      }
      else {
        setAnyKeywordsError("")
        const handleNavigate = () => {
          navigate("/search-resume-result", { state: { searchQueryInfo: searchQueryInfo } });
        };
        setTimeout(handleNavigate, 1000);
      }
    }
  };

  if (!initialLoading) {
    return (
      <ShowForAccessResumeDB>
        <>
          {
            matches &&
            <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px", display: "flex", alignItems: "center" }}>
              <ArrowBackIosNewIcon sx={{ color: "var(--clr-blue-footer)", mr: 3.1 }} /><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Jobseeker Resume Access (JRA)</Typography>
            </Box>
          }
        </>
        {accessResumeDBObj?.validUpto >=
          new Date().toISOString().slice(0, 10) &&
          accessResumeDBObj?.creditsLeft > 0 ? (
          <Box maxWidth="md" sx={{ mx: "auto", px: matches && 2 }}>
            {/* Advance Search  */}
            <AdvSearch
              getAdvanceSearch={handleGetAdvanceSearch}
              getKeyInfo={handleSearch}
              anyKeywordError={anyKeywordError}
            />

            {/* Empoyment Details  */}
            <EmploymentDetails getEmploymentData={handleGetEmploymentData} />

            {/* Educational Details  */}
            <EducationDetails getEducationData={handleGetEducationalDetails} />

            {/* Additional Details  */}
            <AdditionalDetails getAdditionalData={handleGetAdditionalDetails} />

            {/* Display Details  */}
            <DisplayDetails />

            {/* clear and clear button  */}
            {!matches ? (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ my: 0.5 }}>Active in</InputLabel>
                  <Select
                    fullWidth
                    displayEmpty
                    renderValue={values.activeIn !== "" ? undefined : () => <SelectPlaceholder>Select Active In</SelectPlaceholder>}
                    // error={values.activeIn === "" && error}
                    // value={values.activeIn}
                    defaultValue={values.activeIn}
                    onChange={handleChange("activeIn")}
                    // onKeyDown={handleAddExperience}
                    inputProps={{ classes: { icon: classes.icon } }}
                    input={<CustomSelectInput />}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>
                      Select Active In
                    </MenuItem>
                    {lastActiveInDate?.map((activity) => (
                      <MenuItem value={activity?.date}>{activity?.label}</MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 4.5,
                    py: 3,
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{ borderWidth: "2px", borderRadius: 16 }}
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={(event) => handleSearch(event, "onClick")}
                    variant="contained"
                    sx={{
                      borderRadius: 16,
                      py: 1,
                      px: 2,
                    }}
                  >
                    Search
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Grid container sx={{ mt: 0, mb: 3 }}>
                  <Grid item xs={12}>
                    <InputLabel sx={{ my: 0.5 }}>Active in</InputLabel>
                    <Select
                      fullWidth
                      displayEmpty
                      renderValue={values.activeIn !== "" ? undefined : () => <SelectPlaceholder>Select Notice Period</SelectPlaceholder>}
                      // error={values.activeIn === "" && error}
                      value={values.activeIn}
                      onChange={handleChange("activeIn")}
                      // onKeyDown={handleAddExperience}
                      inputProps={{ classes: { icon: classes.icon } }}
                      input={<CustomSelectInput />}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem value="" disabled>
                        Select Active In
                      </MenuItem>
                      {lastActiveInDate?.map((activity) => (
                        <MenuItem value={activity?.date}>{activity?.label}</MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>

                <Grid container columnSpacing={7.5}>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ borderWidth: "2px", borderRadius: 16 }}
                    >
                      Clear
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      onClick={(event) => handleSearch(event, "onClick")}
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: 16,
                        py: 1,
                        px: 2,
                      }}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}

            {/* Recent searches  */}
            <Grid style={{ margin: "40px 0 60px 0" }}>
              <Typography
                style={{
                  marginBottom: "30px",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                Recent Searches
              </Typography>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
                gap={2}
              >
                {searches?.map((search) => (
                  <Typography
                    underline="always"
                    variant="body2"
                    sx={{ color: "#6F7482" }}
                  >
                    <Link to="/" color="inherit" sx={{ mr: 2 }}>
                      {search?.queries}
                    </Link>
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Box>
        ) : (
          <ToastTitle />
        )}
      </ShowForAccessResumeDB>
    );
  } else {
    return (
      <Box maxWidth="md" sx={{ mx: "auto" }}>
        <Skeleton variant="text" animation="wave" width="50%" height={30} sx={{ my: 2 }} />
        <Box sx={{ px: 4, bgcolor: "#ffffff", boxShadow: "5px 19px 28px rgba(69, 143, 246, 0.09)", borderRadius: 1, mb: 5 }}>
          <Grid container rowSpacing={3} columnSpacing={8}>
            <Grid item xs={12}>
              <Skeleton sx={{ my: 2, width: "30%", py: 3 }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="rectangular" sx={{ my: 2, py: 3, borderRadius: 1 }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="rectangular" sx={{ my: 2, py: 3, borderRadius: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="rectangular" sx={{ my: 2, py: 3, borderRadius: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="rectangular" sx={{ my: 2, py: 3, borderRadius: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="rectangular" sx={{ my: 2, py: 3, borderRadius: 1 }} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="rectangular" sx={{ my: 2, py: 3, borderRadius: 1 }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton sx={{ my: 2, width: "30%" }} />
              <Skeleton variant="text" animation="wave" height={30} sx={{ my: 2 }} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
};

export default AdvanceSearch;
