import Edit from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { gqlquery, QUERY_GETEDUCATION } from "../../../../../api/index";
import AddEducation from "../AddEducation";

const EducationDetails = (props) => {
  const [educationDetails, setEducationDetails] = useState([]);
  const [showUpdateEducation, setShowUpdateEducation] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    gqlquery(QUERY_GETEDUCATION, null)
      .then((res) => res.json())
      .then((datas) => setEducationDetails(datas.data?.getEducationList));
  }, []);

  const handleShowEducationDetails = (item) => {
    // e.preventDefault();
    setShowUpdateEducation((prevData) => !prevData);
    setItem(item);
  }; 

  return (
    <Grid item sx={{ marginBlock: "1rem" }} spacing={2}>
      {!showUpdateEducation && (
        <Card
          sx={{
            height: "100%",
            backgroundColor: "var(--clr-gray-6) !important",
          }}
        >
          <Grid container direction={"row"} alignItems="flex-start" padding={2}>
            <Grid item direction={"column"} xs={12} md={12}>
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
                  Education
                </Typography>{" "}
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    borderColor: "#000000",
                  }}
                  onClick={props.onClick}
                >
                  Add Education
                </Button>
              </Box>

              {educationDetails.map((item, index) => (
                <CardContent
                  key={`education-${index}`}
                  className="resume-content"
                  sx={{ display: "flex" }}
                >
                  <Box sx={{ display: "grid", lineHeight: "25px" }}>
                    <Typography variant="p">{item.title}</Typography>
                    <Typography
                      variant="info"
                      sx={{ fontSize: 12, color: "#828282" }}
                    >
                      {item.courseName}
                    </Typography>
                    <Typography
                      variant="info"
                      sx={{ fontSize: 12, color: "#828282" }}
                    >
                      {item.specialization}
                    </Typography>
                    <Typography
                      variant="info"
                      sx={{ fontSize: 12, color: "#828282" }}
                    >
                      {item.university}
                    </Typography>
                    <Typography
                      variant="info"
                      sx={{ fontSize: 12, color: "#828282" }}
                    >
                      1990 - {item.yearOfPassing} ({item.courseType})
                    </Typography>
                  </Box>
                  <Box sx={{ margin: "0 0 0 40px" }}>
                    <Edit
                      sx={{ fontSize: "medium" }}
                      onClick={() => handleShowEducationDetails(item)}
                    />
                  </Box>
                </CardContent>
              ))}
            </Grid>
          </Grid>
        </Card>
      )}

      {showUpdateEducation && (
        <Box sx={{ margin: "0 0 0 40px" }}>
          <AddEducation
            item={item}
            updateEducation="updateEducation"
            cancelUpdate={handleShowEducationDetails}
          />
        </Box>
      )}
    </Grid>
  );
};

export default EducationDetails;
