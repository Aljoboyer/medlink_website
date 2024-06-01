import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  // Skeleton,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  InputBase
} from "@mui/material";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import "./Signup2Form.css";
import { QUERY_LISTPROFILES, gqlquery, QUERY_GETRESUME } from "../../api/index";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import Switch from "@mui/material/Switch";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import useAuth from "../../hooks/useAuth";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@mui/material/Autocomplete';
import { styled, createTheme, ThemeProvider} from "@mui/material/styles";

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

const selectPlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#B8BCCA"
  }
}))

const SelectPlaceholder = ({children}) => {
  const classes = selectPlaceholderStyles();
  return (<div className={classes.placeholder}>{children}</div>);
}

const SignupGrid = styled(Grid)(() => ({
  backgroundColor: "var(--clr-white)",
  // boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
  borderRadius: "6px",
  // padding: "20px 39px 40px",
}));

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
  select: {
    "&:before": {
      borderColor: "var(--clr-blue-light)",
    },
    "&:after": {
      borderColor: "var(--clr-blue-light)",
    },
    "&:not(.Mui-disabled):hover::before": {
      borderColor: "var(--clr-blue-light)",
    },
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

const SignupForm = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let [name, setName] = useState("");
  const [phone, setPhoneNum] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [cityNameErr, setCityNameErr] = useState("");
  const [validNameErr, setValidNameErr] = useState("");
  const [phoneNumErr, setPhoneNumErr] = useState("");
  const [validPhoneNumErr, setValidPhoneNumErr] = useState("");
  const [experienceErr, setExperienceErr] = useState("");
  const [primarySpecializationErr, setPrimarySpecializationErr] = useState("");
  const [checked, setChecked] = useState(true);
  const [primarySpecialization, setPrimarySpecialization] = useState(null);
  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
    newsletter: false,
    experience: 1,
    activelySearching: false,
    salaryRange: 1,
    specialization: "",
  });
  const [open, setOpen] = useState(false);
  const [infoSaved, setInfoSaved] = useState(false);
  const [infoSaveFailed, setInfoSaveFailed] = useState(false);
  const [files, setFiles] = useState(null);
  const [resume, setResume] = useState([]);
  const [resumeName, setResumeName] = useState("");
  const [updated, setUpdated] = useState(false);
  const [uploadReumseError, setUploadResumeError] = useState("");
  const [openResumeSnack, setOpenResumeSnack] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeError, setResumeError] = useState(false);
  const [resumeUploadFailed, setResumeUploadFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  const [statusChange, setStatusChange] = useState('');
  const [healthCare,setHealthCare] = useState({});
  const access_token = sessionStorage.getItem("accessToken");
  const [residentSurgeonFollow, setResidentSurgeonFollow] = useState('');
  const [cityLocation, setCityLocation] = useState('');
  const [allCityLocation, setAllCityLocation] = useState([]);
  const classes = useStyles();
  const [allHealthIndustry, setAllHealthIndustry] = useState([]);
  const [healthCareIndustrySpeciality,setHealthCareIndustrySpeciality] = useState([]);
  const [industrySpeciality, setIndustrySpeciality] = useState({});
  const [otherSpeciality, setOtherSpeciality] = useState('');
  const [statusErr, setStatusErr] = useState("");
  const [healthCareErr, setHealthCareErr] = useState("");
  const [residentSurgeonFollowErr, setResidentSurgeonFollowErr] = useState('');
  const [industrySpecialityErr, setIndustrySpecialityErr] = useState('');
  const [otherSpecialityErr, setOtherSpecialityErr] = useState('');
  const [filesErr, setFilesErr] = useState('');

  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e.target.name] = e.target.value;
      return __form;
    });
  };

  useEffect(() => {
    gqlquery(QUERY_GETRESUME, null)
      .then((res) => res.json())
      .then((datas) => setResume(datas.data?.getResume));
  }, [updated]);

  const fileInputRef = useRef();
  const handleFileChange = async (e) => {
    let file = e.target.files[0];
    if (file.size / 1024 / 1024 <= 2) {
      setResumeName(file.name);
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function (evt) {
        let encoded = base64_encode(evt.target.result);
        // let decoded = base64_decode(evt.target.result);
        setFiles(encoded);
        // setFiles(false)
      };
    } else {
      setUploadResumeError("File size should be less than 2 MB");
      setOpenResumeSnack(true)
    }
  };

  useEffect(() => {
    if (files !== null && files) {
      setIsLoading(true);
      const QUERY_ADDRESUME = {
        query: `mutation MyMutation {
            uploadResume (
              content: "${files}", 
              fileName: "${resumeName}",
              url: "${resume?.url ? resume?.url : ""}"
            )
          }`,
        variables: null,
        operationName: "MyMutation",
      };
      gqlquery(QUERY_ADDRESUME, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.uploadResume === "SUCCESS") {
            setUpdated(pre => !pre);
            setResumeUploaded(true);
            setOpen(true);
          } else {
            setResumeError(true);
            setResumeUploadFailed(true);
            setOpen(true);
          }
          setFiles(false);
        })
        .finally((e) => setIsLoading(false));
    }
  }, [files]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenResumeSnack(false);
    setResumeUploaded(false);
    setResumeUploadFailed(false);
    setResumeError(false);
  };

  const handleNavigateProfileHome = () => {
    navigate("/profile-home", { state: { name: name } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect (() => {
    gqlquery(QUERY_LISTPROFILES, null)
    .then((res) => res.json())
    .then((datas) => {
      // console.log(datas)
      if (datas?.data?.getProfile) {
        navigate("/profile-home"); // Redirect after Login
      }
    });
  }, []);


  // let resText = /^[a-zA-Z]+$/;
  // let re = /^\+[1-9]\d{1,14}$/;
  let resText = /^[a-zA-Z ]*$/;
  name = name.replace(/  +/g, ' ');

  const onlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };


  const handleBasicDetails = async (event, from) => {
    
    if (event.key === "Enter" || from === "onClick") {
      if( phone === "" ||
        // re.test(phone) === false ||
        phone.length !== 10 ||
        name === "" ||
        name === " " ||
        resText.test(name) === false || !statusChange || !cityLocation || files === null ) {
          setPhoneNumErr("Please enter a valid mobile/phone number.");
          setValidPhoneNumErr("Invalid phone number.");
          setNameErr("Name can't be empty.");
          setValidNameErr("This field accept only Alphabets.");
          setStatusErr("Choose one option.");
          setCityNameErr("Location can't be empty.");
          setFilesErr("Please Upload resume");
          return;
        }
      if(statusChange === 'Experienced'){
        if (
          form.salaryRange === 0 ||
          form.experience === 0 ||
          phone === "" ||
          // re.test(phone) === false ||
          phone.length !== 10 ||
          name === "" ||
          name === " " ||
          resText.test(name) === false || !healthCare.hciID || !cityLocation || (healthCare?.hciID === 363 && !residentSurgeonFollow) || 
          (residentSurgeonFollow === 'Practising Physician/Surgeon' && !industrySpeciality.hciID) || (!otherSpeciality && industrySpeciality?.specialty?.split(' ').pop() === 'Other') || otherSpeciality === " " || files === null
        ) {
          setError("Salary Range Must be selected.");
          setExperienceErr("Experience Must be selected.");
          setPhoneNumErr("Please enter a valid mobile/phone number.");
          setValidPhoneNumErr("Invalid phone number.");
          setNameErr("Name can't be empty.");
          setCityNameErr("Location can't be empty.");
          setValidNameErr("This field accept only Alphabets.");
          setHealthCareErr("Atleast one industry is required.");
          setResidentSurgeonFollowErr("Please select any one");
          setIndustrySpecialityErr("Choose one option.");
          setOtherSpecialityErr("Pleas write industry speciality");
          setFilesErr("Please Upload resume")
          return;
        }
      }

      const QUERY_POSTPROFILES = {
        query: `mutation MyMutation {
          addProfile(
          activelySearching: ${checked}, 
          locationID: ${Number(cityLocation.lmID)}, 
          exp: ${statusChange === 'Fresher' ? 0 : Number(form.experience)}, 
          name: "${name}",
          newsletter: ${newsletter}, 
          phone: "${phone}",
          salary: ${statusChange === 'Fresher' ? 0 : form.salaryRange}, 
          workStatus:  "${statusChange}",
          specialtyID: ${ (statusChange === 'Experienced' && industrySpeciality?.hciID) ? industrySpeciality?.hciID : 0 }, 
          industryID: ${statusChange === 'Fresher' ? 0 : healthCare?.hciID}, 
          experiencedType: "${residentSurgeonFollow}",
          otherSpecialty: "${otherSpeciality}"
          )
          {
            workStatus
            specialtyID
            salaryThousands
            salary
            phoneVerified
            phone
            newsletter
            name
            industryID
            experiencedType
            exp
            cityWithState
            activelySearching
          }
        }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_POSTPROFILES, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.addProfile) {
            setInfoSaveFailed(false);
            setOpen(true);
            setInfoSaved(true);
            setTimeout(handleNavigateProfileHome, 3000);
          } else {

            setInfoSaved(false);
            setOpen(true);
            setInfoSaveFailed(true);
          }
        })
        .finally((e) => console.log("adding to database"));

      setError("");
      setNameErr("");
    }
  };

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
  },[])

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
      const SortHealtIndustry =  datas?.data?.getHCIIndustry?.sort(function(a,b){
        if(a.industry == 'General Medicine Doctor')
        {
        return -1;
        }
        if(a?.industry < b?.industry) { return -1; }
        if(a?.industry > b?.industry) { return 1; }
      return 0
      });
      setAllHealthIndustry(SortHealtIndustry)
});
  },[])


  useEffect(() => {
    const GET_INDUSTRY = {
      query: ` query MyQuery {
        getHCISpecialty(industry: "${healthCare?.industry}") {
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
    .then((datas) => setHealthCareIndustrySpeciality(datas?.data?.getHCISpecialty));
  },[residentSurgeonFollow, healthCare])
  
  const SearchLocation = (event) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val
 
    if(event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2){

      const GET_CITY= {
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
    <>
      {
        access_token === null ? (
          <Navigate to="/login" />
        ) : (
          <SignupGrid SignupGrid style={{ padding: !matches ? "20px 39px 40px" : "20px 26px 40px" , boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)" }} item className="doctor-signup">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
          /*  justifyContent: "center", alignItems: "center", */ gap: 2,
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontSize: !matches ? "24px" : "18px", fontWeight: "600", color: "var(--clr-blue-footer)", textAlign: !matches ? "center" : "start", ml: !matches ? "" : "-10px" }}
              >
                Register {matches && "to MedLink"}
              </Typography>
              {/* name input  */}
              <Box>
                <InputLabel sx={{ py: 0.5 }}>
                  Name <span style={{ color: "red" }}> *</span>
                </InputLabel>
                <TextField
                  sx={{
                    borderRadius: 1,
                    color: "var(--clr-blue-footer)",
                    fontSize: "14px",
                  }}
                  InputProps={{
                    sx: {
                      ".MuiOutlinedInput-input": { 
                        padding: '10.5px 14px',
                      },
                      /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
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
                  disableUnderline
                  fullWidth
                  // error ={name === "" &&  error}
                  placeholder="Enter Your Name"
                  name="name"
                  type="text"
                  value={name}
                  helperText={name.length <=2 && "Name must have at least 3 characters."}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleBasicDetails}
                />
                {name === "" && (
                  <FormHelperText sx={{ color: "red", mb: 0 }}>
                    {nameErr}
                  </FormHelperText>
                )}
                {name !== "" && ((name === " ") || (resText.test(name) === false)) && (
                  <FormHelperText sx={{ color: "red", mb: 0 }}>
                    {validNameErr}
                  </FormHelperText>
                )}
              </Box>

              {/* location input  */}
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                  Location<span style={{ color: "red" }}> *</span>
                  </InputLabel>

                  {/* <ThemeProvider theme={ItisThim}> */}
                      <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          noOptionsText={"Start typing"}
                          sx={{
                            "& .MuiAutocomplete-inputRoot":{
                              padding: '3px 0px 3px 7px',
                              // border: "0.1px solid var(--clr-blue-light) !important",
                            }
                          }}
                          onChange={(event, newValue) => {
                            setCityLocation(newValue)
                          }}
                          filterSelectedOptions
                          // defaultValue={values.institution}
                          onKeyDown={handleBasicDetails}
                          options={allCityLocation}
                          getOptionLabel={(option) => option.cityWithState}
                          renderInput={(params) => <TextField
                            onChange={(e) => {
                              SearchLocation(e)                          }}
                          placeholder="Select Location"
                          {...params} />}
                        />
                  {/* </ThemeProvider> */}

                  { !cityLocation && cityNameErr && <Typography sx={{fontSize: '12px', color: "red", mb: 0 }}>
                    {cityNameErr}
                  </Typography>}
                </Box>

              {/* phone number  */}
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
                              border: "1px solid black",
                              // borderRadius: "4px 0px 0px 4px",
                            },
                          },
                        }
                      }}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={10} md={10}>
                    <TextField
                      sx={{
                        color: "var(--clr-blue-footer)",
                        // fontSize: "14px"
                      }}
                      className={classes.root}
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
                      disableUnderline
                      fullWidth
                      // error={phone === "" }
                      name="name"
                      type="text"
                      value={phone}
                      placeholder="Enter Mobile Number"
                      helperText={phone.length !== 10 && "Recruiters will reach out to you on this number."}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      inputProps={{ maxLength: 10 }}
                      onInput={(e) => onlyNumbers(e)}
                      onKeyDown={handleBasicDetails}
                    />
                  </Grid>
                </Grid>

                {phone === "" && (
                  <FormHelperText sx={{ color: "red", mb: 0 }}>
                    {phoneNumErr}
                  </FormHelperText>
                )}
                {phone !== "" && phone.length !== 10 && (
                  <FormHelperText sx={{ color: "red", mb: 0 }}>
                    {validPhoneNumErr}
                  </FormHelperText>
                )}
              </Box>
              
              {/* Work status */}
              <Box>
                <InputLabel sx={{ py: 0.5 }}>
                  Work Status<span style={{ color: "red" }}> *</span>
                </InputLabel>
                <FormControl >
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel onChange={(e) => 
                  {setStatusChange(e.target.value)
                    setIndustrySpeciality({})
                    setHealthCare({})
                    setOtherSpeciality('')
                    setResidentSurgeonFollow('')
                  }} value="Fresher" control={<Radio  value="Fresher" sx={{
                  color: '#E4EEF5',
                  '&.Mui-checked': {
                    color: '#5A98F2',
                  },
                }} />} label={<Typography sx={{fontSize: '14px', color: '#1A1A1A'}}>Fresher</Typography>} />
                
                  <FormControlLabel sx={{ ml: 15}} onChange={(e) => setStatusChange(e.target.value)}  value="Experienced" control={<Radio   value="Experienced" sx={{
                  color: '#E4EEF5',
                  '&.Mui-checked': {
                    color: '#5A98F2',
                  },
                }} />} label={<Typography sx={{fontSize: '14px', color: '#1A1A1A'}}>Experienced</Typography>}/>
                </RadioGroup>
           
                </FormControl>

                { !statusChange && statusErr && <Typography sx={{fontSize: '12px', color: "red", mb: 0 }}>
                    {statusErr}
                  </Typography>}
              </Box> 
              
            {/* ------------------------EXPERINCE BOX--------------- */}
              {
                statusChange === "Experienced" && 
                <Box>
                    {/*  Healthcare Industry */}
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>
                        Healthcare Industry<span style={{ color: "red" }}> *</span>
                        </InputLabel>
                        <FormControl sx={{fontSize: '15px', width: '100%', outline: 'none', border: 'none', borderColor: '#E4EEF5'}} >
                        <Select
                          value={healthCare?.industry}
                          onChange={(e) => {
                            setHealthCare(e.target.value)
                            if(industrySpeciality?.specialty){
                              setIndustrySpeciality('')
                            }
                          }}
                          renderValue={healthCare?.industry !== undefined ? undefined : () => <SelectPlaceholder>Select Industry</SelectPlaceholder>} 
                          onKeyDown={handleBasicDetails}
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
                          <MenuItem disabled  value="">
                            <Typography  sx={{color: '#B8BCCA', fontSize: '15px'}}>Select Industry</Typography>
                          </MenuItem>
                            {
                              allHealthIndustry?.map((industryItem) => (
                                <MenuItem sx={{fontSize: '15px'}} value={industryItem}>{industryItem?.industry}</MenuItem>
                              ))
                            }
                        </Select>
                        </FormControl>
                        {((statusChange === 'Experienced') && (!healthCare?.hciID))   && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {/* {healthCareErr} */}
                          Atleast one industry is required
                        </FormHelperText>
                      )}
                      { !healthCare?.hciID && healthCareErr && <Typography sx={{fontSize: '12px', color: "red", mb: 0 }}>
                        {healthCareErr}
                      </Typography>}
                      </Box>
                      <Box>
                        {
                          (healthCare?.hciID && healthCare?.hciID  !== 363) &&
                          <FormControl sx={{fontSize: '15px', width: '100%', outline: 'none', border: 'none', borderColor: '#E4EEF5',width: '100%',mt: 2,}} >
                          <Select
                              value={industrySpeciality?.specialty}
                              onChange={(e) => {
                                setIndustrySpeciality(e.target.value)
                      
                                if(otherSpeciality){
                                  setOtherSpeciality('')
                                }
                              }}
                              onKeyDown={handleBasicDetails}
                            renderValue={industrySpeciality?.specialty !== undefined ? undefined : () => <SelectPlaceholder>Select Specialization</SelectPlaceholder>} 
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
                            <MenuItem disabled  value="">
                              <Typography  sx={{color: '#B8BCCA', fontSize: '15px'}}>Select Specialization</Typography>
                            </MenuItem>
                              {
                                healthCareIndustrySpeciality?.map((industryItem) => (
                                  <MenuItem sx={{fontSize: '15px'}} value={industryItem}>{industryItem?.specialty}</MenuItem>
                                ))
                              }
                          </Select>
                          { !industrySpeciality.hciID && industrySpecialityErr && <Typography sx={{fontSize: '12px', color: "red", mb: 0 }}>
                            {industrySpecialityErr}
                          </Typography>}
                          </FormControl>
                          }

                        { (industrySpeciality?.specialty?.split(' ').pop() === 'Other' && healthCare?.hciID  !== 363 ) &&
                          <>
                           <Input
                              sx={{
                                borderRadius: 1,
                                color: "var(--clr-blue-footer)",
                                fontSize: "14px",
                                mt: 2,
                                width: '100%'
                              }}
                              disableUnderline
                              fullWidth
                              // error ={name === "" &&  error}
                              type="text"
                              onChange={(e) => setOtherSpeciality(e.target.value)}
                              onKeyDown={handleBasicDetails}
                            />
                          {!otherSpeciality && otherSpecialityErr && industrySpeciality?.specialty?.split(' ').pop() === 'Other' && <Typography sx={{fontSize: '12px', color: "red", mb: 0 , ml: 4, pt: 1}}>
                          {otherSpecialityErr}
                          </Typography>}

                          {otherSpeciality === " " && <Typography sx={{fontSize: '12px', color: "red", mb: 0 , ml: 4, pt: 1}}>
                          {otherSpecialityErr}
                          </Typography>}
                          </>
                        }
                      </Box>
                    {/* Practising Physician/Surgeon + resident + follow */}
                      {
                      healthCare.hciID === 363 && 
                      <Box>
                      <FormControl sx={{mt: 2, width: '100%'}}>
                        <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        >
                            <FormControlLabel onChange={(e) => setResidentSurgeonFollow(e.target.value)} value="Practising Physician/Surgeon" control={<Radio  value="Practising Physician/Surgeon" sx={{
                          color: '#E4EEF5',
                          '&.Mui-checked': {
                            color: '#5A98F2',
                          },
                        }} />} label={<Typography sx={{fontSize: '14px', color: '#1A1A1A'}}>Practising Physician/Surgeon</Typography>} />

                          {/* ---------------After choosing surgeon----------------- */}

                          {
                            residentSurgeonFollow === 'Practising Physician/Surgeon' &&
                          <FormControl sx={{fontSize: '15px', width: '100%', outline: 'none', border: 'none', borderColor: '#E4EEF5',  ml: 4,width: '93%'}} >
                          <Select
                              value={industrySpeciality?.specialty}
                              onChange={(e) => {
                                setIndustrySpeciality(e.target.value)
                      
                                if(otherSpeciality){
                                  setOtherSpeciality('')
                                }
                              }}
                              onKeyDown={handleBasicDetails}
                            displayEmpty
                            fullWidth
                            renderValue={industrySpeciality?.specialty !== undefined ? undefined : () => <SelectPlaceholder>Select Specialization</SelectPlaceholder>}
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                            inputProps={{
                              classes: {
                                icon: classes.icon,
                              },
                            }}
                            // input={<CustomSelectInput />}
                            sx={{height: "45px"}}
                          >
                            <MenuItem disabled  value="">
                              <Typography  sx={{color: '#B8BCCA', fontSize: '15px'}}>Select Specialization</Typography>
                            </MenuItem>
                              {
                                healthCareIndustrySpeciality?.map((industryItem) => (
                                  <MenuItem sx={{fontSize: '15px'}} value={industryItem}>{industryItem?.specialty}</MenuItem>
                                ))
                              }
                          </Select>
                          { !industrySpeciality.hciID && industrySpecialityErr && <Typography sx={{fontSize: '12px', color: "red", mb: 0 }}>
                            {industrySpecialityErr}
                          </Typography>}
                          </FormControl>
                          }

                          { ( industrySpeciality?.specialty?.split(' ').pop() === 'Other' && residentSurgeonFollow === 'Practising Physician/Surgeon' )&&
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
                              onChange={(e) => setOtherSpeciality(e.target.value)}
                              onKeyDown={handleBasicDetails}
                            />
                          {!otherSpeciality && otherSpecialityErr && industrySpeciality?.specialty?.split(' ').pop() === 'Other' && <Typography sx={{fontSize: '12px', color: "red", mb: 0 , ml: 4, pt: 1}}>
                          {otherSpecialityErr}
                          </Typography>}

                          {otherSpeciality === " " && <Typography sx={{fontSize: '12px', color: "red", mb: 0 , ml: 4, pt: 1}}>
                          {otherSpecialityErr}
                          </Typography>}
                          </>
                          }

                          <FormControlLabel onChange={(e) => {
                            setResidentSurgeonFollow(e.target.value)
                            setIndustrySpeciality({})
                            setOtherSpeciality('')
                          }
                          } value="Resident" control={<Radio  value="Resident" sx={{
                          color: '#E4EEF5',
                          '&.Mui-checked': {
                            color: '#5A98F2',
                          },
                        }} />} label={<Typography sx={{fontSize: '14px', color: '#1A1A1A'}}>Resident</Typography>} />
                        
                          <FormControlLabel  onChange={(e) => {
                            setResidentSurgeonFollow(e.target.value)
                            setIndustrySpeciality({})
                            setOtherSpeciality('')
                          }}  value="Fellow" control={<Radio   value="Fellow" sx={{
                          color: '#E4EEF5',
                          '&.Mui-checked': {
                            color: '#5A98F2',
                          },
                        }} />} label={<Typography sx={{fontSize: '14px', color: '#1A1A1A'}}>Fellow</Typography>}/>
                        </RadioGroup>
                      </FormControl>
                      { !residentSurgeonFollow && residentSurgeonFollowErr && <Typography sx={{fontSize: '12px', color: "red", mb: 0 }}>
                        {residentSurgeonFollowErr}
                      </Typography>}
                      </Box>
                      }
                      
                        {/* salary */}
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Salary range<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Box sx={{ px: 3 }}>
                            <Slider
                              name="salaryRange"
                              getAriaLabel={() => "Salary range"}
                              onChange={formValueChange}
                              onKeyDown={handleBasicDetails}
                              valueLabelDisplay="auto"
                              // error={form.salaryRange === 0 && error}
                              value={form.salaryRange}
                              min={0}
                              max={99}
                              marks={[{ value: 0, label: `₹${form.salaryRange} L` }]}
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
                            
                          {form.salaryRange === 0 && error && <Typography sx={{fontSize: '12px', color: "red", mb: 0 }}>{error}</Typography>}
                          </Box>
                        </Box>

                        {/* experience */}
                      <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Experience<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Box sx={{ px: 3 }}>
                            <Slider
                              name="experience"
                              getAriaLabel={() => "experience"}
                              onChange={formValueChange}
                              onKeyDown={handleBasicDetails}
                              // error={form.experience === 0 && experienceErr}
                              valueLabelDisplay="auto"
                              value={form.experience}
                              min={0}
                              max={55}
                              marks={[{ value: 0, label: `${form.experience} Y` }]}
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
                            {form.experience === 0 && experienceErr && <Typography sx={{fontSize: '12px', color: "red", mb: 0 }}>{experienceErr}</Typography>}
                          </Box>
                      </Box>
                </Box>
              }

{/* -----------------resume upload --------------------- */}
              <Box sx={{ margin: "0 !important" }}>
                {resume?.filename ? (
                  <>
                    {isLoading ? (
                      <Button
                        sx={{
                          marginTop: 3,
                          marginBottom: "1rem",
                          px: 5,
                          py: 1.2,
                          borderRadius: 16,
                        }}
                      >
                        <CircularProgress size="2rem" thickness={6} />
                        {/* <Skeleton variant="rectangular" width={260} height={148} /> */}
                      </Button>
                    ) : (
                      <Box
                        sx={{
                          border: "1px solid var(--clr-blue-light)",
                          borderRadius: 1,
                          textAlign: "center",
                          py: 1,
                          px: 5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.8rem",
                            fontWeight: "400",
                            mb: 2,
                            lineHeight: "24px",
                            color: "var(--clr-secondayGray-2)",
                          }}
                        >
                          {/* Upload resume to get the full benefits of your MedLink's profile! */}
                          Recruiters give first preference to resume candidates.
                        </Typography>

                        <Button
                          variant="outlined"
                          color="secondary"
                          sx={{
                            borderRadius: 16,
                          }}
                          onClick={() => fileInputRef.current.click()}
                        >
                          Upload Resume
                        </Button>
                        <input
                          onChange={handleFileChange}
                          multiple={false}
                          ref={fileInputRef}
                          type="file"
                          hidden
                          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
                        />
                        <Typography
                          sx={{
                            m: 0.5,
                            textAlign: "center",
                            color: "var(--clr-secondayGray-2)",
                            fontSize: "12px",
                          }}
                        >
                          {resume?.filename}
                        </Typography>
                        {/* <Button
                              variant="contained"
                              component="label"
                              sx={{
                                marginTop: 3,
                                marginBottom: "1rem",
                                px: 5,
                                py: 1.2,
                                borderRadius: 16,
                              }}
                            >
                              Upload Resume
                              <input
                                type="file"
                                hidden
                                onChange={handleUploadResume}
                                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
                              />
                            </Button> */}
                      </Box>
                    )}
                  </>
                ) : (
                  <>
                    {isLoading ? (
                      <Button
                        sx={{
                          marginTop: 3,
                          marginBottom: "1rem",
                          px: 5,
                          py: 1.2,
                          borderRadius: 16,
                        }}
                      >
                        <CircularProgress size="2rem" thickness={6} />
                        {/* <Skeleton variant="rectangular" width={210} height={118} /> */}
                      </Button>
                    ) : (
                      <Box
                        sx={{
                          border: "1px solid var(--clr-blue-light)",
                          borderRadius: 1,
                          textAlign: "center",
                          py: 1,
                          px: 5,
                        }}
                      >
                          <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.8rem",
                            fontWeight: "400",
                            mb: 2,
                            lineHeight: "24px",
                            color: "var(--clr-secondayGray-2)",
                          }}
                        >
                          {/* Upload resume to get the full benefits of your MedLink's profile! */}
                          Recruiters give first preference to resume candidates.
                        </Typography>
                        {
                          files == null && <>

                        <Button
                          variant="outlined"
                          color="secondary"
                          sx={{
                            borderRadius: 16,
                          }}
                          onClick={() => fileInputRef.current.click()}
                        >
                          Upload Resume
                        </Button>
                        <input
                          onChange={handleFileChange}
                          multiple={false}
                          ref={fileInputRef}
                          type="file"
                          hidden
                          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
                        />
                        <Typography
                          sx={{
                            m: 0.5,
                            textAlign: "center",
                            color: "var(--clr-secondayGray-2)",
                            fontSize: "12px",
                          }}
                        >
                          {resume?.filename}
                        </Typography>
                          </>
                        }
                        {/*   <Button
                              variant="contained"
                              component="label"
                              sx={{
                                marginTop: 3,
                                marginBottom: "1rem",
                                px: 5,
                                py: 1.2,
                                borderRadius: 16,
                              }}
                            >
                              Upload Resume
                              <input
                                type="file"
                                hidden
                                onChange={handleUploadResume}
                                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
                              />
                            </Button> */}
                           {files == null && <Typography sx={{fontSize: '12px', color: "red", mb: 0 }}>{filesErr}</Typography>}
                        <Typography
                          sx={{
                            fontSize:  "14px",
                            color: "var(--clr-gray-2)",
                          }}
                        >
                          <Checkbox
                            sx={{
                              color: "#BDBDBD",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                            type="checkbox"
                            onChange={(e) => {
                              if(files == null){
                                setFiles(false)
                              }
                              else{
                                setFiles(null)
                              }
                            }}
                            // onKeyDown={handleBasicDetails}
                          />
                          &nbsp;
                          <span sx={{fontSize: '14px', fontWeight: '400'}} >I will do this later</span>
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
                {resumeUploaded && (
                  <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Resume uploaded successfully.
                    </Alert>
                  </Snackbar>
                )}

                {uploadReumseError && (
                  <Snackbar
                    open={openResumeSnack}
                    autoHideDuration={4000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      {uploadReumseError}
                    </Alert>
                  </Snackbar>
                )}
                {resumeError && (
                  <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert
                      onClose={handleClose}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      {resumeUploadFailed &&
                        "Sorry, something went wrong. Please try again later."}
                    </Alert>
                  </Snackbar>
                )}
              </Box>

              {/* conditons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "start",
                }}
              >
                <Typography
                  sx={{
                    fontSize: !matches ? "16px" : "14px",
                    color: "var(--clr-gray-2)",
                  }}
                >
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                    size="small"
                  />
                  &nbsp;
                  <b>Actively Searching?</b>
                </Typography>
                <Typography
                  sx={{
                    fontSize: !matches ? "16px" : "14px",
                    color: "var(--clr-gray-2)",
                  }}
                >
                  <Checkbox
                    sx={{
                      mr: 2,
                      color: "#BDBDBD",
                      "&.Mui-checked": {
                        color: "var(--clr-blue-primary)",
                      },
                    }}
                    type="checkbox"
                    onChange={(e) => setNewsletter(e.target.checked)}
                    onKeyDown={handleBasicDetails}
                  />
                  &nbsp;
                  <b>Subscribe to our Newsletter</b>
                </Typography>
                <Typography
                  sx={{
                    color: "var(--clr-gray-1)",
                    fontSize: "0.8rem",
                    lineHeight: "24px",
                  }}
                >
                  <b>
                    By clicking Register, you agree to the&nbsp;
                    <Link
                      style={{
                        color: "var(--clr-blue-secondary)",
                        textDecoration: "underline",
                      }}
                      to="/terms-and-conditions"
                      target='_blank'
                    >
                      Terms and Conditions
                    </Link>{" "}
                    &
                    <Link
                      style={{
                        color: "var(--clr-blue-secondary)",
                        textDecoration: "underline",
                      }}
                      to="/privacy-policy"
                      target='_blank'
                    >
                      {" "}
                      Privacy Policy
                    </Link>{" "}
                    of MedLinks
                  </b>
                </Typography>
              </Box>
            </Box>
            <Button
              fullWidth
              variant="contained"
              onClick={(event) => handleBasicDetails(event, "onClick")}
              sx={{ mt: 5, borderRadius: 16, fontSize: '14px', fontWeight: '600', height: '47px'}}
            >
              Finish Registration
            </Button>
            {infoSaved && (
              <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Successfully registered your details.
                </Alert>
              </Snackbar>
            )}
            {infoSaveFailed && (
              <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                  Operation was not successful. Please, Try again.
                </Alert>
              </Snackbar>
            )}
          </SignupGrid>
        )
      }
    </>
  );
};

export default SignupForm;
