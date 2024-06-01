import { Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileSnapMob from "./Components/ProfileSnap";
import ResumeMob from "./Components/Resume";
import AddSkillMob from "./Components/Specialization";
import EducationMob from "./Components/Education/EducationMob.view";
import ExperienceMob from "./Components/ExperienceMob/ExperienceMob.view";
import Accomplishments from "./Components/AccomplishmentMob/AccomplishmentMob.view";
import PersonalDetailsMob from "./Components/PersonalDetailsMob/PersonalDetailsMob.view";
import CareerProfileMob from "./Components/CareerProfileMob/CareerProfileMob.view";

export default function ProfileMob() {
  return (
    <Box>
      {/* My profile at the top  */}
      <Box
        sx={{
          backgroundColor: "#E0E0E0",
          padding: "15px 0 15px 17px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <MenuIcon sx={{ height: "24px", width: "24px" }} />
        <Typography sx={{ lineHeight: "24px", fontWeight: "600" }}>
          My Profile
        </Typography>
      </Box>

      {/* Main profile  */}
      <ProfileSnapMob />
      {/* Resume  */}
      <ResumeMob />
      {/* Add Skills  */}
      <AddSkillMob />
      {/* Education  */}
      <EducationMob />
      {/* Experience  */}
      <ExperienceMob />
      {/* Accomplishment  */}
      <Accomplishments />
      {/* Personal Details  */}
      <PersonalDetailsMob />
      {/* Career Profile  */}
      <CareerProfileMob />
    </Box>
  );
}
