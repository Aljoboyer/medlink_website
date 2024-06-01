import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Link, useHref, useLocation } from "react-router-dom";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
// import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate, Navigate } from "react-router-dom";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./SignupForm.css";
import useAuth from "../../hooks/useAuth";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import { gqlOpenQuery, gqlquery, QUERY_LISTPROFILES } from "../../api";

// var __ss = null; 

const SignupGrid = styled(Grid)(() => ({
  backgroundColor: "var(--clr-white)",
  // boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
  borderRadius: "6px",
  // padding: "20px 39px 40px"
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });
var __currentUserEmail = "";
var poolData = {
  UserPoolId: `${process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_USERPOOLID}`,
  ClientId: `${process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_CLIENTID}`,
};

const SignupForm = (props) => {
  const navigate = useNavigate(false);
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [errorReset, setErrorReset] = useState("");
  const [errorInvalidEmail, setErrorInvalidEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [strongPassword, setStrongPassword] = useState("");
  const [weakPassword, setWeakPassword] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    forgotPasswordCode: ""
  });
  const [recievedCode, setRecievedCode] = useState(null);
  const [confirmEmailCode, setConfirmEmailCode] = useState({});
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [forgotPassword, setForgotPassword] = useState("");
  const { getUserProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [success, setSuccess] = useState("");
  const [successForgetPassword, setSuccessForgetPassword] = useState("");
  const [failure, setFailure] = useState(false);
  const [failureLogin, setFailureLogin] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userExists, setUserExists] = useState(false);
  const [userExistsData, setUserExistsData] = useState();
  const [signupResendCode, setSignupResendCode] = useState(false);
  const [tokenToAccess, setTokenToAccess] = useState(null);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [progressLoading, setProgressLoading] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  // const ref = useHref()

  const token = sessionStorage.getItem("accessToken");

  // 

  // useEffect(() => {
  //   setTimeout(() => { setToken(); }, 2000)
  // const setToken = () => {
  // setTokenToAccess(token);
  //   }

  // }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    console.log("location line- 87:");
    const getNameEmail = async () => {
      const getUserName = async () => {
        await gqlquery(QUERY_LISTPROFILES, null)
          .then((res) => res.json())
          .then(datas => {
            setUserName(datas?.data?.getProfile?.name);
            setIsLoading(false);
          })
      };

      await getUserName();
    }

    if (sessionStorage.getItem("accessToken") !== null) {
      if (!userName) {
        getNameEmail();
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // console.log(forgotPassword);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleConfirmationCode = (prop) => (event) => {
    setConfirmEmailCode({ ...confirmEmailCode, [prop]: event.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setError("");
    setVerificationCodeSent(false);
    setSuccess("");
    // setVerificationCodeSent(false);
    // setSuccessForgetPassword("");
    // setSignupResendCode(false);
    setFailure(false);
    setMatchPassword("");
    // setRegisterSuccess(false);
    // setLoginSuccess(false);
    // setFailureLogin(false);
    // setUserExists(false);
  };

  const handleNavigateRegister = () => {
    navigate("/login");
  }

  const onlyNumbers = (e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') };

  // email validaton 
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  useEffect(() => {

    const QUERY_GET_EMAIL_EXISTS = {
      query: `query MyQuery {
            verifyEmail(emailID: "${values.email}")
          }`,
      operationName: "MyQuery",
    };

    gqlOpenQuery(QUERY_GET_EMAIL_EXISTS, null)
      .then((res) => res.json())
      .then((datas) => {
        const existsData = JSON.parse(datas.data.verifyEmail);
        // console.log(existsData);
        setUserExistsData(existsData);
      })
  }, [values.email]); 

  const resendCode = async (e) => {
    // console.log(values.email, "inside resend code block", userExistsData?.user?.doctorConfirmed)
    sessionStorage.setItem("email", values.email)
    sessionStorage.setItem("isDoctorConfirmed", userExistsData?.user?.doctorConfirmed);
    sessionStorage.setItem("comingFrom", "fromForgotPassword");
    const signUpParams = {
      ClientId: poolData.ClientId,
      Username: values.email,
    };
    try {
      const res = await provider.resendConfirmationCode(signUpParams);
      setRecievedCode(res);
      setUserExists(false)
      // setSignupResendCode(true);
      setVerificationCodeSent(true);
      setOpen(true);
    } catch (err) {
      setError(err.message);
      setOpen(true);
      // console.log('error resend', err)
    }

    setValues({
      // email: "",
      password: "",
      confirmpassword: "",
    });
    setError("");
    setErrorPassword("");
    setErrorConfirmPassword("");
    setErrorInvalidEmail("");
    setUserExists(false);
    return;
  }

  const handleSubmit = async (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      __currentUserEmail = values.email;
      setError("");
      setStrongPassword("");
      setWeakPassword("");
      let finalpassword;

      if (
        values.email === "" ||
        values.password === "" ||
        values.confirmpassword === "" ||
        (re.test(values.email)) === false
      ) {
        setError("Email is mandatory!");
        setErrorPassword("Password is mandatory!");
        setErrorConfirmPassword("Confirm Password is mandatory!");
        setErrorInvalidEmail("Enter a valid Email Address.");
        return;
      }

      if (values.password === values.confirmpassword) {
        finalpassword = values.password;
        setMatchPassword("");
      } else {
        setOpen(true);
        setMatchPassword("Confirm password - passwords do not match.");
        return;
      }

      let regex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if (regex.test(finalpassword)) {
        setStrongPassword("Password is strong.");
      } else {
        setWeakPassword("Password must be at least 8 characters with at least 1 special character 1 digit and 1 Capital Letter.");
        return;
      }
      

      if (userExistsData?.user?.doctorExists && userExistsData?.user?.doctorConfirmed === "UNCONFIRMED") {
        var resendConfirmationCodeParams = {
          ClientId: poolData.ClientId,
          Username: __currentUserEmail,
        };
        setLoader(true);
        setProgressLoading(true);
        try {
          const res = await provider.resendConfirmationCode(resendConfirmationCodeParams);
          // console.log("this is sign up response", res);
          setVerificationCodeSent(true);
          setOpen(true);
          setRecievedCode(res);
          setProgress(0);
          setLoader(false);
          setProgressLoading(false);
        } catch (err) {
          setError(err.message);
          setOpen(true);
          setProgress(0);
          setLoader(false);
          setProgressLoading(false);
          console.log('err', err.message)
          // console.log(err);
        }

        setValues({
          // email: "",
          password: "",
          confirmpassword: "",
        });
        // setError("");
        setErrorPassword("");
        setErrorConfirmPassword("");
        setErrorInvalidEmail("");
        setUserExists(false);
        return;
      }

      if (userExistsData?.user?.hospitalUserExists) {
        setUserExists(true);
        setOpen(true);
        // resendCode();
        return;
      };
      if (userExistsData?.user?.doctorExists) {
        // resendCode();
        setUserExists(true);
        setOpen(true);
        return;
      };

      var signUpParams = {
        AuthFlow: `${process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_AUTHFLOW}`,
        ClientId: poolData.ClientId,
        UserPoolId: poolData.UserPoolId,
        Username: __currentUserEmail,
        Password: values.password,
      };
      setLoader(true);
      setProgressLoading(true);
      try {
        const res = await provider.signUp(signUpParams);
        // console.log("this is sign up response", res);
        setVerificationCodeSent(true);
        setOpen(true);
        setRecievedCode(res);
        setProgress(0);
        setLoader(false);
        setProgressLoading(false);
      } catch (err) {
        setError(err.message);
        setOpen(true);
        console.log('err', err.message)
        setProgress(0);
        setLoader(false);
        setProgressLoading(false);
        // console.log(err);
      }

      // const res = await provider.signUp(signUpParams);
      // console.log("this is sign up response", res);
      // setRecievedCode(res);
      setValues({
        // email: "",
        password: "",
        confirmpassword: "",
      });
      setError("");
      setErrorPassword("");
      setErrorConfirmPassword("");
      setErrorInvalidEmail("");
      setUserExists(false);
    }
  };

  const handleConfirmEmailSubmit = async (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (confirmEmailCode.code === "" || confirmEmailCode.code === undefined) {
        setError("Verification code can’t be empty.");
        return;
      } else {
        setError("");
      }

      if (confirmEmailCode.code.length < 6) {
        setError("Verification Code must be 6 digits long.");
        return;
      } else {
        setError("");
      }
      // console.log(423423, values.email, "__currentUserEmail : " + __currentUserEmail)
      try {
        // __currentUserEmail = values.email;
        if (__currentUserEmail === "") {
          __currentUserEmail = values.email ? values.email : sessionStorage.getItem("email")
        }
        var signUpParams = {
          ClientId: poolData.ClientId,
          UserPoolId: poolData.UserPoolId,
          Username: __currentUserEmail,
          ConfirmationCode: confirmEmailCode.code,
        };
        setLoader(true);
        setProgressLoading(true);
        // console.log(userExistsData?.user?.doctorConfirmed, "signUpParams", signUpParams)
        if (userExistsData?.user?.doctorConfirmed === "UNCONFIRMED" || sessionStorage.getItem("isDoctorConfirmed") === "UNCONFIRMED") {
          try {
            const res = await provider.confirmSignUp(signUpParams);
            if (res?.$metadata?.requestId) {
              // setRecievedCode(null);
              setRegisterSuccess(true);
              setOpen(true);
              // setForgotPassword("true");
              if (sessionStorage.getItem("comingFrom") === "fromForgotPassword") {
                sessionStorage.removeItem("comingFrom");
                setTimeout(handleOpenForgotPassword, 2000)
                setTimeout(() => setForgotPassword("true"), 1000)
              } else {
                setTimeout(() => navigate("/login"), 2000)
              }
            }
            setProgress(0);
            setProgressLoading(false);
            setLoader(false);
          } catch (err) {
            setProgress(0);
            setProgressLoading(false);
            setLoader(false);
            setOpen(true);
            return setError(err.message);
          }

          setError("");
        } else {
          try {
            const res = await provider.confirmSignUp(signUpParams);
            if (res?.$metadata?.requestId) {
              // setRecievedCode(null);
              setRegisterSuccess(true);
              setOpen(true);
              setTimeout(() => navigate("/login"), 3000)
            }
            setProgress(0);
            setProgressLoading(false);
            setLoader(false);
          } catch (err) {
            setProgress(0);
            setProgressLoading(false);
            setLoader(false);
            setOpen(true);
            return setError(err.message);
          }
          setError("");
        }

      } catch (err) {
        setProgress(0);
        setProgressLoading(false);
        setLoader(false);
        console.log("217", err.message)
        setOpen(true);
        return setError(err.message);
      }
      setError("");
    }
  };

  // progressbar useEffect 
  //
  useEffect(() => {
    let timer;
    const progressFunc = () => {
      timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 5));
      }, 182.70);
    }

    if (progressLoading) {
      progressFunc();
    };

    return () => {
      console.log("clear interval", timer)
      clearInterval(timer)
    }

  }, [progressLoading]);


  const handleLogIn = async (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      setProgressLoading(true);

      if (values.email === "" || values.password === "" || (re.test(values.email)) === false) {
        setError("Email is mandatory!");
        setErrorPassword("Password is mandatory!");
        setErrorInvalidEmail("Enter a valid Email Address.");
        return
      }

      var logInParams = {
        ClientId: poolData.ClientId,
        AuthFlow: `${process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_AUTHFLOW}`,
        AuthParameters: {
          USERNAME: values.email,
          PASSWORD: values.password,
        },
      };
      setLoader(true);

      try {
        console.log('ekhane ashce')
        const res = await provider.initiateAuth(logInParams);
      
        var access_token = res["AuthenticationResult"]["AccessToken"];
        var idToken = res["AuthenticationResult"]["IdToken"];
        var refresh_token = res["AuthenticationResult"]["RefreshToken"];
        sessionStorage.setItem("accessToken", access_token);
        sessionStorage.setItem("idToken", idToken);
        sessionStorage.setItem("refreshToken", refresh_token);
        sessionStorage.setItem("flow", "jobSeeker");
        // if (access_token) {
        //   getUserProfile();
        //   gqlquery(QUERY_LISTPROFILES, null)
        //     .then((res) => res.json())
        //     .then((datas) => {
        //       if (datas?.data?.getProfile) {
        //         console.log(datas?.data?.getProfile)
        //         setTimeout(() => navigate("/profile-home"), 1500); // Redirect after Login 
        //       } else {
        //         setTimeout(() => navigate("/signup2"), 1500);
        //       }
        //     })
        // }
        setError("");
        setLoginSuccess(true);
        setFailureLogin(false); 
        setOpen(true);
      } catch (error) {
        setProgress(0);
        setProgressLoading(false)
        setLoader(false);
        setOpen(true);
        setError(error.message);
        setFailureLogin(true);
        console.log('error message', error.message)
      }

      if (access_token) {
        getUserProfile();
        gqlquery(QUERY_LISTPROFILES, null)
          .then((res) => res.json())
          .then((datas) => {
            console.log(datas);
            setProgress(0);
            setProgressLoading(false)
            setLoader(false);
            if (datas?.data?.getProfile) {
              setTimeout(() => props?.location?.state?.history ? navigate(props?.location?.state?.history, { state: props?.location?.state }) : navigate("/profile-home"), 1500); // Redirect after Login 
            } else {
              setTimeout(() => navigate("/signup2"), 1500);
            }
          })
      }
      setError("");
      setErrorPassword("");
      setErrorInvalidEmail("");
    }
  };

  const recoveryEmail = sessionStorage.getItem("recoveryEmail");
  const currentEmail = sessionStorage.getItem("email");
  const handleVerificationCode = async (event, from) => {
    // console.log("called automatically", event, from);
    if (event.key === "Enter" || from === "onClick") {

      // console.log(currentEmail, recoveryEmail, 555555555555, values.email, 444444444, location.state?.values?.email)
      if (values.email === "") {
        values.email = values.email || location.state?.values?.email || recoveryEmail || currentEmail;
      }

      if (
        values.email === "" ||
        (re.test(values.email)) === false
      ) {
        setError("Email is mandatory!");
        setErrorInvalidEmail("Enter a valid Email Address.");
        return
      } else {
        setError("");
      }
      // email validaton 
      //  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


      //  if ( (re.test(values.email)) === false ) {
      //      setErrorInvalidEmail("Enter a valid email.");
      //      return
      //  }
      //  else {
      //   setErrorInvalidEmail("");
      //  }

      if (recoveryEmail) {
        // values.email = recoveryEmail;
      }
      if (
        values.email === ""
      ) {
        setError("Email is mandatory!");
        return
      } else {
        setError("");
      }
      // console.log("inside handleverficationcode", values.email)
      var forgotPasswordParams = {
        ClientId: poolData.ClientId,
        AuthFlow: `${process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_AUTHFLOW}`,
        Username: values.email,
      };
      setLoader(true);
      setProgressLoading(true);
      try {
        const res = await provider.forgotPassword(forgotPasswordParams);
        setError("");
        setSuccess("A Verification code has been sent to your registered email id.");
        setOpen(true);
        setProgress(0);
        setProgressLoading(false);
        setLoader(false);
        setForgotPassword("true");
      } catch (err) {
        console.log(err)
        setFailure(true);
        setOpen(true);
        setError(err.message);
        setProgress(0);
        setProgressLoading(false);
        setLoader(false);
        return;
      }

      // console.log("get code to reset password", res)
      // if (res?.$metadata?.requestId) {

      //   // console.log(res);
      // } else {

      // }
      setError("");
      setErrorInvalidEmail("");
    }
  }

  const handleForgotPasswordVerificationCode = async (event, from) => {
    if (event.key === "Enter" || from === "onClick") {

      // email validaton 
      //  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


      //  if ( (re.test(values.email)) === false ) {
      //      setErrorInvalidEmail("Enter a valid email.");
      //      return
      //  }
      //  else {
      //   setErrorInvalidEmail("");
      //  }

      if (values.email === "" || values.forgotPasswordCode === "" || (re.test(values.email)) === false) {
        setError("Email is mandatory!");
        setErrorPassword("Reset code is mandatory!");
        setErrorInvalidEmail("Enter a valid Email Address.");
        return
      }
      navigate("/create-new-password", { state: { forgotPasswordCode: values.forgotPasswordCode, email: values.email, isDoctor: true } });
      setError("");
      setErrorPassword("");
      setErrorInvalidEmail("");
    }
  };

  const resetPassword = sessionStorage.getItem("finalpassword");

  const hanldeResetPassword = async (event, from) => {
    if (event.key === "Enter" || from === "onClick") {

      // let regex =
      // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      // if ( (regex.test(values.password)) && (regex.test(values.password)) ) {
      //   console.log("Your password is strong");
      //   setStrongPassword("Your password is strong");
      // } else {
      //   console.log("Your password is not strong enough");
      //   setWeakPassword("Your password is not strong enough");
      //   return;
      // }

      if (values.email === "") {
        values.email = values.email || location.state?.values?.email || recoveryEmail || currentEmail;
      }

      let finalpassword;
      if (resetPassword) {
        values.password = resetPassword;
        values.confirmpassword = resetPassword;
      }
      if (values.password === values.confirmpassword) {
        finalpassword = values.password;
        // sessionStorage.setItem("finalpassword", finalpassword);
        // console.log("Password match.", finalpassword);
        setMatchPassword("");
      } else {
        setOpen(true);
        setMatchPassword("Confirm password - passwords do not match.");
        return;
      }

      if (
        values.password === "" ||
        values.confirmpassword === "" ||
        values.email === "" || 
        values.forgotPasswordCode === "" || 
        (re.test(values.email)) === false
      ) {
        setErrorPassword("New Password is mandatory!");
        setErrorConfirmPassword("New Confirm Password is mandatory!");
        setErrorReset("Reset code is mandatory!");
        setErrorInvalidEmail("Enter a valid Email Address.");
        setErrorEmail("Email address is mandatory!");
        return
      } else {
        setError("");
        setErrorReset("");
        setErrorInvalidEmail("");
        setErrorEmail("");
      }

      let regex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      if ((regex.test(values.password)) && (regex.test(values.password))) {
        // console.log("Your password is strong");
        setError("");
        setStrongPassword("Password is strong.");
      } else {
        // console.log("Your password is not strong enough");
        setWeakPassword("Password must be at least 8 characters with at least 1 special character 1 digit and 1 Capital Letter.");
        return;
      }


      // let finalpassword;

      // if (values.password === values.confirmpassword) {
      //   finalpassword = values.password;
      //   sessionStorage.setItem("finalpassword", finalpassword);
      //   setMatchPassword("");
      // } else {
      //   setMatchPassword("Confirm password - passwords do not match.");
      //   return;
      // }



      // let regex =
      //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      // if (regex.test(finalpassword)) {
      //   setStrongPassword("Your password is strong");
      // } else {
      //   setWeakPassword("Your password is not strong enough");
      //   return;
      // }


      // if (resetPassword) {
      //   values.password = resetPassword;
      //   values.confirmpassword = resetPassword;
      // }
      // if (values.password === values.confirmpassword) {
      //   finalpassword = values.password;
      //   sessionStorage.setItem("finalpassword", finalpassword);
      // } else {
      //   setError("Confirm password - passwords do not match.");
      //   return;
      // }

      var forgotPasswordParams = {
        ClientId: poolData.ClientId,
        AuthFlow: `${process.env.REACT_APP_DOCTORS_FLOW_SIGNUP_AUTHFLOW}`,
        Username: values.email,
        Password: finalpassword,
        ConfirmationCode: values.forgotPasswordCode
      };
      // console.log(location?.state?.forgotPasswordCode)
      setProgressLoading(true);
      setLoader(true);
      try {
        const res = await provider.confirmForgotPassword(forgotPasswordParams);
        if (res?.$metadata?.requestId) {
          setError("");
          setOpen(true);
          setSuccess("Your password has been updated successfully!");
          setSuccessForgetPassword("Your password has been updated successfully!")
          values.password = "";
          values.confirmpassword = "";
          values.forgotPasswordCode = "";
          sessionStorage.clear();
          setTimeout(() => navigate("/login"), 3000);
        }
        setProgressLoading(false);
        setLoader(false);
      }
      catch (err) {
        setProgress(0);
        setProgressLoading(false);
        setLoader(false);
        setError(err.message);
        setFailure(true);
        setOpen(true);
        // sessionStorage.setItem("finalpassword", finalpassword);
        // sessionStorage.setItem("recoveryEmail", location?.state?.email);
        setTimeout(() => navigate("/forgot-password", { state: { values, isDoctor: true } }), 3000);
        // navigate("/forgot-password");
        return;
      }
      setErrorPassword("");
      setErrorConfirmPassword("");
    }
  }
  // console.log(333333333333, forgotPassword)
  // open forgot password
  const handleOpenForgotPassword = (e) => {
    navigate("/forgot-password", { state: { values, isDoctor: true } });
    setTimeout(() => setForgotPassword(""), 0);
    // handleVerificationCode(e, "onClick");
  }
  // console.log(0, error !== "", 1, success, 2, verificationCodeSent, 3, successForgetPassword, 4, signupResendCode, 5, failure, 6, registerSuccess, 7, loginSuccess, 8, failureLogin, 9, userExists, 10, matchPassword,)

  return (
    <>
      {/* {
        isLoading ? (
          <>
            <Skeleton animation="wave" sx={{ height: "60vh" }} />
          </>
        ) : (
          <>
            {
              !tokenToAccess ? (
                <>
                  {
                    userName ? (
                      <Navigate to="/profile-home" />
                    ) : ( */}
      <SignupGrid style={{ padding: !matches ? "20px 39px 40px" : "20px 26px 40px", boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)" }} item className="doctor-signup">
        {recievedCode ? (
          <Box
            sx={{
              height: "550px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              pt: 8,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontSize: !matches ? "24px" : "18px", fontWeight: "600", color: "var(--clr-blue-footer)", textAlign: !matches ? "center" : "start", mb: !matches ? 3 : 2, ml: !matches ? "" : "-10px" }}
            >
              Verify Email
            </Typography>
            <Box>
              <InputLabel sx={{ py: 0.5 }}>
                6 Digits Email Verification Code
              </InputLabel>
              <TextField
                sx={{
                  borderRadius: 1,
                }}
                InputProps={{
                  sx: {
                    ".MuiOutlinedInput-input": {
                      // border: "1px solid var(--clr-blue-light)",
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
                size="small"
                disableUnderline
                fullWidth
                onChange={handleConfirmationCode("code")}
                onKeyDown={handleConfirmEmailSubmit}
                placeholder="Enter 6 Digit Verification Code"
                inputProps={
                  { maxLength: 6 }
                }
                onInput={(e) => onlyNumbers(e)}
                endAdornment={
                  <InputAdornment position="end" style={{ outline: "none" }}>
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    ></IconButton>
                  </InputAdornment>
                }
              />
              {(confirmEmailCode.code === "" || confirmEmailCode.code === undefined || confirmEmailCode.code.length < 6) && (
                <FormHelperText sx={{ color: "red" }}>
                  {error}
                  {/* Verification code can’t be empty. */}
                </FormHelperText>
              )}
              {(sessionStorage.getItem("comingFrom") === "fromForgotPassword") && (
                <FormHelperText sx={{ color: "red" }}>
                  ** Please verify your email to reset the password.
                </FormHelperText>
              )}
              {error && (
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Invalid verification code provided, please try again.
                  </Alert>
                </Snackbar>
              )}
            </Box>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              onClick={(event) => handleConfirmEmailSubmit(event, "onClick")}
              sx={{ p: 1, mt: 2, borderRadius: 16 }}
            >
              {loader ? (
                <CircularProgress size={25} sx={{ color: "white" }} variant="determinate" value={progress} />
              ) : (
                "Confirm Email"
              )}
            </Button>
          </Box>
        ) : (
          <Box sx={{
            height: "550px",
            display: "flex",
            flexDirection: "column",
            alignItems: "space-between",
            justifyContent: "space-between"

          }}>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontSize: !matches ? "24px" : "18px", fontWeight: "600", color: "var(--clr-blue-footer)", textAlign: !matches ? "center" : "start", ml: !matches ? "" : "-10px" }}
              >
                {
                  !matches ? (<>{props.pageType}</>) : (<>{props.pageType}{""} to MedLink</>)
                }
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  borderRadius: "6px",
                  marginTop: "1.5rem",
                }}
              >
                {props.pageType === "Create New Password" || (
                  <>
                    {recoveryEmail && resetPassword ? (
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>Email ID</InputLabel>
                        <Input
                          sx={{
                            borderRadius: 1,
                            color: "var(--clr-blue-footer)",
                            fontSize: "14px"
                          }}
                          disableUnderline
                          defaultValue={recoveryEmail ? recoveryEmail : values.email}
                          onKeyDown={(props.pageType === "Forgot Password" && !forgotPassword) && handleVerificationCode}
                          type="email"
                          // value={values.email}
                          // disabled
                          onChange={handleChange("email")}
                          placeholder="Enter Email Address"
                          fullWidth
                        />
                      </Box>
                    ) : (
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>Email ID</InputLabel>
                        <TextField
                          sx={{
                            borderRadius: 1,
                            color: "var(--clr-blue-footer)",
                            fontSize: "14px"
                          }}
                          InputProps={{
                            sx: {
                              ".MuiOutlinedInput-input": {
                                border: "1px solid var(--clr-blue-light)",
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
                          size="small"
                          disableUnderline
                          defaultValue={location.state?.values?.email || values.email || ((props.pageType !== "Register" && props.pageType !== "Login") ? currentEmail : "")}
                          type="email"
                          // value={values.email}
                          error={values.email === "" && error}
                          onChange={handleChange("email")}
                          onKeyDown={(props.pageType === "Register" && handleSubmit) || (props.pageType === "Login" && handleLogIn) || ((props.pageType === "Forgot Password" && !forgotPassword) && handleVerificationCode) || (forgotPassword && hanldeResetPassword)}
                          placeholder="Enter Email Address"
                          fullWidth
                        />
                        {values.email === "" && (
                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {error}
                          </FormHelperText>
                        )}
                        {/* {errorInvalidEmail !== "" && (
                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {errorInvalidEmail}
                          </FormHelperText>
                        )} */}
                        {
                        ((props.pageType === "Forgot Password") && (values.email === "")) && (
                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {errorEmail}
                          </FormHelperText>
                        )
                        }
                        {(((re.test(values.email)) === false) && (values.email !== "")) && (
                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {errorInvalidEmail}
                          </FormHelperText>
                        )}
                      </Box>
                    )}

                  </>

                )}

                {props.pageType === "Forgot Password" || (
                  <Box>
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        {props.pageType === "Create New Password"
                          ? "New Password"
                          : "Password"}
                      </InputLabel>
                      <TextField
                        sx={{
                          borderRadius: 1,
                          color: "var(--clr-blue-footer)",
                          fontSize: "14px"
                        }}
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": {
                              // border: "1px solid var(--clr-blue-light)",
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
                          },
                          endAdornment: <InputAdornment sx={{ mr: 0.5 }} position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showPassword ? (
                                <VisibilityOff sx={{ color: "var(--clr-blue-footer)" }} />
                              ) : (
                                <Visibility sx={{ color: "var(--clr-blue-footer)" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }}
                        disableUnderline
                        fullWidth
                        error={values.awardname === "" && errorPassword}
                        defaultValue={resetPassword ? resetPassword : values.password}
                        // value={values.password}
                        onChange={handleChange("password")}
                        onKeyDown={(props.pageType === "Register" && handleSubmit) || (props.pageType === "Login" && handleLogIn) || (props.pageType === "Create New Password" && hanldeResetPassword)}
                        type={values.showPassword ? "text" : "password"}
                        placeholder={props.pageType === "Create New Password"
                          ? "Create Password"
                          : "Enter Password"}
                      />
                      {values.password === "" && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {errorPassword}
                        </FormHelperText>
                      )}
                      {((props.pageType !== "Login") && (passwordRegex.test(values.password) === true)) && (
                        <FormHelperText sx={{ color: "green", mt: 0 }}>
                          {/* {errorPassword} */}
                          Password is strong.
                        </FormHelperText>
                      )}
                      {((props.pageType !== "Login") && (values.password !== "") && (passwordRegex.test(values.password) === false)) && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {/* {errorPassword} */}
                          Password must be at least 8 characters with at least 1 special character 1 digit and 1 Capital Letter.
                        </FormHelperText>
                      )}
                    </Box>

                    {props.pageType === "Login" && (
                      <Box sx={{ textAlign: "right", textDecoration: "underline", my: 1, }}>
                        <Button variant="text">
                          <Typography
                            sx={{
                              color: "var(--clr-blue-footer)",
                              fontWeight: 600
                            }}
                            variant="subtitle2"
                            onClick={userExistsData?.user?.doctorConfirmed === "UNCONFIRMED" ? resendCode : handleOpenForgotPassword}
                          >
                            Forgot Password?
                          </Typography>
                        </Button>
                      </Box>
                    )}
                  </Box>

                )}
                {forgotPassword && (
                  <Box>
                    <Box>
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>6 Digits Verification Code</InputLabel>
                        <TextField
                          sx={{
                            borderRadius: 1,
                            color: "var(--clr-blue-footer)",
                            fontSize: "14px"
                          }}
                          InputProps={{
                            sx: {
                              ".MuiOutlinedInput-input": {
                                // border: "1px solid var(--clr-blue-light)",
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
                            },
                          }}
                          disableUnderline
                          error={values.forgotPasswordCode === "" && errorPassword}
                          fullWidth
                          value={values.forgotPasswordCode}
                          onChange={handleChange("forgotPasswordCode")}
                          onKeyDown={hanldeResetPassword}
                          placeholder="Enter 6 Digit Verification Code"
                          inputProps={
                            { maxLength: 6 }
                          }
                          onInput={(e) => onlyNumbers(e)}
                        />
                        {values.forgotPasswordCode === "" && (
                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {errorReset}
                          </FormHelperText>
                        )}
                        {((values.forgotPasswordCode !== "") && (values.forgotPasswordCode === undefined ||  values.forgotPasswordCode.length < 6)) && (
                          <FormHelperText sx={{ color: "red" }}>
                            {/* {errorReset} */}
                            Verification Code must be 6 digits long.
                          </FormHelperText>
                        )}
                      </Box>
                      <Box sx={{ textAlign: "right", textDecoration: "underline", my: 1, }}>
                        <Typography
                          sx={{
                            color: "var(--clr-blue-footer)",
                            fontWeight: 600,
                            cursor: "pointer"
                          }}
                          variant="subtitle2"
                          // component={Link}
                          // to="/forgot-password"
                          onClick={handleOpenForgotPassword}
                        >
                          Resend Code
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <InputLabel sx={{ py: 0.5 }}>
                          {/* {props.pageType === "Create New Password"
                            ? "New Password"
                            : "Password"} */}
                          Create New Password
                        </InputLabel>
                        <TextField
                          sx={{
                            borderRadius: 1,
                            color: "var(--clr-blue-footer)",
                            fontSize: "14px"
                          }}
                          InputProps={{
                            sx: {
                              ".MuiOutlinedInput-input": {
                                // border: "1px solid var(--clr-blue-light)",
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
                            },
                            endAdornment: <InputAdornment sx={{ mr: 0.5 }} position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showPassword ? (
                                  <VisibilityOff sx={{ color: "var(--clr-blue-footer)" }} />
                                ) : (
                                  <Visibility sx={{ color: "var(--clr-blue-footer)" }} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }}
                          disableUnderline
                          fullWidth
                          error={values.awardname === "" && errorPassword}
                          defaultValue={resetPassword ? resetPassword : values.password}
                          // value={values.password}
                          onChange={handleChange("password")}
                          onKeyDown={(props.pageType === "Register" && handleSubmit) || (props.pageType === "Login" && handleLogIn) || (props.pageType === "Create New Password" && hanldeResetPassword)}
                          placeholder={props.pageType === "Create New Password"
                            ? "Create Password"
                            : "Enter Password"}
                          type={values.showPassword ? "text" : "password"}
                        // endAdornment={
                        //   <InputAdornment sx={{ mr: 0.5 }} position="end">
                        //     <IconButton
                        //       aria-label="toggle password visibility"
                        //       onClick={handleClickShowPassword}
                        //       onMouseDown={handleMouseDownPassword}
                        //       edge="end"
                        //     >
                        //       {values.showPassword ? (
                        //         <VisibilityOff sx={{ color: "var(--clr-blue-footer)" }} />
                        //       ) : (
                        //         <Visibility sx={{ color: "var(--clr-blue-footer)" }} />
                        //       )}
                        //     </IconButton>
                        //   </InputAdornment>
                        // }
                        />
                        {values.password === "" && (
                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {errorPassword}
                          </FormHelperText>
                        )}
                        {((props.pageType !== "Login") && (passwordRegex.test(values.password) === true)) && (
                          <FormHelperText sx={{ color: "green", mt: 0 }}>
                            {/* {errorPassword} */}
                            Password is strong.
                          </FormHelperText>
                        )}
                        {((props.pageType !== "Login") && (values.password !== "") && (passwordRegex.test(values.password) === false)) && (
                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {/* {errorPassword} */}
                            Password must be at least 8 characters with at least 1 special character 1 digit and 1 Capital Letter.
                          </FormHelperText>
                        )}
                      </Box>
                    </Box>
                    <Box sx={{ my: 1.3 }}>
                      <InputLabel sx={{ py: 0.5 }}>
                        Confirm Password
                      </InputLabel>
                      <TextField
                        sx={{
                          borderRadius: 1,
                          color: "var(--clr-blue-footer)",
                          fontSize: "14px"
                        }}
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": {
                              // border: "1px solid var(--clr-blue-light)",
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
                          },
                          endAdornment: <InputAdornment sx={{ mr: 0.5 }} position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showConfirmPassword ? (
                                <VisibilityOff sx={{ color: "var(--clr-blue-footer)" }} />
                              ) : (
                                <Visibility sx={{ color: "var(--clr-blue-footer)" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }}
                        disableUnderline
                        fullWidth
                        defaultValue={resetPassword ? resetPassword : values.confirmpassword}
                        // value={values.confirmpassword}
                        error={values.confirmpassword === "" && errorConfirmPassword}
                        onChange={handleChange("confirmpassword")}
                        onKeyDown={(props.pageType === "Register" && handleSubmit) || (props.pageType === "Create New Password" && hanldeResetPassword)}
                        placeholder="Enter Password Again"
                        type={values.showConfirmPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment sx={{ mr: 0.5 }} position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showConfirmPassword ? (
                                <VisibilityOff sx={{ color: "var(--clr-blue-footer)" }} />
                              ) : (
                                <Visibility sx={{ color: "var(--clr-blue-footer)" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {values.confirmpassword === "" && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {errorConfirmPassword}
                        </FormHelperText>
                      )}
                      {(values.confirmpassword !== "") && (values.confirmpassword !== "") && (values.password !== values.confirmpassword) && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          Confirm password - passwords do not match.
                        </FormHelperText>
                      )}
                      {(passwordRegex.test(values.confirmpassword) === true) && (
                        <FormHelperText sx={{ color: "green", mt: 0 }}>
                          {
                            ((values.confirmpassword !== "") && (values.confirmpassword !== "") && (values.password !== values.confirmpassword)) ? "" : "Password is strong."
                          }

                        </FormHelperText>
                      )}
                      {(values.confirmpassword !== "") && (passwordRegex.test(values.confirmpassword) === false) && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {
                            ((values.confirmpassword !== "") && (values.confirmpassword !== "") && (values.password !== values.confirmpassword)) ? "" : "Password must be at least 8 characters with at least 1 special character 1 digit and 1 Capital Letter."
                          }
                        </FormHelperText>
                      )}
                    </Box>
                  </Box>
                )}
                {props.pageType === "Login" ||
                  props.pageType === "Forgot Password" || (
                    <Box>
                      <InputLabel sx={{ py: 0.5 }}>
                        Confirm Password
                      </InputLabel>
                      <TextField
                        sx={{
                          borderRadius: 1,
                          color: "var(--clr-blue-footer)",
                          fontSize: "14px"
                        }}
                        InputProps={{
                          sx: {
                            ".MuiOutlinedInput-input": {
                              // border: "1px solid var(--clr-blue-light)",
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
                          },
                          endAdornment: <InputAdornment sx={{ mr: 0.5 }} position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showConfirmPassword ? (
                                <VisibilityOff sx={{ color: "var(--clr-blue-footer)" }} />
                              ) : (
                                <Visibility sx={{ color: "var(--clr-blue-footer)" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }}
                        disableUnderline
                        fullWidth
                        defaultValue={resetPassword ? resetPassword : values.confirmpassword}
                        // value={values.confirmpassword}
                        error={values.confirmpassword === "" && errorConfirmPassword}
                        onChange={handleChange("confirmpassword")}
                        onKeyDown={(props.pageType === "Register" && handleSubmit) || (props.pageType === "Create New Password" && hanldeResetPassword)}
                        placeholder="Enter Password Again"
                        type={values.showConfirmPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment sx={{ mr: 0.5 }} position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {values.showConfirmPassword ? (
                                <VisibilityOff sx={{ color: "var(--clr-blue-footer)" }} />
                              ) : (
                                <Visibility sx={{ color: "var(--clr-blue-footer)" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {values.confirmpassword === "" && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {errorConfirmPassword}
                        </FormHelperText>
                      )}
                      {(values.confirmpassword !== "") && (values.confirmpassword !== "") && (values.password !== values.confirmpassword) && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          Confirm password - passwords do not match.
                        </FormHelperText>
                      )}
                      {(passwordRegex.test(values.confirmpassword) === true) && (
                        <FormHelperText sx={{ color: "green", mt: 0 }}>
                          {
                            ((values.confirmpassword !== "") && (values.confirmpassword !== "") && (values.password !== values.confirmpassword)) ? "" : "Password is strong."
                          }

                        </FormHelperText>
                      )}
                      {(values.confirmpassword !== "") && (passwordRegex.test(values.confirmpassword) === false) && (
                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                          {
                            ((values.confirmpassword !== "") && (values.confirmpassword !== "") && (values.password !== values.confirmpassword)) ? "" : "Password must be at least 8 characters with at least 1 special character 1 digit and 1 Capital Letter."
                          }
                        </FormHelperText>
                      )}
                    </Box>
                  )}
                {error && (
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                      {error}
                    </Alert>
                  </Snackbar>
                )}
                {/* {(values.password === values.confirmpassword) && (
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                      {error}
                    </Alert>
                  </Snackbar>
                )} */}
                {matchPassword && (
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                      {matchPassword}
                    </Alert>
                  </Snackbar>
                )}
                {/* {matchPassword && (
                <FormHelperText sx={{ color: "red", mt: -2 }}>
                  {matchPassword}
                </FormHelperText>
              )}
              {strongPassword && (
                <FormHelperText
                  sx={{ color: "green", mt: -2 }}
                >
                  {strongPassword}
                </FormHelperText>
              )}
              {weakPassword && (
                <FormHelperText
                  sx={{ color: "red", mt: -2 }}
                >
                  {weakPassword}
                </FormHelperText>
              )} */}
                {props.pageType === "Login" && (
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={(event) => handleLogIn(event, "onClick")}
                    sx={{ p: 1, my: 2, borderRadius: 16 }}
                  >
                    {loader ? (
                      <CircularProgress size={25} sx={{ color: "white" }} variant="determinate" value={progress} />
                    ) : (
                      "Login"
                    )}
                  </Button>
                )}
                {props.pageType === "Register" && (
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={(event) => handleSubmit(event, "onClick")}
                    sx={{ p: 1, my: 3, borderRadius: 16 }}
                  >
                    {loader ? (
                      <CircularProgress size={25} sx={{ color: "white" }} variant="determinate" value={progress} />
                    ) : (
                      "Register"
                    )}
                  </Button>
                )}

                {props.pageType === "Forgot Password" && forgotPassword === "" && (
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={(event) => handleVerificationCode(event, "onClick")}
                    sx={{ p: 1, my: 3, borderRadius: 16 }}
                  >
                    {loader ? (
                      <CircularProgress size={25} sx={{ color: "white" }} variant="determinate" value={progress} />
                    ) : (
                      "Get Code"
                    )}
                  </Button>
                )}

                {forgotPassword === "true" && (
                  <>
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={(event) => hanldeResetPassword(event, "onClick")}
                      // component={Link}
                      // to="/create-new-password"
                      sx={{ p: 1, my: 2, borderRadius: 16 }}
                    >
                      {loader ? (
                        <CircularProgress size={25} sx={{ color: "white" }} variant="determinate" value={progress} />
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </>
                )}
                {/* {props.pageType === "Create New Password" && (
                  <Button
                    variant="contained"
                    type="submit"
                    // onClick={() => setForgotPassword("")}
                    sx={{ padding: "0.5rem 0.5rem", margin: "0rem" }}
                    // component={Link}
                    // to="/login"
                    onClick={(event) => hanldeResetPassword(event, "onClick")}
                  >
                    Reset Password
                  </Button>
                )} */}
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", }} >
              {props.pageType === "Register" && (
                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ color: "#333333", fontSize: "1rem" }}
                  >
                    Already have an Account?
                  </Typography>
                  <Button
                    variant="text"
                    component={Link}
                    to="/login"
                    sx={{ fontWeight: 600, fontSize: "1rem", textDecoration: "underline", }}
                  >
                    Sign In
                  </Button>
                </Box>
              )}
              {props.pageType === "Login" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ color: "#333333", fontSize: "1rem" }}
                  >
                    Don't have an account?
                  </Typography>
                  <Button
                    variant="text"
                    component={Link}
                    to="/signup"
                    sx={{ fontWeight: 600, fontSize: "1rem", textDecoration: "underline", }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
              {props.pageType === "Forgot Password" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ color: "#333333", fontSize: "1rem" }}
                  >
                    Don't have an account?
                  </Typography>
                  <Button
                    variant="text"
                    component={Link}
                    to="/signup"
                    sx={{ fontWeight: 600, fontSize: "1rem", textDecoration: "underline", }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
              {props.pageType === "Create New Password" && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ color: "#333333", fontSize: "1rem" }}
                  >
                    Don't have an account?
                  </Typography>
                  <Button
                    variant="text"
                    component={Link}
                    to="/signup"
                    sx={{ fontWeight: 600, fontSize: "1rem", textDecoration: "underline", }}
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        )}
        {success && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {forgotPassword === 'true' && success}
            </Alert>

          </Snackbar>
        )}

        {verificationCodeSent && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Verification code has been sent to your registered email id 
            </Alert>

          </Snackbar>
        )}

        {successForgetPassword && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Your password has been updated successfully!
            </Alert>

          </Snackbar>
        )}
        {
          signupResendCode && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              A verification code is sent again, please confirm.
              {/* Congratulation! Your account has been created. */}
            </Alert>

          </Snackbar>
        }
        {failure && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {error && error}
              {/* Congratulation! Your account has been created. */}
            </Alert>
          </Snackbar>
        )}
        {registerSuccess && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Congratulation! Your account has been created.
            </Alert>

          </Snackbar>
        )}
        {loginSuccess && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Congratulation! Login is successful.
            </Alert>
          </Snackbar>
        )}
        {failureLogin && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              Enter valid password or username.
            </Alert>
          </Snackbar>
        )}
        {userExists && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" >
              An account with this email address already exists.
            </Alert>
          </Snackbar>
        )}
      </SignupGrid>
      {/* )
                  }
                </>
              ) : (
                <Navigate to="/profile-home" />
              )
            }
          </>
        )
      } */}
    </>

  );
};

export default SignupForm;
