import {
  Box,
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
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import AddExperienceMob from "./AddExperience/AddExperienceMob.view";
import ExperienceDetailsMob from "./ExperienceDetailsMob";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  gqlquery,
  QUERY_HOSPITALMASTER,
  QUERY_DESIGNMASTER,
  QUERY_GETEXPERIENCELIST,
  QUERY_NOTICEMASTER,
} from "../../../../api";
import EditIcon from "@mui/icons-material/Edit";

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
}));

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

const ExperienceMob = (props) => {
  const [flag, setFlag] = useState(false);
  const [values, setValues] = useState({
    designation: "",
    hospital: "",
    currentlyWorking: "",
    noticePeriod: "",
    employmentType: "",
    jobType: "",
    startingYear: "",
    startingMonth: "",
    workingYear: "",
    workingMonth: "",
    jobDescription: "",
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
  const classes = useStyles();

  useEffect(() => {
    gqlquery(QUERY_GETEXPERIENCELIST, null)
      .then((res) => res.json())
      .then((datas) => setGetExperiencedList(datas.data.getExperienceList));
  }, [updateList]);

  useEffect(() => {
    gqlquery(QUERY_DESIGNMASTER, null)
      .then((res) => res.json())
      .then((datas) => setAllDesignation(datas.data?.getDesignationMaster));

    gqlquery(QUERY_HOSPITALMASTER, null)
      .then((res) => res.json())
      .then((datas) => setAllHospitals(datas.data?.getHospitalMaster));

    gqlquery(QUERY_NOTICEMASTER, null)
      .then((res) => res.json())
      .then((datas) => setNoticePeriods(datas.data?.getNoticePeriodMasters));

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

  const handleAddExperience = (e, arg) => {
    if (values.jobDescription === "") {
      setErrInput("Please, give a job description.");
    } else {
      setErrInput("");
    }

    if (
      values.designation === "" ||
      values.hospital === "" ||
      values.currentlyWorking === "" ||
      values.jobType === "" ||
      values.employmentType === "" ||
      values.noticePeriod === ""
    ) {
      return setError("Please, select an option.");
    }
    if (
      values.startingYear === "" ||
      values.startingMonth === "" ||
      values.workingYear === "" ||
      values.workingMonth === ""
    ) {
      return setErrDate("Please, select a date");
    }
    console.log(values);
    const QUERY_POSTEXPERIENCE = {
      query: `mutation MyMutation {
                addExperience (
                  description: "${values.jobDescription}",
                  designationID: ${Number(values.designation)},
                  hospitalID: ${Number(values.hospital)},
                  jobType: "${values.jobType}",
                  startingMonth: ${Number(values.startingMonth)},
                  startingYear: ${Number(values.startingYear)},
                  workingMonth: ${Number(values.workingMonth)},
                  workingYear: ${Number(values.workingYear)},
                  currentlyWorking: ${Boolean(Number(values.currentlyWorking))},
                  noticePeriodID: ${Number(values.noticePeriod)},
                  employmentType: "${values.employmentType}"
                  ) {
                    description
                    currentlyWorking
                    noticePeriodID
                    employmentType
                    designationID
                    expID
                    hospitalID
                    jobType
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
        setUpdateList(!updateList);
        console.log(datas);
      })
      .finally((e) => console.log("adding experience details to database"));

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

    setErrInput("");
    setError("");
    setErrDate("");
    setFlag((prevData) => !prevData);
    setShowUpdateExperience((prevData) => !prevData);
  };

  const handleUpdateExpereience = (e) => {
    if (values.jobDescription === "") {
      setErrInput("Please, give a job description.");
    } else {
      setErrInput("");
    }

    if (
      values.designation === "" ||
      values.hospital === "" ||
      values.currentlyWorking === "" ||
      values.jobType === "" ||
      values.employmentType === "" ||
      values.noticePeriod === ""
    ) {
      return setError("Please, select an option.");
    }
    if (
      values.startingYear === "" ||
      values.startingMonth === "" ||
      values.workingYear === "" ||
      values.workingMonth === ""
    ) {
      return setErrDate("Please, select a date");
    }

    const QUERY_UPDATEEXPERIENCE = {
      query: `mutation MyMutation {
                updateExperience (
                  description: "${values.jobDescription}",
                  designationID: ${Number(values.designation)},
                  expID: ${Number(item.expID)},
                  hospitalID: ${Number(values.hospital)},
                  jobType: "${values.jobType}",
                  startingMonth: ${Number(values.startingMonth)},
                  startingYear: ${Number(values.startingYear)},
                  workingMonth: ${Number(values.workingMonth)},
                  workingYear: ${Number(values.workingYear)},
                  currentlyWorking: ${Boolean(Number(values.currentlyWorking))},
                  noticePeriodID: ${Number(values.noticePeriod)},
                  employmentType: "${values.employmentType}"
                  ) {
                    currentlyWorking
                    noticePeriodID
                    employmentType
                    description
                    designationID
                    expID
                    hospitalID
                    jobType
                    startingMonth
                    workingMonth
                    startingYear
                    workingYear
                  }
                }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_UPDATEEXPERIENCE, null)
      .then((res) => res.json())
      .then((datas) => setUpdateList(!updateList))
      .finally((e) => console.log("updated experience details to database"));

    setShowUpdateExperience((prevData) => !prevData);

    setErrInput("");
    setError("");
    setErrDate("");

    setValues({
      designation: "",
      hospital: "",
      currentlyWorking: "",
      startingYear: "",
      startingMonth: "",
      jobType: "",
      employmentType: "",
      noticePeriod: "",
      workingYear: "",
      workingMonth: "",
      jobDescription: "",
    });

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
              expID
              hospitalID
              jobType
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
        .then((datas) => setUpdateList(!updateList))
        .finally((e) => console.log("Deleting experience details in database"));

      setShowUpdateExperience((prevData) => !prevData);
    } else {
      console.log("You don't want to delete this!");
    }
    setShowUpdateExperience((prevData) => !prevData);
  };

  const handleShowUpdateExperience = (item) => {
    // e.preventDefault();
    setShowUpdateExperience((prevData) => !prevData);
    setItem(item);
  };

  const onClick = (e) => {
    e.preventDefault();
    setShowUpdateExperience((prevData) => !prevData);
    setFlag((prevData) => !prevData);
  };

  const handleCancelUpdate = (e) => {
    setShowUpdateExperience((prevData) => !prevData);
  };

  return (
    <Grid item sx={{ marginBlock: "1rem", px: 2 }} spacing={2}>
      {!flag ? (
        <Grid item sx={{ marginBlock: "1rem" }} spacing={2}>
          {!showUpdateExperience ? (
            <Card
              sx={{
                height: "100%",
                backgroundColor: "",
              }}
            >
              <Grid
                container
                direction={"row"}
                alignItems="flex-start"
                padding={2}
              >
                <Grid
                  item
                  direction={"column"}
                  xs={12}
                  md={12}
                  sx={{ padding: "" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      component="h3"
                      variant="h5"
                      sx={{ fontSize: 24, fontWeight: 700, marginBottom: 0 }}
                    >
                      Experience
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        borderColor: "#000000",
                      }}
                      onClick={onClick}
                    >
                      Add Experience
                    </Button>
                  </Box>

                  {getExperiencedList.map((item, index) => (
                    <div>
                      <CardContent
                        key={`education-${index}`}
                        sx={{ display: "flex", ml: -2 }}
                      >
                        <Box
                          sx={{
                            display: "grid",
                            lineHeight: "30px",
                            fontSize: "20px",
                          }}
                        >
                          <Typography variant="p">
                            {item.designation}
                          </Typography>
                          <Typography variant="info" sx={boldText}>
                            {item.hospital}
                          </Typography>
                          <Typography variant="info" sx={textStyle}>
                            {Intl.DateTimeFormat("en", {
                              month: "long",
                            }).format(new Date(`${item.startingMonth}`))}
                            &nbsp;
                            {item.startingYear} to &nbsp;
                            {item.currentlyWorking ? (
                              "Current"
                            ) : (
                              <span>
                                {Intl.DateTimeFormat("en", {
                                  month: "long",
                                }).format(new Date(`${item.workingMonth}`))}
                                &nbsp;
                                {item.workingYear}
                              </span>
                            )}
                          </Typography>
                          <Typography variant="info" sx={boldText}>
                            Job Type: &nbsp;
                            {item.jobType}
                          </Typography>
                          <Typography variant="info" sx={boldText}>
                            Employment Type: &nbsp;
                            {item.employmentType}
                          </Typography>
                          <Typography variant="info" sx={boldText}>
                            Notice Period: &nbsp;
                            {item.notice}
                          </Typography>
                        </Box>
                        <Box sx={{ margin: "0 0 0 0" }}>
                          <Button>
                            <EditIcon
                              sx={{ fontSize: "medium" }}
                              onClick={() => handleShowUpdateExperience(item)}
                            />
                          </Button>
                        </Box>
                      </CardContent>
                      <Box sx={{ margin: "0 0 0 40px" }}>
                        <Typography
                          variant="info"
                          sx={{ ...textStyle, lineHeight: "20px" }}
                        >
                          <ol type="1">
                            {/* <li>{item.info1}</li> */}
                            {/* <li>{item.info2}</li> */}
                          </ol>
                        </Typography>
                      </Box>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Card>
          ) : (
            //update form
            <Card
              sx={{
                height: "100%",
                backgroundColor: "",
                pr: 3,
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
                Update Experience
              </Typography>
              <Grid
                container
                direction={"row"}
                alignItems="flex-start"
                justifyContent={"space-between"}
                padding={2}
                spacing={0}
                sx={{ lineHeight: 5 }}
              >
                {/* designation */}
                <Grid item direction={"column"} xs={12} md={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {item.designation}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-1"
                      label="Designation"
                      defaultValue={item.designation}
                      error={values.designation === "" && error}
                      value={values.designation}
                      onChange={handleChange("designation")}
                      sx={{ backgroundColor: "#ffffff" }}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      {allDesignation.map((singleDesignation) => (
                        <MenuItem value={singleDesignation.dmID}>
                          {singleDesignation.name}
                        </MenuItem>
                      ))}
                    </Select>

                    {values.designation === "" && (
                      <FormHelperText sx={{ color: "red", mt: 0 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {/* institute  */}
                <Grid item direction={"column"} xs={12} md={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {item.hospital}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-1"
                      label="Hospital"
                      defaultValue={item.hospital}
                      error={values.hospital === "" && error}
                      value={values.hospital}
                      onChange={handleChange("hospital")}
                      sx={{ backgroundColor: "#ffffff" }}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      {allHospitals.map((hospital) => (
                        <MenuItem value={hospital.hmID}>
                          {hospital.name}
                        </MenuItem>
                      ))}
                    </Select>

                    {values.hospital === "" && (
                      <FormHelperText sx={{ color: "red", mt: 0 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {/* currentlyWorking  */}
                <Grid item direction={"column"} xs={12} md={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Currently working or not?
                    </FormLabel>
                    <RadioGroup
                      row
                      error={values.currentlyWorking === "" && error}
                      // value={values.jobType}
                      defaultValue={
                        item.currentlyWorking ? parseInt(1) : parseInt(0)
                      }
                      onChange={handleChange("currentlyWorking")}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value={parseInt(1)}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={parseInt(0)}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    {values.currentlyWorking === "" && (
                      <FormHelperText sx={{ color: "red", mt: -0.5 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {/* startingYear  */}
                <Grid item direction={"column"} xs={12} md={3}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {item.startingYear}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-5"
                      label="Starting Year"
                      defaultValue={values.startingYear}
                      error={values.startingYear === "" && errDate}
                      value={values.startingYear}
                      onChange={handleChange("startingYear")}
                      sx={{ backgroundColor: "#ffffff", width: "100%" }}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      {startingYears.map((year) => (
                        <MenuItem value={year}>{year}</MenuItem>
                      ))}
                    </Select>
                    {values.startingYear === "" && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {errDate}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {/* startingMonth */}
                <Grid item direction={"column"} xs={12} md={3}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {Intl.DateTimeFormat("en", { month: "long" }).format(
                        new Date(`${item.startingMonth}`)
                      )}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-5"
                      label="Starting Month"
                      defaultValue={values.startingMonth}
                      error={values.startingMonth === "" && errDate}
                      value={values.startingMonth}
                      onChange={handleChange("startingMonth")}
                      sx={{ backgroundColor: "#ffffff", width: "100%" }}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      {startingMonths.map((month) => (
                        <MenuItem key={month.value} value={month.value}>
                          {month.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {values.startingMonth === "" && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {errDate}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {/* notice Period  */}
                <Grid item direction={"column"} xs={12} md={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {item.notice}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-1"
                      label="Designation"
                      error={values.noticePeriod === "" && error}
                      value={values.noticePeriod}
                      defaultValue={item.notice}
                      onChange={handleChange("noticePeriod")}
                      sx={{ backgroundColor: "#ffffff" }}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      {noticePeriods.map((notice) => (
                        <MenuItem value={notice.npID}>{notice.notice}</MenuItem>
                      ))}
                    </Select>

                    {values.noticePeriod === "" && (
                      <FormHelperText sx={{ color: "red", mt: 0 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                {/* working year and working month  */}
                <Grid item direction={"column"} xs={12} md={6}>
                  <Grid container direction={"row"} spacing={2}>
                    {/* working year  */}
                    <Grid item direction={"column"} xs={12} md={6}>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          {item.workingYear}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select-5"
                          label="Starting Year"
                          error={values.workingYear === "" && error}
                          value={values.workingYear}
                          onChange={handleChange("workingYear")}
                          sx={{ backgroundColor: "#ffffff", width: "100%" }}
                          MenuProps={{ classes: { paper: classes.menuPaper } }}
                        >
                          {startingYears.map((year) => (
                            <MenuItem value={year}>{year}</MenuItem>
                          ))}
                        </Select>
                        {values.workingYear === "" && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {error}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    {/* working month  */}
                    <Grid item direction={"column"} xs={12} md={6}>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          {Intl.DateTimeFormat("en", { month: "long" }).format(
                            new Date(`${item.workingMonth}`)
                          )}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select-5"
                          label="Working Month"
                          error={values.workingMonth === "" && error}
                          value={values.workingMonth}
                          onChange={handleChange("workingMonth")}
                          sx={{ backgroundColor: "#ffffff", width: "100%" }}
                          MenuProps={{ classes: { paper: classes.menuPaper } }}
                        >
                          {startingMonths.map((month) => (
                            <MenuItem key={month.value} value={month.value}>
                              {month.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {values.workingMonth === "" && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {error}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item direction={"column"} xs={12} md={6}>
                  <Grid container direction={"row"} spacing={1}>
                    {/* employment type  */}
                    <Grid item direction={"column"} xs={12} md={12}>
                      <FormControl className={classes.formControl} fullWidth>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Employment Type
                        </FormLabel>
                        <RadioGroup
                          row
                          error={values.employmentType === "" && error}
                          // value={values.employmentType}
                          defaultValue={item.employmentType}
                          onChange={handleChange("employmentType")}
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="Full Time"
                            control={<Radio />}
                            label="Full Time"
                          />
                          <FormControlLabel
                            value="Part Time"
                            control={<Radio />}
                            label="Part Time"
                          />
                        </RadioGroup>
                        {values.employmentType === "" && (
                          <FormHelperText
                            sx={{ color: "red", mt: -0.5, mb: 1 }}
                          >
                            {error}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    {/* job type  */}
                    <Grid item direction={"column"} xs={12} md={12}>
                      <FormControl className={classes.formControl} fullWidth>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          Job Type
                        </FormLabel>
                        <RadioGroup
                          row
                          error={values.jobType === "" && error}
                          // value={values.jobType}
                          defaultValue={item.jobType}
                          onChange={handleChange("jobType")}
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="Permanent"
                            control={<Radio />}
                            label="Permanent"
                          />
                          <FormControlLabel
                            value="Contractual"
                            control={<Radio />}
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
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                {/* TextField  */}
                <Grid item direction={"column"} xs={12} md={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      variant="outlined"
                      multiline
                      rows={7}
                      fullWidth
                      placeholder="Job description"
                      error={values.jobDescription === "" && errInput}
                      value={values.jobDescription}
                      onChange={handleChange("jobDescription")}
                      sx={{ backgroundColor: "#ffffff" }}
                    />
                    {values.jobDescription === "" && (
                      <FormHelperText sx={{ color: "red", mt: 0 }}>
                        {errInput}
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
                    <CardActions className="resume-actions">
                      <Button
                        variant="contained"
                        onClick={handleCancelUpdate}
                        className="cancel-btn"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        className="save-btn"
                        onClick={handleDeleteExperience}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        className="save-btn"
                        onClick={handleUpdateExpereience}
                      >
                        Update
                      </Button>
                    </CardActions>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          )}
        </Grid>
      ) : (
        // Add Experience Form
        <Grid item ssx={{ marginBlock: "1rem" }} spacing={2}>
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
              Add Experience
            </Typography>
            <Grid
              container
              direction={"row"}
              alignItems="flex-start"
              justifyContent={"space-between"}
              padding={2}
              spacing={0}
              sx={{ lineHeight: 5,ml: -1 }}
            >
              {/* designation  */}
              <Grid item direction={"column"} xs={12} md={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Designation
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-1"
                    label="Designation"
                    error={values.designation === "" && error}
                    value={values.designation}
                    onChange={handleChange("designation")}
                    sx={{ backgroundColor: "#ffffff" }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    {allDesignation.map((singleDesignation) => (
                      <MenuItem value={singleDesignation.dmID}>
                        {singleDesignation.name}
                      </MenuItem>
                    ))}
                  </Select>

                  {values.designation === "" && (
                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* hospital */}
              <Grid item direction={"column"} xs={12} md={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Hospital
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-1"
                    label="Hospital"
                    error={values.hospital === "" && error}
                    value={values.hospital}
                    onChange={handleChange("hospital")}
                    sx={{ backgroundColor: "#ffffff" }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    {allHospitals.map((hospital) => (
                      <MenuItem value={hospital.hmID}>{hospital.name}</MenuItem>
                    ))}
                  </Select>

                  {values.hospital === "" && (
                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* currentlyWorking  */}
              <Grid item direction={"column"} xs={12} md={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Currently working?
                  </FormLabel>
                  <RadioGroup
                    row
                    error={error}
                    value={values.currentlyWorking}
                    onChange={handleChange("currentlyWorking")}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                  {values.currentlyWorking === "" && (
                    <FormHelperText sx={{ color: "red", mt: -0.5 }}>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* startingYear and startingMonth  */}
              <Grid item direction={"column"} xs={12} md={3}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Starting Year
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-5"
                    label="Starting Year"
                    error={values.startingYear === "" && error}
                    value={values.startingYear}
                    onChange={handleChange("startingYear")}
                    sx={{ backgroundColor: "#ffffff", width: "100%" }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    {startingYears.map((year) => (
                      <MenuItem value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                  {values.startingYear === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item direction={"column"} xs={12} md={3}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Starting Month
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-5"
                    label="Starting Month"
                    error={values.startingMonth === "" && error}
                    value={values.startingMonth}
                    onChange={handleChange("startingMonth")}
                    sx={{ backgroundColor: "#ffffff", width: "100%" }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    {startingMonths.map((month) => (
                      <MenuItem key={month.value} value={month.value}>
                        {month.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {values.startingMonth === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* notice Period  */}
              <Grid item direction={"column"} xs={12} md={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Notice Period
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-1"
                    label="Designation"
                    error={values.noticePeriod === "" && error}
                    value={values.noticePeriod}
                    onChange={handleChange("noticePeriod")}
                    sx={{ backgroundColor: "#ffffff" }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    {noticePeriods.map((notice) => (
                      <MenuItem value={notice.npID}>{notice.notice}</MenuItem>
                    ))}
                  </Select>

                  {values.designation === "" && (
                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* working year and working month  */}
              <Grid item direction={"column"} xs={12} md={6}>
                <Grid container direction={"row"} spacing={2}>
                  {/* working year and working month  */}
                  <Grid item direction={"column"} xs={12} md={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Working Year
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select-5"
                        label="Starting Year"
                        error={values.workingYear === "" && error}
                        value={values.workingYear}
                        onChange={handleChange("workingYear")}
                        sx={{ backgroundColor: "#ffffff", width: "100%" }}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        {startingYears.map((year) => (
                          <MenuItem value={year}>{year}</MenuItem>
                        ))}
                      </Select>
                      {values.workingYear === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item direction={"column"} xs={12} md={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Worknig Month
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select-5"
                        label="Working Month"
                        error={values.workingMonth === "" && error}
                        value={values.workingMonth}
                        onChange={handleChange("workingMonth")}
                        sx={{ backgroundColor: "#ffffff", width: "100%" }}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        {startingMonths.map((month) => (
                          <MenuItem key={month.value} value={month.value}>
                            {month.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {values.workingMonth === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item direction={"column"} xs={12} md={6}>
                <Grid container direction={"row"} spacing={1}>
                  {/* employment type  */}
                  <Grid item direction={"column"} xs={12} md={12}>
                    <FormControl className={classes.formControl} fullWidth>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Employment Type
                      </FormLabel>
                      <RadioGroup
                        row
                        error={values.employmentType === "" && error}
                        value={values.employmentType}
                        onChange={handleChange("employmentType")}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Full Time"
                          control={<Radio />}
                          label="Full Time"
                        />
                        <FormControlLabel
                          value="Part Time"
                          control={<Radio />}
                          label="Part Time"
                        />
                      </RadioGroup>
                      {values.jobType === "" && (
                        <FormHelperText sx={{ color: "red", mt: -0.5, mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  {/* job type  */}
                  <Grid item direction={"column"} xs={12} md={12}>
                    <FormControl className={classes.formControl} fullWidth>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Job Type
                      </FormLabel>
                      <RadioGroup
                        row
                        error={values.jobType === "" && error}
                        value={values.jobType}
                        onChange={handleChange("jobType")}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="Permanent"
                          control={<Radio />}
                          label="Permanent"
                        />
                        <FormControlLabel
                          value="Contractual"
                          control={<Radio />}
                          label="Contractual"
                        />

                      </RadioGroup>
                      {values.jobType === "" && (
                        <FormHelperText sx={{ color: "red", mt: -0.5, mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item direction={"column"} xs={12} md={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    variant="outlined"
                    multiline
                    rows={7}
                    fullWidth
                    placeholder="Job description"
                    error={values.jobDescription === "" && errInput}
                    value={values.jobDescription}
                    onChange={handleChange("jobDescription")}
                    sx={{ backgroundColor: "#ffffff" }}
                  />
                  {values.jobDescription === "" && (
                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                      {errInput}
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
                  <CardActions className="resume-actions">
                    <Button
                      variant="outlined"
                      onClick={onClick}
                      className="cancel-btn"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      className="save-btn"
                      onClick={handleAddExperience}
                    >
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

export default ExperienceMob;

const textStyle = { fontSize: 14, color: "#828282" };
const boldText = { ...textStyle, fontWeight: "bolder", letterSpacing: 1 };