import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { gqlquery } from "../../../../../api/index";

// Custom style for Select dropdown
const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 150,
  },
}));

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

const AddLanguage = (props) => {
  const [languageValues, setLanguageValues] = useState({
    language: "",
    proficiency: "",
    read: false,
    write: false,
    speak: false,
  });
  const [errSelect, setErrSelect] = useState("");
  const [errCheck, setErrCheck] = useState("");
  const classes = useStyles();

  const handleSelectChange = (prop) => (event) => {
    setLanguageValues({ ...languageValues, [prop]: event.target.value });
  };
  const handleCheckedChange = (prop) => (event) => {
    setLanguageValues({ ...languageValues, [prop]: event.target.checked });
  };

  const handleAddLanguage = () => {
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

    const QUERY_ADD_LANGUAGE_KNOWN = {
      query: `mutation MyMutation {
        addLanguagesKnown(
          language: "${languageValues.language}", 
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

    gqlquery(QUERY_ADD_LANGUAGE_KNOWN, null)
      .then((res) => res.json())
      .then((datas) => console.log(datas))
      .finally((e) =>
        console.log("Successful to Update personal details Data")
      );

    console.log(languageValues);

    setLanguageValues({
      language: "",
      proficiency: "",
      write: false,
      read: false,
      speak: false,
    });
    setErrSelect("");
    setErrCheck("");
    props.onLangClick();
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "",
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
        <Grid item xs={12}>
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
            value={languageValues.language}
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
        <Grid item xs={12}>
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
            value={languageValues.proficiency}
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
                    name="read"
                  />
                }
                label="Read"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckedChange("write")}
                    name="write"
                  />
                }
                label="Write"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckedChange("speak")}
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
      <Box sx={{ display: "flex", gap: 3, justifyContent: "flex-end", mt: 1 }}>
        <Button
          sx={{ borderColor: "#000000", borderRadius: 2 }}
          variant="outlined"
          onClick={props.onLangClick}
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddLanguage}
          sx={{ borderRadius: 2 }}
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default AddLanguage;
