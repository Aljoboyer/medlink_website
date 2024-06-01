import * as React from "react";
import { useState } from "react";
import {
  Grid,
  FormControl,
  Typography,
  TextField,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import { Box } from "@mui/system";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function CustomizedSelects() {
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "baseline",
        alignItems: "center",
        marginTop: "35px",
      }}
    >
      <FormControl sx={{}} variant="standard">
        <Box
          style={{
            display: "flex",
            justifyContent: "baseline",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            style={{ width: "20px", height: "20px", marginRight: "13px" }}
            checked
          />
          The preffered location is
        </Box>
      </FormControl>
    </div>
  );
}

const AdvSearch = () => {
  const [openAdvSearch, setOpenAdvSearch] = useState(true);
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

  const handleAdvSearch = () => {
    setOpenAdvSearch(!openAdvSearch);
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
        // gap: "1rem",
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* Advance search */}
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
              Advance Search
            </Typography>
            {openAdvSearch ? (
              <ExpandLess
                onClick={handleAdvSearch}
                style={{ height: "35px", width: "40px" }}
              />
            ) : (
              <ExpandMore
                onClick={handleAdvSearch}
                style={{ height: "35px", width: "40px" }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <Collapse in={openAdvSearch} timeout="auto" unmountOnExit>
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
                  Any Keywords
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
                  All Keywords (Must Have)
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
                  Experience (From)
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
                  Experience (From)
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
                  Employment Type
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
                  Last Active
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
                  Current Location
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
                textAlign: "left",
              }}
            >
              <FormControl
                fullWidth
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <CustomizedSelects sx={{}} />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={11}
              sx={{
                display: "flex",
                flexDirection: "column",
                mx: 2.5,
              }}
            >
              <FormControl fullWidth>
                <Typography
                  variant="p"
                  sx={{ textAlign: "left", color: "#6F7482", mb: 0.2 }}
                >
                  Salary Range
                </Typography>
                <Slider
                  name="salaryRange"
                  getAriaLabel={() => "Salary range"}
                  onChange={formValueChange}
                  valueLabelDisplay="auto"
                  value={form.salaryRange}
                  min={0}
                  max={40000}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 40000, label: "40000" },
                  ]}
                  sx={{
                    "& .MuiSlider-thumb": {
                      height: 24,
                      width: 24,
                      color: "white",
                    },
                    "& .MuiSlider-track": {
                      height: 10,
                      color: "#80828282",
                    },
                    "& .MuiSlider-rail": {
                      height: 10,
                      color: "white",
                    },
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default AdvSearch;
