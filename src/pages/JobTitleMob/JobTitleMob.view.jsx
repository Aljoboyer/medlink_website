import { Checkbox, Box, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@material-ui/core";
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";

const theme = createTheme();
const useStyles = makeStyles({});

function getInfos(jobid, location, salary, experience, type, quoalification) {
  return { jobid, location, salary, experience, type, quoalification };
}
let infos = [
  getInfos(14045877, "Bangalore", "50k - 80k", 4, "Full Time", "MBBS"),
];

function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={6}>
        <Typography
          style={{ fontSize: "16px", fontWeight: "400", color: "#828282" }}
        >
          Job ID: {infos[0].jobid}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          style={{ fontSize: "16px", fontWeight: "400", color: "#828282" }}
        >
          Location: {infos[0].location}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          style={{ fontSize: "16px", fontWeight: "400", color: "#828282" }}
        >
          Salary: {infos[0].salary}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          style={{ fontSize: "16px", fontWeight: "400", color: "#828282" }}
        >
          Experience:{infos[0].experience}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          style={{ fontSize: "16px", fontWeight: "400", color: "#828282" }}
        >
          Type: {infos[0].type}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          style={{ fontSize: "16px", fontWeight: "400", color: "#828282" }}
        >
          Qualification: {infos[0].quoalification}
        </Typography>
      </Grid>
    </React.Fragment>
  );
}

function NestedGrid() {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: "20px" }}>
      <Grid container spacing={1}>
        <Grid container item spacing={2}>
          <FormRow />
        </Grid>
      </Grid>
    </Box>
  );
}

const options = ["None", "Atria", "Callisto"];

const ITEM_HEIGHT = 48;

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
      >
        <MoreVertIcon />
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
            maxHeight: ITEM_HEIGHT * 4.5,
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

function createData(name, status, date) {
  return { name, status, date };
}
let rows = [
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
  createData("Applicants Name", "New", "26 - Jan - 2022"),
];

export default function JobTitleMob() {
  const classes = useStyles();
  const [users, setUsers] = useState(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ mb: 8 }}>
      <Box
        sx={{
          backgroundColor: "#E0E0E0",
          padding: "12px 0 12px 17px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <ChevronLeftIcon style={{ height: "35px", width: "35px" }} />
        <Typography
          style={{ lineHeight: "24px", fontSize: "18px", fontWeight: "600" }}
        >
          Single Job
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          mt: 2,
          mb: 2,
        }}
      >
        <Typography style={{ color: "black" }}>Job Title</Typography>
        <Button
          variant="standard"
          style={{
            backgroundColor: "#E0E0E0",
            borderRadius: "7px",
            fontWeight: 600,
            fontSize: "16px",
            padding: "8px 10px 8px 10px",
          }}
        >
          <FilterAltTwoToneIcon style={{ color: "black" }} />
        </Button>
      </Box>

      <Box sx={{ px: 2 }}>
        <NestedGrid />
      </Box>
      <hr
        color="#BDBDBD"
        height="10px"
        width="100%"
        style={{ marginTop: "10px" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          mt: 2,
          mb: 3,
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

      {/* <Box style={{ height: "33px" }}></Box> */}

      <TableContainer component={Paper}>
        <TableContainer
          component={Paper}
          style={{ padding: "0px 10px 0px 10px" }}
        >
          <Table aria-label="simple table">
            <TableBody sx={{}}>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={row.name}
                    style={{ backgroundColor: "#F2F2F2" }}
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
                      <Box style={{ marginRight: "-10px" }}>
                        <LongMenu style={{ marginRight: "-10px" }} />
                      </Box>
                    </Box>
                    <Box sx={{ px: 1.3, pb: 0.4 }}>
                      {/* row 1 */}
                      <Box
                        sx={{
                          display: "grid",
                          columnGap: 3,
                          rowGap: 1,
                          gridTemplateColumns: "repeat(2, 1fr)",
                          mb: 1.5,
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
                            style={{
                              fontSize: "12px",
                              fontWeight: 500,
                              marginBottom: "10px",
                            }}
                          >
                            Status
                          </Typography>
                          <Button
                            style={{
                              backgroundColor: "#C4C4C4",
                              borderRadius: "24px",
                              padding: "4px 12px",
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: "14px",
                                color: "black",
                                fontWeight: 600,
                              }}
                            >
                              {row.status}
                            </Typography>
                          </Button>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "baseline",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "12px",
                              fontWeight: 500,
                              marginBottom: "10px",
                            }}
                          >
                            Date
                          </Typography>

                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "black",
                              fontWeight: 600,
                            }}
                          >
                            {row.date}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {/* white space  */}
                    <Box
                      style={{ height: "10px", backgroundColor: "white" }}
                    ></Box>
                  </TableRow>
                ))}
            </TableBody>
            <TablePagination
              className={classes.pagination}
              style={{
                backgroundColor: "#F2F2F2",
                width: "100%",
                marginTop: "-17px",
              }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      </TableContainer>
    </Box>
  );
}
