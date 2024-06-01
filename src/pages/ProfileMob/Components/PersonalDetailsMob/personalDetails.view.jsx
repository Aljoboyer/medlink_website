import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  QUERY_PERSONAL_DETAILS,
  QUERY_LANGUAGES_KNOWN,
  gqlquery,
} from "../../../../api/index";
import AddLanguage from "./AddLanguage";

// Custom style for Select dropdown
const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 150,
  },
}));

// Status select array
const statuses = ["Single", "Married", "Others"];

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
  "Mandarin"
];
const proficiencies = ["Beginner", "Intermediate", "High", "Expert", "Native"];

const PersonalDetails = () => {
  const [flag, setFlag] = useState(false);
  const [lang, setLang] = useState(false);
  const [isUpdateLang, setIsUpdateLang] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  const onClick = (e) => {
    // e.preventDefault();
    setFlag((prevData) => !prevData);

    if (personalDetails?.maritalStatus) {
      values.maritalStatus = personalDetails?.maritalStatus;
    }
    if (personalDetails?.gender) {
      values.gender = personalDetails?.gender;
    }
    if (String(personalDetails?.differentlyAbled)) {
      values.differentlyAbled = personalDetails?.differentlyAbled;
    }
    if (personalDetails?.homeTown) {
      values.homeTown = personalDetails?.homeTown;
    }
    if (personalDetails?.address) {
      values.permanentAddress = personalDetails?.address;
    }
  };

  const onLangClick = (e) => {
    setLang((prevData) => !prevData);
  };

  const onLangUpdate = (e) => {
    setIsUpdateLang((prevData) => !prevData);
  };

  // Load server Data
  const [personalDetails, setPersonalDetails] = useState({});
  const [languagesKnown, setLanguagesKnown] = useState([]);
  const [languageItem, setLanguageItem] = useState({});
  // console.log(flag);
  const change = !flag;

  useEffect(() => {
    gqlquery(QUERY_PERSONAL_DETAILS, null)
      .then((res) => res.json())
      .then((data) => setPersonalDetails(data?.data?.getPersonalDetails))
      .finally(() => setIsLoading(false));
  }, [change]);
  // console.log(personalDetails);

  useEffect(() => {
    gqlquery(QUERY_LANGUAGES_KNOWN, null)
      .then((res) => res.json())
      .then((data) => setLanguagesKnown(data?.data?.getLanguagesKnown));
  }, [lang]);

  // Personal details form Input Handle
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

  const [languageValues, setLanguageValues] = useState({
    language: "",
    proficiency: "",
    read: false,
    write: false,
    speak: false,
  });

  // Error Handler
  const [error, setError] = useState("");
  const [errDate, setErrDate] = useState("");
  const [errInput, setErrInput] = useState("");
  const [errSelect, setErrSelect] = useState("");
  const [errCheck, setErrCheck] = useState("");
  const [isFirst, setIsFirst] = useState(true);

  const handleInputChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange = (event) => {
    setBirthDate(event);
    let date = event.toISOString().slice(0, 10);
    console.log(date);
    values.dateOfBirth = date;
  };

  const handleSelectChange = (prop) => (event) => {
    setLanguageValues({ ...languageValues, [prop]: event.target.value });
  };
  const handleCheckedChange = (prop) => (event) => {
    if (isFirst) {
      languageValues.read = languageItem.read;
      languageValues.speak = languageItem.speak;
      languageValues.write = languageItem.write;
      setIsFirst(false);
    }

    setLanguageValues({ ...languageValues, [prop]: event.target.checked });
  };

  // Personal details add handle
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
    const QUERY_ADD_PERSONAL_DETAILS = {
      query: `mutation MyMutation {
          addPersonalDetails (
            address: "${values.permanentAddress}", 
            dateofBirth: "${values.dateOfBirth}", 
            differentlyAbled: ${Boolean(Number(values.differentlyAbled))}, 
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

    gqlquery(QUERY_ADD_PERSONAL_DETAILS, null)
      .then((res) => res.json())
      .then((datas) => console.log(datas));

    setValues({
      dateOfBirth: null,
      maritalStatus: "",
      gender: null,
      differentlyAbled: null,
      homeTown: "",
      permanentAddress: "",
    });
    setError("");
    setErrDate("");
    setErrInput("");
    onClick();
  };

  // Personal Details Update handle
  const handleUpdatePersonalDetails = () => {
    console.log(values.dateOfBirth);
    if (values.dateOfBirth === null) {
      return setErrDate("Please, select a date");
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

    const QUERY_UPDATE_PERSONAL_DETAILS = {
      query: `mutation MyMutation {
        updatePersonalDetails (
            address: "${values.permanentAddress}", 
            dateofBirth: "${values.dateOfBirth}", 
            differentlyAbled: ${Boolean(Number(values.differentlyAbled))}, 
            gender: "${values.gender}", 
            homeTown: "${values.homeTown}", 
            maritalStatus: "${values.maritalStatus}",
            pdID: "${personalDetails.pdID}"
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
      .then((data) => setPersonalDetails(data?.data?.updatePersonalDetails))
      .finally((e) =>
        console.log("Successful to Update personal details Data")
      );

    setError("");
    setErrDate("");
    setErrInput("");
    onClick();
  };

  // Lanugage Known Update handle
  const languageKnownUpdate = (item) => {
    setLanguageItem(item);
    onLangUpdate();
  };
  const cancelUpdate = () => {
    onLangUpdate();
    setLanguageItem({});
  };

  const handleUpdateLanguage = (langID) => {
    console.log("Sever:onclick", languageItem);
    if (languageValues.language === "") {
      languageValues.language = languageItem.language;
    }
    if (languageValues.proficiency === "") {
      languageValues.proficiency = languageItem.proficiency;
    }
    if (
      languageValues.read === false &&
      languageValues.write === false &&
      languageValues.speak === false
    ) {
      languageValues.read = languageItem.read;
      languageValues.speak = languageItem.speak;
      languageValues.write = languageItem.write;
      setIsFirst(true);
    }

    if (languageValues.language === "" || languageValues.proficiency === "") {
      setErrSelect("Please, select an option.");
    }
    if (
      languageValues.read === false &&
      languageValues.write === false &&
      languageValues.speak === false
    ) {
      return setErrCheck("You must select One option");
    }
    console.log("UpdateInput:", languageValues);
    console.log("UpdateID:", langID);
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
      .then((data) => setLanguagesKnown(data?.data?.updateLanguagesKnown))
      .finally((e) => console.log("Successful to Update Language"));

    setErrSelect("");
    setErrCheck("");
    setLanguageValues({
      language: "",
      proficiency: "",
      write: false,
      read: false,
      speak: false,
    });
    onLangUpdate();
  };

  // Language Delete handle
  const handleDeleteLanguage = (lkID) => {
    const confirmed = window.confirm();
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
        .then((data) => setLanguagesKnown(data?.data?.deleteLanguagesKnown))
        .finally((e) => console.log("Successful to Delete Language"));
    }
  };

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

  if (!isLoading) {
    return (
      <Grid item sx={{ marginBlock: "1rem" }} spacing={2}>
        {!flag && !lang && !isUpdateLang && (
          <Grid personalDetailsData sx={{ marginBlock: "1rem" }} spacing={2}>
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
                  personalDetailsData
                  direction={"column"}
                  xs={12}
                  md={10}
                  sx={{ padding: "0 10px 0 0" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      component="h3"
                      variant="h5"
                      sx={{
                        fontSize: 24,
                        fontWeight: 700,
                        margin: "1rem",
                        marginBottom: "3%",
                      }}
                    >
                      Personal Details
                    </Typography>
                    <Box sx={{ margin: "0" }}>
                      <EditIcon
                        onClick={onClick}
                        sx={{ color: "gray", fontSize: 17 }}
                      />
                    </Box>
                  </Box>
                  <div>
                    <div>
                      <CardContent sx={{ display: "flex" }}>
                        <Box
                          sx={{
                            px: 0.5,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{ display: "flex", gap: 3, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "250px", fontSize: "12px" }}
                            >
                              Date of Birth
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {shortsDate}
                            </Typography>
                          </Box>
                          <Box
                            sx={{ display: "flex", gap: 3, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "250px", fontSize: "12px" }}
                            >
                              Gender
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {personalDetails?.gender}
                            </Typography>
                          </Box>
                          <Box
                            sx={{ display: "flex", gap: 3, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "250px", fontSize: "12px" }}
                            >
                              Permanent Address
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {personalDetails?.address}
                            </Typography>
                          </Box>
                          <Box
                            sx={{ display: "flex", gap: 3, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "250px", fontSize: "12px" }}
                            >
                              Marital Status
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {personalDetails?.maritalStatus}
                            </Typography>
                          </Box>
                          <Box
                            sx={{ display: "flex", gap: 3, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "250px", fontSize: "12px" }}
                            >
                              Home Town
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {personalDetails?.homeTown}
                            </Typography>
                          </Box>
                          <Box
                            sx={{ display: "flex", gap: 3, color: "#828282" }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ width: "250px", fontSize: "12px" }}
                            >
                              Differntialy Abled
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "70%",
                                color: "#4F4F4F",
                                fontSize: "12px",
                              }}
                            >
                              {personalDetails?.differentlyAbled ? "Yes" : "No"}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </div>
                    <div>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "4%",
                          }}
                        >
                          <Typography
                            component="h3"
                            variant="h6"
                            sx={{
                              fontSize: 18,
                              fontWeight: 700,
                              margin: "1rem",
                              marginBottom: "3%",
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
                              float: "right",
                              maxHeight: "35px",
                              marginTop: "1%",
                            }}
                            onClick={onLangClick}
                          >
                            Add Language
                          </Button>
                        </div>
                        <table
                          style={{
                            width: "100%",
                            textAlign: "left",
                            marginTop: "3%",
                            marginLeft: "2.2%",
                            paddingTop: "1%",
                            borderSpacing: "0 1em",
                          }}
                        >
                          <tr>
                            <th>Languages</th>
                            <th>Proficiency</th>
                            <th>Read</th>
                            <th>Write</th>
                            <th>Speak</th>
                          </tr>
                          {languagesKnown.map((item, index) => (
                            <tr key={`languages-${index}`}>
                              <td>
                                <Typography variant="info" sx={textStyle}>
                                  {item.language}
                                </Typography>
                              </td>
                              <td>
                                <Typography variant="info" sx={textStyle}>
                                  {item.proficiency}
                                </Typography>
                              </td>
                              <td>
                                <Typography variant="info" sx={textStyle}>
                                  {item.read ? "Yes" : "No"}
                                </Typography>
                              </td>
                              <td>
                                <Typography variant="info" sx={textStyle}>
                                  {item.write ? "Yes" : "No"}
                                </Typography>
                              </td>
                              <td>
                                <Typography variant="info" sx={textStyle}>
                                  {item.speak ? "Yes" : "No"}
                                </Typography>
                              </td>
                              <td>
                                <Box
                                  sx={{
                                    margin: "0 0 0 40px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <EditIcon
                                    onClick={() => languageKnownUpdate(item)}
                                    fontSize="small"
                                    sx={{ color: "#828282" }}
                                  />
                                  <DeleteIcon
                                    onClick={() =>
                                      handleDeleteLanguage(item.lknID)
                                    }
                                    fontSize="small"
                                    sx={{ color: "#828282" }}
                                  />
                                </Box>
                              </td>
                            </tr>
                          ))}
                        </table>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        )}
        {flag && !lang && !isUpdateLang && (
          <Box
            sx={{
              p: 2,
              backgroundColor: "",
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
              <Grid item xs={12}>
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
                      inputFormat="dd/MM/yyyy"
                      // defaultValue={personalDetails?.dateofBirth}
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
              <Grid item xs={12}>
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
                {!personalDetails?.maritalStatus ? (
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
                    MenuProps={{ classes: { paper: classes.menuPaper } }}

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
                ) : (
                  <Select
                    displayEmpty
                    onChange={handleInputChange("maritalStatus")}
                    defaultValue={personalDetails?.maritalStatus}
                    // value={values.maritalStatus}
                    error={values.maritalStatus === "" && error}
                    fullWidth
                    sx={{
                      color: "#6F7482",
                      bgcolor: "#FFFFFF",
                    }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
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
                )}
                {values.maritalStatus === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {error}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel
                    sx={{
                      color: "#333333",
                      fontSize: "0.8rem",
                    }}
                  >
                    Gender
                  </FormLabel>
                  {!personalDetails?.gender ? (
                    <RadioGroup
                      onChange={handleInputChange("gender")}
                      value={values.gender}
                      error={error}
                      row
                      name="row-radio-buttons-gender"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  ) : (
                    <RadioGroup
                      onChange={handleInputChange("gender")}
                      defaultValue={personalDetails?.gender}
                      // value={values.gender}
                      error={error}
                      row
                      name="row-radio-buttons-gender"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  )}
                </FormControl>
                {values.gender === null && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {error}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel
                    sx={{
                      color: "#333333",
                      fontSize: "0.8rem",
                    }}
                  >
                    Differently Abled?
                  </FormLabel>
                  {!String(personalDetails?.differentlyAbled) ? (
                    <RadioGroup
                      onChange={handleInputChange("differentlyAbled")}
                      value={values.differentlyAbled}
                      error={error}
                      row
                      name="row-radio-buttons-abled"
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  ) : (
                    <RadioGroup
                      onChange={handleInputChange("differentlyAbled")}
                      defaultValue={Number(personalDetails?.differentlyAbled)}
                      // value={values.differentlyAbled}
                      error={error}
                      row
                      name="row-radio-buttons-abled"
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="0"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  )}
                  {values.differentlyAbled === null && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
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
                {!personalDetails?.homeTown ? (
                  <TextField
                    onChange={handleInputChange("homeTown")}
                    value={values.homeTown}
                    error={error}
                    placeholder="Text"
                    type="text"
                    fullWidth
                    sx={{
                      color: "#6F7482",
                      bgcolor: "#FFFFFF",
                    }}
                  />
                ) : (
                  <TextField
                    onChange={handleInputChange("homeTown")}
                    defaultValue={personalDetails?.homeTown}
                    // value={values.homeTown}
                    error={error}
                    placeholder="Text"
                    type="text"
                    fullWidth
                    sx={{
                      color: "#6F7482",
                      bgcolor: "#FFFFFF",
                    }}
                  />
                )}
                {values.homeTown === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {errInput}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
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
                {!personalDetails?.address ? (
                  <TextField
                    onChange={handleInputChange("permanentAddress")}
                    value={values.permanentAddress}
                    error={error}
                    placeholder="Text"
                    type="text"
                    fullWidth
                    sx={{
                      color: "#6F7482",
                      bgcolor: "#FFFFFF",
                    }}
                  />
                ) : (
                  <TextField
                    onChange={handleInputChange("permanentAddress")}
                    defaultValue={personalDetails?.address}
                    // value={values.permanentAddress}
                    error={error}
                    placeholder="Text"
                    type="text"
                    fullWidth
                    sx={{
                      color: "#6F7482",
                      bgcolor: "#FFFFFF",
                    }}
                  />
                )}
                {values.permanentAddress === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {errInput}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "flex-end",
                mt: 1,
              }}
            >
              <Button
                onClick={onClick}
                sx={{ borderColor: "#000000", borderRadius: 2 }}
                variant="outlined"
              >
                Cancel
              </Button>
              {!personalDetails?.address ? (
                <Button
                  onClick={handleAddPersonalDetails}
                  sx={{ borderRadius: 2 }}
                  variant="contained"
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={handleUpdatePersonalDetails}
                  sx={{ borderRadius: 2 }}
                  variant="contained"
                >
                  Save
                </Button>
              )}
            </Box>
          </Box>
        )}
        {!flag && lang && !isUpdateLang && (
          <AddLanguage onLangClick={onLangClick} />
        )}
        {!flag && !lang && isUpdateLang && (
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
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
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
                Languages Known
              </Typography>
              <Button
                sx={{ borderColor: "#000000", borderRadius: 2 }}
                variant="outlined"
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
              <Grid item xs={6}>
                <InputLabel
                  sx={{
                    color: "#6F7482",
                    fontSize: "0.8rem",
                  }}
                >
                  Language&nbsp;
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
                  onChange={handleSelectChange("language")}
                  defaultValue={languageItem.language}
                  // value={languageItem.language}
                  error={languageValues.language === "" && errSelect}
                  fullWidth
                  sx={{
                    color: "#6F7482",
                    bgcolor: "#FFFFFF",
                  }}
                  MenuProps={{ classes: { paper: classes.menuPaper } }}
                >
                  <MenuItem value="" disabled>
                    <em>Set Lanuage</em>
                  </MenuItem>
                  {languages.map((option) => (
                    <MenuItem value={option} key={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {languageValues.language === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {errSelect}
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
                  Proficiency&nbsp;
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
                  onChange={handleSelectChange("proficiency")}
                  // value={languageValues.proficiency}
                  defaultValue={languageItem.proficiency}
                  error={languageValues.proficiency === "" && errSelect}
                  fullWidth
                  sx={{
                    color: "#6F7482",
                    bgcolor: "#FFFFFF",
                  }}
                  MenuProps={{ classes: { paper: classes.menuPaper } }}
                >
                  <MenuItem value="" disabled>
                    <em>Set Proficiancy</em>
                  </MenuItem>
                  {proficiencies.map((option) => (
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
              </Grid>
              <Grid>
                <FormGroup>
                  <Box sx={{ display: "flex", gap: 4, ml: 4, mt: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleCheckedChange("read")}
                          defaultChecked={languageItem.read}
                          name="read"
                        />
                      }
                      label="Read"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleCheckedChange("write")}
                          defaultChecked={languageItem.write}
                          name="write"
                        />
                      }
                      label="Write"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleCheckedChange("speak")}
                          defaultChecked={languageItem.speak}
                          name="speak"
                        />
                      }
                      label="Speak"
                    />
                  </Box>
                </FormGroup>
                {errCheck && (
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
                mt: 1,
              }}
            >
              <Button
                sx={{ borderColor: "#000000", borderRadius: 2 }}
                variant="outlined"
                onClick={cancelUpdate}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleUpdateLanguage(languageItem.lknID)}
                sx={{ borderRadius: 2 }}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          </Box>
        )}
      </Grid>
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

const textStyle = { fontSize: 12, color: "#828282" };
