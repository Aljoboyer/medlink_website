import { Box, Container, Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

const PostJobSkeleton = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box>
      {
        !matches ? (
          <Container maxWidth="xl" sx={{ mx: "auto", mb: 8 }}>
            <Box sx={{ px: 3 }}>
              <Skeleton variant="text" animation="wave" width="250px" height={20} sx={{ my: 2 }} />
              <Skeleton variant="text" animation="wave" width="300px" height={50} sx={{ my: 3 }} />
            </Box>
            <Box sx={{ px: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Box sx={{ px: 4, bgcolor: "#ffffff", boxShadow: "5px 19px 28px rgba(69, 143, 246, 0.09)", borderRadius: 1, mb: 5 }}>
                    <Grid container rowSpacing={3} columnSpacing={8}>
                      <Grid item xs={6}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={6}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={6}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={6}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={6}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={6}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={6}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={6}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton sx={{ mb: 2, width: "140px" }} />
                        <Skeleton variant="rectangular" height="170px" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton sx={{ mb: 2, width: "120px" }} />
                        <Skeleton sx={{ my: 1, width: "90%", mx: "auto" }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: { xs: "space-between", md: "flex-end" }, alignItems: "center", gap: 3, pb: 3 }}>
                          <Skeleton variant="text" animation="wave" width="130px" height="60px" sx={{ mt: 2, borderRadius: 6 }} />
                          <Skeleton variant="text" animation="wave" width="130px" height="60px" sx={{ mt: 2, borderRadius: 6 }} />
                        </Box>
                      </Grid> 
                    </Grid>
                  </Box> 
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ p: 2, bgcolor: "#ffffff", boxShadow: "5px 19px 28px rgba(69, 143, 246, 0.09)", borderRadius: 1, mb: 5 }}>
                    <Skeleton sx={{ my: 2, width: "30%", py: 3 }} />
                    <Skeleton sx={{ mt: 4, py: 1 }} />
                    <Skeleton sx={{ my: 2, py: 1 }} />
                    <Skeleton sx={{ my: 2, py: 1 }} />
                    <Skeleton sx={{ my: 2, py: 1 }} />
                    <Skeleton sx={{ my: 2, py: 1 }} />
                    <Skeleton sx={{ my: 2, py: 1 }} />
                    <Skeleton sx={{ my: 2, py: 1 }} />
                    <Skeleton sx={{ my: 1, py: 1 }} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        ) : (
          <Box>
            <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
              <Skeleton variant="rectangular" animation="wave" width="30px" height="30px" sx={{ mr: 3.1 }} />
              <Skeleton variant="rectangular" animation="wave" width="180px" height="20px" sx={{ mr: 3.1 }} />
            </Box>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ p: 2, bgcolor: "#ffffff", border: "1px solid var(--clr-blue-light)", borderRadius: 1, mb: 0 }}>
                    <Skeleton sx={{ my: 0, width: "30%", py: 1 }} />
                    <Skeleton sx={{ mt: 3 }} />
                    <Skeleton sx={{ my: 1 }} />
                    <Skeleton sx={{ my: 1 }} />
                    <Skeleton sx={{ my: 1 }} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ px: 1.5, bgcolor: "#ffffff", border: "1px solid var(--clr-blue-light)", borderRadius: 1, mb: 5 }}>
                    <Skeleton sx={{ my: 2, width: "30%", py: 1 }} />
                    <Grid container rowSpacing={3} columnSpacing={8}>
                      <Grid item xs={12}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton sx={{ mb: 2, width: "130px" }} />
                        <Skeleton variant="rectangular" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton sx={{ mb: 2, width: "140px" }} />
                        <Skeleton variant="rectangular" height="170px" sx={{ my: 1, py: 3, borderRadius: 1 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton sx={{ mb: 2, width: "120px" }} />
                        <Skeleton sx={{ my: 1, width: "90%", mx: "auto" }} />
                      </Grid> 
                      <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: { xs: "space-between", md: "flex-end" }, alignItems: "center", gap: 3, pb: 3 }}>
                          <Skeleton variant="text" animation="wave" width="130px" height="60px" sx={{ mt: 2, borderRadius: 6 }} />
                          <Skeleton variant="text" animation="wave" width="130px" height="60px" sx={{ mt: 2, borderRadius: 6 }} />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box> 
                </Grid> 
              </Grid>
            </Box>
          </Box>
        )
      }
    </Box>
  );
};

export default PostJobSkeleton;