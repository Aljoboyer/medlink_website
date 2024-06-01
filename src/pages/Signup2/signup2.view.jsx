import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Signup2Form, Welcome } from "../../components";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Signup2 = () => {
  const banner_text = "Welcome";
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  document.title = "Register | MedLink Jobs";

  return (
    <Box sx={{backgroundColor: "#F0F6FE"}}>
    {
      matches &&
      <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
      <ArrowBackIcon sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Register</Typography>
      </Box>
      }
    <Box maxWidth="xl" sx={{ backgroundColor: "#F0F6FE", mx: "auto", padding: !matches ? "1rem 3rem 3rem" : "0rem 0rem" }}>
      <Grid
        container
        spacing={ !matches ? 8 : 0}
        justifyContent="space-between"
      >
        <Grid item xs={12} md={5} sx={{mx: 'auto'}}><Signup2Form /></Grid>
    
      </Grid>
    </Box>
    </Box>
  );
};

export default Signup2;
