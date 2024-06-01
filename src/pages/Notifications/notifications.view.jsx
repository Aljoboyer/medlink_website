import { Grid, Box, Typography, Breadcrumbs, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, Link } from "react-router-dom";
import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import moment from 'moment';
// import { gqlquery } from "../../api";
import { gqlquery } from "../../api";
import useAuth from "../../hooks/useAuth";

// User Access permission
export const ShowForAccessJobPostingAndResumeDB = (props) => {
  const { getUserRole, permitUser } = useAuth();

  useEffect(() => {
    getUserRole();
  }, [])

  return permitUser?.accessJobPosting || permitUser?.accessResumeDB || permitUser?.adminUser ? props.children : <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Fix-Access-Denied-Folder-Featured.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5" style={{ width: "100%", height: "auto" }} alt="Accecss_denied" />;
}


function createData(id, title, time, description, viewed) {
  return { id, title, time, description, viewed };
}

let dataRows = [
  createData(
    "notify10",
    "Notification Title",
    "14 min",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas hic modi, quasi, omnis nostrum neque harum debitis unde!",
    false
  ),
  createData(
    "notify11",
    "Notification Title",
    "1 day",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas hic modi, quasi, omnis nostrum neque harum debitis unde!",
    false
  ),
  createData(
    "notify12",
    "Notification Title",
    "2 days",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas hic modi, quasi, omnis nostrum neque harum debitis unde!",
    false
  ),
  createData(
    "notify13",
    "Notification Title",
    "1 month",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas hic modi, quasi, omnis nostrum neque harum debitis unde!",
    true
  ),
  createData(
    "notify13",
    "Notification Title",
    "1 month",
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas hic modi, quasi, omnis nostrum neque harum debitis unde!",
    true
  ),
];
const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

const Notifications = () => {
  const { pathname } = useLocation();
  const [userEmail, setUserEmail] = useState("");
  const [docNotifications, setDocNotifications] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [timeStamp, setTimeStamp] = useState("");
  const access_token = sessionStorage.getItem("accessToken");
  const { notifications, getNotifications } = useAuth();
  document.title = "Notifications | MedLink Jobs";
  const getUserEmail = async () => {
    const res = await provider.getUser({ AccessToken: access_token });
    setUserEmail(res?.UserAttributes[2].Value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!userEmail) {
      getUserEmail();
    }
  }, []);

  console.log(userEmail);

  useEffect(() => {
    const QUERY_GET_NOTIFICATION = {
      query: `query MyQuery {
      getNotifications {
        description
        nID
        status
        title
        createdAt
      }
    } 
    `
    }

    gqlquery(QUERY_GET_NOTIFICATION, null)
      .then((res) => res.json())
      .then((datas) => {
        setDocNotifications(datas.data.getNotifications)
        setTimeStamp(datas.data.getNotifications.createdAt)
      })



  }, [clicked])


  const handleClickedNotification = (nID) => {
    const QUERY_CLICKED_NOTIFICATION = {
      query: `mutation MyMutation {
        updateNotificationSeen(nID: ${nID}) {
          description
          nID
          status
          title
        }
      }
    `
    }

    gqlquery(QUERY_CLICKED_NOTIFICATION, null)
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas);
        setClicked((prevent) => !prevent)
        getNotifications();
      })
  }

  const handleMarkAllSeen = () => {
    const QUERY_CLICKED_ALL_NOTIFICATION = {
      query: `mutation MyMutation {
        updateNotficationSeenAll {
          description
          nID
          status
          title
        }
      }
    `
    }

    gqlquery(QUERY_CLICKED_ALL_NOTIFICATION, null)
      .then((res) => res.json())
      .then((datas) => {
        console.log(datas);
        setClicked((prevent) => !prevent)
        getNotifications();
      })
  }

  return (
    <ShowForAccessJobPostingAndResumeDB>
      <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
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
              Notifications
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="h5"
                sx={{
                  mb: "0.825rem",
                  fontWeight: "600",
                  color: "var(--clr-blue-footer)",
                }}
                gutterBottom
              >
                Notifications
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button style={{ borderRadius: 20 }} onClick={handleMarkAllSeen} variant="outlined" sx={{ float: "right", mb: 2 }}>Mark all as read</Button>
            </Grid>
          </Grid>

        </Box>
        <Box sx={{ mx: "auto" }}>

          {/* -------------------------Mapping of Notifications------------------------------- */}
          <Grid container gap={1} rowSpacing={1}>
            {docNotifications?.map((notification) => (
              <Grid
                key={notification.nID}
                item
                xs={12}
                sx={{
                  px: 2,
                  pb: 1,
                  borderRadius: "0.5rem",
                  bgcolor: notification.status === "Seen" ? "var(--clr-white)" : "#E4EEF5",
                  border: "1px solid #E4EEF5",
                }}

              >
                <Box onClick={() => handleClickedNotification(notification?.nID)}>
                  <Grid container spacing={1} >
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
                        {notification.title} &nbsp;
                        <Typography
                          variant="caption"
                          display="inline"
                          gutterBottom
                          sx={{
                            color: "var(--clr-blue-footer)",
                          }}
                        >

                          {moment(notification.createdAt).startOf('seconds').fromNow()}
                        </Typography>
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        component="div"
                        sx={{
                          ml: 0,
                          color: "#4F4F4F",
                        }}
                      >
                        {notification.description}
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
                      {notification.status !== "Seen" && (
                        <CircleIcon
                          fontSize="1rem"
                          sx={{
                            color: "#2F80ED",
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ShowForAccessJobPostingAndResumeDB>
  );
};

export default Notifications;
