import {
  Box,
  Button,
  CardActions,
  FormHelperText,
  Grid,
  Input,
  Skeleton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import { gqlquery, QUERY_GETRESUME, QUERY_GETRESUMEHEADLINE } from "../../../../api";
import resumeIconImg from "../../../../assets/icons/resumeColor.png"
import { decode, encode } from 'base-64';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from '@mui/material/CircularProgress';
import useAuth from "../../../../hooks/useAuth";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


var FileSaver = require('file-saver');


// const Alert = forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

const Resume = () => {
  const { handleStrengthUpdate } = useAuth();
  const [headline, setHeadline] = useState("");
  const [charactersLeft, setCharactersLeft] = useState(500);
  const [files, setFiles] = useState(null);
  const [resume, setResume] = useState([]);
  const [resumeName, setResumeName] = useState("");
  const [updated, setUpdated] = useState(false);
  const [open, setOpen] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeUploadFailed, setResumeUploadFailed] = useState(false);
  const [resumeError, setResumeError] = useState(false);
  const [resumeDownloadFailed, setResumeDownloadFailed] = useState(false);
  const [resumeDownload, setResumeDownload] = useState(false);
  const [resumeDeleted, setResumeDeleted] = useState(false);
  const [resumeHeadline, setResumeHeadline] = useState(false);
  const [resumeHeadlineError, setResumeHeadlineError] = useState(false);
  const [resumeTypeError, setResumeTypeError] = useState(false);
  const [resumeHeadlineClear, setResumeHeadlineClear] = useState(false);
  const [getResumeHeadline, setGetResumeHeadline] = useState();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadReumseError, setUploadResumeError] = useState("");
  const [openResumeSnack, setOpenResumeSnack] = useState(false);
  const [isCountDownLoading, setIsCountDownLoading] = useState(true);
  const CHARACTER_LIMIT = 500;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  document.title = "Resume | MedLink Jobs";


  useEffect(() => {
    gqlquery(QUERY_GETRESUME, null)
      .then((res) => res.json())
      .then((datas) => {
        setResume(datas.data?.getResume)
        console.log('Resume user', datas.data?.getResume)});

    gqlquery(QUERY_GETRESUMEHEADLINE, null)
      .then((res) => res.json())
      .then((datas) => {
        setGetResumeHeadline(datas?.data?.getResume)
        setHeadline(datas?.data?.getResume)
      })
      .finally(() => setIsCountDownLoading(false));
  }, [updated]);

  const hanldeDownloadResume = e => {
    if (resume?.url) {
      const QUERY_DOWNLOADRESUME = {
        query: `query MyQuery {
          downloadDocument (url: "${resume?.url}")
        }`,
      };
      gqlquery(QUERY_DOWNLOADRESUME, null)
        .then((res) => res.json())
        .then((datas) => {
          setUpdated(pre => !pre);
          const downloadDocument = JSON.parse(datas?.data?.downloadDocument);
          console.log('this is downloadDocument', downloadDocument)
          savePdf(downloadDocument)
        })
        setOpen(true);
        setResumeDownload(true);
    } else {
      setResumeError(true);
      setResumeDownloadFailed(true);
      setOpen(true);
    }
  }

  const savePdf = (item) => {
    const byteCharacters = atob(item?.response?.content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });
    const fileName = resume?.filename;
    FileSaver.saveAs(blob, fileName);

  };

  const handleDeleteResume = e => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const QUERY_ADDRESUME = {
        query: `mutation MyMutation {
        deleteDocument(url: "${resume?.url}")
      }`,
        variables: null,
        operationName: "MyMutation",
      };
      gqlquery(QUERY_ADDRESUME, null)
        .then((res) => res.json())
        .then((datas) => {
          const response = JSON.parse(datas?.data?.deleteDocument);
          // console.log(response);
          if (response?.response?.status === "SUCCESS") {
            const QUERY_DELETERESUME = {
              query: `mutation MyMutation {
                deleteResume
            }`,
              variables: null,
              operationName: "MyMutation",
            };
            gqlquery(QUERY_DELETERESUME, null)
              .then((res) => res.json())
              .then((datas) => {
                // console.log(datas)
                handleStrengthUpdate();
                setUpdated(pre => !pre);
                setOpen(true);
                setResumeDeleted(true);
                setResumeUploaded(false);
                setResumeHeadline(false)
                setOpenResumeSnack(false);
              });
          } else {
            setOpen(true);
          }
        })
    }

  }

  const handleKeyDown = event => {
    if (event.shiftKey && event.key === 'Enter') {
      event.preventDefault();
      // setHeadline("");
      // console.log("pressed both enter and shift")
      handleSaveResumeHeadline(event);
      return;
    }
  };

  const handleChange = (event) => {
    setHeadline({ ...headline, headline: event.target.value })
    setCharactersLeft(500 - event.target.value.length);
  };

  const handleClickClearButton = (e) => {

    // 👇️ clear input value
    setHeadline({ headline: "" });

    if (charactersLeft >= 0) {
      setHeadline({ ...headline, headline: e.target.value })
      setCharactersLeft(500 - headline.headline.length);
      setOpen(true);
      setResumeHeadlineClear(true);
    }
    else {
      setOpen(false);
      setResumeHeadlineClear(false);
    }
  };
  let headlineNew = headline?.headline;
  // console.log("he 178", headlineNew)
  let headlineNewReplace = headlineNew?.replace(/  +/g, ' ');
  // console.log("headlineNewReplace", headlineNewReplace);
  // console.log("headlineNewReplace length", headlineNewReplace?.length);

  const handleSaveResumeHeadline = (e) => {
    e.preventDefault();
    // headline.headline = headline.headline.replace(/  +/g, ' ');
    // console.log("head line l", headline.headline.length);
    // console.log("head", headline.headline);
    

/*     if ((headline?.headline?.length === 0) || (headline?.headline === undefined) || (headline?.headline === null) || (headlineNewReplace === " ")) {
      setError("Resume headline input field cannot be empty.");
      return
    } */

    if ((headlineNewReplace?.length === 0) || (headlineNewReplace === undefined) || (headlineNewReplace === null) || (headlineNewReplace === " ")) {
      setError("Resume headline input field cannot be empty.");
      return
    }

    if (headlineNewReplace?.length > 0) {
      let newHeadline = headlineNewReplace?.replaceAll("\n", "<br />");
      const QUERY_ADDRESUMEHEADLINE = {
        query: `mutation MyMutation {
          updateResumeHeadline (
            headline: "${newHeadline}"
          )
        }`,

        variables: null,
        operationName: "MyMutation",
      };
      setIsCountDownLoading(true);
      gqlquery(QUERY_ADDRESUMEHEADLINE, null)
        .then((res) => res.json())
        .then((datas) => {
          // console.log(datas);
          // console.log(datas?.data?.updateResumeHeadline === "SUCCESS")
          handleStrengthUpdate();
          if (datas?.data?.updateResumeHeadline === "SUCCESS") {
            setOpen(true);
            setUpdated(pre => !pre);
            setResumeHeadline(true);
            setResumeUploaded(false);
            setResumeUploadFailed(false);
            setResumeError(false);
            setResumeDownloadFailed(false);
            setOpenResumeSnack(false);
            setResumeDeleted(false);

            // setHeadline("");
            // headline.length = 0;
          } else {
            setResumeHeadlineError(true);
            setOpen(true);
          }
        })
        .finally(() => setIsCountDownLoading(false));
    }
    setError("");
  };

  const handleUploadResume = (e) => {
    let file = e.target.files[0];
    if (file.name.endsWith(".pdf") || file.name.endsWith(".doc") || file.name.endsWith(".docx")) {
      if (parseFloat(file.size / 1024 / 1024).toFixed(2) < 2) {
        setResumeName(file.name);
        var reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = function (evt) {
          let encoded = encode(evt.target.result);
          setFiles(encoded);
        };
      }
      else {
        setUploadResumeError("File size should not be more than 2MB");
        setOpenResumeSnack(true)
      }
    } else {
      setResumeTypeError(true);
      setOpen(true);
      setResumeError(true);
    }
  };

  useEffect(() => {
    if (files !== null) {
      setIsLoading(true);
      const QUERY_ADDRESUME = {
        query: `mutation MyMutation {
            uploadResume (
              content: "${files}", 
              fileName: "${resumeName}",
              url: "${resume?.url ? resume?.url : ""}"
            )
          }`,
        variables: null,
        operationName: "MyMutation",
      };
      gqlquery(QUERY_ADDRESUME, null)
        .then((res) => res.json())
        .then((datas) => {
          handleStrengthUpdate();
          if (datas?.data?.uploadResume === "SUCCESS") {
            setUpdated(pre => !pre);
            setOpen(true);
            setResumeUploaded(true);  
            setOpenResumeSnack(false);
            setResumeDeleted(false);
            setResumeHeadline(false);
          } else {
            setResumeError(true);
            setOpen(true);
            setResumeUploadFailed(true);
          }
          setFiles(null);
        })
        .finally((e) => setIsLoading(false));
    }
  }, [files]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setResumeUploaded(false);
    setResumeUploadFailed(false);
    setResumeError(false);
    setResumeTypeError(false);
    setResumeDownloadFailed(false);
    setOpenResumeSnack(false);
    setResumeDeleted(false);
    setResumeHeadlineClear(false);
    setResumeDownload(false);
  };



  return (
    <Box sx={{ mb: 8, mt: 5 }}>
      <Grid container alignItems="stretch" spacing={3}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              background: "var(--clr-white)",
              boxShadow: matches
                ? "none"
                : "0px 9px 18px rgba(69, 143, 246, 0.09)",
              border: matches ? "1px solid #E4EEF5" : "",
              borderRadius: 2,
              p: 2.5,
              height: !matches ? "326px" : "100%"
            }}
          >
            <Typography
              component="div"
              // variant="h5"
              sx={{
                fontSize: matches ? "18px" : "24px",
                fontWeight: 700,
                marginBottom: 3.5,
                color: "var(--clr-blue-footer)",
                textShadow: 0,
              }}
            >
              Resume
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={3.5} md={3}>
                <Box>
                  <img
                    style={{ width: "3.5rem", height: "auto" }}
                    src={resumeIconImg}
                    alt="Google_docs_Color_Icon"
                  />
                </Box>
              </Grid>
              <Grid xs={8.5} md={9}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="p" sx={{ color: "var(--clr-gray-2)" }}>
                    {resume?.filename !== undefined && (
                      <Typography variant="p">{resume?.filename}</Typography>
                    )}
                  </Typography>
                  <CardActions
                    sx={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      padding: 0,
                      marginTop: "1.5rem",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {resume?.filename ? (
                        <>
                          <Button
                            variant="text"
                            onClick={hanldeDownloadResume}
                            sx={{
                              padding: 0,
                              textDecoration: "underline",
                              fontWeight: 600,
                              fontSize: matches ? "14px" : "16px",
                            }}
                          >
                            Download
                          </Button>
                          <Button
                            onClick={handleDeleteResume}
                            variant="text"
                            sx={{
                              padding: 0,
                              textDecoration: "underline",
                              fontWeight: 600,
                              fontSize: matches ? "14px" : "16px",
                            }}
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "#C7D3E3", pb: "20px", pt: "25px" }}>
                          {/* Please upload your resume here. */}
                          Recruiters give first preference to resume candidates.
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ margin: "0 !important" }}>
                      {resume?.filename ? (
                        <>
                          {isLoading ? (
                            <Button
                              sx={{
                                marginTop: 3,
                                marginBottom: "1rem",
                                px: 5,
                                py: 1.2,
                                borderRadius: 16,
                              }}
                            >
                              <CircularProgress size="2rem" thickness={6} />
                            </Button>
                          ) : (
                            <>
                              {matches ? (
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  component="label"
                                  sx={{
                                    fontSize: "14px",
                                    marginTop: 3,
                                    marginBottom: "1rem",
                                    px: 2.6,
                                    py: 0.8,
                                    borderRadius: 16,
                                  }}
                                >
                                  Upload Resume
                                  <input
                                    type="file"
                                    hidden
                                    onChange={handleUploadResume}
                                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
                                  />
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  component="label"
                                  sx={{
                                    marginTop: 3,
                                    marginBottom: "1rem",
                                    px: 5,
                                    py: 1.2,
                                    borderRadius: 16,
                                  }}
                                >
                                  Upload Resume
                                  <input
                                    type="file"
                                    hidden
                                    onChange={handleUploadResume}
                                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
                                  />
                                </Button>
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {isLoading ? (
                            <Button
                              sx={{
                                marginTop: 3,
                                marginBottom: "1rem",
                                px: 5,
                                py: 1.2,
                                borderRadius: 16,
                              }}
                            >
                              <CircularProgress size="2rem" thickness={6} />
                            </Button>
                          ) : (
                            <>
                              {matches ? (
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  component="label"
                                  sx={{
                                    fontSize: "14px",
                                    marginTop: 3,
                                    marginBottom: "1rem",
                                    px: 2.6,
                                    py: 0.8,
                                    borderRadius: 16,
                                  }}
                                >
                                  Upload Resume
                                  <input
                                    type="file"
                                    hidden
                                    onChange={handleUploadResume}
                                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
                                  />
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  component="label"
                                  sx={{
                                    marginTop: 3,
                                    marginBottom: "1rem",
                                    px: 5,
                                    py: 1.2,
                                    borderRadius: 16,
                                  }}
                                >
                                  Upload Resume
                                  <input
                                    type="file"
                                    hidden
                                    onChange={handleUploadResume}
                                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
                                  />
                                </Button>
                              )}
                            </>
                          )}
                        </>
                      )}
                      <Typography
                        variant="info"
                        sx={{
                          display: "block",
                          fontSize: matches ? "10px" : "12px",
                          color: "var(--clr-blue-footer)",
                          pb: "17px"
                        }}
                      >
                        Supported Formats: doc, docx, pdf, upto 2 MB.
                      </Typography>
                      {resumeUploaded && (
                        <Snackbar
                          open={open}
                          autoHideDuration={4000}
                          onClose={handleClose}
                        >
                          <Alert
                            onClose={handleClose}
                            severity="success"
                            sx={{ width: "100%" }}
                          >
                            Resume uploaded successfully.
                          </Alert>
                        </Snackbar>
                      )}

                      {uploadReumseError && (
                        <Snackbar
                          open={openResumeSnack}
                          autoHideDuration={4000}
                          onClose={handleClose}
                        >
                          <Alert
                            onClose={handleClose}
                            severity="error"
                            sx={{ width: "100%" }}
                          >
                            {uploadReumseError}
                          </Alert>
                        </Snackbar>
                      )}
                      {resumeError && (
                        <Snackbar
                          open={open}
                          autoHideDuration={4000}
                          onClose={handleClose}
                        >
                          <Alert
                            onClose={handleClose}
                            severity="error"
                            sx={{ width: "100%" }}
                          >
                            {resumeUploadFailed &&
                              "Sorry, something went wrong. Please try again later."}
                            {resumeDownloadFailed &&
                              "Something went wrong.Please Try again later."}
                            {resumeTypeError &&
                              "Resume file should be either in .pdf, .doc or .docx format."}
                          </Alert>
                        </Snackbar>
                      )}
                    </Box>
                  </CardActions>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              background: "var(--clr-white)",
              boxShadow: matches
                ? "none"
                : "0px 9px 18px rgba(69, 143, 246, 0.09)",
              border: matches ? "1px solid #E4EEF5" : "",
              borderRadius: 2,
              p: 2.5,
              height: !matches ? "326px" : "100%"
            }}
          >
            <form onSubmit={handleSaveResumeHeadline}>
              <Typography
                component="div"
                // variant="h5"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: "var(--clr-blue-footer)",
                  textShadow: 0,
                  fontSize: matches ? "18px" : "24px",
                }}
              >
                Resume Headline
                {/* {getResumeHeadline?.headline || "Resume Headline"} */}
              </Typography>
              <TextField
                disableUnderline
                multiline
                InputProps={{
                  sx: {
                    ".MuiOutlinedInput-input": {
                      // border: "1px solid var(--clr-blue-light)",
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
                rows={5}
                fullWidth
                placeholder="Description Goes Here"
                // defaultValue={getResumeHeadline?.headline}
                value={headline?.headline?.replaceAll("<br />", "\n")}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                sx={{ borderRadius: 1.5 }}
                inputProps={{
                  maxlength: CHARACTER_LIMIT,
                }}
              />
              {((headlineNewReplace?.length === 0) || (headlineNewReplace === undefined) || (headlineNewReplace === null)) && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}       
              {(((headlineNewReplace?.length !== 0) || (headlineNewReplace !== undefined) || (headlineNewReplace !== null))  && ((headlineNewReplace === " "))) && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}       
            {/*{((headline?.headline?.length === 0) || (headline?.headline === undefined) || (headline?.headline === null)) && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}       
              {(((headline?.headline?.length !== 0) || (headline?.headline !== undefined) || (headline?.headline !== null))  && ((headline?.headline === " "))) && (
                <FormHelperText sx={{ color: "red", mb: 1 }}>
                  {error}
                </FormHelperText>
              )}     */}   
              <Typography
                variant="info"
                sx={{ fontSize: 12, color: "var(--clr-white-icon)" }}
              >
                {/* {`${headline?.headline?.length}/${CHARACTER_LIMIT}`} */}
                {
                  !isCountDownLoading ? (
                    <>
                      {
                        ((headlineNewReplace === undefined) || (headlineNewReplace === null)) ? (
                          <div>
                            {`0/${CHARACTER_LIMIT}`}
                          </div>
                        ) : (
                          <div>
                            {
                              !isCountDownLoading ? (
                                <>
                                  {`${headlineNewReplace?.replaceAll("<br />", "\n")?.length}/${CHARACTER_LIMIT}`}

                                </>
                              ) : (
                                <Skeleton width={80} height={15} />
                              )
                            }

                          </div>
                        )
                      }
                      {/* {
                        ((headline?.headline === undefined) || (headline?.headline === null)) ? (
                          <div>
                            {`0/${CHARACTER_LIMIT}`}
                          </div>
                        ) : (
                          <div>
                            {
                              !isCountDownLoading ? (
                                <>
                                  {`${headline?.headline?.replaceAll("<br />", "\n")?.length}/${CHARACTER_LIMIT}`}

                                </>
                              ) : (
                                <Skeleton width={80} height={15} />
                              )
                            }

                          </div>
                        )
                      } */}
                    </>
                  ) : (
                    <>
                      <Skeleton width={80} height={15} sx={{ mt: 0.3 }} />
                    </>
                  )
                }

              </Typography>
              <br />

              <Typography
                variant="info"
                sx={{ fontSize: 12, color: "var(--clr-white-icon)" }}
              >
                {/* {charactersLeft} character(s) left. */}
              </Typography>
              <CardActions
                sx={{ justifyContent: "flex-end", gap: "1rem", padding: 0 }}
              >
                {matches ? (
                  <Button
                    sx={{
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                    variant="outlined"
                    onClick={handleClickClearButton}
                  >
                    Clear
                  </Button>
                ) : (
                  <Button
                    sx={{ px: 5, py: 1.1, borderRadius: 24, fontWeight: 600 }}
                    variant="outlined"
                    onClick={handleClickClearButton}
                  >
                    Clear
                  </Button>
                )}
                {matches ? (
                  <Button
                    type="submit"
                    sx={{
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                    variant="contained"
                  // onClick={handleSaveResumeHeadline}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    sx={{ px: 5, py: 1.2, borderRadius: 16 }}
                    variant="contained"
                  // onClick={handleSaveResumeHeadline}
                  >
                    Save
                  </Button>
                )}
                {resumeHeadline && (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Resume headline description saved successfully.
                    </Alert>
                  </Snackbar>
                )}
                {resumeDeleted && (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Resume Deleted.
                    </Alert>
                  </Snackbar>
                )}
                {resumeHeadlineError && (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      Sorry, operation was not successful.
                    </Alert>
                  </Snackbar>
                )}
                {resumeHeadlineClear && (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Resume headline description removed successfully.
                    </Alert>
                  </Snackbar>
                )}
                {resumeDownload && (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      Resume downloaded successfully.
                    </Alert>
                  </Snackbar>
                )}
              </CardActions>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Resume;
