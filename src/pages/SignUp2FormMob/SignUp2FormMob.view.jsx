import { useState, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import "./Signup2FormMob.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { width } from "@mui/system";

const SignupGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  textAlign: "center",
  paddingBottom: "5rem",
  paddingTop: "2rem",
  // color: "#4f4f4f",
}));

const SignUp2FormMob = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [newsletter, setNewsletter] = useState(null);

  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    console.log("Upload resume");
  };

  const handleSignUp = async (e) => {
    console.log(name, email, pin, newsletter);
  };

  return (
    <Box>
      <Box sx={{ backgroundColor: "#80828282", padding: "15px 0 15px 22px" }}>
        <ArrowBackIcon sx={{ height: "32px", width: "32px" }} />
      </Box>
      <SignupGrid item xs className="doctor-signup">
        <Box>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: "24px",
              fontWeight: "600",
              color: "#333333",
              textAlign: "left",
              marginRight: "auto",
              width: "300px",
            }}
          >
            Heading goes here
          </Typography>
        </Box>
        <FormControl>
          {/* name input  */}
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              backgroundColor: "var(--clr-white)",
              borderRadius: "6px",
              marginTop: "1rem",
              padding: "0.5rem 0rem",
              width: "305px",
            }}
          >
            <TextField
              sx={{ width: "100%" }}
              name="name"
              type="text"
              variant="outlined"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{ disableUnderline: true }}
            />
          </Box>
          {/* email input  */}
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              backgroundColor: "var(--clr-white)",
              borderRadius: "6px",
              marginTop: "1rem",
              padding: "0.5rem 0rem",
              width: "305px",
            }}
          >
            <TextField
              sx={{ width: "100%" }}
              name="email"
              type="email"
              variant="outlined"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ disableUnderline: true }}
            />
          </Box>
          {/* pin input  */}
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              backgroundColor: "var(--clr-white)",
              borderRadius: "6px",
              marginTop: "1rem",
              padding: "0.5rem 0rem",
              width: "305px",
            }}
          >
            <TextField
              sx={{ width: "100%" }}
              name="pin"
              type="number"
              variant="outlined"
              placeholder="Pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              InputProps={{ disableUnderline: true }}
            />
          </Box>
          {/* upload resume button  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              backgroundColor: "var(--clr-white)",
              borderRadius: "6px",
              marginTop: "2rem",
              padding: "0.5rem 1rem",
              width: "300px",
              height: "150px",
            }}
          >
            <Typography
              sx={{
                marginTop: "5%",
                fontSize: "16px",
                fontWeight: "400",
              }}
            >
              Upload resume to get the full benefits of your MedLink's profile!
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4F4F4F",
                borderRadius: "10px",
                width: "160px",
                height: "40px",
                margin: "auto",
              }}
              onClick={() => fileInputRef.current.click()}
            >
              <Typography sx={{ color: "white" }}>Upload Resume</Typography>
            </Button>
            <input
              onChange={handleFileChange}
              multiple={false}
              ref={fileInputRef}
              type="file"
              hidden
            />
          </Box>
          <Typography
            sx={{
              margin: "5px",
              textAlign: "left",
              color: "#828282",
              fontSize: "12px",
            }}
          >
            Format: DOC, DOCx, PDF Maximum file size: 2MB
          </Typography>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "start",
            width: "305px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "#333333",
              margin: "50px 0 20px 0px",
              textAlign: "left",
            }}
          >
            <input
              type="checkbox"
              onChange={(e) => setNewsletter(e.target.checked)}
            />
            &nbsp;
            <b>Subscribe to our Newsletter</b>
          </Typography>
          <Typography
            sx={{
              textAlign: "justify",
              color: "#333333",
              fontSize: "14px",
              textJustify: "inner-word",
            }}
          >
            <b>
              By clicking Register, you agree to the
              <Link to="/terms-and-conditions">Terms and Conditions</Link> &
              <Link to="/privacy-policy">Privacy Policy</Link> of Medlinks
            </b>
          </Typography>
        </Box>
        <Button
          size="large"
          variant="contained"
          onClick={handleSignUp}
          sx={{ mt: 3.6, borderRadius: 2, py: 2, px: 10 }}
        >
          Register Now
        </Button>
      </SignupGrid>
    </Box>
  );
};

export default SignUp2FormMob;
