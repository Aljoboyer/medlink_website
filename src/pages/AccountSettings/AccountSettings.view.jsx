import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  Container,
  FormHelperText, IconButton, Input, TextField, InputAdornment, InputLabel,
  Typography,
  useMediaQuery,
  useTheme,
  Skeleton,
  Modal
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { useEffect, useState } from "react";
import { gqlquery, QUERY_LISTPROFILES } from "../../api";
import homeBanner from "../../assets/images/doctors_home_banner.png";
import ProfileSnap from "../../components/ProfileSnap/profileSnap.view";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, useNavigate } from "react-router-dom";
const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AccountSettings = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [emailEdit, setEmailEdit] = useState(false);
  const [phoneEdit, setPhoneEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState([]);
  const [oldShowPassword, setOldShowPassword] = useState(false);
  const [newshowPassword, setNewShowPassword] = useState(false);
  const [ConfirmshowPassword, setConfirmShowPassword] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const access_token = sessionStorage.getItem("accessToken");
  document.title = "Account Settings | MedLink Jobs";
  const [loadingSkleton, setLoadingSkleton] = useState(true);
  const [loadingSkletonChangePassword, setLoadingSkletonChangePassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getUserEmail = async () => {
    const res = await provider.getUser({ AccessToken: access_token });
    setUserEmail(res?.UserAttributes[2].Value);
  };


  useEffect(() => {
    gqlquery(QUERY_LISTPROFILES, null)
      .then((res) => res.json())
      .then((datas) => {
        setProfile(datas?.data?.getProfile);
      })
      .finally(() => setLoadingSkleton(false));
  }, []);

  useEffect(() => {
    if (!userEmail) {
      getUserEmail();
    }
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const openEmailChange = () => {
    setEmailEdit(true);
    setPhoneEdit(false);
    setPasswordEdit(false);
  };
  const openPhoneChange = () => {
    setEmailEdit(false);
    setPhoneEdit(true);
    setPasswordEdit(false);
  };
  const openPasswordChange = () => {
    setEmailEdit(false);
    setPhoneEdit(false);
    setPasswordEdit(true);
    setLoadingSkletonChangePassword(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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
        setTimeout( ()=> {
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
      {matches && (
        <Box
          sx={{
            backgroundColor: "var(--clr-blue-light)",
            padding: "15px 0 15px 17px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {!loadingSkleton ? (
            <>
              <ArrowBackIosNewIcon
                sx={{ color: "var(--clr-blue-footer)", mr: 3.1 }}
              />
              <Typography
                variant="h6"
                sx={{
                  lineHeight: "24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--clr-blue-footer)",
                }}
              >
                Account Settings
              </Typography>
            </>
          ) : (
            <Skeleton style={{ fontSize: "16px" }} width={"50%"} />
          )}
        </Box>
      )}
      {
        !loadingSkleton ? 
      <Box
        style={{
          backgroundImage: !matches ? `url(${homeBanner})` : "",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // filter: loadingSkleton ? `blur(8px)` : "none"
          // opacity: loadingSkleton ? "60%" : 1
        }}
        sx={{ bgcolor: "#FFFFFF", height: !matches ? "240px" : "140px" }}
      ></Box>
            : 
            <>
            {
              !matches ?  <Skeleton sx={{fontSize: "275px", mt: "-70px"}} /> : <div style={{marginTop: "140px"}}></div>
            }
            </>
      }

      <Container sx={{ mx: "auto", marginTop: "-120px" }}>
        <ProfileSnap />
        <Box maxWidth="md" sx={{ mx: "auto", mb: 5 }}>
          <Card
            sx={{
              backgroundColor: "var(--clr-white) !important",
              // boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
              borderRadius: 2,
              minHeight: 400,
              // p: !matches && 2.5,
              py: matches ? 1.75 : 2.5,
              px: matches ? 1.5 : 2.5,
              boxShadow: matches
                ? "none"
                : "0px 9px 18px rgba(69, 143, 246, 0.09)",
              border: matches ? "1px solid #E4EEF5" : "",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                color: "var(--clr-blue-footer)",
                fontSize: !matches ? "24px" : "18px",
                // mb: 3,
              }}
            >
              {!loadingSkleton ? (
                "Account Settings"
              ) : (
                <Skeleton
                  style={{ fontSize: matches ? "18px" : "24px" }}
                  width={matches ? "43%" : "25%"}
                />
              )}
            </Typography>
            <Box
              sx={{
                px: 0.4,
                py: !matches ? 3 : 1.5,
                display: "flex",
                flexDirection: "column",
                gap: matches ? 2.5 : 6,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {/*              <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: !matches ? 8 : 5,
                  }}
                > */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    gutterBottom={matches ? false : true}
                    sx={{
                      color: "#333333",
                      fontWeight: "600",
                      fontSize: !matches ? "1rem" : "14px",
                    }}
                  >
                    {!loadingSkleton ? (
                      "Primary Email"
                    ) : (
                      <Skeleton
                        style={{ fontSize: !matches ? "1rem" : "14px" }}
                        width={matches ? "30%" : "15%"}
                      />
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#828282",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {!loadingSkleton ? (
                      <>{userEmail}</>
                    ) : (
                      <Skeleton
                        style={{ fontSize: matches ? "12px" : "12px" }}
                        width={matches ? "43%" : "25%"}
                      />
                    )}
                  </Typography>
                </Box>
                {/* <IconButton onClick={openEmailChange} sx={{ fontSize: "1rem", }}>
                      <EditIcon fontSize="inherit" sx={{ color: "var(--clr-blue-primary)" }} />
                    </IconButton> */}
                {/* </Box> */}
                {/*  {emailEdit && (
                    <Box sx={{ width: "400px" }}>
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>
                          Change Email
                        </InputLabel>
                        <Input
                          placeholder="Enter your Email"
                          type="email"
                          fullWidth
                          disableUnderline
                          sx={{ borderRadius: 1 }}
                          disabled
                        />
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
                            setEmailEdit(false);
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
                          // onClick={}
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
                  )} */}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {/*                 <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: 6,
                  }}
                > */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    gutterBottom={matches ? false : true}
                    sx={{
                      color: "#333333",
                      fontWeight: "600",
                      fontSize: !matches ? "1rem" : "14px",
                    }}
                  >
                    {!loadingSkleton ? (
                      "Contact Number"
                    ) : (
                      <Skeleton
                        style={{ fontSize: !matches ? "1rem" : "14px" }}
                        width={matches ? "36%" : "16%"}
                      />
                    )}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#828282",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {!loadingSkleton ? (
                      <>+91{profile?.phone}</>
                    ) : (
                      <Skeleton
                        style={{ fontSize: matches ? "12px" : "12px" }}
                        width={matches ? "28%" : "11%"}
                      />
                    )}
                  </Typography>
                </Box>
                {/* <IconButton onClick={openPhoneChange} sx={{ fontSize: "1rem" }}>
                      <EditIcon fontSize="inherit" sx={{ color: "var(--clr-blue-primary)" }} />
                    </IconButton> */}
                {/* </Box> */}
                {/* {phoneEdit && (
                    <Box sx={{ width: "400px" }}>
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>
                          Contact Number
                        </InputLabel>
                        <Input
                          placeholder="Enter phone number"
                          type="tel"
                          fullWidth
                          sx={{ borderRadius: 1 }}
                          disableUnderline
                        />
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
                            setPhoneEdit(false);
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
                          // onClick={}
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
                  )} */}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    gutterBottom={matches ? false : true}
                    sx={{
                      color: "#333333",
                      fontWeight: "600",
                      fontSize: !matches ? "1rem" : "14px",
                    }}
                  >
                    {!loadingSkleton ? (
                      "Password"
                    ) : (
                      <Skeleton
                        style={{ fontSize: !matches ? "1rem" : "14px" }}
                        width={matches ? "24%" : "9.5%"}
                      />
                    )}
                  </Typography>
                  {!loadingSkleton ? (
                    <Button
                      onClick={openPasswordChange}
                      variant="text"
                      size="small"
                      sx={{ color: "#828282", m: 0, p: 0 }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--clr-gray-3)",
                          fontWeight: 600,
                          fontSize: "12px",
                        }}
                      >
                        Change Password
                      </Typography>
                    </Button>
                  ) : (
                    <Skeleton
                      style={{ fontSize: matches ? "12px" : "12px" }}
                      width={matches ? "28%" : "13%"}
                    />
                  )}
                </Box>
                {passwordEdit && (
                  <Box sx={{ width: !matches ? "400px" : "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: !matches ? 3 : 1.5,
                      }}
                    >
                      {loadingSkletonChangePassword ? (
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Old Password<span style={{ color: "red" }}> *</span>
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
                               /*  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
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
                                <InputAdornment sx={{ mr: 0.5 }} position="end">
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
                                        sx={{ color: "var(--clr-blue-footer)" }}
                                      />
                                    ) : (
                                      <Visibility
                                        sx={{ color: "var(--clr-blue-footer)" }}
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
                          {/* {(passwordRegex.test(values.oldPassword) === true) && (
                              <FormHelperText sx={{ color: "green", mt: 0 }}>
                              Your password is strong
                              </FormHelperText>
                          )}
                          {(values.oldPassword !== "") && (passwordRegex.test(values.oldPassword) === false) && (
                              <FormHelperText sx={{ color: "red", mt: 0 }}>
                              Your password is not strong enough
                              </FormHelperText>
                          )} */}
                        </Box>
                      ) : (
                        <Skeleton height={80} />
                      )}

                      {loadingSkletonChangePassword ? (
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            New Password<span style={{ color: "red" }}> *</span>
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
                                <InputAdornment sx={{ mr: 0.5 }} position="end">
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
                                        sx={{ color: "var(--clr-blue-footer)" }}
                                      />
                                    ) : (
                                      <Visibility
                                        sx={{ color: "var(--clr-blue-footer)" }}
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
                          {passwordRegex.test(values.newPassword) === true && (
                            <FormHelperText sx={{ color: "green", mt: 0 }}>
                              Password is strong 
                            </FormHelperText>
                          )}
                          {values.newPassword !== "" &&
                            passwordRegex.test(values.newPassword) ===
                              false && (
                              <FormHelperText sx={{ color: "red", mt: 0 }}>
                                Password must be at least 8 characters with at least 1 special character 1 digit and 1 Capital Letter.
                              </FormHelperText>
                            )}
                        </Box>
                      ) : (
                        <Skeleton height={80} />
                      )}
                      {loadingSkletonChangePassword ? (
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
                               /*  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline":
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
                                <InputAdornment sx={{ mr: 0.5 }} position="end">
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
                                        sx={{ color: "var(--clr-blue-footer)" }}
                                      />
                                    ) : (
                                      <Visibility
                                        sx={{ color: "var(--clr-blue-footer)" }}
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
                                Confirm new password - new password do not match.
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
                                values.newPassword !== values.confirmNewPassword
                                  ? ""
                                  : "Password must be at least 8 characters with at least 1 special character 1 digit and 1 Capital Letter."}
                              </FormHelperText>
                            )}
                        </Box>
                      ) : (
                        <Skeleton height={80} />
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 3,
                          mt: 2,
                          justifyContent: "flex-end",
                        }}
                      >
                        {loadingSkletonChangePassword ? (
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
                        ) : (
                          <Skeleton
                            width={94}
                            height={63}
                            sx={{ borderRadius: "28px" }}
                          />
                        )}
                        {loadingSkletonChangePassword ? (
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
                        ) : (
                          <Skeleton
                            width={84}
                            height={63}
                            sx={{ borderRadius: "28px" }}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}
                {success && (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
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
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      {error}
                    </Alert>
                  </Snackbar>
                )}
              </Box>
            </Box>
          </Card>
        </Box>
      </Container>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...modalStyle,  minWidth: {xs: "250px", md: 500 }}}> 
          <Typography id="modal-modal-title" variant="h5" sx={{color: "var(--clr-blue-footer)", fontWeight: "600", textAlign: "center" }}>
            Login session expired
          </Typography>

          <Typography variant="body2" sx={{ color: "var(--clr-gray-3)", mt: 2 }}> 
            Your login session is expired after changing the password!
          </Typography>
          <Typography variant="subtilte2" sx={{ color: "var(--clr-gray-2)", fontWeight: "600", mt: 1  }}> 
            Please login again to continue.
          </Typography>
          <Box sx={{textAlign: "center", p: 4, pb:1}}>
            <Button onClick={() => navigate("/login")} variant="contained" size="small">Go to Login</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AccountSettings;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', 
  bgcolor: 'background.paper', 
  borderRadius: 1, 
  p: 3,
};