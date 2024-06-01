import { Box, Breadcrumbs, Button, Link, Typography, Skeleton, Grid, useTheme, useMediaQuery, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { gqlquery, QUERY_SAVEDJOBS } from '../../api';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import StarIcon from '@mui/icons-material/Star';
import homeBanner from "../../assets/images/doctors_home_banner.png";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import MenuIcon from '@mui/icons-material/Menu';

const RedirectToSignUpFlow = (props) => {
  const navigate = useNavigate();
  const { isLoading, getUserName, userName } = useAuth();

  const flow = sessionStorage.getItem('flow');

  useEffect(() => {
    getUserName();
  }, []);

  // console.log(flow, isLoading, getUserName, userName)
  // console.log(flow === "jobSeeker" && userName === undefined) 

  if (!isLoading) {
    return (flow === "jobSeeker" && userName === undefined) ? <Navigate to="/signup2" /> : props.children;
  }
  else {
    return (
      <Box>
        <Box>
          <Skeleton variant="rectangular" animation="wave" width="100%" height="30vh" />
        </Box>
        <Box mixWidth="xl" sx={{ mx: 5, px: 2, mt: 5 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={2.3}>
              <Skeleton variant="rectangular" animation="wave" width="100%" height="50vh" />
            </Grid>
            <Grid item xs={8} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Skeleton variant="rectangular" animation="wave" width="100%" height="20vh" />
              <Skeleton variant="rectangular" animation="wave" width="100%" height="20vh" />
              <Skeleton variant="rectangular" animation="wave" width="100%" height="20vh" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
}


const SavedJobs = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [savedJobs, setSavedJobs] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  document.title = "Saved Jobs | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  useEffect(() => {
    gqlquery(QUERY_SAVEDJOBS, null)
      .then((res) => res.json())
      .then((data) => setSavedJobs(data?.data?.getSavedJobs));
  }, [updateList]);

  // console.log('ahan savedJobs', savedJobs)
  const handleDeleteSavedJobs = (deleteId) => {

    if (window.confirm("Are you sure you want to remove from Saved Jobs?")) {
      const QUERY_REMOVEJOBFROMSAVEDLIST = {
        query: `mutation MyMutation {
                removeJobFromSavedList (vacancyID: ${Number(deleteId)})
                }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_REMOVEJOBFROMSAVEDLIST, null)
        .then((res) => res.json())
        .then((data) => setUpdateList(!updateList))
        .finally((e) =>
          console.log("Deleting Save Job from database")
        );
    } else {
      console.log("You don't want to delete this!");
    }
  };

  const newSavedJobs = savedJobs?.map((savedJob) => {
    const date_diff_indays = function () {
      const dt1 = new Date(savedJob?.postedOn);
      const dt2 = new Date();
      const days = Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
      );
      const month = Math.floor(days / 30)
      const day = days % 30
      if (days >= 30) {

        return {
          month,
          day
        }
      }
      return {
        days
      }
    };

    return {
      date_diff_indays,
      jobTitle: savedJob?.jobTitle,
      qualification: savedJob?.qualification,
      secondarySpecialization: savedJob?.secondarySpecialization,
      description: savedJob?.description,
      maximumSalary: savedJob?.maximumSalary,
      minimumSalary: savedJob?.minimumSalary,
      location: savedJob?.location,
      postedOn: savedJob?.postedOn,
      primarySpecialization: savedJob?.primarySpecialization,
      experience: savedJob?.experience,
      employmentType: savedJob?.employmentType,
      lastDateToApply: savedJob?.lastDateToApply,
      responses: savedJob?.responses,
      vacancyID: savedJob?.vacancyID,
      vacancyType: savedJob?.vacancyType,
      name: savedJob?.name
    }
  })
  const handleSingleJob = (searchResult) => {
    const handleNavigate = () => {
      navigate(`/job-search-list/${searchResult.vacancyID}`, {
        state: { hospitalID: searchResult.hospitalID, hospitalName: searchResult.name },
      });
    };
    setTimeout(handleNavigate, 1000);
  };

  // pagination
  const handleChangePage = (event, newPage) => {
    console.log("this is new page", newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 10) : 0;

  return (
    <RedirectToSignUpFlow>
      {!matches ? (
        // web view
        <Box>
          <Box
            style={{
              backgroundImage: `url(${homeBanner})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            sx={{ bgcolor: "#E0E0E0", height: "240px" }}
          ></Box>
          <Box maxWidth="md" sx={{ mx: "auto", px: "16px" }}>
            <Box
              sx={{
                mt: -10,
                mb: 3,
              }}
            >
              <Breadcrumbs
                separator={
                  <NavigateNextIcon
                    sx={{ color: "var(--clr-white)" }}
                    fontSize="small"
                  />
                }
                aria-label="breadcrumb"
                sx={{ mb: 1 }}
              >
                <Link
                  sx={{ color: "var(--clr-white)", fontSize: "14px" }}
                  underline="hover"
                  color="inherit"
                  href="/profile-home"
                >
                  Home
                </Link>
                <Link
                  sx={{ color: "var(--clr-white)", fontSize: "14px" }}
                  underline="hover"
                  color="inherit"
                  href="/saved-jobs"
                >
                  Saved Jobs
                </Link>
              </Breadcrumbs>
              <Box
                sx={{
                  margin: "auto",
                  borderRadius: 1,
                  bgcolor: "var(--clr-white)",
                  boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "24px",
                    fontWeight: "700",
                    p: 4,
                    color: "var(--clr-blue-footer)",
                  }}
                >
                  {" "}
                  {savedJobs?.length} Jobs saved by you
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mb: 3,
                }}
              >
                {newSavedJobs?.slice((page > 0 ? page - 1 : page) * 10, (page > 0 ? page - 1 : page) * 10 + 10)?.map((savedJob) => (
                  <Box
                    key={savedJob?.vacancyID}
                    sx={{
                      bgcolor: "var(--clr-white)",
                      borderRadius: "6px",
                      border: "1px solid var(--clr-blue-light)",
                      p: 2.5,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      boxShadow: "0px 0px 9px rgba(69, 143, 246, 0.09)",
                    }}
                  >
                    <Typography
                      onClick={() => handleSingleJob(savedJob)}
                      variant="subtitle1"
                      component="div"
                      sx={{
                        color: "#395987",
                        fontWeight: "600",
                        fontSize: "18px",
                        cursor: "pointer",
                        pb: "13px",
                      }}
                    >
                      {savedJob?.jobTitle}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{
                        color: "#333333",
                        fontWeight: "600",
                        pb: "13px",
                      }}
                    >
                      {savedJob?.name}
                      {/* Hospital / Consultant name Here */}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        pr: 2,
                        pb: "18px",
                      }}
                    >
                      <DescriptionOutlinedIcon
                        fontSize="small"
                        sx={{ color: "#C7D3E3" }}
                      />
                      <Typography
                        component="div"
                        sx={{ color: "#4F4F4F" }}
                        variant="body2"
                      >
                        {savedJob?.description}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        pb: "13px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        component="div"
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
                            lineHeight: "14px",
                            color: "#333333",
                            fontWeight: "600",
                          }}
                        >
                          {savedJob?.primarySpecialization?.replaceAll(",", ", ")}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          component="div"
                          sx={{
                            lineHeight: "14px",
                            color: "#333333",
                            fontWeight: "600",
                          }}
                        >
                          {savedJob?.secondarySpecialization?.replaceAll(",", ", ")}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pb: "13px",
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
                        <FmdGoodOutlinedIcon
                          fontSize="small"
                          sx={{ color: "var(--clr-white-icon)" }}
                        />
                        <Typography
                          component="div"
                          sx={{ color: "#333333" }}
                          variant="body1"
                        >
                          {savedJob?.location}
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
                        <WorkOutlineRoundedIcon
                          fontSize="small"
                          sx={{ color: "var(--clr-white-icon)" }}
                        />
                        <Typography
                          component="div"
                          sx={{ color: "#333333" }}
                          variant="body1"
                        >
                          {savedJob?.experience}{" "}
                          {savedJob?.experience === 1 ? "Year" : "Years"}
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
                        <AccountBalanceWalletOutlinedIcon
                          fontSize="small"
                          sx={{ color: "var(--clr-white-icon)" }}
                        />
                        <Typography
                          component="div"
                          sx={{ color: "#333333" }}
                          variant="body1"
                        >
                          {savedJob?.maximumSalary} {"INR"}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: "max-content",
                          display: "flex",
                          alignItems: "center",
                          bgcolor: "var(--clr-blue-light)",
                          gap: 1,
                          px: 1.5,
                          py: 0.3,
                          borderRadius: 16,
                        }}
                      >
                        <HistoryOutlinedIcon
                          fontSize="small"
                          sx={{ color: "var(--clr-blue-footer)" }}
                        />
                        <Typography
                          component="div"
                          sx={{
                            color: "#395987",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                          variant="body1"
                        >
                          {savedJob?.date_diff_indays()?.month ? (
                            <>
                              {savedJob?.date_diff_indays()?.month}{" "}
                              {savedJob?.date_diff_indays()?.month === 1
                                ? "month"
                                : "months"}{" "}
                              {savedJob?.date_diff_indays().day ? (
                                <>
                                  {savedJob.date_diff_indays()?.day}{" "}
                                  {savedJob.date_diff_indays()?.day === 1
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
                              {savedJob?.date_diff_indays().days}{" "}
                              {savedJob?.date_diff_indays()?.days === 1
                                ? "day"
                                : "days"}{" "}
                              {"ago"}
                            </>
                          )}
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          onClick={() =>
                            handleDeleteSavedJobs(savedJob?.vacancyID)
                          }
                          sx={{
                            width: "max-content",
                            bgcolor: "var(--clr-blue-light)",
                            padding: "3px 10px !important",
                            borderRadius: 16,
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#395987 !important",
                              fontWeight: "600",
                              fontSize: "12px",
                              display: "flex",
                              gap: 1,
                            }}
                          >
                            <StarIcon
                              sx={{ color: "#395987", fontSize: "1rem" }}
                            />{" "}
                            <span>Saved</span>
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ mb: 10, display: "flex", justifyContent: "flex-end" }}>
              {newSavedJobs?.length > 10 && (
                <Pagination
                  count={Math.ceil(newSavedJobs?.length / 10)}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              )}
            </Box>

          </Box>
        </Box>
      ) : (
        // tab view
        <Box>
            {
              matches &&
              <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
              <MenuIcon sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Saved Jobs</Typography>
              </Box>
            }
          <Box sx={{ bgcolor: "#FFFFFF", height: "110px" }}></Box>
          <Box maxWidth="md" sx={{ mb: 8, mx: "auto", px: "16px" }}>
            <Box
              sx={{
                mt: -10,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  margin: "auto",
                  borderRadius: 1,
                  bgcolor: "var(--clr-white)",
                  border: "1px solid #E4EEF5",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "700",
                    p: 1.5,
                    color: "var(--clr-blue-footer)",
                  }}
                >
                  {" "}
                  {savedJobs?.length} Jobs saved by you
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mb: 10 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mb: 8,
                }}
              >
                {newSavedJobs?.map((savedJob) => (
                  <Box
                    key={savedJob?.vacancyID}
                    sx={{
                      bgcolor: "var(--clr-white)",
                      borderRadius: "6px",
                      border: "1px solid var(--clr-blue-light)",
                      p: 2.5,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      boxShadow: "0px 0px 9px rgba(69, 143, 246, 0.09)",
                    }}
                  >
                    <Typography
                      onClick={() => handleSingleJob(savedJob)}
                      variant="subtitle1"
                      component="div"
                      sx={{
                        color: "#395987",
                        fontWeight: "600",
                        fontSize: "18px",
                        cursor: "pointer",
                        pb: "13px",
                      }}
                    >
                      {savedJob?.jobTitle}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      sx={{
                        color: "#333333",
                        fontWeight: "600",
                        pb: "13px",
                      }}
                    >
                      {savedJob?.name}
                      {/* Hospital / Consultant name Here */}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        pr: 2,
                        pb: "17px",
                      }}
                    >
                      <DescriptionOutlinedIcon
                        fontSize="small"
                        sx={{ color: "#C7D3E3" }}
                      />
                      <Typography
                        component="div"
                        sx={{ color: "#4F4F4F" }}
                        variant="body2"
                      >
                        {savedJob?.description}
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography
                          sx={{
                            color: "#333333",
                            fontWeight: "600",
                            fontSize: "16px",
                            alignItems: "center"
                          }}
                        >
                          Key Skills
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            pb: "13px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 1.5,
                            }}
                          >
                            <Typography
                              sx={{
                                //   lineHeight: "14px",
                                color: "#333333",
                                fontWeight: "600",
                                fontSize: "14px"
                              }}
                            >
                              {savedJob?.primarySpecialization?.replaceAll(",", ", ")}
                            </Typography>
                            <Typography
                              sx={{
                                //   lineHeight: "14px",
                                color: "#333333",
                                fontWeight: "600",
                                fontSize: "14px"
                              }}
                            >
                              {savedJob?.secondarySpecialization?.replaceAll(",", ", ")}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        pr: 2,
                        pb: "13px",
                      }}
                    >
                      <FmdGoodOutlinedIcon
                        fontSize="small"
                        sx={{ color: "var(--clr-white-icon)" }}
                      />
                      <Typography
                        component="div"
                        sx={{ color: "#333333" }}
                        variant="body1"
                      >
                        {savedJob?.location}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        pr: 2,
                        pb: "13px",
                      }}
                    >
                      <WorkOutlineRoundedIcon
                        fontSize="small"
                        sx={{ color: "var(--clr-white-icon)" }}
                      />
                      <Typography
                        component="div"
                        sx={{ color: "#333333" }}
                        variant="body1"
                      >
                        {savedJob?.experience}{" "}
                        {savedJob?.experience === 1 ? "Year" : "Years"}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        pr: 2,
                        pb: "13px",
                      }}
                    >
                      <AccountBalanceWalletOutlinedIcon
                        fontSize="small"
                        sx={{ color: "var(--clr-white-icon)" }}
                      />
                      <Typography
                        component="div"
                        sx={{ color: "#333333" }}
                        variant="body1"
                      >
                        {savedJob?.maximumSalary} {"INR"}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: "max-content",
                          display: "flex",
                          alignItems: "center",
                          bgcolor: "var(--clr-blue-light)",
                          gap: 1,
                          px: 1.5,
                          py: 0.3,
                          borderRadius: 16,
                        }}
                      >
                        <HistoryOutlinedIcon
                          fontSize="small"
                          sx={{ color: "var(--clr-blue-footer)" }}
                        />
                        <Typography
                          component="div"
                          sx={{
                            color: "#395987",
                            fontSize: "12px",
                            fontWeight: 600,
                          }}
                          variant="body1"
                        >
                          {savedJob?.date_diff_indays()?.month ? (
                            <>
                              {savedJob?.date_diff_indays()?.month}{" "}
                              {savedJob?.date_diff_indays()?.month === 1
                                ? "month"
                                : "months"}{" "}
                              {savedJob?.date_diff_indays().day ? (
                                <>
                                  {savedJob.date_diff_indays()?.day}{" "}
                                  {savedJob.date_diff_indays()?.day === 1
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
                              {savedJob?.date_diff_indays().days}{" "}
                              {savedJob?.date_diff_indays()?.days === 1
                                ? "day"
                                : "days"}{" "}
                              {"ago"}
                            </>
                          )}
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          onClick={() =>
                            handleDeleteSavedJobs(savedJob?.vacancyID)
                          }
                          sx={{
                            width: "max-content",
                            bgcolor: "var(--clr-blue-light)",
                            padding: "3px 10px !important",
                            borderRadius: 16,
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#395987 !important",
                              fontWeight: "600",
                              fontSize: "12px",
                              display: "flex",
                              gap: 1,
                            }}
                          >
                            <StarIcon
                              sx={{ color: "#395987", fontSize: "1rem" }}
                            />{" "}
                            <span>Saved</span>
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </RedirectToSignUpFlow>
  );
  };

export default SavedJobs;