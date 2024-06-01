import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  FormHelperText,
  Grid,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Slider,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import {
  createTheme,
  styled,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import {
  gqlOpenQuery,
  gqlquery,
  QUERY_GETACTIVESUBSCRIPTIONS,
  QUERY_GETQUALIFICATIONS,
  QUERY_GETSPECIALIZATION,
} from "../../api/hospitalIndex.js";
import doubleArrowIcon from "../../assets/icons/doubleArrow.svg";
import useAuth from "../../hooks/useAuth";
import ToastTitle from "../ToastTitle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PostJobSkeleton from "./PostJob.skeleton.jsx";

// AccessJob posting
export const ShowForAccessJobPosting = (props) => {
  const { getUserRole, permitUser, isLoading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    return <PostJobSkeleton />;
  }
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

const ItisThim = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          borderColor: "var(--clr-blue-light)",
          "&: .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--clr-blue-light)",
            color: "var(--clr-blue-footer)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--clr-blue-primary)",
          },
        },
      },
    },
  },
});

const selectPlaceholderStyles = makeStyles((theme) => ({
  placeholder: {
    color: "#B8BCCA",
  },
}));

const SelectPlaceholder = ({ children }) => {
  const classes = selectPlaceholderStyles();
  return <div className={classes.placeholder}>{children}</div>;
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "700px",
  bgcolor: "white",
  border: "1px solid rgba(69, 143, 246, 0.5)",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

const modalResponsiveStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "white",
  border: "1px solid rgba(69, 143, 246, 0.5)",
  boxShadow: 24,
  p: 2.3,
  borderRadius: 2,
};

const PostJob = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [inputErr, setInputErr] = useState("");
  const [form, setForm] = useState({
    jobTitle: "",
    location: "",
    qualification: "",
    employmentType: "",
    primarySpecialization: "",
    secondarySpecialization: "",
    lastDateToApply: null,
    experience: "",
    description: "",
    salaryRange: [1, 99],
  });
  const [primarySpecialization, setPrimarySpecialization] = useState(null);
  const [secondarySpecialization, setSecondarySpecialization] = useState(null);
  const [activeSubscription, setActiveSubscription] = useState([]);
  const [getQualifications, setGetQualifications] = useState([]);
  const [getSpecialization, setGetSpecialization] = useState([]);
  const [cityLocation, setCityLocation] = useState("");
  const [allCityLocation, setAllCityLocation] = useState([]);
  const [expError, setExpError] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  let [dateError, setDateError] = useState("");
  const [errDate, setErrDate] = useState("");
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  document.title = "Post A Job | MedLink Jobs";
  const CHARACTER_LIMIT = 1500;
  let today = new Date();

  let g1 = new Date(today);  
  // (YYYY, MM, DD, Hr, Min, Sec)
  let g2 = new Date(form.lastDateToApply);

  /* console.log("g1 get", g1.getTime());
  console.log("g2 get", g2.getTime());
  if (g1.getTime() < g2.getTime()){
      console.log("g1 is lesser than g2");
  }
  else if (g1.getTime() > g2.getTime()){
      console.log("g1 is greater than g2");
  }
  else {
      console.log("both are equal");
  } */

  let dateTodayYear = today?.getFullYear();
  let dateTodayMonth = String(today.getMonth() + 1).padStart(2, "0");
  let dateTodayDate = String(today.getDate()).padStart(2, "0");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleModalOpen = () => {
    if (
      form.jobTitle === "" ||
      form.jobTitle === " " ||
      resText.test(form.jobTitle) === false ||
      form.description === "" ||
      form.qualification === "" ||
      form.employmentType === "" ||
      form.experience === "" ||
      Number(form.experience) >= 56 ||
      form.lastDateToApply === "" ||
      form.salaryRange[0] === 0 ||
      (g1.getTime() > g2.getTime()) ||
      // form.salaryRange[1] === 99 ||
      // form.primarySpecialization === "" ||
      // form.secondarySpecialization === "" ||
      primarySpecialization === null ||
      primarySpecialization?.length === 0 ||
      secondarySpecialization === null ||
      secondarySpecialization?.length === 0 ||
      form.lastDateToApply === null ||
      isNaN(form.lastDateToApply) ||
      cityLocation?.lmID === undefined
    ) {
      setInputErr("This field can't be empty.");
      setError("This field accept only Alphabets.");
      setExpError("Experience should be less than 56 years.");
      setErrDate("Please, select a valid date.");
      setDateError(
        `Please select date after ${dateTodayDate}/${dateTodayMonth}/${dateTodayYear}`
      );
      return;
    }
    setOpenModal(true);
  };
  const handleModalClose = () => setOpenModal(false);

  useEffect(() => {
    gqlquery(QUERY_GETACTIVESUBSCRIPTIONS, null)
      .then((res) => res.json())
      .then((data) => {
        setActiveSubscription(data?.data?.getActiveSubscriptions);
      })
      .finally(() => setInitialLoading(false));
  }, []);

  useEffect(() => {
    gqlquery(QUERY_GETQUALIFICATIONS, null)
      .then((res) => res.json())
      .then((data) => setGetQualifications(data?.data?.getQualifications))
      .finally(() => setInitialLoading(false));
  }, []);

  useEffect(() => {
    gqlquery(QUERY_GETSPECIALIZATION, null)
      .then((res) => res.json())
      .then((data) => setGetSpecialization(data?.data?.getSpecialization))
      .finally(() => setInitialLoading(false));
  }, []);

  // console.log("primarySpecialization", primarySpecialization);
  // console.log("secondarySpecialization", secondarySpecialization);
  let primarySpecializationIDs = primarySpecialization?.map(
    (specialization) => specialization.emID
  );
  let secondarySpecializationIDs = secondarySpecialization?.map(
    (specialization) => specialization.emID
  );
  let primary = primarySpecializationIDs?.toString();
  let secondary = secondarySpecializationIDs?.toString();
  // console.log(primary);
  // console.log(secondary);

  const accessJobPostingObj = activeSubscription?.find(
    (aS) => aS?.type === "JobPosting"
  );

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
      handleCreate(event);
      return;
    }
  };

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

  const onlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };
  // let resText = /^[a-zA-Z]+$/;
  let resText = /^[a-zA-Z ]*$/;
  form.jobTitle = form.jobTitle.replace(/  +/g, " ");

  const handleCreate = (event, from) => {
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
        (g1.getTime() > g2.getTime()) ||
        form.lastDateToApply === null ||
        isNaN(form.lastDateToApply) ||
        form.lastDateToApply === "" ||
        form.salaryRange[0] === 0 ||
        primarySpecialization === null ||
        primarySpecialization?.length === 0 ||
        secondarySpecialization === null ||
        secondarySpecialization?.length === 0 ||
        cityLocation?.lmID === undefined
      ) {
        setInputErr("This field can't be empty.");
        setError("This field accept only Alphabets.");
        setExpError("Experience should be less than 56 years.");
        setErrDate("Please, select a valid date.");
        setDateError(
          `Please select date after ${dateTodayDate}/${dateTodayMonth}/${dateTodayYear}`
        );
        return;
      }

      let newDescription = form.description?.replaceAll("\n", "<br />");
      const QUERY_POSTJOB = {
        query: `mutation MyMutation {
                        postAJob  (
                            description: "${newDescription}", 
                            employmentType: "${form.employmentType}", 
                            experience: ${Number(form.experience)},
                            jobTitle: "${form.jobTitle}", 
                            lastDateToApply: "${form.lastDateToApply
                              .toISOString()
                              .slice(0, 10)}", 
                            locationID: ${Number(cityLocation?.lmID)}, 
                            maximumSalary: ${Number(form.salaryRange[1])},
                            minimumSalary: ${Number(form.salaryRange[0])}, 
                            qualificationID: ${form.qualification},
                            primarySpecializationIDs: "${primary}", 
                            secondarySpecializationIDs: "${secondary}"
                            ) 
                        }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_POSTJOB, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.postAJob === "Inserted") {
            setOpen(true);
            setTimeout(() => {
              navigate("/manage-jobs-and-responses");
            }, 1500);
          } else {
            console.log("The operation was not successful.");
          }
        })
        .finally((e) => console.log("post a new job!"));

      // setTimeout(handleNavigate, 1500);
      setError("");
      setInputErr("");
    }
  };

  if (!initialLoading) {
    return (
      <ShowForAccessJobPosting>
        <>
          {matches && (
            <Box
              sx={{
                backgroundColor: "var(--clr-blue-light)",
                padding: "15px 0 15px 17px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowBackIosNewIcon
                sx={{ color: "var(--clr-blue-footer)", mr: 3.1 }}
              />
              <Typography
                variant="h6"
                sx={{
                  lineHeight: "24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--clr-blue-footer)",
                }}
              >
                Post A Job
              </Typography>
            </Box>
          )}
        </>
        <Container maxWidth="xl" sx={{ mx: "auto", mb: 6 }}>
          {accessJobPostingObj?.validUpto >=
            new Date().toISOString().slice(0, 10) &&
          accessJobPostingObj?.creditsLeft > 0 ? (
            <Box sx={{ px: !matches ? 3 : 0 }}>
              {!matches && (
                <Box>
                  <Breadcrumbs
                    separator={
                      <NavigateNextIcon
                        fontSize="small"
                        sx={{ color: "var(--clr-blue-footer)" }}
                      />
                    }
                    aria-label="breadcrumb"
                    sx={{ mt: !matches ? 2 : 1.25, mb: !matches ? 3 : 1.25 }}
                  >
                    <Link
                      underline="hover"
                      style={{
                        color: "var(--clr-blue-footer)",
                        fontSize: matches && "12px",
                      }}
                      to="/hospital-dashboard"
                    >
                      Dashboard
                    </Link>
                    <Typography
                      sx={{
                        color: "var(--clr-blue-footer)",
                        fontSize: matches && "12px",
                      }}
                    >
                      Post Job
                    </Typography>
                  </Breadcrumbs>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: "var(--clr-blue-footer)",
                      mb: 2,
                      fontSize: matches && "16px",
                    }}
                  >
                    Post A Job
                  </Typography>
                </Box>
              )}
              <Grid container spacing={2}>
                <Grid item sx={{ mt: matches ? 1.25 : 0 }} xs={12} md={8}>
                  <Box
                    sx={{
                      backgroundColor: "var(--clr-white)",
                      borderRadius: 2,
                      boxShadow: matches
                        ? "none"
                        : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                      border: matches ? "1px solid #E4EEF5" : "",
                      display: "flex",
                      flexDirection: "column",
                      py: !matches ? 2 : 1.3,
                      px: !matches ? 5 : 1.25,
                    }}
                  >
                    <Grid
                      container
                      rowSpacing={!matches ? 3 : 1.25}
                      columnSpacing={8}
                    >
                      <Grid item xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Job Title <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            variant="outlined"
                            name="jobTitle"
                            type="text"
                            placeholder="Enter Job Title"
                            value={form.jobTitle}
                            onChange={formValueChange}
                            onKeyDown={handleCreate}
                            required
                            fullWidth
                            disableUnderline
                            sx={{ borderRadius: 1 }}
                            inputProps={{
                              maxLength: 100,
                              style: {
                                padding: "10.5px 14px",
                              },
                            }}
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
                                {error}
                              </FormHelperText>
                            )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box style={{ width: "100%" }}>
                          <InputLabel sx={{ py: 0.5 }}>
                            Location <span style={{ color: "red" }}>*</span>
                          </InputLabel>
                          {/* <ThemeProvider theme={ItisThim}> */}
                            <Autocomplete
                              disablePortal
                              noOptionsText={"Start typing"}
                              id="combo-box-demo"
                              sx={{
                                "& .MuiAutocomplete-inputRoot": {
                                  padding: "3px 9px  !important",
                                  borderRadius: "4px",
                                },
                                width: "100%",
                                borderRadius: "4px",
                                backgroundColor: "white",
                                // border: "1px solid rgba(69, 143, 246, 0.5) !important",
                              }}
                              onChange={(event, newValue) => {
                                setCityLocation(newValue);
                              }}
                              onKeyDown={handleCreate}
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
                            />
                          {/* </ThemeProvider> */}
                          {cityLocation?.lmID === undefined && (
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
                            Qualification{" "}
                            <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Select
                            value={form.qualification}
                            onChange={formValueChange}
                            onKeyDown={handleCreate}
                            name="qualification"
                            required
                            fullWidth
                            displayEmpty
                            renderValue={
                              form.qualification !== ""
                                ? undefined
                                : () => (
                                    <SelectPlaceholder>
                                      Select Qualification
                                    </SelectPlaceholder>
                                  )
                            }
                            inputProps={{ classes: { icon: classes.icon } }}
                            // input={<CustomSelectInput />}
                            sx={{height: "44px"}}
                            MenuProps={{
                              classes: { paper: classes.menuPaper },
                            }}
                          >
                            <MenuItem value={""} disabled>
                              Select Qualification
                            </MenuItem>
                            {getQualifications?.map((allQualification) => (
                              <MenuItem
                                key={allQualification?.emID}
                                value={Number(allQualification.emID)}
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
                            Employment Type{" "}
                            <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Select
                            value={form.employmentType}
                            onChange={formValueChange}
                            onKeyDown={handleCreate}
                            renderValue={
                              form.employmentType !== ""
                                ? undefined
                                : () => (
                                    <SelectPlaceholder>
                                      Select Employment Type
                                    </SelectPlaceholder>
                                  )
                            }
                            name="employmentType"
                            required
                            fullWidth
                            displayEmpty
                            inputProps={{ classes: { icon: classes.icon } }}
                            // input={<CustomSelectInput />}
                            sx={{height: "44px"}}
                            MenuProps={{
                              classes: { paper: classes.menuPaper },
                            }}
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
                      <Grid item xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Primary Specialization
                            <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Autocomplete
                            disablePortal
                            getOptionDisabled={(option) =>
                              primarySpecialization?.length === 5
                                ? !option.disabled
                                : false
                            }
                            id="combo-box-demo"
                            sx={{
                              "& .MuiAutocomplete-inputRoot": {
                                padding: "6.5px 0px 6.5px 7px",
                                // border: "0.1px solid var(--clr-blue-light) !important",
                              },
                            }}
                            onChange={(event, newValue) => {
                              setPrimarySpecialization(newValue);
                            }}
                            filterSelectedOptions
                            multiple
                            onKeyDown={(event) => handleCreate(event)}
                            options={getSpecialization}
                            getOptionLabel={(option) => option?.specialization}
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                {...params}
                                sx={{
                                  svg: { color: "var(--clr-blue-footer)" },
                                  input: {
                                    color: "var(--clr-blue-footer)",
                                    padding: "4px 9px !important",
                                  },
                                }}
                                variant="outlined"
                                placeholder="Select Primary Specializations"
                              />
                            )}
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
                            <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Autocomplete
                            disablePortal
                            getOptionDisabled={(option) =>
                              secondarySpecialization?.length === 5
                                ? !option.disabled
                                : false
                            }
                            id="combo-box-demo"
                            sx={{
                              "& .MuiAutocomplete-inputRoot": {
                                padding: "6.5px 0px 6.5px 7px",
                                // border: "0.1px solid var(--clr-blue-light) !important",
                              },
                            }}
                            onChange={(event, newValue) => {
                              setSecondarySpecialization(newValue);
                            }}
                            filterSelectedOptions
                            multiple
                            onKeyDown={(event) => handleCreate(event)}
                            options={getSpecialization}
                            getOptionLabel={(option) => option?.specialization}
                            renderInput={(params) => (
                              <TextField
                                fullWidth
                                {...params}
                                sx={{
                                  svg: { color: "var(--clr-blue-footer)" },
                                  input: {
                                    color: "var(--clr-blue-footer)",
                                    padding: "4px 9px !important",
                                  },
                                }}
                                variant="outlined"
                                placeholder="Select Secondary Specializations"
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
                            Experience <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            name="experience"
                            type="text"
                            variant="outlined"
                            placeholder="Enter Year"
                            value={form.experience}
                            onChange={formValueChange}
                            onKeyDown={handleCreate}
                            fullWidth
                            disableUnderline
                            sx={{ borderRadius: 1 }}
                            inputProps={{
                              maxLength: 2,
                              style: {
                                padding: "10.5px 14px",
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
                          {form.experience !== "" &&
                            Number(form.experience) >= 56 && (
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
                              minDate={today?.setDate(today?.getDate() + 1)}
                              onChange={(value) => {
                                formValueChange({
                                  target: {
                                    name: "lastDateToApply",
                                    value: new Date(value),
                                  },
                                });
                              }}
                              onKeyDown={handleCreate}
                              renderInput={(params) => (
                                <TextField
                                  fullWidth
                                  onKeyDown={handleCreate}
                                  sx={{
                                    svg: { color: "var(--clr-blue-footer)" },
                                    input: {
                                      color: "var(--clr-blue-footer)",
                                      padding: "10.5px",
                                    },
                                    // border: { color: "var(--clr-blue-light)" },
                                  }}
                                  {...params}
                                />
                              )}
                            />
                          </LocalizationProvider>
                          {(g1.getTime() > g2.getTime())  && form.lastDateToApply !== null  && (
                            <FormHelperText
                              sx={{
                                color: "red",
                                mb: 0,
                                textAlign: "left",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }}
                            >
                              {dateError}
                            </FormHelperText>
                          )}
                          {form.lastDateToApply !== null &&
                            isNaN(form.lastDateToApply) && (
                              <FormHelperText
                                sx={{
                                  color: "red",
                                  mb: 0,
                                  textAlign: "left",
                                  alignItems: "flex-start",
                                  justifyContent: "flex-start",
                                }}
                              >
                                {errDate}
                              </FormHelperText>
                            )}
                          {form.lastDateToApply === null && (
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

                      <Grid item xs={12}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Job Description{" "}
                            <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            name="description"
                            type="text"
                            variant="outlined"
                            placeholder="Enter Full Job Description"
                            multiline
                            rows={5}
                            value={form.description}
                            onChange={formValueChange}
                            onKeyDown={handleKeyDown}
                            sx={{ borderRadius: 1 }}
                            fullWidth
                            disableUnderline
                            inputProps={{
                              maxlength: CHARACTER_LIMIT,
                            }}
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
                              form?.description?.replaceAll("<br />", "\n")
                                ?.length
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
                          <Box sx={{ px: matches && 1 }}>
                            <Slider
                              name="salaryRange"
                              getAriaLabel={() => "Salary range"}
                              onChange={formValueChange}
                              onKeyDown={handleCreate}
                              valueLabelDisplay="auto"
                              value={form.salaryRange}
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
                          </Box>
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
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: !matches ? 4 : 1.5,
                            mt: !matches ? 3 : 2.5,
                            mb: !matches ? 6 : 2.5,
                          }}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            fullWidth={matches && true}
                            sx={{ borderRadius: 16, px: 3 }}
                            onClick={() => navigate(-1)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            fullWidth={matches && true}
                            onClick={handleModalOpen}
                            sx={{
                              borderRadius: 16,
                              px: 3,
                              py: 1,
                            }}
                          >
                            Post Job
                          </Button>
                          {/* <Button
                            variant="contained"
                            fullWidth={matches && true}
                            onClick={(event) => handleCreate(event, "onClick")}
                            sx={{
                              borderRadius: 16,
                              px: 3,
                              py: 1,
                            }}
                          >
                            Create
                          </Button> */}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                {/* if matches with web version then showing this grid */}
                {!matches && (
                  <>
                    {/* side tips on the right side */}
                    <Grid item xs={12} md={4}>
                      <Box
                        sx={{
                          p: 3,
                          backgroundColor: "var(--clr-white)",
                          borderRadius: 2,
                          boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                          border: "1px solid #E4EEF5",
                        }}
                      >
                        <Box sx={{ p: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "18px",
                              fontWeight: 700,
                              color: "var(--clr-blue-footer)",
                            }}
                          >
                            TIPS
                          </Typography>
                        </Box>
                        <Divider sx={{ color: "#E0E0E0" }} />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            mt: 2,
                            p: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </>
                )}

                {/* if matches with tablet and mobile version then showing this grid */}
                {matches && (
                  <>
                    {/* side tips on the right side */}
                    <Grid item sx={{ mt: matches ? 1.25 : 0 }} xs={12} md={4}>
                      <Box
                        sx={{
                          p: !matches ? 3 : 1.25,
                          backgroundColor: "var(--clr-white)",
                          borderRadius: 2,
                          border: "1px solid #E4EEF5",
                        }}
                      >
                        <Box sx={{ pb: 1.25 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: "18px",
                              fontWeight: 700,
                              color: "var(--clr-blue-footer)",
                            }}
                          >
                            TIPS
                          </Typography>
                        </Box>
                        <Divider sx={{ color: "#E0E0E0" }} />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            p: 1.25,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <img src={doubleArrowIcon} alt="Arrow_Icon" />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ color: "var(--clr-gray-2)" }}
                            >
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Venenatis neque consequat gravida et est.
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>

              {/* confirmation modal  */}
              <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={matches ? modalResponsiveStyle : modalStyle}>
                  <Typography
                    sx={{
                      fontSize: matches ? "18px" : "24px",
                      fontWeight: "600",
                      color: "#395987",
                    }}
                  >
                    Publish Job
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: matches ? "12px" : "15px",
                      fontWeight: "500",
                      color: "#6F7482",
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    Once the job is posted recruiter can edit/update only the
                    job description. Make sure you review the job post before
                    publishing it.
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: !matches ? 4 : 1.5,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth={matches && true}
                      sx={{ borderRadius: 16, px: 3 }}
                      onClick={handleModalClose}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      fullWidth={matches && true}
                      onClick={(event) => handleCreate(event, "onClick")}
                      sx={{
                        borderRadius: 16,
                        px: 3,
                        py: 1,
                      }}
                    >
                      Publish
                    </Button>
                  </Box>
                </Box>
              </Modal>

              <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Job is submitted successfully.
                </Alert>
              </Snackbar>
            </Box>
          ) : (
            <ToastTitle />
          )}
        </Container>
      </ShowForAccessJobPosting>
    );
  } else {
    return <PostJobSkeleton />;
  }
};

export default PostJob;
