import { Box, Card, Typography, useMediaQuery, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { gqlquery } from "../../../../api/hospitalIndex.js";

const KeySkills = (props) => {
  const [savedSkills, setSavedSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // For defaut value
    const QUERY_GETSKILLSLISTBYAPPLICANT = {
      query: `query MyQuery {
                getSkillsListByApplicant(userID : "${props.userID}") {
                    name
                    sID
                    smID
                   }
                }`,
    };
    gqlquery(QUERY_GETSKILLSLISTBYAPPLICANT, null)
      .then((res) => res.json())
      .then((data) => {
        if(data?.data.getSkillsListByApplicant) {
          setSavedSkills(data?.data.getSkillsListByApplicant)
        }
      })
      .finally((e) => setIsLoading(false));
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
          sx={{
            color: "var(--clr-blue-footer)",
            fontWeight: "700 !important",
            pb: matches ? 1.65 : 3,
            fontSize: matches ? "18px" : "24px",
          }}
          gutterBottom
          component="div"
        >
          Key Skills
        </Typography>

        {isLoading ? (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, pl : matches && 0.40 }}>
            {savedSkills.length > 0 ?
              savedSkills?.map((skill) => (
                <Box
                  sx={{
                    bgcolor: "var(--clr-blue-light)",
                    color: "var(--clr-blue-footer)",
                    p: 0.5,
                    borderRadius: 16,
                    display: "flex",
                    gap: 1.5,
                  }}
                >
                  <Typography variant="subtitle2" sx={{px: 1.5}}>
                    {skill?.name}
                  </Typography>
                  {/* <CancelIcon sx={{ color: "var(--clr-blue-footer)" }} /> */}
                </Box>
              ))
              :
              <Typography variant="body2"
                gutterBottom sx={{
                  color: "var(--clr-gray-3)",
                  fontSize: "14px",
                  fontWeight: "600 !important",
                  mb: 1,
                }}>
                  No Details Found
              </Typography>
            }
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default KeySkills;
