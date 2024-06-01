import * as React from "react";
import { useState } from "react";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  InputBase,
  InputLabel,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";

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

function CheckboxesGroup() {
  const [state, setState] = useState({
    verifiedmobilenumber: false,
    verifiedemailid: false,
    attachedresume: false,
  });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { verifiedmobilenumber, verifiedemailid, attachedresume } = state;

  return (
    <Box>
      <InputLabel sx={{ my: 0.5 }}>
        Assign responsibility
      </InputLabel>
      <FormGroup
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: !matches ? "row" : "column",
        }}
      >
        <FormControlLabel
          style={{ marginRight: "50px", color: "#6F7482" }}
          control={
            <Checkbox
              checked={verifiedmobilenumber}
              onChange={handleChange}
              name="verifiedmobilenumber"
              sx={{
                color: "#C7D3E3",
                "&.Mui-checked": {
                  color: "var(--clr-blue-primary)",
                },
              }}
            />
          }
          label="Verified Mobile Number"
        />
        <FormControlLabel
          style={{ marginRight: "50px", color: "#6F7482" }}
          control={
            <Checkbox
              checked={verifiedemailid}
              onChange={handleChange}
              name="verifiedemailid"
              sx={{
                color: "#C7D3E3",
                "&.Mui-checked": {
                  color: "var(--clr-blue-primary)",
                },
              }}
            />
          }
          label="Verified Email ID"
        />
        <FormControlLabel
          style={{ color: "#6F7482" }}
          control={
            <Checkbox
              checked={attachedresume}
              onChange={handleChange}
              name="attachedresume"
              sx={{
                color: "#C7D3E3",
                "&.Mui-checked": {
                  color: "var(--clr-blue-primary)",
                },
              }}
            />
          }
          label="Display only resume attached candidates"
        />
        <FormControlLabel
          style={{ color: "#6F7482" }}
          control={
            <Checkbox
              checked={attachedresume}
              onChange={handleChange}
              name="attachedresume"
              sx={{
                color: "#C7D3E3",
                "&.Mui-checked": {
                  color: "var(--clr-blue-primary)",
                },
              }}
            />
          }
          label="Display only actively job-looking candidates"
        />
        <FormControlLabel
          style={{ color: "#6F7482" }}
          control={
            <Checkbox
              checked={attachedresume}
              onChange={handleChange}
              name="attachedresume"
              sx={{
                color: "#C7D3E3",
                "&.Mui-checked": {
                  color: "var(--clr-blue-primary)",
                },
              }}
            />
          }
          label="Display only candidates can be contacted over the phone"
        />
      </FormGroup>
    </Box>
  );
}

const DisplayDetails = () => {
  const [openDisplayDetails, setopenDisplayDetails] = useState(false);
  const classes = useStyles();
  const [form, setForm] = useState({
    jobTitle: "",
    location: "",
    qualification: "",
    employmentType: "",
    experience: "",
    lastDateToApply: new Date(),
    description: "",
    salaryRange: [0, 40000],
    filterKeyword: "",
    filterLocation: "",
    filterExperienceFrom: "",
    filterExperienceTo: "",
    filterSalaryRange: [0, 40000],
  });
  const [values, setValues] = useState({
    show: "",

  })
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const handleDisplayDetails = () => {
    setopenDisplayDetails(!openDisplayDetails);
  };
  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  console.log(values);

  return (
    <Box>
      <Box
        sx={{
          px: !matches ? 5 : 1.25,
          py: !matches ? 4 : 1.25,
          backgroundColor: "var(--clr-white)",
          textAlign: "left",
          borderRadius: 2,
          boxShadow: !matches && "0px 9px 18px rgba(69, 143, 246, 0.09)",
          border: matches && "1px solid #E4EEF5",
          mb: !matches ? 2.5 : 2
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
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
            Display Details
          </Typography>
          {openDisplayDetails ? (
            <ExpandLess
              onClick={handleDisplayDetails}
              style={{
                height: !matches ? "35px" : "24px",
                width: !matches ? "40px" : "27px",
                color: "var(--clr-blue-footer)",
              }}
            />
          ) : (
            <ExpandMore
              onClick={handleDisplayDetails}
              style={{
                height: !matches ? "35px" : "24px",
                width: !matches ? "40px" : "27px",
                color: "var(--clr-blue-footer)",
              }}
            />
          )}
        </Box>
        {
          (openDisplayDetails && matches) && <hr style={{ borderBottom: "1px solid #E4EEF5", borderTop: "0px", borderLeft: "0px", borderRight: "0px", marginTop: "10px" }} />
        }
        <Collapse in={openDisplayDetails} timeout="auto" unmountOnExit>
          <Box sx={{ pt: !matches ? 3 : 1.1 }}>
            <Grid container rowSpacing={!matches ? 3 : 2} columnSpacing={10}>
              <Grid item xs={12}>
                <Box>
                  <InputLabel sx={{ my: 0.5 }}>Show</InputLabel>
                  <RadioGroup
                    // row
                    // column
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: !matches ? "row" : "column",
                    }}
                  >
                    <FormControlLabel
                      sx={{ color: "#1A1A1A", fontSize: "1rem", mr: !matches ? 6 : "0px" }}
                      value="allcandidates"
                      onChange={handleChange("show")}
                      control={
                        <Radio
                          sx={{
                            color: "#C7D3E3",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary)",
                            },
                          }}
                        />
                      }
                      label="All Candidates"
                    />
                    <FormControlLabel
                      sx={{ color: "#1A1A1A", fontSize: "1rem", mr: !matches ? 6 : "0px" }}
                      value="newtegistration"
                      onChange={handleChange("show")}
                      control={
                        <Radio
                          sx={{
                            color: "#C7D3E3",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary)",
                            },
                          }}
                        />
                      }
                      label="New Registration"
                    />
                    <FormControlLabel
                      sx={{ color: "#1A1A1A", fontSize: "1rem", mr: !matches ? 6 : 0 }}
                      value="modifiedcandidates"
                      onChange={handleChange("show")}
                      control={
                        <Radio
                          sx={{
                            color: "#C7D3E3",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary)",
                            },
                          }}
                        />
                      }
                      label="Modified Candidates"
                    />
                  </RadioGroup>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <CheckboxesGroup />
              </Grid>

            </Grid>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default DisplayDetails;
