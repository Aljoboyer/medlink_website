import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

const CareerProfileDetails = (props) => {
  const careerprofilesdata = {
    details: {
      currentindusty: "Medical Surgeon",
      department: "Lab",
      rolecategory: "Lorem ipsum dolor...",
      jobrole: "Lorem impsum",
      desiredjobtype: "Lorem ipsum",
      desiredshift: "Day",
      desiredemploymenttype: "Full Time",
      preferredworklocation: "Bangalore",
      expectedsalry: "18 Lakhs",
    },
  };

  return (
    <Grid personalDetailsData sx={{ marginBlock: "1rem", px: 2 }}>
      <Card
        sx={{
          height: "100%",
          backgroundColor: "var(--clr-gray-6) !important",
        }}
      >
        <Grid container direction={"row"} alignItems="flex-start">
          <Grid
            personalDetailsData
            direction={"column"}
            xs={12}
            sx={{ padding: "0px 0px 0 0" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                pl: 2,
                pr: 1.5,
                mt: 2,
              }}
            >
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                Career Profile
              </Typography>
            </Box>
            <div>
              <div>
                <CardContent sx={{ display: "flex" }}>
                  <Box
                    sx={{ display: "grid", lineHeight: "25px", width: "100%" }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        // flexDirection: "row",
                        // justifyContent: "flex-start",
                        marginBottom: "1%",
                        columnGap: 24,
                      }}
                    >
                      <Typography variant="p" sx={textStyle}>
                        Current Industry
                      </Typography>
                      <Typography variant="p" sx={textInfoStyle}>
                        {/* {careerprofilesdata.details.currentindusty} */}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        marginBottom: "1%",
                        columnGap: 24,
                      }}
                    >
                      <Typography variant="p" sx={textStyle}>
                        Department
                      </Typography>
                      <Typography variant="p" sx={textInfoStyle}>
                        {/* {careerprofilesdata.details.department} */}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        marginBottom: "1%",
                        columnGap: 24,
                      }}
                    >
                      <Typography variant="p" sx={textStyle}>
                        Role Category
                      </Typography>
                      <Typography variant="p" sx={textInfoStyle}>
                        {/* {careerprofilesdata.details.rolecategory} */}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        marginBottom: "1%",
                        columnGap: 24,
                      }}
                    >
                      <Typography variant="p" sx={textStyle}>
                        Job Role
                      </Typography>
                      <Typography variant="info" sx={textInfoStyle}>
                        {/* {careerprofilesdata.details.jobrole} */}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        marginBottom: "1%",
                        columnGap: 24,
                      }}
                    >
                      <Typography variant="p" sx={textStyle}>
                        Desired Job Type
                      </Typography>
                      <Typography variant="p" sx={textInfoStyle}>
                        {/* {careerprofilesdata.details.desiredjobtype} */}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        marginBottom: "1%",
                        columnGap: 24,
                      }}
                    >
                      <Typography variant="p" sx={textStyle}>
                        Desired Shift
                      </Typography>
                      <Typography variant="info" sx={textInfoStyle}>
                        {/* {careerprofilesdata.details.desiredshift} */}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        marginBottom: "1%",
                        columnGap: 24,
                      }}
                    >
                      <Typography variant="p" sx={textStyle}>
                        Desired Employment Type
                      </Typography>
                      <Typography variant="info" sx={textInfoStyle}>
                        {/* {careerprofilesdata.details.desiredemploymenttype} */}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        marginBottom: "1%",
                        columnGap: 24,
                      }}
                    >
                      <Typography variant="p" sx={textStyle}>
                        Preferred Work Location
                      </Typography>
                      <Typography variant="info" sx={textInfoStyle}>
                        {/* {careerprofilesdata.details.preferredworklocation} */}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        marginBottom: "1%",
                        columnGap: 24,
                      }}
                    >
                      <Typography variant="p" sx={textStyle}>
                        Expected Salary
                      </Typography>
                      <Typography variant="info" sx={textInfoStyle}>
                        {/* {careerprofilesdata.details.expectedsalry} */}
                      </Typography>
                    </div>
                  </Box>
                  <Box sx={{ fontSize: "16" }}>
                    <EditIcon
                      onClick={props.onClick}
                      sx={{ color: "gray", fontSize: 17 }}
                    />
                  </Box>
                </CardContent>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CareerProfileDetails;

const textStyle = { fontSize: 12, color: "#828282" };
const textInfoStyle = { fontSize: 12, color: "#4F4F4F", fontWeight: 600 };
