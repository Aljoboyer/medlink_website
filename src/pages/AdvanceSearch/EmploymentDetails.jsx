import * as React from "react";
import { useState, useEffect } from "react";
import {
  Grid, 
  Typography, 
  Select,
  MenuItem, 
  InputLabel,
  InputBase,
  Input,
  useMediaQuery,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, styled, ThemeProvider, useTheme } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { gqlquery, QUERY_DEPARTMENTS, QUERY_DESIGNMASTER, QUERY_GET_INSTITUTE_TYPE, QUERY_HOSPITALMASTER, QUERY_NOTICEMASTER } from "../../api/hospitalIndex";

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


const ItisThim = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          borderColor: "var(--clr-blue-light)",
          "&: .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--clr-blue-light)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--clr-blue-primary)",
          },

        },
      }
    }
  }
});

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

const selectPlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#B8BCCA"
  }
}))

const SelectPlaceholder = ({children}) => {
  const classes = selectPlaceholderStyles();
  return (<div className={classes.placeholder}>{children}</div>);
}

const EmploymentDetails = (props) => {
  const [openEmploymentDetails, setOpenEmploymentDetails] = useState(false);
  const [masterDepartment, setMasterDepartment] = useState([]);
  const [allDesignation, setAllDesignation] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [noticePeriods, setNoticePeriods] = useState([]);
  const [values, setValues] = useState({
    instituteType: "",
    institution: "",
    designation: "",
    noticePeriod: ""
  });
  const [allInstituteType, setAllInstituteType] = useState([]);
  const [allInstitution, setAllInstitution] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleEmploymentDetails = () => {
    setOpenEmploymentDetails(!openEmploymentDetails);
  };

  useEffect(() => {
    gqlquery(QUERY_DEPARTMENTS, null)
      .then((res) => res.json())
      .then((datas) => setMasterDepartment(datas?.data?.getDepartments));

    gqlquery(QUERY_DESIGNMASTER, null)
      .then((res) => res.json())
      .then((datas) => setAllDesignation(datas.data?.getDesignationMaster));

    gqlquery(QUERY_HOSPITALMASTER, null)
      .then((res) => res.json())
      .then((datas) => setAllHospitals(datas.data?.getHospitalMaster));

    gqlquery(QUERY_NOTICEMASTER, null)
      .then((res) => res.json())
      .then((datas) => setNoticePeriods(datas.data?.getNoticePeriodMasters));

      gqlquery(QUERY_GET_INSTITUTE_TYPE, null)
      .then((res) => res.json())
      .then((datas) => setAllInstituteType(datas.data?.getHITypeMaster));
  }, []);

  const SearchInstitutions = (event) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val
 
    if(event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2){

      const GET_INSTITUTE= {
        query: `query MyQuery {
          getHealthInstitutes(institute: "${event.target.value}") {
            himID
            name
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      
      gqlquery(GET_INSTITUTE, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllInstitution([...datas?.data?.getHealthInstitutes])
      });
    }
    else {
     
      const GET_INSTITUTE = {
        query: `query MyQuery {
          getHealthInstituteMaster {
            himID
            name
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      
      gqlquery(GET_INSTITUTE, null)
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas?.data?.getHealthInstituteMaster)
        setAllInstitution(datas?.data?.getHealthInstituteMaster)
      });
    }

  }

  const InstitutionHandler = (e) => {
    const FintInstitute = allInstitution?.find((vars) => vars?.name === e)
    setValues({...values, institution: FintInstitute?.name})
  }
  
  useEffect(() => {
    props?.getEmploymentData(values);
  }, [values]);

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
            Employment Details
          </Typography>
          {openEmploymentDetails ? (
            <ExpandLess
              onClick={handleEmploymentDetails}
              style={{
                height: !matches ? "35px" : "24px",
                width: !matches ? "40px" : "27px",
                color: "var(--clr-blue-footer)",
              }}
            />
          ) : (
            <ExpandMore
              onClick={handleEmploymentDetails}
              style={{
                height: !matches ? "35px" : "24px",
                width: !matches ? "40px" : "27px",
                color: "var(--clr-blue-footer)",
              }}
            />
          )}
        </Box>
        {openEmploymentDetails && matches && (
          <hr
            style={{
              borderBottom: "1px solid #E4EEF5",
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              marginTop: "10px",
            }}
          />
        )}
        <Collapse in={openEmploymentDetails} timeout="auto" unmountOnExit>
          <Box sx={{ pt: !matches ? 3 : 1.1 }}>
            <Grid container rowSpacing={!matches ? 3 : 2} columnSpacing={10}>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>Designation/Job Role</InputLabel>
                  <Select
                        fullWidth
                        displayEmpty
                        renderValue={values.designation !== "" ? undefined : () => <SelectPlaceholder>Select Designation/Job Role</SelectPlaceholder>} 
                        // error={values.designation === "" && error}
                        value={values.designation}
                        onChange={handleChange("designation")}
                        // onKeyDown={handleAddExperience}
                        inputProps={{ classes: { icon: classes.icon } }}
                        input={<CustomSelectInput />}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                        Select Designation/Job Role
                        </MenuItem>
                        {allDesignation?.map((singleDesignation) => (
                          <MenuItem value={singleDesignation?.name}>
                            {singleDesignation?.name}
                          </MenuItem>
                        ))}
                      </Select>
                  {/* <Select
                    value={values.department}
                    onChange={handleChange("department")}
                    fullWidth
                    name="qualification"
                    inputProps={{ classes: { icon: classes.icon } }}
                    input={<CustomSelectInput />}
                    displayEmpty
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>
                      Select
                    </MenuItem>
                    {masterDepartment?.map((department) => (
                      <MenuItem value={department.departmentID}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </Select> */}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>Health Institution Type</InputLabel>
                  <Select
                    fullWidth
                    displayEmpty
                    renderValue={values.instituteType !== "" ? undefined : () => <SelectPlaceholder>Select Health Institution Type</SelectPlaceholder>}
                    // error={values.instituteType === "" && error}
                    value={values.instituteType}
                    onChange={handleChange("instituteType")}
                    // onKeyDown={handleAddExperience}
                    inputProps={{ classes: { icon: classes.icon } }}
                    input={<CustomSelectInput />}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>
                      Select Health Institution Type
                    </MenuItem>
                    {allInstituteType?.map((institute) => (
                      <MenuItem value={institute?.type}>{institute?.type}</MenuItem>
                    ))}
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>Health Institution Name</InputLabel>
                  <ThemeProvider theme={ItisThim}>
                      <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          sx={{
                            "& .MuiAutocomplete-inputRoot":{
                              padding: '3px 0px 3px 7px',
                              border: "1px solid var(--clr-blue-light) !important",
                            }
                          }}
                          onChange={(event, val) => {
                            InstitutionHandler(val)
                          }}
                          // onKeyDown={handleAddExperience}
                          options={allInstitution?.map((option) => option.name)}
                          renderInput={(params) => <TextField
                            onChange={(e) => {
                              SearchInstitutions(e)
                          }}
                          placeholder="Select Health Institution Name"
                          {...params} />}
                        />
                      </ThemeProvider>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>Notice Period</InputLabel>
                  <Select
                        fullWidth
                        displayEmpty
                        renderValue={values.noticePeriod !== "" ? undefined : () => <SelectPlaceholder>Select Notice Period</SelectPlaceholder>} 
                        // error={values.noticePeriod === "" && error}
                        value={values.noticePeriod}
                        onChange={handleChange("noticePeriod")}
                        // onKeyDown={handleAddExperience}
                        inputProps={{ classes: { icon: classes.icon } }}
                        input={<CustomSelectInput />}
                        MenuProps={{ classes: { paper: classes.menuPaper } }}
                      >
                        <MenuItem value="" disabled>
                          Select Notice Period
                        </MenuItem>
                        {noticePeriods?.map((notice) => (
                          <MenuItem value={notice?.npID}>{notice?.notice}</MenuItem>
                        ))}
                      </Select>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default EmploymentDetails;
