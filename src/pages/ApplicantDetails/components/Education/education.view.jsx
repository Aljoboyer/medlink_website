import { Box, Card, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import CircularProgress from "@mui/material/CircularProgress";

const Education = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [educationDetails, setEducationDetails] = useState([]);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const QUERY_GETEDUCATIONLISTBYAPPLICANT = {
            query: `query MyQuery {
                getEducationListByApplicant(userID : "${props.userID}") {
                    yearOfPassing
                    universityID
                    university
                    specialization
                    qualification
                    healthcareIndustry
                    emID
                    course
                    courseType
                    eduID
                   }
                }`
        };
        gqlquery(QUERY_GETEDUCATIONLISTBYAPPLICANT, null)
            .then((res) => res.json())
            .then((datas) => {
                if (datas.data?.getEducationListByApplicant) {
                    setEducationDetails(datas.data?.getEducationListByApplicant);
                }
            })
            .finally((e) => setIsLoading(false));
    }, []);

    return (
        <Box>
            <Card 
            sx={{ 
                bgcolor: "var(--clr-white)", 
                boxShadow: !matches ? "0px 9px 18px rgba(69, 143, 246, 0.09)" : "0px 0px 0px 0px",
                border: !matches ? "" : "1px solid #E4EEF5" , 
                px: matches ? 1.25 : 2.5, 
                py: matches ? 1.25 : 2 
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ color: "var(--clr-blue-footer)", fontWeight: "bold", pb: matches ? 1.72 : 2 , fontSize: matches ? "18px" : "24px" }}
                    gutterBottom
                    component="div"
                >
                    Education
                </Typography>
                {
                    isLoading ? <Box sx={{ textAlign: "center" }}>
                        <CircularProgress color="inherit" />
                    </Box> : <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            gap: matches ? 1.7 : 3,
                        }}
                    >
                        {
                            educationDetails.length > 0 ? educationDetails?.map((info) => ( 
                                <Box 
                                    key={info.id}
                                    className="resume-content"
                                    sx={{ display: "flex", flexDirection: "column", pb: 2 }}
                                >  
                                    <Box sx={{ display: "grid", lineHeight: "24px" }}>
                                        <Typography variant="subtitle1" sx={{ fontSize: "1rem", fontWeight: 600 }}>{info?.course}</Typography>
                                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                            <Typography
                                                variant="info"
                                                sx={{
                                                fontSize: 12,
                                                color: "#828282",
                                                fontWeight: 600,
                                                }}
                                            >
                                                {info?.qualification}
                                            </Typography>
                                            <span style={{fontSize: 12, color: "#828282", fontWeight: "600"}}>,</span>&nbsp;
                                            <Typography
                                                variant="info"
                                                sx={{ fontSize: 12, color: "#828282", fontWeight: "600" }}
                                            >
                                                {info?.specialization}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="info"
                                            sx={{ fontSize: 12, color: "#828282", fontWeight: "600" }}
                                        >
                                            {info?.university}
                                        </Typography>
                                        <Typography
                                            variant="info"
                                            sx={{ fontSize: 12, color: "#828282" }}
                                        >
                                            {info?.yearOfPassing} • ({info?.courseType})
                                        </Typography>
                                    </Box>
                                </Box>
                            )) :

                                <Typography variant="body2"
                                    gutterBottom sx={{
                                        color: "var(--clr-gray-3)",
                                        fontSize: "14px",
                                        fontWeight: "600 !important",
                                        mb: 1,
                                    }}>
                                    No Details Found
                                </Typography>
                        }
                    </Box>
                }

            </Card>
        </Box>
    );
};

export default Education;

