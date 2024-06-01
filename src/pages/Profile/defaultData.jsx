import profileImg from "../../assets/profile.png";
import Resume from "./Components/Resume";
import Specializations from "./Components/Specializations";
import Education from "./Components/Education";
import Experience from "./Components/Experience";
import Accomplishments from "./Components/Accomplishments";
import PersonalDetails from "./Components/PersonalDetails";
import CareerProfile from "./Components/CareerProfile/CareerProfile.view";

export const profileData = {
  image: profileImg,
  name: "Manoj Kumar",
  specilization: "Cardiologist",
  location: "Bangalore",
  experience: 7,
  salary: "10 Lakhs and 50 Thousand",
  number: "+91 9009090909",
  email: "manoj@gmail.com",
  strength: 90,
};

export const tabsData = [
  { name: "Resume", component: <Resume /> },
  // { name: "Specializations", component: <Specializations /> },
  { name: "Education", component: <Education /> },
  { name: "Experience", component: <Experience /> },
  { name: "Accomplishments", component: <Accomplishments /> },
  { name: "Personal Details", component: <PersonalDetails /> },
  { name: "Desired Career Profile", component: <CareerProfile /> },
];
