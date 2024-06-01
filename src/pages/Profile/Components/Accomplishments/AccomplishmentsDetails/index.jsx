import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EeperienceDetails = (props) => {
  const accomplishmentsData = {
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
    <Grid container item sx={{ marginBlock: "1rem" }} spacing={2}>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "var(--clr-gray-6) !important",
        }}
      >
        <Grid container direction={"row"} alignItems="flex-start" padding={2}>
          <Grid
            container
            item
            direction={"column"}
            xs={12}
            md={10}
            sx={{ padding: "0 10px 0 0" }}
          >
            <Typography
              component="h3"
              variant="h5"
              sx={{
                fontSize: 24,
                fontWeight: 700,
                margin: "1rem",
              }}
            >
              Accomplishments
            </Typography>

            <Box
              sx={{
                px: 2,
                pb: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    // margin: "1rem",
                  }}
                >
                  Memberships & Positions
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    borderColor: "#000000",
                    maxHeight: "35px",
                  }}
                  onClick={props.onClick}
                >
                  Add
                </Button>
              </div>
              <Box sx={{ display: "flex" }}>
                <Box>
                  <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                      sx={{ width: "20vh" }}
                    >
                      Position Held
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                      sx={{ width: "75vh", color: "#4F4F4F" }}
                    >
                      Name of the Position
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                      sx={{ width: "20vh" }}
                    >
                      Organization
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                      sx={{ width: "75vh", color: "#4F4F4F" }}
                    >
                      Organization Name
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                      sx={{ width: "20vh" }}
                    >
                      Life Membership
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                      sx={{ width: "75vh", color: "#4F4F4F" }}
                    >
                      Yes
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <EditIcon sx={{ fontSize: "medium" }} />
                </Box>
              </Box>

              <hr
                width="121%"
                style={{ marginTop: "3%", marginBottom: "5%" }}
              />
            </Box>

            <div style={{ marginTop: "0%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    margin: "1rem",
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
                    <CardContent sx={{ display: "flex" }}>
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
                style={{ marginTop: "3%", marginBottom: "5%" }}
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "30px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    margin: "1rem",
                    marginBottom: "3%",
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
                    <CardContent sx={{ display: "flex" }}>
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

export default EeperienceDetails;

const textStyle = { fontSize: 12, color: "#828282" };
