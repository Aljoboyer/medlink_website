import { Box, Breadcrumbs, Grid, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useAuth from "../../hooks/useAuth";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation, Link } from "react-router-dom";
// User Access permission
export const ShowForAccessJobPostingAndResumeDB = (props) => {
  const { getUserRole, permitUser, isLoading  } = useAuth();

  useEffect(() => {
    getUserRole();
  }, [])

  if (!isLoading) { 
    return permitUser?.accessJobPosting || permitUser?.accessResumeDB || permitUser?.adminUser ? props.children : <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Fix-Access-Denied-Folder-Featured.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5" style={{ width: "100%", height: "auto" }} alt="Accecss_denied" />;
  } else {
    return (
      <Box> 
        <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
          <Box sx={{ py: 1.5 }}>
           <Skeleton width={180}/> 
          </Box>
          <Box>
          <Skeleton width={150}  height={40}/> 
          </Box>
          <Box sx={{ mx: "auto" }}>
            <Grid container>
            {dataRows?.map((reminder) => ( 

              <Grid item xs={12} sx={{ px: 2, mb: "-45px"}} >
                <Grid container>
                <Grid item xs={12}> 
                 <Skeleton width={"100%"}  height={140}/> 
                </Grid>
                </Grid>
              </Grid>
            ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    )
  }

}

function createData(id, title, time, description, viewed) {
  return { id, title, time, description, viewed };
}

let dataRows = [
  createData(
    "reminder10",
    "Reminder Title",
    "14 min",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ad eius vel at provident facere. Lorem ipsum dolor sit amet.",
    false
  ),
  createData(
    "reminder11",
    "Reminder Title",
    "1 day",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ad eius vel at provident facere. Lorem ipsum dolor sit amet.",
    false
  ),
  createData(
    "reminder12",
    "Reminder Title",
    "2 days",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ad eius vel at provident facere. Lorem ipsum dolor sit amet.",
    false
  ),
  createData(
    "reminder13",
    "Reminder Title",
    "1 month",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ad eius vel at provident facere. Lorem ipsum dolor sit amet.",
    true
  ),
  createData(
    "reminder14",
    "Reminder Title",
    "1 month",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ad eius vel at provident facere. Lorem ipsum dolor sit amet.",
    true
  ),
];

const Reminders = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  document.title = "Reminders | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ShowForAccessJobPostingAndResumeDB>
        {
          matches &&
          <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center", mb: 2.5}}>
          <ArrowBackIosNewIcon sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Reminders</Typography>  
         </Box>
        }
      <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
        {
          !matches &&
        <>
          <Box sx={{ py: 2 }}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" sx={{color: "var(--clr-blue-footer)"}} />}
              aria-label="breadcrumb"
            >
              <Link
                underline="hover"
                style={{ color: "var(--clr-blue-footer)" }}
                to="/hospital-dashboard"
              >
                Dashboard
              </Link>
              <Typography sx={{ color: "var(--clr-blue-footer)" }}>
                Reminders
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                mb: "0.825rem",
                fontWeight: "600",
                color: "var(--clr-blue-footer)",
              }}
              gutterBottom
            >
              Reminders
            </Typography>
          </Box>
        </>
        }
        <Box sx={{ mx: "auto", px: matches ? 1.25 : 0 }}>
          <Grid container gap={1} rowSpacing={1}>
            {dataRows?.map((reminder) => (
              <Grid
                item
                xs={12}
                sx={{
                  px: matches ? 1.25 : 2,
                  pb: 1,
                  borderRadius: "0.5rem",
                  bgcolor: reminder.viewed ? "var(--clr-white)" : "#E4EEF5",
                  border: "1px solid #E4EEF5",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                      sx={{
                        ml: 0,
                        mb: 1,
                        color: "var(--clr-blue-footer)",
                        fontWeight: "600",
                      }}
                    >
                      {reminder.title} &nbsp;
                      <Typography
                        variant="caption"
                        display="inline"
                        gutterBottom
                        sx={{
                          color: "var(--clr-blue-footer)",
                        }}
                      >
                        {reminder.time}
                      </Typography>
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      component="div"
                      sx={{ ml: 0, color: "#4F4F4F" }}
                    >
                      {reminder.description}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      textAlign: "right",
                      my: "auto",
                    }}
                  >
                    {!reminder.viewed && (
                      <CircleIcon
                        fontSize="1rem"
                        sx={{
                          color: "#2F80ED",
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ShowForAccessJobPostingAndResumeDB>
  );
};

export default Reminders;
