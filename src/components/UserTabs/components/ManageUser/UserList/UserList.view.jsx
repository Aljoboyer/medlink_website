import {
  Checkbox,
  Box,
  InputAdornment,
  IconButton,
  Input,
  TextField,
  Grid,
  FormHelperText,
  Typography,
  CardActions,
  Tooltip,
  Card,
  CardHeader,
  CardContent,
  Menu,
  Pagination,
  TableContainer,
  Paper,
  Breadcrumbs,
  InputLabel, 
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import {
  gqlquery,
  QUERY_GETHOSPITAL,
  QUERY_GETHOSPITALUSERS,
  QUERY_GETMYPROFILE,
} from "../../../../../api/hospitalIndex.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gqlOpenQuery } from "../../../../../api/index.js";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import UserListSkeleton from "../../../../../pages/UsersList/UserList.skeleton.jsx";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// const theme = createTheme();
const useStyles = makeStyles({
  table: {
    color: "var(--clr-blue-footer)"
  },
  adduserbutton: {
    color: "var(--clr-white)",
    borderRadius: "55px",
  },
  cancelbutton: {  
    fontWeight: "600px",
    borderRadius: "55px",
    borderWidth: "2px !important",
  },
  actionbutton: {
    color: "var(--clr-blue-footer)",
    backgroundColor: "#C7D3E3 !important",
    padding: "5px 20px !important",
    borderRadius: "35px",
    fontWeight: "bold"
  },
  tablebodyrow: {
    backgroundColor: "var(--clr-white)",
    height: "60px !important",
  },
  tabledata: {
    height: "60px",
  },
  pagination: {
    color: "var(--clr-blue-footer)",
    fontWeight: "600 !important",
  },
});

const ModalStyle = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)", 
  // boxShadow: 1,
  borderRadius: "8px",
  padding: "30px 50px",
  maxWidth: "550px"
};

const ModalStyleMini = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)", 
  // boxShadow: 1,
  borderRadius: "8px",
  padding: "20px 35px",
  maxWidth: "350px"
};
export default function UserList() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [errInput, setErrInput] = useState("");
  const [updateList, setUpdateList] = useState(false);
  const [getUsers, setGetUsers] = useState([]);
  const [updateUser, setUpdateUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [hospitalData, setHospitalData] = useState([]);
  const [accessToPostJob, setAccessToPostJob] = useState([]);
  // let [searchResults, setSearchResults] = useState([]);
  const [userExists, setUserExists] = useState(false);
  const [userExistsData, setUserExistsData] = useState();
  const [openMobileAddModal, setOpenMobileAddModal] = useState(false);
  const [openMobileUpdateModal, setOpenMobileUpdateModal] = useState(false);
  const [mobileUserData, setMobileUserData] = useState({})
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const ManuClose = () => {
    setAnchorEl(null);
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    accessJobPosting: null,
    accessResumeDatabase: null,
    searchUser: ""
  });
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    searchUser: false,
  });
  const [emailErr, setEmailErr] = useState("")
  const [addedUserError, setAddedUserError] = useState({
    email: "",
    name: ""
  });
  document.title = "Manage user | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, page]);

  const { accessJobPosting, accessResumeDatabase } = form;

  const handleNavigate = () => {
    navigate("/hospital-dashboard");
  };

  const formValueChange = (e) => {
    setForm((_form) => {
      let __form = { ..._form };
      __form[e.target.name] = e.target.value;
      return __form;
    });
  };

  const handleChangeCheckbox = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.checked,
    });
  };

  /*  const handleChange = (prop) => (event) => {
     setValues({ ...values, [prop]: event.target.value });
   }; */

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }


    setOpen(false);
  };

  useEffect(() => {
    gqlquery(QUERY_GETHOSPITAL, null)
      .then((res) => res.json())
      .then((datas) => {
        setHospitalData(datas?.data?.getHospital);
      });

    gqlquery(QUERY_GETMYPROFILE, null)
      .then((res) => res.json())
      .then((datas) => {
        setAccessToPostJob(datas?.data?.getMyProfile);
        if (datas?.data?.getMyProfile?.accessJobPosting === false) {
          setOpen(true);
          setTimeout(handleNavigate, 4000);
        }
      });
  }, []);

  const hanldeOpenAddModal = () => setOpenAddModal(true);
  const handleOpenMobileModal = () => setOpenMobileAddModal(true)

  const hanldeCloseAddModal = () => {
    setAddedUserError({ "email": "", "name": "" });
    setErrInput("");
    setOpenAddModal(false);
    setOpenMobileAddModal(false)
  };

  const handleOpenUpdateModal = (id, arg) => {
    setUpdateUser(arg);
    form.name = arg?.name;
    form.accessJobPosting = arg?.accessJobPosting;
    form.accessResumeDatabase = arg?.accessResumeDB;
    setOpenUpdateModal(true);
  };

  const handleOpenMobileUpdateModal = () => {
    setUpdateUser(mobileUserData);
    form.name = mobileUserData?.name;
    form.accessJobPosting = mobileUserData?.accessJobPosting;
    form.accessResumeDatabase = mobileUserData?.accessResumeDB;
    setOpenMobileUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setAddedUserError({ "email": "", "name": "" });
    setErrInput("");
    form.name = "";
    form.email = "";
    form.accessJobPosting = null;
    form.accessResumeDatabase = null;
    // setForm({
    //   name: "",
    //   email: "",
    //   accessJobPosting: null,
    //   accessResumeDatabase: null,
    // })
    setOpenUpdateModal(false);
    setOpenMobileUpdateModal(false)
  };;

  useEffect(() => {
    gqlquery(QUERY_GETHOSPITALUSERS, null)
      .then((res) => res.json())
      .then((datas) => setGetUsers(datas?.data?.getHospitalUsers))
      .finally(()=>setIsLoading(false));
  }, [updateList]);

  useEffect(() => {

    const QUERY_GET_EMAIL_EXISTS = {
      query: `query MyQuery {
            verifyEmail(emailID: "${form.email}")
          }`,
      operationName: "MyQuery",
    };

    gqlOpenQuery(QUERY_GET_EMAIL_EXISTS, null)
      .then((res) => res.json())
      .then((datas) => {
        const existsData = JSON.parse(datas.data.verifyEmail);
        // console.log(existsData)
        setUserExistsData(existsData);
      })
  }, [form.email])

  const handleCreateUser = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {

      if (form.email === "" || form.name === "") {
        return setErrInput("This field can not be empty.");
      } else {
        setErrInput("");
      }

      if (userExistsData?.user?.doctorExists) {
        setUserExists(true);
        setOpen(true);
        return;
      };
      if (userExistsData?.user?.hospitalUserExists) {
        setUserExists(true);
        setOpen(true);
        return;
      };
      const findUserEmail = getUsers?.filter(user => user.email.toLowerCase() === form.email.toLowerCase());
      const findUserName = getUsers?.filter(user => user.name.toLowerCase() === form.name.toLowerCase());

      if (findUserEmail?.length > 0) {
        setEmailErr("This email is already in the users list.")
      } else {
        setAddedUserError({ ...addedUserError, "email": "" })
      }
      if (findUserName?.length > 0) {
        setAddedUserError({ ...addedUserError, "name": "This name has already been taken for a user." })
      } else {
        setAddedUserError({ ...addedUserError, "name": "" })
      }

      if (findUserEmail?.length > 0 || findUserName?.length > 0) {
        return;
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
      setUserExists(false);
      setOpenAddModal(false);
      setOpenMobileAddModal(false)
    }
  };

  const handleUpdateUser = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {

      const FilterUsers = getUsers?.filter(user => user.name !== updateUser.name)
      const findUser = FilterUsers?.find(user => user.name.toLowerCase() === form.name.toLowerCase());

      if (findUser?.name) {
        setAddedUserError({ ...addedUserError, "name": "This name has already been taken for a user." })
        return
      }

      const QUERY_UPDATEUSER = {
        query: `mutation MyMutation {
           updateHospitalUser (
                    email: "${form.email}",
                    name: "${form.name}",
                    huID: ${Number(updateUser.huID)},
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
        .finally((e) => console.log("adding new user to database"));

      form.email = "";
      form.name = "";
      form.accessJobPosting = false;
      form.accessResumeDatabase = false;
      setErrInput("");
      setAddedUserError({ ...addedUserError, name: "" })
      setOpenUpdateModal(false);
      setOpenMobileUpdateModal(false)
    }
  };

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
        .then((datas) => setUpdateList(!updateList))
        .finally((e) => console.log("Deleting hospital user from database"));
    } else {
      console.log("You don't want to delete this!");
    }
  };

  const MobileDeleteHandler = () => {

    if (window.confirm("Are you sure you want to delete?")) {
      const QUERY_DELETEUSER = {
        query: `mutation MyMutation {
             deleteHospitalUser (huID: ${mobileUserData.huID}) {
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
        .then((datas) => setUpdateList(!updateList))
        .finally((e) => console.log("Deleting hospital user from database"));
    } else {
      console.log("You don't want to delete this!");
    }
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // useEffect(() => {
  //   if (form.searchUser.length === 0) {
  //     searchResults = getUsers;
  //   }
  //   getUsers?.forEach(user => {
  //     if (user?.email?.includes(`${form.searchUser}`)) {
  //       if (!searchResults?.some(res => res.email === user.email)) {
  //         searchResults.push(user);
  //       }
  //   console.log(user)
  //     }
  //   });
  //   let user = getUsers?.find(res => res.email === form.searchUser)
  //   let user = getUsers?.find(res => {
  //     if(res.email.includes(form.searchUser)){
  //       return res;
  //     }
  //   })
  //   console.log(user);
  //   console.log(searchResults);
  // }, [form.searchUser])dala

  if(!isLoading) {
  return (
    <Box>
      {/* --------For Learge device-------- */}
      <Box maxWidth="md" sx={{ mb: 8, mx: "auto", display: { xs: "none", md: "block" } }}>
        {accessToPostJob?.accessJobPosting ? (
          <Box>
            <Box sx={{ marginTop: "15px", marginBottom: "20px" }}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" sx={{ color: "var(--clr-blue-footer)" }} />}
                aria-label="breadcrumb"
                sx={{ marginTop: "15px" }}
              >
                <Link underline="hover" style={{ color: "var(--clr-blue-footer)" }} to="/hospital-dashboard">
                  Dashboard
                </Link>
                <Typography sx={{ color: "var(--clr-blue-footer)" }}>
                  Manage user
                </Typography>
              </Breadcrumbs>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
                mb: 2,
              }}
              style={{ marginBottom: "30px" }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  color: "var(--clr-blue-footer)",
                  fontWeight: "600 !important",
                }}
              >
                Manage user
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack direction="row" spacing={3}>
                  <Input
                    sx={{
                      padding: "5px 10px 5px 25px  !important",
                      borderRadius: 16,
                    }}
                    disableUnderline
                    type="text"
                    name="searchUser"
                    value={form.searchUser}
                    onChange={formValueChange}
                    placeholder="Search"
                    endAdornment={
                      <InputAdornment
                        position="end"
                        style={{ outline: "none" }}
                      >
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                        >
                          {values.searchUser}
                          <SearchIcon
                            sx={{ color: "var(--clr-blue-primary)" }}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Search User"
                  />
                  <Box>
                    <Button
                      variant="contained"
                      size="large"
                      className={classes.adduserbutton}
                      onClick={hanldeOpenAddModal}
                    >
                      Add User
                    </Button>
                    <Modal
                      // hideBackdrop
                      open={openAddModal}
                      onClose={hanldeCloseAddModal}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={ModalStyle}>
                        <Box sx={{ display: "flex", flexDirection: "column", borderRadius: 1 }}>
                          <Typography
                            variant="h5"
                            component="div"
                            sx={{
                              color: "var(--clr-blue-footer)",
                              fontWeight: "600 !important",
                            }}
                          >
                            Add User
                          </Typography>
                          <Grid container spacing={2.5}>
                            <Grid
                              item
                              xs={12}
                              md={12}
                              sx={{ mt: 2 }}
                            >
                              <Box>
                                <InputLabel sx={{py: 0.5}}>Email Address <span style={{color: "red"}}>*</span></InputLabel>
                                <TextField
                                  variant="outlined"
                                  disableUnderline
                                  fullWidth
                                  name="email"
                                  type="email"
                                  placeholder="Enter Email Address"
                                  error={form.email === "" && errInput}
                                  value={form.email}
                                  onChange={formValueChange}
                                  onKeyDown={handleCreateUser}
                                  sx={{ padding: "2px 0px !important", borderRadius: 1 }}
                                  InputProps={{
                                    sx: {
                                      ".MuiOutlinedInput-input": {
                                        padding: "10.5px 14px",
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
                                />
                                {(form.email === "" || addedUserError !== "") && (
                                  <FormHelperText sx={{ color: "red", mt: 0 }}>
                                    {errInput && errInput}
                                    {emailErr && emailErr}
                                  </FormHelperText>
                                )}
                              </Box>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={12}
                              sx={{ mb: 2 }}
                            >
                              <Box>
                                <InputLabel sx={{py: 0.5}}>Full Name <span style={{color: "red"}}>*</span></InputLabel>
                                <TextField
                                  variant="outlined"
                                  disableUnderline
                                  fullWidth
                                  name="name"
                                  type="text"
                                  placeholder="Enter Full Name"
                                  error={form.name === "" && errInput}
                                  value={form.name}
                                  onChange={formValueChange}
                                  onKeyDown={handleCreateUser}
                                  sx={{ padding: "2px 0px !important", borderRadius: 1 }}
                                  InputProps={{
                                    sx: {
                                      ".MuiOutlinedInput-input": {
                                        padding: "10.5px 14px",
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
                                />
                                {(form.name === "" || addedUserError !== "") && (
                                  <FormHelperText sx={{ color: "red", mt: 0 }}>
                                    {errInput && errInput}
                                    {addedUserError.name && addedUserError.name}
                                  </FormHelperText>
                                )}
                              </Box>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={12}
                            >
                              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                <Typography sx={{ fontSize: "14px", color: "var(--clr-gray-1)" }}>
                                  Please select the permission
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    color: "#333333",
                                    width: "322px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    name="accessJobPosting"
                                    checked={accessJobPosting}
                                    onChange={(e) => handleChangeCheckbox(e)}
                                    onKeyDown={handleCreateUser}
                                    sx={{
                                      color: "#BDBDBD !important",
                                      "&.Mui-checked": {
                                        color: "var(--clr-blue-primary) !important",
                                      },
                                    }}
                                  />
                                  &nbsp;
                                  <b style={{ fontWeight: 500, color: "var(--clr-blue-footer)" }}>
                                    Access to Job Posting
                                  </b>
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    color: "#333333",
                                    width: "322px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    name="accessResumeDatabase"
                                    checked={accessResumeDatabase}
                                    onChange={(e) => handleChangeCheckbox(e)}
                                    onKeyDown={handleCreateUser}
                                    sx={{
                                      color: "#BDBDBD !important",
                                      "&.Mui-checked": {
                                        color: "var(--clr-blue-primary) !important",
                                      },
                                    }}
                                  />
                                  &nbsp;
                                  <b style={{ fontWeight: 500, color: "var(--clr-blue-footer)" }}>
                                    Access to Resume Database
                                  </b>
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              md={12}
                              justifyContent="flex-end"
                              sx={{ display: "grid" }}
                            >
                              <CardActions className="resume-actions">
                                <Button
                                  variant="outlined"
                                  className={classes.cancelbutton}
                                  onClick={hanldeCloseAddModal}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="contained"
                                  className={classes.adduserbutton}
                                  onClick={(event) => handleCreateUser(event, "onClick")}
                                >
                                  Add User
                                </Button>
                              </CardActions>
                            </Grid>
                          </Grid>
                        </Box>

                      </Box>

                    </Modal>
                    {userExists && (
                      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" >
                          An account with the given email already exists. Try another!
                        </Alert>
                      </Snackbar>
                    )}
                  </Box>
                </Stack>
              </Box>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)" }}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "var(--clr-blue-light)" }}>
                    <TableCell style={{ color: "var(--clr-blue-footer)", fontWeight: 600 }}>
                      {/* <Checkbox sx={{
                          color: "#BDBDBD !important",
                          "&.Mui-checked": {
                            color: "var(--clr-blue-primary) !important",
                          },
                        }} /> */}    Sub Users
                    </TableCell>

                    <TableCell align="center" style={{ color: "var(--clr-blue-footer)", fontWeight: 600 }}>Name </TableCell>
                    <TableCell align="center" style={{ color: "var(--clr-blue-footer)", fontWeight: 600 }}>Signed In</TableCell>
                    <TableCell align="center" style={{ color: "var(--clr-blue-footer)", fontWeight: 600 }}>Job Posting</TableCell>
                    <TableCell align="center" style={{ color: "var(--clr-blue-footer)", fontWeight: 600 }}>Resume Database</TableCell>
                    <TableCell align="center" style={{ color: "var(--clr-blue-footer)", fontWeight: 600 }}> Actions </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getUsers?.filter(user => {
                    if (form?.searchUser === "") {
                      return user;
                    } else if (user?.email?.toLowerCase()?.includes(form?.searchUser?.toLowerCase())) {
                      return user;
                    } else if (user?.name?.toLowerCase()?.includes(form?.searchUser?.toLowerCase())) {
                      return user;
                    }
                  })
                    ?.slice((page > 0 ? page - 1 : page) * 10, (page > 0 ? page - 1 : page) * 10 + 10)
                    ?.map((row, index) => (
                      <TableRow
                        key={index}
                        className={classes.tablebodyrow}
                        style={{ padding: "0px", margin: "0px" }}
                      >
                        <TableCell component="th" scope="row" style={{ color: "var(--clr-blue-footer)", fontWeight: 600 }}>
                          {/* <Checkbox sx={{
                              color: "#BDBDBD !important",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary) !important",
                              },
                            }} /> */}  {row.email}
                        </TableCell>
                        <TableCell
                          align="center"
                          component="th" style={{ color: "var(--clr-blue-footer)", fontWeight: 600 }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{ padding: "0px", margin: "0px" }}
                        >
                          {row.status === "Active" && (
                            <CheckCircleTwoToneIcon
                              sx={{ color: "var(--clr-green-3)" }}
                            />
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: "var(--clr-blue-footer)", fontWeight: 600 }}
                        >
                          {row.accessJobPosting && (
                            <CheckCircleTwoToneIcon
                              sx={{ color: "var(--clr-green-3)" }}
                            />
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ padding: "0px", margin: "0px" }}
                        >
                          {row.accessResumeDB && (
                            <CheckCircleTwoToneIcon
                              sx={{ color: "var(--clr-green-3)" }}
                            />
                          )}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            margin: "0px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <div>
                            <Tooltip title="Edit">
                              <Button
                                onClick={() => handleOpenUpdateModal(row.huID, row)}
                              >
                                <Edit
                                  style={{
                                    color: "var(--clr-blue-primary)",
                                  }}
                                />
                              </Button>
                            </Tooltip>

                            <Modal
                              open={openUpdateModal}
                              onClose={handleCloseUpdateModal}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={ModalStyle}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column", borderRadius: 1
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                      color: "var(--clr-blue-footer)",
                                      fontWeight: "600 !important",
                                    }}
                                  >
                                    Update User
                                  </Typography>
                                  <Grid container spacing={2.5}>
                                    <Grid
                                      item
                                      xs={12}
                                      md={12}
                                      sx={{ mt: 2 }}
                                    >
                                      <Box>
                                        <InputLabel sx={{py: 0.5}}>Email Address <span style={{color: "red"}}>*</span></InputLabel>
                                        <Input
                                          variant="outlined"
                                          disableUnderline
                                          fullWidth
                                          name="email"
                                          type="email"
                                          defaultValue={updateUser?.email}
                                          // placeholder={`${updateUser?.email}`}
                                          // error={form.email === "" && errInput}
                                          // value={form?.email}
                                          disabled
                                          onChange={formValueChange}
                                          sx={{ backgroundColor: "#ffffff", py: 0.5, px: 2, borderRadius: 1 }}
                                        />
                                        {/* {form.email === "" && (
                                            <FormHelperText
                                              sx={{ color: "red", mt: 0 }}
                                            >
                                              {errInput}
                                            </FormHelperText>
                                          )} */}
                                      </Box>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      md={12}
                                      sx={{ mb: 2 }}
                                    >
                                      <Box>
                                        <InputLabel sx={{py: 0.5}}>Full Name <span style={{color: "red"}}>*</span></InputLabel>
                                        <TextField
                                          variant="outlined"
                                          disableUnderline
                                          fullWidth
                                          name="name"
                                          type="text"
                                          placeholder={
                                            updateUser?.name === ""
                                              ? `${" "} Enter Full Name`
                                              : `${" "} ${updateUser.name}`
                                          }
                                          // error={form.name === "" && errInput}
                                          defaultValue={updateUser?.name}
                                          onChange={formValueChange}
                                          onKeyDown={handleUpdateUser}
                                          sx={{ backgroundColor: "#ffffff", padding: "2px 0px !important", borderRadius: 1 }}
                                          InputProps={{
                                            sx: {
                                              ".MuiOutlinedInput-input": {
                                                padding: "10.5px 14px",
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
                                        />
                                        {(form.name === " " || addedUserError.name) && (
                                          <FormHelperText
                                            sx={{ color: "red", mt: 0 }}
                                          >
                                            {/* {errInput} */}
                                            {addedUserError?.name}
                                          </FormHelperText>
                                        )}
                                      </Box>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      md={12}
                                    >
                                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                        <Typography sx={{ fontSize: "14px", color: "var(--clr-gray-1)" }}>
                                          Please select the permission
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontSize: "16px",
                                            color: "#333333",
                                            width: "322px",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Checkbox
                                            name="accessJobPosting"
                                            defaultChecked={updateUser.accessJobPosting}
                                            onChange={(e) => handleChangeCheckbox(e)}
                                            onKeyDown={handleUpdateUser}
                                            sx={{
                                              ml: -1,
                                              color: "#BDBDBD !important",
                                              "&.Mui-checked": {
                                                color: "var(--clr-blue-primary) !important",
                                              },
                                            }}
                                          />
                                          &nbsp;
                                          <b style={{ fontWeight: 500, color: "var(--clr-blue-footer)" }}>
                                            Access to Job Posting
                                          </b>
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontSize: "16px",
                                            color: "#333333",
                                            width: "322px",
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Checkbox
                                            name="accessResumeDatabase"
                                            defaultChecked={updateUser.accessResumeDB}
                                            onChange={(e) => handleChangeCheckbox(e)}
                                            onKeyDown={handleUpdateUser}
                                            sx={{
                                              ml: -1,
                                              color: "#BDBDBD !important",
                                              "&.Mui-checked": {
                                                color: "var(--clr-blue-primary) !important",
                                              },
                                            }}
                                          />
                                          &nbsp;
                                          <b style={{ fontWeight: 500, color: "var(--clr-blue-footer)" }}>
                                            Access to Resume Database
                                          </b>
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      md={12}
                                      justifyContent="flex-end"
                                      sx={{ display: "grid" }}
                                    >
                                      <CardActions className="resume-actions">
                                        <Button
                                          variant="outlined"
                                          className={classes.cancelbutton}
                                          onClick={handleCloseUpdateModal}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          variant="contained"
                                          className={classes.adduserbutton}
                                          onClick={(event) =>
                                            handleUpdateUser(event, "onClick")
                                          }
                                        >
                                          Update User
                                        </Button>
                                      </CardActions>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </Box>
                            </Modal>
                          </div>
                          <Tooltip title="Delete">
                            <Button
                              aria-label="edit"
                              onClick={() => hanldeDeleteUser(row.huID)}
                            >
                              <DeleteIcon style={{ color: "var(--clr-blue-primary)" }} />
                            </Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", my: "19px", pr: 2 }}>
                <Pagination
                  style={{}}
                  count={Math.ceil(getUsers?.filter(user => {
                    if (form?.searchUser === "") {
                      return user;
                    } else if (user?.email?.toLowerCase()?.includes(form?.searchUser?.toLowerCase())) {
                      return user;
                    } else if (user?.name?.toLowerCase()?.includes(form?.searchUser?.toLowerCase())) {
                      return user;
                    }
                  })?.length / 10)}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage} />
              </Box>
            </TableContainer>

          </Box>
        ) : (<>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
              This user does not have sufficient privileges for this page. Please
              contact your administrator.
            </Alert>
          </Snackbar>

        </>
        )}
      </Box>

      {/* --------For Small device-------- */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" }}>
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center", lineHeight: "24px", fontWeight: "600", color: "var(--clr-blue-footer)" }}> <ArrowBackIosIcon onClick={() => {
            navigate("/hospital-dashboard")
          }} /> Manage User</Typography>
        </Box>
        <Box sx={{ paddingTop: "20px", mb: 10, }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              px: "25px"
            }}
          >
            <Stack direction="column" spacing={3}>
              <Input
                sx={{
                  padding: "5px 10px 5px 25px  !important",
                  borderRadius: 16,
                  width: "95vw",
                  mx: "auto"
                }}
                disableUnderline
                type="text"
                name="searchUser"
                value={form.searchUser}
                onChange={formValueChange}
                placeholder="Search"
                endAdornment={
                  <InputAdornment
                    position="end"
                    style={{ outline: "none" }}
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {values.searchUser}
                      <SearchIcon
                        sx={{ color: "var(--clr-blue-primary)" }}
                      />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search User"
              />
              <Box>
                <Button
                  variant="contained"
                  size="large"
                  className={classes.adduserbutton}
                  onClick={handleOpenMobileModal}
                  sx={{
                    width: "95vw",
                    mx: "auto", fontSize: "14px"
                  }}
                >
                  Add User
                </Button>
                <Modal
                  // hideBackdrop
                  open={openMobileAddModal}
                  onClose={hanldeCloseAddModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={{...ModalStyleMini, width: "85vw" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", borderRadius: 1 }}>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          color: "var(--clr-blue-footer)",
                          fontWeight: "600 !important",
                        }}
                      >
                        Add User
                      </Typography>
                      <Grid container spacing={2.5}>
                        <Grid
                          item
                          xs={12}
                          md={12}
                          sx={{ mt: 2 }}
                        >
                          <Box>
                            <InputLabel sx={{py: 0.5}}>Email Address <span style={{color: "red"}}>*</span></InputLabel>
                            <TextField
                              variant="outlined"
                              disableUnderline
                              fullWidth
                              name="email"
                              type="email"
                              placeholder="Enter Email Address"
                              error={form.email === "" && errInput}
                              value={form.email}
                              onChange={formValueChange}
                              onKeyDown={handleCreateUser}
                              sx={{ padding: "2px 0px !important", borderRadius: 1 }}
                              InputProps={{
                                sx: {
                                  ".MuiOutlinedInput-input": {
                                    padding: "10.5px 14px",
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
                            {(form.email === "" || addedUserError !== "") && (
                              <FormHelperText sx={{ color: "red", mt: 0 }}>
                                {errInput && errInput}
                                {emailErr && emailErr}
                              </FormHelperText>
                            )}
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={12}
                          sx={{ mb: 2 }}
                        >
                          <Box>
                            <InputLabel sx={{py: 0.5}}>Full Name <span style={{color: "red"}}>*</span></InputLabel>
                            <TextField
                              variant="outlined"
                              disableUnderline
                              fullWidth
                              name="name"
                              type="text"
                              placeholder="Enter Full Name"
                              error={form.name === "" && errInput}
                              value={form.name}
                              onChange={formValueChange}
                              onKeyDown={handleCreateUser}
                              sx={{ padding: "2px 0px !important", borderRadius: 1 }}
                              InputProps={{
                                sx: {
                                  ".MuiOutlinedInput-input": {
                                    padding: "10.5px 14px",
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
                            {(form.name === "" || addedUserError !== "") && (
                              <FormHelperText sx={{ color: "red", mt: 0 }}>
                                {errInput && errInput}
                                {addedUserError.name && addedUserError.name}
                              </FormHelperText>
                            )}
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={12}
                        >
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                            <Typography sx={{ fontSize: "14px", color: "var(--clr-gray-1)" }}>
                              Please select the permission
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                color: "#333333",
                                width: "322px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Checkbox
                                name="accessJobPosting"
                                checked={accessJobPosting}
                                onChange={(e) => handleChangeCheckbox(e)}
                                onKeyDown={handleCreateUser}
                                sx={{
                                  color: "#BDBDBD !important",
                                  "&.Mui-checked": {
                                    color: "var(--clr-blue-primary) !important",
                                  },
                                }}
                              />
                              &nbsp;
                              <b style={{ fontWeight: 500, color: "var(--clr-blue-footer)" }}>
                                Access to Job Posting
                              </b>
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "16px",
                                color: "#333333",
                                width: "322px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Checkbox
                                name="accessResumeDatabase"
                                checked={accessResumeDatabase}
                                onChange={(e) => handleChangeCheckbox(e)}
                                onKeyDown={handleCreateUser}
                                sx={{
                                  color: "#BDBDBD !important",
                                  "&.Mui-checked": {
                                    color: "var(--clr-blue-primary) !important",
                                  },
                                }}
                              />
                              &nbsp;
                              <b style={{ fontWeight: 500, color: "var(--clr-blue-footer)" }}>
                                Access to Resume Database
                              </b>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={12}
                          justifyContent="flex-end"
                          sx={{ display: "grid" }}
                        >
                          <CardActions className="resume-actions">
                            <Button
                              variant="outlined"
                              className={classes.cancelbutton}
                              onClick={hanldeCloseAddModal} 
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              className={classes.adduserbutton}
                              onClick={(event) => handleCreateUser(event, "onClick")}
                            >
                              Add User
                            </Button>
                          </CardActions>
                        </Grid>
                      </Grid>
                    </Box>

                  </Box>

                </Modal>
                {userExists && (
                  <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" >
                      An account with the given email already exists. Try another!
                    </Alert>
                  </Snackbar>
                )}
              </Box>
            </Stack>
          </Box>

          <Box sx={{ width: "100vw", mx: "auto", mt: "20px" }}>
            {
              getUsers?.filter(user => {
                if (form?.searchUser === "") {
                  return user;
                } else if (user?.email?.toLowerCase()?.includes(form?.searchUser?.toLowerCase())) {
                  return user;
                } else if (user?.name?.toLowerCase()?.includes(form?.searchUser?.toLowerCase())) {
                  return user;
                }
              })?.slice((page > 0 ? page - 1 : page) * 10, (page > 0 ? page - 1 : page) * 10 + 10)
                ?.map((mapuser, index) => (
                  <Card key={index} variant="outlined" sx={{ width: "95vw", mx: "auto", marginTop: "15px" }}>
                    <CardHeader
                      sx={{ paddingBottom: "0px !important", paddingTop: "10px !important" }}
                      avatar={<Typography sx={{ fontSize: "14px !important", color: "var(--clr-blue-footer)", fontWeight: "600" }}>{mapuser?.name}</Typography>}
                      action={
                        <Box>
                          <IconButton
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(event) => {
                              handleClick(event)
                              setMobileUserData(mapuser)
                            }}
                            sx={{ mr: -1 }}
                            aria-label="settings">
                            <MoreVertIcon sx={{ color: "var(--clr-blue-footer)" }} />
                          </IconButton>
                        </Box>
                      }
                    />

                    <CardContent sx={{ paddingTop: "0px !important", display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingBottom: "10px !important" }}>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography sx={{ color: "#C7D3E3", fontSize: "12px", paddingBottom: "10px" }}>Job Posting</Typography>
                        {
                          mapuser?.accessJobPosting && (<CheckCircleTwoToneIcon sx={{ color: "var(--clr-green-3)" }} />)
                        }

                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography sx={{ color: "#C7D3E3", fontSize: "12px", paddingBottom: "10px" }}>Resume Database</Typography>
                        {
                          mapuser?.accessResumeDB && (<CheckCircleTwoToneIcon sx={{ color: "var(--clr-green-3)" }} />)
                        }
                      </Box>
                    </CardContent>
                  </Card>
                ))
            }
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={opens}
              onClose={ManuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            > 
                <Typography 
                sx={{ color: "var(--clr-blue-footer)", fontSize: "14px", paddingLeft: "10px", paddingRight: "10px", mb: "10px !important" }}
                onClick={() => {
                  handleOpenMobileUpdateModal()
                  ManuClose()
                }}
                >
                  Edit
                </Typography> 
                <Typography
                  sx={{ color: "var(--clr-blue-footer)", fontSize: "14px", paddingLeft: "10px", paddingRight: "10px" }}
                  onClick={() => {
                    MobileDeleteHandler()
                    ManuClose()
                  }}
                >
                  Delete
                </Typography>   
            </Menu>
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", my: "19px", pr: 2 }}>
              <Pagination
                style={{}}
                count={Math.ceil(getUsers?.filter(user => {
                  if (form?.searchUser === "") {
                    return user;
                  } else if (user?.email?.toLowerCase()?.includes(form?.searchUser?.toLowerCase())) {
                    return user;
                  } else if (user?.name?.toLowerCase()?.includes(form?.searchUser?.toLowerCase())) {
                    return user;
                  }
                })?.length / 10)}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage} />
            </Box>
            <Modal
              open={openMobileUpdateModal}
              onClose={handleCloseUpdateModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{...ModalStyleMini, width: "85vw" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column", borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      color: "var(--clr-blue-footer)",
                      fontWeight: "600 !important",
                    }}
                  >
                    Update User
                  </Typography>
                  <Grid container spacing={2.5}>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{ mt: 2 }}
                    >
                      <Box>
                        <InputLabel sx={{py: 0.5}}>Email Address <span style={{color: "red"}}>*</span></InputLabel>
                        <Input
                          variant="outlined"
                          disableUnderline
                          fullWidth
                          name="email"
                          type="email"
                          defaultValue={updateUser?.email}
                          // placeholder={`${updateUser?.email}`}
                          // error={form.email === "" && errInput}
                          // value={form?.email}
                          disabled
                          onChange={formValueChange}
                          sx={{ backgroundColor: "#ffffff", py: 0.5, px: 2, borderRadius: 1 }}
                        />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{ mb: 2 }}
                    >
                      <Box>
                        <InputLabel sx={{py: 0.5}}>Full Name <span style={{color: "red"}}>*</span></InputLabel>
                        <TextField
                          variant="outlined"
                          disableUnderline
                          fullWidth
                          name="name"
                          type="text"
                          placeholder={
                            updateUser?.name === ""
                              ? `${" "} Enter Full Name`
                              : `${" "} ${updateUser.name}`
                          }
                          // error={form.name === "" && errInput}
                          defaultValue={updateUser?.name}
                          onChange={formValueChange}
                          onKeyDown={handleUpdateUser}
                          sx={{ backgroundColor: "#ffffff", padding: "2px 0px !important", borderRadius: 1 }}
                          InputProps={{
                            sx: {
                              ".MuiOutlinedInput-input": {
                                padding: "10.5px 14px",
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
                        {(form.name === " " || addedUserError.name) && (
                          <FormHelperText
                            sx={{ color: "red", mt: 0 }}
                          >
                            {/* {errInput} */}
                            {addedUserError.name}
                          </FormHelperText>
                        )}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                    >
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                        <Typography sx={{ fontSize: "14px", color: "var(--clr-gray-1)" }}>
                          Please select the permission
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: "#333333",
                            width: "322px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            name="accessJobPosting"
                            defaultChecked={updateUser.accessJobPosting}
                            onChange={(e) => handleChangeCheckbox(e)}
                            onKeyDown={handleUpdateUser}
                            sx={{
                              ml: -1,
                              color: "#BDBDBD !important",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary) !important",
                              },
                            }}
                          />
                          &nbsp;
                          <b style={{ fontWeight: 500, color: "var(--clr-blue-footer)" }}>
                            Access to Job Posting
                          </b>
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: "#333333",
                            width: "322px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            name="accessResumeDatabase"
                            defaultChecked={updateUser.accessResumeDB}
                            onChange={(e) => handleChangeCheckbox(e)}
                            onKeyDown={handleUpdateUser}
                            sx={{
                              ml: -1,
                              color: "#BDBDBD !important",
                              "&.Mui-checked": {
                                color: "var(--clr-blue-primary) !important",
                              },
                            }}
                          />
                          &nbsp;
                          <b style={{ fontWeight: 500, color: "var(--clr-blue-footer)" }}>
                            Access to Resume Database
                          </b>
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      justifyContent="flex-end"
                      sx={{ display: "grid" }}
                    >
                      <CardActions className="resume-actions">
                        <Button
                          variant="outlined"
                          className={classes.cancelbutton}
                          onClick={handleCloseUpdateModal} 
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          className={classes.adduserbutton}
                          onClick={(event) =>
                            handleUpdateUser(event, "onClick")
                          }
                        >
                          Update User
                        </Button>
                      </CardActions>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Modal>
          </Box>
        </Box>
        {userExists && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" >
              An account with the given email already exists. Try another!
            </Alert>
          </Snackbar>
        )}
      </Box>

    </Box>
  );
} 
else {
  return (
    <Box>
      <UserListSkeleton />
    </Box>
  );
}
  
}
