import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import StarIcon from '@mui/icons-material/Star';
import MenuIcon from "@mui/icons-material/Menu";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { gqlquery, QUERY_SEARCHTOP4JOBS, gqlOpenQuery } from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SingleJobMini = () => {
  const [vacancies, setVacancies] = useState([]);
  const [singleJobDetails, setSingleJobDetails] = useState([]);
  const [hospitalName, setHospitalName] = useState([])
  const [isJobAppliedOrSaved, setIsJobAppliedOrSaved] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  let { vacancyID } = useParams();

  useEffect(() => {
    gqlOpenQuery(QUERY_SEARCHTOP4JOBS, null)
      // gqlquery(QUERY_SEARCHTOP4JOBS, null)
      .then((res) => res.json())
      .then((datas) => setVacancies(datas?.data?.searchTop4Jobs));
  }, []);

  useEffect(() => {
    let vacancyID = 13
    const QUERY_ISJOBSAVEDORAPPLIED = {
      query: `query MyQuery {
                isJobApplied(vacancyID: ${Number(vacancyID)}) 
                         {
                           appliedAt
                           jaID
                           savedJob
                           appliedJob
                           vacancyID
                        }
                      }
                    `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_ISJOBSAVEDORAPPLIED, null)
      .then((res) => res.json())
      .then((data) => setIsJobAppliedOrSaved(data?.data?.isJobApplied));
  }, [vacancyID, update]);
  // console.log(vacancyID, isJobAppliedOrSaved);
  // single JOb detail 
  console.log("Single job detail:", singleJobDetails)

  useEffect(() => {
    const QUERY_SEARCHJOBS = {
      query: `query MyQuery {
                     getAVacancy(vacancyID: ${Number(vacancyID)}) 
                         {
                           description
                           employmentType
                           experience
                           jobTitle
                           lastDateToApply
                           location
                           maximumSalary
                           minimumSalary
                           postedOn
                           primarySpecialization
                           qualification
                           secondarySpecialization
                           vacancyID
                           vacancyType
                        }
                      }
                    `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_SEARCHJOBS, null)
      // gqlquery(QUERY_SEARCHJOBS, null)
      .then((res) => res.json())
      .then((data) => setSingleJobDetails(data?.data?.getAVacancy));
  }, []);

  useEffect(() => {
    const QUERY_HOSPITALNAME = {
      query: `query MyQuery {
                getHospitalByVacancy(vacancyID: ${Number(vacancyID)}) 
                         {
                            name
                        }
                      }
                    `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_HOSPITALNAME, null)
      // gqlquery(QUERY_HOSPITALNAME, null)
      .then((res) => res.json())
      .then((data) => setHospitalName(data?.data?.getHospitalByVacancy));
  }, []);

  const date_diff_indays = function (dt1) {
    const dt2 = new Date();
    const days = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
    );
    const month = Math.floor(days / 30);
    const day = days % 30;
    if (days >= 30) {
      return {
        month,
        day,
      };
    }
    return {
      days,
    };
  };

  const handleApplyForJob = e => {
    if (user !== null && Object.keys(user).length > 0 && user !== undefined) {
      const QUERY_APPLYFORJOB = {
        query: `mutation MyMutation {
                         applyForAJob (vacancyID: ${Number(vacancyID)})
                         }
                      `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_APPLYFORJOB, null)
        .then((res) => res.json())
        .then((datas) => {
          setUpdate(!update);
          console.log(datas);
        })
        .finally((e) => console.log("applying for a job"));
    } else {
      navigate('/login')
    }
    console.log('applied')
  }

  const handleSaveJob = e => {
    if (user !== null && Object.keys(user).length > 0 && user !== undefined) {
      const QUERY_SAVEAJOB = {
        query: `mutation MyMutation {
                        saveAJob (vacancyID: ${Number(vacancyID)})
                         }
                      `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_SAVEAJOB, null)
        .then((res) => res.json())
        .then((datas) => {
          setUpdate(!update);
          console.log(datas);
        })
        .finally((e) => console.log("saved this job"));
    }
    else {
      navigate('login')
    }

  }

  // const handleDeleteSavedJobs = (deleteId) => {

  //   if (window.confirm("Are you want remove from Saved Job List?")) {
  //     const QUERY_REMOVEJOBFROMSAVEDLIST = {
  //       query: `mutation MyMutation {
  //               removeJobFromSavedList (vacancyID: ${Number(deleteId)})
  //               }`,
  //       variables: null,
  //       operationName: "MyMutation",
  //     };

  //     gqlquery(QUERY_REMOVEJOBFROMSAVEDLIST, null)
  //       .then((res) => res.json())
  //       .then((data) => console.log(data))
  //       .finally((e) =>
  //         console.log("Deleting Save Job from database")
  //       );
  //   } else {
  //     console.log("You don't want to delete this!");
  //   }
  // };
  return (
    <Box maxWidth="sm" sx={{ mx: "auto" }}>
      {/* page Title */}
      <Box
        sx={{
          backgroundColor: "#E0E0E0",
          padding: "15px 0 15px 17px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <MenuIcon sx={{ color: "#323232" }} />
        <Typography variant="h6" sx={{ lineHeight: "24px", fontWeight: "600" }}>
          Search Results
        </Typography>
      </Box>

      {/* Job Container */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, px: 2, py: 1 }}>
        {/* Title */}
        <Box
          sx={{
            bgcolor: "#F2F2F2",
            display: "flex",
            flexDirection: "column",
            px: 1.5,
            pt: 1.5,
            pb: 2,
            boxShadow: 1,
            borderRadius: 2,
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <CardMedia
                component="img"
                width="54px"
                height="54px"
                paddingBottom="29px"
                image="https://cdn.pixabay.com/photo/2021/11/20/03/17/doctor-6810751__340.png"
                alt={"title"}
              />
            </Box>
          </Box>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              color: "#333333",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            {singleJobDetails?.jobTitle}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              color: "#333333",
              fontWeight: "600",
            }}
          >
            {hospitalName?.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                pr: 2,
              }}
            >
              <LocationOnTwoToneIcon
                fontSize="small"
                sx={{ color: "#323232" }}
              />
              <Typography
                component="div"
                sx={{ color: "#333333" }}
                variant="body1"
              >
                {singleJobDetails?.location}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                pr: 2,
              }}
            >
              <WorkTwoToneIcon fontSize="small" sx={{ color: "#323232" }} />
              <Typography
                component="div"
                sx={{ color: "#333333" }}
                variant="body1"
              >
                {singleJobDetails?.experience} {singleJobDetails?.experience === 1 ? "year" : "years"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                pr: 2,
              }}
            >
              <AccountBalanceWalletTwoToneIcon
                fontSize="small"
                sx={{ color: "#323232" }}
              />
              <Typography
                component="div"
                sx={{ color: "#333333" }}
                variant="body1"
              >
                ₹{(
                  Math.round((singleJobDetails?.minimumSalary / 100000) * 100) / 100
                ).toFixed(2)} L - ₹{(
                  Math.round((singleJobDetails?.maximumSalary / 100000) * 100) / 100
                ).toFixed(2)} L
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: 150,
              display: "flex",
              alignItems: "center",
              bgcolor: "#E0E0E0",
              gap: 1,
              px: 2,
              borderRadius: 1.5,
            }}
          >
            <AccessTimeOutlinedIcon
              fontSize="small"
              sx={{ color: "#828282" }}
            />
            <Typography
              component="div"
              sx={{ color: "#828282" }}
              variant="body1"
            >
              {date_diff_indays(new Date(`${singleJobDetails?.postedOn}`)).month ? (
                <>
                  {date_diff_indays(new Date(`${singleJobDetails?.postedOn}`)).month}{" "}
                  {date_diff_indays(new Date(`${singleJobDetails?.postedOn}`)).month ===
                    1
                    ? "month"
                    : "months"}{" "}
                  {date_diff_indays(new Date(`${singleJobDetails?.postedOn}`)).day ? (
                    <>
                      {date_diff_indays(new Date(`${singleJobDetails?.postedOn}`)).day}{" "}
                      {date_diff_indays(new Date(`${singleJobDetails?.postedOn}`))
                        .day === 1
                        ? "day"
                        : "days"}{" "}
                      {"ago"}
                    </>
                  ) : (
                    <> {"ago"}</>
                  )}
                </>
              ) : (
                <>
                  {date_diff_indays(new Date(`${singleJobDetails?.postedOn}`)).days}{" "}
                  {date_diff_indays(new Date(`${singleJobDetails?.postedOn}`)).days === 1
                    ? "day"
                    : "days"}{" "}
                  {"ago"}
                </>
              )}
            </Typography>
          </Box>
          <Box>
            {
              !isJobAppliedOrSaved ? (<Button
                sx={{
                  mr: 1,
                  border: "2px solid #000000",
                  color: "#000000",
                  borderRadius: 2,
                }}
                size="small"
                variant="outlined"
                onClick={handleSaveJob}
              >
                Save
              </Button>) : (<Button
                sx={{
                  mr: 1,
                  border: "2px solid #000000",
                  color: "#000000",
                  borderRadius: 2,
                }}
                size="small"
                variant="contained"
                disabled
              // onClick={() => handleDeleteSavedJobs(singleJobDetails?.vacancyID)}
              >
                Saved
              </Button>)
            }
            {/* {
              isJobAppliedOrSaved?.savedJob === false && <Button
                sx={{
                  mr: 1,
                  border: "2px solid #000000",
                  color: "#000000",
                  borderRadius: 2,
                }}
                size="small"
                variant="outlined"
                onClick={handleSaveJob}
              >
                Save
              </Button>

            } */}

            {
              (isJobAppliedOrSaved === undefined) && <Button
                sx={{
                  mr: 1,
                  border: "2px solid #000000",
                  color: "#000000",
                  borderRadius: 2,
                }}
                size="small"
                variant="outlined"
                onClick={handleApplyForJob}
              >
                Apply
              </Button>
            }
            {
              isJobAppliedOrSaved?.appliedJob === true && <Button
                sx={{
                  mr: 1,
                  bgcolor: "#4F4F4F",
                  borderRadius: 2,
                }}
                size="small"
                variant="contained"
                // onClick={handleApplyForJob}
                disabled
              >
                Applied ✔
              </Button>
            }
            {
              isJobAppliedOrSaved?.appliedJob === false && <Button
                sx={{
                  mr: 1,
                  bgcolor: "#4F4F4F",
                  borderRadius: 2,
                }}
                size="small"
                variant="contained"
                onClick={handleApplyForJob}
              >
                Apply
              </Button>
            }
          </Box>
        </Box>
        {/* Description */}
        <Box
          sx={{
            p: 1.5,
            bgcolor: "#F2F2F2",
            boxShadow: "1",
            borderRadius: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{
              color: "#333333",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Job Description
          </Typography>
          <Box
            sx={{
              width: "75%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                lineHeight: "24px",
                color: "#333333",
              }}
              variant="body2"
            >
              {singleJobDetails?.description}
            </Typography>
          </Box>
        </Box>
        {/* About */}
        <Box
          sx={{
            p: 1.5,
            bgcolor: "#F2F2F2",
            boxShadow: "1",
            borderRadius: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            gutterBottom
            sx={{
              color: "#333333",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            About (Company name)
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography
              sx={{
                lineHeight: "24px",
                color: "#333333",
                paddingRight: "25px",
              }}
              variant="body2"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est
              netus commodo amet massa diam. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Est netus commodo amet massa diam.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est
              netus commodo amet massa diam. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Est netus commodo amet massa diam.
              {/* {description} */}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src="https://image.shutterstock.com/image-vector/medical-concept-hospital-building-doctor-260nw-588196298.jpg" alt=""
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      style={{ width: "100%", height: "150%" }}
                      src="https://media.istockphoto.com/photos/modern-hospital-building-picture-id1312706413?b=1&k=20&m=1312706413&s=170667a&w=0&h=VRi3w2E1UqvCCcK-nDV6mH7FhDZoTU9MM2QKSom96X4=" alt=""
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src="https://media.istockphoto.com/photos/building-with-large-h-sign-for-hospital-picture-id1130389312?k=20&m=1130389312&s=612x612&w=0&h=4edAr7WFKZfiENIVJlzC-qyUqV46GwCcDS-Kcr4aO_4=" alt=""
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src="https://t3.ftcdn.net/jpg/02/11/15/66/360_F_211156620_CeBr5etdTNXLb231sFcQ8M9YD1OY5IW8.jpg" alt=""
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      style={{
                        width: "100%",
                        height: "50%",
                        marginBottom: "-65%",
                      }}
                      src="https://cdn.britannica.com/72/126772-050-BC651FF5/Norwich-University-Hospital-Norfolk-England-National-Health.jpg" alt=""
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src="https://media.istockphoto.com/photos/hospital-building-with-glass-wall-and-mirrored-building-picture-id1179324818?k=20&m=1179324818&s=612x612&w=0&h=CiqTHea8aDm9AFxZM2c7bjrEk2eyvisRYzi5Gd-8MR0=" alt=""
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src="https://thumbs.dreamstime.com/b/hospital-entrance-emergency-sign-43544491.jpg" alt=""
                    />
                  </Grid>
                  <Grid item xs={8} sx={{ width: "100%", height: "100%" }}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9zcGl0YWx8ZW58MHx8MHx8&w=1000&q=80" alt=""
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <iframe
                  width="100%"
                  height="270px"
                  src="https://www.youtube.com/embed/AWvsXxDtEkU"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Typography
          variant="h6"
          sx={{ color: "#000000", py: 1, fontWeight: "600" }}
          component="div"
        >
          Similar Jobs
        </Typography>
        {/* Similler jobs */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 8,
          }}
        >
          {vacancies?.map((row) => (
            <Box
              key={row?.vacancyID}
              sx={{
                bgcolor: "#F2F2F2",
                borderRadius: 2,
                px: 2,
                pt: 1.5,
                pb: 2.5,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                boxShadow: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  color: "#333333",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                <Link to={`/job-search-list/${row?.vacancyID}`} > {row?.jobTitle} </Link>
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                gutterBottom
                sx={{
                  color: "#333333",
                  fontWeight: "600",
                }}
              >
                {row?.location}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  pr: 2,
                  pb: 1.5
                }}
              >
                <DescriptionTwoToneIcon
                  fontSize="small"
                  sx={{ color: "#323232" }}
                />
                <Typography
                  component="div"
                  sx={{ color: "#4F4F4F" }}
                  variant="body1"
                >
                  {row?.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  pb: 1.5
                }}
              >
                <Typography
                  variant="subtitle1"
                  component="div"
                  gutterBottom
                  sx={{
                    color: "#333333",
                    fontWeight: "600",
                    fontSize: "18px",
                    lineHeight: "16px",
                  }}
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
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      lineHeight: "16px",
                      color: "#333333",
                      fontWeight: "600",
                    }}
                  >
                    {row?.secondarySpecialization}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  pb: 1
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pr: 2,
                  }}
                >
                  <LocationOnTwoToneIcon
                    fontSize="small"
                    sx={{ color: "#323232" }}
                  />
                  <Typography
                    component="div"
                    sx={{ color: "#4F4F4F" }}
                    variant="body1"
                  >
                    {row?.location}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pr: 2,
                  }}
                >
                  <WorkTwoToneIcon fontSize="small" sx={{ color: "#323232" }} />
                  <Typography
                    component="div"
                    sx={{ color: "#4F4F4F" }}
                    variant="body1"
                  >
                    {row?.experience} years
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    pr: 2,
                  }}
                >
                  <AccountBalanceWalletTwoToneIcon
                    fontSize="small"
                    sx={{ color: "#323232" }}
                  />
                  <Typography
                    component="div"
                    sx={{ color: "#4F4F4F" }}
                    variant="body1"
                  >
                    ₹{(
                      Math.round((row?.minimumSalary / 100000) * 100) / 100
                    ).toFixed(2)} L  -  ₹{(
                      Math.round((row?.maximumSalary / 100000) * 100) / 100
                    ).toFixed(2)} L
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Box sx={{
                    width: "max-content",
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#E0E0E0",
                    gap: 1,
                    px: 2,
                    py: 0,
                    borderRadius: 1.5,
                  }}>
                    <AccessTimeOutlinedIcon
                      fontSize="small"
                      sx={{ color: "#828282" }}
                    />
                    <Typography
                      component="div"
                      sx={{ color: "#828282" }}
                      variant="body1"
                    >
                      {date_diff_indays(new Date(`${row?.postedOn}`)).month ? (
                        <>
                          {date_diff_indays(new Date(`${row?.postedOn}`)).month}{" "}
                          {date_diff_indays(new Date(`${row?.postedOn}`)).month ===
                            1
                            ? "month"
                            : "months"}{" "}
                          {date_diff_indays(new Date(`${row?.postedOn}`)).day ? (
                            <>
                              {date_diff_indays(new Date(`${row?.postedOn}`)).day}{" "}
                              {date_diff_indays(new Date(`${row?.postedOn}`))
                                .day === 1
                                ? "day"
                                : "days"}{" "}
                              {"ago"}
                            </>
                          ) : (
                            <> {"ago"}</>
                          )}
                        </>
                      ) : (
                        <>
                          {date_diff_indays(new Date(`${row?.postedOn}`)).days}{" "}
                          {date_diff_indays(new Date(`${row?.postedOn}`)).days === 1
                            ? "day"
                            : "days"}{" "}
                          {"ago"}
                        </>
                      )}
                    </Typography>
                  </Box>

                </Box>
                <Box>
                  {/* <Button onClick={() => handleDeleteSavedJobs(row?.vacancyID)} sx={{ width: "max-content", bgcolor: "#E0E0E0", gap: 1 }}><StarIcon fontSize="small"></StarIcon> Saved </Button> */}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SingleJobMini;