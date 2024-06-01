import * as React from "react";
import { useState } from "react";
import {
  Grid,
  FormControl,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  InputBase,
  useMediaQuery,
  Autocomplete,
  TextField,
  Slider,
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import { useEffect } from "react";
import { gqlOpenQuery, gqlquery, QUERY_GET_INDUSTRY } from "../../api/hospitalIndex";

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

const selectPlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#B8BCCA"
  }
}))

const SelectPlaceholder = ({ children }) => {
  const classes = selectPlaceholderStyles();
  return (<div className={classes.placeholder}>{children}</div>);
}

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

const AddtionalDetails = (props) => {
  const [openAdditionalDetails, setopenAdditionalDetails] = useState(false);
  const classes = useStyles();
  const [values, setValues] = useState({
    maritalStatus: "",
    gender: "",
    maximumAge: "",
    minimumAge: "",
    industry: "",
    roleCategory: "",
    jobType: "",
    employmentType: "",
    shift: "",
    expectedSalary: [0, 99],
  });
  const [allDesiredIndustry, setAllDesiredIndustry] = useState([]);
  const [allCityLocation, setAllCityLocation] = useState([]);
  const [selectedCityLocation, setSelectedCityLocation] = useState([]);
  const [allDesiredRole, setAllDesiredRole] = useState([]);
  const [preferredSelectedLocation, setPreferredSelectedLocation] = useState([]);
  const [years, setYears] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  // Status select array
  const statuses = ["Single", "Married"];

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleAdditionalDetails = () => {
    setopenAdditionalDetails(!openAdditionalDetails);
  };

  const handleInputChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    if(values?.industry?.industry){
      const GET_INDUSTRY = {
        query: ` query MyQuery {
          getHCISpecialty(industry: "${values?.industry?.industry}") {
            hciID
            industry
            specialty
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      
      gqlquery(GET_INDUSTRY, null)
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas)
        setAllDesiredRole(datas?.data?.getHCISpecialty)});
      // }
    // else{
      // console.log("else e dukse")
    }
  },[values.industry])

  useEffect(() => {

    gqlquery(QUERY_GET_INDUSTRY, null)
      .then((res) => res.json())
      .then((datas) => setAllDesiredIndustry(datas?.data?.getHCIIndustry));

    function getYears() {
      let yearArr = [];
      for (let i = 20; i <= 80; i++) {
        yearArr.push(i);
      }
      setYears(yearArr);
    }
    getYears();
  }, [])

  const SearchPresentCity = (event) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val

    if (event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2) {

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

  
  const sendAdditionalData = {
    values: values
  };
  console.log(sendAdditionalData.values);
  useEffect(() => {
    props.getAdditionalData(sendAdditionalData)
  }, [values])

  return (
    <Box>
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
            Additional Details
          </Typography>
          {openAdditionalDetails ? (
            <ExpandLess
              onClick={handleAdditionalDetails}
              style={{ height: !matches ? "35px" : "24px", width: !matches ? "40px" : "27px", color: "var(--clr-blue-footer)" }}
            />
          ) : (
            <ExpandMore
              onClick={handleAdditionalDetails}
              style={{ height: !matches ? "35px" : "24px", width: !matches ? "40px" : "27px", color: "var(--clr-blue-footer)" }}
            />
          )}
        </Box>
        {
          (openAdditionalDetails && matches) && <hr style={{ borderBottom: "1px solid #E4EEF5", borderTop: "0px", borderLeft: "0px", borderRight: "0px", marginTop: "10px" }} />
        }
        <Collapse in={openAdditionalDetails} timeout="auto" unmountOnExit>
          <Box sx={{ pt: !matches ? 3 : 1.1 }}>
            <Grid container rowSpacing={!matches ? 3 : 2} columnSpacing={10}>
              <Grid
                item
                xs={12}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Gender
                  </InputLabel>
                  <RadioGroup
                    // row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: !matches ? "row" : "column",
                    }}
                  >
                    <FormControlLabel
                      value="male"
                      onChange={handleChange("gender")}
                      control={<Radio sx={{
                        color: "var(--clr-blue-light)",
                        "&.Mui-checked": {
                          color: "var(--clr-blue-primary)",
                        },
                      }} />}
                      label="Male"
                      sx={{ color: "#1A1A1A", fontSize: "1rem", mr: 6 }}
                    />
                    <FormControlLabel
                      value="female"
                      onChange={handleChange("gender")}
                      control={<Radio sx={{
                        color: "var(--clr-blue-light)",
                        "&.Mui-checked": {
                          color: "var(--clr-blue-primary)",
                        },
                      }} />}
                      label="Female"
                      sx={{ color: "#1A1A1A", fontSize: "1rem", mr: 6 }}
                    />
                    <FormControlLabel
                      sx={{ color: "#1A1A1A", fontSize: "1rem", mr: 6 }}
                      value="all"
                      onChange={handleChange("gender")}
                      control={<Radio sx={{
                        color: "var(--clr-blue-light)",
                        "&.Mui-checked": {
                          color: "var(--clr-blue-primary)",
                        },
                      }} />}
                      label="All"
                    />
                  </RadioGroup>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ display: "flex", gap: 2 }}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Box>
                    <InputLabel sx={{ my: 0.5 }}>
                     Minimum Age
                    </InputLabel>
                    <Select
                      value={values.minimumAge}
                      onChange={handleChange("minimumAge")}
                      fullWidth
                      name="minimumAge"
                      inputProps={{ classes: { icon: classes.icon } }}
                      input={<CustomSelectInput />}
                      displayEmpty
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem value="" disabled>
                        Minimum Age
                      </MenuItem>
                      {years?.map((year) => (
                        <MenuItem value={year} key={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Box>
                    <InputLabel sx={{ my: 0.5 }}>
                     Maximum Age
                    </InputLabel>
                    <Select
                      value={values.maximumAge}
                      onChange={handleChange("maximumAge")}
                      fullWidth
                      name="maximumAge"
                      inputProps={{ classes: { icon: classes.icon } }}
                      input={<CustomSelectInput />}
                      displayEmpty
                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                    >
                      <MenuItem value="" disabled>
                        Maximum Age
                      </MenuItem>
                      {years?.map((year) => (
                        <MenuItem value={year} key={year}>
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <InputLabel sx={{ my: 0.5 }}>
                  Marital Status
                </InputLabel>
                <Select
                  displayEmpty
                  renderValue={values.maritalStatus !== "" ? undefined : () => <SelectPlaceholder>Set Status</SelectPlaceholder>}
                  onChange={handleInputChange("maritalStatus")}
                  // onKeyDown={handleAddPersonalDetails}
                  value={values.maritalStatus}
                  // error={values.maritalStatus === "" && error}
                  fullWidth
                  inputProps={{ classes: { icon: classes.icon } }}
                  // input={<CustomSelectInput />}
                  sx={{ height: "45px" }}
                  MenuProps={{ classes: { paper: classes.menuPaper } }}
                >
                  <MenuItem value="" disabled>
                    Set Status
                  </MenuItem>
                  {statuses?.map((status) => (
                    <MenuItem value={status} key={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Typography sx={{ color: "var(--clr-blue-footer)", fontSize: "1rem", fontWeight: 600, mt: 2 }}> Candidate's Preferrence</Typography>

              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Industry
                  </InputLabel>
                  <Select
                    // error={values?.industry === "" && error}
                    value={values?.industry}
                    onChange={handleChange("industry")}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    inputProps={{ classes: { icon: classes.icon } }}
                    input={<CustomSelectInput />}
                    displayEmpty
                    renderValue={values.industry !== "" ? undefined : () => <SelectPlaceholder>Select Industry</SelectPlaceholder>}
                    fullWidth
                  >
                    <MenuItem value="" disabled>
                      Desired Industry
                    </MenuItem>
                    {allDesiredIndustry?.map((item) => (
                      <MenuItem value={item}>
                        {item.industry}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Role Category
                  </InputLabel>
                  <Select
                    // error={values?.roleCategory === "" && error}
                    value={values?.roleCategory}
                    onChange={handleChange("roleCategory")}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                    inputProps={{ classes: { icon: classes.icon } }}
                    input={<CustomSelectInput />}
                    displayEmpty
                    renderValue={values.roleCategory !== "" ? undefined : () => <SelectPlaceholder>Select Role Category</SelectPlaceholder>}
                    fullWidth
                  >
                      <MenuItem value="" disabled>
                        Select Role Category
                      </MenuItem>
                      {allDesiredRole?.map((item) => (
                        <MenuItem value={item?.specialty}>
                          {item?.specialty}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Job Type
                  </InputLabel>
                  <FormControl >
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel onChange={handleChange("jobType")} value="Permanent" control={<Radio value="Permanent" sx={{
                        color: '#E4EEF5',
                        '&.Mui-checked': {
                          color: '#5A98F2',
                        },
                      }} />} label={<Typography sx={{ fontSize: '14px', color: '#3B4256' }}>Permanent</Typography>} />

                      <FormControlLabel sx={{ ml: 2 }} onChange={handleChange("jobType")} value="Contractual" control={<Radio value="Contractual" sx={{
                        color: '#E4EEF5',
                        '&.Mui-checked': {
                          color: '#5A98F2',
                        },
                      }} />} label={<Typography sx={{ fontSize: '14px', color: '#3B4256' }}>Contractual</Typography>} />
                    </RadioGroup>

                  </FormControl>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Employment Type
                  </InputLabel>
                  <FormControl >
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel onChange={handleChange("employmentType")} value="Full Time" control={<Radio value="Full Time" sx={{
                        color: '#E4EEF5',
                        '&.Mui-checked': {
                          color: '#5A98F2',
                        },
                      }} />} label={<Typography sx={{ fontSize: '14px', color: '#3B4256' }}>Full Time</Typography>} />

                      <FormControlLabel sx={{ ml: 2 }} onChange={handleChange("employmentType")} value="Part Time" control={<Radio value="Part Time" sx={{
                        color: '#E4EEF5',
                        '&.Mui-checked': {
                          color: '#5A98F2',
                        },
                      }} />} label={<Typography sx={{ fontSize: '14px', color: '#3B4256' }}>Part Time</Typography>} />

                      <FormControlLabel sx={{ ml: 2 }} onChange={handleChange("employmentType")} value="Locum" control={<Radio value="Locum" sx={{
                        color: '#E4EEF5',
                        '&.Mui-checked': {
                          color: '#5A98F2',
                        },
                      }} />} label={<Typography sx={{ fontSize: '14px', color: '#3B4256' }}>Locum</Typography>} />
                    </RadioGroup>

                  </FormControl>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Shift
                  </InputLabel>
                  <FormControl >
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel onChange={handleChange("shift")} value="Day" control={<Radio value="Day" sx={{
                        color: '#E4EEF5',
                        '&.Mui-checked': {
                          color: '#5A98F2',
                        },
                      }} />} label={<Typography sx={{ fontSize: '14px', color: '#3B4256' }}>Day</Typography>} />

                      <FormControlLabel sx={{ ml: 2 }} onChange={handleChange("shift")} value="Night" control={<Radio value="Night" sx={{
                        color: '#E4EEF5',
                        '&.Mui-checked': {
                          color: '#5A98F2',
                        },
                      }} />} label={<Typography sx={{ fontSize: '14px', color: '#3B4256' }}>Night</Typography>} />

                      <FormControlLabel sx={{ ml: 2 }} onChange={handleChange("shift")} value="Both" control={<Radio value="Both" sx={{
                        color: '#E4EEF5',
                        '&.Mui-checked': {
                          color: '#5A98F2',
                        },
                      }} />} label={<Typography sx={{ fontSize: '14px', color: '#3B4256' }}>Both</Typography>} />
                    </RadioGroup>

                  </FormControl>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Work Location
                  </InputLabel>
                  <Autocomplete
                    disablePortal
                    getOptionDisabled={(option) => selectedCityLocation?.length === 5 ? !option.disabled : false}
                    id="combo-box-demo"
                    sx={{
                      "& .MuiAutocomplete-inputRoot": {
                        padding: '3px 0px 3px 7px',
                        border: "0.1px solid var(--clr-blue-light) !important",
                      }
                    }}
                    onChange={(event, newValue) => {
                      setSelectedCityLocation(newValue);
                    }}
                    // value={selectedCityLocation || { city: ""}}
                    filterSelectedOptions
                    multiple
                    // disabled={values?.presentState ? false : true}
                    options={allCityLocation}
                    getOptionLabel={(option) => option?.cityWithState}
                    renderInput={(params) => <TextField
                      onChange={(e) => {
                        SearchPresentCity(e)
                      }}
                      placeholder="Select Location"
                      {...params} />}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>
                    Expected Salary
                  </InputLabel>
                  <Box sx={{ px: 4 }}>
                    <Slider
                      name="expectedSalary"
                      getAriaLabel={() => "Expected Salary"}
                      onChange={handleChange("expectedSalary")}
                      valueLabelDisplay="auto"
                      value={values.expectedSalary}
                      min={0}
                      max={99}
                      marks={[
                        {
                          value: 0,
                          label: `${Math.round(
                            values.expectedSalary[0]
                          )} lakh INR`,
                        },
                        {
                          value: 99,
                          label: `${Math.round(
                            values.expectedSalary[1]
                          )} lakh INR`,
                        },
                      ]}
                      sx={{
                        "& .MuiSlider-thumb": {
                          height: 24,
                          width: 24,
                          color: "var(--clr-white)",
                          border: "2px solid var(--clr-blue-footer)"
                        },
                        "& .MuiSlider-track": {
                          height: 10,
                          color: "var(--clr-blue-footer)",
                        },
                        "& .MuiSlider-rail": {
                          height: 10,
                          color: "var(--clr-white)",
                          border: "2px solid #C7D3E3"
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

export default AddtionalDetails;
