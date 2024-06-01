import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Breadcrumbs,
  Slider,
  FormHelperText,
  InputLabel,
  InputBase,
  Divider,
  useMediaQuery,
  Modal,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
import {
  gqlOpenQuery,
  gqlquery,
  QUERY_GETACTIVESUBSCRIPTIONS,
  QUERY_GETQUALIFICATIONS,
  QUERY_GETSPECIALIZATION,
  // QUERY_GETHOSPITAL,
  // QUERY_GETMYPROFILE,
} from "../../api/hospitalIndex.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@material-ui/core/styles";
import {
  createTheme,
  styled,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import doubleArrowIcon from "../../assets/icons/doubleArrow.svg";
import useAuth from "../../hooks/useAuth";
import ToastTitle from "../ToastTitle/ToastTitle.view.jsx";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CreateVacancySkeleton from "./CreateVacancy.skeleton.jsx";

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
    return <CreateVacancySkeleton />;
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
      outline: "2px solid #2684FF",
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

const CreateVacancy = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    jobTitle: "",
    location: "",
    qualification: "",
    employmentType: "",
    experience: "",
    lastDateToApply: null,
    description: "",
    salaryRange: [1, 99],
    filterKeyword: "",
    filterLocation: "",
    filterExperienceFrom: "",
    filterExperienceTo: "",
    filterSalaryRange: [1, 99],
  });
  const [inputErr, setInputErr] = useState("");
  const [expError, setExpError] = useState("");
  const [validKeywordsErr, setValidKeywordsErr] = useState("");
  const [primarySpecialization, setPrimarySpecialization] = useState(null);
  const [secondarySpecialization, setSecondarySpecialization] = useState(null);
  const [activeSubscription, setActiveSubscription] = useState([]);
  const [getQualifications, setGetQualifications] = useState([]);
  const [getSpecialization, setGetSpecialization] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [cityLocation, setCityLocation] = useState("");
  let [dateError, setDateError] = useState("");
  const [errDate, setErrDate] = useState("");
  const [allCityLocation, setAllCityLocation] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  document.title = "Create Hot Vacancy | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const CHARACTER_LIMIT = 5000;
  const today = new Date();

  let g1 = new Date(today);  
  // (YYYY, MM, DD, Hr, Min, Sec)
  let g2 = new Date(form.lastDateToApply);

  let dateTodayYear = today?.getFullYear();
  let dateTodayMonth = String(today?.getMonth() + 1)?.padStart(2, "0");
  let dateTodayDate = String(today?.getDate())?.padStart(2, "0");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e?.target?.name] = e?.target?.value;
      return __form;
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleModalOpen = () => {
    if (
      form.jobTitle === "" ||
      form.jobTitle === " " ||
      resText.test(form.jobTitle) === false ||
      cityLocation?.lmID === undefined ||
      form.description === "" ||
      form.qualification === "" ||
      form.employmentType === "" ||
      form.experience === "" ||
      (g1.getTime() > g2.getTime()) ||
      Number(form.experience) >= 56 ||
      primarySpecialization === null ||
      primarySpecialization?.length === 0 ||
      secondarySpecialization === null ||
      secondarySpecialization?.length === 0 ||
      form.lastDateToApply === null ||
      isNaN(form.lastDateToApply) ||
      form.salaryRange[0] === 0
    ) {
      setInputErr("This field can't be empty.");
      setValidKeywordsErr("This field accept only Alphabets.");
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

  let primarySpecializationIDs = primarySpecialization?.map(
    (specialization) => specialization.emID
  );
  let secondarySpecializationIDs = secondarySpecialization?.map(
    (specialization) => specialization.emID
  );
  let primary = primarySpecializationIDs?.toString();
  let secondary = secondarySpecializationIDs?.toString();

  const accessHotJobObj = activeSubscription?.find(
    (aS) => aS?.type === "HotVacancy"
  );

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
        });
    }
  };

  const onlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };
  // let resText = /^[a-zA-Z]+$/;
  let resText = /^[a-zA-Z ]*$/;
  form.filterKeyword = form.filterKeyword.replace(/  +/g, " ");
  form.jobTitle = form.jobTitle.replace(/  +/g, " ");

  const handleCreate = (event, from) => {
    if (from === "onClick" || event.key === "Enter") {
      if (
        form.jobTitle === "" ||
        form.jobTitle === " " ||
        resText.test(form.jobTitle) === false ||
        cityLocation?.lmID === undefined ||
        form.description === "" ||
        form.qualification === "" ||
        form.employmentType === "" ||
        form.experience === "" ||
        (g1.getTime() > g2.getTime()) ||
        Number(form.experience) >= 56 ||
        primarySpecialization === null ||
        primarySpecialization?.length === 0 ||
        secondarySpecialization === null ||
        secondarySpecialization?.length === 0 ||
        form.lastDateToApply === null ||
        isNaN(form.lastDateToApply) ||
        form.salaryRange[0] === 0
      ) {
        setInputErr("This field can't be empty.");
        setValidKeywordsErr("This field accept only Alphabets.");
        setExpError("Experience should be less than 56 years.");
        setErrDate("Please, select a valid date.");
        setDateError(
          `Please select date after ${dateTodayDate}/${dateTodayMonth}/${dateTodayYear}`
        );
        return;
      }

      let newDescription = form.description?.replaceAll("\n", "<br />");
      const QUERY_CREATEHOTVACANCY = {
        query: `mutation MyMutation {
                       createHotVacancy(
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

      gqlquery(QUERY_CREATEHOTVACANCY, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.createHotVacancy === "Inserted") {
            navigate("/manage-jobs-and-responses");
          }
        })
        .finally((e) => console.log("create a new hot vacancy!"));
      setOpen(true);
      setInputErr("");
      setValidKeywordsErr("");
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
                Create Hot Vacancy
              </Typography>
            </Box>
          )}
        </>
        <Container maxWidth="xl" sx={{ mx: "auto", mb: 8 }}>
          {accessHotJobObj?.validUpto >=
            new Date().toISOString().slice(0, 10) &&
          accessHotJobObj?.creditsLeft > 0 ? (
            <Box sx={{ px: !matches ? 3 : 0 }}>
              {!matches && (
                <Box>
                  <Breadcrumbs
                    separator={
                      <NavigateNextIcon
                        fontSize="small"
                        sx={{ color: "var(--blue-footer)" }}
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
                      Hot Vacancy
                    </Typography>
                  </Breadcrumbs>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: "var(--clr-blue-footer)",
                      fontSize: matches && "16px",
                      mb: 2,
                    }}
                  >
                    Create Hot Vacancy
                  </Typography>
                </Box>
              )}
              <Grid container spacing={!matches ? 2 : 3.5}>
                <Grid item sx={{ mt: matches ? 1.25 : 0 }} xs={12} md={8}>
                  {/*  create hot vacancy  */}
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
                            Job Title <span style={{ color: "red" }}>*</span>
                          </InputLabel>
                          <TextField
                            disableUnderline
                            fullWidth
                            variant="outlined"
                            name="jobTitle"
                            type="text"
                            placeholder="Enter Job Title"
                            value={form.jobTitle}
                            onChange={formValueChange}
                            onKeyDown={handleCreate}
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
                                {validKeywordsErr}
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
                            <span style={{ color: "red" }}>*</span>
                          </InputLabel>
                          <Select
                            value={form.qualification}
                            onChange={formValueChange}
                            onKeyDown={handleCreate}
                            renderValue={
                              form.qualification !== ""
                                ? undefined
                                : () => (
                                    <SelectPlaceholder>
                                      Select Qualification
                                    </SelectPlaceholder>
                                  )
                            }
                            name="qualification"
                            fullWidth
                            displayEmpty
                            inputProps={{ classes: { icon: classes.icon } }}
                            // input={<CustomSelectInput />}
                            sx={{height: "44px"}}
                            MenuProps={{
                              classes: { paper: classes.menuPaper },
                            }}
                          >
                            <MenuItem value="" disabled select>
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
                            <span style={{ color: "red" }}>*</span>
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
                            Experience <span>(In Year)</span>&nbsp;
                            <span style={{ color: "red" }}>*</span>
                          </InputLabel>
                          <TextField
                            name="experience"
                            type="text"
                            variant="outlined"
                            placeholder="Enter Year"
                            value={form.experience}
                            onChange={formValueChange}
                            onKeyDown={handleCreate}
                            sx={{ borderRadius: 1 }}
                            fullWidth
                            disableUnderline
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
                              disablePast
                              value={form.lastDateToApply}
                              minDate={today?.setDate(today?.getDate() + 1)}
                              onChange={(value) => {
                                formValueChange({
                                  target: {
                                    name: "lastDateToApply",
                                    value: new Date(value),
                                  },
                                });
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
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
                                />
                              )}
                            />
                          </LocalizationProvider>
                          {(g1.getTime() > g2.getTime()) && form.lastDateToApply !== null && (
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
                            <span style={{ color: "red" }}>*</span>
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
                            <span style={{ color: "red" }}>*</span>
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
                    </Grid>
                    {/* {
                      !matches && <Divider sx={{ my: 4, color: "#E0E0E0" }} />
                    } */}

                    {/* set job response filter  */}
                    <Box>
                      {/* <Typography
                        variant="h6"
                        sx={{
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "var(--clr-blue-footer)",
                          mt: !matches ? 4 : 3.75,
                          mb: !matches ? 4 : 1.25
                        }}
                      >
                        Set Response Filters
                      </Typography> */}
                      {matches && (
                        <Divider sx={{ mb: 1.25, color: "#E0E0E0" }} />
                      )}
                      <Grid
                        container
                        rowSpacing={!matches ? 3 : 1.25}
                        columnSpacing={8}
                      >
                        {/* <Grid item xs={12} md={6}>
                          <Box>
                            <InputLabel sx={{ py: 0.5 }}>Keywords</InputLabel>
                            <TextField
                              variant="outlined"
                              name="filterKeyword"
                              type="text"
                              placeholder="Keywords"
                              value={form.filterKeyword}
                              onChange={formValueChange}
                              onKeyDown={handleCreate}
                              sx={{ borderRadius: 1}}
                              fullWidth
                              disableUnderline
                              inputProps={{ maxLength: 100,  
                                style: {
                                  padding: '12.5px 14px',
                                }
                              }}
                            />
                            {((form.filterKeyword !== "") && ((form.filterKeyword === " ") || ((resText.test(form.filterKeyword)) === false))) && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                This field accept only Alphabets.
                              </FormHelperText>
                            )}
                          </Box>
                        </Grid>
                        <Grid item  xs={12} md={6}>
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
                                onKeyDown: (event) => {
                                  handleCreate(event);
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
                              onKeyDown={handleCreate}
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
                              <MenuItem value={"0"}>0</MenuItem>
                              <MenuItem value={"1"}>1</MenuItem>
                              <MenuItem value={"2"}>2</MenuItem>
                              <MenuItem value={"3"}>3</MenuItem>
                              <MenuItem value={"4"}>4</MenuItem>
                              <MenuItem value={"5"}>5</MenuItem>
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
                              onKeyDown={handleCreate}
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
                            <InputLabel sx={{ py: 0.5 }}>Salary Range  (In lakhs)</InputLabel>
                            <Box  sx={{ px: matches && 1 }}>
                            <Slider
                              name="filterSalaryRange"
                              getAriaLabel={() => "Salary range"}
                              onChange={formValueChange}
                              onKeyDown={handleCreate}
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
                          </Box>
                        </Grid> */}
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
                              Post Hot Vacancy
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
                              Post Hot Vacancy
                            </Button> */}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
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
                    Publish Hot Vacancy
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
                    Once Hot Vacancy is posted recruiter can edit/update only
                    the job description. Make sure you review the Hot Vacancy
                    post before publishing it.
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
                  Hot vacancy is submitted successfully.
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
    return <CreateVacancySkeleton />;
  }
};

export default CreateVacancy;
