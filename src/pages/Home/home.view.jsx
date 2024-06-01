import { Box, Container, Card, Grid, TextField, InputAdornment, Button, Typography, Link, CardContent, CardActions } from "@mui/material";
import { Categories, JobAlert, JobVacancy, TopEmployers, JobSearch, DownloadLinkCard, SearchJobCard } from './components';
import React from "react";

const Home = () => {
  return (
    <Container maxWidth="xl" sx={{ marginLeft: '-1.7%' }}>
      <div style={{  backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDGS4TlNEy6M-xtNkTtUGEATnJRGQAJQeDwg&usqp=CAU)', backgroundSize: '100% 100%', height: '70vh', width: '99.7vw', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <JobSearch />
          <JobAlert />
        </div>
      </div>
      <Box sx={{ marginLeft: '5.5%', marginTop: '5%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <DownloadLinkCard />
          <SearchJobCard />
        </Box>
        <Box sx={{ marginTop: '5%' }}>
          <Typography sx={{ color: '#333333', textAlign: 'center', fontSize: '36px' }}>
            <b>Categories</b>
          </Typography>
          <Grid container sx={{ display: 'flex', marginBottom: '6%' }}>
            <Grid item xs={2}>
              <TopEmployers />
            </Grid>
            <Grid item xs={8}>
              <Categories />
            </Grid>
            <Grid item xs={2}>
              <TopEmployers />
            </Grid>
          </Grid>
          <JobVacancy />
        </Box>
      </Box>
    </Container >
  );
};

export default Home;
