import * as React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  Typography,
  TextField,
  Select,
  MenuItem,
  Breadcrumbs,
  // Link,
  Slider,
  InputLabel,
  InputBase,
  FormHelperText,
  useMediaQuery,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "@mui/system";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme } from "@mui/material/styles";
import GooglePlacesAutocomplete, { geocodeByPlaceId } from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from "react-router-dom";
import { gqlOpenQuery } from "../../api/hospitalIndex.js";

// Custom style for mui Select border
const CustomSelectInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "4px",
    position: "relative",
    border: "1px solid var(--clr-blue-light) !important",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontSize: "15px",
    color: "var(--clr-blue-footer)",
    padding: "11px 26px 12px 12px",

    "&:focus": {
      borderRadius: 4,
      borderColor: "red",
    },
  },
}));

// Custom style for Select dropdown
const useStyles = makeStyles((theme) => ({
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
          The preferred location is
        </Box>
      </FormControl>
    </div>
  );
}

const AdvSearch = (props) => {
  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();
  const [latlng, setLatlng] = useState({});
  const [openAdvSearch, setOpenAdvSearch] = useState(true);
  const [values, setValues] = useState({
    experienceFrom: "",
    experienceTo: "",
    employmentType: "",
    salaryRange: [0, 100],
  });
  const [currentLocation, setCurrentLocation] = useState(true);
  const [anyKeyWords, setAnyKeywords] = useState(null);
  const [allKeyWords, setAllKeywords] = useState(null);
  const [experienceCount, setExperienceCount] = useState();
  const [allCityLocation, setAllCityLocation] = useState([]);
  const [candidateCurrentLocation, setCandidateCurrentLocation] = useState([]);
  const [candidatePreferredLocation, setCandidatePreferredLocation] = useState([]);
  const [error, setError] = useState("");
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));


  const handleAdvSearch = () => {
    setOpenAdvSearch(!openAdvSearch);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  let city = address?.value?.structured_formatting?.main_text;

  if (city === undefined) {
    city = "";
  }

  useEffect(() => {
    function getYears() {
      let yearArr = [];
      for (let i = 0; i <= 20; i++) {
        yearArr.push(i);
      }
      setExperienceCount(yearArr);
    }
    getYears();
  }, [])

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
      // console.log("214 addressObject", addressObject);
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

  const sendData = {
    keyword1: anyKeyWords,
    keyword2: allKeyWords,
    currentLocation: candidateCurrentLocation?.map(ccl => ccl?.cityWithState)?.join(", "),
    preferredLocation: candidatePreferredLocation?.map(cpl => cpl?.cityWithState)?.join(", "),
    inputValues: values
  }

  useEffect(() => {
    props?.getAdvanceSearch(sendData);
  }, [candidateCurrentLocation, candidatePreferredLocation, values, anyKeyWords, allKeyWords]);

  const handleGetSearchLocation = (event, location) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val
  
    if(event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2){
  
      const SEARCH_CITY = {
        query: `query MyQuery {
          searchCity(city: "${event.target.value}") {
            city
            cityWithState
            country
            lmID
            state
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      
      gqlOpenQuery(SEARCH_CITY, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllCityLocation(datas?.data?.searchCity) 
      });
    }
    else {
      // console.log('else er vitor')
      const GET_CITY = {
        query: `query MyQuery {
          getCityMaster {
            city
            cityWithState
            country
            lmID
            state
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      gqlOpenQuery(GET_CITY, null)
      .then((res) => res.json())
      .then((datas) => {
        // console.log("line 635: initial city name", datas);
        setAllCityLocation(datas?.data?.getCityMaster) 
      }); 
    }
  }

  return (
    <Box sx={{mt: matches ? 2.5 : 0}}>
      {
        !matches &&
      <Box sx={{pl: matches && 2}}>
        <Breadcrumbs
          separator={<NavigateNextIcon sx={{color: "var(--clr-blue-footer)", /* fontSize: !matches ? "14px" :  "12px" */ }} />}
          aria-label="breadcrumb"
          sx={{ marginTop: "15px", marginBottom: "15px"  }}
          // style={{ marginBottom: "15px" }}
        >
          <Link
            underline="hover"
            style={{ color: "var(--clr-blue-footer)", cursor: "pointer", /* fontSize: !matches ? "14px" :  "12px" */  }}
            to="/hospital-dashboard"
          >
            Dashboard
          </Link> 
          <Typography sx={{ color: "var(--clr-blue-footer)", /* fontSize: !matches ? "14px" :  "12px" */ }}>
          Jobseeker Resume Access (JRA)
          </Typography>
        </Breadcrumbs>
      </Box>
      }
      <Box sx={{
        px: !matches ? 5 : 1.25,
        py: !matches ? 4 : 1.25,
        backgroundColor: "var(--clr-white)",
        textAlign: "left",
        borderRadius: 2,
        boxShadow: !matches && "0px 9px 18px rgba(69, 143, 246, 0.09)",
        border: matches && "1px solid #E4EEF5",
        mb: 2.5,
      }}>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: !matches ? "20px" : "18px",
              fontWeight: 700,
              color: "var(--clr-blue-footer)",
            }}
          >
            Search Jobseeker Resume Access (JRA)
          </Typography>
          {openAdvSearch ? (
            <ExpandLess
              onClick={handleAdvSearch}
              style={{ height: !matches ? "35px" : "24px", width: !matches ? "40px" : "27px", color: "var(--clr-blue-footer)" }}
            />
          ) : (
            <ExpandMore
              onClick={handleAdvSearch}
              style={{ height:  !matches ? "35px" : "24px", width: !matches ? "40px" : "27px", color: "var(--clr-blue-footer)" }}
            />
          )}
        </Box>
        {
          (openAdvSearch && matches) && <hr style={{borderBottom: "1px solid #E4EEF5", borderTop:"0px", borderLeft:"0px", borderRight:"0px", marginTop: "10px"}}/>
        }
        <Collapse in={openAdvSearch} timeout="auto" unmountOnExit>
          <Box sx={{ pt: !matches ? 3 : 1.1 }}>
            <Grid container rowSpacing={!matches ? 3 : 2}>
              {/* any keywords  */}
              <Grid
                item
                xs={12}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Any Keywords&nbsp;<span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Autocomplete
                    multiple
                    freeSolo
                    style={{ backgroundColor: "white" }}
                    id="tags-outlined"
                    options={topSpecializations.map((option) => option.title)}
                    onChange={(event, val) => setAnyKeywords(val)}
                    // onKeyDown={props?.getKeyInfo}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        disableUnderline
                        sx={{
                          svg: { color: "var(--clr-blue-footer)" },
                          input: {
                            color: "var(--clr-blue-footer)",
                            padding: "2.5px !important",
                          },
                        }}
                        placeholder="Keywords"
                      />
                    )} />{console.log(props.anyKeywordError, 5454832094, anyKeyWords)}
                  {((anyKeyWords === null || anyKeyWords === undefined || anyKeyWords === "undefined" || anyKeyWords === "" || anyKeyWords.length === 0) && props.anyKeywordError !== "") && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {/* {errInput} */}
                      Any keyword field can't be empty.
                    </FormHelperText>
                  )}
                </Box>
              </Grid>
              {/* all keywords must have  */}
              <Grid
                item
                xs={12}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Must Have Keywords
                  </InputLabel>
                  <Autocomplete
                    multiple
                    freeSolo
                    style={{ backgroundColor: "white" }}
                    id="tags-outlined"
                    options={topSpecializations.map((option) => option.title)}
                    onChange={(event, val) => setAllKeywords(val)}
                    // onKeyDown={props?.getKeyInfo}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        disableUnderline
                        sx={{
                          svg: { color: "var(--clr-blue-footer)" },
                          input: {
                            color: "var(--clr-blue-footer)",
                            padding: "2.5px !important",
                          },
                        }}
                        placeholder="Keywords"
                      />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container rowSpacing={!matches ? 4 : 2} columnSpacing={10} sx={{ pt: !matches? 4 : 2 }}>
              {/* Experience From */}
              <Grid
                item
                xs={12}
                md={6}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Experience (From)
                  </InputLabel>
                  <Select
                    value={values.experienceFrom}
                    onChange={handleChange("experienceFrom")}
                    onKeyDown={props?.getKeyInfo}
                    fullWidth
                    name="qualification"
                    inputProps={{ classes: { icon: classes.icon } }}
                    input={<CustomSelectInput />}
                    displayEmpty
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>
                      Min
                    </MenuItem>
                    {
                      experienceCount?.map(expC => (
                        <MenuItem value={expC}>{expC}</MenuItem>
                      ))
                    }

                  </Select>
                </Box>
              </Grid>
              {/* Experience To */}
              <Grid
                item
                xs={12}
                md={6}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Experience (To)
                  </InputLabel>
                  <Select
                    value={values.experienceTo}
                    onChange={handleChange("experienceTo")}
                    onKeyDown={props?.getKeyInfo}
                    fullWidth
                    name="qualification"
                    inputProps={{ classes: { icon: classes.icon } }}
                    input={<CustomSelectInput />}
                    displayEmpty
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>
                      Max
                    </MenuItem>
                    {
                      experienceCount?.map(expC => (
                        <MenuItem value={expC}>{expC}</MenuItem>
                      ))
                    }
                  </Select>
                </Box>
              </Grid>
              {/* Employment Type */}
              <Grid
                item
                xs={12}
                md={6}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Employment Type
                  </InputLabel>
                  <Select
                    defaultValue={"Full Time"}
                    value={values.employmentType}
                    onChange={handleChange("employmentType")}
                    onKeyDown={props?.getKeyInfo}
                    fullWidth
                    name="qualification"
                    inputProps={{ classes: { icon: classes.icon } }}
                    input={<CustomSelectInput />}
                    displayEmpty
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>Select</MenuItem>
                    <MenuItem value={"Full Time"}>Full Time</MenuItem>
                    <MenuItem value={"Part Time"}>Part Time</MenuItem>
                    <MenuItem value={"Locum"}>Locum</MenuItem>
                  </Select>
                </Box>
              </Grid>
              {/* Current Location */}
              <Grid
                item
                xs={12}
                md={6}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Current Location
                  </InputLabel>
                  <div>
                    <Autocomplete
                      disablePortal
                      noOptionsText={"Start typing"}
                      getOptionDisabled={(option) =>
                        candidateCurrentLocation?.length === 5
                          ? !option.disabled
                          : false
                      }
                      id="combo-box-demo"
                      sx={{
                        "& .MuiAutocomplete-inputRoot": {
                          padding: "3px 0px 3px 7px",
                          border:
                            "0.1px solid var(--clr-blue-light) !important",
                        },
                      }}
                      onChange={(event, newValue) => {
                        setCandidateCurrentLocation(newValue);
                      }}
                      // value={candidateCurrentLocation || { city: ""}}
                      filterSelectedOptions
                      multiple
                      options={
                        allCityLocation?.filter(
                          ({ cityWithState: saved }) =>
                            !candidateCurrentLocation?.some(
                              ({ cityWithState: newSelect }) =>
                                newSelect === saved
                            )
                        )?.length === 90
                          ? allCityLocation?.filter(
                              ({ cityWithState: saved }) =>
                                !candidateCurrentLocation?.some(
                                  ({ cityWithState: newSelect }) =>
                                    newSelect === saved
                                )
                            )
                          : allCityLocation?.filter(
                              ({ cityWithState: saved }) =>
                                !candidateCurrentLocation?.some(
                                  ({ cityWithState: newSelect }) =>
                                    newSelect === saved
                                )
                            )
                      }
                      // disabled={values?.presentState ? false : true}
                      // options={allCityLocation}
                      getOptionLabel={(option) => option?.cityWithState}
                      renderInput={(params) => (
                        <TextField
                          onChange={(e) => {
                            handleGetSearchLocation(e);
                          }}
                          placeholder="Select Location"
                          {...params}
                        />
                      )}
                    />

                    {candidateCurrentLocation?.length === 0 && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {error}
                      </FormHelperText>
                    )}
                  </div>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", pt: 1 }}>
                  <Box sx={{}}>
                    {currentLocation ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 0.5,
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <Checkbox
                          sx={{
                            mt: -1,
                            ml: -1,
                            color: "#C7D3E3",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary)",
                            },
                          }}
                          name="promotionoalCommunication"
                          checked={currentLocation}
                          color="default"
                          onChange={(e) => setCurrentLocation(e.target.checked)}
                        />
                        &nbsp;
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 600, color: "var(--clr-gray-2)", mt: -1, ml: -1 }}
                        >
                          The preferred location is <span style={{ fontWeight: "bold", color: "var(--clr-blue-primary)" }}>same as selected</span>
                        </Typography>
                      </Box>
                    ) : (
                      <Box style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", margin: "0 auto" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 0.5,
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            sx={{
                              mt: -1,
                              ml: -1.5,
                              color: "#C7D3E3",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary)",
                              },
                            }}
                            name="promotionoalCommunication"
                            checked={currentLocation}
                            color="default"
                            onChange={(e) => setCurrentLocation(e.target.checked)}
                          />
                          &nbsp;
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600, color: "var(--clr-gray-2)", display: "flex", alignItems: "center", justifyContent: "space-between", mt: -1, ml: -1, gap: 2 }}
                          >
                            <p>The preferred location is</p>{" "}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box sx={{ pt: 1 }}>
                    {currentLocation || (
                      <>
                        <Autocomplete
                          disablePortal
                          noOptionsText={"Start typing"}
                          getOptionDisabled={(option) =>
                            candidatePreferredLocation?.length === 5
                              ? !option.disabled
                              : false
                          }
                          id="combo-box-demo"
                          sx={{
                            "& .MuiAutocomplete-inputRoot": {
                              padding: "3px 0px 3px 7px",
                              border:
                                "0.1px solid var(--clr-blue-light) !important",
                            },
                          }}
                          onChange={(event, newValue) => {
                            setCandidatePreferredLocation(newValue);
                          }}
                          // value={candidatePreferredLocation || { city: ""}}
                          filterSelectedOptions
                          multiple
                          fullWidth
                          options={
                            allCityLocation?.filter(
                              ({ cityWithState: saved }) =>
                                !candidatePreferredLocation?.some(
                                  ({ cityWithState: newSelect }) =>
                                    newSelect === saved
                                )
                            )?.length === 90
                              ? allCityLocation?.filter(
                                  ({ cityWithState: saved }) =>
                                    !candidatePreferredLocation?.some(
                                      ({ cityWithState: newSelect }) =>
                                        newSelect === saved
                                    )
                                )
                              : allCityLocation?.filter(
                                  ({ cityWithState: saved }) =>
                                    !candidatePreferredLocation?.some(
                                      ({ cityWithState: newSelect }) =>
                                        newSelect === saved
                                    )
                                )
                          }
                          // disabled={values?.presentState ? false : true}
                          // options={allCityLocation}
                          getOptionLabel={(option) => option?.cityWithState}
                          renderInput={(params) => (
                            <TextField
                              onChange={(e) => {
                                handleGetSearchLocation(e);
                              }}
                              placeholder="Select Location"
                              {...params}
                            />
                          )}
                        />
                        {candidatePreferredLocation?.length === 0 && (
                          <FormHelperText sx={{ color: "red", mb: 1 }}>
                            {error}
                          </FormHelperText>
                        )}
                      </>
                    )}
                </Box>
              </Grid>
              {/* Salary Range */}
              <Grid
                item
                xs={12}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Salary Range
                  </InputLabel>
                  <Box sx={{ px: 4 }}>
                    <Slider
                      name="salaryRange"
                      getAriaLabel={() => "Salary range"}
                      valueLabelDisplay="auto"
                      value={values.salaryRange}
                      onChange={handleChange("salaryRange")}
                      onKeyDown={props?.getKeyInfo}
                      min={0}
                      max={100}
                      marks={[
                        { value: 0, label: `₹${values.salaryRange[0]} Lakh` },
                        { value: 100, label: `₹${values.salaryRange[1]} Lakh` },
                      ]}
                      sx={{
                        "& .MuiSlider-thumb": {
                          height: 24,
                          width: 24,
                          color: "var(--clr-white)",
                          border: "2px solid var(--clr-blue-footer)",
                        },
                        "& .MuiSlider-track": {
                          height: 10,
                          color: "var(--clr-blue-footer)",
                        },
                        "& .MuiSlider-rail": {
                          height: 10,
                          color: "var(--clr-white)",
                          border: "2px solid #C7D3E3",
                        },
                      }}
                    />
                  </Box>

                </Box>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Box>
    </Box>

  );
};

export default AdvSearch;


const topSpecializations = [
  { title: 'Cardiac Surgeon', year: 1994 },
  { title: 'Orthopaedic Doctor', year: 1972 },
  { title: 'Neonatal Surgeon', year: 1974 },
  { title: 'Pediatrician', year: 2008 },
  { title: 'Physician', year: 1957 },
  { title: "General Physician", year: 1993 },
  { title: 'Anesthesiologist', year: 1994 },
  { title: 'Gastroenterologists', year: 1966 },
  { title: 'Hematologists', year: 1999 }
];