import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Typography, 
    FormControl, 
} from "@mui/material";
// import { Folder } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import { gqlquery, QUERY_GETHRFOLDER } from "../../api/hospitalIndex";
// import CreatableSelect, { components } from 'react-select/creatable';
import Select, { components } from "react-select";
import { gqlquery, QUERY_GETHRFOLDER } from "../../api/hospitalIndex";

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

export default function SingleProfileView({ jaID }) {
    // const [shortlist, setShortlist] = useState("");
    // const [folder, setFolder] = useState("");
    // const [shortlistOpen, setShortlistOpen] = useState(false);
    // const [folderOpen, setFolderOpen] = useState(false);
    const [allFolders, setAllFolders] = useState([]);
    const [currentFolder, setCurrentFolder] = useState([]);
    const [updateList, setUpdateList] = useState(false);

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
                .then((data) => console.log(data))
            // .finally((e) => setCreateFolderInput(""));
        };
    };

    const handleInputChangeStatus = (inputValue, actionMeta) => {

    };

    return (
        <Box>
            <Grid justifyContent="space-between" alignItems="center" container spacing={2}>
                <Grid item xs={6}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "600",
                            color: "var(--clr-blue-footer)",
                            py: "auto",
                        }}
                        gutterBottom
                        component="div"
                    >
                        {/* Applicant’s Details */}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
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
                                    placeholder={(selectedFolder[0]?.name !== undefined) ? `${selectedFolder[0]?.name}` : "Move To"}
                                />
                            </FormControl>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
