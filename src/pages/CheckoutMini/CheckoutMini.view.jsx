import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const cityList = ["Delhi", "Mumbai", "Pune", "Chennai", "Bangalore", "Kolkata"];
const stateList = ["Delhi", "Mumbai", "Chennai", "Kolkata"];
const countries = ["Bangladesh", "India", "Sri-Lanka", "Nepal", "Vutan"];
const cardPlan = {
  title: "Hot Vacancy",
  price: "$299",
  quantity: [1, 2, 3, 4],
  netPrice: "$299",
  charge: "$10",
  total: "$309",
};

const CheckoutMini = () => {
  const [error, setError] = useState("");
  const [errSelect, setErrSelect] = useState("");
  const [values, setValues] = useState({
    companyName: "",
    personName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    gstin: "",
    quantity: 1,
  });

  const handleonChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCheckoutSubmit = () => {
    if (
      values.city === "" ||
      values.state === "" ||
      values.country === "" ||
      values.quantity === ""
    ) {
      setErrSelect("Please, select an option!");
    }
    if (
      values.companyName === "" ||
      values.personName === "" ||
      values.phone === "" ||
      values.email === "" ||
      values.address === "" ||
      values.pinCode === "" ||
      values.gstin === ""
    ) {
      return setError("Text Field can't be empty!");
    }
    console.log(values);
  };

  const { title, price, quantity, netPrice, charge, total } = cardPlan || {};
  return (
    <Box sx={{ mx: "auto", mb: 10 }} maxWidth="sm">
      <Box
        sx={{
          bgcolor: "#E0E0E0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1,
          py: 2,
        }}
      >
        <Button
          variant="text"
          sx={{
            color: "#323232",
          }}
        >
          <ArrowBackIosNewRoundedIcon fontSize="medium" />
        </Button>
        <Typography
          sx={{
            color: "#000000",
            fontSize: "16px",
            fontWeight: "600",
          }}
          variant="subtitle1"
          component="div"
        >
          Check Out
        </Typography>
      </Box>
      <Box
        sx={{
          px: 1,
          py: 2,
          mx: 2,
          my: 2.5,
          bgcolor: "#F2F2F2",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 1.5,
          }}
        >
          <Typography
            component="div"
            variant="subtitle1"
            sx={{
              color: "#211F1F",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            Billing Details
          </Typography>
          <KeyboardArrowUpIcon sx={{ color: "#323232" }} fontSize="large" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <InputLabel
              sx={{
                color: "#6F7482",
                fontSize: "0.8rem",
              }}
              htmlFor="companyname"
            >
              Company Name&nbsp;
              <Typography
                variant="caption"
                color="error"
                sx={{ fontSize: "16px" }}
              >
                *
              </Typography>
            </InputLabel>
            <TextField
              onChange={handleonChange("companyName")}
              value={values.companyName}
              error={error && values.companyName}
              placeholder="Text"
              id="companyname"
              size="small"
              type="text"
              fullWidth
              sx={{
                color: "#6F7482",
                bgcolor: "#FFFFFF",
              }}
            />
            {values.companyName === "" && (
              <FormHelperText sx={{ color: "red", mb: 1 }}>
                {error}
              </FormHelperText>
            )}
          </Box>
          <Box>
            <InputLabel
              sx={{
                color: "#6F7482",
                fontSize: "0.8rem",
              }}
              htmlFor="Contact_Person"
            >
              Contact Person Name&nbsp;
              <Typography
                variant="caption"
                color="error"
                sx={{ fontSize: "16px" }}
              >
                *
              </Typography>
            </InputLabel>
            <TextField
              onChange={handleonChange("personName")}
              value={values.personName}
              error={error && values.personName}
              placeholder="Text"
              id="Contact_Person"
              size="small"
              type="text"
              fullWidth
              sx={{
                color: "#6F7482",
                bgcolor: "#FFFFFF",
              }}
            />
            {values.personName === "" && (
              <FormHelperText sx={{ color: "red", mb: 1 }}>
                {error}
              </FormHelperText>
            )}
          </Box>
          <Box>
            <InputLabel
              sx={{
                color: "#6F7482",
                fontSize: "0.8rem",
              }}
              htmlFor="Mobile_Number"
            >
              Mobile Number&nbsp;
              <Typography
                variant="caption"
                color="error"
                sx={{ fontSize: "16px" }}
              >
                *
              </Typography>
            </InputLabel>
            <TextField
              onChange={handleonChange("phone")}
              value={values.phone}
              error={error && values.phone}
              placeholder="Text"
              id="Mobile_Number"
              size="small"
              type="tel"
              fullWidth
              sx={{
                color: "#6F7482",
                bgcolor: "#FFFFFF",
              }}
            />
            {values.phone === "" && (
              <FormHelperText sx={{ color: "red", mb: 1 }}>
                {error}
              </FormHelperText>
            )}
          </Box>
          <Box>
            <InputLabel
              sx={{
                color: "#6F7482",
                fontSize: "0.8rem",
              }}
              htmlFor="Email_Address"
            >
              Email Address&nbsp;
              <Typography
                variant="caption"
                color="error"
                sx={{ fontSize: "16px" }}
              >
                *
              </Typography>
            </InputLabel>
            <TextField
              onChange={handleonChange("email")}
              value={values.email}
              error={error && values.email}
              placeholder="Text"
              id="Email_Address"
              size="small"
              type="email"
              fullWidth
              sx={{
                color: "#6F7482",
                bgcolor: "#FFFFFF",
              }}
            />
            {values.email === "" && (
              <FormHelperText sx={{ color: "red", mb: 1 }}>
                {error}
              </FormHelperText>
            )}
          </Box>
          <Box>
            <InputLabel
              sx={{
                color: "#6F7482",
                fontSize: "0.8rem",
              }}
              htmlFor="Email_Address"
            >
              Address&nbsp;
              <Typography
                variant="caption"
                color="error"
                sx={{ fontSize: "16px" }}
              >
                *
              </Typography>
            </InputLabel>
            <TextField
              onChange={handleonChange("address")}
              value={values.address}
              error={error && values.address}
              placeholder="Text"
              id="Address"
              size="small"
              type="text"
              multiline
              rows={5}
              fullWidth
              sx={{
                color: "#6F7482",
                bgcolor: "#FFFFFF",
              }}
            />
            {values.address === "" && (
              <FormHelperText sx={{ color: "red", mb: 1 }}>
                {error}
              </FormHelperText>
            )}
          </Box>
          <Box>
            <InputLabel
              sx={{
                color: "#6F7482",
                fontSize: "0.8rem",
              }}
              htmlFor="City"
            >
              City&nbsp;
              <Typography
                variant="caption"
                color="error"
                sx={{ fontSize: "16px" }}
              >
                *
              </Typography>
            </InputLabel>
            <FormControl
              id="City"
              size="small"
              placeholder="Text"
              fullWidth
              sx={{
                color: "#6F7482",
                bgcolor: "#FFFFFF",
              }}
            >
              <Select
                displayEmpty
                onChange={handleonChange("city")}
                value={values.city}
                error={errSelect && values.city}
              >
                <MenuItem value="" disabled>
                  <em>select city</em>
                </MenuItem>
                {cityList.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              {values.city === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {errSelect}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box>
            <InputLabel
              sx={{
                color: "#6F7482",
                fontSize: "0.8rem",
              }}
              htmlFor="State"
            >
              State&nbsp;
              <Typography
                variant="caption"
                color="error"
                sx={{ fontSize: "16px" }}
              >
                *
              </Typography>
            </InputLabel>
            <FormControl
              id="State"
              size="small"
              placeholder="Text"
              fullWidth
              sx={{
                color: "#6F7482",
                bgcolor: "#FFFFFF",
              }}
            >
              <Select
                displayEmpty
                onChange={handleonChange("state")}
                value={values.state}
                error={errSelect && values.state}
              >
                <MenuItem value="" disabled>
                  <em>select state</em>
                </MenuItem>
                {stateList.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
              {values.state === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {errSelect}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box>
            <InputLabel
              sx={{
                color: "#6F7482",
                fontSize: "0.8rem",
              }}
              htmlFor="City"
            >
              Country&nbsp;
              <Typography
                variant="caption"
                color="error"
                sx={{ fontSize: "16px" }}
              >
                *
              </Typography>
            </InputLabel>
            <FormControl
              id="City"
              size="small"
              placeholder="Text"
              fullWidth
              sx={{
                color: "#6F7482",
                bgcolor: "#FFFFFF",
              }}
            >
              <Select
                displayEmpty
                onChange={handleonChange("country")}
                value={values.country}
                error={errSelect && values.country}
              >
                <MenuItem value="" disabled>
                  <em>select country</em>
                </MenuItem>
                {countries.map((land) => (
                  <MenuItem key={land} value={land}>
                    {land}
                  </MenuItem>
                ))}
              </Select>
              {values.country === "" && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {errSelect}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box>
            <InputLabel
              sx={{
                color: "#6F7482",
                fontSize: "0.8rem",
              }}
              htmlFor="PIN"
            >
              PIN Code&nbsp;
              <Typography
                variant="caption"
                color="error"
                sx={{ fontSize: "16px" }}
              >
                *
              </Typography>
            </InputLabel>
            <TextField
              onChange={handleonChange("pinCode")}
              value={values.pinCode}
              error={error && values.pinCode}
              placeholder="Text"
              id="PIN"
              size="small"
              type="text"
              fullWidth
              sx={{
                color: "#6F7482",
                bgcolor: "#FFFFFF",
              }}
            />
            {values.pinCode === "" && (
              <FormHelperText sx={{ color: "red", mb: 1 }}>
                {error}
              </FormHelperText>
            )}
          </Box>
          <Box>
            <InputLabel
              sx={{
                color: "#6F7482",
                fontSize: "0.8rem",
              }}
              htmlFor="GSTIN"
            >
              GSTIN&nbsp;
              <Typography
                variant="caption"
                color="error"
                sx={{ fontSize: "16px" }}
              >
                *
              </Typography>
            </InputLabel>
            <TextField
              onChange={handleonChange("gstin")}
              value={values.gstin}
              error={error && values.gstin}
              placeholder="Text"
              id="GSTIN"
              size="small"
              type="text"
              fullWidth
              sx={{
                color: "#6F7482",
                bgcolor: "#FFFFFF",
              }}
            />
            {values.gstin === "" && (
              <FormHelperText sx={{ color: "red", mb: 1 }}>
                {error}
              </FormHelperText>
            )}
          </Box>
        </Box>
      </Box>
      <Box sx={{ bgcolor: "#F2F2F2", borderRadius: 2, mx: 2, my: 4 }}>
        <Box
          sx={{
            bgcolor: "#828282",
            px: 4,
            py: 2,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <Typography sx={{ color: "#FFFFFF" }} variant="body1">
            Review
          </Typography>
        </Box>
        <Grid container spacing={18}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                py: 3,
                px: 1,
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  color: "#211F1F",
                  fontWeight: "500",
                  fontSize: "24px",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  color: "#211F1F",
                  fontWeight: "600",
                  fontSize: "25px",
                }}
              >
                {price}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 2,
                pb: 3,
                px: 1,
              }}
            >
              <Typography
                variant="body2"
                component="div"
                sx={{
                  color: "#828282",
                  fontSize: "12px",
                }}
              >
                Quantity
              </Typography>
              <Box>
                <FormControl fullWidth sx={{ minWidth: 70 }} size="small">
                  <Select
                    displayEmpty
                    onChange={handleonChange("quantity")}
                    value={values.quantity}
                    error={errSelect && values.quantity}
                    sx={{ m: 0, p: 0 }}
                    size="small"
                  >
                    <MenuItem value="" disabled>
                      0
                    </MenuItem>
                    {quantity.map((amount) => (
                      <MenuItem key={amount} value={amount}>
                        {amount}
                      </MenuItem>
                    ))}
                  </Select>
                  {values.quantity === "" && (
                    <FormHelperText sx={{ color: "red", mb: 1 }}>
                      {errSelect}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
                px: 3,
              }}
            >
              <Typography
                variant="subtitle2"
                component="div"
                sx={{
                  color: "#787878",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Price ({values.quantity} item)
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{
                  color: "#211F1F",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                {netPrice}
              </Typography>
            </Box>
            <Divider sx={{ color: "#E6E6E6" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
                px: 3,
              }}
            >
              <Typography
                variant="subtitle2"
                component="div"
                sx={{
                  color: "#787878",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Additional Charge
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{
                  color: "#211F1F",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                {charge}
              </Typography>
            </Box>
            <Divider sx={{ color: "#E6E6E6" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
                px: 3,
              }}
            >
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  color: "##211F1F",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                Amount Payable
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  color: "#211F1F",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                {total}
              </Typography>
            </Box>
            <Divider sx={{ color: "#E6E6E6" }} />
            <Box sx={{ px: 1, pt: 4, pb: 3 }}>
              <Button
                onClick={handleCheckoutSubmit}
                sx={{ mx: "auto" }}
                fullWidth
                variant="contained"
              >
                Pay Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CheckoutMini;
