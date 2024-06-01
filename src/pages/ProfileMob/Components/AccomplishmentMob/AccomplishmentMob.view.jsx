import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  FormControl,
  TextField,
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Box,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  gqlquery,
  QUERY_GETAWARDS,
  QUERY_GETMEMBERSHIP,
  QUERY_GETPAPERS,
} from "../../../../api";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import AttachmentIcon from "@mui/icons-material/Attachment";

// Custom style for Select dropdown
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 180,
  },
}));

// month Array
const allMonths = [
  {
    value: 1,
    name: "January",
  },
  {
    value: 2,
    name: "February",
  },
  {
    value: 3,
    name: "March",
  },
  {
    value: 4,
    name: "April",
  },
  {
    value: 5,
    name: "May",
  },
  {
    value: 6,
    name: "June",
  },
  {
    value: 7,
    name: "July",
  },
  {
    value: 8,
    name: "August",
  },
  {
    value: 9,
    name: "September",
  },
  {
    value: 10,
    name: "October",
  },
  {
    value: 11,
    name: "November",
  },
  {
    value: 12,
    name: "December",
  },
];

const areEqual = (prevProps, nextProps) => true;

const Accomplishments = React.memo((props) => {
  const [showMembership, setShowMembership] = useState(false);
  const [updateMembersip, setUpdateMembership] = useState(false);
  const [showPaper, setShowPaper] = useState(false);
  const [updatePaper, setUpdatePaper] = useState(false);
  const [showAward, setShowAward] = useState(false);
  const [updateAward, setUpdateAward] = useState(false);
  const [membershipDetails, setMembershipDetails] = useState([]);
  const [paperDetails, setPaperDetails] = useState([]);
  const [awardDetails, setAwardDetails] = useState([]);
  const [memberShipItem, setMemberShipItem] = useState([]);
  const [papersItem, setPapersItem] = useState([]);
  const [awardsItem, setAwardsItem] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState(allMonths);
  const [updateList, setUpdateList] = useState(false);
  const [error, setError] = useState("");
  const [errDate, setErrDate] = useState("");
  const [errInput, setErrInput] = useState("");
  const classes = useStyles();
  const [values, setValues] = useState({
    positionHeld: "",
    organizationName: "",
    lifeMembership: "",
    title: "",
    url: "",
    year: "",
    month: "",
    description: "",
    awardname: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  useEffect(() => {
    gqlquery(QUERY_GETMEMBERSHIP, null)
      .then((res) => res.json())
      .then((datas) => setMembershipDetails(datas.data?.getMemberships));
  }, [updateList]);

  useEffect(() => {
    gqlquery(QUERY_GETPAPERS, null)
      .then((res) => res.json())
      .then((datas) => setPaperDetails(datas.data?.getPapers));
  }, [updateList]);

  useEffect(() => {
    gqlquery(QUERY_GETAWARDS, null)
      .then((res) => res.json())
      .then((datas) => setAwardDetails(datas.data?.getAwards));
  }, [updateList]);

  useEffect(() => {
    function getYears() {
      let yearArr = [];
      let date = new Date();
      let year = date.getFullYear();
      for (let i = 1900; i <= year; i++) {
        yearArr.push(i);
      }
      setYears(yearArr.reverse());
    }
    getYears();

    setMonths(allMonths);
  }, []);

  const open = (arg, item) => {
    switch (arg) {
      case "memberposition":
        setShowMembership((prevData) => !prevData);
        break;
      case "updatememberposition":
        setUpdateMembership((prevData) => !prevData);
        setMemberShipItem(item);
        break;
      case "paper":
        setShowPaper((prevData) => !prevData);
        break;
      case "updatepaper":
        setUpdatePaper((prevData) => !prevData);
        setPapersItem(item);
        break;
      case "award":
        setShowAward((prevData) => !prevData);
        break;
      case "updateaward":
        setUpdateAward((prevData) => !prevData);
        setAwardsItem(item);
        break;
      default:
        setShowMembership((prevData) => prevData);
    }
  };

  const handleMembershipAndPositons = (e) => {
    if (values.positionHeld === "" || values.organizationName === "") {
      setErrInput("Please, give a job description.");
    } else {
      setErrInput("");
    }

    if (values.lifeMembership === "") {
      setError("Please, select an option.");
    } else {
      setError("");
    }

    if (
      values.lifeMembership === "" ||
      values.positionHeld === "" ||
      values.organizationName === ""
    ) {
      return console.log(error, errInput, values);
    }

    const QUERY_POSTMEMBERSHIPPOSITION = {
      query: `mutation MyMutation {
                  addMembership (
                    lifeMembership: ${Boolean(Number(values.lifeMembership))},
                    organization: "${values.organizationName}",
                    positionHeld: "${values.positionHeld}"
                    ) {
                      lifeMembership
                      memID
                      organization
                      positionHeld
                      }
                    }
                  `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_POSTMEMBERSHIPPOSITION, null)
      .then((res) => res.json())
      .then((datas) => setUpdateList(!updateList))
      .finally((e) =>
        console.log("adding positions and membership details to database")
      );

    setErrInput("");
    setError("");

    values.organizationName = "";
    values.positionHeld = "";
    values.lifeMembership = "";

    setValues({
      organizationName: "",
      positionHeld: "",
      lifeMembership: "",
    });

    setShowMembership((prevData) => !prevData);
  };

  const handleUpdateMembership = (e) => {
    if (values.positionHeld === "" || values.organizationName === "") {
      setErrInput("Please, give a job description.");
    } else {
      setErrInput("");
    }

    if (values.lifeMembership === "") {
      setError("Please, select an option.");
    } else {
      setError("");
    }

    if (
      values.lifeMembership === "" ||
      values.positionHeld === "" ||
      values.organizationName === ""
    ) {
      return console.log(error, errInput, values);
    }

    const QUERY_UPDATEMEMBERSHIPPOSITION = {
      query: `mutation MyMutation {
                    updateMembership (
                      lifeMembership: ${Boolean(Number(values.lifeMembership))},
                      memID: ${Number(memberShipItem.memID)},
                      organization: "${values.organizationName}",
                      positionHeld: "${values.positionHeld}"
                      ) {
                        lifeMembership
                        memID
                        positionHeld
                        organization                        
                        }
                      }
                    `,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_UPDATEMEMBERSHIPPOSITION, null)
      .then((res) => res.json())
      .then((datas) => setUpdateList(!updateList))
      .finally((e) =>
        console.log("updating positions and membership details to database")
      );

    setErrInput("");
    setError("");

    values.organizationName = "";
    values.positionHeld = "";
    values.lifeMembership = "";

    setValues({
      organizationName: "",
      positionHeld: "",
      lifeMembership: "",
    });

    // setShowMembership((prevData) => !prevData);
    setUpdateMembership((prevData) => !prevData);
  };

  const handleDeleteMembership = (e) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const QUERY_DELTEMEMBERSHIP = {
        query: `mutation MyMutation {
          deleteMembership ( memID: ${Number(memberShipItem.memID)} 
              ) {
                lifeMembership
                memID
                positionHeld
                organization                        
                }
              }
            `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_DELTEMEMBERSHIP, null)
        .then((res) => res.json())
        .then((datas) => setUpdateList(!updateList))
        .finally((e) =>
          console.log("deleting positions and membership details to database")
        );
    } else {
      console.log("You don't want to delete this!");
    }

    setUpdateMembership((prevData) => !prevData);
  };

  const handlePaper = (e) => {
    console.log(values);
    if (values.title === "" || values.url === "") {
      setErrInput("This field can't be empty.");
    } else {
      setErrInput("");
    }

    if (values.year === "" || values.month) {
      setErrDate("Please, select an option.");
    } else {
      setError("");
    }

    if (values.description === "") {
      setErrInput("Please, give a description.");
    } else {
      setErrInput("");
    }

    if (
      values.title === "" ||
      values.url === "" ||
      values.year === "" ||
      values.month === "" ||
      values.description === ""
    ) {
      return console.log(error, errInput, values);
    }

    const QUERY_POSTPAPER = {
      query: `mutation MyMutation {
            addPaper (
                description: "${values.description}",
                fileURL: "${values.url}",
                url: "${values.url}",
                month: ${Number(values.month)},
                year: ${Number(values.year)},
                title: "${values.title}"
                ) {
                    description
                    fileURL
                    paperID
                    month
                    title
                    url
                    year 
                  }
                }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_POSTPAPER, null)
      .then((res) => res.json())
      .then((datas) => setUpdateList(!updateList))
      .finally((e) => console.log("adding papers details to database"));

    setErrInput("");
    setError("");
    setErrDate("");

    values.title = "";
    values.url = "";
    values.year = "";
    values.month = "";
    values.description = "";

    setValues({
      title: "",
      url: "",
      year: "",
      month: "",
      description: "",
    });
    setShowPaper((prevData) => !prevData);
  };

  const Input = styled("input")({
    display: "none",
  });

  const handleUpdatePaper = (e) => {
    if (values.title === "" || values.url === "") {
      setErrInput("This field can't be empty.");
    } else {
      setErrInput("");
    }

    if (values.year === "" || values.month === "") {
      setErrDate("Please, select a date");
    }

    if (values.description === "") {
      setErrInput("Please, give a description.");
    } else {
      setErrInput("");
    }

    if (
      values.title === "" ||
      values.url === "" ||
      values.year === "" ||
      values.month === "" ||
      values.description === ""
    ) {
      return console.log(error, errInput, values);
    }

    const QUERY_POSTPAPER = {
      query: `mutation MyMutation {
            updatePaper (
                description: "${values.description}",
                fileURL: "${values.url}",
                url: "${values.url}",
                paperID: ${Number(papersItem.paperID)},
                month: ${Number(values.month)},
                year: ${Number(values.year)},
                title: "${values.title}"
                ) {
                  description
                  fileURL
                  month
                  paperID
                  title
                  url
                  year                   
                  }
                }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_POSTPAPER, null)
      .then((res) => res.json())
      .then((datas) => setUpdateList(!updateList))
      .finally((e) => console.log("adding papers details to database"));

    setErrInput("");
    setError("");

    values.organizationName = "";
    values.positionHeld = "";
    values.lifeMembership = "";

    setValues({
      organizationName: "",
      positionHeld: "",
      lifeMembership: "",
    });

    setUpdatePaper((prevData) => !prevData);
  };

  const handleDeletePaper = (e) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const QUERY_DELETEPAPER = {
        query: `mutation MyMutation {
          deletePaper ( paperID: ${Number(papersItem.paperID)} 
              ) {
                description
                fileURL
                month
                paperID
                title
                url
                year                                       
                }
              }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_DELETEPAPER, null)
        .then((res) => res.json())
        .then((datas) => setUpdateList(!updateList))
        .finally((e) =>
          console.log("deleting this paper details from database")
        );
    } else {
      console.log("You don't want to delete this!");
    }

    setUpdatePaper((prevData) => !prevData);
  };

  const handleAward = (e) => {
    console.log(values);
    if (values.awardname === "" || values.url === "") {
      setErrInput("This field can't be empty.");
    } else {
      setErrInput("");
    }

    if (values.year === "" || values.month) {
      setErrDate("Please, select an option.");
    } else {
      setError("");
    }

    if (values.description === "") {
      setErrInput("Please, give a description.");
    } else {
      setErrInput("");
    }

    if (
      values.awardname === "" ||
      values.url === "" ||
      values.year === "" ||
      values.month === "" ||
      values.description === ""
    ) {
      return console.log(error, errInput, values);
    }

    const QUERY_POSTAWARD = {
      query: `mutation MyMutation {
            addAward (
                description: "${values.description}", 
                url: "${values.url}",
                month: ${Number(values.month)},
                year: ${Number(values.year)},
                name: "${values.awardname}"
                ) {
                  awardID
                  description
                  month
                  name
                  url
                  year                   
                }
              }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_POSTAWARD, null)
      .then((res) => res.json())
      .then((datas) => setUpdateList(!updateList))
      .finally((e) => console.log("adding awards details to database"));

    setErrInput("");
    setError("");
    setErrDate("");

    values.awardname = "";
    values.url = "";
    values.year = "";
    values.month = "";
    values.description = "";

    setValues({
      awardname: "",
      url: "",
      year: "",
      month: "",
      description: "",
    });
    setShowAward((prevData) => !prevData);
  };

  const handleUpdateAward = (e) => {
    console.log(values);
    if (values.awardname === "" || values.url === "") {
      setErrInput("This field can't be empty.");
    } else {
      setErrInput("");
    }

    if (values.year === "" || values.month === "") {
      setErrDate("Please, select a date");
    }

    if (values.description === "") {
      setErrInput("Please, give a description.");
    } else {
      setErrInput("");
    }

    if (
      values.awardname === "" ||
      values.url === "" ||
      values.year === "" ||
      values.month === "" ||
      values.description === ""
    ) {
      return console.log(error, errInput, values);
    }

    const QUERY_POSTPAPER = {
      query: `mutation MyMutation {
            updateAward (
                description: "${values.description}", 
                url: "${values.url}",
                awardID: ${Number(awardsItem.awardID)},
                month: ${Number(values.month)},
                year: ${Number(values.year)},
                name: "${values.awardname}"
                ) {
                  awardID
                  description
                  month
                  name
                  url
                  year                   
                }
              }`,
      variables: null,
      operationName: "MyMutation",
    };

    gqlquery(QUERY_POSTPAPER, null)
      .then((res) => res.json())
      .then((datas) => setUpdateList(!updateList))
      .finally((e) => console.log("updating awards details to database"));

    setErrInput("");
    setError("");

    values.awardname = "";
    values.url = "";
    values.month = "";
    values.year = "";
    values.description = "";

    setValues({
      awardname: "",
      url: "",
      month: "",
      year: "",
      description: "",
    });

    setUpdateAward((prevData) => !prevData);
  };

  const handleDeleteAward = (e) => {
    if (window.confirm("Are you sure you want to delete?")) {
      const QUERY_DELETEAWARD = {
        query: `mutation MyMutation {
          deleteAward ( awardID: ${Number(awardsItem.awardID)} 
              ) {
                description
                awardID
                month
                url
                name
                year          
              }
            }`,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_DELETEAWARD, null)
        .then((res) => res.json())
        .then((datas) => setUpdateList(!updateList))
        .finally((e) =>
          console.log("deleting this award details from database")
        );
    } else {
      console.log("You don't want to delete this!");
    }

    setUpdateAward((prevData) => !prevData);
  };

  return (
    <Grid item sx={{ marginBlock: "1rem", px: 2 }} spacing={2}>
      <Card
        sx={{ height: "100%", backgroundColor: "" }}
      >
        <Grid container direction={"row"} alignItems="flex-start" padding={2}>
          <Grid
            container
            item
            direction={"column"}
            sx={{ p: 0 }}
          >
            <Typography
              component="h3"
              variant="h5"
              sx={{ fontSize: 24, fontWeight: 700, px: 0, mt: 1, mb: 2 }}
            >
              Accomplishments
            </Typography>

            {/*  Memberships and positions  */}
            {showPaper || updatePaper || showAward || updateAward || (
              <Box>
                {!showMembership ? (
                  <Box>
                    {!updateMembersip ? (
                      // List of Memberships and Positions
                      <Box
                        sx={{
                          pl: 0,
                          pb: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          width: "80%",
                        }}
                      >
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: 18,
                              fontWeight: 700, // margin: "1rem",
                            }}
                          >
                            Memberships & Positions
                          </Typography>
                          <Button
                            variant="outlined"
                            sx={{
                              backgroundColor: "#ffffff",
                              color: "#000000",
                              borderColor: "#000000",
                              maxHeight: "35px",
                            }}
                            onClick={() => open("memberposition")}
                          >
                            Add
                          </Button>
                        </Box>
                        <Box>
                          {membershipDetails.map((membership) => (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                mb: 2,
                                gap: 3,
                              }}
                            >
                              <Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 3,
                                    color: "#828282",
                                  }}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    component="div"
                                    sx={{ width: "110px" }}
                                  >
                                    Position Held
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    component="div"
                                    sx={{ color: "#4F4F4F" }}
                                  >
                                    {membership?.positionHeld}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 3,
                                    color: "#828282",
                                  }}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    component="div"
                                    sx={{ width: "110px", }}
                                  >
                                    Organization
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    component="div"
                                    sx={{ color: "#4F4F4F" }}
                                  >
                                    {membership?.organization}
                                  </Typography>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 3,
                                    color: "#828282",
                                  }}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    component="div"
                                    sx={{ width: "110px" }}
                                  >
                                    Life Membership
                                  </Typography>
                                  <Typography
                                    variant="subtitle2"
                                    gutterBottom
                                    component="div"
                                    sx={{ color: "#4F4F4F" }}
                                  >
                                    {membership.lifeMembership ? "Yes" : "No"}
                                  </Typography>
                                </Box>
                              </Box>
                              <Button
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <EditIcon
                                  sx={{ fontSize: "medium" }}
                                  onClick={() =>
                                    open("updatememberposition", membership)
                                  }
                                />
                              </Button>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ) : (
                      // update membership and position
                      <Box
                        sx={{
                          height: "100%",
                          backgroundColor: "",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            margin: "1rem",
                            marginBottom: 0,
                          }}
                        >
                          Update Memberships & Positions
                        </Typography>
                        <Grid
                          container
                          direction={"row"}
                          alignItems="flex-start"
                          justifyContent={"space-between"}
                          className=""
                          padding={2}
                          spacing={2}
                          sx={{ lineHeight: 5 }}
                        >
                          <Grid item direction={"column"} xs={12} md={6}>
                            <FormControl fullWidth>
                              <TextField
                                variant="outlined"
                                rows={1}
                                fullWidth
                                placeholder={memberShipItem.positionHeld}
                                error={values.positionHeld === "" && errInput}
                                value={values.positionHeld}
                                onChange={handleChange("positionHeld")}
                                sx={{ backgroundColor: "#ffffff" }}
                              />
                              {values.positionHeld === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <FormControl fullWidth>
                              <TextField
                                variant="outlined"
                                rows={1}
                                fullWidth
                                placeholder={memberShipItem.organization}
                                error={
                                  values.organizationName === "" && errInput
                                }
                                value={values.organizationName}
                                onChange={handleChange("organizationName")}
                                sx={{ backgroundColor: "#ffffff" }}
                              />
                              {values.organizationName === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <FormControl>
                              <FormLabel id="demo-row-radio-buttons-group-label">
                                Life Membership?
                              </FormLabel>
                              <RadioGroup
                                row
                                error={values.lifeMembership === "" && error}
                                defaultValue={
                                  memberShipItem.lifeMembership === true ? 1 : 0
                                }
                                value={values.lifeMembership}
                                onChange={handleChange("lifeMembership")}
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >
                                <FormControlLabel
                                  value={1}
                                  control={<Radio />}
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value={0}
                                  control={<Radio />}
                                  label="No"
                                />
                              </RadioGroup>
                              {values.lifeMembership === "" && (
                                <FormHelperText sx={{ color: "red", mt: -0.5 }}>
                                  {error}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>

                          <Grid
                            item
                            direction={"column"}
                            xs={12}
                            md={12}
                            justifyContent="flex-end"
                            sx={{ display: "grid" }}
                          >
                            <CardContent>
                              <CardActions className="resume-actions">
                                <Button
                                  variant="contained"
                                  className="cancel-btn"
                                  onClick={() => open("updatememberposition")}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="contained"
                                  className="save-btn"
                                  onClick={handleDeleteMembership}
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="contained"
                                  className="save-btn"
                                  onClick={handleUpdateMembership}
                                >
                                  Update
                                </Button>
                              </CardActions>
                            </CardContent>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                ) : (
                  // Add Membership and Position Form
                  <Box
                    sx={{
                      height: "100%",
                      backgroundColor: "",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        margin: "1rem",
                        marginBottom: 0,
                      }}
                    >
                      Memberships & Positions
                    </Typography>
                    <Grid
                      container
                      direction={"row"}
                      alignItems="flex-start"
                      justifyContent={"space-between"}
                      className=""
                      padding={2}
                      spacing={2}
                      sx={{ lineHeight: 5 }}
                    >
                      <Grid item direction={"column"} xs={12} md={6}>
                        <FormControl fullWidth>
                          <TextField
                            variant="outlined"
                            rows={1}
                            fullWidth
                            placeholder="Position Held"
                            error={values.positionHeld === "" && errInput}
                            value={values.positionHeld}
                            onChange={handleChange("positionHeld")}
                            sx={{ backgroundColor: "#ffffff" }}
                          />
                          {values.positionHeld === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <FormControl fullWidth>
                          <TextField
                            variant="outlined"
                            rows={1}
                            fullWidth
                            placeholder="Organization Name"
                            error={values.organizationName === "" && errInput}
                            value={values.organizationName}
                            onChange={handleChange("organizationName")}
                            sx={{ backgroundColor: "#ffffff" }}
                          />
                          {values.organizationName === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            Life Membership?
                          </FormLabel>
                          <RadioGroup
                            row
                            error={values.lifeMembership === "" && error}
                            // defaultValue={item.currentlyWorking}
                            value={values.lifeMembership}
                            onChange={handleChange("lifeMembership")}
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value={parseInt(1)}
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value={parseInt(0)}
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                          {values.lifeMembership === "" && (
                            <FormHelperText sx={{ color: "red", mt: -0.5 }}>
                              {error}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        direction={"column"}
                        xs={12}
                        md={12}
                        justifyContent="flex-end"
                        sx={{ display: "grid" }}
                      >
                        <CardContent>
                          <CardActions className="resume-actions">
                            <Button
                              variant="outlined"
                              className="cancel-btn"
                              onClick={() => open("memberposition")}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              className="save-btn"
                              onClick={handleMembershipAndPositons}
                            >
                              Save
                            </Button>
                          </CardActions>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            )}

            {showMembership ||
              showPaper ||
              showAward ||
              updateMembersip ||
              updatePaper ||
              updateAward || (
                <hr
                  width="100%"
                  style={{ marginTop: "0%", marginBottom: "5%" }}
                />
              )}

            {/* Papers  */}
            {showMembership || showAward || updateMembersip || updateAward || (
              <Box>
                {" "}
                {!showPaper ? (
                  <Box>
                    {!updatePaper ? (
                      <Box style={{ marginTop: "0%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "80%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: 18,
                              fontWeight: 700,
                            }}
                          >
                            Papers
                          </Typography>
                          <Button
                            variant="outlined"
                            sx={{
                              backgroundColor: "#ffffff",
                              color: "#000000",
                              borderColor: "#000000",
                              float: "right",
                              maxHeight: "35px",
                            }}
                            onClick={() => open("paper")}
                          >
                            Add
                          </Button>
                        </div>
                        <div>
                          {paperDetails.map((paperItem, index) => (
                            <CardContent
                              sx={{ display: "flex", alignItems: "baseline", }}
                            >
                              <Box sx={{ display: "grid", lineHeight: "25px", ml: -2 }}>
                                <Typography variant="p">
                                  <b>{paperItem.title}</b>
                                </Typography>
                                <Typography variant="info" sx={textStyle}>
                                  {Intl.DateTimeFormat("en", {
                                    month: "long",
                                  }).format(
                                    new Date(`${paperItem.month}`)
                                  )}{" "}
                                  &nbsp;
                                  {new Date(paperItem.year).toLocaleString(
                                    "default",
                                    {
                                      year: "numeric",
                                    }
                                  )}
                                </Typography>
                                <Typography variant="info" sx={textStyle}>
                                  <a href={paperItem.url}>{paperItem.url}</a>
                                </Typography>
                                <Typography variant="info" sx={textStyle}>
                                  {paperItem.description}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "",
                                }}
                              >
                                <Button>
                                  <EditIcon
                                    sx={{ fontSize: "medium" }}
                                    onClick={() =>
                                      open("updatepaper", paperItem)
                                    }
                                  />
                                </Button>
                              </Box>
                            </CardContent>
                          ))}
                        </div>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          height: "100%",
                          backgroundColor: "",
                        }}
                      >
                        <Typography
                          component="h3"
                          variant="h5"
                          sx={{
                            fontSize: 24,
                            fontWeight: 700,
                            margin: "1rem",
                            marginBottom: 0,
                          }}
                        >
                          Update Papers
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            margin: "1rem",
                            marginBottom: 0,
                          }}
                        >
                          White Papers / Research Publication / Journal Entry
                        </Typography>
                        <Grid
                          container
                          direction={"row"}
                          alignItems="flex-start"
                          justifyContent={"space-between"}
                          padding={2}
                          spacing={3}
                          sx={{ lineHeight: 4 }}
                        >
                          <Grid item direction={"column"} xs={12} md={6}>
                            <FormControl
                              className={classes.formControl}
                              fullWidth
                            >
                              <TextField
                                variant="outlined"
                                rows={1}
                                fullWidth
                                placeholder={papersItem.title}
                                error={values.title === "" && errInput}
                                value={values.title}
                                onChange={handleChange("title")}
                                sx={{ backgroundColor: "#ffffff" }}
                              />
                              {values.title === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <FormControl
                              className={classes.formControl}
                              fullWidth
                            >
                              <TextField
                                variant="outlined"
                                rows={1}
                                fullWidth
                                placeholder={papersItem.url}
                                error={values.url === "" && errInput}
                                value={values.url}
                                onChange={handleChange("url")}
                                sx={{ backgroundColor: "#ffffff" }}
                              />
                              {values.url === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Grid container direction={"row"} spacing={2}>
                              <Grid item direction={"column"} xs={12} md={6}>
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    {Intl.DateTimeFormat("en", {
                                      year: "numeric",
                                    }).format(new Date(`${papersItem.year}`))}
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-5"
                                    label="Starting Year"
                                    defaultValue={papersItem.year}
                                    error={values.year === "" && errDate}
                                    value={values.year}
                                    onChange={handleChange("year")}
                                    sx={{
                                      backgroundColor: "#ffffff",
                                      width: "100%",
                                    }}
                                    MenuProps={{
                                      classes: { paper: classes.menuPaper },
                                    }}
                                  >
                                    {years.map((year) => (
                                      <MenuItem value={year}>{year}</MenuItem>
                                    ))}
                                  </Select>
                                  {values.year === "" && (
                                    <FormHelperText
                                      sx={{ color: "red", mb: 1 }}
                                    >
                                      {errDate}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item direction={"column"} xs={12} md={6}>
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <InputLabel id="demo-simple-select-label">
                                    {Intl.DateTimeFormat("en", {
                                      month: "long",
                                    }).format(new Date(`${papersItem.month}`))}
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-5"
                                    label="Starting Month"
                                    defaultValue={values.month}
                                    error={values.month === "" && errDate}
                                    value={values.month}
                                    onChange={handleChange("month")}
                                    sx={{
                                      backgroundColor: "#ffffff",
                                      width: "100%",
                                    }}
                                    MenuProps={{
                                      classes: { paper: classes.menuPaper },
                                    }}
                                  >
                                    {months.map((month) => (
                                      <MenuItem
                                        key={month.value}
                                        value={month.value}
                                      >
                                        {month.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  {values.month === "" && (
                                    <FormHelperText
                                      sx={{ color: "red", mb: 1 }}
                                    >
                                      {errDate}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                              <Grid item direction={"column"} xs={12} md={12}>
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <label htmlFor="contained-button-file">
                                    <Input
                                      accept="image/*"
                                      id="contained-button-file"
                                      multiple
                                      type="file"
                                    />
                                    <Button variant="" component="span">
                                      <AttachmentIcon /> &nbsp; &nbsp; Upload
                                    </Button>
                                  </label>
                                  {values.month === "" && (
                                    <FormHelperText
                                      sx={{ color: "red", mb: 1 }}
                                    >
                                      {errDate}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <FormControl
                              className={classes.formControl}
                              fullWidth
                            >
                              <TextField
                                variant="outlined"
                                multiline
                                rows={5}
                                defaultValue={papersItem.description}
                                fullWidth
                                placeholder="Description"
                                error={values.description === "" && errInput}
                                value={values.description}
                                onChange={handleChange("description")}
                                sx={{ backgroundColor: "#ffffff" }}
                              />
                              {values.description === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid
                            item
                            direction={"column"}
                            xs={12}
                            md={12}
                            justifyContent="flex-end"
                            sx={{ display: "grid" }}
                          >
                            <CardContent>
                              <CardActions className="resume-actions">
                                <Button
                                  variant="contained"
                                  className="cancel-btn"
                                  onClick={() => open("updatepaper")}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="contained"
                                  className="cancel-btn"
                                  onClick={handleDeletePaper}
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="contained"
                                  className="save-btn"
                                  onClick={handleUpdatePaper}
                                >
                                  Update
                                </Button>
                              </CardActions>
                            </CardContent>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                      backgroundColor: "",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        margin: "1rem",
                        marginBottom: 0,
                      }}
                    >
                      White Papers / Research Publication / Journal Entry
                    </Typography>
                    <Grid
                      container
                      direction={"row"}
                      alignItems="flex-start"
                      padding={2}
                      spacing={2}
                      sx={{ lineHeight: 5 }}
                    >
                      <Grid item direction={"column"} xs={12} md={6}>
                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            variant="outlined"
                            rows={1}
                            fullWidth
                            placeholder="Title"
                            error={values.title === "" && errInput}
                            value={values.title}
                            onChange={handleChange("title")}
                            sx={{ backgroundColor: "#ffffff" }}
                          />
                          {values.title === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <FormControl fullWidth>
                          <TextField
                            variant="outlined"
                            rows={1}
                            fullWidth
                            placeholder="Enter URL Here"
                            error={values.url === "" && errInput}
                            value={values.url}
                            onChange={handleChange("url")}
                            sx={{ backgroundColor: "#ffffff" }}
                          />
                          {values.url === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Grid container direction={"row"} spacing={2}>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <FormControl
                              className={classes.formControl}
                              fullWidth
                            >
                              <InputLabel id="demo-simple-select-label">
                                Year
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-5"
                                label="Year"
                                defaultValue={values.year}
                                error={values.year === "" && errDate}
                                value={values.year}
                                onChange={handleChange("year")}
                                sx={{
                                  backgroundColor: "#ffffff",
                                  width: "100%",
                                }}
                                MenuProps={{
                                  classes: { paper: classes.menuPaper },
                                }}
                              >
                                {years.map((year) => (
                                  <MenuItem value={year}>{year}</MenuItem>
                                ))}
                              </Select>
                              {values.year === "" && (
                                <FormHelperText sx={{ color: "red", mb: 0 }}>
                                  {errDate}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <FormControl
                              className={classes.formControl}
                              fullWidth
                            >
                              <InputLabel id="demo-simple-select-label">
                                Month
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-5"
                                label="Month"
                                defaultValue={values.month}
                                error={values.month === "" && errDate}
                                value={values.month}
                                onChange={handleChange("month")}
                                sx={{
                                  backgroundColor: "#ffffff",
                                  width: "100%",
                                }}
                                MenuProps={{
                                  classes: { paper: classes.menuPaper },
                                }}
                              >
                                {months.map((month) => (
                                  <MenuItem
                                    key={month.value}
                                    value={month.value}
                                  >
                                    {month.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              {values.month === "" && (
                                <FormHelperText sx={{ color: "red", mb: 0 }}>
                                  {errDate}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                        </Grid>
                        <Grid item direction={"column"} xs={12} md={12}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <label htmlFor="contained-button-file">
                              <Input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                              />
                              <Button variant="" component="span">
                                <AttachmentIcon /> &nbsp; &nbsp; Upload
                              </Button>
                            </label>
                            {/* {values.month === "" && (
                            <FormHelperText sx={{ color: "red", mb: 0 }}>
                              {errDate}
                            </FormHelperText>
                          )} */}
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            variant="outlined"
                            multiline
                            rows={5}
                            // defaultValue={item.description}
                            fullWidth
                            placeholder="Description"
                            error={values.description === "" && errInput}
                            value={values.description}
                            onChange={handleChange("description")}
                            sx={{ backgroundColor: "#ffffff" }}
                          />
                          {values.description === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        direction={"column"}
                        xs={12}
                        md={12}
                        justifyContent="flex-end"
                        sx={{ display: "grid" }}
                      >
                        <CardContent>
                          <CardActions className="resume-actions">
                            <Button
                              variant="outlined"
                              className="cancel-btn"
                              onClick={() => open("paper")}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              className="save-btn"
                              onClick={handlePaper}
                            >
                              Save
                            </Button>
                          </CardActions>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            )}

            {showMembership ||
              showPaper ||
              showAward ||
              updateMembersip ||
              updatePaper ||
              updateAward || (
                <hr
                  width="121%"
                  style={{ marginTop: "3%", marginBottom: "0%", color: "red" }}
                />
              )}

            {/* Awards  */}
            {showMembership || showPaper || updateMembersip || updatePaper || (
              <Box>
                {" "}
                {!showAward ? (
                  <Box>
                    {!updateAward ? (
                      <Box>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "30px",
                            width: "80%",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: 18,
                              fontWeight: 700,
                              marginBottom: "3%",
                            }}
                          >
                            Awards
                          </Typography>
                          <Button
                            variant="outlined"
                            sx={{
                              backgroundColor: "#ffffff",
                              color: "#000000",
                              borderColor: "#000000",
                              float: "right",
                              maxHeight: "35px",
                            }}
                            onClick={() => open("award")}
                          >
                            Add
                          </Button>
                        </Box>
                        <Box>
                          {awardDetails.map((awardItem, index) => (
                            <Box key={`accomplishments-awards-${index}`}>
                              <CardContent
                                sx={{
                                  display: "flex",
                                  alignItems: "baseline",
                                  gap: 3,
                                }}
                              >
                                <Box
                                  sx={{ display: "grid", lineHeight: "25px", ml: -2 }}
                                >
                                  <Typography variant="p">
                                    <b>{awardItem.name}</b>
                                  </Typography>
                                  <Typography variant="info" sx={textStyle}>
                                    {Intl.DateTimeFormat("en", {
                                      month: "long",
                                    }).format(
                                      new Date(`${awardItem.month}`)
                                    )}{" "}
                                    &nbsp;
                                    {awardItem.year}
                                  </Typography>
                                  <Typography variant="info" sx={textStyle}>
                                    <a href={awardItem.url}>{awardItem.url}</a>
                                  </Typography>
                                  <Typography variant="info" sx={textStyle}>
                                    {awardItem.description}
                                  </Typography>
                                </Box>
                                <Button
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <EditIcon
                                    sx={{ fontSize: "medium" }}
                                    onClick={() =>
                                      open("updateaward", awardItem)
                                    }
                                  />
                                </Button>
                              </CardContent>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          height: "100%",
                          backgroundColor: "",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: 18,
                            fontWeight: 700,
                            margin: "1rem",
                            marginBottom: 0,
                          }}
                        >
                          Update your award details here
                        </Typography>
                        <Grid
                          container
                          direction={"row"}
                          alignItems="flex-start"
                          justifyContent={"space-between"}
                          className=""
                          padding={2}
                          spacing={2}
                          sx={{ lineHeight: 5 }}
                        >
                          <Grid item direction={"column"} xs={12} md={6}>
                            <FormControl
                              className={classes.formControl}
                              fullWidth
                            >
                              <TextField
                                variant="outlined"
                                rows={1}
                                fullWidth
                                placeholder={awardsItem.name}
                                error={values.awardname === "" && errInput}
                                value={values.awardname}
                                onChange={handleChange("awardname")}
                                sx={{ backgroundColor: "#ffffff" }}
                              />
                              {values.awardname === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <FormControl
                              className={classes.formControl}
                              fullWidth
                            >
                              <TextField
                                variant="outlined"
                                rows={1}
                                fullWidth
                                placeholder={awardsItem.url}
                                error={values.url === "" && errInput}
                                value={values.url}
                                onChange={handleChange("url")}
                                sx={{ backgroundColor: "#ffffff" }}
                              />
                              {values.url === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={3}>
                            <FormControl
                              className={classes.formControl}
                              fullWidth
                            >
                              <InputLabel id="demo-simple-select-label">
                                {new Date(awardsItem.year).toLocaleString(
                                  "default",
                                  {
                                    year: "numeric",
                                  }
                                )}
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-5"
                                label="Starting Year"
                                defaultValue={values.year}
                                error={values.year === "" && errDate}
                                value={values.year}
                                onChange={handleChange("year")}
                                sx={{
                                  backgroundColor: "#ffffff",
                                  width: "100%",
                                }}
                                MenuProps={{
                                  classes: { paper: classes.menuPaper },
                                }}
                              >
                                {years.map((year) => (
                                  <MenuItem value={year}>{year}</MenuItem>
                                ))}
                              </Select>
                              {values.year === "" && (
                                <FormHelperText sx={{ color: "red", mb: 1 }}>
                                  {errDate}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={3}>
                            <FormControl
                              className={classes.formControl}
                              fullWidth
                            >
                              <InputLabel id="demo-simple-select-label">
                                {Intl.DateTimeFormat("en", {
                                  month: "long",
                                }).format(new Date(`${awardsItem.month}`))}
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-5"
                                label="Starting Month"
                                defaultValue={values.month}
                                error={values.month === "" && errDate}
                                value={values.month}
                                onChange={handleChange("month")}
                                sx={{
                                  backgroundColor: "#ffffff",
                                  width: "100%",
                                }}
                                MenuProps={{
                                  classes: { paper: classes.menuPaper },
                                }}
                              >
                                {months.map((month) => (
                                  <MenuItem
                                    key={month.value}
                                    value={month.value}
                                  >
                                    {month.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              {values.month === "" && (
                                <FormHelperText sx={{ color: "red", mb: 1 }}>
                                  {errDate}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <TextField
                              variant="outlined"
                              multiline
                              rows={5}
                              defaultValue={awardsItem.description}
                              fullWidth
                              placeholder="Description"
                              error={values.description === "" && errInput}
                              value={values.description}
                              onChange={handleChange("description")}
                              sx={{ backgroundColor: "#ffffff" }}
                            />
                            {values.description === "" && (
                              <FormHelperText sx={{ color: "red", mt: 0 }}>
                                {errInput}
                              </FormHelperText>
                            )}
                          </Grid>
                          <Grid
                            item
                            direction={"column"}
                            xs={12}
                            md={12}
                            justifyContent="flex-end"
                            sx={{ display: "grid" }}
                          >
                            <CardContent>
                              <CardActions className="resume-actions">
                                <Button
                                  variant="contained"
                                  className="cancel-btn"
                                  onClick={() => open("updateaward")}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="contained"
                                  className="cancel-btn"
                                  onClick={handleDeleteAward}
                                >
                                  Delete
                                </Button>
                                <Button
                                  variant="contained"
                                  className="save-btn"
                                  onClick={handleUpdateAward}
                                >
                                  Update
                                </Button>
                              </CardActions>
                            </CardContent>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                      backgroundColor: "",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                        margin: "1rem",
                        marginBottom: 0,
                      }}
                    >
                      Add your award details here.
                    </Typography>
                    <Grid
                      container
                      direction={"row"}
                      alignItems="flex-start"
                      padding={2}
                      spacing={2}
                      sx={{ lineHeight: 5 }}
                    >
                      <Grid item direction={"column"} xs={12} md={6}>
                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            variant="outlined"
                            rows={1}
                            fullWidth
                            placeholder="Award Name"
                            error={values.awardname === "" && errInput}
                            value={values.awardname}
                            onChange={handleChange("awardname")}
                            sx={{ backgroundColor: "#ffffff" }}
                          />
                          {values.awardname === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            variant="outlined"
                            rows={1}
                            fullWidth
                            placeholder="Enter URL Here"
                            error={values.url === "" && errInput}
                            value={values.url}
                            onChange={handleChange("url")}
                            sx={{ backgroundColor: "#ffffff" }}
                          />
                          {values.url === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={3}>
                        <FormControl className={classes.formControl} fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Year
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-5"
                            label="Year"
                            defaultValue={values.year}
                            error={values.year === "" && errDate}
                            value={values.year}
                            onChange={handleChange("year")}
                            sx={{ backgroundColor: "#ffffff", width: "100%" }}
                            MenuProps={{
                              classes: { paper: classes.menuPaper },
                            }}
                          >
                            {years.map((year) => (
                              <MenuItem value={year}>{year}</MenuItem>
                            ))}
                          </Select>
                          {values.year === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {errDate}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={3}>
                        <FormControl className={classes.formControl} fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Month
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-5"
                            label="Month"
                            defaultValue={values.month}
                            error={values.month === "" && errDate}
                            value={values.month}
                            onChange={handleChange("month")}
                            sx={{ backgroundColor: "#ffffff", width: "100%" }}
                            MenuProps={{
                              classes: { paper: classes.menuPaper },
                            }}
                          >
                            {months.map((month) => (
                              <MenuItem key={month.value} value={month.value}>
                                {month.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {values.month === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {errDate}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            variant="outlined"
                            multiline
                            rows={5}
                            // defaultValue={item.description}
                            fullWidth
                            placeholder="Description"
                            error={values.description === "" && errInput}
                            value={values.description}
                            onChange={handleChange("description")}
                            sx={{ backgroundColor: "#ffffff" }}
                          />
                          {values.description === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        direction={"column"}
                        xs={12}
                        md={12}
                        justifyContent="flex-end"
                        sx={{ display: "grid" }}
                      >
                        <CardContent>
                          <CardActions className="resume-actions">
                            <Button
                              variant="outlined"
                              className="cancel-btn"
                              onClick={() => open("award")}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="contained"
                              className="save-btn"
                              onClick={handleAward}
                            >
                              Save
                            </Button>
                          </CardActions>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}, areEqual);

export default Accomplishments;

const textStyle = { fontSize: 12, color: "#828282" };