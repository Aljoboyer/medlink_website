import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import jwt_decode from "jwt-decode";

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

export const QUERY_LISTPROFILES = {
    query: `query MyQuery {
        getProfile {
            name 
            locationID
            cityWithState
            exp
            expMonths
            phone
            salary
            salaryThousands    
            activelySearching
            profilePicURL
            newsletter
            phoneVerified
            industry
            industryID
            specialty
            specialtyID
            workStatus
            experiencedType
        }
    }`
};

export const QUERY_GETRESUME = {
    query: `query MyQuery {
        getResume {
            filename
            headline
            uploadedAt
            url
        }
    }`
};

export const QUERY_GETRESUMEHEADLINE = {
    query: `query MyQuery {
        getResume {
            headline
        }
    }`
};

export const QUERY_GETSKILLSLIST = {
    query: `query MyQuery {
        getSkillsList  {          
            name
        }
    }`
};

export const QUERY_GETEDUCATIONLIST = {
    query: `query MyQuery {
        getEducationList   {          
            courseName
        }
    }`
};

export const QUERY_GETEXPERIENCE = {
    query: `query MyQuery {
        getExperienceList    {          
            hospital
        }
    }`
};
export const QUERY_GETMEMBERSHIPS = {
    query: `query MyQuery {
        getMemberships     {          
            organization
        }
    }`
};

export const QUERY_GETPERSONALDETAILS = {
    query: `query MyQuery {
        getPersonalDetails     {          
            gender
        }
    }`
};

export const QUERY_GETCAREERPROFILEPERCENTAGE = {
    query: `query MyQuery {
        getCareerProfile     {          
            departmentName
        }
    }`
};

export const QUERY_COURSEID = {
    query: `query MyQuery {
        getCourseMaster {
            cmID
            name
        }
    }`
};

export const QUERY_SPECIALIZATIONID = {
    query: `query MyQuery {
        getSpecializationMaster  {
            name
            smID
        }
    }`
};

export const QUERY_UNIVERSITYID = {
    query: `query MyQuery {
        getUniversityMaster   {
            name 
            umID
        }
    }`
};

export const QUERY_GETEDUCATION = {
    query: `query MyQuery {
        getEducationList {
            course
            courseType
            eduID
            emID
            healthcareIndustry
            specialization
            qualification
            university
            universityID
            yearOfPassing
        }
    }`
};

export const QUERY_SAVED_SKILL = {
    query: `query MyQuery {
        getSkillsList {
            name
            smID
           }
        }`
};

export const QUERY_DESIGNMASTER = {
    query: `query MyQuery {
        getDesignationMaster {
            dmID 
            name
        }
    }`
};

export const QUERY_HOSPITALMASTER = {
    query: `query MyQuery {
        getHospitalMaster {
            hmID 
            name
        }
    }`
};

export const QUERY_NOTICEMASTER = {
    query: `query MyQuery {
        getNoticePeriodMasters {
            npID 
            notice
        }
    }`
};

export const QUERY_GETEXPERIENCELIST = {
    query: `query MyQuery {
        getExperienceList {
            currentlyWorking
            description
            designation
            designationID
            employmentType
            expID
            healthInstituteID
            healthInstituteTypeID 
            instituteName
            instituteType
            jobType
            noticePeriodID
            startingMonth
            startingYear
            workingMonth
            workingYear
        }
    }`
};

export const QUERY_GETMEMBERSHIP = {
    query: `query MyQuery {
         getMemberships {
            lifeMembership
            memID
            organization
            positionHeld
        }
    }`
};

export const QUERY_GETPAPERS = {
    query: `query MyQuery {
         getPapers {
            description
            fileURL
            month
            paperID
            title
            url
            year 
            fileName
        }
    }`
};

export const QUERY_GETAWARDS = {
    query: `query MyQuery {
         getAwards {
            awardID
            description
            month
            name
            url
            year             
        }
    }`
};

export const QUERY_PERSONAL_DETAILS = {
    query: `query MyQuery {
        getPersonalDetails {
          bothAddressSame
          dateofBirth
          differentlyAbled
          gender
          maritalStatus
          pdID
          permanentAddressL1
          permanentAddressL2
          permanentCity
          permanentCountry
          permanentLocationID
          permanentState
          permanentZip
          personalInterest
          presentAddressL1
          presentAddressL2
          presentCity
          presentCountry
          presentLocationID
          presentState
          presentZip
          professionalInterest
          spouseName
          spouseOccupation
        }
      }`
};

export const QUERY_LANGUAGES_KNOWN = {
    query: `query MyQuery {
        getLanguagesKnown {
            language
            lknID
            proficiency
            read
            speak
            write
            }
        }`
}

export const QUERY_SAVEDJOBS = {
    query: `query MyQuery {
        getSavedJobs {
            description
            employmentType
            experience
            hospitalID
            jobTitle
            lastDateToApply
            location
            maximumSalary
            minimumSalary
            name
            postedOn
            qualification
            savedJob
            vacancyID
            vacancyType
        }
    }`
}; 
export const QUERY_DEPARTMENTS = {
    query: `query MyQuery {
        getDepartments {
            departmentID
            name
            }
    }`
};

export const QUERY_GETCAREERPROFILE = {
    query: `query MyQuery {
        getCareerProfile {
            cpID
            desiredJobType
            desiredEmploymentType
            desiredShift
            expectedSalaryEnd
            expectedSalaryStart 
            industryID
            roleCategoryID
            emailOpted
            phoneOpted
            roleCategoryName
            industryName
        }
    }`
};

export const GET_PREFERRED_LOCATION = {
    query: `query MyQuery {
      getPreferredWorkLocation {
        cityWithState
        locationID
        pwlID
      }
    }
  `,
    variables: null,
    operationName: "MyQuery",
};

export const QUERY_GETCANDIDATEAVAILABILITY = {
    query: `query MyQuery {
        getCandidateAvailability {
            availID
            day
            fromTime
            toTime
        }
    }`
};

export const QUERY_GETHOSPITAL = {
    query: `query MyQuery {
         getHospital {
            contactEmail
            contactName
            contactPhone
            hospitalID
            location
            name 
            shortName
            taxNumber
            type             
        }
    }`
};

export const QUERY_SEARCHTOP4JOBS = {
    query: `query MyQuery {
        searchTop4Jobs {
            description
            experience
            employmentType
            hospitalID
            jobTitle
            lastDateToApply
            location
            maximumSalary
            minimumSalary
            name
            postedOn
            qualification
            savedJob
            vacancyID
            vacancyType     
        }
    }`
};

const refreshJwtToken = async () => {
    const refresh_token = sessionStorage.getItem("refreshToken");
    const refreshTokenParams = {
        ClientId: "4mb15m3s257i8lh7d7ts15irtt",
        AuthFlow: "REFRESH_TOKEN_AUTH",
        AuthParameters: {
            REFRESH_TOKEN: refresh_token,
        },
    };

    if (refresh_token.length) {
        try {
            const res = await provider.initiateAuth(refreshTokenParams);
            var access_token = res["AuthenticationResult"]["AccessToken"];
            var idToken = res["AuthenticationResult"]["IdToken"];
            sessionStorage.setItem("accessToken", access_token);
            sessionStorage.setItem("idToken", idToken);
            console.log(access_token ? "Access token is here." : "Access token is missing.");
            // final_token = access_token
            return access_token;
        }
        catch {
            console.log("Catch Problem")
        }
    } else {
        window.location.href = "/login"
        sessionStorage.clear();
    }
}

export const gqlquery = async (query, variables) => {
    const gquery = {
        query: query.query,
        variables: variables
    }
    const access_token = sessionStorage.getItem("accessToken");
    let final_token;
     
    try {
        jwt_decode(access_token, { header: true })
        let decoded = jwt_decode(access_token);
        
        if (decoded.exp < (new Date().getTime() + 1) / 1000) {
            final_token = await refreshJwtToken();
            // console.log("final_token: ", final_token);
        } else {
            final_token = access_token
        }

        return fetch(
            `${process.env.REACT_APP_DOCTORS_FLOW_GRAPHQL_MAIN_URL}`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authority:
                        `${process.env.REACT_APP_DOCTORS_FLOW_AUTHORITYL}`,
                    authorization: final_token,
                    referer: `${process.env.REACT_APP_DOCTORS_FLOW_REFERER}`,
                    "accept-language": "en-US,en;q=0.9",
                },
                body: JSON.stringify(gquery),
            }
        )

    } catch (error) {
        final_token = await refreshJwtToken();

        return fetch(
            `${process.env.REACT_APP_DOCTORS_FLOW_GRAPHQL_MAIN_URL}`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authority:
                        `${process.env.REACT_APP_DOCTORS_FLOW_AUTHORITYL}`,
                    authorization: final_token,
                    referer: `${process.env.REACT_APP_DOCTORS_FLOW_REFERER}`,
                    "accept-language": "en-US,en;q=0.9",
                },
                body: JSON.stringify(gquery),
            }
        )

    }

} 


export const gqlOpenQuery = (query, variables) => {
    const gquery = {
        query: query.query,
        variables: variables,
    }
    return fetch(
        `${process.env.REACT_APP_FAQ_FLOW_GRAPHQL_MAIN_URL}`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authority: `${process.env.REACT_APP_FAQ_FLOW_AUTHORITYL}`,
                referer: "https://ap-south-1.console.aws.amazon.com",
                "accept-language": "en-US,en;q=0.9",
                "x-api-key": `${process.env.REACT_APP_FAQ_FLOW_X_API_KEY}`,
                "X-Amz-User-Agent": `${process.env.REACT_APP_FAQ_FLOW_USER_AGENT}`,
            },
            body: JSON.stringify(gquery),
        }
    )
}
