import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

const UserListSkeleton = () => {
  return (
    <Box>
      <Box maxWidth="md" sx={{ mb: 8, mx: "auto" }}>
        <Box style={{ marginTop: "15px", marginBottom: "30px" }}>
          <Skeleton variant="text" animation="wave" width="40%" height={30} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Skeleton variant="text" animation="wave" width="30%" height={50} />
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", width: "55%", gap: 4 }}>
            <Skeleton variant="text" animation="wave" width="50%" height={60} sx={{borderRadius: 16}} />
            <Skeleton variant="text" animation="wave" width="30%" height={60} sx={{borderRadius: 16}} />
          </Box>
        </Box> 
        <Box>
          <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
          <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
          <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
          <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
          <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
          <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
          <Skeleton variant="rectangular" animation="wave" width="100%" height={60} sx={{ my: 0.5 }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
            <Skeleton variant="text" animation="wave" width={50} height={60} />     
            <Skeleton variant="text" animation="wave" width={40} height={60} />
            <Skeleton variant="text" animation="wave" width={40} height={60} />
            <Skeleton variant="text" animation="wave" width={40} height={60} /> 
            <Skeleton variant="text" animation="wave" width={50} height={60} />     
          </Box>
      </Box>
    </Box>
  );
};

export default UserListSkeleton;