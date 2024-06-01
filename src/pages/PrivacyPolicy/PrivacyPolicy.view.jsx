import { Box, Breadcrumbs, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const matches = useMediaQuery("(max-width: 900px)");
  return (
    <Box maxWidth="lg" sx={{ mx: "auto", px: matches ? "12px" : 6, py: 1.5 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" sx={{ color: "#395987" }} />}
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
          Privacy Policy
        </Typography>
      </Breadcrumbs>
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          Privacy Policy
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "600", textDecoration: "underline", pb: 2 }}>
          Introduction
        </Typography>
        <Typography variant="body1">
          It is essential that all users of <b>MedLink</b> understand how our services work. Together,
          our Privacy Policy and our Terms of Use agreement do just that. Whether you are one of
          our Members or our Employers, RPO Providers or Agencies seeking new recruits, these
          are important documents because they affect your rights and responsibilities. Our
          Privacy Policy explains, in plain English, what information we collect on our Website,
          how we use that information, and how we protect it. This Privacy Policy describes how
          we collect, use, maintain, protect and disclose information obtained from you when you
          visit and/or use any portion of the Website and other areas of the Website or other
          websites that may subject to additional terms and conditions and/or end user license
          agreements including those requiring a secure login or otherwise entering a username
          and password (“Portals''). For clarification, solely in connection with any of the Portals,
          this Privacy Policy only governs the data that we may collect through areas of Portals, or
          that we might receive in connection with any of the Services. All other terms and
          provisions associated with the Portals will be provided to you in the Terms of Use or if
          you are an Employer, the Terms of Use and Employer Contract or other end user license
          agreement.
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 1.5 }}>
          <i>Two important things to note at the outset:</i>
        </Typography>
        <Typography variant="body1" sx={{ pl: 6, pb: 1 }}>
          <ul>
            <li>
              This Privacy Policy applies to Members and Employers, RPO Providers and Agencies,
              as well as Non-Registered Users. Where a portion of the Privacy Policy applies only
              to one or the other, but not both, we have clearly noted the difference.
            </li>
            <li>
              As with our Terms of Use, which directly incorporates this Privacy Policy, you
              must agree to our entire Privacy Policy in order to use the MedLink Website and
              Services. If you do not agree to any portion of this Privacy Policy or our Terms of
              Use, please stop using our Website and Services immediately. By registering with
              MedLink or using our Services, you are consenting to our practices, as described
              in this Privacy Policy, regarding the collection, use, and disclosure of your
              Personal Information. You are also agreeing to comply with the requirements
              contained herein.
            </li>
          </ul>
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ py: 1.5 }}>
          In this Privacy Policy, we tell you about:
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "600", pb: 2, pl: 6 }}>
          <ul>
            <li>
              Important Definitions
            </li>
            <li>
              What Information We Collect on the MedLink Website and What We Do with It
            </li>
            <li>
              Your Rights
            </li>
            <li>
              Your Responsibilities
            </li>
            <li>
              Children’s Privacy
            </li>
            <li>
              Security, Technology, and Amendments to Policies
            </li>
            <li>
              How to Contact Us
            </li>
          </ul>
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ py: 1.5 }}>
          This Privacy Policy applies to information we collect:
        </Typography>
        <Typography variant="body1" sx={{ pl: 6, pb: 3 }}>
          <ul>
            <li>
              On this Website.
            </li>
            <li>
              In email, text and other electronic messages between you and MedLink and/or this Website.
            </li>
            <li>
              Through phone calls between you and a MedLink representative, after you have become a Registered User.
            </li>
            <li>
              Through events, seminars, fairs and programs provided by MedLink or other third parties that you register for through the Website.
            </li>
            <li>
              Through mobile and/or desktop applications or solutions you download and/or access from this Website or the Portals.
            </li>
            <li>
              When you interact with our advertising and applications on third-party websites and services, if those applications or advertising include links to this Website.
            </li>
            <li>
              Through your responses to surveys that we might ask you to complete for research purposes.
            </li>
          </ul>
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ py: 1.5 }}>
          It does not apply to information collected by:
        </Typography>
        <Typography variant="body1" sx={{ pl: 6, pb: 3 }}>
          <ul>
            <li>
              us offline or through any other means, including on any third party website: or
            </li>
            <li>
              any third party, including through any application or content (including advertising) that may link to or be accessible from or on the Website.
            </li>
          </ul>
        </Typography>
        <Typography variant="body1" sx={{ py: 1.5 }}>
          Welcome to <b>MedLink!</b>
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "600", textDecoration: "underline", py: 2 }}>
          Important Definitions
        </Typography>
        <Typography variant="body1">
          While we use plain English, it’s important that we all understand the same meaning of certain important terms  used in our Privacy Policy and Terms of Use. Capitalized terms used in this Privacy Policy but not defined in  this Privacy Policy have the meaning set forth in the Terms of Use.
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "600", textDecoration: "underline", py: 2 }}>
          What Information We Collect on the MedLink Website and What We Do with It
        </Typography>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", pb: 2 }}>
            Information Collected From Non-Registered Users
          </Typography>
          <Typography variant="body1">
            When you simply browse the MedLink Website as a Non-Registered User without
            registering a Member Profile, Employer Profile, or otherwise interacting with the site for
            any career related services, MedLink may automatically record certain information sent
            from a Non-Registered User’s browser, including the IP address from which you access
            our Website. For more information about our collection of Website access information,
            please see the section below titled “Log Information.”
            In addition, online advertising and marketing networks with whom we partner may
            place anonymous Cookies (or similar technology) on a Non-Registered User’s device to
            deliver advertising and marketing materials tailored to your preferences or interests
            based on your online activities. For more information on Cookies, please see the section
            below titled <b>Online Tracking, Cookies, and Ad Choices.</b>
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Members: Creation of a Member Profile and Submitting Personal Information
          </Typography>
          <Typography variant="body1">
            To use certain Services offered by MedLink, you must register and create a MedLink
            Member Profile via our Website and provide us with certain Personal Information
            and/or Professional Information. The Personal and Professional Information we collect
            from Members may include: your name, address, phone number, degree, employment
            history, citizenship, email address, and a password. We may collect additional
            information about Members from third party sources to assist us in providing the
            Services.
            <br /><br />
            By agreeing to our Terms of Use and creating a MedLink Member Profile, you authorize
            us to access your profile, store your information, and share your information in
            accordance with our Terms of Use and Privacy Policy. While you always retain the ability
            to revoke this authorization and our access to your information by amending your
            MedLink account settings, data we have collected may be retained by MedLink for our
            internal business use, records and archives. For information about changing the status
            of your Member Profile, please see the <b>Your Rights</b> section below.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Employers/RPO Providers/Agencies: Creation of an Employer Profile and Submitting Personal Information
          </Typography>
          <Typography variant="body1">
            To post an opening in the Job Bank, gain access to the Member Database on MedLink
            and/or utilise other Services offered by MedLink, you must represent a healthcare
            organisation and abide by a signed contract that governs the terms of our relationship
            and your use of the Website (the “Employer Contract” and/or “Agency Contract”).
            Third-party recruiting Agencies can post openings to the Job Bank, but cannot access
            the Member Database unless specifically authorized by MedLink in their Agency
            Contract. All Employers and RPO Providers seeking to post opportunities to the Job Bank
            and/or access the Member Database must register and create a MedLink Employer
            Profile via our Website.
            <br /><br />
            To register and create a MedLink Employer Profile, you must provide us with certain
            Personal and Organisation Information. The Personal and Organisation Information we
            collect from Employer, Agencies and RPO Providers may include: your name, title,
            organisation, address, phone number, company information, information regarding the
            employer you represent, and an email address. We will email you a password after your
            MedLink Employer Profile is approved, at which time you may gain access to the
            Member Database and other Services provided under your Contract.
            <br /><br />
            By agreeing to our Terms of Use and creating a MedLink Employer Profile, you authorize
            us to access your profile, store your information, and share your information in
            accordance with our Terms of Use and Privacy Policy. While you always retain the ability
            to revoke this authorization by amending your MedLink account settings, data we have
            collected may be retained by MedLink for its internal business purposes, records and
            archives. For information about closing job postings and MedLink Employer Profiles,
            please see the section on <b>Your Rights</b> below.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Information Not Collected on the MedLink Website
          </Typography>
          <Typography variant="body1">
            MedLink does not collect the following information from any users via the MedLink
            Website: your Social Security number; Individual Taxpayer Identification Number;
            driver’s license number; state-issued identification card number; or financial or credit
            account numbers, including credit card or debit card numbers
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Information Collected From Registered Users
          </Typography>
          <Typography variant="body1">
            By creating an Account, you authorize us to and we will disclose the Personal,
            Professional and Organisation Information you submit to us, to Employers, RPO
            Providers, Agencies or Members (as applicable) with respect to particular job postings
            and Member and/or Employer Profiles for the purpose of providing you the Services,
            including alerting you to existing and new job postings and <b>MedLink</b> Member Profiles.
            Members may be required to provide an Employer, RPO Provider or Agency, at such
            Employer’s, RPO Provider’s or Agency’s request, with additional personal information,
            including, without, limitation your name, address, date of birth, social security number
            and any other personal information you provide for purposes of applying for a position.
            We do not have access to or control over any such personal information provided by
            you to an Employer, RPO Provider or Agency. The personal information you provide to
            any such Employer, RPO Provider or Agency will be governed by a separate privacy
            notice issued by such Employer, RPO Provider or Agency, which should be reviewed by
            you prior to your disclosure of any personally identifying information.
            <br /><br />
            You understand that we have no control over and assume no responsibility for personal
            information you submit to an Employer, RPO Provider or Agency, and shall have no liability for any actions or inaction taken by an Employer or Agency in connection therewith.
            <br /><br />
            You acknowledge and agree that <b>MedLink</b> is not responsible or liable for any loss or
            damage to any person arising from the use of any Personal, Professional and/or
            Organisation Information you may provide, or otherwise in connection with any
            obligations of any such Employer, RPO Provider and/or Agency, whether in connection
            with its own website or otherwise. You hereby waive any and all claims, and release
            MedLink from any liability for, any losses or damages that may be caused by or related
            to your use of an Employer, RPO Provider or Agency website,s your application,
            interviews and other interactions with any Employer, RPO Provider and/or Agency, and
            any unauthorized disclosure of any of your Personal Information by any Employer, RPO
            Provider and/or Agency.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Online Tracking, Cookies, and Ad Choices
          </Typography>
          <Typography variant="body1">
            We use Cookies, which are small text files stored on a user’s electronic device to help us
            recognize you on the MedLink Website, enhance your user experience, understand your
            usage of our services, and ultimately show you advertising and marketing content that
            is relevant based on your browsing choices. Thus, while browsing the MedLink Website
            – whether or not you create a Member or Employer Profile and register with MedLink –
            we and online advertising and marketing networks with whom we partner may place
            Cookies (or similar technology) on your device to deliver ads and marketing material
            tailored to your preferences or interests based on your online activities. By visiting the
            MedLink Website, you consent to the placement of Cookies or similar identifiers on your
            web browser. In other words, both Registered User and <i>Non-Registered Users.</i> may be
            subject to targeted advertising and marketing via Cookies.
            <br /><br />
            If you are concerned about cookies stored on your computer, we encourage you to
            follow your web browser’s guidance for deleting cookies after completing a browsing
            session. Opting out of targeted advertising and marketing will not prevent you from
            seeing ads entirely, but the ads will no longer be delivered to you via targeting methods.
            You can also control the receipt of Cookies through your browser’s settings. Please note
            that some of our services may not function properly if Cookies are disabled.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Log Information
          </Typography>
          <Typography variant="body1">
            When you access our Website and/or your MedLink Account, our servers automatically
            record information sent from your browser, which may include your web request,
            Internet Protocol address, domain names, referring Uniform Resource Locator, browser
            type, browser language, and operating system; the date and time of your request and
            access; and Cookies that may uniquely identify your browser (collectively, <b>“Usage
              Data”).</b> We may combine Usage Data with Personal Information in a manner that enables us to trace Usage Data to an individual user, and may collect, use, preserve and
            disclose Usage Data in any manner that we may collect, use, preserve and disclose
            Personal Information as provided herein (whether Usage Data is combined with any
            Personal Information or otherwise).
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Use, Disclosure, and Sharing of Personal Information
          </Typography>
          <Typography variant="body1">
            Once you have registered for MedLink, we may use and/or disclose your Personal
            Information to perform job search services and for other purposes, including the
            following:
          </Typography>
          <Typography variant="body1" sx={{ pl: 6, pt: 1.5, pb: 2.5 }}>
            <ul>
              <li>
                Provide you with access to MedLink Services.
              </li>
              <li>
                Send you job search-related information via email, text message, phone call and direct mail.
              </li>
              <li>
                To match you with potential with open job positions.
              </li>
              <li>
                Contact you to gather more information related to our Services.
              </li>
              <li>
                To make improvements, customizations and/or other modifications to the Website and Services.
              </li>
              <li>
                Invite you to MedLink events, including, without limitation, job fairs.
              </li>
              <li>
                Comply with legal and regulatory requirements.
              </li>
              <li>
                Provide updates regarding your Account and Services provided by MedLink.
              </li>
              <li>
                To notify you about changes to our Website or any Services or other products we offer or provide through it; and
              </li>
              <li>
                For any other purpose with your consent, if required under applicable laws.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1">
            We may use and/or disclose aggregated, de-identified information about our users, and
            non-aggregated information that does not identify any individual, without restriction.
            <br /><br />
            MedLink will not distribute, sell, rent, transfer, or otherwise disclose your Personal
            Information to any third party, except as follows:
          </Typography>
          <Typography variant="body1" sx={{ pl: 6, py: 2.5 }}>
            <ul>
              <li>
                If you are a Member, we may disclose your information, including Personal Information, to Employers, RPO Providers and Agencies for purposes of providing you the Services;
              </li>
              <li>
                If you are an Employer, Agency or RPO Provider, we may disclose your
                information to Members for purposes of providing the Services, and to
                Non-Registered Users for purposes of displaying job postings and other
                employment matching services;
              </li>
              <li>
                To other third party owned employment related websites;
              </li>
              <li>
                To our subsidiaries and/or affiliates;
              </li>
              <li>
                To a buyer or other successor in the event of a merger, divestiture, restructuring,
                reorganisation, dissolution or other sale or transfer of all or any portion of our
                assets, whether as a going concern or as part of a bankruptcy, liquidation or
                similar proceeding, in which Personal Information held by MedLink about our
                Website users is among the assets transferred;
              </li>
              <li>
                To business partners and suppliers as necessary to perform services on behalf of
                MedLink, including without limitation DMD Marketing;
              </li>
              <li>
                To third-party business partners providing special offers related to your
                healthcare practice or job search;
              </li>
              <li>
                If we believe disclosure is necessary to identify, contact, or bring legal action
                against someone who may be injuring or interfering with MedLink’s rights or
                property, or otherwise harming any other individual by utilising MedLink’s
                website or services;
              </li>
              <li>
                To enforce or apply our Terms of Use and other agreements;
              </li>
              <li>
                When you have consented to such disclosure; and
              </li>
              <li>
                To comply with any court order, law or legal process, including responding to any
                government or regulatory request.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1">
            Any disclosures made by you to a third party, including Employers, RPO Providers,
            Agencies and Members, are not covered by this Privacy Policy, though they may be
            governed by privacy policies of those third parties.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Employer Candidate Data
          </Typography>
          <Typography variant="body1">
            Use by Us: We may aggregate Employer Candidate Data with similar data received from
            the operations of our other customers, process and assemble such aggregated data for
            its internal business purpose. However, we will not transfer, disclose, lease or sell such
            data to any third parties, unless such data is in an anonymized format, with no personal
            information identifiable to any particular individual. Employers retain ownership of all
            Employer Candidate Data, provided, however, you acknowledge and agree that MedLink
            shall have the right to use and disclose such Employer Candidate Data as provided in
            this Privacy Policy and the Terms of Use. By using our Services and Portals, you hereby
            grant to MedLink any and all consent and authority that may be required for the use
            and storage of the Employer Candidate Data. You acknowledge that MedLink may use
            the Aggregated Data (as defined in the Terms of Use) to provide additional services to
            its users, including the copying, publication, distribution, display, licensing or sale of
            Aggregated Data (only in an anonymized form) and related or similar other statistics or
            data to third parties pursuant to a separate licensing or services arrangement or
            agreement. MedLink will be the owner of all right, title and interest in and to Aggregated
            Data.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Other Websites
          </Typography>
          <Typography variant="body1">
            Our Services enable you to link directly to other websites, including Employer websites.
            Personal Information you provide to MedLink to enable creation of your Account and to
            facilitate the use of our Services is handled pursuant to terms of this Privacy Policy and
            our Website’s Terms of Use; other websites, however, may have different privacy
            policies, and we encourage you to read them. Further, for your convenience, you may
            be directed by MedLink (through posted links or otherwise) to websites that are not
            owned or controlled by MedLink and that may collect personal information from you.
            You access those sites at your own risk. <br /><br />
            We also do not exercise control of other websites that may display information about
            MedLink and our Services, or direct how those other websites may collect, distribute, or
            otherwise use your personal information. Such websites may place their own Cookies or
            similar files on your computer, collect data, or solicit personal information from you. We
            do not guarantee the security of any information that you may disclose on other
            websites, and MedLink is not responsible or liable for those websites’ policies, actions,
            or content.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            User Communications
          </Typography>
          <Typography variant="body1">
            In order to process your inquiries, respond to your requests, and improve our services,
            we may collect and retain electronic messages, mail, and other communications that
            you send to MedLink or that you may send to other Registered Users, as well as the
            information contained therein or associated therewith, including without limitation,
            read receipts, user opens and click through rates.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Retention of Data
          </Typography>
          <Typography variant="body1">
            Unless otherwise prohibited by applicable laws, we may retain residual information
            about you, including in our backup files or database, particularly when such retention is
            required by law or is pursuant to legitimate business purposes. You agree that we are
            under no obligation to delete or modify information that you have previously chosen to
            provide us. Please remember that if we have already disclosed some of your Personal
            Information to third parties, we cannot access that Personal Information any longer and
            cannot force the deletion or modification of that information by the parties to whom we
            have made those disclosures.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "600", textDecoration: "underline", pt: 2.5 }}>
          Your Rights
        </Typography>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Choices for Personal Information
          </Typography>
          <Typography variant="body1">
            We will ask for your consent prior to collecting or using Personal Information for any
            purpose other than those described in this Privacy Policy or other supplementary
            privacy notices. You may be given the option to opt out of some of our data-collection
            practices. If we propose to use Personal Information for any purpose other than those
            described in this Privacy Policy or other supplementary privacy notices, we will provide
            you with an effective way to opt out of such use. Please note that declining to submit
            Personal Information for any MedLink Service may prevent us from being able to
            provide that Service to you.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Accessing, Updating, and Deleting Data from your Account
          </Typography>
          <Typography variant="body1">
            When you use MedLink, we work to provide you the ability to access, review, correct,
            edit, or remove the Personal Information and related content that you have provided to
            us. You can do this by logging into MedLink and accessing your Account. You must
            identify yourself before we can process any request to access, review, correct, edit, or
            remove such information. Although most changes will occur immediately, some
            information may stay stored on your browser’s web cache. We take no responsibility
            and are not liable for information stored in your cache or on any other electronic
            devices through which you may access MedLink. <br /><br />
            We may decline to process requests that are unreasonably repetitive or systematic,
            require disproportionate technical effort, jeopardise the privacy of others, or would be
            extremely impractical. (In some instances, a request that requires disproportionate
            technical effort to accommodate may be processed for an additional fee.) You authorize
            us to use and disclose, in accordance with this Privacy Policy and the Terms of Use, any
            new or modified information that you provide. Please note our data retention practices
            identified above.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Opt-Out/Changing Your Account
          </Typography>
          <Typography variant="body1">
            You may unsubscribe or opt out of any of our email lists, electronic newsletters,
            bulletins, guides or marketing campaigns at any time by following the instructions
            included in such email or other communication, or by contacting our service team by
            phone at 040 3570 4798 (select Option 2) or emailing them at
            support@medlinkjobs.com. <br /><br />
            If you wish to change the status of your Account, you may so do by calling our service
            team by phone at 040 3570 4798 (select Option 2) or emailing them at <b><a href="info@medlinkjobs.com">info@medlinkjobs.com</a> If you no longer wish to use our Services or maintain your Account as active, upon your request, we will, as soon as practicable and in
              accordance with all applicable laws, deactivate your Account and login
              information. After we have deactivated your Account, information about your
              Account may remain on the Website and/or in our databases and we may
              continue to use log information in accordance with this Privacy Policy. We may
              also retain your Employer or Member Profile information to comply with any
              applicable laws, prevent fraud, resolve disputes, troubleshoot problems, assist
              with any lawful investigations, enforce our Terms of Use (in accordance with the
              Terms of Use and any applicable Marketing Terms and Conditions), or to take any
              other actions permitted by law. <br /><br />
              Please note, that Registered Users and other parties who have gained access to
              the Member Database may have retained a copy of your MedLink Member Profile
              in their own files or databases. We cannot control the retention, use or privacy of
              such profiles that have been downloaded by third parties. Accordingly, you should
              not include information in your MedLink Member Profile that you do not want
              made public.
            </b>
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "600", textDecoration: "underline", pt: 2.5 }}>
          Your Responsibilities
        </Typography>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            As a user of our Website, you owe certain obligations to MedLink and other users,
            including potential legal obligations. You are also expected to extend to all other
            users of MedLink’s services various common courtesies broadly accepted by the
            professional community. You must:
          </Typography>
          <Typography variant="subtitle1" sx={{ pl: 6, pb: 3, fontWeight: "600", }}>
            <ul>
              <li>
                Abide by the terms and conditions of the governing and most current
                Privacy Policy, Terms of Use, and other applicable MedLink policies;
              </li>
              <li>
                NEVER provide false or fraudulent information when setting up an
                Employer or Member Profile or posting an opportunity to the Job Bank;
              </li>
              <li>
                NEVER set up an Employer or Member Profile or post an opportunity to the
                Job Bank for illegal or nefarious purposes;
              </li>
              <li>
                Respect all intellectual-property rights (e.g., trademarks or copyrights) that
                may belong to MedLink, other users, or third parties;
              </li>
              <li>
                Refrain from uploading, posting, or disseminating any personal information
                that may infringe on the rights of others or be deemed offensive, injurious,
                discriminatory, prejudiced, or bigoted; and
              </li>
              <li>
                Safeguard your username and password by not sharing it with others;
              </li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" sx={{ pb: 3, fontWeight: "600", }}>
            MedLink retains sole discretion to restrict, suspend, or terminate any user’s
            Account for any violation of the obligations or requirements set forth in our
            Terms of Use or other governing policies. <br /><br />
            Indemnification<br /><br />
            <i>Please refer to the Terms of Use for the indemnification requirements.</i><br /><br />
            Acceptance of These Terms <br /><br />
            By using the MedLink Website and agreeing to the Terms of Use and your
            Contract, you acknowledge and agree to the terms and conditions of this Privacy
            Policy. If you object to these terms, please immediately stop using this Website.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "600", textDecoration: "underline", pt: 2.5 }}>
          Children’s Privacy
        </Typography>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            MedLink is committed to protecting the privacy of children and encourages
            parents and guardians to take an active role in their children’s online activities
            and interests. MedLink is not directed to children or designed to attract them.
            You must be at least 18 years of age to use our Website and Services. MedLink
            does not knowingly collect, use, or disclose personal information about users that
            are under 18 years of age. If we later learn that a user is under 18 years of age, we
            will remove that user’s personal information from our databases and prevent the
            user from further using the MedLink Website and its Services. If you become
            aware that a user is under 18 years of age, please notify us immediately at
            info@medlinkjobs.com. If you are a user who is identified in this manner, we may
            require you to submit suitable proof of age, such as a copy of government-issued
            identification, in order to continue using the MedLink Website.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "600", textDecoration: "underline", pt: 2.5 }}>
          Security, Technology, and Amendments to Policies
        </Typography>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", pt: 2.5 }}>
            Security
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            In accordance with industry standards, we have implemented security safeguards
            to protect MedLink and its users against unauthorized accessing, disclosure,
            alteration, or destruction of Personal Information. Some of the safeguards may
            include:
          </Typography>
          <Typography variant="subtitle1" sx={{ pl: 6, pb: 3, fontWeight: "600", }}>
            <ul>
              <li>
                Requiring passwords in order to access sections of the Website or certain
                data;
              </li>
              <li>
                Employing firewalls to prevent unauthorized Website and data access;
              </li>
              <li>
                Encrypting communications between your browser and the MedLink
                Website through HTTPS (HyperText Transfer Protocol Secure);
              </li>
              <li>
                Restricting access to Personal Information to certain MedLink employees,
                contactors, agents, and operators; and
              </li>
              <li>
                Requiring MedLink employees, contactors, agents, and operators to agree
                to and comply with strict confidentiality agreements, the violation of which
                include discipline, termination, and criminal prosecution.
              </li>
            </ul>
          </Typography>
          <Typography variant="subtitle1" sx={{ pb: 3, fontWeight: "600", }}>
            While we are always looking to take reasonable steps to improve our security, the
            Internet can never be completely secure, and we cannot guarantee the security of
            the information transmitted to MedLink. In particular, emails, messages, and
            other communications between MedLink users are not encrypted, and you should
            never use these communication methods to convey personal information that
            you wish to keep private. Ultimately, you are responsible for protecting the
            security of your password and login information.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", pt: 2.5 }}>
            Data Breach
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            While MedLink employs multiple security measures to maintain data security,
            data breaches can occasionally happen, even to the most secure of systems. In
            the event of such a situation, MedLink will, in compliance with any applicable
            federal and state data breach laws, endeavour to timely notify all users whose
            Personal Information MedLink knows or has clear reason to believe was accessed
            by an unauthorized person.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", pt: 2.5 }}>
            Borders
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            Your Personal Information will be processed in conformance with this Privacy
            Policy. However, that processing may occur in countries with different laws as
            regards to your privacy. By using MedLink and providing any Personal
            Information, you consent to the transfer of data from your country to a country
            that may have different privacy laws.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", pt: 2.5 }}>
            Changes to the Privacy Policy
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
            MedLink reserves the right, at any time, to change, modify, or revise this Privacy
            Policy and the privacy and security practices discussed herein. We will post any
            revised version of the Privacy Policy on our Website. We will not reduce your
            rights under this Privacy Policy without your explicit consent. If we make any
            significant, material changes to the Privacy Policy, we will prominently note such
            changes on the Site and may also send notification to the last email address you
            have provided to us. Continued use of the MedLink Website and our Services
            following such notice of changes constitutes your acknowledgement of them and
            agreement to be bound by their terms and conditions.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "600", textDecoration: "underline", pt: 2.5 }}>
          Contact Us
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "600", py: 2.5 }}>
          If you have any questions or concerns about our Privacy Policy, please contact us
          by sending an email to info@medlinkjobs.com.
        </Typography>
      </Box> 
    </Box>
  );
};

export default PrivacyPolicy;