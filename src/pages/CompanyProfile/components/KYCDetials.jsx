import React, { useEffect, useState } from 'react'
import EditIcon from "@mui/icons-material/Edit"; 
import {
  Box, 
  Card, FormHelperText, Grid, IconButton, TextField, 
  InputLabel, MenuItem, Select, Tooltip, Typography, Autocomplete
} from "@mui/material";
import Button from "@mui/material/Button"; 
import { makeStyles, ThemeProvider } from "@material-ui/core/styles"; 
import { createTheme, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery"; 
import "swiper/css";  
import { gqlquery } from "../../../api/hospitalIndex";

const useStyles = makeStyles({
    icon: {
      fill: "var(--clr-blue-footer)",
    },
    menuPaper: {
      maxHeight: 180,
    },
})

const ItisThim = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          borderColor: "var(--clr-blue-light)",
          "&: .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--clr-blue-light)",
            color: "var(--clr-blue-footer)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--clr-blue-primary)",
          },

        },
      }
    }
  }
});

export const KYCDetials = (props) => { 
  const classes = useStyles();
  const theme = useTheme();
  const { SelectPlaceholder } = props;
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  
  return (
    <Box>
    {!props.showUpdateKYCComplianceDetails ? (
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
            KYC Compliance Details
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
                  PAN Number:
                </Typography>
              </Grid>
              <Grid item xs={6} sm={7} md={5.5}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.pan}
                </Typography>
              </Grid>
              <Grid item xs={1} sm={1} md={3.5}>
                <Tooltip title="Edit KYC Compliance Details">
                  <IconButton sx={{ ml: "-15px", mt: "-15px" }} onClick={props.onClickUpdateKYCComplianceDetails}>
                    <EditIcon 
                      fontSize="small"
                      sx={{
                        color: "#5A98F2",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
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
                  Address Label:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.address}
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
                  Country:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.country ? props.hospitalDetails?.country?.charAt(0) + props.hospitalDetails?.country?.slice(1)?.toLowerCase() : ""}
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
                  State:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.state}
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
                  City:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.city}
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
                  PIN Code:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", fontSize : "14px" }}
                >
                  {props.hospitalDetails?.pincode}
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
                  GSTIN:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", wordWrap: "break-word", fontSize : "14px"}}
                >
                  {props.hospitalDetails?.gstin || props.hospital?.taxNumber}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </>
    ) : (
      <>
        {/* update kyc detaiils */}
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
            Update KYC Compliance Details
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
                    PAN Number&nbsp;
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
                    placeholder="Enter Your PAN Number"
                    onChange={props.handleKYCComplianceDetailsChange("pan")}
                    onKeyDown={props.handleUpdateKYCComplianceDetails}
                    defaultValue={props.hospitalDetails?.pan}
                    // error={
                    //   (props.updateKycComplianceDetails.pan === "" || props.updateKycComplianceDetails.pan === undefined) && props.errInput
                    // }
                    id="pan"
                    size="small"
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
                          padding: '10.5px 14px',
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
                  {(props.updateKycComplianceDetails.pan === "" || props.updateKycComplianceDetails.pan === undefined) && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {props.errInput}
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
                    Address Label&nbsp;
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
                    placeholder="Address"
                    onChange={props.handleKYCComplianceDetailsChange(
                      "address"
                    )}
                    onKeyDown={props.handleUpdateKYCComplianceDetails}
                    defaultValue={props.hospitalDetails?.address} 
                    id="address"
                    size="small"
                    type="email"
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
                          padding: '10.5px 14px',
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
                  {(props.updateKycComplianceDetails.address === "" || props.updateKycComplianceDetails.address === undefined) && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {props.errInput}
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
                  > Country&nbsp; <span style={{
                        color: "red", 
                        fontWeight: "600",
                      }}
                    > {" "} * </span>
                  </InputLabel>  
                  <Select
                    fullWidth 
                    onChange={props.handleKYCComplianceDetailsChange(
                      "country"
                    )}
                    onKeyDown={props.handleUpdateKYCComplianceDetails}
                    value={props.updateKycComplianceDetails?.country} 
                    sx={{
                      backgroundColor: "#ffffff",
                      width: "100%",
                      color: "#616161",
                      height: "47px"
                    }}
                    displayEmpty
                    renderValue={((props.updateKycComplianceDetails?.country === null) || !props.updateKycComplianceDetails?.country) ?
                       () => ( <SelectPlaceholder>Select Country</SelectPlaceholder>
                    ) : undefined }
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value={undefined} disabled>
                      Select Country
                    </MenuItem>
                    <MenuItem value="India">India</MenuItem> 
                  </Select>
                  {(props.updateKycComplianceDetails.country === "" || props.updateKycComplianceDetails.country === undefined) && (
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
                  > State&nbsp; <span style={{
                        color: "red", 
                        fontWeight: "600",
                      }}
                    > {" "} * </span>
                  </InputLabel>  
                  <Select
                    fullWidth 
                    onChange={props.handleKYCComplianceDetailsChange("state")}
                    onKeyDown={props.handleUpdateKYCComplianceDetails}
                    value={props.updateKycComplianceDetails?.state} 
                    sx={{  
                      color: "#616161",
                      height: "47px"
                    }}
                    displayEmpty
                    renderValue={props.updateKycComplianceDetails?.state ?
                      undefined : () => (
                      <SelectPlaceholder>Select State</SelectPlaceholder>
                    )}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}
                  >
                    <MenuItem value="" disabled>
                      Select State
                    </MenuItem>
                    {props.allState?.map((state) => (
                      <MenuItem key={state?.state} value={state?.state}>
                        {state?.state}
                      </MenuItem>
                    ))} 
                  </Select>
                  {(props.updateKycComplianceDetails.state === "" || props.updateKycComplianceDetails.state === undefined) && (
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
                >City&nbsp; <span style={{
                      color: "red", 
                      fontWeight: "600",
                    }}
                  > {" "} * </span>
                </InputLabel> 
                <ThemeProvider theme={ItisThim}> 
                  <Autocomplete
                    value={{city: props.updateKycComplianceDetails?.city, lmID: props.updateKycComplianceDetails?.location?.lmID}}
                    disablePortal
                    id="combo-box-demo"
                    sx={{
                      "& .MuiAutocomplete-inputRoot":{
                        padding: '3px 0px 3px 7px',
                        border: "0.1px solid var(--clr-blue-light) !important",
                      }
                    }}
                    onChange={(event, newValue) => { 
                      props.setUpdateKycComplianceDetails({...props.updateKycComplianceDetails, city: newValue?.city, location: newValue}) 
                    }}

                    // onKeyDown={handleAddPersonalDetails}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        // Prevent's default 'Enter' behavior.
                        event.defaultMuiPrevented = true;
                        // your handler code
                      }
                    }}

                    disabled={props.updateKycComplianceDetails?.state ? false : true}
                    options={props.allCityLocation}
                    getOptionLabel={(option) => option?.city}
                    renderInput={(params) => <TextField
                      onChange={(e) => {
                        props.SearchPresentCity(e)
                    }}
                    placeholder="Select Location"
                    {...params} />}
                  />
                  {((!props.updateKycComplianceDetails.state) && (
                      <FormHelperText sx={{ color: "gray", mb: 1 }}> 
                        You have to select State first.
                      </FormHelperText>
                    ))} 
                    {((props.updateKycComplianceDetails?.state) &&(!props.updateKycComplianceDetails?.city)) && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}> 
                        {props.error}
                      </FormHelperText>
                    )} 
                  </ThemeProvider>
                  
                  {/* {(props.updateKycComplianceDetails.city === "" || props.updateKycComplianceDetails.city === undefined) && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {props.error}
                    </FormHelperText>
                  )} */}
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
                    PIN Code&nbsp;
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
                    placeholder="Enter PIN Code"
                    onChange={props.handleKYCComplianceDetailsChange(
                      "pincode"
                    )}
                    onKeyDown={props.handleUpdateKYCComplianceDetails}
                    defaultValue={props.hospitalDetails?.pincode}
                    // error={
                    //   (props.updateKycComplianceDetails.picncode === "" || props.updateKycComplianceDetails.picncode === undefined) &&
                    //     props.errInput
                    // }
                    id="pincode"
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
                          padding: '10.5px 14px',
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
                    inputProps={{ maxLength: 6 }}
                    onInput={(e) => props.onlyNumbers(e)}
                  />
                  {(props.updateKycComplianceDetails.pincode === "" || props.updateKycComplianceDetails.pincode === undefined) && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {props.errInput}
                    </FormHelperText>
                  )}
                 {((props.updateKycComplianceDetails.pincode !== "" || props.updateKycComplianceDetails.pincode !== undefined) && (props.updateKycComplianceDetails?.pincode?.length !== 6)) && (
                  <FormHelperText
                      sx={{
                          color: "red",
                          mb: 0,
                          textAlign: "left",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                      }}
                  >
                      {(props.updateKycComplianceDetails.pincode === "" || props.updateKycComplianceDetails.pincode === undefined) || props.validPinNumErr}
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
                    GSTIN&nbsp;
                    {/* <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {" "}
                      *
                    </span> */}
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    placeholder="Enter GSTIN"
                    defaultValue={props.hospitalDetails?.gstin || props.hospital?.taxNumber}
                    onChange={props.handleKYCComplianceDetailsChange("gstin")}
                    onKeyDown={props.handleUpdateKYCComplianceDetails}
                    // error={
                    // ((props.updateKycComplianceDetails.gstin !== "") &&
                    // (props.gstRegex.test(props.updateKycComplianceDetails.gstin) ===
                    // false)) &&
                    // props.errInput
                    // }
                    id="gstin"
                    type="text"
                    fullWidth
                    disableUnderline
                    sx={{
                      color: "var(--clr-blue-footer)",
                      bgcolor: "#FFFFFF",
                      borderRadius: "4px",
                      mt: 0,
                    }}
                    inputProps={{ maxLength: 15 }}
                    InputProps={{
                      sx: {
                        ".MuiOutlinedInput-input": { 
                          padding: '10.5px 14px',
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
                  {/* {(props.updateKycComplianceDetails.gstin === "" || props.updateKycComplianceDetails.gstin === undefined) && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {props?.errInput}
                    </FormHelperText>
                  )} */}
                  {((props.updateKycComplianceDetails.gstin !== "" || props.updateKycComplianceDetails.gstin !== undefined) && (props.gstRegex.test(props.updateKycComplianceDetails.gstin) === false)) && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {(props.updateKycComplianceDetails.gstin === "" || props.updateKycComplianceDetails.gstin === undefined) || props.validGstin}
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
                    onClick={props.handleCancelUpdateKYCComplianceDetails}
                  >
                    Cancel
                  </Button>

                  <Button
                    sx={{ borderRadius: 16, fontWeight: "600" }}
                    variant="contained"
                    fullWidth={matches && true}
                    onClick={(event) => props.handleUpdateKYCComplianceDetails(event, "onClick")}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>

        </Box>
        {/* update kyc details */}
      </>
    )}
  </Box>
  )
}
