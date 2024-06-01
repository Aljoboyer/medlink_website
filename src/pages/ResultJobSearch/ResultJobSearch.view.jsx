import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  FormControl,
  TextField,
  Breadcrumbs,
  Link,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import porfilepic from "../../assets/profilepic.svg";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";

const theme = createTheme();
const useStyles = makeStyles({
  filteroptions: {
    marginTop: "24px",
    marginLeft: "-20px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  sortresult: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "33px",
    marginLeft: "",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "start",
    },
  },
  upperpagination: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
});

function createData(
  name,
  phone,
  email,
  location,
  experience,
  salaryrange,
  currentcompany,
  educationalqualification,
  preferredlocation,
  skills,
  verified
) {
  return {
    name,
    phone,
    email,
    location,
    experience,
    salaryrange,
    currentcompany,
    educationalqualification,
    preferredlocation,
    skills,
    verified,
  };
}

let rows = [
  createData(
    "Applicant's Name",
    "+91 9009090909",
    "manojkumar777@gmail.com",
    "Bangalore",
    7,
    "10 Lakhs and 50 Thousand",
    "Company Name X",
    "Education Details",
    "All location preferred",
    [
      "Skills no 1",
      "Skills no 2",
      "Skills no 3",
      "Skills no 4",
      "Skills no 5",
      "Skills no 6",
      "Skills no 7",
    ],
    true
  ),
  createData(
    "Applicant's Name",
    "+91 9009090909",
    "manojkumar777@gmail.com",
    "Bangalore",
    7,
    "10 Lakhs and 50 Thousand",
    "Company Name X",
    "Education Details",
    "All location preferred",
    [
      "Skills no 1",
      "Skills no 2",
      "Skills no 3",
      "Skills no 4",
      "Skills no 5",
      "Skills no 6",
      "Skills no 7",
    ],
    false
  ),
  createData(
    "Applicant's Name",
    "+91 9009090909",
    "manojkumar777@gmail.com",
    "Bangalore",
    7,
    "10 Lakhs and 50 Thousand",
    "Company Name X",
    "Education Details",
    "All location preferred",
    [
      "Skills no 1",
      "Skills no 2",
      "Skills no 3",
      "Skills no 4",
      "Skills no 5",
      "Skills no 6",
      "Skills no 7",
    ],
    false
  ),
];

const ResultJobSearch = () => {
  const classes = useStyles();
  const [form, setForm] = useState({
    jobTitle: "",
    location: "",
    qualification: "",
    employmentType: "",
    experience: "",
    lastDateToApply: new Date(),
    description: "",
    salaryRange: [0, 40000],
  });

  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e.target.name] = e.target.value;
      return __form;
    });
    console.log(form);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Box>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#E0E0E0",
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>
          Showing jobs for 'Orthologists, bangalore'{" "}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Button>
            <EditIcon />
          </Button>
          <Button
            variant="contained"
            size="medium"
            sx={{ my: 3.5, borderRadius: 1 }}
          >
            Save search result
          </Button>
        </Box>
      </Container>

      <Container
        maxWidth="xl"
        style={{ display: "flex", flexDirection: "row" }} gap={3}
      >
        <Grid item sm={3} className={classes.filteroptions}>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              bgcolor: "#E0E0E0",
              mt: 2,
              py: 1,
              px: 3,
            }}
          >
            <FilterAltTwoToneIcon style={{ height: "35px", width: "40px" }} />
            <Typography> &nbsp;  Filter</Typography>
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#F2F2F2",
              mt: 2,
              pt: 2,
              px: 3,
            }}
          >
            <Typography>Keywords</Typography>
            <ExpandMore
              // onClick={handleAdvSearch}
              style={{ height: "35px", width: "40px" }}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#F2F2F2",
              mt: 2,
              pt: 2,
              px: 3,
            }}
          >
            <Typography>Company</Typography>
            <ExpandMore
              // onClick={handleAdvSearch}
              style={{ height: "35px", width: "40px" }}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#F2F2F2",
              mt: 2,
              pt: 2,
              px: 3,
            }}
          >
            <Typography>Designation </Typography>
            <ExpandMore
              // onClick={handleAdvSearch}
              style={{ height: "35px", width: "40px" }}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#F2F2F2",
              mt: 2,
              pt: 2,
              px: 3,
            }}
          >
            <Typography>Experience </Typography>
            <ExpandMore
              // onClick={handleAdvSearch}
              style={{ height: "35px", width: "40px" }}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#F2F2F2",
              mt: 2,
              pt: 2,
              px: 3,
            }}
          >
            <Typography>CTC </Typography>
            <ExpandMore
              // onClick={handleAdvSearch}
              style={{ height: "35px", width: "40px" }}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#F2F2F2",
              mt: 2,
              pt: 2,
              px: 3,
            }}
          >
            <Typography>Functional Area </Typography>
            <ExpandMore
              // onClick={handleAdvSearch}
              style={{ height: "35px", width: "40px" }}
            />
          </Grid>
          <Button
            size="large"
            variant="standard"
            style={{
              borderRadius: "12px",
              backgroundColor: "#333333",
              color: "white",
              padding: "10px 24px 10px 24px",
              margin: "15px 0 0 30px",
              textAlign: "right",
            }}
          >
            Modify Search
          </Button>
        </Grid>

        <Grid item sm={9} xs={12} sx={{ml: 4}}>
          <Grid className={classes.sortresult}>
            <Typography>
              1 - 20 of 763 Orthologists Jobs In Bangalore
            </Typography>
            <Grid
              item
              gap={2}
              style={{
                display: "flex",
                flexDirection: "row",
                // marginTop: "-20px",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <div>
                <FormControl sx={{ m: 0, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Age
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>

          <Grid sx={{ mt: 5 }}>
            {rows.map((info, index) => (
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "#F2F2F2",
                  marginBottom: "15px",
                }}
              >                 
                <Grid>
                  {/* <Grid>
                    <img src={porfilepic} alt="" />
                  </Grid>
                  <Typography>{info.name}</Typography>
                  <Typography>{info.phone}</Typography>
                  <Typography>{info.email}</Typography>
                  <Typography>{info.location}</Typography>
                  <Typography>{info.experience}</Typography>
                  <Typography>{info.salaryrange}</Typography> */}
                </Grid>
                <Grid>
                  <Grid>
                    {/* <Typography>Current </Typography>
                    <Typography>{info.currentcompany}</Typography> */}
                  </Grid>
                  <Grid>
                    {/* <Typography>Education </Typography>
                    <Typography>{info.educationalqualification}</Typography> */}
                  </Grid>
                  <Grid>
                    {/* <Typography>Preferred Location </Typography>
                    <Typography>{info.preferredlocation}</Typography> */}
                  </Grid>
                  <Grid>
                    {/* <Typography>Skills</Typography>
                    <Grid style={{ display: "flex", flexDirection: "row" }}>
                      {info.skills.map((skill) => (
                        <Typography sx={{ mr: 3 }}>{skill}</Typography>
                      ))}
                    </Grid> */}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ResultJobSearch;
