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
} from "@mui/material";

function AddAccomplishmentMob(props) {
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
          Social Profiles
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
          <Grid item direction={"column"} xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                rows={1}
                fullWidth
                placeholder="Social Profile Name"
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
                placeholder="Social Profile URL"
                // value={headline}
                // onChange={handleChange}
                sx={{ backgroundColor: "#ffffff" }}
              />
            </FormControl>
          </Grid>
          <Grid item direction={"column"} xs={12} md={12}>
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

export default AddAccomplishmentMob;
