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
  Typography,
} from "@mui/material";

const AddEducationMob = (Props) => {
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
          Add Education
        </Typography>
        <Grid
          container
          direction={"row"}
          alignItems="flex-start"
          padding={2}
          sx={{ lineHeight: 5, margin: "auto" }}
        >
          <Grid item direction={"column"} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Text</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-1"
                label="Text"
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
              <InputLabel id="demo-simple-select-label">Course</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-2"
                label="Course"
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
              <InputLabel id="demo-simple-select-label">
                Specilization
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-3"
                label="Specilization"
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
              <InputLabel id="demo-simple-select-label">
                University/Institute
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-4"
                label="University/Institute"
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
              <InputLabel id="demo-simple-select-label">
                Year of Passing
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select-5"
                label="University/Institute"
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
                Course Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="full time"
                  control={<Radio />}
                  label="Full time"
                />
                <FormControlLabel
                  value="part time"
                  control={<Radio />}
                  label="Part time"
                />
                <FormControlLabel
                  value="distance learing"
                  control={<Radio />}
                  label="Distance learning"
                />
              </RadioGroup>
            </FormControl>
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
              <CardActions
                sx={{ justifyContent: "flex-end", gap: "1rem", padding: 0 }}
              >
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained">Save</Button>
              </CardActions>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default AddEducationMob;
