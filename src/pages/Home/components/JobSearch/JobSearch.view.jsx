import { Button, TextField, InputAdornment, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SearchButton = styled(Button)(() => ({
    color: "var(--clr-white) !important",
}));

export default function JobSearchView() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        jobTitle: "",
        location: ""
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleJobsSearch = () => {
        const handleNavigate = () => {
            navigate("/job-search-list", { state: values });
        };
        setTimeout(handleNavigate, 1000);
    }


    return (
        <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
                <TextField
                    name="jobTitle"
                    onChange={handleChange("jobTitle")}
                    placeholder="Job Title"
                    sx={{ backgroundColor: 'white', width: '95%', borderTopLeftRadius: '7px', borderBottomLeftRadius: '7px', zIndex: '1', '& .MuiInputBase-input': { height: 31 } }}
                />
                <TextField
                    name="location"
                    placeholder="Location"
                    onChange={handleChange("location")}
                    sx={{ backgroundColor: 'white', size: 'large', width: '105%', borderTopRightRadius: '7px', borderBottomRightRadius: '7px', zIndex: '1', '& .MuiInputBase-input': { height: 31 } }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchButton onClick={handleJobsSearch} color="primary" edge="end" size="large" sx={{ backgroundColor: 'blue', color: 'white', borderRadius: '5px', width: 110 }}>
                                    Search
                                </SearchButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Typography sx={{ color: '#333333' }}>Popular searches:  <Link sx={{ color: 'black', textDecorationColor: 'black' }}>Physio</Link> <Link sx={{ color: 'black', textDecorationColor: 'black' }}>Ayurveda</Link> <Link sx={{ color: 'black', textDecorationColor: 'black' }}>Homeopathy</Link> <Link sx={{ color: 'black', textDecorationColor: 'black' }}>Nurse</Link></Typography>
                <Link sx={{ color: 'white', textDecorationColor: 'white', float: 'right' }}>Advanced Search</Link>
            </div>
        </div>
    )
}