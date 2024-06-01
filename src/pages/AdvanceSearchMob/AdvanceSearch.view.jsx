import * as React from "react";
import { useState } from "react";
import { Container, Grid, Typography, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import AdvSearch from "./AdvSearch";
import EmploymentDetails from "./EmploymentDetails";
import EducationDetails from "./EducationDetails";
import AdditionalDetails from "./AddtionalDetails";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DisplayDetails from "./DisplayDetails";

const commonStyles = {};

function createData(queries) {
  return { queries };
}
let searched = [
  createData("Search Keyword 1"),
  createData("Search Keyword 2"),
  createData("Search Keyword 3"),
  createData("Search Keyword 4"),
  createData("Search Keyword 5"),
  createData("Search Keyword 6"),
  createData("Search Keyword 7"),
  createData("Search Keyword 8"),
  createData("Search Keyword 9"),
  createData("Search Keyword 10"),
  createData("Search Keyword 11"),
];

const AdvanceSearch = () => {
  const [searches, setSearches] = useState(searched);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#E0E0E0",
          padding: "12px 0 12px 17px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <ChevronLeftIcon style={{ height: "35px", width: "35px" }} />
        <Typography
          style={{ lineHeight: "24px", fontSize: "18px", fontWeight: "600" }}
        >
          Search Resume
        </Typography>
      </Box>
      <Box sx={{ px: 2, my: 2 }}>
        {/* Advance Search  */}
        <AdvSearch />
        {/* Empoyment Details  */}
        <EmploymentDetails />
        {/* Educational Details  */}
        <EducationDetails />
        {/* Additional Details  */}
        <AdditionalDetails />
        {/* Display Details  */}
        <DisplayDetails />
        {/* clear and clear button  */}
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "-10px",
          }}
        >
          <Box>
            <Typography
              color="text.secondary"
              style={{
                marginBottom: "30px",
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              Action in
            </Typography>
          </Box>
          <Grid
            xs={12}
            sx={{
              marginTop: -2,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              px: 0,
              gap: 6,
            }}
          >
            <Button
              sx={{
                width: "100%",
                py: 0.7,
                borderRadius: 3,
                fontWeight: "bold",
                fontSize: 16,
                border: "3px solid black",
              }}
            >
              <span style={{ color: "black" }}> Clear</span>
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                py: 1,
                borderRadius: 3,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {/* Recent searches  */}
        <Grid style={{ margin: "36px 0 70px 0" }}>
          <Typography
            style={{
              marginBottom: "15px",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Recent Searches
          </Typography>
          <Box
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
            gap={2}
          >
            {searches.map((search) => (
              <Typography underline="always" color="text.secondary">
                <Link href="#" color="inherit" sx={{ mr: 2 }}>
                  {search.queries}
                </Link>
              </Typography>
            ))}
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default AdvanceSearch;
