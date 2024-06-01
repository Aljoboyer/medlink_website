import { Checkbox, Box, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Menu, MenuItem } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useState, useEffect } from "react";
import { gqlquery, QUERY_VACANCIES } from "../../api/hospitalIndex.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles({});

const options = ["Edit", "Close job", "Email"];

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
            maxHeight: ITEM_HEIGHT * 3.3,
            width: "15ch",
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

function createData(name, jobtype, postedby, posteddate, responses) {
  return { name, jobposting: jobtype, postedby, posteddate, responses };
}
let rows = [
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
  createData("Job Title Here", "Hot", "You", "26 - Jan - 2022", 50),
];

export default function ManageJobsAndResponesMob() {
  const classes = useStyles(); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    gqlquery(QUERY_VACANCIES, null)
      .then((res) => res.json())
      .then((datas) => setVacancies(datas?.data?.getVacancies));
  }, []);

  console.log("mobile version:", vacancies)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const newVacancies = vacancies?.map((vacancie) => {
    const date = new Date(vacancie?.postedOn)
    const newDate = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).split(' ').join('-');
    return {
      postedOn: newDate,
      jobTitle: vacancie?.jobTitle,
      vacancyType: vacancie?.vacancyType,
      responses: vacancie?.responses,
      vacancyID: vacancie?.vacancyID
    }
  })

  return (
    <Box maxWidth="sm" sx={{ mb: 8, mx: "auto" }}>
      <Box
        sx={{
          backgroundColor: "#E0E0E0",
          padding: "15px 0 15px 17px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <ArrowBackIcon sx={{ height: "24px", width: "24px" }} />
        <Typography sx={{ lineHeight: "24px", fontWeight: "600" }}>
          Manage Job & Responses
        </Typography>
      </Box>

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

      <TableContainer
        component={Paper}
        style={{ padding: "0px 10px 0px 10px" }}
      >
        <Table aria-label="simple table">
          <TableBody style={{borderRadius: "10px"}}>
            {newVacancies
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((vacancie, index) => (
                <TableRow key={vacancie?.jobTitle} style={{ backgroundColor: "#F2F2F2" }}>
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
                      <Checkbox /> &nbsp; <Link to={`/job-title/${vacancie?.vacancyID}`}> {vacancie?.jobTitle}</Link>
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
                          Job Type
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: 600,
                          }}
                        >
                          {vacancie?.vacancyType}
                        </Typography>
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
                          Posted By
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
                            YOU
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                    {/* row 2  */}
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
                          justifyContent: "",
                          alignItems: "",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                            marginBottom: "10px",
                          }}
                        >
                          Posted Date
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: 600,
                          }}
                        >
                          {vacancie?.postedOn}
                        </Typography>
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
                          Responses
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: 600,
                          }}
                        >
                          {vacancie?.responses}
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
        </Table>

        <TablePagination
          className={classes.pagination}
          style={{ backgroundColor: "#F2F2F2", width: "100%" }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={newVacancies?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}
