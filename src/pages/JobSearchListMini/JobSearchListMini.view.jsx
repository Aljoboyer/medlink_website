
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MenuIcon from "@mui/icons-material/Menu";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Link, useLocation } from "react-router-dom";
import { gqlquery, gqlOpenQuery } from "../../api";
import styled from "@emotion/styled";
import useAuth from "../../hooks/useAuth";

const values = ["column", "Grid", "Flex"];

const SearchButton = styled(Button)(() => ({
  color: "var(--clr-white) !important",
}));


const JobSearchListMini = () => {
  const {user} = useAuth();
  const location = useLocation();
  const [flag, setFlag] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchJobsQueryInfo, setSearchJobsItemsQueryInfo] = useState({});
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);
  const [searchResultsPerPage, setSearchResultsPerPage] = useState(10);
  const [jobsSearchInfo, setJobsSearchInfo] = useState({
    jobTitle: "",
    location: "",
  });

  const handleChange = (prop) => (event) => {
    setJobsSearchInfo({ ...jobsSearchInfo, [prop]: event.target.value });
  };

  const onClick = (e) => {
    e.preventDefault();
    setFlag((prevData) => !prevData);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeSearchResultsPerPage = (event) => {
    setSearchResultsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSearchQueryData = () => {
    searchJobsQueryInfo.jobTitle = location?.state?.jobTitle;
    searchJobsQueryInfo.location = location?.state?.location;
    jobsSearchInfo.jobTitle = location?.state?.jobTitle;
    jobsSearchInfo.location = location?.state?.location;
  };

  useEffect(() => {
    const QUERY_SEARCHJOBS = {
      query: `query MyQuery {
                  searchJobs(location: "${location?.state?.location}",
                   title: "${location?.state?.jobTitle}") 
                   {
                  jobTitle
                  qualification
                  secondarySpecialization
                  description
                  maximumSalary
                  minimumSalary
                  postedOn
                  location
                  primarySpecialization
                  experience
                  vacancyID
                  savedJob
                  }
                  }
                `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_SEARCHJOBS, null)
    // gqlquery(QUERY_SEARCHJOBS, null)
      .then((res) => res.json())
      .then((data) => setSearchResults(data?.data?.searchJobs));
    getSearchQueryData();
  }, []);

  const handleJobsSearch = () => {
    const QUERY_SEARCHJOBS = {
      query: `query MyQuery {
                      searchJobs(location: "${jobsSearchInfo?.location}",
                       title: "${jobsSearchInfo?.jobTitle}") 
                       {
                            jobTitle
                            qualification
                            secondarySpecialization
                            description
                            maximumSalary
                            minimumSalary
                            postedOn
                            location
                            primarySpecialization
                            experience
                            vacancyID
                            savedJob
                        }
                      }
                    `,
      variables: null,
      operationName: "MyMutation",
    };
    gqlOpenQuery(QUERY_SEARCHJOBS, null)
    // gqlquery(QUERY_SEARCHJOBS, null)
      .then((res) => res.json())
      .then((data) => setSearchResults(data?.data?.searchJobs))
    setFlag((prevData) => !prevData);
  };
  if (searchResults?.length) {
    searchJobsQueryInfo.jobTitle = searchResults[0]?.jobTitle;
    searchJobsQueryInfo.location = searchResults[0]?.location;
    if (jobsSearchInfo?.location === "") {
      searchJobsQueryInfo.location = jobsSearchInfo?.location
    }
  }


  // console.log(searchResults);

  const newSearchResults = searchResults?.map((searchResult) => {
    const date_diff_indays = function () {
      const dt1 = new Date(searchResult?.postedOn);
      const dt2 = new Date();
      const days = Math?.floor(
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

    return {
      date_diff_indays,
      jobTitle: searchResult?.jobTitle,
      qualification: searchResult?.qualification,
      secondarySpecialization: searchResult?.secondarySpecialization,
      description: searchResult?.description,
      maximumSalary: searchResult?.maximumSalary,
      minimumSalary: searchResult?.minimumSalary,
      location: searchResult?.location,
      postedOn: searchResult?.postedOn,
      primarySpecialization: searchResult?.primarySpecialization,
      experience: searchResult?.experience,
      vacancyID: searchResult?.vacancyID,
    };
  });
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

      {/* Edit search */}
      <Box sx={{ bgcolor: "#BDBDBD", p: 2, }}>
        {!flag ? (<Grid container justifyContent="space-between" alignItems="center" specing={1}>
          <Grid item xs={11}><Typography
            variant="subtitle2"
            component="div"
            sx={{
              color: "#333333",
              fontWeight: "600",
            }}
          >
            Showing jobs for '{searchJobsQueryInfo?.jobTitle},{" "}
            {searchJobsQueryInfo?.location}'
          </Typography></Grid>
          <Grid item xs={1}><EditIcon
            onClick={onClick}
            sx={{ color: "#828282", fontSize: "16px" }}
          /></Grid>
        </Grid>) : (<div style={{ display: "flex" }}>
          <>
            <TextField
              name="jobTitle"
              defaultValue={searchJobsQueryInfo?.jobTitle}
              onChange={handleChange("jobTitle")}
              placeholder="Job Title"
              sx={{
                backgroundColor: "white",
                width: "95%",
                borderTopLeftRadius: "7px",
                borderBottomLeftRadius: "7px",
                zIndex: "1",
                "& .MuiInputBase-input": { height: 31 },
              }}
            />
            <TextField
              name="location"
              defaultValue={searchJobsQueryInfo?.location}
              placeholder="Location"
              onChange={handleChange("location")}
              sx={{
                backgroundColor: "white",
                size: "large",
                width: "105%",
                borderTopRightRadius: "7px",
                borderBottomRightRadius: "7px",
                zIndex: "1",
                "& .MuiInputBase-input": { height: 31 },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchButton
                      onClick={handleJobsSearch}
                      color="primary"
                      edge="end"
                      size="large"
                      sx={{
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "5px",
                        width: 25,
                      }}
                    >
                      <SearchIcon />
                    </SearchButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        </div>)}
        <Box>
          <Button
            variant="contained"
            sx={{
              mt: 2.5,
              mb: 0.5,
              borderRadius: 2,
              backgroundColor: "#4F4F4F",
              color: "white",
            }}
          >
            Save as Alert
          </Button>
        </Box>
      </Box>

      {/* Filter option */}
      <Box sx={{
        mx: 2,
        my: 2.5,
      }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            bgcolor: "#E0E0E0",
            py: 2,
            px: 3,
            gap: 2,
            borderRadius: 2,
          }}
        >
          <FilterAltTwoToneIcon sx={{ color: "#323232" }} />
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              color: "#333333",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            All Filters
          </Typography>
        </Box>
      </Box>

      {/* search details */}
      <Box sx={{
        mx: 2,
        my: 2.5,
      }}>
        <Typography variant="body2" sx={{ color: "#828282" }}>
          1 - 20 of {searchResults?.length} {searchJobsQueryInfo?.jobTitle}{" "}
          Jobs In {searchJobsQueryInfo?.location}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <FormControl
            size="small"
            sx={{
              minWidth: 120,
              bgcolor: "#E0E0E0",
              border: "none",
            }}
          >
            <Select displayEmpty value={sort} onChange={handleSortChange}>
              <MenuItem disabled>
                <b>Sort By</b>
              </MenuItem>
              {values?.map((value) => (
                <MenuItem value={value} key={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Job list */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mx: 2,
          my: 2.5,
        }}
      >
        {newSearchResults
          ?.slice(
            page * searchResultsPerPage,
            page * searchResultsPerPage + searchResultsPerPage
          )
          ?.map((searchResult) => (
            <Box
              key={searchResult.id}
              sx={{
                bgcolor: "#F2F2F2",
                borderRadius: 3,
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
                <Link to={`/job-search-list-mini/${searchResult?.vacancyID}`}>
                  {searchResult?.jobTitle}
                </Link>
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{
                  color: "#333333",
                  fontWeight: "600",
                }}
              >
                {/* {searchResult.hospitalName} */}
                Hospital / Consultant name Here
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
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
                  {searchResult?.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
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
                    minWidth: "100px"
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
                    {searchResult?.primarySpecialization}
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
                    {searchResult?.secondarySpecialization}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5
                  // alignItems: "center",
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
                    {searchResult?.location}
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
                    {searchResult?.experience}{" "}
                    {searchResult?.experience === 1 ? "Year" : "Years"}
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
                    {searchResult?.maximumSalary} {"INR"}
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
                      {searchResult?.date_diff_indays()?.month ? (
                        <>
                          {searchResult?.date_diff_indays()?.month}{" "}
                          {searchResult?.date_diff_indays()?.month === 1
                            ? "month"
                            : "months"}{" "}
                          {searchResult?.date_diff_indays()?.day ? (
                            <>
                              {searchResult?.date_diff_indays()?.day}{" "}
                              {searchResult?.date_diff_indays()?.day === 1
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
                          {searchResult?.date_diff_indays()?.days}{" "}
                          {searchResult?.date_diff_indays()?.days === 1
                            ? "day"
                            : "days"}{" "}
                          {"ago"}
                        </>
                      )}

                      {/* {searchResult.postedOn} */}
                    </Typography>
                  </Box>

                </Box>
                <Box>
                  {
                    searchResult?.savedJob ? (<Button /* onClick={handleSaveJob} */ disabled sx={{ width: "max-content", bgcolor: "#E0E0E0", gap: 1 }}><StarIcon fontSize="small" /> Saved </Button>) : (<Button /* onClick={() => handleDeleteSavedJobs(row?.vacancyID)} */ diababled sx={{ width: "max-content", bgcolor: "#E0E0E0", gap: 1 }}><StarBorderIcon fontSize="small" /> Save Job </Button>)
                  }
                </Box>
              </Box>
            </Box>
          ))}
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pt: 2,
          mb: 8
        }}
      >
        <Box>
          <Pagination
            variant="outlined"
            count={1}
            shape="rounded"
            component="div"
            page={page}
            onChangeRowsPerPage={handleChangeSearchResultsPerPage}
            onChangePage={handleChangePage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default JobSearchListMini;

