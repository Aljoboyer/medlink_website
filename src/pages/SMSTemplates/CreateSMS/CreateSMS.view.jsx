import {
  FormHelperText,
  Box,
  Breadcrumbs,
  Typography,
  FormControl,
  InputAdornment,
  IconButton,
  Input,
  Link,
  TextField,
  InputLabel,
  Divider,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import codesignimage from "../../../assets/codesign.svg";
import React from "react";
import CodeIcon from '@mui/icons-material/Code';

const useStyles = makeStyles(() => ({
  pageTitle: {
    fontWeight: "600 !important",
    color: "var(--clr-blue-footer)",
  },
  noBorder: {
    border: "none",
  },
  saveEmail: {
    color: "var(--clr-white)",
    borderRadius: "55px",
  },
  cancelButton: {
    borderRadius: "50px", 
    color: "var(--clr-blue-primary)", 
    fontWeight: "600", 
    border: "2px solid var(--clr-blue-primary)"
  }, 
}));

const CreateSMS = () => {
  const classes = useStyles();
  document.title = "Create SMS Template | MedLink Jobs";

  return (
    <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
      <Box style={{ marginTop: "15px", marginBottom: "20px" }}>
        <Breadcrumbs
          separator={<NavigateNextIcon style={{ color: "var(--clr-blue-footer)" }} fontSize="small" />}
          aria-label="breadcrumb"
          style={{ marginBottom: "30px", marginTop: "15px" }}
        >
          <Link underline="hover" style={{ color: "var(--clr-blue-footer)" }}
            to="/hospital-dashboard">
            Home
          </Link>
          <Link underline="hover" style={{ color: "var(--clr-blue-footer)" }} href="/jobs-and-responses">
            {"Resume Database"}
          </Link>
          <Link underline="hover" style={{ color: "var(--clr-blue-footer)" }} href="/sms-templates">
            {"SMS Templates"}
          </Link>
          <Typography style={{ color: "var(--clr-blue-footer)" }}> Create SMS Templates </Typography>
        </Breadcrumbs>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            className={classes.pageTitle}
          >
            Create SMS Template
          </Typography>
        </Box>
      </Box>

      <Box sx={{ bgcolor: "var(--clr-white)", pt: 1.5, pb: 4, boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)", borderRadius: "6px" }}>
        <Box>
          <Box sx={{ mr: 2, mx: 3 }} variant="outlined">
            <InputLabel sx={{ py: 0.5, pl: 0.5 }}>
              SMS Template Title
            </InputLabel>
            <Input
              sx={{
                width: "300px",
                borderRadius: "6px",
              }}
              disableUnderline
              id="outlined-adornment-password"
              type="text"
              // value={values.password}
              // onChange={handleChange("password")}
              placeholder=" Create folder..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    {/* {values.searchUser} */}
                    {/* <SearchIcon /> */}
                  </IconButton>
                </InputAdornment>
              }
              label="Search User"
            />
          </Box>
        </Box>

        <Divider   
          style={{ marginTop: "14px", marginBottom: "25px", color: "#E4EEF5" }}
        />

        <Box sx={{ mx: 3, width: "60%", border: "1px solid #E4EEF5", borderRadius: "8px" }}>
          <Button style={{ margin: "8px 0 0px 8px" }}>
            <Typography
              sx={{
                bgcolor: "var(--clr-blue-light)",
                color: "black",
                py: 0.6,
                px: 2,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center"
              }}
            >
              <CodeIcon style={{color: "var(--clr-blue-footer)"}} /> &nbsp;&nbsp; <span style={{color: "var(--clr-blue-footer)", fontWeight: "600"}}>Insert Shortcode</span> 
            </Typography>
          </Button>
          <Divider   
          style={{ marginTop: "6px", marginBottom: "0px", color: "#E4EEF5" }}
        /> 
          <Box sx={{ width: "100%", bgcolor: "white" }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              id="phoneNumber"
              disableUnderline={false}
              // label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              autoFocus
              rows={8}
              classes={{ notchedOutline: classes.input }}
              // onChange={handlePhoneNumberChange}
              className={classes.textField}
              placeholder="Phone Number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <AccountCircle /> */}
                  </InputAdornment>
                ),
                classes: { notchedOutline: classes.noBorder },
              }}
            />
          </Box>

          {/* <FormControl
            sx={{ mr: 2, width: "100%", minHeight: "150px" }}
            variant="standard"
            multiline
          >
            <Input
              variant="outlined"
              multiline
              sx={{
                px: 1,
                py: 0.4,
                backgroundColor: "white",
                border: "none",
                borderRadius: "3px",
                borderBottom: "none",
              }}
              disableUnderline
              id="outlined-adornment-password"
              type="text"
              // value={values.password}
              // onChange={handleChange("password")}
              placeholder="Create folder..."
              label="Search User"
            />
          </FormControl> */}
        </Box>
        <Box sx={{ mx: 3, mt: 8, width: "60%" }}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: "15px" }}
          >
            <Button variant="outlined" className={classes.cancelButton}>Cancel</Button>
            <Button variant="contained" className={classes.saveEmail}>Save Template</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateSMS;
