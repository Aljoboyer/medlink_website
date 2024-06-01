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
  InputBase,
  Card,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { gqlquery, QUERY_LANGUAGES_KNOWN } from "../../../../../api/index";
import useAuth from "../../../../../hooks/useAuth";

// Custom style for mui Select border
const CustomSelectInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "4px",
    position: "relative",
    border: "1px solid var(--clr-blue-light) !important",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontSize: "15px",
    color: "var(--clr-blue-footer)",
    padding: "10px 26px 10px 12px",

    "&:focus": {
      borderRadius: 4,
      borderColor: "red",
    },
  },
}));

const selectPlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#B8BCCA"
  }
}))

const SelectPlaceholder = ({children}) => {
  const classes = selectPlaceholderStyles();
  return (<div className={classes.placeholder}>{children}</div>);
}

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
  "Mandarin",
];
const proficiencies = ["Beginner", "Intermediate", "High", "Expert", "Native"];

const AddLanguage = (props) => {
  const { handleStrengthUpdate } = useAuth();
  const [languageValues, setLanguageValues] = useState({
    language: "",
    proficiency: "",
    read: false,
    write: false,
    speak: false,
  });
  const [addedLanguage, setAddedLanguage] = useState([])
  const [errSelect, setErrSelect] = useState("");
  const [errCheck, setErrCheck] = useState("");
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    gqlquery(QUERY_LANGUAGES_KNOWN, null)
      .then((res) => res.json())
      .then((data) => setAddedLanguage(data?.data?.getLanguagesKnown));
  }, []);
  // console.log(languageValues.language, addedLanguage);

  const handleSelectChange = (prop) => (event) => {
    setLanguageValues({ ...languageValues, [prop]: event.target.value });
  };
  const handleCheckedChange = (prop) => (event) => {
    setLanguageValues({ ...languageValues, [prop]: event.target.checked });
  };

  const handleAddLanguage = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (
        languageValues.language === "" ||
        languageValues.proficiency === "" ||
        (languageValues.read === false && languageValues.write === false && languageValues.speak === false)
      ) {
        setErrSelect("Please, select an option.")
        setErrCheck("You must select One option")
        return
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
        .then((datas) => {
          props.setLanguagesKnown(datas?.data?.addLanguagesKnown);
          handleStrengthUpdate();
        })
        .finally((e) =>
          console.log("Successful to Update personal details Data")
        );

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
    }
  };

  return (
    <Card
      sx={{
        boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
        border: matches ? "1px solid #E4EEF5" : "",
        backgroundColor: "var(--clr-white) !important",
        borderRadius: 2,
        p: 2.5,
        mt: 5,
        mb: 7,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Typography
          component="div"
          variant="h5"
          sx={{
            fontSize: matches ? "18px" : "24px",
            fontWeight: 700,
            color: "var(--clr-blue-footer)",
          }}
        >
          Languages Known
        </Typography>
      </Box>
      <Grid
        container
        justifyContent="space-between"
        columnSpacing={4}
        rowSpacing={2.5}
        sx={{ my: 2 }}
      >
        <Grid item xs={12} md={6}>
          <Box>
            <InputLabel sx={{ py: 0.5 }}>
              Language<span style={{ color: "red" }}> *</span>
            </InputLabel>
            <Select
              displayEmpty
              renderValue={languageValues.language !== "" ? undefined : () => <SelectPlaceholder>Set Language</SelectPlaceholder>} 
              onChange={handleSelectChange("language")}
              onKeyDown={handleAddLanguage}
              value={languageValues.language}
              error={languageValues.language === "" && errSelect}
              fullWidth
              inputProps={{ classes: { icon: classes.icon } }}
              // input={<CustomSelectInput />}
              sx={{ height: "45px"}}
              MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
              <MenuItem value="" disabled>
                Set Language
              </MenuItem>
              {languages.map((option) => (
                <MenuItem value={option} key={option} disabled={addedLanguage.some(person => person.language === option)}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {languageValues.language === "" && (
              <FormHelperText sx={{ color: "red", mb: 1 }}>
                {errSelect}
              </FormHelperText>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <InputLabel sx={{ py: 0.5 }}>
              Proficiency<span style={{ color: "red" }}> *</span>
            </InputLabel>
            <Select /* Placeholder */
              displayEmpty
              renderValue={languageValues.proficiency !== "" ? undefined : () => <SelectPlaceholder>Set Proficiency</SelectPlaceholder>} 
              onChange={handleSelectChange("proficiency")}
              onKeyDown={handleAddLanguage}
              value={languageValues.proficiency}
              error={languageValues.proficiency === "" && errSelect}
              fullWidth
              inputProps={{ classes: { icon: classes.icon } }}
              // input={<CustomSelectInput />}
              sx={{ height: "45px"}}
              MenuProps={{ classes: { paper: classes.menuPaper } }}
            >
              <MenuItem value="" disabled>
                Set Proficiency
              </MenuItem>
              {proficiencies.map((option) => (
                <MenuItem disabled={option === "Telugu" ? true : false} value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {languageValues.proficiency === "" && (
            <FormHelperText sx={{ color: "red", mb: 1 }}>
              {errSelect}
            </FormHelperText>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <FormGroup>
            <Box sx={{ display: "flex", gap: 4, ml: matches ? 0 : 4, mt: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckedChange("read")}
                    onKeyDown={handleAddLanguage}
                    name="read"
                    sx={{
                      color: "#BDBDBD",
                      "&.Mui-checked": {
                        color: "var(--clr-blue-primary)",
                      },
                    }}
                  />
                }
                label="Read"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckedChange("write")}
                    onKeyDown={handleAddLanguage}
                    name="write"
                    sx={{
                      color: "#BDBDBD",
                      "&.Mui-checked": {
                        color: "var(--clr-blue-primary)",
                      },
                    }}
                  />
                }
                label="Write"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckedChange("speak")}
                    onKeyDown={handleAddLanguage}
                    name="speak"
                    sx={{
                      color: "#BDBDBD",
                      "&.Mui-checked": {
                        color: "var(--clr-blue-primary)",
                      },
                    }}
                  />
                }
                label="Speak"
              />
            </Box>
          </FormGroup>
          {(languageValues.read === false && languageValues.write === false && languageValues.speak === false) && (
            <FormHelperText sx={{ color: "red", mb: 1, ml: 4 }}>
              {errCheck}
            </FormHelperText>
          )}
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", gap: 3, justifyContent: "flex-end", my: 2 }}>
        <Button
          sx={{ borderRadius: 16, borderWidth: "2px !important" }}
          variant="outlined"
          onClick={props.onLangClick}
        >
          Cancel
        </Button>
        <Button
          onClick={(event) => handleAddLanguage(event, "onClick")}
          sx={{ borderRadius: 16, py: 1 }}
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </Card>
  );
};

export default AddLanguage;
