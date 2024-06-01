import React, { useEffect, useMemo } from "react";
import {
  Box,
  Breadcrumbs,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import aboutUsImage from "../../assets/images/aboutUsImage.svg";
import { useLocation, Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MenuIcon from "@mui/icons-material/Menu";

export default function TermAndUsage() {
  const { pathname } = useLocation();
  const matches = useMediaQuery("(max-width: 900px)");
  document.title = "Terms Of Usage | MedLink Jobs";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Box sx={{ px: matches ? "12px" : "60px" }}>
      <Box sx={{ py: 1 }}>
        <Breadcrumbs
          separator={
            <NavigateNextIcon fontSize="small" sx={{ color: "#395987" }} />
          }
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            style={{ color: "#395987", fontSize: "14px" }}
            to="/"
          >
            Home
          </Link>
          <Typography sx={{ color: "#395987", fontSize: "14px" }}>
            Terms of Usage
          </Typography>
        </Breadcrumbs>
      </Box>
      <Typography
        sx={{
          fontSize: matches ? "22px" : "24px",
          color: "#395987",
          fontWeight: "600",
          mt: matches ? 1.2 : 2,
        }}
      >
        MedLink - TERMS OF USAGE
      </Typography>
      <Box
        sx={{
          boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
          borderRadius: "6px",
          mt: "24px",
          mb: matches ? "40px" : "65px",
        }}
      >
        <Box
          sx={{
            pl: matches ? "17px" : "70px",
            pr: "12px",
            pt: matches ? "18px" : "63px",
            mb: matches ? "34px" : "80px",
          }}
        >
          <Grid container spacing={matches ? 0 : 2}>
            <Grid item xs={12} md={12}>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                I. Introduction
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                Thank you for using MedLink, a career advancement resource for
                healthcare professionals and organisations. Among other
                services, MedLink provides an online job bank and informational
                resource related to the healthcare industry located at{" "}
                <a href="www.medlinkjobs.com" target="_blank" style={{color: "blue"}}>
                 <u>www.medlinkjobs.com</u> 
                </a> {" "}
                and operated by MedLink Health Care Private Limited. to assist
                physicians and other healthcare providers in finding a new
                position and furthering their careers and to help healthcare
                employers locate the right physicians to fill open positions and
                manage ongoing recruitment processes. MedLink’s mission is to
                help healthcare organisations build the physician teams that
                heal the communities they serve by connecting job-seeking
                healthcare professionals and providers with the organisations
                that need their expertise. <br /> <br />
                Before you dive in and begin your search, however, there’s
                important legal terms you need to know. These Terms of use
                (these <b>“Terms of usage”</b>) set forth the legally binding
                conditions that govern i) your use of the Website and its
                Services, (ii) your subscription or membership with MedLink or
                its Services; (iii) your Account with MedLink, if any, and (iv)
                all web pages, features, functionality, applications, content,
                and other products and services made available by us on or
                through the Website. This Website applies to Members, Employers,
                Agencies, RPO Providers and Non-Registered users. Capitalized
                terms used in these Terms of use shall have the meanings defined
                in the text of these Terms of use or if not defined therein, as
                defined in <b>Section II</b> below.  <br /> <br />
                Subject to the provisions of these Terms of use:  <br /> <br />
                <ul>
                  <li>
                    If you are an Employer, Agency or RPO Provider after you
                    subscribe to MedLink as a subscriber you will be able use
                    the Website and the Services outlined in your Employer
                    Contract or Agency Contract (collectively, referred to as
                    your “Contract”), as applicable, which include, but may not
                    be limited to (i) creating an Account; (ii) posting job
                    opportunities to the Job Bank, (iii) searching, finding and
                    reviewing Member Profiles; and (iv) utilization of our
                    Recruitment Management System solution. Depending on the
                    Services you subscribe to in your Contract, through the
                    Recruitment Management System solution, you may be able to
                    upload, store and manage Personal Information and
                    Professional Information for candidates and job applicants
                    submitted directly to you or obtained by you through third
                    party sources other than MedLink (your “Employer Candidate
                    Data”). To be accepted as an Employer, RPO Provider or
                    Agency, you must meet the requirements provided in these
                    Terms of use, and any other requirements posted on the
                    Website or required by us from time to time. Member Profiles
                    are included in the Member Database in the manner set forth
                    in these Terms of use and, as may be determined by such
                    Member, from time to time. If you find a Member that matches
                    your needs, you (and not we) are responsible to contact that
                    individual personally and negotiate a mutually acceptable
                    arrangement by which you may engage or employ such Member.
                    Please note, MedLink reserves the right, in its sole
                    discretion, to limit the number of emails or other
                    communications you send to Members through the MedLink
                    Services
                  </li> <br /> <br />
                  <li>
                    If you are a Member, you may use the Website to search the
                    Job Bank, create an Account, apply for job positions and
                    participate in other programs, fairs and events, in the
                    manner set forth herein and in the Website. You (not we)
                    will be responsible to negotiate with Employers, RPO
                    Providers and Agencies who contact you (or who you contact)
                    a mutually acceptable arrangement by which such Employer or
                    RPO Provider may engage or employ you to provide certain
                    services
                  </li>
                </ul>
                <br /> <br />
                <ol type="A">
                  <li>
                    Privacy Policy; Additional Terms. These Terms of use include
                    the terms and conditions set forth herein as well as our
                    Privacy Policy, located at{" "}
                    <Link
                      to="/about-us"
                      sx={{ color: "blue", fontWeight: "bold" }}
                    >
                      medlinkjobs.com/Privacy
                    </Link>
                    , and incorporated into these Terms of use by this
                    reference. Certain areas of the Website and service
                    offerings provided through the Website may be subject to
                    additional terms and conditions posted by us on the Website
                    or otherwise made available by us to you. Your access to and
                    use of the Website and Services is conditioned upon your
                    acceptance of such additional terms and conditions, which
                    are hereby incorporated by reference into these Terms of
                    use.
                  </li> <br /> <br />
                  <li>
                    Changes to these Terms of use. We reserve the right to amend
                    these Terms of use from time to time. Any amendments shall
                    be effective when posted by us on the Website or otherwise
                    made available to you. Your access to and use of the Website
                    after we have modified these Terms of use shall signify your
                    acceptance of the amended terms. It remains your
                    responsibility to review these Terms of use regularly to
                    ensure that you are updated as to any changes.
                  </li> <br /> <br />
                  <li>
                    Your Consent and Agreement to these Terms of use. Please
                    read these Terms of use carefully. These Terms of use set
                    forth legally binding terms and conditions. Once you access
                    the MedLink Website and click the digital acknowledgment
                    that you accept and agree to these Terms of use, you’re
                    telling us: (i) you have the right, authority, and capacity
                    to agree to these Terms of use and perform their
                    obligations; (ii) you’ve read the Terms of use and you agree
                    to be bound by them; and (iii) you understand these Terms of
                    use set out binding legal obligations for you. Contingent on
                    these Terms of use, we will grant you the rights described
                    herein. Note that any future release, update, or addition to
                    the Website will also be subject to these (or the
                    then-current) Terms of use.
                  </li>
                </ol>
                <br /> <br />
                Welcome to MedLink. Let your search for your dream practice
                begin!
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                II. <u>Definitions </u>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                “You” or “your” refer to you, as in the person who is being
                presented these Terms of use for your, or on behalf of your
                organisation, review and acceptance. <br />
                “We”, “us”, “our”, and “MedLink” refer to MedLink, Ltd., the
                owner and operator of the Website and Services provided by
                MedLink.
                <br />
                <br />
                “Agency” or “Agencies” refers to third-party companies or
                entities that recruit physicians and other healthcare providers
                on behalf of another healthcare facility, but that do not
                directly employ physicians and have entered into an Agency
                Agreement with MedLink. Depending on the service level
                subscribed to in your Agency Contract, Agencies that register
                and create an Employer Profile with MedLink may post
                opportunities to the Job Bank and view, track and reply to
                Candidates who respond to their job postings, and utilise
                certain functions of our Recruitment Management System. Agencies
                cannot access the Member Database unless specifically authorized
                by MedLink in their Agency Contract.
                <br />
                <br />
                “Agency Contract” refers to the signed contract that governs the
                relationship between an Agency and MedLink for fee based
                Services and incorporates these Terms of use and the Privacy
                Policy.
                <br />
                <br />
                “Beta Services” means products, services, solutions and
                applications that may be made available to you to try at your
                option at no additional fees which are clearly designated as
                beta, test, limited release, evaluation software or a similar
                description.
                <br />
                <br />
                “Candidate(s)” refers to any individual, whether registered as a
                Member or not, who may be considered for a job position.
                <br />
                <br />
                “Cookies” refer to small files, containing text or a string of
                characters, which identify the user of a website and are sent by
                the website to the user’s device for recordkeeping purposes
                <br />
                <br />
                “Employer(s)” refers to any organisation or other entity,
                including, without limitation, hospitals, private practices,
                educational institutions, and physician practice groups that
                will directly employ and/or engage a physician or other
                healthcare provider, and that has entered into an Employer
                Contract with MedLink. Employers may post opportunities to the
                Job Bank, be authorized to access the Member Database and
                utilise certain other Services, including the Recruitment
                Management System pursuant to the terms of its Employer
                Contract.
                <br />
                <br />
                “Employer Contract(s)” refers to the signed contract that
                governs the relationship between an Employer and/or RPO Provider
                and MedLink for fee based Services and incorporates these Terms
                of use and the Privacy Policy.
                <br />
                <br />
                “Employer Profile(s)” refers to the Personal Information and
                Organisation Information Employers, RPO Providers and Agencies
                provided to MedLink when registering an Account.
                <br />
                <br />
                “Job Bank” refers to the online collection of job opportunities
                curated and maintained by MedLink on its Website
                <br />
                <br />
                “Member” or “Registered Member” refers to an individual who is a
                Registered user of the job searching, job placement, career
                advancement and general career consulting and advising Services
                provided by MedLink.
                <br />
                <br />
                “Member Database” refers to the online collection of Member
                Profiles that is maintained on the MedLink Website and is
                searchable by authorized Employers, RPO Providers and Agencies.
                <br />
                <br />
                “Member Profile(s)” refers to the Personal Information and
                Professional Information that a Member provides to MedLink
                during the registration process. Depending on the status of your
                Account, your Member Profile may be viewed by Employers, RPO
                Providers and Agencies, as further determined by each of their
                respective Contracts.
                <br />
                <br />
                “Non-Registered user(s)” refers to anyone who visits, views,
                browses and/or otherwise uses the MedLink Website without
                registering as an Agency, RPO Provider, Member or Employer.
                <br />
                <br />
                “Organisation Information” refers to information about an
                Employer, including the type of Employer you are, or if an
                Agency or RPO Provider, you represent, the Employer’s company
                website, and number of openings and type of positions available.
                <br />
                <br />
                “Personal Information” refers to the information collected from
                Members and Employers via the MedLink Website when registering
                Accounts. This information may include: your name, title,
                address, phone number, degree, Professional Information,
                Organisation Information, citizenship, and email address. This
                information does not include nor will MedLink ask for: your any
                financial or credit account numbers, including credit card or
                debit card numbers.
                <br />
                <br />
                “MedLink Account” or “Account(s)” refers to accounts created and
                maintained for either Member Profiles or Employer Profiles, as
                applicable.
                <br />
                <br />
                “MedLink Services” or “Services” refers to the products and
                services offered from time to time by MedLink, including without
                limitation, the Website, Job Bank, Jobseeker Database,
                newsletters and guides, Recruitment Management System and other
                related job search services, recruitment consulting and
                marketing, candidate lead product offerings and career
                consulting and advising.
                <br />
                <br />
                “Professional Information” refers to your area of professional
                practice and specialty, which may include educational
                background, employment history and state and/or board licensure
                and certifications.
                <br />
                <br />
                “Recruitment Management System” refers to our integrated
                solution which provides job publishing and marketing features,
                active candidate database searching, candidate relationship
                management functions, and applicant tracking system.
                <br />
                <br />
                “Registered user(s)” refers to someone who visits, views,
                browses or otherwise uses the MedLink Website after having
                registered a Member Profile or Employer Profile.
                <br />
                <br />
                “RPO Provider” refers to a third party service provider engaged
                by an Employer to design, plan, implement and manage its
                recruitment processes and results. RPO Providers may create
                Employer Profiles, post job opportunities to the Job Bank and
                may be authorized to access the Member Database.
                <br />
                <br />
                “Technology” refers to the Website, and its entire contents,
                features and functionality, including but not limited to, the
                Recruitment Management System, Member Database, Job Bank, and
                all other information, software, hardware, databases, data,
                digital newsletters, magazines, guides and articles, underlying
                information, text, displays, user interfaces, images, video and
                audio, and the design, selection and arrangement thereof.
                <br />
                <br />
                <br />
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                II. <u>Use of the MedLink Services by Members</u>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                You are not required to create a Member Profile in order to use
                the MedLink Website, Job Bank, or Services. MedLink offers
                Non-Registered users the ability to search the Job Bank without
                requiring registration via the Website <br /> <br />
                <ol type="A">
                  <li>
                    Registration. By creating a Member Profile with MedLink you
                    agree that all information you submit to us is accurate and
                    truthful. You must register your Account in your own legal
                    name. During the registration process, you will specify your
                    name, email address, phone number and home and/or business
                    address. Assuming that the information you provide is
                    consistent with these Terms of use, we then grant you a
                    revocable, non-exclusive license to access our Job Bank and
                    use our Services. By providing your Personal Information
                    and/or Professional Information to MedLink and by creating a
                    Member Profile and Account, you agree that:
                    <br /> <br />
                    <ul>
                      <li>
                        You have read and understand, and agree to comply with
                        and be bound by these Terms of use and Privacy Policy;
                      </li>
                      <li>
                        Any Personal Information and Professional Information
                        submitted by you is accurate, and that any such
                        information that you submit to us will be updated to
                        remain truthful, complete and accurate;
                      </li>
                      <li>
                        MedLink may, but is not obligated to, verify your Member
                        Profile, and information provided therein, as necessary;
                      </li>
                      <li>
                        That your access to and use of the Website does not and
                        shall not violate any applicable laws of the India or
                        your local jurisdiction, and that you will comply with
                        applicable laws and regulations, including those
                        concerning data privacy and protection, intellectual
                        property, and regulatory compliance;
                      </li>
                      <li>
                        {" "}
                        You will use MedLink Website in a respectful manner;
                      </li>
                      <li>That you are at least 18 years of age or older;</li>
                      <li>
                        {" "}
                        MedLink can store and make available your Member Profile
                        to Employers, Agencies, RPO Providers and other third
                        parties that can assist you in your job search;
                      </li>
                      <li>
                        MedLink can contact you, via e-mail or otherwise,
                        regarding your Member Profile; your experience with our
                        Website, Job Bank, or Services; your job search; our
                        sponsored programs, seminars, and career fairs, or for
                        any reason related to your use of the Website and
                        Services; and
                      </li>
                      <li>
                        {" "}
                        Employers, RPO Providers and Agencies can contact you
                        regarding your job search or Member Profile.
                      </li>
                    </ul>
                    <br /> <br />
                    Notwithstanding the forgoing, Members may limit access to or
                    viewing of his or her Member Profile by Employers, Agencies
                    and RPO Providers in accordance with the functions of the
                    Website and Services; however, unless and until you have
                    deactivated your Account, MedLink may still contact you in
                    accordance with these Terms of use.
                  </li>
                  <br /> <br />
                  <li>
                    Account Credentials. You are solely responsible in all
                    respects for all use of and for protecting the
                    confidentiality of your unique MedLink password. You agree
                    to notify us immediately of any unauthorized use of your
                    password or other credentials for your Account and any other
                    suspected breach of security regarding the Website. If you
                    discover or believe that your Account has been accessed or
                    used without your authorization, please contact us at{" "}
                    <a
                      href="mailto: support@medlinkjobs.com"
                      style={{ color: "blue" }}
                    >
                      support@medlinkjobs.com
                    </a>. MedLink is not liable for and you
                    hereby release MedLink from any liability for any loss or
                    damage arising from the unauthorized use of your password
                    and credentials. You are responsible for all activity on and
                    use of your Account, and you may not assign or otherwise
                    transfer your Account to any other person or entity.
                    <br />
                  </li>{" "}
                  <br />
                  <li>
                    Equipment. You are responsible for obtaining access to the
                    MedLink Website, Job Bank, or Services and for having all
                    the equipment necessary to do so, even if that means you
                    incur fees from a third party (such as an Internet Service
                    Provider), including telephone, equipment, airtime, or
                    Internet Service Provider charges.
                  </li>
                </ol>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                IV.
                <u>
                  Use of the MedLink Services by Employers, RPO Providers and
                  Agencies
                </u>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                <ol type="A">
                  <li>
                    Registration. If you are an Employer, RPO Provider or
                    Agency, you are required to create an Employer Profile in
                    order to post job opportunities to the Job Bank and to
                    search the Member Database. Pursuant to the terms of your
                    Contract, your access to and viewing of the Member Database
                    may be limited to certain Members based on your particular
                    employment needs, or in the case of Agencies, prohibited
                    entirely. In addition, MedLink reserves the right, in its
                    sole discretion, to limit the number of emails or other
                    communications you send to Members through the MedLink
                    Services. Depending on the terms of your Contract you may
                    also upload, store and manage your Employer Candidate Data,
                    and use and access other features of the Recruitment
                    Management System. Agencies cannot access the Member
                    Database unless specifically authorized by MedLink in their
                    Agency Contract. By creating an Employer Profile with
                    MedLink, you agree that all information you submit to us is
                    accurate and truthful. Assuming that the information you
                    provide is consistent with these Terms of use, your
                    Contract, and any other applicable contract, we then grant
                    you (pursuant to the terms of your Contract) a revocable,
                    non-exclusive license to access our Website and use our
                    Services. By providing your Personal and Organisation
                    Information to MedLink and by creating an Employer Profile,
                    you agree that: <br /> <br />
                    <ul>
                      <li>
                        You have read and understand, and agree to comply with
                        and be bound by these Terms of use and Privacy Policy;
                      </li>
                      <li>
                        Any Personal Information and Organisation Information
                        submitted by you is accurate, and that any such
                        information that you submit to us will be updated to
                        remain, truthful, complete and accurate;
                      </li>
                      <li>
                        {" "}
                        MedLink may, but is not obligated to, verify your
                        Employer Profile, as necessary;
                      </li>
                      <li>
                        Your access to and use of the Website does not and shall
                        not violate any applicable laws of the India or your
                        local jurisdiction, and that you will comply with
                        applicable laws and regulations, including those
                        concerning data privacy and protection, phone and email
                        solicitation, intellectual property, and regulatory
                        compliance;
                      </li>
                      <li>
                        MedLink can share and make available your Organisational
                        Information and Personal Information (if any) to
                        Members, Candidates and other Non-Registered users using
                        the MedLink Website;
                      </li>
                      <li>
                        MedLink can share your job postings with other websites
                        and job fairs managed by third parties;
                      </li>
                      <li>You are at least 18 years of age or older;</li>
                      <li>
                        You will use MedLink Website and Services in a
                        respectful manner;
                      </li>
                      <li>
                        MedLink can contact you regarding your Employer Profile;
                        your experience with our Website and Services; any
                        sponsored programs, fairs or seminars, the Job Bank or
                        for any reason related to your use of the Website and
                        Services; and
                      </li>
                      <li>
                        Members and Non-Registered users can contact you
                        regarding their job searches.
                      </li>
                    </ul>
                  </li>{" "}
                  <br /> <br />
                  <li>
                    Account Credentials. You are solely responsible in all
                    respects for all use of and for protecting the
                    confidentiality of your unique MedLink password. You agree
                    not to provide, transfer or otherwise disclose your password
                    to any third party, or otherwise allow access to your
                    Account by any third party. You agree to notify us
                    immediately of any unauthorized use of your password or
                    other credentials or Account and any other suspected breach
                    of security regarding the Website. If you discover or
                    believe that your Account has been accessed or used without
                    your authorization, please contact us at {" "}
                    <a
                      href="mailto: support@medlinkjobs.com"
                      style={{ color: "blue" }}
                    >
                      support@medlinkjobs.com
                    </a>
                    . MedLink is not liable for and you hereby release MedLink
                    from any liability for any loss or damage arising from the
                    unauthorized use of your credentials. You are responsible
                    for all activity on and use of your Account, and you may not
                    assign or otherwise transfer your Account to any other
                    person or entity
                  </li>
                  <br /> <br />
                  <li>
                    Equipment. You are responsible for obtaining access to the
                    MedLink Website, Job Bank, or Services and for having all
                    the equipment necessary to do so, even if that means you
                    incur fees from a third party (such as an Internet Service
                    Provider), including telephone, equipment, airtime, or
                    Internet Service Provider charges.
                  </li>
                  <br /> <br />
                  <li>
                    Employer Candidate Data <br /> <br />
                    <ol type="1">
                      <li>
                        Depending on your subscription level under the Employer
                        Contract and/or any Beta Services we offer (described
                        below), you may have the ability to upload, manage and
                        store Employer Candidate Data on and through our Website
                        and Services. You acknowledge and agree that any
                        Employer Candidate Data uploaded and stored on and
                        through the Website and Services is accurate and
                        truthful. You retain ownership of all Employer Candidate
                        Data, provided, however, you acknowledge and agree that
                        MedLink shall have the right to use, store and disclose
                        such Employer Candidate Data in accordance with these
                        Terms of use and the Privacy Policy. For purposes of
                        clarification, and notwithstanding anything contained
                        herein to the contrary, “Employer Candidate Data” shall
                        not include any Candidate data previously obtained or
                        owned by MedLink, or independently developed by MedLink
                        without the use of any such data provided or uploaded by
                        you.
                      </li>{" "}
                      <br />
                      <li>
                        You hereby grant to MedLink a non-exclusive, fully paid,
                        perpetual, world-wide and irrevocable license to use,
                        store and process the Employer Candidate Data, solely
                        for its internal business purposes, and to compile,
                        combine, enhance or incorporate such Employer Candidate
                        Data with or into other similar data and information
                        available, derived or obtained from other MedLink
                        databases, clients, customers, licensees or users of the
                        Website (collectively, such compiled, combined, enhanced
                        or incorporated data and information shall be referred
                        to as "Aggregated Data”) solely for its internal
                        business purposes. MedLink will be the owner of all
                        right, title and interest in and to Aggregated Data.
                        Your grant of the license to copy, aggregate, process,
                        use and display Employer Candidate Data shall survive
                        the expiration or termination of any Employer Contract,
                        Beta Services, these Terms of use and the Privacy
                        Policy. For purposes of clarification, and
                        notwithstanding anything contained herein to the
                        contrary, the parties acknowledge and agree that only
                        MedLink and you will have access to and rights to view
                        and use your Employer Candidate Data. No other Employer,
                        RPO Provider, Agency, Member or Non-Registered user will
                        have access to or rights to view or use your Employer
                        Candidate Data.
                      </li>
                      <br />
                      <li>
                        In connection with the grant of the license described
                        above, you acknowledge and agree that by using our
                        Website and Services to upload, manage and store
                        Employer Candidate Data, you hereby grant to MedLink any
                        and all consent and authority that may be required
                        therefor, including, without limitation all express
                        consent by the subject of such Employer Candidate Data.
                        In furtherance of the foregoing, you hereby represent
                        and warrant to us that you have obtained all necessary
                        permissions and consents from the subject of the
                        Employer Candidate Data to (i) upload, store and manage
                        his or her Employer Candidate Data on the Website; (ii)
                        grant MedLink a license to use, store and disclose his
                        or her Employer Candidate Data in accordance with these
                        Terms of use, the Privacy Policy and any other
                        additional terms and conditions posted by us on the
                        Website; and (iii) allow MedLink to contact or otherwise
                        communicate with him or her in accordance with these
                        Terms of use, the Privacy Policy and any other
                        additional terms and conditions posted by us on the
                        Website. If you do not have the appropriate consents or
                        permissions from the individual subjects of your
                        Employer Candidate Data, you should not upload or store
                        any such Employer Candidate Data with, through or on the
                        Website.
                      </li>
                      <br />
                      <li>
                        In addition to any other indemnification obligations
                        contained in these Terms of use, you agree to defend,
                        indemnify and hold harmless MedLink, its affiliates, and
                        its and their respective officers, directors, employees,
                        contractors, agents, licensors, suppliers, successors
                        and assigns from and against any claims, liabilities,
                        damages, judgments, awards, losses, costs, expenses or
                        fees (including reasonable attorneys' fees) arising out
                        of or relating to (i) any claim by an individual subject
                        of your Employer Candidate Data related to, arising out
                        of or associated with your use, storage and management
                        of his or her Employer Candidate Data on the MedLink
                        Website (ii) any claim by an individual subject of your
                        Employer Candidate Data related to, arising out of or
                        associated with our storage, maintenance and use of such
                        subject’s Employer Candidate Data; and (iii) your
                        violation of the representations and warranties made
                        with respect to the consents and permissions associated
                        with the Employer Candidate Data.
                      </li>
                    </ol>
                  </li>{" "}
                  <br />
                  <br />
                  <li>
                    Beta Services. From time to time, we may make Beta Services
                    available to you at no charge. You may choose to try such
                    Beta Services or not at your sole discretion. Beta Services
                    are intended for evaluation purposes and not for production
                    use, are not supported, and may be subject to additional
                    terms. Beta Services are not considered “Services” under
                    these Terms of use, however, all restrictions, our
                    reservation of rights and your obligations concerning the
                    Services, and use of the Website, shall apply to your use of
                    Beta Services. Unless otherwise stated, any Beta Services
                    trial period will expire upon the earlier termination by
                    MedLink or the date that a version of the Beta Services
                    becomes generally available without the applicable Beta
                    Services designation. We may discontinue Beta Services at
                    any time in our sole discretion and may never make them
                    generally available. We will have no liability for any harm
                    or damage arising out of or in connection with a Beta
                    Service. If you have supplied, stored, uploaded or managed
                    any Personal Information, Organisation Information or
                    Employer Candidate Data on the Website in connection with
                    any such Beta Services, upon termination of the Beta Service
                    offering you will have the right to (i) request such data
                    and information in accordance with Section XIII B of these
                    Terms of use, or (ii) enter into an Employer Contract for a
                    particular Service offered by MedLink for the storage,
                    maintenance, and management of such data, if available and
                    offered by MedLink.
                  </li>
                </ol>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                V. <u> Limitation of Our Services</u>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                MedLink is a searchable online database of job postings and
                candidates, allowing registered users the ability to search and
                review the Job Bank, Employer Profiles, Member Profiles and
                Member Database and contact them personally regarding their
                posting and/or services. MedLink does not employ any Candidates.
                You, if you are an Employer, are the potential employer of the
                Candidate whom you engage, and you are responsible for
                compliance with all applicable employment and other laws in
                connection with any employment or contract relationship you
                establish with a Candidate (such as applicable payroll, tax and
                minimum wage laws) <br />
                <br />
                You understand that MedLink does not verify the qualifications
                of Employers, RPO Providers, Agencies or Members using or
                located on the Website, except as otherwise provided in these
                Terms of use, nor do we evaluate or control in any ongoing
                manner exchanges between you and such users. We have no control
                over and assume no responsibility for the conduct, whether
                online or offline, of users of the Website. It is possible that
                other users may post offensive or inappropriate content, and
                that you may view or be involuntarily exposed to such offensive
                or inappropriate content. We do not approve of such conduct.
                However, we are not responsible for the content or conduct of
                other users of the Website, and shall have no liability for any
                actions or inaction taken in connection therewith. We make no
                representations or warranties, express or implied, as to the
                content submitted by users, and shall have no obligation to
                modify or remove inaccurate or inappropriate content.
                <br />
                <br />
                WE DO NOT HAVE CONTROL OVER THE QUALITY, TIMING, OR LEGALITY OF
                THE SERVICES ACTUALLY DELIVERED BY ANY CANDIDATES, NOR OF THE
                INTEGRITY, RESPONSIBILITY OR ACTIONS OF EMPLOYERS OR CANDIDATES.
                WE DO NOT REFER, ENDORSE OR RECOMMEND EITHER EMPLOYERS OR
                CANDIDATES NOR DO WE MAKE ANY REPRESENTATIONS ABOUT THE
                SUITABILITY, RELIABILITY, TIMELINESS, OR QUALITY OF THE SERVICES
                PROVIDED BY THE CANDIDATES OR THE INTEGRITY, RESPONSIBILITY OR
                ACTIONS OF EMPLOYERS OR CANDIDATES WHETHER IN PUBLIC, PRIVATE OR
                OFFLINE INTERACTIONS.
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                VI. <u>Profile Verification.</u>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                By registering an Employer Profile or Member Profile, you
                authorize MedLink, and acknowledge that for purposes of
                promoting the safety and integrity of MedLink and its Services,
                MedLink reserves the right, but not the obligation, to utilise
                third party service providers to verify on an ongoing basis that
                your registration data is accurate and that the representations
                and warranties made herein addressing legal matters such as
                complaints, arrests, etc., are also true ("Verification
                Checks"). These third parties may use data from a variety of
                sources, under a variety of circumstances, for these site safety
                purposes including, without limitation, information from state
                licensing, accreditation and certification programs, national
                criminal databases, sex offender registries, certain media
                streams, terrorist watch lists, criminal and fugitive watch
                lists, fraud watch lists, law enforcement reports, and other
                data. <br /> <br />
                You agree that MedLink may take such action in response to
                Verification Checks as it deems appropriate in its sole
                discretion, including without limitation suspending and/or
                terminating your Account, should it determine that you have
                violated any representation or warranty or any other provision
                of these Terms of use or are otherwise unsuitable for MedLink.{" "}
                <br /> <br />
                You also hereby represent, understand and expressly agree that
                MedLink does not have control over or assume any responsibility
                for the quality, accuracy, or reliability of the information
                included in a Verification Check. We do not typically
                communicate the results of a Verification Check to any third
                party, though we reserve the right to do so for law enforcement
                or other safety-related purposes.
                <br /> <br />
                <b>
                  BY AGREEING TO THESE TERMS, YOU AGREE TO ALLOW MedLink TO
                  PERFORM THE VERIFICATION CHECKS DESCRIBED ABOVE. NO FURTHER
                  CONSENT FROM YOU IS REQUIRED FOR THESE VERIFICATION CHECKS TO
                  BE PERFORMED.
                </b>
                <br /> <br />
                You expressly acknowledge that MedLink has no obligation to
                perform Verification Checks, on any users. To the extent MedLink
                performs such checks on certain Employers and/or Members, the
                checks are limited and should not be taken as complete,
                accurate, up-to-date or conclusive evidence of the accuracy of
                any information those users have provided or of their
                eligibility to use the Website or provide and employment or job
                postings.
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                VII. <u>Prohibited Activity</u>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                You are only entitled to use the MedLink Website and Services
                for lawful purposes and in accordance with these Terms of use,
                the Privacy Policy, and any other applicable contracts, laws, or
                regulations, including your Contract if you are an Employer, RPO
                Provider or Agency. In the event there is any inconsistency
                between these Terms of use and the terms of another applicable
                contract, that contract will supersede the Terms of use. <br />{" "}
                <br />
                Except as expressly provided in these Terms of use, you agree to
                not, and to not allow any third party to: <br /> <br />
                <ul>
                  <li>
                    Access or attempt to access the Technology by any means
                    other than through the MedLink user interface;
                  </li>
                  <br />
                  <li>
                    Attempt to circumvent or overcome any protection measures
                    intended to restrict access to any portion of the MedLink
                    Website, Job Bank, Member Database or Technology;
                  </li>
                  <br />
                  <li>
                    Monitor the availability, performance, or functionality of
                    the Technology;
                  </li>
                  <br />
                  <li>
                    use the Technology for the purpose of exploiting, harming or
                    attempting to exploit or harm minors in any way by exposing
                    them to inappropriate content, asking for personally
                    identifiable information or otherwise;
                  </li>
                  <br />
                  <li>
                    use the Technology in any way that violates any applicable
                    federal, state, local or international law or regulation
                    (including, without limitation, any laws regarding the
                    export of data or software to and from India or other
                    countries, including the foreign Corrupt Trade Practices
                    Act, and the Export Administration Act), or (except with our
                    consent) in any manner that could damage, disable,
                    overburden, or impair it;
                  </li>
                  <br />
                  <li>
                    use the Technology to transmit, or procure the sending of,
                    any advertising or promotional material without our prior
                    written consent, including any "junk mail", "chain letter"
                    or "spam" or any other similar solicitation;
                  </li>
                  <br />
                  <li>
                    use the Technology to impersonate or attempt to impersonate
                    MedLink, a MedLink employee, another user or any other
                    person or entity (including, without limitation, by using
                    e-mail addresses or screen names associated with any of the
                    foregoing);
                  </li>
                  <br />
                  <li>
                    use the Technology to engage in any other conduct that
                    restricts or inhibits anyone's use or enjoyment of the
                    Website, or which, as determined by us, may harm MedLink or
                    users of the Website or expose them to liability;
                  </li>
                  <br />
                  <li>
                    Interfere with the operation or hosting of the MedLink
                    Website, Job Bank, Member Database, or Technology, including
                    but not limited to violating or attempting to violate any
                    security feature, place malware or similar harmful code into
                    the Website, Job Bank, Member Database or Technology, or
                    link to websites or other applications that contain malware
                    or similar harmful code;
                  </li>
                  <br />
                  <li>
                    Overload, overwhelm, or carry out a denial-of-service attack
                    on, or otherwise prohibit the proper function of, the
                    MedLink Website, Job Bank, Member Database or Technology;
                  </li>
                  <br />
                  <li>
                    Interfering or attempting to interfere with service to any
                    user, host, or network, including, without limitation,
                    submitting to the Website a virus, Trojan horse, or any
                    other computer code, files or programs designed to
                    interrupt, destroy or limit the functionality of any
                    computer software or hardware or telecommunications
                    equipment, overloading the Website, or “flooding,”
                    “spamming,” “mail bombing,” or “crashing” the Website;
                  </li>
                  <br />
                  <li>
                    Introduce software, automated agents, or scripts to the
                    MedLink Website, Job Bank, Member Database or Technology so
                    as to produce multiple accounts; generate automated
                    searches, requests, or queries; or access, collect,
                    intercept, strip, scrape, or mine information or data from,
                    or in transit to or from, the MedLink Website, including any
                    software that reads areas of RAM or streams of network
                    traffic, unless specifically authorized by MedLink;
                  </li>
                  <br />
                  <li>
                    Systematically retrieve data or other information from the
                    MedLink Website, Member Database or Job Bank to create or
                    compile a collection, compilation, database, or directory,
                    whether by manual methods, web robots, or otherwise, unless
                    specifically authorized by MedLink;
                  </li>
                  <br />
                  <li>
                    use reverse looking-up, tracing or seeking to trace any
                    information on any other user of or visitor to the Website
                    or any other customer of MedLink, including any Account not
                    owned by you, to its source, or exploit the Website or
                    information made available or offered by or through the
                    Website, in any manner in which the purpose is to reveal or
                    misuse any information, including but not limited, to
                    Personal Information, other than your own information, as
                    provided by the Website.
                  </li>
                  <br />
                  <li>
                    License, sublicense, sell, rent, convey, pledge as security,
                    lend, loan, lease, transfer, assign, reproduce, or
                    distribute to a third party the MedLink Website, Job Bank,
                    Member Database, Technology, or your rights to either, or
                    otherwise encumber the rights and licences granted
                    hereunder;
                  </li>
                  <br />
                  <li>
                    Copy, record, republish, download, display, post, save,
                    disclose, modify, store, co-brand, alter, or transmit in any
                    form or by any means any part of the MedLink Website, Job
                    Bank, Member Database, or Technology, or create compilations
                    or derivative works of the MedLink Website, Job Bank, or
                    Technology or any part thereof;
                  </li>
                  <br />
                  <li>
                    Dissemble, decompile, reverse-compile, translate, adapt,
                    reverse-engineer, or otherwise attempt to derive any part of
                    the MedLink Website, Job Bank, or Technology or its method
                    of operation;
                  </li>
                  <br />
                  <li>
                    Access the MedLink Website, Job Bank, Member Database or
                    Technology in order to build similar or competitive
                    websites, platforms, or services; or
                  </li>
                  <br />
                  <li>
                    use, display, mirror, or frame any part of the MedLink
                    Website, Job Bank, Member Database or Technology, including
                    archives, layout, design, or proprietary information
                    contained therein or on any related web page or form without
                    our express written consent.
                  </li>
                  <br />
                  <li>
                    Generate, facilitate or send, via email, phone or other
                    means, messages to Members or other Registered or
                    Non-Registered users in an excessive (as determined in
                    MedLink’s sole discretion) or harassing manner, or to such
                    users who have asked not to be contacted.
                  </li>
                  <br />
                </ul>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                VIII. <u>Intellectual Property and Proprietary Rights</u>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                <ol type="A">
                  <li>
                    Technology. <br /> <br />
                    The Technology is owned by MedLink and is protected by India
                    and international copyright, trademark, patent, trade secret
                    and other intellectual property or proprietary rights laws.
                    <br /> <br />
                    MedLink hereby grants you a personal, non-exclusive,
                    non-transferable, limited license to access and use the
                    Technology, and the software embodied in the Technology
                    solely as provided to you by MedLink and solely in
                    connection with and solely during the term of your use of
                    the Website and Services; provided that certain portions of
                    the Website are restricted to those persons who have been
                    assigned passwords by MedLink or its designees. Such license
                    and these Terms of use permit you to use the Website for
                    your use only. You must not reproduce, distribute, modify,
                    create derivative works of, publicly display, publicly
                    perform, republish, download, store or transmit any of the
                    material on our Website, except as follows: <br /> <br />
                    <ul>
                      <li>
                        Your computer may temporarily store copies of such
                        materials in RAM incidental to your accessing and
                        viewing those materials.
                      </li>
                      <li>
                        You may store files that are automatically cached by
                        your Web browser for display enhancement purposes
                      </li>
                      <li>
                        You may print or download one copy of a reasonable
                        number of pages of the Website for your own personal,
                        non-commercial use and not for further reproduction,
                        publication or distribution.
                      </li>
                      <li>
                        If we provide desktop, mobile or other applications for
                        download, you may download a single copy to your
                        computer or mobile device solely for your own personal,
                        non-commercial use, provided you agree to be bound by
                        our end user license agreement for such applications.
                      </li>
                      <li>
                        To the extent we link to social media networks in
                        connection with the Website, e.g., Facebook, Google +,
                        Pinterest, Twitter, LinkedIn and other social media
                        networks, you may take such actions as are enabled by
                        such features.
                      </li>
                    </ul>
                    <br /> <br />
                    You must not: <br /> <br />
                    <ul>
                      <li>Modify copies of any materials from this Website.</li>
                      <li>
                        use any illustrations, photographs, video or audio
                        sequences or any graphics separately from the
                        accompanying text.
                      </li>
                      <li>
                        Delete or alter any copyright, trademark or other
                        proprietary rights notices from copies of materials from
                        this site.
                      </li>
                    </ul>
                    If you print, copy, modify, download or otherwise use or
                    provide any other person with access to any part of the
                    Website in breach of these Terms of use, your right to use
                    the Website will cease immediately and you must, at our
                    option, return or destroy any copies of the materials you
                    have made. No right, title or interest in or to the Website
                    or any content on the Website is transferred to you, and all
                    rights not expressly granted are reserved by MedLink. Any
                    use of the Website not expressly permitted by these Terms of
                    use is a breach of these Terms of use and may violate
                    copyright, trademark and other laws. <br /> <br />
                  </li>
                  <li>
                    Trademarks <br /> <br />
                    The MedLink name, and all related names, logos, product and
                    service names, designs and slogans are trademarks of MedLink
                    or its affiliates. In addition, the names of other companies
                    and products mentioned on the Website and/or third party
                    trade names and logos displayed on the Website may be the
                    trademarks of their respective owners. Nothing contained on
                    the Website or in these Terms of use should be construed as
                    granting, by implication, estoppel, or otherwise, any
                    license or right to use any MedLink trademark or third party
                    trademarks displayed on the Website without the written
                    permission of MedLink or such third party that may own or
                    holds the right, title and interest in other trademarks
                    displayed on the Website.
                  </li>
                  <br />
                  <li>
                    Copyright Policy <br /> <br />
                    MedLink respects the copyrights of third parties. You may
                    not use the Website to post, modify, distribute, or
                    reproduce any copyrighted works without authorization or to
                    otherwise infringe the copyrights of a third party. It is
                    our policy to terminate the Accounts of users who repeatedly
                    infringe the copyrights of others upon receipt of proper
                    notification by the copyright owner or its legal agent. If
                    you believe that your copyrighted work has been posted or
                    used on the Website in a manner that constitutes copyright
                    infringement, please provide Our Copyright Agent (defined
                    below) with written notice containing the following
                    information: (i) a physical or electronic signature of a
                    person authorized to act on behalf of the owner of the
                    copyright interest that is allegedly infringed; (ii)
                    identification of the copyrighted work (or in the case of
                    multiple works, a representative list of such works) claimed
                    to have been infringed; (iii) identification of the material
                    that is claimed to be infringing, and the location of that
                    material; (iv) your address, telephone number, and email
                    address; (v) a statement by you that you have a good faith
                    belief that use of the material in the manner complained of
                    is not authorized by the copyright owner, its agent, or the
                    law; and (vi) a statement by you, made under penalty of
                    perjury, that the information in the notification is
                    accurate, and that you are authorized to act on behalf of
                    the owner of the copyright interest that allegedly is
                    infringed. Our “Copyright Agent” for notice of claims of
                    copyright infringement may be reached by mail at: 1034 S.
                    Brentwood Blvd. Suite 2200, St. Louis, MO 63117
                  </li>
                </ol>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                IX. <u>use Outside the Borders of the India</u>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                Although MedLink intends for its Registered and Non-Registered
                users to be located within India, our Website and Job Bank can
                be accessed worldwide and may contain references to information
                that extend beyond the India’ territorial boundaries. We make no
                representation that materials on the Website are appropriate or
                available for use in locations outside India. While your
                Personal Information will be processed in conformance with our
                Privacy Policy and these Terms of use, our processing and
                handling of your Personal Information may occur in countries
                with different laws regarding your privacy. By using MedLink and
                providing any Personal Information, you consent to the transfer
                of electronic data and personal information from your country to
                a country that may have different privacy laws. <br /> <br />
                using our Website and Services in other locations other than
                India may not be appropriate given foreign laws and regulations.
                If you use our Website or Services outside of India, you are
                responsible for complying with those foreign laws and
                regulations. We reserve the rights to limit the availability of
                the Website and Services to any person, geographic area, or
                jurisdiction it so desires at any time in our sole discretion
                and to limit the quantities of any such Service that we provide.
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                X. <u>Links from the Website</u>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                The Website may contain links to other websites and resources
                provided by third parties. These links are provided for your
                convenience only. These links include links contained in
                advertisements, including banner advertisements and sponsored
                links. The use of links to third party websites does not
                constitute or imply any affiliation with any of the third party
                websites or the owners thereof, and we do not endorse any such
                websites. We have no control over the contents of those websites
                or resources, and accept no responsibility for them or for any
                loss or damage that may arise from your use of them. If you
                decide to access any of the third party websites linked to this
                Website, you do so entirely at your own risk and subject to the
                terms and conditions of use for such websites.
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                XI. <u>Interruption of Our Services</u>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                We are constantly trying to improve the quality of the MedLink
                experience. To that end, we reserve the right to interrupt,
                modify, suspend, discontinue, or add to our Website and Services
                without notice. We hope, of course, that these interruptions are
                minimal, but, by consenting to these Terms of use, you agree
                that MedLink won’t be liable to you or to any third party for
                the interruption, modification, suspension, discontinuance, or
                addition to our Website or Services.
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                XII. <u>Reliance on Information Posted.</u>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                The information presented on or through the Website is made
                available solely for general information purposes. We do not
                warrant the accuracy, completeness or usefulness of this
                information. Any reliance you place on such information is
                strictly at your own risk. We disclaim all liability and
                responsibility arising from any reliance placed on such
                materials by you or any other visitor to the Website, or by
                anyone who may be informed of any of its contents. <br /> <br />
                This Website may include content provided by third parties,
                including materials provided by other users. All statements
                and/or opinions expressed in these materials, and all articles
                and responses to questions and other content, other than the
                content provided by MedLink, are solely the opinions and the
                responsibility of the person or entity providing those
                materials. These materials do not necessarily reflect the
                opinion of MedLink. We are not responsible, or liable to you or
                any third party, for the content or accuracy of any materials
                provided by any third parties.
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                XIII. <u>Termination or Deletion of Account.</u>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                <ol type="A">
                  <li>
                    Termination by us. We reserve the right to terminate your
                    use of the Website at any time and for any reason or no
                    reason, with or without prior notice to you, including if
                    you violate any provision of these Terms of use (including,
                    in our sole discretion, the excessive contacting by email or
                    other means of Members), or use the Website in a manner for
                    which it is not intended to be used. These Terms of use will
                    survive and remain in effect even after such termination.
                    Furthermore, MedLink also reserves the right, in its sole
                    discretion, to remove your profile and/or any content posted
                    by or about you from the Website, and/or to terminate your
                    Account, for any reason or no reason, with or without
                    notice. If we terminate your Member Profile, we have no
                    obligation to notify you of the reason, if any, for such
                    termination. If we terminate your Employer Profile or
                    Contract, we will provide you notice in accordance with the
                    terms of your Contract, and you may have the rights to your
                    Employer Candidate Data in accordance with Section XIII. B.
                    below.
                  </li>
                  <br /> <br />
                  <li>
                    Termination By Employers, RPO Providers and Agencies.
                    Employers, RPO Providers and Agencies may terminate their
                    Accounts and Employer Profiles in accordance with their
                    Contract. In no event will termination relieve you of your
                    obligation to pay any fees payable to us for the period
                    prior to the effective date of termination. Upon request by
                    you made within 30 days after the effective date of
                    termination or expiration of your Contract, we will make
                    Employer Candidate Data available to you for export or
                    download. After such a 30-day period, we will have no
                    obligation to maintain or provide any Employer Candidate
                    Data, and will thereafter delete or destroy all copies of
                    your Employer Candidate Data in our systems or otherwise in
                    our possession or control, unless legally prohibited.
                    Notwithstanding the foregoing, unless otherwise prohibited
                    by applicable law, we retain the right to keep an archived
                    copy of Employer Candidate Data for our records and internal
                    business purposes, but will not publicly display or
                    otherwise provide the Employer Candidate Data to third
                    parties.
                    <br /> <br />
                  </li>
                  <li>
                    Termination by Members. If at any time you determine you no
                    longer require our Services and wish to change the status
                    your Account and/or information contained in your Member
                    Profile, please contact any member of our team at (040)
                    3570-4798 (select Option 2) or email us at {" "}
                    <a
                      href="mailto: support@medlinkjobs.com"
                      style={{ color: "blue" }}
                    >
                      support@medlinkjobs.com
                    </a>
                    . If you choose to deactivate your Account, we will
                    deactivate your Account and login information and will
                    remove your Member Profile from the Website. Unless
                    otherwise prohibited by applicable laws, following
                    deactivation of your Account, we may, however, retain an
                    archived copy of your Personal Information and Professional
                    Information for our records and internal business purposes,
                    but will not publicly display or otherwise provide your
                    Personal Information to third parties.
                    <br /> <br />
                  </li>
                </ol>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  mt: "32px",
                }}
              >
                XIV. <b>DISCLAIMER OF WARRANTIES.</b> EXCEPT AS EXPRESSLY SET
                FORTH IN THESE TERMS OF usE, usE OF OUR WEBSITE AND SERVICES IS
                AT YOUR OWN RISK, AND IT IS OFFERED ON AN “AS–IS” AND “AS
                AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER
                EXPRESS OR IMPLIED. YOU ARE SOLELY RESPONSIBLE FOR ANY DAMAGE TO
                YOUR COMPUTER SYSTEM, LOSS OF DATA, PERSONAL INJURY, OR PROPERTY
                DAMAGE THAT RESULTS FROM THE usE OF THE WEBSITE AND SERVICES
                AND/OR DOWNLOADING OF MATERIAL THROUGH OUR WEBSITE. TO THE
                MAXIMUM EXTENT PERMITTED BY LAW, MedLink DISCLAIMS AND MAKES NO,
                AND YOU DISCLAIM ANY RELIANCE ON, ALL WARRANTIES OF ANY KIND,
                WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, INCLUDING,
                WITHOUT LIMITATION, WARRANTIES OR REPRESENTATIONS, FOR A
                PARTICULAR PURPOSE, MERCHANTABILITY, ACCURACY, TITLE, QUIET
                ENJOYMENT, AND NON-INFRINGEMENT. <br /> <br />
                MEDLINK AND OUR SUPPLIERS OR PROVIDERS DO NOT WARRANT THAT THE
                MedLink WEBSITE WILL MEET YOUR REQUIREMENTS, EXPECTATIONS, OR
                NEEDS, OR OPERATE UNINTERRUPTED, TIMELY, SECURELY, OR WITHOUT
                ERROR. WE MAKE NO REPRESENTATIONS OR WARRANTIES THAT THE QUALITY
                OF ANY CONTENT, PRODUCTS, SERVICES, INFORMATION, OR OTHER
                MATERIAL OBTAINED BY YOU THROUGH THE MedLink WEBSITE WILL BE
                ACCURATE, RELIABLE, COMPLETE, LEGAL, SAFE, OR FREE OF MALWARE OR
                OTHER HARMFUL CODE, OR THAT ANY ERRORS OR DEFECTS IN THE MedLink
                WEBSITE OR SERVICES WILL BE CORRECTED. NO ORAL OR WRITTEN
                INFORMATION OR ADVICE GIVEN BY us OR OUR EMPLOYEES, PROVIDERS,
                OR AGENTS WILL INCREASE THE SCOPE OF, OR CREATE ANY NEW
                WARRANTIES IN ADDITION TO, THE WARRANTIES EXPRESSLY SET FORTH IN
                THESE TERMS OF usE.
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  mt: "32px",
                }}
              >
                XV. <b>LIMITATION ON LIABILITY</b>. UNDER NO CIRCUMSTANCES SHALL
                MedLink, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE
                LIABLE TO YOU FOR ANY DAMAGES OF ANY KIND, UNDER ANY LEGAL
                THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR usE, OR
                INABILITY TO usE, THIS WEBSITE, ANY WEBSITES LINKED TO IT, ANY
                CONTENT ON THIS WEBSITE OR SUCH OTHER WEBSITES OR ANY SERVICES
                OR ITEMS OBTAINED THROUGH THIS WEBSITE OR SUCH OTHER WEBSITES,
                INCLUDING WITHOUT LIMITATION ANY DIRECT, INDIRECT, INCIDENTAL,
                SPECIAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES, INCLUDING BUT NOT
                LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL
                DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BusINESS OR
                ANTICIPATED SAVINGS, LOSS OF usE, LOSS OF GOODWILL, LOSS OF
                DATA, AND WHETHER CAusED BY TORT (INCLUDING NEGLIGENCE), BREACH
                OF CONTRACT OR OTHERWISE, EVEN IF FORESEEABLE AND EVEN IF EVEN
                IF MedLink HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                MedLink IS NOT LIABLE TO YOU OR TO THIRD PARTIES FOR ANY DAMAGE,
                HARM, INJURY OR CLAIM THAT ARISES FROM YOUR usE OF ANY PRODUCTS
                OR SERVICES ACQUIRED THROUGH OUR WEBSITE. WE ARE NOT LIABLE FOR
                ANY FAILURE OF THE GOODS OR SERVICES OF MedLink OR OF ANY THIRD
                PARTY. WE ARE NOT RESPONSIBLE IN ANY WAY FOR DAMAGES CAusED BY
                THIRD PARTIES WHO MAY usE OUR WEBSITE OR SERVICES.
                <br /> <br />
                IN THE EVENT OF ANY PROBLEM WITH THE MedLink WEBSITE OR ANY
                CONTENT THEREIN, YOU AGREE THAT YOUR SOLE REMEDY IS TO CEASE
                usING THE MedLink WEBSITE. IN THE EVENT OF ANY PROBLEM WITH THE
                PRODUCTS OR SERVICES THAT YOU HAVE ACQUIRED ON OR THROUGH THE
                MedLink WEBSITE, YOU AGREE THAT YOUR SOLE REMEDY, IF ANY, IS
                FROM THE MANUFACTURER OF SUCH PRODUCTS OR SUPPLIER OF SUCH
                SERVICES, IN ACCORDANCE WITH SUCH MANUFACTURER’S OR SUPPLIER’S
                WARRANTY. THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO
                THE FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE
                JURISDICTION. TO THE EXTENT THAT APPLICABLE LAW RESTRICTS THIS
                RELEASE OF LIABILITY, YOU AGREE THAT WE ARE ONLY LIABLE TO YOU
                FOR THE MINIMUM AMOUNT OF DAMAGES THAT THE LAW RESTRICTS OUR
                LIABILITY TO (IF SUCH A MINIMUM EXISTS).
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  mt: "32px",
                }}
              >
                XVI. <b>Indemnity</b>. You agree to indemnify, defend, and hold
                harmless, to the fullest extent allowed by law, MedLink and its
                owners, parent corporation, shareholders, officers, contractors,
                assigns, licensees, successors in interest, directors,
                employees, agents, operators, affiliates, and licensors in
                regards to any and all claims, allegations, demands, damages,
                obligations, losses, liabilities, costs, debts, disbursements,
                and expenses – including settlement amounts and attorneys’ fees
                – arising out of or resulting from your use of the MedLink
                Website; the Personal Information you place in the MedLink Job
                Bank and any claimed damage it may have caused to a third party;
                your violation of these Terms of use; your breach of any
                representations, warranties, or covenants set forth herein; your
                violation of any rights of a third party, including privacy
                rights and, without limitation, any trademark, copyright,
                patent, trade secret, or other intellectual property or
                proprietary rights; or your violation of any Applicable Laws or
                regulations. You further agree not to settle any such matter
                without our prior written consent. We reserve the right, at your
                expense, to assume the exclusive defence and control in any
                matter in which you are required to indemnify us, and we may
                require you to pay for any attorney of our choice to defend us.
                You also agree to cooperate with our defence of these claims.
                <br /> <br />
                In all instances, we retain the right to participate, at our own
                expense, in the defence of any such matters. We will make
                reasonable efforts to notify you of any such indemnified matter
                upon becoming aware of it. We may elect to settle any
                indemnified matter and you will be liable for those damages as
                if we had proceeded to trial. These provisions survive the
                cancellation, expiration, suspension, or termination of your
                access to and use of our Website, Job Bank, or Services.
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              >
                XVII.
                <b>
                  <u> Miscellaneous</u>
                </b>
              </Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              >
                <ol type="A">
                  <li>
                    No Third-Party Beneficiaries. You agree that, except as
                    otherwise expressly provided in the Terms of use, there
                    shall be no third-party beneficiaries to the Terms of use.{" "}
                  </li>{" "}
                  <br /> <br />
                  <li>
                    {" "}
                    Data Breach. While MedLink employs security measures to
                    maintain data security, data breaches can occasionally
                    happen, even to the most secure of systems. In the event of
                    such a situation, MedLink will, in compliance with any
                    applicable federal and state data breach laws, endeavour to
                    timely notify all users whose Personal Information MedLink
                    knows or has irrefutable reason to believe was accessed by
                    an unauthorized person.
                  </li>{" "}
                  <br /> <br />
                  <li>
                    {" "}
                    Individualised Contracts and Changes. MedLink will from time
                    to time negotiate different terms and conditions with
                    individual Employers or Agencies that do not conform to the
                    standard contractual terms. MedLink reserves the right to
                    selectively modify, in whole or in part, the terms for
                    individual Employers and Agencies, without special
                    communication to any third parties.
                  </li>{" "}
                  <br /> <br />
                  <li>
                    {" "}
                    Equal Opportunity. MedLink is an Equal Opportunity Employer
                    and does its best to monitor behaviours and recruiting
                    practices of our users as related to their use of our
                    Services and Website, though we cannot be liable or
                    responsible for our user’s specific actions.
                  </li>{" "}
                  <br /> <br />
                  <li>
                    Force Majeure. You agree that we are not responsible to you
                    for anything that MedLink may otherwise be responsible for
                    if it is the result of events beyond our control, including,
                    but not limited to, acts of God, war, insurrection, riots,
                    terrorism, crime, labor shortages (including lawful and
                    unlawful strikes), embargoes, postal disruption,
                    communication disruption, failure or shortage of
                    infrastructure, or shortage of materials.
                  </li>{" "}
                  <br /> <br />
                  <li>
                    {" "}
                    Choice of Law. The Terms of use shall be governed by the
                    laws of West Virginia. The offer and acceptance of the Terms
                    of use is deemed to have occurred in West Virginia.
                  </li>{" "}
                  <br /> <br />
                  <li>
                    {" "}
                    Arbitration. Any and all disputes arising from your use of
                    the MedLink Website, Job Bank, or Services (including
                    disputes regarding the interpretation and scope of this
                    clause, or even whether this dispute has to be arbitrated at
                    all) will exclusively be settled through binding and
                    confidential arbitration. Arbitration will be subject to the
                    Federal Arbitration Act instead of state arbitration law.
                    The arbitration will be conducted by a panel consisting of a
                    single commercial arbitrator appointed by the American
                    Arbitration Association (“AAA”), and will be governed by the
                    AAA’s Commercial Arbitration Rules and, if the arbitrator so
                    decides, the Supplementary Procedures for Consumer Related
                    Disputes.
                  </li>{" "}
                  <br /> <br />
                  <li>
                    {" "}
                    Assignment. You may not assign your rights or obligations
                    under this Terms of use to any other party without our prior
                    written consent. We may assign our rights or obligations
                    under this Terms of use to any other party at our sole
                    discretion.
                  </li>{" "}
                  <br /> <br />
                  <li>
                    Entire Agreement. Unless we later reach some other separate
                    agreement with you, these Terms of use make up the complete
                    and exclusive agreement between us regarding your access to
                    and use of our Website, Member Database, Job Bank, and
                    Services. The Terms of use supersede any prior agreements,
                    proposals, or communications, oral or written, between you
                    and MedLink relating to your use of our Services.{" "}
                  </li>{" "}
                  <br /> <br />
                  <li>
                    {" "}
                    Severability. In the event that a provision of these Terms
                    of use is found to be unlawful, in conflict with another
                    provision in the Terms of use, or otherwise unenforceable,
                    the remainder of the Terms of use will continue to be
                    enforceable as though it had been entered into without the
                    unenforceable provisions being included in it. If two or
                    more provisions of this Terms of use are deemed to conflict
                    with each other’s operation, MedLink has the sole right to
                    decide which provision remains in force.
                  </li>{" "}
                  <br /> <br />
                  <li>
                    Non-Waiver. We reserve all rights permitted to us under
                    these Terms of use as well as under any applicable law. Our
                    non-enforcement of any particular provision or provisions of
                    this Terms of use or of any applicable law shall not be
                    construed as a waiver of our right to enforce that same
                    provision or provisions under the same or different
                    circumstances at any time in the future.{" "}
                  </li>{" "}
                  <br /> <br />
                  <li>
                    Notice Regarding Amendments to the Terms of use. To best
                    keep you informed regarding any amendments, changes, or
                    revisions to the Terms of use, we may provide you with
                    notices through email, postings on the Site, or other
                    notification methods. Your continued use of the MedLink
                    Website after the publication of such amendments constitutes
                    your acceptance of our amended Terms of use.
                  </li>{" "}
                  <br /> <br />
                  <li>
                    Contact us. If you have any questions or concerns about
                    these Terms of use, please contact us by sending an email to {" "}
                    <a
                      href="mailto: info@medinkjobs.com"
                      style={{ color: "blue" }}
                    >
                      info@medinkjobs.com
                    </a>
                    .
                  </li>
                  <br /> <br />
                </ol>
              </Typography>
              {/* <Typography
                sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "32px",
                }}
              ></Typography>
              <Typography
                sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                }}
              ></Typography> */}
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            pl: matches ? "15px" : "70px",
            pr: matches ? "15px" : "5px",
            pt: matches ? "0px" : "63px",
            pb: matches ? "16px" : "76px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}></Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
