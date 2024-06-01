import {
  Box,
  Card,
  Typography,
  Divider,
  Button,
  CardContent,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { gqlquery } from "../../../../api/hospitalIndex.js";
// import CircularProgress from "@mui/material/CircularProgress";
import AttachmentIcon from "@mui/icons-material/Attachment";
var FileSaver = require("file-saver");

const Accomplishments = (props) => {
  const [membershipDetails, setMembershipDetails] = useState([]);
  const [paperDetails, setPaperDetails] = useState([]);
  const [awardDetails, setAwardDetails] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const hanldeDownloadPaper = (paper) => {
    // console.log(paper?.fileURL);
    const QUERY_DOWNLOADRESUME = {
      query: `query MyQuery {
              downloadDocument (url: "${paper?.fileURL}")
            }`,
    };
    gqlquery(QUERY_DOWNLOADRESUME, null)
      .then((res) => res.json())
      .then((datas) => {
        const downloadDocument = JSON.parse(datas?.data?.downloadDocument);
        savePdf(downloadDocument, paper?.fileName);
      });
  };

  const savePdf = (item, name) => {
    const byteCharacters = atob(item?.response?.content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });
    const fileName = name;
    FileSaver.saveAs(blob, fileName);
  };

  useEffect(() => {
    const QUERY_GETMEMBERSHIPSBYAPPLICANT = {
      query: `query MyQuery {
                getMembershipsByApplicant(userID : "${props.userID}") {
                    lifeMembership
                    memID
                    organization
                    positionHeld
                   }
                }`,
    };
    gqlquery(QUERY_GETMEMBERSHIPSBYAPPLICANT, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas.data?.getMembershipsByApplicant) {
          setMembershipDetails(datas.data?.getMembershipsByApplicant)
        }
      }
      );
  }, []);

  useEffect(() => {
    const QUERY_GETPAPERSBYAPPLICANT = {
      query: `query MyQuery {
                getPapersByApplicant(userID : "${props.userID}") {
                    description
                    fileURL
                    month
                    paperID
                    title
                    url
                    year
                    fileName
                   }
                }`,
    };
    gqlquery(QUERY_GETPAPERSBYAPPLICANT, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas.data?.getPapersByApplicant) {
          setPaperDetails(datas.data?.getPapersByApplicant)
        }
      });
  }, []);

  useEffect(() => {
    const QUERY_GETAWARDSBYAPPLICANT = {
      query: `query MyQuery {
                getAwardsByApplicant(userID : "${props.userID}") {
                    awardID
                    description
                    month
                    url
                    name
                    year
                   }
                }`,
    };
    gqlquery(QUERY_GETAWARDSBYAPPLICANT, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas.data?.getAwardsByApplicant) {
          setAwardDetails(datas.data?.getAwardsByApplicant)
        }
      });
  }, []);

  return (
    <Box>
      <Card
        sx={{
          bgcolor: "var(--clr-white)",
          boxShadow: !matches ? "0px 9px 18px rgba(69, 143, 246, 0.09)" : "0px 0px 0px 0px",
          border: !matches ? "" : "1px solid #E4EEF5" , 
          px: matches ? 1.25 : 2.5, 
          py: matches ? 1.25 : 2 
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "var(--clr-blue-footer)", fontWeight: "bold", pb: matches ? 1.72 : 1 , fontSize: matches ? "18px" : "24px"  }}
          gutterBottom
          component="div"
        >
          Accomplishments
        </Typography>

        <Box
          sx={{
            pl: 0,
            pb: 0,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: matches ? "100%" : "80%",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: matches ? "14px" : "1rem",
                fontWeight: 700, // margin: "1rem",
              }}
            >
              Memberships & Positions
            </Typography>
          </Box>
          <Box sx={{ width: matches ? "100%" : "700px" }}>
            {membershipDetails?.length > 0 ?
              membershipDetails?.map((membership) => (
                <>
                {
                  matches ? (
                    <Grid container>
                    <Grid
                      sx={{ mb: "12px" }}
                      item
                      xs={12}
                      sm={12}
                    >
                      <Grid sx={{ mb: "10px" }} container>
                        <Grid item xs={5} sm={3.5} md={3.5}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // width: matches ? "170px" : "200px",
                              fontSize: "12px",
                              color: "#828282",
                              fontWeight: 600,
                            }}
                          >
                            Position Held
                          </Typography>
                        </Grid>
                        <Grid item xs={7} sm={8.5} md={8.5}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // width: matches ? "62%" : "65%",
                              color: "#4F4F4F",
                              fontSize: "12px",
                              fontWeight: 600,
                            }}
                          >
                            {membership?.positionHeld}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid sx={{ mb: "10px" }} container>
                        <Grid item xs={5} sm={3.5} md={3.5}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // width: matches ? "170px" : "200px",
                              fontSize: "12px",
                              color: "#828282",
                              fontWeight: 600,
                            }}
                          >
                            Organization
                          </Typography>
                        </Grid>
                        <Grid item xs={7} sm={8.5} md={8.5}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // width: matches ? "62%" : "65%",
                              color: "#4F4F4F",
                              fontSize: "12px",
                              fontWeight: 600,
                            }}
                          >
                            {membership?.organization}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid sx={{ mb: "10px" }} container>
                        <Grid item xs={5} sm={3.5} md={3.5}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // width: matches ? "170px" : "200px",
                              fontSize: "12px",
                              color: "#828282",
                              fontWeight: 600,
                            }}
                          >
                            Life Membership
                          </Typography>
                        </Grid>
                        <Grid item xs={7} sm={8.5} md={8.5}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              // width: matches ? "62%" : "65%",
                              color: "#4F4F4F",
                              fontSize: "12px",
                              fontWeight: 600,
                            }}
                          >
                            {membership?.lifeMembership
                              ? "Yes"
                              : "No"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                   
                  </Grid>
                  ) : (
                      <Box sx={{ display: "flex", alignItems: "baseline", mb: 2 }}>
                        <Box>
                          <Box
                            sx={{ display: "flex", gap: 3, color: "#828282", mb: 1 }}
                          >
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
                              Position Held
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
                              {membership?.positionHeld}
                            </Typography>
                          </Box>
                          <Box
                            sx={{ display: "flex", gap: 3, color: "#828282", mb: 1 }}
                          >
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
                              Organization
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
                              {membership?.organization}
                            </Typography>
                          </Box>
                          <Box
                            sx={{ display: "flex", gap: 3, color: "#828282", mb: 1 }}
                          >
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
                              Life Membership
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
                              {membership?.lifeMembership ? "Yes" : "No"}
                            </Typography>
                          </Box>
                        </Box>
                      </Box> 
                  )
                }          
                </>
              )) :

              <Typography variant="body2"
                gutterBottom sx={{
                  color: "var(--clr-gray-3)",
                  fontSize: "12px",
                  fontWeight: "600 !important",
                  mb: 1,
                }}>
                No Details Found
              </Typography>
            }
          </Box>
        </Box>

        <Divider
          sx={{ color: "var(--clr-gray-4)", fontWeight: "bold", mb: matches ? 2.5 : 4 }}
        />

        <Box style={{ marginTop: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width:  matches ? "100%" : "80%",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontSize: matches ? "14px" : "1rem", fontWeight: 700, mb: 2 }}
            >
              Papers
            </Typography>
          </div>
          <div>
            {paperDetails.length > 0 ?
              paperDetails?.map((paperItem, index) => (
                <CardContent
                  sx={{ display: "flex", alignItems: "baseline", p: 0, mb: matches ? .5 : 3 }}
                >
                  <Box sx={{ display: "grid", lineHeight: "25px" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "var(--clr-gray-3)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      {paperItem?.title}
                    </Typography>
                    <Typography
                      variant="info"
                      sx={{ color: "var(--clr-gray-3)", fontWeight: 400 }}
                    >
                      <Button
                        variant="text"
                        sx={{
                          color: "var(--clr-gray-3) !important",
                          padding: "0 !important",
                          textDecoration: "underline",
                        }}
                      >
                        {
                          (paperItem?.url.slice(0, 8) === "https://" || paperItem?.url.slice(0, 7) === "http://") ? 
                          <a target="_blank" rel="noreferrer" href={`${paperItem?.url}`}>{paperItem?.url}</a> :
                          <a target="_blank" rel="noreferrer" href={`https://${paperItem?.url}`}>{paperItem?.url}</a>
                      }
                      </Button>
                    </Typography>
                    <Typography
                      variant="info"
                      sx={{
                        color: "var(--clr-gray-3)",
                        fontSize: "0.8rem",
                        fontWeight: 400,
                      }}
                    >
                      {Intl?.DateTimeFormat("en", { month: "long" }).format(
                        new Date(`${paperItem?.month}`)
                      )}{" "}
                      &nbsp; {paperItem?.year}
                    </Typography>
                    <Typography variant="info" sx={textStyle}>
                      <Button
                        onClick={() => hanldeDownloadPaper(paperItem)}
                        variant=""
                        component="span"
                        sx={{ ml: -2, mb: 1, fontWeight: "medium" }}
                      >
                        <AttachmentIcon /> &nbsp; &nbsp; {paperItem?.fileName}
                      </Button>
                    </Typography>
                    <Typography
                      variant="info"
                      sx={{
                        color: "var(--clr-gray-3)",
                        fontSize: "0.8rem",
                        fontWeight: 400,
                      }}
                    >
                      {paperItem?.description}
                    </Typography>
                  </Box>
                </CardContent>
              ))
              :

              <Typography variant="body2"
                gutterBottom sx={{
                  color: "var(--clr-gray-3)",
                  fontSize: "12px",
                  fontWeight: "600 !important",
                  mb: 1,
                }}>
                No Details Found
              </Typography>
            }
          </div>
        </Box>
        <Divider
          sx={{ color: "var(--clr-gray-4)", fontWeight: "bold", mb: matches ? 2.5 : 4 }}
        />

        <Box>
          <Box
            style={{
              display: "flex",
              marginTop: "0px",
              width:  matches ? "100%" : "80%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: matches ? "14px" : "1rem",
                fontWeight: 700,
                margin: "0rem",
                marginBottom: "2%",
              }}
            >
              Awards
            </Typography>
          </Box>
          <Box>
            {awardDetails.length > 0 ?
              awardDetails?.map((awardItem, index) => (
                <Box key={`accomplishments-awards-${index}`}>
                  <CardContent
                    sx={{ display: "flex", alignItems: "baseline", gap: 3, p: 0 }}
                  >
                    <Box sx={{ display: "grid", lineHeight: "25px" }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "var(--clr-gray-3)",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        <b>{awardItem?.name}</b>
                      </Typography>
                      <Typography variant="info" sx={textStyle}>
                        {Intl.DateTimeFormat("en", { month: "long" }).format(
                          new Date(`${awardItem.month}`)
                        )}{" "}
                        &nbsp;
                        {awardItem?.year}
                      </Typography>
                      <Typography variant="info" sx={textStyle}>
                        <Button
                          variant="text"
                          sx={{
                            color: "var(--clr-gray-3) !important",
                            padding: "0 !important",
                            textDecoration: "underline",
                          }}
                        >
                         {
                          (awardItem.url.slice(0, 8) === "https://" || awardItem.url.slice(0, 7) === "http://") ? 
                          <a target="_blank" rel="noreferrer" href={`${awardItem.url}`}>{awardItem.url}</a> :
                          <a target="_blank" rel="noreferrer" href={`https://${awardItem.url}`}>{awardItem.url}</a>
                       }
                          {/* <a target="_blank" href={awardItem.url}>{awardItem.url}</a> */}
                        </Button>
                      </Typography>
                      <Typography variant="info" sx={textStyle}>
                        {awardItem?.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Box>
              ))
              :
              <Typography variant="body2"
                gutterBottom sx={{
                  color: "var(--clr-gray-3)",
                  fontSize: "12px",
                  fontWeight: "600 !important",
                  mb: 1,
                }}>
                No Details Found
              </Typography>
            }
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Accomplishments;
const textStyle = { fontSize: 12, color: "#828282" };
