import React, { useEffect, useMemo } from "react";
import {
  Box,
  Breadcrumbs,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import aboutUsImage from "../../assets/images/aboutUsImage.svg";
import { useLocation, Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuIcon from "@mui/icons-material/Menu";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const AboutUs = () => {
  const { pathname } = useLocation();
  const matches = useMediaQuery("(max-width: 900px)");
  document.title = "About Us | MedLink Jobs"
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // googleMapsApiKey: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  //   if (!isLoaded) return <div>Loading...</div>;

  return (
    <Box sx={{ px: matches ? "12px" : "60px" }}>
      <Box sx={{ py: 1 }}>
        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="small" sx={{ color: "#395987" }} />
          }
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            style={{ color: "#395987", fontSize: "14px" }}
            to="/"
          >
            Home
          </Link>
          <Typography sx={{ color: "#395987", fontSize: "14px" }}>
            About Us
          </Typography>
        </Breadcrumbs>
      </Box>
      <Typography
        sx={{
          fontSize: matches ? "22px" : "24px",
          color: "#395987",
          fontWeight: "600",
          mt: matches ? 1.2 : 2,
        }}
      >
        About Us
      </Typography>
      <Box
        sx={{
          boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
          borderRadius: "6px",
          mt: "24px",
          mb: matches ? "40px" : "65px",
        }}
      >
        <Box
          sx={{
            pl: matches ? "17px" : "70px",
            pr: "12px",
            pt: matches ? "18px" : "63px",
            mb: matches ? "34px" : "116px",
          }}
        >
          <Grid container spacing={matches ? 0 : 2}>
            {matches && (
              <Grid item xs={12} md={5}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    paddingLeft: "27px",
                    paddingRight: "27px",
                    paddingTop: "4px",
                  }}
                  src={aboutUsImage}
                  alt="About Us"
                />
              </Grid>
            )}
            <Grid item xs={12} md={7}>
            <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                India's 1st and only recruitment platform for healthcare professionals
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                MedLink connects healthcare job seekers (doctors / nurses / paramedics / allied professionals) with healthcare recruiters (hospitals / clinics / labs / pharma, biotech, genome sequencing companies / medical colleges) to ensure hassle-free and efficient recruitment processes.
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                MedLink aims to bridge the glaring gap between the two by doing away with the conventional / traditional modes of recruitment (professional networking, referrals and local staffing agencies) and democratizing hiring, leading to quick, transparent and cost-effective solutions. In essence, we provide technology-enabled recruitment solutions and services to the healthcare industry across India. 
              </Typography>
              <Typography
                  sx={{ fontSize: "18px", color: "#395987", fontWeight: "600", mt: "30px" }}
                >
                  Our Vision & Mission:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "19px",
                  }}
                >
                  Our vision and mission is to create and deliver contemporary recruitment tools by adding comprehensive technology which help healthcare companies all over the globe to find the suitable professionals with fulfilling the exact need of the job requirements. 
                </Typography>
              
            </Grid>
            {!matches && (
              <Grid item xs={12} md={5}>
                <img
                  style={{ paddingLeft: "55px" }}
                  src={aboutUsImage}
                  alt="About Us"
                />
              </Grid>
            )}
          </Grid>
        </Box>
        <Box
          sx={{
            pl: matches ? "15px" : "70px",
            pr: matches ? "15px" : "5px",
            pt: matches ? "0px" : "63px",
            pb: matches ? "16px" : "76px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/*               {
                    !isLoaded ? <Skeleton sx={{width: matches ? "100%" : "650px", height: matches ? "100%" : "500px", mt: "-100px"}} /> : 
                    <Map />
                } */}
              <iframe
                width="100%"
                height="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="https://maps.google.com/maps?q='+17.49904241729825+','+78.38447671119485+'&hl=es&z=14&amp;output=embed"
              ></iframe>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  sx={{ fontSize: "18px", color: "#395987", fontWeight: "600" }}
                >
                  Corporate Office:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "5px",
                  }}
                >
                  4th Floor, Sai Plaza, Opp to Rainbow Children Hospital,
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "5px",
                  }}
                >
                  Kukatpally, Hyderabad - 500072 
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "5px",
                  }}
                >
                  info@medlinkjobs.com
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "5px",
                  }}
                >
                  040-35704798
                </Typography>
              </Box>
              <Box sx={{ mt: "40px" }}>
                <Typography
                  sx={{ fontSize: "18px", color: "#395987", fontWeight: "600" }}
                >
                  Registered Office:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "5px",
                  }}
                >
                  Plot No 251,Sy No-126, Dheeptisri Nagar Colony,
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "5px",
                  }}
                >
                  MadinaGuda, Miyapur, Hyderabad, Telangana, 500049 
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "5px",
                  }}
                >
                  info@medlinkjobs.com
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "5px",
                  }}
                >
                  040-35704798
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutUs;

function Map() {
  const center = useMemo(
    () => ({ lat: 17.49904241729825, lng: 78.38447671119485 }),
    []
  );

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}
