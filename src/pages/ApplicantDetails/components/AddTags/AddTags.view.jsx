import { Box, Card, InputLabel, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import FormControl from '@mui/material/FormControl';
import { gqlquery } from "../../../../api/hospitalIndex";
import CreatableSelect from 'react-select/creatable';
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
// import { ColourOption, colourOptions } from './docs/data'; 

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const statusOptions = [
    { value: 'Available', label: 'Available' },
    { value: 'Busy', label: 'Busy' },
    { value: 'No Response', label: 'No Response' },
];

const interestStatusOptions = [
    { value: 'Interested', label: 'Interested' },
    { value: 'Not Interested', label: 'Not Interested' },
    { value: 'Got Job', label: 'Got Job' },
];

const callStatusOptions = [
    { value: 'Call Later', label: 'Call Later' },
    { value: 'Call Tomorrow', label: 'Call Tomorrow' },
    { value: 'Call Next Week', label: 'Call Next Week' },
];

const customStyles = { 
    control: base => ({
        ...base,
        // width: 200
    }),

};

const AddTags = (props) => {
    const [applicantByID, setApplicantByID] = useState([]);
    const [updateResult, setUpdateResult] = useState(false);
    const [open, setOpen] = useState(false);
    const [statusSnackbarSuccess, setStatusSnackbarSuccess] = useState("");
    const [statusSnackbarFailure, setStatusSnackbarFailure] = useState("");
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
        setStatusSnackbarSuccess("");
        setStatusSnackbarFailure("");
    };

    const handleChangeStatus = (newValue, actionMeta) => {
        if (newValue.value !== "") {
            const QUERY_APPLICANTSTATUS = {
                query: `mutation MyMutation {
                  updateApplicantStatus (
                      jaID: "${props.jaID}", 
                      status: "${newValue.value}"
                     ) 
                  }
                   `,
                variables: null,
                operationName: "MyMutation",
            };
            gqlquery(QUERY_APPLICANTSTATUS, null)
                .then((res) => res.json())
                .then((data) => {
                    // console.log("QUERY_APPLICANTSTATUS", data);
                    if (data?.data?.updateApplicantStatus === "SUCCESS") {
                        setOpen(true);
                        setStatusSnackbarSuccess("Availability status updated.")
                    } else {
                        setOpen(true);
                        setStatusSnackbarFailure("Operation failed. Please try again.")
                    }
                })
            // .finally((e) =>  console.log("Successful 3")); 
        }
        setUpdateResult(pre => !pre); 
    };
    const handleInputChangeStatus = (inputValue, actionMeta) => {
        setUpdateResult(pre => !pre);
    };

    const handleChangeInterest = (newValue, actionMeta) => {
        if (newValue.value !== "") {
            const QUERY_APPLICANTINTERESTEDSTATUS = {
                query: `mutation MyMutation {
                updateApplicantInterestedStatus (
                    jaID: "${props.jaID}", 
                    interested: "${newValue.value}"
                   ) 
                }
                 `,
                variables: null,
                operationName: "MyMutation",
            };
            gqlquery(QUERY_APPLICANTINTERESTEDSTATUS, null)
                .then((res) => res.json())
                .then((data) => { 
                    if (data?.data?.updateApplicantInterestedStatus === "SUCCESS") {
                        setOpen(true);
                        setStatusSnackbarSuccess("Interest status updated.")
                    } else {
                        setOpen(true);
                        setStatusSnackbarFailure("Operation failed. Please try again.")
                    }
                })
            // .finally((e) =>  console.log("Successful 3"));
        }
        setUpdateResult(pre => !pre); 
    };
    const handleInputChangeInterest = (inputValue, actionMeta) => {
        setUpdateResult(pre => !pre);
    };

    const handleChangeCall = (newValue, actionMeta) => {
        if (newValue.value !== "") {
            const QUERY_APPLICANTCALLSTATUS = {
                query: `mutation MyMutation {
                updateApplicantCallStatus (
                    jaID: "${props.jaID}", 
                    callStatus: "${newValue.value}"
                    ) 
                }
                 `,
                variables: null,
                operationName: "MyMutation",
            };
            gqlquery(QUERY_APPLICANTCALLSTATUS, null)
                .then((res) => res.json())
                .then((data) => { 
                    if (data?.data?.updateApplicantCallStatus === "SUCCESS") {
                        setOpen(true);
                        setStatusSnackbarSuccess("Call status updated.")
                    } else {
                        setOpen(true);
                        setStatusSnackbarFailure("Operation failed. Please try again.")
                    }
                })
            // .finally((e) => console.log("Successful 4"));
        }
        setUpdateResult(pre => !pre); 
    };
    const handleInputChangeCall = (inputValue, actionMeta) => {
        setUpdateResult(pre => !pre);
    };

    useEffect(() => {
        const QUERY_GETAPPLICANTBYID = {
            query: `query MyQuery {
                getApplicantByID (jaID: "${props.jaID}") {
                    appliedAt
                    jaID
                    name
                    status
                    interested
                    callStatus
                }
            }`
        };
        gqlquery(QUERY_GETAPPLICANTBYID, null)
            .then((res) => res.json())
            .then((data) => setApplicantByID(data?.data?.getApplicantByID))
        // .finally((e) =>
        //     
        // );
    }, [props.jaID, updateResult]);
    // console.log(props, "getApplicantByID inner one", applicantByID)

    return (
        <Box>

            <Card sx={{ bgcolor: "var(--clr-white)", boxShadow: !matches ? "0px 9px 18px rgba(69, 143, 246, 0.09)" : "0px 0px 0px 0px", px: matches ? 1.875 : 2, py: matches ? 1.25 : 2, border: !matches ? "" : "1px solid #E4EEF5" }}>
                <InputLabel sx={{ py: 0.5 }}>
                    Add Tags for {props?.vacancyTitle}
                </InputLabel>
                <Box sx={{ backgroundColor: "#FFFFFF", display: "flex", gap: 2, py: 1, pl: 2, border: "1px solid #E4EEF5", borderRadius: 1, flexWrap: "wrap" }}>
                    <Box>
                        <FormControl fullWidth sx={{ height: "" }}>
                            <CreatableSelect
                                isClearable
                                onChange={handleChangeStatus}
                                onInputChange={handleInputChangeStatus}
                                options={statusOptions}
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                menuPosition={'absolute'}
                                placeholder={(applicantByID?.status !== "" && applicantByID?.status !== null && applicantByID?.status !== undefined) ? `${applicantByID?.status}` : "Status"}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth sx={{ minWidth: 96 }}>
                            <CreatableSelect
                                isClearable
                                onChange={handleChangeInterest}
                                onInputChange={handleInputChangeInterest}
                                options={interestStatusOptions}
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                menuPosition={'absolute'}
                                placeholder={(applicantByID?.status !== "" && applicantByID?.status !== null && applicantByID?.status !== undefined) ? `${applicantByID?.interested}` : "Interest"}
                            />
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth sx={{ minWidth: 96 }}>
                            <CreatableSelect
                                isClearable
                                onChange={handleChangeCall}
                                onInputChange={handleInputChangeCall}
                                options={callStatusOptions}
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                menuPosition={'absolute'}
                                placeholder={(applicantByID?.status !== "" && applicantByID?.status !== null && applicantByID?.status !== undefined) ? `${applicantByID?.callStatus}` : "Call Status"}
                            />
                        </FormControl>
                    </Box>
                </Box>

                {
                    statusSnackbarSuccess && (
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                                {statusSnackbarSuccess}
                            </Alert>
                        </Snackbar>
                    )
                }
                
                {
                    statusSnackbarFailure && (
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                                {statusSnackbarFailure}
                            </Alert>
                        </Snackbar>
                    )
                }

            </Card>
        </Box>
    );
};

export default AddTags;
