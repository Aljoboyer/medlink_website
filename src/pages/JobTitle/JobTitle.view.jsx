import { makeStyles } from "@material-ui/core/styles";
// import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box, Breadcrumbs, Checkbox, /* IconButton, Menu, MenuItem, */ Pagination, Skeleton, Typography, useMediaQuery
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import { createTheme, useTheme } from "@mui/material/styles";
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { gqlquery } from "../../api/hospitalIndex.js";
import useAuth from "../../hooks/useAuth";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

// AccessJob posting
export const ShowForAccessJobPosting = (props) => {
  const { getUserRole, permitUser, isLoading } = useAuth();

  useEffect(() => {
    getUserRole();
  }, [])

  if (!isLoading) {
    return permitUser?.accessJobPosting || permitUser?.adminUser ? props.children : <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Fix-Access-Denied-Folder-Featured.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5" style={{ width: "100%", height: "auto" }} alt="Accecss_denied" />;
  }
  else {
    return (
      <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
        <Box style={{ marginTop: "15px", marginBottom: "30px" }}>
          <Skeleton variant="text" animation="wave" width="40%" height={30} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Skeleton variant="text" animation="wave" width="40%" height={50} />
          <Skeleton variant="text" animation="wave" width="15%" height={60} />
        </Box>
        <Grid container spacing={3} sx={{ py: 3 }}>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" width="90%" height={30} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" width="90%" height={30} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" width="90%" height={30} />
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" width="90%" height={30} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" width="90%" height={30} />
          </Grid>
          <Grid item xs={3}>
            <Skeleton variant="text" animation="wave" width="90%" height={30} />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
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


const theme = createTheme();
const useStyles = makeStyles({
  pageTitle: {
    fontWeight: "600 !important",
    color: "var(--clr-blue-footer)",
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
    fontWeight: "600",
  },
  tableTitleTextSm: {
    color: "var(--clr-blue-footer)",
    fontSize: "12px",
    fontWeight: "600"
  },
  dummyButton: {
    backgroundColor: "var(--clr-blue-light) !important",
    borderRadius: "50px",
    color: "var(--clr-blue-footer) !important",
    fontWeight: "600",
    padding: "4px 12px !important",
  },
  filterButton: {
    backgroundColor: "var(--clr-blue-light) !important",
    borderRadius: "50px",
    color: "var(--clr-blue-footer) !important",
    fontWeight: "600",
    padding: "4px 16px !important",
    "&:hover": {
      backgroundColor: "var(--clr-blue-light) !important"
    }
  },
  createMenu: {
    marginTop: "45px",
    boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
    borderRadius: "6px",
  },
  manuItem: {
    color: "var(--clr-blue-footer) !important",
    padding: "7px 15px",
    margin: "0px",
    borderRadius: "none !important",
  },
  detailsText: {
    color: "var(--clr-gray-2)",
    fontSize: "14px",
    fontWeight: "400",
  },

  manageuser: {
    color: "#333333",
    fontSize: "24px",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  },
  searchuser: {
    width: "235px",
    backgroundColor: "#E0E0E0",
    border: "none",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
    },
  },
  adduserbutton: {
    backgroundColor: "#4F4F4F",
    color: "white",
  },
  actionbutton: {
    color: "black",
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


function FormRow({ minimumSalary, maximumSalary, experience, vacancyType, qualification, jobLocation, jobID }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={6} md={3}>
        <Typography
          className={classes.detailsText}
        >
          Job ID: {jobID}
        </Typography>
      </Grid>
      <Grid item xs={6} md={3}>
        <Typography
          className={classes.detailsText}
        >
          Location: {jobLocation}
        </Typography>
      </Grid>
      <Grid item xs={6} md={3}>
        <Typography
          className={classes.detailsText}
        >
          Salary: {minimumSalary}k - {maximumSalary}k
        </Typography>
      </Grid>
      <Grid item sx={{ display: { xs: "none", md: "block" } }} md={3}></Grid>
      <Grid item xs={6} md={3}>
        <Typography
          className={classes.detailsText}
        >
          Experience: {experience} Years
        </Typography>
      </Grid>
      <Grid item xs={6} md={3}>
        <Typography
          className={classes.detailsText}
        >
          Type: {vacancyType}
        </Typography>
      </Grid>
      <Grid item xs={6} md={3}>
        <Typography
          className={classes.detailsText}
        >
          Qualification: {qualification}
        </Typography>
      </Grid>
      <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Box style={{ textAlign: "right" }}>
          {/* <Button className={classes.filterButton} variant="contained" ><FilterAltTwoToneIcon sx={{ color: "var(--clr-blue-footer)" }} /> &nbsp; Filter</Button> */}
        </Box>
      </Grid>
    </React.Fragment>
  );
}

function NestedGrid({ minimumSalary, maximumSalary, experience, vacancyType, qualification, jobLocation, jobID }) {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: "20px" }}>
      <Grid container spacing={1}>
        <Grid container item alignItems="center" spacing={1}>
          <FormRow
            minimumSalary={minimumSalary}
            maximumSalary={maximumSalary}
            experience={experience}
            vacancyType={vacancyType}
            qualification={qualification}
            jobLocation={jobLocation}
            jobID={jobID}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

// const options = ["None", "Atria", "Callisto"];


export default function JobTitle(props) {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [applicantsList, setApplicantsList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const { vacancyID } = useParams();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, page]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { jobTitle, minimumSalary, maximumSalary, experience, vacancyType, qualification, } = location?.state?.vacancy;
  const jobLocation = location?.state?.vacancy?.location;
  useEffect(() => {
    const QUERY_GETAPPLICANTSLISTBYJOB = {
      query: `query MyQuery {
          getApplicantsListByJob(vacancyID: ${Number(vacancyID)}) 
                     {
                      appliedAt
                      jaID
                      name
                      vacancyID     
                      userID                 
                    }
                  }
                `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_GETAPPLICANTSLISTBYJOB, null)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApplicantsList(data?.data?.getApplicantsListByJob)
      });
  }, []);

  const handleNavigateToApplicants = async (id) => {
    const QUERY_GETCONTACTDETAILS = {
      query: `query MyQuery {
        getContactDetails(candidateID: "${id}") {
          candidateID
          email
          phone
          phoneVerified
          profilePicURL
        }
      }`
    };

    gqlquery(QUERY_GETCONTACTDETAILS, null)
      .then((res) => res.json())
      .then(data => {
        console.log(data)
        navigate(`/applicants-detail/${id}`, { state: { data: data?.data?.getContactDetails, vacancyID: vacancyID, jobTitle: jobTitle, from: location.pathname } });
      })
      .finally(() => console.log(false))
  }

  return (
    <ShowForAccessJobPosting>
      <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
        {!matches ? (
          <Box style={{ marginTop: "15px", marginBottom: "30px" }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" sx={{ color: "var(--clr-blue-footer)" }} />}
              aria-label="breadcrumb"
              sx={{ marginTop: "15px" }}
              style={{ marginBottom: "30px" }}
            >
              <Link underline="hover" style={{ color: "var(--clr-blue-footer)" }} to="/hospital-dashboard">
                Dashboard
              </Link>
              <Link underline="hover" style={{ color: "var(--clr-blue-footer)" }} to="/manage-jobs-and-responses">
                Manage Job & Responses
              </Link>
              <Typography sx={{ color: "var(--clr-blue-footer)" }}>
                {jobTitle}
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : (
          <Box sx={{ p: 2, mb: 1, display: "flex", gap: 1.5, alignItems: "center", backgroundColor: "var(--clr-blue-light)" }}>
            <NavigateBeforeIcon sx={{ fontSize: "2rem", color: "var(--clr-blue-footer)" }} />
            <Typography variant="subtitle1" sx={{ color: "var(--clr-blue-footer)", fontSize: "16px", fontWeight: "600" }}>{jobTitle}</Typography>
          </Box>
        )}
        <Box sx={{ px: { xs: 2, md: 0 } }}>
          <Box style={{ marginTop: "15px", marginBottom: "15px" }}>
            <Box sx={{ display: { xs: "flex", md: "block" }, justifyContent: "space-between", alignItems: "center" }}>
              <Typography
                variant="h5"
                className={classes.pageTitle}
                sx={{ fontSize: { xs: "18px", md: "24px" } }}
              >
                {jobTitle}
              </Typography>
              <Box sx={{ textAlign: "right", display: { xs: "block", md: "none" } }}>
                {/* <Button className={classes.filterButton} variant="contained" ><FilterAltTwoToneIcon sx={{ color: "var(--clr-blue-footer)" }} />&nbsp;&nbsp;Filter</Button> */}
              </Box>
            </Box>
            <NestedGrid
              minimumSalary={minimumSalary}
              maximumSalary={maximumSalary}
              experience={experience}
              vacancyType={vacancyType}
              qualification={qualification}
              jobLocation={jobLocation}
              jobID={vacancyID}
            />
          </Box>
          {!matches ? (
            <TableContainer className={classes.tableContainer} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow
                    style={{
                      backgroundColor: "var(--clr-blue-light)"
                    }}
                  >
                    <TableCell className={classes.tableTitleText}>
                      <Checkbox sx={{
                        color: "var(--clr-blue-footer) !important",
                        "&.Mui-checked": {
                          color: "var(--clr-blue-footer) !important",
                        },
                      }} /> &nbsp; Name
                    </TableCell>
                    <TableCell align="center" className={classes.tableTitleText}>
                      Status
                    </TableCell>
                    <TableCell align="center" className={classes.tableTitleText}>
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applicantsList
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
                          sx={{
                            display: 'flex', alignItems: "center",
                          }}
                        >
                          <Checkbox sx={{
                            color: "#C7D3E3 !important",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary) !important",
                            },
                          }} /> &nbsp;<Typography onClick={() => handleNavigateToApplicants(row?.userID)} sx={{
                            color: "var(--clr-blue-footer)",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: 'pointer'
                          }}> {row?.name} </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                        >
                          <Button
                            disabled
                            className={classes.dummyButton}
                          >
                            New
                          </Button>
                        </TableCell>
                        <TableCell
                          align="center"
                          className={classes.tableTitleTextSm}
                        >
                          {row?.appliedAt}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", my: "19px", pr: 2 }}>
                <Pagination
                  count={Math.ceil(applicantsList?.length / 10)}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage} />
              </Box>
            </TableContainer>
          ) : (
            <TableContainer
              component={Box}
            >
              <Table aria-label="simple table">
                <TableBody>
                  {applicantsList
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
                            }} /> &nbsp;
                            <Typography
                              onClick={() => handleNavigateToApplicants(row?.userID)}
                              sx={{
                                color: "var(--clr-blue-footer)",
                                fontSize: "14px",
                                fontWeight: "600",
                                cursor: "pointer"
                              }}
                            >
                              {row?.name}
                            </Typography>
                          </Typography>
                          {/* <LongMenu />  */}
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
                              justifyContent: "center",
                              alignItems: "baseline",
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 600,
                                color: "var(--clr-white-icon)",
                                marginBottom: "5px",
                              }}
                            >
                              Status
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "var(--clr-blue-footer)",
                                fontWeight: 600,
                                backgroundColor: "var(--clr-blue-light)",
                                borderRadius: 16,
                                padding: "4px 16px",
                              }}
                            >
                              New
                            </Typography>
                          </Box>
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
                              Date
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "var(--clr-gray-1)",
                                fontWeight: 600,
                              }}
                            >
                              {row?.appliedAt}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </TableBody>
              </Table>
              <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", my: "19px", pr: 2 }}>
                <Pagination
                  count={Math.ceil(applicantsList?.length / 10)}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage} />
              </Box>
            </TableContainer>
          )}
        </Box>
      </Box>
    </ShowForAccessJobPosting>
  );
}


/* function LongMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className={classes.createMenu}
        PaperProps={{
          style: {
            width: "8rem",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
            className={classes.manuItem}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
} */