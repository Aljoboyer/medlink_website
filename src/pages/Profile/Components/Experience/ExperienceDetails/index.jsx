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
  const educationData = [
    {
      course: "Cardio Surgeon",
      hospital: "Apollo Hospital",
      year: "2021 to Sep 2021(9months)",
      jobTypes: "Permanent",
      employmentType: "Full TIme",
      shift: "Day",
      noticePeriod: "3 Months",
      info1:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. ",
      info2:
        "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    },
    {
      course: "Cardio Surgeon",
      hospital: "Apollo Hospital",
      year: "2021 to Sep 2021(9months)",
      jobTypes: "Permanent",
      employmentType: "Full TIme",
      shift: "Day",
      noticePeriod: "3 Months",
      info1:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. ",
      info2:
        "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ",
    },
  ];

  return (
    <Grid item sx={{ marginBlock: "1rem" }} spacing={2}>
      <Card
        sx={{
          height: "100%",
          backgroundColor: "var(--clr-gray-6) !important",
        }}
      >
        <Grid container direction={"row"} alignItems="flex-start" padding={2}>
          <Grid
            item
            direction={"column"}
            xs={12}
            md={12}
            sx={{ padding: "0 10px 0 0" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  // margin: "1rem",
                  marginBottom: 0,
                }}
              >
                Experience
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderColor: "#000000",
                }}
                onClick={props.onClick}
              >
                Add Experience
              </Button>
            </Box>

            {educationData.map((item, index) => (
              <div>
                <CardContent
                  key={`education-${index}`}
                  sx={{ display: "flex" }}
                >
                  <Box sx={{ display: "grid", lineHeight: "25px" }}>
                    {/* <Typography variant="p">{item.course}</Typography> */}
                    <Typography variant="info" sx={textStyle}>
                      {/* {item.hospital} */}
                    </Typography>
                    <Typography variant="info" sx={textStyle}>
                      {/* {item.year} */}
                    </Typography>
                    <Typography variant="info" sx={boldText}>
                      Job Type:
                      {/* {item.jobTypes} */}
                    </Typography>
                    <Typography variant="info" sx={boldText}>
                      Employment Type:
                      {/* {item.employmentType} */}
                    </Typography>
                    <Typography variant="info" sx={boldText}>
                      Shift:
                      {/* {item.shift} */}
                    </Typography>
                    <Typography variant="info" sx={boldText}>
                      Notice Period:
                      {/* {item.noticePeriod} */}
                    </Typography>
                  </Box>
                  <Box sx={{ margin: "0 0 0 40px" }}>
                    <EditIcon sx={{ fontSize: "medium" }} />
                  </Box>
                </CardContent>
                <Box sx={{ margin: "0 0 0 40px" }}>
                  <Typography
                    variant="info"
                    sx={{ ...textStyle, lineHeight: "20px" }}
                  >
                    <ol type="1">
                      {/* <li>{item.info1}</li> */}
                      {/* <li>{item.info2}</li> */}
                    </ol>
                  </Typography>
                </Box>
              </div>
            ))}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default EeperienceDetails;

const textStyle = { fontSize: 12, color: "#828282" };
const boldText = { ...textStyle, fontWeight: "bolder" };
