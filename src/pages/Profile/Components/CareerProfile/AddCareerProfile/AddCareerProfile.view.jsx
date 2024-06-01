import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Typography,
  TextField,
  FormHelperText,
  Box,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { gqlquery, QUERY_DEPARTMENTS, QUERY_GETCANDIDATEAVAILABILITY, QUERY_GETCAREERPROFILE } from "../../../../../api";

const AddCareerProfile = (props) => {

  const [values, setValues] = useState({
    currentIndustry: "",
    department: "",
    roleCategory: "",
    jobRole: "",
    desiredJobType: "",
    desiredShift: "",
    desiredEmploymentType: "",
    preferredWorkLocation: "",
    availabilityDay: "",
    availabilityFromTime: "",
    availabilityToTime: "",
    expectedSalary: "",
  });
  const [error, setError] = useState("");
  const [errInput, setErrInput] = useState("");
  const [getAvailability, setGetAvailability] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [masterDepartment, setMasterDepartment] = useState([]);


  const fromTime = ["12 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM", "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM", "12 PM", "01 PM", "02 PM", "03 PM", "04 PM", "05 PM", "06 PM", "07 PM", "08 PM", "09 PM", "10 PM", "11 PM"];
  const toTime = ["12 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM", "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM", "12 PM", "01 PM", "02 PM", "03 PM", "04 PM", "05 PM", "06 PM", "07 PM", "08 PM", "09 PM", "10 PM", "11 PM"];



  let timeTo = toTime.filter(word => toTime.indexOf(word) > values.availabilityFromTime);
        const handleChange = (prop) => (event) => {
          setValues({ ...values, [prop]: event.target.value });
        };
        
 
  useEffect(() => {
    gqlquery(QUERY_DEPARTMENTS, null)
      .then((res) => res.json())
      .then((datas) => setMasterDepartment(datas.data?.getDepartments));

  }, [updateList]);

  useEffect(() => {
    gqlquery(QUERY_GETCANDIDATEAVAILABILITY, null)
      .then((res) => res.json())
      .then((datas) => setGetAvailability(datas.data?.getCandidateAvailability));

  }, [updateList]);

  const handleAddAvailability = (event) => {
    const availabilityDay = values.availabilityDay;
    const availabilityFromTime = values.availabilityFromTime;
    const availabilityToTime = values.availabilityToTime;

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
      .finally((e) => console.log("adding Candidate Availability details to database"));

      values.availabilityDay = "";
      values.availabilityFromTime = "";
      values.availabilityToTime = "";
  }

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


  const handleCareerProfile = () => {
    if (values.currentIndustry === "") {
      setErrInput("Text field can not be empty.");
    }
    else if (values.roleCategory === "") {
      setErrInput("Text field can not be empty.");
    }
    else if (values.jobRole === "") {
      setErrInput("Text field can not be empty.");
    }
    else {
      setErrInput("");
    }

    if (
      values.department === "" ||
      values.desiredJobType === "" ||
      values.desiredShift === "" ||
      values.desiredEmploymentType === "" ||
      values.preferredWorkLocation === "" ||
      values.expectedSalary === ""
    ) {
      return setError("Please, select an option.");
    }

    const QUERY_POSTCAREERPROFILE = {
      query: `mutation MyMutation {
        addCareerProfile (
                  departmentID: ${Number(values.department)},
                  desiredEmploymentType: "${values.desiredEmploymentType}",
                  desiredJobType: "${values.desiredJobType}",
                  desiredShift: "${values.desiredShift}",
                  expectedSalary: "${values.expectedSalary}",
                  industry: "${values.currentIndustry}",
                  jobRole: "${values.jobRole}", 
                  preferredWorkLocation: "${values.preferredWorkLocation}",
                  roleCategory: "${values.roleCategory}"
                  ) {
                    cpID
                    departmentID
                    desiredJobType
                    desiredEmploymentType
                    desiredShift
                    expectedSalary
                    industry
                    jobRole
                    preferredWorkLocation
                    roleCategory
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
        console.log(datas)
      })
      .finally((e) => console.log("Adding Career Profile details to database")); 

    values.currentIndustry = "";
    values.department = "";
    values.roleCategory = "";
    values.jobRole = "";
    values.desiredJobType = "";
    values.desiredShift = "";
    values.desiredEmploymentType = "";
    values.preferredWorkLocation = "";
    values.expectedSalary = "";

    setErrInput("");
    setError("");
  
  };



  return (
    <Grid item sx={{ marginBlock: "1rem" }} spacing={2}>
      <Card
        sx={{
          height: "100%",
          backgroundColor: "var(--clr-gray-6) !important",
        }}
      >
        <Typography
          component="h3"
          variant="h5"
          sx={{
            fontSize: 24,
            fontWeight: 700,
            margin: "1rem",
            marginBottom: 0,
          }}
        >
          Career Profile
        </Typography>
        <Grid
          container
          direction={"row"}
          alignItems="flex-start"
          padding={2}
          spacing={3}
          sx={{ lineHeight: 5 }}
        >
          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth >
              <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                <span style={{ color: '#616161' }}>Current Industry</span>
              </FormLabel>
               <TextField
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", width: "100%" }}
                value={values.currentIndustry}
                onChange={handleChange("currentIndustry")}
                fullWidth
                error={values.currentIndustry === "" && errInput}
                helpertext={error}
                placeholder="Text"
              /> 

               {values.currentIndustry === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {errInput}
                </FormHelperText>
              )} 
            </FormControl>
          </Grid>
          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                <span style={{ color: '#616161' }}>Department</span>
              </FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-2"
                error={values.department === "" && error}
                value={values.department}
                onChange={handleChange("department")}
                sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                displayEmpty
              >
                <MenuItem value="" disabled>Text</MenuItem>
                 {
                      masterDepartment.map((department) =>
                        <MenuItem value={department.departmentID}>{department.name}</MenuItem>
                      )
                  }
                  {console.log(masterDepartment)}
                  {/* <MenuItem value={1}>{masterDepartment}</MenuItem> */}

               {/*  <MenuItem value={1}>Urology</MenuItem>
                <MenuItem value={2}>Cardiologists</MenuItem>
                <MenuItem value={3}>Endocrinologists</MenuItem> */}
              </Select>
              {values.department === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth >
              <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                <span style={{ color: '#616161' }}>Role Category</span>
              </FormLabel>
              <TextField
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", width: "100%" }}
                value={values.roleCategory}
                onChange={handleChange("roleCategory")}
                fullWidth
                error={values.roleCategory === "" && errInput}
                helpertext={error}
                placeholder="Text"
              />
              {values.roleCategory === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {errInput}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth >
              <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                <span style={{ color: '#616161' }}>Job Role</span>
              </FormLabel>
              <TextField
                variant="outlined"
                sx={{ backgroundColor: "#ffffff", width: "100%" }}
                value={values.jobRole}
                onChange={handleChange("jobRole")}
                fullWidth
                error={values.jobRole === "" && errInput}
                helpertext={error}
                placeholder="Text"
              />
              {values.jobRole === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {errInput}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                <span style={{ color: '#616161' }}>Desired Job Type</span>
              </FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-2"
                error={values.desiredJobType === "" && error}
                value={values.desiredJobType}
                onChange={handleChange("desiredJobType")}
                sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                displayEmpty
              >
                <MenuItem value="" disabled>Select</MenuItem>
                <MenuItem value={"fullTime"}>Full Time</MenuItem>
                <MenuItem value={"partTime"}>Part Time</MenuItem>
                <MenuItem value={"Internship"}>Internship</MenuItem>
                <MenuItem value={"contact"}>Contact</MenuItem>
              </Select>
              {values.desiredJobType === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                <span style={{ color: '#616161' }}>Desired Shift</span>
              </FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-2"
                error={values.desiredShift === "" && error}
                value={values.desiredShift}
                onChange={handleChange("desiredShift")}
                sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                displayEmpty
              >
                <MenuItem value="" disabled>Select</MenuItem>
                <MenuItem value={"Day"}>Day</MenuItem>
                <MenuItem value={"Night"}>Night</MenuItem>
              </Select>
              {values.desiredShift === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                <span style={{ color: '#616161' }}>Desired Employment Type</span>
              </FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-2"
                error={values.desiredEmploymentType === "" && error}
                value={values.desiredEmploymentType}
                onChange={handleChange("desiredEmploymentType")}
                sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                displayEmpty
              >
                <MenuItem value="" disabled>Select</MenuItem>
                <MenuItem value={"fullTime"}>Full Time</MenuItem>
                <MenuItem value={"partTime"}>Part Time</MenuItem>
                <MenuItem value={"Internship"}>Internship</MenuItem>
                <MenuItem value={"contact"}>Contact</MenuItem>
              </Select>
              {values.desiredEmploymentType === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                <span style={{ color: '#616161' }}>Preferred Work Location</span>
              </FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-2"
                error={values.preferredWorkLocation === "" && error}
                value={values.preferredWorkLocation}
                onChange={handleChange("preferredWorkLocation")}
                sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                displayEmpty
              >
                <MenuItem value="" disabled>Select</MenuItem>
                <MenuItem value={"wfo"}>Work From Home</MenuItem>
                <MenuItem value={"wfhospital"}>Work From Hospital</MenuItem>
              </Select>
              {values.preferredWorkLocation === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>




          <Grid item direction={"column"} xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item direction={"column"} xs={12} md={4}>
                <FormControl fullWidth>
                  {/* <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                    <span style={{ color: '#616161' }}>Availability</span>
                  </FormLabel> */}
                  <FormLabel id="demo-row-radio-buttons-group-label">Availability</FormLabel>
                  <Select
                    name="availabilityDay"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-2"
                    error={values.availabilityDay === "" && error}
                    value={values.availabilityDay} 
                    onChange={handleChange("availabilityDay")}
                    sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Day</MenuItem>
                    <MenuItem value={"Monday"}>Monday</MenuItem>
                    <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                    <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                    <MenuItem value={"Thursday"}>Thursday</MenuItem>
                    <MenuItem value={"Friday"}>Friday</MenuItem>
                    <MenuItem value={"Saturday"}>Saturday</MenuItem>
                    <MenuItem value={"Sunday"}>Sunday</MenuItem>
                  </Select>
                  {/*   {getAvailability.availabilityDay === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )} */}
                </FormControl>
              </Grid>

              <Grid item direction={"column"} xs={12} md={4}>
                <FormControl fullWidth>
                  {/*             <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                    <span style={{ color: '#616161' }}>Availability</span>
                  </FormLabel> */}
                  <FormLabel id="demo-row-radio-buttons-group-label">From Time</FormLabel>
                  <Select
                    name="availabilityFromTime"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-2"
                    error={values.availabilityFromTime === "" && error}
                    value={values.availabilityFromTime}
                    onChange={handleChange("availabilityFromTime")}
                    sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>From Time</MenuItem>
                    {
                      fromTime.map((time) =>
                        <MenuItem value={fromTime.indexOf(time)}>{time}</MenuItem>
                      )

                    }
                
                  </Select>
                  {/*    {getAvailability.availabilityFromTime === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )} */}
                </FormControl>
              </Grid>

              <Grid item direction={"column"} xs={12} md={4}>
                <FormControl fullWidth>
                  {/*  <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                    <span style={{ color: '#616161' }}>Availability</span>
                  </FormLabel> */}
                  <FormLabel id="demo-row-radio-buttons-group-label">To Time</FormLabel>
                  <Select
                    name="availabilityToTime"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-2"
                    error={values.availabilityToTime === "" && error}
                    value={values.availabilityToTime} 
                    onChange={handleChange("availabilityToTime")}
                    sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>To Time</MenuItem>
                    {
                      timeTo.map((time) =>
                        <MenuItem value={toTime.indexOf(time)}>{time}</MenuItem>
                      )
                    }
                    
                  </Select>
                  {/*    {getAvailability.availabilityToTime === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )} */}
                </FormControl>
              </Grid>
              <Button variant="outlined" onClick={() => handleAddAvailability()} sx={{ marginLeft: '20px', marginTop: '10px' }}>Add Availibility</Button>

              <Grid item xs={12} md={12} sx={{ marginBottom: '25px' }}>
                {
                  getAvailability.map((ability) => <Grid sx={{ height: "40px" }} container spacing={1} key={ability.availID}>
                    <Grid item xs={10} md={11}>
                      {ability.day} {" "} {fromTime[ability.fromTime]} {"-"} {toTime[ability.toTime]}
                    </Grid>
                    <Grid item xs={2} md={1}>
                      <Button onClick={() => handleDelete(ability.availID)}>
                        <DeleteIcon textAlign={'end'} />
                      </Button>
                    </Grid>
                  </Grid>)
                }
              </Grid>
            </Grid>
          </Grid>


          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                <span style={{ color: '#616161' }}>Expected Salary</span>
              </FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-2"
                error={values.expectedSalary === "" && error}
                value={values.expectedSalary}
                onChange={handleChange("expectedSalary")}
                sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                displayEmpty
              >
                <MenuItem value="" disabled>Select</MenuItem>
                <MenuItem value={"Under 20k"}>Under 20k</MenuItem>
                <MenuItem value={"50k-60k"}> 50k-60k</MenuItem>
                <MenuItem value={"100k"}>100k</MenuItem>
              </Select>
              {values.expectedSalary === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}
            </FormControl>
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
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained" onClick={handleCareerProfile}>
                  Save
                </Button>
              </CardActions>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default AddCareerProfile;
