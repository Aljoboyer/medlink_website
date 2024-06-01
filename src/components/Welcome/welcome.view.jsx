import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import welcomeBanner from "../../assets/images/SignUp_illustration.png";

const theme = createTheme();
const useStyles = makeStyles({
  welcomesection: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
});

const WelcomeGrid = styled(Grid)(() => ({
  display: "grid",
  placeItems: "center",
  position: "relative",
  textAlign: "center",
  "&::before": {
    content: '""',
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -2,
    opacity: 0.7,
  },
}));

const Welcome = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <WelcomeGrid item xs={12} style={{padding: !matches ? "" : "20px 10px 30px 18px"}} className={classes.welcomesection}>
      <Box sx={{ mx: "auto" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: "24px",
            fontWeight: "600",
            color: "var(--clr-blue-footer)",
            my: 2.5,
          }}
        >
          {props.text}
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{
            color: "var(--clr-gray-2)",
            fontSize: "16px",
            mb: "10px",
            fontWeight: "600",
            textAlign: "start",
          }}
        >
          REGISTER WITH US
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{
            color: "var(--clr-gray-2)",
            fontSize: "16px",
            mb: "7px",
            fontWeight: "600",
            textAlign: "start",
          }}
        >
          Register with MedLink, and we'll get you recruited.
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{
            color: "var(--clr-gray-2)",
            fontSize: "16px",
            mb: "7px",
            textAlign: "start",
          }}
        >
          MedLink is the Best Online Job Search Platform for doctors and the
          healthcare community in India. MedLink provides a convenient Digital
          platform to simplify healthcare job search for healthcare
          professionals like Doctors, Nurses, Midwives and Allied Healthcare
          Professionals. Please register with us to get notifications on jobs
          available across India's best hospitals.
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{
            color: "var(--clr-gray-2)",
            fontSize: "16px",
            mb: 3,
            fontWeight: "600",
            textAlign: "start",
          }}
        >
          Register with us and make your profile visible to recruiters.
        </Typography>

        <Box sx={{ mb: 0, px: 15 }}>
          <img
            style={{ width: "100%" }}
            src={welcomeBanner}
            alt="Welcome_Banner"
          />
        </Box>
      </Box>
    </WelcomeGrid>
  );
};

export default Welcome;
