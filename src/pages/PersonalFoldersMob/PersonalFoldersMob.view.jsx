import { Box, IconButton, Typography } from "@mui/material";
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
import { createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const theme = createTheme();
const useStyles = makeStyles({});

const options = ["None", "Atria", "Callisto"];

const ITEM_HEIGHT = 48;

function IconLabelButtons() {
  return (
    <Stack direction="row">
      <Button
        style={{
          backgroundColor: "#E0E0E0",
          padding: "0 15px 0 15px",
        }}
        startIcon={<FilterAltTwoToneIcon style={{ color: "#323232" }} />}
      >
        <p style={{ color: "black" }}>Filter </p>
      </Button>
    </Stack>
  );
}

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

function createData(foldername, lastupdatedby) {
  return { foldername, lastupdatedby };
}
let rows = [
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
  createData("Folder Name", "HR Name Here"),
];

export default function PersonalFoldersMob() {
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
              Personal Folders
            </Typography>
          </Box>
        </Box>
        <Box>
          <FilterAltTwoToneIcon style={{ color: "#323232" }} />
        </Box>
      </Box>
      <Box sx={{ my: 3, px: 2 }}>
        <Button
          variant="contained"
          style={{
            width: "100%",
            padding: "8px 0 8px 0",
            color: "white",
            borderRadius: "10px",
            fontSize: 16,
            lineHeight: 1.5,
            letterSpacing: 1,
          }}
        >
          Create
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <TableContainer
          component={Paper}
          style={{ padding: "0px 16px 0px 16px" }}
        >
          <Table aria-label="simple table">
            <TableBody sx={{}}>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    style={{
                      backgroundColor: "#F2F2F2",
                      boxShadow: "0px 6px 12px 0px #B3B3B359",
                    }}
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
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#4F4F4F",
                        }}
                      >
                        {row.foldername}
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
                              marginBottom: "6px",
                              color: "#828282",
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
              style={{
                backgroundColor: "#F2F2F2",
                width: "100%",
                marginTop: "-2px",
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
