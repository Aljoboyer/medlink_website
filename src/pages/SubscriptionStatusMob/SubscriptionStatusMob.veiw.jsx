import { Checkbox, Box, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";
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
import DownloadIcon from "@mui/icons-material/Download";
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

function createData(
  productdetails,
  transactionid,
  date,
  status,
  amount,
  invoice
) {
  return { productdetails, transactionid, date, status, amount, invoice };
}
let rows = [
 
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Active",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Active",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Active",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Active",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
  createData(
    "Lorem ipsum dolor sit amet, Lorem...",
    "TD12524565821",
    "26-02-22",
    "Expired",
    "1200",
    "Download"
  ),
];

export default function SubscriptionStatusMob() {
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
          py: 1,
          pl: 2,
          pr: 4,
          mb: 4,
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
            <ChevronLeftIcon style={{ height: "45px", width: "45px" }} />
            <Typography
              style={{
                lineHeight: "24px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Subscription Status
            </Typography>
          </Box>
        </Box>
        <Box>
          <FilterAltTwoToneIcon style={{ color: "#323232" }} />
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        style={{ padding: "0px 10px 0px 10px" }}
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
                      py: 1.5,
                    }}
                  >
                    <Typography style={{ fontSize: "14px", fontWeight: 500 }}>
                      {row.productdetails}
                    </Typography>
                    <Box>
                      <DownloadIcon style={{ color: "#828282" }} />
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
                          Transaction ID
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: 600,
                          }}
                        >
                          {row.transactionid}
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
                            fontWeight: 600,
                          }}
                        >
                          {row.date}
                        </Typography>
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
                          Amount
                        </Typography>
                        <Typography
                          style={{
                            fontSize: "14px",
                            color: "black",
                            fontWeight: 600,
                          }}
                        >
                          {row.amount}/-
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
                          Status
                        </Typography>

                        {row.status === "Active" ? (
                          <Button
                            variant="standard"
                            style={{
                              backgroundColor: "#828282",
                              color: "white",
                              fontWeight: 400,
                              fontSize: "14px",
                              borderRadius: "24px",
                              padding: "4px 12px",
                            }}
                          >
                            {row.status}
                          </Button>
                        ) : (
                          <Button
                            variant="standard"
                            style={{
                              backgroundColor: "#BDBDBD",
                              color: "white",
                              fontWeight: 400,
                              fontSize: "14px",
                              borderRadius: "24px",
                              padding: "4px 12px",
                            }}
                          >
                            {row.status}
                          </Button>
                        )}
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
