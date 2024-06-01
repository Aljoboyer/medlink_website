import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton, Input, InputBase, InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField, Tooltip, Typography, useMediaQuery
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled, useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import {
  gqlquery, QUERY_LANGUAGES_KNOWN, QUERY_PERSONAL_DETAILS
} from "../../../../api/index";
import useAuth from "../../../../hooks/useAuth";
import AddLanguage from "./AddLanguage";
import Autocomplete from '@mui/material/Autocomplete';
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

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

const styles = {
  input: {
    "&:invalid": {
      border: "red solid 2px"
    }
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
    border: "1px solid #B8BCCA !important",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontSize: "15px",
    color: "var(--clr-blue-footer)",
    padding: "10px 26px 10px 12px",

    "&:hover": {
      borderRadius: 4,
      borderColor: "#333333",
      border: "1px solid #333333 !important",
    },
    "&:focus": {
      borderRadius: 4,
      borderColor: "#5A98F2",
      padding: "9.5px 25.5px 9.5px 11.5px",
      border: "2px solid #5A98F2 !important",
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
    maxHeight: 150,
  },
  icon: {
    fill: "var(--clr-blue-footer)",
  },
  input: {
    "&:invalid": {
      border: "red solid 2px"
    }
  }
}));

// Status select array
const statuses = ["Single", "Married"];

// Language Select arrays
const languages = [
  "English",
  "Hindi",
  "Tamil",
  "Panjabi",
  "Telugu",
  "Marathi",
  "French",
  "Arabic",
  "Mandarin",
];
const proficiencies = ["Beginner", "Intermediate", "High", "Expert", "Native"];

const PersonalDetails = () => {
  const { handleStrengthUpdate } = useAuth();
  const [flag, setFlag] = useState(false);
  const [lang, setLang] = useState(false);
  const [isUpdateLang, setIsUpdateLang] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // Load server Data
  const [personalDetails, setPersonalDetails] = useState({});
  const [languagesKnown, setLanguagesKnown] = useState([]);
  const [languageItem, setLanguageItem] = useState({});
  // Error Handler
  const [error, setError] = useState("");
  const [errDate, setErrDate] = useState("");
  const [errInput, setErrInput] = useState("");
  const [validAddressErr, setValidAddressErr] = useState("");
  const [errSelect, setErrSelect] = useState("");
  const [errCheck, setErrCheck] = useState("");
  const [validationError, setValidationError] = useState("")
  const change = !flag;
  // Personal details form Input Handle
  const [update, setUpdate] = useState(false);
  //form value and error handle state
  const [values, setValues] = useState({
    dateOfBirth: "",
    maritalStatus: "",
    gender: null,
    differentlyAbled: null,
    permanentAddressL1: "",
    permanentAddressL2: "",
    presentAddressL1: "",
    presentAddressL2: "",
    presentLocationID: null,
    spouseName: "",
    spouseOccupation: "",
    presentCity: "",
    permanentState: "",
    permanentCity: {city: "", lmID: null},
    permanentLocationID: null,
    presentState: "",
    presentZip: "",
    presentCountry: "India",
    permanentZip: "",
    permanentCountry: "India",
    professionalInterest: "",
    personalInterest: "",
  });
  // const [cityLocation, setCityLocation] = useState("")
  let [dateError, setDateError] = useState("");
  const [languageValues, setLanguageValues] = useState({
    language: "",
    proficiency: "",
    read: false,
    write: false,
    speak: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  // const [loadingSkletonUpdate, setLoadingSkletonUpdate] = useState(true);
  // const [loadingSkletonAdd, setLoadingSkletonAdd] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const today = new Date();
  const [allPresentCityLocation, setAllPresentCityLocation] = useState([]);
  const [allPermanentCityLocation, setAllPermanentCityLocation] = useState([]);
  const [allState, setAllState] = useState([]);
  const [allCountry, setAllCountry] = useState([]);
  const [addressSame, setAddressSame] = useState(false);
  const [detailsAlert, setDetailsAlert] = useState(false);
  const [personalDetailsTwo, setPersonalDetailsTwo] = useState({});
  const [added, setAdded] = useState(false);
  document.title = "Personal Details | MedLink Jobs";
  // const [permanentCityLocation, setPermanentCityLocation] = useState([]);
  const CHARACTER_LIMIT = 500;

 


  const onClick = (e) => {
    // e.preventDefault();

    values.dateOfBirth = null;
    values.maritalStatus = "";
    values.gender = null;
    values.differentlyAbled = null;
    values.permanentAddressL1 = "";
    values.permanentAddressL2 = "";
    values.presentAddressL1 = "";
    values.presentAddressL2 = "";
    values.presentCity = "";
    values.presentState = "";
    values.permanentCity = "";
    values.permanentState = "";
    values.presentZip = "";
    values.presentCountry = "India";
    values.permanentZip = "";
    values.permanentCountry = "India"
    values.professionalInterest = "";
    values.personalInterest = "";
    values.spouseName = "";
    values.spouseOccupation ="";

    setFlag((prevData) => !prevData);

    setDateError(() => "");
    setErrInput(() => "");
    setValidAddressErr(() => "");
    setError(() => "");
    setErrDate(() => "");
    
    if (personalDetails?.maritalStatus) {
      values.maritalStatus = personalDetails?.maritalStatus;
    }
    if (personalDetails?.gender) {
      values.gender = personalDetails?.gender;
    }
    if (String(personalDetails?.differentlyAbled)) {
      values.differentlyAbled = personalDetails?.differentlyAbled;
    }
    if (personalDetails?.permanentAddressL1) {
      values.permanentAddressL1 = personalDetails?.permanentAddressL1;
    }
    if (personalDetails?.permanentAddressL2) {
      values.permanentAddressL2 = personalDetails?.permanentAddressL2;
    }
    if (personalDetails?.presentAddressL1) {
      values.presentAddressL1 = personalDetails?.presentAddressL1;
    }
    if (personalDetails?.presentAddressL2) {
      values.presentAddressL2 = personalDetails?.presentAddressL2;
    }
    if (personalDetails?.presentCity) {
      // values.presentCity = {personalDetails?.presentCity;
      values.presentCity = {city: personalDetails?.presentCity, country: personalDetails?.presentCountry, lmID: personalDetails?.presentLocationID, state: personalDetails?.presentState} 
    }
    if (personalDetails?.presentState) {
      values.presentState = personalDetails?.presentState;
    }
    if (personalDetails?.permanentCity) {
      values.permanentCity = {city: personalDetails?.permanentCity, country: personalDetails?.permanentCountry, lmID: personalDetails?.permanentLocationID, state: personalDetails?.permanentState} 
    }
    if (personalDetails?.permanentState) {
      values.permanentState = personalDetails?.permanentState;
    }
    if (personalDetails?.presentZip) {
      values.presentZip = personalDetails?.presentZip;
    }
    if (personalDetails?.presentCountry) {
      values.presentCountry = personalDetails?.presentCountry;
    }
    if (personalDetails?.permanentZip) {
      values.permanentZip = personalDetails?.permanentZip;
    }
    if (personalDetails?.permanentCountry) {
      values.permanentCountry = personalDetails?.permanentCountry;
    }
    if (personalDetails?.personalInterest) {
      values.personalInterest = personalDetails?.personalInterest;
    }
    if (personalDetails?.professionalInterest) {
      values.professionalInterest = personalDetails?.professionalInterest;
    }

    if (personalDetails?.spouseName) {
      values.spouseName = personalDetails?.spouseName;
    }
    if (personalDetails?.spouseOccupation) {
      values.spouseOccupation = personalDetails?.spouseOccupation;
    }
  };
  
  const onLangClick = (e) => {
    // e.preventDefault();
    setLang((prevData) => !prevData);
  };

  const onLangUpdate = (e) => {
    // e.preventDefault();
    setIsUpdateLang((prevData) => !prevData);
  };

  useEffect(() => {
    gqlquery(QUERY_PERSONAL_DETAILS, null)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.getPersonalDetails) { 
          setPersonalDetails(data?.data?.getPersonalDetails);
          setValues({ ...values, dateOfBirth: new Date(data?.data?.getPersonalDetails?.dateofBirth) })
          setPersonalDetailsTwo(data?.data?.getPersonalDetails)
        }
      })
      .finally(() => setIsLoading(false));
  }, [change, updateList]);

  useEffect(() => {
    gqlquery(QUERY_LANGUAGES_KNOWN, null)
      .then((res) => res.json())
      .then((data) => {
        setLanguagesKnown(data?.data?.getLanguagesKnown)
      })
      .finally((data) => {
        setIsLoading(false)
      });
  }, [lang, update]);

  const handleInputChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange = (event) => {
    if(event === null){
      values.dateOfBirth = null;
      setErrDate("Please, select a valid date");
    } else {
      setDateError("")
      setErrDate("")
    }
    if (event != 'Invalid Date' && event !== null) {
      // let date = event.toISOString().slice(0, 10);
      if(today.setDate(today.getDate()) >= event.getTime()){
        setDateError("");
      } else{
        setDateError(`Please, select date on or before ${new Date()?.toLocaleString(
          "default",
          { day: "2-digit" }
        )}/${new Date()?.toLocaleString(
          "default",
          { month: "2-digit" }
        )}/${new Date()?.toLocaleString(
          "default",
          { year: "numeric" }
        )}`)
      }
      let date = moment(event).format('YYYY-MM-DD')
      setValues({ ...values, dateOfBirth: date })
    }
  };

  const handleSelectChange = (prop) => (event) => {
    setLanguageValues({ ...languageValues, [prop]: event.target.value });
  };
  const handleCheckedChange = (prop) => (event) => {
    setLanguageValues({ ...languageValues, [prop]: event.target.checked });
  };

  // let addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  // let addressRegex = /[0-9a-z][0-9a-z]+[0-9a-z]$/;
  let addressRegex = /^[A-Za-z\s,0-9]+$/;
  values.permanentAddressL1 = values.permanentAddressL1.replace(/  +/g, ' ');
  values.permanentAddressL2 = values.permanentAddressL2.replace(/  +/g, ' ');
  values.presentAddressL1 = values.presentAddressL1.replace(/  +/g, ' ');
  values.presentAddressL2 = values.presentAddressL2.replace(/  +/g, ' ');


  let resText = /^[a-zA-Z ]*$/;
  values.spouseName = values.spouseName.replace(/  +/g, ' ');
  values.spouseOccupation =  values.spouseOccupation.replace(/  +/g, ' ');
  values.personalInterest =  values.personalInterest.replace(/  +/g, ' ');
  values.professionalInterest =  values.professionalInterest.replace(/  +/g, ' ');
  
  // Personal details add handle
  const handleAddPersonalDetails = (event, from) => {
 
    if (event.key === "Enter" || from === "onClick") { 
      // if (values.dateOfBirth === null) {
      //   const date = new Date();
      //   values.dateOfBirth = date.toISOString().slice(0, 10);
      // }

      if (
        !values.dateOfBirth ||
        values.dateOfBirth[0] === "0" ||
        values.permanentAddressL1 === "" ||
        values.permanentAddressL1 === " " ||
        values.permanentAddressL2 === "" ||
        values.permanentAddressL2 === " " ||
        values.presentAddressL1 === "" ||
        values.presentAddressL1 === " " ||
        values.presentAddressL2 === "" ||
        values.presentAddressL2 === " " ||
        values.personalInterest === "" ||
        values.personalInterest === " " ||
        values.professionalInterest === "" ||
        values.professionalInterest === " " ||
        values.gender === null ||
        values.differentlyAbled === null ||
        values.maritalStatus === "" ||
        (addressRegex.test(values.permanentAddressL2)) === false ||
        (addressRegex.test(values.permanentAddressL1)) === false ||
        (addressRegex.test(values.presentAddressL1)) === false || 
        (addressRegex.test(values.presentAddressL2)) === false || 
        !values.presentCity || !values.presentState  || !values.presentZip ||
        values.presentZip === " " || !values.presentCountry ||
        !values.permanentZip || !values.permanentCountry || !values.permanentCity || !values.permanentState
      ) {
        setErrDate("Please, select a valid date");
        setError("Please, select an option.");
        setValidAddressErr("Please, Enter Valid Address.");
        setErrInput("TextField can not be empty.");
        setValidationError("Pincode must be 6 digits long.")
        return;
      }

      if (values.presentZip.length < 6 || values.permanentZip.length < 6) { 
        setErrInput("Pincode must be 6 digits long."); 
        return; 
      } else { 
        setErrInput(""); 
      } 

      if(dateError !== ""){
        return;
      } else setDateError("");

      /* 
      permanentCity: "${values.permanentCity}",
      permanentState: "${values.permanentState}",
      permanentCountry: "${values.permanentCountry}",

      presentCity: "${values.presentCity}",
            presentState: "${values.presentState}",
            presentCountry: "${values.presentCountry}",


       */

      const QUERY_ADD_PERSONAL_DETAILS = {
        query: `mutation MyMutation {
          addPersonalDetails ( 
            dateofBirth: "${values.dateOfBirth}", 
            differentlyAbled: ${Boolean(Number(values.differentlyAbled))},
            gender: "${values.gender}",
            maritalStatus: "${values.maritalStatus}",
            bothAddressSame: ${Boolean(addressSame)},
            permanentAddressL1: "${values.permanentAddressL1}", 
            permanentAddressL2: "${values.permanentAddressL2}",
            permanentLocationID: ${values.permanentCity?.lmID}, 
            permanentZip: ${values.permanentZip},
            personalInterest: "${values.personalInterest}",
            presentAddressL1: "${values.presentAddressL1}", 
            presentAddressL2: "${values.presentAddressL2}", 
            presentLocationID: ${values.presentCity?.lmID}, 
            presentZip: ${values.presentZip},
            professionalInterest: "${values.professionalInterest}",
            spouseName: "${values.maritalStatus === "Married" ? values.spouseName : ""}",
            spouseOccupation: "${values.maritalStatus === "Married" ? values.spouseOccupation : ""}",
            ) {
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
            }
          `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_ADD_PERSONAL_DETAILS, null)
        .then((res) => res.json())
        .then((datas) => {
          setUpdateList(!updateList);
          handleStrengthUpdate()
          setAdded(true)
          setDetailsAlert(true)
        })

      setValues({
        dateOfBirth: null,
        maritalStatus: "",
        gender: null,
        differentlyAbled: null,
        permanentAddressL1: "",
        permanentAddressL2: "",
        presentAddressL1: "",
        presentAddressL2: "",
        spouseName: "",
        spouseOccupation: "",
        presentCity: "",
        presentState: "",
        permanentCity: "", 
        presentZip: "",
        presentCountry: "",
        permanentZip: "",
        permanentCountry: "",
        professionalInterest: "",
        personalInterest: "",
      });
      setError("");
      setErrDate("");
      setErrInput("");
      setValidAddressErr("");
      onClick();
      setAddressSame(false)
    }
  };

  // Personal Details Update handle
  // console.log(moment(values.dateOfBirth).format('YYYY-MM-DD'),7423984729384723, personalDetails?.dateofBirth, 456456456, values.dateOfBirth, new Date(personalDetails?.dateofBirth));

  const handleUpdatePersonalDetails = (event, from) => {
    
    if (event.key === "Enter" || from === "onClick") { 
      // if (values.dateOfBirth !== personalDetails.dateOfBirth) {
      //   let date = moment(values.dateOfBirth).format('YYYY-MM-DD')
      //   values.dateOfBirth = date
      // }

      if (
        values.dateOfBirth === null ||
        values.dateOfBirth[0] === "0" ||
        values.permanentAddressL1 === "" ||
        values.permanentAddressL1 === " " ||
        values.permanentAddressL2 === "" ||
        values.permanentAddressL2 === " " ||
        values.presentAddressL1 === "" ||
        values.presentAddressL1 === " " ||
        values.presentAddressL2 === "" ||
        values.presentAddressL2 === " " ||
        values.personalInterest === "" ||
        values.personalInterest === " " ||
        values.professionalInterest === "" ||
        values.professionalInterest === " " ||
        values.gender === null ||
        values.differentlyAbled === null ||
        values.maritalStatus === "" ||
        (addressRegex.test(values.permanentAddressL2)) === false ||
        (addressRegex.test(values.permanentAddressL1)) === false ||
        (addressRegex.test(values.presentAddressL1)) === false || 
        (addressRegex.test(values.presentAddressL2)) === false || 
        !values.presentCity || !values.presentState  || !values.presentZip ||
        values.presentZip === " " || !values.presentCountry ||
        !values.permanentZip || values.permanentZip === " " || !values.permanentCountry || !values.permanentCity || !values.permanentState 
        
      ) {
        setErrDate("Please, select a valid date");
        setError("Please, select an option.");
        setValidAddressErr("Please, Enter Valid Address.");
        setErrInput("TextField can not be empty.");
        setValidationError("Pincode must be 6 digits long.") 
        return;
      }

      if (values.presentZip.length < 6 || values.permanentZip.length < 6) { 
        setErrInput("Pincode must be 6 digits long."); 
        return; 
      } else { 
        setErrInput(""); 
      } 
      
      if(dateError !== "") return;

      if(errDate !== "") return;

      const QUERY_UPDATE_PERSONAL_DETAILS = {
        query: `mutation MyMutation {
        updatePersonalDetails (
          dateofBirth: "${moment(values.dateOfBirth).format('YYYY-MM-DD')}", 
          differentlyAbled: ${Boolean(Number(values.differentlyAbled))},
          gender: "${values.gender}",
          maritalStatus: "${values.maritalStatus}",
          pdID: ${personalDetails?.pdID}, 
          bothAddressSame: ${Boolean(addressSame)},
          permanentAddressL1: "${values.permanentAddressL1}", 
          permanentAddressL2: "${values.permanentAddressL2}"
          permanentLocationID: ${values.permanentCity?.lmID},  
          permanentZip: ${values.permanentZip},
          personalInterest: "${values.personalInterest}",
          presentAddressL1: "${values.presentAddressL1}", 
          presentAddressL2: "${values.presentAddressL2}", 
          presentLocationID: ${values.presentCity?.lmID},
          presentZip: ${values.presentZip},
          spouseName: "${values.maritalStatus === "Married" ? values.spouseName : ""}",
          spouseOccupation: "${values.maritalStatus === "Married" ? values.spouseOccupation : ""}",
          professionalInterest: "${values.professionalInterest}", 
          ) {
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
          }
          `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_UPDATE_PERSONAL_DETAILS, null)
        .then((res) => res.json())
        .then((data) => {
          setPersonalDetails(data?.data?.updatePersonalDetails)
          setUpdateList(!updateList);
          setAdded(false)
          setDetailsAlert(true)
        })
        .finally((e) =>
          console.log("Successful to Update personal details Data")
        );

      setValues({
        dateOfBirth: null,
        maritalStatus: "",
        gender: null,
        differentlyAbled: null,
        permanentAddressL1: "",
        permanentAddressL2: "",
        presentAddressL1: "",
        presentAddressL2: "",
        spouseName: "",
        spouseOccupation: "",
        presentCity: "",
        presentState: "",
        permanentCity: "", 
        presentZip: "",
        presentCountry: "",
        permanentZip: "",
        permanentCountry: "",
        professionalInterest: "",
        personalInterest: "",
      })
      setError("");
      setErrDate("");
      setErrInput("");
      setValidAddressErr("");
      onClick();
      setAddressSame(false)
    }
  };

  // Lanugage Known Update handle
  const languageKnownUpdate = (item) => {
    setLanguageItem(item);
    languageValues.read = item?.read;
    languageValues.speak = item?.speak;
    languageValues.write = item?.write;
    languageValues.language = item?.language;
    languageValues.proficiency = item?.proficiency;

    onLangUpdate();
  }
  const cancelUpdate = () => {
    onLangUpdate();
    setLanguageItem({});
  };

  const handleUpdateLanguage = (event, from, langID) => {
    // if (languageValues.language === "" || languageValues.proficiency === "") {
    //   setErrSelect("Please, select an option.");
    // } 
    if (event.key === "Enter" || from === "onClick") {
      if (
        languageValues.language === "" ||
        languageValues.proficiency === "" ||
        (languageValues.read === false && languageValues.write === false && languageValues.speak === false)
      ) {
        setErrSelect("Please, select an option.");
        setErrCheck("You must select One option")
        return
      } 


      const QUERY_UPDATE_LANGUAGE_KNOWN = {
        query: `mutation MyMutation {
        updateLanguagesKnown (
          language: "${languageValues.language}", 
          lknID: "${langID}", 
          proficiency: "${languageValues.proficiency}", 
          read: ${languageValues.read}, 
          speak: ${languageValues.speak}, 
          write: ${languageValues.write}
          ) {
              language
              lknID
              proficiency
              read
              speak
              write
            }
          }
        `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_UPDATE_LANGUAGE_KNOWN, null)
        .then((res) => res.json())
        .then((data) => {
          setLanguagesKnown(data?.data?.updateLanguagesKnown);
          setUpdate(prev => !prev)
        })
        .finally((e) => console.log("Successful to Update Language"));

      setErrSelect("");
      setErrCheck("");
      languageValues.read = false;
      languageValues.speak = false;
      languageValues.write = false;
      languageValues.language = "";
      languageValues.proficiency = "";
      onLangUpdate();
    }
  };

  // Language Delete handle
  const handleDeleteLanguage = (lkID) => {
    const confirmed = window.confirm(
      "Are you sure that you want to delete this language?"
    );
    if (confirmed) {
      const QUERY_DELETE_LANGUAGE_KNOWN = {
        query: `mutation MyMutation {
        deleteLanguagesKnown (
          lknID: "${lkID}"
          ) {
              language
              lknID
              proficiency
              read
              speak
              write
            }
          }
        `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_DELETE_LANGUAGE_KNOWN, null)
        .then((res) => res.json())
        .then((data) => {
          setLanguagesKnown(data?.data?.deleteLanguagesKnown);
          handleStrengthUpdate();  
        })
        .finally((e) => console.log("Successful to Delete Language"));
    }
  };

  const handleDeleteButton = (deleteID) => {
    handleDeleteLanguage(deleteID)
    onLangUpdate();
  }

  let shortsDate;
  if (personalDetails?.dateofBirth) {
    const date = new Date(personalDetails.dateofBirth);
    const dateArr = [];
    dateArr.push(date.getDate());
    dateArr.push(date.getMonth() + 1);
    dateArr.push(date.getFullYear());
    const newDate = dateArr.join("/");
    shortsDate = newDate;
  }

  let defaultDate;
  if (personalDetails?.dateofBirth) {
    const date = new Date(personalDetails.dateofBirth);
    const dateArr = [];
    dateArr.push(date.getDate());
    dateArr.push(date.getMonth());
    dateArr.push(date.getFullYear());
    const newDate = dateArr.join("/");
    defaultDate = newDate;
  };
   

  // Custom redio button style
  const controlGenderProps = (item) => ({
    checked: values.gender === item,
    onChange: handleInputChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });
  const controlAbilityProps = (item) => ({
    checked: values.differentlyAbled === item,
    onChange: handleInputChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  useEffect(() => {
    if(values.presentCountry && values.presentState){

      const GET_CITY = {
        query: `query MyQuery {
          getCityByState(country: "${values.presentCountry}", state: "${values.presentState}") {
            city 
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
        setAllPresentCityLocation(datas?.data?.getCityByState) 
      });
    }
  },[values?.presentCountry, values?.presentState])

  useEffect(() => {
    if(values.permanentCountry && values.permanentState){

      const GET_CITY = {
        query: `query MyQuery {
          getCityByState(country: "${values.permanentCountry}", state: "${values.permanentState}") {
            city 
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
        setAllPermanentCityLocation(datas?.data?.getCityByState)
      });
    }
  },[values?.permanentCountry, values?.permanentState])

 /*  useEffect(() => {
    if(values?.permanentCountry && values?.permanentState){
      const GET_CITY = {
        query: `query MyQuery {
          getCityByState(country: "${values.permanentCountry}", state: "${values.permanentState}") {
            city
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      
      gqlquery(GET_CITY, null)
      .then((res) => res.json())
      .then((datas) => setPermanentCityLocation(datas?.data?.getCityByState));
    }
  },[values?.permanentCountry, values?.permanentState])
 */
  useEffect(() => {
    const GET_COUNTRY = {
      query: `query MyQuery {
        getCountryMaster {
          country
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };
    
    gqlquery(GET_COUNTRY, null)
    .then((res) => res.json())
    .then((datas) => setAllCountry(datas?.data?.getCountryMaster));
  },[])

  useEffect(() => {
    const GET_COUNTRY = {
      query: `query MyQuery {
        getStateMaster(country: "${allCountry[0]?.country}") {
          state
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };
    
    gqlquery(GET_COUNTRY, null)
    .then((res) => res.json())
    .then((datas) => setAllState(datas?.data?.getStateMaster));
  },[allCountry[0]?.country])

  const onlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const AddPresentToPermanent = (e) => {

    if(e.target.checked)
  {

    values.permanentAddressL1  = values.presentAddressL1 ? values.presentAddressL1 : ''
  
    values.permanentAddressL2  = values.presentAddressL2 ? values.presentAddressL2 : ''

    values.permanentCity = values.presentCity?.city ?  values.presentCity :  {city: "", lmID: null}
    
    values.permanentState = values.presentState ? values.presentState : ''
    
    values.permanentZip = values.presentZip ? values.presentZip : ''

    values.permanentCountry  = values.presentCountry ? values.presentCountry : ''
    
  }
  else if (e.target.checked === false) {
    values.permanentAddressL1 = ""
  
    values.permanentAddressL2  = ""

    values.permanentCity =  ""

    values.permanentState =  ""
    
    values.permanentZip =  ""

    values.permanentCountry =  "India";
  }
}

const AddPresentToPermanentTwo = (e) => {
  if(e.target.checked)
{
  values.permanentAddressL1  = values.presentAddressL1 ? values.presentAddressL1 : personalDetails?.presentAddressL1

  values.permanentAddressL2  = values.presentAddressL2 ? values.presentAddressL2 : personalDetails?.presentAddressL2


  values.permanentCity = values.presentCity?.city ?  values.presentCity :  personalDetails?.presentCity 
  
  values.permanentState = values.presentState ? values.presentState : personalDetails?.presentState
  
  values.permanentZip = values.presentZip ? values.presentZip :  personalDetails?.presentZip

  values.permanentCountry  = values.presentCountry ? values.presentCountry :  personalDetails?.presentCountry
  
}
else if (e.target.checked === false) {

  values.permanentAddressL1 = personalDetailsTwo?.permanentAddressL1 ? personalDetailsTwo?.permanentAddressL1 : ""

  values.permanentAddressL2  = personalDetailsTwo?.permanentAddressL2 ? personalDetailsTwo?.permanentAddressL2  : ""

  values.permanentCity = personalDetailsTwo?.permanentCity ? personalDetailsTwo?.permanentCity : ""

  values.permanentState = personalDetailsTwo?.permanentState ? personalDetailsTwo?.permanentState : ""
  
  values.permanentZip = personalDetailsTwo?.permanentZip ? personalDetailsTwo?.permanentZip : ""

  values.permanentCountry = personalDetailsTwo?.permanentCountry ? personalDetailsTwo?.permanentCountry : "India";
}
}

const SearchPresentCity = (event) => {
  const val = event.target.value.split(" ").length - 1;
  const valtwo = event.target.value.length - val

  if(event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2){

    const SEARCH_CITY= {
      query: `query MyQuery {
        searchCityByState(city: "${event.target.value}", country: "${values.presentCountry}", state: "${values.presentState}") {
          city
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
      setAllPresentCityLocation(datas?.data?.searchCityByState) 
    });
  }
  else {
   
    const GET_CITY = {
      query: `query MyQuery {
        getCityByState(country: "${values.presentCountry}", state: "${values.presentState}") {
          city
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
    .then((datas) => setAllPresentCityLocation(datas?.data?.getCityByState));
  }
}

const SearchPermanentCity = (event) => {
  const val = event.target.value.split(" ").length - 1;
  const valtwo = event.target.value.length - val 

  if(event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2){

    const SEARCH_CITY= {
      query: `query MyQuery {
        searchCityByState(city: "${event.target.value}", country: "${values.permanentCountry}", state: "${values.permanentState}") {
          city
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
      setAllPermanentCityLocation(datas?.data?.searchCityByState) 
    });
  }
  else {
    const GET_CITY = {
      query: `query MyQuery {
        getCityByState(country: "${values.permanentCountry}", state: "${values.permanentState}") {
          city
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
    .then((datas) => setAllPermanentCityLocation(datas?.data?.getCityByState));
  }
}

/* const PresentCityHandler = (ci) => {
  values.presentCity = ci
} */

  if (!isLoading) {
    return (
      <Box sx={{ my: 5 }}>
        {!flag && !lang && !isUpdateLang && (
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
            <Grid container direction={"row"} alignItems="flex-start">
              <Grid item direction={"column"} xs={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "90%",
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
                    Personal Details
                  </Typography>
                  <IconButton sx={{ mt: 2 }}>
                    <Tooltip title="Add/Edit Personal Details">
                      <EditIcon
                        onClick={onClick}
                        sx={{ color: "var(--clr-blue-primary)", fontSize: 17 }}
                      />
                    </Tooltip>
                  </IconButton>
                </Box>
              </Grid>
              <Grid item direction={"column"} xs={12} md={12}>
                <Box
                  sx={{
                    pt: 5,
                    px: 0.5,
                    display: "flex",
                    flexDirection: "column",
                    gap: matches ? 1 : 2,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "250px",
                        fontSize: "12px",
                        color: "#828282",
                        fontWeight: 600,
                      }}
                    >
                      Date of Birth
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "70%",
                        color: "#4F4F4F",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {/* {personalDetails?.dateofBirth} */}
                      {/* {new Date(personalDetails?.dateofBirth)?.toUTCString()?.slice(5, 16).split(' ').join('-')} */}
                      {personalDetails?.dateofBirth && (
                        <>
                          {new Date(personalDetails?.dateofBirth)?.toLocaleString(
                            "default",
                            { day: "2-digit" }
                          )}
                          /
                          {new Date(personalDetails?.dateofBirth)?.toLocaleString(
                            "default",
                            { month: "2-digit" }
                          )}
                          /
                          {new Date(personalDetails?.dateofBirth)?.toLocaleString(
                            "default",
                            { year: "numeric" }
                          )}
                        </>
                      )}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "250px",
                        fontSize: "12px",
                        color: "#828282",
                        fontWeight: 600,
                      }}
                    >
                      Gender
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "70%",
                        color: "#4F4F4F",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {personalDetails?.gender && personalDetails?.gender?.charAt(0)?.toUpperCase() + personalDetails?.gender?.slice(1)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "250px",
                        fontSize: "12px",
                        color: "#828282",
                        fontWeight: 600,
                      }}
                    >
                      Marital Status
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "70%",
                        color: "#4F4F4F",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {personalDetails?.maritalStatus}
                    </Typography>
                  </Box>
                  <>
                    {personalDetails?.maritalStatus === "Married" && (
                      <>
                        <Box sx={{ display: "flex", gap: 3 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              width: "250px",
                              fontSize: "12px",
                              color: "#828282",
                              fontWeight: 600,
                            }}
                          >
                            Spouse/Partner Name
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              width: "70%",
                              color: "#4F4F4F",
                              fontSize: "12px",
                              fontWeight: 600,
                            }}
                          >
                            {personalDetails?.spouseName?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.spouseName?.trim()?.slice(1)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: 3 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              width: "250px",
                              fontSize: "12px",
                              color: "#828282",
                              fontWeight: 600,
                            }}
                          >
                            Spouse/Partner Occupation
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              width: "70%",
                              color: "#4F4F4F",
                              fontSize: "12px",
                              fontWeight: 600,
                            }}
                          >
                            {personalDetails?.spouseOccupation?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.spouseOccupation?.trim()?.slice(1)}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "250px",
                        fontSize: "12px",
                        color: "#828282",
                        fontWeight: 600,
                      }}
                    >
                      Present Address
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "70%",
                        color: "#4F4F4F",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {personalDetails?.presentAddressL2 && (
                        <>
                          {personalDetails?.presentAddressL1?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.presentAddressL1?.trim()?.slice(1)}{","} {personalDetails?.presentAddressL2?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.presentAddressL2?.trim()?.slice(1)}{","} {" "}
                          {personalDetails?.presentCity?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.presentCity?.trim()?.slice(1)}{","} {personalDetails?.presentState?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.presentState?.trim()?.slice(1)}{","} {personalDetails?.presentZip}{","} {" "}
                          {personalDetails?.presentCountry?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.presentCountry?.trim()?.slice(1)}.
                        </>
                      )}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "250px",
                        fontSize: "12px",
                        color: "#828282",
                        fontWeight: 600,
                      }}
                    >
                      Permanent Address
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "70%",
                        color: "#4F4F4F",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {personalDetails?.permanentAddressL1 && (
                        <>
                        {personalDetails?.permanentAddressL1?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.permanentAddressL1?.trim()?.slice(1)}{","} {personalDetails?.permanentAddressL2?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.permanentAddressL2?.trim()?.slice(1)}{","} {" "}
                          {personalDetails?.permanentCity?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.permanentCity?.trim()?.slice(1)}{","} {personalDetails?.permanentState?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.permanentState?.trim()?.slice(1)}{","} {personalDetails?.permanentZip}{","} {" "}
                          {personalDetails?.permanentCountry?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.permanentCountry?.trim()?.slice(1)}.
                        </>
                      )}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "250px",
                        fontSize: "12px",
                        color: "#828282",
                        fontWeight: 600,
                      }}
                    >
                      Professional Interest
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "70%",
                        color: "#4F4F4F",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {
                        personalDetails?.professionalInterest && (
                          <>
                            {personalDetails?.professionalInterest?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.professionalInterest?.trim()?.slice(1)}
                          </>
                        )
                      } 
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "250px",
                        fontSize: "12px",
                        color: "#828282",
                        fontWeight: 600,
                      }}
                    >
                      Personal Interest
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        width: "70%",
                        color: "#4F4F4F",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {
                        personalDetails?.personalInterest && (
                          <>
                            {personalDetails?.personalInterest?.trim()?.charAt(0)?.toUpperCase() + personalDetails?.personalInterest?.trim()?.slice(1)}
                          </>
                        )
                      } 
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item direction={"column"} xs={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 5,
                    px: 0.5,
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    sx={{
                      fontSize: matches ? "14px" : "16px",
                      fontWeight: 700,
                    }}
                  >
                    Languages known
                  </Typography>

                  <Button
                    variant="outlined"
                    sx={{

                      backgroundColor: "#ffffff",
                      color: "#000000",
                      borderColor: "#000000",
                      maxHeight: "35px",
                      borderWidth: "2px !important",
                      borderRadius: 16,
                    }}
                    onClick={onLangClick}
                  >
                    Add Language
                  </Button>
                </Box>
              </Grid>
              <Grid item direction={"column"} xs={12} md={10}>
                <Box sx={{
                  px: 0.5, overflowX: matches ? "scroll" : "none",
                  '&::-webkit-scrollbar': { height: matches ? "3px" : "" },
                  '&::-webkit-scrollbar-track': {
                    background: matches ? "#C7D3E3" : "", backgroundColor: matches ? "#C7D3E3" : ""
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: matches ? "#C7D3E3" : ""
                  }
                }}>
                  <table
                    style={{
                      width: "100%",
                      textAlign: "left",
                      marginTop: "2%",
                      marginBottom: "1%",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      borderSpacing: "0 1rem",
                    }}
                  >
                    <tr style={{ marginBottom: "20px" }}>
                      <th><span style={{ marginRight: matches ? "25px" : "" }}>Languages</span></th>
                      <th><span style={{ marginRight: matches ? "25px" : "" }}>Proficiency</span></th>
                      <th><span style={{ marginRight: matches ? "25px" : "" }}>Read</span></th>
                      <th><span style={{ marginRight: matches ? "25px" : "" }}>Write</span></th>
                      <th><span style={{ marginRight: matches ? "25px" : "" }}>Speak</span></th>
                    </tr>
                    {languagesKnown?.map((item, index) => (
                      <tr key={`languages-${index}`}>
                        <td>
                          <Typography variant="info" sx={textStyle}>
                            {item?.language}
                          </Typography>
                        </td>
                        <td>
                          <Typography variant="info" sx={textStyle}>
                            {item?.proficiency}
                          </Typography>
                        </td>
                        <td>
                          <Typography variant="info" sx={textStyle}>
                            {item?.read ? "Yes" : "No"}
                          </Typography>
                        </td>
                        <td>
                          <Typography variant="info" sx={textStyle}>
                            {item?.write ? "Yes" : "No"}
                          </Typography>
                        </td>
                        <td>
                          <Typography variant="info" sx={textStyle}>
                            {item?.speak ? "Yes" : "No"}
                          </Typography>
                        </td>
                        <td>
                          <Box
                            sx={{
                              padding: "0 0 0 50px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <IconButton
                              onClick={() => languageKnownUpdate(item)}
                            >
                              <Tooltip title="Edit Language">
                                <EditIcon
                                  fontSize="small"
                                  sx={{
                                    color: "var(--clr-blue-primary)",
                                    fontSize: 17,
                                  }}
                                />
                              </Tooltip>
                            </IconButton>
                            <IconButton
                              sx={{ ml: 2 }}
                              onClick={() => handleDeleteLanguage(item?.lknID)}
                            >
                              <Tooltip title="Delete Language">
                                <DeleteIcon
                                  fontSize="small"
                                  sx={{
                                    color: "var(--clr-blue-primary)",
                                    fontSize: 17,
                                  }}
                                />
                              </Tooltip>
                            </IconButton>
                          </Box>
                        </td>
                      </tr>
                    ))}
                  </table>
                </Box>
              </Grid>
            </Grid>
          </Card>
        )}
        {/* ---------------Start Personal Details Update and Edit------------ */}
        {flag && !lang && !isUpdateLang && (
          <Card
            sx={{
              boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
              border: matches ? "1px solid #E4EEF5" : "",
              backgroundColor: "var(--clr-white) !important",
              p: 2.5,
              mt: 5,
              mb: 7,
              borderRadius: 2,
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
            {personalDetails?.gender ? 'Edit Personal Details' : 'Personal Details'}
            </Typography>
            <Grid
              container
              justifyContent="space-between"
              columnSpacing={4}
              rowSpacing={3}
              sx={{ my: 3 }}
            >
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Date of Birth <span style={{color: "red"}}>*</span>
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack>
                      <DesktopDatePicker
                        inputFormat="dd/MM/yyyy"
                        // defaultValue={values.dateOfBirth}
                        disableFuture
                        value={values?.dateOfBirth}
                        // value={new Date(personalDetails?.dateofBirth)}
                        onChange={handleChange}
                        onKeyDown={handleAddPersonalDetails}
                        maxDate={today?.setDate(today?.getDate() - 1)}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            // onKeyDown={onKeyDown}
                            sx={{
                              svg: { color: "var(--clr-blue-footer)" },
                              input: {
                                color: "var(--clr-blue-footer)",
                                padding: "11px",
                              },
                              border: { color: "var(--clr-blue-light)" },
                            }}
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": { 
                                  padding: '10.5px 14px',
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
                            size="small"
                            {...params}
                          />
                        )}
                      />
                      {(values?.dateOfBirth === null || values?.dateOfBirth === undefined || values?.dateOfBirth[0] === "0") && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {errDate}
                        </FormHelperText>
                      )}
                      {dateError && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {dateError}
                        </FormHelperText>
                      )}
                    </Stack>
                  </LocalizationProvider>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Marital Status <span style={{color: "red"}}>*</span>
                  </InputLabel>
                  {!personalDetails?.maritalStatus ? (
                    <Select
                      displayEmpty
                      renderValue={values.maritalStatus !== "" ? undefined : () => <SelectPlaceholder>Set Status</SelectPlaceholder>} 
                      onChange={handleInputChange("maritalStatus")}
                      onKeyDown={handleAddPersonalDetails}
                      value={values.maritalStatus}
                      error={values.maritalStatus === "" && error}
                      fullWidth
                      inputProps={{ classes: { icon: classes.icon } }}
                      // input={<CustomSelectInput />}
                      sx={{ height: "45px"}}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem value="" disabled>
                        Set Status
                      </MenuItem>
                      {statuses?.map((status) => (
                        <MenuItem value={status} key={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Select
                      displayEmpty
                      renderValue={values.maritalStatus !== "" ? undefined : () => <SelectPlaceholder>Set Status</SelectPlaceholder>} 
                      onChange={handleInputChange("maritalStatus")}
                      defaultValue={personalDetails?.maritalStatus}
                      onKeyDown={handleUpdatePersonalDetails}
                      error={values.maritalStatus === "" && error}
                      fullWidth
                      inputProps={{ classes: { icon: classes.icon } }}
                      // input={<CustomSelectInput />}
                      sx={{ height: "45px"}}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem value="" disabled>
                        Set Status
                      </MenuItem>
                      {statuses?.map((status) => (
                        <MenuItem value={status} key={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  {values.maritalStatus === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel>Gender <span style={{color: "red"}}>*</span></InputLabel>
                  {!personalDetails?.gender ? (
                    <RadioGroup
                      onChange={handleInputChange("gender")}
                      onKeyDown={handleAddPersonalDetails}
                      value={values.gender}
                      error={error}
                      row
                      name="row-radio-buttons-gender"
                    >
                      <FormControlLabel
                        value="female"
                        control={
                          <Radio
                            {...controlGenderProps("female")}
                            sx={{
                              color: "var(--clr-blue-light)",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                          />
                        }
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={
                          <Radio
                            {...controlGenderProps("male")}
                            sx={{
                              color: "var(--clr-blue-light)",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                          />
                        }
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={
                          <Radio
                            {...controlGenderProps("other")}
                            sx={{
                              color: "var(--clr-blue-light)",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                          />
                        }
                        label="Other"
                      />
                    </RadioGroup>
                  ) : (
                    <RadioGroup
                      onChange={handleInputChange("gender")}
                      onKeyDown={handleUpdatePersonalDetails}
                      defaultValue={personalDetails?.gender}
                      error={error}
                      row
                      name="row-radio-buttons-gender"
                    >
                      <FormControlLabel
                        value="female"
                        control={
                          <Radio
                            {...controlGenderProps("female")}
                            sx={{
                              color: "var(--clr-blue-light)",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                          />
                        }
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={
                          <Radio
                            {...controlGenderProps("male")}
                            sx={{
                              color: "var(--clr-blue-light)",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                          />
                        }
                        label="Male"
                      />
                       <FormControlLabel
                        value="other"
                        control={
                          <Radio
                            {...controlGenderProps("other")}
                            sx={{
                              color: "var(--clr-blue-light)",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                          />
                        }
                        label="Other"
                      />
                    </RadioGroup>
                   )}
                </Box>
                {values.gender === null && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {error}
                  </FormHelperText>
                )}
              </Grid>
              
              {
                values.maritalStatus === "Married" &&
                <Grid item xs={12} md={6}>
                  <Grid
                  container
                  justifyContent="space-between"
                  columnSpacing={4}
                  rowSpacing={3}
                  >
                    <Grid item xs={12} md={6}>
                      <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Spouse/Partner Name
                          </InputLabel>
                          {!personalDetails?.spouseName ? (
                            <>
                              <TextField
                                disableUnderline
                                onChange={handleInputChange("spouseName")}
                                onKeyDown={handleAddPersonalDetails}
                                value={values.spouseName}
                                error={values.spouseName === "" && errInput}
                                placeholder="Enter spouse name"
                                type="text"
                                fullWidth
                                sx={{
                                  borderRadius: 1,
                                  fontSize: '14px'
                                }}
                                InputProps={{
                                  sx: {
                                    ".MuiOutlinedInput-input": { 
                                      padding: '10.5px 14px',
                                    },
                                  /*   ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
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
                              />
                             
                            </>
                          ) : (
                            <>
                              <TextField
                                disableUnderline
                                onChange={handleInputChange("spouseName")}
                                onKeyDown={handleUpdatePersonalDetails}
                                defaultValue={personalDetails?.spouseName}
                                error={values.spouseName === "" && errInput}
                                placeholder="Enter spouse name"
                                type="text"
                                fullWidth
                                // inputProps={{ inputMode: 'text', pattern: "^[a-zA-Z ]*$"}}
                                sx={{
                                  borderRadius: 1,
                                  fontSize: '14px'
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
                              />
                              
                            </>
                          )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>
                        Spouse/Partner Occupation
                        </InputLabel>
                        {!personalDetails?.spouseOccupation ? (
                          <>
                            <TextField
                              disableUnderline
                              onChange={handleInputChange("spouseOccupation")}
                              onKeyDown={handleAddPersonalDetails}
                              value={values.spouseOccupation}
                              error={values.spouseOccupation === "" && errInput}
                              placeholder="Enter spouse occupation"
                              type="text"
                              fullWidth
                              sx={{
                                borderRadius: 1,
                                fontSize: '14px'
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
                            />
                          
                          </>
                        ) : (
                          <>
                            <TextField
                              disableUnderline
                              onChange={handleInputChange("spouseOccupation")}
                              onKeyDown={handleUpdatePersonalDetails}
                              defaultValue={personalDetails?.spouseOccupation}
                              error={values.spouseOccupation === "" && errInput}
                              placeholder="Enter spouse occupation"
                              type="text"
                              fullWidth
                              // inputProps={{ inputMode: 'text', pattern: "^[a-zA-Z ]*$"}}
                              sx={{
                                borderRadius: 1,
                                fontSize: '14px'
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
                            />
                            
                          </>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              }
              {
                 values.maritalStatus === "Single" &&
                <Grid item xs={12} md={6}>
                  <Grid
                  container
                  justifyContent="space-between"
                  columnSpacing={4}
                  rowSpacing={3}
                  >
                    <Typography>{" "}</Typography>
                  </Grid>
                </Grid>
              }
            {
                !values.maritalStatus &&
                <Grid item xs={12} md={6}>
                  <Grid
                  container
                  justifyContent="space-between"
                  columnSpacing={4}
                  rowSpacing={3}
                  >
                    <Typography>{" "}</Typography>
                  </Grid>
                </Grid>
              }

              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Present Address <span style={{color: "red"}}>*</span>
                  </InputLabel>
                  {!personalDetails?.presentAddressL1 ? (
                    <>
                      <TextField
                        disableUnderline
                        onChange={handleInputChange("presentAddressL1")}
                        onKeyDown={handleAddPersonalDetails}
                        value={values.presentAddressL1}
                        error={values.presentAddressL1 === "" && errInput}
                        placeholder="Address Line 1"
                        type="text"
                        fullWidth
                        sx={{
                          borderRadius: 1,
                          fontSize: '16px'
                        }}
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": { 
                              padding: '10.5px 14px',
                            },
                            /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid #B8BCCA",
                            },
                            "&:hover": {
                              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #333333",
                              },
                            },
                            "&:focus": {
                              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #5A98F2",
                              },
                            }, */
                          }
                        }}
                        size="small"
                      />
                      {values.presentAddressL1 === "" && (
                        <FormHelperText sx={{ color: "red", mb: 0 }}>
                          {errInput}
                        </FormHelperText>
                      )}
                      {((values.presentAddressL1 !== "") && ((values.presentAddressL1 === " ") || ((addressRegex.test(values.presentAddressL1)) === false))) && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {validAddressErr}
                        </FormHelperText>
                      )}
                    </>
                  ) : (
                    <>
                      <TextField
                        disableUnderline
                        onChange={handleInputChange("presentAddressL1")}
                        value={values.presentAddressL1}
                        onKeyDown={handleUpdatePersonalDetails}
                        // value={values.permanentAddress}
                        error={values.presentAddressL1 === "" && errInput}
                        placeholder="Address Line 1"
                        type="text"
                        fullWidth
                        sx={{
                          borderRadius: 1,
                          fontSize: '16px'
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
                      />
                      {values.presentAddressL1 === "" && (
                        <FormHelperText sx={{ color: "red", mb: 0 }}>
                          {errInput}
                        </FormHelperText>
                      )}
                      {((values.presentAddressL1 !== "") && ((values.presentAddressL1 === " ") || ((addressRegex.test(values.presentAddressL1)) === false))) && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {validAddressErr}
                        </FormHelperText>
                      )}
                    </>
                  )}
                </Box>
              </Grid>

              {
                matches &&
                <Grid item xs={12} md={6}>
                  <Box>
                    {!personalDetails?.presentAddressL2 ? (
                      <>
                        <TextField
                          disableUnderline
                          onChange={handleInputChange("presentAddressL2")}
                          onKeyDown={handleAddPersonalDetails}
                          value={values.presentAddressL2}
                          error={values.presentAddressL2 === "" && errInput}
                          placeholder="Address Line 2"
                          type="text"
                          fullWidth
                          sx={{
                            borderRadius: 1,
                            fontSize: '16px'
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
                        />
                        {values.presentAddressL2 === "" && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {errInput}
                          </FormHelperText>
                        )}
                        {((values.presentAddressL2 !== "") && ((values.presentAddressL2 === " ") || ((addressRegex.test(values.presentAddressL2)) === false))) && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {validAddressErr}
                          </FormHelperText>
                        )}
                      </>
                    ) : (
                      <>
                        <TextField
                          disableUnderline
                          onChange={handleInputChange("presentAddressL2")}
                          value={values?.presentAddressL2}
                          onKeyDown={handleUpdatePersonalDetails}
                          // value={values.permanentAddress}
                          error={values.presentAddressL2 === "" && errInput}
                          placeholder="Address Line 2"
                          type="text"
                          fullWidth
                          sx={{
                            borderRadius: 1,
                            fontSize: '16px'
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
                        />
                        {values.presentAddressL2 === "" && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {errInput}
                          </FormHelperText>
                        )}
                        {((values.presentAddressL2 !== "") && ((values.presentAddressL2 === " ") || ((addressRegex.test(values.presentAddressL2)) === false))) && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {validAddressErr}
                          </FormHelperText>
                        )}
                      </>
                    )}
                  </Box>
                </Grid>
              }

              {
                matches &&
                <Grid item xs={12} md={12}>
                  {
                    personalDetails?.gender ? <Typography
                    sx={{
                      fontSize:  "14px",
                      color: "var(--clr-gray-2)",
                    }}
                  >
                    <Checkbox
                      sx={{
                        color: "#BDBDBD",
                        "&.Mui-checked": {
                          color: "#5A98F2",
                        },
                      }}
                      type="checkbox"
                      onChange={(e) =>  {
                        setAddressSame(e.target.checked)
                        AddPresentToPermanentTwo(e)
                      }}
                      // onKeyDown={handleBasicDetails}
                    />
                    &nbsp;
                    <span sx={{fontSize: '14px', fontWeight: '400'}} >Permanent address is same as present address</span>
                  </Typography> :
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
                          color: "#5A98F2",
                        },
                      }}
                      type="checkbox"
                      onChange={(e) =>  {
                        setAddressSame(e.target.checked)
                        AddPresentToPermanent(e)
                      }}
                      // onKeyDown={handleBasicDetails}
                    />
                    &nbsp;
                    <span sx={{fontSize: '14px', fontWeight: '400'}} >Permanent address is same as present address</span>
                  </Typography>
                  }
                </Grid>
              }

              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Permanent Address <span style={{color: "red"}}>*</span>
                  </InputLabel>
                  {!personalDetails?.permanentAddressL1 ? (
                    <>
                      <TextField
                        disableUnderline
                        onChange={handleInputChange("permanentAddressL1")}
                        onKeyDown={handleAddPersonalDetails}
                        value={values.permanentAddressL1}
                        error={values.permanentAddressL1 === "" && errInput}
                        placeholder="Address Line 1"
                        type="text"
                        fullWidth
                        sx={{
                          borderRadius: 1,
                          fontSize: '16px'
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
                      />
                      {values.permanentAddressL1 === "" && (
                        <FormHelperText sx={{ color: "red", mb: 0 }}>
                          {errInput}
                        </FormHelperText>
                      )}
                      {((values.permanentAddressL1 !== "") && ((values.permanentAddressL1 === " ") || ((addressRegex.test(values.permanentAddressL1)) === false))) && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {validAddressErr}
                        </FormHelperText>
                      )}
                    </>
                  ) : (
                    <>
                      <TextField
                        disableUnderline
                        onChange={handleInputChange("permanentAddressL1")}
                        value={values.permanentAddressL1}
                        onKeyDown={handleUpdatePersonalDetails}
                        // value={values.permanentAddress}
                        error={values.permanentAddressL1 === "" && errInput}
                        placeholder="Address Line 1"
                        type="text"
                        fullWidth
                        sx={{
                          borderRadius: 1,
                          fontSize: '16px'
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
                      />
                      {values.permanentAddressL1 === "" && (
                        <FormHelperText sx={{ color: "red", mb: 0 }}>
                          {errInput}
                        </FormHelperText>
                      )}
                      {((values.permanentAddressL1 !== "") && ((values.permanentAddressL1 === " ") || ((addressRegex.test(values.permanentAddressL1)) === false))) && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {validAddressErr}
                        </FormHelperText>
                      )}
                    </>
                  )}
                </Box>
              </Grid>

              {
                !matches &&
                <Grid item xs={12} md={6}>
                  <Box>
                    {!personalDetails?.presentAddressL2 ? (
                      <>
                        <TextField
                          disableUnderline
                          onChange={handleInputChange("presentAddressL2")}
                          onKeyDown={handleAddPersonalDetails}
                          value={values.presentAddressL2}
                          error={values.presentAddressL2 === "" && errInput}
                          placeholder="Address Line 2"
                          type="text"
                          fullWidth
                          sx={{
                            borderRadius: 1,
                            fontSize: '16px'
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
                        />
                        {values.presentAddressL2 === "" && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {errInput}
                          </FormHelperText>
                        )}
                        {((values.presentAddressL2 !== "") && ((values.presentAddressL2 === " ") || ((addressRegex.test(values.presentAddressL2)) === false))) && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {validAddressErr}
                          </FormHelperText>
                        )}
                      </>
                    ) : (
                      <>
                        <TextField
                          disableUnderline
                          onChange={handleInputChange("presentAddressL2")}
                          value={values?.presentAddressL2}
                          onKeyDown={handleUpdatePersonalDetails}
                          // value={values.permanentAddress}
                          error={values.presentAddressL2 === "" && errInput}
                          placeholder="Address Line 2"
                          type="text"
                          fullWidth
                          sx={{
                            borderRadius: 1,
                            fontSize: '16px'
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
                        />
                        {values.presentAddressL2 === "" && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {errInput}
                          </FormHelperText>
                        )}
                        {((values.presentAddressL2 !== "") && ((values.presentAddressL2 === " ") || ((addressRegex.test(values.presentAddressL2)) === false))) && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {validAddressErr}
                          </FormHelperText>
                        )}
                      </>
                    )}
                  </Box>
                </Grid>
              }

              <Grid item xs={12} md={6}>
                <Box>
                  {!personalDetails?.permanentAddressL2 ? (
                    <>
                      <TextField
                        disableUnderline
                        onChange={handleInputChange("permanentAddressL2")}
                        onKeyDown={handleAddPersonalDetails}
                        value={values.permanentAddressL2}
                        error={values.permanentAddressL2 === "" && errInput}
                        placeholder="Address Line 2"
                        type="text"
                        fullWidth
                        sx={{
                          borderRadius: 1,
                          fontSize: '16px'
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
                      />
                      {values.permanentAddressL2 === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {errInput}
                        </FormHelperText>
                      )}
                      {((values.permanentAddressL2 !== "") && ((values.permanentAddressL2 === " ") || ((addressRegex.test(values.permanentAddressL2)) === false))) && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {validAddressErr}
                        </FormHelperText>
                      )}
                    </>
                  ) : (
                    <>
                      <TextField
                        disableUnderline
                        onChange={handleInputChange("permanentAddressL2")}
                        value={values.permanentAddressL2}
                        onKeyDown={handleUpdatePersonalDetails}
                        // value={values.permanentAddress}
                        error={values.permanentAddressL2 === "" && errInput}
                        placeholder="Address Line 2"
                        type="text"
                        fullWidth
                        sx={{
                          borderRadius: 1,
                          fontSize: '16px'
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
                      />
                      {values.permanentAddressL2 === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {errInput}
                        </FormHelperText>
                      )}
                      {((values.permanentAddressL2 !== "") && ((values.permanentAddressL2 === " ") || ((addressRegex.test(values.permanentAddressL2)) === false))) && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {validAddressErr}
                        </FormHelperText>
                      )}
                    </>
                  )}
                </Box>
              </Grid>
            
              {/* -------present state------ */}
              <Grid item xs={12} md={6}>
                  <Grid
                  container
                  justifyContent="space-between"
                  columnSpacing={4}
                  rowSpacing={3}
                  >
                    <Grid item xs={12} md={6}>
                      <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Country <span style={{color: "red"}}>*</span>
                          </InputLabel>
                          {!personalDetails?.presentCountry ? (
                            <Select
                              displayEmpty
                              renderValue={values.presentCountry !== "" ? undefined : () => <SelectPlaceholder>Select</SelectPlaceholder>} 
                              onChange={handleInputChange("presentCountry")}
                              onKeyDown={handleAddPersonalDetails}
                              value={values.presentCountry}
                              error={values.presentCountry === "" && error}
                              fullWidth
                              inputProps={{ classes: { icon: classes.icon } }}
                              // input={<CustomSelectInput />}
                              sx={{ height: "45px"}}
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                                <MenuItem value={values.presentCountry}>
                                {values.presentCountry}
                                </MenuItem>
                              {/* {allCountry?.map((item) => (
                                <MenuItem value={item?.country} key={item?.country}>
                                  {item?.country}
                                </MenuItem>
                              ))} */}
                            </Select>
                          ) : (
                            <Select
                              displayEmpty
                              renderValue={values.presentCountry !== "" ? undefined : () => <SelectPlaceholder>Select</SelectPlaceholder>} 
                              onChange={handleInputChange("presentCountry")}
                              defaultValue={values.presentCountry}
                              onKeyDown={handleUpdatePersonalDetails}
                              error={values.presentCountry === "" && error}
                              fullWidth
                              inputProps={{ classes: { icon: classes.icon } }}
                              // input={<CustomSelectInput />}
                              sx={{ height: "45px"}}
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                              <MenuItem value="" disabled>
                                <small>{values.presentCountry}</small>
                              </MenuItem>
                              <MenuItem value={values.presentCountry}>
                                {values.presentCountry}
                                </MenuItem>
                              {/* {allCountry?.map((item) => (
                                <MenuItem value={item?.country} key={item?.country}>
                                  {item?.country}
                                </MenuItem>
                              ))} */}
                            </Select>
                          )}
                          {values.presentCountry === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            State <span style={{color: "red"}}>*</span>
                          </InputLabel>
                          {!personalDetails?.presentState ? (
                            <Select
                              displayEmpty
                              renderValue={values.presentState !== "" ? undefined : () => <SelectPlaceholder>Select State</SelectPlaceholder>} 
                              onChange={handleInputChange("presentState")}
                              onKeyDown={handleAddPersonalDetails}
                              value={values.presentState}
                              error={values.presentState === "" && error}
                              fullWidth
                              inputProps={{ classes: { icon: classes.icon } }}
                              // input={<CustomSelectInput />}
                              sx={{ height: "45px"}}
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                              <MenuItem value="" disabled>
                                <small>Select State</small>
                              </MenuItem>
                              {allState?.map((item) => (
                                <MenuItem value={item?.state} key={item?.state}>
                                  {item?.state}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            <Select
                              displayEmpty
                              renderValue={values.presentState !== "" ? undefined : () => <SelectPlaceholder>Select State</SelectPlaceholder>} 
                              onChange={handleInputChange("presentState")}
                              value={values.presentState}
                              onKeyDown={handleUpdatePersonalDetails}
                              error={values.presentState === "" && error}
                              fullWidth
                              inputProps={{ classes: { icon: classes.icon } }}
                              // input={<CustomSelectInput />}
                              sx={{ height: "45px"}}
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                              <MenuItem value="" disabled>
                                <small>Select State</small>
                              </MenuItem>
                              {allState?.map((item) => (
                                <MenuItem value={item?.state} key={item?.state}>
                                  {item?.state}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                          {values.presentState === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                      </Box>
                    </Grid>
                  </Grid>
              </Grid>
          {/* -------Permanent state------ */}
              <Grid item xs={12} md={6}>
                  <Grid
                  container
                  justifyContent="space-between"
                  columnSpacing={4}
                  rowSpacing={3}
                  >
                     <Grid item xs={12} md={6}>
                      <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Country <span style={{color: "red"}}>*</span>
                          </InputLabel>
                          {!personalDetails?.permanentCountry ? (
                            <Select
                              displayEmpty
                              renderValue={values.permanentCountry !== "" ? undefined : () => <SelectPlaceholder>Select</SelectPlaceholder>} 
                              onChange={handleInputChange("permanentCountry")}
                              onKeyDown={handleAddPersonalDetails}
                              value={values.permanentCountry}
                              error={values.permanentCountry === "" && error}
                              fullWidth
                              inputProps={{ classes: { icon: classes.icon } }}
                              // input={<CustomSelectInput />}
                              sx={{ height: "45px"}}
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                               <MenuItem value={values.permanentCountry}>
                                {values.permanentCountry}
                              </MenuItem>
                              {/* {allCountry.map((item) => (
                                <MenuItem value={item?.country} key={item?.country}>
                                  {item?.country}
                                </MenuItem>
                              ))} */}
                            </Select>
                          ) : (
                            <Select
                              displayEmpty
                              renderValue={values.permanentCountry !== "" ? undefined : () => <SelectPlaceholder>Select</SelectPlaceholder>} 
                              onChange={handleInputChange("permanentCountry")}
                              defaultValue={values.permanentCountry}
                              onKeyDown={handleUpdatePersonalDetails}
                              error={values.permanentCountry === "" && error}
                              fullWidth
                              inputProps={{ classes: { icon: classes.icon } }}
                              // input={<CustomSelectInput />}
                              sx={{ height: "45px"}}
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                              <MenuItem value={values.permanentCountry}>
                                {values.permanentCountry}
                              </MenuItem>
                              {/* {allCountry.map((item) => (
                                <MenuItem value={item?.country} key={item?.country}>
                                  {item?.country}
                                </MenuItem>
                              ))} */}
                            </Select>
                          )}
                          {values.permanentCountry === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            State <span style={{color: "red"}}>*</span>
                          </InputLabel>
                          {!personalDetails?.permanentState ? (
                            <Select
                              displayEmpty
                              renderValue={values.permanentState !== "" ? undefined : () => <SelectPlaceholder>Select State</SelectPlaceholder>} 
                              onChange={handleInputChange("permanentState")}
                              onKeyDown={handleAddPersonalDetails}
                              value={values.permanentState}
                              error={values.permanentState === "" && error}
                              fullWidth
                              inputProps={{ classes: { icon: classes.icon } }}
                              // input={<CustomSelectInput />}
                              sx={{ height: "45px"}}
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                              <MenuItem value="" disabled>
                                <small>Select State</small>
                              </MenuItem>
                              {allState?.map((item) => (
                                <MenuItem value={item?.state} key={item?.state}>
                                  {item?.state}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            <Select
                              displayEmpty
                              renderValue={values?.permanentState !== "" ? undefined : () => <SelectPlaceholder>select State</SelectPlaceholder>} 
                              onChange={handleInputChange("permanentState")}
                              value={values?.permanentState}
                              onKeyDown={handleUpdatePersonalDetails}
                              error={values.permanentState === "" && error}
                              fullWidth
                              inputProps={{ classes: { icon: classes.icon } }}
                              // input={<CustomSelectInput />}
                              sx={{ height: "45px"}}
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                              <MenuItem value="" disabled>
                                <small>Select State</small>
                              </MenuItem>
                              {allState?.map((item) => (
                                <MenuItem value={item?.state} key={item?.state}>
                                  {item?.state}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                          {values.permanentState === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                      </Box>
                    </Grid>
                  </Grid>
              </Grid>

            {/* present zip */}
              <Grid item xs={12} md={6}>
                  <Grid
                  container
                  justifyContent="space-between"
                  columnSpacing={4}
                  rowSpacing={3}
                  >
                  <Grid item xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Pincode <span style={{color: "red"}}>*</span>
                      </InputLabel>
                      {!personalDetails?.presentZip ? (
                        <>
                          <TextField
                            disableUnderline
                            onChange={handleInputChange("presentZip")}
                            onKeyDown={handleAddPersonalDetails}
                            onInput={(e) => onlyNumbers(e)}
                            value={values.presentZip}
                            error={values.presentZip === "" && errInput}
                            placeholder="Enter Pincode"
                            type="text"
                            fullWidth
                            sx={{
                              borderRadius: 1,
                              fontSize: '14px'
                            }}
                            inputProps={{ maxLength: 6 }}
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": { 
                                  padding: '11px 14px',
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
                          />
                          {((values.presentZip !== "") && (values.presentZip === undefined || values.presentZip.length < 6)) && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {validationError || errInput}
                            </FormHelperText>
                          )} 
                          {(values.presentZip === "") && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                          {((values.presentZip !== "") && (values.presentZip === " ")) && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                        </>
                      ) : (
                        <>
                          <TextField
                            disableUnderline
                            onChange={handleInputChange("presentZip")}
                            value={values.presentZip}
                            onKeyDown={handleUpdatePersonalDetails}
                            // value={values.permanentAddress}
                            onInput={(e) => onlyNumbers(e)}
                            error={values.presentZip === "" && errInput}
                            placeholder="Enter Pincode"
                            type="text"
                            fullWidth
                            sx={{
                              borderRadius: 1,
                              fontSize: '14px'
                            }}
                            inputProps={{ maxLength: 6 }}
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": { 
                                  padding: '11px 14px',
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
                          />
                          {((values.presentZip !== "") && (values.presentZip === undefined || values.presentZip.length < 6)) && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {validationError || errInput}
                            </FormHelperText>
                          )} 
                          {(values.presentZip === "") && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                          {((values.presentZip !== "") && (values.presentZip === " ")) && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                        </>
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        City <span style={{color: "red"}}>*</span>
                      </InputLabel>
                      {
                        !personalDetails?.presentCity ? (
                          // <ThemeProvider theme={ItisThim}>
                          <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              sx={{
                                "& .MuiAutocomplete-inputRoot":{
                                  padding: '3px 0px 3px 7px',
                                  border: "0.1px solid var(--clr-blue-light) !important",
                                }
                              }}
                              onChange={(event, newValue) => { 
                                setValues({...values, presentCity: newValue}) 
                              }}
                              // value={values.presentCity || { city: ""}}
                              filterSelectedOptions
                              // onKeyDown={handleAddPersonalDetails}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  // Prevent's default 'Enter' behavior.
                                  event.defaultMuiPrevented = true;
                                  // your handler code
                                }
                              }}

                              disabled={values?.presentState ? false : true}
                              options={allPresentCityLocation}
                              getOptionLabel={(option) => option?.city}
                              renderInput={(params) => <TextField
                                onChange={(e) => {
                                  SearchPresentCity(e)
                              }}
                              placeholder="Select Location"
                              {...params} />}
                            />
                            
                        // </ThemeProvider>
                        ) :

                        (
                          // <ThemeProvider theme={ItisThim}>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            sx={{
                              "& .MuiAutocomplete-inputRoot":{
                                padding: '3px 0px 3px 7px',
                                border: "0.1px solid var(--clr-blue-light) !important",
                              }
                            }}
                            onChange={(event, newValue) => {
                              setValues({...values, presentCity: newValue})
                            }}
                            defaultValue={values.presentCity || { city: ""}}
                            filterSelectedOptions
                            // onKeyDown={handleAddPersonalDetails}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                // Prevent's default 'Enter' behavior.
                                event.defaultMuiPrevented = true;
                                // your handler code
                              }
                            }}

                            disabled={values?.presentState ? false : true}
                            options={allPresentCityLocation}
                            getOptionLabel={(option) => option?.city}
                            renderInput={(params) => <TextField
                              onChange={(e) => {
                                SearchPresentCity(e)
                            }}
                            placeholder="Select Location"
                            {...params} />}
                            />
                          //  </ThemeProvider>
                        )
                      }
                    {values.presentCity === "" && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {error}
                      </FormHelperText>
                    )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

                {/* Permanent zip */}
              <Grid item xs={12} md={6}>
                  <Grid
                  container
                  justifyContent="space-between"
                  columnSpacing={4}
                  rowSpacing={3}
                  >
                    <Grid item xs={12} md={6}>
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>
                         Pincode <span style={{color: "red"}}>*</span>
                        </InputLabel>
                        {!personalDetails?.permanentZip ? (
                          <>
                            <TextField
                              disableUnderline
                              onChange={handleInputChange("permanentZip")}
                              onKeyDown={handleAddPersonalDetails}
                              onInput={(e) => onlyNumbers(e)}
                              value={values.permanentZip}
                              error={values.permanentZip === "" && errInput}
                              placeholder="Enter Pincode"
                              type="text"
                              fullWidth
                              sx={{
                                borderRadius: 1,
                                fontSize: '14px'
                              }}
                              inputProps={{ maxLength: 6 }}
                              InputProps={{
                                sx: {
                                  ".MuiOutlinedInput-input": { 
                                    padding: '11px 14px',
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
                            />
                            {((values.permanentZip !== "") && (values.permanentZip === undefined || values.permanentZip.length < 6)) && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {validationError || errInput}
                              </FormHelperText>
                            )}  
                            {(values.permanentZip === "") && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {errInput}
                              </FormHelperText>
                            )}
                            {((values.permanentZip !== "") && (values.permanentZip === " ")) && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {errInput}
                              </FormHelperText>
                            )}
                          </>
                        ) : (
                          <>
                            <TextField
                              disableUnderline
                              onChange={handleInputChange("permanentZip")}
                              value={values?.permanentZip}
                              onKeyDown={handleUpdatePersonalDetails}
                              // value={values.permanentAddress}
                              onInput={(e) => onlyNumbers(e)}
                              error={values.permanentZip === "" && errInput}
                              placeholder="Enter Pincode"
                              type="text"
                              fullWidth
                              sx={{
                                borderRadius: 1,
                                fontSize: '14px'
                              }}
                              inputProps={{ maxLength: 6 }}
                              InputProps={{
                                sx: {
                                  ".MuiOutlinedInput-input": { 
                                    padding: '11px 14px',
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
                            />
                            {((values.permanentZip !== "") && (values.permanentZip === undefined || values.permanentZip.length < 6)) && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {validationError || errInput}
                              </FormHelperText>
                            )}  
                            {(values.permanentZip === "") && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {errInput}
                              </FormHelperText>
                            )}
                             {((values.permanentZip !== "") && (values.permanentZip === " ")) && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {errInput}
                              </FormHelperText>
                            )}
                          </>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <InputLabel sx={{ py: 0.5 }}>
                        City <span style={{color: "red"}}>*</span>
                      </InputLabel>
                      <Box>
                      {
                       !personalDetails?.permanentCity ? (
                          // <ThemeProvider theme={ItisThim}>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            sx={{
                              "& .MuiAutocomplete-inputRoot":{
                                padding: '3px 0px 3px 7px',
                                border: "0.1px solid var(--clr-blue-light) !important",
                              }
                            }}
                            onChange={(event, newValue) => {
                              setValues({...values, permanentCity: newValue}) 
                            }}
                            onKeyDown={handleAddPersonalDetails}  
                            disabled={values?.permanentState ? false : true}
                            filterSelectedOptions
                            options={allPermanentCityLocation}
                            defaultValue={ values.permanentCity || { city: ""}}
                            getOptionLabel={(option) => option?.city}
                            renderInput={(params) => <TextField
                              onChange={(e) => {
                                SearchPermanentCity(e)
                            }}
                            placeholder="Select Location"
                            {...params} />}  
                            />
                        // </ThemeProvider>
                        ) :

                        (
                          // <ThemeProvider theme={ItisThim}>
                          <Autocomplete
                            value={values.permanentCity}
                              disablePortal
                              id="combo-box-demo"
                              sx={{
                                "& .MuiAutocomplete-inputRoot":{
                                  padding: '3px 0px 3px 7px',
                                  border: "0.1px solid var(--clr-blue-light) !important",
                                }
                              }}
                              onChange={(event, newValue) => {
                                setValues({...values, permanentCity: newValue}) 
                              }} 
                              onKeyDown={handleUpdatePersonalDetails}
                              disabled={values?.permanentState ? false : true}
                              filterSelectedOptions
                              options={allPermanentCityLocation}
                              getOptionLabel={(option) => option?.city} 
                              renderInput={(params) => <TextField
                                onChange={(e) => {
                                  SearchPermanentCity(e)
                              }}
                              placeholder="Select Location"
                              {...params} />}
                            />
                          // </ThemeProvider>
                        )
                      }
                         {values.permanentCity === "" && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {error}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
              </Grid>
              
              {
                !matches &&
                <Grid item xs={12} md={12}>
                  {
                    personalDetails?.gender ? <Typography
                    sx={{
                      fontSize:  "14px",
                      color: "var(--clr-gray-2)",
                    }}
                  >
                    <Checkbox
                      sx={{
                        color: "#BDBDBD",
                        "&.Mui-checked": {
                          color: "#5A98F2",
                        },
                      }}
                      type="checkbox"
                      onChange={(e) =>  {
                        setAddressSame(e.target.checked)
                        AddPresentToPermanentTwo(e)
                      }}
                      // onKeyDown={handleBasicDetails}
                    />
                    &nbsp;
                    <span sx={{fontSize: '14px', fontWeight: '400'}} >Permanent address is same as present address</span>
                  </Typography> :
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
                          color: "#5A98F2",
                        },
                      }}
                      type="checkbox"
                      onChange={(e) =>  {
                        setAddressSame(e.target.checked)
                        AddPresentToPermanent(e)
                      }}
                      // onKeyDown={handleBasicDetails}
                    />
                    &nbsp;
                    <span sx={{fontSize: '14px', fontWeight: '400'}} >Permanent address is same as present address</span>
                  </Typography>
                  }
                </Grid>
              }

              <Grid item xs={12} md={6}>
                <Box>
                <InputLabel sx={{ py: 0.5 }}>
                  Professional Interest <span style={{color: "red"}}>*</span>
                </InputLabel>
                  {!personalDetails?.professionalInterest ? (
                    <>
                      <TextField

                        disableUnderline
                        onChange={handleInputChange("professionalInterest")}
                        onKeyDown={handleAddPersonalDetails}
                        value={values.professionalInterest}
                        error={values.professionalInterest === "" && errInput}
                        placeholder="Enter Professional Interest"
                        type="text"
                        fullWidth
                        sx={{
                          borderRadius: 1,
                        }}
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": { 
                              // padding: '10.5px 14px',
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
                        inputProps={{
                          maxlength: CHARACTER_LIMIT,
                        }}
                         // id="outlined-multiline-flexible"
                        multiline
                        rows={5}
                        variant="outlined"
                        id="aboutData"
                        size="small"
                      />
                    
                    </>
                  ) : (
                    <>
                      <TextField
                        disableUnderline
                        onChange={handleInputChange("professionalInterest")}
                        defaultValue={personalDetails?.professionalInterest}
                        onKeyDown={handleUpdatePersonalDetails}
                        // value={values.permanentAddress}
                        error={values.professionalInterest === "" && errInput}
                        placeholder="Enter Professional Interest"
                        type="text"
                        fullWidth
                        sx={{
                          borderRadius: 1,
                        }} 
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": { 
                              // padding: '12.5px 14px',
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
                        inputProps={{
                          maxlength: CHARACTER_LIMIT,
                        }}
                        // id="outlined-multiline-flexible"
                        multiline
                        rows={5}
                        variant="outlined"
                        id="aboutData"
                        size="small"
                      />
                      
                    </>
                  )}
                  {(values.professionalInterest  === "") && (
                      <FormHelperText sx={{ color: "red", mt: 0 }}>
                        {errInput}
                      </FormHelperText>
                    )}
                    {((values.professionalInterest  !== "") && (values.professionalInterest === " ")) && (
                      <FormHelperText sx={{ color: "red", mt: 0 }}>
                        {errInput}
                      </FormHelperText>
                    )}
                    <FormHelperText>
                      {`${values?.professionalInterest?.replaceAll("<br />","\n")?.length}/${CHARACTER_LIMIT}`}
                    </FormHelperText>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                <InputLabel sx={{ py: 0.5 }}>
                    Personal Interest <span style={{color: "red"}}>*</span>
                  </InputLabel>
                  {!personalDetails?.personalInterest ? (
                    <>
                      <TextField
                        disableUnderline
                        onChange={handleInputChange("personalInterest")}
                        onKeyDown={handleAddPersonalDetails}
                        value={values.personalInterest}
                        error={values.personalInterest === "" && errInput}
                        placeholder="Enter Personal Interest"
                        type="text"
                        fullWidth
                        sx={{
                          borderRadius: 1,
                        }}
                        InputProps={{
                          maxlength: CHARACTER_LIMIT,
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
                        inputProps={{
                          maxlength: CHARACTER_LIMIT,
                        }}
                         // id="outlined-multiline-flexible"
                         multiline
                         rows={5}
                         variant="outlined"
                         id="aboutData"
                         size="small"
                      />
                     
                    </>
                  ) : (
                    <>
                      <TextField
                        disableUnderline
                        onChange={handleInputChange("personalInterest")}
                        defaultValue={personalDetails?.personalInterest}
                        onKeyDown={handleUpdatePersonalDetails}
                        // value={values.permanentAddress}
                        error={values.personalInterest === "" && errInput}
                        placeholder="Enter Personal Interest"
                        type="text"
                        fullWidth
                        sx={{
                          borderRadius: 1,
                          fontSize: '14px'
                        }}
                        InputProps={{
                          maxlength: CHARACTER_LIMIT,
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
                        inputProps={{
                          maxlength: CHARACTER_LIMIT,
                        }}
                        // id="outlined-multiline-flexible"
                        multiline
                        rows={5}
                        variant="outlined"
                        id="aboutData"
                        size="small"
                      />
                      
                    </>
                  )}
                  {(values.personalInterest  === "") && (
                      <FormHelperText sx={{ color: "red", mt: 0 }}>
                        {errInput}
                      </FormHelperText>
                    )}
                    {((values.personalInterest  !== "") && (values.personalInterest === " ")) && (
                      <FormHelperText sx={{ color: "red", mt: 0 }}>
                        {errInput}
                      </FormHelperText>
                    )}
                    <FormHelperText>
                      {`${values?.personalInterest?.replaceAll("<br />","\n")?.length}/${CHARACTER_LIMIT}`}
                    </FormHelperText>
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "flex-end",
                mt: 3,
                mb: 2,
              }}
            >
              <Button
                onClick={onClick}
                sx={{ borderRadius: 16, borderWidth: "2px !important" }}
                variant="outlined"
              >
                Cancel
              </Button>
              {!personalDetails?.maritalStatus ? (
                <Button
                  onClick={(event) => handleAddPersonalDetails(event, "onClick")}
                  sx={{ borderRadius: 16, py: 1 }}
                  variant="contained"
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={(event) => handleUpdatePersonalDetails(event, "onClick")}
                  sx={{ borderRadius: 16, py: 1 }}
                  variant="contained"
                >
                  Save
                </Button>
              )}
            </Box>
          </Card>
        )}
        {!flag && lang && !isUpdateLang && (
          <AddLanguage onLangClick={onLangClick} setLanguagesKnown={setLanguagesKnown} />
        )}
        {!flag && !lang && isUpdateLang && (
          <Card
            sx={{
              boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
              border: matches ? "1px solid #E4EEF5" : "",
              backgroundColor: "var(--clr-white) !important",
              p: 2.5,
              mt: 5,
              mb: 7,
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
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
                Languages Known
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
                onClick={() => handleDeleteButton(languageItem?.lknID)}
              >
                Delete
              </Button>
            </Box>
            <Grid
              container
              justifyContent="space-between"
              columnSpacing={4}
              rowSpacing={3}
              sx={{ my: 3 }}
            >
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Language <span style={{color: "red"}}>*</span>
                  </InputLabel>
                  <Select
                    displayEmpty
                    renderValue={languageValues.language !== "" ? undefined : () => <SelectPlaceholder>Set Language</SelectPlaceholder>} 
                    onChange={handleSelectChange("language")}
                    onKeyDown={(event) => handleUpdateLanguage(event, "onEnter", languageItem.lknID)}
                    defaultValue={languageItem?.language}
                    error={languageValues.language === "" && errSelect}
                    fullWidth
                    inputProps={{ classes: { icon: classes.icon } }}
                    // input={<CustomSelectInput />}
                    sx={{ height: "45px"}}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>
                      Set Language
                    </MenuItem>
                    {languages?.map((option) => (
                      <MenuItem value={option} key={option} disabled={languagesKnown.some(person => person.language === option)}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {languageValues.language === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {errSelect}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Proficiency <span style={{color: "red"}}>*</span>
                  </InputLabel>
                  <Select
                    displayEmpty
                    renderValue={languageValues.proficiency !== "" ? undefined : () => <SelectPlaceholder>Set Proficiancy</SelectPlaceholder>} 
                    onChange={handleSelectChange("proficiency")}
                    onKeyDown={(event) => handleUpdateLanguage(event, "onEnter", languageItem.lknID)}
                    defaultValue={languageItem?.proficiency}
                    error={languageValues.proficiency === "" && errSelect}
                    fullWidth
                    inputProps={{ classes: { icon: classes.icon } }}
                    // input={<CustomSelectInput />}
                    sx={{ height: "45px"}}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>
                      Set Proficiancy
                    </MenuItem>
                    {proficiencies?.map((option) => (
                      <MenuItem value={option} key={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {languageValues.proficiency === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {errSelect}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormGroup>
                  <Box sx={{ display: "flex", gap: 4, ml: matches ? 0 : 4, mt: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleCheckedChange("read")}
                          onKeyDown={(event) => handleUpdateLanguage(event, "onEnter", languageItem.lknID)}
                          defaultChecked={languageItem?.read}
                          name="read"
                          sx={{
                            color: "#BDBDBD",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary)",
                            },
                          }}
                        />
                      }
                      label="Read"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleCheckedChange("write")}
                          onKeyDown={(event) => handleUpdateLanguage(event, "onEnter", languageItem.lknID)}
                          defaultChecked={languageItem?.write}
                          name="write"
                          sx={{
                            color: "#BDBDBD",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary)",
                            },
                          }}
                        />
                      }
                      label="Write"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleCheckedChange("speak")}
                          onKeyDown={(event) => handleUpdateLanguage(event, "onEnter", languageItem.lknID)}
                          defaultChecked={languageItem?.speak}
                          name="speak"
                          sx={{
                            color: "#BDBDBD",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary)",
                            },
                          }}
                        />
                      }
                      label="Speak"
                    />
                  </Box>
                </FormGroup>
                {(languageValues.read === false && languageValues.write === false && languageValues.speak === false) && (
                  <FormHelperText sx={{ color: "red", mb: 1, ml: 4 }}>
                    {errCheck}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "flex-end",
                my: 2,
              }}
            >
              <Button
                sx={{ borderRadius: 16, borderWidth: "2px !important" }}
                variant="outlined"
                onClick={cancelUpdate}
              >
                Cancel
              </Button>
              <Button
                onClick={(event) => handleUpdateLanguage(event, "onClick", languageItem.lknID)}
                sx={{ borderRadius: 16, py: 1 }}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Card>
        )}

        <Snackbar open={detailsAlert} autoHideDuration={6000} onClose={() => setDetailsAlert(false)}>
          <Alert onClose={() => setDetailsAlert(false)} severity="success" sx={{ width: '100%' }}>
           {
              added ? "Personal Details Added Successfully" : "Personal Details Update Successfully"
           }
          </Alert>
        </Snackbar>
      </Box>
    );
  } else {
    return (
      <Grid item sx={{ marginBlock: "1rem", textAlign: "center" }} spacing={2}>
        <CircularProgress />
      </Grid>
    );
  }
};
export default PersonalDetails;

const textStyle = { fontSize: 12, color: "#828282", fontWeight: "600" };
