import { Box, Typography } from '@mui/material';

export default function CategoriesView() {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} >
            {Array(12).fill().map((_, index) => index + 1).map((element, index) => (
                <Box sx={{ padding: '1.2%' }}>
                    <img src="/image.png" height="120" width="204" alt={"image" + index} />
                    <Typography>Category Name</Typography>
                </Box>
            ))}
        </div>
    )
}