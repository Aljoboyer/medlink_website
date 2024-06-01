import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  FormControl,
  TextField,
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";

function AddExperience(props) {
  return (
    <Grid item sx={{ marginBlock: "1rem" }} spacing={2}>
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
          Add Accomplishments
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: 18,
            fontWeight: 700,
            margin: "1rem",
            marginBottom: 0,
          }}
        >
          Memberships & Positions
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
              <TextField
                variant="outlined"
                rows={1}
                fullWidth
                placeholder="Position Held"
                // value={headline}
                // onChange={handleChange}
                sx={{ backgroundColor: "#ffffff" }}
              />
            </FormControl>
          </Grid>
          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                rows={1}
                fullWidth
                placeholder="Organization Name"
                // value={headline}
                // onChange={handleChange}
                sx={{ backgroundColor: "#ffffff" }}
              />
            </FormControl>
          </Grid>
          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Life Membership?
              </FormLabel>
              <RadioGroup
                row
                // error={error}
                // defaultValue={item.currentlyWorking}
                // value={values.currentlyWorking}
                // onChange={handleChange("currentlyWorking")}
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={parseInt(1)}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value={parseInt(0)}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
              {/*   {values.currentlyWorking === "" && (
                      <FormHelperText sx={{ color: "red", mt: -0.5 }}>
                        {error}
                      </FormHelperText>
                    )} */}
            </FormControl>
          </Grid>
          {/* <Grid item direction={"column"} xs={12} md={12}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                placeholder="Description"
                // value={headline}
                // onChange={handleChange}
                sx={{ backgroundColor: "#ffffff" }}
              />
            </FormControl>
          </Grid> */}
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
                  onClick={props.onClick}
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
