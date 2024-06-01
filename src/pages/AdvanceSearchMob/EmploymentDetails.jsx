import * as React from "react";
import { useState } from "react";
import {
  Grid,
  FormControl,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const EmploymentDetails = () => {
  const [openEmploymentDetails, setOpenEmploymentDetails] = useState(true);
  const [form, setForm] = useState({
    jobTitle: "",
    location: "",
    qualification: "",
    employmentType: "",
    experience: "",
    lastDateToApply: new Date(),
    description: "",
    salaryRange: [0, 40000],
    filterKeyword: "",
    filterLocation: "",
    filterExperienceFrom: "",
    filterExperienceTo: "",
    filterSalaryRange: [0, 40000],
  });

  const handleEmploymentDetails = () => {
    setOpenEmploymentDetails(!openEmploymentDetails);
  };

  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e.target.name] = e.target.value;
      return __form;
    });
    console.log(form);
  };

  return (
    <Grid
      container
      sx={{
        marginBottom: "2rem", 
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Employment Details Grid  */}
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          alignItems: "left",
          backgroundColor: "#F2F2F2",
          textAlign: "left",
          paddingBlock: "1rem",
          borderRadius: "10px",
          marginBottom: "-25px",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            mx: 2,
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#333333",
              }}
            >
              Employment Details
            </Typography>
            {openEmploymentDetails ? (
              <ExpandLess
                onClick={handleEmploymentDetails}
                style={{ height: "35px", width: "40px" }}
              />
            ) : (
              <ExpandMore
                onClick={handleEmploymentDetails}
                style={{ height: "35px", width: "40px" }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Collapse in={openEmploymentDetails} timeout="auto" unmountOnExit>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F2F2F2",
            textAlign: "center",
            paddingBlock: "2rem",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: 2,
              }}
            >
              <FormControl fullWidth>
                <Typography
                  variant="p"
                  sx={{ textAlign: "left", color: "#6F7482", mb: 0.8 }}
                >
                  Function Area
                </Typography>
                <TextField
                  variant="outlined"
                  name="jobTitle"
                  type="text"
                  placeholder="Text"
                  value={form.jobTitle}
                  onChange={formValueChange}
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: 2,
              }}
            >
              <FormControl fullWidth>
                <Typography
                  variant="p"
                  sx={{ textAlign: "left", color: "#6F7482", mb: 0.8 }}
                >
                  Industry
                </Typography>
                <TextField
                  variant="outlined"
                  name="location"
                  type="text"
                  placeholder="Text"
                  value={form.location}
                  onChange={formValueChange}
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: 2,
              }}
            >
              <FormControl fullWidth>
                <Typography
                  variant="p"
                  sx={{ textAlign: "left", color: "#6F7482", mb: 0.8 }}
                >
                  Employers
                </Typography>
                <TextField
                  variant="outlined"
                  name="jobTitle"
                  type="text"
                  placeholder="Text"
                  value={form.jobTitle}
                  onChange={formValueChange}
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: 2,
              }}
            >
              <FormControl fullWidth>
                <Typography
                  variant="p"
                  sx={{ textAlign: "left", color: "#6F7482", mb: 0.8 }}
                >
                  Exclude Employers
                </Typography>
                <TextField
                  variant="outlined"
                  name="location"
                  type="text"
                  placeholder="Text"
                  value={form.location}
                  onChange={formValueChange}
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: 2,
              }}
            >
              <FormControl fullWidth>
                <Typography
                  variant="p"
                  sx={{ textAlign: "left", color: "#6F7482", mb: 0.8 }}
                >
                  Designation
                </Typography>
                <Select
                  value={form.qualification}
                  onChange={formValueChange}
                  label="qualification"
                  name="qualification"
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                >
                  <MenuItem value={"MBBS"}>MBBS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: 2,
              }}
            >
              <FormControl fullWidth>
                <Typography
                  variant="p"
                  sx={{ textAlign: "left", color: "#6F7482", mb: 0.8 }}
                >
                  Notice Period
                </Typography>
                <Select
                  value={form.qualification}
                  onChange={formValueChange}
                  label="qualification"
                  name="qualification"
                  sx={{ backgroundColor: "white", borderRadius: "6px" }}
                >
                  <MenuItem value={"MBBS"}>MBBS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default EmploymentDetails;
