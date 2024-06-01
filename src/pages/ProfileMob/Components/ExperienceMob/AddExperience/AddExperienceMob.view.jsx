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
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

function AddExperienceMob(props) {
  const [value, setValue] = useState(new Date());
  return (
    <Grid item sx={{ marginBlock: "1rem", px: 2 }} spacing={2}>
      <Card
        sx={{
          height: "100%",
        }}
      >
        <Typography
          component="h3"
          variant="h5"
          sx={{
            fontSize: 24,
            fontWeight: 600,
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
          sx={{ lineHeight: 5 }}
        >
          <Grid item direction={"column"} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Designation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-1"
                label="Designation"
                sx={{ backgroundColor: "#ffffff" }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item direction={"column"} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Hospital</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-1"
                label="Designation"
                sx={{ backgroundColor: "#ffffff" }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item direction={"column"} xs={12}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Currently working?
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid container direction={"row"} spacing={2}>
            <Grid item direction={"column"} xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year"]}
                  label="Year"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item direction={"column"} xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year"]}
                  label="Year"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid item direction={"column"} xs={12}>
            <Grid container direction={"row"} spacing={2}>
              <Grid item direction={"column"} xs={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Job Type
                  </FormLabel>
                  <RadioGroup
                    row
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
                </FormControl>
              </Grid>
              <Grid item direction={"column"} xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year"]}
                    label="Year"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item direction={"column"} xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year"]}
                    label="Year"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
          <Grid item direction={"column"} xs={12}>
            <TextField
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              placeholder="Job description"
              // value={headline}
              // onChange={handleChange}
              sx={{ backgroundColor: "#ffffff" }}
            />
          </Grid>
          <Grid
            item
            direction={"column"}
            xs={12}
            justifyContent="flex-end"
            sx={{ display: "grid" }}
          >
            <CardContent>
              <CardActions
                className="resume-actions"
                style={{ marginRight: "-20px" }}
              >
                <Button variant="outlined" className="cancel-btn">
                  Cancel
                </Button>
                <Button variant="contained" className="save-btn">
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

export default AddExperienceMob;
