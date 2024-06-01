import React, { useState } from "react";

import {
    Box,
    Button,
    Card,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Divider,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import FolderTwoToneIcon from "@mui/icons-material/FolderTwoTone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ResumeIcon from "../../assets/Vector.svg";

const skills = [
    "Skill name 1",
    "Skill name 2",
    "Skill name 3",
    "Skill name 400",
    "Skill 6",
    "Skill name 30",
    "Skill 7",
    "Skill name 8000",
    "Skill 9",
    "Skill name 10",
];

function createData(id, degree, institute, year, position) {
    return { id, degree, institute, year, position };
}

let infos = [
    createData(
        "01",
        "M.B.B.S - Cardio",
        "Bengaluru Medical college",
        "2015",
        "Full Time"
    ),
    createData(
        "02",
        "M.B.B.S - Cardio",
        "Bengaluru Medical college",
        "2015",
        "Full Time"
    ),
    createData(
        "03",
        "M.B.B.S - Cardio",
        "Bengaluru Medical college",
        "2015",
        "Full Time"
    ),
];

function createExpData(
    id,
    position,
    company,
    year,
    time,
    descriptions,
    noticePriod
) {
    return { id, position, company, year, time, descriptions, noticePriod };
}

let expInfos = [
    createExpData(
        "01",
        "Cardio Surgeon",
        "Apollo Hospital",
        "Jan 2021 to Sep 2021",
        "9 months",
        [
            "1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum, semper leo ullamcorper amet. Amet, interdum turpis malesuada volutpat.",
            "2. Hendrerit consectetur elementum, amet urna vulputate erat. Neque, vulputate risus viverra amet etiam dui. Feugiat dictumst senectus eu, ut nibh molestie at. Non justo.",
        ],
        "Notice period 3 Months"
    ),
    createExpData(
        "02",
        "Cardio Surgeon",
        "Narayana Hospital",
        "Jan 2021 to Sep 2021",
        "9 months",
        [""],
        ""
    ),
];

function createSocialData(id, title, posts) {
    return { id, title, posts };
}

function createPaperData(id, title, heading, url, date, description) {
    return { id, title, heading, url, date, description };
}

function createAwardData(id, title, heading, url, date, description) {
    return { id, title, heading, url, date, description };
}

let socialInfos = [
    createSocialData("01", "Social media", [
        { heading: "Social media heading", url: "social media url goes here" },
        { heading: "Social media heading", url: "social media url goes here" },
    ]),
];

let PaperWorks = [
    createPaperData(
        "01",
        "Papers",
        "Paper heading",
        "presentation of paper url goes here",
        "January 16, 2021",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec justo blandit turpis pretium feugiat mollis sed. Consequat congue ullamcorper nulla vivamus. Tristique enim consequat elementum eu eget nunc est urna lorem. Dolor sagittis."
    ),
];

let awards = [
    createAwardData(
        "01",
        "Awards",
        "Award name here",
        "Award complete url goes here",
        "April 24, 2015",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec justo blandit turpis pretium feugiat mollis sed."
    ),
];

let info = {
    gender: "Male",
    homeTown: "Bengaluru",
    maritalStatus: "Single",
    ability: "YES",
};

// MUI custom styles
const useStyles = makeStyles({
    headerCell: {
        color: "#333333",
        fontSize: "12px",
        fontWeight: 600,
        textAlign: "left",
        margin: 0,
        padding: "8px 0 15px",
        border: "none",
    },

    bodyCell: {
        color: "#828282",
        fontSize: "12px",
        fontWeight: 400,
        textAlign: "left",
        margin: 0,
        padding: "8px 0",
        border: "none",
    },
});

function createTableData(id, language, proficiency, read, write, speak) {
    return { id, language, proficiency, read, write, speak };
}

let rows = [
    createTableData("01", "English", "Expert", "YES", "YES", "YES"),
    createTableData("02", "Hindi", "Expert", "YES", "YES", "YES"),
];

const resumeDetails = {
    title: "Resume name here.pdf",
    date: "12/01/2022",
};

const ApplicantDetailsMini = () => {
    const [number, setNumber] = useState("");

    const numbers = ["10", "20", "30", "40"];

    const handleChange = (event) => {
        setNumber(event.target.value);
    };

    const { gender, homeTown, maritalStatus, ability } = info || {};

    const { headerCell, bodyCell } = useStyles();

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
                    Applicant’s Details
                </Typography>
            </Box>
            <Box
                sx={{ display: "flex", flexDirection: "column", gap: 3, m: 2 }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <FormControl
                            size="small"
                            sx={{ minWidth: 140, bgcolor: "#E0E0E0" }}
                        >
                            <InputLabel
                                style={{
                                    color: "#000000",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                Shortlist
                            </InputLabel>
                            <Select
                                label="Shortlist"
                                value={number}
                                onChange={handleChange}
                            >
                                {numbers.map((num) => (
                                    <MenuItem key={num} value={num}>
                                        {num}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl
                            size="small"
                            sx={{ minWidth: 140, bgcolor: "#E0E0E0" }}
                        >
                            <InputLabel
                                style={{
                                    color: "#000000",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <FolderTwoToneIcon />{" "}
                                <Typography sx={{ pl: 1 }} />
                                Folder
                            </InputLabel>
                            <Select
                                label="Shortlist"
                                value={number}
                                onChange={handleChange}
                            >
                                {numbers.map((num) => (
                                    <MenuItem key={num} value={num}>
                                        {num}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                <Box>
                    <Card sx={{ bgcolor: "#F2F2F2", p: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box>
                                    <img
                                        src="/circle-icon.png"
                                        alt="circle-avater"
                                        height="60"
                                        width="60"
                                    />
                                </Box>
                                <Box>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        component="div"
                                        sx={{
                                            color: "#333333",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Applicant’s Name
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            color: "#333333",
                                        }}
                                        variant="body2"
                                        gutterBottom
                                    >
                                        +91 90980 908762 &nbsp;
                                        <CheckCircleIcon
                                            color="success"
                                            fontSize="1rem"
                                        />
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            color: "#333333",
                                        }}
                                        variant="body2"
                                        gutterBottom
                                    >
                                        manoj112@gmail.com &nbsp;
                                        <CheckCircleIcon
                                            color="success"
                                            fontSize="1rem"
                                        />
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ my: "auto" }}>
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: "14px", color: "#333333" }}
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Feugiat neque faucibus in
                                    dui, a. Integer sollicitudin eget nisl ac
                                    libero eu sed sollicitudin. Erat egestas
                                    malesuada dictum cursus amet. Amet cursus
                                    vel, porttitor enim. Erat egestas malesuada
                                    dictum cursus amet.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
                <Box>
                    <Card sx={{ bgcolor: "#F2F2F2", p: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#333333",
                                fontWeight: "bold",
                                px: 1,
                                pb: 2,
                                fontSize: "18px",
                            }}
                            component="div"
                        >
                            Key Skills
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 2,
                            }}
                        >
                            {skills.map((skill) => (
                                <Typography
                                    sx={{
                                        bgcolor: "#E0E0E0",
                                        color: "#333333",
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,
                                        fontWeight: "600",
                                    }}
                                    variant="subtitle2"
                                >
                                    {skill}
                                </Typography>
                            ))}
                        </Box>
                    </Card>
                </Box>
                <Box>
                    <Card sx={{ bgcolor: "#F2F2F2", px: 2.5, py: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#333333",
                                fontWeight: "bold",
                                pb: 3,
                                fontSize: "18px",
                            }}
                            component="div"
                        >
                            Education
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                gap: 4,
                            }}
                        >
                            {infos.map((info) => (
                                <Box key={info.id}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            color: "#333333",
                                            fontWeight: "600",
                                        }}
                                        component="div"
                                        gutterBottom
                                    >
                                        {info.degree}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "medium",
                                        }}
                                        gutterBottom
                                        component="div"
                                    >
                                        {info.institute}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: "#828282",
                                        }}
                                        gutterBottom
                                        component="div"
                                    >
                                        {info.year}({info.position})
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Box>
                <Box>
                    <Card sx={{ bgcolor: "#F2F2F2", px: 2.5, py: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#333333",
                                fontWeight: "bold",
                                pb: 1,
                                fontSize: "18px",
                            }}
                            gutterBottom
                            component="div"
                        >
                            Experience
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                gap: 3,
                            }}
                        >
                            {expInfos.map((expInfo) => (
                                <Box key={expInfo.id}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            color: "#333333",
                                            fontWeight: "600",
                                        }}
                                        component="div"
                                        gutterBottom
                                    >
                                        {expInfo.position}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "medium",
                                        }}
                                        gutterBottom
                                        component="div"
                                    >
                                        {expInfo.company}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "400",
                                        }}
                                        gutterBottom
                                        component="div"
                                    >
                                        {expInfo.year}({expInfo.time})
                                    </Typography>
                                    <Box sx={{ pl: 1, pb: 1 }}>
                                        {expInfo.descriptions.map(
                                            (description) => (
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        color: "#828282",
                                                        fontWeight: "400",
                                                    }}
                                                    component="div"
                                                >
                                                    {description}
                                                </Typography>
                                            )
                                        )}
                                    </Box>

                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "400",
                                        }}
                                        gutterBottom
                                        component="div"
                                    >
                                        {expInfo.noticePriod}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Box>
                <Box>
                    <Card sx={{ bgcolor: "#F2F2F2", px: 2.5, py: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#333333",
                                fontWeight: "bold",
                                pb: 1,
                                fontSize: "18px",
                            }}
                            gutterBottom
                            component="div"
                        >
                            Accomplishments
                        </Typography>
                        <Box>
                            {socialInfos.map((socialInfo) => (
                                <Box key={socialInfo.id}>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{
                                            color: "#333333",
                                            fontWeight: "600",
                                            pb: 1,
                                        }}
                                        component="div"
                                    >
                                        {socialInfo.title}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "flex-start",
                                            gap: 3,
                                        }}
                                    >
                                        {socialInfo.posts.map((post) => (
                                            <Box>
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{
                                                        color: "#828282",
                                                        fontWeight: "medium",
                                                    }}
                                                    gutterBottom
                                                    component="div"
                                                >
                                                    {post.heading}
                                                </Typography>
                                                <Button
                                                    variant="text"
                                                    sx={{
                                                        color: "#828282",
                                                        fontWeight: "400",
                                                        textDecoration:
                                                            "underline",
                                                        padding: 0,
                                                    }}
                                                    component="div"
                                                >
                                                    {post.url}
                                                </Button>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Divider
                            sx={{
                                color: "#333333",
                                fontWeight: "bold",
                                my: 2.5,
                            }}
                        />
                        <Box>
                            {PaperWorks.map((paperWork) => (
                                <Box key={paperWork.id}>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{
                                            color: "#333333",
                                            fontWeight: "600",
                                            pb: 1,
                                        }}
                                        component="div"
                                    >
                                        {paperWork.title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "medium",
                                        }}
                                        gutterBottom
                                        component="div"
                                    >
                                        {paperWork.heading}
                                    </Typography>
                                    <Button
                                        variant="text"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "400",
                                            textDecoration: "underline",
                                            padding: 0,
                                            mb: 1,
                                        }}
                                        component="div"
                                    >
                                        {paperWork.url}
                                    </Button>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "400",
                                        }}
                                        gutterBottom
                                        component="div"
                                    >
                                        {paperWork.date}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "400",
                                            pt: 1,
                                        }}
                                        gutterBottom
                                        component="div"
                                    >
                                        {paperWork.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Divider
                            sx={{ color: "#333333", fontWeight: "bold", my: 4 }}
                        />
                        <Box>
                            {awards.map((award) => (
                                <Box key={award.id}>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                        sx={{
                                            color: "#333333",
                                            fontWeight: "600",
                                            pb: 1,
                                        }}
                                        component="div"
                                    >
                                        {award.title}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "medium",
                                        }}
                                        gutterBottom
                                        component="div"
                                    >
                                        {award.heading}
                                    </Typography>
                                    <Button
                                        variant="text"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "400",
                                            textDecoration: "underline",
                                            padding: 0,
                                            mb: 1,
                                        }}
                                        component="div"
                                    >
                                        {award.url}
                                    </Button>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "400",
                                        }}
                                        gutterBottom
                                        component="div"
                                    >
                                        {award.date}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "400",
                                            pt: 1,
                                        }}
                                        gutterBottom
                                        component="div"
                                    >
                                        {award.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Box>
                <Box>
                    <Card sx={{ bgcolor: "#F2F2F2", px: 2.5, py: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#333333",
                                fontWeight: "bold",
                                pb: 1,
                                fontSize: "18px",
                            }}
                            gutterBottom
                            component="div"
                        >
                            Personal Details
                        </Typography>
                        <Box
                            sx={{
                                px: 1,
                                pb: 3,
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                    color: "#828282",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{ width: "60%" }}
                                >
                                    Gander
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{ width: "35%", color: "#4F4F4F" }}
                                >
                                    {gender}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                    color: "#828282",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{ width: "60%" }}
                                >
                                    Home Town
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{ width: "35%", color: "#4F4F4F" }}
                                >
                                    {homeTown}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                    color: "#828282",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{ width: "60%" }}
                                >
                                    Marital Status
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{ width: "20%", color: "#4F4F4F" }}
                                >
                                    {maritalStatus}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                    color: "#828282",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{ width: "60%" }}
                                >
                                    Differently Abled
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    component="div"
                                    sx={{ width: "20%", color: "#4F4F4F" }}
                                >
                                    {ability}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: "#333333",
                                    fontWeight: "600",
                                    pb: 1,
                                }}
                                component="div"
                                gutterBottom
                            >
                                Languages Known
                            </Typography>
                            <Table className="table">
                                <TableHead
                                    sx={{
                                        mx: 0,
                                        px: 0,
                                        borderBottom: 0,
                                    }}
                                >
                                    <TableCell className={headerCell}>
                                        Languages
                                    </TableCell>
                                    <TableCell className={headerCell}>
                                        Proficiency
                                    </TableCell>
                                    <TableCell className={headerCell}>
                                        Read
                                    </TableCell>
                                    <TableCell className={headerCell}>
                                        Write
                                    </TableCell>
                                    <TableCell className={headerCell}>
                                        Speak
                                    </TableCell>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{
                                                mx: 0,
                                                px: 0,
                                                color: "#828282",
                                            }}
                                        >
                                            <TableCell className={bodyCell}>
                                                {row.language}
                                            </TableCell>
                                            <TableCell className={bodyCell}>
                                                {row.proficiency}
                                            </TableCell>
                                            <TableCell className={bodyCell}>
                                                {row.read}
                                            </TableCell>
                                            <TableCell className={bodyCell}>
                                                {row.write}
                                            </TableCell>
                                            <TableCell className={bodyCell}>
                                                {row.speak}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Card>
                </Box>
                <Box>
                    <Card sx={{ bgcolor: "#F2F2F2", px: 3, pt: 2, pb: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{ color: "#333333", fontWeight: "bold", pb: 1 }}
                            gutterBottom
                            component="div"
                        >
                            Resume
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: 3,
                                px: 1,
                            }}
                        >
                            <Box>
                                <img src={ResumeIcon} alt="Resume_icon" />
                            </Box>
                            <Box sx={{ px: 2 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: "#4F4F4F", fontWeight: "600" }}
                                    component="div"
                                >
                                    {resumeDetails.title}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    display="block"
                                    sx={{ color: "#828282", fontWeight: "400" }}
                                >
                                    Uploaded on: {resumeDetails.date}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 3,
                                        color: "#828282",
                                        pt: 2,
                                    }}
                                >
                                    <Button
                                        variant="text"
                                        gutterBottom
                                        component="div"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "600",
                                            textDecoration: "underline",
                                            padding: 0
                                        }}
                                    >
                                        View Resume
                                    </Button>
                                    <Button
                                        variant="text"
                                        gutterBottom
                                        component="div"
                                        sx={{
                                            color: "#828282",
                                            fontWeight: "600",
                                            textDecoration: "underline",
                                            padding: 0
                                        }}
                                    >
                                        Download
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default ApplicantDetailsMini;
