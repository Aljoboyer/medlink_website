import * as React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ToastTitle() {

    document.title = "No Active Subscription | MedLink Jobs";

    return (
        <Container maxWidth="md" sx={{ flexGrow: 1, mt: 4, mb: 8, px: 1, }} style={{ height: "60vh", }} variant="contained">
            <Grid container alignItems="center" sx={{ borderRadius: 16, border: "1px solid var(--clr-blue-light)", boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)", }}>
                <Grid xs={2.5} md={1} sx={{ py: 1 }}>
                    <AddCircleOutlineIcon sx={{ fontSize: "2.6rem", ml: { xs: 0.7, md: 2 }, mt: 0.5, color: "var(--clr-blue-footer)" }} />
                </Grid>
                <Grid sx={{ ml: { xs: 0, sm: 0 }, pl: { xs: 1.4 }, py: 1 }} xs={6} md={9.5}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "700", fontSize: "1rem", color: "var(--clr-blue-footer)" }}>
                        No Active Subscription
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "12px", color: "#1A1A1A" }}>
                        You don't have sufficient privileges for this page. Please contact your administrator.
                    </Typography>
                </Grid>
                <Grid xs={3.5} md={1.5} sx={{ backgroundColor: "var(--clr-blue-primary)", height: "100%", my: "auto", borderTopRightRadius: "55px", borderBottomRightRadius: "55px" }}>
                    <br />
                    <Typography sx={{ ml: { xs: 1, md: 2.7, my: "auto", color: "var(--clr-white)" }, mr: 2 }}>
                        <Link to="/profile/plans">
                            Buy Now
                        </Link>
                    </Typography>
                    <br />
                </Grid>
            </Grid>
        </Container>
    );
}