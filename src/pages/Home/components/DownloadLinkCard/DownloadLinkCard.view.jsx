import { Card, CardContent, Button, CardActions, Box, TextField, InputAdornment, Typography } from '@mui/material';

export default function DownloadLinkCardView() {
    return (
        <Card sx={{ borderRadius: '10px', backgroundColor: '#f5f5f5' }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: '5%', marginBottom: '5%', textAlign: 'center', fontSize: '26px' }}>
                    <b>Search Jobs on the Go !!</b>
                </Typography>
                <Box sx={{ marginTop: '10%', display: 'flex', justifyContent: 'space-evenly' }}>
                    <TextField
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        sx={{ borderRadius: '6px', width: '40%' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <Typography>+91</Typography>
                                </InputAdornment>
                            )
                        }} />
                    <Button sx={{ color: 'white !important', backgroundColor: 'blue !important', borderRadius: '10px', height: 50, width: '35%' }} size="small">Get Download Link</Button>
                </Box>
            </CardContent>
            <CardActions sx={{ marginTop: '3%', display: 'flex' }}>
                <Typography sx={{ textAlign: 'center', marginLeft: '10%' }}>Available on both iOS & Android devices
                </Typography>
                <img src="https://www.iscout.com/_nuxt/pages/features/shared/mobile-features/google-play-badge.jpg?h=c16cf640" height="30px" alt="google_play_store" />
                <img src="https://freeiconshop.com/wp-content/uploads/edd/app-store-badge.png" height="70px" alt="apple_store" />
                {/* <Button align="right" size="large" sx={{ float: 'right', backgroundColor: '#333333', color: "var(--clr-white) !important" }}>Create Join Alert</Button> */}
            </CardActions>
        </Card>
    )
}