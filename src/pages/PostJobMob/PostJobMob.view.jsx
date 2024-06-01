import { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Slider,
  Box,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { gqlquery, QUERY_GETMYPROFILE } from "../../api/hospitalIndex.js";
import { useNavigate } from "react-router-dom";


const PostJobMob = () => {
  const [error, setError] = useState("")
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();
  const [latlng, setLatlng] = useState({});
  const [openTips, setOpenTips] = useState(true);
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
  const [accessJobPosting, setAccessJobPosting] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);


  const handleNavigate = () => {
    navigate("/hospital-dashboard-mob");
  };

  const handleTips = () => {
    setOpenTips(!openTips);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e.target.name] = e.target.value;
      return __form;
    });
  };

  // Geolocation handle
  const getAddressObject = (address_components) => {
    const ShouldBeComponent = {
      street_number: ["street_number"],
      postal_code: ["postal_code"],
      street: ["street_address", "route"],
      province: ["administrative_area_level_1"],
      city: ["locality"],
      country: ["country"]
    };

    let address = {
      street_number: "",
      postal_code: "",
      street: "",
      province: "",
      city: "",
      country: ""
    };

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === "country") {
            address[shouldBe] = component.short_name;
          } else {
            address[shouldBe] = component.long_name;
          }
        }
      }
    });

    // Fix the shape to match our schema
    address.address = address.street_number + " " + address.street;
    delete address.street_number;
    delete address.street;
    if (address.country === "US") {
      address.state = address.province;
      delete address.province;
    }
    return address;
  };
  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address &&
        address.value &&
        (await geocodeByPlaceId(address.value.place_id));
      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0].address_components);
      setAddressObj(addressObject);
      geocodeByAddress(address?.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setLatlng({ lat, lng });
        }
        );
    };
    func();
  }, [address]);

  useEffect(() => {
    gqlquery(QUERY_GETMYPROFILE, null)
      .then((res) => res.json())
      .then((datas) => {
        setAccessJobPosting(datas?.data?.getMyProfile);
        if (datas?.data?.getMyProfile?.accessJobPosting === false) {
          setOpen(true);
          setTimeout(handleNavigate, 4000)
        }
      });

  }, []);

  // Post job handler
  const handlePostJob = () => {
    if (form.jobTitle === "" || address?.value?.structured_formatting?.main_text === undefined || form.qualification === "" || form.employmentType === "" || form.experience === "" || form.description === "" || form.salaryRange === "") {
      return setError("You need to fill the empty field!");
    } else {
      setError("")
    }
    console.log(form)
    const QUERY_POSTJOB = {
      query: `mutation MyMutation {
                  postAJob  (
                      description: "${form.description}", 
                      employmentType: "${form.employmentType}", 
                      experience: ${Number(form.experience)},
                      jobTitle: "${form.jobTitle}", 
                      lastDateToApply: "${form.lastDateToApply.toISOString().slice(0, 10)}", 
                      location: "${address?.value?.structured_formatting?.main_text}", 
                      maximumSalary: ${Number(form.salaryRange[1])},
                      minimumSalary: ${Number(form.salaryRange[0])}, 
                      qualification: "${form.qualification}",
                      primarySpecialization: "", 
                      secondarySpecialization: ""
                      ) 
                  }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_POSTJOB, null)
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas);
        if (datas?.data?.postAJob === "Inserted") {
          setTimeout(() => navigate("/manage-jobs-and-responses-mob"), 1000);
        }
        else {
          console.log("The operation was not successful.");
        }
      })
      .finally((e) => console.log("post a new job!"));
    setOpen(true);
    // setTimeout(handleNavigate, 4000);
  }



  return (
    <Box maxWidth="sm" sx={{ mx: "auto" }}>
      {accessJobPosting?.accessJobPosting ? (
        <Box>
          <Box
            sx={{
              backgroundColor: "#E0E0E0",
              padding: "15px 0 15px 17px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <ChevronLeftIcon sx={{ height: "35px", width: "40px" }} />
            <Typography
              sx={{ lineHeight: "24px", fontSize: "18px", fontWeight: "600" }}
            >
              Post A Job
            </Typography>
          </Box>
          <Grid
            sx={{
              gap: "2rem",
              marginBottom: "3rem",
              marginTop: "1.5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
              }}
            >
              {/* tips   */}
              <Grid
                container
                item
                xs={11}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#F2F2F2",
                  paddingBlock: "1rem",
                  borderRadius: "10px",
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
                    variant="h2"
                    align="left"
                    component="h2"
                    sx={{
                      fontSize: "22px",
                      fontWeight: "600",
                      color: "#333333",
                      marginLeft: "5%",
                    }}
                  >
                    TIPS
                  </Typography>
                  {openTips ? (
                    <ExpandMore
                      onClick={handleTips}
                      style={{ height: "40px", width: "45px" }}
                    />
                  ) : (
                    <ExpandLess
                      onClick={handleTips}
                      style={{ height: "45px", width: "45px" }}
                    />
                  )}
                </Box>
                <Collapse in={openTips} timeout="auto">
                  <hr
                    color="#BDBDBD"
                    height="10px"
                    width="95%"
                    style={{ marginLeft: "10px", marginRight: "20px" }}
                  />
                  <ul style={{ marginLeft: "5%", marginTop: "2%", padding: "3%" }}>
                    <li style={{ marginBottom: "4%" }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptate quia sunt quam nam harum? Necessitatibus, alias!
                      Sequi fuga error rem temporibus animi.
                    </li>
                    <li style={{ marginBottom: "4%" }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptate quia sunt quam nam harum? Necessitatibus, alias!
                      Sequi fuga error rem temporibus animi.
                    </li>
                    <li style={{ marginBottom: "4%" }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Voluptate quia sunt quam nam harum? Necessitatibus, alias!
                      Sequi fuga error rem temporibus animi.
                    </li>
                  </ul>
                </Collapse>
              </Grid>

              {/*  Post Job form */}
              <Grid
                container
                item
                xs={11}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "left",
                  backgroundColor: "#F2F2F2",
                  textAlign: "left",
                  borderRadius: "10px",
                  pt: 1,
                  pb: 2,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#333333",
                    ml: 2,
                  }}
                >
                  Post A Job
                </Typography>
                <hr
                  color="#BDBDBD"
                  height="10px"
                  width="90%"
                  style={{
                    marginLeft: "15px",
                    marginRight: "20px",
                    marginTop: "5px",
                  }}
                />
                {/*  post job form  */}
                <Grid
                  container
                  xs={12}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 12,
                  }}
                >
                  <Grid
                    item
                    xs={11}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "3%",
                      mt: 3,
                    }}
                  >
                    <FormControl fullWidth>
                      <Typography
                        variant="p"
                        sx={{ textAlign: "left", mb: 1, color: "#6F7482" }}
                      >
                        Job Title
                        <sup style={{ color: "red", fontSize: "16px" }}>*</sup>
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
                      {form.jobTitle === "" && (
                        <FormHelperText sx={{ color: "red", textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                          {error}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={11}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "3%",
                    }}
                  >
                    <FormControl fullWidth>
                      <Typography
                        variant="p"
                        sx={{ textAlign: "left", mb: 1, color: "#6F7482" }}
                      >
                        Location
                        <sup style={{ color: "red", fontSize: "16px" }}>*</sup>
                      </Typography>
                      <GooglePlacesAutocomplete
                        apiKey="AIzaSyChTcMUCY9Zw3j00st0uKkqTz0RGlOpea8"
                        placeholder="Type in an address"
                        AutocompletionRequest={{
                          bounds: [
                            { lat: 50, lng: 50 },
                            { lat: 100, lng: 100 }
                          ],
                          componentRestrictions: {
                            country: ['us', 'ca', 'uy'],
                          }
                        }}
                        selectProps={{
                          isClearable: true,
                          value: address,
                          onChange: (val) => {
                            setAddress(val);
                          },
                          styles: {
                            input: (provided) => ({
                              ...provided,
                              boxShadow: 0, borderRadius: '6px', height: "46px",
                              "&:hover": {
                                border: "1px solid purple"
                              }
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              boxShadow: 0,
                              "&:hover": {
                                border: "1px solid purple"
                              }
                            })
                          }
                        }}
                      />
                      {address?.value?.structured_formatting?.main_text === undefined && (
                        <FormHelperText sx={{ color: "red", textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                          {error}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={11}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "3%",
                    }}
                  >
                    <FormControl fullWidth>
                      <Typography
                        variant="p"
                        sx={{ textAlign: "left", mb: 1, color: "#6F7482" }}
                      >
                        Qualification
                        <sup style={{ color: "red", fontSize: "16px" }}>*</sup>
                      </Typography>
                      <Select
                        value={form.qualification}
                        onChange={formValueChange}
                        name="qualification"
                        sx={{ backgroundColor: "white", borderRadius: "6px" }}
                      >
                        <MenuItem value={"MBBS"}>MBBS</MenuItem>
                      </Select>
                      {form.qualification === "" && (
                        <FormHelperText sx={{ color: "red", textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                          {error}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={11}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "3%",
                    }}
                  >
                    <FormControl fullWidth>
                      <Typography
                        variant="p"
                        sx={{ textAlign: "left", mb: 1, color: "#6F7482" }}
                      >
                        Employment Type
                        <sup style={{ color: "red", fontSize: "16px" }}>*</sup>
                      </Typography>
                      <Select
                        value={form.employmentType}
                        onChange={formValueChange}
                        name="employmentType"
                        sx={{ backgroundColor: "white", borderRadius: "6px" }}
                      >
                        <MenuItem value={"Permanent"}>Permanent</MenuItem>
                      </Select>
                      {form.employmentType === "" && (
                        <FormHelperText sx={{ color: "red", textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                          {error}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={11}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "3%",
                    }}
                  >
                    <FormControl fullWidth>
                      <Typography
                        variant="p"
                        sx={{ textAlign: "left", mb: 1, color: "#6F7482" }}
                      >
                        Experience
                        <sup style={{ color: "red", fontSize: "16px" }}>*</sup>
                      </Typography>
                      <TextField
                        name="experience"
                        type="text"
                        variant="outlined"
                        placeholder="Text"
                        value={form.experience}
                        onChange={formValueChange}
                        sx={{ backgroundColor: "white", borderRadius: "6px" }}
                      />
                      {form.experience === "" && (
                        <FormHelperText sx={{ color: "red", textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                          {error}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={11}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "3%",
                    }}
                  >
                    <FormControl fullWidth>
                      <Typography
                        variant="p"
                        sx={{ textAlign: "left", mb: 1, color: "#6F7482" }}
                      >
                        Last Date to Apply
                        <sup style={{ color: "red", fontSize: "16px" }}>*</sup>
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          name="lastDateToApply"
                          inputFormat="dd/MM/yyyy"
                          value={form.lastDateToApply}
                          onChange={(value) => {
                            formValueChange({
                              target: {
                                name: "lastDateToApply",
                                value: new Date(value),
                              },
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              sx={{ backgroundColor: "white", borderRadius: "6px" }}
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={11}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "3%",
                    }}
                  >
                    <FormControl fullWidth>
                      <Typography
                        variant="p"
                        sx={{ textAlign: "left", mb: 1, color: "#6F7482" }}
                      >
                        Description
                        <sup style={{ color: "red", fontSize: "16px" }}>*</sup>
                      </Typography>
                      <TextField
                        name="description"
                        type="text"
                        variant="outlined"
                        placeholder="Text"
                        multiline
                        rows={5}
                        value={form.description}
                        onChange={formValueChange}
                        sx={{ backgroundColor: "white", borderRadius: "6px" }}
                      />
                      {form.description === "" && (
                        <FormHelperText sx={{ color: "red", textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                          {error}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      px: 3,
                    }}
                  >
                    <FormControl fullWidth>
                      <Typography
                        variant="p"
                        sx={{ textAlign: "left", mb: 1, color: "#6F7482" }}
                      >
                        Salary Range
                        <sup style={{ color: "red", fontSize: "16px" }}>*</sup>
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
                      {form.salaryRange === "" && (
                        <FormHelperText sx={{ color: "red", textAlign: "left", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                          You must have select a value!
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid
                    xs={12}
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "2%",
                      px: 3,

                      gap: 1.5,
                    }}
                  >
                    <Button variant="outlined" sx={{ width: "100%" }}>
                      Cancel
                    </Button>
                    <Button onClick={handlePostJob} variant="contained" sx={{ width: "100%" }}>
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>) : (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            This user does not have sufficient privileges for this page. Please contact your administrator.
          </Alert>
        </Snackbar>
      )}
      
      
    </Box>
  );
};

export default PostJobMob;
