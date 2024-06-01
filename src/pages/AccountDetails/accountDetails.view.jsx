import {
    Box,
    Breadcrumbs,
    Button, 
    Grid,
    Input,
    InputBase,
    InputLabel,
    MenuItem,
    Select,
    Snackbar, 
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";

const roles = ["Recruter", "Manager", "CEO"];

// Custom style for mui Select border
const CustomSelectInput = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
        borderRadius: "4px",
        position: "relative",
        border: "1px solid var(--clr-blue-light) !important",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontSize: "15px",
        color: "var(--clr-blue-footer)",
        padding: "10px 26px 10px 12px",

        "&:focus": {
            borderRadius: 4,
            borderColor: "red",
        },
    },
}));

// Custom style for Select dropdown
const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    menuPaper: {
        maxHeight: 180,
    },
    select: {
        "&:before": {
            borderColor: "var(--clr-blue-light)",
        },
        "&:after": {
            borderColor: "var(--clr-blue-light)",
        },
        "&:not(.Mui-disabled):hover::before": {
            borderColor: "var(--clr-blue-light)",
        },
    },
    icon: {
        fill: "var(--clr-blue-footer)",
    },
}));

const AccountDetails = () => {
    const { pathname } = useLocation();
    const [userRole, setUserRole] = useState("");
    const classes = useStyles();
    document.title = "Recruiter Account Details | MedLink Jobs";

    // handle snacks Pupup
    const [open, setOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);

    const handleSnacksOpen = () => {
        setOpen(true);
    };
    const handleSnacksClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setUserRole(value);
    };

    // Onsubmit handler
    const handleAccountDetails = () => {
        handleSnacksOpen();
    };

    return (
        <Box maxWidth="md" sx={{ mx: "auto", mb: 4, }}>
            <Box sx={{ py: 2 }}>
                <Breadcrumbs
                    separator={<NavigateNextIcon sx={{ color: "var(--clr-blue-footer)" }} fontSize="small" />}
                    aria-label="breadcrumb"
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
                        to="/hospital-dashboard"
                    >
                        Profile
                    </Link>
                    <Typography sx={{ color: "var(--clr-blue-footer)" }}>
                        Company Profile
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Typography
                variant="h5"
                sx={{
                    my: 2,
                    fontWeight: "600",
                    color: "var(--clr-blue-footer)",
                }}
            >
                Account Details
            </Typography>
            <Box
                sx={{
                    p: 5, pb: 3.5,
                    borderRadius: 1,
                    bgcolor: "var(--clr-white)",
                    boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)"
                }}
            >
                <Grid
                    container
                    justifyContent="space-between"
                    rowSpacing={4}
                    columnSpacing={8}
                >
                    <Grid item xs={6}>
                        <InputLabel sx={{ pb: 0.5 }}>Username</InputLabel>
                        <Input
                            disableUnderline
                            placeholder="Title name here"
                            type="text"
                            fullWidth
                            sx={{
                                color: "var(--clr-blue-footer)",
                                borderRadius: 1,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel sx={{ pb: 0.5 }}>Email for Communication</InputLabel>
                        <Input
                            disableUnderline
                            placeholder="text"
                            type="email"
                            fullWidth
                            sx={{
                                color: "var(--clr-blue-footer)",
                                borderRadius: 1,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel sx={{ pb: 0.5 }}>Role</InputLabel>
                        <Select
                            displayEmpty
                            fullWidth
                            MenuProps={{ classes: { paper: classes.menuPaper } }}
                            inputProps={{ classes: { icon: classes.icon } }}
                            input={<CustomSelectInput />}
                        >
                            <MenuItem value="" disabled>
                                Set course
                            </MenuItem>
                            {roles?.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel sx={{ pb: 0.5 }}>Reporting Manager</InputLabel>
                        <Input
                            disableUnderline
                            placeholder="text"
                            type="email"
                            fullWidth
                            sx={{
                                color: "var(--clr-blue-footer)",
                                borderRadius: 1,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel sx={{ pb: 0.5 }}>Mobile Number</InputLabel>
                        <Input
                            disableUnderline
                            placeholder="text"
                            type="tel"
                            fullWidth
                            sx={{
                                color: "var(--clr-blue-footer)",
                                borderRadius: 1,
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 4,
                    py: 4,
                    justifyContent: "flex-end",
                }}
            >
                <Button
                    sx={{ 
                        borderRadius: 16,
                        borderWidth: "2px",
                    }}
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleAccountDetails}
                    sx={{ borderRadius: 16 }}
                    variant="contained"
                >
                    Save
                </Button>
            </Box>
            <Box>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleSnacksClose}
                    message="Note archived"
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    sx={{ bgColor: "#D8D8D8" }}
                >
                    <div
                        style={{
                            backgroundColor: "#F4F4F4",
                            border: "1px solid #D8D8D8",
                            boxShadow: "5px 3px 10px #DDDDDD",
                            borderRadius: "12px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: 600,
                                // gap: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <Button>
                                    <AddCircleOutlineOutlinedIcon />
                                </Button>
                                <Box>
                                    <Typography
                                        sx={{
                                            color: "#1A1A1A",
                                            fontSize: "16px",
                                            fontWeight: "700",
                                        }}
                                        variant="subtitle1"
                                    >
                                        Toast Title
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#1A1A1A",
                                            fontSize: "12px",
                                            fontWeight: "400",
                                        }}
                                        variant="body2"
                                    >
                                        Toast message goes here. Lorem ipsum.
                                    </Typography>
                                </Box>
                            </Box>

                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 2,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                }}
                            >
                                Buy Now
                            </Button>
                        </Box>
                    </div>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default AccountDetails;
