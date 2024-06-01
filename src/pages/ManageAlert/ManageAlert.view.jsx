import { Box, Breadcrumbs, Grid, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';

const data = [
  {
    name: "Orthopedic Jobs, Bangalore",
    keyword: "Surgery, ENT, Ortho, OPD, Emergency, Resident, Pediatrics, Clinic, Institute, Clinic Research",
    experience: "3 year(s)",
    expectedSalary: "15 lakh(s)",
    location: "Bengaluru/Bangalore",
    industry: "Clinic Research",
    jobCategory: "Other",
    roles: "FullTime Doctor"
  },
  {
    name: "Public Health, Bangalore",
    keyword: "Surgery,Pediatrics, Clinic, Institute, Clinic Research",
    experience: "3 year(s)",
    expectedSalary: "12 lakh(s)",
    location: "Bengaluru/Bangalore",
    industry: "Clinic Research",
    jobCategory: "Other",
    roles: "FullTime Doctor"
  },
  {
    name: "Public Health, Bangalore",
    keyword: "Surgery,Pediatrics, Clinic, Institute, Clinic Research",
    experience: "3 year(s)",
    expectedSalary: "12 lakh(s)",
    location: "Bengaluru/Bangalore",
    industry: "Clinic Research",
    jobCategory: "Other",
    roles: "FullTime Doctor"
  },
]

const useStyles = makeStyles({
  breadcrumbsMargin: {
    padding: "15px 0px !important",
  },
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
    paddingRight: "40px",
    marginTop: "5px !important",
  },
  actioncolumn: {
    color: "var(--clr-blue-footer)",
    fontSize: "14px",
    fontWeight: "600",
    maxWidth: "180px"
  },
  actionButton: {
    fontWeight: "600",
    textDecoration: "underline",
    padding: "0 !important"
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
  tableCellMargin: {
   
  }

});

const ManageAlert = () => {
  const classes = useStyles(); 
  const { pathname } = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [loadingSkleton, setLoadingSkleton] = useState(true);
  document.title = "Manage Alert | MedLink Jobs";
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  useEffect(() => {
    setTimeout(() => {
      setLoadingSkleton(false);
    }, 1000)
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
      {matches && (
        <Box
          sx={{
            backgroundColor: "var(--clr-blue-light)",
            padding: "15px 0 15px 17px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {!loadingSkleton ? (
            <>
              <MenuIcon sx={{ color: "var(--clr-blue-footer)", mr: 3.1 }} />
              <Typography
                variant="h6"
                sx={{
                  lineHeight: "24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--clr-blue-footer)",
                }}
              >
                Manage Alerts
              </Typography>
            </>
          ) : (
            <Skeleton style={{ fontSize: "16px" }} width={"45%"} />
          )}
        </Box>
      )}
      {!matches && (
        <>
          <Box className={classes.breadcrumbsMargin}>
            {!loadingSkleton ? (
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link
                  underline="hover"
                  style={{ color: "var(--clr-blue-footer)" }}
                  to="/profie-home"
                >
                  Home
                </Link>
                <Typography sx={{ color: "var(--clr-blue-footer)" }}>
                  Manage Alerts
                </Typography>
              </Breadcrumbs>
            ) : (
              <Skeleton width={180} sx={{ fontSize: "16px" }} />
            )}
          </Box>
          <Typography variant="h5" sx={{ py: 1 }} className={classes.pageTitle}>
            {!loadingSkleton ? (
              "Manage Alerts"
            ) : (
              <Skeleton width={160} sx={{ fontSize: "24px" }} />
            )}
          </Typography>
        </>
      )}
      {!matches ? (
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow
                style={{
                  backgroundColor: "var(--clr-blue-light)",
                }}
              >
                <TableCell
                  sx={{ width: "35%" }}
                  className={classes.tableTitleText}
                >
                  {!loadingSkleton ? (
                    "Alert Name"
                  ) : (
                    <Skeleton
                      className={classes.tableTitleText}
                      style={{ verticalAlign: "top", fontSize: "14px" }}
                      width={"35%"}
                    />
                  )}
                </TableCell>
                <TableCell
                  sx={{ width: "40%" }}
                  className={classes.tableTitleText}
                >
                  {!loadingSkleton ? (
                    "Search Keywords"
                  ) : (
                    <Skeleton
                      className={classes.tableTitleText}
                      style={{ verticalAlign: "top", fontSize: "14px" }}
                      width={"40%"}
                    />
                  )}
                </TableCell>
                <TableCell
                  sx={{ width: "25%" }}
                  className={classes.actioncolumn}
                >
                  {!loadingSkleton ? (
                    "--------------Actions--------------"
                  ) : (
                    <Skeleton
                      className={classes.tableTitleText}
                      style={{ verticalAlign: "top", fontSize: "14px" }}
                      width={"100%"}
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => (
                  <TableRow
                    key={row.name}
                    className={classes.tablebodyrow}
                    sx={{ alignItems: "flex-start !important" }}
                  >
                    <TableCell
                      className={classes.tableTitleText}
                      style={{ verticalAlign: "top" }}
                    >
                      {!loadingSkleton ? (
                        <>{row.name}</>
                      ) : (
                        <Skeleton style={{ fontSize: "14px" }} width={"75%"} />
                      )}
                    </TableCell>
                    <TableCell
                      className={classes.tableTitleText}
                      style={{ verticalAlign: "top" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--clr-blue-footer)",
                          lineHeight: "24px",
                        }}
                      >
                        {!loadingSkleton ? (
                          <>
                            <span style={{ fontWeight: "600" }}>
                              Keywords:{" "}
                            </span>{" "}
                            {row?.keyword}
                          </>
                        ) : (
                          <Skeleton
                            style={{ fontSize: "14px" }}
                            width={"90%"}
                          />
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--clr-blue-footer)",
                          lineHeight: "24px",
                        }}
                      >
                        {!loadingSkleton ? (
                          <>
                            <span style={{ fontWeight: "600" }}>
                              Experience:{" "}
                            </span>{" "}
                            {row?.experience}{" "}
                          </>
                        ) : (
                          <Skeleton
                            className={classes.tableTitleText}
                            style={{ verticalAlign: "top", fontSize: "14px" }}
                            width={"45%"}
                          />
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--clr-blue-footer)",
                          lineHeight: "24px",
                        }}
                      >
                        {!loadingSkleton ? (
                          <>
                            {" "}
                            <span style={{ fontWeight: "600" }}>
                              {" "}
                              Expected Salary:{" "}
                            </span>{" "}
                            {row?.expectedSalary}{" "}
                          </>
                        ) : (
                          <Skeleton
                            className={classes.tableTitleText}
                            style={{ verticalAlign: "top", fontSize: "14px" }}
                            width={"57%"}
                          />
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--clr-blue-footer)",
                          lineHeight: "24px",
                        }}
                      >
                        {!loadingSkleton ? (
                          <>
                            <span style={{ fontWeight: "600" }}>
                              Location:{" "}
                            </span>{" "}
                            {row?.location}{" "}
                          </>
                        ) : (
                          <Skeleton
                            className={classes.tableTitleText}
                            style={{ verticalAlign: "top", fontSize: "14px" }}
                            width={"62%"}
                          />
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--clr-blue-footer)",
                          lineHeight: "24px",
                        }}
                      >
                        {!loadingSkleton ? (
                          <>
                            <span style={{ fontWeight: "600" }}>
                              Industry:{" "}
                            </span>{" "}
                            {row?.industry}{" "}
                          </>
                        ) : (
                          <Skeleton
                            className={classes.tableTitleText}
                            style={{ verticalAlign: "top", fontSize: "14px" }}
                            width={"55%"}
                          />
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--clr-blue-footer)",
                          lineHeight: "24px",
                        }}
                      >
                        {!loadingSkleton ? (
                          <>
                            {" "}
                            <span style={{ fontWeight: "600" }}>
                              {" "}
                              Job Category/Department:{" "}
                            </span>{" "}
                            {row?.jobCategory}{" "}
                          </>
                        ) : (
                          <Skeleton
                            className={classes.tableTitleText}
                            style={{ verticalAlign: "top", fontSize: "14px" }}
                            width={"72%"}
                          />
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "var(--clr-blue-footer)",
                          lineHeight: "24px",
                        }}
                      >
                        {!loadingSkleton ? (
                          <>
                            {" "}
                            <span style={{ fontWeight: "600" }}>
                              Roles:{" "}
                            </span>{" "}
                            {row?.roles}{" "}
                          </>
                        ) : (
                          <Skeleton
                            className={classes.tableTitleText}
                            style={{ verticalAlign: "top", fontSize: "14px" }}
                            width={"50%"}
                          />
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell
                      className={classes.actioncolumn}
                      style={{ verticalAlign: "top" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="text"
                          className={classes.actionButton}
                          // onClick={() => handleOpenRenameFolder(row)}
                        >
                          {!loadingSkleton ? (
                            "View Jobs"
                          ) : (
                            <Skeleton
                              className={classes.tableTitleText}
                              style={{ verticalAlign: "top", fontSize: "14px" }}
                              width={"100%"}
                            />
                          )}
                        </Button>
                        <Button
                          variant="text"
                          className={classes.actionButton}
                          // onClick={() => handleDeleteFolder(row.folderID)}
                        >
                          {!loadingSkleton ? (
                            "Delete Alert"
                          ) : (
                            <Skeleton
                              className={classes.tableTitleText}
                              style={{ verticalAlign: "top", fontSize: "14px" }}
                              width={"100%"}
                            />
                          )}
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {!loadingSkleton ? (
            <TablePagination
              className={classes.pagination}
              style={{ backgroundColor: "var(--clr-white)", width: "inherit" }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          ) : (
            <span
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "12px",
                marginBottom: "12px",
              }}
            >
              <Skeleton style={{ fontSize: "16px" }} width={"35%"} />
            </span>
          )}
        </TableContainer>
      ) : (
        <Box sx={{ px: 2, pt: 2.5, pb: 3.75 }}>
          {data
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((row, index) => (
              <Box
                sx={{
                  border: "1px solid #E4EEF5",
                  px: "10px",
                  py: "15px",
                  mb: "10px",
                  borderRadius: "6px",
                }}
              >
                <Box sx={{ display: "flex", mb: 1.25 }}>
                  {!loadingSkleton ? (
                    <>
                      {" "}
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#3B4256",
                        }}
                      >
                        Alert Name:&#160;
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#3B4256" }}>
                        {row.name}
                      </Typography>{" "}
                    </>
                  ) : (
                    <Skeleton style={{ fontSize: "14px" }} width={"40%"} />
                  )}
                </Box>

                <Box sx={{ display: "flex", mb: 1.25 }}>
                  {!loadingSkleton ? (
                    <>
                      {" "}
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#3B4256",
                        }}
                      >
                        Keywords:&#160;
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#3B4256" }}>
                        {row?.keyword}
                      </Typography>{" "}
                    </>
                  ) : (
                    <Skeleton style={{ fontSize: "14px" }} width={"93%"} />
                  )}
                </Box>

                <Box sx={{ display: "flex", mb: 1.25 }}>
                  {!loadingSkleton ? (
                    <>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#3B4256",
                        }}
                      >
                        Experience:&#160;
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#3B4256" }}>
                        {row?.experience}
                      </Typography>{" "}
                    </>
                  ) : (
                    <Skeleton style={{ fontSize: "14px" }} width={"35%"} />
                  )}
                </Box>

                <Box sx={{ display: "flex", mb: 1.25 }}>
                  {!loadingSkleton ? (
                    <>
                      {" "}
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#3B4256",
                        }}
                      >
                        Expected Salary:&#160;
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#3B4256" }}>
                        {row?.expectedSalary}
                      </Typography>{" "}
                    </>
                  ) : (
                    <Skeleton style={{ fontSize: "14px" }} width={"40%"} />
                  )}
                </Box>

                <Box sx={{ display: "flex", mb: 1.25 }}>
                  {!loadingSkleton ? (
                    <>
                      {" "}
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#3B4256",
                        }}
                      >
                        Location:&#160;
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#3B4256" }}>
                        {row?.location}
                      </Typography>{" "}
                    </>
                  ) : (
                    <Skeleton style={{ fontSize: "14px" }} width={"45%"} />
                  )}
                </Box>

                <Box sx={{ display: "flex", mb: 1.25 }}>
                  {!loadingSkleton ? (
                    <>
                      {" "}
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#3B4256",
                        }}
                      >
                        Industry:&#160;
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#3B4256" }}>
                        {row?.industry}
                      </Typography>
                    </>
                  ) : (
                    <Skeleton style={{ fontSize: "14px" }} width={"38%"} />
                  )}
                </Box>

                <Box sx={{ display: "flex", mb: 1.25 }}>
                  {!loadingSkleton ? (
                    <>
                      {" "}
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#3B4256",
                        }}
                      >
                        Job Category/Department:&#160;
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#3B4256" }}>
                        {row?.jobCategory}
                      </Typography>{" "}
                    </>
                  ) : (
                    <Skeleton style={{ fontSize: "14px" }} width={"48%"} />
                  )}
                </Box>

                <Box sx={{ display: "flex", mb: 1.25 }}>
                  {!loadingSkleton ? (
                    <>
                      {" "}
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#3B4256",
                        }}
                      >
                        Role:&#160;
                      </Typography>
                      <Typography sx={{ fontSize: "14px", color: "#3B4256" }}>
                        {row?.roles}
                      </Typography>
                    </>
                  ) : (
                    <Skeleton style={{ fontSize: "14px" }} width={"38%"} />
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 1.7,
                  }}
                >
                  <Button
                    sx={{ fontSize: "14px", fontWeight: 500, color: "#5A98F2" }}
                  >
                    {!loadingSkleton ? (
                      <u>Delete Alert</u>
                    ) : (
                      <Skeleton style={{ fontSize: "14px" }} width={"100%"} />
                    )}
                  </Button>
                  <Button
                    sx={{ fontSize: "14px", fontWeight: 500, color: "#5A98F2" }}
                  >
                    {!loadingSkleton ? (
                      <u>View Jobs</u>
                    ) : (
                      <Skeleton style={{ fontSize: "14px" }} width={"100%"} />
                    )}
                  </Button>
                </Box>
              </Box>
            ))}
          {!loadingSkleton ? (
            <TablePagination
              className={classes.pagination}
              style={{ backgroundColor: "var(--clr-white)", width: "inherit" }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          ) : (
            <span
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "12px",
                marginBottom: "12px",
              }}
            >
              <Skeleton style={{ fontSize: "16px" }} width={"60%"} />
            </span>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ManageAlert;