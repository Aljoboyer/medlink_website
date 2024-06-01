import * as React from "react";
import { Autocomplete, Box, Button, CircularProgress, Skeleton, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { gqlquery, QUERY_SAVED_SKILL, QUERY_SPECIALIZATIONID } from "../../../../api/index";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useAuth from "../../../../hooks/useAuth";
import {
  ThemeProvider,
  createTheme,
  experimental_sx as sx,
} from '@mui/material/styles';
import Chip from '@mui/material/Chip'; 


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const themeMuiChip = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: sx({ 
          px: 1,
          py: 0.25,
          border: "none", 
          backgroundColor: "var(--clr-blue-light)", 
          borderRadius: 16, 
        }),
        label: { 
          color: "var(--clr-blue-footer)",
          pr: 2,
          display: "inline-block",
          fontSize: "13px", 
        },
        deleteIcon: {
          color: "var(--clr-blue-footer)"
        },
      },
    },
  },
});


const Specializations = () => {
  const { handleStrengthUpdate } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [warn, setWarn] = useState(false);
  const [updateSkill, setUpdateSkill] = useState(false);
  const [savedSkills, setSavedSkills] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [isLoadButton, setIsLoadButton] = useState(false);
  const [selected, setSelected] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // For defaut value
    gqlquery(QUERY_SAVED_SKILL, null)
      .then((res) => res.json())
      .then((data) => setSavedSkills(data?.data?.getSkillsList))
      .finally((e) => {
        setIsLoading(false)
      });
  }, [updated]);

  useEffect(() => {
    // For All Skill suggetion
    gqlquery(QUERY_SPECIALIZATIONID, null)
      .then((res) => res.json())
      .then((data) => {
        setSkills(data?.data?.getSpecializationMaster);
      })
      .finally((e) => {
        // setIsLoading(false)
      });
  }, [savedSkills]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //Handle save changes
  const handleSaveSelectedSkills = async () => {
    if (selected.length > 0) {
      setWarn(false);
      const DELETEALL_SKILLS = {
        query: `mutation MyMutation {
              deleteSkill
            }
              `,
        variables: null,
        operationName: "MyMutation",
      };

      setIsLoadButton(true)
      await gqlquery(DELETEALL_SKILLS, null)
        .then((res) => res.json())
        .then((data) => console.log("deleteQuery: ", data));

      selected.forEach(async (item) => {
        const SAVEALL_SKILLS = {
          query: `mutation MyMutation {
          addSkills(smID: ${String(item?.smID)}) {
            sID
            smID
          }
        }`,
          variables: null,
          operationName: "MyMutation",
        };

        await gqlquery(SAVEALL_SKILLS, null)
          .then((res) => res.json())
          .then((data) => {
            if (data?.data?.addSkills?.sID) {
              setUpdateSkill(true);
              handleStrengthUpdate();
            }
          })
          .finally(() => {
            setIsLoadButton(false)
            setSelected([]);
            setUpdated((prev) => setUpdated(!prev));
          });
      });
    }
    else {
      setUpdateSkill(false);
      setWarn(true);
    }
    setOpen(true);
  }


  if (isLoading) {
    return (
      <Box sx={{ background: "var(--clr-white)", boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)", border: matches ? "1px solid #E4EEF5" : "", borderRadius: 2, p: 2.5, my: 7 }}>
        <Box
          sx={{
            height: "100%",
          }}
        > 
          <Box sx={{ textAlign: "center" }}>
            {/* <CircularProgress color="inherit" /> */}
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box sx={{ background: "var(--clr-white)", boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)", border: matches ? "1px solid #E4EEF5" : "", borderRadius: 2, p: 2.5, my: 7, pb: 4 }}>
        {updateSkill && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Your Skills is Succesfully Updated.
          </Alert>
        </Snackbar>}
        {warn && <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
            Please Update your SkillSet First!
          </Alert>
        </Snackbar>}
        <Box
          sx={{
            height: "100%",
          }}
        >
          <Typography
            component="div"
            // variant="h5"
            sx={{
              fontSize: matches ? "18px" : "24px",
              fontWeight: 700,
              mb: "15px",
              color: "var(--clr-blue-footer)"
            }}
          >
            Add your Specializations
          </Typography>

          <Autocomplete
            multiple
            id="tags-outlined"
            defaultValue={savedSkills}
            getOptionLabel={(option) => option?.name}
            options={skills?.filter(({ name: saved }) => !selected?.some(({ name: newSelect }) => newSelect === saved))?.length === 90 ? skills?.filter(({ name: saved }) => !savedSkills?.some(({ name: newSelect }) => newSelect === saved)) : skills?.filter(({ name: saved }) => !selected?.some(({ name: newSelect }) => newSelect === saved))}
            onChange={(event, val) => setSelected(val)}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} placeholder="Add Your Skills" />
            )}
            renderTags={(value, getTagProps) =>
              value?.map((option, index) => (
                <ThemeProvider theme={themeMuiChip}>
                  <Chip
                    variant="outlined"
                    label={option?.name}
                    {...getTagProps({ index })}
                  />
                </ThemeProvider>
              ))
            }
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, pt: 4 }}>
          {
            matches ? (
              <Button
                sx={{ borderRadius: "20px", fontSize: "14px", fontWeight: "600" }}
                variant="contained"
                onClick={handleSaveSelectedSkills}
              >
                {isLoadButton ? (<CircularProgress size={25} sx={{ color: "white" }} variant="indeterminate" />) : "Save"}

              </Button>
            ) : (
              <Button
                sx={{ fontSize: "16px", px: 5, py: 1.2, borderRadius: 16 }}
                variant="contained"
                onClick={handleSaveSelectedSkills}
              >
                {isLoadButton ? (<CircularProgress size={25} sx={{ color: "white" }} variant="indeterminate" />) : "Save"}
              </Button>
            )
          }

        </Box>
      </Box>
    );
  }
};

export default Specializations;
