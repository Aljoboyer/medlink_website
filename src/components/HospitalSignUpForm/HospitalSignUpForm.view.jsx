import {
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputLabel,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Link, Navigate, useLocation } from "react-router-dom";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate, useParams } from "react-router-dom";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./HospitalSignUpForm.css";
import useAuth from "../../hooks/useAuth";
import { gqlquery, QUERY_GETHOSPITAL } from "../../api/hospitalIndex";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { gqlOpenQuery } from "../../api";

// var __ss = null;

const SignupGrid = styled(Grid)(() => ({
    backgroundColor: "var(--clr-white)",
    // boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
    borderRadius: "6px",
    // padding: "20px 39px 40px",
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });
var __currentUserEmail = "";
var poolData = {
    UserPoolId: `${process.env.REACT_APP_HOSPITAL_FLOW_SIGNUP_USERPOOLID}`,
    ClientId: `${process.env.REACT_APP_HOSPITAL_FLOW_SIGNUP_CLIENTID}`,
};

// rendering contiuously in hospital flow and job seekre flow 

const HospitalSignUpForm = (props) => {
    const navigate = useNavigate(false);
    const location = useLocation();
    const [loader, setLoader] = useState();
    const [error, setError] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [matchPassword, setMatchPassword] = useState("");
    const [errorInvalidEmail, setErrorInvalidEmail] = useState("");
    const [strongPassword, setStrongPassword] = useState("");
    const [weakPassword, setWeakPassword] = useState("");
    const [failure, setFailure] = useState(false);
    const [isLogin, setisLogin] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmpassword: "",
        forgotPasswordCode: ""
    });
    const [recievedCode, setRecievedCode] = useState(null);
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState("");
    const [successForgetPassword, setSuccessForgetPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [failureLogin, setFailureLogin] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [confirmEmailCode, setConfirmEmailCode] = useState({});
    const [forgotPassword, setForgotPassword] = useState("");
    const [emailByLink, setEmaiBylLink] = useState([]);
    const [emailCode, setEmailCode] = useState("");
    const [progress, setProgress] = useState(0);
    const [userExists, setUserExists] = useState(false);
    const [userExistsData, setUserExistsData] = useState();
    const { getUserProfile } = useAuth();
    const { loginCode } = useParams();
    const [signupResendCode, setSignupResendCode] = useState(false);
    const [verificationCodeSent, setVerificationCodeSent] = useState(false);
    const [progressLoading, setProgressLoading] = useState(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const token = sessionStorage.getItem("accessToken");
    const onlyNumbers = (e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);

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

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleConfirmationCode = (prop) => (event) => {
        setConfirmEmailCode({ ...confirmEmailCode, [prop]: event.target.value });
    };

    const resendCode = async (e) => {
        sessionStorage.setItem("email", values.email)
        sessionStorage.setItem("isRecruiterConfirmed", userExistsData?.user?.recruiterConfirmed);
        sessionStorage.setItem("comingFrom", "fromForgotPassword");
        const signUpParams = {
            ClientId: poolData.ClientId,
            Username: values.email,
        };
        console.log(signUpParams)
        try {
            const res = await provider.resendConfirmationCode(signUpParams);
            // console.log('resend code',res)
            setRecievedCode(res);
            if (userExistsData?.user?.hospitalUserExists && userExistsData?.user?.recruiterConfirmed === "UNCONFIRMED") {
                setVerificationCodeSent(true);
            }
            setSignupResendCode(true);
            setOpen(true);
            setUserExists(false);
        } catch (err) {
            console.log('error resend', err)
        }
    }
    useEffect(() => {
        if (sessionStorage.getItem("accessToken") !== null) {
            const QUERY_ADDSIGNUPUSER = {
                query: `query MyQuery {
                getSignupUser (loginCode : "${loginCode}") {
                    accessJobPosting
                    accessResumeDB
                    email
                    hospitalID
                    huID
                   }
                }`
            };
            gqlquery(QUERY_ADDSIGNUPUSER, null)
                .then((res) => res.json())
                .then((datas) => setEmaiBylLink(datas?.data?.getSignupUser))
            // .finally((e) => setIsLoading(false));    
        }
    }, [])

    // email validaton 
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
                // if (existsData.user.doctorExists) {
                // setUserExists(true);
                // setOpen(true);
                // return console.log('query returned');
                // }
            })
    }, [values.email])
    //   let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //password validation
    let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const handleSubmit = async (event, from) => {
        if (event.key === "Enter" || from === "onClick") {

            if (emailByLink?.email) {
                __currentUserEmail = emailByLink?.email;
            } else {
                __currentUserEmail = values.email;
                setEmailCode(__currentUserEmail);
            }

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
                setErrorInvalidEmail("Email address is invalid.");
                return;
            }

            if (values.password === values.confirmpassword) {
                finalpassword = values.password;
                setMatchPassword("");
            } else {
                setOpen(true);
                setMatchPassword("Password didn't match.");
                return;
            }

            let regex =
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            if (regex.test(finalpassword)) {
                setStrongPassword("Your password is strong");
            } else {
                setWeakPassword("Your password is not strong enough");
                return;
            }

            if (userExistsData?.user?.hospitalUserExists && userExistsData?.user?.recruiterConfirmed === "UNCONFIRMED") {
                var resendConfirmationCodeParams = {
                    ClientId: poolData.ClientId,
                    Username: __currentUserEmail,
                };
                setLoader(true);
                setProgressLoading(true);
                try {
                    const res = await provider.resendConfirmationCode(resendConfirmationCodeParams);
                    // console.log("this is sign up response", res);
                    //   setVerificationCodeSent(true);
                    setLoader(false);
                    setProgressLoading(false);
                    setProgress(0);
                    setVerificationCodeSent(true);
                    setOpen(true);
                    setRecievedCode(res);

                } catch (err) {
                    setLoader(false);
                    setProgressLoading(false);
                    setProgress(0);
                    setError(err.message);
                    setOpen(true);
                    console.log('err', err.message)
                    // console.log(err);
                }

                setValues({
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

            if (userExistsData?.user?.doctorExists) {
                setUserExists(true);
                // resendCode();
                setOpen(true);
                return;
            };
            if (userExistsData?.user?.hospitalUserExists) {
                setUserExists(true);
                // resendCode();
                setOpen(true);
                return;
            };

            var signUpParams = {
                AuthFlow: `${process.env.REACT_APP_HOSPITAL_FLOW_SIGNUP_AUTHFLOW}`,
                ClientId: poolData.ClientId,
                UserPoolId: poolData.UserPoolId,
                Username: __currentUserEmail,
                Password: values.password,
            };

            setLoader(true);
            setProgressLoading(true);

            try {
                const res = await provider.signUp(signUpParams);
                if (res?.CodeDeliveryDetails?.AttributeName === "email") {
                    setLoader(false);
                    setProgressLoading(false);
                    setProgress(0);
                    setVerificationCodeSent(true);
                    setOpen(true);
                    setRecievedCode(res?.CodeDeliveryDetails?.Destination)
                }
            } catch (err) {
                setLoader(false);
                setProgressLoading(false);
                setProgress(0);
                setError(err.message);
                setOpen(true);
                console.log(err);
            }

            setValues({
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
            };

            setLoader(true);
            setProgressLoading(true);
            try {
                if (emailByLink?.email) {
                    __currentUserEmail = emailByLink?.email;
                    handleChange("email");
                } else {
                    __currentUserEmail = emailCode;
                    handleChange("email");
                }

                if (__currentUserEmail === "") {
                    __currentUserEmail = values.email ? values.email : currentEmail
                }

                // console.log("empty", values.email);
                var signUpParams = {
                    ClientId: poolData.ClientId,
                    UserPoolId: poolData.UserPoolId,
                    Username: __currentUserEmail,
                    ConfirmationCode: confirmEmailCode.code,
                };

                if (userExistsData?.user?.recruiterConfirmed === "UNCONFIRMED" || sessionStorage.getItem("isRecruiterConfirmed") === "UNCONFIRMED") {
                    console.log("unconfirmed confirm email submit",)
                    try {
                        const res = await provider.confirmSignUp(signUpParams);
                        if (res?.$metadata?.requestId) {
                            setLoader(false);
                            setProgressLoading(false);
                            setProgress(0);
                            setRegisterSuccess(true);
                            setOpen(true);
                            if (sessionStorage.getItem("comingFrom") === "fromForgotPassword") {
                                sessionStorage.removeItem("comingFrom");
                                setTimeout(() => navigate("/forgot-password", { state: { values, isDoctor: false } }), 2000)

                            } else {
                                setTimeout(() => navigate("/hospital-login"), 2000)
                            }

                            // setTimeout(() => setForgotPassword("true"), 1000) 
                            // return;
                        }
                    } catch (error) {
                        console.log(77777777, error?.message)
                        if (error.message.includes("Invalid JSON")) {
                            setRegisterSuccess(true);
                            setOpen(true);
                            if (sessionStorage.getItem("comingFrom") === "fromForgotPassword") {
                                sessionStorage.removeItem("comingFrom");
                                setTimeout(() => navigate("/forgot-password", { state: { values, isDoctor: false } }), 2000);
                            } else {
                                setTimeout(() => navigate("/hospital-login"), 2000)
                            }
                            setProgress(0);
                            setLoader(false);
                            setProgressLoading(false);
                            return;
                        }
                        setProgress(0);
                        setLoader(false);
                        setProgressLoading(false);
                        setOpen(true);
                        setError(error.message);
                        return;
                    }
                } else {
                    const res = await provider.confirmSignUp(signUpParams);
                    console.log("confirm email submit", res)
                    if (res?.$metadata?.requestId) {
                        setLoader(false);
                        setProgressLoading(false);
                        setProgress(0);
                        setRegisterSuccess(true);
                        setOpen(true);
                        setTimeout(() => navigate("/hospital-login"), 2000)
                        return;
                    }
                }

            } catch (err) {
                console.log(err)
                if (err.message.includes("Invalid JSON")) {
                    setRegisterSuccess(true);
                    setOpen(true);
                    setTimeout(() => navigate("/hospital-login"), 2000);
                    setProgress(0);
                    setLoader(false);
                    setProgressLoading(false);
                    return;
                }
                setProgress(0);
                setLoader(false);
                setProgressLoading(false);
                setOpen(true);
                setError(err.message);
                return;
            }
            setError("");
        }
    };

    const handleLogIn = async (event, from) => {
        if (event.key === "Enter" || from === "onClick") {

            if (values.email === "" || values.password === "" || (re.test(values.email)) === false) {
                setError("Email is mandatory!");
                setErrorPassword("Password is mandatory!");
                setErrorInvalidEmail("Email address is invalid.");
                return
            }

            var logInParams = {
                ClientId: poolData.ClientId,
                AuthFlow: `${process.env.REACT_APP_HOSPITAL_FLOW_SIGNUP_AUTHFLOW}`,
                AuthParameters: {
                    USERNAME: values.email,
                    PASSWORD: values.password,
                },
            };

            setLoader(true);
            setProgressLoading(true);

            try {
                const res = await provider.initiateAuth(logInParams);
                var access_token = res["AuthenticationResult"]["AccessToken"]; 
                var refresh_token = res["AuthenticationResult"]["RefreshToken"];
                sessionStorage.setItem("accessToken", access_token); 
                sessionStorage.setItem("refreshToken", refresh_token);
                sessionStorage.setItem("flow", "hospital");
                setisLogin(true); 
                setLoginSuccess(true);
                setFailureLogin(false);
                setOpen(true);
                setProgress(0);
                setLoader(false);
                setProgressLoading(false);
            } catch (error) {
                setFailureLogin(true);
                setLoginSuccess(false);
                setError(error.message);
                setProgress(0);
                setLoader(false);
                setProgressLoading(false);
                setOpen(true);
            }

            if (access_token) {
                getUserProfile();
                gqlquery(QUERY_GETHOSPITAL, null)
                    .then((res) => res.json())
                    .then((datas) => {
                        // console.log("successfull", datas);
                        setProgress(0);
                        setLoader(false);
                        setProgressLoading(false);
                        if (datas?.data?.getHospital) {
                            setTimeout(() => navigate("/hospital-dashboard"), 1500);
                        } else {
                            setTimeout(() => navigate("/hospital-basic-details"), 1500);
                        }
                    });
            }
            setError("");
            setErrorPassword("");
            setErrorInvalidEmail("");
        }
    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setSignupResendCode(false);
        setError("");
        setMatchPassword("");
        setSuccess("");
        setFailure(false);
        setUserExists(false);
        setFailureLogin(false);
        setLoginSuccess(false);
        setRegisterSuccess(false);
        setVerificationCodeSent(false);
    };

    // progressbar useEffect
    console.log("progress", progress, "snackbar", userExists, failureLogin, loginSuccess, signupResendCode, verificationCodeSent, registerSuccess, 1, failure, 2, successForgetPassword, 3, success, 4, matchPassword, "error", error)
    useEffect(() => {
        let timer;
        const progressFunc = () => {
            timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 5));
            }, 182.70);

        }

        if (progressLoading) {
            progressFunc();
        }

        return () => {
            clearInterval(timer);
        };
    }, [progressLoading]);

    // open forgot password
    const handleOpenForgotPassword = () => {
        navigate("/forgot-password", { state: { values, isDoctor: false } });
    }
    const handleForgotPasswordVerificationCode = async (event, from) => {
        if (event.key === "Enter" || from === "onClick") {
            // email validaton 
            //  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


            //  if ( (re.test(values.email)) === false ) {
            //      setErrorInvalidEmail("Email address is invalid.");
            //      return
            //  }
            //  else {
            //   setErrorInvalidEmail("");
            //  }

            if (values.email === "" || values.forgotPasswordCode === "" || (re.test(values.email)) === false) {
                setError("Email is mandatory!");
                setErrorPassword("Reset code is mandatory!");
                setErrorInvalidEmail("Email address is invalid.");
                return
            }
            // console.log(values.forgotPasswordCode, values, location.state)
            navigate("/create-new-password", { state: { forgotPasswordCode: values.forgotPasswordCode, email: values.email || location.state?.values.email, isDoctor: false } });
            setError("");
            setErrorPassword("");
            setErrorInvalidEmail("");
        }
    }

    const recoveryEmail = sessionStorage.getItem("recoveryEmail");
    const currentEmail = sessionStorage.getItem("email");
    const resetPassword = sessionStorage.getItem("finalpassword");

    const handleVerificationCode = async (event, from) => {
        if (event.key === "Enter" || from === "onClick") {

            if (values.email === "") {
                values.email = location.state?.values?.email;
            }

            if (recoveryEmail) {
                values.email = recoveryEmail;
            }
            if (
                values.email === ""
            ) {
                setError("Email is mandatory!");
                return
            }
            var forgotPasswordParams = {
                ClientId: poolData.ClientId,
                AuthFlow: `${process.env.REACT_APP_HOSPITAL_FLOW_SIGNUP_AUTHFLOW}`,
                Username: values.email,
            };

            setLoader(true);
            setProgressLoading(true);
            try {
                const res = await provider.forgotPassword(forgotPasswordParams);
                if (res?.$metadata?.requestId) {
                    setLoader(false);
                    setProgressLoading(false);
                    setProgress(0);
                    setSuccess("A code has been sent to your email address!");
                    setOpen(true);
                    setError("");
                    setForgotPassword("true");
                }
            } catch (error) {
                setLoader(false);
                setProgressLoading(false);
                setProgress(0);
                setFailure(true);
                setOpen(true);
                setError("Something went wrong. Please try again.");
                return;
            }

            setError("");
            setErrorInvalidEmail("");
        }
    }
    const hanldeResetPassword = async (event, from) => {
        if (event.key === "Enter" || from === "onClick") {

            if (values.email === "") {
                values.email = values.email || location.state?.values?.email || recoveryEmail || currentEmail;
            }

            let finalpassword;
            if (resetPassword) {
                values.password = resetPassword;
                values.confirmpassword = resetPassword;
            }
            // console.log(values);
            if (values.password === values.confirmpassword) {
                finalpassword = values.password;
                // sessionStorage.setItem("finalpassword", finalpassword);
                // console.log("Password match.", finalpassword);
                setMatchPassword("");
            } else {
                setOpen(true);
                setMatchPassword("Password didn't match.");
                return;
            }

            if (
                values.password === "" ||
                values.confirmpassword === ""
            ) {
                setErrorPassword("New Password is mandatory!");
                setErrorConfirmPassword("New Confirm Password is mandatory!");
                return
            }

            let regex =
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            if ((regex.test(values.password)) && (regex.test(values.password))) {
                console.log("Your password is strong");
                setStrongPassword("Your password is strong");
            } else {
                console.log("Your password is not strong enough");
                setWeakPassword("Your password is not strong enough");
                return;
            }

            var forgotPasswordParams = {
                ClientId: poolData.ClientId,
                AuthFlow: `${process.env.REACT_APP_HOSPITAL_FLOW_SIGNUP_AUTHFLOW}`,
                Username: values.email,
                Password: finalpassword,
                ConfirmationCode: values.forgotPasswordCode
            };
            console.log(forgotPasswordParams)

            setLoader(true);
            setProgressLoading(true);

            try {
                const res = await provider.confirmForgotPassword(forgotPasswordParams);
                console.log(res)
                if (res?.$metadata?.requestId) {
                    setOpen(true);
                    setSuccess("Your password has been updated successfully!");
                    setSuccessForgetPassword("Your password has been updated successfully!")
                    values.password = "";
                    values.confirmpassword = "";
                    values.forgotPasswordCode = "";
                    setError("");
                    sessionStorage.clear();
                    setTimeout(() => navigate("/hospital-login"), 3000);
                    setLoader(false);
                    setProgressLoading(false);
                    setProgress(0);
                }
            }
            catch (err) {
                console.log(err.message)
                if (err.message.includes("Invalid JSON")) {
                    setLoader(false);
                    setProgressLoading(false);
                    setProgress(0);
                    setRegisterSuccess(true);
                    setOpen(true);
                    sessionStorage.clear();
                    setTimeout(() => navigate("/hospital-login"), 3000);
                    return;
                }
                setLoader(false);
                setProgressLoading(false);
                setProgress(0);
                setError(err.message); 
                setOpen(true);
                // sessionStorage.setItem("finalpassword", finalpassword);
                // sessionStorage.setItem("recoveryEmail", location?.state?.email);
                setTimeout(() => navigate("/forgot-password"), 3000); 
                return;
            }
            setErrorPassword("");
            setErrorConfirmPassword("");
        }
    }
    return (
        <>
            {
                (!token || isLogin) ? <SignupGrid style={{ padding: !matches ? "20px 39px 40px" : "20px 26px 40px", boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)" }} item className="doctor-signup">
                    {recievedCode ? (
                        <Box sx={{
                            height: "550px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            pt: 8,
                        }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ fontSize: !matches ? "24px" : "18px", fontWeight: "600", color: "var(--clr-blue-footer)", textAlign: !matches ? "center" : "start", mb: !matches ? 3 : 2, ml: !matches ? "" : "-10px" }}
                            >
                                Verify Email
                            </Typography>
                            <Box>
                                <InputLabel sx={{ py: 0.5 }}>
                                    6 Digits Email Confirmation Code
                                </InputLabel>
                                <TextField
                                    sx={{
                                        borderRadius: 1,
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
                                    fullWidth
                                    // type="number"
                                    // value={values.confirmcode}
                                    onChange={handleConfirmationCode("code")}
                                    onKeyDown={handleConfirmEmailSubmit}
                                    placeholder="Enter 6 Digits Confirmation Code"
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
                            </Box>
                            {(confirmEmailCode.code === "" || confirmEmailCode.code === undefined) && (
                                <FormHelperText sx={{ color: "red", mt: -2.5 }}>
                                    {error}
                                    {/* Varification code can't be empty. */}
                                </FormHelperText>
                            )}
                            {(sessionStorage.getItem("comingFrom") === "fromForgotPassword") && (
                                <FormHelperText sx={{ color: "red", mt: -2.5 }}>
                                    ** Please verify your email to reset the password.
                                </FormHelperText>
                            )}
                            {error && (
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%', backgroundColor: "red", color: "white", fontWeight: "bold" }}>
                                        Invalid verification code provided, please try again.
                                    </Alert>
                                </Snackbar>
                            )}
                            <Button
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
                            height: "600px",
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
                                        !matches ? (
                                            <>
                                                {props.pageType === "HospitalSignUp" && "Recruiter Sign Up"}
                                                {props.pageType === "HospitalLogIn" && "Login"}
                                                {props.pageType === "Create New Password" && "Create New Password"}
                                                {props.pageType === "Forgot Password" && "Forgot Password"}
                                            </>
                                        ) : (
                                            <>
                                                {props.pageType === "HospitalSignUp" && "Recruiter Sign Up"}
                                                {props.pageType === "HospitalLogIn" && "Login"}
                                                {props.pageType === "Create New Password" && "Create New Password"}
                                                {props.pageType === "Forgot Password" && "Forgot Password"}
                                            </>
                                        )
                                    }

                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2.5,
                                        borderRadius: "6px",
                                        mt: !matches ? 5 : 2.5
                                    }}
                                >
                                    {props.pageType === "Create New Password" ||

                                        <>
                                            {recoveryEmail && resetPassword ?
                                                (<Box>
                                                    <InputLabel sx={{ py: 0.5 }}>Email ID</InputLabel>
                                                    <TextField
                                                        sx={{
                                                            borderRadius: 1, color: "var(--clr-blue-footer)",
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
                                                            }
                                                        }}
                                                        size="small"
                                                        disableUnderline
                                                        id="outlined-adornment-password"
                                                        defaultValue={recoveryEmail ? recoveryEmail : values.email}
                                                        type="email"
                                                        // value={emailByLink?.email}
                                                        disabled
                                                        fullWidth
                                                        onChange={handleChange("email")}
                                                        placeholder="Email"
                                                    />
                                                </Box>)
                                                :
                                                (<Box>
                                                    <InputLabel sx={{ py: 0.5 }}>Email ID</InputLabel>
                                                    <TextField
                                                        sx={{
                                                            borderRadius: 1, color: "var(--clr-blue-footer)",
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
                                                            }
                                                        }}
                                                        size="small"
                                                        disableUnderline
                                                        id="outlined-adornment-password"
                                                        type="email"
                                                        // value={values.email}
                                                        defaultValue={location.state?.values?.email || values.email || ((props.pageType !== "Register" && props.pageType !== "Login") ? currentEmail : "")}
                                                        error={values.email === "" && error}
                                                        onChange={handleChange("email")}
                                                        onKeyDown={(props.pageType === "HospitalSignUp" && handleSubmit) || (props.pageType === "HospitalLogIn" && handleLogIn) || (props.pageType === "Forgot Password" && forgotPassword !== "true" && handleVerificationCode) || (forgotPassword === "true" && handleForgotPasswordVerificationCode)}
                                                        placeholder="Email"
                                                        fullWidth
                                                    />
                                                    {values.email === "" && (
                                                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                            {error}
                                                        </FormHelperText>
                                                    )}
                                                    {/* {console.log(location)} */}
                                                    {/*    {errorInvalidEmail !== "" && (
                                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                                            {errorInvalidEmail}
                                        </FormHelperText>
                                        )} */}
                                                    {(((re.test(values.email)) === false) && (values.email !== "")) && (
                                                        <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                            {errorInvalidEmail}
                                                        </FormHelperText>
                                                    )}
                                                </Box>)
                                            }
                                        </>
                                    }

                                    {props.pageType === "Forgot Password" || (
                                        <Box>
                                            <InputLabel sx={{ py: 0.5 }}>
                                                {props.pageType === "Create New Password"
                                                    ? "New Password"
                                                    : "Password"}
                                            </InputLabel>
                                            <TextField
                                                sx={{
                                                    borderRadius: 1, color: "var(--clr-blue-footer)",
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
                                                    endAdornment: <InputAdornment
                                                        sx={{ mr: 0.5 }} position="end">
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
                                                size="small"
                                                disableUnderline
                                                fullWidth
                                                error={values.awardname === "" && errorPassword}
                                                defaultValue={resetPassword ? resetPassword : values.password}
                                                onChange={handleChange("password")}
                                                onKeyDown={(props.pageType === "HospitalSignUp" && handleSubmit) || (props.pageType === "HospitalLogIn" && handleLogIn) || (props.pageType === "Create New Password" && hanldeResetPassword)}
                                                placeholder="Password"
                                                type={values.showPassword ? "text" : "password"}
                                            />
                                            {values.password === "" && (
                                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                    {errorPassword}
                                                </FormHelperText>
                                            )}
                                            {((props.pageType !== "HospitalLogIn") && (passwordRegex.test(values.password) === true)) && (
                                                <FormHelperText sx={{ color: "green", mt: 0 }}>
                                                    Your password is strong
                                                </FormHelperText>
                                            )}
                                            {((props.pageType !== "HospitalLogIn") && (values.password !== "") && (passwordRegex.test(values.password) === false)) && (
                                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                    Your password is not strong enough
                                                </FormHelperText>
                                            )}

                                            {props.pageType === "HospitalLogIn" && (
                                                <Box sx={{ textAlign: "right", textDecoration: "underline", my: 1, }}>
                                                    <Button variant="text">
                                                        <Typography
                                                            sx={{
                                                                color: "var(--clr-blue-footer)",
                                                                fontWeight: 600
                                                            }}
                                                            variant="subtitle2"
                                                            onClick={userExistsData?.user?.recruiterConfirmed === "UNCONFIRMED" ? resendCode : handleOpenForgotPassword}
                                                        >
                                                            Forgot Password?
                                                        </Typography>
                                                    </Button>
                                                </Box>
                                            )}
                                        </Box>
                                    )}

                                    {/* 6 digits Code */}
                                    {forgotPassword && (
                                        <Box>
                                            <Box>
                                                {/* <InputLabel sx={{ py: 0.5 }}>Email ID</InputLabel> */}
                                                <InputLabel sx={{ py: 0.5 }}>6 Digits Confirmation Code</InputLabel>
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
                                                    error={values.forgotPasswordCode === "" && errorPassword}
                                                    fullWidth
                                                    value={values.forgotPasswordCode}
                                                    onChange={handleChange("forgotPasswordCode")}
                                                    onKeyDown={forgotPassword === "true" && handleForgotPasswordVerificationCode}
                                                    placeholder="Enter 6 Digits Confirmation Code"
                                                    inputProps={
                                                        { maxLength: 6 }
                                                    }
                                                    onInput={(e) => onlyNumbers(e)}
                                                />
                                                {values.forgotPasswordCode === "" && (
                                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                        {errorPassword}
                                                    </FormHelperText>
                                                )}
                                                <Box sx={{ textAlign: "right", textDecoration: "underline", my: 1, }}>
                                                    <Typography
                                                        sx={{
                                                            color: "var(--clr-blue-footer)",
                                                            fontWeight: 600
                                                        }}
                                                        variant="subtitle2"
                                                        component={Link}
                                                        to="/forgot-password"
                                                        onClick={() => setForgotPassword("")}

                                                    >
                                                        Resend Code
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <InputLabel sx={{ py: 0.5 }}>
                                                    New Password
                                                </InputLabel>
                                                <TextField
                                                    sx={{
                                                        borderRadius: 1, color: "var(--clr-blue-footer)",
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
                                                        endAdornment: <InputAdornment
                                                            sx={{ mr: 0.5 }} position="end">
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
                                                    size="small"
                                                    disableUnderline
                                                    fullWidth
                                                    error={values.awardname === "" && errorPassword}
                                                    defaultValue={resetPassword ? resetPassword : values.password}
                                                    onChange={handleChange("password")}
                                                    onKeyDown={(props.pageType === "HospitalSignUp" && handleSubmit) || (props.pageType === "HospitalLogIn" && handleLogIn) || (props.pageType === "Create New Password" && hanldeResetPassword)}
                                                    placeholder="Password"
                                                    type={values.showPassword ? "text" : "password"}
                                                />
                                                {values.password === "" && (
                                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                        {errorPassword}
                                                    </FormHelperText>
                                                )}
                                                {(passwordRegex.test(values.password) === true) && (
                                                    <FormHelperText sx={{ color: "green", mt: 0 }}>
                                                        Your password is strong
                                                    </FormHelperText>
                                                )}
                                                {(values.password !== "") && (passwordRegex.test(values.password) === false) && (
                                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                        Your password is not strong enough
                                                    </FormHelperText>
                                                )}

                                                {props.pageType === "HospitalLogIn" && (
                                                    <Box sx={{ textAlign: "right", textDecoration: "underline", my: 1, }}>
                                                        <Button variant="text">
                                                            <Typography
                                                                sx={{
                                                                    color: "var(--clr-blue-footer)",
                                                                    fontWeight: 600
                                                                }}
                                                                variant="subtitle2"
                                                                onClick={userExistsData?.user?.recruiterConfirmed === "UNCONFIRMED" ? resendCode : handleOpenForgotPassword}
                                                            >
                                                                Forgot Password?
                                                            </Typography>
                                                        </Button>
                                                    </Box>
                                                )}
                                            </Box>
                                            <Box sx={{ my: 1.3 }}>
                                                <InputLabel sx={{ py: 0.5 }}>Confirm New Password</InputLabel>
                                                <TextField
                                                    sx={{ borderRadius: 1 }}
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
                                                        endAdornment: <InputAdornment
                                                            sx={{ mr: 0.5 }} position="end">
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
                                                    size="small"
                                                    disableUnderline
                                                    fullWidth
                                                    defaultValue={resetPassword ? resetPassword : values.confirmpassword}
                                                    error={values.confirmpassword === "" && errorConfirmPassword}
                                                    onChange={handleChange("confirmpassword")}
                                                    onKeyDown={(props.pageType === "HospitalSignUp" && handleSubmit) || props.pageType === "Create New Password" && hanldeResetPassword}
                                                    placeholder="Confirm Password"
                                                    type={values.showConfirmPassword ? "text" : "password"}
                                                    endAdornment={
                                                        <InputAdornment
                                                            sx={{ mr: 0.5 }} position="end">
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
                                                        Password & Confirm password didn't match
                                                    </FormHelperText>
                                                )}
                                                {(passwordRegex.test(values.confirmpassword) === true) && (
                                                    <FormHelperText sx={{ color: "green", mt: 0 }}>
                                                        {
                                                            ((values.confirmpassword !== "") && (values.confirmpassword !== "") && (values.password !== values.confirmpassword)) ? "" : "Your Confirm password is strong"
                                                        }

                                                    </FormHelperText>
                                                )}
                                                {(values.confirmpassword !== "") && (passwordRegex.test(values.confirmpassword) === false) && (
                                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                        {
                                                            ((values.confirmpassword !== "") && (values.confirmpassword !== "") && (values.password !== values.confirmpassword)) ? "" : "Your Confirm password is not strong enough"
                                                        }
                                                    </FormHelperText>
                                                )}
                                            </Box>
                                        </Box>
                                    )}
                                    {props.pageType === "HospitalLogIn" ||
                                        props.pageType === "Forgot Password" || (
                                            <Box>
                                                <InputLabel sx={{ py: 0.5 }}>Confirm Password</InputLabel>
                                                <TextField
                                                    sx={{ borderRadius: 1, fontSize: "14px" }}
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
                                                        endAdornment: <InputAdornment
                                                            sx={{ mr: 0.5 }} position="end">
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
                                                    size="small"
                                                    disableUnderline
                                                    fullWidth
                                                    defaultValue={resetPassword ? resetPassword : values.confirmpassword}
                                                    error={values.confirmpassword === "" && errorConfirmPassword}
                                                    onChange={handleChange("confirmpassword")}
                                                    onKeyDown={(props.pageType === "HospitalSignUp" && handleSubmit) || props.pageType === "Create New Password" && hanldeResetPassword}
                                                    placeholder="Confirm Password"
                                                    type={values.showConfirmPassword ? "text" : "password"}
                                                    endAdornment={
                                                        <InputAdornment
                                                            sx={{ mr: 0.5 }} position="end">
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
                                                        Password & Confirm password didn't match
                                                    </FormHelperText>
                                                )}
                                                {(passwordRegex.test(values.confirmpassword) === true) && (
                                                    <FormHelperText sx={{ color: "green", mt: 0 }}>
                                                        {
                                                            ((values.confirmpassword !== "") && (values.confirmpassword !== "") && (values.password !== values.confirmpassword)) ? "" : "Your Confirm password is strong"
                                                        }

                                                    </FormHelperText>
                                                )}
                                                {(values.confirmpassword !== "") && (passwordRegex.test(values.confirmpassword) === false) && (
                                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                        {
                                                            ((values.confirmpassword !== "") && (values.confirmpassword !== "") && (values.password !== values.confirmpassword)) ? "" : "Your Confirm password is not strong enough"
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
                                    {(values.password === values.confirmpassword) && (
                                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                                {error}
                                            </Alert>
                                        </Snackbar>
                                    )}
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
                                    {props.pageType === "HospitalLogIn" && (
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            onClick={(event) => handleLogIn(event, "onClick")}
                                            sx={{ p: 1, my: 2, borderRadius: 16 }}
                                        >
                                            {loader ? (
                                                <CircularProgress size={25} sx={{ color: "white" }} variant="determinate" value={progress} />
                                            ) : (
                                                "Log In"
                                            )}
                                        </Button>
                                    )}
                                    {props.pageType === "HospitalSignUp" && (
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            onClick={(event) => handleSubmit(event, "onClick")}
                                            sx={{ p: 1, my: 3, borderRadius: 16 }}
                                        >
                                            {loader ? (
                                                <CircularProgress size={25} sx={{ color: "white" }} variant="determinate" value={progress} />
                                            ) : (
                                                "Sign Up"
                                            )}
                                        </Button>
                                    )}

                                    {props.pageType === "Forgot Password" && forgotPassword === "" && (
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            onClick={(event) => handleVerificationCode(event, "onClick")}
                                            sx={{ borderRadius: 16, mt: 4 }}
                                        >

                                            {loader ? (
                                                <CircularProgress size={25} sx={{ color: "white" }} variant="determinate" value={progress} />
                                            ) : (
                                                "Get Code"
                                            )}
                                        </Button>
                                    )}
                                    {forgotPassword === "true" && (
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            sx={{ borderRadius: 16 }}
                                            onClick={(event) => hanldeResetPassword(event, "onClick")}
                                        >
                                            {loader ? (
                                                <CircularProgress size={25} sx={{ color: "white" }} variant="determinate" value={progress} />
                                            ) : (
                                                "Reset Password"
                                            )}
                                        </Button>
                                    )}
                                    {props.pageType === "Create New Password" && (
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            onClick={(event) => hanldeResetPassword(event, "onClick")}
                                            sx={{ borderRadius: 16, mt: 2 }}
                                        // component={Link}
                                        // to="/hospital-login"
                                        >
                                            {loader ? (
                                                <CircularProgress size={25} sx={{ color: "white" }} variant="determinate" value={progress} />
                                            ) : (
                                                "Reset Password"
                                            )}
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                {props.pageType === "HospitalSignUp" && (
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
                                            to="/hospital-login"
                                            sx={{ fontWeight: 600, fontSize: "1rem", textDecoration: "underline", }}
                                        >
                                            Sign In
                                        </Button>
                                    </Box>
                                )}

                                {props.pageType === "HospitalLogIn" && (
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
                                            to="/hospital-signup"
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
                                            to="/hospital-signup"
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
                    {successForgetPassword && (
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                {/* {forgotPassword === 'true' && success} */}
                                Your password has been updated successfully!
                            </Alert>

                        </Snackbar>
                    )}
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
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%', backgroundColor: "green", color: "white", fontWeight: "bold" }}>
                                Congratulation! Your account has been created.
                            </Alert>

                        </Snackbar>
                    )}
                    {verificationCodeSent &&
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                A code has been sent to your email successfully.
                                {/* Congratulation! Your account has been created. */}
                            </Alert>

                        </Snackbar>
                    }
                    {signupResendCode &&
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                A verification code is sent again, please confirm.
                                {/* Congratulation! Your account has been created. */}
                            </Alert>

                        </Snackbar>
                    }
                    {loginSuccess && (
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%', backgroundColor: "green", color: "white", fontWeight: "bold" }}>
                                Congratulation! Login is successful.
                            </Alert>
                        </Snackbar>
                    )}
                    {failureLogin && (
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%', backgroundColor: "red", color: "white", fontWeight: "bold" }}>
                                Incorrect username or password.
                            </Alert>

                        </Snackbar>
                    )}
                    {userExists && (
                        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error">
                                An account with the given email already exists. Try another!
                            </Alert>
                        </Snackbar>
                    )}
                </SignupGrid > : <Navigate to="/hospital-login" />
            }
        </>

    );
};

export default HospitalSignUpForm;
