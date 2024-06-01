import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import googleDocsImg from "../../../../assets/google-docs.svg";

const ResumeMob = () => {
  const [headline, setHeadline] = useState("");
  const [charactersLeft, setCharactersLeft] = useState(500);

  const handleChange = (e) => {
    if (charactersLeft > 0) {
      setHeadline(e.target.value);
      setCharactersLeft(500 - e.target.value.length);
    }
  };

  return (
    <Grid container sx={{ marginBlock: "1rem", px: 2 }} spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ px: 0 }}>
          <Typography
            component="h3"
            variant="h5"
            sx={{
              fontSize: 24,
              fontWeight: 700,
              margin: "1rem",
              marginBottom: 0,
            }}
          >
            Resume
          </Typography>
          <CardContent sx={{ display: "flex" }}>
            <Box>
              <img src={googleDocsImg} alt="google docs" />
            </Box>
            <Box marginLeft={2}>
              <Typography variant="p">Resume name here</Typography>
              <CardActions
                sx={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: 0,
                  marginBlock: "1rem",
                }}
              >
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Button
                    variant="text"
                    sx={{
                      padding: 0,
                      textDecoration: "underline",
                      fontSize: 16,
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    variant="text"
                    sx={{
                      padding: 0,
                      textDecoration: "underline",
                      fontSize: 16,
                    }}
                  >
                    Delete
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mt: "1rem", mb: "1rem", ml: -1 }}
                  >
                    Upload Resume
                    <input type="file" hidden />
                  </Button>
                  <Typography
                    variant="info"
                    sx={{
                      display: "block",
                      fontSize: 12,
                      color: "#828282",
                      ml: -1,
                    }}
                  >
                    Supported Formats: doc, docx, pdf, upto 2 MB.
                  </Typography>
                </Box>
              </CardActions>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            height: "100%",
          }}
        >
          <Typography
            component="h3"
            variant="h5"
            sx={{
              fontSize: 24,
              fontWeight: 700,
              margin: "1rem",
              marginBottom: 0,
            }}
          >
            Resume Headline
          </Typography>

          <CardContent>
            <TextField
              variant="outlined"
              multiline
              rows={5}
              fullWidth
              placeholder="Description goes here"
              value={headline}
              onChange={handleChange}
              sx={{ backgroundColor: "#ffffff" }}
            />
            <Typography variant="info" sx={{ fontSize: 12, color: "#828282" }}>
              {charactersLeft} character(s) left.
            </Typography>
            <CardActions
              sx={{ justifyContent: "flex-end", gap: "1rem", padding: 0 }}
            >
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained">Save</Button>
            </CardActions>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ResumeMob;
