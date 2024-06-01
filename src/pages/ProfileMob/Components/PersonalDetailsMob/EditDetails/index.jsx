import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import React, { useState } from "react";
import { gqlquery } from "../../../../../api/index";

// Status select array
const statuses = ["Single", "Married", "Others"];

const EditDetails = (props) => {
  const [birthDate, setBirthDate] = useState(null);

  //form value and error handle state
  const [values, setValues] = useState({
    dateOfBirth: null,
    maritalStatus: "",
    gender: null,
    differentlyAbled: null,
    homeTown: "",
    permanentAddress: "",
  });

  const [error, setError] = useState("");
  const [errDate, setErrDate] = useState("");
  const [errInput, setErrInput] = useState("");

  const handleInputChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange = (event) => {
    setBirthDate(event);
    let date = event.toISOString().slice(0, 10);
    console.log(date);
    values.dateOfBirth = date;
  };

  const handleAddPersonalDetails = () => {
    if (values.dateOfBirth === null) {
      setErrDate("Please, select a date");
    }
    if (
      values.gender === null ||
      values.differentlyAbled === null ||
      values.maritalStatus === ""
    ) {
      setError("Please, select an option.");
    }
    if (values.homeTown === "" || values.permanentAddress === "") {
      return setErrInput("TextField can not be empty.");
    }

    /* const QUERY_ADD_PERSONAL_DETAILS = {
      query: `mutation MyMutation {
          addPersonalDetails (
            address: "${values.permanentAddress}", 
            dateofBirth: "${values.dateOfBirth}", 
            differentlyAbled: ${Boolean(values.differentlyAbled)}, 
            gender: "${values.gender}", 
            homeTown: "${values.homeTown}", 
            maritalStatus: "${values.maritalStatus}"
            ) {
                address
                dateofBirth
                differentlyAbled
                gender
                homeTown
                maritalStatus
                pdID
              }
            }
          `,
      variables: null,
      operationName: "MyMutation",
    };
 */

    const QUERY_UPDATE_PERSONAL_DETAILS = {
      query: `mutation MyMutation {
        updatePersonalDetails (
            address: "${values.permanentAddress}", 
            dateofBirth: "${values.dateOfBirth}", 
            differentlyAbled: ${Boolean(values.differentlyAbled)}, 
            gender: "${values.gender}", 
            homeTown: "${values.homeTown}", 
            maritalStatus: "${values.maritalStatus}",
            pdID: "2"
            ) {
                address
                dateofBirth
                differentlyAbled
                gender
                homeTown
                maritalStatus
                pdID
              }
            }
          `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_UPDATE_PERSONAL_DETAILS, null)
      .then((res) => res.json())
      .then((datas) => console.log(datas))
      .finally((e) =>
        console.log("Successful to Update personal details Data")
      );
    console.log(values);

    // setValues({
    //   dateOfBirth: null,
    //   maritalStatus: "",
    //   gender: null,
    //   differentlyAbled: null,
    //   homeTown: "",
    //   permanentAddress: "",
    // });
    // setError("");
    // setErrDate("");
    // setErrInput("");
    // console.log(values);
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "#ffffff",
        mt: 5,
        mb: 7,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 0,
        }}
      >
        Personal Details
      </Typography>
      <Grid
        container
        justifyContent="space-between"
        columnSpacing={4}
        rowSpacing={3}
        sx={{ my: 3 }}
      >
        <Grid item xs={6}>
          <InputLabel
            sx={{
              color: "#6F7482",
              fontSize: "0.8rem",
            }}
            htmlFor="Birth_Date"
          >
            Date of Birth&nbsp;
            <Typography
              variant="caption"
              color="error"
              sx={{ fontSize: "16px" }}
            >
              *
            </Typography>
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack>
              <DesktopDatePicker
                // inputFormat="dd/mm/yyyy"
                value={values.dateOfBirth}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    sx={{
                      color: "#6F7482",
                      bgcolor: "#FFFFFF",
                    }}
                    {...params}
                  />
                )}
              />
              {values.dateOfBirth === null && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {errDate}
                </FormHelperText>
              )}
            </Stack>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <InputLabel
            sx={{
              color: "#6F7482",
              fontSize: "0.8rem",
            }}
          >
            Marital Status&nbsp;
            <Typography
              variant="caption"
              color="error"
              sx={{ fontSize: "16px" }}
            >
              *
            </Typography>
          </InputLabel>
          <Select
            displayEmpty
            onChange={handleInputChange("maritalStatus")}
            value={values.maritalStatus}
            error={values.maritalStatus === "" && error}
            fullWidth
            sx={{
              color: "#6F7482",
              bgcolor: "#FFFFFF",
            }}
          >
            <MenuItem value="" disabled>
              <em>Set Status</em>
            </MenuItem>
            {statuses.map((status) => (
              <MenuItem value={status} key={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          {values.maritalStatus === "" && (
            <FormHelperText sx={{ color: "red", mb: 1 }}>
              {error}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel
              sx={{
                color: "#333333",
                fontSize: "0.8rem",
              }}
            >
              Gender
            </FormLabel>
            <RadioGroup
              onChange={handleInputChange("gender")}
              error={error}
              value={values.gender}
              row
              name="row-radio-buttons-gender"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          {values.gender === null && (
            <FormHelperText sx={{ color: "red", mb: 1 }}>
              {error}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel
              sx={{
                color: "#333333",
                fontSize: "0.8rem",
              }}
            >
              Differently Abled?
            </FormLabel>
            <RadioGroup
              onChange={handleInputChange("differentlyAbled")}
              error={error}
              value={values.differentlyAbled}
              row
              name="row-radio-buttons-abled"
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
            {values.differentlyAbled === null && (
              <FormHelperText sx={{ color: "red", mb: 1 }}>
                {error}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <InputLabel
            sx={{
              color: "#6F7482",
              fontSize: "0.8rem",
            }}
          >
            Hometown&nbsp;
            <Typography
              variant="caption"
              color="error"
              sx={{ fontSize: "16px" }}
            >
              *
            </Typography>
          </InputLabel>
          <TextField
            onChange={handleInputChange("homeTown")}
            value={values.homeTown}
            // error={values.homeTown === "" && errInput}
            error={error}
            // helperText={errInput}
            placeholder="Text"
            type="text"
            fullWidth
            sx={{
              color: "#6F7482",
              bgcolor: "#FFFFFF",
            }}
          />
          {values.homeTown === "" && (
            <FormHelperText sx={{ color: "red", mb: 1 }}>
              {errInput}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={6}>
          <InputLabel
            sx={{
              color: "#6F7482",
              fontSize: "0.8rem",
            }}
          >
            Permanent Address&nbsp;
            <Typography
              variant="caption"
              color="error"
              sx={{ fontSize: "16px" }}
            >
              *
            </Typography>
          </InputLabel>
          <TextField
            onChange={handleInputChange("permanentAddress")}
            value={values.permanentAddress}
            // error={values.permanentAddress === "" && errInput}
            error={error}
            // helperText={errInput}
            placeholder="Text"
            type="text"
            fullWidth
            sx={{
              color: "#6F7482",
              bgcolor: "#FFFFFF",
            }}
          />
          {values.permanentAddress === "" && (
            <FormHelperText sx={{ color: "red", mb: 1 }}>
              {errInput}
            </FormHelperText>
          )}
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", gap: 3, justifyContent: "flex-end", mt: 1 }}>
        <Button
          onClick={props.onClick}
          sx={{ borderColor: "#000000", borderRadius: 2 }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddPersonalDetails}
          sx={{ borderRadius: 2 }}
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditDetails;
