import { Box, Button, Card, CardActions, CardContent, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material"; 
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { gqlquery, QUERY_COURSEID, QUERY_GETEDUCATION, QUERY_SPECIALIZATIONID, QUERY_UNIVERSITYID } from "../../../../api";
import Edit from "@mui/icons-material/Edit";

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

const EducationMob = (props) => {
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
    title: "",
    course: null,
    specilization: null,
    institute: null,
    passingyear: "",
    coursetype: "",
  });
  const [error, setError] = useState("");
  const [errInput, setErrInput] = useState("");
  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    gqlquery(QUERY_GETEDUCATION, null)
      .then((res) => res.json())
      .then((datas) => setEducationDetails(datas.data?.getEducationList));
  }, [updateList]);

  useEffect(() => {
    gqlquery(QUERY_COURSEID, null)
      .then((res) => res.json())
      .then((datas) => setCourseID(datas?.data?.getCourseMaster));

    gqlquery(QUERY_SPECIALIZATIONID, null)
      .then((res) => res.json())
      .then((datas) =>
        setSpecializationID(datas?.data?.getSpecializationMaster)
      );

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

  const handleEducation = (e) => {
    if (values.title === "") {
      setErrInput("Text field can not be empty.");
    } else {
      setErrInput("");
    }

    if (
      values.course === "" ||
      values.specilization === "" ||
      values.institute === "" ||
      values.passingyear === "" ||
      values.coursetype === ""
    ) {
      return setError("Please, select an option.");
    }

    const QUERY_POSTEDUCATION = {
      query: `mutation MyMutation {
                addEducation (
                  courseID: ${Number(values.course)},
                  courseType: "${values.coursetype}",
                  specializationID: ${Number(values.specilization)},
                  title: "${values.title}",
                  universityID: ${Number(values.institute)},
                  yearOfPassing: ${Number(values.passingyear)}
                  ) {
                      courseType
                      eduID
                      specializationID
                      title
                      courseID
                      universityID
                      yearOfPassing
                    }
                  }
                `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_POSTEDUCATION, null)
      .then((res) => res.json())
      .then((datas) => setUpdateList(!updateList))
      .finally((e) => console.log("adding educational details to database"));

    setErrInput("");
    setError("");

    setValues({
      title: "",
      course: "",
      specilization: "",
      institute: "",
      passingyear: "",
      coursetype: "",
    });

    values.title = "";
    values.course = "";
    values.specilization = "";
    values.institute = "";
    values.passingyear = "";
    values.coursetype = "";
    console.log(values);
    setFlag((prevData) => !prevData);
  };

  const handleUpdateEducation = (e) => {
    if (values.title === "") {
      setErrInput("Text field can not be empty.");
    } else {
      setErrInput("");
    }

    if (
      values.course === "" ||
      values.specilization === "" ||
      values.institute === "" ||
      values.passingyear === "" ||
      values.coursetype === ""
    ) {
      return setError("Please, select an option.");
    }

    const QUERY_UPDATEEDUCATION = {
      query: `mutation MyMutation {
        updateEducation (
             courseID: ${Number(values.course)},
             courseType: "${values.coursetype}",
             eduID: ${item.eduID},
             specializationID: ${Number(values.specilization)},
             title: "${values.title}",
             universityID: ${Number(values.institute)},
             yearOfPassing: ${Number(values.passingyear)}
            ) {
                courseID
                courseType
                eduID
                specializationID
                title
                universityID
                yearOfPassing
              }
        }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_UPDATEEDUCATION, null)
      .then((res) => res.json())
      .then((datas) => setUpdateList(!updateList))
      .finally((e) => console.log("Updating educational details in database"));

    setShowUpdateEducation((prevData) => !prevData);

    setErrInput("");
    setError("");

    setValues({
      title: "",
      course: "",
      specilization: "",
      institute: "",
      passingyear: "",
      coursetype: "",
    });

    values.title = "";
    values.course = "";
    values.specilization = "";
    values.institute = "";
    values.passingyear = "";
    values.coursetype = "";
  };

  const handleDeleteEducation = (e) => {
    setShowUpdateEducation((prevData) => !prevData);
    if (window.confirm("Are you sure you want to delete?")) {
      const QUERY_UPDATEEDUCATION = {
        query: `mutation MyMutation {
            deleteEducation (eduID: ${item.eduID}) {
                courseID
                courseType
                eduID
                specializationID
                title
                universityID
                yearOfPassing
              }
            }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_UPDATEEDUCATION, null)
        .then((res) => res.json())
        .then((datas) => setUpdateList(!updateList))
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
    setShowUpdateEducation((prevData) => !prevData);
    setItem(item);
  };

  const handleCancelUpdate = (e) => {
    setShowUpdateEducation((prevData) => !prevData);
  };

  const onClick = (e) => {
    e.preventDefault();
    setFlag((prevData) => !prevData);
  };

  return (
    <Grid item sx={{ marginBlock: "1rem", mb: 10, px: 2 }} spacing={2}>
      {!flag ? (
        <Grid item sx={{ marginBlock: "1rem" }} spacing={2}>
          {!showUpdateEducation ? (
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
                <Grid item direction={"column"} xs={12} md={12}>
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
                      sx={{
                        fontSize: 24,
                        fontWeight: 700,
                        // margin: "1rem",
                        marginBottom: 0,
                      }}
                    >
                      Education
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
                      Add Education
                    </Button>
                  </Box>

                  {educationDetails.map((item, index) => (
                    <CardContent
                      key={`education-${index}`}
                      className="resume-content"
                      sx={{ display: "flex", ml: -2 }}
                    >
                      <Box sx={{ display: "grid", lineHeight: "25px" }}>
                        <Typography variant="p">{item.title}</Typography>
                        <Typography
                          variant="info"
                          sx={{ fontSize: 12, color: "#828282" }}
                        >
                          {item.courseName}
                        </Typography>
                        <Typography
                          variant="info"
                          sx={{ fontSize: 12, color: "#828282" }}
                        >
                          {item.specialization}
                        </Typography>
                        <Typography
                          variant="info"
                          sx={{ fontSize: 12, color: "#828282" }}
                        >
                          {item.university}
                        </Typography>
                        <Typography
                          variant="info"
                          sx={{ fontSize: 12, color: "#828282" }}
                        >
                          {item.yearOfPassing} ({item.courseType})
                        </Typography>
                      </Box>
                      <Box sx={{ margin: "0 0 0 40px" }}>
                        <Button>
                          <Edit
                            sx={{ fontSize: "medium" }}
                            onClick={() => handleShowEducationDetails(item)}
                          />
                        </Button>
                      </Box>
                    </CardContent>
                  ))}
                </Grid>
              </Grid>
            </Card>
          ) : (
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
                Update Education
              </Typography>

              <Grid
                container
                direction={"row"}
                alignItems="flex-start"
                padding={2}
                sx={{ lineHeight: 5 }}
              >
                <Grid item direction={"column"} xs={12} md={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      variant="outlined"
                      label={item.title}
                      sx={{ backgroundColor: "#ffffff", width: "90%" }}
                      value={values.title}
                      defaultValue="{props.item.title}"
                      onChange={handleChange("title")}
                      fullWidth
                      error={values.title === "" && errInput}
                      helpertext={error}
                      placeholder="Title"
                    />

                    {values.title === "" && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {errInput}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item direction={"column"} xs={12} md={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {item.courseName}
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-2"
                      defaultValue={item.courseName}
                      label="Course Name"
                      error={values.course === null && error}
                      value={values.course}
                      onChange={handleChange("course")}
                      sx={{ backgroundColor: "#ffffff", width: "90%" }}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      {courseID.map((singleCourseID) => (
                        <MenuItem value={singleCourseID.cmID}>
                          {singleCourseID.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {values.course === null && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item direction={"column"} xs={12} md={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {item.specialization}
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-3"
                      defaultValue={item.specialization}
                      label="Specilization"
                      error={values.specilization === null && error}
                      value={values.specilization}
                      onChange={handleChange("specilization")}
                      sx={{ backgroundColor: "#ffffff", width: "90%" }}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      {specializaitonID.map((singleSpecilization) => (
                        <MenuItem value={singleSpecilization.smID}>
                          {singleSpecilization.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {values.specilization === null && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item direction={"column"} xs={12} md={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {item.university}
                    </InputLabel>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-4"
                      label="University/Institute"
                      defaultValue={item.university}
                      error={values.institute === null && error}
                      value={values.institute}
                      onChange={handleChange("institute")}
                      sx={{ backgroundColor: "#ffffff", width: "90%" }}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      {universityID.map((singleUniversity) => (
                        <MenuItem value={singleUniversity.umID}>
                          {singleUniversity.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {values.institute === null && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item direction={"column"} xs={12} md={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {item.yearOfPassing}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-5"
                      label="University/Institute"
                      defaultValue={item.yearOfPassing}
                      error={values.passingyear === "" && error}
                      value={values.passingyear}
                      onChange={handleChange("passingyear")}
                      sx={{ backgroundColor: "#ffffff", width: "90%" }}
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem value={2022}> 2022 </MenuItem>
                      <MenuItem value={2021}> 2021 </MenuItem>
                      <MenuItem value={2020}> 2020</MenuItem>
                    </Select>
                    {values.passingyear === "" && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item direction={"column"} xs={12} md={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Course Type
                    </FormLabel>
                    <RadioGroup
                      row
                      error={error}
                      // value={values.coursetype}
                      defaultValue={item.courseType}
                      onChange={handleChange("coursetype")}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="full time"
                        control={<Radio />}
                        label="Full time"
                      />
                      <FormControlLabel
                        value="part time"
                        control={<Radio />}
                        label="Part time"
                      />
                      <FormControlLabel
                        value="distance learing"
                        control={<Radio />}
                        label="Distance learning"
                      />
                    </RadioGroup>

                    {values.coursetype === "" && (
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
                      sx={{
                        justifyContent: "flex-end",
                        gap: "1rem",
                        padding: 0,
                      }}
                    >
                      <Button variant="contained" onClick={handleCancelUpdate}>
                        Cancel
                      </Button>

                      <Button
                        variant="contained"
                        onClick={handleDeleteEducation}
                      >
                        Delete
                      </Button>

                      <Button
                        variant="contained"
                        onClick={handleUpdateEducation}
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
        <Grid item sx={{ marginBlock: "1rem" }} spacing={2}>
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
              Add Education
            </Typography>

            <Grid
              container
              direction={"row"}
              alignItems="flex-start"
              padding={2}
              sx={{ lineHeight: 5 }}
            >
              <Grid item direction={"column"} xs={12} md={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    variant="outlined"
                    label="Title"
                    sx={{ backgroundColor: "#ffffff", width: "90%" }}
                    value={values.title}
                    onChange={handleChange("title")}
                    fullWidth
                    error={values.title === "" && errInput}
                    helpertext={error}
                    placeholder="Title"
                  />

                  {values.title === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {errInput}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Course Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-2"
                    label="Course Name"
                    error={values.course === null && error}
                    value={values.course}
                    onChange={handleChange("course")}
                    sx={{ backgroundColor: "#ffffff", width: "90%" }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    {courseID.map((singleCourseID) => (
                      <MenuItem value={singleCourseID.cmID}>
                        {singleCourseID.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {values.course === null && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Specialization
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-3"
                    label="Specilization"
                    error={values.specilization === null && error}
                    value={values.specilization}
                    onChange={handleChange("specilization")}
                    sx={{ backgroundColor: "#ffffff", width: "90%" }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    {specializaitonID.map((singleSpecilization) => (
                      <MenuItem value={singleSpecilization.smID}>
                        {singleSpecilization.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {values.specilization === null && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    University
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-4"
                    label="University/Institute"
                    error={values.institute === null && error}
                    value={values.institute}
                    onChange={handleChange("institute")}
                    sx={{ backgroundColor: "#ffffff", width: "90%" }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    {universityID.map((singleUniversity) => (
                      <MenuItem value={singleUniversity.umID}>
                        {singleUniversity.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {values.institute === null && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Passing Year
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-5"
                    label="University/Institute"
                    error={values.passingyear === "" && error}
                    value={values.passingyear}
                    onChange={handleChange("passingyear")}
                    sx={{ backgroundColor: "#ffffff", width: "90%" }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    {passingYears.map((year) => (
                      <MenuItem value={year}> {year} </MenuItem>
                    ))}
                  </Select>{" "}
                  {values.passingyear === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Course Type
                  </FormLabel>
                  <RadioGroup
                    row
                    error={error}
                    value={values.coursetype}
                    onChange={handleChange("coursetype")}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="full time"
                      control={<Radio />}
                      label="Full time"
                    />
                    <FormControlLabel
                      value="part time"
                      control={<Radio />}
                      label="Part time"
                    />
                    <FormControlLabel
                      value="distance learing"
                      control={<Radio />}
                      label="Distance learning"
                    />
                  </RadioGroup>

                  {values.coursetype === "" && (
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
                    <Button variant="outlined" onClick={onClick}>
                      Cancel
                    </Button>

                    <Button variant="contained" onClick={handleEducation}>
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

export default EducationMob;
