import { Checkbox, Box, IconButton, Typography, Stack } from "@mui/material";
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import React, { useState } from "react";

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

function createData(smstemplates, lastupdatedby, date) {
  return { smstemplates, lastupdatedby, date };
}
let rows = [
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
  createData("SMS Template Title", "HR Name Here", "26-01- 2022"),
];

export default function SMSTemplatesMob() {
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
          //   padding: "12px 0 12px 17px",
          py: 2,
          pl: 2,
          pr: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <ChevronLeftIcon style={{ height: "35px", width: "35px" }} />
            <Typography
              style={{
                lineHeight: "24px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              SMS Templates
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          py: 3,
          px: 2,
          gap: "15px",
        }}
      >
        <Button
          variant="standard"
          style={{
            backgroundColor: "#4F4F4F",
            color: "white",
            borderRadius: "7px",
            fontWeight: 500,
            fontSize: "16px",
            padding: "8px 18px",
          }}
        >
          Create
        </Button>
        <Button
          variant="standard"
          style={{
            backgroundColor: "#E0E0E0",
            borderRadius: "7px",
            fontWeight: 600,
            fontSize: "16px",
            // padding: "8px 6px",
          }}
        >
          <FilterAltTwoToneIcon style={{ color: "black" }} />
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
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
        style={{ padding: "0px 16px 0px 16px" }}
      >
        <Table aria-label="simple table">
          <TableBody sx={{}}>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.name} style={{ backgroundColor: "#F2F2F2" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1.3,
                      pb: 0.4,
                    }}
                  >
                    <Typography style={{ fontSize: "16px", fontWeight: 500 }}>
                      <Checkbox /> &nbsp; {row.smstemplates}
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
                          Last Updated By
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: 500,
                          }}
                        >
                          {row.lastupdatedby}
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
                          Date
                        </Typography>

                        <Typography
                          style={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: 500,
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
        </Table>

        <TablePagination
          className={classes.pagination}
          style={{ backgroundColor: "#F2F2F2", width: "100%" }}
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
