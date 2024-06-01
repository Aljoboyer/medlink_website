import { Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { /* Home, */ Signup, Signup2, Login, Profile, UsersList, JobsAndResponses, RegisterHospital, HospitalLogin, CreateVacancy, HospitalDashboard, ApplicantDetails, ToastTitle, ManageJobsAndResponses, JobTitle, SavedSearches, PersonalFolders, EmailTemplates, SMSTemplates, Notifications, Reminders, SubscriptionStatus, CompanyProfile, AdvanceSearch, SearchResumeResult, AccountDetails, PricingPlans, Checkout, JobSearchList, SingleJob, NotificationsMini, RemindersMini, CompanyProfileMini, CheckoutMini, PricingPlansMini, ApplicantDetailsMini, SearchResumeMini, SignUp2FormMob, HospitalDashboardMob, ManageUsersMob, CreateVacanciesMob, PostJobMob, ManageJobsAndResponesMob, JobTitleMob, AdvanceSearchMob, SavedSearchesMob, PersonalFoldersMob, EmailTemplateMob, SMSTemplatesMob, SubscriptionStatusMob, ProfileMob, CreateSMS, CreateEmail, SearchSingleProfile, SearchSingleProfileMini, ForgotPassword, CreateNewPassword, ContactUs, BasicDetails, ProfileHome, SavedJobs, AccountSettings, JobSearchListMini, SingleJobMini, ContactUsMini, SavedJobsMini, ProfileHomeMini, ProfileListFolder, EditBasicDetails, PrimaryHome, RecommandedJobs, FAQ, ManageAlert, AboutUs, TermAndUsage, PrivacyPolicy } from "./pages";
import ROUTES from "./routes";
import "./App.css";
import PostJob from "./pages/PostJob";
import HospitalSignUp from "./pages/HospitalSignUp/HospitalSignUp.view";
import FeaturedHospital from "./pages/FeaturedHospital/FeaturedHospital.view";
import SingleProfileDetails from "./pages/SingleProfile/SingleProfileDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<PrimaryHome />} />
        <Route exact path={ROUTES.SIGNUP} element={<Signup />} />
        <Route exact path={ROUTES.SIGNUP2} element={<Signup2 />} />
        <Route exact path={ROUTES.PROFILE} element={<Profile />} />
        <Route exact path={ROUTES.LOGIN} element={<Login />} />
        <Route exact path={ROUTES.USERLIST} element={<UsersList />} />
        <Route exact path={ROUTES.POSTPRIVATEJOB} element={<JobsAndResponses />} />
        <Route exact path={ROUTES.MANAGEJOBSANDRESPONSES} element={<ManageJobsAndResponses />} />
        <Route exact path={ROUTES.CREATEVACANCIES} element={<CreateVacancy />} />
        <Route exact path={ROUTES.POSTJOB} element={<PostJob />} />
        <Route exact path={ROUTES.JOBTITLE} element={<JobTitle />} />
        <Route exact path={ROUTES.CREDITEXPIRED} element={<ToastTitle />} />
        <Route exact path={ROUTES.REGISTERHOSPITAL} element={<RegisterHospital />} />
        <Route exact path={ROUTES.HOSPITALSIGNUP} element={<HospitalSignUp />} />
        <Route exact path={ROUTES.HOSPITALSIGNUP1} element={<HospitalSignUp />} />
        <Route exact path={ROUTES.HOSPITALLOGIN} element={<HospitalLogin />} />
        <Route exact path={ROUTES.HOSPITALDASHBOARD} element={<HospitalDashboard />} />
        <Route exact path={ROUTES.APPLICANTDETAILS} element={<ApplicantDetails />} />
        <Route exact path={ROUTES.APPLICANTDETAILS2} element={<ApplicantDetails />} />
        <Route exact path={ROUTES.SINGLEPROFILE} element={<SingleProfileDetails />} />
        <Route exact path={ROUTES.SAVEDSEARCHES} element={<SavedSearches />} />
        <Route exact path={ROUTES.PERSONALFOLDERS} element={<PersonalFolders />} />
        <Route exact path={ROUTES.EMAILTEMPLATES} element={<EmailTemplates />} />
        <Route exact path={ROUTES.SMSTEMPLATES} element={<SMSTemplates />} />
        <Route exact path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
        <Route exact path={ROUTES.REMINDERS} element={<Reminders />} />
        <Route exact path={ROUTES.SUBSCRIPTIONSTATUS} element={<SubscriptionStatus />} />
        <Route exact path={ROUTES.COMPANYPROFILE} element={<CompanyProfile />} />
        <Route exact path={ROUTES.ADVANCESEARCH} element={<AdvanceSearch />} />
        <Route exact path={ROUTES.SEARCHRESUMERESULT} element={<SearchResumeResult />} />
        <Route exact path={ROUTES.ACCOUNTDETAILS} element={<AccountDetails />} />
        <Route exact path={ROUTES.PRICINGPLANS} element={<PricingPlans />} />
        <Route exact path={ROUTES.CHECKOUTPLAN} element={<Checkout />} />
        <Route exact path={ROUTES.JOBSEARCHLIST} element={<JobSearchList />} />
        <Route exact path={ROUTES.SINGLEJOBSEARCH} element={<SingleJob />} />
        <Route exact path={ROUTES.NOTIFICATIONSMINI} element={<NotificationsMini />} />
        <Route exact path={ROUTES.REMINDERSMINI} element={<RemindersMini />} />
        <Route exact path={ROUTES.COMPANYPROFILEMINI} element={<CompanyProfileMini />} />
        <Route exact path={ROUTES.CHECKOUTPLANMINI} element={<CheckoutMini />} />
        <Route exact path={ROUTES.PRICINGPLANMINI} element={<PricingPlansMini />} />
        <Route exact path={ROUTES.APPLICANTDETAILSMINI} element={<ApplicantDetailsMini />} />
        <Route exact path={ROUTES.SEARCHRESUMEMINI} element={<SearchResumeMini />} />
        <Route exact path={ROUTES.SIGNUP2FORMMOB} element={<SignUp2FormMob />} />
        <Route exact path={ROUTES.HOSPITALDASHBOARDMOB} element={<HospitalDashboardMob />} />
        <Route exact path={ROUTES.MANAGEUSERSMOB} element={<ManageUsersMob />} />
        <Route exact path={ROUTES.CREATEVACANCYMOB} element={<CreateVacanciesMob />} />
        <Route exact path={ROUTES.POSTJOBMOB} element={<PostJobMob />} />
        <Route exact path={ROUTES.MANAGEJOBSANDRESPONESMOB} element={<ManageJobsAndResponesMob />} />
        <Route exact path={ROUTES.JOBTITLEMOB} element={<JobTitleMob />} />
        <Route exact path={ROUTES.ADVANCESEARCHMOB} element={<AdvanceSearchMob />} />
        <Route exact path={ROUTES.SAVEDSEARCHESMOB} element={<SavedSearchesMob />} />
        <Route exact path={ROUTES.PERSONALFOLDERSMOB} element={<PersonalFoldersMob />} />
        <Route exact path={ROUTES.EMAILTEMPLATESMOB} element={<EmailTemplateMob />} />
        <Route exact path={ROUTES.SMSTEMPLATESMOB} element={<SMSTemplatesMob />} />
        <Route exact path={ROUTES.SUBSCRIPTIONSTATUSMOB} element={<SubscriptionStatusMob />} />
        <Route exact path={ROUTES.PROFILEMOB} element={<ProfileMob />} />
        <Route exact path={ROUTES.CREATESMS} element={<CreateSMS />} />
        <Route exact path={ROUTES.CREATEEMAIL} element={<CreateEmail />} />
        <Route exact path={ROUTES.SEARCHSINGLEPROFILE} element={<SearchSingleProfile />} />
        <Route exact path={ROUTES.SEARCHPROFILEMINI} element={<SearchSingleProfileMini />} />
        <Route exact path={ROUTES.FORGOTPASSWORD} element={<ForgotPassword />} />
        <Route exact path={ROUTES.CREATENEWPASSWORD} element={<CreateNewPassword />} />
        <Route exact path={ROUTES.CONTACTUS} element={<ContactUs />} />
        <Route exact path={ROUTES.BASICDETAILS} element={<BasicDetails />} />
        <Route exact path={ROUTES.PROFILEHOME} element={<ProfileHome />} />
        <Route exact path={ROUTES.SAVEDJOBS} element={<SavedJobs />} />
        <Route exact path={ROUTES.ACCOUNTSETTINGS} element={<AccountSettings />} />
        <Route exact path={ROUTES.JOBSEARCHLISTMINI} element={<JobSearchListMini />} />
        <Route exact path={ROUTES.SINGLEJOBMINI} element={<SingleJobMini />} />
        <Route exact path={ROUTES.CONTACTUSMINI} element={<ContactUsMini />} />
        <Route exact path={ROUTES.SAVEDJOBSMINI} element={<SavedJobsMini />} />
        <Route exact path={ROUTES.PROFILEHOMEMINI} element={<ProfileHomeMini />} />
        <Route exact path={ROUTES.PROFILELISTFOLDER} element={<ProfileListFolder />} />
        <Route exact path={ROUTES.FEATUREDHOSPITAL} element={<FeaturedHospital />} />
        <Route exact path={ROUTES.EDITBASICDETAILS} element={<EditBasicDetails />} />
        <Route exact path={ROUTES.PRIMARYHOME} element={<PrimaryHome />} />
        <Route exact path={ROUTES.RECOMMANDEDJOBS} element={<RecommandedJobs />} />
        <Route exact path={ROUTES.FAQ} element={<FAQ />} />
        <Route exact path={ROUTES.MANAGEALERT} element={<ManageAlert />} />
        <Route exact path={ROUTES.ABOUTUS} element={<AboutUs />} />
        <Route exact path={ROUTES.TERMSANDUSAGE} element={<TermAndUsage />} />
        <Route exact path={ROUTES.PRIVACYPOLICY} element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;