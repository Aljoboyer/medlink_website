import {
  Checkbox,
  Box,
  IconButton,
  Breadcrumbs,
  Typography,
  // Link,
  Pagination,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@material-ui/core";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react";
import sortimage from "../../assets/Vector.png";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import useAuth from "../../hooks/useAuth";
import { useLocation, Link } from "react-router-dom";

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
    color: "var(--clr-blue-footer)"
  },
  tableTitleText: {
    color: "var(--clr-blue-footer)",
    fontSize: "14px",
    fontWeight: "600"
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
});

const options = ["None", "Atria", "Callisto"];

// user permission
export const ShowForAccessResumeDB = (props) => {
  const { getUserRole, permitUser, isLoading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

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
};


function LongMenu() {
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
        sx={{ mr: -2 }}
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
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

function createData(name, savedby, date) {
  return { name, savedby, date };
}
let rows = [
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
  createData("Job Title Goes In This Column", "User Name 1", "26 - Jan - 2022"),
];

export default function SavedSearches() {
  const { pathname } = useLocation();
  const classes = useStyles();
  const [users, setUsers] = useState(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  document.title = "Saved Searches | MedLink Jobs";

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

  return (
    <ShowForAccessResumeDB>
      <Box maxWidth="md" sx={{ mx: "auto", mb: 8 }}>
        {!matches ? (
          <Box className={classes.breadcrumbsMargin}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                underline="hover"
                style={{ color: "var(--clr-blue-footer)" }}
                to="/hospital-dashboard"
              >
                Dashboard
              </Link>
              <Typography sx={{ color: "var(--clr-blue-footer)" }}>
                Saved Searches
              </Typography>
            </Breadcrumbs>
          </Box>
        ) : (
          <Box sx={{ p: 2, mb: 3, display: "flex", gap: 1.5, alignItems: "center", backgroundColor: "var(--clr-blue-light)" }}>
            <NavigateBeforeIcon sx={{ fontSize: "2rem", color: "var(--clr-blue-footer)" }} />
            <Typography variant="subtitle1" sx={{ color: "var(--clr-blue-footer)", fontSize: "16px", fontWeight: "600" }}>Saved Searches</Typography>
          </Box>
        )}

        {
          !matches && (
            <Box style={{ marginTop: "15px", marginBottom: "20px", /* display: {xs: "none", md: "block"} */ }}>
              <Typography
                variant="h5"
                className={classes.pageTitle}
              >
                Saved Searches
              </Typography>
            </Box>
          )
        }
        {!matches ? (
          <Box component={Paper} className={classes.tableContainer}>
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
                    }} /> &nbsp; Title
                  </TableCell>

                  <TableCell align="center" className={classes.tableTitleText}>
                    Saved By
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center" style={{ fontWeight: 600 }} className={classes.tableTitleText}>
                    Date
                    <img
                      style={{
                        marginLeft: "10px",
                        height: "15px",
                        width: "13px",
                      }}
                      src={sortimage}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="center" style={{ width: "60px" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
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
                        <Checkbox sx={{
                          color: "#C7D3E3 !important",
                          "&.Mui-checked": {
                            color: "var(--clr-blue-primary) !important",
                          },
                        }} /> &nbsp; {row.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                        className={classes.tableTitleText}>
                        {row.savedby}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell
                        align="center"
                        style={{ padding: "0px", margin: "0px", fontWeight: 600 }}
                        className={classes.tableTitleText}
                      >
                        {row.date}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ padding: "0px", margin: "0px", width: "60px" }}
                      >
                        <LongMenu />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", mt: "19px", pr: 2, pb: 2 }}>
              <Pagination
                count={Math.ceil(users?.length / 10)}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage} />
            </Box>
          </Box>
        ) : (
          <Box sx={{ mt: { xs: -2, md: 0 }, px: 2 }}>
            <Table aria-label="simple table">
              <TableBody>
                {users
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
                            {row.name}
                          </Link>
                        </Typography>
                        <Box>
                          <LongMenu />
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
                            Saved By
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: "var(--clr-gray-1)",
                              fontWeight: 600,
                            }}
                          >
                            {row.savedby}
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
                            {row.date}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
              </TableBody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", mb: "19px", pr: 2, }}>
              <Pagination
                count={Math.ceil(users?.length / 10)}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage} />
            </Box>
          </Box>
        )}
      </Box>
    </ShowForAccessResumeDB>
  );
}
