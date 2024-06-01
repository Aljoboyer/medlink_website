import { useEffect } from "react";
import { useState } from "react";
import {
  Grid,
  FormControl,
  Typography,
  Select,
  MenuItem,
  InputBase,
  Checkbox,
  InputLabel,
  Input,
  useMediaQuery,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { gqlquery, QUERY_COURSEID, QUERY_GET_HEALTHINDUSTRY, QUERY_UNIVERSITYID } from "../../api/hospitalIndex";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const selectPlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#B8BCCA"
  }
}))

const SelectPlaceholder = ({ children }) => {
  const classes = selectPlaceholderStyles();
  return (<div className={classes.placeholder}>{children}</div>);
}

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


function RowRadioButtonsGroup() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <FormControl>
      <RadioGroup
        // row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        // style={{ display: "flex", justifyContent: "space-between" }}
        style={{
          display: "flex",
          justifyContent: !matches ? "space-between" : "flex-start",
          flexDirection: !matches ? "row" : "column",
        }}
      >
        <FormControlLabel
          sx={{ color: "#1A1A1A", fontSize: "1rem" }}
          value="anyusualification"
          control={
            <Radio
              sx={{
                color: "#C7D3E3",
                "&.Mui-checked": {
                  color: "var(--clr-blue-primary)",
                },
              }}
            />
          }
          label="Any UG Qualification"
          color="black"
        />
        <FormControlLabel
          sx={{ color: "#1A1A1A", fontSize: "1rem" }}
          value="specificugqualification"
          control={
            <Radio
              sx={{
                color: "#C7D3E3",
                "&.Mui-checked": {
                  color: "var(--clr-blue-primary)",
                },
              }}
            />
          }
          label="Specific UG Qualification"
        />
        <FormControlLabel
          sx={{ color: "#1A1A1A", fontSize: "1rem" }}
          value="nougualification"
          control={
            <Radio
              sx={{
                color: "#C7D3E3",
                "&.Mui-checked": {
                  color: "var(--clr-blue-primary)",
                },
              }}
            />
          }
          label="No UG Qualification"
        />
      </RadioGroup>
    </FormControl>
  );
}

const EducationDetails = (props) => {
  const [openEdcationalDetails, setOpenEdcationalDetails] = useState(false);
  const classes = useStyles();
  const [values, setValues] = useState({
    course: "",
    specialization: "",
    institute: "",
    passingyear: "",
    coursetype: "",
    healtCareIndustry: "",
    qualification: "",
  });
  const [qualificationField, setqualificationField] = useState(false);
  const [courseField, setCourseField] = useState(false);
  const [specialField, setSpecialField] = useState(false);
  const [allHealtCareIndustry, setAllHealtCareIndustry] = useState([]);
  const [allQualification, setAllQualification] = useState([]);
  const [allCourses, setAllCourses] = useState([])
  const [allSpecialization, setAllSpecialization] = useState([]);
  const [universityID, setUniversityID] = useState([]);
  const [passingYears, setPassingYears] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [courseID, setCourseID] = useState([]);
  const [specializaitonID, setSpecializationID] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  // Custom redio button style
  const controlProps = (item) => ({
    checked: values.coursetype === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const handleEdcationalDetails = () => {
    setOpenEdcationalDetails(!openEdcationalDetails);
  };

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


    if (prop === 'healtCareIndustry') {
      setqualificationField(true)
    }
    else if (prop === 'qualification') {
      setCourseField(true)
    }
    else if (prop === 'course') {
      setSpecialField(true)
    }

  };

  useEffect(() => {

    gqlquery(QUERY_GET_HEALTHINDUSTRY, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllHealtCareIndustry(datas?.data?.getIndustry)
      });
  }, []);


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
  }, [values.healtCareIndustry]);

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
  }, [values.healtCareIndustry, values.qualification,]);

  useEffect(() => {
    const GET_SPECIALIZATION = {
      query: `query MyQuery {
        getEducationSpecialization(course: "${values?.course}", industry: "${values?.healtCareIndustry}", qualification: "${values?.qualification}") {
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
        setAllSpecialization(datas?.data?.getEducationSpecialization)
      });
  }, [values?.course, values?.healtCareIndustry, values?.qualification])

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

  const SearchUniversity = (event) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val

    if (event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2) {

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
    setValues({ ...values, institute: FindVersity?.name })
  }

  const sendEducationalData = {
    values: values
  };
  
  useEffect(() => {
    props.getEducationData(sendEducationalData)
  }, [values])

  return (
    <Box>
      <Box
        sx={{
          px: !matches ? 5 : 1.25,
          py: !matches ? 4 : 1.25,
          backgroundColor: "var(--clr-white)",
          textAlign: "left",
          borderRadius: 2,
          boxShadow: !matches && "0px 9px 18px rgba(69, 143, 246, 0.09)",
          border: matches && "1px solid #E4EEF5",
          mb: 2.5,
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: !matches ? "20px" : "18px",
              fontWeight: 700,
              color: "var(--clr-blue-footer)",
            }}
          >
            Educational Details
          </Typography>
          {openEdcationalDetails ? (
            <ExpandLess
              onClick={handleEdcationalDetails}
              style={{
                height: !matches ? "35px" : "24px",
                width: !matches ? "40px" : "27px",
                color: "var(--clr-blue-footer)",
              }}
            />
          ) : (
            <ExpandMore
              onClick={handleEdcationalDetails}
              style={{
                height: !matches ? "35px" : "24px",
                width: !matches ? "40px" : "27px",
                color: "var(--clr-blue-footer)",
              }}
            />
          )}
        </Box>
        {
          (openEdcationalDetails && matches) && <hr style={{ borderBottom: "1px solid #E4EEF5", borderTop: "0px", borderLeft: "0px", borderRight: "0px", marginTop: "10px" }} />
        }
        <Collapse in={openEdcationalDetails} timeout="auto" unmountOnExit>
          <Box sx={{ pt: !matches ? 2 : 1.1 }}>

            <Grid container rowSpacing={!matches ? 3 : 2} columnSpacing={10}>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Healthcare Industry
                  </InputLabel>
                  <Select
                    displayEmpty
                    renderValue={values.healtCareIndustry !== "" ? undefined : () => <SelectPlaceholder>Select Healthcare Industry</SelectPlaceholder>}
                    name=""
                    // error={values.healtCareIndustry === "" && error}
                    value={values.healtCareIndustry}
                    onChange={handleChange("healtCareIndustry")}
                    // onKeyDown={handleEducation}
                    fullWidth
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                    input={<CustomSelectInput />}
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
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>Qualification</InputLabel>
                  <Select
                    displayEmpty
                    renderValue={values.qualification !== "" ? undefined : () => <SelectPlaceholder>Select Qualification</SelectPlaceholder>}
                    name=""
                    // error={values.qualification === "" && error}
                    value={values.qualification}
                    onChange={handleChange("qualification")}
                    // onKeyDown={handleEducation}
                    fullWidth
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                    input={<CustomSelectInput />}
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
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>Course</InputLabel>
                  <Select
                    displayEmpty
                    renderValue={values.course !== "" ? undefined : () => <SelectPlaceholder>Select Course</SelectPlaceholder>}
                    name=""
                    // error={values.course === "" && error}
                    value={values.course}
                    onChange={handleChange("course")}
                    // onKeyDown={handleEducation}
                    fullWidth
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                    input={<CustomSelectInput />}
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
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>Specialization</InputLabel>
                  <Select
                    displayEmpty
                    renderValue={values.specialiazation !== "" ? undefined : () => <SelectPlaceholder>Select Specialization</SelectPlaceholder>}
                    fullWidth
                    // error={values.specialiazation === "" && error}
                    value={values.specialization}
                    onChange={handleChange("specialization")}
                    // onKeyDown={handleEducation}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    input={<CustomSelectInput />}
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
                      <MenuItem value={singleSpecilization?.specialization} >
                        {singleSpecilization?.specialization}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>University</InputLabel>
                  <ThemeProvider theme={ItisThim}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      sx={{
                        "& .MuiAutocomplete-inputRoot": {
                          padding: '3px 0px 3px 7px',
                          border: "1px solid var(--clr-blue-light) !important",
                        }
                      }}
                      onChange={(event, val) => {
                        VersitySelectHandler(val)
                      }}
                      IconComponent={() => (
                        <ArrowDropDownIcon sx={{ color: "var(--clr-blue-footer) !important" }} />
                      )}
                      options={universityID?.map((option) => option?.name)}
                      renderInput={(params) => <TextField
                        onChange={(e) => SearchUniversity(e)}
                        // placeholder="Select University"
                        placeholder="Please Select University/Institute Name"
                        {...params} />}
                    />
                  </ThemeProvider>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>Year Of Passing</InputLabel>
                  <Select
                    fullWidth
                    displayEmpty
                    renderValue={values.passingyear !== "" ? undefined : () => <SelectPlaceholder>Select Year</SelectPlaceholder>}
                    // error={values.passingyear === "" && error}
                    value={values.passingyear}
                    onChange={handleChange("passingyear")}
                    // onKeyDown={handleEducation}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    input={<CustomSelectInput />}
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
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>Course Type</InputLabel>
                  <RadioGroup
                    row
                    value={values.coursetype}
                    onChange={handleChange("coursetype")}
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
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default EducationDetails;
