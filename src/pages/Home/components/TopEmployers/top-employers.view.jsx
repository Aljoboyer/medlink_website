import { Card, CardContent, Typography, Box } from "@mui/material";

export default function TopEmployersView() {
    return (
        <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5', justifyContent: 'space-between' }} >
                <Typography sx={{ fontSize: '20px', color: '#333333' }}><b>Top Employers</b></Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    {Array(5).fill().map((_, index) => index + 1).map((element, index) => (
                        <img src="/image.png" height="70" alt={"image" + index} style={{ marginTop: '5%', marginBottom: '5%' }} />
                    ))}
                </Box>
            </CardContent>
        </Card>
    )
}