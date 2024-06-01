import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CircleIcon from "@mui/icons-material/Circle";
import {
  gqlquery,
  QUERY_GETJOBPOSTINGPLANS,
  QUERY_GETRESUMEDBPLANS,
} from "../../api/hospitalIndex";
import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const useStyles = makeStyles({
  icon: {
    fill: "var(--clr-blue-footer)",
  },
  menuPaper: {
    maxHeight: 150
  }
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "4px",
    width: "60px",
    padding: "6px",
    position: "relative",
    border: "1px solid #B8BCCA",
    transition: theme.transitions.create(["border-color", "box-shadow"]),


    "&:hover": {
      borderRadius: "4px",
      border: "1px solid black",
    },
    "&:focus": {
      borderRadius: "4px",
      border: "1px solid #5A98F2",
    },
  },
}));

const PricingPlans = () => {
  const { pathname } = useLocation();
  const [jobPostQuantity, setJobPostQuantity] = useState(0);
  const [jobPostQuantity1, setJobPostQuantity1] = useState(0);
  const [jobPostQuantity2, setJobPostQuantity2] = useState(0);
  const [resumeDatabaseQuantity, setResumeDatabaseQuantity] = useState(0);
  const [resumeDatabaseQuantity1, setResumeDatabaseQuantity1] = useState(0);
  const [resumeDatabaseQuantity2, setResumeDatabaseQuantity2] = useState(0);
  const [jobPostingPlans, setJobPostingPlans] = useState([]);
  const [resumeDBPlans, setResumeDBPlans] = useState([]);
  const [value, setValue] = React.useState("1");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  document.title = "Pricing Plans | MedLink Jobs";
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  const handleJobPostBuyNow = (item, index) => {
    if (index === 0) {
      item.quantity = jobPostQuantity;
    }
    if (index === 1) {
      item.quantity = jobPostQuantity1;
    }
    if (index === 2) {
      item.quantity = jobPostQuantity2;
    }
    navigate('/checkout-plan', { state: item });
  };

  const handleResumeDBBuyNow = (item, index) => {
    if (index === 0) {
      item.quantity = resumeDatabaseQuantity;
    }
    if (index === 1) {
      item.quantity = resumeDatabaseQuantity1;
    }
    if (index === 2) {
      item.quantity = resumeDatabaseQuantity2;
    }
    navigate('/checkout-plan', { state: item });
  };

  const menuQuantitys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99,
  ];

  useEffect(() => {
    gqlquery(QUERY_GETJOBPOSTINGPLANS, null)
      .then((res) => res.json())
      .then((data) => setJobPostingPlans(data?.data?.getJobPostPlans));
  }, []);

  useEffect(() => {
    gqlquery(QUERY_GETRESUMEDBPLANS, null)
      .then((res) => res.json())
      .then((data) => setResumeDBPlans(data?.data?.getResumeDBPlans));
  }, []);

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };


  const handleJobPostChangeQuantity = (index, value) => {
    if (index === 0) {
      setJobPostQuantity(value);
    }
    if (index === 1) {
      setJobPostQuantity1(value);
    }
    if (index === 2) {
      setJobPostQuantity2(value);
    }
  };

  const handleResumeDatabaseChangeQuantity = (index, value) => {
    if (index === 0) {
      setResumeDatabaseQuantity(value);
    }
    if (index === 1) {
      setResumeDatabaseQuantity1(value);
    }
    if (index === 2) {
      setResumeDatabaseQuantity2(value);
    }
  };

  const newJobPostingPlans = jobPostingPlans?.map((jobPostingPlan) => {
    let feature = jobPostingPlan.features;
    let newFeature = feature.split(",");
    let terms = JSON.parse(jobPostingPlan.terms);

    return {
      newFeature,
      terms,
      features: jobPostingPlan.features,
      name: jobPostingPlan.name,
      price: jobPostingPlan.price,
      recommended: jobPostingPlan.recommended,
      spID: jobPostingPlan.spID,
      subtext: jobPostingPlan.subtext,
      validity: jobPostingPlan.validity,
    };
  });


  const newResumeDBPlans = resumeDBPlans?.map((resumeDBPlan) => {
    let feature = resumeDBPlan.features;
    let newFeature = feature.split(",");
    let terms = JSON.parse(resumeDBPlan.terms);


    return {
      newFeature,
      features: resumeDBPlan.features,
      name: resumeDBPlan.name,
      price: resumeDBPlan.price,
      recommended: resumeDBPlan.recommended,
      spID: resumeDBPlan.spID,
      subtext: resumeDBPlan.subtext,
      validity: resumeDBPlan.validity,
      terms,
    };
  });

  return (
    <>
     {
      matches &&
       <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
        <ArrowBackIosNewIcon sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Pricing Plans</Typography>
       </Box>
      }
    <Container sx={{ mb: matches ? 0.5 : 1, px: 3, pb: matches ? 2.5 : 3 }}>
      {
        !matches &&
      <Box maxWidth="lg">
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" sx={{color: "var(--clr-blue-footer)"}} />}
            aria-label="breadcrumb"
            sx={{ mt: matches ? 0 : 2, mb: matches ? 1 : 3 }}
          >
            <Link
              underline="hover"
              style={{ color: "var(--clr-blue-footer)", /* fontSize: !matches ? "14px" : "12px" */ }}
              to="/hospital-dashboard"
            >
              Dashboard
            </Link> 
            <Typography sx={{ color: "var(--clr-blue-footer)",/*  fontSize: !matches ? "14px" : "12px" */ }}>
              Plans
            </Typography>
          </Breadcrumbs>
        </Box>
        <Typography
          variant="h5"
          sx={{
            mt: matches ? 1.5 : 3,
            mb: matches ? "0.50rem" : "0.825rem",
            fontWeight: "600",
            color: "#395987",
            fontSize: !matches ? "24px" : "18px"
          }}
          gutterBottom
          component="div"
        >
          Pricing Plans
        </Typography>
      </Box>
      }

      <Box maxWidth="md" sx={{ mx: "auto", my: matches ? 0 : 2 }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                // borderBottom: 1,
                // borderColor: "var(--clr-blue-light)",
                color: "var(--clr-blue-footer)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TabList
                onChange={handleChangeTabs}
                aria-label="lab API tabs example"
                textColor="inherit"
                TabIndicatorProps={{
                  sx: {
                    backgroundColor: "#F2B45A",
                    height: "4px",
                    borderBottom: 0,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,

                  },
                }}
              >
                <Tab sx={{ fontWeight: "600", fontSize: matches ? "12px" : "14px", borderBottom: "1px solid #E4EEF5" }} label="Job Posting" value="1" />
                <Tab sx={{ fontWeight: "600", fontSize: matches ? "12px" : "14px", borderBottom: "1px solid #E4EEF5" }} label="Resume Database" value="2" />
              </TabList>
            </Box>

            <TabPanel style={{padding : matches ? "0px" : ""}} value="1">
              <Box maxWidth="md" sx={{ mx: "auto", my: 2 }}>
                <Grid container justifyContent="space-between" columnSpacing={matches ? 0.5 : 6} rowSpacing={matches ? 2.5 : 6}>
                  {newJobPostingPlans?.map((plan, index) => (
                    <Grid key={plan?.name} item xs={12} sm={12} md={4}>
                      <Card style={plan?.recommended === true ? { borderRadius: "6px", border: "1px solid #5A98F2", boxShadow: matches ? "0px 0px 0px 0px" : "0px 9px 18px rgba(69, 143, 246, 0.09)" } : { borderRadius: "6px", boxShadow: matches ? "0px 0px 0px 0px" : "0px 9px 18px rgba(69, 143, 246, 0.09)" , border : matches && "1px solid #E4EEF5" }} >
                        <Box
                          sx={{
                            textAlign: "center",
                            mt: 4,
                            mb: 0,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {plan?.recommended === true ? (
                              <>
                                <Typography
                                  variant="caption"
                                  gutterBottom
                                  sx={{
                                    bgcolor: "#F2B45A",
                                    color: "#FFFFFF",
                                    fontWeight: "600",
                                    fontSize: "10px",
                                    borderRadius: "2px",
                                    width: "97px",
                                    height: "18px",
                                    mx: "auto",
                                  }}
                                >
                                  Recommended
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography
                                  gutterBottom
                                  sx={{
                                    color: "#FFFFFF",
                                    fontWeight: "600",
                                    fontSize: "10px",
                                    borderRadius: "2px",
                                    width: "97px",
                                    height: "18px",
                                    mx: "auto",
                                  }}
                                />
                              </>
                            )}
                            <Typography
                              sx={{
                                fontWeight: "600",
                                mt: 1,
                                color: "#395987",
                              }}
                              variant="subtitle2"
                              component="div"
                            >
                              {plan?.name}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="h4"
                              component="div"
                              gutterBottom
                              sx={{
                                fontWeight: "700",
                                color: "#395987",
                              }}
                            >
                              {plan?.price.toLocaleString('en-IN')} INR
                            </Typography>
                          </Box>
                          <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "flex-end",
                            gap: 3,
                          }}>
                            <Typography
                              sx={{
                                color: "#8F8A8A",
                              }}
                            >
                              {plan?.subtext}
                            </Typography>

                          </Box>
                          <Typography
                            sx={{
                              color: "#8F8A8A",
                            }}>
                            Valid for {plan?.validity} days
                          </Typography>

                          <Box sx={{ mb: 2.5, px: 1.35 }}>
                            <List>
                              {plan?.newFeature?.map((description) => (
                                <ListItem
                                  sx={{
                                    fontSize: "14px",
                                    color: "#8F8A8A",
                                    lineClamp: "20px",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "start",
                                      JustifyContent: "center",
                                    }}
                                  >
                                    <CheckBoxOutlinedIcon
                                      fontSize="small"
                                      color="success"
                                    />
                                    &nbsp;&nbsp;
                                    <Typography sx={{ color: "#8F8A8A" }}>
                                      {" "}
                                      {description}
                                    </Typography>
                                  </Box>
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              px: 2,
                              py: 1,
                              border: "2px dashed #E4EEF5",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <Typography
                              sx={{ color: "#8F8A8A" }}
                              variant="body1"
                              component="div"
                            >
                              Quantity
                            </Typography>
                            <Box>
                              <FormControl
                                fullWidth
                                sx={{
                                  minWidth: 70,
                                  backgroundColor: "#E4EEF5",
                                  borderRadius: "4px"
                                }}
                              >
                                {
                                  index === 0 && (
                                    <Select
                                      value={jobPostQuantity}
                                      onChange={(e) => handleJobPostChangeQuantity(index, e.target.value)}
                                      size="small"
                                      displayEmpty
                                      sx={{ color: "#395987" }}
                                      input={<BootstrapInput />}
                                      inputProps={{
                                        classes: {
                                          icon: classes.icon,
                                        },
                                      }}
                                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                                    >
                                      <MenuItem value="" disabled>
                                        Select
                                      </MenuItem>
                                      {
                                        menuQuantitys.map((menuQuantity) =>
                                          <MenuItem value={menuQuantity}>{menuQuantity}</MenuItem>
                                        )
                                      }
                                    </Select>
                                  )
                                }

                                {
                                  index === 1 && (
                                    <Select
                                      value={jobPostQuantity1}
                                      onChange={(e) => handleJobPostChangeQuantity(index, e.target.value)}
                                      size="small"
                                      displayEmpty
                                      input={<BootstrapInput />}
                                      sx={{ color: "#395987" }}
                                      inputProps={{
                                        classes: {
                                          icon: classes.icon,
                                        },
                                      }}
                                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                                    >
                                      <MenuItem value="" disabled>
                                        Select
                                      </MenuItem>
                                      {
                                        menuQuantitys.map((menuQuantity) =>
                                          <MenuItem value={menuQuantity}>{menuQuantity}</MenuItem>
                                        )
                                      }
                                    </Select>
                                  )
                                }

                                {
                                  index === 2 && (
                                    <Select
                                      value={jobPostQuantity2}
                                      onChange={(e) => handleJobPostChangeQuantity(index, e.target.value)}
                                      size="small"
                                      displayEmpty
                                      input={<BootstrapInput />}
                                      sx={{ color: "#395987" }}
                                      inputProps={{
                                        classes: {
                                          icon: classes.icon,
                                        },
                                      }}
                                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                                    >
                                      <MenuItem value="" disabled>
                                        Select
                                      </MenuItem>
                                      {
                                        menuQuantitys.map((menuQuantity) =>
                                          <MenuItem value={menuQuantity}>{menuQuantity}</MenuItem>
                                        )
                                      }
                                    </Select>
                                  )
                                }
                              </FormControl>
                            </Box>
                          </Box>
                          <Box sx={{ px: 2 }}>
                            <Typography
                              variant="subtitle2"
                              component="div"
                              sx={{
                                color: "#4F4F4F",
                                fontWeight: "600",
                                fontSize: "10px",
                                my: 2,
                                textAlign: "left",
                              }}
                            >
                              Flat 10% OFF | Buy 5 Job Postings or more
                            </Typography>
                            <Box sx={{ px: 2 }}>
                              <Button
                                onClick={() => { handleJobPostBuyNow(plan, index) }}
                                size="small"
                                sx={{
                                  mb: 3,
                                  mx: "auto",
                                  rounded: 3,
                                  fontWeight: "600px",
                                  borderRadius: "20px",
                                }}
                                fullWidth
                                variant="contained"
                              >
                                Buy Now
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ px: 1 , py: matches ? 2 : 1 }}>
                  <List
                    sx={{
                      color: "#828282",
                      lineHeight: "24px",
                    }}
                  >
                    {newJobPostingPlans[0]?.terms?.map((feature) => (
                      <ListItem
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "flex-start",
                          gap: 3,
                          py: 0,
                        }}
                        key={feature}
                      >
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ fontWeight: "600", fontSize: "5px" }}
                        >
                          <CircleIcon fontSize="5px" sx={{ color: "#395987" }} />
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{
                            fontWeight: "600",
                            fontSize: "10px",
                            lineHeight: "24px",
                            color: "#828282",
                          }}
                        >
                          {feature}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel style={{padding : matches ? "0px" : ""}} value="2">
              <Box maxWidth="md" sx={{ mx: "auto", my: 2 }}>
                <Grid container justifyContent="space-between" spacing={matches ? 2.5 : 6} columnSpacing={matches ? 0.5 : 6} rowSpacing={matches ? 2.5 : 6}>
                  {newResumeDBPlans?.map((plan, index) => (
                    <Grid key={plan?.name} item xs={12} sm={12} md={4}>
                      <Card style={plan?.recommended === true ? { borderRadius: "6px", border: "1px solid #5A98F2", boxShadow: matches ? "0px 0px 0px 0px" : "0px 9px 18px rgba(69, 143, 246, 0.09)" } : { borderRadius: "6px", boxShadow: matches ? "0px 0px 0px 0px" : "0px 9px 18px rgba(69, 143, 246, 0.09)" , border : matches && "1px solid #E4EEF5"}} >
                        <Box
                          sx={{
                            textAlign: "center",
                            mt: 4,
                            mb: 0,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {plan?.recommended === true ? (
                              <>
                                <Typography
                                  variant="caption"
                                  gutterBottom
                                  sx={{
                                    bgcolor: "#F2B45A",
                                    color: "#FFFFFF",
                                    fontWeight: "600",
                                    fontSize: "10px",
                                    borderRadius: "2px",
                                    width: "97px",
                                    height: "18px",
                                    mx: "auto",
                                  }}
                                >
                                  Recommended
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography
                                  gutterBottom
                                  sx={{
                                    color: "#FFFFFF",
                                    fontWeight: "600",
                                    fontSize: "10px",
                                    borderRadius: "2px",
                                    width: "97px",
                                    height: "18px",
                                    mx: "auto",
                                  }}
                                />
                              </>
                            )}
                            <Typography
                              sx={{
                                fontWeight: "600",
                                mt: 1,
                                color: "#395987",
                              }}
                              variant="subtitle2"
                              component="div"
                            >
                              {plan?.name}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="h4"
                              component="div"
                              gutterBottom
                              sx={{
                                fontWeight: "700",
                                color: "#395987",
                              }}
                            >
                              {plan?.price.toLocaleString('en-IN')} INR
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "flex-end",
                              gap: 3,
                            }}
                          >
                            <Typography sx={{ color: "#8F8A8A" }}>
                              {plan?.subtext}
                            </Typography>
                          </Box>
                          <Typography sx={{ color: "#8F8A8A" }}>
                            Valid for {plan?.validity} days
                          </Typography>

                          <Box sx={{ mb: 2.5, px: 1.35 }}>
                            <List>
                              {plan.newFeature.map((description) => (
                                <ListItem
                                  sx={{
                                    fontSize: "14px",
                                    color: "#8F8A8A",
                                    lineClamp: "20px",
                                  }}
                                >
                                  <CheckBoxOutlinedIcon
                                    fontSize="small"
                                    color="success"
                                  />
                                  &nbsp;&nbsp;
                                  {description}
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              px: 2,
                              py: 1,
                              border: "2px dashed #E4EEF5",
                              borderLeft: "none",
                              borderRight: "none",
                            }}
                          >
                            <Typography
                              sx={{ color: "#8F8A8A" }}
                              variant="body1"
                              component="div"
                            >
                              Quantity
                            </Typography>
                            <Box>
                              <FormControl
                                fullWidth
                                sx={{
                                  minWidth: 70,
                                  backgroundColor: "#E4EEF5",
                                  borderRadius: "4px"
                                }}
                              >
                                {
                                  index === 0 && (
                                    <Select
                                      value={resumeDatabaseQuantity}
                                      onChange={(e) => handleResumeDatabaseChangeQuantity(index, e.target.value)}
                                      size="small"
                                      displayEmpty
                                      input={<BootstrapInput />}
                                      sx={{ color: "#395987" }}
                                      inputProps={{
                                        classes: {
                                          icon: classes.icon,
                                        },
                                      }}
                                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                                    >
                                      <MenuItem value="" disabled>
                                        Select
                                      </MenuItem>
                                      {
                                        menuQuantitys.map((menuQuantity) =>
                                          <MenuItem value={menuQuantity}>{menuQuantity}</MenuItem>
                                        )
                                      }
                                    </Select>
                                  )
                                }

                                {
                                  index === 1 && (
                                    <Select
                                      value={resumeDatabaseQuantity1}
                                      onChange={(e) => handleResumeDatabaseChangeQuantity(index, e.target.value)}
                                      size="small"
                                      input={<BootstrapInput />}
                                      displayEmpty
                                      sx={{ color: "#395987" }}
                                      inputProps={{
                                        classes: {
                                          icon: classes.icon,
                                        },
                                      }}
                                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                                    >
                                      <MenuItem value="" disabled>
                                        Select
                                      </MenuItem>
                                      {
                                        menuQuantitys.map((menuQuantity) =>
                                          <MenuItem value={menuQuantity}>{menuQuantity}</MenuItem>
                                        )
                                      }
                                    </Select>
                                  )
                                }

                                {
                                  index === 2 && (
                                    <Select
                                      value={resumeDatabaseQuantity2}
                                      onChange={(e) => handleResumeDatabaseChangeQuantity(index, e.target.value)}
                                      size="small"
                                      displayEmpty
                                      input={<BootstrapInput />}
                                      sx={{ color: "#395987" }}
                                      inputProps={{
                                        classes: {
                                          icon: classes.icon,
                                        },
                                      }}
                                      MenuProps={{ classes: { paper: classes.menuPaper } }}
                                    >
                                      <MenuItem value="" disabled>
                                        Select
                                      </MenuItem>
                                      {
                                        menuQuantitys.map((menuQuantity) =>
                                          <MenuItem value={menuQuantity}>{menuQuantity}</MenuItem>
                                        )
                                      }
                                    </Select>
                                  )
                                }

                              </FormControl>
                            </Box>
                          </Box>
                          <Box sx={{ px: 2 }}>
                            <Typography
                              variant="subtitle2"
                              component="div"
                              sx={{
                                color: "#4F4F4F",
                                fontWeight: "600",
                                fontSize: "10px",
                                my: 2,
                                textAlign: "left",
                              }}
                            >
                              Flat 10% OFF | Buy 5 Job Postings or more
                            </Typography>
                            <Box sx={{ px: 2 }}>
                              <Button
                                size="small"
                                onClick={() => { handleResumeDBBuyNow(plan, index) }}
                                sx={{
                                  mb: 3,
                                  mx: "auto",
                                  rounded: 3,
                                  fontWeight: "600px",
                                  borderRadius: "20px",
                                }}
                                fullWidth
                                variant="contained"
                              >
                                Buy Now
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ px: 1 , py: matches ? 2 : 1 }}>
                  <List
                    sx={{
                      color: "#828282",
                      lineHeight: "24px",
                    }}
                  >
                    {newResumeDBPlans[0]?.terms?.map((feature) => (
                      <ListItem
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "flex-start",
                          gap: 3,
                          py: 0,
                        }}
                        key={feature}
                      >
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{ fontWeight: "600", fontSize: "5px" }}
                        >
                          <CircleIcon fontSize="5px" sx={{ color: "#395987" }} />
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          sx={{
                            fontWeight: "600",
                            fontSize: "10px",
                            lineHeight: "24px",
                          }}
                        >
                          {feature}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default PricingPlans;
