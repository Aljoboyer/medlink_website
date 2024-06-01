import Edit from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  FormHelperText,
  Box,
  // Input,
  InputBase,
  // CircularProgress,
  Tooltip,
  Skeleton,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import {
  gqlquery,
  QUERY_COURSEID,
  QUERY_GETEDUCATION,
  // QUERY_SPECIALIZATIONID,
  QUERY_UNIVERSITYID,
} from "../../../../api/index.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useAuth from "../../../../hooks/useAuth.js";
// import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; 

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

    "&:hover": {
      border: "1px solid var(--clr-blue-primary) !important",
      borderRadius: 4, 
    },
    "&:focus": {
      border: "2px solid var(--clr-blue-primary) !important",
      borderRadius: 4, 
    },
  },
}));

const selectPlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#B8BCCA"
  }
}))

const SelectPlaceholder = ({children}) => {
  const classes = selectPlaceholderStyles();
  return (<div className={classes.placeholder}>{children}</div>);
}

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
}));

const ItisThim = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          px: 2,
          borderRadius: 4,
          borderColor: "var(--clr-blue-light)",
          "&: .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--clr-blue-light)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--clr-blue-primary)",
          },
        },
      },
    }
  }
});

const Education = (props) => {
  const { handleStrengthUpdate } = useAuth();
  const [flag, setFlag] = useState(false);
  const [educationDetails, setEducationDetails] = useState([]);
  const [showUpdateEducation, setShowUpdateEducation] = useState(false);
  const [item, setItem] = useState({});
  const [courseID, setCourseID] = useState([]);
  const [specializaitonID, setSpecializationID] = useState([]);
  const [universityID, setUniversityID] = useState([]);
  const [passingYears, setPassingYears] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [values, setValues] = useState({
    course: null,
    specilizationID: null,
    specilizationUpdate: null,
    institute: null,
    passingyear: "",
    coursetype: "",
    healtCareIndustry: null,
    qualification: null,
  });
  const [error, setError] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errInput, setErrInput] = useState("");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [addEducation, setAddEducation] = useState(false);
  const [delEducation, setDelEducation] = useState(false);
  const [updateEdu, setUpdateEdu] = useState(false);
  const [loadingSkleton, setLoadingSkleton] = useState(true);
  const [loadingSkletonForGetAllEducation, setLoadingSkletonForGetAllEducation] = useState(true);
  const [loadingSkletonForAddEducation, setLoadingSkletonForAddEducation] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  document.title = "Education | MedLink Jobs";
  const [allHealtCareIndustry,setAllHealtCareIndustry] = useState([])
  const [allQualification,setAllQualification] = useState([]);
  const [allCourses,setAllCourses] = useState([])
  const [allSpecialization,setAllSpecialization] = useState([]);
  const [qualificationField,setqualificationField] = useState(false);
  const [courseField,setCourseField] = useState(false);
  const [specialField,setSpecialField] = useState(false);

  const handleChange = (prop) => (event) => { 
    // Clear Relation inputs
    if (prop === "healtCareIndustry") {
      // loadSpecialization(event, null);
      values.qualification = "";
      values.course = ""; 
      values.specilizationID = ""
    }
    if (prop === "qualification") {
      values.course = ""; 
      values.specilizationID = ""
    }
    if (prop === "course") {
      values.specilizationID = ""
    }

    // Value set on state
    setValues({ ...values, [prop]: event.target.value });

    
    if(prop === 'healtCareIndustry'){
      setqualificationField(true)
    }
    else if(prop === 'qualification'){
      setCourseField(true)
    }
    else if(prop === 'course'){
      setSpecialField(true)
    }

  };
 


  useEffect(() => {
    setTimeout(() => {
      setLoadingSkletonForAddEducation(false);
    }, 2500)
  }, [])

  const loadSpecialization = async (event, item) => {
    let course = event ? event.target.value : item?.courseName;

    let SPQUERY = {
      query: `query MyQuery {
          getCourseSpecialisations(course: "${course}") {
          cmID
          name
          specialisation
          }
          }`};
    await gqlquery(SPQUERY, null)
      .then((res) => res.json())
      .then((datas) => {
        setSpecializationID(datas?.data?.getCourseSpecialisations)
      }
      )
      .finally(() => setLoadingSkleton(false));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setError(false);
    setAddEducation(false);
    setUpdateEdu(false);
    setDelEducation(false);
  };

  useEffect(() => {
    gqlquery(QUERY_GETEDUCATION, null)
      .then((res) => res.json())
      .then((datas) => {
        setEducationDetails(datas.data?.getEducationList); 
      })
      .finally(() => setLoadingSkletonForGetAllEducation(false));
  }, [updateList]);


  useEffect(() => {
    gqlquery(QUERY_COURSEID, null)
      .then((res) => res.json())
      .then((datas) => setCourseID(datas?.data?.getCourseMaster))


      gqlquery(QUERY_UNIVERSITYID, null)
      .then((res) => res.json())
      .then((datas) => setUniversityID(datas?.data?.getUniversityMaster));

    function getYears() {
      let yearArr = [];
      let date = new Date();
      let year = date.getFullYear();
      for (let i = 1900; i <= year; i++) {
        yearArr.push(i);
      }
      setPassingYears(yearArr.reverse());
    }
    getYears();
  }, []);

  //TODO: setOpen(false) after any operation.
  // let res = /^[a-zA-Z]+$/;
  let res = /^[a-zA-Z ]*$/;
  // values.title = values.title.replace(/  +/g, ' ');

  const handleEducation = (event, from) => {

    if (event.key === "Enter" || from === "onClick") {

      if (
        !values.specilizationID || !values.healtCareIndustry ||
        !values.qualification || values.institute === "" ||
        values.passingyear === "" ||
        values.coursetype === ""

      ) {

        setErrInput("Text field can not be empty.");
        setError("Please, select an option.");
        setErrorTitle("Title can have only Alphabets.");
        return;
      }

      // return;
      const QUERY_POSTEDUCATION = {
        query: `mutation MyMutation {
          addEducation(
          courseType: "${values.coursetype}",
          emID: ${values.specilizationID},
          universityID: ${Number(values.institute)},
          yearOfPassing: ${Number(values.passingyear)}
          )
          {
            courseType
            universityID
            yearOfPassing
            eduID
            emID
          }
        }
        `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_POSTEDUCATION, null)
        .then((res) => res.json())
        .then((datas) => {
          setUpdateList(!updateList);
          if (datas?.data?.addEducation) {
            setUpdateList(!updateList);
            handleStrengthUpdate();
            setAddEducation(true);
            setOpen(true);
            setqualificationField(false)
            setCourseField(false)
            setSpecialField(false)
          } else {
            setError("Sorry, something went wrong. Please, try again.");
            setOpen(true);
          }
        })
        .finally((e) => console.log("adding educational details to database"));
      setValues({
        course: "",
        specilizationID: "",
        institute: "",
        passingyear: "",
        coursetype: "",
        healtCareIndustry: "",
        qualification: "",
      });

      values.title = "";
      values.course = "";
      values.specilizationID = "";
      values.institute = "";
      values.passingyear = "";
      values.coursetype = "";
      setFlag((prevData) => !prevData);

      setErrInput("");
      setError("");
      setErrorTitle("");
    }
  };

  const handleUpdateEducation = (event, from) => {

    if (event.key === "Enter" || from === "onClick") {

      if (
        !values.specilizationID || !values.healtCareIndustry ||
        !values.qualification || !values.institute ||
        values.passingyear === "" ||
        values.coursetype === ""
      ) {

        setErrInput("Text field can not be empty.");
        setError("Please, select an option.");
        setErrorTitle("Title can have only Alphabets.");
        return;
      } 
      const QUERY_UPDATEEDUCATION = {
        query: `mutation MyMutation {
          updateEducation(
            courseType: "${values.coursetype}",
            eduID: ${Number(item?.eduID)},
            emID: ${isNaN(values?.specilizationID) ? Number(item?.emID) : Number(values?.specilizationID)},
            universityID: ${isNaN(values.institute) ? Number(item?.universityID) : Number(values.institute)},
            yearOfPassing: ${Number(values.passingyear)}
            )
          {
            courseType
            eduID
            emID
            universityID
            yearOfPassing
          }
        }
        `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_UPDATEEDUCATION, null)
        .then((res) => res.json())
        .then((datas) => { 
          if (datas?.data?.updateEducation) {
            setUpdateList(!updateList);
            handleStrengthUpdate();
            setUpdateEdu(true);
            setOpen(true);
            setqualificationField(false)
            setCourseField(false)
            setSpecialField(false)
          } else {
            setError("Sorry, something went wrong. Please, try again.");
            setOpen(true);
          }
        })
        .finally((e) => console.log("Updating educational details in database"));

        
        values.course = ""
        values.specilizationID = ""
        values.institute = ""
        values.passingyear = ""
        values.coursetype = ""
        values.healtCareIndustry = ""
        values.qualification = ""
        setShowUpdateEducation((prevData) => !prevData);
      setErrInput("");
      setError("");
      setErrorTitle("");
    }
  };

  const handleDeleteEducation = (e) => {

    setShowUpdateEducation((prevData) => !prevData);
    if (window.confirm("Are you sure you want to delete?")) {
      const QUERY_DELETEEDUCATION = {
        query: `mutation MyMutation {
          deleteEducation(eduID: "${item?.eduID}") {
            courseType
            eduID
            emID
            universityID
            yearOfPassing
          }
        }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_DELETEEDUCATION, null)
        .then((res) => res.json())
        .then((datas) => {
          if (datas?.data?.deleteEducation) {
            setUpdateList(!updateList);
            handleStrengthUpdate();
            setDelEducation(true);
            setOpen(true);
          } else {
            setError("Sorry, something went wrong. Please, try again.");
            setOpen(true);
          }
        })
        .finally((e) =>
          console.log("Deleting educational details in database")
        );
      setShowUpdateEducation((prevData) => !prevData);
    } else {
      console.log("You don't want to delete this!");
    }
    setShowUpdateEducation((prevData) => !prevData);
  };

  const handleShowEducationDetails = (item) => {
    setItem(item); 
    // loadSpecialization(null, item);
   values.course = item?.course
   values.specilizationID = item?.emID
   values.institute = item?.university
   values.passingyear = item?.yearOfPassing
   values.coursetype = item?.courseType
   values.healtCareIndustry = item?.healthcareIndustry
   values.qualification = item?.qualification
   values.institute = item?.university
    setShowUpdateEducation((prevData) => !prevData);
    setLoadingSkleton(false)
  };

  const handleCancelUpdate = (e) => {
    values.course = ""
    values.specilizationID = ""
    values.institute = ""
    values.passingyear = ""
    values.coursetype = ""
    values.healtCareIndustry = ""
    values.qualification = ""
    setShowUpdateEducation((prevData) => !prevData);
  };

  const onClick = (e) => {
    // e.preventDefault();
    setFlag((prevData) => !prevData);
    values.course = ""
    values.specilizationID = ""
    values.institute = ""
    values.passingyear = ""
    values.coursetype = ""
    values.healtCareIndustry = ""
    values.qualification = ""
  };

  // Custom redio button style
  const controlProps = (item) => ({
    checked: values.coursetype === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  useEffect(() => {
    const GET_HEALTCARE = {
      query: `query MyQuery {
        getIndustry {
          healthcareIndustry
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };
    
    gqlquery(GET_HEALTCARE, null)
    .then((res) => res.json())
    .then((datas) => {
      setAllHealtCareIndustry(datas?.data?.getIndustry)
    });
  },[])

  useEffect(() => {
    const GET_QUALIFICATIONS = {
      query: `query MyQuery {
        getQualification(industry: "${values?.healtCareIndustry}") {
          qualification
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };
    
    gqlquery(GET_QUALIFICATIONS, null)
    .then((res) => res.json())
    .then((datas) => {
      setAllQualification(datas?.data?.getQualification)
    });
  },[values.healtCareIndustry])

  useEffect(() => {
    const GET_COURSES = {
      query: `query MyQuery {
        getCourse(industry: "${values?.healtCareIndustry}", qualification: "${values?.qualification}") {
          course
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };
    
    gqlquery(GET_COURSES, null)
    .then((res) => res.json())
    .then((datas) => {
      setAllCourses(datas?.data?.getCourse)
   
    });
  },[values.healtCareIndustry, values.qualification,])

  useEffect(() => {
    const GET_SPECIALIZATION = {
      query: `query MyQuery {
        getSpecialization(course: "${values?.course}", industry: "${values?.healtCareIndustry}", qualification: "${values?.qualification}") {
          course
          emID
          healthcareIndustry
          qualification
          specialization
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };
    
    gqlquery(GET_SPECIALIZATION, null)
    .then((res) => res.json())
    .then((datas) => {
      setAllSpecialization(datas?.data?.getSpecialization)
    });
  },[values?.course, values?.healtCareIndustry, values?.qualification])

  const ChangeSpecialization = (e) => {
    const newItem = allSpecialization?.find((sp) => sp.specialization === e.target.value)
   
    setValues({...values, specilizationID: Number(newItem.emID)})
  }

  const SearchUniversity = (event) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val
 
    if(event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2){

      const GET_UNIVERSITY = {
        query: `query MyQuery {
          getUniversityColleges(university: "${event.target.value}") {
            name
            umID
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      
      gqlquery(GET_UNIVERSITY, null)
      .then((res) => res.json())
      .then((datas) => {
        setUniversityID([...datas?.data?.getUniversityColleges])
      });
    }
    else {
     
      gqlquery(QUERY_UNIVERSITYID, null)
      .then((res) => res.json())
      .then((datas) => setUniversityID(datas?.data?.getUniversityMaster));

    }
  }

  const VersitySelectHandler = (e) => {
    const FindVersity = universityID?.find((vars) => vars?.name === e)
    setValues({...values, institute: FindVersity?.umID})
  }

  return (
    <Box sx={{ my: 7 }}>
      {!flag ? (
        <Box>
          {!showUpdateEducation ? (
            <Card
              sx={{
                backgroundColor: "var(--clr-white) !important",
                boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                border: matches ? "1px solid #E4EEF5" : "",
                borderRadius: 2,
                minHeight: 400,
              }}
            >
              {
                !loadingSkletonForGetAllEducation ? (
                  <>
                    <Grid
                      container
                      direction={"row"}
                      alignItems="flex-start"
                      padding={2.5}
                    >
                      <Grid item direction={"column"} xs={12} md={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 3,
                          }}
                        >
                          <Typography
                            component="div"
                            // variant="h5"
                            sx={{
                              fontSize: matches ? "18px" : "24px",
                              fontWeight: 700,
                              color: "var(--clr-blue-footer)",
                            }}
                          >
                            Education
                          </Typography>
                          {
                            matches ? (
                              <Button
                                variant="contained"
                                sx={{
                                  fontWeight: 600,
                                  borderRadius: 16,
                                  borderWidth: "2px !important",

                                }}
                                onClick={onClick}
                              >
                                Add Education
                              </Button>
                            ) : (
                              <Button
                                variant="outlined"
                                sx={{
                                  fontWeight: 600,
                                  borderRadius: 16,
                                  borderWidth: "2px !important",

                                }}
                                onClick={onClick}
                              >
                                Add Education
                              </Button>
                            )
                          }
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={12}>
                        <Box
                          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                        >
                          {educationDetails?.map((item, index) => (
                            <Box
                              key={`education-${index}`}
                              className="resume-content"
                              sx={{ display: "flex" }}
                            >
                              <Box sx={{ display: "grid", lineHeight: "24px" }}>
                                <Typography variant="subtitle1" sx={{ fontSize: "1rem", fontWeight: 600 }}>{item?.course}</Typography>
                                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                  <Typography
                                    variant="info"
                                    sx={{
                                      fontSize: 12,
                                      color: "#828282",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {item?.qualification}
                                  </Typography>,&nbsp;
                                  <Typography
                                    variant="info"
                                    sx={{ fontSize: 12, color: "#828282" }}
                                  >
                                    {item?.specialization}
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="info"
                                  sx={{ fontSize: 12, color: "#828282" }}
                                >
                                  {item?.university}
                                </Typography>
                                <Typography
                                  variant="info"
                                  sx={{ fontSize: 12, color: "#828282" }}
                                >
                                  {item?.yearOfPassing} ({item?.courseType})
                                </Typography>
                              </Box>
                              <Box sx={{ margin: "0 0 0 40px" }}>
                                <Button>
                                  <Tooltip title="Update Education.">
                                    <Edit
                                      sx={{ fontSize: "medium" }}
                                      onClick={() => handleShowEducationDetails(item)}
                                    />
                                  </Tooltip>
                                </Button>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </>
                )
              }

            </Card>
          ) : (
            <Card
              sx={{
                backgroundColor: "var(--clr-white) !important",
                boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                border: matches ? "1px solid #E4EEF5" : "",
                p: 2.5,
              }}
            >
              {
                !loadingSkleton ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography
                        component="div"
                        variant="h5"
                        sx={{
                          fontSize: matches ? "18px" : "24px",
                          fontWeight: 700,
                          color: "var(--clr-blue-footer)",
                        }}
                      >
                        Update Education
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        sx={{
                          borderRadius: 2,
                          borderWidth: "2px",
                          px: 2,
                        }}
                        onClick={handleDeleteEducation}
                      >
                        Delete
                      </Button>
                    </Box>
                    <Typography
                      component="div"
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 4,
                        color: "var(--clr-blue-footer)",
                      }}
                    >
                    </Typography>
                    <Grid
                      container
                      direction={"row"}
                      alignItems="flex-start"
                      rowSpacing={2.5}
                      columnSpacing={4}
                    >
                      {/* Update filelds */}
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Healthcare Industry <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Select
                            displayEmpty
                            renderValue={values.healtCareIndustry !== "" ? undefined : () => <SelectPlaceholder>Select Healthcare Industry</SelectPlaceholder>} 
                            name=""
                            error={values.healtCareIndustry === "" && error}
                            value={values.healtCareIndustry}
                            onChange={handleChange("healtCareIndustry")}
                            onKeyDown={handleEducation}
                            fullWidth
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                            inputProps={{
                              classes: {
                                icon: classes.icon,
                              },
                            }}
                            // input={<CustomSelectInput />}
                            sx={{ height: "45px"}}
                          >
                            <MenuItem value="" disabled>
                              Select Healthcare Industry
                            </MenuItem>
                            {allHealtCareIndustry?.map((industry) => (
                              <MenuItem
                                key={industry?.healthcareIndustry}
                                value={industry?.healthcareIndustry}
                              >
                                {industry?.healthcareIndustry}
                              </MenuItem>
                            ))}
                          </Select>
                          {!values.healtCareIndustry && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Qualification <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Select
                            displayEmpty
                            renderValue={values.qualification !== "" ? undefined : () => <SelectPlaceholder>Select Qualification</SelectPlaceholder>} 
                            name=""
                            error={values.qualification === "" && error}
                            value={values.qualification}
                            onChange={handleChange("qualification")}
                            onKeyDown={handleEducation}
                            fullWidth
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                            inputProps={{
                              classes: {
                                icon: classes.icon,
                              },
                            }}
                            // input={<CustomSelectInput />}
                            sx={{ height: "45px"}}
                            // disabled={qualificationField ? false : true}
                          >
                            <MenuItem value="" disabled>
                              Select Qualification
                            </MenuItem>
                            {allQualification?.map((quali) => (
                              <MenuItem
                                key={quali?.qualification}
                                value={quali?.qualification}
                              >
                                {quali?.qualification}
                              </MenuItem>
                            ))}
                          </Select>
                          {qualificationField && !values.healtCareIndustry && (
                            <FormHelperText sx={{ color: "#B8BCCA" }}>
                              To edit qualification please select Healthcare Industry first
                            </FormHelperText>
                          )}
                           {!values.qualification && (
                            <FormHelperText sx={{ color: "red" }}>
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Course <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Select
                            displayEmpty
                            renderValue={values.course !== "" ? undefined : () => <SelectPlaceholder>Select Course</SelectPlaceholder>} 
                            name=""
                            error={values.course === "" && error}
                            value={values.course}
                            onChange={handleChange("course")}
                            onKeyDown={handleEducation}
                            fullWidth
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                            inputProps={{
                              classes: {
                                icon: classes.icon,
                              },
                            }}
                            // input={<CustomSelectInput />}
                            sx={{ height: "45px"}}
                            // disabled={courseField ? false : true}
                          >
                            <MenuItem value="" disabled>
                              Select Course
                            </MenuItem>
                            {allCourses?.map((course) => (
                              <MenuItem
                                key={course?.course}
                                value={course?.course}
                              >
                                {course?.course}
                              </MenuItem>
                            ))}
                          </Select>
                          {!values.course && (
                            <FormHelperText sx={{ color: "red" }}>
                              {error}
                            </FormHelperText>
                          )}
                          {courseField && !values.qualification && (
                            <FormHelperText sx={{ color: "#B8BCCA" }}>
                              To edit course please select qualification first
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Specialization<span style={{ color: "red" }}> *</span>
                          </InputLabel> 
                          <Select
                            displayEmpty
                            renderValue={values.specilizationID !== "" ? undefined : () => <SelectPlaceholder>Select Specialization</SelectPlaceholder>}
                            fullWidth
                            error={values.specilizationID === "" && error}
                            value={values.specilizationID}
                            onChange={handleChange("specilizationID")}
                            onKeyDown={handleEducation}
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                            // input={<CustomSelectInput />}
                            sx={{ height: "45px"}}
                            inputProps={{
                              classes: {
                                icon: classes.icon,
                              },
                            }}
                            // disabled={specialField ? false : true}
                          >
                            <MenuItem value="" disabled>
                              Select Specialization
                            </MenuItem>
                            {allSpecialization?.map((singleSpecilization) => (
                              <MenuItem value={singleSpecilization?.emID} >
                                {singleSpecilization?.specialization}
                              </MenuItem>
                            ))}
                          </Select>
                          {!values.specilizationID && (
                            <FormHelperText sx={{ color: "red" }}>
                              {error}
                            </FormHelperText>
                          )}
                          {specialField && !values.course && (
                            <FormHelperText sx={{ color: "#B8BCCA" }}>
                              To edit Specialization please select course first
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>

                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            University<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          {/* <ThemeProvider theme={ItisThim}> */}
                          <Autocomplete
                           disablePortal
                           id="combo-box-demo"
                           sx={{
                             "& .MuiAutocomplete-inputRoot":{
                               padding: '3px 0px 3px 7px',
                              //  border: "1px solid var(--clr-blue-light) !important",
                              height: "45px"
                             },
                           }}
                          defaultValue={values.institute}
                         
                          onChange={(event, val) => {
                            VersitySelectHandler(val)
                          }}
                          options={universityID?.map((option) => option.name)}
                          renderInput={(params) => <TextField 
                            onChange={(e) => {
                            SearchUniversity(e)
                          }}
                          placeholder="Please Select University/Institute Name"
                          {...params} />}
                          // placeholder="Select University"
                        />
                    {/* </ThemeProvider> */}
                          {!values.institute && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            {/* Passing Year */}
                            Year Of Passing
                            <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Select
                            displayEmpty
                            renderValue={values.passingyear !== "" ? undefined : () => <SelectPlaceholder>Select Year</SelectPlaceholder>}
                            onChange={handleChange("passingyear")}
                            onKeyDown={handleUpdateEducation}
                            defaultValue={item?.yearOfPassing}
                            error={values.passingyear === "" && error}
                            fullWidth
                            // input={<CustomSelectInput />}
                            sx={{ height: "45px"}}
                            inputProps={{
                              classes: {
                                icon: classes.icon,
                              },
                            }}
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                          >
                            <MenuItem value="" disabled>
                              Select Passing Out Year
                            </MenuItem>
                            {passingYears?.map((year) => (
                              <MenuItem value={year}> {year} </MenuItem>
                            ))}
                          </Select>
                          {!values.passingyear && (
                            <FormHelperText sx={{ color: "red" }}>
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>Course Type<span style={{ color: "red" }}> *</span></InputLabel>
                          <RadioGroup
                            onChange={handleChange("coursetype")}
                            onKeyDown={handleUpdateEducation}
                            defaultValue={values.coursetype}
                            error={error}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Full Time"
                              control={
                                <Radio
                                  {...controlProps("Full Time")}
                                  sx={{
                                    color: "var(--clr-blue-light)",
                                    "&.Mui-checked": {
                                      color: "var(--clr-blue-primary)",
                                    },
                                  }}
                                />
                              }
                              label="Full time"
                            />
                            <FormControlLabel
                              value="Part Time"
                              control={
                                <Radio
                                  {...controlProps("Part Time")}
                                  sx={{
                                    color: "var(--clr-blue-light)",
                                    "&.Mui-checked": {
                                      color: "var(--clr-blue-primary)",
                                    },
                                  }}
                                />
                              }
                              label="Part time"
                            />
                          </RadioGroup>
                          {!values.coursetype && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      {/* End update fields */}
                      <Grid
                        item
                        direction={"column"}
                        xs={12}
                        md={12}
                        justifyContent="flex-end"
                        sx={{ display: "grid" }}
                      >
                        <CardContent>
                          <CardActions
                            sx={{
                              justifyContent: "flex-end",
                              gap: "1rem",
                              padding: 0,
                            }}
                          >
                            <Button
                              variant="outlined"
                              color="primary"
                              sx={{
                                borderRadius: 16,
                                borderWidth: "2px !important",
                                px: 2,
                              }}
                              onClick={handleCancelUpdate}
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
                              onClick={(event) => handleUpdateEducation(event, "onClick")}
                            >
                              Update
                            </Button>
                          </CardActions>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </>
                )
              }

            </Card>
          )}
        </Box>
      ) : (
        <Card
          sx={{
            boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
            border: matches ? "1px solid #E4EEF5" : "",
            backgroundColor: "var(--clr-white) !important",
            p: 2.5,
          }}
        >
          {
            !loadingSkletonForAddEducation ? (
              <>
                <Typography
                  component="div"
                  variant="h5"
                  sx={{
                    fontSize: matches ? "18px" : "24px",
                    fontWeight: 700,
                    mb: 4,
                    color: "var(--clr-blue-footer)",
                  }}
                >
                  Add Education
                </Typography>
                <Grid
                  container
                  direction={"row"}
                  alignItems="flex-start"
                  rowSpacing={2.5}
                  columnSpacing={4}
                >
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Healthcare Industry <span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        displayEmpty
                        renderValue={values.healtCareIndustry !== "" ? undefined : () => <SelectPlaceholder>Select Healthcare Industry</SelectPlaceholder>} 
                        name=""
                        error={values.healtCareIndustry === "" && error}
                        value={values.healtCareIndustry}
                        onChange={handleChange("healtCareIndustry")}
                        onKeyDown={handleEducation}
                        fullWidth
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                        inputProps={{
                          classes: {
                            icon: classes.icon,
                          },
                        }}
                        // input={<CustomSelectInput placeholder="Select" />}
                        sx={{ height: "45px"}}
                      >
                        <MenuItem value="" disabled>
                          Select Healthcare Industry
                        </MenuItem>
                        {allHealtCareIndustry?.map((industry) => (
                          <MenuItem
                            key={industry?.healthcareIndustry}
                            value={industry?.healthcareIndustry}
                          >
                            {industry?.healthcareIndustry}
                          </MenuItem>
                        ))}
                      </Select>
                      {!values.healtCareIndustry && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Qualification <span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        displayEmpty
                        renderValue={values.qualification !== "" ? undefined : () => <SelectPlaceholder>Select Qualification</SelectPlaceholder>} 
                        name=""
                        sx={{ height: "45px"}}
                        error={values.qualification === "" && error}
                        value={values.qualification}
                        onChange={handleChange("qualification")}
                        onKeyDown={handleEducation}
                        fullWidth
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                        inputProps={{
                          classes: {
                            icon: classes.icon,
                          },
                        }}
                        // input={<CustomSelectInput />}
                        disabled={values.healtCareIndustry ? false : true}
                      >
                        <MenuItem value="" disabled>
                          Select Qualification
                        </MenuItem>
                        {allQualification?.map((quali) => (
                          <MenuItem
                            key={quali?.qualification}
                            value={quali?.qualification}
                          >
                            {quali?.qualification}
                          </MenuItem>
                        ))}
                      </Select>
                      {qualificationField || (
                        <FormHelperText sx={{ color: "#B8BCCA", mb: 1 }}>
                          To select qualification please select Healthcare Industry first
                        </FormHelperText>
                      )}
                      {!values.qualification && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Course <span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        displayEmpty
                        renderValue={values.course !== "" ? undefined : () => <SelectPlaceholder>Select Course</SelectPlaceholder>} 
                        name=""
                        error={values.course === "" && error}
                        value={values.course}
                        onChange={handleChange("course")}
                        onKeyDown={handleEducation}
                        fullWidth
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                        inputProps={{
                          classes: {
                            icon: classes.icon,
                          },
                        }}
                        // input={<CustomSelectInput />}
                        sx={{ height: "45px"}}
                        disabled={values.healtCareIndustry && values.qualification ? false : true}
                      >
                        <MenuItem value="" disabled>
                          Select Course
                        </MenuItem>
                        {allCourses?.map((course) => (
                          <MenuItem
                            key={course?.course}
                            value={course?.course}
                          >
                            {course?.course}
                          </MenuItem>
                        ))}
                      </Select>
                      {!values.course && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                      {courseField || (
                            <FormHelperText sx={{ color: "#B8BCCA", mb: 1 }}>
                              To select course please select Qualification first
                            </FormHelperText>
                          )}
                    </Box>
                  </Grid>
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Specialization<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        displayEmpty
                        renderValue={values.specilizationID !== "" ? undefined : () => <SelectPlaceholder>Select Specialization</SelectPlaceholder>} 
                        fullWidth
                        error={values.specilizationID === "" && error}
                        value={values.specilizationID}
                        onChange={handleChange("specilizationID")}
                        onKeyDown={handleEducation}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                        // input={<CustomSelectInput />}
                        sx={{ height: "45px"}}
                        inputProps={{
                          classes: {
                            icon: classes.icon,
                          },
                        }}
                        disabled={values.healtCareIndustry && values.qualification && values.course ? false : true}
                      >
                        <MenuItem value="" disabled>
                          Select Specialization
                        </MenuItem>
                        {allSpecialization?.map((singleSpecilization) => (
                          <MenuItem value={singleSpecilization?.emID} >
                            {singleSpecilization?.specialization}
                          </MenuItem>
                        ))}
                      </Select>
                      {!values.specilizationID && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                      {specialField || (
                            <FormHelperText sx={{ color: "#B8BCCA", mb: 1 }}>
                              To select Specialization please select course first
                            </FormHelperText>
                          )}
                    </Box>
                  </Grid>

                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        University<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      {/* <ThemeProvider theme={ItisThim}> */}
                      <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          sx={{
                            "& .MuiAutocomplete-inputRoot":{
                              padding: '3px 0px 3px 7px',
                              height: "45px"
                              // border: "1px solid var(--clr-blue-light) !important",
                            }
                          }}
                          onChange={(event, val) => {
                            VersitySelectHandler(val)
                          }}
                          IconComponent={() => (
                            <ArrowDropDownIcon sx={{color: "var(--clr-blue-footer) !important"}} />
                          )} 
                          options={universityID?.map((option) => option?.name)}
                          renderInput={(params) => <TextField  
                            onChange={(e) => SearchUniversity(e)}
                            // placeholder="Select University"
                            placeholder="Please Select University/Institute Name"
                          {...params} />}
                        />
                      {/* </ThemeProvider> */}
                        
                      {values.institute === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Year Of Passing<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        fullWidth
                        displayEmpty
                        renderValue={values.passingyear !== "" ? undefined : () => <SelectPlaceholder>Select Year</SelectPlaceholder>} 
                        error={values.passingyear === "" && error}
                        value={values.passingyear}
                        onChange={handleChange("passingyear")}
                        onKeyDown={handleEducation}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                        // input={<CustomSelectInput />}
                        sx={{ height: "45px"}}
                        inputProps={{
                          classes: {
                            icon: classes.icon,
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Passing Out Year
                        </MenuItem>
                        {passingYears?.map((year) => (
                          <MenuItem value={year}> {year} </MenuItem>
                        ))}
                      </Select>
                      {values.passingyear === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>Course Type <span style={{ color: "red" }}> *</span></InputLabel>
                      <RadioGroup
                        row
                        error={error}
                        value={values.coursetype}
                        onChange={handleChange("coursetype")}
                        onKeyDown={handleEducation}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Full Time"
                          control={
                            <Radio
                              {...controlProps("Full Time")}
                              sx={{
                                color: "var(--clr-blue-light)",
                                "&.Mui-checked": {
                                  color: "var(--clr-blue-primary)",
                                },
                              }}
                            />
                          }
                          label="Full Time"
                        />
                        <FormControlLabel
                          value="Part Time"
                          control={
                            <Radio
                              {...controlProps("Part Time")}
                              sx={{
                                color: "var(--clr-blue-light)",
                                "&.Mui-checked": {
                                  color: "var(--clr-blue-primary)",
                                },
                              }}
                            />
                          }
                          label="Part Time"
                        />
                      </RadioGroup>
                      {values.coursetype === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid
                    item
                    direction={"column"}
                    xs={12}
                    md={12}
                    justifyContent="flex-end"
                    sx={{ display: "grid" }}
                  >
                    <CardContent>
                      <CardActions
                        sx={{ justifyContent: "flex-end", gap: "1rem", padding: 0 }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{
                            borderRadius: 16,
                            borderWidth: "2px !important",
                            px: 2,
                          }}
                          onClick={onClick}
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
                          onClick={(event) => handleEducation(event, "onClick")}
                        >
                          Save
                        </Button>
                      </CardActions>
                    </CardContent>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            )
          }


        </Card>
      )}

      {addEducation && (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            New educational qualification added.
          </Alert>
        </Snackbar>
      )}

      {error && (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {updateEdu && (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            One educational qualification updated successfully.
          </Alert>
        </Snackbar>
      )}

      {delEducation && (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            One educational qualification deleted successfully.
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Education;
