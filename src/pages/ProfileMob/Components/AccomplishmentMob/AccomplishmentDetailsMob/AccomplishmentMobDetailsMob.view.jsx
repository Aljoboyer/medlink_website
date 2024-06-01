import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const AccomplishmentDetailsMob = (props) => {
  const accomplishmentsData = {
    "social-media": [
      {
        title: "Social media1",
        url: "https://social-media-url-goes-here.com",
        description: "",
      },
      {
        title: "Social media2",
        url: "https://social-media-url-goes-here.com",
        description: "",
      },
    ],
    papers: [
      {
        title: "Paper1",
        date: "2022-01",
        url: "https://presentation-of-paper-url-goes-here.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel lorem nisi. Morbi facilisis a leo ut sollicitudin. Praesent pulvinar placerat sem, eget cursus orci tempus vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      },
      {
        title: "Paper2",
        date: "2022-01",
        url: "https://presentation-of-paper-url-goes-here.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel lorem nisi. Morbi facilisis a leo ut sollicitudin. Praesent pulvinar placerat sem, eget cursus orci tempus vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      },
    ],
    awards: [
      {
        title: "Award1",
        date: "2022-01",
        url: "https://awards-complete-url-goes-here.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel lorem nisi. Morbi facilisis a leo ut sollicitudin. Praesent pulvinar placerat sem, eget cursus orci tempus vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      },
      {
        title: "Award2",
        date: "2022-01",
        url: "https://awards-complete-url-goes-here.com",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel lorem nisi. Morbi facilisis a leo ut sollicitudin. Praesent pulvinar placerat sem, eget cursus orci tempus vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      },
    ],
  };

  return (
    <Grid container item sx={{ marginBlock: "1rem", px: 2 }}>
      <Card
        sx={{
          height: "100%",
        }}
      >
        <Grid container direction={"row"} alignItems="flex-start" padding={2}>
          <Grid container item direction={"column"} xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1
              }}
            >
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  fontSize: 22,
                  fontWeight: 600,
                  // marginBottom: "3%",
                }}
              >
                Accomplishments
              </Typography>
              <Button variant="contained" sx={{}} onClick={props.onClick}>
                Add
              </Button>
            </Box>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: "3%",
                  }}
                >
                  Social Media
                </Typography>
              </div>
              <div>
                {accomplishmentsData["social-media"].map((item, index) => (
                  <div key={`accomplishments-social-media-${index}`}>
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: 0,
                        m: 0,
                      }}
                    >
                      <Box
                        sx={{
                          display: "grid",
                          lineHeight: "25px",
                          py: 0,
                          mb: -2,
                        }}
                      >
                        <Typography variant="p">
                          <b>{item.title}</b>
                        </Typography>
                        <Typography variant="info" sx={textStyle}>
                          <a href={item.url}>{item.url}</a>
                        </Typography>
                        <Typography variant="info" sx={textStyle}>
                          {item.description}
                        </Typography>
                      </Box>
                      <Box sx={{ margin: "0 0 0 40px" }}>
                        <EditIcon sx={{ fontSize: "medium" }} />
                      </Box>
                    </CardContent>
                  </div>
                ))}
              </div>
              <hr
                width="121%"
                style={{ marginTop: "3%", marginBottom: "3%" }}
              />
            </div>
            <div style={{ marginTop: "3%", marginBottom: "3%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "5%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  Papers
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    borderColor: "#000000",
                    float: "right",
                    maxHeight: "35px",
                  }}
                  onClick={props.onClick}
                >
                  Add
                </Button>
              </div>
              <div>
                {accomplishmentsData["papers"].map((item, index) => (
                  <div key={`accomplishments-papers-${index}`}>
                    <CardContent sx={{ display: "flex", p: 0 }}>
                      <Box sx={{ display: "grid", lineHeight: "25px" }}>
                        <Typography variant="p">
                          <b>{item.title}</b>
                        </Typography>
                        <Typography variant="info" sx={textStyle}>
                          {new Date(item.date).toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                          })}
                        </Typography>
                        <Typography variant="info" sx={textStyle}>
                          <a href={item.url}>{item.url}</a>
                        </Typography>
                        <Typography variant="info" sx={textStyle}>
                          {item.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <EditIcon sx={{ fontSize: "medium" }} />
                      </Box>
                    </CardContent>
                  </div>
                ))}
              </div>
              <hr
                width="121%"
                style={{ marginTop: "3%", marginBottom: "3%" }}
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "5%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  Awards
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    borderColor: "#000000",
                    float: "right",
                    maxHeight: "35px",
                  }}
                  onClick={props.onClick}
                >
                  Add
                </Button>
              </div>
              <div>
                {accomplishmentsData["awards"].map((item, index) => (
                  <div key={`accomplishments-awards-${index}`}>
                    <CardContent sx={{ display: "flex", p: 0 }}>
                      <Box sx={{ display: "grid", lineHeight: "25px" }}>
                        <Typography variant="p">
                          <b>{item.title}</b>
                        </Typography>
                        <Typography variant="info" sx={textStyle}>
                          {new Date(item.date).toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                          })}
                        </Typography>
                        <Typography variant="info" sx={textStyle}>
                          <a href={item.url}>{item.url}</a>
                        </Typography>
                        <Typography variant="info" sx={textStyle}>
                          {item.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <EditIcon sx={{ fontSize: "medium" }} />
                      </Box>
                    </CardContent>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default AccomplishmentDetailsMob;

const textStyle = { fontSize: 12, color: "#828282" };
