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
  FormControl,
  MenuItem,
  FormLabel,
  TextField,
  FormHelperText,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import { gqlquery, QUERY_DEPARTMENTS, QUERY_GETCANDIDATEAVAILABILITY, QUERY_GETCAREERPROFILE } from "../../../../api";
const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 180,
    // maxWidth: "90%"
  },
}));

const CareerProfileMob = () => {
  const [flag, setFlag] = useState(false);

  const onClick = (e) => {
    e.preventDefault();
    setFlag((prevData) => !prevData);
    setShowUpdateCareerScreen((prevData) => !prevData);
  };

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
  const [careerItem, setCareerItem] = useState({});
  const [masterDepartment, setMasterDepartment] = useState([]);
  const [showUpdateCareerScreen, setShowUpdateCareerScreen] = useState(false);
  const classes = useStyles();


  const fromTime = ["12 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM", "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM", "12 PM", "01 PM", "02 PM", "03 PM", "04 PM", "05 PM", "06 PM", "07 PM", "08 PM", "09 PM", "10 PM", "11 PM"];
  const toTime = ["12 AM", "01 AM", "02 AM", "03 AM", "04 AM", "05 AM", "06 AM", "07 AM", "08 AM", "09 AM", "10 AM", "11 AM", "12 PM", "01 PM", "02 PM", "03 PM", "04 PM", "05 PM", "06 PM", "07 PM", "08 PM", "09 PM", "10 PM", "11 PM"];


  let timeTo = toTime.filter(word => toTime.indexOf(word) > values.availabilityFromTime);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };


  useEffect(() => {
    gqlquery(QUERY_DEPARTMENTS, null)
      .then((res) => res.json())
      .then((datas) => setMasterDepartment(datas?.data?.getDepartments));
  }, [updateList]);



  useEffect(() => {
    gqlquery(QUERY_GETCAREERPROFILE, null)
      .then((res) => res.json())
      .then((datas) => setCareerItem(datas?.data?.getCareerProfile));
  }, [updateList]);

  useEffect(() => {
    gqlquery(QUERY_GETCANDIDATEAVAILABILITY, null)
      .then((res) => res.json())
      .then((datas) => setGetAvailability(datas?.data?.getCandidateAvailability));
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
      })
      .finally((e) => console.log("Adding Career Profile details to database"));
    setFlag((prevData) => !prevData);
    setShowUpdateCareerScreen((prevData) => !prevData);

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



  const handleUpdateCareerProfile = (e) => {
    if (values.currentIndustry === "") {
      values.currentIndustry = careerItem.industry
    }
    if (values.roleCategory === "") {
      values.roleCategory = careerItem.roleCategory
    }
    if (values.jobRole === "") {
      values.jobRole = careerItem.jobRole
    }
    if (values.department === "") {
      values.department = careerItem.departmentID
    }
    if (values.desiredJobType === "") {
      values.desiredJobType = careerItem.desiredJobType
    }
    if (values.desiredShift === "") {
      values.desiredShift = careerItem.desiredShift
    }
    if (values.desiredEmploymentType === "") {
      values.desiredEmploymentType = careerItem.desiredEmploymentType
    }
    if (values.preferredWorkLocation === "") {
      values.preferredWorkLocation = careerItem.preferredWorkLocation
    }
    if (values.expectedSalary === "") {
      values.expectedSalary = careerItem.expectedSalary
    }


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

    const QUERY_UPDATECAREERPROFILE = {
      query: `mutation MyMutation {
        updateCareerProfile(
          cpID: "${careerItem.cpID}",
          departmentID: ${Number(values.department)},
          desiredEmploymentType: "${values.desiredEmploymentType}",
          desiredJobType: "${values.desiredJobType}",
          desiredShift: "${values.desiredShift}",
          expectedSalary: "${values.expectedSalary}",
          industry: "${values.currentIndustry}",
          jobRole: "${values.jobRole}", 
          preferredWorkLocation: "${values.preferredWorkLocation}",
          roleCategory: "${values.roleCategory}"
        )
         {
              cpID
              departmentID
              desiredEmploymentType
              desiredJobType
              desiredShift
              expectedSalary
              industry
              jobRole
              preferredWorkLocation
              roleCategory
              }
            }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_UPDATECAREERPROFILE, null)
      .then((res) => res.json())
      .then((datas) => setUpdateList(!updateList))
      .finally((e) => console.log("Updated Career Profile details to database"));

    setShowUpdateCareerScreen((prevData) => !prevData);

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

  const CareerScreen = (item) => {
    // e.preventDefault();
    setShowUpdateCareerScreen((prevData) => !prevData);
    setCareerItem(careerItem);
  };

  const handleCancelUpdate = (e) => {
    setShowUpdateCareerScreen((prevData) => !prevData);
  };

  return (
    <Grid item sx={{ marginBlock: "1rem" }} spacing={2}>
      {!flag ? (
        <>
          {!showUpdateCareerScreen ?
            (
              <Grid personalDetailsData sx={{ marginBlock: "1rem", px: 2 }}>
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: "",
                  }}
                >
                  <Grid container direction={"row"} alignItems="flex-start">
                    <Grid
                      personalDetailsData
                      direction={"column"}
                      xs={12}
                      sx={{ padding: "0px 0px 0 0" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          px: 2,
                          mt: 2,
                        }}
                      >
                        <Typography
                          component="h3"
                          variant="h5"
                          sx={{
                            fontSize: 20,
                            fontWeight: 600,
                          }}
                        >
                          Career Profile
                        </Typography>
                        <Box sx={{ fontSize: "16" }}>
                          {careerItem ?
                            (
                              <EditIcon
                                onClick={() => CareerScreen(careerItem)}
                                sx={{ color: "gray", fontSize: 17 }}
                              />
                            ) : (
                              <EditIcon
                                onClick={onClick}
                                sx={{ color: "gray", fontSize: 17 }}
                              />
                            )
                          }
                        </Box>
                      </Box>

                      <CardContent>
                        <Box
                          sx={{
                            px: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{ display: "flex", gap: 1, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "220px", fontSize: "12px" }}
                            >
                              Current Industry
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {careerItem?.industry}
                            </Typography>
                          </Box>

                          <Box
                            sx={{ display: "flex", gap: 1, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "220px", fontSize: "12px" }}
                            >
                              Department
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {careerItem?.departmentName}
                            </Typography>
                          </Box>

                          <Box
                            sx={{ display: "flex", gap: 1, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "220px", fontSize: "12px" }}
                            >
                              Role Category
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {careerItem?.roleCategory}
                            </Typography>
                          </Box>

                          <Box
                            sx={{ display: "flex", gap: 1, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "220px", fontSize: "12px" }}
                            >
                              Job Role
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {careerItem?.jobRole}
                            </Typography>
                          </Box>

                          <Box
                            sx={{ display: "flex", gap: 1, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "220px", fontSize: "12px" }}
                            >
                              Desired Job Type
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {careerItem?.desiredJobType}
                            </Typography>
                          </Box>

                          <Box
                            sx={{ display: "flex", gap: 1, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "220px", fontSize: "12px" }}
                            >
                              Desired Shift
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {careerItem?.desiredShift}
                            </Typography>
                          </Box>

                          <Box
                            sx={{ display: "flex", gap: 1, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "220px", fontSize: "12px" }}
                            >
                              Desired Employment Type
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {careerItem?.desiredEmploymentType}
                            </Typography>
                          </Box>

                          <Box
                            sx={{ display: "flex", gap: 1, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "220px", fontSize: "12px" }}
                            >
                              Preferred Work Location
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {careerItem?.preferredWorkLocation}
                            </Typography>
                          </Box>

                          <Box
                            sx={{ display: "flex", gap: 1, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "220px", fontSize: "12px" }}
                            >
                              Expected Salary
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {careerItem?.expectedSalary}
                            </Typography>
                          </Box>

                          <Box
                            sx={{ display: "flex", gap: 1, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "220px", fontSize: "12px" }}
                            >
                              Available Timing
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {
                                getAvailability.map((ability) => <Grid sx={{ height: "40px" }} container spacing={1} key={ability.availID}>
                                  <Grid item xs={10} md={11}>
                                    {ability?.day} {" "} {fromTime[ability?.fromTime]} {"-"} {toTime[ability?.toTime]}
                                  </Grid>
                                </Grid>)
                              }
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ) : (
              <Grid item sx={{ marginBlock: "1rem", px: 2 }} spacing={2}>
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: "",
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
                    Update Career Profile
                  </Typography>
                  <Grid
                    container
                    direction={"row"}
                    alignItems="flex-start"
                    padding={2}
                    spacing={1}
                    sx={{ lineHeight: 5 }}
                  >
                    <Grid item direction={"column"} xs={12} md={6}>
                      <FormControl fullWidth >
                        <FormLabel required sx={{ color: 'red' }} id="demo-row-radio-buttons-group-label">
                          <span style={{ color: '#616161' }}>Current Industry</span>
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          defaultValue={careerItem.industry}
                          sx={{ backgroundColor: "#ffffff", width: "100%" }}
                          // value={values.currentIndustry}
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
                          defaultValue={careerItem.departmentID}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select-2"
                          error={values.department === "" && error}
                          // value={values.department}
                          onChange={handleChange("department")}
                          sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                          displayEmpty
                          MenuProps={{ classes: { paper: classes.menuPaper } }}
                        >
                          <MenuItem value="" disabled>Text</MenuItem>
                          {
                            masterDepartment.map((department) =>
                              <MenuItem value={department.departmentID}>{department.name}</MenuItem>
                            )
                          }

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
                          defaultValue={careerItem.roleCategory}
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
                          defaultValue={careerItem.jobRole}
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
                          defaultValue={careerItem.desiredJobType}
                          error={values.desiredJobType === "" && error}
                          // value={values.desiredJobType}
                          onChange={handleChange("desiredJobType")}
                          sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                          displayEmpty
                          MenuProps={{ classes: { paper: classes.menuPaper } }}
                        >
                          <MenuItem value="" disabled>Select</MenuItem>
                          <MenuItem value={"Permenant"}>Permenant</MenuItem>
                          <MenuItem value={"Contract"}>Contract</MenuItem>
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
                          defaultValue={careerItem.desiredShift}
                          error={values.desiredShift === "" && error}
                          // value={values.desiredShift}
                          onChange={handleChange("desiredShift")}
                          sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                          displayEmpty
                          MenuProps={{ classes: { paper: classes.menuPaper } }}
                        >
                          <MenuItem value="" disabled>Select</MenuItem>
                          <MenuItem value={"Day"}>Day</MenuItem>
                          <MenuItem value={"Night"}>Night</MenuItem>
                          <MenuItem value={"Both"}>Both</MenuItem>
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
                          defaultValue={careerItem.desiredEmploymentType}
                          error={values.desiredEmploymentType === "" && error}
                          // value={values.desiredEmploymentType}
                          onChange={handleChange("desiredEmploymentType")}
                          sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                          displayEmpty
                          MenuProps={{ classes: { paper: classes.menuPaper } }}
                        >
                          <MenuItem value="" disabled>Select</MenuItem>
                          <MenuItem value={"Full Time"}>Full Time</MenuItem>
                          <MenuItem value={"Part Time"}>Part Time</MenuItem>
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
                          defaultValue={careerItem.preferredWorkLocation}
                          id="demo-simple-select-2"
                          error={values.preferredWorkLocation === "" && error}
                          // value={values.preferredWorkLocation}
                          onChange={handleChange("preferredWorkLocation")}
                          sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                          displayEmpty
                          MenuProps={{ classes: { paper: classes.menuPaper } }}
                        >
                          <MenuItem value="" disabled>Select</MenuItem>
                          <MenuItem value={"Andhra Pradesh"}>Andhra Pradesh</MenuItem>
                          <MenuItem value={"Arunachal Pradesh"}>Arunachal Pradesh</MenuItem>
                          <MenuItem value={"Assam"}>Assam</MenuItem>
                          <MenuItem value={"Andaman and Nicobar Islands"}>Andaman and Nicobar Islands</MenuItem>
                          <MenuItem value={"Bihar"}>Bihar</MenuItem>
                          <MenuItem value={"Chattisgarh"}>Chattisgarh</MenuItem>
                          <MenuItem value={"Chandigarh"}>Chandigarh</MenuItem>
                          <MenuItem value={"Dadra and Nagar Haveli and Daman & Diu"}>Dadra and Nagar Haveli and Daman & Diu</MenuItem>
                          <MenuItem value={"Goa"}>Goa</MenuItem>
                          <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
                          <MenuItem value={"Haryana"}>Haryana</MenuItem>
                          <MenuItem value={"Himachal Pradesh"}>Himachal Pradesh</MenuItem>
                          <MenuItem value={"Jharkhand"}>Jharkhand</MenuItem>
                          <MenuItem value={"Jammu & Kashmir"}>Jammu & Kashmir</MenuItem>
                          <MenuItem value={"Karnataka"}>Karnataka</MenuItem>
                          <MenuItem value={"Kerala"}>Kerala</MenuItem>
                          <MenuItem value={"Ladakh"}>Ladakh</MenuItem>
                          <MenuItem value={"Lakshadweep"}>Lakshadweep</MenuItem>
                          <MenuItem value={"Madhya Pradesh"}>Madhya Pradesh</MenuItem>
                          <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
                          <MenuItem value={"Manipur"}>Manipur</MenuItem>
                          <MenuItem value={"Meghalaya"}>Meghalaya</MenuItem>
                          <MenuItem value={"Mizoram"}>Mizoram</MenuItem>
                          <MenuItem value={"Nagaland"}>Nagaland</MenuItem>
                          <MenuItem value={"Odisha"}>Odisha</MenuItem>
                          <MenuItem value={"Punjab"}>Punjab</MenuItem>
                          <MenuItem value={"Puducherry"}>Puducherry</MenuItem>
                          <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
                          <MenuItem value={"Sikkim"}>Sikkim</MenuItem>
                          <MenuItem value={"Tamil Nadu"}>Tamil Nadu</MenuItem>
                          <MenuItem value={"Telangana"}>Telangana</MenuItem>
                          <MenuItem value={"Tripura"}>Tripura</MenuItem>
                          <MenuItem value={"The Government of NCT of Delhi"}>The Government of NCT of Delhi</MenuItem>
                          <MenuItem value={"Uttarakhand"}>Uttarakhand</MenuItem>
                          <MenuItem value={"Uttar Pradesh"}>Uttar Pradesh</MenuItem>
                          <MenuItem value={"West Bengal"}>West Bengal</MenuItem>
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
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
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
                          </FormControl>
                        </Grid>

                        <Grid item direction={"column"} xs={12} md={4}>
                          <FormControl fullWidth>
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
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                              <MenuItem value="" disabled>From Time</MenuItem>
                              {
                                fromTime.map((time) =>
                                  <MenuItem value={fromTime.indexOf(time)}>{time}</MenuItem>
                                )
                              }
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item direction={"column"} xs={12} md={4}>
                          <FormControl fullWidth>
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
                              MenuProps={{ classes: { paper: classes.menuPaper } }}
                            >
                              <MenuItem value="" disabled>To Time</MenuItem>
                              {
                                timeTo.map((time) =>
                                  <MenuItem value={toTime.indexOf(time)}>{time}</MenuItem>
                                )
                              }
                            </Select>
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
                          defaultValue={careerItem.expectedSalary}
                          error={values.expectedSalary === "" && error}
                          // value={values.expectedSalary}
                          onChange={handleChange("expectedSalary")}
                          sx={{ backgroundColor: "#ffffff", width: "100%", color: '#616161' }}
                          displayEmpty
                          MenuProps={{ classes: { paper: classes.menuPaper } }}
                        >
                          <MenuItem value="" disabled>Select</MenuItem>
                          <MenuItem value={"0 to 5 Lakhs"}>0 to 5 Lakhs</MenuItem>
                          <MenuItem value={"5 Lakhs to 10 Lakhs"}>5 Lakhs to 10 Lakhs</MenuItem>
                          <MenuItem value={"10 Lakhs to 20 Lakhs"}>10 Lakhs to 20 Lakhs</MenuItem>
                          <MenuItem value={"20 Lakhs to 50 Lakhs"}>20 Lakhs to 50 Lakhs</MenuItem>
                          <MenuItem value={"50 Lakhs above"}>50 Lakhs above</MenuItem>
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
                          <Button variant="outlined" onClick={handleCancelUpdate}>Cancel</Button>

                          <Button variant="contained" onClick={handleUpdateCareerProfile}>
                            Save
                          </Button>

                        </CardActions>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            )
          }
        </>
      ) : (
        <Grid item sx={{ marginBlock: "1rem", px: 2 }} spacing={2}>
          <Card
            sx={{
              height: "100%",
              backgroundColor: "",
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
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>Text</MenuItem>
                    {
                      masterDepartment.map((department) =>
                        <MenuItem value={department.departmentID}>{department.name}</MenuItem>
                      )
                    }

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
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>Select</MenuItem>
                    <MenuItem value={"Permenant"}>Permenant</MenuItem>
                    <MenuItem value={"Contract"}>Contract</MenuItem>
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
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>Select</MenuItem>
                    <MenuItem value={"Day"}>Day</MenuItem>
                    <MenuItem value={"Night"}>Night</MenuItem>
                    <MenuItem value={"Both"}>Both</MenuItem>
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
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>Select</MenuItem>
                    <MenuItem value={"Full Time"}>Full Time</MenuItem>
                    <MenuItem value={"Part Time"}>Part Time</MenuItem>
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
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>Select</MenuItem>
                    <MenuItem value={"Andhra Pradesh"}>Andhra Pradesh</MenuItem>
                    <MenuItem value={"Arunachal Pradesh"}>Arunachal Pradesh</MenuItem>
                    <MenuItem value={"Assam"}>Assam</MenuItem>
                    <MenuItem value={"Andaman and Nicobar Islands"}>Andaman and Nicobar Islands</MenuItem>
                    <MenuItem value={"Bihar"}>Bihar</MenuItem>
                    <MenuItem value={"Chattisgarh"}>Chattisgarh</MenuItem>
                    <MenuItem value={"Chandigarh"}>Chandigarh</MenuItem>
                    <MenuItem value={"Dadra and Nagar Haveli and Daman & Diu"}>Dadra and Nagar Haveli and Daman & Diu</MenuItem>
                    <MenuItem value={"Goa"}>Goa</MenuItem>
                    <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
                    <MenuItem value={"Haryana"}>Haryana</MenuItem>
                    <MenuItem value={"Himachal Pradesh"}>Himachal Pradesh</MenuItem>
                    <MenuItem value={"Jharkhand"}>Jharkhand</MenuItem>
                    <MenuItem value={"Jammu & Kashmir"}>Jammu & Kashmir</MenuItem>
                    <MenuItem value={"Karnataka"}>Karnataka</MenuItem>
                    <MenuItem value={"Kerala"}>Kerala</MenuItem>
                    <MenuItem value={"Ladakh"}>Ladakh</MenuItem>
                    <MenuItem value={"Lakshadweep"}>Lakshadweep</MenuItem>
                    <MenuItem value={"Madhya Pradesh"}>Madhya Pradesh</MenuItem>
                    <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
                    <MenuItem value={"Manipur"}>Manipur</MenuItem>
                    <MenuItem value={"Meghalaya"}>Meghalaya</MenuItem>
                    <MenuItem value={"Mizoram"}>Mizoram</MenuItem>
                    <MenuItem value={"Nagaland"}>Nagaland</MenuItem>
                    <MenuItem value={"Odisha"}>Odisha</MenuItem>
                    <MenuItem value={"Punjab"}>Punjab</MenuItem>
                    <MenuItem value={"Puducherry"}>Puducherry</MenuItem>
                    <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
                    <MenuItem value={"Sikkim"}>Sikkim</MenuItem>
                    <MenuItem value={"Tamil Nadu"}>Tamil Nadu</MenuItem>
                    <MenuItem value={"Telangana"}>Telangana</MenuItem>
                    <MenuItem value={"Tripura"}>Tripura</MenuItem>
                    <MenuItem value={"The Government of NCT of Delhi"}>The Government of NCT of Delhi</MenuItem>
                    <MenuItem value={"Uttarakhand"}>Uttarakhand</MenuItem>
                    <MenuItem value={"Uttar Pradesh"}>Uttar Pradesh</MenuItem>
                    <MenuItem value={"West Bengal"}>West Bengal</MenuItem>
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
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
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
                    </FormControl>
                  </Grid>

                  <Grid item direction={"column"} xs={12} md={4}>
                    <FormControl fullWidth>
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
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>From Time</MenuItem>
                        {
                          fromTime.map((time) =>
                            <MenuItem value={fromTime.indexOf(time)}>{time}</MenuItem>
                          )

                        }

                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item direction={"column"} xs={12} md={4}>
                    <FormControl fullWidth>
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
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>To Time</MenuItem>
                        {
                          timeTo.map((time) =>
                            <MenuItem value={toTime.indexOf(time)}>{time}</MenuItem>
                          )
                        }

                      </Select>
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
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>Select</MenuItem>
                    <MenuItem value={"0 to 5 Lakhs"}>0 to 5 Lakhs</MenuItem>
                    <MenuItem value={"5 Lakhs to 10 Lakhs"}>5 Lakhs to 10 Lakhs</MenuItem>
                    <MenuItem value={"10 Lakhs to 20 Lakhs"}>10 Lakhs to 20 Lakhs</MenuItem>
                    <MenuItem value={"20 Lakhs to 50 Lakhs"}>20 Lakhs to 50 Lakhs</MenuItem>
                    <MenuItem value={"50 Lakhs above"}>50 Lakhs above</MenuItem>
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
                    <Button variant="outlined" onClick={onClick}>Cancel</Button>

                    <Button variant="contained" onClick={handleCareerProfile}>
                      Save
                    </Button>
                  </CardActions>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default CareerProfileMob;


const textStyle = { fontSize: 12, color: "#828282" };
const textInfoStyle = { fontSize: 12, color: "#4F4F4F", fontWeight: 600 };
