import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useEffect, useState } from "react";
import { gqlOpenQuery } from "../../../api/hospitalIndex.js";

export default function BreadCrumbsView(props) {
    console.log(props)
    // const [getProfileByApplicant, setGetProfileByApplicant] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     // For defaut value
    //     const QUERY_GETPROFILEBYAPPLICANT = {
    //         query: `query MyQuery {
    //             getProfileByApplicant(userID : "${props.jaID}") { 
    //                 name  
    //                }
    //             }`
    //     };
    //     gqlOpenQuery(QUERY_GETPROFILEBYAPPLICANT, null)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data)
    //             setGetProfileByApplicant(data?.data?.getProfileByApplicant)
    //         })
    //         .finally((e) => setIsLoading(false))
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, []);
     

    return (
        <Box sx={{ mx: "auto" }}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
                sx={{ my: 2 }}
            >
                <Link underline="hover" style={{ color: "var(--clr-blue-footer)" }} href="/hospital-dashboard">
                    Dashboard
                </Link>
                <Link
                    underline="hover"
                    style={{ color: "var(--clr-blue-footer)" }}
                    href="/advance-search"
                >
                    Resume Database
                </Link>
                <Link
                    underline="hover"
                    style={{ color: "var(--clr-blue-footer)" }}
                    href="/advance-search"
                >
                    Search Resume
                </Link>
                <Typography style={{ color: "var(--clr-blue-footer)" }}>
                    {props?.data?.state?.jobTitle ||  "Result"}  
                </Typography>
                <Typography style={{ color: "var(--clr-blue-footer)" }}>
                   Single Profile
                </Typography>
            </Breadcrumbs>
        </Box>
    );
}
