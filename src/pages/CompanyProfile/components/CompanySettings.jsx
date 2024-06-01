import React, { useEffect } from 'react'
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, FormHelperText, Grid, IconButton, TextField, InputLabel, Typography, InputAdornment, Skeleton, Checkbox, Modal } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "swiper/css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gqlquery } from '../../../api/hospitalIndex';

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles({
    icon: {
        fill: "var(--clr-blue-footer)",
    },
})

export default function CompanySettings(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const [passwordEdit, setPasswordEdit] = useState(false);
    const [values, setValues] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        subToNewsletter: false
    });
    const [error, setError] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [oldShowPassword, setOldShowPassword] = useState(false);
    const [newshowPassword, setNewShowPassword] = useState(false);
    const [ConfirmshowPassword, setConfirmShowPassword] = useState(false);
    // const [loadingSkletonChangePassword, setLoadingSkletonChangePassword] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [newsletterLoading, setNewsletterLoading] = useState(true);
    const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
    const [newsletterUnSubscribed, setNewsletterUnSubscribed] = useState(false);
    const access_token = sessionStorage.getItem("accessToken");

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    useEffect(() => {
        console.count("coming inside effect")
      if (props?.hospital?.newsletter !== undefined) {
        setValues({ ...values, "subToNewsletter": props?.hospital?.newsletter });
        setNewsletterLoading(false);
      }
    }, [props?.hospital?.newsletter]);

    const handleCheckbox = (event) => {
    //   setValues({ ...values, subToNewsletter: event.target.checked });

      const QUERY_VERIFYPHONENUMBER = {
        query: `mutation MyMutation {
                UpdateHospitalNewsletter(hospitalID: "${props.adminHospitalData?.hospitalID}", newsletter: ${event.target.checked}) {
                  newsletter
                }
              }
        `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_VERIFYPHONENUMBER, null)
        .then((res) => res.json())
        .then((datas) => {
          console.log(745324, datas?.data?.UpdateHospitalNewsletter);
          if (datas?.data?.UpdateHospitalNewsletter?.newsletter === true) {
            setOpen(true);
            setNewsletterSubscribed(true);
            setNewsletterUnSubscribed(false);
            props.updateList(pre => !pre);
          }
          if (datas?.data?.UpdateHospitalNewsletter?.newsletter === false) {
            setOpen(true);
            setNewsletterUnSubscribed(true);
            setNewsletterSubscribed(false);
            props.updateList(pre => !pre);
          }
        });
    };
    console.log( newsletterLoading, "props?.hospital?.newsletter", props?.hospital?.newsletter, 4, )

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const openPasswordChange = () => {
        setPasswordEdit(true);
        // setLoadingSkletonChangePassword(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setNewsletterSubscribed(false);
        setNewsletterUnSubscribed(false);
    };
    //password validation 
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const handleResetPassword = async () => {
        // console.log(values);
        if (
            values.oldPassword === "" ||
            values.newPassword === "" ||
            values.confirmNewPassword === ""
        ) {
            setError("Old password is mandatory!");
            setErrorPassword("New password is mandatory!");
            setErrorConfirmPassword("Confirm new password is mandatory!");
            return;
        }
        // if (values.oldPassword === "" || values.newPassword === "" || values.confirmNewPassword === "") {
        //   setError("Inputs can't be empty!")
        //   return setOpen(true);;
        // } else {
        //   setError("");
        // }

        let finalpassword;
        if (values.newPassword === values.confirmNewPassword) {
            finalpassword = values.newPassword;
            setError("");
        } else {
            setError("Password didn't match.")
            return setOpen(true);;
        }

        if (finalpassword === values.oldPassword) {
            setError("New password can't be the same as the old password.");
            return setOpen(true);
        } else {
            setError("");
        }

        var chnagePasswordParams = {
            AccessToken: access_token,
            PreviousPassword: values.oldPassword,
            ProposedPassword: finalpassword,
        };
        console.log(chnagePasswordParams)

        try {
            const res = await provider.changePassword(chnagePasswordParams);
            if (res?.$metadata?.requestId) {
                setSuccess(true);
                setOpen(true);
                setValues({
                    oldPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                })
                values.oldPassword = "";
                values.newPassword = "";
                values.confirmNewPassword = "";
                setError("");
                setPasswordEdit(false);
                setTimeout(() => {
                    setModalOpen(true)
                    sessionStorage.clear();
                }, 1000)
            }
        }
        catch (err) {
            console.log(err);
            if (err.message.includes("Incorrect username or password.")) {
                setError("Your Old Password is incorrect");
            }
            else if (err.message.includes(`Password did not conform with policy: Password must have numeric characters`)) {
                setError("Password did not conform with policy: Password must have numeric characters, special characters");

            }
            else if (err.message.includes("Password did not conform with policy: Password must have symbol characters")) {
                setError("Password did not conform with policy: Password must have symbol characters");

            }
            else if (err.message.includes("Attempt limit exceeded, please try after some time")) {
                setError("Attempt limit exceeded, please try after some time");
            }
            else if (err.message.includes("Password did not conform with policy: Password must have uppercase characters")) {
                setError("Password did not conform with policy: Password must have uppercase characters");
            }
            else {
                // setError(err.message);
                setError("Password did not conform with policy: Password must have numeric characters, special characters, One Uppercase characters else block");
            }
            setOpen(true);
            return;
        }
        setError("");
        setErrorPassword("");
        setErrorConfirmPassword("");
    }

    const handleModalClose = () => {
        setModalOpen(false);
        // navigate("/")
    }

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
                boxShadow: matches
                  ? "0px 0px 0px 0px"
                  : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                border: matches && "1px solid #E4EEF5",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#395987",
                  fontWeight: "700",
                  fontSize: matches ? "18px" : "24px",
                  mb: !props.matches ? 4 : 3,
                }}
                gutterBottom
                component="div"
              >
                Settings
              </Typography>

              <Grid>
                <Grid container spacing={2}>
                  <Grid item xs={11} sm={4} md={3}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        // textAlign: props.matches ? "left" : "right",
                        color: "#4F4F4F",
                        fontWeight: "600",
                        fontSize: !props.matches ? "1rem" : "14px",
                      }}
                    >
                      Newsletter Subscription
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={7} md={5.5}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ textAlign: "left", fontSize: "14px" }}
                    ></Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8} md={6}>
                    <Typography
                      sx={{
                        fontSize: !props.matches ? "16px" : "14px",
                        color: "var(--clr-gray-3)",
                        fontWeight: 600,
                        letterSpacing: 0,
                        mt: !props.matches ? -0.6 : -2.8,
                      }}
                    >
                      {newsletterLoading ? (
                        <Checkbox
                          name="subToNewsletter"
                          checked={values.subToNewsletter}
                          onChange={(e) => handleCheckbox(e)}
                          sx={{
                            ml: -1.4,
                            mr: -0.8,
                            color: "#BDBDBD !important",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary) !important",
                            },
                          }}
                        />
                      ) : (
                        <Checkbox
                          name="subToNewsletter"
                          checked={values.subToNewsletter}
                          onChange={(e) => handleCheckbox(e)}
                          sx={{
                            ml: -1.4,
                            mr: -0.8,
                            color: "#BDBDBD !important",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary) !important",
                            },
                          }}
                        />
                      )}
                      Subscribe to our Newsletter
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={7} md={5.5}>
                    <Typography
                      variant="body2"
                      gutterBottom
                      sx={{ textAlign: "left", fontSize: "14px" }}
                    ></Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={5} sm={4} md={3}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        // textAlign: props.matches ? "left" : "right",
                        mt: !props.matches ? 1.5 : -0.5,
                        color: "#4F4F4F",
                        fontWeight: "600",
                        fontSize: !props.matches ? "1rem" : "14px",
                        // cursor: "pointer"
                      }}
                    >
                      Password
                    </Typography>
                  </Grid>
                  <Grid item xs={7} sm={8} md={9}></Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} md={3}>
                    <Typography
                      onClick={openPasswordChange}
                      variant="subtitle2"
                      gutterBottom
                      sx={{
                        // textAlign: props.matches ? "left" : "right",
                        fontSize: !props.matches ? "1rem" : "14px",
                        cursor: "pointer",
                        color: "var(--clr-gray-3)",
                        fontWeight: 600,
                      }}
                    >
                      Change Password
                    </Typography>
                  </Grid>
                  <Grid item xs={13} sm={8} md={9}></Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={7} md={7}>
                    {passwordEdit && (
                      <Box sx={{ textAlign: "left", fontSize: "14px" }}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: !props.matches ? 3 : 1.5,
                          }}
                        >
                          <Box>
                            <InputLabel sx={{ py: 0.5 }}>
                              Old Password
                              <span style={{ color: "red" }}> *</span>
                            </InputLabel>
                            <TextField
                              placeholder="Enter Old Password"
                              // type="text"
                              type={oldShowPassword ? "text" : "password"}
                              fullWidth
                              value={values.oldPassword}
                              onChange={handleChange("oldPassword")}
                              sx={{ borderRadius: 1 }}
                              disableUnderline
                              InputProps={{
                                sx: {
                                  ".MuiOutlinedInput-input": {
                                    padding: "10.5px 14px",
                                  },
                                  /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                    {
                                      border: "1px solid var(--clr-blue-light)",
                                    },
                                  "&:hover": {
                                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                      {
                                        border:
                                          "1px solid var(--clr-blue-primary)",
                                      },
                                  }, */
                                },
                                endAdornment: (
                                  <InputAdornment
                                    sx={{ mr: 0.5 }}
                                    position="end"
                                  >
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        setOldShowPassword(!oldShowPassword)
                                      }
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {oldShowPassword ? (
                                        <VisibilityOff
                                          sx={{
                                            color: "var(--clr-blue-footer)",
                                          }}
                                        />
                                      ) : (
                                        <Visibility
                                          sx={{
                                            color: "var(--clr-blue-footer)",
                                          }}
                                        />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              size="small"
                            />
                            {values.oldPassword === "" && (
                              <FormHelperText sx={{ color: "red", mt: 0 }}>
                                {error}
                              </FormHelperText>
                            )}
                          </Box>

                          <Box>
                            <InputLabel sx={{ py: 0.5 }}>
                              New Password
                              <span style={{ color: "red" }}> *</span>
                            </InputLabel>
                            <TextField
                              placeholder="Enter Password"
                              type={newshowPassword ? "text" : "password"}
                              fullWidth
                              value={values.newPassword}
                              onChange={handleChange("newPassword")}
                              sx={{ borderRadius: 1 }}
                              disableUnderline
                              InputProps={{
                                sx: {
                                  ".MuiOutlinedInput-input": {
                                    padding: "10.5px 14px",
                                  },
                                  /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                    {
                                      border: "1px solid var(--clr-blue-light)",
                                    },
                                  "&:hover": {
                                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                      {
                                        border:
                                          "1px solid var(--clr-blue-primary)",
                                      },
                                  }, */
                                },
                                endAdornment: (
                                  <InputAdornment
                                    sx={{ mr: 0.5 }}
                                    position="end"
                                  >
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        setNewShowPassword(!newshowPassword)
                                      }
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {newshowPassword ? (
                                        <VisibilityOff
                                          sx={{
                                            color: "var(--clr-blue-footer)",
                                          }}
                                        />
                                      ) : (
                                        <Visibility
                                          sx={{
                                            color: "var(--clr-blue-footer)",
                                          }}
                                        />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              size="small"
                            />
                            {values.newPassword === "" && (
                              <FormHelperText sx={{ color: "red", mt: 0 }}>
                                {errorPassword}
                              </FormHelperText>
                            )}
                            {passwordRegex.test(values.newPassword) ===
                              true && (
                              <FormHelperText sx={{ color: "green", mt: 0 }}>
                                Password is strong
                              </FormHelperText>
                            )}
                            {values.newPassword !== "" &&
                              passwordRegex.test(values.newPassword) ===
                                false && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  Password must be at least 8 characters with at
                                  least 1 special character 1 digit and 1
                                  Capital Letter.
                                </FormHelperText>
                              )}
                          </Box>

                          <Box>
                            <InputLabel sx={{ py: 0.5 }}>
                              Confirm New Password
                              <span style={{ color: "red" }}> *</span>
                            </InputLabel>
                            <TextField
                              placeholder="Enter Password Again"
                              type={ConfirmshowPassword ? "text" : "password"}
                              fullWidth
                              value={values.confirmNewPassword}
                              onChange={handleChange("confirmNewPassword")}
                              sx={{ borderRadius: 1 }}
                              disableUnderline
                              InputProps={{
                                sx: {
                                  ".MuiOutlinedInput-input": {
                                    padding: "10.5px 14px",
                                  },
                                  /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                    {
                                      border: "1px solid var(--clr-blue-light)",
                                    },
                                  "&:hover": {
                                    ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                                      {
                                        border:
                                          "1px solid var(--clr-blue-primary)",
                                      },
                                  }, */
                                },
                                endAdornment: (
                                  <InputAdornment
                                    sx={{ mr: 0.5 }}
                                    position="end"
                                  >
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        setConfirmShowPassword(
                                          !ConfirmshowPassword
                                        )
                                      }
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {ConfirmshowPassword ? (
                                        <VisibilityOff
                                          sx={{
                                            color: "var(--clr-blue-footer)",
                                          }}
                                        />
                                      ) : (
                                        <Visibility
                                          sx={{
                                            color: "var(--clr-blue-footer)",
                                          }}
                                        />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              size="small"
                            />
                            {values.confirmNewPassword === "" && (
                              <FormHelperText sx={{ color: "red", mt: 0 }}>
                                {errorConfirmPassword}
                              </FormHelperText>
                            )}
                            {values.confirmNewPassword !== "" &&
                              values.confirmNewPassword !== "" &&
                              values.newPassword !==
                                values.confirmNewPassword && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  Confirm new password - new password do not
                                  match.
                                </FormHelperText>
                              )}
                            {passwordRegex.test(values.confirmNewPassword) ===
                              true && (
                              <FormHelperText sx={{ color: "green", mt: 0 }}>
                                {values.confirmNewPassword !== "" &&
                                values.confirmNewPassword !== "" &&
                                values.newPassword !== values.confirmNewPassword
                                  ? ""
                                  : "Password is strong."}
                              </FormHelperText>
                            )}
                            {values.confirmNewPassword !== "" &&
                              passwordRegex.test(values.confirmNewPassword) ===
                                false && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {values.confirmNewPassword !== "" &&
                                  values.confirmpassword !== "" &&
                                  values.newPassword !==
                                    values.confirmNewPassword
                                    ? ""
                                    : "Password must be at least 8 characters with at least 1 special character 1 digit and 1 Capital Letter."}
                                </FormHelperText>
                              )}
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              mt: 2,
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              onClick={() => {
                                setPasswordEdit(false);
                                values.oldPassword = "";
                                values.newPassword = "";
                                values.confirmNewPassword = "";
                              }}
                              sx={{
                                borderRadius: 16,
                                borderWidth: "2px !important",
                                px: 2,
                              }}
                              variant="outlined"
                            >
                              Cancel
                            </Button>

                            <Button
                              onClick={handleResetPassword}
                              sx={{
                                borderRadius: 16,
                                borderWidth: "2px",
                                px: 2,
                                py: 1,
                              }}
                              variant="contained"
                            >
                              Save
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={13} sm={8} md={9}></Grid>
                </Grid>
              </Grid>
            </Card>
          </>
        ) : (
          <></>
        )}

        {(newsletterSubscribed || newsletterUnSubscribed) && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {newsletterSubscribed &&
                "You have successfully subscribed to our newsletter."}
              {newsletterUnSubscribed &&
                "You have successfully unsubscribed to our newsletter."}
            </Alert>
          </Snackbar>
        )}

        {success && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Your password has been changed successfully!
            </Alert>
          </Snackbar>
        )}
        {error && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}

        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...modalStyle, minWidth: { xs: "250px", md: 500 } }}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              sx={{
                color: "var(--clr-blue-footer)",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Login session expired
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "var(--clr-gray-3)", mt: 2 }}
            >
              Your login session is expired after changing the password!
            </Typography>
            <Typography
              variant="subtilte2"
              sx={{ color: "var(--clr-gray-2)", fontWeight: "600", mt: 1 }}
            >
              Please login again to continue.
            </Typography>
            <Box sx={{ textAlign: "center", p: 4, pb: 1 }}>
              <Button
                onClick={() => navigate("/hospital-login")}
                variant="contained"
                size="small"
              >
                Go to Login
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    );
}


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: 1,
    p: 3,
};