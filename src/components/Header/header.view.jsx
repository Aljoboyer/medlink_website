import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery
} from "@mui/material";
import React, { useEffect, useState } from "react";
// import { Menu, MenuItem } from "@material-ui/core";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CircleIcon from "@mui/icons-material/Circle";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useLocation, useNavigate } from "react-router-dom";
import header_logo from "../../assets/images/logo_medlink.png";
import header_logo_v1 from "../../assets/images/Medlink-Logo.svg"
import header_logo_v1_update from "../../assets/images/HeaderNew.svg"
import profileImg from "../../assets/profile.png";
import useAuth from "../../hooks/useAuth";

const navigations = [
  {
    label: "Dashboard",
    path: "/profile-home",
  },
  {
    label: "Profile",
    path: "/profile"
  },
  /* {
    label: "Doctors",
    path: "/doctors",
  }, */
];

const navigationsWithoutFlow = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Jobseekers",
    path: "/login"
  },
  /* {
    label: "Doctors",
    path: "/doctors",
  }, */
];

const mobileNavigationsWithoutFlow = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Jobseekers",
    path: "/login"
  },
  {
    label: "Recruiters",
    path: "/hospital-login",
  },
];

const hospitalNavigations = [
  {
    label: "Resume Database",
    path: "/doctors",
  },
  {
    label: "Advertisements",
    path: "/advertisements",
  },
  {
    label: "Others",
    path: "/services",
  },
];

const mobileNavigations = [
  ...mobileNavigationsWithoutFlow,
  { label: "Services", path: "" }, { label: "Recruiter Login", path: "/hospital-login" }, { label: "Jobseeker Login", path: "/login", },
];

const DrawerComponent = ({ openDrawer, setOpenDrawer }) => {
  return (
    <>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List sx={{ marginTop: "4rem", minWidth: "250px" }}>
          {mobileNavigations.map((nav) => (
            <ListItem
              key={nav.label}
              onClick={() => setOpenDrawer(false)}
              component={Link}
              to={nav.path}
            >
              <ListItemText sx={{ padding: "0rem 0rem" }}>
                {nav.label}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

const JobSeekerLoggedInDrawer = (props) => {
  const { openDrawer, setOpenDrawer, profilePicture, userName, logOut } = props;
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showJobsOptions, setShowJobsOptions] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  useEffect(() => {
    if (!openDrawer) {
      setShowUserOptions(false);
      setShowJobsOptions(false);
      setShowMoreOptions(false);
    }
  }, [openDrawer])

  return (
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        sx={{}}
      >
        <List sx={{ marginTop: "1rem", minWidth: "250px" }}>
          <ListItem
            onClick={() => setShowUserOptions(pre => !pre)}
          >
            <ListItemText sx={{ padding: "0rem 0rem" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img style={{ height: "50px", width: "50px" }} src={profilePicture === "data:image/png;base64," ? profileImg : profilePicture } alt="profile_picture" />
                <Typography> &nbsp; {userName?.length > 13 ? `${userName?.slice(0, 12)}...` : userName}  {showUserOptions ? <ArrowDropUpIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} /> : <ArrowDropDownIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} />}
                </Typography>
              </Box>
            </ListItemText>
          </ListItem>
          {
            showUserOptions && (
              <>
                <ListItem
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                  component={Link}
                  to="/profile"
                >
                  <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                    Edit Profile
                  </ListItemText>
                </ListItem>
                <ListItem
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                  component={Link}
                  to="/account-settings"
                >
                  <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                    Change Password
                  </ListItemText>
                </ListItem>
                <ListItem
                  onClick={() => {
                    setOpenDrawer(false);
                    logOut();
                  }}
                // component={Link}
                // to="/saved-jobs"
                >
                  <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                    Logout
                  </ListItemText>
                </ListItem>
              </>
            )
          }
          <ListItem
            onClick={() => setOpenDrawer(false)}
            component={Link}
            to="/profile-home"
          >
            <ListItemText sx={{ padding: "0rem 0rem" }}>
              Dashboard
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => setOpenDrawer(false)}
            component={Link}
            to="/profile"
          >
            <ListItemText sx={{ padding: "0rem 0rem" }}>
              Profile
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              // setOpenDrawer(false);
              setShowJobsOptions(pre => !pre)
            }}
          // component={Link}
          // to="/profile-home"
          >
            <ListItemText sx={{ padding: "0rem 0rem", }}>
              Jobs {showJobsOptions ? <ArrowDropUpIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} /> : <ArrowDropDownIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} />}
            </ListItemText>
          </ListItem>
          {
            showJobsOptions && (
              <>
                <ListItem
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                  component={Link}
                  to="/profile-home"
                >
                  <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                    Search Jobs
                  </ListItemText>
                </ListItem>
                <ListItem
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                  component={Link}
                  to="/saved-jobs"
                >
                  <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                    Saved Jobs
                  </ListItemText>
                </ListItem>
              </>
            )
          }
          <ListItem
            onClick={() => {
              // setOpenDrawer(false);
              setShowMoreOptions(pre => !pre)
            }}
          // component={Link}
          // to="/profile-home"
          >
            <ListItemText sx={{ padding: "0rem 0rem" }}>
              More {showMoreOptions ? <ArrowDropUpIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} /> : <ArrowDropDownIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} />}
            </ListItemText>
          </ListItem>
          {
            showMoreOptions && (
              <>
                <ListItem
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                  component={Link}
                  to="/manage-alert"
                >
                  <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                    Manage Alerts
                  </ListItemText>
                </ListItem>
              </>
            )
          }
          <ListItem
          // onClick={() => setOpenDrawer(false)}
          // component={Link}
          // to="/profile"
          >
            <ListItemText sx={{ padding: "0rem 0rem" }}>
              Reminders
            </ListItemText>
          </ListItem>
          <ListItem
          // onClick={() => setOpenDrawer(false)}
          // component={Link}
          // to="/profile"
          >
            <ListItemText sx={{ padding: "0rem 0rem" }}>
              Notifications
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
  );
};

const RecruiterLoggedInDrawer = (props) => {
  const navigate = useNavigate();
  const hasToken = sessionStorage.getItem('accessToken');
  const { openDrawer, setOpenDrawer, profilePicture, userName, hospitalUser, logOut } = props;
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [jobsResponsesOptions, setJobsResponsesOptions] = useState(false);
  const [showHealthCareProfile, setShowHealthCareProfile] = useState(false);
  const [showAdvertisementOptions, setShowAdvertisementOptions] = useState(false);
  const [showPricingOptions, setShowPricingOptions] = useState(false);
  const [showRecruiterOptions, setShowRecruiterOptions] = useState(false);

  useEffect(() => {
    if (!openDrawer) {
      setShowUserOptions(false);
      setShowMoreOptions(false);
      setJobsResponsesOptions(false);
      setShowHealthCareProfile(false);
      setShowAdvertisementOptions(false);
      setShowPricingOptions(false);
      setShowRecruiterOptions(false);
    }
  }, [openDrawer])

  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
      sx={{}}
    >
      <List sx={{ marginTop: "1rem", minWidth: "250px" }}>
        <ListItem
          onClick={() => setShowUserOptions(pre => !pre)}
        >
          <ListItemText sx={{ padding: "0rem 0rem" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img style={{ height: "50px", width: "50px" }} src={profilePicture === "data:image/png;base64," ? profileImg : profilePicture } alt="profile_picture" />
              <Typography> &nbsp; {userName?.length > 13 ? `${userName?.slice(0, 12)}...` : userName}  {showUserOptions ? <ArrowDropUpIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} /> : <ArrowDropDownIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} />}
              </Typography>
            </Box>
          </ListItemText>
        </ListItem>
        {
          showUserOptions && (
            <>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                  navigate((!(hospitalUser?.contactName) && hasToken) ? "/hospital-basic-details" : "/profile/company-profile", {
                    state: { stateIndex: 0 },
                  })
                }}
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Media
                </ListItemText>
              </ListItem>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                  navigate((!(hospitalUser?.contactName) && hasToken) ? "/hospital-basic-details" : "/profile/company-profile", {
                    state: { stateIndex: 1 },
                  })
                }}
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Profile Details
                </ListItemText>
              </ListItem>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                  navigate((!(hospitalUser?.contactName) && hasToken) ? "/hospital-basic-details" : "/profile/company-profile", {
                    state: { stateIndex: 2 },
                  })
                }}
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Company Details
                </ListItemText>
              </ListItem>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                  navigate((!(hospitalUser?.contactName) && hasToken) ? "/hospital-basic-details" : "/profile/company-profile", {
                    state: { stateIndex: 3 },
                  })
                }}
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Billing Details
                </ListItemText>
              </ListItem>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                  navigate((!(hospitalUser?.contactName) && hasToken) ? "/hospital-basic-details" : "/profile/company-profile", {
                    state: { stateIndex: 4 },
                  })
                }}
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Settings
                </ListItemText>
              </ListItem>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                  logOut();
                }}
              // component={Link}
              // to="/saved-jobs"
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Logout
                </ListItemText>
              </ListItem>
            </>
          )
        }
        <ListItem
          onClick={() => setOpenDrawer(false)}
          component={Link}
          to="/hospital-dashboard"
        >
          <ListItemText sx={{ padding: "0rem 0rem" }}>
            Dashboard
          </ListItemText>
        </ListItem>
        <ListItem
          onClick={() => setJobsResponsesOptions(pre => !pre)}
        >
          <ListItemText sx={{ padding: "0rem 0rem" }}>
            Jobs & Responses  {jobsResponsesOptions ? <ArrowDropUpIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} /> : <ArrowDropDownIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} />}
          </ListItemText>
        </ListItem>
        {
          jobsResponsesOptions && (
            <>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                }}
                component={Link}
                to="/create-vacancies"
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Hot Vacancy
                </ListItemText>
              </ListItem>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                }}
                component={Link}
                to="/post-job"
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Jobs
                </ListItemText>
              </ListItem>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                }}
                component={Link}
                to="/manage-jobs-and-responses"
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Manage Jobs & Responses
                </ListItemText>
              </ListItem>
            </>
          )
        }
        <ListItem
          onClick={() => {
            setShowHealthCareProfile(pre => !pre)
          }}
        // component={Link}
        // to="/profile-home"
        >
          <ListItemText sx={{ padding: "0rem 0rem", }}>
            Healthcare Profile {showHealthCareProfile ? <ArrowDropUpIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} /> : <ArrowDropDownIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} />}
          </ListItemText>
        </ListItem>
        {
          showHealthCareProfile && (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
              }}
              component={Link}
              to="/advance-search"
            >
              <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                Search Profile
              </ListItemText>
            </ListItem>
          )
        }
        <ListItem
          onClick={() => setShowAdvertisementOptions(pre => !pre)}
        // component={Link}
        // to="/profile-home"
        >
          <ListItemText sx={{ padding: "0rem 0rem" }}>
            Advertisement {showAdvertisementOptions ? <ArrowDropUpIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} /> : <ArrowDropDownIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} />}
          </ListItemText>
        </ListItem>
        {
          showAdvertisementOptions && (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
              }}
              component={Link}
              to="/contact-us"
            >
              <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                Enquire Branding
              </ListItemText>
            </ListItem>
          )
        }
        <ListItem
          onClick={() => setShowPricingOptions(pre => !pre)}
        >
          <ListItemText sx={{ padding: "0rem 0rem" }}>
            Pricing {showPricingOptions ? <ArrowDropUpIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} /> : <ArrowDropDownIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} />}
          </ListItemText>
        </ListItem>
        {
          showPricingOptions && (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
              }}
              component={Link}
              to="/profile/plans"
            >
              <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                View Pricing
              </ListItemText>
            </ListItem>
          )
        }
        <ListItem
          onClick={() => setShowRecruiterOptions(pre => !pre)}
        >
          <ListItemText sx={{ padding: "0rem 0rem" }}>
            Recruiter {showRecruiterOptions ? <ArrowDropUpIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} /> : <ArrowDropDownIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} />}
          </ListItemText>
        </ListItem>
        {
          showRecruiterOptions && (
            <>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                }}
                component={Link}
                to="/personal-folders"
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Personal Folder
                </ListItemText>
              </ListItem>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                }}
                component={Link}
                to="/saved-searches"
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Saved Searcehs
                </ListItemText>
              </ListItem>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                }}
                component={Link}
                to="/hospital-dashboard"
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Shortlisted Candidates
                </ListItemText>
              </ListItem>
            </>
          )
        }
        <ListItem
          onClick={() => setShowMoreOptions(pre => !pre)}
        >
          <ListItemText sx={{ padding: "0rem 0rem" }}>
            More {showMoreOptions ? <ArrowDropUpIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} /> : <ArrowDropDownIcon sx={{ mb: "-0.4rem", fontSize: "24px" }} />}
          </ListItemText>
        </ListItem>
        {
          showMoreOptions && (
            <>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                }}
                component={Link}
                to="/userslist"
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Manage Sub-users
                </ListItemText>
              </ListItem>
              <ListItem
                onClick={() => {
                  setOpenDrawer(false);
                }}
                component={Link}
                to="/subscription-status"
              >
                <ListItemText sx={{ padding: "0rem 1rem", mt: -1 }}>
                  Subscription Status
                </ListItemText>
              </ListItem>
            </>
          )
        }
      </List>
    </Drawer>
  );
};

const Header = () => {
  const navigate = useNavigate();
  // const [isToken, setIsToken] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const mobileView = useMediaQuery("(max-width:900px)");
  const tabletView = useMediaQuery("(max-Width: 1200px)")
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorJobs, setAnchorJobs] = useState(null);
  const [anchorMore, setAnchoreMore] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const [anchorHealth, setAnchorHealth] = useState(null);
  const [anchorAdvertise, setAnchorAdvertise] = useState(null);
  const [anchorPrice, setAnchorPrice] = useState(null);
  const [anchorRecruiter, setAnchorRecuiter] = useState(null);
  const [anchorHospitalMore, setAnchorHospitalMore] = useState(null);


  const open = Boolean(anchorEl);
  const openNav = Boolean(anchorElNav);
  const openJobs = Boolean(anchorJobs);
  const openMore = Boolean(anchorMore);
  const openHealt = Boolean(anchorHealth);
  const openAdvertise = Boolean(anchorAdvertise);
  const openPrice = Boolean(anchorPrice);
  const openRecruiter = Boolean(anchorRecruiter);
  const openHospitalMore = Boolean(anchorHospitalMore);
  const { user, getUserProfile, logOut, hospitalUser, tokenCheckers, hospitalTokenCheckers, logOutHospital, notifications, getNotifications, base64Image, hospitalImage } = useAuth();
  const { state } = useLocation();
  const hasToken = sessionStorage.getItem('accessToken');
  const flow = sessionStorage.getItem('flow');
  let loggedUserName = user?.name?.length > 13 ? user?.name.slice(0, 12) : user?.name;
  let hospitalUserContactName = hospitalUser?.contactName?.length > 13 ? hospitalUser?.contactName?.slice(0, 12) : hospitalUser?.contactName;
  const {pathname} = useLocation()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickNav = (event) => {
    if (hospitalUser?.contactEmail)
      setAnchorElNav(event.currentTarget);
  };
  const handleJobs = (event) => {
    if (loggedUserName) {
      setAnchorJobs(event.currentTarget)
    }
  };
  const handleMore = (event) => {
    if (loggedUserName) {
      setAnchoreMore(event.currentTarget)
    }
  };

  const handleHealt = (event) => {
    if (hospitalUser?.contactEmail) {
      setAnchorHealth(event.currentTarget);
    }

  };
  const handleAdvertise = (event) => {
    if (hospitalUser?.contactEmail) {
      setAnchorAdvertise(event.currentTarget);
    }
  };
  const handlePrice = (event) => {
    if (hospitalUser?.contactEmail) {
      setAnchorPrice(event.currentTarget);
    }
  };
  const handleRecruiter = (event) => {
    if (hospitalUser?.contactEmail) {
      setAnchorRecuiter(event.currentTarget);
    }

  };
  const handleHospitalMore = (event) => {
    if (hospitalUser?.contactEmail) {
      setAnchorHospitalMore(event.currentTarget);
    }
  };

  const handleCloseHealt = () => {
    setAnchorHealth(null);
  };
  const handleCloseAdertiseMent = () => {
    setAnchorAdvertise(null);
  };
  const handleClosePrice = () => {
    setAnchorPrice(null)
  };
  const handleCloseRecruiter = () => {
    setAnchorRecuiter(null);
  };
  const handleCloseHospitalMore = () => {
    setAnchorHospitalMore(null);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNav = () => {
    setAnchorElNav(null);
  };
  const handleJobsClose = () => {
    setAnchorJobs(null)
  }
  const handleMoreClose = () => {
    setAnchoreMore(null);
  }
  const handleLogOut = async (event) => {
    logOut();
    setAnchorEl(null);
    sessionStorage.clear();
    navigate("/login");
  };

  // Hospital Logout
  const handleLogOutHospital = async (event) => {
    logOutHospital();
    setAnchorEl(null);
    sessionStorage.clear();
    navigate("/hospital-login");
  };

  //TODO: 1. CHECK IF ACCESS TOKEN IS EXIST, IF IT DOESN'T REDIRECT TO LOGIN PAGE
  // 2. CALL GETUSER AND CHECK USERNAME . IF USERNAME DOESN'T EXIST REDIRECT TO LOGIN PAGE , IF ANY ERROR OCCURS REDIRECT TO LOGIN PAGE

  // Get Logged user
  useEffect(() => {
    if (sessionStorage.getItem("accessToken") !== null) {
      getUserProfile();
      getNotifications();
    }
    // flow === "hospital" ? tokenCheckers2() : tokenChecker()
  }, [state]);

  const tokenChecker = async () => {
    const result = await tokenCheckers();
    if (result?.errors[0]?.message === "Unauthorized") {
      console.log(result)
      sessionStorage.clear();
      navigate("/login");
    }
  }
  const tokenCheckers2 = async () => {
    const result = await hospitalTokenCheckers();
    if (result?.errors[0]?.message === "Unauthorized") {
      console.log(result)
      sessionStorage.clear();
      navigate("/hospital-login");
    }
  }
  const notificationDot = notifications?.find(notification => {
    if (notification?.status === "created") {
      return true;
    }
  });

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#ffffff", color: "var(--clr-gray-1)" }}
    >
      {/* {console.log(hospitalUser?.contactEmail)} */}
      {flow === "hospital" ? (
        <>
          {
            tabletView ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  px: 2,
                }}
              >
                <Box>
                  <Link to="/">
                    <img
                      style={{ width: "12rem", height: "auto", paddingTop: "4px" }}
                      src={header_logo_v1_update}
                      alt="header_logo_v1_update"
                    />
                  </Link>
                </Box>
                <Box sx={{ mr: -1 }}>
                  <RecruiterLoggedInDrawer
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    profilePicture={hospitalImage}
                    userName={hospitalUser?.contactName}
                    logOut={handleLogOutHospital}
                    hospitalUser={hospitalUser}
                  />
                  <IconButton
                    onClick={() => setOpenDrawer(!openDrawer)}
                    sx={tabletView ? { display: "block" } : { display: "none" }}
                  >
                    <MenuIcon fontSize="large" />
                  </IconButton>
                </Box>
              </Box>

            ) : (
              <Container maxWidth="xl" sx={{ mx: "auto" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1, px: 3 }}>
                  <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
                    <Box>
                      <Link to="/hospital-dashboard">
                        <img
                          style={{ width: "12rem", height: "auto", paddingTop: "4px" }}
                          src={header_logo_v1_update}
                          alt="header_logo_v1_update"
                        />
                      </Link>
                    </Box>
                    <Box>
                      <List
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <ListItem component={Link} to={hospitalUser?.contactEmail ? "/hospital-dashboard" : "/hospital-basic-details"} >
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ color: "#586A83", fontWeight: 600, fontSize: { md: "13.5px", lg: "15px" }, lineHeight: 1.5 }}
                          >
                            Dashboard
                          </Typography>
                        </ListItem>
                        <ListItem noWrap onClick={handleClickNav} >
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ color: "#586A83 !important", fontWeight: 600, cursor: "pointer", fontSize: { md: "13.5px", lg: "15px" }, lineHeight: 1.5 }}
                          >
                            Jobs & Responses
                          </Typography>
                        </ListItem>
                        <ListItem noWrap onClick={handleHealt} >
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ color: "#586A83 !important", fontWeight: 600, cursor: "pointer", fontSize: { md: "13.5px", lg: "15px" }, lineHeight: 1.5 }}
                          >
                            Healthcare Profile
                          </Typography>
                        </ListItem>
                        <ListItem noWrap onClick={handleAdvertise} >
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ color: "#586A83 !important", fontWeight: 600, cursor: "pointer", fontSize: { md: "13.5px", lg: "15px" }, lineHeight: 1.5 }}
                          >
                            Advertisement
                          </Typography>
                        </ListItem>
                        <ListItem noWrap onClick={handlePrice} >
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ color: "#586A83 !important", fontWeight: 600, cursor: "pointer", fontSize: { md: "13.5px", lg: "15px" }, lineHeight: 1.5 }}
                          >
                            Pricing
                          </Typography>
                        </ListItem>
                        <ListItem noWrap onClick={handleRecruiter} >
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ color: "#586A83 !important", fontWeight: 600, cursor: "pointer", fontSize: { md: "13.5px", lg: "15px" }, lineHeight: 1.5 }}
                          >
                            Recruiter
                          </Typography>
                        </ListItem>
                        <ListItem noWrap onClick={handleHospitalMore} >
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ color: "#586A83 !important", fontWeight: 600, cursor: "pointer", fontSize: { md: "13.5px", lg: "15px" }, lineHeight: 1.5 }}
                          >
                            More
                          </Typography>
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                  <Box sx={mobileView ? { display: "none" } : { display: "flex" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: { lg: 1, xl: 2 },
                      }}
                    >
                      <IconButton>
                        <AccessAlarmIcon sx={{ color: "#C7D3E3" }} fontSize="medium" />
                      </IconButton>
                      <Box sx={{ position: "relative", margin: "auto" }}>
                        <IconButton>
                          <NotificationsIcon
                            sx={{ color: "#C7D3E3" }}
                            fontSize="medium"
                          />
                        </IconButton>
                        <Typography
                          component="span"
                          variant="caption"
                          sx={{
                            fontWeight: 600,
                            position: "absolute",
                            top: 18,
                            right: 5,
                            transform: "translate(-50%, -50%)",
                            fontSize: "8px",
                            color: "#EB5757",
                          }}
                          className="strength-value"
                        >
                          <CircleIcon fontSize="inherit" />
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Avatar
                         onClick={handleClick}
                          sx={{
                            width: "40px",
                            height: "40px",
                            cursor: "pointer"
                          }}
                          src={hospitalImage || profileImg}
                        />
                        <Typography variant="body1" onClick={handleClick} sx={{ color: "var(--clr-gray-1)", cursor: "pointer" }}>
                        {hospitalUserContactName || state?.contactName} {hospitalUser?.contactName?.length > 13 && '...'}
                        </Typography>
                        <IconButton onClick={handleClick}>
                          <ArrowDropDownIcon sx={{ color: "var(--clr-blue-footer)" }} />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box>
                      <Menu
                        sx={{ marginTop: "1rem" }}
                        id="basic-menu"
                        anchorEl={anchorElNav}
                        open={openNav}
                        onClose={handleCloseNav}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          component={Link}
                          to="/create-vacancies"
                          onClick={handleCloseNav}
                          sx={{ color: "var(--clr-blue-footer)" }}
                        >
                          Hot Vacancy
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          to="/post-job"
                          onClick={handleCloseNav}
                          sx={{ color: "var(--clr-blue-footer)" }}
                        >
                          Jobs
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          to="/manage-jobs-and-responses"
                          onClick={handleCloseNav}
                          sx={{ color: "var(--clr-blue-footer)" }}
                        >
                          Manage Jobs & Responses
                        </MenuItem>
                      </Menu>
                    </Box>
                    <Box>
                      <Menu
                        sx={{ marginTop: "1rem" }}
                        id="basic-menu"
                        anchorEl={anchorHealth}
                        open={openHealt}
                        onClose={handleCloseHealt}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          component={Link}
                          to="/advance-search"
                          onClick={handleCloseHealt}
                          sx={{ color: "var(--clr-blue-footer)" }}
                        >
                          Search Profile
                        </MenuItem>
                      </Menu>
                    </Box>
                    {/* advertisements */}
                    <Box>
                      <Menu
                        sx={{ marginTop: "1rem" }}
                        id="basic-menu"
                        anchorEl={anchorAdvertise}
                        open={openAdvertise}
                        onClose={handleCloseAdertiseMent}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          component={Link}
                          to="/contact-us"
                          onClick={handleCloseAdertiseMent}
                          sx={{ color: "var(--clr-blue-footer)" }}
                        >
                          Enquire Branding
                        </MenuItem>
                      </Menu>
                    </Box>
                    {/* price */}
                    <Box>
                      <Menu
                        sx={{ marginTop: "1rem" }}
                        id="basic-menu"
                        anchorEl={anchorPrice}
                        open={openPrice}
                        onClose={handleClosePrice}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          component={Link}
                          to="/profile/plans"
                          onClick={handleClosePrice}
                          sx={{ color: "var(--clr-blue-footer)" }}
                        >
                          View Pricing
                        </MenuItem>
                      </Menu>
                    </Box>
                    {/* recruiter  */}
                    <Box>
                      <Menu
                        sx={{ marginTop: "1rem" }}
                        id="basic-menu"
                        anchorEl={anchorRecruiter}
                        open={openRecruiter}
                        onClose={handleCloseRecruiter}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          component={Link}
                          to="/personal-folders"
                          onClick={handleCloseRecruiter}
                          sx={{ color: "var(--clr-blue-footer)" }}
                        >
                          Personal Folder
                        </MenuItem>

                        <MenuItem
                          component={Link}
                          to="/saved-searches"
                          onClick={handleCloseRecruiter}
                          sx={{ color: "var(--clr-blue-footer)" }}
                        >
                          Saved Searches
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          to="/hospital-dashboard"
                          onClick={handleCloseRecruiter}
                          sx={{ color: "var(--clr-blue-footer)" }}
                        >
                          Shortlisted Candidates
                        </MenuItem>
                      </Menu>
                    </Box>
                    {/* more */}
                    <Box>
                      <Menu
                        sx={{ marginTop: "1rem" }}
                        id="basic-menu"
                        anchorEl={anchorHospitalMore}
                        open={openHospitalMore}
                        onClose={handleCloseHospitalMore}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          component={Link}
                          to="/userslist"
                          onClick={handleCloseHospitalMore}
                          sx={{ color: "var(--clr-blue-footer)" }}
                        >
                          Manage Sub-users
                        </MenuItem>
                        <MenuItem
                          component={Link}
                          to="/subscription-status"
                          onClick={handleCloseHospitalMore}
                          sx={{ color: "var(--clr-blue-footer)" }}
                        >
                          Subscription Status
                        </MenuItem>
                        {/* <MenuItem noWrap onClick={handleAdvertise} >
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ color: "#586A83 !important", fontWeight: 600, cursor: "pointer", fontSize: "1rem", lineHeight: 1.5 }}
                          >
                            Advertisement
                          </Typography>
                          {/* advertisements 
                          <Box>
                            <Menu
                              sx={{ marginTop: "1rem" }}
                              id="basic-menu"
                              anchorEl={anchorAdvertise}
                              open={openAdvertise}
                              onClose={handleCloseAdertiseMent}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem
                                component={Link}
                                to="/contact-us"
                                onClick={handleCloseAdertiseMent}
                                sx={{ color: "var(--clr-blue-footer)" }}
                              >
                                Enquire Branding
                              </MenuItem>
                            </Menu>
                          </Box>
                        </MenuItem> 
                        <MenuItem noWrap onClick={handlePrice} >
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ color: "#586A83 !important", fontWeight: 600, cursor: "pointer", fontSize: "1rem", lineHeight: 1.5 }}
                          >
                            Pricing
                          </Typography>
                          {/* price 
                          <Box>
                            <Menu
                              sx={{ marginTop: "1rem" }}
                              id="basic-menu"
                              anchorEl={anchorPrice}
                              open={openPrice}
                              onClose={handleClosePrice}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem
                                component={Link}
                                to="/profile/plans"
                                onClick={handleClosePrice}
                                sx={{ color: "var(--clr-blue-footer)" }}
                              >
                                View Pricing
                              </MenuItem>
                            </Menu>
                          </Box>
                        </MenuItem>
                        <MenuItem noWrap onClick={handleRecruiter} >
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ color: "#586A83 !important", fontWeight: 600, cursor: "pointer", fontSize: "1rem", lineHeight: 1.5 }}
                          >
                            Recruiter
                          </Typography>
                          {/* recruiter  
                          <Box>
                            <Menu
                              sx={{ marginTop: "1rem" }}
                              id="basic-menu"
                              anchorEl={anchorRecruiter}
                              open={openRecruiter}
                              onClose={handleCloseRecruiter}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem
                                component={Link}
                                to="/personal-folders"
                                onClick={handleCloseRecruiter}
                                sx={{ color: "var(--clr-blue-footer)" }}
                              >
                                Personal Folder
                              </MenuItem>

                              <MenuItem
                                component={Link}
                                to="/saved-searches"
                                onClick={handleCloseRecruiter}
                                sx={{ color: "var(--clr-blue-footer)" }}
                              >
                                Saved Searchs
                              </MenuItem>
                              <MenuItem
                                component={Link}
                                to="/hospital-dashboard"
                                onClick={handleCloseRecruiter}
                                sx={{ color: "var(--clr-blue-footer)" }}
                              >
                                Shortlisted Candidates
                              </MenuItem>
                            </Menu>
                          </Box>
                        </MenuItem>  */}
                      </Menu>
                    </Box>
                    {/* Menu option for hospitalUser */}
                    <Box>
                      <Menu
                        sx={{ marginTop: "1rem" }}
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            handleClose()
                            navigate((!(hospitalUser?.contactName) && hasToken) ? "/hospital-basic-details" : "/profile/company-profile", {
                              state: { stateIndex: 0 },
                            })
                          }}
                          sx={{ color: "#4F4F4F" }}
                        // disabled={hospitalUser?.contactEmail ? false : true}
                        >
                          Media
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose()
                            navigate((!(hospitalUser?.contactName) && hasToken) ? "/hospital-basic-details" : "/profile/company-profile", {
                              state: { stateIndex: 1 },
                            })
                          }}
                          sx={{ color: "#4F4F4F" }}
                        // disabled={hospitalUser?.contactEmail ? false : true}
                        >
                          Profile Details
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose()
                            navigate((!(hospitalUser?.contactName) && hasToken) ? "/hospital-basic-details" : "/profile/company-profile", {
                              state: { stateIndex: 2 },
                            })
                          }}
                          sx={{ color: "#4F4F4F" }}
                        // disabled={hospitalUser?.contactEmail ? false : true}
                        >
                          Company Details
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose()
                            navigate((!(hospitalUser?.contactName) && hasToken) ? "/hospital-basic-details" : "/profile/company-profile", {
                              state: { stateIndex: 3 },
                            })
                          }}
                          sx={{ color: "#4F4F4F" }}
                        // disabled={hospitalUser?.contactEmail ? false : true}
                        >
                          Billing Details
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleClose()
                            navigate((!(hospitalUser?.contactName) && hasToken) ? "/hospital-basic-details" : "/profile/company-profile", {
                              state: { stateIndex: 4 },
                            })
                          }}
                          sx={{ color: "#4F4F4F" }}
                        // disabled={hospitalUser?.contactEmail ? false : true}
                        >
                          Settings
                        </MenuItem>

                        <MenuItem
                          sx={{ color: "#4F4F4F" }}
                          onClick={handleLogOutHospital}
                        >
                          Logout
                        </MenuItem>
                      </Menu>
                    </Box>
                  </Box>
                </Box>

              </Container>
            )
          }
        </>

      ) : (
        <>
          {
            mobileView ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  px: 2,
                }}
              >
                <Box>
                  <Link to="/">
                    <img
                      style={{ width: "12rem", height: "auto", paddingTop: "4px" }}
                      src={header_logo_v1_update}
                      alt="header_logo_v1_update"
                    />
                  </Link>
                </Box>
                <Box sx={{ mr: -1 }}>
                  {
                    hasToken ? (
                      <JobSeekerLoggedInDrawer
                        openDrawer={openDrawer}
                        setOpenDrawer={setOpenDrawer}
                        profilePicture={base64Image}
                        userName={user?.name}
                        logOut={handleLogOut}
                        sx={{ minWidth: "70%" }}
                      />
                    ) : (
                      <DrawerComponent
                        openDrawer={openDrawer}
                        setOpenDrawer={setOpenDrawer}
                      />
                    )
                  }
                  <IconButton
                    onClick={() => setOpenDrawer(!openDrawer)}
                    sx={mobileView ? { display: "block" } : { display: "none" }}
                  >
                    <MenuIcon fontSize="large" />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Container maxWidth="xl" sx={{ mx: "auto" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1, px: 3 }}>
                  <Box>
                    <Link to="/">
                      <img
                        style={{ width: "12rem", height: "auto", paddingTop: "4px" }}
                        src={header_logo_v1_update}
                        alt="header_logo_v1_update"
                      />
                    </Link>
                  </Box>
                  <Box>
                    <List
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {
                        flow === null ? 
                        (<>
                          {navigationsWithoutFlow?.map((nav) => (
                            <ListItem key={nav?.label} component={Link} to={nav?.path}>
                              <Typography
                                component="subtitle2"
                                sx={{ color: nav?.path === pathname ? "#395987" :  "#8A8B8C", fontWeight: "600" }}
                              >
                                {nav.label}
                              </Typography>
                            </ListItem>
                          ))}
                        </>)
                        : 
                        (<>
                          {navigations?.map((nav) => (
                            <ListItem key={nav?.label} component={Link} to={(!loggedUserName && hasToken) ? 'signup2' : nav?.path}>
                              <Typography
                                component="subtitle2"
                                sx={{ color: "#395987", fontWeight: "600" }}
                              >
                                {nav.label}
                              </Typography>
                            </ListItem>
                          ))}
                        </>)
                      }
                      {
                        flow === null ? 
                        <ListItem noWrap>
                        <Typography
                          variant="subtitle2"
                          noWrap
                          component={Link}
                          to="/hospital-login"
                          sx={{ color: pathname === "/hospital-login" ? "#395987 !important" : "#8A8B8C !important", fontWeight: "600", cursor: "pointer", fontSize: "1rem", lineHeight: 1.5 }}
                        >
                          Recruiters
                        </Typography>
                        </ListItem>
                        : 
                      <ListItem noWrap onClick={handleJobs} >
                        <Typography
                          variant="subtitle2"
                          noWrap
                          sx={{ color: "#586A83 !important", fontWeight: "600", cursor: "pointer", fontSize: "1rem", lineHeight: 1.5 }}
                        >
                          Jobs
                        </Typography>
                      </ListItem>
                      }
                      {
                        flow === null ? 
                        <ListItem noWrap>
                        <Typography
                          variant="subtitle2"
                          noWrap
                          // component={Link}
                          // to="/"
                          sx={{ color: "#8A8B8C !important", fontWeight: "600", cursor: "pointer", fontSize: "1rem", lineHeight: 1.5 }}
                        >
                          Services
                        </Typography>
                        </ListItem>
                        : 
                        <ListItem noWrap onClick={handleMore} >
                        <Typography
                          variant="subtitle2"
                          noWrap
                          sx={{ color: "#586A83 !important", fontWeight: 600, cursor: "pointer", fontSize: "1rem", lineHeight: 1.5 }}
                        >
                          More
                        </Typography>
                      </ListItem>
                      }
                    </List>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                    {hasToken ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <IconButton>
                          <AccessAlarmIcon
                            sx={{ color: "#C7D3E3" }}
                            fontSize="medium"
                          />
                        </IconButton>
                        <Box sx={{ position: "relative", margin: "auto" }}>
                          <IconButton>
                            <NotificationsIcon
                              sx={{ color: "#C7D3E3" }}
                              fontSize="medium"
                            />
                          </IconButton>
                          <Typography
                            component="span"
                            variant="caption"
                            sx={{
                              fontWeight: 600,
                              position: "absolute",
                              top: 18,
                              right: 5,
                              transform: "translate(-50%, -50%)",
                              fontSize: "8px",
                              color: "#EB5757",
                            }}
                            className="strength-value"
                          >
                            {notificationDot && <CircleIcon fontSize="inherit" />}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Avatar
                           onClick={handleClick}
                            sx={{
                              width: "40px",
                              height: "40px",
                              cursor:"pointer"
                            }}
                            src={base64Image || profileImg}
                          />
                          <Typography
                            variant="body1"
                            sx={{ color: "var(--clr-gray-1)", cursor:"pointer" }}
                            onClick={handleClick}
                          >
                           {loggedUserName || state?.name} {user?.name?.length > 13 && '...'}
                          </Typography>
                          <IconButton onClick={handleClick}>
                            <ArrowDropDownIcon
                              sx={{ color: "var(--clr-blue-footer)" }}
                            />
                          </IconButton>
                        </Box>
                        <Box>
                          <Menu
                            sx={{ marginTop: "1rem" }}
                            id="basic-menu"
                            anchorEl={anchorJobs}
                            open={openJobs}
                            onClose={handleJobsClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem
                              sx={{ color: "var(--clr-blue-footer)" }}
                              component={Link}
                              to="/profile-home"
                              onClick={handleJobsClose}
                            >
                              Search Job
                            </MenuItem>
                            <MenuItem
                              sx={{ color: "var(--clr-blue-footer)" }}
                              component={Link}
                              to="/saved-jobs"
                              onClick={handleJobsClose}
                            >
                              Saved Jobs
                            </MenuItem>
                          </Menu>
                        </Box>
                        <Box>
                          <Menu
                            sx={{ marginTop: "1rem" }}
                            id="basic-menu"
                            anchorEl={anchorMore}
                            open={openMore}
                            onClose={handleMoreClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem
                              component={Link}
                              to="/manage-alert"
                              onClick={handleMoreClose}
                              sx={{ color: "var(--clr-blue-footer)" }}
                            >
                              Manage Alerts
                            </MenuItem>
                          </Menu>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { md: 0, lg: 2 },
                        }}
                      >
                        {/* <Box sx={{ position: "relative", margin: "auto" }}>
                          <IconButton>
                            <NotificationsIcon
                              sx={{ color: "#C7D3E3" }}
                              fontSize="medium"
                            />
                          </IconButton>
                          <Typography
                            component="span"
                            variant="caption"
                            sx={{
                              fontWeight: 600,
                              position: "absolute",
                              top: 18,
                              right: 4,
                              transform: "translate(-50%, -50%)",
                              fontSize: "9px",
                              color: "#EB5757",
                            }}
                            className="strength-value"
                          >
                            <CircleIcon fontSize="inherit" />
                          </Typography>
                        </Box> */}
                        <Button
                          sx={{
                            px: 2,
                            color: "#4F4F4F",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                          }}
                          variant="text"
                          component={Link}
                          to="/hospital-login"
                        >
                          Recruiter Login
                        </Button>
                        <Button
                          sx={{
                            px: { md: 3, lg: 5 },
                            py: 1.2,
                            color: "#5A98F2",
                            borderRadius: 16,
                            fontWeight: 500,
                          }}
                          variant="contained"
                          component={Link}
                          to="/login"
                          className="hospital-login-btn"
                        >
                         Jobseeker Login
                        </Button>
                      </Box>
                    )}
                    {/* Menu option for doctors  */}
                    <Menu
                      sx={{ marginTop: "15px" }}
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        sx={{ color: "#4F4F4F" }}
                        component={Link}
                        to={(!loggedUserName && hasToken) ? "/signup2" : "/profile"}
                        onClick={handleClose}
                      >
                        Edit Profile
                      </MenuItem>
                      <MenuItem
                        sx={{ color: "#4F4F4F" }}
                        component={Link}
                        to={(!loggedUserName && hasToken) ? "/signup2" : "/account-settings"}
                        onClick={handleClose}
                      >
                        Change Password
                      </MenuItem>
                      <MenuItem
                        sx={{ color: "#4F4F4F" }}
                        onClick={handleLogOut}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </Box>
                </Box>
              </Container>
            )
          }
        </>
      )}
    </AppBar>
  );
};

export default Header;
