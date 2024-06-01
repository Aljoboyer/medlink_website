import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Container,
  FormHelperText,
  Grid,
  Input,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import homeBanner from "../../../assets/images/doctors_home_banner.png";
import ProfileSnap from "../../../components/ProfileSnap/profileSnap.view";
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import Switch from '@mui/material/Switch';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { gqlquery, QUERY_LISTPROFILES } from "../../../api";
import MenuIcon from '@mui/icons-material/Menu';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

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
      }
    }
  }
});

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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 180,
  },
  icon: {
    fill: "var(--clr-blue-footer)",
  },
  root1: {
    [`& fieldset`]: {
      borderRadius: "4px 0px 0px 4px",
    },
  },
  root: {
    [`& fieldset`]: {
      borderRadius: "0px 4px 4px 0px",
    },
  },
}));

const months = [
  {
    value: 1,
    name: "January",
  },
  {
    value: 2,
    name: "February",
  },
  {
    value: 3,
    name: "March",
  },
  {
    value: 4,
    name: "April",
  },
  {
    value: 5,
    name: "May",
  },
  {
    value: 6,
    name: "June",
  },
  {
    value: 7,
    name: "July",
  },
  {
    value: 8,
    name: "August",
  },
  {
    value: 9,
    name: "September",
  },
  {
    value: 10,
    name: "October",
  },
  {
    value: 11,
    name: "November",
  },
  {
    value: 12,
    name: "December",
  },
];

const EditBasicDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location?.state?.profile;
  const [error, setError] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [errDate, setErrDate] = useState("");
  const [validPhoneNumErr, setValidPhoneNumErr] = useState("");
  const [validNameErr, setValidNameErr] = useState("");
  const [errInput, setErrInput] = useState("");
  const [phoneNumErr, setPhoneNumErr] = useState("");
  const userEmail = location?.state?.userEmail;
  const [experienceYears, setExperienceYears] = useState([]);
  const [experienceMonth, setExperienceMonth] = useState([]);
  const [salaryInLakhs, setSalaryInLakhs] = useState([]);
  let [values, setValues] = useState({
    experienceYears: "",
    experienceMonths: "",
    name: "",
    salaryLakhs: "",
    salaryThousand: "",
    phoneNumber: "",
    emailId: "",
    city: "",
    workStatus: "",
    healthCareIndustry: "",
    ResidentSurgeonFollow: "",
    otherSpeciality: "",
    healthCareIndustrySpecialty: "",
    newsLetter: false,
    activelySearching: false
  });
  let [activelySearching, setActivelySearching] = useState(true);
  const [success, setSuccess] = useState(false);
  let [addressObj, setAddressObj] = useState([]);
  const [primarySpecialization, setPrimarySpecialization] = useState(null);
  const [primarySpecializationErr, setPrimarySpecializationErr] = useState("");
  const [latlng, setLatlng] = useState({});
  const [open, setOpen] = useState(false);
  const [infoSaved, setInfoSaved] = useState(false);
  const [infoSaveFailed, setInfoSaveFailed] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [allCityLocation, setAllCityLocation] = useState([]);
  document.title = "Basic Details | MedLink Jobs";
  const [statusErr, setStatusErr] = useState("");
  const [allHealthIndustry, setAllHealthIndustry] = useState([]);
  const [allIndustrySpeciality, setAllIndustrySpeciality] = useState([]);
  const [healthCare, setHealthCare] = useState("");
  const [industrySpeciality, setIndustrySpeciality] = useState("")
  const [specialID, setSpecialID] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });

  };
  const handleChangeCheckbox = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.checked,
    });
  };
  const handleActivelySearching = (e) => {
    // setActivelySearching(event.target.checked);
    setValues({
      ...values,
      [e.target.name]: e.target.checked,
    });
  };

  const handleNavigateProfileHome = () => {
    navigate("/profile-home");
  }

  useEffect(() => {
    const GET_CITY = {
      query: `query MyQuery {
        getCityMaster {
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

    gqlquery(GET_CITY, null)
      .then((res) => res.json())
      .then((datas) => setAllCityLocation(datas?.data?.getCityMaster));
  }, [])

  useEffect(() => {
    function getYears() {
      let yearArr = [];
      for (let i = 0; i <= 55; i++) {
        yearArr.push(i);
      }
      setExperienceYears(yearArr/* .reverse() */);
    }
    getYears();

    function getMonths() {
      let monthArr = [];
      for (let i = 0; i <= 12; i++) {
        monthArr.push(i)
      }
      setExperienceMonth(monthArr)
    }
    getMonths();

    function getSalaryInLakhs() {
      let salaryInLakh = [];
      for (let i = 0; i <= 100; i++) {
        salaryInLakh.push(i);
      }
      setSalaryInLakhs(salaryInLakh);
    }
    getSalaryInLakhs();


  }, [])

  console.log(values.activelySearching);
  console.log(profile?.activelySearching);
  useEffect(() => {
    values.activelySearching = profile?.activelySearching;
    values.cityWithState = profile?.locationID;
    values.experienceYears = profile?.exp;
    values.experienceMonths = profile?.expMonths;
    values.name = profile?.name;
    values.newsLetter = profile?.newsletter;
    values.phoneNumber = profile?.phone;
    values.salaryLakhs = profile?.salary;
    values.salaryThousand = profile?.salaryThousands;
    values.emailId = userEmail;

    values.healthCareIndustry = profile?.industryID;
    values.healthCareIndustrySpecialty = profile?.specialtyID;
    values.workStatus = profile?.workStatus;
    values.ResidentSurgeonFollow = profile?.experiencedType;
    values.otherSpeciality = profile?.specialty;

    if (isNaN(Number(profile?.industry))) {
      setHealthCare(profile?.industry)
    }

    if (Number(profile?.specialtyID) < 366) {
      setIndustrySpeciality(profile?.specialty);
    }

  }, [])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
    setOpen(false);
  };

  const onlyNumbers = (e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') };

  // let resText = /^[a-zA-Z]+$/;
  let resText = /^[a-zA-Z ]*$/;
  values.name = values.name.replace(/  +/g, ' ');

  const handleEditBasicDetails = async (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (
        values.phoneNumber === "" ||
        values.phoneNumber.length !== 10 ||
        values.name === "" ||
        values.name === " " ||
        (resText.test(values.name)) === false ||
        values.emailId === "" ||
        !values.cityWithState ||
        (values?.ResidentSurgeonFollow === "Practising Physician/Surgeon" && !values?.healthCareIndustrySpecialty) ||
        (!values.otherSpeciality && industrySpeciality?.split(' ').pop() === 'Other')
      ) {
        setError("Location can't be empty.");
        setErrInput("Text field can not be empty.");
        setErrDate("Please, select an option.");
        setNameErr("Name can't be empty.");
        setPhoneNumErr("Please enter a valid mobile/phone number.");
        setValidPhoneNumErr("Phone Number is invalid.");
        setPrimarySpecializationErr("Specialization field can't be empty.");
        setValidNameErr("This field accept only Alphabets.");
        setStatusErr('Please select one');
        return;
      }

      if (values.workStatus === 'Experienced') {
        if (
          values.experienceYears === "" ||
          values.experienceMonths === "" ||
          values.salaryLakhs === "" ||
          values.salaryThousand === "" ||
          !values.cityWithState || (!values.otherSpeciality && industrySpeciality?.split(' ').pop() === 'Other') ||
          values?.otherSpeciality === " " || !values.ResidentSurgeonFollow ||
          (values?.ResidentSurgeonFollow === "Practising Physician/Surgeon" && !values?.healthCareIndustrySpecialty)
        ) {
          setError(" Please, Add your update address.");
          setErrInput("Text field can not be empty.");
          setErrDate("Please, select an option.");
          setValidPhoneNumErr("Phone Number is invalid.");
          setValidNameErr("This field accept only Alphabets.");
          setStatusErr('Please select one')
          return;
        }
      }
      console.log(values.cityWithState);
      console.log(values.cityWithState);
      const QUERY_POSTPROFILES = {
        query: `mutation MyMutation {
            updateProfile (
                activelySearching: ${values.activelySearching}, 
                locationID: ${Number(values.cityWithState)}, 
                exp: ${Number(values?.experienceYears)}, 
                expMonths: ${Number(values?.experienceMonths)}
                name: "${values?.name}", 
                newsletter: ${values.newsLetter}, 
                phone: "${values?.phoneNumber}", 
                salary: ${Number(values?.salaryLakhs)}, 
                salaryThousands: ${Number(values?.salaryThousand)},
                experiencedType: "${values?.workStatus == 'Fresher' ? "" : values?.ResidentSurgeonFollow}",
                industryID: ${values?.workStatus == 'Fresher' ? 0 : Number(values?.healthCareIndustry)},
                otherSpecialty: "${(values?.ResidentSurgeonFollow == 'Fellow' || values?.ResidentSurgeonFollow == 'Resident' || values?.workStatus == 'Fresher' || !values.otherSpeciality) ? '' : values?.otherSpeciality}",
                specialtyID: ${(values?.workStatus == 'Fresher' || values?.ResidentSurgeonFollow == 'Fellow' || values?.ResidentSurgeonFollow == 'Resident') ? 0 : Number(values.healthCareIndustrySpecialty)},
                workStatus: "${values?.workStatus}"
              ) {
                activelySearching
                locationID
                exp
                expMonths
                experiencedType
                industry
                industryID
                name
                newsletter
                otherSpecialty
                phone
                profilePicURL
                phoneVerified
                salary
                salaryThousands
                specialty
                specialtyID
                workStatus
                }
              }
            `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_POSTPROFILES, null)
        .then((res) => res.json())
        .then((datas) => {

          if (datas?.data?.updateProfile) {
            setOpen(true);
            setInfoSaved(true);
            setTimeout(handleNavigateProfileHome, 1000);
            setSuccess(true);
          }
          else {
            setOpen(true);
            setInfoSaveFailed(true);
          }
        })
      setError("");
      setErrDate("");
      setErrInput("");
      setPhoneNumErr("");
      setNameErr("");
    }

  }

  useEffect(() => {
    const GET_INDUSTRY = {
      query: ` query MyQuery {
        getHCIIndustry {
          hciID
          industry
          specialty
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };

    gqlquery(GET_INDUSTRY, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllHealthIndustry(datas?.data?.getHCIIndustry)
      });
  }, [])

  useEffect(() => {
    const GET_INDUSTRY = {
      query: ` query MyQuery {
        getHCISpecialty(industry: "${healthCare}") {
          hciID
          industry
          specialty
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };

    gqlquery(GET_INDUSTRY, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllIndustrySpeciality(datas?.data?.getHCISpecialty);
        if (Number(profile?.specialtyID) > 366) {
          setIndustrySpeciality(datas?.data?.getHCISpecialty[datas?.data?.getHCISpecialty?.length - 1]?.specialty)
        }

      });
  }, [healthCare])


  const HealthCareChange = (industry) => {
    const FindIndustry = allHealthIndustry?.find((ind) => ind?.industry === industry.target.value)

    setValues({ ...values, healthCareIndustry: FindIndustry?.hciID, healthCareIndustrySpecialty: '' })
    setHealthCare(FindIndustry?.industry)
  }

  const IndustrySpecialtyChange = (specialty) => {
    const FindSpecialty = allIndustrySpeciality?.find((ind) => ind?.specialty === specialty);

    // setValues({...values, healthCareIndustrySpecialty: FindSpecialty?.hciID});

    values.healthCareIndustrySpecialty = FindSpecialty?.hciID

    setIndustrySpeciality(FindSpecialty?.specialty)

    // console.log(FindSpecialty)
  }


  const controlStatusProps = (item) => ({
    checked: values.workStatus === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const controlResidentSurgeonFollow = (item) => ({
    checked: values.ResidentSurgeonFollow === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const SearchLocation = (event) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val

    if (event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2) {

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

      gqlquery(GET_CITY, null)
        .then((res) => res.json())
        .then((datas) => {
          setAllCityLocation([...datas?.data?.searchCity])
          // console.log('this is search data', datas)
        });
    }
    else {

      const GET_CITY = {
        query: `query MyQuery {
          getCityMaster {
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

      gqlquery(GET_CITY, null)
        .then((res) => res.json())
        .then((datas) => setAllCityLocation(datas?.data?.getCityMaster));
    }
  }


  return (
    <Box>
      {
        matches &&
        <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px", display: "flex", alignItems: "center" }}>
          <MenuIcon sx={{ color: "var(--clr-blue-footer)", mr: 3.1 }} /><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Edit Basic Details</Typography>
        </Box>
      }
      {
        matches ? (
          <Box
            sx={{ height: "110px" }}
          ></Box>
        ) : (
          <Box
            style={{
              backgroundImage: `url(${homeBanner})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            sx={{ bgcolor: "#E0E0E0", height: "240px" }}
          ></Box>
        )
      }

      <Container sx={{ mx: "auto", marginTop: matches ? "20pxpx" : "-120px" }}>
        <ProfileSnap pageType="EditBasicDetials" />
        <Box maxWidth="md" sx={{ mx: "auto", mb: 5 }}>
          <Card
            sx={{
              backgroundColor: "var(--clr-white) !important",
              boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
              border: matches ? "1px solid #E4EEF5" : "",
              borderRadius: 2,
              minHeight: 400,
              p: 2.5,
            }}
          >
            <Typography
              component="div"
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "var(--clr-blue-footer)",
                // mb: 3,
              }}
            >
              Basic Details
            </Typography>
            <Box
              sx={{
                px: 0.4,
                py: 3,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <>
                <Grid
                  container
                  direction={"row"}
                  alignItems="flex-start"
                  justifyContent={"space-between"}
                  rowSpacing={2.5}
                  columnSpacing={4}
                >
                  {/* name */}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Name<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <TextField
                        variant="outlined"
                        defaultValue={profile?.name}
                        sx={{
                          borderRadius: 1,
                          color: "var(--clr-blue-light)",
                        }}
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": {
                              padding: '10.5px 14px',
                            },
                           /*  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-light)",
                            },
                            "&:hover": {
                              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                border: "1px solid var(--clr-blue-primary)",
                              },
                            }, */
                          }
                        }}
                        size="small"
                        onChange={handleChange("name")}
                        fullWidth
                        error={values.name === "" && errInput}
                        helpertext={error}
                        placeholder="Enter Your Name"
                        disableUnderline
                      />
                      {values.name === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {nameErr}
                        </FormHelperText>
                      )}
                      {((values.name !== "") && ((values.name === " ") || ((resText.test(values.name)) === false))) && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {validNameErr}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  {/* current location */}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <div
                        style={{
                          width: "100%",
                          alignItems: "center",
                          margin: "0 auto",
                        }}
                      >
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Location<span style={{ color: "red" }}> *</span>
                          </InputLabel>

                          {/* <ThemeProvider theme={ItisThim}> */}
                            <Autocomplete
                              defaultValue={profile}
                              disablePortal
                              id="combo-box-demo"
                              sx={{
                                "& .MuiAutocomplete-inputRoot": {
                                  padding: '3px 0px 3px 7px',
                                  // border: "0.1px solid var(--clr-blue-light) !important",
                                }
                              }}
                              onChange={(event, newValue) => {
                                setValues({ ...values, cityWithState: newValue?.lmID })
                              }}
                              // defaultValue={values.institution}
                              filterSelectedOptions
                              options={allCityLocation}
                              getOptionLabel={(option) => option.cityWithState}
                              renderInput={(params) => <TextField
                                onChange={(e) => {
                                  SearchLocation(e)
                                }}
                                placeholder="Select Location"
                                {...params} />}
                            />
                          {/* </ThemeProvider> */}
                        </Box>

                      </div>
                      {!values.cityWithState && <Typography sx={{ fontSize: '12px', color: "red", mb: 1 }}>
                        {error}
                      </Typography>}
                    </Box>
                  </Grid>

                  {/* Phone number */}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Phone Number<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Grid container>
                        <Grid item xs={2} md={2}>
                          <TextField
                            variant="outlined"
                            defaultValue="+91"
                            className={classes.root1}
                            disabled
                            disableUnderline
                            sx={{
                              color: "var(--clr-blue-footer)",
                            }}
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": {
                                  padding: '10.5px 14px',
                                },
                                /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid var(--clr-blue-light)",
                                  // borderRadius: "4px 0px 0px 4px",
                                }, */
                                "&:hover": {
                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid Black",
                                    // borderRadius: "4px 0px 0px 4px",
                                  },
                                },
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={10} md={10}>
                          <TextField
                            variant="outlined"
                            defaultValue={profile?.phone}
                            className={classes.root}
                            sx={{
                              // borderRadius : 0,
                              color: "var(--clr-blue-footer)",
                            }}
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": {
                                  padding: '10.5px 14px',
                                },
                                /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid var(--clr-blue-light)",
                                  // borderRadius: "0px 4px 4px 0px",
                                },
                                "&:hover": {
                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid var(--clr-blue-primary)",
                                    // borderRadius: "0px 4px 4px 0px",
                                  },
                                }, */
                              }
                            }}
                            size="small"
                            onChange={handleChange("phoneNumber")}
                            fullWidth
                            error={values.phoneNumber === "" && errInput}
                            helpertext={error}
                            placeholder="Enter Mobile Number"
                            disableUnderline
                            required
                            inputProps={
                              { maxLength: 10 }
                            }
                            onInput={(e) => onlyNumbers(e)}
                            onKeyDown={handleEditBasicDetails}
                          />
                        </Grid>
                      </Grid>
                      {values.phoneNumber === "" && (
                        <FormHelperText sx={{ color: "red", mb: 0.5 }}>
                          {/* {errInput} */}
                          {phoneNumErr}
                        </FormHelperText>
                      )}
                      {
                        ((values.phoneNumber !== "") && (values.phoneNumber.length !== 10)) && (
                          <FormHelperText sx={{ color: "red", mb: 0.5 }}>
                            {/* {errInput} */}
                            {validPhoneNumErr}
                          </FormHelperText>
                        )
                      }
                    </Box>
                  </Grid>

                  {/* email */}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Email<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <TextField
                          variant="outlined"
                          defaultValue={userEmail}
                          sx={{
                            borderRadius: 1,
                            color: "var(--clr-blue-footer)",
                          }}
                          onChange={handleChange("emailId")}
                          fullWidth
                          error={values.emailId === "" && errInput}
                          // helpertext={error}
                          placeholder="Enter Email Address"
                          disableUnderline
                          disabled
                          InputProps={{
                           sx: {
                            ".MuiOutlinedInput-input": {
                              padding: '10.5px 14px',
                            },
                            /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-light)",
                              // borderRadius: "0px 4px 4px 0px",
                            }, */
                            "&:hover": {
                              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                border: "1px solid black",
                                // borderRadius: "0px 4px 4px 0px",
                              },
                            },
                          }
                        }}
                        size="small"
                      />
                      {/* <Input
                        variant="outlined"
                        defaultValue={userEmail}
                        sx={{
                          borderRadius: 1,
                          color: "var(--clr-blue-footer)",
                        }}
                        onChange={handleChange("emailId")}
                        fullWidth
                        error={values.emailId === "" && errInput}
                        // helpertext={error}
                        placeholder="Enter Email Address"
                        disableUnderline
                        disabled
                      /> */}
                      {values.emailId === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {errInput}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  {/* work status */}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Work Status<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <RadioGroup
                        onChange={handleChange("workStatus")}
                        onKeyDown={handleEditBasicDetails}
                        defaultValue={values?.workStatus}
                        error={error}
                        row
                        name="row-radio-buttons-gender"
                      >
                        <FormControlLabel
                          value="Fresher"
                          control={
                            <Radio
                              {...controlStatusProps("Fresher")}
                              sx={{
                                color: "var(--clr-blue-light)",
                                "&.Mui-checked": {
                                  color: "var(--clr-blue-primary)",
                                },
                              }}
                            />
                          }
                          label="Fresher"
                        />
                        <FormControlLabel
                          value="Experienced"
                          control={
                            <Radio
                              {...controlStatusProps("Experienced")}
                              sx={{
                                color: "var(--clr-blue-light)",
                                "&.Mui-checked": {
                                  color: "var(--clr-blue-primary)",
                                },
                              }}
                            />
                          }
                          label="Experienced"
                        />
                      </RadioGroup>

                      {!values.workStatus && <Typography sx={{ fontSize: '12px', color: "red", mb: 0 }}>
                        {statusErr}
                      </Typography>}
                    </Box>
                  </Grid>

                  {/*  Experience (Years)  */}
                  <Grid item direction={"column"} xs={12} md={3}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Experience (Years)
                        <span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        defaultValue={profile?.exp}
                        error={values.experienceYears === "" && errDate}
                        onChange={handleChange("experienceYears")}
                        fullWidth
                        displayEmpty
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                        inputProps={{ classes: { icon: classes.icon } }}
                        // input={<CustomSelectInput />}
                        sx={{height: "45px"}}
                      >
                        <MenuItem value="" disabled>
                          Select Year
                        </MenuItem>
                        {experienceYears?.map((year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                      {values.experienceYears === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {errDate}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  {/*  Experience (Months) */}
                  <Grid item direction={"column"} xs={12} md={3}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Experience (Months)
                        <span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        defaultValue={profile?.expMonths}
                        error={values.experienceMonth === "" && errDate}
                        onChange={handleChange("experienceMonths")}
                        fullWidth
                        displayEmpty
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                        inputProps={{ classes: { icon: classes.icon } }}
                        // input={<CustomSelectInput />}
                        sx={{height: "45px"}}
                      >
                        {experienceMonth?.map((month) => (
                          <MenuItem key={month} value={month}>
                            {month}
                          </MenuItem>
                        ))}
                      </Select>
                      {values.experienceMonth === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {errDate}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  {/* Health care Industry */}
                  {
                    values.workStatus === 'Experienced' &&
                    <Grid item direction={"column"} xs={12} md={6}>
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>
                          Healthcare Industry<span style={{ color: "red" }}> *</span>
                        </InputLabel>
                        <FormControl sx={{ fontSize: '15px', width: '100%', outline: 'none', border: 'none', borderColor: '#E4EEF5' }} >
                          <Select
                            defaultValue={healthCare}
                            onChange={HealthCareChange}
                            onKeyDown={handleEditBasicDetails}
                            displayEmpty
                            fullWidth
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                            inputProps={{
                              classes: {
                                icon: classes.icon,
                              },
                            }}
                            // input={<CustomSelectInput />}
                            sx={{height: "45px"}}
                          >
                            <MenuItem disabled value="">
                              <Typography sx={{ color: '#B8BCCA', fontSize: '15px' }}>{healthCare}</Typography>
                            </MenuItem>
                            {
                              allHealthIndustry?.map((industryItem) => (
                                <MenuItem sx={{ fontSize: '15px' }} value={industryItem?.industry}>{industryItem?.industry}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                        {!values.healthCareIndustry && <Typography sx={{ fontSize: '12px', color: "red", mb: 0 }}>
                          {statusErr}
                        </Typography>}
                      </Box>
                    </Grid>

                  }

                  {/* salary in lakhs */}
                  <Grid item direction={"column"} xs={12} md={3}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Salary (Lakhs)<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        defaultValue={profile?.salary}
                        error={values.salaryLakhs === "" && errDate}
                        onChange={handleChange("salaryLakhs")}
                        fullWidth
                        displayEmpty
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                        inputProps={{ classes: { icon: classes.icon } }}
                        // input={<CustomSelectInput />}
                        sx={{height: "45px"}}
                      >
                        <MenuItem value="" disabled>
                          Salary In Lakhs
                        </MenuItem>
                        {salaryInLakhs?.map((salary) => (
                          <MenuItem key={salary} value={salary}>
                            {salary}
                          </MenuItem>
                        ))}
                      </Select>
                      {values.salaryLakhs === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {errDate}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  {/* salary in thousands */}
                  <Grid item direction={"column"} xs={12} md={3}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Salary (Thousand)
                        <span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        defaultValue={profile?.salaryThousands}
                        error={values.salaryThousand === "" && errDate}
                        onChange={handleChange("salaryThousand")}
                        fullWidth
                        displayEmpty
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                        inputProps={{ classes: { icon: classes.icon } }}
                        // input={<CustomSelectInput />}
                        sx={{height: "45px"}}
                      >
                        {salaryInLakhs?.map((salary) => (
                          <MenuItem key={salary} value={salary}>
                            {salary}
                          </MenuItem>
                        ))}
                      </Select>
                      {values.salaryThousand === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {errDate}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  {/* specailty */}

                  {
                    values.workStatus === 'Experienced' &&
                    <Grid item direction={"column"} xs={12} md={6}>
                      <Box>

                        <RadioGroup
                          onChange={handleChange("ResidentSurgeonFollow")}
                          onKeyDown={handleEditBasicDetails}
                          defaultValue={values?.ResidentSurgeonFollow}
                          error={error}
                          column
                          name="row-radio-buttons-gender"
                        >
                          <FormControlLabel
                            value="Practising Physician/Surgeon"
                            control={
                              <Radio
                                {...controlResidentSurgeonFollow("Practising Physician/Surgeon")}
                                sx={{
                                  color: "var(--clr-blue-light)",
                                  "&.Mui-checked": {
                                    color: "var(--clr-blue-primary)",
                                  },
                                }}
                              />
                            }
                            label="Practising Physician/Surgeon"
                          />

                          {/* ------After choosing surgeon-------- */}

                          {
                            values?.ResidentSurgeonFollow === 'Practising Physician/Surgeon' &&
                            <FormControl sx={{ fontSize: '15px', width: '100%', outline: 'none', border: 'none', borderColor: '#E4EEF5', ml: 4, width: '93%' }} >
                              <Select
                                defaultValue={industrySpeciality}
                                onChange={(e) => {
                                  IndustrySpecialtyChange(e.target.value)

                                  if (values?.otherSpeciality) {
                                    setValues({ ...values, otherSpeciality: '' })
                                  }
                                }}
                                onKeyDown={handleEditBasicDetails}
                                displayEmpty
                                fullWidth
                                MenuProps={{ classes: { paper: classes.menuPaper } }}
                                inputProps={{
                                  classes: {
                                    icon: classes.icon,
                                  },
                                }}
                                // input={<CustomSelectInput />}
                                sx={{height: "45px"}}
                              >
                                <MenuItem disabled value="">
                                  <Typography sx={{ color: '#B8BCCA', fontSize: '15px' }}>{industrySpeciality}</Typography>
                                </MenuItem>
                                {
                                  allIndustrySpeciality?.map((industryItem) => (
                                    <MenuItem sx={{ fontSize: '15px' }} value={industryItem?.specialty}>{industryItem?.specialty}</MenuItem>
                                  ))
                                }
                              </Select>
                              {!values?.healthCareIndustrySpecialty && <Typography sx={{ fontSize: '12px', color: "red", mb: 0 }}>
                                {statusErr}
                              </Typography>}
                            </FormControl>
                          }

                          {((industrySpeciality?.split(' ').pop() === 'Other' && values?.ResidentSurgeonFollow === 'Practising Physician/Surgeon') || (Number(values?.healthCareIndustrySpecialty) > 366 && values?.ResidentSurgeonFollow === 'Practising Physician/Surgeon')) &&
                            <>
                              <Input
                                sx={{
                                  borderRadius: 1,
                                  color: "var(--clr-blue-footer)",
                                  fontSize: "14px",
                                  ml: 4,
                                  mt: 2,
                                  width: '93%'
                                }}
                                disableUnderline
                                fullWidth
                                // error ={name === "" &&  error}
                                type="text"
                                onChange={(e) => setValues({ ...values, otherSpeciality: e.target.value })}
                                defaultValue={values.otherSpeciality}
                              />
                              {!values?.otherSpeciality && industrySpeciality?.split(' ').pop() === 'Other' && <Typography sx={{ fontSize: '12px', color: "red", mb: 0, ml: 4, pt: 1 }}>
                                {errInput}
                              </Typography>}

                              {values?.otherSpeciality === " " && <Typography sx={{ fontSize: '12px', color: "red", mb: 0, ml: 4, pt: 1 }}>
                                {errInput}
                              </Typography>}
                            </>
                          }

                          <FormControlLabel
                            value="Resident"
                            control={
                              <Radio
                                {...controlResidentSurgeonFollow("Resident")}
                                sx={{
                                  color: "var(--clr-blue-light)",
                                  "&.Mui-checked": {
                                    color: "var(--clr-blue-primary)",
                                  },
                                }}
                              />
                            }
                            label="Resident"
                          />

                          <FormControlLabel
                            value="Fellow"
                            control={
                              <Radio
                                {...controlResidentSurgeonFollow("Fellow")}
                                sx={{
                                  color: "var(--clr-blue-light)",
                                  "&.Mui-checked": {
                                    color: "var(--clr-blue-primary)",
                                  },
                                }}
                              />
                            }
                            label="Fellow"
                          />
                        </RadioGroup>

                        {!values.ResidentSurgeonFollow && <Typography sx={{ fontSize: '12px', color: "red", mb: 0 }}>
                          {statusErr}
                        </Typography>}
                      </Box>
                    </Grid>
                  }

                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Actively Searching
                        <span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      No
                      <Switch
                        defaultChecked={profile?.activelySearching}
                        onChange={(e) => handleActivelySearching(e)}
                        name="activelySearching"
                        inputProps={{ "aria-label": "controlled" }}
                        size="small"
                      />
                      <span style={{ marginLeft: "0" }}> Yes</span>
                      {/* {activelySearching === "" && (
                                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                  {errInput}
                                              </FormHelperText>
                                          )} */}
                    </Box>
                    <Box>
                      <Box sx={{ mt: 1.8 }}>
                        <Typography
                          sx={{
                            fontSize: !matches ? "16px" : "14px",
                            color: "var(--clr-gray-2)",
                            fontWeight: 600,
                            letterSpacing: 0
                          }}
                        >
                          <Checkbox
                            sx={{
                              ml: -1.4,
                              color: "#BDBDBD",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                            type="checkbox"
                            checked={values.newsLetter}
                            name="newsLetter"
                            onChange={(e) => handleChangeCheckbox(e)}
                            onKeyDown={handleEditBasicDetails}
                          />
                          Subscribe to our Newsletter
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* {activelySearching === "" && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {errInput}
                          </FormHelperText>
                      )} */}
                </Grid>
                <Grid item direction={"column"} xs={12} md={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 3,
                      mt: 0,
                      mb: 2.5,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/profile-home")}
                      sx={{
                        borderRadius: 16,
                        borderWidth: "2px !important",
                        px: 2,
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 16,
                        borderWidth: "2px",
                        px: 2,
                        py: 1,
                      }}
                      onClick={(event) => handleEditBasicDetails(event, "onClick")}
                    >
                      Update
                    </Button>
                  </Box>
                </Grid>
                {success && (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Basic details has been updated successfully!
                    </Alert>
                  </Snackbar>
                )}
              </>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default EditBasicDetails;

