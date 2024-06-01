import { useState } from "react";
import { Container, Grid, FormControl, Typography, TextField, Button, Select, MenuItem, Breadcrumbs, Link, Slider } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const PrivateJob = () => {

    const [form, setForm] = useState({
        jobTitle: '',
        location: '',
        qualification: '',
        employmentType: '',
        experience: '',
        lastDateToApply: new Date(),
        description: '',
        salaryRange: [0, 40000],
    });
    document.title = "Post Private Job | MedLink Jobs";

    const formValueChange = (e) => {
        setForm((_form) => {
            let __form = { ..._form };
            __form[e.target.name] = e.target.value;
            return __form;
        });
        console.log(form)
    }

    return (
        <Container maxWidth="xl">
            <Grid container sx={{ gap: "1rem", marginBottom: "3rem", marginLeft: "2%", display: 'flex', flexDirection: 'column' }}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    sx={{ marginTop: '1%' }}
                >
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/jobs-and-responses"
                    >
                        {'Jobs & Responses'}
                    </Link>
                    <Typography color="text.primary">Private Job</Typography>
                </Breadcrumbs>
                <Typography variant="h2"
                    component="h2"
                    sx={{ fontSize: "22px", fontWeight: "600", color: "#333333" }}>
                    Post A Private Job
                </Typography>
                <Grid container>
                    <Grid item xs={7} maxWidth="xl" sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#80828282",
                        textAlign: "center",
                        paddingBlock: "2rem",
                        borderRadius: '10px'
                    }}>
                        <Grid container spacing={4}>
                            <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', marginLeft: '3%' }}>
                                <FormControl fullWidth>
                                    <Typography variant="p" sx={{ textAlign: 'left' }}>
                                        Job Title
                                    </Typography>
                                    <TextField
                                        variant="outlined"
                                        name="jobTitle"
                                        type="text"
                                        placeholder="Text"
                                        value={form.jobTitle}
                                        onChange={formValueChange}
                                        sx={{ backgroundColor: 'white', borderRadius: '6px' }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', marginLeft: '3%' }}>
                                <FormControl fullWidth>
                                    <Typography variant="p" sx={{ textAlign: 'left' }}>
                                        Location
                                    </Typography>
                                    <TextField
                                        variant="outlined"
                                        name="location"
                                        type="text"
                                        placeholder="Text"
                                        value={form.location}
                                        onChange={formValueChange}
                                        sx={{ backgroundColor: 'white', borderRadius: '6px' }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', marginLeft: '3%' }}>
                                <FormControl fullWidth>
                                    <Typography variant="p" sx={{ textAlign: 'left' }}>
                                        Qualification
                                    </Typography>
                                    <Select value={form.qualification} onChange={formValueChange} label="qualification" name="qualification" sx={{ backgroundColor: 'white', borderRadius: '6px' }}>
                                        <MenuItem value={'MBBS'}>MBBS</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', marginLeft: '3%' }}>
                                <FormControl fullWidth>
                                    <Typography variant="p" sx={{ textAlign: 'left' }}>
                                        Employment Type
                                    </Typography>
                                    <Select value={form.employmentType} onChange={formValueChange} label="employmentType" name="employmentType" sx={{ backgroundColor: 'white', borderRadius: '6px' }}>
                                        <MenuItem value={'Permanent'}>Permanent</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', marginLeft: '3%' }}>
                                <FormControl fullWidth>
                                    <Typography variant="p" sx={{ textAlign: 'left' }}>
                                        Experience
                                    </Typography>
                                    <TextField
                                        name="experience"
                                        type="text"
                                        variant="outlined"
                                        placeholder="Text"
                                        value={form.experience}
                                        onChange={formValueChange}
                                        sx={{ backgroundColor: 'white', borderRadius: '6px' }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={5} sx={{ display: 'flex', flexDirection: 'column', marginLeft: '3%' }}>
                                <FormControl fullWidth>
                                    <Typography variant="p" sx={{ textAlign: 'left' }}>
                                        Last Date to Apply
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            name="lastDateToApply"
                                            inputFormat="dd/MM/yyyy"
                                            value={form.lastDateToApply}
                                            onChange={(value) => { formValueChange({ target: { name: 'lastDateToApply', value: new Date(value) } }) }}
                                            renderInput={(params) => <TextField sx={{ backgroundColor: 'white', borderRadius: '6px' }} {...params} />}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                            <Grid item xs={11} sx={{ display: 'flex', flexDirection: 'column', marginLeft: '3%' }}>
                                <FormControl fullWidth>
                                    <Typography variant="p" sx={{ textAlign: 'left' }}>
                                        Description
                                    </Typography>
                                    <TextField
                                        name="description"
                                        type="text"
                                        variant="outlined"
                                        placeholder="Text"
                                        multiline
                                        rows={5}
                                        value={form.description}
                                        onChange={formValueChange}
                                        sx={{ backgroundColor: 'white', borderRadius: '6px' }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={11} sx={{ display: 'flex', flexDirection: 'column', marginLeft: '3%' }}>
                                <FormControl fullWidth>
                                    <Typography variant="p" sx={{ textAlign: 'left' }}>
                                        Salary Range
                                    </Typography>
                                    <Slider
                                        name="salaryRange"
                                        getAriaLabel={() => 'Salary range'}
                                        onChange={formValueChange}
                                        valueLabelDisplay="auto"
                                        value={form.salaryRange}
                                        min={0}
                                        max={40000}
                                        marks={[{ value: 0, label: '0' }, { value: 40000, label: '40000' }]}
                                        sx={{
                                            "& .MuiSlider-thumb": {
                                                height: 24,
                                                width: 24,
                                                color: 'white'
                                            },
                                            "& .MuiSlider-track": {
                                                height: 10,
                                                color: '#80828282'
                                            },
                                            "& .MuiSlider-rail": {
                                                height: 10,
                                                color: 'white'
                                            }
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginLeft: '3%', marginRight: '5%' }}>
                                <Button size="large" sx={{ backgroundColor: 'white', marginRight: '2%', borderRadius: '5px' }}>Cancel</Button>
                                <Button size="large" sx={{ backgroundColor: '#333333', borderRadius: '5px', color: 'white' }}>Create</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} maxWidth="xl" sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#80828282",
                        paddingBlock: "2rem",
                        marginLeft: '2%',
                        borderRadius: '10px'
                    }}>
                        <Typography variant="h2" align="left" component="h2" sx={{ fontSize: "22px", fontWeight: "600", color: "#333333", marginLeft: '5%' }}>TIPS</Typography>
                        <hr color="#333333" height="10px" width="85%" style={{ marginLeft: '5%' }} />
                        <ul style={{ marginLeft: '5%', marginTop: '2%', padding: '3%' }}>
                            <li style={{ marginBottom: '4%' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
                                quia sunt quam nam harum? Necessitatibus, alias! Sequi fuga error rem
                                temporibus animi.</li>
                            <li style={{ marginBottom: '4%' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
                                quia sunt quam nam harum? Necessitatibus, alias! Sequi fuga error rem
                                temporibus animi.</li>
                            <li style={{ marginBottom: '4%' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
                                quia sunt quam nam harum? Necessitatibus, alias! Sequi fuga error rem
                                temporibus animi.</li>
                            <li style={{ marginBottom: '4%' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
                                quia sunt quam nam harum? Necessitatibus, alias! Sequi fuga error rem
                                temporibus animi.</li>
                            <li style={{ marginBottom: '4%' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
                                quia sunt quam nam harum? Necessitatibus, alias! Sequi fuga error rem
                                temporibus animi.</li>
                            <li style={{ marginBottom: '4%' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
                                quia sunt quam nam harum? Necessitatibus, alias! Sequi fuga error rem
                                temporibus animi.</li>
                        </ul>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    );
};

export default PrivateJob;