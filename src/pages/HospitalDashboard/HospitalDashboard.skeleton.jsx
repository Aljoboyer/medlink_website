import { Box, Card, Divider, Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

const HospitalDashboardSkeleton = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      {
        !matches ? (
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Box>
              <Skeleton variant="rectangular" animation="wave" width="100%" height="30vh" />
            </Box>
            <Box mixWidth="xl" sx={{ mx: 5, px: 2, mt: 5 }}>
              <Grid container spacing={2.5}>
                <Grid item xs={2.3}>
                  <Box
                    sx={{
                      boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                      backgroundColor: "var(--clr-white)",
                      borderRadius: 1,
                      mt: 15,
                      px: 1.3,
                      pb: 1.3,
                    }}
                  >
                    <Skeleton variant="text" animation="wave" width="60%" height="30px" sx={{ m: 1.5 }} />
                    <Divider sx={{ color: "var(--clr-blue-light)" }} />
                    <Skeleton variant="text" animation="wave" width="70%" height="30px" sx={{ m: 1.5 }} />
                    <Divider sx={{ color: "var(--clr-blue-light)" }} />
                    <Skeleton variant="text" animation="wave" width="50%" height="30px" sx={{ m: 1.5 }} />
                    <Divider sx={{ color: "var(--clr-blue-light)" }} />
                    <Skeleton variant="text" animation="wave" width="60%" height="30px" sx={{ m: 1.5 }} />
                    <Divider sx={{ color: "var(--clr-blue-light)" }} />
                    <Skeleton variant="text" animation="wave" width="50%" height="30px" sx={{ m: 1.5 }} />
                    <Divider sx={{ color: "var(--clr-blue-light)" }} />
                    <Skeleton variant="text" animation="wave" width="70%" height="30px" sx={{ m: 1.5 }} />
                    <Divider sx={{ color: "var(--clr-blue-light)" }} />
                    <Skeleton variant="text" animation="wave" width="50%" height="30px" sx={{ m: 1.5 }} />
                    <Divider sx={{ color: "var(--clr-blue-light)" }} />
                    <Skeleton variant="text" animation="wave" width="60%" height="30px" sx={{ m: 1.5 }} />
                    <Divider sx={{ color: "var(--clr-blue-light)" }} />
                    <Skeleton variant="text" animation="wave" width="50%" height="30px" sx={{ m: 1.5 }} />
                  </Box>
                </Grid>
                <Grid item xs={8} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", mt: -27 }}>
                    <Box>
                      <Skeleton variant="text" animation="wave" width="100%" height="80px" sx={{ mt: 3, mb: 4 }} />
                    </Box>
                    <Box
                      sx={{
                        borderRadious: "10px",
                        mb: 5,
                        zIndex: "3",
                      }}
                    >
                      <Card
                        sx={{
                          backgroundColor: "var(--clr-white)",
                          boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                          borderRadius: 2,
                          px: 4,
                          py: 2.5,
                        }}
                      >
                        <Grid container justifyContent="space-between" specing={3}>
                          <Grid item xs={5} sx={{ pr: 1.5 }}>
                            <Skeleton variant="rectangular" animation="wave" width="72px" height="72px" sx={{ borderRadius: 1 }} />
                            <Skeleton variant="text" animation="wave" width="50%" height="25px" sx={{ my: 0.5 }} />
                            <Skeleton variant="text" animation="wave" width="90%" sx={{ mt: 1 }} />
                          </Grid>
                          <Grid item xs={4}>
                            <Box
                              sx={{
                                borderRadius: 1,
                                border: "1px solid var(--clr-orange-2)",
                                px: 2.5,
                                height: "100%"
                              }}
                            >
                              <Skeleton variant="text" animation="wave" width="40%" sx={{ my: 1.5 }} />
                              <Skeleton variant="text" animation="wave" width="60%" sx={{ mb: 1 }} />
                            </Box>
                          </Grid>
                          <Grid item xs={3} sx={{ pl: { xl: 8, lg: 3, md: 0 }, textAlign: "center" }}>
                            <Box sx={{ mx: "auto", textAlign: "center" }}>
                              <Skeleton variant="circular" animation="wave" width="120px" height="120px" />
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{
                      backgroundColor: "var(--clr-white)",
                      borderRadius: 2,
                      boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                      p: 2.5,
                    }}>
                      <Skeleton variant="text" animation="wave" width="25%" height="40px" sx={{ mb: 2 }} />
                      <Box sx={{}}>
                        <Skeleton variant="text" animation="wave" width="100%" />
                        <Skeleton variant="text" animation="wave" width="100%" />
                        <Skeleton variant="text" animation="wave" width="30%" />
                      </Box>
                      <Skeleton variant="text" animation="wave" width="130px" height="60px" sx={{ mt: 2, borderRadius: 6 }} />
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{
                      backgroundColor: "var(--clr-white)",
                      borderRadius: 2,
                      boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                      p: 2.5,
                    }}>
                      <Skeleton variant="text" animation="wave" width="35%" height="40px" sx={{ mb: 2 }} />
                      <Box sx={{}}>
                        <Skeleton variant="text" animation="wave" width="95%" />
                        <Skeleton variant="text" animation="wave" width="100%" />
                        <Skeleton variant="text" animation="wave" width="30%" />
                      </Box>
                      <Skeleton variant="text" animation="wave" width="130px" height="60px" sx={{ mt: 2, borderRadius: 6 }} />
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{
                      backgroundColor: "var(--clr-white)",
                      borderRadius: 2,
                      boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                      p: 2.5,
                      mb: 6
                    }}>
                      <Skeleton variant="text" animation="wave" width="30%" height="40px" sx={{ mb: 2 }} />
                      <Box sx={{}}>
                        <Skeleton variant="text" animation="wave" width="100%" />
                        <Skeleton variant="text" animation="wave" width="90%" />
                        <Skeleton variant="text" animation="wave" width="40%" />
                      </Box>
                      <Skeleton variant="text" animation="wave" width="130px" height="60px" sx={{ mt: 2, borderRadius: 6 }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
              <Skeleton variant="rectangular" animation="wave" width="30px" height="30px" sx={{ mr: 3.1 }} />
              <Skeleton variant="rectangular" animation="wave" width="180px" height="20px" sx={{ mr: 3.1 }} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", px: 2 }}>
              <Box>
                <Skeleton variant="text" animation="wave" width="100%" height="80px" sx={{ mt: 0, mb: 2, borderRadius: "60px" }} />
              </Box>
            </Box>
            <Grid container sx={{ p: 2 }} spacing={2}>
              <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", gap: "12px", mb: 3 }}>
                <Box sx={{ padding: "10px", backgroundColor: "var(--clr-white)", border: "1px solid var(--clr-blue-light)", borderRadius: "6px", }}>
                  <Skeleton variant="text" animation="wave" width="130px" height="30px" />
                </Box>
                <Box sx={{ padding: "10px", backgroundColor: "var(--clr-white)", border: "1px solid var(--clr-blue-light)", borderRadius: "6px", }}>
                  <Skeleton variant="text" animation="wave" width="170px" height="30px" />
                </Box>
                <Box sx={{ padding: "10px", backgroundColor: "var(--clr-white)", border: "1px solid var(--clr-blue-light)", borderRadius: "6px", }}>
                  <Skeleton variant="text" animation="wave" width="190px" height="30px" />
                </Box>
                <Box sx={{ padding: "10px", backgroundColor: "var(--clr-white)", border: "1px solid var(--clr-blue-light)", borderRadius: "6px", }}>
                  <Skeleton variant="text" animation="wave" width="130px" height="30px" />
                </Box>
                <Box sx={{ padding: "10px", backgroundColor: "var(--clr-white)", border: "1px solid var(--clr-blue-light)", borderRadius: "6px", }}>
                  <Skeleton variant="text" animation="wave" width="160px" height="30px" />
                </Box>
                <Box sx={{ padding: "10px", backgroundColor: "var(--clr-white)", border: "1px solid var(--clr-blue-light)", borderRadius: "6px", }}>
                  <Skeleton variant="text" animation="wave" width="130px" height="30px" />
                </Box>
                <Box sx={{ padding: "10px", backgroundColor: "var(--clr-white)", border: "1px solid var(--clr-blue-light)", borderRadius: "6px", }}>
                  <Skeleton variant="text" animation="wave" width="200px" height="30px" />
                </Box>
                <Box sx={{ padding: "10px", backgroundColor: "var(--clr-white)", border: "1px solid var(--clr-blue-light)", borderRadius: "6px", }}>
                  <Skeleton variant="text" animation="wave" width="180px" height="30px" />
                </Box>
                <Box sx={{ padding: "10px", backgroundColor: "var(--clr-white)", border: "1px solid var(--clr-blue-light)", borderRadius: "6px", }}>
                  <Skeleton variant="text" animation="wave" width="160px" height="30px" />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                <Box>
                  <Box sx={{
                    backgroundColor: "var(--clr-white)",
                    borderRadius: 2,
                    border: "1px solid var(--clr-blue-light)",
                    p: 2.5,
                  }}>
                    <Skeleton variant="text" animation="wave" width="25%" height="40px" sx={{ mb: 2 }} />
                    <Box>
                      <Skeleton variant="text" animation="wave" width="90%" />
                      <Skeleton variant="text" animation="wave" width="100%" />
                      <Skeleton variant="text" animation="wave" width="100%" />
                      <Skeleton variant="text" animation="wave" width="30%" />
                    </Box>
                    <Skeleton variant="text" animation="wave" width="130px" height="60px" sx={{ mt: 2, borderRadius: 6 }} />
                  </Box>
                </Box>
                <Box>
                  <Box sx={{
                    backgroundColor: "var(--clr-white)",
                    borderRadius: 2,
                    border: "1px solid var(--clr-blue-light)",
                    p: 2.5,
                  }}>
                    <Skeleton variant="text" animation="wave" width="35%" height="40px" sx={{ mb: 2 }} />
                    <Box>
                      <Skeleton variant="text" animation="wave" width="100%" />
                      <Skeleton variant="text" animation="wave" width="100%" />
                      <Skeleton variant="text" animation="wave" width="95%" />
                      <Skeleton variant="text" animation="wave" width="30%" />
                    </Box>
                    <Skeleton variant="text" animation="wave" width="130px" height="60px" sx={{ mt: 2, borderRadius: 6 }} />
                  </Box>
                </Box>
                <Box>
                  <Box sx={{
                    backgroundColor: "var(--clr-white)",
                    borderRadius: 2,
                    border: "1px solid var(--clr-blue-light)",
                    p: 2.5,
                    mb: 6
                  }}>
                    <Skeleton variant="text" animation="wave" width="30%" height="40px" sx={{ mb: 2 }} />
                    <Box>
                      <Skeleton variant="text" animation="wave" width="100%" />
                      <Skeleton variant="text" animation="wave" width="90%" />
                      <Skeleton variant="text" animation="wave" width="100%" />
                      <Skeleton variant="text" animation="wave" width="40%" />
                    </Box>
                    <Skeleton variant="text" animation="wave" width="130px" height="60px" sx={{ mt: 2, borderRadius: 6 }} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )
      }
    </>
  )
};

export default HospitalDashboardSkeleton;