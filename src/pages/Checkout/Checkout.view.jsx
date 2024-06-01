import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  Breadcrumbs,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled, useTheme,  createTheme, ThemeProvider } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  gqlquery, gqlOpenQuery, QUERY_GETHOSPITAL, QUERY_GETHOSPITALASAS, QUERY_HOSPITALDETAILS } from "../../api/hospitalIndex";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import lottie from 'lottie-web';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Autocomplete from '@mui/material/Autocomplete';

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

const selectPlaceholderStyles = makeStyles((theme) => ({
  placeholder: {
    color: "#B8BCCA",
  },
}));

const SelectPlaceholder = ({ children }) => {
  const classes = selectPlaceholderStyles();
  return <div className={classes.placeholder}>{children}</div>;
};


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "6px",
    position: "relative",
    border: "1px solid #E4EEF5",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    padding: "12px",

    "&:focus": {
      borderRadius: "6px",
      border: "1px solid #E4EEF5",
    },
  },
}));

// Custom style for Select dropdown

const useStyles = makeStyles({
  icon: {
    fill: "var(--clr-blue-footer)",
  },
  menuPaper: {
    maxHeight: 150
  }
});

const cityList = ["Delhi", "Mumbai", "Pune", "Chennai", "Bangalore", "Kolkata"];
const stateList = ["Delhi", "Mumbai", "Chennai", "Kolkata"];
const countries = ["India"];

const Checkout = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [errSelect, setErrSelect] = useState("");
  let [values, setValues] = useState({
    companyName: "",
    personName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    gstin: "",
    quantity: 0,
    location: null, 
  });
  const [allCityLocation, setAllCityLocation] = useState([]);
  const [allState, setAllState] = useState([]);
  const classes = useStyles();

  const menuQuantitys = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
    78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96,
    97, 98, 99,
  ];
  const location = useLocation();
  const [hospitalData, setHospitalData] = useState([]);
  const [hospitalDetailsData, setHospitalDetailsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPaytm, setIsLoadingPaytm] = useState(false);
  const [isloadingHospitalDetails, setIsLoadingHospitalDetails] = useState(true);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [transactionFailure, setTransactionFailure] = useState(false);
  const [transactionStopped, setTransactionStopped] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [validPhoneNumErr, setValidPhoneNumErr] = useState("");
  const [validPinNumErr, setValidPinNumErr] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  document.title = "Checkout | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  
  const getCityAndState = async () => {

    const GET_COUNTRY = {
      query: `query MyQuery {
        getStateMaster(country: "${values.country}") {
          state
        }
      }
    `,
      variables: null,
      operationName: "MyQuery",
    };

    gqlquery(GET_COUNTRY, null)
      .then((res) => res.json())
      .then((datas) => setAllState(datas?.data?.getStateMaster));

    const GET_CITY = {
      query: `query MyQuery {
      getCityByState(country: "${values.country}", state: "${values.state}") {
        city 
        lmID 
      }
    }
  `,
      variables: null,
      operationName: "MyQuery",
    };

    gqlquery(GET_CITY, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllCityLocation(datas?.data?.getCityByState)
      });
  }

  useEffect(() => {
    if (values.quantity === 0) {
      values.quantity = location?.state?.quantity;
    }
    

    const getData = async () => {
    let dataFromRegisteringStage = [];
    let dataAfterUpdate = [];
    console.log("step 1")
      await gqlquery(QUERY_GETHOSPITAL, null)
        .then((res) => res.json())
        .then((data) => {
          dataFromRegisteringStage = data?.data?.getHospital;
          setHospitalData(data?.data?.getHospital);
        })
        .finally(() => setIsLoading(false));
        console.log("step 2")
      await gqlquery(QUERY_HOSPITALDETAILS, null)
        .then((res) => res.json())
        .then((data) => {  
          dataAfterUpdate = data?.data?.getHospitalDetails;
          setHospitalDetailsData(data?.data?.getHospitalDetails);
         
        })
        .finally(() => setIsLoadingHospitalDetails(false));

      if (values.email === "") {
        values.email = dataFromRegisteringStage?.contactEmail;
      }
      if (values.personName === "") {
        values.personName = dataFromRegisteringStage?.contactName;
      }
      if (values.phone === "") {
        values.phone = dataAfterUpdate?.mobile || dataFromRegisteringStage?.contactPhone;
      } 
      if (values.companyName === "") {
        values.companyName = dataFromRegisteringStage?.type;
      }

      //  1gjaeootuawepogjdsfngq4ow3ip

      if (values.pinCode === "") {
        values.pinCode = dataAfterUpdate?.pincode;
      }
      if (values.gstin === "") {
        values.gstin = dataAfterUpdate?.gstin;
      }
      if (values.city === "") {
        values.city = dataAfterUpdate?.city;
      }
      if (values.state === "") {
        values.state = dataAfterUpdate?.state;
      }
      if (values.country === "") {
        values.country = "India"
      } 
      if(values.location === null) {
        values.location = hospitalDetailsData?.locationID
      }
      getCityAndState();
    };

      getData();

  }, []);

 

  useEffect(() => {
 
    getCityAndState();
    
  }, [values.country, values.state])

  let newPrice = values.quantity ? values.quantity * location.state.price : location.state.price * location.state.quantity;
  let AdditionalCharge = 1000;
  let totalPrice = newPrice + AdditionalCharge;

  const handleonChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  let gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  const onlyNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const handleCheckoutSubmit = () => { 
    console.log("values: ", values)
    if (
      (values.city === "" || !values.city) ||
      (values.location === "" || !values.location) ||
      (values.state === "" || !values.state) ||
      values.country === "" ||
      values.quantity === 0 ||
      values.companyName === "" ||
      values.personName === "" ||
      values.phone === "" ||
      values.email === "" ||
      !values.address ||
      (!values.pinCode) || ((values?.pinCode !== "") && (values?.pinCode?.length !== 6)) ||  
      values.address === "" || 
      values.pinCode === ""
    ) {
      setError("Text Field can't be empty!");  
      setErrSelect("Please, select an option!");
      setValidPinNumErr("Invalid pin number.");
      return;
    } else {
      setError("");
      setErrSelect("");
    } 

    if ((values.phone.length !== 10)) {
      return setValidPhoneNumErr("Invalid phone number.");
    } else {
      setValidPhoneNumErr("");
    }

    if ((values.pinCode.length !== 6)) {
      return setValidPinNumErr("Invalid pin number.");
    } else {
      setValidPinNumErr("");
    } 

    setIsLoadingPaytm(true);

    console.log("values: through validation: ", values)

    const QUERY_INITIATEPAYMENT = {
      query: `mutation MyMutation {
          initiatePayment(
            amount: "${totalPrice}",
            spID: "${location.state.spID}",
            quantity: ${Number(values.quantity ? values.quantity : location.state.quantity)}
          ) {
          orderID
          pID
          status
          transactionCode
        }
      }`,
      variables: null,
      operationName: "MyMutation",
    };

    const onScriptLoad = (data) => {
      let transactionCode = data.transactionCode;
     
      var config = {
        root: "",
        flow: "DEFAULT",
        merchant: {
          redirect: false
        },
        data: {
          orderId: `${data?.orderID}` /* update order id */,
          token: `${data?.transactionCode}` /* update token value */,
          tokenType: "TXN_TOKEN",
          amount: `${totalPrice}` /* update amount */,
        },
        handler: {
          transactionStatus: function (data) {
            console.log("payment status ", data);
            if (data?.STATUS === "TXN_SUCCESS") {
              setOpenSnackbar(true);
              setIsLoadingPaytm(false);
              setTransactionSuccess(true);
            }
            if (data?.STATUS !== "TXN_SUCCESS") {
              setOpenSnackbar(true);
              setIsLoadingPaytm(false);
              setTransactionFailure(true);
            }
            window.Paytm.CheckoutJS.close();

            const QUERY_UPDATEPAYMENTSTATUS = {
              query: `mutation MyMutation {
                updatePaymentStatus(
                  bankName: "${data?.BANKNAME}",  
                  bankTransactionID: "${data?.BANKTXNID}", 
                  checksumHash: "${data?.CHECKSUMHASH}", 
                  currency: "${data?.CURRENCY}", 
                  gatewayName: "${data?.GATEWAYNAME}", 
                  mid: "${data?.MID}", 
                  orderID: "${data?.ORDERID}", 
                  paymentMode: "${data?.PAYMENTMODE}", 
                  respCode: "${data?.RESPCODE}", 
                  respMessage: "${data?.RESPMSG}",
                  status: "${data?.STATUS}", 
                  transactionAmount: ${Number(data?.TXNAMOUNT)}, 
                  transactionCode: "${transactionCode}" 
                  transactionDate: "${data?.TXNDATE.slice(0, 10)}", 
                  transactionID: "${data?.TXNID}",
                  companyName: "${values.companyName}", 
                  contactName: "${values.personName}", 
                  mobile: "${values.phone}", 
                  email: "${values.email}", 
                  address: "${values.address}", 
                  locationID: ${values.location?.lmID}, 
                  pinCode: "${values.pinCode}", 
                  gstin: "${values.gstin === undefined ? "" :values.gstin}")
              }`,
              variables: null,
              operationName: "MyMutation",
            };
            
            gqlquery(QUERY_UPDATEPAYMENTSTATUS, null)
              .then((res) => res.json())
              .then((datas) => {
                console.log(datas);
                setTimeout(() => navigate("/subscription-status"), 3000);
              })

          },
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            if (eventName === "APP_CLOSED") {
              setIsLoadingPaytm(false);
              setTransactionStopped(true);
              setTimeout(() => {
                setTransactionStopped(false);
              }, 2000)
            }
            console.log("data => ", data);
          },
        },
      };

      if (window.Paytm && window.Paytm.CheckoutJS) {
        console.log("inside paytm window"); 
        window.Paytm.CheckoutJS.init(config)
          .then(function onSuccess() {
            // after successfully updating configuration, invoke JS Checkout
            console.log("about to invoke checkout");
            window.Paytm.CheckoutJS.invoke();
          })
          .catch(function onError(error) {
            console.log("error => ", error);
          });
        // });
      }
      // }
    };

    gqlquery(QUERY_INITIATEPAYMENT, null)
      .then((res) => res.json())
      .then((datas) => {
        onScriptLoad(datas?.data?.initiatePayment);
      })
  };

  const paymentSuccess = useRef(null);
  const paymentFailure = useRef(null);
  const paymentCancelled = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: paymentSuccess.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./69013-successful-check.json')
    })

    lottie.loadAnimation({
      container: paymentFailure.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./10960-error.json')
    })

    lottie.loadAnimation({
      container: paymentCancelled.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./19230-payment-failed.json')
    })
  }, [transactionSuccess, transactionFailure, transactionStopped])

  const SearchPresentCity = (event) => {
    const val = event.target.value.split(" ").length - 1;
    const valtwo = event.target.value.length - val
  
    if(event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2){
  
      const GET_CITY= {
        query: `query MyQuery {
          searchCityByState(city: "${event.target.value}", country: "${values.country}", state: "${values.state}") {
            city
            lmID 
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      
      gqlquery(GET_CITY, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllCityLocation(datas?.data?.searchCityByState) 
      });
    }
    else {
      // console.log('else er vitor')
      const GET_CITY = {
        query: `query MyQuery {
          getCityByState(country: "${values.country}", state: "${values.state}") {
            city 
            lmID 
          }
        }
      `,
        variables: null,
        operationName: "MyQuery",
      };
      
      gqlquery(GET_CITY, null)
      .then((res) => res.json())
      .then((datas) => setAllCityLocation(datas?.data?.getCityByState));
    }
  }

  return (
    <>
      {
        matches &&
        <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px", display: "flex", alignItems: "center" }}>
          <ArrowBackIosNewIcon sx={{ color: "var(--clr-blue-footer)", mr: 3.1 }} /><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Pricing Plans</Typography>
        </Box>
      }

      <Container maxWidth="lg" sx={{ mb: 5, px: matches ? 2 : 3, py: matches ? 0.5 : 2 }}>
        {
          !matches &&
          <Box>
            <Box style={{ /* marginTop: "15px", */ marginBottom: "30px" }}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" sx={{ color: "var(--clr-blue-footer)" }} />}
                aria-label="breadcrumb"
                // sx={{ marginTop: "20px" }}
                style={{ marginBottom: "30px" }}
              >
                <Link underline="hover" style={{ color: "var(--clr-blue-footer)" }} to="/hospital-dashboard">
                  Dashboard
                </Link>
                <Link underline="hover" style={{ color: "var(--clr-blue-footer)" }} to="/profile/plans">
                  Pricing Plans
                </Link>
                <Typography sx={{ color: "var(--clr-blue-footer)" }}>
                  Checkout
                </Typography>
              </Breadcrumbs>
            </Box>
            <Typography
              variant="h5"
              sx={{
                mt: matches ? 2 : 3,
                mb: matches ? 2 : 3,
                fontWeight: "600",
                color: "#395987",
                fontSize: matches ? "18px" : "24px"
              }}
              gutterBottom
              component="div"
            >
              Checkout
            </Typography>
          </Box>
        }
        <Box sx={{ mx: "auto", my: 2 }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={12} md={8}>
              <Box
                sx={{
                  /* bgcolor: "#F2F2F2", */
                  py: 2,
                  px: matches ? 1.25 : 2,
                  borderRadius: 2,
                  boxShadow: matches ? "0px 0px 0px 0px" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                  border: matches && "1px solid #E4EEF5"
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{
                    color: "#395987",
                    fontWeight: "600",
                    mb: 2,
                  }}
                >
                  Billing Details
                </Typography>
                <Box>
                  {!isLoading && !isloadingHospitalDetails ? (
                    <Grid
                      container
                      justifyContent="space-between"
                      rowSpacing={2}
                      columnSpacing={6}
                    >
                      <Grid item xs={12} sm={12} md={6}>
                        <Box>
                          <InputLabel
                            sx={{
                              color: "#6F7482",
                              fontSize: "0.8rem",
                            }}
                            htmlFor="companyname"
                          >
                            Company Name&nbsp;
                            <Typography
                              variant="caption"
                              color="red"
                              sx={{ fontSize: "16px" }}
                            >
                              *
                            </Typography>
                          </InputLabel>
                          <TextField
                            variant="outlined"
                            placeholder="Enter company name"
                            onChange={handleonChange("companyName")}
                            // value={values.companyName}
                            defaultValue={hospitalData?.type}
                            error={error && values.companyName === ""}
                            size="small"
                            type="text"
                            fullWidth
                            disableUnderline
                            sx={{
                              color: "var(--clr-blue-footer)",
                              bgcolor: "#FFFFFF",
                              borderRadius: "4px",
                            }}
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
                          {values.companyName === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box>
                          <InputLabel
                            sx={{
                              color: "#6F7482",
                              fontSize: "0.8rem",
                            }}
                            htmlFor="Contact_Person"
                          >
                            Contact Person Name&nbsp;
                            <Typography
                              variant="caption"
                              color="red"
                              sx={{ fontSize: "16px" }}
                            >
                              *
                            </Typography>
                          </InputLabel>
                          <TextField
                            onChange={handleonChange("personName")}
                            // value={values.personName}
                            defaultValue={hospitalData?.contactName}
                            error={error && values.personName === ""}
                            placeholder="Enter contact person name"
                            id="Contact_Person"
                            size="small"
                            type="text"
                            fullWidth
                            variant="outlined"
                            disableUnderline
                            sx={{
                              color: "var(--clr-blue-footer)",
                              bgcolor: "#FFFFFF",
                              borderRadius: "4px",
                            }}
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
                          {values.personName === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box>
                          <InputLabel
                            sx={{
                              color: "#6F7482",
                              fontSize: "0.8rem",
                            }}
                            htmlFor="Mobile_Number"
                          >
                            Mobile Number&nbsp;
                            <Typography
                              variant="caption"
                              color="red"
                              sx={{ fontSize: "16px" }}
                            >
                              *
                            </Typography>
                          </InputLabel>
                          <Grid container>
                            <Grid item xs={2} md={2}>
                              <Input
                                variant="outlined"
                                defaultValue="+91"
                                disabled
                                disableUnderline
                                sx={{
                                  borderEndEndRadius: 0,
                                  borderEndStartRadius: 4,
                                  borderTopLeftRadius: 4,
                                  borderTopRightRadius: 0,
                                  color: "var(--clr-blue-footer)",
                                  fontSize: "14px"
                                }}
                              />
                            </Grid>
                            <Grid item xs={10} md={10}> 
                              <TextField
                                onChange={handleonChange("phone")}
                                // value={values.phone}
                                defaultValue={hospitalDetailsData?.mobile || hospitalData?.contactPhone}
                                error={error && values.phone === ""}
                                placeholder="Enter contact number"
                                id="Mobile_Number"
                                size="small"
                                type="tel"
                                fullWidth
                                variant="outlined"
                                disableUnderline
                                sx={{
                                  borderEndEndRadius: 4,
                                  borderEndStartRadius: 0,
                                  borderTopLeftRadius: 0,
                                  borderTopRightRadius: 4,
                                  color: "var(--clr-blue-footer)"
                                }}
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
                                inputProps={{ maxLength: 10 }}
                                onInput={(e) => onlyNumbers(e)}
                              />
                            </Grid>
                          </Grid>

                          {values?.phone === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                          {((values?.phone !== "") && (values?.phone?.length !== 10)) && (
                            <FormHelperText
                              sx={{
                                color: "red",
                                mb: 0,
                                textAlign: "left",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }}
                            >
                              {validPhoneNumErr}
                              {/* Invalid phone number */}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box>
                          <InputLabel
                            sx={{
                              color: "#6F7482",
                              fontSize: "0.8rem",
                            }}
                            htmlFor="Email_Address"
                          >
                            Email Address&nbsp;
                            <Typography
                              variant="caption"
                              color="red"
                              sx={{ fontSize: "16px" }}
                            >
                              *
                            </Typography>
                          </InputLabel>
                          <TextField
                            onChange={handleonChange("email")}
                            // value={values.email}
                            defaultValue={hospitalData?.contactEmail}
                            error={error && values.email === ""}
                            placeholder="Enter email address"
                            id="Email_Address"
                            size="small"
                            type="email"
                            fullWidth
                            variant="outlined"
                            disableUnderline
                            sx={{
                              color: "var(--clr-blue-footer)",
                              bgcolor: "#FFFFFF",
                              borderRadius: "4px",
                            }}
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
                          {values.email === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box>
                          <InputLabel
                            sx={{
                              color: "#6F7482",
                              fontSize: "0.8rem",
                            }}
                            htmlFor="Email_Address"
                          >
                            Address&nbsp;
                            <Typography
                              variant="caption"
                              color="red"
                              sx={{ fontSize: "16px" }}
                            >
                              *
                            </Typography>
                          </InputLabel>
                          <TextField
                            onChange={handleonChange("address")}
                            // value={values.address}
                            defaultValue={values.address}
                            // error={error && values.address === ""}
                            placeholder="Enter address"
                            id="Address"
                            size="small"
                            type="text"
                            multiline
                            rows={5}
                            fullWidth
                            variant="outlined"
                            disableUnderline
                            sx={{
                              color: "var(--clr-blue-footer)",
                              bgcolor: "#FFFFFF",
                              borderRadius: "4px",
                            }}
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": {
                                  // padding: '10.5px 14px',
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
                          {!values.address && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                          }}
                        >
                          <Box>
                            <InputLabel
                              sx={{
                                color: "#6F7482",
                                fontSize: "0.8rem",
                              }}
                              htmlFor="Country"
                            >
                              Country&nbsp;
                              <Typography
                                variant="caption"
                                color="red"
                                sx={{ fontSize: "16px" }}
                              >
                                *
                              </Typography>
                            </InputLabel>
                            <TextField
                              variant="outlined"
                              placeholder="Enter country name"
                              onChange={handleonChange("country")}
                              // value={values.country}
                              defaultValue={"India"}
                              error={errSelect && values.country === ""}
                              size="small"
                              type="text"
                              fullWidth
                              disableUnderline
                              disabled
                              sx={{
                                color: "var(--clr-blue-footer)",
                                bgcolor: "#FFFFFF",
                                borderRadius: "4px",
                              }}
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
                            {values.country === "" && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {errSelect}
                              </FormHelperText>
                            )}
                          </Box>
                          <Box>
                            <InputLabel
                              sx={{
                                color: "#6F7482",
                                fontSize: "0.8rem",
                              }}
                              htmlFor="State"
                            >
                              State&nbsp;
                              <Typography
                                variant="caption"
                                color="red"
                                sx={{ fontSize: "16px" }}
                              >
                                *
                              </Typography>
                            </InputLabel>
                            <FormControl
                              id="State"
                              size="small"
                              placeholder="Enter state name"
                              fullWidth
                              sx={{
                                color: "#6F7482",
                                bgcolor: "#FFFFFF",
                              }}
                            >
                              <Select
                                displayEmpty
                                renderValue={
                                  values.state
                                    ? undefined
                                    : () => (
                                        <SelectPlaceholder>
                                          Select State
                                        </SelectPlaceholder>
                                      )
                                }
                                onChange={handleonChange("state")}
                                // value={values.state}
                                defaultValue={hospitalDetailsData?.state}
                                error={errSelect && values.state === ""}
                                input={<BootstrapInput />}
                                inputProps={{
                                  classes: {
                                    icon: classes.icon,
                                  },
                                }}
                              >
                                <MenuItem value="" disabled>
                                  <span style={{ color: "#B8BCCA" }}> Select State</span>
                                </MenuItem>
                                {allState.map((state) => (
                                  <MenuItem key={state?.state} value={state?.state}>
                                    {state?.state}
                                  </MenuItem>
                                ))}
                              </Select>
                              {!values.state && (
                                <FormHelperText sx={{ color: "red", mb: 1 }}>
                                  {errSelect}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Box>
                          <InputLabel
                            sx={{
                              color: "#6F7482",
                              fontSize: "0.8rem",
                            }}
                            htmlFor="PIN"
                          >
                            PIN Code&nbsp;
                            <Typography
                              variant="caption"
                              color="red"
                              sx={{ fontSize: "16px" }}
                            >
                              *
                            </Typography>
                          </InputLabel>
                          <TextField
                            onChange={handleonChange("pinCode")}
                            // value={values.pinCode}
                            defaultValue={hospitalDetailsData?.pincode}
                            error={error && values.pinCode === ""}
                            placeholder="Enter pin code"
                            id="PIN"
                            size="small"
                            // type="text"
                            fullWidth
                            variant="outlined"
                            disableUnderline
                            sx={{
                              color: "var(--clr-blue-footer)",
                              bgcolor: "#FFFFFF",
                              borderRadius: "4px",
                            }}
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
                            inputProps={{ maxLength: 6 }}
                            onInput={(e) => onlyNumbers(e)}
                          />
                          {!values?.pinCode && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {error}
                            </FormHelperText>
                          )}
                          {((values?.pinCode) && (values?.pinCode?.length !== 6)) && (
                            <FormHelperText
                              sx={{
                                color: "red",
                                mb: 0,
                                textAlign: "left",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                              }}
                            >
                              {validPinNumErr}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <InputLabel
                          sx={{
                            color: "#6F7482",
                            fontSize: "0.8rem",
                          }}
                          htmlFor="City"
                        >
                          City&nbsp;
                          <Typography
                            variant="caption"
                            color="red"
                            sx={{ fontSize: "16px" }}
                          >
                            *
                          </Typography>
                        </InputLabel>
                        {/* {console.log("hospital Data: ", hospitalDetailsData, allCityLocation)} */}
                        <ThemeProvider theme={ItisThim}> 
                          <Autocomplete
                              defaultValue={hospitalDetailsData?.lmID ? {city: hospitalDetailsData?.city, lmID: hospitalDetailsData?.locationID} : {city: "", lmID: ""} }
                              disablePortal
                              id="combo-box-demo"
                              sx={{
                                "& .MuiAutocomplete-inputRoot":{
                                  padding: '3px 0px 3px 7px',
                                  border: "0.1px solid var(--clr-blue-light) !important",
                                }
                              }}
                              onChange={(event, newValue) => {
                                // console.log(newValue)
                                setValues({...values, city: newValue?.city, location: newValue})
                              }}

                              // onKeyDown={handleAddPersonalDetails}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  // Prevent's default 'Enter' behavior.
                                  event.defaultMuiPrevented = true;
                                  // your handler code
                                }
                              }}

                              disabled={values?.state ? false : true}
                              options={allCityLocation}
                              getOptionLabel={(option) => option?.city}
                              renderInput={(params) => <TextField
                                onChange={(e) => {
                                  SearchPresentCity(e)
                              }}
                              placeholder="Select Location"
                              {...params} />}
                            />
                            {((!values.state) && (
                                <FormHelperText sx={{ color: "gray", mb: 1 }}> 
                                  You have to select State first.
                                </FormHelperText>
                              ))} 
                             {((values.state) &&(!values.location)) && (
                                <FormHelperText sx={{ color: "red", mb: 1 }}> 
                                  {errSelect}
                                </FormHelperText>
                              )} 
                        </ThemeProvider>
                       

                      </Grid>
                     
                      <Grid item xs={12} sm={12} md={6}>
                        <Box>
                          <InputLabel
                            sx={{
                              color: "#6F7482",
                              fontSize: "0.8rem",
                            }}
                            htmlFor="GSTIN"
                          >
                            GSTIN&nbsp;
                          </InputLabel>
                          <TextField
                            onChange={handleonChange("gstin")}
                            // value={values.gstin}
                            defaultValue={hospitalDetailsData?.gstin}
                            // error={error && values.gstin}
                            inputProps={{ maxLength: 15 }}
                            id="GSTIN"
                            size="small"
                            type="text"
                            fullWidth
                            variant="outlined"
                            disableUnderline
                            sx={{
                              color: "var(--clr-blue-footer)",
                              bgcolor: "#FFFFFF",
                              borderRadius: "4px",
                            }}
                            placeholder="Enter GSTIN number"
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

                          {/* {((values.gstin !== "") &&
                            (gstRegex.test(values.gstin) === false)) && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}> 
                                {error}
                              </FormHelperText>
                            )} */}
                        </Box>
                      </Grid>
                    </Grid>
                  ) : (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Box
                sx={{
                  border: "1px solid #5A98F2",
                  borderRadius: 2,
                  boxShadow: matches ? "0px 0px 0px 0px" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "#E4EEF5",
                    px: 4,
                    py: 2,
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }}
                >
                  <Typography
                    sx={{ color: "#395987", fontWeight: "600" }}
                    variant="body1"
                  >
                    Review
                  </Typography>
                </Box>
                <Grid container spacing={18}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 3,
                        px: matches ? 1.25 : 3,
                      }}
                    >
                      <Typography
                        component="div"
                        sx={{
                          color: "#395987",
                          fontWeight: "600",
                          fontSize: matches ? "16px" : "21px",
                        }}
                      >
                        {location?.state?.name}
                      </Typography>
                      <Typography
                        component="div"
                        sx={{
                          color: "#395987",
                          fontWeight: "600",
                          fontSize: matches ? "16px" : "22px",
                        }}
                      >
                        {location?.state?.price.toLocaleString("en-IN")} INR
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 2,
                        pb: 3,
                        px: 3,
                      }}
                    >
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{
                          color: "#828282",
                          fontSize: "12px",
                          fontWeight: "400",
                        }}
                      >
                        Quantity
                      </Typography>
                      <Box>
                        <FormControl fullWidth sx={{ minWidth: 70 }} size="small">
                          <Select
                            sx={{
                              m: 0,
                              p: "3px 6px 3px 12px",
                              bgcolor: "#E4EEF5",
                              color: "#395987",
                              borderRadius: "4px",
                            }}
                            size="small"
                            displayEmpty
                            onChange={handleonChange("quantity")}
                            defaultValue={location?.state?.quantity}
                            // value={values.quantity}
                            error={errSelect}
                            input={<BootstrapInput />}
                            inputProps={{
                              classes: {
                                icon: classes.icon,
                              },
                            }}
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                          >
                            <MenuItem value="" disabled>
                              Select
                            </MenuItem>
                            {menuQuantitys.map((menuQuantity) => (
                              <MenuItem value={menuQuantity}>
                                {menuQuantity}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>
                    {values.quantity === 0 && (
                      <FormHelperText
                        sx={{ color: "red", ml: "25px", mt: "-21px" }}
                      >
                        {errSelect}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        px: 3,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{
                          color: "#828282",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        Price (
                        {values.quantity
                          ? values.quantity
                          : location.state.quantity}{" "}
                        item)
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{
                          color: "#211F1F",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        {newPrice.toLocaleString("en-IN")} INR
                      </Typography>
                    </Box>
                    <Divider sx={{ background: "#E4EEF5" }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        px: 3,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{
                          color: "#828282",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        Additional Charge
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{
                          color: "#211F1F",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        {AdditionalCharge.toLocaleString("en-IN")} INR
                      </Typography>
                    </Box>
                    <Divider sx={{ background: "#E4EEF5" }} />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        px: 3,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                          color: "##211F1F",
                          fontWeight: "600",
                          fontSize: "16px",
                        }}
                      >
                        Amount Payable
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{
                          color: "#211F1F",
                          fontWeight: "600",
                          fontSize: "16px",
                        }}
                      >
                        {totalPrice.toLocaleString("en-IN")} INR
                      </Typography>
                    </Box>
                    <Divider sx={{ background: "#E4EEF5" }} />
                    <Box sx={{ px: matches ? 1.25 : 6, pt: 4, pb: 3 }}>
                      {isLoadingPaytm ? (
                        <Button
                          onClick={handleCheckoutSubmit}
                          sx={{
                            mx: "auto",
                            borderRadius: "24px",
                            height: "48px",
                            fontWeight: "600",
                          }}
                          fullWidth
                          variant="contained"
                        >
                          <CircularProgress
                            size="2rem"
                            thickness={6}
                            sx={{ color: "white" }}
                          />
                        </Button>
                      ) : (
                        <>
                          {transactionSuccess || transactionFailure || (
                            <>
                              {transactionStopped ? (
                                <Button
                                  sx={{
                                    mx: "auto",
                                    borderRadius: "24px",
                                    height: "48px",
                                    fontWeight: "600",
                                    cursor: "auto",
                                  }}
                                  fullWidth
                                // variant="contained"
                                >
                                  <div
                                    style={{ height: "180px", width: "180px" }}
                                    className="container"
                                    ref={paymentCancelled}
                                  ></div>
                                </Button>
                              ) : (
                                <Button
                                  onClick={handleCheckoutSubmit}
                                  sx={{
                                    mx: "auto",
                                    borderRadius: "24px",
                                    height: "48px",
                                    fontWeight: "600",
                                  }}
                                  fullWidth
                                  variant="contained"
                                >
                                  Pay now
                                </Button>
                              )}
                            </>
                          )}
                        </>
                      )}

                      {transactionSuccess && (
                        <Button
                          sx={{
                            mx: "auto",
                            borderRadius: "24px",
                            height: "48px",
                            fontWeight: "600",
                            cursor: "auto",
                          }}
                          fullWidth
                        // variant="contained"
                        >
                          <div
                            style={{ height: "180px", width: "180px" }}
                            className="container"
                            ref={paymentSuccess}
                          ></div>
                        </Button>
                      )}

                      {transactionFailure && (
                        <Button
                          sx={{
                            mx: "auto",
                            borderRadius: "24px",
                            height: "48px",
                            fontWeight: "600",
                            cursor: "auto",
                          }}
                          fullWidth
                        // variant="contained"
                        >
                          <div
                            style={{ maxHeight: "50px", maxWidth: "50px" }}
                            className="container"
                            ref={paymentFailure}
                          ></div>
                        </Button>
                      )}

                      {transactionSuccess && (
                        <Snackbar
                          open={openSnackbar}
                          autoHideDuration={6000}
                          onClose={handleCloseSnackbar}
                        >
                          <Alert
                            onClose={handleCloseSnackbar}
                            severity="success"
                            sx={{ width: "100%" }}
                          >
                            Payment successful.
                          </Alert>
                        </Snackbar>
                      )}

                      {transactionFailure && (
                        <Snackbar
                          open={openSnackbar}
                          autoHideDuration={6000}
                          onClose={handleCloseSnackbar}
                        >
                          <Alert
                            onClose={handleCloseSnackbar}
                            severity="error"
                            sx={{ width: "100%" }}
                          >
                            Sorry! Payment didn't went through. Please try again.
                          </Alert>
                        </Snackbar>
                      )}

                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

          </Grid>
        </Box>
        
      </Container>
    </>
  );
};

export default Checkout;
