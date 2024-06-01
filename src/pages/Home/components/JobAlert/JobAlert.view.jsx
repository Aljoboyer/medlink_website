import { Button, Card, CardContent, CardActions, Typography } from '@mui/material';

export default function JobAlertView() {
    return (
        <Card sx={{ maxWidth: 345, position: 'absolute', marginTop: '16%', marginLeft: '70%', borderRadius: '10px', backgroundColor: '#f5f5f5' }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Free Job Alert
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Card description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel lorem nisi. Morbi facilisis.
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                <Button align="right" size="large" sx={{ float: 'right', backgroundColor: '#333333', color: "var(--clr-white) !important" }}>Create Join Alert</Button>
            </CardActions>
        </Card>
    )
}