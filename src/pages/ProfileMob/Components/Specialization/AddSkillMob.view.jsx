import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { gqlquery, QUERY_LISTSKILLS, QUERY_SAVED_SKILL, QUERY_SPECIALIZATIONID } from "../../../../api/index";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CircularProgress from "@mui/material/CircularProgress";

const AddSkillMob = (Props) => {
  const [isLoading, setIsLoading] = useState(true);
  // Suggested value
  const [skills, setSkills] = useState([]);
  const suggestValue = skills.map((option) => {
    return {
      label: option?.name,
      value: option?.smID,
    };
  });

  // default value
  const [savedSkills, setSavedSkills] = useState([]);
  const defaultValue = savedSkills.map((option) => {
    return {
      label: option?.name,
      value: option?.smID,
    };
  });

  const [selected, setSelected] = useState([]);
  const animatedComponents = makeAnimated();

  useEffect(() => {
    // For All Skill suggetion
    gqlquery(QUERY_SPECIALIZATIONID, null)
      .then((res) => res.json())
      .then((data) => setSkills(data?.data?.getSpecializationMaster))
      .finally((e) => console.log("All Skills Feching complete"));

    // For defaut value
    gqlquery(QUERY_SAVED_SKILL, null)
      .then((res) => res.json())
      .then((data) => setSavedSkills(data?.data.getSkillsList))
      .finally((e) => setIsLoading(false));
  }, []);

  const handleChange = (event) => {
    setSelected(event);
    console.log("This is event", event);
    console.log("This is selected", selected);
    if (event > selected) {
      let newValue;
      event.filter((option) => {
        if (!selected.includes(option)) {
          newValue = option;
        }
      });

      if (newValue.value) {
        const QUERY_SKILLS = {
          query: `mutation MyMutation {
            addSkills(smID: ${newValue?.value}) {
                  sID
                  smID
                }
              }
            `,
          variables: null,
          operationName: "MyMutation",
        };
        gqlquery(QUERY_SKILLS, null)
          .then((res) => res.json())
          .then((data) => console.log(data))
          .finally((e) => console.log("Added to Database"));
      }
    }
    if (selected > event) {
      let notExist;
      selected.filter((option) => {
        if (!event.includes(option)) {
          notExist = option;
        }
      });
      if (notExist) {
        const QUERY_DELETE_SKILLS = {
          query: `mutation MyMutation {
            deleteSkill(smID: ${notExist.value}) {
            sID
            smID
            }
            }
            `,
          variables: null,
          operationName: "MyMutation",
        };
        gqlquery(QUERY_DELETE_SKILLS, null)
          .then((res) => res.json())
          .then((data) => console.log(data))
          .finally((e) => console.log("Option delete complete"));
      }
    }
  };

  if (isLoading) {
    return (
      <Grid container sx={{ marginBlock: "1rem", px: 2 }}>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              height: "100%",
              backgroundColor: "",
              p: 2,
              boxShadow: 1,
            }}
          >
            <Typography
              component="h3"
              variant="h5"
              sx={{
                fontSize: 24,
                fontWeight: 700,
                mb: 1,
              }}
            >
              Add your Skills
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress color="inherit" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container sx={{ marginBlock: "1rem", px: 2 }}>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              height: "100%",
              backgroundColor: "",
              p: 2,
              boxShadow: 1,
            }}
          >
            <Typography
              component="h3"
              variant="h5"
              sx={{
                fontSize: 24,
                fontWeight: 700,
                mb: 1,
              }}
            >
              Add your Skills
            </Typography>

            <Select
              defaultValue={defaultValue}
              isMulti
              name="colors"
              options={suggestValue}
              classNamePrefix="select"
              components={animatedComponents}
              onChange={handleChange}
            />
          </Box>
        </Grid>
      </Grid>
    );
  }
};
export default AddSkillMob;
