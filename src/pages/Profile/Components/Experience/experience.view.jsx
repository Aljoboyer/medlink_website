//TODO Hide: Job Type and its options
import {
  Box,
  Button,
  Card,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  FormHelperText,
  InputBase,
  // Input,
  Tooltip,
  Skeleton,
  useMediaQuery,
  TextField,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme , createTheme, ThemeProvider} from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  gqlquery,
  QUERY_HOSPITALMASTER,
  QUERY_DESIGNMASTER,
  QUERY_GETEXPERIENCELIST,
  QUERY_NOTICEMASTER,
} from "../../../../api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useAuth from "../../../../hooks/useAuth";
import Autocomplete from '@mui/material/Autocomplete';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ItisThim = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          borderColor: "var(--clr-blue-light)",
          "&: .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--clr-blue-light)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--clr-blue-primary)",
          },

        },
      }
    }
  }
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
  icon: {
    fill: "var(--clr-blue-footer)",
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

// month Array
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

const Experience = (props) => {
  const {handleStrengthUpdate} = useAuth();
  const [flag, setFlag] = useState(false);
  const [values, setValues] = useState({
    designation: "",
    instituteType: null,
    currentlyWorking: "",
    institution: "",
    noticePeriod: "",
    employmentType: "",
    jobType: "",
    startingYear: "",
    startingMonth: "",
    workingYear: "",
    workingMonth: "",
    jobDescription: "",
    other: "",
    healthInstituteTypeID: '',
  });
  const [error, setError] = useState("");
  const [errDate, setErrDate] = useState("");
  const [errInput, setErrInput] = useState("");
  const [allDesignation, setAllDesignation] = useState([]); 
  const [allHospitals, setAllHospitals] = useState([]);
  const [noticePeriods, setNoticePeriods] = useState([]);
  const [startingYears, setStartingYears] = useState([]);
  const [startingMonths, setStartingMonths] = useState(months);
  const [showUpdateExperience, setShowUpdateExperience] = useState(false);
  const [getExperiencedList, setGetExperiencedList] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [item, setItem] = useState({});
  const [open, setOpen] = useState(false);
  const [addExp, setAddExp] = useState(false);
  const [updateExp, setUpdateExp] = useState(false);
  const [delExp, setDelExp] = useState(false);
  const [errSnack, setErrSnack] = useState("");
  const classes = useStyles();
  const [loadingSkleton, setLoadingSkleton] = useState(true);
  const [loadingSkletonUpdate, setLoadingSkletonUpdate] = useState(true);
  const [loadingSkletonAdd, setLoadingSkletonAdd] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  document.title = "Experience | MedLink Jobs";
  const [allInstituteType, setAllInstituteType] = useState([]);
  const [allInstitution, setAllInstitution] = useState([]);
  const [textErr,setTextErr] = useState('')
  const presentYear = new Date().getFullYear();
  const d = new Date();
  const CHARACTER_LIMIT = 5000;
  let presentMonth = d.getMonth();
  let presentMonthNew = presentMonth + 1;
  const [noticePeriodCheck, setNoticePeriodCheck] = useState([]);
  const [insId, setInsId] = useState('');

  useEffect(( ) => {
    setTimeout(() => {
      setLoadingSkletonUpdate(false);
      setLoadingSkletonAdd(false);
    }, 2500)
  }, [])

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    gqlquery(QUERY_GETEXPERIENCELIST, null)
      .then((res) => res.json())
      .then((datas) => setGetExperiencedList(datas?.data?.getExperienceList))
      .finally(() => {
        setLoadingSkleton(false)
      });
  }, [updateList]);

  
  useEffect(() => {
    const GET_NOTICE_PERIOD = {
      query: `query MyQuery {
        getNoticePeriodMasters {
          notice
          npID
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };
    
    gqlquery(GET_NOTICE_PERIOD, null)
    .then((res) => res.json())
    .then((datas) => {
      setNoticePeriodCheck(datas?.data?.getNoticePeriodMasters)
    });
  },[]);


  useEffect(() => {
    gqlquery(QUERY_DESIGNMASTER, null)
      .then((res) => res.json())
      .then((datas) => setAllDesignation(datas?.data?.getDesignationMaster));

    gqlquery(QUERY_HOSPITALMASTER, null)
      .then((res) => res.json())
      .then((datas) => setAllHospitals(datas?.data?.getHospitalMaster));

    gqlquery(QUERY_NOTICEMASTER, null)
      .then((res) => res.json())
      .then((datas) => setNoticePeriods(datas?.data?.getNoticePeriodMasters));

    function getYears() {
      let yearArr = [];
      let date = new Date();
      let year = date.getFullYear();
      for (let i = 1900; i <= year; i++) {
        yearArr.push(i);
      }
      setStartingYears(yearArr.reverse());
    }
    getYears();

    setStartingMonths(months);
  }, []); 

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleKeyDown = (event, from) => { 
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault(); 
      if(from === "save") {
      handleAddExperience(event);
      } 
      if(from === "update"){
        handleUpdateExpereience(event);
      }
      return;
    }
  };

  values.jobDescription = values?.jobDescription?.replace(/  +/g, ' ');

  console.log("values.currentlyWorking", values.currentlyWorking);
  console.log("values.noticePeriod", values.noticePeriod);
  console.log("Boolean(Number(values.currentlyWorking))", Boolean(Number(values.currentlyWorking)));
  if(values.currentlyWorking === "0"){
    console.log("Notice period not allowed.")
  }
 
  const handleAddExperience = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (
        values.jobDescription === "" || values.jobDescription === " " ||
        !values.designation ||
        !values.institution ||
        !values.currentlyWorking ||
        values.jobType === "" ||
        values.employmentType === "" ||
        (!values.noticePeriod && values.currentlyWorking === '1') ||
        values.startingYear === "" ||
        values.startingMonth === "" || 
        (values.instituteType == 8 ? (values.other === "" || values.other == " " ) :  values.instituteType === "" ) || 
        (values.currentlyWorking == "0" && !values.workingMonth) || 
        (values.currentlyWorking == "0" && !values.workingYear)
      ) {
        setError("Please, select an option.");
        setErrDate("Please, select a date.");
        setErrInput("Input field cannot be empty please write.");
        setTextErr("This field accept only Alphabets."); 
        return;
      }

      if (Boolean(Number(values.currentlyWorking))) {
        if (values.noticePeriod === "") {
          setError("Please, select an option.");
          return;
        }
      }
      if (!Boolean(Number(values.currentlyWorking))) {
        if (values.workingYear === "" || values.workingMonth === "") {
          setErrDate("Please, select a date");
          return;
        }
      }

      let newJobDescription = values.jobDescription?.replaceAll("\n", "<br />");
      const QUERY_POSTEXPERIENCE = {
        query: `mutation MyMutation {
          addExperience(
            healthInstituteID: ${Number(values.institution)},
            healthInstituteTypeID: ${Number(values.instituteType)},
            otherInstituteType : "${values.instituteType == 8 ? values.other : ""}"
            description: "${newJobDescription}",
            designationID: ${Number(values.designation)},
            jobType: "${values.jobType}",
            startingMonth: ${Number(values.startingMonth)},
            startingYear: ${Number(values.startingYear)},
            workingMonth: ${Number(values.workingMonth)},
            workingYear: ${Number(values.workingYear)},
            currentlyWorking: ${Boolean(Number(values.currentlyWorking))},
            noticePeriodID: ${Number(values.noticePeriod)},
            employmentType: "${values.employmentType}"
            )
            {
            currentlyWorking
            description
            designationID
            employmentType
            expID
            healthInstituteID
            healthInstituteTypeID
            jobType
            noticePeriodID
            startingMonth
            startingYear
            workingMonth
            workingYear
          }
        }
                `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_POSTEXPERIENCE, null)
        .then((res) => res.json())
        .then((datas) => {

          if (datas?.data?.addExperience) {
            setUpdateList(!updateList);
            handleStrengthUpdate();
            setAddExp(true);
            setOpen(true);
          } else {
            setErrSnack("Sorry, something went wrong. Please, try again.");
            setOpen(true);
          }
        })
        .finally((e) => console.log("adding experience details to database"));

        values.designation = ""
        values.instituteType = ""
        values.currentlyWorking = ""
        values.institution = ""
        values.noticePeriod = ""
        values.employmentType = ""
        values.jobType = ""
        values.startingYear = ""
        values.startingMonth = ""
        values.workingYear = ""
        values.workingMonth = ""
        values.jobDescription = ""
        values.other = ""


      setFlag((prevData) => !prevData);
      setShowUpdateExperience((prevData) => !prevData);
      setErrInput("");
      setError("");
      setErrDate("");
      setTextErr("")
    }
  };

  const handleUpdateExpereience = (event, from) => {
    console.log("424", values)

  if(event.key === "Enter" || from === "onClick"){
    if (
      values.jobDescription === "" || values.jobDescription === " "  ||
      !values.designation || 
      !values.institution || 
      !values.currentlyWorking ||
      values.jobType === "" ||
      values.employmentType === "" ||
      (((Boolean(Number(values.currentlyWorking))) === true) && (values.noticePeriod === "")) ||
      values.startingYear === "" ||
      values.startingMonth === ""  || (values.instituteType >= 8 ? (values.other === "" || values.other == " " ) :  values.instituteType === ""  ) || 
      (values.currentlyWorking == "0" && !values.workingMonth) || 
        (values.currentlyWorking == "0" && !values.workingYear) 
    ) { 
        setError("Please, select an option.");
        setErrDate("Please, select a date.");
        setErrInput("Input field cannot be empty please write.");
        setTextErr("This field accept only Alphabets."); 
      return;
    }

    /* if (Boolean(Number(values.currentlyWorking))) {
      if (values.noticePeriod === "" ) {
        setError("Please, select an option.");
        return; 
      }
    } */

    if (!Boolean(Number(values.currentlyWorking))) {
      if (values.workingYear === "" || values.workingMonth === "") {
        setErrDate("Please, select a date");
        return; 
      }
    }

    let newJobDescription = values.jobDescription?.replaceAll("\n", "<br />");
    const QUERY_UPDATEEXPERIENCE = {
      query: `mutation MyMutation {
                updateExperience (
                  healthInstituteID: ${isNaN(Number(values.institution)) ? Number(item.healthInstituteID) : Number(values.institution)},
                  healthInstituteTypeID: ${Number(values.instituteType)},
                  otherInstituteType : "${values.other}"
                  description: "${newJobDescription}",
                  designationID: ${Number(values.designation)},
                  jobType: "${values.jobType}",
                  startingMonth: ${Number(values.startingMonth)},
                  startingYear: ${Number(values.startingYear)},
                  workingMonth: ${Number(values.workingMonth)},
                  workingYear: ${Number(values.workingYear)},
                  currentlyWorking: ${Boolean(Number(values.currentlyWorking))},
                  noticePeriodID: ${Number(values.noticePeriod)},
                  employmentType: "${values.employmentType}",
                  expID: "${item?.expID}"
                  )
                  {
                  currentlyWorking
                  description
                  designationID
                  employmentType
                  expID
                  healthInstituteID
                  healthInstituteTypeID
                  jobType
                  noticePeriodID
                  startingMonth
                  startingYear
                  workingMonth
                  workingYear
                }
                }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_UPDATEEXPERIENCE, null)
      .then((res) => res.json())
      .then((datas) => {

        if (datas?.data?.updateExperience) {
          setUpdateList(!updateList);
          handleStrengthUpdate();
          setUpdateExp(true);
          setOpen(true);
          setErrSnack('')
        } else {
          setErrSnack("Sorry, something went wrong. Please, try again.");
          setOpen(true);
        }
      })
      .finally((e) => console.log("updated experience details to database"));

      values.designation = ""
      values.instituteType = ""
      values.currentlyWorking = ""
      values.institution = ""
      values.noticePeriod = ""
      values.employmentType = ""
      values.jobType = ""
      values.startingYear = ""
      values.startingMonth = ""
      values.workingYear = ""
      values.workingMonth = ""
      values.jobDescription = ""
      values.other = ""
    setShowUpdateExperience((prevData) => !prevData);
    setErrInput("");
    setError("");
    setErrDate("");
  }
  };

  const handleDeleteExperience = (e) => {
    setShowUpdateExperience((prevData) => !prevData);

    if (window.confirm("Are you sure you want to delete?")) {
      const QUERY_DELETEEDUCATION = {
        query: `mutation MyMutation {
            deleteExperience (expID: ${item.expID}) {
              currentlyWorking
              description
              designationID
              employmentType
              expID
              healthInstituteID
              healthInstituteTypeID
              jobType
              noticePeriodID
              startingMonth
              startingYear
              workingMonth
              workingYear
              }
            }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_DELETEEDUCATION, null)
        .then((res) => res.json())
        .then((datas) => { 
          if (datas?.data?.deleteExperience) {
            setUpdateList(!updateList);
            handleStrengthUpdate();
            setDelExp(true);
            setOpen(true);
          } else {
            setErrSnack("Sorry, something went wrong. Please, try again.");
            setOpen(true);
          }
        })
        .finally((e) => console.log("Deleting experience details in database"));

      values.designation = "";
      values.hospital = "";
      values.currentlyWorking = "";
      values.startingYear = "";
      values.startingMonth = "";
      values.jobType = "";
      values.employmentType = "";
      values.noticePeriod = "";
      values.workingYear = "";
      values.workingMonth = "";
      values.jobDescription = "";
      setShowUpdateExperience((prevData) => !prevData);
    } else {
      console.log("You don't want to delete this!");
    }
    setShowUpdateExperience((prevData) => !prevData);
  };

  const handleShowUpdateExperience = (item) => { 
    setItem(item);
    values.designation = item?.designationID;
    values.institution = item?.instituteName;
    values.instituteType = allInstituteType?.find((inisti) => inisti?.type === item?.instituteType)?.hitmID ? Number(allInstituteType?.find((inisti) => inisti?.type === item?.instituteType)?.hitmID) : 8;
    values.currentlyWorking = item?.currentlyWorking;
    values.startingYear = item?.startingYear;
    values.startingMonth = item?.startingMonth;
    values.other = Number(item?.healthInstituteTypeID) > 7 ? item?.instituteType : "";
    // values.healthInstituteTypeID = Number(item?.healthInstituteTypeID);
    // values.healthInstituteID = Number(item?.healthInstituteID)
    if(item?.noticePeriodID === 0){
       values.noticePeriod = "";
    }
    else
    {
      values.noticePeriod = item?.noticePeriodID;
    }
    if(item?.workingYear === 0){
      values.workingYear = "";
    }
    else
    {
      values.workingYear = item?.workingYear;
    }
    if(item?.workingMonth === 0){
      values.workingMonth = "";
    }
    else
    {
      values.workingMonth = item?.workingMonth;
    }
    values.employmentType = item?.employmentType;
    values.jobType = item?.jobType;
    values.jobDescription = item?.description;
    setShowUpdateExperience((prevData) => !prevData);

    setAddExp(false);
    setDelExp(false);
    setUpdateExp(false);
  };

  const onClick = (e) => {
    e.preventDefault();
    values.designation = ""
    values.instituteType = ""
    values.currentlyWorking = ""
    values.institution = ""
    values.noticePeriod = ""
    values.employmentType = ""
    values.jobType = ""
    values.startingYear = ""
    values.startingMonth = ""
    values.workingYear = ""
    values.workingMonth = ""
    values.jobDescription = ""
    values.other = ""
    setShowUpdateExperience((prevData) => !prevData);
    setFlag((prevData) => !prevData);
    setErrInput("");
    setError("");
    setErrDate("");
    setTextErr("");

    setAddExp(false);
    setDelExp(false);
    setUpdateExp(false);
  };

  const handleCancelUpdate = (e) => {
    values.designation = ""
    values.instituteType = ""
    values.currentlyWorking = ""
    values.institution = ""
    values.noticePeriod = ""
    values.employmentType = ""
    values.jobType = ""
    values.startingYear = ""
    values.startingMonth = ""
    values.workingYear = ""
    values.workingMonth = ""
    values.jobDescription = ""
    values.other = ""
    setErrInput("");
    setError("");
    setErrDate("");
    setShowUpdateExperience((prevData) => !prevData);

    setAddExp(false);
    setDelExp(false);
    updateExp(false)
  };

  function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }; 

  useEffect(() => {
    const GET_INSTITUTE_TYPE = {
      query: `query MyQuery {
        getHITypeMaster {
          hitmID
          type
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };
    
    gqlquery(GET_INSTITUTE_TYPE, null)
    .then((res) => res.json())
    .then((datas) => {
 
      setAllInstituteType(datas?.data?.getHITypeMaster) 
    });
  },[])

  useEffect(() => {
    const GET_INSTITUTE = {
      query: `query MyQuery {
        getHealthInstituteMaster {
          himID
          name
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };
    
    gqlquery(GET_INSTITUTE, null)
    .then((res) => res.json())
    .then((datas) => {
 
      setAllInstitution(datas?.data?.getHealthInstituteMaster)
    });
  },[])

  const SearchInstitutions = (event) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val
 
    if(event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2){

      const GET_INSTITUTE= {
        query: `query MyQuery {
          getHealthInstitutes(institute: "${event.target.value}") {
            himID
            name
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      
      gqlquery(GET_INSTITUTE, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllInstitution([...datas?.data?.getHealthInstitutes])
      });
    }
    else {
     
      const GET_INSTITUTE = {
        query: `query MyQuery {
          getHealthInstituteMaster {
            himID
            name
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      
      gqlquery(GET_INSTITUTE, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllInstitution(datas?.data?.getHealthInstituteMaster)
      });
    }

  }

  const InstitutionHandler = (e) => {

    const FintInstitute = allInstitution?.find((vars) => vars?.name === e)

    setValues({...values, institution: FintInstitute?.himID})
  }

// const InstitutionTypeUpdate = (type) => {

//     const Ids = allInstituteType?.find((inisti) => inisti?.type === type.target.value)
  
//     values.healthInstituteTypeID = Ids.hitmID

//     if(Ids.hitmID !== 8){
//       setValues({...values, other: ''})
//     }
    
// }
  let resText = /^[a-zA-Z ]*$/;
  values.other = values.other?.replace(/  +/g, ' ');

 
  
  return (
    <Box sx={{ mt: 6, mb: 10 }}>
      {!flag ? (
        <Box>
          {!showUpdateExperience ? (
            <Card
              sx={{
                backgroundColor: "var(--clr-white) !important",
                boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                border : matches ? "1px solid #E4EEF5" : "",
                borderRadius: 2,
                minHeight: 400,
                p: 2.5,
              }}
            >
              {
                !loadingSkleton ? (
                  <>
                    <Grid container direction={"row"} alignItems="flex-start">
                      <Grid
                        item
                        direction={"column"}
                        xs={12}
                        md={12}
                        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            component="div"
                            variant="h5"
                            sx={{
                              fontSize : matches ? "18px" : "24px",
                              fontWeight: 700,
                              color: "var(--clr-blue-footer)",
                              mb: 2,
                            }}
                          >
                            Experience
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
                              Add Experience
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
                              Add Experience
                            </Button>
                            )
                          }
                        
                        </Box>
                        {getExperiencedList?.map((item, index) => ( 
                          <Grid
                            container
                            direction={"row"}
                            alignItems="flex-start"
                            // justifyContent={"space-between"}
                            rowSpacing={2.5}
                            columnSpacing={4}
                          >
                            <Grid item direction={"column"} xs={12} md={3}>
                              <Typography variant="subtitle1" sx={{...textStyle , pt: 0.2 }}>
                                <div style={{marginBottom : matches ? "12px" : ""}}>
                                  {
                                    item?.startingMonth && toMonthName(item?.startingMonth)
                                  }
                                  &nbsp;
                                  {item?.startingYear} to &nbsp;
                                  {item?.currentlyWorking ? (
                                    "Current"
                                  ) : (
                                    <span>
                                      {
                                        item?.workingMonth && toMonthName(item?.workingMonth)
                                      }
                                      &nbsp;
                                      {item?.workingYear}
                                    </span>
                                  )}
                                </div>
                              </Typography>
                            </Grid> 
                            <Grid item direction={"column"} xs={12} md={8}>
                              <Box
                                  sx={{
                                    display: "grid",
                                    lineHeight: "24px",
                                  }}
                                >
                                  <Box sx={{  display: "flex",  gap: 5, alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                    <Typography
                                      variant="subtile1"
                                      sx={{
                                        fontSize: "1rem",
                                        fontWeight: 600,
                                        color: "var(--clr-gray-1)",
                                      }}
                                    >
                                      {item?.designation}
                                    </Typography>
                                    <Box sx={{ margin: "0 0 0 40px" }}>
                                      <Button>
                                        <Tooltip title="Update Experience.">
                                          <IconButton sx={{mt: "-10px"}} onClick={() => handleShowUpdateExperience(item)}>
                                            <EditIcon
                                              sx={{ fontSize: "medium", color: "var(--clr-blue-primary)" }}
                                            />
                                          </IconButton>
                                        </Tooltip>
                                      </Button>
                                    </Box>
                                  </Box>

                                  <Box sx={{mt: -0.5, display: "flex", flexDirection: "column", gap: 0.3}}>
                                    <Typography  variant="info" sx={{fontSize: "12px", fontWeight: "600", color: "#828282",}}>
                                      {item?.instituteType} 
                                    </Typography>
                                    <Typography variant="info" sx={{fontSize: "12px", fontWeight: "600", color: "#828282",}}>
                                      {item?.instituteName}
                                    </Typography>
                                    <Typography variant="info" sx={{fontSize: "12px", fontWeight: "600", color: "#828282",}}>
                                      Currently Working: {item?.currentlyWorking ? 'Yes' : 'No'}
                                    </Typography>
                                    <Typography variant="info" sx={boldText}>
                                      Job Type: &nbsp;
                                      {item?.jobType}
                                    </Typography>
                                    <Typography variant="info" sx={boldText}>
                                      Employment Type: &nbsp;
                                      {item?.employmentType}
                                    </Typography>
                                  </Box>
                                  {
                                    item?.noticePeriodID !== 0 &&
                                  <Typography variant="info" sx={boldText}>
                                    Notice Period: &nbsp;
                                    {
                                      noticePeriodCheck?.map((nots) => (
                                        item?.noticePeriodID == nots?.npID ? nots?.notice : ''
                                      ))
                                    }
                                  </Typography>
                                  }
                                  <Typography sx={{fontSize: "12px", fontWeight: "400px", color: "#828282", mt: "6px"}}>
                                    {/* {item?.description} */}
                                    {item?.description?.split("<br />").map(item => (
                                            <>
                                              {item} <br />
                                            </>
                                          ))} 
                                  </Typography>
                              </Box>
                            </Grid> 
                          </Grid>       
                        ))}
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                  </>
                )
              } 
            </Card>
          ) : (
            <Card
              sx={{
                backgroundColor: "var(--clr-white) !important",
                boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                border : matches ? "1px solid #E4EEF5" : "",
                borderRadius: 2,
                minHeight: 400,
                p: 2.5,
              }}
            >
              {
                !loadingSkletonUpdate ? (
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
                    fontSize : matches ? "18px" : "24px",
                    fontWeight: 700,
                    color: "var(--clr-blue-footer)",
                  }}
                >
                  Update Experience
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
                  onClick={handleDeleteExperience}
                >
                  Delete
                </Button>
              </Box> 
              <>
                <Grid
                  container
                  direction={"row"}
                  alignItems="flex-start"
                  justifyContent={"space-between"}
                  rowSpacing={2.5}
                  columnSpacing={4}
                >
                  {/* designation */}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Designation/Job Role<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        defaultValue={item?.designationID}
                        error={values.designation === "" && error}
                        onChange={handleChange("designation")}
                        onKeyDown={handleUpdateExpereience}
                        displayEmpty
                        renderValue={values.designation !== "" ? undefined : () => <SelectPlaceholder>Select Designation/Job Role</SelectPlaceholder>} 
                        fullWidth
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                        inputProps={{ classes: { icon: classes.icon } }}
                        // input={<CustomSelectInput />}
                        sx={{ height: "45px"}}
                      >
                        <MenuItem value="" disabled>
                          Select Designation/Job Role
                        </MenuItem>
                        {allDesignation?.map((singleDesignation) => (
                          <MenuItem
                            key={singleDesignation?.dmID}
                            value={singleDesignation?.dmID}
                          >
                            {singleDesignation?.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {values.designation === "" && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  {/* institute type */}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Health Institution Type<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        fullWidth
                        displayEmpty
                        renderValue={values.instituteType !== "" ? undefined : () => <SelectPlaceholder>Select Health Institution Type</SelectPlaceholder>}
                        error={values.instituteType === "" && error}
                        value={values.instituteType}
                        onChange={handleChange("instituteType")}
                        onKeyDown={handleAddExperience}
                        inputProps={{ classes: { icon: classes.icon } }}
                        // input={<CustomSelectInput />}
                        sx={{ height: "45px"}}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                          Select Health Institution Type
                        </MenuItem>
                        {allInstituteType?.map((intitute) => (
                          <MenuItem value={intitute?.hitmID}>{intitute?.type}</MenuItem>
                        ))}
                      </Select>
                      {values.instituteType === "" && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {error}
                        </FormHelperText>
                      )} 
                    </Box>
                  </Grid>
                  {
                    (values.instituteType == 8) && (<Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      {" "}
                    </Box>
                  </Grid>)
                  }

                  { 
                    (values.instituteType == 8) && <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <TextField
                          variant="outlined"
                          placeholder="Enter Institute Type"
                          sx={{
                            borderRadius: 1,
                            color: "var(--clr-blue-light)",
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
                          onChange={handleChange("other")}
                          onKeyDown={handleAddExperience}
                          fullWidth
                          error={values.other === "" && errInput}
                          disableUnderline
                          value = {values.other} 
                        />

                      {(values.other == "" || values.other == " ")&& (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {errInput}
                        </FormHelperText>
                      )}
                       {((!values.other) && ((values.other === " ") || ((resText.test(values.other)) === false))) && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {textErr}
                        </FormHelperText>
                      )}

                    </Box>
                  </Grid>
                  } 

                  {/* Health Institution Name*/}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Health Institution Name<span style={{ color: "red" }}> *</span>
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
                            InstitutionHandler(val)
                          }}
                          defaultValue={values.institution}
                          onKeyDown={handleAddExperience}
                          options={allInstitution?.map((option) => option.name)}
                          renderInput={(params) => <TextField 
                            
                            onChange={(e) => {
                              SearchInstitutions(e)
                          
                          }}
                          placeholder="Select Health Institution Name"
                          {...params} />}
                        />
                      {/* </ThemeProvider> */}
                      {!values.institution && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Currently Working Or Not?  <span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <RadioGroup
                        row
                        defaultValue={item?.currentlyWorking ? parseInt(1) : parseInt(0)}
                        error={values.currentlyWorking === "" && error}
                        onChange={handleChange("currentlyWorking")}
                        onKeyDown={handleUpdateExpereience}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <FormControlLabel
                          value={parseInt(1)}
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
                          label="Yes"
                        />
                        <FormControlLabel
                          value={parseInt(0)}
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
                          label="No"
                        />
                      </RadioGroup>
                      {values.currentlyWorking === "" && (
                        <FormHelperText sx={{ color: "red", mt: -0.5 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Grid container rowSpacing={2.5}  columnSpacing={4}>
                       {/* startingYear  */}
                        <Grid item direction={"column"} xs={12} md={6}>
                          <Box>
                            <InputLabel sx={{ py: 0.5 }}>
                            Joining Year<span style={{ color: "red" }}> *</span>
                            </InputLabel>
                            <Select
                              defaultValue={item?.startingYear}
                              error={values.startingYear === "" && errDate}
                              onChange={handleChange("startingYear")}
                              onKeyDown={handleUpdateExpereience}
                              fullWidth
                              displayEmpty
                              renderValue={values.startingYear !== "" ? undefined : () => <SelectPlaceholder>Select Joining Year</SelectPlaceholder>}
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                              inputProps={{ classes: { icon: classes.icon } }}
                              // input={<CustomSelectInput />}
                              sx={{ height: "45px"}}
                            >
                              <MenuItem value="" disabled> 
                                Select Joining Year
                              </MenuItem>
                              {startingYears?.map((year) => (
                                <MenuItem key={year} value={year}>
                                  {year}
                                </MenuItem>
                              ))}
                            </Select>
                            {values.startingYear === "" && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {errDate}
                              </FormHelperText>
                            )}
                          </Box>
                        </Grid>
                        {/* startingMonth */}
                        <Grid item direction={"column"} xs={12} md={6}>
                          <Box>
                            <InputLabel sx={{ py: 0.5 }}>
                            Joining Month<span style={{ color: "red" }}> *</span>
                            </InputLabel>
                            <Select
                              defaultValue={item?.startingMonth}
                              error={values.startingMonth === "" && errDate}
                              onChange={handleChange("startingMonth")}
                              onKeyDown={handleUpdateExpereience}
                              fullWidth
                              displayEmpty
                              renderValue={values.startingMonth !== "" ? undefined : () => <SelectPlaceholder>Select Joining Month</SelectPlaceholder>}
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                              inputProps={{ classes: { icon: classes.icon } }}
                              // input={<CustomSelectInput />}
                              sx={{ height: "45px"}}
                            >
                              <MenuItem value="" disabled> 
                                Select Joining Month
                              </MenuItem>
                              {startingMonths?.map((month) => (
                                <MenuItem disabled={(values.startingYear === presentYear) && (presentMonthNew < month.value ) ? true : false} key={month?.value} value={month?.value}>
                                  {month?.name}
                                </MenuItem>
                              ))}
                            </Select>
                            {values.startingYear === "" && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {errDate}
                              </FormHelperText>
                            )}
                          </Box>
                        </Grid>
                    </Grid>
                  </Grid>
                  
                    {/* notice Period  */}
                 {Boolean(Number(values.currentlyWorking)) === false ? ( 
                  <>
                  </>
                  ):(
                    <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Notice Period<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        fullWidth
                        displayEmpty
                        renderValue={values.noticePeriod !== "" ? undefined : () => <SelectPlaceholder>Select Notice Period</SelectPlaceholder>}
                        error={values.noticePeriod === "" && error} 
                        value={values.noticePeriod}
                        onChange={handleChange("noticePeriod")}
                        onKeyDown={handleUpdateExpereience}
                        inputProps={{ classes: { icon: classes.icon } }}
                        // input={<CustomSelectInput />}
                        sx={{ height: "45px"}}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                          Select Notice Period
                        </MenuItem>
                        {noticePeriods?.map((notice) => (
                          <MenuItem value={notice?.npID}>{notice?.notice}</MenuItem>
                        ))}
                      </Select>
                      {(((Boolean(Number(values.currentlyWorking))) === true) && (values.noticePeriod === "")) && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  )}
                  {/* Worked till Year and working till month  */}
                  {Boolean(Number(values.currentlyWorking)) === false ? (
                    <Grid item xs={12} md={6}>
                    <Grid container rowSpacing={2.5} columnSpacing={4}>
                        <Grid item direction={"column"} xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Relieved Year
                                <span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <Select
                                defaultValue={item?.workingYear}
                                error={values.workingYear === "" && errDate}
                                onChange={handleChange("workingYear")}
                                onKeyDown={handleUpdateExpereience}
                                fullWidth
                                displayEmpty
                                renderValue={values.workingYear !== "" ? undefined : () => <SelectPlaceholder>Select Relieved Year</SelectPlaceholder>}
                                MenuProps={{
                                  classes: { paper: classes.menuPaper },
                                }}
                                inputProps={{ classes: { icon: classes.icon } }}
                                // input={<CustomSelectInput />}
                                sx={{ height: "45px"}}
                              >
                                <MenuItem value="" disabled> 
                                  Select Relieved Year
                                </MenuItem>
                                {startingYears?.map((year) => (
                                  <MenuItem key={year} value={year} disabled={values.startingYear > year} >
                                    {year}
                                  </MenuItem>
                                ))}
                              </Select>
                              {values.workingYear === "" && (
                                <FormHelperText sx={{ color: "red", mb: 1 }}>
                                  {errDate}
                                </FormHelperText>
                              )}
                            </Box>
                        </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Relieved Month
                            <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Select
                            defaultValue={item?.workingMonth}
                            error={values.workingMonth === "" && errDate}
                            onChange={handleChange("workingMonth")}
                            onKeyDown={handleUpdateExpereience}
                            fullWidth
                            displayEmpty
                            renderValue={values.workingMonth !== "" ? undefined : () => <SelectPlaceholder>Select Relieved Month</SelectPlaceholder>}
                            MenuProps={{
                              classes: { paper: classes.menuPaper },
                            }}
                            inputProps={{ classes: { icon: classes.icon } }}
                            // input={<CustomSelectInput />}
                            sx={{ height: "45px"}}
                          >
                            <MenuItem value="" disabled> 
                              Select Relieved Month
                            </MenuItem>
                            {startingMonths?.map((month) => (
                              <MenuItem disabled={((values.workingYear === presentYear) && (presentMonthNew < month.value ) ? true : false) || ((values.workingYear === values.startingYear) && (values.startingMonth > month.value ) ? true : false)} key={month?.value} value={month?.value}>
                                {month?.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {values.workingMonth === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {errDate}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                    </Grid>
                  ) : (
                    <></>
                  )}

              {/* employment type  */}
                  <Grid item xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Employment Type? <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <RadioGroup
                            row
                            error={values.employmentType === "" && error}
                            defaultValue={item?.employmentType}
                            onChange={handleChange("employmentType")}
                            onKeyDown={handleUpdateExpereience}
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Full Time"
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
                              label="Full Time"
                            />
                            <FormControlLabel
                              value="Part Time"
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
                              label="Part Time"
                            />
                            <FormControlLabel
                              value="Locum"
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
                              label="Locum"
                            />
                          </RadioGroup>
                          {values.employmentType === "" && (
                            <FormHelperText
                              sx={{ color: "red", mt: -0.5, mb: 1 }}
                            >
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                  </Grid>
                {/* job type  */}
                <Grid item  xs={12} md={6}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>Job Type? <span style={{ color: "red" }}> *</span></InputLabel>
                    <RadioGroup
                      row
                      error={values.jobType === "" && error}
                      defaultValue={item?.jobType}
                      onChange={handleChange("jobType")}
                      onKeyDown={handleUpdateExpereience}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Permanent"
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
                        label="Permanent"
                      />
                      <FormControlLabel
                        value="Contractual"
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
                        label="Contractual"
                      />
                    </RadioGroup>
                    {values.jobType === "" && (
                      <FormHelperText
                        sx={{ color: "red", mt: -0.5, mb: 1 }}
                      >
                        {error}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
              {/* Job Description  */}
                    <Grid item  xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Job description<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                    </Box>
                      <TextField
                        variant="outlined"
                        multiline
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": {
                              // padding: '10.5px 14px',
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
                        rows={7}
                        fullWidth
                        disableUnderline
                        // placeholder="Job description"
                        placeholder="Type Here..."
                        error={values.jobDescription === "" && errInput}
                        defaultValue={item?.description?.replaceAll("<br />", "\n")}
                        onChange={handleChange("jobDescription")}
                        onKeyDown={(event) => handleKeyDown(event, "update")}
                        sx={{ borderRadius: 1 }}
                        inputProps={{
                          maxlength: CHARACTER_LIMIT,
                        }}
                      />
                    {(values.jobDescription === "") && (
                      <FormHelperText sx={{ color: "red", mt: 0 }}>
                        {errInput}
                      </FormHelperText>
                    )}
                    {((values.jobDescription  !== "") && (values.jobDescription === " ")) && (
                      <FormHelperText sx={{ color: "red", mt: 0 }}>
                        {errInput}
                      </FormHelperText>
                    )}
                    <FormHelperText>
                       {`${values?.jobDescription?.replaceAll("<br />","\n")?.length}/${CHARACTER_LIMIT}`}
                    </FormHelperText>
                  </Grid>

                </Grid>

                <Grid item direction={"column"} xs={12} md={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 3,
                      mt: 6,
                      mb: 2.5,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={handleCancelUpdate}
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
                      onClick={(event) => handleUpdateExpereience(event, "onClick")}
                    >
                      Update
                    </Button>
                  </Box>
                </Grid>
              </>
                  </>
                ) : (
                  <>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                  </>
                )
              }
            
            </Card>
          )}
        </Box>
      ) : (
        <Card
          sx={{
            backgroundColor: "var(--clr-white) !important",
            boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
            border : matches ? "1px solid #E4EEF5" : "",
            borderRadius: 2,
            minHeight: 400,
            p: 2.5,
          }}
        >
           {
                !loadingSkletonAdd ? (
                  <><Typography component="div" variant="h5"
                  sx={{
                  fontSize : matches ? "18px" : "24px",
                  fontWeight: 700,
                  color: "var(--clr-blue-footer)",
                  mb: 3,}}>
                  Add Experience
                </Typography>
                <Grid
                  container
                  direction={"row"}
                  alignItems="flex-start"
                  justifyContent={"space-between"}
                  rowSpacing={2.5}
                  columnSpacing={4}
                >
                  {/* designation  */}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Designation/Job Role<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        fullWidth
                        displayEmpty
                        renderValue={values.designation !== "" ? undefined : () => <SelectPlaceholder>Select Designation/Job Role</SelectPlaceholder>} 
                        error={values.designation === "" && error}
                        value={values.designation}
                        onChange={handleChange("designation")}
                        onKeyDown={handleAddExperience}
                        inputProps={{ classes: { icon: classes.icon } }}
                        // input={<CustomSelectInput />}
                        sx={{ height: "45px"}}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                        Select Designation/Job Role
                        </MenuItem>
                        {allDesignation?.map((singleDesignation) => (
                          <MenuItem value={singleDesignation?.dmID}>
                            {singleDesignation?.name}
                          </MenuItem>
                        ))}
                      </Select>

                      {values.designation === "" && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  {/* institute type */}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Health Institution Type<span style={{ color: "red" }}> *</span>
                      </InputLabel>

                      <Select
                        fullWidth
                        displayEmpty
                        renderValue={values.instituteType !== "" ? undefined : () => <SelectPlaceholder>Select Health Institution Type</SelectPlaceholder>} 
                        error={values.instituteType === "" && error}
                        value={values.instituteType}
                        onChange={handleChange("instituteType")}
                        onKeyDown={handleAddExperience}
                        inputProps={{ classes: { icon: classes.icon } }}
                        // input={<CustomSelectInput />}
                        sx={{ height: "45px"}}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                          Select Health Institution Type
                        </MenuItem>
                        {allInstituteType?.map((intitute) => (
                          <MenuItem value={intitute?.hitmID}>{intitute?.type}</MenuItem>
                        ))}
                      </Select>
                      {values.instituteType === "" && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  
                  {
                    values.instituteType == 8 && <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      {" "}
                    </Box>
                  </Grid>
                  }

                  {
                    values.instituteType == 8 && <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <TextField
                          variant="outlined"
                          placeholder="Enter Institute Type"
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
                          onChange={handleChange("other")}
                          onKeyDown={handleAddExperience}
                          fullWidth
                          error={values.other === "" && errInput}
                          disableUnderline
                        /> 
                      {(values.other === "" || values.other === " ") && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {errInput}
                        </FormHelperText>
                      )}
                       {((!values.other) && ((values.other === " ") || ((resText.test(values.other)) === false))) && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {textErr}
                        </FormHelperText>
                      )}

                    </Box>
                  </Grid>
                  }
                  
                  {/* Health Institution Name*/}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Health Institution Name<span style={{ color: "red" }}> *</span>
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
                            InstitutionHandler(val)
                          }}
                          onKeyDown={handleAddExperience}
                          options={allInstitution?.map((option) => option.name)}
                          renderInput={(params) => <TextField 
                            
                            onChange={(e) => {
                              SearchInstitutions(e)
                          
                          }}
                          placeholder="Select Health Institution Name"
                          {...params} />}
                        />
                      {/* </ThemeProvider> */}
                      {values.institution === "" && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  {/* currentlyWorking  */}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>Currently Working? <span style={{ color: "red" }}> *</span></InputLabel>
                      <RadioGroup
                        row
                        error={error}
                        value={values.currentlyWorking}
                        onChange={handleChange("currentlyWorking")}
                        onKeyDown={handleAddExperience}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value={parseInt(1)}
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
                          label="Yes"
                        />
                        <FormControlLabel
                          value={parseInt(0)}
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
                          label="No"
                        />
                      </RadioGroup>
                      {values.currentlyWorking === "" && (
                        <FormHelperText sx={{ color: "red", mt: -0.5 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  {/* startingYear and startingMonth  */}
                  <Grid item direction={"column"} xs={12} md={3}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                      Joining Year <span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        fullWidth
                        displayEmpty
                        renderValue={values.startingYear !== "" ? undefined : () => <SelectPlaceholder>Select Joining Year</SelectPlaceholder>} 
                        error={values.startingYear === "" && errDate}
                        value={values.startingYear}
                        onChange={handleChange("startingYear")}
                        onKeyDown={handleAddExperience}
                        inputProps={{ classes: { icon: classes.icon } }}
                        // input={<CustomSelectInput />}
                        sx={{ height: "45px"}}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                          Select Joining Year
                        </MenuItem>
                        {startingYears?.map((year) => (
                          <MenuItem value={year}>{year}</MenuItem>
                        ))}
                      </Select>
                      {values.startingYear === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {errDate}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  
                  <Grid item direction={"column"} xs={12} md={3}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                      Joining Month<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        fullWidth
                        displayEmpty
                        renderValue={values.startingMonth !== "" ? undefined : () => <SelectPlaceholder>Select Joining Month</SelectPlaceholder>} 
                        error={values.startingMonth === "" && errDate}
                        value={values.startingMonth}
                        onChange={handleChange("startingMonth")}
                        onKeyDown={handleAddExperience}
                        inputProps={{ classes: { icon: classes.icon } }}
                        // input={<CustomSelectInput />}
                        sx={{ height: "45px"}}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                          Select Joining Month
                        </MenuItem>
                        {startingMonths?.map((month) => (
                          <MenuItem disabled={(values.startingYear === presentYear) && (presentMonthNew < month.value ) ? true : false}  key={month?.value} value={month?.value}>
                            {month?.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {values.startingMonth === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {errDate}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>

                  {/* -----Releived year and month------ */}

                   {Boolean(Number(values.currentlyWorking)) === true ? (
                    <>
                    <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Notice Period<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        fullWidth
                        displayEmpty
                        renderValue={values.noticePeriod !== "" ? undefined : () => <SelectPlaceholder>Select Notice Period</SelectPlaceholder>} 
                        error={values.noticePeriod === "" && error}
                        value={values.noticePeriod}
                        onChange={handleChange("noticePeriod")}
                        onKeyDown={handleAddExperience}
                        inputProps={{ classes: { icon: classes.icon } }}
                        // input={<CustomSelectInput />}
                        sx={{ height: "45px"}}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                          Select Notice Period
                        </MenuItem>
                        {noticePeriods?.map((notice) => (
                          <MenuItem value={notice?.npID}>{notice?.notice}</MenuItem>
                        ))}
                      </Select>
                      {values.noticePeriod === "" && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item direction={"column"} xs={12} md={3}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                          Relieved Year<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Select
                            disabled={!values.startingMonth || !values.startingYear}
                            fullWidth
                            displayEmpty
                            renderValue={values.workingYear !== "" ? undefined : () => <SelectPlaceholder>Select Relieved Year</SelectPlaceholder>} 
                            error={values.workingYear === "" && errDate}
                            value={values.workingYear}
                            onChange={handleChange("workingYear")}
                            onKeyDown={handleAddExperience}
                            inputProps={{ classes: { icon: classes.icon } }}
                            // input={<CustomSelectInput />}
                            sx={{ height: "45px"}}
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                          >
                            <MenuItem value="" disabled>
                              Select Relieved Year
                            </MenuItem>
                            {startingYears?.map((year) => (
                              <MenuItem value={year} disabled={values.startingYear > year}>{year}</MenuItem>
                            ))}
                          </Select>
                          {values.workingYear === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {errDate}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={3}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                          Relieved Month<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Select
                            disabled={!values.startingMonth || !values.startingYear}
                            fullWidth
                            displayEmpty
                            renderValue={values.workingMonth !== "" ? undefined : () => <SelectPlaceholder>Select Relieved Month</SelectPlaceholder>} 
                            error={values.workingMonth === "" && errDate}
                            value={values.workingMonth}
                            onChange={handleChange("workingMonth")}
                            onKeyDown={handleAddExperience}
                            inputProps={{ classes: { icon: classes.icon } }}
                            // input={<CustomSelectInput />}
                            sx={{ height: "45px"}}
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                          >
                            <MenuItem value="" disabled>
                              Select Relieved Month
                            </MenuItem>
                            {startingMonths?.map((month) => (
                              <MenuItem disabled={((values.workingYear === presentYear) && (presentMonthNew < month.value ) ? true : false) || ((values.workingYear === values.startingYear) && (values.startingMonth > month.value ) ? true : false)} key={month?.value} value={month?.value}>
                                {month?.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {values.workingMonth === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {errDate}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                    </>
                  )}
              
                      {/* employment type  */}
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>Employment Type? <span style={{ color: "red" }}> *</span></InputLabel>
                          <RadioGroup
                            row
                            error={values.employmentType === "" && error}
                            value={values.employmentType}
                            onChange={handleChange("employmentType")}
                            onKeyDown={handleAddExperience}
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Full Time"
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
                              label="Full Time"
                            />
                            <FormControlLabel
                              value="Part Time"
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
                              label="Part Time"
                            />
                            <FormControlLabel
                              value="Locum"
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
                              label="Locum"
                            />
                          </RadioGroup>
                          {values.employmentType === "" && (
                            <FormHelperText sx={{ color: "red", mt: -0.5, mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      {/* job type  */}
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>Job Type <span style={{ color: "red" }}> *</span></InputLabel>
                          <RadioGroup
                            row
                            error={values.jobType === "" && error}
                            value={values.jobType}
                            onChange={handleChange("jobType")}
                            onKeyDown={handleAddExperience}
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Permanent"
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
                              label="Permanent"
                            />
                            <FormControlLabel
                              value="Contractual"
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
                              label="Contractual"
                            />
                          </RadioGroup>
                          {values.jobType === "" && (
                            <FormHelperText sx={{ color: "red", mt: -0.5, mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>

                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Job Description<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            variant="outlined"
                            multiline
                            rows={7}
                            InputProps={{
                            sx: {
                                ".MuiOutlinedInput-input": { 
                                  // padding: '10.5px 14px',
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
                            fullWidth
                            // placeholder="Job description"
                            placeholder="Type Here..."
                            error={values.jobDescription === "" && errInput}
                            value={values.jobDescription}
                            onChange={handleChange("jobDescription")}
                            onKeyDown={(event) => handleKeyDown(event, "save")}
                            sx={{ borderRadius: 1 }}
                            disableUnderline
                            inputProps={{
                              maxlength: CHARACTER_LIMIT,
                            }}
                          />
                          {(values.jobDescription  === "") && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                          {((values.jobDescription  !== "") && (values.jobDescription === " ")) && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                          <FormHelperText>
                            {`${values?.jobDescription?.replaceAll("<br />","\n")?.length}/${CHARACTER_LIMIT}`}
                          </FormHelperText>
                        </Box>
                      </Grid>

                        <Grid item direction={"column"} xs={12} md={12}>
                          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
                            <Button
                              variant="outlined"
                              onClick={onClick}
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
                              onClick={(event) => handleAddExperience(event, "onClick")}
                            >
                              Save
                            </Button>
                          </Box>
                        </Grid>
                </Grid>
                  </>
                ) : (
                  <>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                   <Skeleton/>
                  </>
                )
              }
          
        </Card>
      )}

      {addExp && (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            New Experience added successfully.
          </Alert>
        </Snackbar>
      )}

      {errSnack && (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errSnack}
          </Alert>
        </Snackbar>
      )}

      {updateExp && (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
             Experience details updated successfully.
          </Alert>
        </Snackbar>
      )}

      {delExp && (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Deletion of the experience details is successful.
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Experience;

const textStyle = { fontSize: "12px", color: "#828282" };
const boldText = { ...textStyle, fontWeight: "bolder" };
