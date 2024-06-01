import Typography from '@mui/material/Typography';
import { Box, Breadcrumbs, Collapse, Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { gqlOpenQuery } from '../../api';

const FAQ = () => {
  const { pathname } = useLocation();
  const [openedItemId, setOpenedItemId] = useState(true);
  const [faqData, setFaqData] = useState([]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  document.title = "FAQ | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleClick = orgEvent => {
    let clickedItemId = orgEvent.currentTarget.id;
    if (openedItemId === clickedItemId) {
      setOpenedItemId("");
    } else {
      setOpenedItemId(clickedItemId);
    }
  };

  useEffect(() => {

    const QUERY_GET_FAQ = {
      query: `query MyQuery {
      getFAQs {
        description
        faqID
        title
      }
    }`,
      operationName: "MyQuery",
    };



    gqlOpenQuery(QUERY_GET_FAQ, null)
      .then((res) => res.json())
      .then((datas) => {
        // console.log(datas?.data?.getFAQs);
        // console.log("successfull", datas);
        setFaqData(datas.data.getFAQs);
      });
  }, [])

  // console.log(faqData);

  // -------------------------------UI return--------------------------------------------
  return (
    <Box maxWidth="xl" sx={{ mx: "auto", px: 6, mb: 6 }}>
      {/* --------------------------start of breadcrumb-------------------------------- */}
      <Breadcrumbs
        separator={<NavigateNextIcon sx={{ color: "var(--clr-blue-footer)" }} fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ marginTop: "15px" }}
        style={{ marginBottom: "15px" }}
      >
        <Link
          underline="hover"
          style={{ color: "var(--clr-blue-footer)" }}
          to="/"
        >
          Home
        </Link>

        <Typography sx={{ color: "var(--clr-blue-footer)" }}>
          FAQ
        </Typography>
      </Breadcrumbs>

      {/* -----------------start of collapsible accordion--------------------------- */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: "600", color: "#395987", mb: "40px" }}>
          Frequently Asked Questions
        </Typography>

        {/* ---------------------------map rendering started--------------------------- */}

        {

          faqData.map(data => <Grid container spacing={2} sx={{ backgroundColor: openedItemId === `${data.faqID}` ? "#E4EEF5" : "", border: "1px solid var(--clr-blue-light)", borderRadius: data.faqID === 1 ? "8px 8px 0px 0px" : data.faqID === 4 ? "0px 0px 8px 8px" : "", mt: "1px", padding: "15px" }}>
            <Grid item xs={1.5} md={1.5}>
              <Typography sx={{ fontSize: matches ? "30px" : "48px", fontFamily: "Inter", opacity: .5, fontWeight: 700, textAlign: "center" }}>
                {data.faqID}
              </Typography>
            </Grid>
            <Grid item xs={7.5} md={9.5}>
              <Typography
                onClick={handleClick}
                id={data.faqID}
                sx={{ fontSize: "18px", fontFamily: "Open Sans", color: "#395987", mb: "26px" }}
              >
                {data.title}
              </Typography>

              <Collapse in={openedItemId === `${data.faqID}`} timeout="auto" unmountOnExit>
                <Box sx={{ mb: "52px", fontSize: "14px", fontWeight: 400 }}>
                  {data.description}
                </Box>

              </Collapse>
            </Grid>
            <Grid item xs={3} md={1}>
              {openedItemId === `${data.faqID}` ? (
                <IconButton onClick={handleClick}>
                  <RemoveCircleIcon
                    sx={{
                      height: "35px",
                      width: "40px",
                      color: "#5A98F2",
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton id={data.faqID} onClick={handleClick}>
                  <AddCircleIcon
                    style={{
                      height: "35px",
                      width: "40px",
                      color: "#E4EEF5",
                    }}
                  />
                </IconButton>
              )}
            </Grid>
          </Grid>)
        }
      </Box>

    </Box>
  );
};

export default FAQ;
