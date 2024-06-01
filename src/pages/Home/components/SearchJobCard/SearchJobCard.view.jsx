import { Card, CardContent, CardActions, Typography, Box, Button } from "@mui/material";

export default function SearchJobCardView() {
    return (
        <Card sx={{ borderRadius: '10px', backgroundColor: '#f5f5f5' }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ marginTop: '3%', fontSize: '22px' }}>
                    <b>Search Jobs on the Go !!</b>
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '1%' }}>
                    <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel lorem nisi. Morbi facilisis a leo ut sollicitudin. Praesent pulvinar placerat sem, eget cursus orci tempus vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                <Button size="large" sx={{
                    borderRadius: '10px', backgroundColor: '#white', color: "var(#333333) !important"
                }}>Register</Button>
                <Button size="large" sx={{ borderRadius: '10px', backgroundColor: 'blue', color: "var(--clr-white) !important" }}>Upload CV</Button>
            </CardActions>
        </Card>
    )
}