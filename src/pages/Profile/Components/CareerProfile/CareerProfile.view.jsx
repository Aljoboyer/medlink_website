import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  CardActions,
  Select,
  MenuItem,
  FormHelperText,
  Slider,
  FormGroup,
  FormControlLabel,
  InputLabel,
  // Input,
  TextField,
  InputBase,
  IconButton,
  Checkbox,
  Tooltip,
  Skeleton,
  useMediaQuery,
  Autocomplete,
  // Chip
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  GET_PREFERRED_LOCATION,
  gqlquery,
  QUERY_DEPARTMENTS,
  QUERY_GETCANDIDATEAVAILABILITY,
  QUERY_GETCAREERPROFILE,
} from "../../../../api";
import useAuth from "../../../../hooks/useAuth";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

const LocationArr = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Andaman and Nicobar Islands", "Bihar",
"Chattisgarh", "Chandigarh" , "Dadra and Nagar Haveli and Daman & Diu", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
"Jharkhand", "Jammu & Kashmir", "Madhya Pradesh","Karnataka","Kerala","Ladakh","Lakshadweep","Maharashtra",
"Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Puducherry","Rajasthan","Sikkim","Telangana",
"Tripura", "Tamil Nadu", "The Government of NCT of Delhi", "Uttarakhand","Uttar Pradesh","West Bengal"
]

const CareerProfile = () => {
  const [flag, setFlag] = useState(false);
  const {handleStrengthUpdate} = useAuth();
  const [values, setValues] = useState({
    desiredRoleCategory: "",
    desiredIndustry: "",
    desiredJobType: "",
    desiredShift: "",
    desiredEmploymentType: "",
    preferredWorkLocation: "",
    availabilityDay: "",
    availabilityFromTime: "",
    availabilityToTime: "",
    industryID: '',
    roleCategoryID: '',
    expectedSalary: [0, 99],
    phone: true,
    email: false,
    industryName: "",
    roleCategoryName: ""
  });
  const [error, setError] = useState("");
  const [availabilityError, setAvailabilityError] = useState("");
  const [errInput, setErrInput] = useState("");
  const [validAlphabetsErr, setValidAlphabetsErr] = useState("");
  const [getAvailability, setGetAvailability] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [careerItem, setCareerItem] = useState({});
  const [masterDepartment, setMasterDepartment] = useState([]);
  const [showUpdateCareerScreen, setShowUpdateCareerScreen] = useState(false);
  const classes = useStyles();
  const [loadingSkleton, setLoadingSkleton] = useState(true);
  const [loadingSkletonUpdate, setLoadingSkletonUpdate] = useState(true);
  const [loadingSkletonAdd, setLoadingSkletonAdd] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [allDesiredIndustry, setAllDesiredIndustry] = useState([]);
  const [allDesiredRole, setAllDesiredRole] = useState([]);
  // const [preferredLocation,setPreferredLocation] = useState(null);
  const [added, setAdded] = useState(false);
  const [detailsAlert, setDetailsAlert] = useState(false);
  const [allCityLocation, setAllCityLocation] = useState([]);
  const [selectedCityLocation, setSelectedCityLocation] = useState([]);
  const [preferredSelectedLocation, setPreferredSelectedLocation] = useState([]);
  document.title = "Desired Career Profile | MedLink Jobs";
  
  const onClick = (e) => {
    e.preventDefault();
    values.desiredRoleCategory =  "";
    values.desiredIndustry = "";
    values.desiredJobType =  "";
    values.desiredShift = "";
    values.desiredEmploymentType = "";
    values.preferredWorkLocation = "";
    values.availabilityDay = "";
    values.availabilityFromTime = "";
    values.availabilityToTime = "";
    values.expectedSalary = [0, 99];
    setFlag((prevData) => !prevData);
    setShowUpdateCareerScreen((prevData) => !prevData);
  };

  useEffect(( ) => {
    setTimeout(() => {
      setLoadingSkletonUpdate(false);
    }, 2500)
  }, [])
  useEffect(( ) => {
    setTimeout(() => {
      setLoadingSkletonAdd(false);
    }, 2500)
  }, [])


  const fromTime = [
    "12 AM",
    "01 AM",
    "02 AM",
    "03 AM",
    "04 AM",
    "05 AM",
    "06 AM",
    "07 AM",
    "08 AM",
    "09 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "01 PM",
    "02 PM",
    "03 PM",
    "04 PM",
    "05 PM",
    "06 PM",
    "07 PM",
    "08 PM",
    "09 PM",
    "10 PM",
    "11 PM",
  ];
  const toTime = [
    "12 AM",
    "01 AM",
    "02 AM",
    "03 AM",
    "04 AM",
    "05 AM",
    "06 AM",
    "07 AM",
    "08 AM",
    "09 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "01 PM",
    "02 PM",
    "03 PM",
    "04 PM",
    "05 PM",
    "06 PM",
    "07 PM",
    "08 PM",
    "09 PM",
    "10 PM",
    "11 PM",
  ];
 
  let timeTo = toTime.filter(
    (word) => toTime.indexOf(word) > values.availabilityFromTime
  );
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeCheckbox = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    gqlquery(QUERY_DEPARTMENTS, null)
      .then((res) => res.json())
      .then((datas) => setMasterDepartment(datas?.data?.getDepartments));
  }, [updateList]);

  useEffect(() => {  
    gqlquery(GET_PREFERRED_LOCATION, null)
    .then((res) => res.json())
    .then((datas) => {
      setPreferredSelectedLocation(datas?.data?.getPreferredWorkLocation)
    }); 

    gqlquery(QUERY_GETCAREERPROFILE, null)
      .then((res) => res.json())
      .then((datas) => {
        setCareerItem(datas?.data?.getCareerProfile)
        // console.log('this is career item', datas?.data?.getCareerProfile)
      })
      .finally(() => {
        setLoadingSkleton(false)
      });
      
  }, [updateList]);

  useEffect(() => {
    gqlquery(QUERY_GETCANDIDATEAVAILABILITY, null)
      .then((res) => res.json())
      .then((datas) =>
        setGetAvailability(datas?.data?.getCandidateAvailability)
      );
  }, [updateList]);

  const handleAddAvailability = (event) => {

    const availabilityDay = values.availabilityDay;
    const availabilityFromTime = values.availabilityFromTime;
    const availabilityToTime = values.availabilityToTime;
    if(
      values.availabilityDay === "" ||
      values.availabilityFromTime === "" ||
      values.availabilityToTime === ""
    )
    {
      setAvailabilityError("Please , Select an option.")
      return;
    }

    const QUERY_POSTCANDIDATEAVAILABILITY = {
      query: `mutation MyMutation {
        addCandidateAvailability (
                  day: "${availabilityDay}",
                  fromTime: ${Number(availabilityFromTime)},
                  toTime: ${Number(availabilityToTime)}
                  ) {
                    availID
                    day
                    fromTime
                    toTime
                    }
                  }
                `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlquery(QUERY_POSTCANDIDATEAVAILABILITY, null)
      .then((res) => res.json())
      .then((datas) => setUpdateList(!updateList))
      .finally((e) =>
        console.log("adding Candidate Availability details to database")
      );

    values.availabilityDay = "";
    values.availabilityFromTime = "";
    values.availabilityToTime = "";
  };

  const handleDelete = (deleteId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const QUERY_DELETEAVAILABILITY = {
        query: `mutation MyMutation {
          deleteCandidateAvailability (availID: ${Number(deleteId)}) {
                availID
                day
                fromTime
                toTime
              }
            }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_DELETEAVAILABILITY, null)
        .then((res) => res.json())
        .then((datas) => setUpdateList(!updateList))
        .finally((e) =>
          console.log("Deleting Candidate Availability details from database")
        );
    } else {
      console.log("You don't want to delete this!");
    }
  };

  // let resText = /^[a-zA-Z]+$/;
  let resText = /^[a-zA-Z ]*$/;
  // values.desiredIndustry = values?.desiredIndustry?.industry.replace(/  +/g, ' ');
  // values.desiredRoleCategory = values?.desiredRoleCategory?.specialty.replace(/  +/g, ' ');


  const handleCareerProfile = (event, from) => {
    
    if(event.key === "Enter" || from === "onClick"){
 
        if (
          !selectedCityLocation.length > 0 || !values.desiredRoleCategory ||
          !values.desiredIndustry ||
          !values.desiredJobType ||
          !values.desiredShift ||
          !values.desiredEmploymentType ||
          values.expectedSalary === "" || 
          (values.email === false && values.phone === false)
        ) {
          setError("Please, select an option.");
          setErrInput("Text field can not be empty.");
          setValidAlphabetsErr("This field accept only Alphabets.");
    
          return 
        }

        const QUERY_POSTCAREERPROFILE = {
          query: `mutation MyMutation {
            addCareerProfile (
                desiredEmploymentType: "${values.desiredEmploymentType}",
                desiredJobType: "${values.desiredJobType}",
                desiredShift: "${values.desiredShift}",
                expectedSalaryEnd: ${Number(values.expectedSalary[1])},
                expectedSalaryStart: ${Number(values.expectedSalary[0])},
                industryID: ${values.desiredIndustry.hciID},
                roleCategoryID: ${values.desiredRoleCategory.hciID},
                emailOpted: ${Boolean(values.email)},
                phoneOpted: ${Boolean(values.phone)},
                ) {
                  cpID
                  desiredJobType
                  desiredEmploymentType
                  desiredShift
                  expectedSalaryEnd
                  expectedSalaryStart
                  industryID 
                  roleCategoryID
                  emailOpted
                  phoneOpted
                  }
                }
              `,
          variables: null,
          operationName: "MyMutation",
        };
        gqlquery(QUERY_POSTCAREERPROFILE, null)
          .then((res) => res.json())
          .then((datas) => {
            setUpdateList(!updateList);
            handleStrengthUpdate();
            setAdded(true)
            setDetailsAlert(true)
          })
          .finally((e) => console.log("Adding Career Profile details to database"));
          handleAddPreferredLocations(selectedCityLocation);
        setFlag((prevData) => !prevData);
        setShowUpdateCareerScreen((prevData) => !prevData);

        values.desiredRoleCategory = "";
        values.desiredIndustry = "";
        values.desiredJobType = "";
        values.desiredShift = "";
        values.desiredEmploymentType = "";
        values.preferredWorkLocation = "";
        values.availabilityDay = "";
        values.availabilityFromTime = "";
        values.availabilityToTime = "";
        values.expectedSalary = [0, 99];

        setError("");
        setErrInput("");
        setValidAlphabetsErr("");
      }
};
 
const handleUpdateCareerProfile = (event, from) => {

  if(event.key === "Enter" || from === "onClick"){

      if (
        !values.desiredRoleCategory ||
        !values.desiredJobType ||
        !values.desiredShift ||
        !values.desiredEmploymentType ||
        values.expectedSalary === "" || 
        (values.email === false && values.phone === false) || !selectedCityLocation.length > 0
      ) {
        setError("Please, select an option.");
        setErrInput("Text field can not be empty.");
        setValidAlphabetsErr("This field accept only Alphabets.");

        return 
      }

      const QUERY_UPDATECAREERPROFILE = {
        query: `mutation MyMutation {
          updateCareerProfile(
                cpID: ${careerItem.cpID},
                desiredEmploymentType: "${values.desiredEmploymentType}",
                desiredJobType: "${values.desiredJobType}",
                desiredShift: "${values.desiredShift}",
                expectedSalaryEnd: ${Number(values.expectedSalary[1])},
                expectedSalaryStart: ${Number(values.expectedSalary[0])},
                industryID: ${Number(values.desiredIndustry?.hciID ? values.desiredIndustry?.hciID : values.industryID)}, 
                roleCategoryID: ${Number(values.desiredRoleCategory?.hciID ? values.desiredRoleCategory.hciID : values.roleCategoryID)},
                emailOpted: ${Boolean(values.email)},
                phoneOpted: ${Boolean(values.phone)},
                ) {
                  cpID
                  desiredJobType
                  desiredEmploymentType
                  desiredShift
                  expectedSalaryEnd
                  expectedSalaryStart
                  industryID 
                  roleCategoryID
                  emailOpted
                  phoneOpted
                  }
              }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_UPDATECAREERPROFILE, null)
        .then((res) => res.json())
        .then((datas) => {
          
          setUpdateList(!updateList)
          setAdded(false)
          setDetailsAlert(true)
        })
        .finally((e) =>
          console.log("Updated Career Profile details to database")
        );
      handleAddPreferredLocations(selectedCityLocation);
      setShowUpdateCareerScreen((prevData) => !prevData);

      values.desiredRoleCategory = "";
      values.desiredIndustry = "";
      values.desiredJobType = "";
      values.desiredShift = "";
      values.desiredEmploymentType = "";
      values.preferredWorkLocation = "";
      values.availabilityDay = "";
      values.availabilityFromTime = "";
      values.availabilityToTime = "";
      values.expectedSalary = [0, 99];
      values.roleCategoryID = "";
      values.industryID = "";
      setError("");
      setErrInput("");
      setValidAlphabetsErr("");
    }
};
// console.log("line no-500 :", );

  const CareerScreen = (item) => {
    values.desiredIndustry = careerItem?.industryName;
    values.desiredRoleCategory = careerItem?.roleCategoryName;
    values.desiredJobType = careerItem?.desiredJobType;
    values.desiredShift = careerItem?.desiredShift;
    values.desiredEmploymentType = careerItem?.desiredEmploymentType;
    values.preferredWorkLocation = careerItem?.preferredWorkLocation;
    values.expectedSalary = careerItem?.expectedSalary;
    values.phone = careerItem?.phoneOpted;
    values.email = careerItem?.emailOpted;
    values.industryID = careerItem?.industryID;
    values.roleCategoryID = careerItem?.roleCategoryID;
    let newPreferredSelectedLocation = preferredSelectedLocation 
    setSelectedCityLocation(newPreferredSelectedLocation)
    // setPreferredLocation(careerItem?.preferredWorkLocation); 
    setShowUpdateCareerScreen((prevData) => !prevData);
    setCareerItem(careerItem);
    values.expectedSalary = [
      careerItem?.expectedSalaryStart,
      careerItem?.expectedSalaryEnd,
    ];
  };

  const handleCancelUpdate = (e) => {
    setShowUpdateCareerScreen((prevData) => !prevData);
  };

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
    .then((datas) => setAllDesiredIndustry(datas?.data?.getHCIIndustry));
  },[])

  useEffect(() => {
    if(values?.desiredIndustry){
      const GET_INDUSTRY = {
        query: ` query MyQuery {
          getHCISpecialty(industry: "${values?.desiredIndustry?.industry ? values?.desiredIndustry?.industry : careerItem?.industryName}") {
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
      .then((datas) => setAllDesiredRole(datas?.data?.getHCISpecialty));
    }
    else{
      // console.log("else e dukse")
    }
  },[values.desiredIndustry])

  const controlRadioProps = (item, fieldName) => ({
    checked: fieldName === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const UpdateIndustryChange = (item) => {
    const findItem = allDesiredIndustry?.find((indus) => indus?.industry === item.target.value)
    setValues({...values,desiredRoleCategory: '', desiredIndustry: findItem})
  }
  const UpdateSpecialtyChange = (item) => {
    const findItem = allDesiredRole?.find((indus) => indus?.specialty === item.target.value)
    setValues({...values,  desiredRoleCategory: findItem})
  }
 
  useEffect(()=> {
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
    .then((datas) => { 
      setAllCityLocation(datas?.data?.getCityMaster) 
    }); 
  }, [])

  const SearchPresentCity = (event) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val
  
    if(event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2){
  
      const SEARCH_CITY = {
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
      
      gqlquery(SEARCH_CITY, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllCityLocation(datas?.data?.searchCity) 
      });
    }
    else {
      // console.log('else er vitor')
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
      .then((datas) => {
        // console.log("line 635: initial city name", datas);
        setAllCityLocation(datas?.data?.getCityMaster) 
      }); 
    }
  }

  const handleAddPreferredLocations = async ( newValue) => { 
    if(newValue?.length>0) {
      const CLEARDB = {
        query: `mutation MyMutation {
          deletePreferredWorkLocation
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
       await gqlquery(CLEARDB, null)
      .then((res) => res.json())
      .then((datas) => {
        console.log("DB Clear"); 
      })

      await newValue.map((valueObj) => {
        // console.log("inside from map: 682", valueObj)
        const ADDTODATABASE = {
          query: `mutation MyMutation {
            addPreferredWorkLocation(locationID: ${valueObj.lmID || valueObj?.locationID}) {
              cityWithState
              locationID
              pwlID 
            }
          }
        `,
          variables: null,
          operationName: "MyQuery",
        };
        gqlquery(ADDTODATABASE, null)
        .then((res) => res.json())
        .then((datas) => {
          console.log("Add to DB"); 
        }).finally(()=>{  
          setUpdateList(!updateList)   
        })
        
      })
       
    }
    else {

    }
  }

    return (
    <Box sx={{ my: 5 }}>
      {!flag ? (
        <>
          {!showUpdateCareerScreen ? (
            <Card
              sx={{
                backgroundColor: "var(--clr-white) !important",
                boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                border : matches ? "1px solid #E4EEF5" : "",
                borderRadius: 2,
                minHeight: 400,
                mb: 1,
              }}
            >
              {
                !loadingSkleton ? (
                  <>
                   <Grid
                container
                direction={"row"}
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Grid item direction={"column"} xs={9} sm={11} md={11}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 2.5,
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
                    Desired Career Profile
                    </Typography>
                  </Box>
                  <Box>
                    <Box>
                      <CardContent sx={{ display: "flex" }}>
                        <Box
                          sx={{
                            px: 0.5,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Box sx={{ display: "flex", gap: matches ? 2 : 3 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "170px" : "250px",
                                fontSize: "12px",
                                color: "#828282",
                                fontWeight: 600,
                              }}
                            >
                              Desired Industry
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "62%" : "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                                fontWeight: 600,
                                whiteSpace: "normal"
                              }}
                            >
                              {careerItem?.industryName}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: matches ? 2 : 3 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "170px" : "250px",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#828282",
                              }}
                            >
                              Desired Role Category
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "62%" : "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {careerItem?.roleCategoryName}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: matches ? 2 : 3 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "170px" : "250px",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#828282",
                              }}
                            >
                             Desired Job Type
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "62%" : "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {careerItem?.desiredJobType}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: matches ? 2 : 3 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "170px" : "250px",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#828282",
                              }}
                            >
                              Desired Employment Type
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "62%" : "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {careerItem?.desiredEmploymentType}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: matches ? 2 : 3 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "170px" : "250px",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#828282",
                              }}
                            >
                              Desired Shift
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "62%" : "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {careerItem?.desiredShift}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: matches ? 2 : 3 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "170px" : "250px",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#828282",
                              }}
                            >
                              Preferred Work Location
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "62%" : "70%",
                                color: "#4F4F4F",
                                // display: "flex", 
                                justifyContent: "flex-start", 
                                alignItems: "center",
                                // gap: 3,
                              }}
                            >
                              <>
                                {preferredSelectedLocation?.map((option, index)=> (
                                <Typography 
                                  sx={{ 
                                    color: "#4F4F4F",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    display: "inline-block"
                                  }}
                                >
                                  {option?.cityWithState}
                                  {(preferredSelectedLocation?.length-1 !== index) && (<span>&nbsp;|&nbsp;</span>)} 
                                </Typography>))}
                              </> 
                            </Typography>
                          </Box>
                     
                          <Box sx={{ display: "flex", gap: matches ? 2 : 3 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "170px" : "250px",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#828282",
                              }}
                            >
                              Expected Salary
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "62%" : "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {(careerItem?.expectedSalaryStart || careerItem?.expectedSalaryStart === 0) && `${careerItem?.expectedSalaryStart} lakh INR - `} {" "}
                              {careerItem?.expectedSalaryEnd && `${careerItem?.expectedSalaryEnd} lakh INR`}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: matches ? 2 : 3 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "170px" : "250px",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#828282",
                              }}
                            >
                              Communication Preference
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "62%" : "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {careerItem?.phoneOpted && "Phone"}{(careerItem?.phoneOpted && careerItem?.emailOpted) && ","}  {careerItem?.emailOpted && "Email"}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: matches ? 2 : 3 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "170px" : "250px",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#828282",
                              }}
                            >
                              Available Timing
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: matches ? "62%" : "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                                fontWeight: 600
                              }}
                            >
                              {getAvailability?.map((ability) => (
                                <Grid
                                  // sx={{ height: matches ? "50" : "40px" }}
                                  sx={{ mb: matches ? "20px" : "15px" }}
                                  container
                                  spacing={2}
                                  key={ability?.availID}
                                >
                                  {
                                    matches ? (
                                      <Grid item xs={12} md={12}>
                                        <div>
                                         {ability?.day} 
                                        </div>
                                        <div>
                                        {fromTime[ability?.fromTime]}{" "}
                                        {"-"} {toTime[ability?.toTime]}
                                        </div>
                                    </Grid>
                                    ) : (
                                      <Grid item xs={12} md={12}>
                                      {ability?.day} {fromTime[ability?.fromTime]}{" "}
                                      {"-"} {toTime[ability?.toTime]}
                                    </Grid>
                                    )
                                  }
                                </Grid>
                              ))}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={1} sm={1} md={1}>
                  <Box sx={{ fontSize: "16", mt: matches ? 3.5 : 10 }}>
                    {careerItem ? (
                      <Tooltip title="Update Career Profile Data">
                      <EditIcon
                        onClick={() => CareerScreen(careerItem)}
                        sx={{ fontSize: 17, color: "var(--clr-blue-primary)" , cursor:"pointer"}}
                      />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Update Career Profile Data.">
                      <EditIcon
                        onClick={onClick}
                        sx={{ color: "var(--clr-blue-primary)", fontSize: 17, cursor:"pointer" }}
                      />
                      </Tooltip>
                    )}
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
          ) : (
            <Card
              sx={{
                backgroundColor: "var(--clr-white) !important",
                boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                border : matches ? "1px solid #E4EEF5" : "",
                borderRadius: 2,
                p: 2.5,
              }}
            >
               {
                !loadingSkletonUpdate ? (
                  <>
                   <Typography
                component="div"
                variant="h5"
                sx={{
                  fontSize : matches ? "18px" : "24px",
                  fontWeight: 700,
                  mb: 4,
                  color: "var(--clr-blue-footer)",
                }}
              >
                Update Desired Career Profile
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
                      Desired Industry<span style={{ color: "red" }}> *</span>
                    </InputLabel>
                    <Select
                      onChange={(val) => {
                        UpdateIndustryChange(val)
                      }}
                      onKeyDown={handleUpdateCareerProfile}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                      inputProps={{ classes: { icon: classes.icon } }}
                      // input={<CustomSelectInput />}
                      sx={{ height: "45px"}}
                      displayEmpty
                      renderValue={values.desiredIndustry !== "" ? undefined : () => <SelectPlaceholder>Select Industry</SelectPlaceholder>}
                      fullWidth
                      defaultValue={values.desiredIndustry}
                    >
                      <MenuItem value="" disabled>
                        <small>Select Desired Industry</small>
                      </MenuItem>
                      {allDesiredIndustry?.map((item) => (
                        <MenuItem value={item?.industry}>
                          {item?.industry}
                        </MenuItem>
                      ))}
                    </Select>
                    {values?.desiredIndustry === "" && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item direction={"column"} xs={12} md={6}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                    Desired Role Category<span style={{ color: "red" }}> *</span>
                    </InputLabel>
                    <Select
                       onChange={(val) => {
                        UpdateSpecialtyChange(val)
                      }}
                      defaultValue={values.desiredRoleCategory}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                      inputProps={{ classes: { icon: classes.icon } }}
                      // input={<CustomSelectInput />}
                      sx={{ height: "45px"}}
                      displayEmpty
                      renderValue={values.desiredRoleCategory !== "" ? undefined : () => <SelectPlaceholder>Select Role Category</SelectPlaceholder>}
                      fullWidth
                      disabled={values?.desiredIndustry ? false : true}
                      onKeyDown={handleUpdateCareerProfile}
                    >
                      <MenuItem value="" disabled>
                        Select Desired Role Category
                      </MenuItem>
                      {allDesiredRole?.map((item) => (
                        <MenuItem value={item?.specialty}>
                          {item?.specialty}
                        </MenuItem>
                      ))}
                    </Select>
                    {values?.desiredRoleCategory === "" && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>

                <Grid item direction={"column"} xs={12} md={6}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                    Desired Job Type <span style={{ color: "red" }}> *</span>
                    </InputLabel>
                    
                    <RadioGroup
                      onChange={handleChange("desiredJobType")}
                      // onKeyDown={handleAddPersonalDetails}
                      defaultValue={values.desiredJobType}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="Permanent" control={<Radio 
                      {...controlRadioProps("Permanent", values.desiredJobType)}
                     sx={{
                      color: '#E4EEF5',
                      '&.Mui-checked': {
                        color: '#5A98F2',
                      },
                    }} />}  label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Permanent</Typography>} />
                    
                      <FormControlLabel sx={{ ml: 5}}  value="Contractual" control={<Radio 
                      {...controlRadioProps("Contractual", values.desiredJobType)}
                       sx={{
                      color: '#E4EEF5',
                      '&.Mui-checked': {
                        color: '#5A98F2',
                      },
                    }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Contractual</Typography>}/>
                    </RadioGroup>

                    {values.desiredJobType === "" && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </Box> 
                </Grid>
                <Grid item direction={"column"} xs={12} md={6}>
                  <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Desired Employment Type <span style={{ color: "red" }}> *</span>
                  </InputLabel>
                          
                  <RadioGroup
                    onChange={handleChange("desiredEmploymentType")}
                    defaultValue={values.desiredEmploymentType}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="Full Time" control={<Radio 
                    {...controlRadioProps("Full Time", values.desiredEmploymentType)}
                  sx={{
                    color: '#E4EEF5',
                    '&.Mui-checked': {
                      color: '#5A98F2',
                    },
                  }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Full Time</Typography>} />
                  
                    <FormControlLabel sx={{ ml: 5}}  value="Part Time" control={<Radio 
                    {...controlRadioProps("Part Time", values.desiredEmploymentType)}
                    sx={{
                    color: '#E4EEF5',
                    '&.Mui-checked': {
                      color: '#5A98F2',
                    },
                  }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Part Time</Typography>}/>

                  <FormControlLabel sx={{ ml: 5}}  value="Locum" control={<Radio 
                    {...controlRadioProps("Locum", values.desiredEmploymentType)}
                    sx={{
                    color: '#E4EEF5',
                    '&.Mui-checked': {
                      color: '#5A98F2',
                    },
                  }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Locum</Typography>}/>

                  </RadioGroup>

                  {values.desiredJobType === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
                  </Box> 
                </Grid>    
                <Grid item direction={"column"} xs={12} md={6}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      Desired Shift <span style={{ color: "red" }}> *</span>
                    </InputLabel>
                    <RadioGroup
                      onChange={handleChange("desiredShift")}
                      defaultValue={values.desiredEmploymentType}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel  value="Day" control={<Radio {...controlRadioProps("Day", values.desiredShift)}  value="Day" sx={{
                      color: '#E4EEF5',
                      '&.Mui-checked': {
                        color: '#5A98F2',
                      },
                    }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Day</Typography>} />
                    
                      <FormControlLabel sx={{ ml: 5}}   value="Night" control={<Radio {...controlRadioProps("Night", values.desiredShift)} sx={{
                      color: '#E4EEF5',
                      '&.Mui-checked': {
                        color: '#5A98F2',
                      },
                    }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Night</Typography>}/>

                    <FormControlLabel sx={{ ml: 5}}  value="Both" control={<Radio  {...controlRadioProps("Both", values.desiredShift)}  sx={{
                      color: '#E4EEF5',
                      '&.Mui-checked': {
                        color: '#5A98F2',
                      },
                    }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Both</Typography>}/>
                    </RadioGroup>
                    {values.desiredShift === "" && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </Box> 
                </Grid>
 
                <Grid item direction={"column"} xs={12} md={6}>
                  <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Preferred Work Location
                        <span style={{ color: "red" }}> *</span> 
                      </InputLabel>
                      <Autocomplete
                        defaultValue={preferredSelectedLocation}
                        disablePortal
                        getOptionDisabled={(option) => selectedCityLocation?.length === 5 ? !option.disabled : false}
                        id="combo-box-demo"
                        sx={{
                          "& .MuiAutocomplete-inputRoot":{
                            padding: '3px 0px 3px 7px',
                            border: "0.1px solid var(--clr-blue-light) !important",
                          }
                        }}
                        onChange={(event, newValue) => {
                          setSelectedCityLocation(newValue); 
                        }}
                        // value={selectedCityLocation || { city: ""}}
                        filterSelectedOptions
                        multiple
                          
                        options={allCityLocation?.filter(({ cityWithState: saved }) => !selectedCityLocation?.some(({ cityWithState: newSelect }) => newSelect === saved))?.length === 90 ? allCityLocation?.filter(({ cityWithState: saved }) => !selectedCityLocation?.some(({ cityWithState: newSelect }) => newSelect === saved)) : allCityLocation?.filter(({ cityWithState: saved }) => !selectedCityLocation?.some(({ cityWithState: newSelect }) => newSelect === saved))}
                        // disabled={values?.presentState ? false : true}
                        // options={allCityLocation}
                        getOptionLabel={(option) => option?.cityWithState}
                        renderInput={(params) => <TextField
                          onChange={(e) => {
                            SearchPresentCity(e)
                        }}
                        placeholder="Select Location"
                        {...params} />}
                      />
                     
                      {(selectedCityLocation?.length === 0) && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                  </Box>
                </Grid>
                
                <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                    <InputLabel sx={{ py: 0.5 }}>
                      Expected Salary<span style={{ color: "red" }}> *</span>
                    </InputLabel>
                    <Box sx={{ px: 4 }}>
                      <Slider
                        name="expectedSalary"
                        getAriaLabel={() => "Expected Salary"}
                        onChange={handleChange("expectedSalary")}
                      onKeyDown={handleUpdateCareerProfile}
                        valueLabelDisplay="auto"
                        defaultValue={[
                          careerItem.expectedSalaryEnd,
                          careerItem.expectedSalaryStart,
                        ]}
                        min={0}
                        max={99}
                        marks={[
                          {
                            value: 0,
                            label: `${Math.round(
                              values.expectedSalary[0]
                            )} lakh INR`,
                          },
                          {
                            value: 99,
                            label: `${Math.round(
                              values.expectedSalary[1]
                            )} lakh INR`,
                          },
                        ]}
                        sx={{
                          "& .MuiSlider-thumb": {
                            height: 24,
                            width: 24,
                            color: "var(--clr-white)",
                            border: "2px solid var(--clr-blue-footer)"
                          },
                          "& .MuiSlider-track": {
                            height: 10,
                            color: "var(--clr-blue-footer)",
                          },
                          "& .MuiSlider-rail": {
                            height: 10,
                            color: "var(--clr-white)",
                            border: "2px solid #C7D3E3"
                          },
                        }}
                      />
                    </Box>
                    {values.expectedSalary === "" && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </Box>
                </Grid>
                <Grid item direction={"column"} xs={12} md={6}>
                <Box sx={{ mt: 1.5 }}>
                    <InputLabel sx={{ py: 0.5 }}>
                      Communication Preference <span style={{ color: "red" }}> *</span>
                    </InputLabel>
                    <FormGroup aria-label="position" row>
                      <FormControlLabel
                        value="Phone"
                        name="phone"
                        control={
                          <Checkbox
                            onChange={(e) => handleChangeCheckbox(e)}
                      onKeyDown={handleUpdateCareerProfile}
                            defaultChecked={careerItem?.phoneOpted}
                            sx={{
                              color: "#BDBDBD",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                          />
                        }
                        label="Phone"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="Email"
                        name="email"
                        control={
                          <Checkbox
                            onChange={(e) => handleChangeCheckbox(e)}
                            defaultChecked={careerItem?.emailOpted}
                      onKeyDown={handleUpdateCareerProfile}
                            sx={{
                              color: "#BDBDBD",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                          />
                        }
                        label="Email"
                        labelPlacement="end"
                      />
                    </FormGroup>
                    {(values.email === false && values.phone === false) && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {error}
                  </FormHelperText>
                )}
                  </Box>
                </Grid>
                <Grid item direction={"column"} xs={12} md={6}>
                  <Grid container spacing={2}>
                    <Grid item direction={"column"} xs={12} md={4}>
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>
                          Availability<span style={{ color: "red" }}> *</span>
                        </InputLabel>
                        <Select
                          name="availabilityDay"
                          fullWidth
                          error={values.availabilityDay === "" && availabilityError}
                          value={values.availabilityDay}
                          onChange={handleChange("availabilityDay")}
                          inputProps={{ classes: { icon: classes.icon } }}
                          // input={<CustomSelectInput />}
                          sx={{ height: "45px"}}
                          displayEmpty
                          renderValue={values.availabilityDay !== "" ? undefined : () => <SelectPlaceholder>Day</SelectPlaceholder>}
                          MenuProps={{
                            classes: { paper: classes.menuPaper },
                          }}
                        >
                          <MenuItem value="" disabled>
                            Day
                          </MenuItem>
                          <MenuItem value={"Monday"}>Monday</MenuItem>
                          <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                          <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                          <MenuItem value={"Thursday"}>Thursday</MenuItem>
                          <MenuItem value={"Friday"}>Friday</MenuItem>
                          <MenuItem value={"Saturday"}>Saturday</MenuItem>
                          <MenuItem value={"Sunday"}>Sunday</MenuItem>
                        </Select>
                        {values.availabilityDay === ""  && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {availabilityError}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                    <Grid item direction={"column"} xs={12} md={4}>
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>
                          From Time<span style={{ color: "red" }}> *</span>
                        </InputLabel>
                        <Select
                          name="availabilityFromTime"
                          fullWidth
                          error={values.availabilityFromTime === "" && availabilityError}
                          value={values.availabilityFromTime}
                          onChange={handleChange("availabilityFromTime")}
                          inputProps={{ classes: { icon: classes.icon } }}
                          // input={<CustomSelectInput />}
                          sx={{ height: "45px"}}
                          displayEmpty
                          renderValue={values.availabilityFromTime !== "" ? undefined : () => <SelectPlaceholder>From Time</SelectPlaceholder>}
                          MenuProps={{
                            classes: { paper: classes.menuPaper },
                          }}
                        >
                          <MenuItem value="" disabled>
                            From Time
                          </MenuItem>
                          {fromTime.map((time) => (
                            <MenuItem value={fromTime.indexOf(time)}>
                              {time}
                            </MenuItem>
                          ))}
                        </Select>
                        {values.availabilityFromTime === "" && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {availabilityError}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                    <Grid item direction={"column"} xs={12} md={4}>
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>
                          To Time<span style={{ color: "red" }}> *</span>
                        </InputLabel>
                        <Select
                          name="availabilityToTime"
                          fullWidth
                          error={values.availabilityToTime === "" && availabilityError}
                          value={values.availabilityToTime}
                          onChange={handleChange("availabilityToTime")}
                          inputProps={{ classes: { icon: classes.icon } }}
                          // input={<CustomSelectInput />}
                          sx={{ height: "45px"}}
                          displayEmpty
                          renderValue={values.availabilityToTime !== "" ? undefined : () => <SelectPlaceholder>To Time</SelectPlaceholder>}
                          MenuProps={{
                            classes: { paper: classes.menuPaper },
                          }}
                        >
                          <MenuItem value="" disabled>
                            To Time
                          </MenuItem>
                          {timeTo.map((time) => (
                            <MenuItem value={toTime.indexOf(time)}>
                              {time}
                            </MenuItem>
                          ))}
                        </Select>
                        {values.availabilityToTime === "" && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {availabilityError}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                    <Button
                      variant="outlined"
                      onClick={() => handleAddAvailability()}
                      sx={{
                        m: 2.3,
                        display: "inline-block",
                        borderWidth: "2px !important",
                        borderRadius: 2,
                      }}
                    >
                      Add Availability
                    </Button>
                    <Grid item xs={12} md={12} sx={{ marginBottom: "25px" }}>
                      {getAvailability?.map((ability) => (
                        <Grid
                          sx={{ height: "40px" }}
                          container
                          spacing={1}
                          key={ability?.availID}
                          alignItems="center"
                        >
                          <Grid item xs={10} md={11}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "var(--clr-gray-3)",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {ability?.day} {fromTime[ability?.fromTime]} {"-"}{" "}
                              {toTime[ability?.toTime]}
                            </Typography>
                          </Grid>
                          <Grid item xs={2} md={1}>
                            <IconButton
                              sx={{ display: "block" }}
                              onClick={() => handleDelete(ability?.availID)}
                            >
                              <Tooltip title= "Delete Availibility">
                              <DeleteIcon
                                fontSize="small"
                                sx={{ color: "var(--clr-blue-primary)" }}
                                textAlign={"end"}
                              />
                              </Tooltip>
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
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
                      sx={{
                        justifyContent: "flex-end",
                        gap: "1rem",
                        padding: 0,
                      }}
                    >
                      <Button
                        variant="outlined"
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
                        onClick={(event) => handleUpdateCareerProfile(event, "onClick")}
                        sx={{
                          borderRadius: 16,
                          borderWidth: "2px",
                          px: 2,
                          py: 1,
                        }}
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
        </>
      ) : (
        <Card
          sx={{
            backgroundColor: "var(--clr-white) !important",
            boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
            border : matches ? "1px solid #E4EEF5" : "",
            borderRadius: 2,
            p: 2.5,
          }}
        >
           {
                !loadingSkletonAdd ? (
                  <>
          <Typography
            component="div"
            variant="h5"
            sx={{
              fontSize : matches ? "18px" : "24px",
              fontWeight: 700,
              mb: 4,
              color: "var(--clr-blue-footer)",
            }}
          >
              Desired Career Profile
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
                Desired Industry<span style={{ color: "red" }}> *</span>
                </InputLabel>
                <Select
                  error={values?.desiredIndustry === "" && error}
                  value={values?.desiredIndustry}
                  onChange={handleChange("desiredIndustry")}
                  MenuProps={{ classes: { paper: classes.menuPaper } }}
                  inputProps={{ classes: { icon: classes.icon } }}
                  // input={<CustomSelectInput />}
                  sx={{ height: "45px"}}
                  displayEmpty
                  renderValue={values.desiredIndustry !== "" ? undefined : () => <SelectPlaceholder>Select Industry</SelectPlaceholder>} 
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    Desired Industry
                  </MenuItem>
                  {allDesiredIndustry?.map((item) => (
                    <MenuItem value={item}>
                      {item.industry}
                    </MenuItem>
                  ))}
                </Select>
                {values?.desiredIndustry === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {error}
                  </FormHelperText>
                )}
              </Box>
              
            </Grid>
            <Grid item direction={"column"} xs={12} md={6}>
              <Box>
                <InputLabel sx={{ py: 0.5 }}>
                Desired Role Category<span style={{ color: "red" }}> *</span>
                </InputLabel>
                <Select
                  error={values?.desiredRoleCategory === "" && error}
                  value={values?.desiredRoleCategory}
                  onChange={handleChange("desiredRoleCategory")}
                  MenuProps={{ classes: { paper: classes.menuPaper } }}
                  inputProps={{ classes: { icon: classes.icon } }}
                  // input={<CustomSelectInput />}
                  sx={{ height: "45px"}}
                  displayEmpty
                  renderValue={values.desiredRoleCategory !== "" ? undefined : () => <SelectPlaceholder>Select Role Category</SelectPlaceholder>} 
                  fullWidth
                  disabled={values?.desiredIndustry ? false : true}
                >
                  <MenuItem value="" disabled>
                    Select Desired Role Category
                  </MenuItem>
                  {allDesiredRole?.map((item) => (
                    <MenuItem value={item}>
                      {item?.specialty}
                    </MenuItem>
                  ))}
                </Select>
                {values?.desiredRoleCategory === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {error}
                  </FormHelperText>
                )}
              </Box>
            </Grid>

            {/* -------------------Desired job type---------- */}
            <Grid item direction={"column"} xs={12} md={6}>
              <Box>
                <InputLabel sx={{ py: 0.5 }}>
                Desired Job Type <span style={{ color: "red" }}> *</span>
                </InputLabel>
                <FormControl >
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel onChange={handleChange("desiredJobType")} value="Permanent" control={<Radio  value="Permanent" sx={{
                  color: '#E4EEF5',
                  '&.Mui-checked': {
                    color: '#5A98F2',
                  },
                }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Permanent</Typography>} />
                
                  <FormControlLabel sx={{ ml: 5}} onChange={handleChange("desiredJobType")}  value="Contractual" control={<Radio   value="Contractual" sx={{
                  color: '#E4EEF5',
                  '&.Mui-checked': {
                    color: '#5A98F2',
                  },
                }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Contractual</Typography>}/>
                </RadioGroup>
           
                </FormControl>

                {values.desiredJobType === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {error}
                  </FormHelperText>
                )}
              </Box> 
            </Grid>
              {/* ---------------Desired Employment Type-------------- */}
            <Grid item direction={"column"} xs={12} md={6}>
              <Box>
                <InputLabel sx={{ py: 0.5 }}>
                Desired Employment Type <span style={{ color: "red" }}> *</span>
                </InputLabel>
                <FormControl >
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel onChange={handleChange("desiredEmploymentType")} value="Full Time" control={<Radio  value="Full Time" sx={{
                  color: '#E4EEF5',
                  '&.Mui-checked': {
                    color: '#5A98F2',
                  },
                }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Full Time</Typography>} />
                
                  <FormControlLabel sx={{ ml: 5}} onChange={handleChange("desiredEmploymentType")}  value="Part Time" control={<Radio   value="Part Time" sx={{
                  color: '#E4EEF5',
                  '&.Mui-checked': {
                    color: '#5A98F2',
                  },
                }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Part Time</Typography>}/>

                <FormControlLabel sx={{ ml: 5}} onChange={handleChange("desiredEmploymentType")}  value="Locum" control={<Radio   value="Locum" sx={{
                  color: '#E4EEF5',
                  '&.Mui-checked': {
                    color: '#5A98F2',
                  },
                }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Locum</Typography>}/>
                </RadioGroup>
           
                </FormControl>

                {values.desiredEmploymentType === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {error}
                  </FormHelperText>
                )}
              </Box> 
            </Grid>

           {/* -------------------Desired Shift--------------- */}
            <Grid item direction={"column"} xs={12} md={6}>
              <Box>
                <InputLabel sx={{ py: 0.5 }}>
                  Desired Shift <span style={{ color: "red" }}> *</span>
                </InputLabel>
                <FormControl >
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel onChange={handleChange("desiredShift")} value="Day" control={<Radio  value="Day" sx={{
                  color: '#E4EEF5',
                  '&.Mui-checked': {
                    color: '#5A98F2',
                  },
                }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Day</Typography>} />
                
                  <FormControlLabel sx={{ ml: 5}} onChange={handleChange("desiredShift")}  value="Night" control={<Radio  value="Night" sx={{
                  color: '#E4EEF5',
                  '&.Mui-checked': {
                    color: '#5A98F2',
                  },
                }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Night</Typography>}/>

                <FormControlLabel sx={{ ml: 5}} onChange={handleChange("desiredShift")}  value="Both" control={<Radio   value="Both" sx={{
                  color: '#E4EEF5',
                  '&.Mui-checked': {
                    color: '#5A98F2',
                  },
                }} />} label={<Typography sx={{fontSize: '14px', color: '#3B4256'}}>Both</Typography>}/>
                </RadioGroup>
           
                </FormControl>

                {values.desiredShift === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {error}
                  </FormHelperText>
                )}
              </Box> 
            </Grid>


            <Grid item direction={"column"} xs={12} md={6}>  
              <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Preferred Work Location
                    <span style={{ color: "red" }}> *</span>  
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    getOptionDisabled={(option) => selectedCityLocation?.length === 5 ? !option.disabled : false}
                    id="combo-box-demo"
                    sx={{
                      "& .MuiAutocomplete-inputRoot":{
                        padding: '3px 0px 3px 7px',
                        border: "0.1px solid var(--clr-blue-light) !important",
                      }
                    }}
                    onChange={(event, newValue) => {
                      setSelectedCityLocation(newValue);
                    }}
                    // value={selectedCityLocation || { city: ""}}
                    filterSelectedOptions
                    multiple
                      

                    // disabled={values?.presentState ? false : true}
                    options={allCityLocation}
                    getOptionLabel={(option) => option?.cityWithState}
                    renderInput={(params) => <TextField
                      onChange={(e) => {
                        SearchPresentCity(e)
                    }}
                    placeholder="Select Location"
                    {...params} />}
                  />
                  {/* <Autocomplete
                    multiple
                    freeSolo
                    // defaultValue={(profile?.specialization).split(",")}
                    sx={{
                      borderRadius: 1,
                      color: "var(--clr-blue-footer)",
                      fontSize: "14px",
                      "& .css-ghsjzk-MuiInputBase-root-MuiInput-root:before ":
                        {
                          borderBottom: "0px",
                          content: "none",
                        },
                      "& .css-ghsjzk-MuiInputBase-root-MuiInput-root:after ":
                        {
                          borderBottom: "0px",
                        },
                    }}
                    options={LocationArr.map(
                      (option) => option 
                    )}
                    getOptionDisabled={(option) => preferredLocation?.length === 3 ? !option.disabled : false}
                    onChange={(event, val) =>
                      setPreferredLocation(val)
                    }
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
                        sx={{ backgroundColor: "white", borderRadius: 1 }}
                        variant="standard"
                        // InputProps={{ disableUnderline: true }}
                        disableUnderline
                        placeholder="Preferred Work Location"
                      />
                    )}
                  /> */}
                  {(selectedCityLocation?.length === 0) && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
              </Box>
            </Grid>
            <Grid item direction={"column"} xs={12} md={6}>
            <Box>
                <InputLabel sx={{ py: 0.5 }}>
                  Expected Salary<span style={{ color: "red" }}> *</span>
                </InputLabel>
                <Box sx={{ px: 4 }}>
                  <Slider
                    name="expectedSalary"
                    getAriaLabel={() => "Expected Salary"}
                    onChange={handleChange("expectedSalary")}
                    valueLabelDisplay="auto"
                    value={values.expectedSalary}
                    min={0}
                    max={99}
                    marks={[
                      {
                        value: 0,
                        label: `${Math.round(
                          values.expectedSalary[0]
                        )} lakh INR`,
                      },
                      {
                        value: 99,
                        label: `${Math.round(
                          values.expectedSalary[1]
                        )} lakh INR`,
                      },
                    ]}
                    sx={{
                      "& .MuiSlider-thumb": {
                        height: 24,
                        width: 24,
                        color: "var(--clr-white)",
                        border: "2px solid var(--clr-blue-footer)"
                      },
                      "& .MuiSlider-track": {
                        height: 10,
                        color: "var(--clr-blue-footer)",
                      },
                      "& .MuiSlider-rail": {
                        height: 10,
                        color: "var(--clr-white)",
                        border: "2px solid #C7D3E3"
                      },
                    }}
                  />
                </Box>
                {values.expectedSalary === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {error}
                  </FormHelperText>
                )}
              </Box>
            </Grid>
            <Grid item direction={"column"} xs={12} md={6}>
            <Box sx={{ mt: 1.5 }}>
                <InputLabel sx={{ py: 0.5 }}>
                  Communication Preference <span style={{ color: "red" }}> *</span>
                </InputLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="Phone"
                    name="phone"
                    control={
                      <Checkbox
                        onChange={(e) => handleChangeCheckbox(e)}
                        defaultChecked
                        sx={{
                          color: "#BDBDBD",
                          "&.Mui-checked": {
                            color: "var(--clr-blue-primary)",
                          },
                        }}
                      />
                    }
                    label="Phone"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="Email"
                    name="email"
                    control={
                      <Checkbox
                        onChange={(e) => handleChangeCheckbox(e)}
                        checked={values.email}
                        sx={{
                          color: "#BDBDBD",
                          "&.Mui-checked": {
                            color: "var(--clr-blue-primary)",
                          },
                        }}
                      />
                    }
                    label="Email"
                    labelPlacement="end"
                  />
                </FormGroup>
                
                {(values.email === false && values.phone === false) && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {error}
                  </FormHelperText>
                )}
              </Box>
            </Grid>
            <Grid item direction={"column"} xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item direction={"column"} xs={12} md={4}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>Availability</InputLabel>
                    <Select
                      name="availabilityDay"
                      fullWidth
                      error={values.availabilityDay === "" && availabilityError}
                      value={values.availabilityDay}
                      onChange={handleChange("availabilityDay")}
                      inputProps={{ classes: { icon: classes.icon } }}
                      // input={<CustomSelectInput />}
                      sx={{ height: "45px"}}
                      renderValue={values.availabilityDay !== "" ? undefined : () => <SelectPlaceholder>Day</SelectPlaceholder>} 
                      displayEmpty
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem value="" disabled>
                        Day
                      </MenuItem>
                      <MenuItem value={"Monday"}>Monday</MenuItem>
                      <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                      <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                      <MenuItem value={"Thursday"}>Thursday</MenuItem>
                      <MenuItem value={"Friday"}>Friday</MenuItem>
                      <MenuItem value={"Saturday"}>Saturday</MenuItem>
                      <MenuItem value={"Sunday"}>Sunday</MenuItem>
                    </Select>
                    {values.availabilityDay === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {availabilityError}
                  </FormHelperText>
                )}
                  </Box>
                </Grid>
                <Grid item direction={"column"} xs={12} md={4}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>From Time</InputLabel>
                    <Select
                      name="availabilityFromTime"
                      fullWidth
                      error={values.availabilityFromTime === "" && availabilityError}
                      value={values.availabilityFromTime}
                      onChange={handleChange("availabilityFromTime")}
                      inputProps={{ classes: { icon: classes.icon } }}
                      // input={<CustomSelectInput />}
                      sx={{ height: "45px"}}
                      displayEmpty
                      renderValue={values.availabilityFromTime !== "" ? undefined : () => <SelectPlaceholder>From Time</SelectPlaceholder>} 
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem value="" disabled>
                        From Time
                      </MenuItem>
                      {fromTime?.map((time) => (
                        <MenuItem value={fromTime.indexOf(time)}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                    {values.availabilityFromTime === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {availabilityError}
                  </FormHelperText>
                )}
                  </Box>
                </Grid>
                <Grid item direction={"column"} xs={12} md={4}>
                  <Box>
                    <InputLabel sx={{ py: 0.5 }}>To Time</InputLabel>
                    <Select
                      name="availabilityToTime"
                      fullWidth
                      error={values.availabilityToTime === "" && availabilityError}
                      value={values.availabilityToTime}
                      onChange={handleChange("availabilityToTime")}
                      inputProps={{ classes: { icon: classes.icon } }}
                      // input={<CustomSelectInput />}
                      sx={{ height: "45px"}}
                      displayEmpty
                      renderValue={values.availabilityToTime !== "" ? undefined : () => <SelectPlaceholder>To Time</SelectPlaceholder>} 
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem value="" disabled>
                        To Time
                      </MenuItem>
                      {timeTo?.map((time) => (
                        <MenuItem value={toTime.indexOf(time)}>{time}</MenuItem>
                      ))}
                    </Select>
                    {values.availabilityToTime === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {availabilityError}
                  </FormHelperText>
                )}
                  </Box>
                </Grid>
                <Button
                  variant="outlined"
                  onClick={() => handleAddAvailability()}
                  sx={{
                    m: 2.3,
                    display: "inline-block",
                    borderWidth: "2px !important",
                    borderRadius: 2,
                  }}
                >
                  Add Availability
                </Button>
                <Grid item xs={11} md={12} sx={{ marginBottom: "25px" }}>
                  {getAvailability?.map((ability) => (
                    <Grid
                      sx={{ height: "40px" }}
                      container
                      spacing={1}
                      key={ability?.availID}
                      alignItems="center"
                    >
                      <Grid item xs={10} md={11}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: "var(--clr-gray-3)",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                        >
                          {ability?.day} {fromTime[ability?.fromTime]} {"-"}{" "}
                          {toTime[ability?.toTime]}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} md={1}>
                        <IconButton
                          sx={{ display: "block" }}
                          onClick={() => handleDelete(ability?.availID)}
                        >
                          <Tooltip title="Delete Availibility">
                          <DeleteIcon
                            fontSize="small"
                            sx={{ color: "var(--clr-blue-primary)" }}
                            textAlign={"end"}
                          />
                          </Tooltip>
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
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
                    onClick={(event) => handleCareerProfile(event, "onClick")}
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
       <Snackbar open={detailsAlert} autoHideDuration={6000} onClose={() => setDetailsAlert(false)}>
          <Alert onClose={() => setDetailsAlert(false)} severity="success" sx={{ width: '100%' }}>
           {
              added ? "Career Profile Added Successfully" : "Career Profile Update Successfully"
           }
          </Alert>
        </Snackbar>
    </Box>
  );
};

export default CareerProfile;
