import React, { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    Button,
    Checkbox,
    FormHelperText,
    Box,
    InputLabel,
    // Input,
    TextField,
    useMediaQuery,
    useTheme,
    Snackbar,
    Autocomplete,
} from "@mui/material";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import { gqlquery, /* QUERY_GETHOSPITAL */ } from "../../api/hospitalIndex.js";
// import GooglePlacesAutocomplete, { geocodeByPlaceId, } from "react-google-places-autocomplete";
// import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
// import useAuth from "../../hooks/useAuth.js";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from '@mui/material/Alert';
import { gqlOpenQuery } from "../../api/index";


const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root1: {
      [`& fieldset`]: {
            borderRadius: "4px 0px 0px 4px",
      },
   },
    root: {
      [`& fieldset`]: {
            borderRadius: "0px 4px 4px 0px",
      },
   },
  }));

const RegisterHospital = () => {
    const classes = useStyles();
    const [allCityLocation, setAllCityLocation] = useState([]);

    // const [address, setAddress] = useState();
    // const [addressObj, setAddressObj] = useState();
    const { pathname } = useLocation();
    const [address, setAddress] = useState();
    const [addressObj, setAddressObj] = useState();
    const [form, setForm] = useState({ 
        hospitalName: "",
        hospitalShortName: "",
        location: "",
        hospitalType: "",
        primaryName: "",
        primaryContact: "",
        primaryEmail: "",
        gstin: "",
        promotionoalCommunication: false,
        termsAndPolicy: false, 
    });
    const [inputErr, setInputErr] = useState("");
    const [cityNameErr, setcCityNameErr] = useState("");
    const [phoneNumErr, setPhoneNumErr] = useState("");
    const [termsError, setTermsError] = useState("");
    const [validPhoneNumErr, setValidPhoneNumErr] = useState("");
    const [validErr, setValidErr] = useState("");
    const [validGstin, setValidGstin] = useState("");
    // const [latlng, setLatlng] = useState({});
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const access_token = sessionStorage.getItem("accessToken");
    document.title = "Recruiter Register | MedLink Jobs";

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

    const getUserEmail = async () => {
        const res = await provider.getUser({ AccessToken: access_token });
        setUserEmail(res?.UserAttributes[2]?.Value);
    };

    useEffect(() => {
        if (!userEmail) {
            getUserEmail();
        }
    }, []);

    const { promotionoalCommunication, termsAndPolicy } = form;
    const formValueChange = (e) => {
        setForm((_form) => {
            let __form = { ..._form };
            __form[e.target.name] = e.target.value;
            return __form;
        });
    };

    const handleChangeCheckbox = (e) => {
        // console.log("74", e);
        setForm({
            ...form,
            [e.target.name]: e.target.checked,
        });
    };

   /*  const getAddressObject = (address_components) => {
        // console.log(address_components);
        const ShouldBeComponent = {
            street_number: ["street_number"],
            postal_code: ["postal_code"],
            street: ["street_address", "route"],
            province: ["administrative_area_level_1"],
            city: ["locality"],
            country: ["country"],
        };

        let address = {
            street_number: "",
            postal_code: "",
            street: "",
            province: "",
            city: "",
            country: "",
        };

        address_components.forEach((component) => {
            for (var shouldBe in ShouldBeComponent) {
                if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                    if (shouldBe === "country") {
                        address[shouldBe] = component.short_name;
                    } else {
                        address[shouldBe] = component.long_name;
                    }
                }
            }
        });

        // Fix the shape to match our schema
        address.address = address.street_number + " " + address.street;
        delete address.street_number;
        delete address.street;
        if (address.country === "US") {
            address.state = address.province;
            delete address.province;
        }
        return address;
    }; */

 /*    useEffect(() => {
        const func = async () => {
            const geocodeObj =
                address &&
                address.value &&
                (await geocodeByPlaceId(address.value.place_id));
            const addressObject =
                geocodeObj && getAddressObject(geocodeObj[0].address_components);
            // console.log("addressObject", addressObject);
            setAddressObj(addressObject);
            geocodeByAddress(address?.label)
                .then((results) => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                    setLatlng({ lat, lng });
                });
        };
        func();
    }, [address]); */


    // let resText = /^[a-zA-Z]+$/;
    let resText = /^[a-zA-Z ]*$/;
    form.hospitalType = form.hospitalType.replace(/  +/g, ' ');
    form.primaryName = form.primaryName.replace(/  +/g, ' ');
    let gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const onlyNumbers = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
    };

    const handlRegisterHospital = (event, from) => {
        if (event.key === "Enter" || from === "onClick") {

            if (
                (form.location === "" || form.location === " ") ||
                form.hospitalType === "" ||
                form.hospitalType === " " ||
                (resText.test(form.hospitalType)) === false ||
                form.primaryName === "" ||
                form.primaryName === " " ||
                (resText.test(form.primaryName)) === false ||
                form.primaryContact === "" ||
                form.primaryContact.length !== 10 ||
                form.termsAndPolicy === false ||
                ((form.gstin !== "") && ((gstRegex.test(form.gstin)) === false))
            ) {
                setInputErr("This field can't be empty.");
                setPhoneNumErr("Phone Number field can't be empty.");
                setValidPhoneNumErr("Invalid phone number.");
                setcCityNameErr("Location field can't be empty.");
                setTermsError("You have to must selected terms and condition.");
                setValidErr("This field accept only Alphabets.");
                setValidGstin("Invalid GST Identification Number.");
                return;
            }
            
            const QUERY_SIGNUPHOSPITAL = {
                query: `mutation MyMutation {
                    addHospital(
                        contactEmail: "${userEmail}", 
                        contactName: "${form.primaryName}", 
                        contactPhone: "${Number(form.primaryContact)}",  
                        locationID: ${form.location?.lmID},  
                        newsletter: ${Boolean(form.promotionoalCommunication)}, 
                        taxNumber: "${form.gstin}", 
                        type: "${form.hospitalType}",
                        name: "", 
                        description: ""
                    )
                  }`,
                variables: null,
                operationName: "MyMutation",
            }; 

            gqlquery(QUERY_SIGNUPHOSPITAL, null)
                .then((res) => res.json())
                .then((datas) => {
                    //    setHospitalData(!updateList) 
                    if (datas?.data?.addHospital) {
                        setOpen(true);
                        setTimeout(() => {
                            navigate("/hospital-dashboard", { state: { contactName: form.primaryName } });
                        }, 500);
                    }
                })
                .finally((e) => console.log("adding hospital details to database"));
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    };
    useEffect(()=> {
        const GET_CITY = {
          query: `query MyQuery {
            getCityMaster {
              city
              cityWithState
              country
              lmID
              state
            }
          }
        `,
          variables: null,
          operationName: "MyQuery",
        };
        gqlOpenQuery(GET_CITY, null)
        .then((res) => res.json())
        .then((datas) => {  
          setAllCityLocation(datas?.data?.getCityMaster) 
        }); 
      }, [])

    const SearchLocation = (event) => {
        const val = event.target.value.split(" ").length - 1;
        const valtwo = event.target.value.length - val
     
        if(event.target.value && event.target.value !== " " && event.target.value !== "" && valtwo >= 2){
    
          const GET_CITY= {
            query: `query MyQuery {
              searchCity(city: "${event.target.value}") {
                city
                cityWithState
                country
                lmID
                state
              }
            }
          `,
            variables: null,
            operationName: "MyQuery",
          };
          
          gqlOpenQuery(GET_CITY, null)
          .then((res) => res.json())
          .then((datas) => {
            setAllCityLocation([...datas?.data?.searchCity]) 
          });
        }
      };
    
 
    return (
        <>
            {
                access_token === null ? (
                    <Navigate to="/hospital-login" />
                ) : (
                    <Box sx={{backgroundColor: !matches ? "#F0F6FE" : "#FFFFFF"}}>
                     {
                        matches &&
                        <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
                        <ArrowBackIcon sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Register</Typography>
                        </Box>
                      }
                        <Box maxWidth="xl" sx={{ backgroundColor:  !matches ? "#F0F6FE" : "#FFFFFF", mx: "auto", padding:  !matches ? "1rem 3rem 3rem" : "0rem 0rem", mr: matches ? 1.5 : 3  }}>
                            <Grid container spacing={!matches ? 8 : 0}>
                                <Grid item  xs={12} md={4}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            backgroundColor: "var(--clr-white)",
                                            boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                                            py: 2.5,
                                            px: matches ? "26px" : 5,
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            sx={{ fontSize: !matches ? "24px" : "18px", fontWeight: "600", color: "var(--clr-blue-footer)", textAlign: !matches ? "center" : "start", ml: !matches ? "" : "-10px", mb: !matches ? 4 : 2.5 }}
                                        >
                                            Register Your Company
                                        </Typography>
                                        <Grid container justifyContent="center" rowSpacing={2}>
                                            <Grid item xs={12}>
                                                <Box style={{ width: "100%" }}>
                                                    <InputLabel sx={{ py: 0.5 }}>Location <span style={{ color: "red" }}> *</span></InputLabel>
                                                    <Autocomplete
                                                        disablePortal
                                                        noOptionsText={'Start typing'}
                                                        id="combo-box-demo"
                                                        sx={{
                                                        "& .MuiAutocomplete-inputRoot": {
                                                            padding: "4px 10px  !important",
                                                            borderRadius: "4px",
                                                            // border: "1px solid #E4EEF5 !important", 
                                                            width: "100%", 
                                                            backgroundColor: "white",
                                                        },
                                                        }}
                                                        onChange={(event, newValue) => {
                                                        setForm({ ...form, location: newValue }); 
                                                        }}
                                                        filterSelectedOptions
                                                        options={allCityLocation || []}
                                                        getOptionLabel={(option) => option?.cityWithState}
                                                        renderInput={(params) => (
                                                        <TextField
                                                            onChange={(e) => {
                                                            SearchLocation(e);
                                                            }}
                                                            placeholder="Select Location"
                                                            {...params}
                                                        />
                                                        )}
                                                    />
                                                    {(form.location ===
                                                        "" || form.location === " ") && (
                                                            <FormHelperText
                                                                sx={{
                                                                    color: "red",
                                                                    mb: 0,
                                                                    textAlign: "left",
                                                                    alignItems: "flex-start",
                                                                    justifyContent: "flex-start",
                                                                }}
                                                            >
                                                                {cityNameErr}
                                                            </FormHelperText>
                                                        )}
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box>
                                                    <InputLabel sx={{ py: 0.5 }}>Company Type <span style={{ color: "red" }}> *</span></InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        disableUnderline
                                                        variant="outlined"
                                                        name="hospitalType"
                                                        type="text"
                                                        placeholder="Enter Company Type"
                                                        value={form.hospitalType}
                                                        error={form.hospitalType === "" && inputErr}
                                                        onChange={formValueChange}
                                                        onKeyDown={handlRegisterHospital}
                                                        sx={{ borderRadius: 1 }}
                                                        InputProps={{
                                                        sx: {
                                                            ".MuiOutlinedInput-input": { 
                                                            padding: '12.5px 14px',
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
                                                    />
                                                    {form.hospitalType === "" && (
                                                        <FormHelperText
                                                            sx={{
                                                                color: "red",
                                                                mb: 0,
                                                                textAlign: "left",
                                                                alignItems: "flex-start",
                                                                justifyContent: "flex-start",
                                                            }}
                                                        >
                                                            {inputErr}
                                                        </FormHelperText>
                                                    )}
                                                    {((form.hospitalType !== "") && ((form.hospitalType === " ") || ((resText.test(form.hospitalType)) === false))) && (
                                                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                            {validErr}
                                                        </FormHelperText>
                                                    )}
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box>
                                                    <InputLabel sx={{ py: 0.5 }}>Company Name<span style={{ color: "red" }}> *</span></InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        disableUnderline
                                                        variant="outlined"
                                                        name="primaryName"
                                                        type="text"
                                                        placeholder="Enter Company Name"
                                                        value={form.primaryName}
                                                        error={form.primaryName === "" && inputErr}
                                                        onChange={formValueChange}
                                                        onKeyDown={handlRegisterHospital}
                                                        sx={{ borderRadius: 1 }}
                                                        InputProps={{
                                                        sx: {
                                                            ".MuiOutlinedInput-input": { 
                                                            padding: '12.5px 14px',
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
                                                    />
                                                    {form.primaryName === "" && (
                                                        <FormHelperText
                                                            sx={{
                                                                color: "red",
                                                                mb: 0,
                                                                textAlign: "left",
                                                                alignItems: "flex-start",
                                                                justifyContent: "flex-start",
                                                            }}
                                                        >
                                                            {inputErr}
                                                        </FormHelperText>
                                                    )}
                                                    {((form.primaryName !== "") && ((form.primaryName === " ") || ((resText.test(form.primaryName)) === false))) && (
                                                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                            {validErr}
                                                        </FormHelperText>
                                                    )}
                                                </Box>
                                            </Grid>
                                            
                                            <Grid item xs={12}>
                                                <Box>
                                                    <InputLabel sx={{ py: 0.5 }}>Contact Number <span style={{ color: "red" }}> *</span></InputLabel>
                                                    <Grid container>
                                                        <Grid item xs={2} md={2}>
                                                            <TextField
                                                                variant="outlined"
                                                                defaultValue="+91"
                                                                className={classes.root1}
                                                                disabled
                                                                disableUnderline
                                                                sx={{
                                                                    color: "var(--clr-blue-footer)",
                                                                }}
                                                                InputProps={{
                                                                    sx: {
                                                                        ".MuiOutlinedInput-input": {
                                                                            padding: '10.5px 14px',
                                                                        },
                                                                        /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                                                            border: "1px solid var(--clr-blue-light)",
                                                                            // borderRadius: "4px 0px 0px 4px",
                                                                        }, */
                                                                        "&:hover": {
                                                                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                                                                border: "1px solid black",
                                                                                // borderRadius: "4px 0px 0px 4px",
                                                                            },
                                                                        },
                                                                    }
                                                                }}
                                                                size="small"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={10} md={10}>
                                                            <TextField
                                                                sx={{
                                                                    color: "var(--clr-blue-footer)",
                                                                    // fontSize: "14px"
                                                                }}
                                                                className={classes.root}
                                                                InputProps={{
                                                                    sx: {
                                                                        ".MuiOutlinedInput-input": {
                                                                            padding: '10.5px 14px',
                                                                        },
                                                                        /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                                                            border: "1px solid var(--clr-blue-light)",
                                                                            // borderRadius: "0px 4px 4px 0px",
                                                                        },
                                                                        "&:hover": {
                                                                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                                                                border: "1px solid var(--clr-blue-primary)",
                                                                                // borderRadius: "0px 4px 4px 0px",
                                                                            },
                                                                        }, */
                                                                    }
                                                                }}
                                                                size="small"
                                                                disableUnderline
                                                                fullWidth
                                                                name="primaryContact"
                                                                error={form.primaryContact === "" && phoneNumErr}
                                                                type="text"
                                                                placeholder="Enter Company Number" 
                                                                inputProps={{ maxLength: 10 }}
                                                                value={form.primaryContact}
                                                                onChange={formValueChange}
                                                                onKeyDown={handlRegisterHospital}
                                                                onInput={(e) => onlyNumbers(e)}
                                                            />
                                                        </Grid>
                                                    </Grid>

                                                    {(form.primaryContact === "") && (
                                                        <FormHelperText
                                                            sx={{
                                                                color: "red",
                                                                mb: 0,
                                                                textAlign: "left",
                                                                alignItems: "flex-start",
                                                                justifyContent: "flex-start",
                                                            }}
                                                        >
                                                            {phoneNumErr}
                                                        </FormHelperText>
                                                    )}
                                                    {((form.primaryContact !== "") && (form.primaryContact.length !== 10)) && (
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
                                                        </FormHelperText>
                                                    )}
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box>
                                                    <InputLabel sx={{ py: 0.5 }}>GSTIN</InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        disableUnderline
                                                        variant="outlined"
                                                        name="gstin"
                                                        type="text"
                                                        placeholder="GSTIN"
                                                        value={form.gstin}
                                                        error={((form.gstin !== "") && ((gstRegex.test(form.gstin)) === false)) && inputErr}
                                                        onChange={formValueChange}
                                                        onKeyDown={handlRegisterHospital}
                                                        sx={{ borderRadius: 1 }}
                                                        inputProps={{ maxLength: 15 }}
                                                        InputProps={{
                                                        sx: {
                                                            ".MuiOutlinedInput-input": { 
                                                            padding: '12.5px 14px',
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
                                                    /> 
                                                    {((form.gstin !== "") && ((gstRegex.test(form.gstin)) === false)) && (
                                                        <FormHelperText sx={{ color: "red", mb: 1 }}>
                                                            {validGstin}
                                                        </FormHelperText>
                                                    )}
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        gap: 0.5,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Checkbox
                                                        sx={{
                                                            ml: -1,
                                                            color: "#C7D3E3",
                                                            "&.Mui-checked": {
                                                                color: "var(--clr-blue-primary)",
                                                            },
                                                        }}
                                                        name="promotionoalCommunication"
                                                        checked={promotionoalCommunication}
                                                        color="default"
                                                        onChange={(e) => handleChangeCheckbox(e)}
                                                    />
                                                    &nbsp;
                                                    <Typography
                                                        variant="caption"
                                                        sx={{ fontWeight: 600, color: "var(--clr-gray-2)" }}
                                                    >
                                                        Subscribe to our newsletter
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        gap: 2,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Checkbox
                                                        sx={{
                                                            ml: -1,
                                                            color: "#C7D3E3",
                                                            "&.Mui-checked": {
                                                                color: "var(--clr-blue-primary)",
                                                            },
                                                        }}
                                                        name="termsAndPolicy"
                                                        checked={termsAndPolicy}
                                                        color="default"
                                                        onChange={(e) => handleChangeCheckbox(e)}
                                                        onKeyDown={handlRegisterHospital}
                                                    />
                                                    <Typography
                                                        variant="caption"
                                                        sx={{ fontWeight: 600, color: "var(--clr-gray-2)" }}
                                                    >
                                                        I agree to&nbsp;
                                                        <Link
                                                            style={{ color: "var(--clr-blue-primary)" }}
                                                            to="/terms-and-conditions"
                                                            target="_blank"
                                                        >
                                                            Terms & Conditions
                                                        </Link>{" "}
                                                        and&nbsp;
                                                        <Link
                                                            style={{ color: "var(--clr-blue-primary)" }}
                                                            to="/privacy-policy"
                                                            target="_blank"
                                                        >
                                                            Privacy Policy
                                                        </Link>
                                                    </Typography>
                                                </Box>
                                                {(form.termsAndPolicy === false) && (
                                                    <FormHelperText
                                                        sx={{
                                                            color: "red",
                                                            mb: 0,
                                                            textAlign: "left",
                                                            alignItems: "flex-start",
                                                            justifyContent: "flex-start",
                                                        }}
                                                    >
                                                        {termsError}
                                                    </FormHelperText>
                                                )}
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <Button
                                                    fullWidth
                                                    size="large"
                                                    variant="contained"
                                                    onClick={(event) => handlRegisterHospital(event, "onClick")}
                                                    sx={{ my: 2, borderRadius: 16, py: 1.5 }}
                                                >
                                                    Register
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
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
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item  xs={12} md={8}>
                                    <Box sx={{padding: !matches ? "12px 0px 12px 0px" : "20px 10px 30px 18px" }}>
                                        <Grid
                                            container
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                            rowSpacing={matches ?3: 4}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "flex-start",
                                                    backgroundColor: "var(--clr-white)",
                                                    borderRadius: 2,
                                                    boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                                                    border: matches ? "1px solid #E4EEF5" : "",
                                                    px: matches ? 1.25 : 3,
                                                    py: matches ? 1.25 : 2
                                                }}>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: "var(--clr-blue-footer)",
                                                            fontSize: matches ? "18px" : "24px"
                                                        }}
                                                    >
                                                        Job Posting
                                                    </Typography>
                                                    <Typography
                                                        sx={{ py: 2.5, color: "var(--clr-gray-2)", fontSize : !matches ? "16px" : "14px", fontWeight: "400" }}
                                                    >
                                                        Register with MedLink and post new job requirements. List your hospital or healthcare organization's requirements for the job, the skills and qualifications required, and the description of the organization's hires. With MedLink, you will have access to choose among a wide range of job aspirants.
                                                    </Typography>
                                                    <Box>
                                                        <Button
                                                            variant="outlined"
                                                            sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                                                        >
                                                            Know More
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "flex-start",
                                                    backgroundColor: "var(--clr-white)",
                                                    boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                                                    border: matches ? "1px solid #E4EEF5" : "",
                                                    borderRadius: 2,
                                                    px: matches ? 1.25 : 3,
                                                    py: matches ? 1.25 : 2
                                                }}>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: "var(--clr-blue-footer)",
                                                            fontSize: matches ? "18px" : "24px"
                                                        }}
                                                    >
                                                        Jobseeker Resume Access (JRA)
                                                    </Typography>
                                                    <Typography
                                                        sx={{ py: 2.5, color: "var(--clr-gray-2)", fontSize : !matches ? "16px" : "14px", fontWeight: "400" }}
                                                    >
                                                        We welcome the HR Teams of hospitals and healthcare organizations to join hands in building a solid network of doctors and recruiters to strengthen India's healthcare community. Subscribe with us to surf our website and mobile applications for the profiles of talented doctors, advanced practitioners, physicians, Allied Healthcare professionals, Nurses and Midwives.
                                                    </Typography>
                                                    <Box>
                                                        <Button
                                                            variant="outlined"
                                                            sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                                                        >
                                                            Know More
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                            >
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "flex-start",
                                                    backgroundColor: "var(--clr-white)",
                                                    boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
                                                    border: matches ? "1px solid #E4EEF5" : "",
                                                    borderRadius: 2,
                                                    px: matches ? 1.25 : 3,
                                                    py: matches ? 1.25 : 2
                                                }}>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: "var(--clr-blue-footer)",
                                                            fontSize: matches ? "18px" : "24px"
                                                        }}
                                                    >
                                                        Advertisement
                                                    </Typography>
                                                    <Typography
                                                        sx={{ py: 2.5, color: "var(--clr-gray-2)", fontSize : !matches ? "16px" : "14px", fontWeight: "400" }}
                                                    >
                                                        Contact us for more details 
                                                    </Typography>
                                                    <Box>
                                                        <Button
                                                            component={Link}
                                                            to="/contact-us"
                                                            variant="outlined"
                                                            sx={{ borderWidth: "2px !important", borderRadius: 16 }}
                                                        >
                                                            Know More
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                                Successfully registered your details.
                                            </Alert>
                                        </Snackbar>
                        </Box>
                    </Box>
                )
            }
        </>
    );
};

export default RegisterHospital;
