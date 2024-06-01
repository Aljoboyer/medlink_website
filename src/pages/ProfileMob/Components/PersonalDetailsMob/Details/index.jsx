import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import { QUERY_PERSONAL_DETAILS, gqlquery } from "../../../../../api/index";

const Details = (props) => {
  const [personalDetails, setPersonalDetails] = useState({});

  useEffect(() => {
    gqlquery(QUERY_PERSONAL_DETAILS, null)
      .then((res) => res.json())
      .then((data) => setPersonalDetails(data?.data?.getPersonalDetails));
  }, []);

  console.log(personalDetails);

  const personalDetailsData = {
    details: {
      dateOfBirth: "01-01-2022",
      gender: "Male",
      permanentAddress: "House number: 880 Sector 15 Faridabad Haryana",
      homeTown: "Bengaluru",
      marialStatus: "Single",
      differentialyAbled: "YES",
    },
    "languages-known": [
      {
        language: "English",
        proficiency: "Expert",
        read: "Yes",
        write: "Yes",
        speak: "Yes",
      },
      {
        language: "Hindi",
        proficiency: "Expert",
        read: "Yes",
        write: "Yes",
        speak: "Yes",
      },
    ],
  };

  return (
    <Grid personalDetailsData sx={{ marginBlock: "1rem" }} spacing={2}>
      <Card
        sx={{
          height: "100%",
          backgroundColor: "",
        }}
      >
        <Grid container direction={"row"} alignItems="flex-start" padding={2}>
          <Grid
            personalDetailsData
            direction={"column"}
            xs={12}
            md={10}
            sx={{ padding: "0 10px 0 0" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  margin: "1rem",
                  marginBottom: "3%",
                }}
              >
                Personal Details
              </Typography>
              <Box sx={{ margin: "0" }}>
                <EditIcon
                  onClick={props.onClick}
                  sx={{ color: "gray", fontSize: 17 }}
                />
              </Box>
            </Box>

            <div>
              <div>
                <CardContent sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      px: 0.5,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ width: "20vh", fontSize: "12px" }}
                      >
                        Date of Birth
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          width: "75vh",
                          color: "#4F4F4F",
                          fontSize: "12px",
                        }}
                      >
                        {personalDetails.dateofBirth}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ width: "20vh", fontSize: "12px" }}
                      >
                        Gender
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          width: "75vh",
                          color: "#4F4F4F",
                          fontSize: "12px",
                        }}
                      >
                        {personalDetails.gender}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ width: "20vh", fontSize: "12px" }}
                      >
                        Permanent Address
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          width: "75vh",
                          color: "#4F4F4F",
                          fontSize: "12px",
                        }}
                      >
                        {personalDetails.address}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ width: "20vh", fontSize: "12px" }}
                      >
                        Marital Status
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          width: "75vh",
                          color: "#4F4F4F",
                          fontSize: "12px",
                        }}
                      >
                        {personalDetails.maritalStatus}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ width: "20vh", fontSize: "12px" }}
                      >
                        Home Town
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          width: "75vh",
                          color: "#4F4F4F",
                          fontSize: "12px",
                        }}
                      >
                        {personalDetails.homeTown}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ width: "20vh", fontSize: "12px" }}
                      >
                        Differntialy Abled
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          width: "75vh",
                          color: "#4F4F4F",
                          fontSize: "12px",
                        }}
                      >
                        {personalDetails.differentlyAbled ? "Yes" : "No"}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </div>
              <div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "4%",
                    }}
                  >
                    <Typography
                      component="h3"
                      variant="h6"
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        margin: "1rem",
                        marginBottom: "3%",
                      }}
                    >
                      Languages known
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        borderColor: "#000000",
                        float: "right",
                        maxHeight: "35px",
                        marginTop: "1%",
                      }}
                      onClick={props.onLangClick}
                    >
                      Add Language
                    </Button>
                  </div>
                  <table
                    style={{
                      width: "100%",
                      textAlign: "left",
                      marginTop: "3%",
                      marginLeft: "2.2%",
                      paddingTop: "1%",
                      borderSpacing: "0 1em",
                    }}
                  >
                    <tr>
                      <th>Languages</th>
                      <th>Proficiency</th>
                      <th>Read</th>
                      <th>Write</th>
                      <th>Speak</th>
                    </tr>
                    {personalDetailsData["languages-known"].map(
                      (item, index) => (
                        <tr key={`languages-${index}`}>
                          <td>
                            <Typography variant="info" sx={textStyle}>
                              {/* {item.language} */}
                            </Typography>
                          </td>
                          <td>
                            <Typography variant="info" sx={textStyle}>
                              {/* {item.proficiency} */}
                            </Typography>
                          </td>
                          <td>
                            <Typography variant="info" sx={textStyle}>
                              {/* {item.read} */}
                            </Typography>
                          </td>
                          <td>
                            <Typography variant="info" sx={textStyle}>
                              {/* {item.write} */}
                            </Typography>
                          </td>
                          <td>
                            <Typography variant="info" sx={textStyle}>
                              {/* {item.speak} */}
                            </Typography>
                          </td>
                          <td>
                            <Box sx={{ margin: "0 0 0 40px" }}>
                              <EditIcon sx={{ fontSize: "medium" }} />
                            </Box>
                          </td>
                        </tr>
                      )
                    )}
                  </table>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Details;

const textStyle = { fontSize: 12, color: "#828282" };
