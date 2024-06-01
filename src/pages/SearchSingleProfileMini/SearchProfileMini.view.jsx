import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import PhoneIphoneTwoToneIcon from "@mui/icons-material/PhoneIphoneTwoTone";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import ResumeIcon from "../../assets/Vector.svg";

// Comments section data
function createComment(id, name, time, textline, moreTextLine) {
  return { id, name, time, textline, moreTextLine };
}
const comments = [
  createComment(
    "011",
    "HR Name",
    "14 min",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus venenatis justo, ornare massa purus. Porttitor curabitur erat est id et. Dis sodales quis erenisi",
    "Sodales eget faucibus ullamcorper dolor nisl senectus. Vitae iaculis tellus purus nunc pellentesque orci euismod molestie enim. Blandit sed et hac ultricies id. Aliquam tristique facilisis eros quam morbi mauris et dui dictumst. Purus justo, tristique sit arcu, ipsum, a. Turpis vitae, semper mauris neque non ut fames nunc. Maecenas consequat pulvinar in quis pellentesque. Donec ac libero tempor ultrices sit. Semper facilisis accumsan, mi vestibulum, neque. Adipiscing vel aliquet id fringilla egestas enim libero morbi. Turpis et in fringilla quisque in commodo, cursus nulla. Placerat elit at velit eleifend sit eget sed egestas orci. Est, donec leo ullamcorper leo, imperdiet."
  ),
  createComment(
    "012",
    "HR Name",
    "14 min",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus venenatis justo, ornare massa purus. Porttitor curabitur erat est id et. Dis sodales quis erenisi",
    "Sodales eget faucibus ullamcorper dolor nisl senectus. Vitae iaculis tellus purus nunc pellentesque orci euismod molestie enim. Blandit sed et hac ultricies id. Aliquam tristique facilisis eros quam morbi mauris et dui dictumst. Purus justo, tristique sit arcu, ipsum, a. Turpis vitae, semper mauris neque non ut fames nunc. Maecenas consequat pulvinar in quis pellentesque. Donec ac libero tempor ultrices sit. Semper facilisis accumsan, mi vestibulum, neque. Adipiscing vel aliquet id fringilla egestas enim libero morbi. Turpis et in fringilla quisque in commodo, cursus nulla. Placerat elit at velit eleifend sit eget sed egestas orci. Est, donec leo ullamcorper leo, imperdiet."
  ),
];

// move filter data
const moves = ["10", "20", "30", "40"];

// User information
const userInfo = {
  name: "Applicant’s Name",
  phone: "+91 9009090909",
  email: "manojkumar777@gmail.com",
  location: "Bangalore",
  experience: "7 years",
  salary: "10 Lakhs and 50 Thousand",
  currentCompany: "Current company name goes here",
  education: "Education details goes here (Each will start with new line)",
  relocate: "All preferred location goes here",
  noticePriod: "3 Months",
  resumeHeadline:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra neque, lectus dui ullamcorper sit quis. Scelerisque suspendisse tristique etiam eleifend sit ut. Quis sed ut eget donec senectus. Tincidunt facilisis in massa sit cursus nisl vulputate commodo. Viverra integer gravida cras ipsum etiam bibendum blandit aliquam nisi. Est justo non dolor, interdum. Facilisis condimentum blandit tellus nulla quam id pharetra ac et.",
};

// skills
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

// Educations data
function createEduData(id, degree, institute, year, position) {
  return { id, degree, institute, year, position };
}
let eduInfos = [
  createEduData(
    "01",
    "M.B.B.S - Cardio",
    "Bengaluru Medical college",
    "2015",
    "Full Time"
  ),
  createEduData(
    "02",
    "M.B.B.S - Cardio",
    "Bengaluru Medical college",
    "2015",
    "Full Time"
  ),
  createEduData(
    "03",
    "M.B.B.S - Cardio",
    "Bengaluru Medical college",
    "2015",
    "Full Time"
  ),
];

// Experience Info
function createExperienceData(
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
let experienceInfos = [
  createExperienceData(
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
  createExperienceData(
    "02",
    "Cardio Surgeon",
    "Narayana Hospital",
    "Jan 2021 to Sep 2021",
    "9 months",
    [""],
    ""
  ),
];

function createPaperData(id, title, heading, url, date, description) {
  return { id, title, heading, url, date, description };
}
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

function createAwardData(id, title, heading, url, date, description) {
  return { id, title, heading, url, date, description };
}
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

// Accompishment Dynamic datas
function createSocialData(id, title, posts) {
  return { id, title, posts };
}
let socialInfos = [
  createSocialData("01", "Social media", [
    { heading: "Social media heading", url: "social media url goes here" },
    { heading: "Social media heading", url: "social media url goes here" },
  ]),
];

// personal details
function createLangData(id, language, proficiency, read, write, speak) {
  return { id, language, proficiency, read, write, speak };
}
let rows = [
  createLangData("01", "English", "Expert", "YES", "YES", "YES"),
  createLangData("02", "Hindi", "Expert", "YES", "YES", "YES"),
];

let personalInfo = {
  gender: "Male",
  homeTown: "Bengaluru",
  maritalStatus: "Single",
  ability: "YES",
};

// Resume details
const resumeDetails = {
  title: "Resume name here.pdf",
  date: "12/01/2022",
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

// Select datas
const statuses = ["Available", "Busy", "Away"];
const interestedes = ["A bit", "Huge", "Much"];
const callLeters = ["Some Time", "oneday", "oneWeek"];

const SearchSingleProfileMini = () => {
  const [selectValues, setSelectValues] = useState({
    status: "",
    interested: "",
    callLeter: "",
  });
  // comment expand handle
  const [expComment, setExpComment] = useState(false);
  const openComment = () => {
    setExpComment(true);
  };
  const closeComment = () => {
    setExpComment(false);
  };

  // select handle
  const [number, setNumber] = useState("");

  const handleChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSelectChange = (prop) => (event) => {
    setSelectValues({ ...selectValues, [prop]: event.target.value });
  };

  const { gender, homeTown, maritalStatus, ability } = personalInfo || {};
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
          Applicant Profile
        </Typography>
      </Box>
      <Box
        sx={{
          m: 2,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Physiotherapist tags input */}
        <Box
          sx={{
            bgcolor: "#F2F2F2",
            px: 2,
            py: 1,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#6F7482",
              fontSize: "0.8rem",
            }}
          >
            Add Tags for Physiotherapist
          </Typography>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              minHeight: "100px",
              border: "1px solid #BDBDBD",
              borderRadius: 1,
              display: "flex",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 2,
              p: 1.5,
            }}
          >
            <FormControl
              size="small"
              sx={{
                minWidth: 100,
                bgcolor: "#E0E0E0",
                border: "none",
                borderRadius: 3,
              }}
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
                Status
              </InputLabel>
              <Select
                label="Status"
                onChange={handleSelectChange("status")}
                value={selectValues.status}
                sx={{
                  color: "#6F7482",
                  bgcolor: "#FFFFFF",
                }}
              >
                <MenuItem value="" disabled>
                  <em>Set Status</em>
                </MenuItem>
                {statuses.map((option) => (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              size="small"
              sx={{
                minWidth: 130,
                bgcolor: "#E0E0E0",
                border: "none",
                borderRadius: 3,
              }}
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
                Interested
              </InputLabel>
              <Select
                label="Interested"
                onChange={handleSelectChange("interested")}
                value={selectValues.interested}
                sx={{
                  color: "#6F7482",
                  bgcolor: "#FFFFFF",
                }}
              >
                <MenuItem value="" disabled>
                  <em>Set Interested</em>
                </MenuItem>
                {interestedes.map((option) => (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              size="small"
              sx={{
                minWidth: 125,
                bgcolor: "#E0E0E0",
                border: "none",
                borderRadius: 3,
              }}
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
                Call Later
              </InputLabel>
              <Select
                label="Call Later"
                onChange={handleSelectChange("callLeter")}
                value={selectValues.callLeter}
                sx={{
                  color: "#6F7482",
                  bgcolor: "#FFFFFF",
                }}
              >
                <MenuItem value="" disabled>
                  <em>Set Call Later</em>
                </MenuItem>
                {callLeters.map((option) => (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Comments */}
        <Box sx={{ bgcolor: "#F2F2F2", borderRadius: 2, boxShadow: 1 }}>
          <Grid
            container
            spacing={2}
            alignItems="flex-end"
            sx={{ p: 2, pt: 1.5 }}
          >
            <Grid item xs={12}>
              <InputLabel
                sx={{
                  color: "#6F7482",
                  fontSize: "0.8rem",
                }}
                htmlFor="comment"
              >
                Comment
              </InputLabel>
              <TextField
                placeholder="Write your comment here"
                id="comment"
                size="small"
                type="text"
                fullWidth
                sx={{
                  color: "#6F7482",
                  bgcolor: "#FFFFFF",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained">Add Comment</Button>
            </Grid>
          </Grid>
          <Box
            sx={{
              px: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              overflow: "scroll",
            }}
          >
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                color: "#333333",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Previous Comments
            </Typography>
            {comments.map((comment) => (
              <Box /* sx={{ width: "85%" }} */ key={comment.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      color: "#333333",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {comment.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{
                      color: "#B4BBC6",
                      fontSize: "12px",
                      fontWeight: "400",
                    }}
                  >
                    {comment.time}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#828282",
                  }}
                >
                  {comment.textline}
                  {expComment ? (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#828282",
                      }}
                    >
                      {comment.moreTextLine}...&nbsp;
                      <Button
                        onClick={closeComment}
                        variant="text"
                        sx={{
                          color: "#4F4F4F",
                          fontSize: "14px",
                          fontWeight: "600",
                          display: "inline",
                        }}
                      >
                        Read Less
                      </Button>
                    </Typography>
                  ) : (
                    <>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#828282",
                          display: "inline-block",
                        }}
                      >
                        ...&nbsp;
                      </Typography>
                      <Button
                        onClick={openComment}
                        variant="text"
                        sx={{
                          color: "#4F4F4F",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        Read more
                      </Button>
                    </>
                  )}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Move Filter */}
        <Box style={{ textAlign: "right" }}>
          <FormControl
            size="small"
            sx={{
              minWidth: 130,
              bgcolor: "#E0E0E0",
              border: "none",
            }}
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
              Move To
            </InputLabel>
            <Select label="Shortlist" value={number} onChange={handleChange}>
              {moves.map((number) => (
                <MenuItem key={number} value={number}>
                  {number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* User info */}
        <Box
          sx={{
            bgcolor: "#F2F2F2",
            borderRadius: 2,
            boxShadow: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box>
              <img
                height="50px"
                width="50px"
                src="/circle-icon.png"
                alt="circle-avater"
              />
            </Box>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{
                color: "#333333",
                fontsize: "18px",
                fontWeight: "600",
              }}
            >
              {userInfo.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PhoneIphoneTwoToneIcon fontSize="small" />
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#333333",
                }}
              >
                {userInfo.phone}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <MailTwoToneIcon fontSize="small" />
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#333333",
                }}
              >
                {userInfo.email}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LocationOnTwoToneIcon fontSize="small" />
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#333333",
                }}
              >
                {userInfo.location}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <WorkTwoToneIcon fontSize="small" />

              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#333333",
                }}
              >
                {userInfo.experience}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AccountBalanceWalletTwoToneIcon fontSize="small" />

              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#333333",
                }}
              >
                {userInfo.salary}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
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
                  fontWeight: "600",
                }}
              >
                {userInfo.currentCompany}
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
                  fontWeight: "600",
                }}
              >
                {userInfo.education}
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
                  fontWeight: "600",
                }}
              >
                {userInfo.relocate}
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
                Notice Period
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#3B4256",
                  fontWeight: "600",
                }}
              >
                {userInfo.noticePriod}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                color: "#333333",
                fontSize: "18px",
                fontWeight: "600",
                pb: 2,
              }}
            >
              Resume Headline
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{
                color: "#4F4F4F",
                fontSize: "14px",
                fontWeight: "400",
                pb: 3,
              }}
            >
              {userInfo.resumeHeadline}
            </Typography>
          </Box>
        </Box>

        {/* KeySkills */}
        <Box
          sx={{
            bgcolor: "#F2F2F2",
            borderRadius: 2,
            boxShadow: 1,
            p: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "#333333",
              fontSize: "18px",
              fontWeight: "bold",
              pb: 1,
            }}
            gutterBottom
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
                }}
                variant="subtitle2"
              >
                {skill}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Educations */}
        <Box
          sx={{
            bgcolor: "#F2F2F2",
            borderRadius: 2,
            boxShadow: 1,
            p: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: "#333333",
              fontSize: "18px",
              fontWeight: "bold",
              pb: 1,
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
              gap: 2,
            }}
          >
            {eduInfos.map((info) => (
              <Box key={info.id}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#333333",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                  component="div"
                >
                  {info.degree}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#828282",
                    fontWeight: "medium",
                    fontSize: "12px",
                  }}
                  gutterBottom
                  component="div"
                >
                  {info.institute}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#828282",
                    fontWeight: "400",
                    fontSize: "12px",
                  }}
                  gutterBottom
                  component="div"
                >
                  {info.year}({info.position})
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Experiences */}
        <Box
          sx={{
            bgcolor: "#F2F2F2",
            p: 2.5,
            pb: 0.5,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#333333",
              fontSize: "18px",
              fontWeight: "bold",
              pb: 1,
            }}
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
            {experienceInfos.map((info) => (
              <Box key={info.id}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#333333",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                  component="div"
                >
                  {info.position}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#828282",
                    fontWeight: "400",
                    fontSize: "12px",
                  }}
                  gutterBottom
                  component="div"
                >
                  {info.company}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#828282",
                    fontWeight: "400",
                    fontSize: "12px",
                  }}
                  gutterBottom
                  component="div"
                >
                  {info.year}({info.time})
                </Typography>
                <Box sx={{ pl: 1, pb: 2.5 }}>
                  {info.descriptions.map((description) => (
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "#828282",
                        fontWeight: "400",
                        fontSize: "12px",
                      }}
                      component="div"
                    >
                      {description}
                    </Typography>
                  ))}
                </Box>

                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#828282",
                    fontWeight: "400",
                    fontSize: "12px",
                  }}
                  gutterBottom
                  component="div"
                >
                  {info.noticePriod}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Accomplishment */}
        <Box
          sx={{
            bgcolor: "#F2F2F2",
            p: 2.5,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#333333",
              fontSize: "18px",
              fontWeight: "bold",
              pb: 1,
            }}
            component="div"
          >
            Accomplishments
          </Typography>
          <Box sx={{ px: 0.5 }}>
            {socialInfos.map((socialInfo) => (
              <Box key={socialInfo.id}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#333333",
                    fontWeight: "600",
                    fontSize: "14px",
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
                          fontSize: "12px",
                        }}
                        gutterBottom
                        component="div"
                      >
                        {post.heading}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#828282",
                          fontWeight: "400",
                          textDecoration: "underline",
                          fontSize: "12px",
                        }}
                        gutterBottom
                        component="div"
                      >
                        {post.url}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
          <Divider sx={{ color: "#333333", fontWeight: "bold", my: 4 }} />
          <Box sx={{ px: 0.5 }}>
            {PaperWorks.map((paperWork) => (
              <Box key={paperWork.id}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#333333",
                    fontWeight: "600",
                    fontSize: "14px",
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
                    fontSize: "12px",
                  }}
                  gutterBottom
                  component="div"
                >
                  {paperWork.heading}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#828282",
                    fontWeight: "400",
                    fontSize: "12px",
                    textDecoration: "underline",
                  }}
                  gutterBottom
                  component="div"
                >
                  {paperWork.url}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#828282",
                    fontWeight: "400",
                    fontSize: "12px",
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
                    fontSize: "12px",
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
          <Divider sx={{ color: "#333333", fontWeight: "bold", my: 4 }} />
          <Box sx={{ px: 0.5 }}>
            {awards.map((award) => (
              <Box key={award.id}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#333333",
                    fontWeight: "600",
                    fontSize: "14px",
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
                    fontSize: "12px",
                  }}
                  gutterBottom
                  component="div"
                >
                  {award.heading}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#828282",
                    fontWeight: "400",
                    textDecoration: "underline",
                    fontSize: "12px",
                  }}
                  gutterBottom
                  component="div"
                >
                  {award.url}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#828282",
                    fontWeight: "400",
                    fontSize: "12px",
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
                    fontSize: "12px",
                  }}
                  gutterBottom
                  component="div"
                >
                  {award.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Personal details */}
        <Box
          sx={{
            bgcolor: "#F2F2F2",
            p: 2.5,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
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
              variant="subtitle1"
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
                <TableCell className={headerCell}>Languages</TableCell>
                <TableCell className={headerCell}>Proficiency</TableCell>
                <TableCell className={headerCell}>Read</TableCell>
                <TableCell className={headerCell}>Write</TableCell>
                <TableCell className={headerCell}>Speak</TableCell>
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
                    <TableCell className={bodyCell}>{row.language}</TableCell>
                    <TableCell className={bodyCell}>
                      {row.proficiency}
                    </TableCell>
                    <TableCell className={bodyCell}>{row.read}</TableCell>
                    <TableCell className={bodyCell}>{row.write}</TableCell>
                    <TableCell className={bodyCell}>{row.speak}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>

        {/* Resume details */}
        <Box
          sx={{
            bgcolor: "#F2F2F2",
            p: 2.5,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
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
                    padding: 0,
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
                    padding: 0,
                  }}
                >
                  Download
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchSingleProfileMini;
