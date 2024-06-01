import {
    // Container,
    Checkbox,
    Box,
    IconButton,
    Breadcrumbs,
    Typography,
    // Button,
    // Grid,
    Paper,
    Pagination,
    Skeleton,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// import { makeStyles } from "@material-ui/core/styles";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import { createTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { gqlquery } from "../../api/hospitalIndex.js";
import { Link, useParams, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import useAuth from "../../hooks/useAuth.js";
import moment from "moment";

// const theme = createTheme();
const useStyles = makeStyles({
    manuItem: {
        color: "var(--clr-blue-footer) !important",
        padding: "7px 15px",
        margin: "0px",
        borderRadius: "none !important",
    },
    tableContainer: {
        boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
    },
    table: {
        color: "var(--clr-blue-footer)"
    },
    tableTitleText: {
        color: "var(--clr-blue-footer)",
        fontSize: "14px",
        fontWeight: "600"
    },
    tablebodyrow: {
        backgroundColor: "var(--clr-white)",
        height: "60px !important",
    },
    pagination: {
        backgroundColor: "var(--clr-white)",
        color: "var(--clr-blue-footer)",
        fontWeight: "600 !important",
        padding: "10px",
    },
    menuPaper: {
        maxHeight: 180,
    },
    icon: {
        fill: "var(--clr-blue-footer)",
    },
    editMenu: {
        color: "var(--clr-blue-footer) !important",
        padding: "7px 15px",
        margin: "0px",
        borderRadius: "none !important",
        // backgroundColor: "#FFF !important",
        "&:hover": {
            // backgroundColor: '#C7D3E3 !important'
        }
    },
});

const ITEM_HEIGHT = 48;

export const ShowForAccessJobPostingAndResumeDB = (props) => {
    const { getUserRole, permitUser, isLoading } = useAuth();

    useEffect(() => {
        getUserRole();
    }, [])

    if (!isLoading) {
        return permitUser?.accessResumeDB || permitUser?.adminUser ? props.children : <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Fix-Access-Denied-Folder-Featured.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5" style={{ width: "100%", height: "auto" }} alt="Accecss_denied" />;
    }
    else {
        return (
            <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
                <Box style={{ marginTop: "15px", marginBottom: "30px" }}>
                    <Skeleton variant="text" animation="wave" width="40%" height={30} />
                </Box>
                <Box>
                    <Skeleton variant="text" animation="wave" width="40%" height={50} />
                </Box>
                <Box>
                    <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
                    <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
                    <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
                    <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
                    <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
                    <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
                    <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
                </Box>
            </Box>
        );
    }
}

/* function LongMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(anchorEl);
    };
    const classes = useStyles();
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ mr: { xs: -2, md: 0 } }}
            >
                <MoreVertIcon sx={{ color: "var(--clr-blue-footer)" }} />
            </IconButton>

            <Menu
                className={classes.editMenu}
                id="long-menu"
                MenuListProps={{
                    "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                    },
                }}
            >
                <MenuItem
                    className={classes.MenuItem}
                    selected={"Remove to Folder"}
                    onClick={handleClose}
                >
                    Remove to Folder
                </MenuItem>
            </Menu>
        </Box>
    );
} */

export default function ProfileListFolder() {
    const classes = useStyles();
    const { id } = useParams();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [profileList, setProfileList] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState({})
    const [updated, setUpdated] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const location = useLocation();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    document.title = "Personal Folders Details | MedLink Jobs";

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [location.pathname]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const QUERY_GETAPPLICANTSLISTBYJOB = {
            query: `query MyQuery {
                listProfilesByFolder (folderID: "${id}") {
                        folderID
                        fpID
                        jaID
                        name     
                        addedAt                
                    }
                }`,
            variables: null,
            operationName: "MyMutation",
        };

        gqlquery(QUERY_GETAPPLICANTSLISTBYJOB, null)
            .then((res) => res.json())
            .then((data) => setProfileList(data?.data?.listProfilesByFolder));
    }, [updated]);

    const handleRemoveToFolder = () => {
        if (window.confirm('Are you sure you want to remove this Profile?')) {
            const QUERY_CLOSEJOB = {
                query: `mutation MyMutation {
                deleteProfileFromFolder(
                    folderID: "${selectedProfile?.folderID}",
                     jaID: "${selectedProfile?.jaID}"
                )
              }`,
                variables: null,
                operationName: "MyMutation",
            };

            gqlquery(QUERY_CLOSEJOB, null)
                .then((res) => res.json())
                .then((datas) => {
                    if (datas?.data?.deleteProfileFromFolder === "SUCCESS") {
                        setUpdated(prev => !prev)
                        setAnchorEl(null);
                    } else {

                    }
                })
        }
        handleClose();
    }

   /*  const newProfilesList = profileList?.map((profile) => {
        const date = new Date(profile?.addedAt)
        const newDate = date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }).split(' ').join('-');
        return {
            name: profile?.name,
            addedAt: newDate,
            folderID: profile?.folderID,
            fpID: profile?.fpID,
            jaID: profile?.jaID,
        }
    }) */

    return (
        <ShowForAccessJobPostingAndResumeDB>
            <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
                {!matches ? (
                    <Box style={{ marginTop: "15px", marginBottom: "30px" }}>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" sx={{ color: "var(--clr-blue-footer)" }} />}
                            aria-label="breadcrumb"
                            sx={{ marginTop: "20px" }}
                        >
                            <Link underline="hover" style={{ color: "var(--clr-blue-footer)" }} color="inherit" to="/">
                                Home
                            </Link>
                            <Link underline="hover" style={{ color: "var(--clr-blue-footer)" }} to="/personal-folders">
                                Personal Folders
                            </Link>
                            <Typography sx={{ color: "var(--clr-blue-footer)" }}> {location?.state?.folderName} Profile List</Typography>
                        </Breadcrumbs>
                    </Box>
                ) : (
                    <Box sx={{ p: 2, mb: 3, display: "flex", gap: 1.5, alignItems: "center", backgroundColor: "var(--clr-blue-light)" }}>
                        <NavigateBeforeIcon sx={{ fontSize: "2rem", color: "var(--clr-blue-footer)" }} />
                        <Typography variant="subtitle1" sx={{ color: "var(--clr-blue-footer)", fontSize: "16px", fontWeight: "600" }}>{location?.state?.folderName} Profile List</Typography>
                    </Box>
                )}
                <Box sx={{ px: { xs: 2, md: 0 } }}>
                    <Box sx={{ marginBottom: "15px" }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "600",
                                color: "var(--clr-blue-footer)",
                                fontSize: { xs: "18px", md: "24px" }
                            }}
                        >
                            {location?.state?.folderName} Profile List
                        </Typography>
                    </Box>
                    {!matches ? (
                        <TableContainer component={Paper} className={classes.tableContainer}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow
                                        sx={{
                                            backgroundColor: "var(--clr-blue-light)"
                                        }}
                                    >
                                        <TableCell className={classes.tableTitleText}>
                                            <Checkbox sx={{
                                                color: "var(--clr-blue-footer) !important",
                                                "&.Mui-checked": {
                                                    color: "var(--clr-blue-footer) !important",
                                                },
                                            }} /> &nbsp;Name
                                        </TableCell>
                                        <TableCell align="left" className={classes.tableTitleText}>
                                            Added
                                        </TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {profileList
                                        ?.slice((page > 0 ? page - 1 : page) * 10, (page > 0 ? page - 1 : page) * 10 + 10)
                                        ?.map((row, index) => (
                                            <TableRow
                                                key={row?.name}
                                                className={classes.tablebodyrow}
                                                style={{ padding: "0px", margin: "0px" }}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    className={classes.tableTitleText}
                                                >
                                                    <Checkbox sx={{
                                                        color: "#C7D3E3 !important",
                                                        "&.Mui-checked": {
                                                            color: "var(--clr-blue-primary) !important",
                                                        },
                                                    }} /> &nbsp;<Link to={`/applicants-detail/${row?.jaID}`} state={{ from: "profile-list-folder", folderName: location?.state?.folderName }} >{row?.name}</Link>
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                                                >
                                                    {moment(row?.initiatedAt).format("DD-MMM-YYYY")}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    style={{ padding: "0px", margin: "0px" }}
                                                >
                                                    <IconButton
                                                        aria-label="more"
                                                        id="long-button"
                                                        aria-controls={open ? "long-menu" : undefined}
                                                        aria-expanded={open ? "true" : undefined}
                                                        aria-haspopup="true"
                                                        onClick={(event) => {
                                                            setAnchorEl(event.currentTarget);
                                                            setSelectedProfile(row);
                                                        }}
                                                        sx={{ mr: { xs: -2, md: 0 } }}
                                                    >
                                                        <MoreVertIcon sx={{ color: "var(--clr-blue-footer)" }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                                <Box>
                                    <Menu
                                        className={classes.editMenu}
                                        id="long-menu"
                                        MenuListProps={{
                                            "aria-labelledby": "long-button",
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                            },
                                        }}
                                    >
                                        <MenuItem
                                            className={classes.MenuItem}
                                            selected={"Remove to Folder"}
                                            onClick={handleRemoveToFolder}
                                        >
                                            Remove From Folder
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </Table>
                            <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", my: "19px", pr: 2 }}>
                                <Pagination
                                    style={{}}
                                    count={Math.ceil(profileList?.length / 10)}
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage} />
                            </Box>
                        </TableContainer>
                    ) : (
                        <Box sx={{ mt: { xs: -2, md: 0 } }}>
                            <Table aria-label="simple table">
                                <TableBody>
                                    {profileList
                                        ?.slice((page > 0 ? page - 1 : page) * 10, (page > 0 ? page - 1 : page) * 10 + 10)
                                        ?.map((row, index) => (
                                            <Box component={Box} key={row?.name} sx={{ backgroundColor: "var(--clr-white)", border: "1px solid var(--clr-blue-light)", borderRadius: "6px !important", my: 2 }}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        px: 1.3,
                                                        pb: 0.4,
                                                    }}
                                                >
                                                    <Typography style={{ display: "flex", alignItems: "center" }}>
                                                        <Checkbox sx={{
                                                            color: "#C7D3E3 !important",
                                                            "&.Mui-checked": {
                                                                color: "var(--clr-blue-primary) !important",
                                                            },
                                                            ml: -1,
                                                            display: "none"
                                                        }} />{/*  &nbsp; */}
                                                        <Link to={`/applicants-detail/${row?.jaID}`}
                                                            style={{
                                                                color: "var(--clr-blue-footer)",
                                                                fontSize: "14px",
                                                                fontWeight: "600",
                                                                cursor: "pointer"
                                                            }}
                                                        >
                                                            {row?.name}
                                                        </Link>
                                                    </Typography>
                                                    <Box>
                                                        <IconButton
                                                            aria-label="more"
                                                            id="long-button"
                                                            aria-controls={open ? "long-menu" : undefined}
                                                            aria-expanded={open ? "true" : undefined}
                                                            aria-haspopup="true"
                                                            onClick={(event) => {
                                                                setAnchorEl(event.currentTarget);
                                                                setSelectedProfile(row);
                                                            }}
                                                            sx={{ mr: { xs: -2, md: 0 } }}
                                                        >
                                                            <MoreVertIcon sx={{ color: "var(--clr-blue-footer)" }} />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "grid",
                                                        columnGap: 3,
                                                        rowGap: 3,
                                                        gridTemplateColumns: "repeat(2, 1fr)",
                                                        mb: 1.5,
                                                        px: 1.3,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            justifyContent: "flex-start",
                                                            alignItems: "flex-start",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontWeight: 600,
                                                                color: "var(--clr-white-icon)",
                                                            }}
                                                        >
                                                            Added
                                                        </Typography>
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{
                                                                color: "var(--clr-gray-1)",
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {moment(row?.initiatedAt).format("DD-MMM-YYYY")}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        ))}
                                </TableBody>
                                <Box>
                                    <Menu
                                        className={classes.editMenu}
                                        id="long-menu"
                                        MenuListProps={{
                                            "aria-labelledby": "long-button",
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                            },
                                        }}
                                    >
                                        <MenuItem
                                            className={classes.MenuItem}
                                            selected={"Remove to Folder"}
                                            onClick={handleRemoveToFolder}
                                        >
                                            Remove From Folder
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </Table>
                            <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", mb: "19px", pr: 2, }}>
                                <Pagination
                                    style={{}}
                                    count={Math.ceil(profileList?.length / 10)}
                                    variant="outlined"
                                    shape="rounded"
                                    onChange={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage} />
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </ShowForAccessJobPostingAndResumeDB>
    )
}
