import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

const region = "ap-south-1";
const provider = new CognitoIdentityProvider({ region });

export const QUERY_GETHOSPITALUSERS = {
    query: `query MyQuery {
         getHospitalUsers {
            email
            huID
            accessJobPosting
            accessResumeDB        
            name
            status    
        }
    }`
};

export const QUERY_GETMYPROFILE = {
    query: `query MyQuery {
        getMyProfile  {
            huID
            email
            accessJobPosting
            accessResumeDB
            hospitalID
            adminUser
            name
            status   
        }   
    }`
};

export const QUERY_GETJOBPOSTINGPLANS = {
    query: `query MyQuery {
        getJobPostPlans {
            features
            name
            price
            recommended
            spID
            subtext
            validity
            terms
            }       
    }`
};

export const QUERY_GETRESUMEDBPLANS = {
    query: `query MyQuery {
        getResumeDBPlans {
            features
            name
            price
            recommended
            spID
            subtext
            validity
            terms
            }
    }`
};

export const QUERY_GETSUBSCRIBEDPLANS = {
    query: `query MyQuery {
        getSubscribedPlans {
          initiatedAt
          name
          orderID
          subtext
          quantity
          amount
          status
          activeStatus
        }
      }`
};

export const QUERY_GETHOSPITAL = {
  query: `query MyQuery {
        getHospital {
            type
            taxNumber
            newsletter
            name
            locationID
            location
            hospitalID
            description
            contactPhone
            contactName
            contactEmail
        }
    }`,
};

export const QUERY_VACANCIES = {
    query: `query MyQuery {
        getVacancies {
            description
            employmentType
            experience
            jobTitle
            lastDateToApply
            location
            locationID
            maximumSalary
            minimumSalary
            postedOn
            qualification
            qualificationID
            responses
            status
            vacancyID
            vacancyType
          }
    }`
};

export const QUERY_GETHRFOLDER = {
    query: `query MyQuery {
        getFolders {
            folderID
            name
            profileCount
            userName
        }
        getFolderWiseProfilesCount {
            folderID
            profiles
        }
    }`
};

export const QUERY_HOSPITALDETAILS = {
    query: `query MyQuery {
        getHospitalDetails {
          about
          additionalPhone1
          additionalPhone2
          address
          city
          companyName
          companyType
          contactPerson
          country
          designation
          gstin
          hospitalID
          industryType
          mobile
          pan
          phoneVerified
          pincode
          profilePicURL
          reportingManager
          role
          state
          video
          website
          locationID
        }
    }`
};

export const QUERY_GETACTIVEJOBPOSTSUBSCRIPTION = {
    query: `query MyQuery {
        getActiveJobPostSubscription {
          active
          creditsLeft
        }
      }`
};

export const QUERY_GETACTIVERESUMEDBSUBSCRIPTION = {
    query: `query MyQuery {
        getActiveResumeDBSubscription {
          creditsLeft
          active
        }
      }`
};

export const QUERY_GETACTIVESUBSCRIPTIONS = {
    query: `query MyQuery {
        getActiveSubscriptions {
          credits
          createdOn
          creditsLeft
          name
          subtext
          type
          validUpto
        }
      }`
};

export const QUERY_HOSPITALPICTURES = {
    query: `query MyQuery {
        getHospitalPictures {
            haID
            name
            url
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

export const QUERY_DEPARTMENTS = {
    query: `query MyQuery {
        getDepartments {
            departmentID
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

export const QUERY_GETQUALIFICATIONS = {
    query: `query MyQuery {
        getQualifications {
          emID
          qualification
        }
    }`
};

export const QUERY_GETSPECIALIZATION = {
    query: `query MyQuery {
        getSpecialization {
            emID
            specialization
            qualification
            healthcareIndustry
            course
        }
    }`
};

export const QUERY_GET_INSTITUTE_TYPE = {
  query: `query MyQuery {
      getHITypeMaster {
        hitmID
        type
      }
    }`,
};

export const QUERY_GET_HEALTHINDUSTRY = {
    query: `query MyQuery {
      getIndustry {
        healthcareIndustry
      }
    }
  `};

export const QUERY_UNIVERSITYID = {
    query: `query MyQuery {
        getUniversityMaster   {
            name 
            umID
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

export const QUERY_GET_INDUSTRY = {
  query: ` query MyQuery {
      getHCIIndustry {
        hciID
        industry
        specialty
      }
    }`,
};

const refreshHospitalJwtToken = async () => {
    const refresh_token = sessionStorage.getItem("refreshToken");
    const refreshTokenParams = {
        ClientId: "7s0nq4fuhmi2b95ddtl8f5ipg3",
        AuthFlow: "REFRESH_TOKEN_AUTH",
        AuthParameters: {
            REFRESH_TOKEN: refresh_token,
        },
    };
    if (refresh_token.length) {
        try {
        const res = await provider.initiateAuth(refreshTokenParams);
        var access_token = res["AuthenticationResult"]["AccessToken"];
        sessionStorage.setItem("accessToken", access_token);
        console.log(access_token ? "Access token is here." : "Access token is missing.");
        return access_token;
        }
        catch {
            console.log("Catch Token Issue")
        }
    } else {
        window.location.href = "/hospital-login"
        sessionStorage.clear();
    }
}

export const gqlquery = async (query, variables) => {
    const gquery = {
        query: query.query,
        variables: variables
    };
    const access_token = sessionStorage.getItem("accessToken");
    let final_token;

    try {
        jwt_decode(access_token, {header: true});
        let decoded = jwt_decode(access_token);
        if (decoded.exp < (new Date().getTime() + 1) / 1000) {
            final_token = await refreshHospitalJwtToken(); 
        } else {
            final_token = access_token;
        } 

        return fetch(
            `${process.env.REACT_APP_HOSPITAL_FLOW_GRAPHQL_MAIN_URL}`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authority:
                        `${process.env.REACT_APP_HOSPITAL_FLOW_AUTHORITYL}`,
                    authorization: final_token,
                    referer: `${process.env.REACT_APP_HOSPITAL_FLOW_REFERER}`,
                    "accept-language": "en-US,en;q=0.9",
                },
                body: JSON.stringify(gquery),
            }
        );
    } catch (error) {
        console.log("Catch Token Issue")
        window.location.href = "/hospital-login"
        sessionStorage.clear(); 
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