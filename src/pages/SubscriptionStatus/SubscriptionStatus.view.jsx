import { makeStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  Breadcrumbs, Checkbox, Pagination, Skeleton, Typography, useMediaQuery
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TablePagination from "@material-ui/core/TablePagination";
// import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
// import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import moment from "moment";
import React, { useEffect, useState } from "react";
import { gqlquery, QUERY_GETSUBSCRIBEDPLANS } from "../../api/hospitalIndex";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useLocation, Link } from "react-router-dom";
// import DownloadIcon from '@mui/icons-material/Download';

// const theme = createTheme();
const useStyles = makeStyles({
  pageTitle: {
    fontWeight: "600 !important",
    color: "var(--clr-blue-footer)",
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
  statusbutton: {
    backgroundColor: "var(--clr-gray-4) !important",
    color: "var(--clr-white) !important",
    borderRadius: "24px",
    padding: "4px 18px 4px 18px",
    width: "80px",
    fontSize: "12px",
    fontWeight: "600",
    "&:hover": {
      color: "var(--clr-white) !important",
      backgroundColor: "var(--clr-gray-4) !important",
    },
  },
  activeStatusbutton: {
    backgroundColor: "var(--clr-green-3) !important",
    color: "var(--clr-white) !important",
    borderRadius: "24px",
    padding: "4px 18px 4px 18px",
    width: "80px",
    fontSize: "12px",
    fontWeight: "600",
    "&:hover": {
      color: "var(--clr-white) !important",
      backgroundColor: "var(--clr-green-3) !important",
    },
  },
  pagination: {
    backgroundColor: "var(--clr-white)",
    color: "var(--clr-blue-footer)",
    fontWeight: "600 !important",
    padding: "10px",
  }
});

export default function SubscriptionStatus() {
  const classes = useStyles();
  const { pathname } = useLocation();
  // const [users, setUsers] = useState(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [subscribedPlans, setSubscribedPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  document.title = "Subscription Status | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => { 
    // gqlquery(QUERY_GETACTIVESUBSCRIPTIONS)
    gqlquery(QUERY_GETSUBSCRIBEDPLANS, null)
      .then((res) => res.json())
      .then((data) => {
        console.log(data?.data)
        if (data?.data?.getSubscribedPlans) {
          setSubscribedPlans(data?.data?.getSubscribedPlans)
        }
      })
      .finally(() => setIsLoading(false));
  }, []);
  const sortedSubscription = subscribedPlans?.sort((a, b) => new Date(b.initiatedAt) - new Date(a.initiatedAt))

  if (!isLoading) {
    return (
      <Box maxWidth="xl" sx={{ mx: "auto", mb: 8 }}>
        <Box sx={{ px: { xs: 0, md: 6 } }}>
          {!matches ? (<Box style={{ marginTop: "15px", marginBottom: "20px" }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" style={{ color: "var(--clr-blue-footer)" }} />}
              aria-label="breadcrumb"
              // sx={{ marginTop: "4%" }}
              style={{ marginBottom: "30px" }}
            >
              <Link underline="hover" style={{ color: "var(--clr-blue-footer)" }}
                to="/hospital-dashboard">
                Dashboard
              </Link>
              <Typography style={{ color: "var(--clr-blue-footer)" }}>Subscription Status </Typography>
            </Breadcrumbs>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                className={classes.pageTitle}
              >
                Subscription Status
              </Typography>
              {/* <IconLabelButtons /> */}
            </Box>
          </Box>
          ) : (
            <Box sx={{ p: 2, mb: 1, display: "flex", gap: 1.5, alignItems: "center", backgroundColor: "var(--clr-blue-light)" }}>
              <NavigateBeforeIcon sx={{ fontSize: "2rem", color: "var(--clr-blue-footer)" }} />
              <Typography variant="subtitle1" sx={{ color: "var(--clr-blue-footer)", fontSize: "16px", fontWeight: "600" }}>Subscription Status</Typography>
            </Box>
          )}

          {!matches ? (
            <TableContainer className={classes.tableContainer} component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow
                    style={{
                      backgroundColor: "var(--clr-blue-light)",
                      color: "black",
                    }}
                  >
                    <TableCell align="center" style={{ width: "60px" }}>
                      <Checkbox sx={{
                        color: "#C7D3E3 !important",
                        "&.Mui-checked": {
                          color: "var(--clr-blue-primary) !important",
                        },
                      }} />
                    </TableCell>
                    <TableCell
                      className={classes.tableTitleText}
                      style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                    >
                      Product Details
                    </TableCell>
                    <TableCell
                      className={classes.tableTitleText}
                      align="left"
                      style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                    >
                      Order ID
                    </TableCell>
                    <TableCell
                      className={classes.tableTitleText}
                      align="left"
                      style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      className={classes.tableTitleText}
                      align="left"
                      style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      className={classes.tableTitleText}
                      align="left"
                      style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                    >
                      Status
                    </TableCell>
                    {/* <TableCell
                  className={classes.tableTitleText}
                  align="left"
                  style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                >
                  Invoice
                </TableCell> */}
                  </TableRow>
                </TableHead>
                {/* {console.log(subscribedPlans)} */}
                <TableBody>
                  {sortedSubscription
                    ?.slice((page > 0 ? page - 1 : page) * 10, (page > 0 ? page - 1 : page) * 10 + 10)
                    .map((row, index) => (
                      <TableRow
                        key={row.name}
                        className={classes.tablebodyrow}
                        style={{ padding: "0px", margin: "0px" }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          align="center"
                          style={{ padding: "0px", margin: "0px", width: "70px" }}
                        >
                          <Checkbox sx={{
                            color: "#C7D3E3 !important",
                            "&.Mui-checked": {
                              color: "var(--clr-blue-primary) !important",
                            },
                          }} />
                        </TableCell>
                        <TableCell
                          className={classes.tableTitleText}
                          component="th"
                          scope="row"
                          style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                        >
                          {row?.name} x {row?.quantity}
                        </TableCell>
                        <TableCell
                          className={classes.tableTitleText}
                          align="left"
                          style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                        >
                          {row?.orderID}
                        </TableCell>
                        <TableCell
                          className={classes.tableTitleText}
                          align="left"
                          style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                        >
                          {moment(row?.initiatedAt).format("DD-MMM-YYYY")}
                        </TableCell>
                        <TableCell
                          className={classes.tableTitleText}
                          align="left"
                          style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                        >
                          {row?.amount}/-
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                        >
                          {row?.activeStatus ? (
                            <Button
                              className={classes.activeStatusbutton}
                            >
                              <p>{"Active"}</p>
                            </Button>
                          ) : (
                            <Button
                              className={classes.statusbutton}
                            >
                              <p>
                                {"Expired"}
                              </p>
                            </Button>
                          )}
                        </TableCell>
                        {/* <TableCell
                      align="left"
                      style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                    >
                      <Button
                        variant="text" 
                      >
                        <u style={{ fontWeight: "600" }}>Download</u>
                      </Button>
                    </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {/* <Divider sx={{ m: 0 }} /> */}
              <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", my: "19px", pr: 2, }}>
                <Pagination
                  count={Math.ceil(sortedSubscription?.length / 10)}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Box>
            </TableContainer>
          ) : (
            <Box sx={{ px: 2 }} >
              <Table aria-label="simple table">
                <TableBody>
                  {sortedSubscription
                    ?.slice((page > 0 ? page - 1 : page) * 10, (page > 0 ? page - 1 : page) * 10 + 10)
                    ?.map((row, index) => (
                      <Box component={Box} key={row?.name} sx={{ backgroundColor: "var(--clr-white)", border: "1px solid var(--clr-blue-light)", borderRadius: "6px !important", my: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            px: 1.3,
                            py: 1,
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ color: "var(--clr-gray-1)", fontSize: "16px", fontWeight: "600" }}>
                            {row?.name} x {row?.quantity}
                          </Typography>
                          {/* <Box style={{ marginRight: "-14px" }}>
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              // aria-controls={open ? "long-menu" : undefined}
                              // aria-expanded={open ? "true" : undefined}
                              aria-haspopup="true"
                            // onClick={(event) => {
                            //   // setAnchorEl(event?.currentTarget);
                            //   // handleClick(vacancy?.vacancyID);
                            //   // setEditOpen(vacancy?.status);
                            // }}
                            >
                              <DownloadIcon sx={{ color: "var(--clr-blue-primary)" }} />
                            </IconButton>
                          </Box> */}
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
                              Transaction ID
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "var(--clr-gray-1)",
                                fontWeight: 600,
                              }}
                            >
                              {row?.orderID}
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
                              {moment(row?.initiatedAt).format("DD-MMM-YYYY")}
                            </Typography>
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
                              Amount
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "var(--clr-gray-1)",
                                fontWeight: 600,
                              }}
                            >
                              {row?.amount}/-
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
                              Status
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "var(--clr-gray-1)",
                                fontWeight: 600,
                              }}
                            >
                              {row?.activeStatus ? (
                                <Button
                                  className={classes.activeStatusbutton}
                                >
                                  <p>{"Active"}</p>
                                </Button>
                              ) : (
                                <Button
                                  className={classes.statusbutton}
                                >
                                  <p>
                                    {"Expired"}
                                  </p>
                                </Button>
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                </TableBody>
              </Table>
              <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", mb: "19px", pr: 2, }}>
                <Pagination
                  count={Math.ceil(sortedSubscription?.length / 10)}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Box>
            </Box>
          )}
        </Box>

      </Box>
    );
  } else {
    return (
      <Box maxWidth="xl" sx={{ mb: 8, mx: "auto" }}>
        <Box sx={{ px: { xs: 0, md: 6 } }}>
          <Box style={{ marginTop: "15px", marginBottom: "30px" }}>
            <Skeleton variant="text" animation="wave" width="40%" height={30} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Skeleton variant="text" animation="wave" width="40%" height={50} />
            <Skeleton variant="text" animation="wave" width="15%" height={60} />
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
      </Box>
    );
  }
} 
