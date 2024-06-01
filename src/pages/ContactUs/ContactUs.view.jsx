import {
  Box,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
  Button,
  FormHelperText,
  Input,
  TextField,
  Skeleton
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import React, { useState, useEffect } from "react";
import homeBanner from "../../assets/images/doctors_home_banner.png";
import { useLocation } from "react-router-dom";

// const locations = [
//   "Kalkata",
//   "Dehli",
//   "Mombai",
//   "Bangalore",
//   "Bihar",
//   "Chennai",
// ];

const ContactUs = () => {
  const { pathname } = useLocation();
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();
  const [loadingSkleton, setLoadingSkleton] = useState(true);
  const [values, setValues] = useState({
    lookingFor: null,
    name: "",
    companyName: "",
    email: "",
    contactNumber: "",
    location: "",
    designation: "",
  });
  const [error, setError] = useState("");
  const [errRadio, setErrRadio] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [latlng, setLatlng] = useState({});
  document.title = "Contact Us | MedLink Jobs";

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getAdressObject = (address_components) => {
    const shouldBeComponent = {
      street_number: ["street_number"],
      postal_code: ["postal_code"],
      street: ["street_address", "route"],
      province: ["administrative_area_level_1"],
      city: ["locality"],
      country: ["country"],
    };
    let address = {
      street_number: "",
      postal_code: "",
      street: "",
      province: "",
      city: "",
      country: "",
    };
    address_components.forEach((component) => {
      for (var shouldBe in shouldBeComponent) {
        if (shouldBeComponent[shouldBe].indexOf(component?.type[0]) !== -1) {
          if (shouldBe === "country") {
            address[shouldBe] = component?.short_name;
          } else {
            address[shouldBe] = component?.long_name;
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
    setTimeout(() => {
      setLoadingSkleton(false);
    }, 2500)
  }, []);

  useEffect(() => {
    const func = async () => {
      const geocodeObject =
        address &&
        address.value &&
        (await geocodeByPlaceId(address.value.place_id));
      const addressObject =
        geocodeObject && getAdressObject(geocodeObject[0].address_components);
      setAddressObj(addressObject);
      geocodeByAddress(address?.label)
        .then((result) => getLatLng(result[0]))
        .then(({ lat, lng }) => {
          setLatlng({ lat, lng });
          console.log("64 Successfully got latitude and longitude");
        });
    };
    func();
  }, [address]);
  console.log("latlang", latlng);

  const handleContactUs = () => {
    // values.location = address?.value?.structured_formatting?.main_text;

    if (values.lookingFor === null) {
      setErrRadio("Please select what you looking for!");
    }
    if (address?.value?.structured_formatting?.main_text === undefined) {
      setErrAddress("You must be need to select company location.");
    }
    if (
      values.name === "" ||
      values.companyName === "" ||
      values.email === "" ||
      values.contactNumber === "" ||
      values.location === "" ||
      values.designation === ""
    ) {
      return setError("Text-Field Can't be Empty");
    }

    console.log(values);
    console.log(address);

    setErrRadio("");
    setErrAddress("");
    setError("");
  };

  return (
        <Box>
        {/* this component for lerge screen */}
        {
           !loadingSkleton ? (
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Box sx={{ mb: 13 }}>
            <Box
              style={{
                backgroundImage: `url(${homeBanner})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              sx={{ bgcolor: "#E0E0E0", height: "240px" }}
            ></Box>
            <Box
              maxWidth="md"
              sx={{
                marginTop: "-100px",
                mx: "auto",
              }}
            >
              <Box
                sx={{
                  bgcolor: "var(--clr-white)",
                  boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                  p: 2.5,
                  borderRadius: 1,
                  mb: 3,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    color: "var(--clr-blue-footer)",
                  }}
                >
                  Contact Us
                </Typography>
                <Grid
                  sx={{ mt: 0.5 }}
                  container
                  rowSpacing={4}
                  columnSpacing={8}
                >
                  <Grid item xs={12}>
                    <InputLabel sx={{ pb: 0.5 }}>I am looking for</InputLabel>
                    <RadioGroup
                      onChange={handleChange("lookingFor")}
                      value={values.lookingFor}
                      error={errRadio}
                      row
                      name="row-radio-buttons-looking-for"
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <FormControlLabel
                        sx={{ color: "#3B4256" }}
                        value="Recruitment Solutions"
                        control={<Radio
                          sx={{
                            color: "var(--clr-blue-light)",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary)",
                            },
                          }}
                        />}
                        label="Recruitment Solutions"
                      />
                      <FormControlLabel
                        sx={{ color: "#3B4256" }}
                        value="Job Opportunities"
                        control={<Radio
                          sx={{
                            color: "var(--clr-blue-light)",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary)",
                            },
                          }}
                        />}
                        label="Job Opportunities"
                      />
                      <FormControlLabel
                        sx={{ color: "#3B4256" }}
                        value="Job Posting"
                        control={<Radio
                          sx={{
                            color: "var(--clr-blue-light)",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary)",
                            },
                          }}
                        />}
                        label="Job Posting"
                      />
                      <FormControlLabel
                        sx={{ color: "#3B4256" }}
                        value="Branding Solutions"
                        control={<Radio
                          sx={{
                            color: "var(--clr-blue-light)",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary)",
                            },
                          }}
                        />}
                        label="Branding Solutions"
                      />
                    </RadioGroup>
                    {values.lookingFor === null && (
                      <FormHelperText sx={{ color: "red" }}>
                        {errRadio}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel sx={{ pb: 0.5 }}>Name&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                    <TextField
                      disableUnderline
                      onChange={handleChange("name")}
                      value={values.name}
                      error={error}
                      placeholder="Enter Name"
                      type="text"
                      fullWidth
                      sx={{
                        color: "var(--clr-blue-footer)",
                        borderRadius: 1,
                      }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": { 
                            padding: '12.5px 14px',
                          },
                          /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-light)",
                          },
                          "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-primary)",
                            },
                          }, */
                        }
                      }}
                    />
                    {values.name === "" && (
                      <FormHelperText sx={{ color: "red" }}>
                        {error}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel sx={{ pb: 0.5 }}>Company Name&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                    <TextField
                      disableUnderline
                      onChange={handleChange("companyName")}
                      value={values.companyName}
                      error={error}
                      placeholder="Enter Company Name"
                      type="text"
                      fullWidth
                      sx={{
                        color: "var(--clr-blue-footer)",
                        borderRadius: 1,
                      }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": { 
                            padding: '12.5px 14px',
                          },
                          /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-light)",
                          },
                          "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-primary)",
                            },
                          }, */
                        }
                      }}
                    />
                    {values.companyName === "" && (
                      <FormHelperText sx={{ color: "red" }}>
                        {error}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel sx={{ pb: 0.5 }}>Email&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                    <TextField
                      disableUnderline
                      onChange={handleChange("email")}
                      value={values.email}
                      error={error}
                      placeholder="Enter Email Address"
                      type="email"
                      fullWidth
                      sx={{
                        color: "var(--clr-blue-footer)",
                        borderRadius: 1,
                      }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": { 
                            padding: '12.5px 14px',
                          },
                          /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-light)",
                          },
                          "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-primary)",
                            },
                          }, */
                        }
                      }}
                    />
                    {values.email === "" && (
                      <FormHelperText sx={{ color: "red" }}>
                        {error}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel sx={{ pb: 0.5 }}>Contact Number&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                    <TextField
                      disableUnderline
                      onChange={handleChange("contactNumber")}
                      value={values.contactNumber}
                      error={error}
                      placeholder="Enter Contact Number"
                      type="tel"
                      fullWidth
                      sx={{
                        color: "var(--clr-blue-footer)",
                        borderRadius: 1,
                      }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": { 
                            padding: '12.5px 14px',
                          },
                          /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-light)",
                          },
                          "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-primary)",
                            },
                          }, */
                        }
                      }}
                    />
                    {values.email === "" && (
                      <FormHelperText sx={{ color: "red" }}>
                        {error}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel sx={{ pb: 0.5 }}>Company Location&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                    <TextField
                      disableUnderline
                      onChange={handleChange("location")}
                      value={values.location}
                      error={error}
                      placeholder="Enter Location"
                      type="text"
                      fullWidth
                      sx={{
                        color: "var(--clr-blue-footer)",
                        borderRadius: 1,
                      }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": { 
                            padding: '12.5px 14px',
                          },
                          /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-light)",
                          },
                          "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-primary)",
                            },
                          }, */
                        }
                      }}
                    />
                    {values.location === "" && (
                      <FormHelperText sx={{ color: "red" }}>
                        {error}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel sx={{ pb: 0.5 }}>Designation&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                    <TextField
                      disableUnderline
                      onChange={handleChange("designation")}
                      value={values.designation}
                      error={error}
                      placeholder="Enter Your Designation"
                      type="Text"
                      fullWidth
                      sx={{
                        color: "var(--clr-blue-footer)",
                        borderRadius: 1,
                      }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": { 
                            padding: '12.5px 14px',
                          },
                          /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-light)",
                          },
                          "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-primary)",
                            },
                          }, */
                        }
                      }}
                    />
                    {values.designation === "" && (
                      <FormHelperText sx={{ color: "red" }}>
                        {error}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
                <Box sx={{ textAlign: "center", pt: 4, pb: 1 }}>
                  <Button
                    onClick={handleContactUs}
                    variant="contained"
                    sx={{ borderRadius: 16, width: 300 }}
                    fullWidth
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  bgcolor: "var(--clr-white)",
                  py: 1.3,
                  px: 2.5,
                  borderRadius: 1,
                  boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)"
                }}
              >
                <Grid container>
                  <Grid item xs={6} sx={{ borderRight: "1px solid var(--clr-blue-footer)" }}>
                    <Typography
                      variant="caption"
                      component={InputLabel}
                    >
                      Sale Enquires
                    </Typography>
                    <Grid
                      container
                      justifyContent="flex-start"
                      alignItems="center"
                      sx={{ gap: "1rem", my: 1 }}
                    >
                      <Grid
                        item
                        sx={{
                          backgroundColor: "var(--clr-blue-footer)",
                          padding: "5px",
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <PhoneIcon fontSize="small" sx={{ color: "#FFFFFF" }} />
                      </Grid>
                      <Grid item>
                        <Typography
                          component="p"
                          sx={{
                            display: "block",
                            lineHeight: "30px",
                            color: "#828282",
                            fontSize: "20px",
                          }}
                        >
                          +91-040-35704798
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justifyContent="flex-start"
                      alignItems="center"
                      sx={{ gap: "1rem", my: 2.5}}
                    >
                      <Grid
                        item
                        sx={{
                          backgroundColor: "var(--clr-blue-footer)",
                          padding: "5px",
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <EmailIcon fontSize="small" sx={{ color: "#FFFFFF" }} />
                      </Grid>
                      <Grid item>
                        <Typography
                          component="p"
                          sx={{
                            display: "block",
                            lineHeight: "30px",
                            color: "#828282",
                            fontSize: "20px",
                          }}
                        >
                          sales@medlinkjobs.com
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} sx={{ borderLeft: "1.5px solid var(--clr-blue-footer)", pl: 10 }}>
                    <Typography
                      component={InputLabel}
                      variant="caption"
                    >
                      Customer Support
                    </Typography>
                    <Grid
                      container
                      justifyContent="flex-start"
                      alignItems="center"
                      sx={{ gap: "1rem", my: 1 }}
                    >
                      <Grid
                        item
                        sx={{
                          backgroundColor: "var(--clr-blue-footer)",
                          padding: "5px",
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <PhoneIcon fontSize="small" sx={{ color: "#FFFFFF" }} />
                      </Grid>
                      <Grid item>
                        <Typography
                          component="p"
                          sx={{
                            display: "block",
                            lineHeight: "30px",
                            color: "#828282",
                            fontSize: "20px",
                          }}
                        >
                          +91-040-35704798
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justifyContent="flex-start"
                      alignItems="center"
                      sx={{ gap: "1rem", my: 2.5 }}
                    >
                      <Grid
                        item
                        sx={{
                          backgroundColor: "var(--clr-blue-footer)",
                          padding: "5px",
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <EmailIcon fontSize="small" sx={{ color: "#FFFFFF" }} />
                      </Grid>
                      <Grid item>
                        <Typography
                          component="p"
                          sx={{
                            display: "block",
                            lineHeight: "30px",
                            color: "#828282",
                            fontSize: "20px",
                          }}
                        >
                          support@medlinkjobs.com
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
             ) : (
              <Box>
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Box sx={{ mb: 13 }}>
                     <Skeleton width={"100%"} height={300} sx={{mt: "-50px"}}/>
                     <Box
                        maxWidth="md"
                        sx={{
                          marginTop: "-100px",
                          mx: "auto",
                        }}
                      >
                        <Box
                        sx={{
                          bgcolor: "var(--clr-white)",
                          boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                          p: 2.5,
                          borderRadius: 1,
                          mb: 3,
                        }}
                      >
                        <Skeleton width={140} height={60}/>
                      <Grid
                        sx={{ mt: 0.5 }}
                        container
                        rowSpacing={4}
                        columnSpacing={8}
                      >
                       <Grid item xs={12}>
                       <Skeleton width={"100%"} height={60}/>
                       </Grid>
                       <Grid item xs={6}>
                       <Skeleton width={"100%"} height={65}/>
                       </Grid>
                       <Grid item xs={6}>
                       <Skeleton width={"100%"} height={65}/>
                       </Grid>
                       <Grid item xs={6}>
                       <Skeleton width={"100%"} height={65}/>
                       </Grid>
                       <Grid item xs={6}>
                       <Skeleton width={"100%"} height={65}/>
                       </Grid>
                       <Grid item xs={6}>
                       <Skeleton width={"100%"} height={65}/>
                       </Grid>
                       <Grid item xs={6}>
                       <Skeleton width={"100%"} height={65}/>
                       </Grid>
                       <Grid item xs={12}>
                       <Skeleton width={"100%"} height={65}/>
                       </Grid>
                      </Grid>
                      </Box>
                      <Box sx={{
                          bgcolor: "var(--clr-white)",
                          boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                          p: 1.5,
                          borderRadius: 1
                        }}>
                        <Skeleton width={"100%"} height={250} sx={{mt: "-60px"}}></Skeleton>
                      </Box>
                    </Box>
                    </Box>
                  </Box>
              </Box>
            )
          }

        {/* This component for small screen */}
        {
      !loadingSkleton ? (
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Box sx={{ mx: "auto" }}>
            {/* page Title */}
            <Box
              sx={{
                backgroundColor: "var(--clr-blue-light)",
                padding: "15px 0 15px 17px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Typography variant="h6" sx={{ lineHeight: "24px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>
                Contact Us
              </Typography>
            </Box>
  
            {/* Input form */}
            <Box sx={{ px: 2, py: 2.5 }}>
              <Box sx={{ mt: 1, backgroundColor: "var(--clr-white)", display: "flex", flexDirection: "column", px: 1.5, pt: 2, pb: 2.5, gap: 2, borderRadius: 1, border: "1px solid var(--clr-blue-light)" }}>
                <Box>
                  <InputLabel sx={{ pb: 0.5 }}>I am looking for</InputLabel>
                  <RadioGroup
                    onChange={handleChange("lookingFor")}
                    value={values.lookingFor}
                    error={errRadio}
                    row
                    name="row-radio-buttons-looking-for"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <FormControlLabel
                      sx={{ color: "#3B4256" }}
                      value="Recruitment Solutions"
                      control={<Radio
                        sx={{
                          color: "var(--clr-blue-light)",
                          "&.Mui-checked": {
                            color: "var(--clr-blue-primary)",
                          },
                        }}
                      />}
                      label="Recruitment Solutions"
                    />
                    <FormControlLabel
                      sx={{ color: "#3B4256" }}
                      value="Job Opportunities"
                      control={<Radio
                        sx={{
                          color: "var(--clr-blue-light)",
                          "&.Mui-checked": {
                            color: "var(--clr-blue-primary)",
                          },
                        }}
                      />}
                      label="Job Opportunities"
                    />
                    <FormControlLabel
                      sx={{ color: "#3B4256" }}
                      value="Job Posting"
                      control={<Radio
                        sx={{
                          color: "var(--clr-blue-light)",
                          "&.Mui-checked": {
                            color: "var(--clr-blue-primary)",
                          },
                        }}
                      />}
                      label="Job Posting"
                    />
                    <FormControlLabel
                      sx={{ color: "#3B4256" }}
                      value="Branding Solutions"
                      control={<Radio
                        sx={{
                          color: "var(--clr-blue-light)",
                          "&.Mui-checked": {
                            color: "var(--clr-blue-primary)",
                          },
                        }}
                      />}
                      label="Branding Solutions"
                    />
                  </RadioGroup>
                  {values.lookingFor === null && (
                    <FormHelperText sx={{ color: "red" }}>
                      {errRadio}
                    </FormHelperText>
                  )}
                </Box>
                <Box>
                  <InputLabel sx={{ pb: 0.5 }}>Name&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                  <TextField
                    disableUnderline
                    onChange={handleChange("name")}
                    value={values.name}
                    error={error}
                    placeholder="Enter Name"
                    type="text"
                    fullWidth
                    sx={{
                      color: "var(--clr-blue-footer)",
                      borderRadius: 1,
                    }}
                    InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": { 
                            padding: '12.5px 14px',
                          },
                          /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-light)",
                          },
                          "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-primary)",
                            },
                          }, */
                        }
                      }}
                  />
                  {values.name === "" && (
                    <FormHelperText sx={{ color: "red" }}>
                      {error}
                    </FormHelperText>
                  )}
                </Box>
                <Box>
                  <InputLabel sx={{ pb: 0.5 }}>Company Name&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                  <TextField
                    disableUnderline
                    onChange={handleChange("companyName")}
                    value={values.companyName}
                    error={error}
                    placeholder="Enter Company Name"
                    type="text"
                    fullWidth
                    sx={{
                      color: "var(--clr-blue-footer)",
                      borderRadius: 1,
                    }}
                    InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": { 
                            padding: '12.5px 14px',
                          },
                          /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-light)",
                          },
                          "&:hover": {
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-primary)",
                            },
                          }, */
                        }
                      }}
                  />
                  {values.companyName === "" && (
                    <FormHelperText sx={{ color: "red" }}>
                      {error}
                    </FormHelperText>
                  )}
                </Box>
                <Box>
                  <InputLabel sx={{ pb: 0.5 }}>Email&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                  <TextField
                    disableUnderline
                    onChange={handleChange("email")}
                    value={values.email}
                    error={error}
                    placeholder="Enter Email Address"
                    type="email"
                    fullWidth
                    sx={{
                      color: "var(--clr-blue-footer)",
                      borderRadius: 1,
                    }}
                    InputProps={{
                      sx: {
                        ".MuiOutlinedInput-input": {
                          padding: '12.5px 14px',
                        },
                        /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                          border: "1px solid var(--clr-blue-light)",
                        },
                        "&:hover": {
                          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-primary)",
                          },
                        }, */
                      }
                    }}
                  />
                  {values.email === "" && (
                    <FormHelperText sx={{ color: "red" }}>
                      {error}
                    </FormHelperText>
                  )}
                </Box>
                <Box>
                  <InputLabel sx={{ pb: 0.5 }}>Contact Number&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                  <TextField
                    disableUnderline
                    onChange={handleChange("contactNumber")}
                    value={values.contactNumber}
                    error={error}
                    placeholder="Enter Contact Number"
                    type="tel"
                    fullWidth
                    sx={{
                      color: "var(--clr-blue-footer)",
                      borderRadius: 1,
                    }}
                    InputProps={{
                      sx: {
                        ".MuiOutlinedInput-input": {
                          padding: '12.5px 14px',
                        },
                        /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                          border: "1px solid var(--clr-blue-light)",
                        },
                        "&:hover": {
                          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-primary)",
                          },
                        }, */
                      }
                    }}
                  />
                  {values.email === "" && (
                    <FormHelperText sx={{ color: "red" }}>
                      {error}
                    </FormHelperText>
                  )}
                </Box>
                <Box>
                  <InputLabel sx={{ pb: 0.5 }}>Company Location&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                  <TextField
                    disableUnderline
                    onChange={handleChange("location")}
                    value={values.location}
                    error={error}
                    placeholder="Enter Location"
                    type="text"
                    fullWidth
                    sx={{
                      color: "var(--clr-blue-footer)",
                      borderRadius: 1,
                    }}
                    InputProps={{
                      sx: {
                        ".MuiOutlinedInput-input": {
                          padding: '12.5px 14px',
                        },
                        /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                          border: "1px solid var(--clr-blue-light)",
                        },
                        "&:hover": {
                          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-primary)",
                          },
                        }, */
                      }
                    }}
                  />
                  {values.location === "" && (
                    <FormHelperText sx={{ color: "red" }}>
                      {error}
                    </FormHelperText>
                  )}
                </Box>
                <Box>
                  <InputLabel sx={{ pb: 0.5 }}>Designation&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                  <TextField
                    disableUnderline
                    onChange={handleChange("designation")}
                    value={values.designation}
                    error={error}
                    placeholder="Enter Your Designation"
                    type="Text"
                    fullWidth
                    sx={{
                      color: "var(--clr-blue-footer)",
                      borderRadius: 1,
                    }}
                    InputProps={{
                      sx: {
                        ".MuiOutlinedInput-input": {
                          padding: '12.5px 14px',
                        },
                        /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                          border: "1px solid var(--clr-blue-light)",
                        },
                        "&:hover": {
                          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid var(--clr-blue-primary)",
                          },
                        }, */
                      }
                    }}
                  />
                  {values.designation === "" && (
                    <FormHelperText sx={{ color: "red" }}>
                      {error}
                    </FormHelperText>
                  )}
                </Box>
                <Box>
                  <Box sx={{ px: 1 }}>
                    <Button
                      onClick={handleContactUs}
                      variant="contained"
                      sx={{ borderRadius: 16 }}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
  
            {/* Contact Info */}
            <Box sx={{ px: 2, pb: 8 }}>
              <Box sx={{ backgroundColor: "var(--clr-white)", display: "flex", flexDirection: "column", p: 2.5, gap: 2, borderRadius: 1, border: "1px solid var(--clr-blue-light)" }}>
                <Box /* sx={{ borderBottom: "1px solid #BDBDBD" }} */>
                  <Typography
                    component="h6"
                    variant="caption"
                    sx={{ color: "#333333", fontWeight: "600" }}
                  >
                    Sale Enquires
                  </Typography>
                  <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ gap: "1rem", my: 1 }}
                  >
                    <Grid
                      item
                      sx={{
                        backgroundColor: "var(--clr-blue-footer)",
                        padding: "5px",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <PhoneIcon sx={{ color: "#FFFFFF" }} />
                    </Grid>
                    <Grid item>
                      <Typography
                        component="p"
                        sx={{
                          display: "block",
                          lineHeight: "30px",
                          color: "#828282",
                          fontSize: "20px",
                        }}
                      >
                        +91-040-35704798
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ gap: "1rem", my: 2.5 }}
                  >
                    <Grid
                      item
                      sx={{
                        backgroundColor: "var(--clr-blue-footer)",
                        padding: "5px",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <EmailIcon sx={{ color: "#FFFFFF" }} />
                    </Grid>
                    <Grid item>
                      <Typography
                        component="p"
                        sx={{
                          display: "block",
                          lineHeight: "30px",
                          color: "#828282",
                          fontSize: "20px",
                        }}
                      >
                        sales@medlinkjobs.com
                      </Typography>
                    </Grid>
                  </Grid>
                </Box> 
                <Box sx={{ borderTop: "2px solid var(--clr-blue-footer)" }}>
                  <Typography
                    component="h6"
                    variant="caption"
                    sx={{ color: "#333333", fontWeight: "600", mt: 2 }}
                  >
                    Customer Support
                  </Typography>
                  <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ gap: "1rem", my: 1 }}
                  >
                    <Grid
                      item
                      sx={{
                        backgroundColor: "var(--clr-blue-footer)",
                        padding: "5px",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <PhoneIcon sx={{ color: "#FFFFFF" }} />
                    </Grid>
                    <Grid item>
                      <Typography
                        component="p"
                        sx={{
                          display: "block",
                          lineHeight: "30px",
                          color: "#828282",
                          fontSize: "20px",
                        }}
                      >
                        +91-040-35704798
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ gap: "1rem", my: 2.5 }}
                  >
                    <Grid
                      item
                      sx={{
                        backgroundColor: "var(--clr-blue-footer)",
                        padding: "5px",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <EmailIcon sx={{ color: "#FFFFFF" }} />
                    </Grid>
                    <Grid item>
                      <Typography
                        component="p"
                        sx={{
                          display: "block",
                          lineHeight: "30px",
                          color: "#828282",
                          fontSize: "20px",
                        }}
                      >
                        support@medlinkjobs.com
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        ) : (
          <Box>
              <Box sx={{ display: {xs: "block", md: "none" } }}>
                <Skeleton width={"100%"} height={60}  sx={{mt: "-5px", mb: "25px"}}/>
                <Box sx={{ mb: 13 }}>
                 <Box
                    maxWidth="md"
                    sx={{
                      marginTop: "-100px",
                      mx: "auto",
                    }}
                  >
                    <Box
                    sx={{
                      bgcolor: "var(--clr-white)",
                      boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                      p: 2.5,
                      borderRadius: 1,
                      mb: 3,
                    }}
                  >
                   
                  <Grid
                    sx={{ mt: 0.5 }}
                    container
                    rowSpacing={4}
                    columnSpacing={8}
                  >
                   <Grid item xs={12}>
                   <Skeleton width={"100%"} height={250}/>
                   </Grid>
                   <Grid item xs={12}>
                   <Skeleton width={"100%"} height={75} sx={{mt: "-30px"}}/>
                   </Grid>
                   <Grid item xs={12}>
                   <Skeleton width={"100%"} height={75} sx={{mt: "-30px"}}/>
                   </Grid>
                   <Grid item xs={12}>
                   <Skeleton width={"100%"} height={75} sx={{mt: "-30px"}}/>
                   </Grid>
                   <Grid item xs={12}>
                   <Skeleton width={"100%"} height={75} sx={{mt: "-30px"}}/>
                   </Grid>
                   <Grid item xs={12}>
                   <Skeleton width={"100%"} height={75} sx={{mt: "-30px"}}/>
                   </Grid>
                   <Grid item xs={12}>
                   <Skeleton width={"100%"} height={75} sx={{mt: "-30px"}}/>
                   </Grid>
                   <Grid item xs={12}>
                   <Skeleton width={"100%"} height={75} sx={{mt: "-30px"}}/>
                   </Grid>
                  </Grid>
                  </Box>
                  <Box sx={{
                      bgcolor: "var(--clr-white)",
                      boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                      p: 1.5,
                      borderRadius: 1
                    }}>
                    <Skeleton width={"100%"} height={350} sx={{mt: "-60px"}}></Skeleton>
                  </Box>
                </Box>
                </Box>
              </Box>
          </Box>
        )
      }
      </Box>
  );
};

export default ContactUs;
