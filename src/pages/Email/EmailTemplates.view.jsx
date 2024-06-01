import { 
  Checkbox,
  Box,
  Breadcrumbs,
  Typography,
  Link,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TablePagination from "@material-ui/core/TablePagination";
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import { useNavigate } from "react-router-dom";

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
    color: "var(--clr-blue-footer)",
  },
  tableTitleText: {
    color: "var(--clr-blue-footer)",
    fontSize: "14px",
    fontWeight: "600",
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

function IconLabelButtons() {
  const classes = useStyles();
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/create-email");
  };
  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={handleClick}
        variant="contained"
        className={classes.adduserbutton}
      >
        Create
      </Button>
      <Button
        className={classes.filterButton}
        startIcon={<FilterAltTwoToneIcon style={{ color: "var(--clr-blue-footer)" }} />}
      >
        Filter
      </Button>
    </Stack>
  );
}

function createData(emailtemplates, lastupdatedby, date) {
  return { emailtemplates, lastupdatedby, date };
}
let rows = [
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
  createData("Email Template Title", "HR Name Here", "26-01- 2022"),
];

export default function EmailTemplates() {
  const classes = useStyles();
  const [users, setUsers] = useState(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  document.title = "Email Templates | MedLink Jobs";
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
      <Box style={{ marginTop: "15px", marginBottom: "20px" }}>
        <Breadcrumbs
          separator={<NavigateNextIcon style={{ color: "var(--clr-blue-footer)" }} fontSize="small" />}
          aria-label="breadcrumb"
          style={{ marginBottom: "30px", marginTop: "15px" }}
        >
          <Link
            underline="hover"
            style={{ color: "var(--clr-blue-footer)" }}
            to="/hospital-dashboard"
          >
            Home
          </Link>
          <Link
            underline="hover"
            style={{ color: "var(--clr-blue-footer)" }}
            to="/jobs-and-responses"
          >
            Resume database
          </Link>
          <Typography sx={{ color: "var(--clr-blue-footer)" }}>
            Email Templates
          </Typography>
        </Breadcrumbs> 
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            className={classes.pageTitle}
          >
            Email
          </Typography>
          <IconLabelButtons />
        </Box>
      </Box>

      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "var(--clr-blue-light)", 
              }}
            >
              <TableCell className={classes.tableTitleText}>
                <Checkbox sx={{
                    color: "#C7D3E3 !important",
                    "&.Mui-checked": {
                      color: "var(--clr-blue-primary) !important",
                    },
                  }} /> &nbsp; Folder Name
              </TableCell>
              <TableCell></TableCell>
              <TableCell align="center" className={classes.tableTitleText}>
                Last Updated By
              </TableCell>
              <TableCell align="center" className={classes.tableTitleText}>
                Date
              </TableCell>
              <TableCell align="center" className={classes.tableTitleText}>
              ---------- Actions ----------
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.emailtemplates}
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
                  }} /> &nbsp; {row?.emailtemplates}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                    className={classes.tableTitleText}
                  >
                    {row.lastupdatedby}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                    className={classes.tableTitleText}
                  >
                    {row.date}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                    className={classes.tableTitleText}
                  >
                    <Typography underline="always">
                      <Button
                        variant="text"
                        style={{ fontWeight: "600 !important" }} 
                      >
                        <u>{"View/Edit"}</u>
                      </Button>
                      &nbsp; &nbsp;
                      <Button
                        variant="text"
                        style={{ fontWeight: "600 !important" }} 
                      >
                        <u>Delete</u>
                      </Button>
                    </Typography> 
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* <Divider sx={{ m: 0 }} /> */}
        <TablePagination
          className={classes.pagination}
          style={{ backgroundColor: "var(--clr-white)", width: "inherit" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}
