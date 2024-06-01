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
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  gqlquery,
  QUERY_UNIVERSITYID,
  QUERY_SPECIALIZATIONID,
  QUERY_COURSEID,
} from "../../../../../api/index";

const AddEducation = (props) => {
  const [courseID, setCourseID] = useState([]);
  const [specializaitonID, setSpecializationID] = useState([]);
  const [universityID, setUniversityID] = useState([]);
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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    gqlquery(QUERY_COURSEID, null)
      .then((res) => res.json())
      .then((datas) => setCourseID(datas.data?.getCourseMaster));

    gqlquery(QUERY_SPECIALIZATIONID, null)
      .then((res) => res.json())
      .then((datas) =>
        setSpecializationID(datas.data?.getSpecializationMaster)
      );

    gqlquery(QUERY_UNIVERSITYID, null)
      .then((res) => res.json())
      .then((datas) => setUniversityID(datas.data.getUniversityMaster));
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

    console.log(
      "title",
      values.title,
      typeof values.title,
      "||",
      "course",
      parseInt(values.course),
      typeof Number(values.course),
      "||",
      "specilization",
      parseInt(values.specilization),
      typeof Number(values.specilization),
      "||",
      "institute",
      Number(values.institute),
      typeof Number(values.institute),
      "||",
      "passingyear",
      values.passingyear,
      typeof values.passingyear,
      "||",
      "coursetype",
      values.coursetype,
      typeof values.coursetype
    );

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
      .then((datas) => console.log(datas))
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

    console.log(
      "title",
      values.title,
      typeof values.title,
      "||",
      "course",
      parseInt(values.course),
      typeof Number(values.course),
      "||",
      "specilization",
      parseInt(values.specilization),
      typeof Number(values.specilization),
      "||",
      "institute",
      Number(values.institute),
      typeof Number(values.institute),
      "||",
      "passingyear",
      values.passingyear,
      typeof values.passingyear,
      "||",
      "coursetype",
      values.coursetype,
      typeof values.coursetype
    );

    const QUERY_UPDATEEDUCATION = {
      query: `mutation MyMutation {
        updateEducation (
             courseID: ${Number(values.course)},
             courseType: "${values.coursetype}",
             eduID: ${props.item.eduID},
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
      .then((datas) => console.log(datas))
      .finally((e) => console.log("Updating educational details in database"));

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
    if (window.confirm("Are you sure you want to delete?")) {
      const QUERY_UPDATEEDUCATION = {
        query: `mutation MyMutation {
            deleteEducation (eduID: ${props.item.eduID}) {
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
        .then((datas) => console.log(datas))
        .finally((e) =>
          console.log("Deleting educational details in database")
        );
    } else {
      console.log("You don't want to delete this!");
    }
  };

  return (
    <Grid item sx={{ marginBlock: "1rem" }} spacing={2}>
     {/*  <Card
        sx={{
          height: "100%",
          backgroundColor: "var(--clr-gray-6) !important",
        }}
      >
        {props.updateEducation === "updateEducation" ? (
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
        ) : (
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
        )}

        <Grid
          container
          direction={"row"}
          alignItems="flex-start"
          padding={2}
          sx={{ lineHeight: 5 }}
        >
          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth>
              {props.updateEducation === "updateEducation" ? (
                <TextField
                  variant="outlined"
                  label={props.item.title}
                  sx={{ backgroundColor: "#ffffff", width: "90%" }}
                  value={values.title}
                  defaultValue="{props.item.title}"
                  onChange={handleChange("title")}
                  fullWidth
                  error={values.title === "" && errInput}
                  helpertext={error}
                  placeholder="Title"
                />
              ) : (
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
              )}

              {values.title === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {errInput}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth>
              {props.updateEducation === "updateEducation" ? (
                <InputLabel id="demo-simple-select-label">
                  {props.item.courseName}
                </InputLabel>
              ) : (
                <InputLabel id="demo-simple-select-label">
                  Course Name
                </InputLabel>
              )}

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-2"
                label="Course Name"
                error={values.course === null && error}
                value={values.course}
                onChange={handleChange("course")}
                sx={{ backgroundColor: "#ffffff", width: "90%" }}
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
            <FormControl fullWidth>
              {props.updateEducation === "updateEducation" ? (
                <InputLabel id="demo-simple-select-label">
                  {props.item.specialization}
                </InputLabel>
              ) : (
                <InputLabel id="demo-simple-select-label">
                  Specialization
                </InputLabel>
              )}

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-3"
                label="Specilization"
                error={values.specilization === null && error}
                value={values.specilization}
                onChange={handleChange("specilization")}
                sx={{ backgroundColor: "#ffffff", width: "90%" }}
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
            <FormControl fullWidth>
              {props.updateEducation === "updateEducation" ? (
                <InputLabel id="demo-simple-select-label">
                  {props.item.university}
                </InputLabel>
              ) : (
                <InputLabel id="demo-simple-select-label">
                  University
                </InputLabel>
              )}

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-4"
                label="University/Institute"
                error={values.institute === null && error}
                value={values.institute}
                onChange={handleChange("institute")}
                sx={{ backgroundColor: "#ffffff", width: "90%" }}
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
            <FormControl fullWidth>
              {props.updateEducation === "updateEducation" ? (
                <InputLabel id="demo-simple-select-label">
                  {props.item.yearOfPassing}
                </InputLabel>
              ) : (
                <InputLabel id="demo-simple-select-label">
                  Passing Year
                </InputLabel>
              )}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-5"
                label="University/Institute"
                error={values.passingyear === "" && error}
                value={values.passingyear}
                onChange={handleChange("passingyear")}
                sx={{ backgroundColor: "#ffffff", width: "90%" }}
              >
                <MenuItem value={2022}> 2022 </MenuItem>
                <MenuItem value={2021}> 2021 </MenuItem>
                <MenuItem value={2020}> 2020</MenuItem>
              </Select>{" "}
              {values.passingyear === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Course Type
              </FormLabel>
              {props.updateEducation === "updateEducation" ? (
                <RadioGroup
                  row
                  error={error}
                  // value={values.coursetype}
                  defaultValue={props.item.courseType}
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
              ) : (
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
              )}

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
                {props.updateEducation === "updateEducation" ? (
                  <Button variant="contained" onClick={props.cancelUpdate}>
                    Cancel
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={props.onClick}>
                    Cancel
                  </Button>
                )}

                {props.updateEducation === "updateEducation" && (
                  <Button variant="contained" onClick={handleDeleteEducation}>
                    Delete
                  </Button>
                )}

                {props.updateEducation === "updateEducation" ? (
                  <Button variant="contained" onClick={handleUpdateEducation}>
                    Update
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleEducation}>
                    Save
                  </Button>
                )}
              </CardActions>
            </CardContent>
          </Grid>
        </Grid>
      </Card> */}
    </Grid>
  );
};

export default AddEducation;
