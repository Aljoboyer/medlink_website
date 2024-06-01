import { Button, Typography } from "@material-ui/core";
import {
    Box,
    Card,
    FormControl,
    List,
    ListItem,
    MenuItem,
    Select,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CircleIcon from "@mui/icons-material/Circle";

function createData(
    id,
    recommend,
    title,
    price,
    zone,
    descriptions,
    quantities,
    focusd
) {
    return {
        id,
        recommend,
        title,
        price,
        zone,
        descriptions,
        quantities,
        focusd,
    };
}
let plans = [
    createData(
        "01",
        "",
        "Hot Vacancy",
        "79.99",
        "All Cities",
        [
            "Lorem Ipsum",
            "Lorem Ipsum totre",
            "Lorem Ipsum",
            "Lorem Ipsum",
            "Lorem",
        ],
        ["1", "2", "3"],
        "none"
    ),
    createData(
        "02",
        "Recommended",
        "Job Posting",
        "99.99",
        "Classified",
        [
            "Lorem Ipsum",
            "Lorem Ipsum totre",
            "Lorem Ipsum",
            "Lorem",
            "Lorem Ipsum",
            "Lorem Ipsum tyryt ouwf",
        ],
        ["1", "2", "3"],
        "1px solid #828282"
    ),
    createData(
        "03",
        "",
        "Bronze",
        "99.99",
        "Non Metro",
        ["Lorem Ipsum", "Lorem Ipsum", "Lorem", "Lorem Ipsum", "Lorem"],
        ["1", "2", "3"],
        "none"
    ),
];
const features = [
    "For quantities upto 4, job posting credits should be consumed within 30 days from the date of activation/purchase.",
    "For quantities 5 and above, credits should be consumed within 1 year from the date of activation/purchase.",
    "Please note that the amounts are exclusive of taxes. Taxes will be added as applicable.",
    "Discount percentage have been rounded off to the nearest number.",
    "Metro cities include Delhi/NCR(National Capital Region), Delhi, Gurgaon, Noida, Greater Noida, Ghaziabad, Faridabad,Mumbai and Mumbai Suburbs, Thane, Navi Mumbai, Pune, Chennai, Bengaluru/Bangalore, Kolkata, Hyderabad/Secunderabad and Ahmedabad",
];

const PricingPlansMini = () => {
    const [amonut, setAmount] = useState(1);

    const handleChange = (event) => {
        setAmount(event.target.value);
    };
    return (
        <Box sx={{ mx: "auto", mb: 4 }} maxWidth="sm">
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
            <Box sx={{ my: 2.5, mx: 4.75 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 3,
                    }}
                >
                    {plans.map((plan) => (
                        <Card key={plan.id} sx={{ border: plan.focusd }}>
                            <Box sx={{ textAlign: "center", mt: 5 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Box>
                                        {plan.recommend && (
                                            <Typography
                                                variant="caption"
                                                gutterBottom
                                                style={{
                                                    color: "#FFFFFF",
                                                    backgroundColor: "#2D9CDB",
                                                    display: "inline-block",
                                                    padding: "2px 15px",
                                                    borderRadius: "5px",
                                                }}
                                            >
                                                {plan.recommend}
                                            </Typography>
                                        )}
                                    </Box>

                                    <Typography
                                        style={{
                                            fontWeight: "600",
                                            mt: 1,
                                        }}
                                        variant="subtitle2"
                                        component="div"
                                    >
                                        {plan.title}
                                    </Typography>
                                </Box>
                                <Box
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "flex-end",
                                        gap: 2,
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        component="div"
                                        gutterBottom
                                        style={{
                                            fontWeight: "700",
                                            color: "#2E2E2E",
                                        }}
                                    >
                                        {plan.price}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        gutterBottom
                                        style={{
                                            paddingBottom: "8px",
                                            color: "#8F8A8A",
                                        }}
                                    >
                                        {plan.zone}
                                    </Typography>
                                </Box>
                                <Box sx={{ mb: 3, mt: 1, mx: 2 }}>
                                    <List>
                                        {plan.descriptions.map(
                                            (description) => (
                                                <ListItem
                                                    style={{
                                                        fontSize: "14px",
                                                        color: "#8F8A8A",
                                                        lineHeight: "20px",
                                                    }}
                                                >
                                                    <CheckBoxOutlinedIcon
                                                        fontSize="small"
                                                        sx={{
                                                            color: "#3CCF8E",
                                                        }}
                                                    />
                                                    &nbsp;&nbsp;
                                                    {description}
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        px: 3,
                                        py: 1,
                                        border: "2px dashed #828282",
                                        borderLeft: "none",
                                        borderRight: "none",
                                    }}
                                >
                                    <Typography
                                        style={{
                                            color: "#8F8A8A",
                                            lineHeight: "21px",
                                        }}
                                        variant="body1"
                                        component="div"
                                    >
                                        Quantity
                                    </Typography>
                                    <Box>
                                        <FormControl
                                            fullWidth
                                            style={{
                                                minWidth: 70,
                                                backgroundColor: "#F2F2F2",
                                            }}
                                        >
                                            <Select
                                                value={amonut}
                                                onChange={handleChange}
                                                size="small"
                                            >
                                                {plan.quantities.map(
                                                    (amount) => (
                                                        <MenuItem
                                                            style={{
                                                                display:
                                                                    "block",
                                                                padding:
                                                                    "2px 5px",
                                                            }}
                                                            key={amount}
                                                            value={amount}
                                                        >
                                                            {amount}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        px: 3,
                                        py: 2.5,
                                        textAlign: "left",
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        component="div"
                                        style={{
                                            color: "#4F4F4F",
                                            fontWeight: "600",
                                            fontSize: "10px",
                                            py: 2,
                                        }}
                                    >
                                        Flat 10% OFF | Buy 5 Job Postings or
                                        more
                                    </Typography>
                                </Box>
                                <Box sx={{ px: 3, pb: 2 }}>
                                    <Button
                                        size="medium"
                                        sx={{
                                            mx: "auto",
                                            rounded: 3,
                                        }}
                                        fullWidth
                                        variant="contained"
                                    >
                                        Buy Now
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Box>
            <Box sx={{ px: 1 }}>
                <List
                    sx={{
                        color: "#828282",
                        lineHeight: "24px",
                    }}
                >
                    {features.map((feature) => (
                        <ListItem
                            sx={{
                                display: "flex",
                                alignItems: "baseline",
                                justifyContent: "flex-start",
                                gap: 1,
                                py: 0,
                                px: 4
                            }}
                            key={feature}
                        >
                            <Typography
                                variant="body2"
                                component="div"
                                style={{ fontWeight: "600", fontSize: "5px" }}
                            >
                                <CircleIcon fontSize="inherit" />
                            </Typography>
                            <Typography
                                variant="body2"
                                component="div"
                                style={{
                                    fontWeight: "600",
                                    fontSize: "10px",
                                    lineHeight: "24px",
                                }}
                            >
                                {feature}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default PricingPlansMini;
