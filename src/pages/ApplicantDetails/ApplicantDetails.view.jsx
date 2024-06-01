import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography,
    FormControl,
    useTheme,
    useMediaQuery,
    Snackbar, 
} from "@mui/material";
import { Link } from "react-router-dom";
import { gqlquery, QUERY_GETHRFOLDER } from "../../api/hospitalIndex";
import Select, { components } from "react-select";
import MuiAlert from '@mui/material/Alert';

const customStyles = {
    control: base => ({
        ...base,
        width: 200
    }),
};

const CustomOption = props => {
    const { data, innerRef, innerProps } = props;
    return data.custom ? (
        <Link to="/personal-folders" style={{ margin: "10px", paddingTop: "10px" }} ref={innerRef} {...innerProps}>
            Create New Folder
        </Link>
    ) : (
        <components.Option {...props} />
    );
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ApplicantDetailsView({ jaID }) {
    const [allFolders, setAllFolders] = useState([]);
    const [currentFolder, setCurrentFolder] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const [open, setOpen] = useState(false)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        gqlquery(QUERY_GETHRFOLDER, null)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                setAllFolders(data?.data?.getFolders)
            })
        // .finally((e) =>
        //   console.log("getFolders outer one", allFolders)
        // );
    }, [updateList])

    useEffect(() => {
        const QUERY_ADDPROFILEFOLDER = {
            query: `query MyQuery { 
                getProfileFolder (jaID: "${jaID}") {
                       folderID  
                    }
                }`,
            variables: null,
            operationName: "MyMutation",
        };
        gqlquery(QUERY_ADDPROFILEFOLDER, null)
            .then((res) => res.json())
            .then((data) => {
                setCurrentFolder(data?.data?.getProfileFolder)
            })
        // .finally((e) => setCreateFolderInput(""));
    }, [])

    const selectedFolder = allFolders?.filter(f => f?.folderID === currentFolder?.folderID)

    let options = allFolders?.map(function (folder) {
        return { value: folder?.folderID, label: folder?.name };
    })

    const totalFolders = [...options, { custom: true }]

    const handleChangeStatus = (newValue, actionMeta) => {
        if (newValue.value !== false && newValue.custom !== true) {
            const QUERY_ADDHRFOLDER = {
                query: `mutation MyMutation { 
                addProfileToFolder (
                        folderID: "${newValue?.value}", 
                        jaID: "${jaID}"
                      )
                    }`,
                variables: null,
                operationName: "MyMutation",
            };
            gqlquery(QUERY_ADDHRFOLDER, null)
                .then((res) => res.json())
                .then((data) => {
                    if (data?.data?.addProfileToFolder === "SUCCESS") {
                        setOpen(true);
                    }
                    // console.log(data?.data?.addProfileToFolder)
                })
        };
    };

    const handleInputChangeStatus = (inputValue, actionMeta) => {

    };

    // SnackBar Close
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Box>
            <Grid justifyContent="space-between" alignItems="center" container spacing={2}>
                {
                    matches &&
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: 3
                            }}
                        >
                            <Box>
                                <FormControl fullWidth sx={{ height: "" }}>
                                    <Select
                                        components={{ Option: CustomOption }}
                                        options={totalFolders}
                                        isClearable
                                        onChange={handleChangeStatus}
                                        onInputChange={handleInputChangeStatus}
                                        styles={customStyles}
                                        menuPortalTarget={document.body}
                                        menuPosition={'absolute'}
                                        placeholder={(selectedFolder[0]?.name !== undefined) ? `${selectedFolder[0]?.name}` : "Add To Folders"}
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                    </Grid>
                }
                <Grid item xs={12} md={6}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "600",
                            color: "var(--clr-blue-footer)",
                            py: "auto",
                            fontSize: matches ? "18px" : "24px"
                        }}
                        gutterBottom
                        component="div"
                    >
                        Applicant's Details
                    </Typography>
                </Grid>
                {
                    !matches &&
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: 3,
                            }}
                        >
                            <Box>
                                <FormControl fullWidth sx={{ height: "" }}>
                                    <Select
                                        components={{ Option: CustomOption }}
                                        options={totalFolders}
                                        isClearable
                                        onChange={handleChangeStatus}
                                        onInputChange={handleInputChangeStatus}
                                        styles={customStyles}
                                        menuPortalTarget={document.body}
                                        menuPosition={'absolute'}
                                        placeholder={(selectedFolder[0]?.name !== undefined) ? `${selectedFolder[0]?.name}` : "Add To Folders"}
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                    </Grid>
                }

            </Grid>  
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar> 
        </Box>
    );
}
