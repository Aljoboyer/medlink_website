import React from 'react'
import EditIcon from "@mui/icons-material/Edit";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box, 
  Card,  FormHelperText,  Grid, IconButton, Input, TextField, 
  InputLabel,  Tooltip, Typography
} from "@mui/material";
import Button from "@mui/material/Button";
// Swiper react slider
// import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
// import { makeStyles } from "@material-ui/core/styles";
// import { styled } from "@material-ui/styles";
import CancelIcon from '@mui/icons-material/Cancel';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import MuiAlert from '@mui/material/Alert';
// import InputBase from "@mui/material/InputBase";
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { encode } from 'base-64';
// import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
// import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
// import { Swiper, SwiperSlide } from "swiper/react";

const styleResponsive = {
  position: "relative",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 1,
  px: 2,
  py: 2,
};

export const AccountDetails = (props) => {
  
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <Box>
    {!props.showUpdateAccountDetails ? (
      <>
        <Card
          sx={{
            borderRadius: "0.5rem",
            boxShadow: matches ? "0px 0px 0px 0px" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
            border : matches && "1px solid #E4EEF5",
            pt: matches ? 1.25 : 1,
            px: matches ? 1.25 : 3,
            pb: matches ? 1.25 : 3,
            my: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "#395987", fontWeight: "700", fontSize : matches ? "18px" : "24px"  }}
            gutterBottom
            component="div"
          >
            Account Details
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
                  Username:
                </Typography>
              </Grid>
              <Grid item xs={6} sm={7} md={5.5}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", wordWrap: "break-word", fontSize : "14px"  }}
                >
                  {props.getUserNameAndEmail?.Username}
                </Typography>
              </Grid>
              <Grid item xs={1} sm={1} md={3.5}>
                <Tooltip title="Edit Account Details">
                <IconButton sx={{ ml: "-15px", mt: "-15px" }} onClick={props.onClickUpdateAccountDetails}>
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
                  Email for Communication:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", wordWrap: "break-word", fontSize : "14px"  }}
                >
                  {Object?.keys(props.getUserNameAndEmail)?.length !== 0 &&
                    props.getUserNameAndEmail?.UserAttributes[2]?.Value}
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
                  Role:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", fontSize : "14px"  }}
                >
                  {props.hospitalDetails?.role}
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
                  Reporting Manager:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", fontSize : "14px"  }}
                >
                  {props.hospitalDetails?.reportingManager}
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
                  Mobile Number:
                </Typography>
              </Grid>
              <Grid item xs={7} sm={8} md={9}>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ textAlign: "left", fontSize: "14px" }}
                >
                  {
                    props.hospitalDetails?.mobile ? (
                      <>
                        {props.hospitalDetails?.mobile ? <>+91 {props.hospitalDetails?.mobile}</> : ''}
                        {props.hospitalDetails?.phoneVerified ? (
                          <img src={props.greenTick} alt="greenTick" style={{ height: "15px", marginLeft: "5px" }} />
                        ) : (
                          <>{props.hospitalDetails?.mobile ? <span onClick={props.handleVerifyPhoneNumber} style={{ cursor: "pointer", color: "red", textDecoration: "underline", marginLeft: "7px" }}>verify</span> : ''}</>
                        )}
                      </>
                    ) : (
                      <>
                        {props.hospital?.contactPhone ? <>+91 {props.hospital?.contactPhone}</> : ''}
                        {props.hospitalDetails?.phoneVerified ? (
                          <img src={props.greenTick} alt="greenTick" style={{ height: "15px", marginLeft: "5px" }} />
                        ) : (
                          <>{props.hospital?.contactPhone ? <span onClick={props.handleVerifyPhoneNumber} style={{ cursor: "pointer", color: "red", textDecoration: "underline", marginLeft: "7px" }}>verify</span> : ''}</>
                        )}
                      </>
                    )
                  }

                  <Modal
                    open={props.openAddModal}
                    onClose={props.hanldeCloseAddModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={!matches ? props.style : styleResponsive}>
                      <Box sx={{ display: "flex", flexDirection: "column", }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography sx={{ color: "var(--clr-blue-footer)", fontWeight: "600", fontSize: "18px" }} variant="h6" component="h2">
                            Verify Phone Number
                          </Typography>
                          <CancelIcon style={{ color: "var(--clr-white-icon)" }} onClick={props.hanldeCloseAddModal} />
                        </Box>
                        <Typography variant="body2" sx={{ mt: 2, py: 2, color: "var(--clr-gray-2)" }}>Please enter One Time Code sent to +91{props.hospitalDetails?.mobile}</Typography>
                        <Box sx={{ width: "100%" }}>
                          <TextField
                            disableUnderline
                            rows={1}
                            fullWidth
                            name="otpCode"
                            type="text"
                            placeholder="Enter OTP"
                            // error={otpCode === "" && errInput}
                            value={props.otpCode}
                            onChange={(e) => props.setOtpCode(e.target.value)}
                            onKeyDown={props.handleVerifyOTP}
                            sx={{ py: 1, borderRadius: 1, display: "block !important" }}
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": {
                                  padding: '10.5px 14px',
                                },
                                ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid var(--clr-blue-light)",
                                },
                                "&:hover": {
                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid var(--clr-blue-primary)",
                                  },
                                },
                              }
                            }}
                          />
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mr: 1 }}>
                            <Typography
                              sx={{
                                color: "var(--clr-blue-footer)",
                                fontWeight: 600, textAlign: "right", order: 2
                              }}
                              variant="subtitle2"
                            >
                              {props.seconds !== 0 && <Typography variant="body2" sx={{
                                color: "gray",
                                fontWeight: 500, textAlign: "right", py: 1
                              }}>Resend code in 0{props.seconds / 60 | 0}:{props.seconds % 60}s </Typography>}
                              {props.seconds === 0 && <Button onClick={props.hanldeResetCountdown} sx={{
                                color: "var(--clr-blue-footer)",
                                fontWeight: 600, textAlign: "right"
                              }}>Resend code</Button>}
                            </Typography>
                            <Typography sx={{ order: 1 }}>
                              {props.error !== "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {props.error}
                                </FormHelperText>
                              )}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "right", gap: 2, py: 1 }}>
                            <Button
                              variant="outlined"
                              onClick={props.hanldeCloseAddModal}
                              sx={{ borderRadius: 16, borderWidth: "2px !important" }}
                            >
                              cancel
                            </Button>
                            <Button
                              variant="contained"
                              className="save-btn"
                              onClick={(event) => props.handleVerifyOTP(event, "onClick")}
                              sx={{ borderRadius: 16 }}
                            >
                              Confirm
                            </Button>
                          </Box>
                          <Typography variant="body2" sx={{ pt: 2, color: "var(--clr-gray-3)" }}>Help us to verify your contacts for relevant jobs by adding more details.</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Modal>
                  <Snackbar open={props.openSnackbar} autoHideDuration={6000} onClose={props.handleCloseSnackbar}>
                    <props.Alert onClose={props.handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                      {props.firstOtpSentMessage}
                      {
                        props.phoneVerified && <>{props.phoneVerified}</>
                      }
                      {
                        props.resendCode
                      }
                    </props.Alert>
                  </Snackbar>{/* {console.log(otpError)} */}
                  {
                    props.otpError &&
                    <Snackbar open={props.openSnackbar} autoHideDuration={6000} onClose={props.handleCloseSnackbar}>
                      <props.Alert onClose={props.handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                        {props.otpError}
                      </props.Alert>
                    </Snackbar>}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </>
    ) : (
      <>
        {/* update account detaiils start*/}
        <Box item sx={{ px: matches ? 1.25 : 5, py: matches ? 1.5 : 3.5, boxShadow: matches ? "0px 0px 0px 0px" : "0px 9px 18px rgba(69, 143, 246, 0.09)", border : matches && "1px solid #E4EEF5", borderRadius: 1, my: 2 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: "600",
              color: "var(--clr-blue-footer)", 
              fontSize : matches ? "18px" : "24px"  
            }}
          >
            Update Account Detaiils
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
                    Username&nbsp;
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
                  {/* <Input
                    disabled
                    variant="outlined"
                    defaultValue={props.getUserNameAndEmail?.Username}
                    placeholder="Enter User Name"
                    id="userName"
                    type="text"
                    fullWidth
                    disableUnderline
                    sx={{
                      color: "var(--clr-blue-footer)",
                      bgcolor: "#FFFFFF",
                      borderRadius: "4px",
                      mt: 0,
                    }}
                  /> */}
                  <TextField
                    disabled
                    variant="outlined"
                    defaultValue={props.getUserNameAndEmail?.Username}
                    placeholder="Enter User Name"
                    id="userName"
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
                        },*/
                        "&:hover": {
                          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid black",
                          },
                        }, 
                      }
                    }}
                  />
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
                    Email for Communication&nbsp;
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
                  {/* <Input
                    disabled
                    variant="outlined"
                    defaultValue={Object?.keys(props.getUserNameAndEmail)?.length !== 0 &&
                      props.getUserNameAndEmail?.UserAttributes[2]?.Value}
                    // placeholder= {Object?.keys(props.getUserNameAndEmail)?.length !== 0 &&
                      // props.getUserNameAndEmail?.UserAttributes[2]?.Value}
                    id="userName"
                    type="email"
                    fullWidth
                    disableUnderline
                    sx={{
                      color: "var(--clr-blue-footer)",
                      bgcolor: "#FFFFFF",
                      borderRadius: "4px",
                      mt: 0,
                    }}
                  /> */}
                  <TextField
                    disabled
                    variant="outlined"
                    defaultValue={Object?.keys(props.getUserNameAndEmail)?.length !== 0 &&
                      props.getUserNameAndEmail?.UserAttributes[2]?.Value}
                    // placeholder= {Object?.keys(props.getUserNameAndEmail)?.length !== 0 &&
                      // props.getUserNameAndEmail?.UserAttributes[2]?.Value}
                    id="userName"
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
                          padding: '12px 14px',
                        },
                        /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                          border: "1px solid var(--clr-blue-light)",
                        },*/
                        "&:hover": {
                          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "1px solid black",
                          },
                        }, 
                      }
                    }}
                  />
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
                    Role&nbsp;
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
                    placeholder="Manager"
                    onChange={props.handleAccountDetailsChange("role")}
                    onKeyDown={props.handleUpdateAccountDetails}
                    defaultValue={props.hospitalDetails?.role}
                    // error={props.updateAccountDeatils?.role === "" && props.errInput}
                    id="Manager"
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
                  {(props.updateAccountDeatils?.role === "" || props.updateAccountDeatils?.role === undefined) && (
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
                    Reporting Manager&nbsp;
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
                    placeholder="Manager"
                    onChange={props.handleAccountDetailsChange(
                      "reportingManager"
                    )}
                    onKeyDown={props.handleUpdateAccountDetails}
                    defaultValue={props.hospitalDetails?.reportingManager}
                    // error={
                    //   props.updateAccountDeatils?.reportingManager === "" &&
                    //   props.errInput
                    // }
                    id="Manager"
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
                  {(props.updateAccountDeatils?.reportingManager === "" || props.updateAccountDeatils?.reportingManager === undefined) && (
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
                    Mobile Number&nbsp;
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
                        placeholder="9123456789"
                        onChange={props.handleAccountDetailsChange(
                          "mobileNumber"
                        )}
                        onKeyDown={props.handleUpdateAccountDetails}
                        defaultValue={props.hospitalDetails?.mobile || props.hospital?.contactPhone}
                        // error={
                        //   props.updateAccountDeatils?.mobileNumber === "" &&
                        //   props.errInput
                        // }
                        id="userName"
                        type="text"
                        fullWidth
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

                  {(props.updateAccountDeatils?.mobileNumber === "" || props.updateAccountDeatils?.mobileNumber === undefined) && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {props.errInput}
                    </FormHelperText>
                  )}
                  {((props.updateAccountDeatils?.mobileNumber !== "" || props.updateAccountDeatils?.mobileNumber !== undefined) &&
                    (props.updateAccountDeatils?.mobileNumber?.length !== 10)) && (
                      <FormHelperText sx={{ color: "red", mb: 1 }}>
                        {(props.updateAccountDeatils?.mobileNumber === "" || props.updateAccountDeatils?.mobileNumber === undefined) || props.mobileNumberError}
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
                    onClick={props.handleCancelUpdateAccountDetails}
                  >
                    Cancel
                  </Button>

                  <Button
                    sx={{ borderRadius: 16, fontWeight: "600" }}
                    variant="contained"
                    fullWidth={matches && true}
                    onClick={(event) => props.handleUpdateAccountDetails(event, "onClick")}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* update account details end*/}
      </>
    )}
  </Box>
  )
}
