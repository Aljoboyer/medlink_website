import {
  Checkbox,
  Box,
  InputAdornment,
  IconButton,
  Typography,
  Paper,
  TextField,
  Snackbar,
  Alert,
  Grid,
  Modal,
  FormControl,
  FormHelperText,
  CardContent,
  CardActions,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TablePagination from "@material-ui/core/TablePagination";
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { gqlquery, QUERY_GETHOSPITALUSERS, QUERY_GETMYPROFILE } from "../../api/hospitalIndex.js";
import { useNavigate } from "react-router-dom";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  // border: "4px solid red",
  boxShadow: 1,
  p: 4,
};
const theme = createTheme();
const useStyles = makeStyles({
  table: {
    // minWidth: "550px",
  },
  manageuser: {
    color: "#333333",
    fontSize: "24px",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },

  actionbutton: {
    color: "black",
  },

  tabledata: {
    height: "60px",
    color: "red",
  },
  pagination: {
    [theme.breakpoints.down("sm")]: {
      //   minWidth: "550px",
    },
  },
});

export default function ManageUsersMob() {
  const classes = useStyles();
  const [errInput, setErrInput] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snacksOpen, setSnacksOpen] = useState(false)
  const [IsAccessJobPosting, setIsAccessJobPosting] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [getUsers, setGetUsers] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [item, setItem] = useState({})
  const [form, setForm] = useState({
    "name": "",
    "email": "",
    "accessJobPosting": null,
    "accessResumeDatabase": null
  });
  const { accessJobPosting, accessResumeDatabase } = form;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/hospital-dashboard-mob");
  };

  // handle modals
  const hanldeOpenAddModal = () => setOpenAddModal(true);
  const hanldeCloseAddModal = () => setOpenAddModal(false);
  const handleOpenUpdateModal = (row) => {
    setItem(row)
    form.name = row?.name;
    form.accessJobPosting = row?.accessJobPosting;
    form.accessResumeDatabase = row?.accessResumeDB;
    setOpenUpdateModal(true);
  }
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleEdit = (values) => {
  //   console.log("The Values that you wish to edit ", values);
  //   const allUsers = users.filter((user) => user.name !== values);
  //   setUsers(allUsers);
  // };

  // const [values, setValues] = useState({
  //   amount: "",
  //   password: "",
  //   weight: "",
  //   weightRange: "",
  //   searchUser: false,
  // });
  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e.target.name] = e.target.value;
      return __form;
    });
  }
  const handleChangeCheckbox = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked
    });
  }

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  // Error snacks handle
  const handleSnacksClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnacksOpen(false);
  };

  useEffect(() => {
    gqlquery(QUERY_GETHOSPITALUSERS, null)
      .then((res) => res.json())
      .then((datas) => setGetUsers(datas?.data?.getHospitalUsers));
  }, [updateList]);
  console.log(getUsers)

  useEffect(() => {
    gqlquery(QUERY_GETMYPROFILE, null)
      .then((res) => res.json())
      .then((datas) => {
        setIsAccessJobPosting(datas?.data?.getMyProfile);
        if (datas?.data?.getMyProfile?.accessJobPosting === false) {
          setSnacksOpen(true);
          setTimeout(handleNavigate, 4000)
        }
      });

  }, []);

  // New user Create handle
  const handleCreateUser = (e) => {

    if (form.email === "" || form.name === "") {
      return setErrInput("please give input");
    }

    const QUERY_POSTNEWUSER = {
      query: `mutation MyMutation {
           addHospitalUser (
                 accessJobPosting: ${Boolean(form.accessJobPosting)},
                 accessResumeDB: ${Boolean(form.accessResumeDatabase)},
                 email: "${form.email}",
                 name: "${form.name}"
                ) {
                     accessJobPosting
                     accessResumeDB
                     adminUser
                     email
                     hospitalID
                     huID
                     status
                     name
                  }
              }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_POSTNEWUSER, null)
      .then((res) => res.json())
      .then((datas) => {
        setUpdateList(!updateList);
      })
      .finally((e) => console.log("adding new user to database"));

    form.email = "";
    form.name = "";
    form.accessJobPosting = false;
    form.accessResumeDatabase = false;
    setErrInput("");
    setOpenAddModal(false);
  };

  // Update user
  const handleUpdateUser = () => {
    if (form.name === "") {
      form.name = item.name
    }
    const QUERY_UPDATEUSER = {
      query: `mutation MyMutation {
           updateHospitalUser (
                    email: "${form.email}",
                    name: "${form.name}",
                    huID: ${Number(item?.huID)},
                    accessJobPosting: ${Boolean(form.accessJobPosting)},
                    accessResumeDB: ${Boolean(form.accessResumeDatabase)}
                    ) { 
                      accessJobPosting
                      accessResumeDB
                      adminUser
                      email
                      hospitalID
                      huID
                      name
                    }
                }
                  `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_UPDATEUSER, null)
      .then((res) => res.json())
      .then((datas) => {
        setUpdateList(!updateList);
      })
      .finally((e) => console.log("Updetting user is successful to database"));

    form.email = "";
    form.name = "";
    form.accessJobPosting = false;
    form.accessResumeDatabase = false;
    setErrInput("");
    setOpenUpdateModal(false);
    setItem({})
  }

  const hanldeDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const QUERY_DELETEUSER = {
        query: `mutation MyMutation {
             deleteHospitalUser (huID: ${id}) {
              accessJobPosting
              accessResumeDB
              adminUser
              email
              hospitalID
              huID
              name
              }
            }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_DELETEUSER, null)
        .then((res) => res.json())
        .then((datas) => {
          setUpdateList(!updateList)
          handleMenuClose()
        })
        .finally((e) =>
          console.log("Deleting hospital user from database")
        );
    } else {
      console.log("You don't want to delete this!");
    }

  };



  return (
    <Box maxWidth="sm" sx={{ mb: 8, mx: "auto" }}>
      {
        IsAccessJobPosting?.accessJobPosting ?
          (<Box>
            <Box
              sx={{
                backgroundColor: "#E0E0E0",
                padding: "15px 0 15px 17px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <ChevronLeftIcon sx={{ height: "24px", width: "24px" }} />
              <Typography variant="subtitle1" style={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600" }}>
                Manage User
              </Typography>
            </Box>
            {/* SearchBar */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "2%",
                px: 2,
                gap: 1,
              }}
            >
              <TextField
                name="keywordCTC"
                placeholder="     Enter Keyword/CTC"
                sx={{
                  backgroundColor: "",
                  size: "large",
                  borderRadius: "7px",
                  zIndex: "1",
                  "& .MuiInputBase-input": { height: 32 },
                  width: "100%",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" edge="end">
                        <SearchIcon sx={{ fontSize: "30px" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button onClick={hanldeOpenAddModal} variant="contained" sx={{ px: 4 }}>
                Add user
              </Button>
              {/* Add info modal */}
              <Modal
                open={openAddModal}
                onClose={hanldeCloseAddModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Box sx={{ display: "flex", flexDirection: "column", }}>
                    <Typography style={{ fontWeight: "bold", fontSize: "25px", marginBottom: "-12px", color: "gray" }}>Add User</Typography>
                    <Grid item direction={"column"} xs={12} md={12} sx={{ mt: 2 }}>
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          rows={1}
                          fullWidth
                          name="email"
                          type="email"
                          placeholder="   User email"
                          error={form.email === "" && errInput}
                          value={form.email}
                          onChange={formValueChange}
                          sx={{ backgroundColor: "#ffffff", py: 1, }}
                        />
                        {form.email === "" && (
                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {errInput}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item direction={"column"} xs={12} md={12} sx={{ mb: 2 }}>
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          rows={1}
                          fullWidth
                          name="name"
                          type="text"
                          placeholder="   User name"
                          error={form.name === "" && errInput}
                          value={form.name}
                          onChange={formValueChange}
                          sx={{ backgroundColor: "#ffffff", py: 1, }}
                        />
                        {form.name === "" && (
                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {errInput}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: "", alignItems: "", gap: 2 }}>
                      <Typography sx={{
                        fontSize: "16px", color: "#333333",
                        margin: "0 auto", width: "322px",
                        display: "flex", flexDirection: "row",
                        gap: 0, alignItems: 'flex-start',
                        justifyContent: '', mb: 2,
                      }} >
                        <Checkbox
                          name="accessJobPosting" checked={accessJobPosting} color="default" onChange={(e) => handleChangeCheckbox(e)}
                        />
                        &nbsp;
                        <b style={{ fontWeight: 400 }}>Access to Job Posting  </b>
                      </Typography>
                      <Typography
                        sx={{
                          color: "#333333", fontSize: "16px",
                          margin: "0 auto", textJustify: "inner-word",
                          width: "322px", display: "flex",
                          flexDirection: "row", gap: 0,
                          alignItems: 'flex-start', justifyContent: '',
                        }}
                      >
                        <Checkbox
                          name="accessResumeDatabase" checked={accessResumeDatabase} color="default" onChange={(e) => handleChangeCheckbox(e)}
                        />
                        &nbsp;
                        <b style={{ fontWeight: 400 }}>
                          Access to Resume Database
                        </b>
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      direction={"column"}
                      xs={12}
                      md={12}
                      justifyContent="flex-end"
                      sx={{ display: "grid" }}
                    >
                      <CardContent>
                        <CardActions className="resume-actions">
                          <Button
                            variant="contained"
                            className="save-btn"
                            onClick={handleCreateUser}
                          >
                            Save
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Grid>
                  </Box>
                </Box>
              </Modal>
            </Box>
            {/* select */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                mt: 4,
                mb: 2,
              }}
            >
              <Typography>
                <Checkbox /> Select All
              </Typography>
              <Button
                style={{
                  backgroundColor: "white",
                  color: "#BDBDBD",
                  border: "2px solid #a1a1a1",
                  borderRadius: "7px",
                  fontWeight: 600,
                  fontSize: "16px",
                  padding: "3px 22px 3px 22px",
                }}
              >
                Delete
              </Button>
            </Box>
            {/* Data container */}
            <TableContainer component={Paper} sx={{ px: 2 }}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody style={{ px: 3 }}>
                  {getUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
                    <TableRow
                      key={row.email}
                      style={{ backgroundColor: "#F2F2F2", height: "98px" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          px: 1.3,
                          pb: 0.4,
                        }}
                      >
                        <Typography style={{ fontSize: "14px", fontWeight: 500 }}>
                          <Checkbox /> &nbsp; {row.name}
                        </Typography>
                        <Box style={{ marginRight: "-17px" }}>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleMenuClick}
                          >
                            <MoreVertIcon />
                          </IconButton>

                          <Menu
                            disableEnforceFocus
                            id="long-menu"
                            MenuListProps={{
                              "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            PaperProps={{
                              style: {
                                maxHeight: "10rem",
                                width: "6rem",
                              },
                            }}
                          >
                            <MenuItem
                              onClick={() => handleOpenUpdateModal(row)}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => hanldeDeleteUser(row?.huID)}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          marginBottom: "10px",
                          alignItems: "flex-start"
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "12px",
                              fontWeight: 500,
                              marginBottom: "10px",
                            }}
                          >
                            Job Posting
                          </Typography>
                          {row?.accessJobPosting && (
                            <CheckCircleOutlineRoundedIcon
                              style={{ backgroundColor: "#BDBDBD" }}
                              sx={{ borderRadius: "50%" }}
                              variant="contained"
                            />
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "12px",
                              fontWeight: 500,
                              marginBottom: "10px",
                            }}
                          >
                            Resume Database
                          </Typography>
                          {row?.accessResumeDB && (
                            <CheckCircleOutlineRoundedIcon
                              style={{ backgroundColor: "#BDBDBD" }}
                              sx={{ borderRadius: "50%" }}
                              variant="contained"
                            />
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "12px",
                              fontWeight: 500,
                              marginBottom: "10px",
                            }}
                          >
                            Advertisement
                          </Typography>
                          {row.jobposting && (
                            <CheckCircleOutlineRoundedIcon
                              style={{ backgroundColor: "#BDBDBD" }}
                              sx={{ borderRadius: "50%" }}
                              variant="contained"
                            />
                          )}
                        </Box>
                      </Box>
                      <Box
                        style={{ height: "10px", backgroundColor: "white" }}
                      ></Box>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* Update info modal */}
              <Modal
                open={openUpdateModal}
                onClose={handleCloseUpdateModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Box sx={{ display: "flex", flexDirection: "column", }}>
                    <Typography style={{ fontWeight: "bold", fontSize: "25px", marginBottom: "-12px", color: "gray" }}>Update User</Typography>
                    <Grid item direction={"column"} xs={12} md={12} sx={{ mt: 2 }}>
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          // rows={1}
                          fullWidth
                          name="email"
                          type="email"
                          placeholder={`${" "} ${item?.email}`}
                          value={item?.email}
                          disabled
                          onChange={formValueChange}
                          sx={{ backgroundColor: "#ffffff", py: 1, }}
                        />
                        {form.email === "" && (
                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {errInput}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item direction={"column"} xs={12} md={12} sx={{ mb: 2 }}>
                      <FormControl fullWidth>
                        <TextField
                          variant="outlined"
                          // rows={1}
                          fullWidth
                          name="name"
                          type="text"
                          // placeholder={item?.name === "" ? `${" "} User name` : `${" "} ${item?.name}`}
                          defaultValue={item?.name}
                          onChange={formValueChange}
                          sx={{ backgroundColor: "#ffffff", py: 1 }}
                        />
                        {form.name === "" && (
                          <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {errInput}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: "", alignItems: "", gap: 2 }}>
                      <Typography sx={{
                        fontSize: "16px", color: "#333333",
                        margin: "0 auto", width: "322px",
                        display: "flex", flexDirection: "row",
                        gap: 0, alignItems: 'flex-start',
                        justifyContent: '', mb: 2,
                      }} >
                        <Checkbox
                          name="accessJobPosting" defaultChecked={item.accessJobPosting} color="default" onChange={(e) => handleChangeCheckbox(e)}
                        />
                        &nbsp;
                        <b style={{ fontWeight: 400 }}>Access to Job Posting  </b>
                      </Typography>
                      <Typography
                        sx={{
                          color: "#333333", fontSize: "16px",
                          margin: "0 auto", textJustify: "inner-word",
                          width: "322px", display: "flex",
                          flexDirection: "row", gap: 0,
                          alignItems: 'flex-start', justifyContent: '',
                        }}
                      >
                        <Checkbox
                          name="accessResumeDatabase" defaultChecked={item.accessResumeDB} color="default" onChange={(e) => handleChangeCheckbox(e)}
                        />
                        &nbsp;
                        <b style={{ fontWeight: 400 }}>
                          Access to Resume Database
                        </b>
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      direction={"column"}
                      xs={12}
                      md={12}
                      justifyContent="flex-end"
                      sx={{ display: "grid" }}
                    >
                      <CardContent>
                        <CardActions className="resume-actions">
                          <Button
                            variant="contained"
                            className="save-btn"
                            onClick={handleUpdateUser}
                          >
                            Update
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Grid>
                  </Box>
                </Box>
              </Modal>

              <TablePagination
                className={classes.pagination}
                style={{ backgroundColor: "#F2F2F2", width: "inherit" }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={getUsers?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Box>) : (
            <Snackbar open={snacksOpen} autoHideDuration={4000} onClose={handleSnacksClose}>
              <Alert onClose={handleSnacksClose} severity="error" sx={{ width: "100%" }}>
                This user does not have sufficient privileges for this page. Please contact your administrator.
              </Alert>
            </Snackbar >
          )}
    </Box >
  );
}

