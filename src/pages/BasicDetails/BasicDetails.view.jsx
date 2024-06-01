import {
  Button,
  Card, 
  Container, 
  FormHelperText, 
  Grid,
  MenuItem,
  Select, 
  Typography,
  InputBase,
  InputLabel,
  Input, 
  Stack, 
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
// import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import homeBanner from "../../assets/images/doctors_home_banner.png";
import ProfileSnap from "../../components/ProfileSnap/profileSnap.view";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

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

// Custom style for Select dropdown
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 180,
  },
  icon: {
    fill: "var(--clr-blue-footer)",
  },
}));

// Customize Ant switch
const CustomAntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "var(--clr-blue-secondary)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "var(--clr-blue-primary)",
    boxSizing: "border-box",
  },
}));

const BasicDetails = () => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const onClick = (e) => {
    e.preventDefault();
    // setFlag((prevData) => !prevData);
    // setShowUpdateCareerScreen((prevData) => !prevData);
  };

  const [values, setValues] = useState({
    name: "",
    specialization: "",
    experienceYears: "",
    experienceMonths: "",
    salaryLacs: "",
    salaryThousand: "",
    email: "",
    mobile: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [errInput, setErrInput] = useState("");
  document.title = "Basic Details | MedLink Jobs";

  //   const [updateList, setUpdateList] = useState(false);
  //   const [showUpdateCareerScreen, setShowUpdateCareerScreen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleBasicDetails = () => {
    if (values.name === "") {
      setErrInput("Text field can not be empty.");
    } else if (values.specialization === "") {
      setErrInput("Text field can not be empty.");
    } else if (values.email === "") {
      setErrInput("Text field can not be empty.");
    } else if (values.mobile === "") {
      setErrInput("Text field can not be empty.");
    } else {
      setErrInput("");
    }

    if (
      values.experienceYears === "" ||
      values.experienceMonths === "" ||
      values.salaryLacs === "" ||
      values.salaryThousand === "" ||
      values.location === ""
    ) {
      return setError("Please, select an option.");
    }
    /*    console.log("values", values);
           setValues(values); */

    /* when need to use server */
    values.name = "";
    values.specialization = "";
    values.experienceYears = "";
    values.experienceMonths = "";
    values.salaryLacs = "";
    values.salaryThousand = "";
    values.email = "";
    values.mobile = "";
    values.location = "";

    setErrInput("");
    setError("");
  };
  // console.log("values", values);

  /* const CareerScreen = (item) => {
      // e.preventDefault();
      setShowUpdateCareerScreen((prevData) => !prevData);
      setCareerItem(careerItem);
    };
*/
  return (
    <Box>
      <Box
        style={{
          backgroundImage: `url(${homeBanner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        sx={{ bgcolor: "#E0E0E0", height: "240px" }}
      ></Box>
      <Container sx={{ mx: "auto", marginTop: "-120px" }}>
        <ProfileSnap />
        <Box maxWidth="md" sx={{ mx: "auto", mb: 5 }}>
          <Card
            sx={{
              backgroundColor: "var(--clr-white) !important",
              boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
              borderRadius: 2,
              minHeight: 400,
              p: 2.5,
            }}
          >
            <Typography
              component="div"
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "var(--clr-blue-footer)",
                mb: 4,
              }}
            >
              Basic Details
            </Typography>
            <Grid
              container
              direction={"row"}
              alignItems="flex-start"
              justifyContent={"space-between"}
              rowSpacing={2.5}
              columnSpacing={4}
            >
              <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Name<span style={{ color: "red" }}> *</span>
                  </InputLabel>
                  <Input
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                    value={values.name}
                    onChange={handleChange("name")}
                    fullWidth
                    error={values.name === "" && errInput}
                    helpertext={error}
                    placeholder="Text"
                    disableUnderline
                  />

                  {values.name === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {errInput}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Specialization<span style={{ color: "red" }}> *</span>
                  </InputLabel>
                  <Input
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                    value={values.specialization}
                    onChange={handleChange("specialization")}
                    fullWidth
                    error={values.specialization === "" && errInput}
                    helpertext={error}
                    placeholder="Text"
                    disableUnderline
                  />
                  {values.specialization === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {errInput}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <Grid container rowSpacing={2.5} columnSpacing={4}>
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Experience(Years)
                        <span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        fullWidth
                        error={values.experienceYears === "" && error}
                        value={values.experienceYears}
                        onChange={handleChange("experienceYears")}
                        displayEmpty
                        inputProps={{ classes: { icon: classes.icon } }}
                        input={<CustomSelectInput />}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        <MenuItem value={"0 to 5 Lakhs"}>0 to 5 Lakhs</MenuItem>
                        <MenuItem value={"5 Lakhs to 10 Lakhs"}>
                          5 Lakhs to 10 Lakhs
                        </MenuItem>
                        <MenuItem value={"10 Lakhs to 20 Lakhs"}>
                          10 Lakhs to 20 Lakhs
                        </MenuItem>
                        <MenuItem value={"20 Lakhs to 50 Lakhs"}>
                          20 Lakhs to 50 Lakhs
                        </MenuItem>
                        <MenuItem value={"50 Lakhs above"}>
                          50 Lakhs above
                        </MenuItem>
                      </Select>
                      {values.experienceYears === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Experience(Months)
                        <span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        fullWidth
                        error={values.experienceMonths === "" && error}
                        value={values.experienceMonths}
                        onChange={handleChange("experienceMonths")}
                        displayEmpty
                        inputProps={{ classes: { icon: classes.icon } }}
                        input={<CustomSelectInput />}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        <MenuItem value={"0 to 5 Lakhs"}>0 to 5 Lakhs</MenuItem>
                        <MenuItem value={"5 Lakhs to 10 Lakhs"}>
                          5 Lakhs to 10 Lakhs
                        </MenuItem>
                        <MenuItem value={"10 Lakhs to 20 Lakhs"}>
                          10 Lakhs to 20 Lakhs
                        </MenuItem>
                        <MenuItem value={"20 Lakhs to 50 Lakhs"}>
                          20 Lakhs to 50 Lakhs
                        </MenuItem>
                        <MenuItem value={"50 Lakhs above"}>
                          50 Lakhs above
                        </MenuItem>
                      </Select>
                      {values.experienceMonths === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <Grid container rowSpacing={2.5} columnSpacing={4}>
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Salary(Lacs)<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        fullWidth
                        error={values.salaryLacs === "" && error}
                        value={values.salaryLacs}
                        onChange={handleChange("salaryLacs")}
                        displayEmpty
                        inputProps={{ classes: { icon: classes.icon } }}
                        input={<CustomSelectInput />}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        <MenuItem value={"0 to 5 Lakhs"}>0 to 5 Lakhs</MenuItem>
                        <MenuItem value={"5 Lakhs to 10 Lakhs"}>
                          5 Lakhs to 10 Lakhs
                        </MenuItem>
                        <MenuItem value={"10 Lakhs to 20 Lakhs"}>
                          10 Lakhs to 20 Lakhs
                        </MenuItem>
                        <MenuItem value={"20 Lakhs to 50 Lakhs"}>
                          20 Lakhs to 50 Lakhs
                        </MenuItem>
                        <MenuItem value={"50 Lakhs above"}>
                          50 Lakhs above
                        </MenuItem>
                      </Select>
                      {values.salaryLacs === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                  <Grid item direction={"column"} xs={12} md={6}>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Salary(Thousand)<span style={{ color: "red" }}> *</span>
                      </InputLabel>
                      <Select
                        fullWidth
                        error={values.salaryThousand === "" && error}
                        value={values.salaryThousand}
                        onChange={handleChange("salaryThousand")}
                        displayEmpty
                        inputProps={{ classes: { icon: classes.icon } }}
                        input={<CustomSelectInput />}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                          Select
                        </MenuItem>
                        <MenuItem value={"0 to 5 Lakhs"}>0 to 5 Lakhs</MenuItem>
                        <MenuItem value={"5 Lakhs to 10 Lakhs"}>
                          5 Lakhs to 10 Lakhs
                        </MenuItem>
                        <MenuItem value={"10 Lakhs to 20 Lakhs"}>
                          10 Lakhs to 20 Lakhs
                        </MenuItem>
                        <MenuItem value={"20 Lakhs to 50 Lakhs"}>
                          20 Lakhs to 50 Lakhs
                        </MenuItem>
                        <MenuItem value={"50 Lakhs above"}>
                          50 Lakhs above
                        </MenuItem>
                      </Select>
                      {values.salaryThousand === "" && (
                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                          {error}
                        </FormHelperText>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Email<span style={{ color: "red" }}> *</span>
                  </InputLabel>
                  <Input
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                    value={values.email}
                    onChange={handleChange("email")}
                    fullWidth
                    error={values.email === "" && errInput}
                    helpertext={error}
                    placeholder="Text"
                    disableUnderline
                  />
                  {values.email === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {errInput}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Mobile<span style={{ color: "red" }}> *</span>
                  </InputLabel>
                  <Input
                    variant="outlined"
                    sx={{ borderRadius: 1 }}
                    value={values.mobile}
                    onChange={handleChange("mobile")}
                    fullWidth
                    error={values.mobile === "" && errInput}
                    helpertext={error}
                    placeholder="Text"
                    disableUnderline
                  />
                  {values.mobile === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {errInput}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ py: 0.5 }}>
                    Location<span style={{ color: "red" }}> *</span>
                  </InputLabel>
                  <Select
                    fullWidth
                    error={values.location === "" && error}
                    value={values.location}
                    onChange={handleChange("location")}
                    displayEmpty
                    inputProps={{ classes: { icon: classes.icon } }}
                    input={<CustomSelectInput />}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>
                      Select
                    </MenuItem>
                    <MenuItem value={"Andhra Pradesh"}>Andhra Pradesh</MenuItem>
                    <MenuItem value={"Arunachal Pradesh"}>
                      Arunachal Pradesh
                    </MenuItem>
                    <MenuItem value={"Assam"}>Assam</MenuItem>
                    <MenuItem value={"Andaman and Nicobar Islands"}>
                      Andaman and Nicobar Islands
                    </MenuItem>
                    <MenuItem value={"Bihar"}>Bihar</MenuItem>
                    <MenuItem value={"Chattisgarh"}>Chattisgarh</MenuItem>
                    <MenuItem value={"Chandigarh"}>Chandigarh</MenuItem>
                    <MenuItem value={"Dadra and Nagar Haveli and Daman & Diu"}>
                      Dadra and Nagar Haveli and Daman & Diu
                    </MenuItem>
                    <MenuItem value={"Goa"}>Goa</MenuItem>
                    <MenuItem value={"Gujarat"}>Gujarat</MenuItem>
                    <MenuItem value={"Haryana"}>Haryana</MenuItem>
                    <MenuItem value={"Himachal Pradesh"}>
                      Himachal Pradesh
                    </MenuItem>
                    <MenuItem value={"Jharkhand"}>Jharkhand</MenuItem>
                    <MenuItem value={"Jammu & Kashmir"}>
                      Jammu & Kashmir
                    </MenuItem>
                    <MenuItem value={"Karnataka"}>Karnataka</MenuItem>
                    <MenuItem value={"Kerala"}>Kerala</MenuItem>
                    <MenuItem value={"Ladakh"}>Ladakh</MenuItem>
                    <MenuItem value={"Lakshadweep"}>Lakshadweep</MenuItem>
                    <MenuItem value={"Madhya Pradesh"}>Madhya Pradesh</MenuItem>
                    <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
                    <MenuItem value={"Manipur"}>Manipur</MenuItem>
                    <MenuItem value={"Meghalaya"}>Meghalaya</MenuItem>
                    <MenuItem value={"Mizoram"}>Mizoram</MenuItem>
                    <MenuItem value={"Nagaland"}>Nagaland</MenuItem>
                    <MenuItem value={"Odisha"}>Odisha</MenuItem>
                    <MenuItem value={"Punjab"}>Punjab</MenuItem>
                    <MenuItem value={"Puducherry"}>Puducherry</MenuItem>
                    <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
                    <MenuItem value={"Sikkim"}>Sikkim</MenuItem>
                    <MenuItem value={"Tamil Nadu"}>Tamil Nadu</MenuItem>
                    <MenuItem value={"Telangana"}>Telangana</MenuItem>
                    <MenuItem value={"Tripura"}>Tripura</MenuItem>
                    <MenuItem value={"The Government of NCT of Delhi"}>
                      The Government of NCT of Delhi
                    </MenuItem>
                    <MenuItem value={"Uttarakhand"}>Uttarakhand</MenuItem>
                    <MenuItem value={"Uttar Pradesh"}>Uttar Pradesh</MenuItem>
                    <MenuItem value={"West Bengal"}>West Bengal</MenuItem>
                  </Select>
                  {values.location === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {error}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
              <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ py: 0.5, mb: 1.5 }}>
                    Actively Searching
                  </InputLabel>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>NO</Typography>
                    <CustomAntSwitch
                      inputProps={{ "aria-label": "ant design" }}
                    />
                    <Typography>YES</Typography>
                  </Stack>
                </Box>
              </Grid>
              <Grid item direction={"column"} xs={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 3,
                    my: 2.5,
                  }}
                >
                  <Button
                    sx={{
                      borderRadius: 16,
                      borderWidth: "2px !important",
                      px: 5,
                      py: 1.3,
                    }}
                    variant="outlined"
                    onClick={onClick}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{
                      borderRadius: 16,
                      borderWidth: "2px",
                      px: 5,
                      py: 1.2,
                    }}
                    variant="contained"
                    onClick={handleBasicDetails}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default BasicDetails;
