import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import CircularProgress from "@mui/material/CircularProgress";

import { makeStyles } from "@material-ui/core/styles";


// MUI custom styles
const useStyles = makeStyles({
  headerCell: {
    color: "var(--clr-gray-2)",
    fontSize: "0.8rem",
    fontWeight: 600,
    textAlign: "left",
    margin: 0,
    padding: "8px 0 15px",
    border: "none",
  },

  bodyCell: {
    color: "var(--clr-gray-3)",
    fontSize: "0.8rem",
    fontWeight: 400,
    textAlign: "left",
    margin: 0,
    padding: "8px 0",
    border: "none",
  },
});

const PersonalDetails = (props) => {
  const { headerCell, bodyCell } = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [personalDetails, setPersonalDetails] = useState({});
  const [languagesKnown, setLanguagesKnown] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  // document.title = "Personal Details | MedLink Jobs";

  useEffect(() => {
    const QUERY_GETPERSONALDETAILSBYAPPLICANT = {
      query: `query MyQuery {
        getPersonalDetailsByApplicant(userID : "${props.userID}") {
              address
              dateofBirth
              differentlyAbled
              gender
              homeTown
              maritalStatus
              pdID
             }
          }`
    };
    gqlquery(QUERY_GETPERSONALDETAILSBYAPPLICANT, null)
      .then((res) => res.json())
      .then((data) => {
        if(data?.data?.getPersonalDetailsByApplicant) {
          setPersonalDetails(data?.data?.getPersonalDetailsByApplicant)
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const QUERY_GETLANGUAGESKNOWNBYAPPLICANT = {
      query: `query MyQuery {
          getLanguagesKnownByApplicant(userID : "${props.userID}") {
                language
                lknID
                read
                proficiency
                speak
                write
              }
            }`
    };
    gqlquery(QUERY_GETLANGUAGESKNOWNBYAPPLICANT, null)
      .then((res) => res.json())
      .then((data) => setLanguagesKnown(data?.data?.getLanguagesKnownByApplicant));
  }, []);

  return (
    <Box>
      <Card sx={{ 
        bgcolor: "var(--clr-white)", 
        boxShadow: !matches ? "0px 9px 18px rgba(69, 143, 246, 0.09)" : "0px 0px 0px 0px",
        border: !matches ? "" : "1px solid #E4EEF5" , 
        px: matches ? 1.25 : 2.5, 
        py: matches ? 1.25 : 2  
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "var(--clr-blue-footer)", fontWeight: "bold",pb: matches ? 1.72 : 2 , fontSize: matches ? "18px" : "24px" }}
          gutterBottom
          component="div"
        >
          Personal Details
        </Typography>
        {
          Object.keys(personalDetails).length > 0 ? <Box
            sx={{
              pb: 4,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  width: matches ? "250px" : "200px",
                  color: "var(--clr-gray-3)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Gender
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  color: "var(--clr-gray-2)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  width: "70%"
                }}
              >
                {personalDetails?.gender}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  width: matches ? "250px" : "200px",
                  color: "var(--clr-gray-3)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Date of Birth
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  width: "70%",
                  color: "var(--clr-gray-2)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {personalDetails?.dateofBirth}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  width: matches ? "250px" : "200px",
                  color: "var(--clr-gray-3)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Home Town
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  width: "70%",
                  color: "var(--clr-gray-2)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {personalDetails?.homeTown}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  width: matches ? "250px" : "200px",
                  color: "var(--clr-gray-3)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Permanent Address
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  width: "70%",
                  color: "var(--clr-gray-2)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {personalDetails?.address}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  width: matches ? "250px" : "200px",
                  color: "var(--clr-gray-3)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Marital Status
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  width: "70%",
                  color: "var(--clr-gray-2)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {personalDetails?.maritalStatus}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  width: matches ? "250px" : "200px",
                  color: "var(--clr-gray-3)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Differently Abled
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                sx={{
                  width: "70%",
                  color: "var(--clr-gray-2)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {personalDetails?.differentlyAbled ? "YES" : "NO"}
              </Typography>
            </Box>
          </Box> : <Typography variant="body2"
            gutterBottom sx={{
              color: "var(--clr-gray-3)",
              fontSize: "14px",
              fontWeight: "600 !important",
              mb: 1,
            }}>
            No Details Found
          </Typography>
        }

        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: "var(--clr-gray-1)",
              fontWeight: "600",
              fontSize: "1rem",
            }}
            component="div"
            gutterBottom
          >
            Languages Known
          </Typography>
          {
            languagesKnown.length > 0 ? <Box sx={{ width: matches ? "100%" : "70%", mb: 1 }}>
              <Table className="table">
                <TableHead
                  sx={{
                    mx: 0,
                    px: 0,
                    borderBottom: 0,
                  }}
                >
                  <TableCell colSpan={2} className={headerCell}>
                   <span style={{ marginRight: matches ? "15px" : "" }}>Languages</span>
                  </TableCell>
                  <TableCell className={headerCell}><span style={{ marginRight: matches ? "15px" : "" }}>Proficiency</span></TableCell>
                  <TableCell className={headerCell}><span style={{ marginRight: matches ? "15px" : "" }}>Read</span></TableCell>
                  <TableCell className={headerCell}><span style={{ marginRight: matches ? "15px" : "" }}>Write</span></TableCell>
                  <TableCell className={headerCell}><span style={{ marginRight: matches ? "15px" : "" }}>Speak</span></TableCell>
                </TableHead>
                {
                  isLoading ? <Box sx={{ textAlign: "center" }}>
                    <CircularProgress color="inherit" />
                  </Box> : <TableBody>
                    {languagesKnown?.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          mx: 0,
                          px: 0,
                          color: "#828282",
                        }}
                      >
                        <TableCell colSpan={2} className={bodyCell}>
                          {row.language}
                        </TableCell>
                        <TableCell className={bodyCell}>
                          {row.proficiency}
                        </TableCell>
                        <TableCell className={bodyCell}>{row?.read ? "YES" : "NO"}</TableCell>
                        <TableCell className={bodyCell}>{row?.speak ? "YES" : "NO"}</TableCell>
                        <TableCell className={bodyCell}>{row?.write ? "YES" : "NO"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                }

              </Table>
            </Box> : <Typography variant="body2"
              gutterBottom sx={{
                color: "var(--clr-gray-3)",
                fontSize: "14px",
                fontWeight: "600 !important",
                mb: 1,
              }}>
              No Details Found
            </Typography>
          }

        </Box>
      </Card>
    </Box>
  );
};

export default PersonalDetails;
