import { Box, Breadcrumbs, Typography, Link, useMediaQuery, useTheme } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useEffect, useState } from "react";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import { /* Link, */ useNavigate } from "react-router-dom";

export default function BreadCrumbsView(props) {
    const navigate = useNavigate();
    // console.log(props)
    const [getProfileByApplicant, setGetProfileByApplicant] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        // For defaut value
        const QUERY_GETPROFILEBYAPPLICANT = {
            query: `query MyQuery {
                getProfileByApplicant(userID : "${props.jaID}") { 
                    name  
                   }
                }`
        };
        gqlquery(QUERY_GETPROFILEBYAPPLICANT, null)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
                setGetProfileByApplicant(data?.data?.getProfileByApplicant)
            })
            .finally((e) => setIsLoading(false))
            .catch((err) => {
                console.log(err)
            })
    }, []);


    return (
        <Box maxWidth="md" sx={{ mx: "auto" }}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" sx={{color: "var(--clr-blue-footer)"}} />}
                aria-label="breadcrumb"
                sx={{ my: 2 }}
            >
                <Link underline="hover" style={{ color: "var(--clr-blue-footer)", /* fontSize: !matches ? "14px" : "12px",*/  cursor: "pointer" }} onClick={() => navigate("/hospital-dashboard")}>
                    Dashboard
                </Link>
                {
                    props?.data?.state?.from?.includes("job-title") && (
                        <Link
                            underline="hover"
                            style={{ color: "var(--clr-blue-footer)", /* fontSize: !matches ? "14px" : "12px",*/  cursor: "pointer" }} onClick={() => window.history.go(-2)}
                        >
                            Manage Jobs & Responses
                        </Link>
                    )
                }
                {
                    props?.data?.state?.from?.includes("job-title") && (
                        <Link underline="hover" style={{ color: "var(--clr-blue-footer)", /* fontSize: !matches ? "14px" : "12px",*/  cursor: "pointer" }} onClick={() => window.history.back()}>
                            {props?.data?.state?.jobTitle}
                        </Link>
                    )
                }

                {
                    props?.data?.state?.from?.includes("Resume Search") && (
                        <Link underline="hover" style={{ color: "var(--clr-blue-footer)", /* fontSize: !matches ? "14px" : "12px",*/  cursor: "pointer" }} onClick={() => window.history.back()}>
                            {props?.data?.state?.searchQueryInfo !== "" ? props?.data?.state?.from : "Resume Search"}
                        </Link>
                    )
                }

                {
                    props?.data?.state?.from?.includes("profile-list-folder") && (
                        <Link underline="hover" style={{ color: "var(--clr-blue-footer)", /* fontSize: !matches ? "14px" : "12px",*/  cursor: "pointer" }} onClick={() => window.history.back()}>
                            {props?.data?.state?.folderName}
                        </Link>
                    )
                }

                <Typography underline="hover" style={{ color: "var(--clr-blue-footer)", /* fontSize: !matches ? "14px" : "12px", cursor: "pointer" */ }} >
                    {getProfileByApplicant?.name}'s Details
                </Typography>
                {/* <Typography style={{ color: "var(--clr-blue-footer)", fontSize: !matches ? "14px" : "12px" }}>
                    {getProfileByApplicant?.name}'s Details
                </Typography> */}
            </Breadcrumbs>
        </Box>
    );
}
