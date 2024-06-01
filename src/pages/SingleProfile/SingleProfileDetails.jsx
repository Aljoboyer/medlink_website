import { Box, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import SingleProfileView from "./SingleProfileView";
// import { ApplicantBio, Education, Experience, KeySkills, Accomplishments, PersonalDetails, Resume, Career } from "./components";
// import AddTags from "./components/AddTags";
// import HRComment from "./components/HRComment/HRComment.view";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
import { gqlquery, QUERY_GETACTIVESUBSCRIPTIONS } from "../../api/hospitalIndex";
import useAuth from "../../hooks/useAuth";
import { Accomplishments, Education, Experience, KeySkills, PersonalDetails, Resume } from "../ApplicantDetails/components";
import AddTags from "../ApplicantDetails/components/AddTags";
import HRComment from "../ApplicantDetails/components/HRComment/HRComment.view";
import ToastTitle from "../ToastTitle";
import ApplicantBio from "./component/ApplicantsBio";
import BreadCrumbsView from "./component/BreadCrumbsView";

// AccessJob posting
export const ShowForAccessJobPosting = (props) => {
    const { getUserRole, permitUser, isLoading } = useAuth();

    useEffect(() => {
        getUserRole();
    }, [])

    if (!isLoading) {
        return permitUser?.accessJobPosting || permitUser?.adminUser ? props.children : <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2017/02/Fix-Access-Denied-Folder-Featured.jpg?q=50&fit=contain&w=1500&h=750&dpr=1.5" style={{ width: "100%", height: "auto" }} alt="Accecss_denied" />;
    }
    else {
        return (
            <Box maxWidth="xl" sx={{ px: 6, mx: "auto" }}>
                <Skeleton sx={{ my: 2, width: "60%", py: 1 }} />
                <Skeleton variant="rectangular" sx={{ width: "100%", mb: 3, borderRadius: 2 }} height={100} />
                <Box sx={{ p: 2, bgcolor: "#ffffff", boxShadow: "5px 19px 28px rgba(69, 143, 246, 0.09)", borderRadius: 1, mb: 5 }}>
                    <Skeleton sx={{ width: "30%" }} />
                    <Skeleton sx={{ py: 3, mx: 3 }} />
                    <Skeleton sx={{ width: "30%", mt: 3 }} />
                    <Skeleton sx={{ width: "90%", height: 70 }} />
                    <Skeleton sx={{ width: "30%", mt: 3 }} />
                    <Skeleton sx={{ width: "90%", height: 100 }} />
                    <Skeleton sx={{ width: "30%", mt: 3 }} />
                    <Skeleton sx={{ width: "90%", height: 130 }} />
                </Box>
            </Box>
        );
    }

}

export default function SingleProfileDetails(props) {
    const { jaID, vacancyID, userID } = useParams();
    const location = useLocation();
    console.log(location.state);
    const vacancyTitle = location.state?.jobTitle;
    // const userID = location.state?.userID;
    const apllicantEmail = location.state?.data?.email;
    const applicantPhone = location.state?.data?.phone;
    const isVerified = location.state?.data?.phoneVerified;
    const profilePic = location.state?.picture?.response?.content;
    const [resumeHeadline, setResumeHeadline] = useState();
    const [activeSubscription, setActiveSubscription] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [location.pathname]);

    useEffect(() => {
        gqlquery(QUERY_GETACTIVESUBSCRIPTIONS, null)
            .then((res) => res.json())
            .then((data) => {
                setActiveSubscription(data?.data?.getActiveSubscriptions);
            })
            .finally(() => setInitialLoading(false));
    }, []);

    // Verify Access
    const accessResumeDBObj = activeSubscription?.find(aS => aS?.type === "ResumeDB"); 

    if (!initialLoading) {
        return (
            <ShowForAccessJobPosting>
                {((accessResumeDBObj?.validUpto >= new Date().toISOString().slice(0, 10)) && accessResumeDBObj?.creditsLeft > 0) ? (
                    <Box maxWidth="xl" sx={{ px: 6, mx: "auto" }}>
                        <BreadCrumbsView jaID={userID || jaID} data={location} linkOfJob={location.state?.link} />
                        <Box
                            sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3, mb: 8, mx: "auto" }}
                        >
                            <AddTags jaID={jaID} vacancyTitle={vacancyTitle} />
                            <HRComment jaID={jaID} vacancyID={vacancyID} userID={userID} />
                            <SingleProfileView jaID={jaID || userID} />
                            <ApplicantBio userID={userID} profilePic={profilePic} data={location?.state?.data} resumeHeadline={resumeHeadline} />
                            <KeySkills userID={userID} />
                            {/* <Career userID={userID} /> */}
                            <Education userID={userID} />
                            <Experience userID={userID} />
                            <Accomplishments userID={userID} />
                            <PersonalDetails userID={userID} />
                            <Resume userID={userID} setResumeHeadline={setResumeHeadline} />
                        </Box>
                    </Box>
                ) : (
                    <ToastTitle />
                )}
            </ShowForAccessJobPosting>
        );

    } else {
        return (
            <Box maxWidth="xl" sx={{ px: 6, mx: "auto" }}>
                <Skeleton sx={{ my: 2, width: "60%", py: 1 }} />
                <Skeleton variant="rectangular" sx={{ width: "100%", mb: 3, borderRadius: 2 }} height={100} />
                <Box sx={{ p: 2, bgcolor: "#ffffff", boxShadow: "5px 19px 28px rgba(69, 143, 246, 0.09)", borderRadius: 1, mb: 5 }}>
                    <Skeleton sx={{ width: "30%" }} />
                    <Skeleton sx={{ py: 3, mx: 3 }} />
                    <Skeleton sx={{ width: "30%", mt: 3 }} />
                    <Skeleton sx={{ width: "90%", height: 70 }} />
                    <Skeleton sx={{ width: "30%", mt: 3 }} />
                    <Skeleton sx={{ width: "90%", height: 100 }} />
                    <Skeleton sx={{ width: "30%", mt: 3 }} />
                    <Skeleton sx={{ width: "90%", height: 130 }} />
                </Box>
            </Box>
        )
    }
}
