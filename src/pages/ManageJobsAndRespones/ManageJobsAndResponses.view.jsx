import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Checkbox,
  Chip,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  Select,
  Skeleton,
  Slider,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {  gqlOpenQuery, gqlquery, QUERY_GETQUALIFICATIONS, QUERY_VACANCIES,} from "../../api/hospitalIndex.js";
import useAuth from "../../hooks/useAuth";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import MuiAlert from "@mui/material/Alert";

// AccessJob posting
export const ShowForAccessJobPosting = (props) => {
  const { getUserRole, permitUser, isLoading } = useAuth();

  useEffect(() => {
    getUserRole();
  }, []);

  if (!isLoading) {
    return permitUser?.accessJobPosting || permitUser?.adminUser ? (
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
      <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
        <Box style={{ marginTop: "15px", marginBottom: "30px" }}>
          <Skeleton variant="text" animation="wave" width="40%" height={30} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton variant="text" animation="wave" width="40%" height={50} />
          <Skeleton variant="text" animation="wave" width="15%" height={60} />
        </Box>
        <Box>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={60}
            sx={{ my: 0.5 }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={60}
            sx={{ my: 0.5 }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={60}
            sx={{ my: 0.5 }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={60}
            sx={{ my: 0.5 }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={60}
            sx={{ my: 0.5 }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={60}
            sx={{ my: 0.5 }}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={60}
            sx={{ my: 0.5 }}
          />
        </Box>
      </Box>
    );
  }
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
const useStyles = makeStyles({
  titleBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  pageTitle: {
    fontWeight: "600 !important",
    color: "var(--clr-blue-footer)",
  },
  createButton: {
    borderRadius: "50px",
    fontWeight: "600",
  },
  createMenu: {
    // marginTop: "45px",
    boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
    borderRadius: "6px",
  },
  manuItem: {
    color: "var(--clr-blue-footer) !important",
    padding: "7px 15px",
    margin: "0px",
    borderRadius: "none !important",
  },
  tableContainer: {
    boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
  },
  table: {
    color: "var(--clr-blue-footer)",
  },
  tableTitleText: {
    color: "var(--clr-blue-footer)",
    fontSize: "14px",
    fontWeight: "600",
  },
  tableTitleTextSm: {
    color: "var(--clr-blue-footer)",
    fontSize: "12px",
    fontWeight: "600",
  },
  dummyButton: {
    backgroundColor: "var(--clr-blue-light) !important",
    borderRadius: "50px",
    color: "var(--clr-blue-footer) !important",
    fontWeight: "600",
    padding: "4px 12px !important",
  },
  tablebodyrow: {
    backgroundColor: "var(--clr-white)",
    height: "60px !important",
  },
  pagination: {
    backgroundColor: "var(--clr-white)",
    color: "var(--clr-blue-footer)",
    fontWeight: "600 !important",
    padding: "10px",
  },
  menuPaper: {
    maxHeight: 180,
  },
  icon: {
    fill: "var(--clr-blue-footer)",
  },
  editMenu: {
    color: "var(--clr-blue-footer) !important",
    padding: "7px 15px",
    margin: "0px",
    borderRadius: "none !important",
    backgroundColor: "#FFF !important",
    "&:hover": {
      backgroundColor: "#C7D3E3 !important",
    },
  },
});

export default function ManageJobAndResponses() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [editOpen, setEditOpen] = useState("");
  const openNav = Boolean(anchorElNav);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [vacancies, setVacancies] = useState([]);
  const [flag, setFlag] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openSnackBarUpdateJob, setOpenSnackBarUpdateJob] = useState(false);
  const [openSnackBarCloseJob, setOpenSnackBarCloseJob] = useState(false);
  const [form, setForm] = useState({
    jobTitle: "",
    location: "",
    qualification: "",
    employmentType: "",
    experience: "",
    lastDateToApply: new Date(),
    description: "",
    salaryRange: [1, 99],
    filterKeyword: "",
    filterLocation: "",
    filterExperienceFrom: "",
    filterExperienceTo: "",
    filterSalaryRange: [1, 99],
  });
  const [primarySpecialization, setPrimarySpecialization] = useState(null);
  const [secondarySpecialization, setSecondarySpecialization] = useState(null);
  const [getQualifications, setGetQualifications] = useState([]);
  const [allCityLocation, setAllCityLocation] = useState([]);
  // const [cityLocation, setCityLocation] = useState("");
  // const [allPrimarySpecialization, setAllPrimarySpecialization] = useState([]);
  // const [allSecondarySpecialization, setAllSecondarySpecialization] = useState(
  //   []
  // );
  const [inputErr, setInputErr] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const [validKeywordsErr, setValidKeywordsErr] = useState("");
  const [address, setAddress] = useState();
  const [itemVacancyID, setItemVacancyID] = useState(null);
  const [item, setItem] = useState({});
  const [updated, setUpdated] = useState(false);
  const [expError, setExpError] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  document.title = "Manage Job & Responses | MedLink Jobs";
  const CHARACTER_LIMIT = 5000;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, page]);

  const handleClick = (vacancyID) => {
    setItemVacancyID(vacancyID);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
    setOpenSnackBarUpdateJob(false);
    setOpenSnackBarCloseJob(false);
  };

  const handleClickNav = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNav = () => {
    setAnchorElNav(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    gqlquery(QUERY_VACANCIES, null)
      .then((res) => res.json())
      .then((datas) => {
        datas?.data?.getVacancies.map((vacanciesData) => {
          const GET_JOB_POST_PRIMARY_SPECIALIZATION = {
            query: `query MyQuery {
              getJobPostPrimarySpecialization(vacancyID: ${vacanciesData.vacancyID}) {
                vacancyID
                type
                specializationID
                specialization
                jpsID
              }
            }
          `,
            variables: null,
            operationName: "MyQuery",
          };

          gqlquery(GET_JOB_POST_PRIMARY_SPECIALIZATION, null)
            .then((res) => res.json())
            .then((data) => {
              // console.log("primary sp", data)
              Object.assign(vacanciesData, data?.data);
              // setAllPrimarySpecialization(data?.data?.getJobPostPrimarySpecialization)
            });

          const GET_JOB_POST_SECONDARY_SPECIALIZATION = {
            query: `query MyQuery {
              getJobPostSecondarySpecialization(vacancyID: ${vacanciesData.vacancyID}) {
                jpsID
                specialization
                specializationID
                type
                vacancyID
              }
            }
          `,
            variables: null,
            operationName: "MyQuery",
          };

          gqlquery(GET_JOB_POST_SECONDARY_SPECIALIZATION, null)
            .then((res) => res.json())
            .then((data) => {
              Object.assign(vacanciesData, data?.data);
              // setAllSecondarySpecialization(data?.data?.getJobPostSecondarySpecialization)
            });
        });
        // console.log("datas?.data?.getVacancies", datas?.data?.getVacancies)
        setVacancies(datas?.data?.getVacancies);
      });
  }, [updated]);

  useEffect(() => {
    gqlquery(QUERY_GETQUALIFICATIONS, null)
      .then((res) => res.json())
      .then((data) => setGetQualifications(data?.data?.getQualifications))
      .finally(() => setUpdated(false));
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedVacancies = () => {
    const newArray = vacancies?.sort(
      (a, b) => new Date(b.postedOn) - new Date(a.postedOn)
    );
    return newArray;
  };
  const sorteArray = sortedVacancies();

  const newVacancies = sorteArray?.map((vacancie) => {
    const date = new Date(vacancie?.postedOn);
    const newDate = date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
      ?.split(" ")
      ?.join("-");
    return {
      jobTitle: vacancie?.jobTitle,
      location: vacancie?.location,
      qualification: vacancie?.qualification,
      employmentType: vacancie?.employmentType,
      experience: vacancie?.experience,
      postedOn: newDate,
      vacancyType: vacancie?.vacancyType,
      responses: vacancie?.responses,
      status: vacancie?.status,
      vacancyID: vacancie?.vacancyID,
      lastDateToApply: vacancie?.lastDateToApply,
      description: vacancie?.description,
      minimumSalary: vacancie?.minimumSalary,
      maximumSalary: vacancie?.maximumSalary,
      primarySpecialization: vacancie?.primarySpecialization,
      secondarySpecialization: vacancie?.secondarySpecialization,
    };
  });

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
        });
    }
  };

  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e.target.name] = e.target.value;
      return __form;
    });
  };

  const handleKeyDown = (event) => {
    if (event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      handleEditJob(event);
      return;
    }
  };

  const onlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };
  // let resText = /^[a-zA-Z]+$/;
  let resText = /^[a-zA-Z ]*$/;
  form.jobTitle = form.jobTitle.replace(/  +/g, " ");
  form.filterKeyword = form.filterKeyword.replace(/  +/g, " ");

  // Edit job handler
  const handleEditJob = (event, from) => {
    if (from === "onClick" || event.key === "Enter") {
      if (
        form.jobTitle === "" ||
        form.jobTitle === " " ||
        resText.test(form.jobTitle) === false ||
        form.description === "" ||
        form.qualification === "" ||
        form.employmentType === "" ||
        form.experience === "" ||
        Number(form.experience) >= 56 ||
        primarySpecialization === null ||
        secondarySpecialization === null ||
        form.lastDateToApply === null ||
        form.salaryRange[0] === 0 ||
        // address?.value?.structured_formatting?.main_text === ""
        address === null
      ) {
        setErrorLocation(" Please, Add your update address.");
        setInputErr("This field can't be empty.");
        setValidKeywordsErr("This field accept only Alphabets.");
        setExpError("Experience should be less than 56 years.");
        return;
      }

      let newDescription = form.description?.replaceAll("\n", "<br />");

      // previous update vacancies api
      /* const UPDATE_VACANCIES = {
        query: `mutation MyMutation {
                updateVacancy(
                  description: "${newDescription}", 
                  employmentType: "${form.employmentType}", 
                  experience: ${form.experience}, 
                  jobTitle: "${form.jobTitle}", 
                  location: "${form.location}", 
                  maximumSalary: ${form.maximumSalary}, 
                  minimumSalary: ${form.minimumSalary}, 
                  qualification: "${form.qualification}", 
                  vacancyID: ${itemVacancyID}, 
                  primarySpecialization: "${primarySpecialization}", 
                  secondarySpecialization: "${secondarySpecialization}", 
                  lastDateToApply: "${form.lastDateToApply}"
                ) 
      }`
      } */

      //  new update vacancies api
      const UPDATE_VACANCIES = {
        query: `mutation MyMutation {
          updateVacancy(description: "${newDescription}", 
          vacancyID: ${itemVacancyID})
        }`,
      };

      gqlquery(UPDATE_VACANCIES, null)
        .then((res) => res.json())
        .then((datas) => setVacancies(datas?.data?.getVacancies))
        .finally(() => {
          setUpdated((prevData) => !prevData);
          setFlag((prevData) => !prevData);
        });
      setOpenSnackBar(true);
      setOpenSnackBarUpdateJob(true);
      setErrorLocation("");
      setInputErr("");
    }
  };

  console.log("vacancies", vacancies);
  // console.log("allPrimarySpecialization", allPrimarySpecialization);
  // console.log("allSecondarySpecialization", allSecondarySpecialization);
  // open edit
  const handleEditOpen = () => {
    const selectedItem = vacancies?.find(
      (item) => item?.vacancyID === itemVacancyID
    );
    if (selectedItem.status !== "Closed") {
      form.jobTitle = selectedItem?.jobTitle;
      form.location = selectedItem?.location;
      form.qualification = selectedItem?.qualification;
      form.employmentType = selectedItem?.employmentType;
      form.experience = selectedItem?.experience;
      form.postedOn = selectedItem?.postedOn;
      form.vacancyType = selectedItem?.vacancyType;
      form.responses = selectedItem?.responses;
      form.vacancyID = selectedItem?.vacancyID;
      form.lastDateToApply = selectedItem?.lastDateToApply;
      form.description = selectedItem?.description;
      form.minimumSalary = selectedItem?.minimumSalary;
      form.maximumSalary = selectedItem?.maximumSalary;
      setPrimarySpecialization(selectedItem?.getJobPostPrimarySpecialization);
      setSecondarySpecialization(
        selectedItem?.getJobPostSecondarySpecialization
      );
      setItem(selectedItem);
      setAnchorEl(null);
      setFlag((prevData) => !prevData);
    }
  };

  console.log("primary", primarySpecialization);
  console.log("Secondary", secondarySpecialization);

  // cancel Edit
  const cancelEdit = () => {
    setItem({});
    setFlag((prevData) => !prevData);
  };

  const handleCloseJob = (id) => {
    if (window.confirm("Are you sure you want to close this job?")) {
      const QUERY_CLOSEJOB = {
        query: `mutation MyMutation {
          closeJob(vacancyID: ${id})
        }
                  `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_CLOSEJOB, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.closeJob === "SUCCESS") {
            setAnchorEl(null);
            setUpdated((prev) => !prev);
          } else {
          }
        });
    }
    setOpenSnackBar(true);
    setOpenSnackBarCloseJob(true);
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 10) : 0;

  return (
    <ShowForAccessJobPosting>
      <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
        {!flag ? (
          <Box>
            <Box /* sx={{ display: { sm: "none", md: "block" } }} */>
              {!matches ? (
                <Box style={{ marginTop: "15px", marginBottom: "30px" }}>
                  <Breadcrumbs
                    separator={
                      <NavigateNextIcon
                        fontSize="small"
                        sx={{ color: "var(--clr-blue-footer)" }}
                      />
                    }
                    aria-label="breadcrumb"
                    sx={{ marginTop: "20px" }}
                    style={{ marginBottom: "30px" }}
                  >
                    <Link
                      underline="hover"
                      style={{ color: "var(--clr-blue-footer)" }}
                      to="/hospital-dashboard"
                    >
                      Dashboard
                    </Link>
                    <Typography sx={{ color: "var(--clr-blue-footer)" }}>
                      Manage Jobs & Responses
                    </Typography>
                  </Breadcrumbs>
                </Box>
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
                    Manage Jobs & Responses
                  </Typography>
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1,
                  p: { xs: 2, md: 0 },
                  mb: { xs: 0, md: 2 },
                }}
              >
                <Typography
                  variant="h5"
                  className={classes.pageTitle}
                  sx={{ fontSize: { xs: "18px", md: "24px" } }}
                >
                  Manage Jobs & Responses
                </Typography>
                <Button
                  onClick={handleClickNav}
                  variant="contained"
                  sx={{ px: 3 /* width: {xs: "100%", md: "inherit"} */ }}
                  className={classes.createButton}
                >
                  <span>Create</span>&nbsp;&nbsp;
                  <ArrowDropDownIcon sx={{ color: "var(--clr-white)" }} />
                </Button>
                <Menu
                  style={{ marginTop: "1rem !important" }}
                  className={classes.createMenu}
                  anchorEl={anchorElNav}
                  open={openNav}
                  onClose={handleCloseNav}
                  id="basic-menu"
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    component={Link}
                    to="/post-job"
                    onClick={handleCloseNav}
                    className={classes.manuItem}
                  >
                    Post a Job
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/create-vacancies"
                    onClick={handleCloseNav}
                    className={classes.manuItem}
                  >
                    Hot Vacancy
                  </MenuItem>
                </Menu>
              </Box>
              {!matches ? (
                <TableContainer
                  component={Paper}
                  className={classes.tableContainer}
                >
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow
                        sx={{
                          backgroundColor: "var(--clr-blue-light)",
                        }}
                      >
                        <TableCell className={classes.tableTitleText}>
                          <Checkbox
                            sx={{
                              color: "var(--clr-blue-footer) !important",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-footer) !important",
                              },
                            }}
                          />{" "}
                          &nbsp;Job Title
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.tableTitleText}
                        >
                          Job Type
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.tableTitleText}
                        >
                          Posted BY
                        </TableCell>

                        <TableCell
                          align="center"
                          className={classes.tableTitleText}
                        >
                          Posted Date{" "}
                          <CompareArrowsIcon
                            fontSize="inherit"
                            sx={{ color: "inherit" }}
                            style={{ transform: "rotate(90deg)" }}
                          />
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.tableTitleText}
                        >
                          Responses
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.tableTitleText}
                        >
                          Status
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* ?.slice((page) * 10, page * 10 + 10) */}
                      {newVacancies
                        ?.slice(
                          (page > 0 ? page - 1 : page) * 10,
                          (page > 0 ? page - 1 : page) * 10 + 10
                        )
                        ?.map((vacancy, index) => (
                          <TableRow
                            key={vacancy?.vacancyID}
                            className={classes?.tablebodyrow}
                            style={{ padding: "0px", margin: "0px" }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              className={classes.tableTitleText}
                            >
                              <Checkbox
                                sx={{
                                  color: "#C7D3E3 !important",
                                  "&.Mui-checked": {
                                    color: "var(--clr-blue-primary) !important",
                                  },
                                }}
                              />
                              &nbsp;
                              <Link
                                to={`/job-title/${vacancy?.vacancyID}`}
                                state={{ vacancy }}
                              >
                                {" "}
                                {vacancy.jobTitle}
                              </Link>
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.tableTitleTextSm}
                            >
                              {vacancy?.vacancyType}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                padding: "0px",
                                margin: "0px",
                                fontWeight: 600,
                              }}
                            >
                              <Button disabled className={classes.dummyButton}>
                                You
                              </Button>
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.tableTitleTextSm}
                            >
                              {vacancy?.postedOn}
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.tableTitleTextSm}
                            >
                              {vacancy?.responses}
                            </TableCell>
                            <TableCell
                              align="center"
                              className={classes.tableTitleTextSm}
                            >
                              {/* {vacancy?.status} */}
                              {vacancy?.status === "Open" && (
                                <Typography
                                  sx={{
                                    backgroundColor: "#6FCF97",
                                    color: "white",
                                    borderRadius: "24px",
                                    fontWeight: 700,
                                    py: 0.5,
                                    px: 1,
                                    fontSize: "12px",
                                    letterSpacing: 1,
                                  }}
                                >
                                  Active
                                </Typography>
                              )}
                              {vacancy?.status === "Closed" && (
                                <Typography
                                  sx={{
                                    backgroundColor: "#F2994A",
                                    color: "white",
                                    borderRadius: "24px",
                                    fontWeight: 700,
                                    py: 0.5,
                                    px: 1,
                                    fontSize: "12px",
                                    letterSpacing: 1,
                                  }}
                                >
                                  Closed
                                </Typography>
                              )}
                              {vacancy?.status === "Expired" && (
                                <Typography
                                  sx={{
                                    backgroundColor: "#BDBDBD",
                                    color: "white",
                                    borderRadius: "24px",
                                    fontWeight: 700,
                                    py: 0.5,
                                    px: 1,
                                    fontSize: "12px",
                                    letterSpacing: 1,
                                  }}
                                >
                                  Expired
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell
                              align="left"
                              style={{ padding: "0px", margin: "0px" }}
                            >
                              <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? "long-menu" : undefined}
                                aria-expanded={open ? "true" : undefined}
                                aria-haspopup="true"
                                onClick={(event) => {
                                  setAnchorEl(event?.currentTarget);
                                  handleClick(vacancy?.vacancyID);
                                  setEditOpen(vacancy?.status);
                                }}
                              >
                                <MoreVertIcon
                                  sx={{ color: "var(--clr-blue-footer)" }}
                                />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <Menu
                    id="basic-menu"
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    className={classes.createMenu}
                  >
                    <MenuItem
                      className={classes.editMenu}
                      selected={"Edit"}
                      onClick={handleEditOpen}
                      disabled={editOpen === "Closed" ? true : false}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      className={classes.editMenu}
                      selected={"CloseJob"}
                      onClick={() => handleCloseJob(itemVacancyID)}
                      disabled={editOpen === "Closed" ? true : false}
                    >
                      Close Job
                    </MenuItem>
                    {/* <MenuItem
                    className={classes.editMenu}
                    selected={"SendEmail"}
                    // onClick={handleClose}
                    // style={{backgroundColor: '#FFF !important'}}
                  >
                    Send Email
                  </MenuItem> */}
                  </Menu>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      my: "19px",
                      pr: 2,
                    }}
                  >
                    <Pagination
                      style={{}}
                      count={Math.ceil(vacancies?.length / 10)}
                      variant="outlined"
                      shape="rounded"
                      onChange={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </Box>
                </TableContainer>
              ) : (
                <TableContainer component={Box} sx={{ px: 2 }}>
                  <Table aria-label="simple table">
                    <TableBody /* sx={{ borderRadius: 1 }} */>
                      {newVacancies
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        ?.map((vacancy, index) => (
                          <Box
                            component={Box}
                            key={vacancy?.jobTitle}
                            /* className={classes.tableRowmob} */ sx={{
                              backgroundColor: "var(--clr-white)",
                              border: "1px solid var(--clr-blue-light)",
                              borderRadius: "6px !important",
                              my: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                px: 1.3,
                                pb: 0.4,
                              }}
                            >
                              <Typography
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Checkbox
                                  sx={{
                                    color: "#C7D3E3 !important",
                                    "&.Mui-checked": {
                                      color:
                                        "var(--clr-blue-primary) !important",
                                    },
                                    mx: "-5px",
                                  }}
                                />{" "}
                                &nbsp;{" "}
                                <Link
                                  to={`/job-title/${vacancy?.vacancyID}`}
                                  style={{
                                    fontSize: "14px",
                                    color: "var(--clr-blue-footer)",
                                    fontWeight: "600",
                                  }}
                                >
                                  {" "}
                                  {vacancy?.jobTitle}
                                </Link>
                              </Typography>
                              <Box style={{ marginRight: "-14px" }}>
                                <IconButton
                                  aria-label="more"
                                  id="long-button"
                                  aria-controls={open ? "long-menu" : undefined}
                                  aria-expanded={open ? "true" : undefined}
                                  aria-haspopup="true"
                                  onClick={(event) => {
                                    setAnchorEl(event?.currentTarget);
                                    handleClick(vacancy?.vacancyID);
                                    setEditOpen(vacancy?.status);
                                  }}
                                >
                                  <MoreVertIcon
                                    sx={{ color: "var(--clr-blue-footer)" }}
                                  />
                                </IconButton>

                                {/* <LongMenu style={{ marginRight: "-10px" }} /> */}
                              </Box>
                            </Box>
                            <Box sx={{ px: 1.3, py: 0.4 }}>
                              {/* row 1 */}
                              <Box
                                sx={{
                                  display: "grid",
                                  columnGap: 3,
                                  rowGap: 3,
                                  gridTemplateColumns: "repeat(2, 1fr)",
                                  mb: 1.5,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontWeight: 600,
                                      color: "var(--clr-white-icon)",
                                      // marginBottom: "10px",
                                    }}
                                  >
                                    Job Type
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      color: "var(--clr-gray-1)",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {vacancy?.vacancyType}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "baseline",
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontWeight: 600,
                                      color: "var(--clr-white-icon)",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    Posted By
                                  </Typography>
                                  {/* <Button
                                      style={{
                                        backgroundColor: "#C4C4C4",
                                        borderRadius: "24px",
                                        padding: "4px 12px",
                                      }}
                                    > */}
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      color: "var(--clr-blue-footer)",
                                      fontWeight: 600,
                                      backgroundColor: "var(--clr-blue-light)",
                                      borderRadius: 16,
                                      padding: "4px 16px",
                                    }}
                                  >
                                    YOU
                                  </Typography>
                                  {/* </Button> */}
                                </Box>
                              </Box>
                              {/* row 2  */}
                              <Box
                                sx={{
                                  display: "grid",
                                  columnGap: 3,
                                  rowGap: 1,
                                  gridTemplateColumns: "repeat(2, 1fr)",
                                  mb: 1.5,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "",
                                    alignItems: "",
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontWeight: 600,
                                      color: "var(--clr-white-icon)",
                                    }}
                                  >
                                    Posted Date
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      color: "var(--clr-gray-1)",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {vacancy?.postedOn}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "baseline",
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontWeight: 600,
                                      color: "var(--clr-white-icon)",
                                    }}
                                  >
                                    Responses
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      color: "var(--clr-gray-1)",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {vacancy?.responses}
                                  </Typography>
                                </Box>
                              </Box>
                              {/* row 3  */}
                              <Box
                                sx={{
                                  display: "grid",
                                  columnGap: 3,
                                  rowGap: 1,
                                  gridTemplateColumns: "repeat(2, 1fr)",
                                  mb: 1.5,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "",
                                    alignItems: "",
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontWeight: 600,
                                      color: "var(--clr-white-icon)",
                                      marginBottom: "5px",
                                    }}
                                  >
                                    Status
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      color: "var(--clr-gray-1)",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {vacancy?.status === "Open" && (
                                      <Typography
                                        sx={{
                                          display: "inline-block",
                                          backgroundColor: "#6FCF97",
                                          color: "white",
                                          borderRadius: "24px",
                                          fontWeight: 700,
                                          py: 0.5,
                                          px: 2,
                                          fontSize: "12px",
                                          letterSpacing: 1,
                                        }}
                                      >
                                        Active
                                      </Typography>
                                    )}
                                    {vacancy?.status === "Closed" && (
                                      <Typography
                                        sx={{
                                          display: "inline-block",
                                          backgroundColor: "#F2994A",
                                          color: "white",
                                          borderRadius: "24px",
                                          fontWeight: 700,
                                          py: 0.5,
                                          px: 2,
                                          fontSize: "12px",
                                          letterSpacing: 1,
                                        }}
                                      >
                                        Closed
                                      </Typography>
                                    )}
                                    {vacancy?.status === "Expired" && (
                                      <Typography
                                        sx={{
                                          display: "inline-block",
                                          backgroundColor: "#BDBDBD",
                                          color: "white",
                                          borderRadius: "24px",
                                          fontWeight: 700,
                                          py: 0.5,
                                          px: 2,
                                          fontSize: "12px",
                                          letterSpacing: 1,
                                        }}
                                      >
                                        Expired
                                      </Typography>
                                    )}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            {/* white space  */}
                            <Box
                              style={{
                                height: "10px",
                                backgroundColor: "white",
                              }}
                            ></Box>
                          </Box>
                        ))}
                    </TableBody>
                  </Table>
                  <Menu
                    id="basic-menu"
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    className={classes.createMenu}
                  >
                    <MenuItem
                      className={classes.editMenu}
                      selected={"Edit"}
                      onClick={handleEditOpen}
                      disabled={editOpen === "Closed" ? true : false}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      className={classes.editMenu}
                      selected={"CloseJob"}
                      onClick={() => handleCloseJob(itemVacancyID)}
                      disabled={editOpen === "Closed" ? true : false}
                    >
                      Close Job
                    </MenuItem>
                  </Menu>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      my: "19px",
                    }}
                  >
                    <Pagination
                      style={{}}
                      count={Math.ceil(vacancies?.length / 10)}
                      variant="outlined"
                      shape="rounded"
                      onChange={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                  </Box>
                </TableContainer>
              )}
            </Box>
          </Box>
        ) : (
          <Box>
            {!matches ? (
              <Box style={{ marginTop: "15px", marginBottom: "30px" }}>
                <Breadcrumbs
                  separator={
                    <NavigateNextIcon
                      fontSize="small"
                      sx={{ color: "var(--clr-blue-footer)" }}
                    />
                  }
                  aria-label="breadcrumb"
                  sx={{ marginTop: "20px" }}
                >
                  <Link
                    underline="hover"
                    style={{ color: "var(--clr-blue-footer)" }}
                    to="/hospital-dashboard"
                  >
                    Home
                  </Link>
                  <Link
                    underline="hover"
                    style={{ color: "var(--clr-blue-footer)" }}
                    to="/manage-jobs-and-responses"
                  >
                    Manage Jobs & Responses
                  </Link>
                  <Typography sx={{ color: "var(--clr-blue-footer)" }}>
                    Edit Job
                  </Typography>
                </Breadcrumbs>
              </Box>
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
                  Edit Job
                </Typography>
              </Box>
            )}

            {!matches && (
              <Box style={{ marginBottom: "30px" }}>
                <Typography variant="h5" className={classes.pageTitle}>
                  Edit Job
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                backgroundColor: "var(--clr-white)",
                borderRadius: 2,
                boxShadow: {
                  xs: "none",
                  md: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                },
                border: { xs: "1px solid var(--clr-blue-light)", md: "none" },
                display: "flex",
                flexDirection: "column",
                py: 2,
                px: { xs: 2, md: 5 },
                m: { xs: 2, md: 0 },
              }}
            >
              <Grid container rowSpacing={{ xs: 2, md: 3 }} columnSpacing={8}>
                <Grid item xs={12} md={0}>
                  {matches && (
                    <Box sx={{ mt: -2 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "var(--clr-blue-footer)",
                          py: 1,
                          fontWeight: "600",
                          fontSize: "18px",
                        }}
                      >
                        Edit Job
                      </Typography>
                      <Divider sx={{ color: "var(--clr-blue-light)" }} />
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      Job Title <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <TextField
                      disableUnderline
                      disabled
                      fullWidth
                      variant="outlined"
                      name="jobTitle"
                      type="text"
                      placeholder="Job Title"
                      defaultValue={item?.jobTitle}
                      onChange={formValueChange}
                      onKeyDown={handleEditJob}
                      sx={{ borderRadius: 1 }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": {
                            padding: "12.5px 14px",
                          },
                          /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-light)",
                          }, */
                          /* "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid black",
                            },
                          }, */
                        },
                      }}
                      inputProps={{ maxLength: 100 }}
                    />
                    {form.jobTitle === "" && (
                      <FormHelperText
                        sx={{
                          color: "red",
                          mb: 0,
                          textAlign: "left",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        {inputErr}
                      </FormHelperText>
                    )}
                    {form.jobTitle !== "" &&
                      (form.jobTitle === " " ||
                        resText.test(form.jobTitle) === false) && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {validKeywordsErr}
                        </FormHelperText>
                      )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box style={{ width: "100%" }}>
                    <InputLabel sx={{ py: 0.5 }}>
                      Location
                      <span style={{ color: "red" }}> *</span>
                    </InputLabel>
                    <TextField
                      disableUnderline
                      disabled
                      fullWidth
                      variant="outlined"
                      name="location"
                      type="text"
                      placeholder="Enter Location"
                      defaultValue={item?.location}
                      onChange={formValueChange}
                      onKeyDown={handleEditJob}
                      sx={{ borderRadius: 1 }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": {
                            padding: "12.5px 14px",
                          },
                         /*  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-light)",
                          }, */
                          /* "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid black",
                            },
                          }, */
                        },
                      }}
                    />
                    {/* <Autocomplete
                            disablePortal
                            disabled
                            defaultValue={item?.locationID}
                            noOptionsText={'Start typing'}
                            id="combo-box-demo"
                            
                            sx={{
                              "& .MuiAutocomplete-inputRoot": {
                                padding: "3px 9px  !important",
                                borderRadius: "4px",
                              },
                              width: "100%",
                              borderRadius: "4px",
                              backgroundColor: "white",
                            }}
                            onChange={(event, newValue) => {
                              setCityLocation(newValue)
                            }}
                            onKeyDown={handleEditJob}
                            filterSelectedOptions
                            options={allCityLocation}
                            getOptionLabel={(option) => option.cityWithState}
                            renderInput={(params) => (
                              <TextField
                                onChange={(e) => {
                                  SearchLocation(e);
                                }}
                                placeholder="Select Location"
                                {...params}
                              />
                            )}
                          /> */}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      Qualification <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Select
                      defaultValue={item?.qualification}
                      disabled
                      onChange={formValueChange}
                      onKeyDown={handleEditJob}
                      name="qualification"
                      fullWidth
                      displayEmpty
                      inputProps={{ classes: { icon: classes.icon } }}
                      // input={<CustomSelectInput />}
                      sx={{height: "45px"}}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem value="" disabled select>
                        Select Qualification
                      </MenuItem>
                      {getQualifications?.map((allQualification) => (
                        <MenuItem
                          key={allQualification?.emID}
                          value={allQualification?.qualification}
                        >
                          {allQualification?.qualification}
                        </MenuItem>
                      ))}
                    </Select>
                    {form.qualification === "" && (
                      <FormHelperText
                        sx={{
                          color: "red",
                          mb: 0,
                          textAlign: "left",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        {inputErr}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      Employment Type <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Select
                      defaultValue={item?.employmentType}
                      disabled
                      onChange={formValueChange}
                      onKeyDown={handleEditJob}
                      name="employmentType"
                      fullWidth
                      displayEmpty
                      inputProps={{ classes: { icon: classes.icon } }}
                      // input={<CustomSelectInput />}
                      sx={{height: "45px"}}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem disabled value="">
                        Select Employment Type
                      </MenuItem>
                      <MenuItem value={"Full Time"}>Full Time</MenuItem>
                      <MenuItem value={"Part Time"}>Part Time</MenuItem>
                      <MenuItem value={"Locum"}>Locum</MenuItem>
                    </Select>
                    {form.employmentType === "" && (
                      <FormHelperText
                        sx={{
                          color: "red",
                          mb: 0,
                          textAlign: "left",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        {inputErr}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                {console.log(item)}
                {console.log(primarySpecialization)}
                <Grid item xs={12} md={6}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      Primary Specialization
                      <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Autocomplete
                      multiple
                      freeSolo
                      options={topSpecializations?.map(
                        (option) => option.title
                      )}
                      defaultValue={item?.getJobPostPrimarySpecialization?.map(
                        (item) => item?.specialization
                      )}
                      onChange={(event, val) => setPrimarySpecialization(val)}
                      onKeyDown={handleEditJob}
                      disabled
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          sx={{
                            svg: { color: "var(--clr-blue-footer)" },
                            input: {
                              color: "var(--clr-blue-footer)",
                              padding:
                                "2.5px !important" /* border: { color: "var(--clr-blue-light)" }, */,
                              // borderColor: "var(--clr-blue-light) !important",
                            },
                          }}
                          variant="outlined"
                          // placeholder="Primary Specialization"
                        />
                      )}
                      // defaultValue={item?.primarySpecialization}
                    />
                    {(primarySpecialization === null ||
                      primarySpecialization?.length === 0) && (
                      <FormHelperText
                        sx={{
                          color: "red",
                          mb: 0,
                          textAlign: "left",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        {inputErr}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      Secondary Specialization
                      <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <Autocomplete
                      multiple
                      freeSolo
                      defaultValue={item?.getJobPostSecondarySpecialization?.map(
                        (item) => item?.specialization
                      )}
                      options={topSpecializations.map((option) => option.title)}
                      onChange={(event, val) => setSecondarySpecialization(val)}
                      onKeyDown={handleEditJob}
                      disabled
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{
                            svg: { color: "var(--clr-blue-footer)" },
                            input: {
                              color: "var(--clr-blue-footer)",
                              padding:
                                "2.5px !important" /* border: { color: "var(--clr-blue-light)" }, */,
                              // borderColor: "var(--clr-blue-light) !important",
                            },
                          }}
                          fullWidth
                          variant="outlined"
                          // placeholder="Secondary Specialization"
                        />
                      )}
                    />
                    {(secondarySpecialization === null ||
                      secondarySpecialization?.length === 0) && (
                      <FormHelperText
                        sx={{
                          color: "red",
                          mb: 0,
                          textAlign: "left",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        {inputErr}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      Experience <span>(In Year)</span>&nbsp;
                      <span style={{ color: "red" }}>*</span>
                    </InputLabel>
                    <TextField
                      name="experience"
                      type="text"
                      variant="outlined"
                      placeholder="Experience In Year"
                      defaultValue={item?.experience}
                      onChange={formValueChange}
                      onKeyDown={handleEditJob}
                      sx={{ borderRadius: 1 }}
                      fullWidth
                      disabled
                      disableUnderline
                      inputProps={{ maxLength: 2 }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": {
                            padding: "12.5px 14px",
                          },
                          /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-light)",
                          }, */
                          /* "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid black",
                            },
                          }, */
                        },
                      }}
                      onInput={(e) => onlyNumbers(e)}
                    />
                    {form.experience === "" && (
                      <FormHelperText
                        sx={{
                          color: "red",
                          mb: 0,
                          textAlign: "left",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        {inputErr}
                      </FormHelperText>
                    )}
                    {form.experience !== "" && Number(form.experience) >= 56 && (
                      <FormHelperText
                        sx={{
                          color: "red",
                          mb: 0,
                          textAlign: "left",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        {/* {inputErr} */}
                        {/* Experience should be less than 55 years. */}
                        {expError}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      Last Date to Apply{" "}
                      <span style={{ color: "red" }}> *</span>
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        name="lastDateToApply"
                        inputFormat="dd/MM/yyyy"
                        value={form.lastDateToApply}
                        disablePast
                        disabled
                        onChange={(value) => {
                          formValueChange({
                            target: {
                              name: "lastDateToApply",
                              value: new Date(value),
                            },
                          });
                        }}
                        onKeyDown={handleEditJob}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            sx={{
                              svg: { color: "var(--clr-blue-footer)" },
                              input: {
                                color: "var(--clr-blue-footer)",
                                padding: "11px",
                              },
                              border: { color: "var(--clr-blue-light)" },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      Job Description <span style={{ color: "red" }}> *</span>
                    </InputLabel>
                    <TextField
                      name="description"
                      type="text"
                      variant="outlined"
                      placeholder="Description"
                      multiline
                      rows={5}
                      defaultValue={item?.description?.replaceAll(
                        "<br />",
                        "\n"
                      )}
                      onChange={formValueChange}
                      onKeyDown={handleKeyDown}
                      sx={{ borderRadius: 1 }}
                      inputProps={{
                        maxlength: CHARACTER_LIMIT,
                      }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": {
                            // padding: '12px 14px',
                          },
                          /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-light)",
                          },
                          "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-primary)",
                            },
                          }, */
                        },
                      }}
                      fullWidth
                      disableUnderline
                    />
                    {form.description === "" && (
                      <FormHelperText
                        sx={{
                          color: "red",
                          mb: 0,
                          textAlign: "left",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        {inputErr}
                      </FormHelperText>
                    )}
                    <FormHelperText>
                      {`${
                        form?.description?.replaceAll("<br />", "\n")?.length
                      }/${CHARACTER_LIMIT}`}
                    </FormHelperText>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      Salary Range (In lakhs){" "}
                      <span style={{ color: "red" }}> *</span>
                    </InputLabel>
                    <Slider
                      name="salaryRange"
                      getAriaLabel={() => "Salary range"}
                      onChange={formValueChange}
                      disabled
                      onKeyDown={handleEditJob}
                      valueLabelDisplay="auto"
                      defaultValue={[item?.minimumSalary, item?.maximumSalary]}
                      min={0}
                      max={99}
                      marks={[
                        { value: 0, label: `${form.salaryRange[0]}` },
                        { value: 99, label: `${form.salaryRange[1]}` },
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
                    {form.salaryRange[0] === 0 && (
                      <FormHelperText
                        sx={{
                          color: "red",
                          mb: 0,
                          textAlign: "left",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        {inputErr}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
              </Grid>

              {/* {
                  (item?.vacancyType == "Hot") && (
                    <>
                      <Divider sx={{ my: 4, color: "#E0E0E0" }} />
                      <Box>
                        <Typography
                          variant="h6"
                          style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "var(--clr-blue-footer)",
                            marginBottom: "20px"
                          }}
                        >
                          Edit Response Filters
                        </Typography>
                        <Grid container rowSpacing={3} columnSpacing={8}>
                          <Grid item xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>Keywords</InputLabel>
                              <TextField
                                variant="outlined"
                                name="filterKeyword"
                                type="text"
                                placeholder="Keywords"
                                value={form.filterKeyword}
                                onChange={formValueChange}
                                sx={{ borderRadius: 1 }}
                                InputProps={{
                                  sx: {
                                    ".MuiOutlinedInput-input": {
                                      padding: '12.5px 14px',
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
                                fullWidth
                                disableUnderline
                              />
                              {((form.filterKeyword !== "") && ((form.filterKeyword === " ") || ((resText.test(form.filterKeyword)) === false))) && (
                                <FormHelperText sx={{ color: "red", mb: 1 }}>
                                  This field accept only Alphabets.
                                </FormHelperText>
                              )}
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>Location</InputLabel>
                              <GooglePlacesAutocomplete
                                apiKey="AIzaSyChTcMUCY9Zw3j00st0uKkqTz0RGlOpea8"
                                placeholder="Type in an address"
                                AutocompletionRequest={{
                                  bounds: [
                                    { lat: 50, lng: 50 },
                                    { lat: 100, lng: 100 },
                                  ],
                                  componentRestrictions: {
                                    country: ["us", "ca", "uy"],
                                  },
                                }}
                                selectProps={{
                                  isClearable: true,
                                  value: address,
                                  onChange: (val) => {
                                    setAddress(val);
                                  },
                                  styles: {
                                    input: (provided) => ({
                                      ...provided,
                                      boxShadow: 0,
                                      borderRadius: "6px",
                                      height: "38px",
                                      "&:hover": {
                                        border: "1px solid purple",
                                      },
                                    }),
                                    singleValue: (provided) => ({
                                      ...provided,
                                      boxShadow: 0,
                                      "&:hover": {
                                        border: "1px solid purple",
                                      },
                                    }),
                                  },
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Experience From
                              </InputLabel>
                              <Select
                                value={form.filterExperienceFrom}
                                onChange={formValueChange}
                                name="filterExperienceFrom"
                                fullWidth
                                displayEmpty
                                inputProps={{ classes: { icon: classes.icon } }}
                                input={<CustomSelectInput />}
                                MenuProps={{ classes: { paper: classes.menuPaper } }}
                              >
                                <MenuItem value="" disabled>
                                  Experience From
                                </MenuItem>
                                <MenuItem value={"0"}>0 </MenuItem>
                                <MenuItem value={"1"}>1 </MenuItem>
                                <MenuItem value={"2"}>2</MenuItem>
                                <MenuItem value={"3"}>3</MenuItem>
                                <MenuItem value={"4"}>4 </MenuItem>
                                <MenuItem value={"5"}>5 </MenuItem>
                                <MenuItem value={"6"}>6</MenuItem>
                                <MenuItem value={"7"}>7</MenuItem>
                                <MenuItem value={"8"}>8</MenuItem>
                                <MenuItem value={"9"}>9</MenuItem>
                                <MenuItem value={"10"}>10</MenuItem>
                                <MenuItem value={"11"}>11</MenuItem>
                                <MenuItem value={"12"}>12</MenuItem>
                                <MenuItem value={"13"}>13</MenuItem>
                                <MenuItem value={"14"}>14</MenuItem>
                                <MenuItem value={"15"}>15</MenuItem>
                                <MenuItem value={"16"}>16</MenuItem>
                                <MenuItem value={"17"}>17</MenuItem>
                                <MenuItem value={"18"}>18</MenuItem>
                                <MenuItem value={"19"}>19</MenuItem>
                                <MenuItem value={"20"}>20</MenuItem>
                              </Select>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>Experience To</InputLabel>
                              <Select
                                value={form.filterExperienceTo}
                                onChange={formValueChange}
                                name="filterExperienceTo"
                                fullWidth
                                displayEmpty
                                inputProps={{ classes: { icon: classes.icon } }}
                                input={<CustomSelectInput />}
                                MenuProps={{ classes: { paper: classes.menuPaper } }}
                              >
                                <MenuItem value="" disabled>
                                  Experience To
                                </MenuItem>
                                <MenuItem value={"0"}>0 </MenuItem>
                                <MenuItem value={"1"}>1 </MenuItem>
                                <MenuItem value={"2"}>2</MenuItem>
                                <MenuItem value={"3"}>3</MenuItem>
                                <MenuItem value={"4"}>4 </MenuItem>
                                <MenuItem value={"5"}>5 </MenuItem>
                                <MenuItem value={"6"}>6</MenuItem>
                                <MenuItem value={"7"}>7</MenuItem>
                                <MenuItem value={"8"}>8</MenuItem>
                                <MenuItem value={"9"}>9</MenuItem>
                                <MenuItem value={"10"}>10</MenuItem>
                                <MenuItem value={"11"}>11</MenuItem>
                                <MenuItem value={"12"}>12</MenuItem>
                                <MenuItem value={"13"}>13</MenuItem>
                                <MenuItem value={"14"}>14</MenuItem>
                                <MenuItem value={"15"}>15</MenuItem>
                                <MenuItem value={"16"}>16</MenuItem>
                                <MenuItem value={"17"}>17</MenuItem>
                                <MenuItem value={"18"}>18</MenuItem>
                                <MenuItem value={"19"}>19</MenuItem>
                                <MenuItem value={"20"}>20</MenuItem>
                              </Select>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>Salary Range (In lakhs)</InputLabel>
                              <Slider
                                name="filterSalaryRange"
                                getAriaLabel={() => "Salary range"}
                                onChange={formValueChange}
                                valueLabelDisplay="auto"
                                value={form.filterSalaryRange}
                                min={0}
                                max={99}
                                marks={[
                                  { value: 0, label: `${form.filterSalaryRange[0]}` },
                                  {
                                    value: 99,
                                    label: `${form.filterSalaryRange[1]}`,
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
                          </Grid>
                        </Grid>
                      </Box>
                    </>
                  )
                } */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "space-between", md: "flex-end" },
                  gap: 4,
                  mt: 3,
                  mb: { xs: 1, md: 5 },
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderRadius: 16,
                    px: { xs: "15%", md: 3 },
                    borderWidth: "2px !important",
                  }}
                  onClick={cancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={(event) => handleEditJob(event, "onClick")}
                  sx={{
                    borderRadius: 16,
                    px: { xs: "15%", md: 3 },
                    py: 1,
                  }}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        {openSnackBarUpdateJob && (
          <Snackbar
            open={openSnackBar}
            autoHideDuration={4000}
            onClose={handleCloseSnackBar}
          >
            <Alert
              onClose={handleCloseSnackBar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Job is updated successfully.
            </Alert>
          </Snackbar>
        )}
        {openSnackBarCloseJob && (
          <Snackbar
            open={openSnackBar}
            autoHideDuration={4000}
            onClose={handleCloseSnackBar}
          >
            <Alert
              onClose={handleCloseSnackBar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Job is closed successfully.
            </Alert>
          </Snackbar>
        )}
      </Box>
    </ShowForAccessJobPosting>
  );
}

const topSpecializations = [
  { title: "Cardiac Surgeon", year: 1994 },
  { title: "Orthopaedic Doctor", year: 1972 },
  { title: "Neonatal Surgeon", year: 1974 },
  { title: "Pediatrician", year: 2008 },
  { title: "Physician", year: 1957 },
  { title: "General Physician", year: 1993 },
  { title: "Anesthesiologist", year: 1994 },
  { title: "Gastroenterologists", year: 1966 },
  { title: "Hematologists", year: 1999 },
];
