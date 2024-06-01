import { Box, Card, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import CircularProgress from "@mui/material/CircularProgress";

function Career(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [careerList, setCareerList] = useState({});
    const [availableTime, setAvailableTime] = useState([])
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const QUERY_GETCAREERPROFILEBYAPPLICANT = {
            query: `query MyQuery {
                getCareerProfileByApplicant(userID : "${props?.userID}") {
                    roleCategoryName
                    roleCategoryID
                    preferredWorkLocation
                    phoneOpted
                    industryName
                    industryID
                    expectedSalaryStart
                    expectedSalaryEnd
                    emailOpted
                    desiredShift
                    desiredJobType
                    desiredEmploymentType
                    cpID
                   }
                }`,
        };
        gqlquery(QUERY_GETCAREERPROFILEBYAPPLICANT, null)
            .then((res) => res.json())
            .then((data) => {
                if (data?.data?.getCareerProfileByApplicant) {
                    setCareerList(data?.data?.getCareerProfileByApplicant)
                }
            })
            .finally((e) => setIsLoading(false));

            const QUERY_GETCANDIDATEAVAILABILITYBYAPPLICANT = {
              query: `query MyQuery {
                  getCandidateAvailabilityByApplicant(userID : "${props?.userID}") {
                      availID
                      day
                      fromTime
                      toTime
                     }
                  }`,
          };
          gqlquery(QUERY_GETCANDIDATEAVAILABILITYBYAPPLICANT, null)
              .then((res) => res.json())
              .then((data) => {
                  // console.log(data)
                  setAvailableTime(data?.data?.getCandidateAvailabilityByApplicant)
              })
              .finally((e) => setIsLoading(false));
    }, []);

    const fromTime = [
      "12 AM",
      "01 AM",
      "02 AM",
      "03 AM",
      "04 AM",
      "05 AM",
      "06 AM",
      "07 AM",
      "08 AM",
      "09 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "01 PM",
      "02 PM",
      "03 PM",
      "04 PM",
      "05 PM",
      "06 PM",
      "07 PM",
      "08 PM",
      "09 PM",
      "10 PM",
      "11 PM",
    ];
    const toTime = [
      "12 AM",
      "01 AM",
      "02 AM",
      "03 AM",
      "04 AM",
      "05 AM",
      "06 AM",
      "07 AM",
      "08 AM",
      "09 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "01 PM",
      "02 PM",
      "03 PM",
      "04 PM",
      "05 PM",
      "06 PM",
      "07 PM",
      "08 PM",
      "09 PM",
      "10 PM",
      "11 PM",
    ];

    return (
        <Box>
            <Card sx={{ 
                bgcolor: "var(--clr-white)", 
                boxShadow: !matches ? "0px 9px 18px rgba(69, 143, 246, 0.09)" : "0px 0px 0px 0px",
                border: !matches ? "" : "1px solid #E4EEF5" , 
                px: matches ? 1.25 : 2.5, 
                py: matches ? 1.25 : 2, 
                }}>

                <Typography
                    variant="h5"
                    sx={{ color: "var(--clr-blue-footer)", fontWeight: "bold", pb: matches ? 1.65 : 2 , fontSize: matches ? "18px" : "24px" }}
                    gutterBottom
                    component="div"
                >
                    Career Profile 
                </Typography>
                {
                    Object.keys(careerList).length > 0 ? 
                    <>
                    {
                      !matches ? (
                        <Box
                          sx={{
                              pb: matches ? 1.25 : 2,
                              display: "flex",
                              flexDirection: "column",
                              gap: 2,
                          }}
                        >  
                        {/* {console.log(careerList)} */}
                          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      width: "200px",
                                      color: "var(--clr-gray-3)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  Desired Industry
                              </Typography>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      color: "var(--clr-gray-2)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  {careerList?.industryName || 'N/A'}
                              </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      width: "200px",
                                      color: "var(--clr-gray-3)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  Desired Role Category
                              </Typography>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      color: "var(--clr-gray-2)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  {careerList?.roleCategoryName || 'N/A'}
                              </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      width: "200px",
                                      color: "var(--clr-gray-3)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  Desired Job Type
                              </Typography>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      color: "var(--clr-gray-2)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  {careerList?.desiredJobType || 'N/A'}
                              </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      width: "200px",
                                      color: "var(--clr-gray-3)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                Desired Employment Type
                              </Typography>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      color: "var(--clr-gray-2)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  {careerList?.desiredEmploymentType || "N/A"}
                              </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      width: "200px",
                                      color: "var(--clr-gray-3)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  Desired Shift
                              </Typography>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      color: "var(--clr-gray-2)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  {careerList?.desiredShift || "N/A"}
                              </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      width: "200px",
                                      color: "var(--clr-gray-3)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  Preferred Work Location
                              </Typography>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      color: "var(--clr-gray-2)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  {careerList?.preferredWorkLocation || "N/A"}
                              </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      width: "200px",
                                      color: "var(--clr-gray-3)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  Expected Salary
                              </Typography>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      color: "var(--clr-gray-2)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  {`${careerList?.expectedSalaryStart} lakh INR - ${careerList?.expectedSalaryEnd} lakh INR `}
                              </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      width: "200px",
                                      color: "var(--clr-gray-3)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  Preferred Work Location
                              </Typography>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      color: "var(--clr-gray-2)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  {careerList?.preferredWorkLocation || "N/A"}
                              </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      width: "200px",
                                      color: "var(--clr-gray-3)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                Comunication Preference
                              </Typography>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      color: "var(--clr-gray-2)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  {careerList?.emailOpted && "Email"}{(careerList?.emailOpted && careerList?.phoneOpted) && ","}{" "}{careerList?.phoneOpted && "Phone"}
                              </Typography>
                          </Box>
                          <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      width: "200px",
                                      color: "var(--clr-gray-3)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                Available Timing
                              </Typography>
                              <Typography
                                  variant="subtitle2"
                                  gutterBottom
                                  component="div"
                                  sx={{
                                      color: "var(--clr-gray-2)",
                                      fontSize: "0.8rem",
                                      fontWeight: 600,
                                  }}
                              >
                                  {availableTime?.map((ability) => (
                                <Grid
                                  // sx={{ height: matches ? "50" : "40px" }}
                                  sx={{ mb: matches ? "20px" : "15px" }}
                                  container
                                  spacing={2}
                                  key={ability?.availID}
                                >
                                  {
                                    matches ? (
                                      <Grid item xs={12} md={12}>
                                        <div>
                                         {ability?.day} 
                                        </div>
                                        <div>
                                        {fromTime[ability?.fromTime]}{" "}
                                        {"-"} {toTime[ability?.toTime]}
                                        </div>
                                    </Grid>
                                    ) : (
                                      <Grid item xs={12} md={12}>
                                      {ability?.day} {fromTime[ability?.fromTime]}{" "}
                                      {"-"} {toTime[ability?.toTime]}
                                    </Grid>
                                    )
                                  }
                                </Grid>
                              ))} 
                              </Typography>
                          </Box>
                            
                        </Box>
                        ) : (
                            <Grid container>
                            <Grid sx={{ mb: "25px" }} item xs={12} sm={12} md={12}>
                              <Grid sx={{ mb: "10px" }} container>
                                <Grid item xs={5.5} sm={3.5} md={3.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "170px" : "200px",
                                      fontSize: "12px",
                                      color: "#828282",
                                      fontWeight: 600,
                                    }}
                                  >
                                   Desired Industry
                                  </Typography>
                                </Grid>
                                <Grid item xs={6.5} sm={8.5} md={8.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "62%" : "65%",
                                      color: "#4F4F4F",
                                      fontSize: "12px",
                                      fontWeight: 600,
                                    }}
                                  >
                                      {careerList?.industryName || 'N/A'}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid sx={{ mb: "10px" }} container>
                                <Grid item xs={5.5} sm={3.5} md={3.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "170px" : "200px",
                                      fontSize: "12px",
                                      color: "#828282",
                                      fontWeight: 600,
                                    }}
                                  >
                                   Desired Role Category
                                  </Typography>
                                </Grid>
                                <Grid item xs={6.5} sm={8.5} md={8.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "62%" : "65%",
                                      color: "#4F4F4F",
                                      fontSize: "12px",
                                      fontWeight: 600,
                                    }}
                                  >
                                       {careerList?.roleCategoryName || 'N/A'}
                                </Typography>
                                </Grid>
                              </Grid>
                              <Grid sx={{ mb: "10px" }} container>
                                <Grid item xs={5.5} sm={3.5} md={3.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "170px" : "200px",
                                      fontSize: "12px",
                                      color: "#828282",
                                      fontWeight: 600,
                                    }}
                                  >
                                     Desired Job Type
                                  </Typography>
                                </Grid>
                                <Grid item xs={6.5} sm={8.5} md={8.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "62%" : "65%",
                                      color: "#4F4F4F",
                                      fontSize: "12px",
                                      fontWeight: 600,
                                    }}
                                  >
                                      {careerList?.desiredJobType || 'N/A'}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid sx={{ mb: "10px" }} container>
                                <Grid item xs={5.5} sm={3.5} md={3.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "170px" : "200px",
                                      fontSize: "12px",
                                      color: "#828282",
                                      fontWeight: 600,
                                    }}
                                  >
                                     Desired Employment Type
                                  </Typography>
                                </Grid>
                                <Grid item xs={6.5} sm={8.5} md={8.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "62%" : "65%",
                                      color: "#4F4F4F",
                                      fontSize: "12px",
                                      fontWeight: 600,
                                    }}
                                  >
                                     {careerList?.desiredEmploymentType || "N/A"}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid sx={{ mb: "10px" }} container>
                                <Grid item xs={5.5} sm={3.5} md={3.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "170px" : "200px",
                                      fontSize: "12px",
                                      color: "#828282",
                                      fontWeight: 600,
                                    }}
                                  >
                                     Desired Shift
                                  </Typography>
                                </Grid>
                                <Grid item xs={6.5} sm={8.5} md={8.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "62%" : "65%",
                                      color: "#4F4F4F",
                                      fontSize: "12px",
                                      fontWeight: 600,
                                    }}
                                  >
                                     {careerList?.desiredShift || "N/A"}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid sx={{ mb: "10px" }} container>
                                <Grid item xs={5.5} sm={3.5} md={3.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "170px" : "200px",
                                      fontSize: "12px",
                                      color: "#828282",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Preferred Work Location
                                  </Typography>
                                </Grid>
                                <Grid item xs={6.5} sm={8.5} md={8.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "62%" : "65%",
                                      color: "#4F4F4F",
                                      fontSize: "12px",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {careerList?.preferredWorkLocation || "N/A"}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid sx={{ mb: "10px" }} container>
                                <Grid item xs={5.5} sm={3.5} md={3.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "170px" : "200px",
                                      fontSize: "12px",
                                      color: "#828282",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Expected Salary
                                  </Typography>
                                </Grid>
                                <Grid item xs={6.5} sm={8.5} md={8.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "62%" : "65%",
                                      color: "#4F4F4F",
                                      fontSize: "12px",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {`${careerList?.expectedSalaryStart} lakh INR - ${careerList?.expectedSalaryEnd} lakh INR `}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid sx={{ mb: "10px" }} container>
                                <Grid item xs={5.5} sm={3.5} md={3.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "170px" : "200px",
                                      fontSize: "12px",
                                      color: "#828282",
                                      fontWeight: 600,
                                    }}
                                  >
                                     Preferred Work Location
                                  </Typography>
                                </Grid>
                                <Grid item xs={6.5} sm={8.5} md={8.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "62%" : "65%",
                                      color: "#4F4F4F",
                                      fontSize: "12px",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {careerList?.preferredWorkLocation || "N/A"}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid sx={{ mb: "10px" }} container>
                                <Grid item xs={5.5} sm={3.5} md={3.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "170px" : "200px",
                                      fontSize: "12px",
                                      color: "#828282",
                                      fontWeight: 600,
                                    }}
                                  >
                                     Comunication Preference
                                  </Typography>
                                </Grid>
                                <Grid item xs={6.5} sm={8.5} md={8.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "62%" : "65%",
                                      color: "#4F4F4F",
                                      fontSize: "12px",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {careerList?.emailOpted && "Email"}{(careerList?.emailOpted && careerList?.phoneOpted) && ","}{" "}{careerList?.phoneOpted && "Phone"}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid sx={{ mb: "10px" }} container>
                                <Grid item xs={5.5} sm={3.5} md={3.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "170px" : "200px",
                                      fontSize: "12px",
                                      color: "#828282",
                                      fontWeight: 600,
                                    }}
                                  >
                                    Available Timing
                                  </Typography>
                                </Grid>
                                <Grid item xs={6.5} sm={8.5} md={8.5}>
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      // width: matches ? "62%" : "65%",
                                      color: "#4F4F4F",
                                      fontSize: "12px",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {availableTime?.map((ability) => (
                                      <Grid
                                        // sx={{ height: matches ? "50" : "40px" }}
                                        sx={{ mb: matches ? "20px" : "10px" }}
                                        container
                                        spacing={2}
                                        key={ability?.availID}
                                      >
                                        {
                                          matches ? (
                                            <Grid item xs={12} md={12}>
                                              <div>
                                              {ability?.day} 
                                              </div>
                                              <div>
                                              {fromTime[ability?.fromTime]}{" "}
                                              {"-"} {toTime[ability?.toTime]}
                                              </div>
                                          </Grid>
                                          ) : (
                                            <Grid item xs={12} md={12}>
                                            {ability?.day} {fromTime[ability?.fromTime]}{" "}
                                            {"-"} {toTime[ability?.toTime]}
                                          </Grid>
                                          )
                                        }
                                      </Grid>
                                    ))} 
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        )
                    }

                    </>

                     :
                      <Typography variant="body2"
                        gutterBottom sx={{
                            color: "var(--clr-gray-3)",
                            fontSize: "14px",
                            fontWeight: "600 !important",
                            mb: 1,
                        }}>
                        No Details Found
                    </Typography>
                }


            </Card>
        </Box>
    )
}

export default Career;