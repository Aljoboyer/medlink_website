import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import googlePlayIcon from "../../assets/images/google-play-badge (1) 1.svg";
import appStoreIcon from "../../assets/images/google-play-badge (1) 2.svg";
import { Link, useLocation } from "react-router-dom";
import facebook from "../../assets/images/001-facebook.svg";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FooterLandingPage from "../FooterLandingPage";
import element from "../../assets/images/footerEelement.svg";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  const mobileView = useMediaQuery("(max-width: 900px)");
  const { pathname } = useLocation();
  var now = new Date();

  // getFullYear function will give current year
  var currentYear = now.getFullYear();

  return (
    <>
      {pathname !== ("/" || "/home") ? (
        <Box
          sx={{
            // backgroundImage: "linear-gradient(#67C3F3, #5A98F2)",
            backgroundColor: "#395987",
            color: "var(--clr-white)",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${element})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0% 0%",
            }}
          >
            <Container maxWidth="xl">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: `${mobileView ? "column" : "row"}`,
                  paddingBlock: "2rem",
                  gap: "2rem",
                  width: "90%",
                  // margin: "auto",
                }}
              >
                {/* <Box>
                <img
                  style={{ width: "12rem", height: "auto" }}
                  src={footer_logo_v1}
                  alt="footer_logo_v1"
                />
              </Box> */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: mobileView ? "38px" : "32px",
                  }}
                >
                  <a
                    href="https://www.facebook.com/profile.php?id=100085360226241"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={facebook} />
                    {/* <FacebookIcon sx={{color:"#458FF6"}}/> */}
                  </a>
                  <a
                    style={{ paddingLeft: "40px" }}
                    href="https://twitter.com/Medlinkjobsind"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterIcon />
                  </a>
                  <a
                    style={{ paddingLeft: "40px" }}
                    href="https://www.instagram.com/medlinkjobs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    style={{ paddingLeft: "40px" }}
                    href="https://www.youtube.com/channel/UCTjqm_kIHBARGqHmat4KyDA"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <YouTubeIcon />
                  </a>
                  <a
                    style={{ paddingLeft: "40px" }}
                    href="https://www.linkedin.com/company/medlink-jobs/about"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon />
                  </a>
                </Box>
              </Box>
              <Divider
                sx={{
                  width: mobileView ? "90%" : "90%",
                  borderBottom: "1px solid #FFFFFF",
                  borderRadius: "5px",
                  m: "auto",
                  opacity: "0.1",
                  paddingTop: "20px",
                }}
              />

              {!mobileView ? (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: "23px",
                    }}
                  >
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                      }}
                      to="/"
                    >
                      Home
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "64px",
                      }}
                      to="/login"
                    >
                      Healthcare Professionals
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "64px",
                      }}
                      to="/hospital-login"
                    >
                      Recruiters
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "64px",
                      }}
                      to="/login"
                    >
                      Resources
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "64px",
                      }}
                      to="/about-us"
                    >
                      About Us
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "64px",
                      }}
                      to="/contact-us"
                    >
                      Contact Us
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "64px",
                      }}
                      to="/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "64px",
                      }}
                      to="/terms-and-conditions"
                    >
                      Terms & Services
                    </Link>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: "29px",
                    }}
                  >
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                      }}
                      to="/login"
                    >
                      Browse Jobs
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "64px",
                      }}
                      to="/faq"
                    >
                      FAQ
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "64px",
                      }}
                      to="/login"
                    >
                      Payments
                    </Link>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: "17px",
                    }}
                  >
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                      }}
                      to="/"
                    >
                      Home
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "33px",
                      }}
                      to="/login"
                    >
                      Healthcare Professionals
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "33px",
                      }}
                      to="/hospital-login"
                    >
                      Recruiters
                    </Link>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: "14px",
                    }}
                  >
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                      }}
                      to="/login"
                    >
                      Resources
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "33px",
                      }}
                      to="/about-us"
                    >
                      About Us
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "33px",
                      }}
                      to="/contact-us"
                    >
                      Contact Us
                    </Link>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: "14px",
                    }}
                  >
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                      }}
                      to="/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "33px",
                      }}
                      to="/terms-and-conditions"
                    >
                      Terms & Services
                    </Link>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mt: "14px",
                    }}
                  >
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                      }}
                      to="/login"
                    >
                      Browse Jobs
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "33px",
                      }}
                      to="/faq"
                    >
                      FAQ
                    </Link>
                    <Link
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                        paddingLeft: "33px",
                      }}
                      to="/login"
                    >
                      Payments
                    </Link>
                  </Box>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: mobileView ? "start" : "center",
                  flexDirection: `${mobileView ? "column" : "row"}`,
                  // paddingBlock: "2rem",
                  gap: "2rem",
                  width: "90%",
                  margin: "auto",
                  borderBottom: "1px solid #ffffff1a",
                  paddingBottom: mobileView ? "30px" : "61px",
                  paddingTop: mobileView ? "36px" : "78px",
                }}
              >
                <Box sx={{ paddingTop: mobileView && "10px" }}>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ gap: "1rem" }}
                  >
                    <Grid
                      item
                      sx={{
                        backgroundColor: "var(--clr-gray-6)",
                        padding: "6px",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <CallOutlinedIcon
                        sx={{
                          color: "#458FF6",
                          height: "18px",
                          width: "18px" /* fontSize: "20px" */,
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="p"
                        sx={{ display: "block", lineHeight: "30px" }}
                      >
                        +91-040-35704798
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{ gap: "1rem" }}
                  >
                    <Grid
                      item
                      sx={{
                        backgroundColor: "var(--clr-gray-6)",
                        padding: "6px",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <EmailIcon
                        sx={{ color: "#458FF6", height: "18px", width: "18px" }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="p"
                        sx={{ display: "block", lineHeight: "30px" }}
                      >
                        contact@medlinkjobs.com
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <a
                    href="https://play.google.com/store/apps"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      style={{
                        width: mobileView ? "123px" : "170px",
                        height: mobileView ? "36px" : "54px",
                      }}
                      src={googlePlayIcon}
                      alt="google play store link"
                    />
                  </a>
                  <a
                    style={{ paddingLeft: mobileView ? "14px" : "24px" }}
                    href="https://apps.apple.com/us/app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      style={{
                        width: mobileView ? "123px" : "170px",
                        height: mobileView ? "36px" : "54px",
                      }}
                      src={appStoreIcon}
                      alt="apple app store link"
                    />
                  </a>
                </Box>
              </Box>
            </Container>
            <Box
              sx={{
                textAlign: "center",
                backgroundColor: "#2B4871",
                py: mobileView ? 1.25 : 1.5,
              }}
            >
              <Typography sx={{ fontSize: "12px", color: "#FFFFFF" }}>
                All rights reserved &copy; {currentYear} MedLink Health Care
                Pvt. Ltd.
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <FooterLandingPage />
      )}
    </>
  );
};

export default Footer;
