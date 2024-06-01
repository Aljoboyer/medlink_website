import React, { useState } from "react";
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
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

function AddExperience(props) {
  const [value, setValue] = useState(new Date());
  const [starttingYear, setStartingYear] = useState(new Date());
  const [starttingMonth, setStartingMonth] = useState(new Date());
  const [workingMonth, setWorkingMonth] = useState(new Date());
  const [WorkingYear, setWorkingYear] = useState(new Date());
  const [values, setValues] = useState({
    designation: "",
    hospital: "",
    currentlyworking: "",
    startingyear: starttingYear,
    startingmonth: starttingMonth,
    jobtype: "",
    workingyear: workingMonth,
    workingmonth: WorkingYear,
    jobdescription: "",
  });
  const [error, setError] = useState("");
  const [errDate, setErrDate] = useState("");
  const [errInput, setErrInput] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleAddExperience = () => {
    if (values.jobdescription === "") {
      setErrInput("Text field can not be empty.");
    } else {
      setErrInput("");
    }

    if (
      values.designation === "" ||
      values.hospital === "" ||
      values.currentlyworking === "" ||
      values.jobtype === "" ||
      values.workingmonth === ""
    ) {
      return setError("Please, select an option.");
    }
    if (
      values.startingyear === "" ||
      values.startingmonth === "" ||
      values.workingyear === "" ||
      values.workingmonth === ""
    ) {
      return setErrDate("Please, select a date");
    }

    console.log(values);

    values.designation = "";
    values.hospital = "";
    values.currentlyworking = "";
    values.startingyear = "";
    values.startingmonth = "";
    values.jobtype = "";
    values.workingyear = "";
    values.workingmonth = "";
    values.workingmonth = "";
    values.jobdescription = "";

    setErrInput("");
    setError("");

    console.log(value);
  };

  return (
    <Grid item ssx={{ marginBlock: "1rem" }} spacing={2}>
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
          Add Experience
        </Typography>
        <Grid
          container
          direction={"row"}
          alignItems="flex-start"
          justifyContent={"space-between"}
          className=""
          padding={2}
          spacing={2}
          sx={{ lineHeight: 5 }}
        >
          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Designation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-1"
                label="Designation"
                error={values.designation === "" && error}
                value={values.designation}
                onChange={handleChange("designation")}
                sx={{ backgroundColor: "#ffffff" }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

              {values.designation === "" && (
                <FormHelperText sx={{ color: "red", mt: 0 }}>
                  {error}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Hospital</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-1"
                label="Hospital"
                error={values.hospital === "" && error}
                value={values.hospital}
                onChange={handleChange("hospital")}
                sx={{ backgroundColor: "#ffffff" }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

              {values.hospital === "" && (
                <FormHelperText sx={{ color: "red", mt: 0 }}>
                  {error}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Currently working?
              </FormLabel>
              <RadioGroup
                row
                error={error}
                value={values.currentlyworking}
                onChange={handleChange("currentlyworking")}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              {values.currentlyworking === "" && (
                <FormHelperText sx={{ color: "red", mt: -0.5 }}>
                  {error}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item direction={"column"} xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["year"]}
                label="Year"
                onChange={(newValue) => {
                  setStartingYear(newValue);
                }}
                value={value}
                error={values.startingyear === "" && errDate}
                // onChange={handleChange("coursetype")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={errDate && "Select a date"}
                    sx={{ backgroundColor: "#ffffff" }}
                  />
                )}
              />
            </LocalizationProvider>
            {values.startingyear === "" && (
              <FormHelperText sx={{ color: "red", mt: -2.5 }}>
                {error}
              </FormHelperText>
            )}
          </Grid>
          <Grid item direction={"column"} xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["month"]}
                label="Month"
                value={value}
                error={values.startingmonth === "" && error}
                onChange={(newValue) => {
                  setStartingMonth(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={null}
                    sx={{ backgroundColor: "#ffffff" }}
                  />
                )}
              />
            </LocalizationProvider>{" "}
            {values.startingmonth === "" && (
              <FormHelperText sx={{ color: "red", mt: -2.5 }}>
                {error}
              </FormHelperText>
            )}
          </Grid>
          <Grid item direction={"column"} xs={12} md={6}>
            <Grid container direction={"row"} spacing={1}>
              <Grid item direction={"column"} xs={12} md={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Job Type
                  </FormLabel>
                  <RadioGroup
                    row
                    error={values.jobtype === "" && error}
                    value={values.jobtype}
                    onChange={handleChange("jobtype")}
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
                  {values.jobtype === "" && (
                    <FormHelperText sx={{ color: "red", mt: -0.5, mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year"]}
                    label="Year"
                    onChange={(newValue) => {
                      setWorkingYear(newValue);
                    }}
                    value={value}
                    // onChange={handleChange("coursetype")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        helperText={null}
                        sx={{ backgroundColor: "#ffffff" }}
                      />
                    )}
                  />

                  {values.workingyear === "" && (
                    <FormHelperText sx={{ color: "red", mt: -0.5 }}>
                      {error}
                    </FormHelperText>
                  )}
                </LocalizationProvider>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["month"]}
                    label="Month"
                    onChange={(newValue) => {
                      setWorkingMonth(newValue);
                    }}
                    value={value}
                    // onChange={handleChange("coursetype")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        helperText={null}
                        sx={{ backgroundColor: "#ffffff" }}
                      />
                    )}
                  />
                  {values.workingmonth === "" && (
                    <FormHelperText sx={{ color: "red", mt: -0.5 }}>
                      {error}
                    </FormHelperText>
                  )}
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
          <Grid item direction={"column"} xs={12} md={6}>
            <TextField
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              placeholder="Job description"
              error={values.jobdescription === "" && errInput}
              value={values.jobdescription}
              onChange={handleChange("jobdescription")}
              sx={{ backgroundColor: "#ffffff" }}
            />
            {values.jobdescription === "" && (
              <FormHelperText sx={{ color: "red", mt: 0 }}>
                {error}
              </FormHelperText>
            )}
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
                <Button variant="outlined" className="cancel-btn">
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
  );
}

export default AddExperience;
