import React, { useEffect, useState } from "react";
import { Box, Card, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import googleDocsImg from "../../../../assets/icons/resumeColor.png";
import moment from 'moment';
import FileViewer from 'react-file-viewer';
// import { CustomErrorComponent } from 'custom-error';
// import DocViewer , { PDFRenderer, DocViewerRenderers } from "@cyntler/react-doc-viewer";
import nextJSPDF from "../../../../assets/images/NextJS.pdf";
import docFile from "../../../../assets/images/DOC-Resume.doc";
// import mldocxFile from "../../../../assets/images/ML-Menu (1).docx";
import docxFile from "../../../../assets/images/DOCX-Resume.docx";

// import googleDocsImg from "../../../../assets/google-doc";
var FileSaver = require("file-saver");


const Resume = (props) => {
  const [resume, setResume] = useState({});
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [viewResume, setViewResume] = useState({
    response : {
      content: ""
    }
  });

  // const file = `${docxFile}`
  // const type = 'docx'
  // const file = `${nextJSPDF}`
  // const type = 'pdf'
  /* const [arrayBafer, setArrayBafer] = useState([]);
  const [arrayBaferFound, setArrayBaferFound] = useState([]);
  let resumebaseData = resumeBase64.data+"test.pdf"; */

  /* function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
 } */

 /* useEffect(() => {
    const base64toBlob = (data) => {
      // Cut the prefix `data:application/pdf;base64` from the raw base 64
      const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);
      console.log("base64WithoutPrefix", base64WithoutPrefix);
      const bytes = atob(base64WithoutPrefix);
      let length = bytes.length;
      let out = new Uint8Array(length);
      while (length--) {
          out[length] = bytes.charCodeAt(length);
      }
      return new Blob([out], { type: 'application/pdf' });
    };
    const blob = base64toBlob(resumeBase64?.data + "fileName: text.pdf");
    const url = URL.createObjectURL(blob);
    console.log("blob 47" ,blob);
    console.log("url 48" ,url);
    setArrayBafer(blob);
    setArrayBaferFound([0,1,2,3]);
  },[]); */

  /* const docs = [
    // { uri: `${Buffer.from(resumebaseData, "base64")}` }, // Local File
    { uri: `${nextJSPDF}` }, // Local File
    { uri: `${docFile}` }, // Local File
    { uri: `${mldocxFile}` }, // Local File
    // { uri: require("../../../../assets/images/DOC-Resume.doc") }, // Local File
    // { uri: require("../../../../assets/images/DOCX-Resume.docx") }, // Local File
  ]; */

  useEffect(() => {
    const QUERY_GETRESUME = {
      query: `query MyQuery {
                getResume(userID: "${props.userID}") {
                filename
                headline
                uploadedAt
                url
                }
                }`,
      variables: null,
      operationName: "MyMutation",
    };
    gqlquery(QUERY_GETRESUME, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data.getResume) {
          setResume(datas?.data?.getResume);
          props.setResumeHeadline(datas?.data?.getResume?.headline);
        }
      });
  }, []);

  useEffect(() => {
    const QUERY_VIEWRESUME = {
      query: `query MyQuery {
              downloadDocument (url: "${resume?.url}")
            }`,
    };
    gqlquery(QUERY_VIEWRESUME, null)
      .then((res) => res.json())
      .then((datas) => {
        const viewDocument = JSON.parse(datas?.data?.downloadDocument);
        setViewResume(viewDocument);
      });
  }, [resume])

  const hanldeDownloadResume = (e) => {
    const QUERY_DOWNLOADRESUME = {
      query: `query MyQuery {
              downloadDocument (url: "${resume?.url}")
            }`,
    };
    gqlquery(QUERY_DOWNLOADRESUME, null)
      .then((res) => res.json())
      .then((datas) => {
        const downloadDocument = JSON.parse(datas?.data?.downloadDocument);
        savePdf(downloadDocument);
      });
  };

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

  const date = new Date(resume?.uploadedAt);
  const uploadedAt = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .split(" ")
    .join(" ");

  return (
    <Box>
      <Card
        sx={{
          bgcolor: "var(--clr-white)",
          boxShadow: !matches ? "0px 9px 18px rgba(69, 143, 246, 0.09)" : "0px 0px 0px 0px",
          border: !matches ? "" : "1px solid #E4EEF5" , 
          px: matches ? 1.25 : 2.5, 
          py: matches ? 1.25 : 2 
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "var(--clr-blue-footer)", fontWeight: "bold", pb: matches ? 1.72 : 1 , fontSize: matches ? "18px" : "24px"  }}
          gutterBottom
          component="div"
        >
          Resume
        </Typography>
        {
          Object.keys(resume).length > 1 ? 
          <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 3,
              px: 1,
            }}
          >
            <img height="60px" width="48px" src={googleDocsImg} alt="Resume_icon" />
            <Box>
            </Box>
            <Box sx={{ px: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: "#4F4F4F", fontWeight: "600" }}
                component="div"
              >
                {resume?.filename}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                sx={{ color: "#828282", fontWeight: "400", fontSize: "12px" }}
              >
                {/* Uploaded on: {uploadedAt} */}
                Uploaded on: {moment(uploadedAt).format("DD-MMM-YYYY")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  color: "#828282",
                  pt: 2,
                }}
              >
                <Typography
                  onClick={hanldeDownloadResume}
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  sx={{
                    color: "var(--clr-blue-primary)",
                    fontWeight: "600",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Download
                </Typography>
              </Box>
            </Box>
          </Box> 
          <Box>
            {console.log("view base text", viewResume?.response?.content)}
            {/* for pdf */}
            {
              resume?.filename?.endsWith('.pdf') === true &&
               <iframe src={`data:application/pdf;base64,${viewResume?.response?.content}`} width='860px' title={resume?.filename} height='700px' frameborder='0'>This is an embedded <a target='_blank' rel="noreferrer" href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' rel="noreferrer" href='http://office.com/webapps'>Office Online</a>.</iframe>
            }
            {/* for doc */}
            {/* {
              resume?.filename?.endsWith('.doc') === true &&
               <iframe src={`data:application/msword;base64,${viewResume?.response?.content}`} width='860px' title={resume?.filename} height='700px' frameborder='0'>This is an embedded <a target='_blank' rel="noreferrer" href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' rel="noreferrer" href='http://office.com/webapps'>Office Online</a>.</iframe>
            } */}
            {/* for docx */}
            {/* {
              resume?.filename?.endsWith('.docx') === true &&
               <iframe src={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${viewResume?.response?.content}`} width='860px' title={resume?.filename} height='700px' frameborder='0'>This is an embedded <a target='_blank' rel="noreferrer" href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' rel="noreferrer" href='http://office.com/webapps'>Office Online</a>.</iframe>
            } */}
            </Box>
          </Box>
          :
           <Typography variant="body2"
            gutterBottom sx={{
              color: "var(--clr-gray-3)",
              fontSize: "14px",
              fontWeight: "600 !important",
              mb: 1,
            }}>
            No Details Found
          </Typography>
        }
        
        {/* {
          viewResume?.response?.content !== "" &&
        <FileViewer
          fileType={type}
          filePath={viewResume?.response?.content}
          // errorComponent={CustomErrorComponent}
          // onError={this.onError}
          />
        } */}
         {/* { arrayBaferFound.length > 0 && console.log("arrayBafer", typeof arrayBafer)}
        {arrayBaferFound.length > 0 &&
      <DocViewer documents={{uri: URL.createObjectURL(arrayBafer) , fileName:"test.pdf"}}  pluginRenderers={DocViewerRenderers}/>
        } */}
      </Card>
    </Box>
  );
};

export default Resume;
