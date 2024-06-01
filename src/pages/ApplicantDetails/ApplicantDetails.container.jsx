import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ApplicantDetailsView from "./ApplicantDetails.view";
import { Accomplishments, ApplicantBio, Career, Education, Experience, KeySkills, PersonalDetails, Resume } from "./components";
import AddTags from "./components/AddTags";
import BreadCrumbsView from "./components/BreadCrumbs/BreadCrumbs.view";
import HRComment from "./components/HRComment/HRComment.view";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import is from "date-fns/esm/locale/is/index.js";
import ApplicantDetailsSkeleton from "./ApplicantDetailsSkeleton.view";

// AccessJob posting
export const ShowForAccessJobPosting = (props) => {
    const { getUserRole, permitUser, isLoading } = useAuth();

    useEffect(() => {
        getUserRole();
    }, [])

    if (!isLoading) {
        return permitUser?.accessJobPosting || permitUser?.adminUser ? (
          props.children
        ) : (
          <img
            src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Fix-Access-Denied-Folder-Featured.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5"
            style={{ width: "100%", height: "auto" }}
            alt="Accecss_denied"
          />
        );
      } else {
        return <ApplicantDetailsSkeleton />;
      }

    // return permitUser?.accessJobPosting || permitUser?.adminUser ? props.children : <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Fix-Access-Denied-Folder-Featured.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5" style={{ width: "100%", height: "auto" }} alt="Accecss_denied" />;
}

export default function ApplicantDetails(props) {
    const { userID } = useParams();
    const location = useLocation();
    const vacancyTitle = location.state?.jobTitle;
    // const userID = location.state?.userID;
    const apllicantEmail = location.state?.data?.email;
    const applicantPhone = location.state?.data?.phone;
    const isVerified = location.state?.data?.phoneVerified;
    const profilePic = location.state?.picture?.response?.content;
    const jaID = location.state?.jaID;
    const vacancyID = location.state?.vacancyID;
    const [resumeHeadline, setResumeHeadline] = useState();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    document.title = "Applicant’s Profile | MedLink Jobs";

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [location.pathname]);
    
    return (
        <ShowForAccessJobPosting>
               <>
                  {
                    matches &&
                    <Box sx={{ backgroundColor: "var(--clr-blue-light)", padding: "15px 0 15px 17px" , display: "flex", alignItems: "center"}}>
                    <ArrowBackIosNewIcon sx={{color: "var(--clr-blue-footer)", mr: 3.1}}/><Typography variant="h6" sx={{ lineHeight: "24px", fontSize: "16px", fontWeight: "600", color: "var(--clr-blue-footer)" }}>Applicant’s Profile</Typography>
                    </Box>
                    }
               </>
            <Box sx={{px: matches && "16px"}}>
                {
                    !matches &&
                <BreadCrumbsView jaID={userID || jaID} data={location} linkOfJob={location.state?.link} />
                }
                <Box
                    maxWidth="md"
                    sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3, mb: 8, mx: "auto" }}
                >
                    <AddTags jaID={jaID} vacancyTitle={vacancyTitle} userID={userID} />
                    <HRComment jaID={vacancyID} vacancyID={vacancyID} userID={userID}/>
                    <ApplicantDetailsView jaID={jaID || userID} />
                    <ApplicantBio userID={userID} profilePic={profilePic} data={location?.state?.data} resumeHeadline={resumeHeadline} />
                    {/* <KeySkills userID={userID} /> */}
                    <Career userID={userID} />
                    <Education userID={userID} />
                    <Experience userID={userID} />
                    <Accomplishments userID={userID} />
                    <PersonalDetails userID={userID} />
                    <Resume userID={userID} setResumeHeadline={setResumeHeadline} />
                </Box>
            </Box>
        </ShowForAccessJobPosting>
    );
}
