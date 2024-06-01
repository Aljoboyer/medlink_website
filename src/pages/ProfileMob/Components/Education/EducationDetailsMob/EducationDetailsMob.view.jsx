import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EducationDetailsMob = (props) => {
  const educationData = [
    {
      course: "M.B.B.S - Cardio",
      college: "Bengaluru Medical College",
      year: "2015[Full Time]",
    },
    {
      course: "M.B.B.S - Cardio",
      college: "Bengaluru Medical College",
      year: "2015[Full Time]",
    },
    {
      course: "M.B.B.S - Cardio",
      college: "Bengaluru Medical College",
      year: "2015[Full Time]",
    },
  ];

  return (
    <Grid item sx={{ marginBlock: "1rem", px: 2 }} spacing={2}>
      <Card
        sx={{
          height: "100%",
        }}
      >
        <Grid container direction={"row"} alignItems="flex-start" padding={2}>
          <Grid item direction={"column"} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                component="h3"
                variant="h5"
                sx={{
                  fontSize: 24,
                  fontWeight: 600,
                  marginBottom: 0,
                }}
              >
                Education
              </Typography>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "8px",
                }}
                onClick={props.onClick}
              >
                Add
              </Button>
            </Box>

            {educationData.map((item, index) => (
              <CardContent
                key={`education-${index}`}
                className="resume-content"
                sx={{ display: "flex" }}
              >
                <Box sx={{ display: "grid", lineHeight: "25px" }}>
                  <Typography variant="p">{item.course}</Typography>
                  <Typography
                    variant="info"
                    sx={{ fontSize: 12, color: "#828282" }}
                  >
                    {item.college}
                  </Typography>
                  <Typography
                    variant="info"
                    sx={{ fontSize: 12, color: "#828282" }}
                  >
                    {item.year}
                  </Typography>
                </Box>
                <Box sx={{ margin: "0 0 0 40px" }}>
                  <EditIcon sx={{ fontSize: "medium" }} />
                </Box>
              </CardContent>
            ))}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default EducationDetailsMob;
