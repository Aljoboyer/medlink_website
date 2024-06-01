import { makeStyles } from "@material-ui/core/styles";
import AttachmentIcon from "@mui/icons-material/Attachment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box, Button,
  Card, Divider, FormControlLabel, FormHelperText, Grid, Input, TextField, 
  InputBase, InputLabel, MenuItem, Radio, RadioGroup, Select, Skeleton, Tooltip, Typography, useMediaQuery
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { styled, useTheme } from "@mui/material/styles";
import { encode } from "base-64";
import React, { useEffect, useState } from "react";
import {
  gqlquery,
  QUERY_GETAWARDS,
  QUERY_GETMEMBERSHIP,
  QUERY_GETPAPERS
} from "../../../../api";
import useAuth from "../../../../hooks/useAuth";
var FileSaver = require("file-saver");

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Custom style for mui Select border
const CustomSelectInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: "4px",
    position: "relative",
    border: "1px solid var(--clr-blue-light) !important",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontSize: "15px",
    color: "var(--clr-blue-footer)",
    padding: "10px 26px 10px 12px",

    "&:focus": {
      borderRadius: 4,
      borderColor: "red",
    },
  },
}));

const selectPlaceholderStyles = makeStyles(theme => ({
  placeholder: {
    color: "#B8BCCA"
  }
}))

const SelectPlaceholder = ({children}) => {
  const classes = selectPlaceholderStyles();
  return (<div className={classes.placeholder}>{children}</div>);
}

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
  icon: {
    fill: "var(--clr-blue-footer)",
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
  const {handleStrengthUpdate} = useAuth();
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
  const [errUrl, setErrUrl] = useState("");
  const [validNameErr, setValidNameErr] = useState("");
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
    fileName: "",
  });
  const [open, setOpen] = useState(false);
  const [addMembershipSnack, setAddMembershipSnack] = useState(false);
  const [updateMembershipSnack, setUpdateMembershipSnack] = useState(false);
  const [deleteMembershipSnack, setDeleteMembershipSnack] = useState(false);
  const [addPaperSnack, setAddPaperSnack] = useState(false);
  const [updatePaperSnack, setUpdatePaperSnack] = useState(false);
  const [deletePaperSnack, setDeletePaperSnack] = useState(false);
  const [addAwardSnack, setAddAwardSnack] = useState(false);
  const [updateAwardSnack, setUpdateAwardSnack] = useState(false);
  const [deleteAwardSnack, setDeleteAwardSnack] = useState(false);
  const [errSnack, setErrSnack] = useState("");
  const [fileSizeError, setFileSizeError] = useState(false);
  const [paperFileTypeError, setPaperFileTypeError] = useState(false);
  const [papers, setPapers] = useState(null);
  const [paperName, setPaperName] = useState("");
  const [updated, setUpdated] = useState(false);
  const [loadingSkleton, setLoadingSkleton] = useState(true);
  const [loadingSkletonUpdate, setLoadingSkletonUpdate] = useState(true);
  const [loadingSkletonAdd, setLoadingSkletonAdd] = useState(true);
  const CHARACTER_LIMIT = 500;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  document.title = "Accomplishments | MedLink Jobs";
  // let valuesFileName = values?.fileName?.length > 13 ?   values?.fileName?.slice(0, 10) :  values?.fileName;

  useEffect(() => {
    setTimeout(() => {
      setLoadingSkletonUpdate(false);
    }, 2500)
  }, [])
  useEffect(() => {
    setTimeout(() => {
      setLoadingSkletonAdd(false);
    }, 2500)
  }, [])



  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFileSizeError(false);
    setPaperFileTypeError(false);
    setOpen(false);
  };

  const handleSnackbar = () => {
    setAddMembershipSnack(false);
    setAddPaperSnack(false);
    setAddAwardSnack(false);
    setUpdateMembershipSnack(false);
    setUpdatePaperSnack(false);
    setUpdateAwardSnack(false);
    setDeleteMembershipSnack(false);
    setDeletePaperSnack(false);
    setDeleteAwardSnack(false);
  };

  const hanldeDownloadPaper = (url, fileName) => {
    const QUERY_DOWNLOADRESUME = {
      query: `query MyQuery {
          downloadDocument (url: "${url}")
        }`,
    };
    gqlquery(QUERY_DOWNLOADRESUME, null)
      .then((res) => res.json())
      .then((datas) => {
        setUpdated((pre) => !pre);
        const downloadDocument = JSON.parse(datas?.data?.downloadDocument);
        savePdf(downloadDocument, fileName);
      });
  };

  const savePdf = (item, name) => {
    const byteCharacters = atob(item?.response?.content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });
    const fileName = name;
    FileSaver.saveAs(blob, fileName);
  };

  useEffect(() => {
    gqlquery(QUERY_GETMEMBERSHIP, null)
      .then((res) => res.json())
      .then((datas) => setMembershipDetails(datas?.data?.getMemberships))
      .finally(() => {
        setLoadingSkleton(false)
      });
  }, [updateList]);

  useEffect(() => {
    gqlquery(QUERY_GETPAPERS, null)
      .then((res) => res.json())
      .then((datas) => setPaperDetails(datas?.data?.getPapers))
      .finally(() => {
        setLoadingSkleton(false)
      });
  }, [updateList]);

  useEffect(() => {
    gqlquery(QUERY_GETAWARDS, null)
      .then((res) => res.json())
      .then((datas) => setAwardDetails(datas?.data?.getAwards))
      .finally(() => {
        setLoadingSkleton(false)
      });
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

  const openForm = (arg, item) => {
    switch (arg) {
      case "memberposition":
        values.positionHeld = "";
        values.organizationName = "";
        values.lifeMembership = "";
        setShowMembership((prevData) => !prevData);
        break;
      case "updatememberposition":
        setMemberShipItem(item);
        values.positionHeld = item?.positionHeld;
        values.organizationName = item?.organization;
        values.lifeMembership = item?.lifeMembership;
        setUpdateMembership((prevData) => !prevData);
        break;
      case "cancel_updatememberposition":
        values.positionHeld = "";
        values.organizationName = "";
        values.lifeMembership = "";
        setUpdateMembership((prevData) => !prevData);
        break;
      case "paper":
        values.title = "";
        values.url = "";
        values.year = "";
        values.month = "";
        values.description = "";
        setPaperName("")
        setShowPaper((prevData) => !prevData);
        break;
      case "updatepaper":
        setPapersItem(item);
        values.title = item?.title;
        values.fileName = item?.fileName;
        values.url = item?.url;
        values.year = item?.year;
        values.month = item?.month;
        values.description = item?.description;
        setUpdatePaper((prevData) => !prevData);
        break;
      case "cancel_updatepaper":
        values.title = "";
        values.url = "";
        values.year = "";
        values.month = "";
        values.description = "";
        setPaperName("")
        setUpdatePaper((prevData) => !prevData);
        
        break;
      case "award":
        values.awardname = "";
        values.url = "";
        values.month = "";
        values.year = "";
        values.description = "";
        setShowAward((prevData) => !prevData);
        break;
      case "updateaward":
        setAwardsItem(item);
        values.awardname = item?.name;
        values.url = item?.url;
        values.year = item?.year;
        values.month = item?.month;
        values.description = item?.description;
        setUpdateAward((prevData) => !prevData);
        break;
      case "Cancel_updateaward":
        values.awardname = "";
        values.url = "";
        values.month = "";
        values.year = "";
        values.description = "";
        setUpdateAward((prevData) => !prevData);
        break;
      default:
        setShowMembership((prevData) => prevData);
    }
  };

  let resText = /^[a-zA-Z ]*$/;
  values.positionHeld = values.positionHeld.replace(/  +/g, ' ');
  values.organizationName = values.organizationName.replace(/  +/g, ' ');
  values.title = values.title.replace(/  +/g, ' ');
  values.awardname = values.awardname.replace(/  +/g, ' ');
  values.description = values.description.replace(/  +/g, ' ');

  // Membership
  const handleMembershipAndPositons = (event, from) => {

    if (event.key === "Enter" || from === "onClick") {

      if (
        values.positionHeld === "" ||
        values.positionHeld === " " ||
        (resText.test(values.positionHeld)) === false ||
        values.organizationName === "" ||
        values.organizationName === " " ||
        (resText.test(values.organizationName)) === false ||
        values.lifeMembership === ""
      ) {
        setErrInput("This field can't be empty.");
        setError("Please, select an option.");
        setValidNameErr("This field accept only Alphabets.");
        return;
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
      .then((datas) => {
        if (datas?.data?.addMembership) {
          setAddMembershipSnack(true);
          setOpen(true);
          setTimeout(handleSnackbar, 2000);
          setUpdateList(!updateList);
          handleStrengthUpdate();
        } else {
          setErrSnack("Sorry, something went wrong. Please, try again.");
          setOpen(true);
        }
      })
      .finally((e) =>
        console.log("adding positions and membership details to database")
      );

      values.organizationName = "";
      values.positionHeld = "";
      values.lifeMembership = "";
      setShowMembership((prevData) => !prevData);
      setErrInput("");
      setError("");
      setValidNameErr("");
    }
  };

  const handleUpdateMembership = (event, from) => {

    if (event.key === "Enter" || from === "onClick") {
      if (
        values.positionHeld === "" ||
        values.positionHeld === " " ||
        (resText.test(values.positionHeld)) === false ||
        values.organizationName === "" ||
        values.organizationName === " " ||
        (resText.test(values.organizationName)) === false ||
        values.lifeMembership === ""
      ) {
        setErrInput("This field can't be empty.");
        setError("Please, select an option.");
        setValidNameErr("This field accept only Alphabets.");
        return;
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
        .then((datas) => {
          if (datas?.data?.updateMembership) {
            setUpdateMembershipSnack(true);
            setOpen(true);
            setTimeout(handleSnackbar, 2000);
            setUpdateList(!updateList);
          } else {
            setErrSnack("Sorry, something went wrong. Please, try again.");
            setOpen(true);
          }
        })
        .finally((e) =>
          console.log("updating positions and membership details to database")
        );

      values.organizationName = "";
      values.positionHeld = "";
      values.lifeMembership = "";
      setUpdateMembership((prevData) => !prevData);
      setErrInput("");
      setError("");
      setValidNameErr("");
    }
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
        .then((datas) => {
          if (datas?.data?.deleteMembership) {
            setDeleteMembershipSnack(true);
            setOpen(true);
            setTimeout(handleSnackbar, 2000);
            setUpdateList(!updateList);
            handleStrengthUpdate();
          } else {
            setErrSnack("Sorry, something went wrong. Please, try again.");
            setOpen(true);
          }
        })
        .finally((e) =>
          console.log("deleting positions and membership details to database")
        );
    } else {
      console.log("You don't want to delete this!");
    }

    values.organizationName = "";
    values.positionHeld = "";
    values.lifeMembership = "";
    setUpdateMembership((prevData) => !prevData);
  };

  const handleUploadPaper = (e) => {
    const file = e.target.files[0];
    if (file.name.endsWith(".pdf") || file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
      if (e.target.files[0].size > 2000000) {
        setOpen(true);
        setFileSizeError(true);
        return;
      }
      setPaperName(file.name);
      setValues({ ...values, fileName: file.name });
      // console.log(file)
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function (evt) {
        let encoded = encode(evt.target.result);
        setPapers(encoded);
      };
    } else {
      setPaperFileTypeError(true);
      setOpen(true);
    }
  };

  const handleDeletePaperInUpdate = (e) => {
    values.fileName = "";
    setValues({ ...values, fileName: "" });
    setPaperName("");
  };


  let regex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

  const handleKeyDown = (event, from) => {
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      console.log(event.key, from)
      if (from === "savePaper") {
        handlePaper(event);
      }
      if (from === "updatePaper") {
        handleUpdatePaper(event);
      }
      if (from === "addAward") {
        handleAward(event);
      }
      if (from === "updateAward") {
        handleUpdateAward(event);
      }
      return;
    }
  };

  useEffect(() => {
    if ((resText.test(values.title)) === false) {
      setValidNameErr("This field accept only Alphabets with minimum 3 characters.");
    } else {
      setValidNameErr("");
    }

    console.log("baire paper", values.url, regex.test(values.url));
    if (values.url !== "" && regex.test(values.url) === false) {
      console.log("vitore paper", values.url, regex.test(values.url))
      setErrUrl("Please enter a valid link.");
    } else {
      setErrUrl("");
    }
    // console.log("upore error effect here", validNameErr, errUrl)
  }, [values.title, values.url])

  // Paper
  const handlePaper = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (
        values.title === "" ||
        values.title === " " ||
        values.url === "" ||
        values.description === "" ||
        values.description === " " ||
        values.year === "" ||
        values.month === ""
        // papers === null
      ) {
        setErrDate("Please, select an option.");
        setErrInput("This field can't be empty.");
        // setError("Please upload a paper first."); 
        return;
      }

      if (validNameErr !== "" || errUrl !== "") {
        return;
      }

      // if (papers !== null) {
      // console.log('paper', papers)
      const QUERY_UPLOADPAPER = {
        query: `mutation MyMutation {
            uploadDocument (
              content: "${papers}", 
              fileName: "${paperName}",
              url: ""
            )
          }`,
        variables: null,
        operationName: "MyMutation",
      };
      gqlquery(QUERY_UPLOADPAPER, null)
        .then((res) => res.json())
        .then((datas) => {
          const data = JSON.parse(datas?.data?.uploadDocument);
          postPaper(data?.url);
          setPapers(null);
        });
      // }

      const postPaper = (fileUrl) => {

        const QUERY_POSTPAPER = {
          query: `mutation MyMutation {
              addPaper (
                  description: "${values.description?.replaceAll("\n", "<br />")}",
                  fileURL: "${fileUrl}",
                  fileName: "${paperName}",
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
          .then((datas) => {
            if (datas?.data?.addPaper) {
              setAddPaperSnack(true);
              setOpen(true);
              setTimeout(handleSnackbar, 2000);
              setUpdateList(!updateList);
            } else {
              setErrSnack("Sorry, something went wrong. Please, try again.");
              setOpen(true);
            }
            values.title = "";
            values.url = "";
            values.year = "";
            values.month = "";
            values.description = "";
            setPaperName("");
          })
          .finally((e) => console.log("adding papers details to database"));
      };

      setShowPaper((prevData) => !prevData);
      setErrInput("");
      setError("");
      setErrDate("");
      setErrUrl("");
    }
  };

  const handleUpdatePaper = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (
        values.title === "" ||
        values.title === " " ||
        values.url === "" ||
        values.description === "" ||
        values.description === " " ||
        values.year === "" ||
        values.month === ""
        // values.fileName === ""
      ) {
        setErrDate("Please, select an option.");
        setErrInput("This field can't be empty.");
        // setError("Please upload a paper first."); 
        return;
      }

      if (validNameErr !== "" || errUrl !== "") {
        return;
      }

      const QUERY_UPLOADPAPER = {
        query: `mutation MyMutation {
              uploadDocument (
                content: "${papers === null ? "" : papers}", 
                fileName: "${values.fileName}",
                url: ""
              )
            }`,
        variables: null,
        operationName: "MyMutation",
      };
      gqlquery(QUERY_UPLOADPAPER, null)
        .then((res) => res.json())
        .then((datas) => {
          const data = JSON.parse(datas?.data?.uploadDocument);
          updatePaper(data?.url);
          setPapers(null);
        });


      const updatePaper = (docURL) => {

        const QUERY_UPDATEPAPER = {
          query: `mutation MyMutation {
            updatePaper (
                description: "${values.description?.replaceAll("\n", "<br />")}",
                fileURL: "${docURL}",
                fileName: "${values.fileName}",
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

        gqlquery(QUERY_UPDATEPAPER, null)
          .then((res) => res.json())
          .then((datas) => {
            if (datas?.data?.updatePaper) {
              setUpdatePaperSnack(true);
              setOpen(true);
              setTimeout(handleSnackbar, 2000);
              setUpdateList(!updateList);
            } else {
              setErrSnack("Sorry, something went wrong. Please, try again.");
              setOpen(true);
            }

            values.title = "";
            values.url = "";
            values.year = "";
            values.month = "";
            values.description = "";
            setPaperName("");
            setUpdatePaper((prevData) => !prevData);
          })
          .finally((e) => console.log("adding papers details to database"));
      };
      setErrInput("");
      setError("");
      setErrDate("");
      setErrUrl("");
    }
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
        .then((datas) => {
          if (datas?.data?.deletePaper) {
            setDeletePaperSnack(true);
            setOpen(true);
            setTimeout(handleSnackbar, 2000);
            setUpdateList(!updateList);
          } else {
            setErrSnack("Sorry, something went wrong. Please, try again.");
            setOpen(true);
          }
        })
        .finally((e) =>
          console.log("deleting this paper details from database")
        );
      values.title = "";
      values.url = "";
      values.year = "";
      values.month = "";
      values.description = "";
    } else {
      console.log("You don't want to delete this!");
    }

    setUpdatePaper((prevData) => !prevData);
  };

  useEffect(() => {
    if ((resText.test(values.awardname)) === false) {
      setValidNameErr("This field accept only Alphabets with minimum 3 characters.");
    } else {
      setValidNameErr("");
    }
    console.log("baire award", values.url, regex.test(values.url))
    if (values.url !== "" && regex.test(values.url) === false) {
      console.log("vitore paper", values.url, regex.test(values.url))
      setErrUrl("Please enter a valid link.");
    } else {
      setErrUrl("");
    }

    // console.log("niche error effect here", validNameErr, errUrl)
  }, [values.awardname, values.url])

  // Award
  const handleAward = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (
        values.awardname === "" ||
        values.awardname === " " ||
        values.url === "" ||
        values?.description === "" ||
        values?.description === " " ||
        values.year === "" ||
        values.month === ""
      ) {
        setErrDate("Please, select an option.");
        setErrInput("This field can't be empty.");
        setError("Please upload a paper first.");
        return;
      }

      if (validNameErr !== "" || errUrl !== "") {
        return;
      }

      const QUERY_POSTAWARD = {
        query: `mutation MyMutation {
            addAward (
                description: "${values.description?.replaceAll("\n", "<br />")}", 
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
        .then((datas) => {
          // console.log(datas);
          if (datas?.data?.addAward) {
            setAddAwardSnack(true);
            setOpen(true);
            setTimeout(handleSnackbar, 2000);
            setUpdateList(!updateList);
          } else {
            setErrSnack("Sorry, something went wrong. Please, try again.");
            setOpen(true);
          }
        })
        .finally((e) => console.log("adding awards details to database"));

      values.awardname = "";
      values.url = "";
      values.year = "";
      values.month = "";
      values.description = "";
      setShowAward((prevData) => !prevData);
      setErrInput("");
      setError("");
      setErrDate("");
      setErrUrl("");
    }
  };

  const handleUpdateAward = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {
      if (
        values.awardname === "" ||
        values.awardname === " " ||
        values.url === "" ||
        values.description === "" ||
        values.description === " " ||
        values.year === "" ||
        values.month === ""
      ) {
        setErrDate("Please, select an option.");
        setErrInput("This field can't be empty.");
        setError("Please upload a paper first.");
        return;
      }

      if (validNameErr !== "" || errUrl !== "") {
        // console.log("error here", validNameErr, errUrl)
        return;
      }

      const QUERY_UPDATEAWARD = {
        query: `mutation MyMutation {
            updateAward (
                description: "${values.description?.replaceAll("\n", "<br />")}", 
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

      gqlquery(QUERY_UPDATEAWARD, null)
        .then((res) => res.json())
        .then((datas) => {
          // console.log(datas);
          if (datas?.data?.updateAward) {
            setUpdateAwardSnack(true);
            setOpen(true);
            setTimeout(handleSnackbar, 2000);
            setUpdateList(!updateList);
          } else {
            setErrSnack("Sorry, something went wrong. Please, try again.");
            setOpen(true);
          }
        })
        .finally((e) => console.log("updating awards details to database"));

      values.awardname = "";
      values.url = "";
      values.month = "";
      values.year = "";
      values.description = "";
      setUpdateAward((prevData) => !prevData);
      setErrInput("");
      setError("");
      setErrUrl("");
      setErrDate("");
    }
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
        .then((datas) => {
          // console.log(datas);
          if (datas?.data?.deleteAward) {
            setDeleteAwardSnack(true);
            setOpen(true);
            setTimeout(handleSnackbar, 2000);
            setUpdateList(!updateList);
          } else {
            setErrSnack("Sorry, something went wrong. Please, try again.");
            setOpen(true);
          }
        })
        .finally((e) =>
          console.log("deleting this award details from database")
        );
    } else {
      console.log("You don't want to delete this!");
    }

    values.awardname = "";
    values.url = "";
    values.month = "";
    values.year = "";
    values.description = "";
    setUpdateAward((prevData) => !prevData);
  };

  months.map(month => {
    if (values.year === years[0]) {
      if (months.some(person => person.value > new Date().getMonth())) {
        // console.log("person")
      };
    }
  })

  // console.log(years[0], months[0].value, new Date().getMonth(), values.year)


  function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  };


  return (
    <Box sx={{ mt: 6, mb: 10 }}>
    <Card
      sx={{
        backgroundColor: "var(--clr-white) !important",
        boxShadow: matches ? "none" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
        border: matches ? "1px solid #E4EEF5" : "",
        borderRadius: 2,
        p: 2.5,
      }}
    >
      <Box>
        <Typography
          component="div"
          variant="h5"
          sx={{
            fontSize: matches ? "18px" : "24px",
            fontWeight: 700,
            color: "var(--clr-blue-footer)",
            mb: 3,
          }}
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
                      px: 0.5,
                      display: "flex",
                      flexDirection: "column",
                      // gap: 3,
                    }}
                  >
                    {!loadingSkleton ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "var(--clr-gray-1)",
                              mb: "32px",
                            }}
                          >
                            Memberships & Positions
                          </Typography>
                          {matches ? (
                            <Button
                              variant="contained"
                              sx={{
                                fontWeight: 600,
                                borderRadius: 16,
                                borderWidth: "2px !important",
                              }}
                              onClick={() => openForm("memberposition")}
                            >
                              Add
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              sx={{
                                fontWeight: 600,
                                borderRadius: 16,
                                borderWidth: "2px !important",
                              }}
                              onClick={() => openForm("memberposition")}
                            >
                              Add
                            </Button>
                          )}
                        </Box>
                        {membershipDetails?.map((membership) => (
                          <Box>
                            <Grid container>
                              <Grid
                                sx={{ mb: "25px" }}
                                item
                                xs={10.4}
                                sm={10.7}
                                md={11}
                              >
                                <Grid sx={{ mb: "10px" }} container>
                                  <Grid item xs={5} sm={3.5} md={3.5}>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        // width: matches ? "170px" : "200px",
                                        fontSize: "12px",
                                        color: "#828282",
                                        fontWeight: 600,
                                      }}
                                    >
                                      Position Held
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7} sm={8.5} md={8.5}>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        // width: matches ? "62%" : "65%",
                                        color: "#4F4F4F",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {membership?.positionHeld}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid sx={{ mb: "10px" }} container>
                                  <Grid item xs={5} sm={3.5} md={3.5}>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        // width: matches ? "170px" : "200px",
                                        fontSize: "12px",
                                        color: "#828282",
                                        fontWeight: 600,
                                      }}
                                    >
                                      Organization
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7} sm={8.5} md={8.5}>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        // width: matches ? "62%" : "65%",
                                        color: "#4F4F4F",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {membership?.organization}
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid sx={{ mb: "10px" }} container>
                                  <Grid item xs={5} sm={3.5} md={3.5}>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        // width: matches ? "170px" : "200px",
                                        fontSize: "12px",
                                        color: "#828282",
                                        fontWeight: 600,
                                      }}
                                    >
                                      Life Membership
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={7} sm={8.5} md={8.5}>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{
                                        // width: matches ? "62%" : "65%",
                                        color: "#4F4F4F",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {membership?.lifeMembership
                                        ? "Yes"
                                        : "No"}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={1.6} sm={1.3} md={1}>
                                <Button
                                  sx={{
                                    display: "flex",
                                    justifyContent: matches ? "space-between" : "flex-end",
                                    pr: matches ? "2px" : "12px"
                                  }}
                                >
                                  <Tooltip title="Update Memberships & Positions">
                                    <EditIcon
                                      sx={{ fontSize: "medium" }}
                                      onClick={() =>
                                        openForm(
                                          "updatememberposition",
                                          membership
                                        )
                                      }
                                    />
                                  </Tooltip>
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                          /* 
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "",
                          alignItems: "baseline",
                          gap: 3
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "",
                            alignItems: "baseline",
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "200px",
                                fontSize: "12px",
                                color: "#828282",
                                fontWeight: 600,
                              }}
                            >
                              Position Held
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "#4F4F4F",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {membership?.positionHeld}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "200px",
                                fontSize: "12px",
                                color: "#828282",
                                fontWeight: 600,
                              }}
                            >
                              Organization
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "#4F4F4F",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {membership?.organization}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              mb: "25px"
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                width: "200px",
                                fontSize: "12px",
                                color: "#828282",
                                fontWeight: 600,
                              }}
                            >
                              Life Membership
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                color: "#4F4F4F",
                                fontSize: "12px",
                                fontWeight: 600,
                              }}
                            >
                              {membership?.lifeMembership ? "Yes" : "No"}
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Tooltip title="Update Memberships & Positions">
                            <EditIcon
                              sx={{ fontSize: "medium" }}
                              onClick={() =>
                                openForm("updatememberposition", membership)
                              }
                            />
                          </Tooltip>
                        </Button>
                      </Box> */
                        ))}
                      </>
                    ) : (
                      <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                      </>
                    )}
                  </Box>
                ) : (
                  // update membership and position
                  <Box
                    sx={{
                      height: "100%",
                    }}
                  >
                    {!loadingSkletonUpdate ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "var(--clr-gray-3)",
                              mb: 3,
                            }}
                          >
                            Update Memberships & Positions
                          </Typography>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            sx={{
                              borderRadius: 2,
                              borderWidth: "2px",
                              px: 2,
                            }}
                            onClick={handleDeleteMembership}
                          >
                            Delete
                          </Button>
                        </Box>
                        <Grid
                          container
                          direction={"row"}
                          alignItems="flex-start"
                          justifyContent={"space-between"}
                          rowSpacing={2.5}
                          columnSpacing={4}
                        >
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Position Held
                                <span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <TextField
                                variant="outlined"
                                disableUnderline
                                InputProps={{
                                  sx: {
                                    ".MuiOutlinedInput-input": {
                                      // border: "1px solid var(--clr-blue-light)",
                                      padding: '10.5px 14px',
                                    },
                                    /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                      border: "1px solid var(--clr-blue-light)",
                                    },
                                    "&:hover": {
                                      ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        border: "1px solid var(--clr-blue-primary)",
                                      },
                                    }, */
                                  }
                                }}
                                size="small"
                                fullWidth
                                placeholder="Add Your Position"
                                error={values.positionHeld === "" && errInput}
                                defaultValue={memberShipItem.positionHeld}
                                onChange={handleChange("positionHeld")}
                                onKeyDown={handleUpdateMembership}
                                sx={{ borderRadius: 1 }}
                              />
                              {values.positionHeld === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                              {values.positionHeld !== "" &&
                                (values.positionHeld === " " ||
                                  resText.test(values.positionHeld) ===
                                    false) && (
                                  <FormHelperText
                                    sx={{ color: "red", mb: 1 }}
                                  >
                                    {validNameErr}
                                  </FormHelperText>
                                )}
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Organization
                                <span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <TextField
                                variant="outlined"
                                disableUnderline
                                fullWidth
                                InputProps={{
                                  sx: {
                                    ".MuiOutlinedInput-input": {
                                      border: "1px solid var(--clr-blue-light)",
                                      padding: '10.5px 14px',
                                    },
                                    /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                      border: "1px solid var(--clr-blue-light)",
                                    },
                                    "&:hover": {
                                      ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        border: "1px solid var(--clr-blue-primary)",
                                      },
                                    }, */
                                  }
                                }}
                                size="small"
                                // placeholder="Organization Name"
                                placeholder="Add Your Organization Name"
                                error={
                                  values.organizationName === "" && errInput
                                }
                                defaultValue={memberShipItem?.organization}
                                onChange={handleChange("organizationName")}
                                onKeyDown={handleUpdateMembership}
                                sx={{ borderRadius: 1 }}
                              />
                              {values.organizationName === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                              {values.organizationName !== "" &&
                                (values.organizationName === " " ||
                                  resText.test(values.organizationName) ===
                                    false) && (
                                  <FormHelperText
                                    sx={{ color: "red", mb: 1 }}
                                  >
                                    {validNameErr}
                                  </FormHelperText>
                                )}
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Life Membership ?{" "}
                                <span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <RadioGroup
                                row
                                error={values.lifeMembership === "" && error}
                                defaultValue={
                                  memberShipItem?.lifeMembership
                                    ? parseInt(1)
                                    : parseInt(0)
                                }
                                onChange={handleChange("lifeMembership")}
                                onKeyDown={handleUpdateMembership}
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >
                                <FormControlLabel
                                  value={parseInt(1)}
                                  control={
                                    <Radio
                                      sx={{
                                        color: "var(--clr-blue-light)",
                                        "&.Mui-checked": {
                                          color: "var(--clr-blue-primary)",
                                        },
                                      }}
                                    />
                                  }
                                  label="Yes"
                                />
                                <FormControlLabel
                                  value={parseInt(0)}
                                  control={
                                    <Radio
                                      sx={{
                                        color: "var(--clr-blue-light)",
                                        "&.Mui-checked": {
                                          color: "var(--clr-blue-primary)",
                                        },
                                      }}
                                    />
                                  }
                                  label="No"
                                />
                              </RadioGroup>
                              {values.lifeMembership === "" && (
                                <FormHelperText
                                  sx={{ color: "red", mt: -0.5 }}
                                >
                                  {error}
                                </FormHelperText>
                              )}
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={12}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 3,
                                mb: 2.5,
                              }}
                            >
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  openForm("cancel_updatememberposition")
                                }
                                sx={{
                                  borderRadius: 16,
                                  borderWidth: "2px !important",
                                  px: 2,
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                className="save-btn"
                                sx={{
                                  borderRadius: 16,
                                  borderWidth: "2px",
                                  px: 2,
                                  py: 1,
                                }}
                                onClick={(event) =>
                                  handleUpdateMembership(event, "onClick")
                                }
                              >
                                Update
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                      </>
                    )}
                  </Box>
                )}
              </Box>
            ) : (
              // Add Membership and Position Form
              <Box
                sx={{
                  height: "100%",
                }}
              >
                {!loadingSkletonAdd ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--clr-gray-3)",
                        mb: 2,
                      }}
                    >
                      Memberships & Positions
                    </Typography>
                    <Grid
                      container
                      direction={"row"}
                      alignItems="flex-start"
                      justifyContent={"space-between"}
                      rowSpacing={2.5}
                      columnSpacing={4}
                    >
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Position Held
                            <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            variant="outlined"
                            disableUnderline
                            fullWidth
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": { 
                                  padding: '10.5px 14px',
                                },
                                /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid var(--clr-blue-light)",
                                },
                                "&:hover": {
                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid var(--clr-blue-primary)",
                                  },
                                }, */
                              }
                            }}
                            size="small"
                            // placeholder="Position Held"
                            placeholder="Add Your Position"
                            error={values.positionHeld === "" && errInput}
                            value={values.positionHeld}
                            onChange={handleChange("positionHeld")}
                            onKeyDown={handleMembershipAndPositons}
                            sx={{ borderRadius: 1 }}
                          />
                          {values.positionHeld === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                          {values.positionHeld !== "" &&
                            (values.positionHeld === " " ||
                              resText.test(values.positionHeld) ===
                                false) && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {validNameErr}
                              </FormHelperText>
                            )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Organization
                            <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            variant="outlined"
                            disableUnderline
                            fullWidth
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": { 
                                  padding: '10.5px 14px',
                                },
                                /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid var(--clr-blue-light)",
                                },
                                "&:hover": {
                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid var(--clr-blue-primary)",
                                  },
                                }, */
                              }
                            }}
                            size="small"
                            // placeholder="Organization Name"
                            placeholder="Add Your Organization Name"
                            error={values.organizationName === "" && errInput}
                            value={values.organizationName}
                            onChange={handleChange("organizationName")}
                            onKeyDown={handleMembershipAndPositons}
                            sx={{ borderRadius: 1 }}
                          />
                          {values.organizationName === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                          {values.organizationName !== "" &&
                            (values.organizationName === " " ||
                              resText.test(values.organizationName) ===
                                false) && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {validNameErr}
                              </FormHelperText>
                            )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Life Membership ?{" "}
                            <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <RadioGroup
                            row
                            error={values.lifeMembership === "" && error}
                            value={values.lifeMembership}
                            onChange={handleChange("lifeMembership")}
                            onKeyDown={handleMembershipAndPositons}
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value={parseInt(1)}
                              control={
                                <Radio
                                  sx={{
                                    color: "var(--clr-blue-light)",
                                    "&.Mui-checked": {
                                      color: "var(--clr-blue-primary)",
                                    },
                                  }}
                                />
                              }
                              label="Yes"
                            />
                            <FormControlLabel
                              value={parseInt(0)}
                              control={
                                <Radio
                                  sx={{
                                    color: "var(--clr-blue-light)",
                                    "&.Mui-checked": {
                                      color: "var(--clr-blue-primary)",
                                    },
                                  }}
                                />
                              }
                              label="No"
                            />
                          </RadioGroup>
                          {values.lifeMembership === "" && (
                            <FormHelperText sx={{ color: "red", mt: -0.5 }}>
                              {error}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 3,
                            mb: 2.5,
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => openForm("memberposition")}
                            sx={{
                              borderRadius: 16,
                              borderWidth: "2px !important",
                              px: 2,
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              borderRadius: 16,
                              borderWidth: "2px",
                              px: 2,
                              py: 1,
                            }}
                            onClick={(event) =>
                              handleMembershipAndPositons(event, "onClick")
                            }
                          >
                            Save
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </>
                )}
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
            <Divider
              fullWidth
              sx={{ mt: 3, mb: 4, color: "var(--clr-blue-light)" }}
            />
          )}

        {/* Papers  */}
        {showMembership || showAward || updateMembersip || updateAward || (
          <Box>
            {!showPaper ? (
              <Box>
                {!updatePaper ? (
                  <Box
                    sx={{
                      px: 0.5,
                      display: "flex",
                      flexDirection: "column",
                      // gap: 2,
                    }}
                  >
                    {!loadingSkleton ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "var(--clr-gray-1)",
                              mb: "25px",
                            }}
                          >
                            Papers
                          </Typography>
                          {matches ? (
                            <Button
                              variant="contained"
                              sx={{
                                fontWeight: 600,
                                borderRadius: 16,
                                borderWidth: "2px !important",
                              }}
                              onClick={() => openForm("paper")}
                            >
                              Add
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              sx={{
                                fontWeight: 600,
                                borderRadius: 16,
                                borderWidth: "2px !important",
                              }}
                              onClick={() => openForm("paper")}
                            >
                              Add
                            </Button>
                          )}
                        </Box>
                        {paperDetails?.map((paperItem, index) => (
                          <Box
                            sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}
                          >
                            <Box sx={{ display: "grid", lineHeight: "25px" }}>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  color: "#828282",
                                  fontWeight: "600",
                                  fontSize: "12px",
                                }}
                              >
                                <b>{paperItem?.title}</b>
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  px: 0,
                                  color: "var(--clr-gray-3) !important",
                                  fontSize: "12px",
                                }}
                              >
                                <a
                                  style={{ textDecoration: "none",  cursor:'default'}}
                                  // href={paperItem?.url}
                                >
                                  {paperItem?.url}
                                </a>
                              </Typography>
                              <Typography variant="info" sx={textStyle}>
                                {paperItem?.month &&
                                  toMonthName(paperItem?.month)}
                                &nbsp;
                                {paperItem?.year}
                              </Typography>
                              {paperItem?.fileName && (
                                <Typography variant="info" sx={textStyle}>
                                  <Button
                                    onClick={() =>
                                      hanldeDownloadPaper(
                                        paperItem?.fileURL,
                                        paperItem?.fileName
                                      )
                                    }
                                    variant=""
                                    component="span"
                                    sx={{ ml: -2.1 }}
                                  >
                                    <AttachmentIcon /> &nbsp; &nbsp;{" "}
                                    {paperItem?.fileName}
                                  </Button>
                                </Typography>
                              )}
                              <Typography variant="info" sx={textStyle}>
                                {paperItem?.description
                                  ?.split("<br />")
                                  .map((item) => (
                                    <>
                                      {item} <br />
                                    </>
                                  ))}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: matches ? "flex-end" : "flex-end"
                              }}
                            >
                              <Button>
                                <Tooltip title="Update Paper">
                                  <EditIcon
                                    sx={{ fontSize: "medium" }}
                                    onClick={() =>
                                      openForm("updatepaper", paperItem)
                                    }
                                  />
                                </Tooltip>
                              </Button>
                            </Box>
                          </Box>
                        ))}
                      </>
                    ) : (
                      <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                      </>
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                    }}
                  >
                    {!loadingSkletonUpdate ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "var(--clr-gray-3)",
                              mb: 3,
                            }}
                          >
                            Update White Papers / Research Publication /
                            Journal Entry
                          </Typography>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            sx={{
                              borderRadius: 2,
                              borderWidth: "2px",
                              px: 2,
                            }}
                            onClick={handleDeletePaper}
                          >
                            Delete
                          </Button>
                        </Box>
                        <Grid
                          container
                          direction={"row"}
                          alignItems="flex-start"
                          justifyContent={"space-between"}
                          rowSpacing={2.5}
                          columnSpacing={4}
                        >
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Title<span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <TextField
                                variant="outlined"
                                defaultValue={papersItem?.title}
                                InputProps={{
                                  sx: {
                                    ".MuiOutlinedInput-input": { 
                                      padding: '10.5px 14px',
                                    },
                                   /*  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                      border: "1px solid var(--clr-blue-light)",
                                    },
                                    "&:hover": {
                                      ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        border: "1px solid var(--clr-blue-primary)",
                                      },
                                    }, */
                                  }
                                }}
                                size="small"
                                sx={{ borderRadius: 1 }}
                                onChange={handleChange("title")}
                                onKeyDown={handleUpdatePaper}
                                fullWidth
                                disableUnderline
                                error={values.title === "" && errInput}
                                placeholder="Add Your Paper/Research/Journal Title"
                              />
                              {values.title === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                              {values.title !== "" &&
                                (values.title === " " ||
                                  resText.test(values.title) === false) && (
                                  <FormHelperText
                                    sx={{ color: "red", mb: 1 }}
                                  >
                                    {validNameErr}
                                  </FormHelperText>
                                )}
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Link<span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <TextField
                                variant="outlined"
                                InputProps={{
                                  sx: {
                                    ".MuiOutlinedInput-input": { 
                                      padding: '10.5px 14px',
                                    },
                                    /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                      border: "1px solid var(--clr-blue-light)",
                                    },
                                    "&:hover": {
                                      ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        border: "1px solid var(--clr-blue-primary)",
                                      },
                                    }, */
                                  }
                                }}
                                size="small"
                                defaultValue={papersItem?.url}
                                sx={{ borderRadius: 1 }}
                                onChange={handleChange("url")}
                                onKeyDown={handleUpdatePaper}
                                fullWidth
                                disableUnderline
                                error={values.url === "" && errInput}
                                placeholder="Enter URL Link Here"
                              />
                              {values.url === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                              {values.url !== "" &&
                                regex.test(values.url) === false && (
                                  <FormHelperText
                                    sx={{ color: "red", mb: 1 }}
                                  >
                                    {errUrl}
                                  </FormHelperText>
                                )}
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Grid
                              container
                              direction={"row"}
                              rowSpacing={2.5}
                              columnSpacing={4}
                            >
                              <Grid item direction={"column"} xs={12} md={6}>
                                <Box>
                                  <InputLabel sx={{ py: 0.5 }}>
                                    Year
                                    <span style={{ color: "red" }}> *</span>
                                  </InputLabel>
                                  <Select
                                    defaultValue={papersItem?.year}
                                    error={values.year === "" && errDate}
                                    onChange={handleChange("year")}
                                    onKeyDown={handleUpdatePaper}
                                    fullWidth
                                    displayEmpty
                                    renderValue={values.year !== "" ? undefined : () => <SelectPlaceholder>Select Year</SelectPlaceholder>} 
                                    MenuProps={{
                                      classes: { paper: classes.menuPaper },
                                    }}
                                    inputProps={{
                                      classes: { icon: classes.icon },
                                    }}
                                    // input={<CustomSelectInput />}
                                    sx={{ height: "45px"}}
                                  >
                                    <MenuItem value="" disabled>
                                      {/* Year */} Select Year
                                    </MenuItem>
                                    {years?.map((year) => (
                                      <MenuItem key={year} value={year}>
                                        {year}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                  {values.startingYear === "" && (
                                    <FormHelperText
                                      sx={{ color: "red", mb: 1 }}
                                    >
                                      {errDate}
                                    </FormHelperText>
                                  )}
                                </Box>
                              </Grid>
                              <Grid item direction={"column"} xs={12} md={6}>
                                <Box>
                                  <InputLabel sx={{ py: 0.5 }}>
                                    Month
                                    <span style={{ color: "red" }}> *</span>
                                  </InputLabel>
                                  <Select
                                    defaultValue={papersItem?.month}
                                    error={values.month === "" && errDate}
                                    onChange={handleChange("month")}
                                    onKeyDown={handleUpdatePaper}
                                    fullWidth
                                    renderValue={values.month !== "" ? undefined : () => <SelectPlaceholder>Select Month</SelectPlaceholder>} 
                                    displayEmpty
                                    MenuProps={{
                                      classes: { paper: classes.menuPaper },
                                    }}
                                    inputProps={{
                                      classes: { icon: classes.icon },
                                    }}
                                    // input={<CustomSelectInput />}
                                    sx={{ height: "45px"}}
                                  >
                                    <MenuItem value="" disabled>
                                      {/* Select Month */} Select Month
                                    </MenuItem>
                                    {months?.map((month) => (
                                      <MenuItem
                                        disabled={
                                          values.year === years[0]
                                            ? month.value >
                                              new Date().getMonth() + 1
                                            : false
                                        }
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
                                </Box>
                              </Grid>
                              <Grid item direction={"column"} xs={12} md={12}>
                                <Box>
                                  <label htmlFor="contained-button-file">
                                  
                                    <Button
                                      variant=""
                                      component="label"
                                      sx={{ bgColor: "white", mb: 1 }}
                                    >
                                      <AttachmentIcon /> &nbsp; &nbsp; Upload
                                      Papers
                                      <input
                                        type="file"
                                        hidden
                                        onChange={handleUploadPaper}
                                        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
                                      />
                                    </Button>
                                    <br></br>
                                    {values.fileName !== "" && (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: 4,
                                          mb: 1,
                                        }}
                                      >
                                        <Typography>
                                          {/* {values?.fileName} */}
                                          {(values?.fileName?.length > 11) ?   values?.fileName?.slice(0, 10) :  values?.fileName}
                                          {values?.fileName?.length > 10 && '...'}{(values?.fileName?.endsWith(".pdf")) && " .pdf"} {(values?.fileName?.endsWith(".doc")) &&" .doc"} {(values?.fileName?.endsWith(".docx")) && " .docx"}
                                        </Typography>
                                        <Tooltip title="Delete Upload">
                                          <DeleteIcon
                                            sx={{ cursor: "pointer" }}
                                            onClick={
                                              handleDeletePaperInUpdate
                                            }
                                          />
                                        </Tooltip>
                                      </Box>
                                    )}
                                    {values.fileName === "" && paperName && (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: 4,
                                          mb: 1,
                                        }}
                                      >
                                        <Typography>{paperName}</Typography>
                                        <Tooltip title="Delete Upload">
                                          <DeleteIcon
                                            sx={{ cursor: "pointer" }}
                                            onClick={
                                              handleDeletePaperInUpdate
                                            }
                                          />
                                        </Tooltip>
                                      </Box>
                                    )}
                                  </label>
                                  {/* {values.fileName === "" && (
                                    <FormHelperText
                                      sx={{ color: "red", mb: 0 }}
                                    >
                                      {error}
                                    </FormHelperText>
                                  )} */}
                                  {/* {papers === null && (
                                <FormHelperText sx={{ color: "red", mb: 0 }}>
                                  {error}
                                </FormHelperText>
                              )} */}
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Description
                                <span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <TextField
                                variant="outlined"
                                multiline
                                InputProps={{
                                  sx: {
                                    ".MuiOutlinedInput-input": { 
                                      // padding: '10.5px 14px',
                                    },
                                    /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                      border: "1px solid var(--clr-blue-light)",
                                    },
                                    "&:hover": {
                                      ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        border: "1px solid var(--clr-blue-primary)",
                                      },
                                    }, */
                                  }
                                }}
                                size="small"
                                rows={7}
                                fullWidth
                                // placeholder="Job description"
                                placeholder="Type Here..."
                                error={values.description === "" && errInput}
                                defaultValue={papersItem?.description?.replaceAll(
                                  "<br />",
                                  "\n"
                                )}
                                onChange={handleChange("description")}
                                onKeyDown={(event) =>
                                  handleKeyDown(event, "updatePaper")
                                }
                                sx={{ borderRadius: 1 }}
                                disableUnderline
                                inputProps={{
                                  maxlength: CHARACTER_LIMIT,
                                }}
                              />
                              {values.description === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                              {((values.description !== "") && (values.description === " ")) && (
                                  <FormHelperText sx={{ color: "red", mt: 0 }}>
                                    {errInput}
                                  </FormHelperText>
                                )}
                              <FormHelperText>
                                {`${values?.description?.replaceAll("<br />","\n")?.length}/${CHARACTER_LIMIT}`}
                              </FormHelperText>
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={12}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 3,
                                mb: 2.5,
                              }}
                            >
                              <Button
                                variant="outlined"
                                sx={{
                                  borderRadius: 16,
                                  borderWidth: "2px !important",
                                  px: 2,
                                }}
                                onClick={() => openForm("cancel_updatepaper")}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                sx={{
                                  borderRadius: 16,
                                  borderWidth: "2px",
                                  px: 2,
                                  py: 1,
                                }}
                                onClick={(event) =>
                                  handleUpdatePaper(event, "onClick")
                                }
                              >
                                Update
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                      </>
                    )}
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  height: "100%",
                }}
              >
                {!loadingSkletonAdd ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--clr-gray-3)",
                        mb: 3,
                      }}
                    >
                      Add White Papers / Research Publication / Journal Entry
                    </Typography>
                    <Grid
                      container
                      direction={"row"}
                      alignItems="flex-start"
                      justifyContent={"space-between"}
                      rowSpacing={2.5}
                      columnSpacing={4}
                    >
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Title<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            variant="outlined"
                            fullWidth
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": { 
                                  padding: '10.5px 14px',
                                },
                                /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid var(--clr-blue-light)",
                                },
                                "&:hover": {
                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid var(--clr-blue-primary)",
                                  },
                                }, */
                              }
                            }}
                            size="small"
                            disableUnderline
                            placeholder="Add Your Paper/Research/Journal Title"
                            error={values.title === "" && errInput}
                            value={values.title}
                            onChange={handleChange("title")}
                            onKeyDown={handlePaper}
                            sx={{ borderRadius: 1 }}
                          />
                          {values.title === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                          {values.title !== "" &&
                            (values.title === " " ||
                              resText.test(values.title) === false) && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {validNameErr}
                              </FormHelperText>
                            )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Link<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            variant="outlined"
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": { 
                                  padding: '10.5px 14px',
                                },
                                /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid var(--clr-blue-light)",
                                },
                                "&:hover": {
                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid var(--clr-blue-primary)",
                                  },
                                }, */
                              }
                            }}
                            size="small"
                            rows={1}
                            fullWidth
                            disableUnderline
                            placeholder="Enter URL Link Here"
                            error={values.url === "" && errInput}
                            value={values.url}
                            onChange={handleChange("url")}
                            onKeyDown={handlePaper}
                            sx={{ borderRadius: 1 }}
                          />
                          {values.url === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                          {values.url !== "" &&
                            regex.test(values.url) === false && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {errUrl}
                              </FormHelperText>
                            )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Grid
                          container
                          direction={"row"}
                          rowSpacing={2.5}
                          columnSpacing={4}
                        >
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Year<span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <Select
                                placeholder="Select One Option"
                                displayEmpty
                                renderValue={values.year !== "" ? undefined : () => <SelectPlaceholder>Select Year</SelectPlaceholder>} 
                                fullWidth
                                defaultValue={values.year}
                                error={values.year === "" && errDate}
                                value={values.year}
                                onChange={handleChange("year")}
                                onKeyDown={handlePaper}
                                MenuProps={{
                                  classes: { paper: classes.menuPaper },
                                }}
                                inputProps={{
                                  classes: { icon: classes.icon },
                                }}
                                // input={<CustomSelectInput />}
                                sx={{ height: "45px"}}
                              >
                                <MenuItem value="" disabled>
                                  {/* Set Year */}Select Year
                                </MenuItem>
                                {years?.map((year) => (
                                  <MenuItem value={year}>{year}</MenuItem>
                                ))}
                              </Select>
                              {values.year === "" && (
                                <FormHelperText sx={{ color: "red", mb: 0 }}>
                                  {errDate}
                                </FormHelperText>
                              )}
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Month<span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <Select
                                placeholder="Select One Option"
                                displayEmpty
                                renderValue={values.month !== "" ? undefined : () => <SelectPlaceholder>Select Month</SelectPlaceholder>} 
                                fullWidth
                                defaultValue={values.month}
                                error={values.month === "" && errDate}
                                value={values.month}
                                onChange={handleChange("month")}
                                onKeyDown={handlePaper}
                                MenuProps={{
                                  classes: { paper: classes.menuPaper },
                                }}
                                inputProps={{
                                  classes: { icon: classes.icon },
                                }}
                                // input={<CustomSelectInput />}
                                sx={{ height: "45px"}}
                              >
                                <MenuItem value="" disabled>
                                  {/* Set Month */}Select Month
                                </MenuItem>
                                {months?.map((month) => (
                                  <MenuItem
                                    disabled={
                                      values.year === years[0]
                                        ? month.value >
                                          new Date().getMonth() + 1
                                        : false
                                    }
                                    key={month?.value}
                                    value={month?.value}
                                  >
                                    {month?.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              {values.month === "" && (
                                <FormHelperText sx={{ color: "red", mb: 0 }}>
                                  {errDate}
                                </FormHelperText>
                              )}
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={12}>
                            <Box
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Button
                                variant=""
                                component="label"
                                sx={{ bgColor: "white" }}
                              >
                                <AttachmentIcon sx={{ml: -2.3}} /> &nbsp; &nbsp; Upload Papers
                                <input
                                  type="file"
                                  hidden
                                  onChange={handleUploadPaper}
                                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
                                />
                              </Button>

                              {/* {papers === null && (
                            <FormHelperText sx={{ color: "red", mb: 0 }}>
                              {error}
                            </FormHelperText>
                          )} */}
                            </Box>
                            <Box
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <Typography
                                variant="info"
                                sx={{
                                  display: "block",
                                  fontSize: "12px",
                                  color: "var(--clr-blue-footer)",
                                  pb: "17px"
                                }}
                              >
                                Supported Formats: doc, docx, pdf, upto 2 MB.
                              </Typography>
                            </Box>
                            {paperName && (
                              <Box sx={{ display: "flex", gap: 4, mt: 1 }}>
                                <Typography>{/* {paperName} */}{(paperName?.length > 11) ?   paperName?.slice(0, 10) :  paperName}{paperName?.length > 10 && '...'}{(values?.fileName?.endsWith(".pdf")) && " .pdf"} {(values?.fileName?.endsWith(".doc")) &&".doc"} {(values?.fileName?.endsWith(".docx")) && ".docx"}</Typography>
                                <Tooltip title="Delete Upload">
                                  <DeleteIcon
                                    sx={{ cursor: "pointer" }}
                                      onClick={
                                      handleDeletePaperInUpdate
                                      }
                                    />
                                  </Tooltip>
                              </Box>
                              
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Description
                            <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            variant="outlined"
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": { 
                                  // padding: '10.5px 14px',
                                },
                               /*  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid var(--clr-blue-light)",
                                },
                                "&:hover": {
                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid var(--clr-blue-primary)",
                                  },
                                }, */
                              }
                            }}
                            size="small"
                            multiline
                            rows={7}
                            fullWidth
                            disableUnderline
                            placeholder="Type Here..."
                            error={values.description === "" && errInput}
                            value={values.description}
                            onChange={handleChange("description")}
                            onKeyDown={(event) =>
                              handleKeyDown(event, "savePaper")
                            }
                            sx={{ borderRadius: 1 }}
                            inputProps={{
                              maxlength: CHARACTER_LIMIT,
                            }}
                          />
                          {values.description === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                          {((values.description  !== "") && (values.description === " ")) && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {errInput}
                            </FormHelperText>
                          )}
                          <FormHelperText>
                            {`${values?.description?.replaceAll("<br />","\n")?.length}/${CHARACTER_LIMIT}`}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 3,
                            my: 1,
                          }}
                        >
                          <Button
                            variant="outlined"
                            sx={{
                              borderRadius: 16,
                              borderWidth: "2px !important",
                              px: 2,
                            }}
                            onClick={() => openForm("paper")}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              borderRadius: 16,
                              borderWidth: "2px",
                              px: 2,
                              py: 1,
                            }}
                            onClick={(event) => handlePaper(event, "onClick")}
                          >
                            Save
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </>
                )}
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
            <Divider
              fullWidth
              sx={{ mt: 3, mb: 4, color: "var(--clr-blue-light)" }}
            />
          )}

        {/* Awards  */}
        {showMembership || showPaper || updateMembersip || updatePaper || (
          <Box>
            {!showAward ? (
              <Box>
                {!updateAward ? (
                  <Box
                    sx={{
                      px: 0.5,
                      display: "flex",
                      flexDirection: "column",
                      // gap: 2,
                    }}
                  >
                    {!loadingSkleton ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "var(--clr-gray-1)",
                              mb: "25px",
                            }}
                          >
                            Awards
                          </Typography>
                          {matches ? (
                            <Button
                              variant="contained"
                              sx={{
                                fontWeight: 600,
                                borderRadius: 16,
                                borderWidth: "2px !important",
                              }}
                              onClick={() => openForm("award")}
                            >
                              Add
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              sx={{
                                fontWeight: 600,
                                borderRadius: 16,
                                borderWidth: "2px !important",
                              }}
                              onClick={() => openForm("award")}
                            >
                              Add
                            </Button>
                          )}
                        </Box>
                        {awardDetails?.map((awardItem, index) => (
                          <Box key={`accomplishments-awards-${index}`}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "baseline",
                                gap: 2,
                                justifyContent: "space-between"
                              }}
                            >
                              <Box
                                sx={{ display: "grid", lineHeight: "25px" }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    color: "#828282",
                                    fontWeight: "600",
                                    fontSize: "12px",
                                  }}
                                >
                                  <b>{awardItem?.name}</b>
                                </Typography>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    px: 0,
                                    color: "var(--clr-gray-3) !important",
                                    fontSize: "12px",
                                  }}
                                >
                                  <a
                                    style={{ textDecoration: "none" , cursor: 'default'}}
                                    // href={awardItem?.url}
                                  >
                                    {awardItem?.url}
                                  </a>
                                </Typography>
                                <Typography variant="info" sx={textStyle}>
                                  {awardItem?.month &&
                                    toMonthName(awardItem?.month)}
                                  &nbsp;
                                  {awardItem.year}
                                </Typography>
                                <Typography variant="info" sx={textStyle}>
                                  {awardItem?.description
                                    ?.split("<br />")
                                    .map((item) => (
                                      <>
                                        {item} <br />
                                      </>
                                    ))}
                                </Typography>
                              </Box>
                              <Button
                                sx={{
                                  display: "flex",
                                  justifyContent: matches ? "flex-end" : "flex-end",
                                  pr: "27px"
                                }}
                              >
                                <Tooltip title="Update Award">
                                  <EditIcon
                                    sx={{ fontSize: "medium" }}
                                    onClick={() =>
                                      openForm("updateaward", awardItem)
                                    }
                                  />
                                </Tooltip>
                              </Button>
                            </Box>
                          </Box>
                        ))}
                      </>
                    ) : (
                      <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                      </>
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                    }}
                  >
                    {!loadingSkletonUpdate ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontSize: 16,
                              fontWeight: 600,
                              color: "var(--clr-gray-3)",
                              mb: 3,
                            }}
                          >
                            Update your award details here
                          </Typography>
                          <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            sx={{
                              borderRadius: 2,
                              borderWidth: "2px",
                              px: 2,
                            }}
                            onClick={handleDeleteAward}
                          >
                            Delete
                          </Button>
                        </Box>
                        <Grid
                          container
                          direction={"row"}
                          alignItems="flex-start"
                          justifyContent={"space-between"}
                          rowSpacing={2.5}
                          columnSpacing={4}
                        >
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Award Name
                                <span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <TextField
                                variant="outlined"
                                InputProps={{
                                  sx: {
                                    ".MuiOutlinedInput-input": { 
                                      padding: '10.5px 14px',
                                    },
                                    /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                      border: "1px solid var(--clr-blue-light)",
                                    },
                                    "&:hover": {
                                      ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        border: "1px solid var(--clr-blue-primary)",
                                      },
                                    }, */
                                  }
                                }}
                                size="small"
                                defaultValue={awardsItem?.name}
                                sx={{ borderRadius: 1 }}
                                onChange={handleChange("awardname")}
                                onKeyDown={handleUpdateAward}
                                fullWidth
                                error={values.awardname === "" && errInput}
                                placeholder="Add Your Award Title"
                                disableUnderline
                              />
                              {values.awardname === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                              {values.awardname !== "" &&
                                (values.awardname === " " ||
                                  resText.test(values.awardname) ===
                                    false) && (
                                  <FormHelperText
                                    sx={{ color: "red", mb: 1 }}
                                  >
                                    {validNameErr}
                                  </FormHelperText>
                                )}
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                URL<span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <TextField
                                variant="outlined"
                                InputProps={{
                                  sx: {
                                    ".MuiOutlinedInput-input": { 
                                      padding: '10.5px 14px',
                                    },
                                    /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                      border: "1px solid var(--clr-blue-light)",
                                    },
                                    "&:hover": {
                                      ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        border: "1px solid var(--clr-blue-primary)",
                                      },
                                    }, */
                                  }
                                }}
                                size="small"
                                defaultValue={awardsItem?.url}
                                sx={{ borderRadius: 1 }}
                                onChange={handleChange("url")}
                                onKeyDown={handleUpdateAward}
                                fullWidth
                                error={values.url === "" && errInput}
                                placeholder="Enter URL Link Here"
                                disableUnderline
                              />
                              {values.url === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                              {values.url !== "" &&
                                regex.test(values.url) === false && (
                                  <FormHelperText
                                    sx={{ color: "red", mb: 1 }}
                                  >
                                    {errUrl}
                                  </FormHelperText>
                                )}
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={3}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Year<span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <Select
                                defaultValue={awardsItem?.year}
                                error={values.year === "" && errDate}
                                onChange={handleChange("year")}
                                onKeyDown={handleUpdateAward}
                                displayEmpty
                                renderValue={values.year !== "" ? undefined : () => <SelectPlaceholder>Select Year</SelectPlaceholder>} 
                                fullWidth
                                MenuProps={{
                                  classes: { paper: classes.menuPaper },
                                }}
                                inputProps={{
                                  classes: { icon: classes.icon },
                                }}
                                // input={<CustomSelectInput />}
                                sx={{ height: "45px"}}
                              >
                                <MenuItem value="" disabled>
                                  {/* Select Year */} Select Year
                                </MenuItem>
                                {years?.map((year) => (
                                  <MenuItem key={year} value={year}>
                                    {year}
                                  </MenuItem>
                                ))}
                              </Select>
                              {values.year === "" && (
                                <FormHelperText sx={{ color: "red", mb: 1 }}>
                                  {errDate}
                                </FormHelperText>
                              )}
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={3}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Month<span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <Select
                                defaultValue={awardsItem?.month}
                                error={values.month === "" && errDate}
                                onChange={handleChange("month")}
                                onKeyDown={handleUpdateAward}
                                displayEmpty
                                renderValue={values.month !== "" ? undefined : () => <SelectPlaceholder>Select Month</SelectPlaceholder>} 
                                fullWidth
                                MenuProps={{
                                  classes: { paper: classes.menuPaper },
                                }}
                                inputProps={{
                                  classes: { icon: classes.icon },
                                }}
                                // input={<CustomSelectInput />}
                                sx={{ height: "45px"}}
                              >
                                <MenuItem value="" disabled>
                                  {/* Select Month */}Select Month
                                </MenuItem>
                                {months?.map((month) => (
                                  <MenuItem
                                    disabled={
                                      values.year === years[0]
                                        ? month.value >
                                          new Date().getMonth() + 1
                                        : false
                                    }
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
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={6}>
                            <Box>
                              <InputLabel sx={{ py: 0.5 }}>
                                Description
                                <span style={{ color: "red" }}> *</span>
                              </InputLabel>
                              <TextField
                                variant="outlined"
                                InputProps={{
                                  sx: {
                                    ".MuiOutlinedInput-input": { 
                                      // padding: '10.5px 14px',
                                    },
                                    /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                      border: "1px solid var(--clr-blue-light)",
                                    },
                                    "&:hover": {
                                      ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                        border: "1px solid var(--clr-blue-primary)",
                                      },
                                    }, */
                                  }
                                }}
                                size="small"
                                multiline
                                rows={5}
                                fullWidth
                                disableUnderline
                                placeholder="Type Here..."
                                error={values.description === "" && errInput}
                                defaultValue={awardsItem?.description?.replaceAll(
                                  "<br />",
                                  "\n"
                                )}
                                onChange={handleChange("description")}
                                onKeyDown={(event) =>
                                  handleKeyDown(event, "updateAward")
                                }
                                sx={{ borderRadius: 1 }}
                                inputProps={{
                                  maxlength: CHARACTER_LIMIT,
                                }}
                              />
                              {values.description === "" && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                  {errInput}
                                </FormHelperText>
                              )}
                             {((values.description  !== "") && (values.description === " ")) && (
                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                {errInput}
                                </FormHelperText>
                              )}
                              <FormHelperText>
                                {`${values?.description?.replaceAll("<br />","\n")?.length}/${CHARACTER_LIMIT}`}
                              </FormHelperText>
                            </Box>
                          </Grid>
                          <Grid item direction={"column"} xs={12} md={12}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 3,
                                mt: 3,
                                mb: 1,
                              }}
                            >
                              <Button
                                variant="outlined"
                                sx={{
                                  borderRadius: 16,
                                  borderWidth: "2px !important",
                                  px: 2,
                                }}
                                onClick={() => openForm("Cancel_updateaward")}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="contained"
                                sx={{
                                  borderRadius: 16,
                                  borderWidth: "2px",
                                  px: 2,
                                  py: 1,
                                }}
                                onClick={(event) =>
                                  handleUpdateAward(event, "onClick")
                                }
                              >
                                Update
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                      </>
                    )}
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  height: "100%",
                }}
              >
                {!loadingSkletonUpdate ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "var(--clr-gray-3)",
                        mb: 4,
                      }}
                    >
                      Add your award details here
                    </Typography>
                    <Grid
                      container
                      direction={"row"}
                      alignItems="flex-start"
                      justifyContent={"space-between"}
                      rowSpacing={2.5}
                      columnSpacing={4}
                    >
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Title<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            variant="outlined"
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": { 
                                  padding: '10.5px 14px',
                                },
                                /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid var(--clr-blue-light)",
                                },
                                "&:hover": {
                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid var(--clr-blue-primary)",
                                  },
                                }, */
                              }
                            }}
                            size="small"
                            fullWidth
                            disableUnderline
                            placeholder="Add Your Award Title"
                            error={values.awardname === "" && errInput}
                            value={values.awardname}
                            onChange={handleChange("awardname")}
                            onKeyDown={handleAward}
                            sx={{ borderRadius: 1 }}
                          />
                          {values.awardname === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                          {values.awardname !== "" &&
                            (values.awardname === " " ||
                              resText.test(values.awardname) === false) && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {validNameErr}
                              </FormHelperText>
                            )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            URL<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            variant="outlined"
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": { 
                                  padding: '10.5px 14px',
                                },
                                /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid var(--clr-blue-light)",
                                },
                                "&:hover": {
                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid var(--clr-blue-primary)",
                                  },
                                }, */
                              }
                            }}
                            size="small"
                            disableUnderline
                            fullWidth
                            placeholder="Enter URL Link Here"
                            error={values.url === "" && errInput}
                            value={values.url}
                            onChange={handleChange("url")}
                            onKeyDown={handleAward}
                            sx={{ borderRadius: 1 }}
                          />
                          {values.url === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                          {values.url !== "" &&
                            regex.test(values.url) === false && (
                              <FormHelperText sx={{ color: "red", mb: 1 }}>
                                {errUrl}
                              </FormHelperText>
                            )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={3}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Year<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Select
                            displayEmpty
                            renderValue={values.year !== "" ? undefined : () => <SelectPlaceholder>Select Year</SelectPlaceholder>} 
                            fullWidth
                            defaultValue={values.year}
                            error={values.year === "" && errDate}
                            value={values.year}
                            onChange={handleChange("year")}
                            onKeyDown={handleAward}
                            MenuProps={{
                              classes: { paper: classes.menuPaper },
                            }}
                            inputProps={{ classes: { icon: classes.icon } }}
                            // input={<CustomSelectInput />}
                            sx={{ height: "45px"}}
                          >
                            <MenuItem value="" disabled>
                              {/* Set Year */}Select Year
                            </MenuItem>
                            {years?.map((year) => (
                              <MenuItem value={year}>{year}</MenuItem>
                            ))}
                          </Select>
                          {values.year === "" && (
                            <FormHelperText sx={{ color: "red", mb: 1 }}>
                              {errDate}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={3}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Month<span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <Select
                            fullWidth
                            displayEmpty
                            renderValue={values.month !== "" ? undefined : () => <SelectPlaceholder>Select Month</SelectPlaceholder>} 
                            defaultValue={values.month}
                            error={values.month === "" && errDate}
                            value={values.month}
                            onChange={handleChange("month")}
                            onKeyDown={handleAward}
                            MenuProps={{
                              classes: { paper: classes.menuPaper },
                            }}
                            inputProps={{ classes: { icon: classes.icon } }}
                            // input={<CustomSelectInput />}
                            sx={{ height: "45px"}}
                          >
                            <MenuItem value="" disabled>
                              {/* Set Month */}Select Month
                            </MenuItem>
                            {months.map((month) => (
                              <MenuItem
                                disabled={
                                  values.year === years[0]
                                    ? month.value > new Date().getMonth() + 1
                                    : false
                                }
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
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={6}>
                        <Box>
                          <InputLabel sx={{ py: 0.5 }}>
                            Description
                            <span style={{ color: "red" }}> *</span>
                          </InputLabel>
                          <TextField
                            variant="outlined"
                            InputProps={{
                              sx: {
                                ".MuiOutlinedInput-input": { 
                                  // padding: '10.5px 14px',
                                },
                                /* ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                  border: "1px solid var(--clr-blue-light)",
                                },
                                "&:hover": {
                                  ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid var(--clr-blue-primary)",
                                  },
                                }, */
                              }
                            }}
                            size="small"
                            multiline
                            rows={5}
                            fullWidth
                            disableUnderline
                            placeholder="Type Here..."
                            error={values.description === "" && errInput}
                            value={values.description}
                            onChange={handleChange("description")}
                            onKeyDown={(event) =>
                              handleKeyDown(event, "addAward")
                            }
                            sx={{ borderRadius: 1 }}
                            inputProps={{
                              maxlength: CHARACTER_LIMIT,
                            }}
                          />
                          {values.description === "" && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                              {errInput}
                            </FormHelperText>
                          )}
                          {((values.description  !== "") && (values.description === " ")) && (
                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                            {errInput}
                            </FormHelperText>
                          )}
                          <FormHelperText>
                            {`${values?.description?.replaceAll("<br />","\n")?.length}/${CHARACTER_LIMIT}`}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={12}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 3,
                            mt: 3,
                            mb: 1,
                          }}
                        >
                          <Button
                            variant="outlined"
                            sx={{
                              borderRadius: 16,
                              borderWidth: "2px !important",
                              px: 2,
                            }}
                            onClick={() => openForm("award")}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              borderRadius: 16,
                              borderWidth: "2px",
                              px: 2,
                              py: 1,
                            }}
                            onClick={(event) => handleAward(event, "onClick")}
                          >
                            Save
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </>
                )}
              </Box>
            )}
          </Box>
        )}

        {(addMembershipSnack || addPaperSnack || addAwardSnack) && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {addMembershipSnack && "Membership added successfully."}
              {addPaperSnack && "Paper added successfully."}
              {addAwardSnack && "Award added successfully."}
            </Alert>
          </Snackbar>
        )}
        {(updateMembershipSnack || updatePaperSnack || updateAwardSnack) && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {updateMembershipSnack && "Membership updated successfully."}
              {updatePaperSnack && "Paper updated successfully."}
              {updateAwardSnack && "Award updated successfully."}
            </Alert>
          </Snackbar>
        )}
        {(deleteMembershipSnack || deletePaperSnack || deleteAwardSnack) && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {deleteMembershipSnack && "Membership deleted successfully."}
              {deletePaperSnack && "Paper deleted successfully."}
              {deleteAwardSnack && "Award deleted successfully."}
            </Alert>
          </Snackbar>
        )}

        {(errSnack || fileSizeError || paperFileTypeError) && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
             {errSnack && "Sorry, Something went wrong. Please try again."}
             {fileSizeError && "File size must be less than 2 MB."}
             {paperFileTypeError && "Paper file should be either in .pdf, .doc or .docx format."}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Card>
  </Box>
  );
}, areEqual);

export default Accomplishments;

const textStyle = { fontSize: "12px", color: "#828282" };
