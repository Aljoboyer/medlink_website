import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import porfilepic from "../../assets/profilepic.svg";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import PhoneIphoneTwoToneIcon from "@mui/icons-material/PhoneIphoneTwoTone";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";

function createData(
    id,
    name,
    avater,
    phone,
    email,
    location,
    experience,
    salaryRange,
    currentCompany,
    education,
    preferredLocation,
    skills,
    selected,
    verified
) {
    return {
        id,
        name,
        avater,
        phone,
        email,
        location,
        experience,
        salaryRange,
        currentCompany,
        education,
        preferredLocation,
        skills,
        selected,
        verified,
    };
}

let rows = [
    createData(
        "01",
        "Applicant's Name",
        porfilepic,
        "+91 9009090909",
        "manojkumar777@gmail.com",
        "Bangalore",
        "7",
        "10 Lakhs and 50 Thousand",
        "Company Name X",
        "Education Details",
        "All location preferred",
        [
            "Skill name 1",
            "Skill name 2",
            "Skill name 400",
            "Skill name 30",
            "Skill name 1",
            "Skill name 266",
            "Skill name 9267",
            "Skill name 3098",
            "Skill name 7",
            "Skill name 1",
            "Skill name 2",
            "Skill name",
            "Skill name 30",
            "Skill name 7",
        ],
        false,
        true
    ),
    createData(
        "02",
        "Applicant's Name",
        porfilepic,
        "+91 9009090909",
        "manojkumar777@gmail.com",
        "Bangalore",
        "7",
        "10 Lakhs and 50 Thousand",
        "Company Name X",
        "Education Details",
        "All location preferred",
        [
            "Skill name 1",
            "Skill name 2",
            "Skill name 400",
            "Skill name 30",
            "Skill name 1",
            "Skill name 266",
            "Skill name 9267",
            "Skill name 3098",
            "Skill name 7",
            "Skill name 1",
            "Skill name 2",
            "Skill name",
            "Skill name 30",
            "Skill name 7",
        ],
        true,
        false
    ),
    createData(
        "03",
        "Applicant's Name",
        porfilepic,
        "+91 9009090909",
        "manojkumar777@gmail.com",
        "Bangalore",
        "7",
        "10 Lakhs and 50 Thousand",
        "Company Name X",
        "Education Details",
        "All location preferred",
        [
            "Skill name 1",
            "Skill name 2",
            "Skill name 400",
            "Skill name 30",
            "Skill name 1",
            "Skill name 266",
            "Skill name 9267",
            "Skill name 3098",
            "Skill name 7",
            "Skill name 1",
            "Skill name 2",
            "Skill name",
            "Skill name 30",
            "Skill name 7",
        ],
        false,
        false
    ),
    createData(
        "03",
        "Applicant's Name",
        porfilepic,
        "+91 9009090909",
        "manojkumar777@gmail.com",
        "Bangalore",
        "7",
        "10 Lakhs and 50 Thousand",
        "Company Name X",
        "Education Details",
        "All location preferred",
        [
            "Skill name 1",
            "Skill name 2",
            "Skill name 400",
            "Skill name 30",
            "Skill name 1",
            "Skill name 266",
            "Skill name 9267",
            "Skill name 3098",
            "Skill name 7",
            "Skill name 1",
            "Skill name 2",
            "Skill name",
            "Skill name 30",
            "Skill name 7",
        ],
        false,
        false
    ),
    createData(
        "03",
        "Applicant's Name",
        porfilepic,
        "+91 9009090909",
        "manojkumar777@gmail.com",
        "Bangalore",
        "7",
        "10 Lakhs and 50 Thousand",
        "Company Name X",
        "Education Details",
        "All location preferred",
        [
            "Skill name 1",
            "Skill name 2",
            "Skill name 400",
            "Skill name 30",
            "Skill name 1",
            "Skill name 266",
            "Skill name 9267",
            "Skill name 3098",
            "Skill name 7",
            "Skill name 1",
            "Skill name 2",
            "Skill name",
            "Skill name 30",
            "Skill name 7",
        ],
        false,
        false
    ),
    createData(
        "03",
        "Applicant's Name",
        porfilepic,
        "+91 9009090909",
        "manojkumar777@gmail.com",
        "Bangalore",
        "7",
        "10 Lakhs and 50 Thousand",
        "Company Name X",
        "Education Details",
        "All location preferred",
        [
            "Skill name 1",
            "Skill name 2",
            "Skill name 400",
            "Skill name 30",
            "Skill name 1",
            "Skill name 266",
            "Skill name 9267",
            "Skill name 3098",
            "Skill name 7",
            "Skill name 1",
            "Skill name 2",
            "Skill name",
            "Skill name 30",
            "Skill name 7",
        ],
        false,
        false
    ),
    createData(
        "03",
        "Applicant's Name",
        porfilepic,
        "+91 9009090909",
        "manojkumar777@gmail.com",
        "Bangalore",
        "7",
        "10 Lakhs and 50 Thousand",
        "Company Name X",
        "Education Details",
        "All location preferred",
        [
            "Skill name 1",
            "Skill name 2",
            "Skill name 400",
            "Skill name 30",
            "Skill name 1",
            "Skill name 266",
            "Skill name 9267",
            "Skill name 3098",
            "Skill name 7",
            "Skill name 1",
            "Skill name 2",
            "Skill name",
            "Skill name 30",
            "Skill name 7",
        ],
        false,
        false
    ),
    createData(
        "03",
        "Applicant's Name",
        porfilepic,
        "+91 9009090909",
        "manojkumar777@gmail.com",
        "Bangalore",
        "7",
        "10 Lakhs and 50 Thousand",
        "Company Name X",
        "Education Details",
        "All location preferred",
        [
            "Skill name 1",
            "Skill name 2",
            "Skill name 400",
            "Skill name 30",
            "Skill name 1",
            "Skill name 266",
            "Skill name 9267",
            "Skill name 3098",
            "Skill name 7",
            "Skill name 1",
            "Skill name 2",
            "Skill name",
            "Skill name 30",
            "Skill name 7",
        ],
        false,
        false
    ),
    createData(
        "03",
        "Applicant's Name",
        porfilepic,
        "+91 9009090909",
        "manojkumar777@gmail.com",
        "Bangalore",
        "7",
        "10 Lakhs and 50 Thousand",
        "Company Name X",
        "Education Details",
        "All location preferred",
        [
            "Skill name 1",
            "Skill name 2",
            "Skill name 400",
            "Skill name 30",
            "Skill name 1",
            "Skill name 266",
            "Skill name 9267",
            "Skill name 3098",
            "Skill name 7",
            "Skill name 1",
            "Skill name 2",
            "Skill name",
            "Skill name 30",
            "Skill name 7",
        ],
        false,
        false
    ),
];

const times = [
    "1 month",
    "2 months",
    "3 months",
    "4 months",
    "5 months",
    "6 months",
];

const SearchResumeMini = () => {
    const [date, setDate] = React.useState("");
    const [form, setForm] = useState({
        jobTitle: "",
        location: "",
        qualification: "",
        employmentType: "",
        experience: "",
        lastDateToApply: new Date(),
        description: "",
        salaryRange: [0, 40000],
    });

    const formValueChange = (e) => {
        setForm((_form) => {
            let __form = { ..._form };
            __form[e.target.name] = e.target.value;
            return __form;
        });
        console.log(form);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    return (
        <Box sx={{ mx: "auto", mb: 4 }} maxWidth="sm">
            <Box
                sx={{
                    bgcolor: "#E0E0E0",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 1,
                    py: 2,
                }}
            >
                <Button
                    variant="text"
                    sx={{
                        color: "#323232",
                    }}
                >
                    <ArrowBackIosNewRoundedIcon fontSize="medium" />
                </Button>
                <Typography
                    sx={{
                        color: "#000000",
                        fontSize: "16px",
                        fontWeight: "600",
                    }}
                    variant="subtitle1"
                    component="div"
                >
                    Search Result
                </Typography>
            </Box>
            <Box sx={{ m: 2, pb: 4 }}>
                <Box
                    sx={{
                        p: 2,
                        borderRadius: "0.5rem",
                        bgcolor: "#F2F2F2",
                        py: 2,
                        px: 3,
                    }}
                >
                    <Grid
                        container
                        justifyContent="space-between"
                        rowSpacing={3}
                        columnSpacing={6}
                    >
                        <Grid item xs={12}>
                            <InputLabel
                                sx={{ color: "#6F7482", fontSize: "0.8rem" }}
                                htmlFor="Any_Keywords"
                            >
                                Any Keywords
                            </InputLabel>
                            <TextField
                                variant="outlined"
                                name="jobTitle"
                                type="text"
                                placeholder="Text"
                                value={form.jobTitle}
                                onChange={formValueChange}
                                id="Any_Keywords"
                                size="small"
                                fullWidth
                                sx={{
                                    color: "#6F7482",
                                    bgcolor: "#FFFFFF",
                                    borderRadius: 2,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel
                                sx={{ color: "#6F7482", fontSize: "0.8rem" }}
                                htmlFor="Industry"
                            >
                                Industry
                            </InputLabel>
                            <TextField
                                variant="outlined"
                                name="location"
                                type="text"
                                placeholder="Text"
                                value={form.location}
                                onChange={formValueChange}
                                id="Industry"
                                fullWidth
                                size="small"
                                sx={{
                                    color: "#6F7482",
                                    bgcolor: "#FFFFFF",
                                    borderRadius: 2,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            my: 3,
                            gap: 5,
                        }}
                    >
                        <Button
                            size="large"
                            variant="contained"
                            fullWidth
                            sx={{
                                borderRadius: 2,
                                backgroundColor: "#4F4F4F",
                                color: "white",
                            }}
                        >
                            Modify Search
                        </Button>
                        <Button
                            size="large"
                            variant="outlined"
                            fullWidth
                            sx={{
                                border: "2px solid #333333",
                                color: "#4F4F4F",
                                borderRadius: 2,
                            }}
                        >
                            New Search
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            my: 1,
                            gap: 5,
                        }}
                    >
                        <Button
                            size="large"
                            variant="text"
                            sx={{
                                color: "#4F4F4F",
                                px: 2.5,
                                fontSize: "16px",
                            }}
                        >
                            Save Search
                        </Button>
                    </Box>
                </Box>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mt: 3,
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            component="div"
                            style={{
                                fontSize: "12px",
                                color: "#6F7482",
                            }}
                        >
                            Result Found
                        </Typography>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                // fontSize: "12px",
                                color: "#3B4256",
                            }}
                        >
                            {rows.length}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            // gap: 5,
                        }}
                    >
                        <Box>
                            <InputLabel
                                htmlFor="active"
                                sx={{ color: "#6F7482", fontSize: "0.8rem" }}
                            >
                                Active In
                            </InputLabel>
                            <FormControl id="active" size="medium" fullWidth>
                                <Select
                                    sx={{ minWidth: 120 }}
                                    value={date}
                                    onChange={handleDateChange}
                                >
                                    {times.map((time) => (
                                        <MenuItem value={time} key={time}>
                                            {time}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <InputLabel
                                htmlFor="show"
                                sx={{ color: "#6F7482", fontSize: "0.8rem" }}
                            >
                                Show
                            </InputLabel>
                            <FormControl id="show" size="medium" fullWidth>
                                <Select
                                    sx={{ minWidth: 120 }}
                                    value={date}
                                    onChange={handleDateChange}
                                >
                                    {times.map((time) => (
                                        <MenuItem value={time} key={time}>
                                            {time}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            py: 3,
                            // gap:5
                        }}
                    >
                        <Box>
                            <FormControl
                                size="medium"
                                fullWidth
                                sx={{
                                    minWidth: 120,
                                    bgcolor: "#E0E0E0",
                                    border: "none",
                                }}
                            >
                                <Select
                                    value={date}
                                    onChange={handleDateChange}
                                >
                                    {times.map((time) => (
                                        <MenuItem value={time} key={time}>
                                            {time}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl
                                size="medium"
                                sx={{
                                    minWidth: 120,
                                    bgcolor: "#E0E0E0",
                                    border: "none",
                                }}
                            >
                                <Select
                                    value={date}
                                    onChange={handleDateChange}
                                >
                                    {times.map((time) => (
                                        <MenuItem value={time} key={time}>
                                            {time}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}
                    >
                        <FormGroup>
                            <FormControlLabel
                                sx={{
                                    color: "#333333",
                                    fontSize: "18px",
                                }}
                                control={<Checkbox defaultChecked />}
                                label="Select All"
                            />
                        </FormGroup>
                    </Box>
                </Box>
                <Box>
                    {rows.map((row) => (
                        <Grid
                            sx={{
                                bgcolor: "#F2F2F2",
                                borderRadius: 3,
                                p: 1.5,
                                mb: 3,
                                boxShadow: 1,
                            }}
                            container
                            spacing={1}
                        >
                            <Grid item xs={12}>
                                <Box>
                                    <FormControl
                                    // onClick={handleChackbox}
                                    >
                                        <Checkbox />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <img
                                        height="50px"
                                        width="50px"
                                        src={row.avater}
                                        alt="Applicant_avater"
                                    />
                                </Box>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ color: "#333333", pb: 1 }}
                                >
                                    {row.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: "#333333",
                                        pb: 1,
                                    }}
                                >
                                    <PhoneIphoneTwoToneIcon fontSize="medium" />{" "}
                                    {row.phone}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: "#333333",
                                        py: 1,
                                    }}
                                >
                                    <MailTwoToneIcon fontSize="medium" />{" "}
                                    {row.email}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: "#333333",
                                        py: 1,
                                    }}
                                >
                                    <LocationOnTwoToneIcon fontSize="medium" />{" "}
                                    {row.location}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: "#333333",
                                        py: 1,
                                    }}
                                >
                                    <WorkTwoToneIcon fontSize="medium" />{" "}
                                    {row.experience} years
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: "#333333",
                                        py: 1,
                                        mb: 2,
                                    }}
                                >
                                    <AccountBalanceWalletTwoToneIcon fontSize="medium" />
                                    {row.salaryRange} years
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 4,
                                        pt: 1,
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            sx={{
                                                color: "#6F7482",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Current
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#3B4256",
                                            }}
                                        >
                                            {row.currentCompany}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            sx={{
                                                color: "#6F7482",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Education
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#3B4256",
                                            }}
                                        >
                                            {row.education}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="caption"
                                            display="block"
                                            sx={{
                                                color: "#6F7482",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Preferred Location
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#3B4256",
                                            }}
                                        >
                                            {row.preferredLocation}
                                        </Typography>
                                    </Box>{" "}
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            component="div"
                                            sx={{
                                                color: "#333333",
                                                pb: 2,
                                            }}
                                        >
                                            Key Skills
                                        </Typography>
                                        <Box
                                            sx={{
                                                diplay: "flex",
                                                flexDirection: "row",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            {row.skills.map((skill) => (
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        color: "#333333",
                                                        fontWeight: "600",
                                                        fontSize: "14px",
                                                        display: "inline-block",
                                                        pr: 2,
                                                        py: 1,
                                                    }}
                                                >
                                                    {skill}
                                                </Typography>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default SearchResumeMini;
