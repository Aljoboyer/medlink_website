import {
  Checkbox,
  Box,
  Breadcrumbs,
  Typography,
  FormControl,
  // Input,
  useMediaQuery,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Skeleton,
  Pagination
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TablePagination from "@material-ui/core/TablePagination";
// import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { /* createTheme, */ useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
// import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import Modal from "@mui/material/Modal";
import { gqlquery, QUERY_GETHRFOLDER } from "../../api/hospitalIndex";
import { useParams, useLocation, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


// const theme = createTheme();
const useStyles = makeStyles({
  breadcrumbsMargin: {
    padding: "15px 0px !important",
  },
  pageTitle: {
    fontWeight: "600 !important",
    color: "var(--clr-blue-footer)",
  },
  adduserbutton: {
    color: "var(--clr-white)",
    borderRadius: "55px",
  },
  filterButton: {
    backgroundColor: "var(--clr-blue-light) !important",
    borderRadius: "50px",
    color: "var(--clr-blue-footer) !important",
    fontWeight: "600",
    padding: "4px 16px !important",
    "&:hover": {
      backgroundColor: "var(--clr-blue-light) !important",
      color: "#395987 !important",
    },
  },
  tableContainer: {
    boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
  },
  table: {
    color: "var(--clr-blue-footer)",
  },
  tableTitleText: {
    color: "var(--clr-blue-footer)",
    fontSize: "14px",
    fontWeight: "600",
  },
  tablebodyrow: {
    backgroundColor: "var(--clr-white)",
    height: "60px !important",
  },
  tabledata: {
    height: "60px",
    color: "red",
  },
  pagination: {
    backgroundColor: "var(--clr-white)",
    color: "var(--clr-blue-footer)",
    fontWeight: "600 !important",
    padding: "10px",
  },
});

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: "2px solid gray",
  boxShadow: 1,
  p: 4,
  borderRadius: "5px",
};

const styleResponsive = {
  position: "relative",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  // border: "2px solid gray",
  boxShadow: 1,
  p: "12px",
  borderRadius: "5px",
};

export const ShowForAccessJobPostingAndResumeDB = (props) => {
  const { getUserRole, permitUser, isLoading } = useAuth();

  useEffect(() => {
    getUserRole();
  }, [])

  if (!isLoading) {
    return permitUser?.accessJobPosting || permitUser?.accessResumeDB || permitUser?.adminUser ? props.children : <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Fix-Access-Denied-Folder-Featured.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5" style={{ width: "100%", height: "auto" }} alt="Accecss_denied" />;
  }
  else {
    return (
      <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
        <Box style={{ marginTop: "15px", marginBottom: "30px" }}>
          <Skeleton variant="text" animation="wave" width="40%" height={30} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Skeleton variant="text" animation="wave" width="40%" height={50} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "25%" }}>
            <Skeleton variant="text" animation="wave" width="50%" height={60} />
            <Skeleton variant="text" animation="wave" width="50%" height={60} />
          </Box>
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

function createData(foldername, numberOfProfiles, date) {
  return { foldername, numberOfProfiles, date };
}
let rows = [
  createData("Folder Name 1", "1", "26 - Jan - 2022"),
  createData("Folder Name 2", "1", "26 - Jan - 2022"),
  createData("Folder Name 3", "1", "26 - Jan - 2022"),
  createData("Folder Name 4", "1", "26 - Jan - 2022"),
  createData("Folder Name 5", "1", "26 - Jan - 2022"),
];

export default function PersonalFolders() {
  const classes = useStyles();
  const { pathname } = useLocation();
  // const [users, setUsers] = useState(rows);
  const [allFolders, setAllFolders] = useState([]);
  const [folderWiseProfileCount, setFolderWiseProfileCount] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [item, setItem] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCreateFolder, setOpenCreateFolder] = useState(false);
  const [openRenameFolder, setOpenRenameFolder] = useState(false);
  const [createFolderInput, setCreateFolderInput] = useState("");
  const [anchorRecruiter, setAnchorRecuiter] = useState(null);
  const [menuItemForResponsive, setMenuItemForResponsive] = useState();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const openRecruiter = Boolean(anchorRecruiter);
  document.title = "Personal Folders | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { id } = useParams();

  const handleRecruiter = (event, row) => {
    // if (hospitalUser?.contactEmail) {
    // console.log(event)
    setAnchorRecuiter(event.currentTarget);
    setMenuItemForResponsive(row);
    // }
  };

  const handleChange = (e) => {
    setCreateFolderInput(e.target.value);
  };

  const handleCloseRecruiter = () => {
    setAnchorRecuiter(null);
  };
  const handleOpenCreateFolder = () => setOpenCreateFolder(true);
  const handlCloseCreateFolder = () => {
    setOpenCreateFolder(false);
    setCreateFolderInput("");
  };
  const handleOpenRenameFolder = (arg) => {
    // console.log(arg);
    setCreateFolderInput("");
    setOpenRenameFolder(true);
    setItem(arg);
    setCreateFolderInput(arg?.name);
  };
  const handleCloseRenameFolder = () => {
    setOpenRenameFolder(false);
    setCreateFolderInput("");
  };

  useEffect(() => {
    gqlquery(QUERY_GETHRFOLDER, null)
      .then((res) => res.json())
      .then((data) => {
        setAllFolders(data?.data?.getFolders);
        setFolderWiseProfileCount(data?.data?.getFolderWiseProfilesCount);
      });
    // .finally((e) =>  console.log("getFolders outer one", allFolders));
  }, [updateList]);

  var folderWithProifle = allFolders?.map((profile) => {
    var haveEqualId = (user) => user.folderID === profile.folderID;
    var userWithEqualId = folderWiseProfileCount.find(haveEqualId);
    return Object.assign({}, profile, userWithEqualId);
  });
  // console.log(folderWithProifle);

  const handleCreateFolder = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {

      if (
        createFolderInput === "" ||
        !createFolderInput.replace(/\s/g, "").length
      ) {
        return console.log("please give input");
      }

      const QUERY_ADDHRFOLDER = {
        query: `mutation MyMutation { 
        addHRFolder ( name: "${createFolderInput}") {
                folderID
                name
                userName
              }
            }`,
        variables: null,
        operationName: "MyMutation",
      };
      gqlquery(QUERY_ADDHRFOLDER, null)
        .then((res) => res.json())
        .then((data) => setUpdateList((pre) => !pre))
        .finally((e) => setCreateFolderInput(""));

      setCreateFolderInput("");
      setOpenCreateFolder(false);
    }
  };

  const handleRenameFolder = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {

      const QUERY_RENAMEHRFOLDER = {
        query: `mutation MyMutation { 
          renameFolder ( name: "${createFolderInput}", folderID: "${item.folderID}") {
                folderID
                name
                profileCount
                userName
              }
            }`,
        variables: null,
        operationName: "MyMutation",
      };
      gqlquery(QUERY_RENAMEHRFOLDER, null)
        .then((res) => res.json())
        .then((data) => setUpdateList((pre) => !pre))
        .finally((e) => setCreateFolderInput(""));

      setCreateFolderInput("");
      setOpenRenameFolder(false);
    }
    setAnchorRecuiter(null);
  };

  const handleDeleteFolder = (id) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      const QUERY_GETAPPLICANTBYID = {
        query: `mutation MyMutation  {
          deleteFolder(folderID: "${id}") {
              folderID
              name
              profileCount
              userName
            }
          }`,
      };
      gqlquery(QUERY_GETAPPLICANTBYID, null)
        .then((res) => res.json())
        .then((data) => setUpdateList((pre) => !pre));
    }
    setAnchorRecuiter(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ShowForAccessJobPostingAndResumeDB>
      {
        matches &&
        <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px", display: "flex", alignItems: "center" }}>
          <ArrowBackIosNewIcon sx={{ color: "var(--clr-blue-footer)", mr: 3.1 }} /><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Personal Folders</Typography>
        </Box>
      }
      <Box maxWidth="md" sx={{ mb: 8, mx: "auto", px: matches && "16px" }}>
        {
          !matches &&
          <Box
            className={classes.breadcrumbsMargin}
          >
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" sx={{color: "var(--clr-blue-footer)"}} />}
              aria-label="breadcrumb"
            >
              <Link
                underline="hover"
                style={{
                  color: "var(--clr-blue-footer)",
                }}
                to="/hospital-dashboard"
              >
                Dashboard
              </Link> 
              <Typography
                sx={{
                  color: "var(--clr-blue-footer)",
                }}
              >
                Personal Folders
              </Typography>
            </Breadcrumbs>
          </Box>
        }

        <Box
          style={{
            marginTop: matches ? "20px" : "15px",
            marginBottom: matches ? "15px" : "20px",
          }}
        >
          {!matches ? (
            // web view
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5" className={classes.pageTitle}>
                Personal Folders
              </Typography>

              <Stack direction="row" spacing={3}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleOpenCreateFolder}
                    className={classes.adduserbutton}
                  >
                    Create
                  </Button>
                  <Modal
                    open={openCreateFolder}
                    onClose={handlCloseCreateFolder}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <FormControl fullWidth variant="standard">
                          <TextField
                            sx={{
                              px: 1,
                              borderRadius: 1,
                              padding: "4px 0px !important",
                            }}
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": {
                                  padding: '9px 14px',
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
                            size="small"
                            fullWidth
                            disableUnderline
                            id="outlined-adornment-password"
                            type="text"
                            // value={values.password}
                            onChange={handleChange}
                            onKeyDown={handleCreateFolder}
                            placeholder="Create folder..."
                          />
                        </FormControl>

                        <Button
                          variant="contained"
                          className={classes.adduserbutton}
                          onClick={(event) =>
                            handleCreateFolder(event, "onClick")
                          }
                        >
                          Create
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </div>
                {/* <Button
                  className={classes.filterButton}
                  startIcon={
                    <FilterAltTwoToneIcon
                      style={{ color: "var(--clr-blue-footer)" }}
                    />
                  }
                >
                  Filter
                </Button> */}
              </Stack>
            </Box>
          ) : (
            // tab and mobile view
            <Box>
              <div style={{ marginBottom: "8px" }}>
                <Button
                  variant="contained"
                  onClick={handleOpenCreateFolder}
                  className={classes.adduserbutton}
                  fullWidth
                >
                  Create
                </Button>
                <Modal
                  open={openCreateFolder}
                  onClose={handlCloseCreateFolder}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={styleResponsive}>
                    <Box sx={{ alignItems: "center" }}>
                      <FormControl fullWidth variant="standard">
                        <TextField
                          sx={{
                            px: 1,
                            borderRadius: 1,
                            padding: "4px 0px !important",
                          }}
                          InputProps={{
                            sx: {
                              ".MuiOutlinedInput-input": {
                                padding: '9px 14px',
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
                          size="small"
                          fullWidth
                          disableUnderline
                          id="outlined-adornment-password"
                          type="text"
                          // value={values.password}
                          onChange={handleChange}
                          onKeyDown={handleCreateFolder}
                          placeholder="Create folder..."
                        />
                      </FormControl>

                      <Button
                        variant="contained"
                        className={classes.adduserbutton}
                        fullWidth
                        sx={{ mt: 1.5 }}
                        onClick={(event) =>
                          handleCreateFolder(event, "onClick")
                        }
                      >
                        Create
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </div> 
            </Box>
          )}
        </Box>

        {!matches ? (
          // web view
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow
                  style={{
                    backgroundColor: "var(--clr-blue-light)",
                  }}
                >
                  <TableCell className={classes.tableTitleText}>
                    <Checkbox
                      sx={{
                        color: "#C7D3E3 !important",
                        "&.Mui-checked": {
                          color: "var(--clr-blue-primary) !important",
                        },
                      }}
                    />{" "}
                    &nbsp; Folder Name
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: 600 }}
                    className={classes.tableTitleText}
                  >
                    Number Of Profiles
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: 600 }}
                    className={classes.tableTitleText}
                  >
                    Created By
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: 600 }}
                    className={classes.tableTitleText}
                  >
                    ----------Folder Actions----------
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {folderWithProifle
                  ?.slice((page > 0 ? page - 1 : page) * 10, (page > 0 ? page - 1 : page) * 10 + 10)
                  ?.map((row, index) => (
                    <TableRow
                      key={row.name}
                      className={classes.tablebodyrow}
                      style={{ padding: "0px", margin: "0px" }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableTitleText}
                      >
                        <Checkbox
                          sx={{
                            color: "#C7D3E3 !important",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary) !important",
                            },
                          }}
                        />{" "}
                        &nbsp;{" "}
                        <Link
                          to={`/profile-list-folder/${row?.folderID}`}
                          state={{ folderName: row?.name }}
                          color="inherit"
                        >
                          {" "}
                          {row?.name}{" "}
                        </Link>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell
                        align="center"
                        style={{
                          padding: "0px",
                          margin: "0px",
                          fontWeight: 600,
                        }}
                        className={classes.tableTitleText}
                      >
                        {row?.profiles}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          padding: "0px",
                          margin: "0px",
                          fontWeight: 600,
                        }}
                        className={classes.tableTitleText}
                      >
                        {row?.userName}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          padding: "0px",
                          margin: "0px",
                          fontWeight: 600,
                        }}
                      >
                        <Typography underline="always" color="text.secondary">
                          <Button
                            variant="text"
                            style={{ fontWeight: "600 !important" }}
                            onClick={() => handleOpenRenameFolder(row)}
                          >
                            <u>Rename</u>
                          </Button>
                          &nbsp; &nbsp;
                          <Button
                            variant="text"
                            style={{ fontWeight: "600 !important" }}
                            onClick={() => handleDeleteFolder(row.folderID)}
                          >
                            <u>Delete</u>
                          </Button>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Modal
              open={openRenameFolder}
              onClose={handleCloseRenameFolder}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <FormControl fullWidth variant="standard">
                    <TextField
                      sx={{
                        px: 1,
                        borderRadius: 1,
                        padding: "4px 0px !important",
                      }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": {
                            padding: '9px 14px',
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
                      size="small"
                      fullWidth
                      disableUnderline
                      id="outlined-adornment-password"
                      type="text"
                      defaultValue={item?.name}
                      onChange={handleChange}
                      onKeyDown={handleRenameFolder}
                      placeholder="Rename Folder"
                    />
                  </FormControl>

                  <Button
                    variant="contained"
                    className={classes.adduserbutton}
                    onClick={(event) => handleRenameFolder(event, "onClick")}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </Modal>

            <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", my: "19px", pr: 2 }}>
              <Pagination
                style={{}}
                count={Math.ceil(folderWithProifle?.length / 10)}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage} />
            </Box>
          </TableContainer>
        ) : (
          // tab view
          <Box>
            {folderWithProifle
              ?.slice((page > 0 ? page - 1 : page) * 10, (page > 0 ? page - 1 : page) * 10 + 10)
              ?.map((row, index) => (
                <Box
                  sx={{
                    border: "1px solid #E4EEF5",
                    borderRadius: "6px",
                    p: 1.25,
                    mb: 1.25,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={11}>
                      <Link
                        to={`/profile-list-folder/${row?.folderID}`}
                        state={{ folderName: row?.name }}
                        color="inherit"
                        style={{ fontSize: "14px", fontWeight: "600", color: "#395987" }}
                      >
                        {row?.name}
                      </Link>

                      <Typography sx={{ fontSize: "10px", fontWeight: "600", color: "#C7D3E3", pt: "10px", pb: "6px" }}>Last Updated By</Typography>

                      <Typography sx={{ fontSize: "12px", fontWeight: "600", color: "#333333" }}>{row?.userName}</Typography>
                    </Grid>

                    <Grid item xs={1}>
                      <MoreVertIcon sx={{ color: "#395987" }} onClick={(e) => handleRecruiter(e, row)}></MoreVertIcon>
                      <Box>
                        <Menu
                          sx={{ marginTop: "1rem" }}
                          id="basic-menu"
                          anchorEl={anchorRecruiter}
                          open={openRecruiter}
                          onClose={handleCloseRecruiter}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem
                            onClick={() => handleOpenRenameFolder(menuItemForResponsive)}
                            sx={{ color: "var(--clr-blue-footer)" }}
                          >
                            Rename
                          </MenuItem>

                          <MenuItem
                            component={Link}
                            to={`/profile-list-folder/${row?.folderID}`}
                            onClick={handleCloseRecruiter}
                            sx={{ color: "var(--clr-blue-footer)" }}
                          >
                            View
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleDeleteFolder(menuItemForResponsive?.folderID)}
                            sx={{ color: "var(--clr-blue-footer)" }}
                          >
                            Delete
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            <Modal
              open={openRenameFolder}
              onClose={handleCloseRenameFolder}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleResponsive}>
                <Box sx={{ alignItems: "center" }}>
                  <FormControl fullWidth variant="standard">
                    <TextField
                      sx={{
                        px: 1,
                        borderRadius: 1,
                        padding: "4px 0px !important",
                      }}
                      InputProps={{
                        sx: {
                          ".MuiOutlinedInput-input": {
                            padding: '9px 14px',
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
                      size="small"
                      fullWidth
                      disableUnderline
                      id="outlined-adornment-password"
                      type="text"
                      defaultValue={item?.name}
                      onChange={handleChange}
                      onKeyDown={handleRenameFolder}
                      placeholder="Rename Folder"
                    />
                  </FormControl>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 1.5 }}
                    className={classes.adduserbutton}
                    onClick={(event) => handleRenameFolder(event, "onClick")}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </Modal>

            <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", my: "19px", pr: 2 }}>
              <Pagination
                style={{}}
                count={Math.ceil(folderWithProifle?.length / 10)}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage} />
            </Box>
          </Box>
        )}
      </Box>
    </ShowForAccessJobPostingAndResumeDB>
  );
}