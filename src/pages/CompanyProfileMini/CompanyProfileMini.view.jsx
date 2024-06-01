import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import EditIcon from "@mui/icons-material/Edit";
// import { gqlquery, QUERY_HOSPITALDETAILS } from "../../api";
import { gqlquery, QUERY_HOSPITALDETAILS } from "../../api/hospitalIndex";

const accountDetails = {
    username: "shrinidhi@mimothi.com",
    email: "shrinidhi@mimothi.com",
    role: "Recruiter",
    reportManager: "Shrinidhi",
    number: "+91-9844639898 ",
    companyName: "Mimothi Solutions",
};

const companyDetails = {
    companyType: "shrinidhi@mimothi.com",
    indrustyType: "shrinidhi@mimothi.com",
    contactPerson: "Recruiter",
    alias: "Shrinidhi",
    designation: "Manager",
    websiteURL: "https://websitename.com",
    vacancies: "",
    classFields: "",
    alias2: "",
    number1: "+91-9844639898",
    number2: "+91-9844639898 ",
    faxNumber: "",
    tanNumber: "",
};

const kycDetails = {
    kyc: "approved",
    panNumber: "AANCM8069M",
    namePanCard: "Company solutions pvt. ltd.",
    datePanCard: "12/12/2019",
    addressLevel: "2A, Jupiter, Basaveshwar Nagar, Gokul Road, Bengaluru",
    country: "INDIA",
    state: "KARNATAKA",
    city: "Bangalore",
    pinCode: "560017",
    gstIn: "29AANCM8069M1ZF",
};

const CompanyProfileMini = () => {
    const { username, email, role, reportManager, number, companyName } =
        accountDetails;
    const {
        companyType,
        indrustyType,
        contactPerson,
        alias,
        designation,
        websiteURL,
        vacancies,
        classFields,
        alias2,
        number1,
        number2,
        faxNumber,
        tanNumber,
    } = companyDetails;
    const {
        kyc,
        panNumber,
        namePanCard,
        datePanCard,
        addressLevel,
        country,
        state,
        city,
        pinCode,
        gstIn,
    } = kycDetails;
   const [hospitalDetails , setHospitalDetails] = useState([]);
    
  useEffect(() => {
    gqlquery(QUERY_HOSPITALDETAILS, null)
      .then((res) => res.json())
    //   .then((data) => setHospitalDetails(data?.data?.getHospitalDetails));
      .then((data) => setHospitalDetails(data));
  }, []);
  
   console.log("hospitalDetails", hospitalDetails);

    return (
        <Box sx={{ mx: "auto", mb: 4 }} maxWidth="sm">
            <Box
                sx={{
                    bgcolor: "#E0E0E0",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                    py: 2,
                    pl: 1,
                }}
            >
                <Button
                    variant="text"
                    sx={{
                        color: "#323232",
                    }}
                >
                    <ArrowBackIosNewRoundedIcon fontSize="medium" />
                </Button>
                <Typography
                    sx={{
                        color: "#000000",
                        fontSize: "16px",
                        fontWeight: "600",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    {companyName}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    px: 2,
                    pt: 2,
                    pb: 4,
                }}
            >
                <Card
                    sx={{
                        bgcolor: "#F2F2F2",
                        borderRadius: 2,
                        p: 1.5,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pr: 1,
                            py: 1,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#333333",
                                fontWeight: "700",
                                fontSize: "18px",
                            }}
                            component="div"
                        >
                            Account Details
                        </Typography>
                        <EditIcon fontSize="small" sx={{ color: "#828282" }} />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Username:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {username}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Email for Communication:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {email}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Role:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {role}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Reporting Manager:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {reportManager}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Mobile Number:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {number}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
                <Card
                    sx={{
                        bgcolor: "#F2F2F2",
                        borderRadius: 2,
                        p: 1.5,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pr: 1,
                            py: 1,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#333333",
                                fontWeight: "700",
                                fontSize: "18px",
                            }}
                            component="div"
                        >
                            Company Details
                        </Typography>
                        <EditIcon fontSize="small" sx={{ color: "#828282" }} />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Company Type:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {companyType}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Industry Type:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {indrustyType}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Contact Person:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {contactPerson}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Alias:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {alias}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Designation:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {designation}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Website URL:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {websiteURL}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Profile for HOT vacancies:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {vacancies}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Profile for Classfields
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {classFields}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Alias:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {alias2}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Number 1:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {number1}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Number 2:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {number2}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Fax Number:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {faxNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    TAN Number:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {tanNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
                <Card
                    sx={{
                        bgcolor: "#F2F2F2",
                        borderRadius: 2,
                        p: 1.5,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pr: 1,
                            py: 1,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#333333",
                                fontWeight: "700",
                                fontSize: "18px",
                            }}
                            component="div"
                        >
                            KYC Compliance Details
                        </Typography>
                        <EditIcon fontSize="small" sx={{ color: "#828282" }} />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    KYC Status:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {kyc}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    PAN Number:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {panNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Name On PAN Card:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {namePanCard}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Date On PAN Card:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {datePanCard}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Address Label:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {addressLevel}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    Country:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {country}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    State:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {state}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    City:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {city}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    PIN Code:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {pinCode}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={5}>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{
                                        fontSize: "12px",
                                        color: "#4F4F4F",
                                    }}
                                >
                                    GSTIN:
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#4F4F4F" }}
                                >
                                    {gstIn}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
};

export default CompanyProfileMini;
