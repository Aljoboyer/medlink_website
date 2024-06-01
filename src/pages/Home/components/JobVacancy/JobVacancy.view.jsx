import { Grid, Typography, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import { MenuItem } from './components';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
};

export default function JobVacancyView(props) {
    const [value, setValue] = useState(0);
    const [tabsData, setTabsData] = useState([{
        name: 'menuItem1', component: <MenuItem />
    },
    { name: 'menuItem2', component: <MenuItem /> },
    { name: 'menuItem3', component: <MenuItem /> },
    ]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Grid container sx={{ display: 'flex' }}>
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '6%', paddingBottom: '7%', paddingLeft: '15%', paddingRight: '15%' }}>
                <div>
                    <Typography sx={{ textAlign: 'center', fontSize: '36px', color: '#333333' }}><b>Find Job Vacancies by</b></Typography>
                </div>
                <div style={{ marginTop: '2%', width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile={true}
                        aria-label="basic tabs"
                    >
                        {tabsData.map((tab) => (
                            <Tab label={tab.name} key={tab.name} />
                        ))}
                    </Tabs>
                    {tabsData.map((tab, i) => (
                        <TabPanel value={value} index={i} key={tab.name}>
                            {tab.component}
                        </TabPanel>
                    ))}
                </div>
            </Grid>
        </Grid>
    )
}