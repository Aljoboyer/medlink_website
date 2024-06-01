import React from 'react'
import EditIcon from "@mui/icons-material/Edit"; 
import {
  Box, 
  Card, FormHelperText, Grid, IconButton, TextField,
  InputLabel, MenuItem, Select, Tooltip, Typography
} from "@mui/material";
import Button from "@mui/material/Button"; 
import { makeStyles } from "@material-ui/core/styles"; 
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery"; 
import "swiper/css"; 
import { BootstrapInput } from '../company.view';

const useStyles = makeStyles({
  icon: {
    fill: "var(--clr-blue-footer)",
  },
});

export const CompanyDetailsTab = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const { SelectPlaceholder } = props;
  const companyType = [ "Medical", "Medicine", "Both" ];
  const industryType = [ "Doctor", "Hospital", "Both" ];

  return (
    <Box> 
    {!props.showUpdateCompanyDetails ? (
      <>
        <Card
          sx={{
            borderRadius: "0.5rem",
            pt: matches ? 1.25 : 2,
            px: matches ? 1.25 : 3,
            pb: matches ? 1.25 : 3,
            my: 2,
            boxShadow: matches ? "0px 0px 0px 0px" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
            border : matches && "1px solid #E4EEF5",
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#395987", fontWeight: "700", fontSize : matches ? "18px" : "24px" }}
            gutterBottom
            component="div"
          >
            Company Details
          </Typography>

          <Grid>
            <Grid container spacing={2}>
              <Grid item xs={5} sm={4} md={3}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{
                    textAlign: props.matches ? "left" : "right",
                    color: "#4F4F4F",
                    fontWeight: "600",
                    fontSize : matches ? "12px" : "14px" 
                  }}
                >
                  Company Name:
                </Typography>
              </Grid>
              <Grid item xs={5} sm={7} md={5.5}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", wordWrap: "break-word", fontSize : "14px"}}
                >
                  {props.hospitalDetails?.companyName || props.hospital?.name}
                </Typography>
              </Grid>
              <Grid item xs={1} sm={1} md={3.5}>
                <Tooltip title="Edit Company Details">
                  <IconButton sx={{ mx: "2px", mt: "-15px" }} onClick={props.onClickUpdateCompanyDetails}>
                    <EditIcon 
                      fontSize="small"
                      sx={{ color: "#5A98F2", cursor: "pointer" }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={5} sm={4} md={3}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  sx={{
                    textAlign: props.matches ? "left" : "right",
                    color: "#4F4F4F",
                    fontWeight: "600",
                    fontSize : matches ? "12px" : "14px"
                  }}
                >
                  Company Type:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", wordWrap: "break-word", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.companyType || props.hospital?.type}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={5} sm={4} md={3}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  sx={{
                    textAlign: props.matches ? "left" : "right",
                    color: "#4F4F4F",
                    fontWeight: "600",
                    fontSize : matches ? "12px" : "14px"
                  }}
                >
                  Industry Type:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", wordWrap: "break-word", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.industryType}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={5} sm={4} md={3}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  sx={{
                    textAlign: props.matches ? "left" : "right",
                    color: "#4F4F4F",
                    fontWeight: "600",
                    fontSize : matches ? "12px" : "14px"
                  }}
                >
                  Contact Person:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.contactPerson}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={5} sm={4} md={3}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  sx={{
                    textAlign: props.matches ? "left" : "right",
                    color: "#4F4F4F",
                    fontWeight: "600",
                    fontSize : matches ? "12px" : "14px"
                  }}
                >
                  Designation:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.designation}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={5} sm={4} md={3}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  sx={{
                    textAlign: props.matches ? "left" : "right",
                    color: "#4F4F4F",
                    fontWeight: "600",
                    fontSize : matches ? "12px" : "14px"
                  }}
                >
                  Website URL:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.website}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={5} sm={4} md={3}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  style={{
                    textAlign: props.matches ? "left" : "right",
                    color: "#4F4F4F",
                    fontWeight: "600",
                    fontSize : matches ? "12px" : "14px"
                  }}
                >
                  Number 1:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", wordWrap: "break-word", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.additionalPhone1 ? <>+91 {props.hospitalDetails?.additionalPhone1}</> : ''}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={5} sm={4} md={3}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  style={{
                    textAlign: props.matches ? "left" : "right",
                    color: "#4F4F4F",
                    fontWeight: "600",
                    fontSize : matches ? "12px" : "14px"
                  }}
                >
                  Number 2:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", wordWrap: "break-word", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.additionalPhone2 ? <>+91 {props.hospitalDetails?.additionalPhone2}</> : ''}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </>
    ) : (
      <>
        {/* update company detaiils */}
        <Box item sx={{  px: matches ? 1.25 : 5, py: matches ? 1.5 : 3.5, boxShadow: matches ? "0px 0px 0px 0px" : "0px 9px 18px rgba(69, 143, 246, 0.09)", border : matches && "1px solid #E4EEF5", borderRadius: 1, my: 2 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: "600",
              color: "var(--clr-blue-footer)",
              fontSize : matches ? "18px" : "24px"
            }}
          >
            Update Company Details
          </Typography>
          <Box>
            <Grid
              container
              justifyContent="space-between"
              rowSpacing={ matches ? 1.5 : 4}
              columnSpacing={8}
            >
                            <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel
                    sx={{
                      py: 0.5,
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Company Name&nbsp;
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      *
                    </span>
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    placeholder="Company Name"
                    onChange={props.handleCompanyDetailsChange("companyName")}
                    onKeyDown={props.handleUpdateCompanyDetails}
                    defaultValue={props.hospitalDetails?.companyName || props.hospital?.name}
                    error={
                      props.updateCompanyDetails.companyName === "" &&
                      props.errInput
                    }
                    id="companyName"
                    type="text"
                    fullWidth
                    disableUnderline
                    sx={{
                      color: "var(--clr-blue-footer)",
                      bgcolor: "#FFFFFF",
                      borderRadius: "4px",
                      mt: 0,
                    }}
                    InputProps={{
                      sx: {
                        ".MuiOutlinedInput-input": { 
                          padding: '12px 14px',
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
                  { (props.updateCompanyDetails.companyName === undefined || props.updateCompanyDetails.companyName === "") && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      { props.errInput}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>

              <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel
                      sx={{
                        py: 0.5,
                      }}
                  > Company Type&nbsp; <span style={{
                        color: "red", 
                        fontWeight: "600",
                      }}
                    > {" "} * </span>
                  </InputLabel>
                  <Select 
                    fullWidth
                    // input={<BootstrapInput />}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-2"
                    onChange={props.handleCompanyDetailsChange("companyType")}
                    onKeyDown={props.handleUpdateCompanyDetails}
                    defaultValue={props.hospitalDetails?.companyType || props.hospital?.type}
                    error={
                      props.updateCompanyDetails.companyType === "" && props.error
                    }
                    sx={{
                      backgroundColor: "#ffffff",
                      width: "100%",
                      color: "#616161",
                      height: "47px"
                    }}
                    displayEmpty
                    renderValue={props.updateCompanyDetails.companyType ?
                       undefined : () => (
                       <SelectPlaceholder>Select Company Type</SelectPlaceholder>
                    )}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                  // MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value={""} disabled>
                      Select Company Type
                    </MenuItem>
                    {companyType?.map(ct => (
                      <MenuItem value={ct}>{ct}</MenuItem>
                    ))}
                  </Select>
                  {(props.updateCompanyDetails.companyType === undefined || props.updateCompanyDetails.companyType === "") && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {props.error}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>

              <Grid item direction={"column"} xs={12} md={6}>
              <Box>
                  <InputLabel
                      sx={{
                        py: 0.5,
                      }}
                  > Company Type&nbsp; <span style={{
                        color: "red", 
                        fontWeight: "600",
                      }}
                    > {" "} * </span>
                  </InputLabel> 
                  <Select
                    fullWidth
                    // input={<BootstrapInput />}  
                    defaultValue={props.hospitalDetails?.industryType}
                    error={
                      props.updateCompanyDetails.industryType === "" && props.error
                    }
                    onChange={props.handleCompanyDetailsChange(
                      "industryType"
                    )}
                    onKeyDown={props.handleUpdateCompanyDetails}
                    sx={{
                      backgroundColor: "#ffffff",
                      width: "100%",
                      color: "#616161",
                      height: "47px"
                    }}
                    displayEmpty
                    renderValue={props.updateCompanyDetails.industryType ?
                      undefined : () => (
                      <SelectPlaceholder>Select Industry Type</SelectPlaceholder>
                   )}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                  // MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value={undefined} disabled>
                      Select Industry Type
                    </MenuItem>
                    {industryType?.map(iT => (
                      <MenuItem value={iT}>{iT}</MenuItem>
                    ))} 
                  </Select>
                  {(props.updateCompanyDetails.industryType === undefined || props.updateCompanyDetails.industryType === "") && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {props.error}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>

              <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel
                    sx={{
                      py: 0.5,
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Contact Person&nbsp;
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      *
                    </span>
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    placeholder="Contact Person"
                    onChange={props.handleCompanyDetailsChange(
                      "contactPerson"
                    )}
                    onKeyDown={props.handleUpdateCompanyDetails}
                    defaultValue={props.hospitalDetails?.contactPerson}
                    error={
                      props.updateCompanyDetails.contactPerson === "" &&
                      props.errInput
                    }
                    id="contactPerson"
                    type="text"
                    fullWidth
                    disableUnderline
                    sx={{
                      color: "var(--clr-blue-footer)",
                      bgcolor: "#FFFFFF",
                      borderRadius: "4px",
                      mt: 0,
                    }}
                    InputProps={{
                      sx: {
                        ".MuiOutlinedInput-input": { 
                          padding: '12px 14px',
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
                  { (props.updateCompanyDetails.contactPerson === undefined || props.updateCompanyDetails.contactPerson === "") && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      { props.errInput}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>

              <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel
                    sx={{
                      py: 0.5,
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Designation&nbsp;
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      *
                    </span>
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    placeholder="Designation"
                    onChange={ props.handleCompanyDetailsChange("designation")}
                    onKeyDown={ props.handleUpdateCompanyDetails}
                    defaultValue={ props.hospitalDetails?.designation}
                    error={
                      props.updateCompanyDetails.designation === "" &&
                      props.errInput
                    }
                    id="designation"
                    type="text"
                    fullWidth
                    disableUnderline
                    sx={{
                      color: "var(--clr-blue-footer)",
                      bgcolor: "#FFFFFF",
                      borderRadius: "4px",
                      mt: 0,
                    }}
                    InputProps={{
                      sx: {
                        ".MuiOutlinedInput-input": { 
                          padding: '12px 14px',
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
                  { (props.updateCompanyDetails.designation === "" || props.updateCompanyDetails.designation === undefined) && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      { props.errInput}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>

              <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel
                    sx={{
                      py: 0.5,
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Website URL&nbsp;
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      *
                    </span>
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    placeholder="https://www.medlinks.com/"
                    onChange={ props.handleCompanyDetailsChange("website")}
                    onKeyDown={ props.handleUpdateCompanyDetails}
                    defaultValue={ props.hospitalDetails?.website}
                    error={
                      props.updateCompanyDetails.website === "" &&  props.errInput
                    }
                    id="website"
                    type="text"
                    fullWidth
                    disableUnderline
                    sx={{
                      color: "var(--clr-blue-footer)",
                      bgcolor: "#FFFFFF",
                      borderRadius: "4px",
                      mt: 0,
                    }}
                    InputProps={{
                      sx: {
                        ".MuiOutlinedInput-input": { 
                          padding: '11.5px 14px',
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
                  { (props.updateCompanyDetails.website === "" || props.updateCompanyDetails.website === undefined) && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {props.errInput}
                    </FormHelperText>
                  )}
                  { props.updateCompanyDetails.website !== "" &&
                    props.regex.test( props.updateCompanyDetails.website) ===
                    false && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {props.errUrl}
                      </FormHelperText>
                    )}
                </Box>
              </Grid>

              <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel
                    sx={{
                      py: 0.5,
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Number 1&nbsp;
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      *
                    </span>
                  </InputLabel>
                  <Grid container>
                    <Grid item xs={2} md={2}>
                    <TextField
                        variant="outlined"
                        defaultValue="+91"
                        disabled
                        disableUnderline
                        sx={{
                          color: "var(--clr-blue-footer)",
                          fontSize: "14px",
                          '& fieldset': {
                            borderRadius: '4px 0px 0px 4px',
                          },
                        }}
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": { 
                              padding: '12px 14px',
                            },
                            /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-light)",
                            }, */
                            "&:hover": {
                              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                border: "1px solid black",
                              },
                            },
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={10} md={10}>

                      <TextField
                        variant="outlined"
                        placeholder="90123456789"
                        onChange={ props.handleCompanyDetailsChange(
                          "additionalPhone1"
                        )}
                        onKeyDown={ props.handleUpdateCompanyDetails}
                        defaultValue={ props.hospitalDetails?.additionalPhone1}
                        error={
                          props.updateCompanyDetails?.additionalPhone1 === "" &&
                          props.errInput
                        }
                        id="additionalPhone1"
                        type="text"
                        fullWidth
                        size="small"
                        disableUnderline
                        sx={{
                          color: "var(--clr-blue-footer)",
                          bgcolor: "#FFFFFF",
                          '& fieldset': {
                            borderRadius: '0px 4px 4px 0px',
                          },
                        }}
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": { 
                              padding: '12px 14px',
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
                        inputProps={{ maxLength: 10 }}
                        onInput={(e) => props.onlyNumbers(e)}
                      />
                    </Grid>
                  </Grid>

                  { (props.updateCompanyDetails?.additionalPhone1 === undefined || props.updateCompanyDetails.additionalPhone1 === "") && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      { props.errInput}
                    </FormHelperText>
                  )}
                  {(( props.updateCompanyDetails?.additionalPhone1 !== "" ||  props.updateCompanyDetails?.additionalPhone1 !== undefined) &&
                    ( props.updateCompanyDetails?.additionalPhone1?.length !== 10)) && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {(props.updateCompanyDetails?.additionalPhone1 === undefined || props.updateCompanyDetails.additionalPhone1 === "") || props.mobileNumberError}
                      </FormHelperText>
                    )}
                </Box>
              </Grid>

              <Grid item direction={"column"} xs={12} md={6}>
                <Box>
                  <InputLabel
                    sx={{
                      py: 0.5,
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Number 2&nbsp;
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      *
                    </span>
                  </InputLabel>
                  <Grid container>
                    <Grid item xs={2} md={2}>
                    <TextField
                        variant="outlined"
                        defaultValue="+91"
                        disabled
                        disableUnderline
                        sx={{
                          color: "var(--clr-blue-footer)",
                          fontSize: "14px",
                          '& fieldset': {
                            borderRadius: '4px 0px 0px 4px',
                          },
                        }}
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": { 
                              padding: '12px 14px',
                            },
                            /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                              border: "1px solid var(--clr-blue-light)",
                            }, */
                            "&:hover": {
                              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                border: "1px solid black",
                              },
                            },
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={10} md={10}>
                      <TextField
                        variant="outlined"
                        placeholder="90123456789"
                        onChange={props.handleCompanyDetailsChange(
                          "additionalPhone2"
                        )}
                        onKeyDown={props.handleUpdateCompanyDetails}
                        defaultValue={props.hospitalDetails?.additionalPhone2}
                        error={
                          props.updateCompanyDetails.additionalPhone2 === "" &&
                          props.errInput
                        }
                        id="additionalPhone2"
                        type="text"
                        fullWidth
                        size="small"
                        disableUnderline
                        sx={{
                          color: "var(--clr-blue-footer)",
                          bgcolor: "#FFFFFF",
                          '& fieldset': {
                            borderRadius: '0px 4px 4px 0px',
                          },
                        }}
                       InputProps={{
                        sx: {
                        ".MuiOutlinedInput-input": { 
                          padding: '12px 14px',
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
                        inputProps={{ maxLength: 10 }}
                        onInput={(e) => props.onlyNumbers(e)}
                      />
                    </Grid>
                  </Grid>

                  {(props.updateCompanyDetails?.additionalPhone2 === undefined || props.updateCompanyDetails.additionalPhone2 === "") && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {props.errInput}
                    </FormHelperText>
                  )}
                  {(( props.updateCompanyDetails?.additionalPhone2 !== "" ||  props.updateCompanyDetails?.additionalPhone2 !== undefined) &&
                    ( props.updateCompanyDetails?.additionalPhone2?.length !== 10)) && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {(props.updateCompanyDetails?.additionalPhone2 === undefined || props.updateCompanyDetails.additionalPhone2 === "") || props.mobileNumberError}
                      </FormHelperText>
                    )}
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={12}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 3,
                    padding: 0,
                  }}
                >
                  <Button
                    sx={{ borderRadius: 16, fontWeight: "600", borderWidth: "2px !important" }}
                    variant="outlined"
                    fullWidth={matches && true}
                    onClick={props.handleCancelUpdateCompanyDetails}
                  >
                    Cancel
                  </Button>

                  <Button
                    sx={{ borderRadius: 16, fontWeight: "600" }}
                    variant="contained"
                    fullWidth={matches && true}
                    onClick={(event) => props.handleUpdateCompanyDetails(event, "onClick")}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* update company details end */}
      </>
    )}
  </Box>
  )
}
