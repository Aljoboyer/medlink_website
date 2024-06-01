import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { gqlquery, QUERY_SAVEDJOBS } from '../../api';
import MenuIcon from "@mui/icons-material/Menu";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import StarIcon from '@mui/icons-material/Star';

const SavedJobsMini = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    gqlquery(QUERY_SAVEDJOBS, null)
      .then((res) => res.json())
      .then((data) => setSavedJobs(data?.data?.getSavedJobs));
  }, [updateList]);


  const handleDeleteSavedJobs = (deleteId) => {

    if (window.confirm("Are you sure you want to delete?")) {
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
    }
  })
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
          {savedJobs?.length} Jobs saved by you
        </Typography>
      </Box>

      {/*Saved Jobs container*/}
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 3, mb: 6 }}>
        {newSavedJobs?.map((savedJob) =>
          <Box
            key={savedJob?.vacancyID}
            sx={{
              bgcolor: "#F2F2F2",
              borderRadius: 2,
              p: 2.5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
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
              {savedJob?.jobTitle}
            </Typography>
            <Typography
              variant="subtitle2"
              component="div"
              sx={{
                color: "#333333",
                fontWeight: "600",
              }}
            >
              {/* {savedJob?.hospitalName} */}
              Hospital / Consultant name Here
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1,
                pr: 2,
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
                {savedJob?.description}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 4,
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
                    lineHeight: "16px",
                    color: "#333333",
                    fontWeight: "600",
                  }}
                >
                  {savedJob?.primarySpecialization}
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{
                    lineHeight: "16px",
                    color: "#333333",
                    fontWeight: "600",
                  }}
                >
                  {savedJob?.secondarySpecialization}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2
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
                <WorkTwoToneIcon
                  fontSize="small"
                  sx={{ color: "#323232" }}
                />
                <Typography
                  component="div"
                  sx={{ color: "#4F4F4F" }}
                  variant="body1"
                >
                  {savedJob?.experience} {savedJob?.experience === 1 ? "Year" : "Years"}
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
                  {savedJob?.maximumSalary} {"INR"}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box

              >
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
                    {
                      savedJob?.date_diff_indays()?.month ? (
                        <>
                          {savedJob?.date_diff_indays()?.month} {savedJob?.date_diff_indays()?.month === 1 ? "month" : "months"} {" "}
                          {
                            savedJob?.date_diff_indays().day ? (
                              <>
                                {savedJob.date_diff_indays()?.day} {savedJob.date_diff_indays()?.day === 1 ? "day" : "days"} {"ago"}
                              </>
                            ) :
                              (
                                <> {"ago"}
                                </>
                              )
                          }
                        </>
                      ) :
                        (
                          <>
                            {savedJob?.date_diff_indays().days} {savedJob?.date_diff_indays()?.days === 1 ? "day" : "days"}    {"ago"}
                          </>
                        )
                    }
                  </Typography>
                </Box>

              </Box>
              <Box>
                <Button onClick={() => handleDeleteSavedJobs(savedJob?.vacancyID)} sx={{ width: "max-content", bgcolor: "#E0E0E0", gap: 1 }}><StarIcon fontSize="small"></StarIcon> Saved </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SavedJobsMini;



