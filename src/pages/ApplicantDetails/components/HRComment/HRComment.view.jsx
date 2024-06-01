import {
  Box,
  Button,
  Card,
  Divider,
  Input,
  TextField,
  InputLabel,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { gqlquery } from "../../../../api/hospitalIndex.js";
import useAuth from "../../../../hooks/useAuth.js";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function HRComment(props) {
  const { hospitalUser } = useAuth();
  const [updateList, setUpdateList] = useState(false);
  const [hrComment, setHRComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [addHrCommentSuccess, setAddHrCommentSuccess] = useState("");
  const [addHrCommentFailure, setAddHrCommentFailure] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setAddHrCommentSuccess("");
    setAddHrCommentFailure("");
  };

  const handleHRComment = (event, from) => {
    if (event.key === "Enter" || from === "onClick") {

      const QUERY_POSTHRCOMMENT = {
        query: `mutation MyMutation {
                 addProfileComment (
                  userID: "${props?.userID}",
                      comment: "${hrComment}"
                      ) 
                    }
                `,
        variables: null,
        operationName: "MyMutation",
      };

      gqlquery(QUERY_POSTHRCOMMENT, null)
        .then((res) => res.json())
        .then((datas) => {
          // console.log(datas)
          if (datas?.data?.addProfileComment === "SUCCESS") {
            setOpen(true);
            setAddHrCommentSuccess("New comment added successfully.")
            setUpdateList(!updateList);
            setHRComment("");
          } else{
            setOpen(true);
            setAddHrCommentFailure("Operation failed. Please try again.")
          }
        })
        .finally((e) => console.log("adding HR COMMENTS to database"));

      setHRComment("");
    }
  };
  useEffect(() => {
    const QUERY_GETALLCOMMENTS = {
      query: `query MyQuery {
                getProfileComments(userID : "${props?.userID}") {
                  comment
                  commentedAt
                  pcID
                   }
                }`,
    };
    gqlquery(QUERY_GETALLCOMMENTS, null)
      .then((res) => res.json())
      .then((datas) => {
        setAllComments(datas.data?.getProfileComments);
      })
      .finally((e) => setIsLoading(false));
  }, [updateList,]);

  const date_diff_indays = function (dt1) {
    const dt2 = new Date();
    const days = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
    );
    const month = Math.floor(days / 30);
    const day = days % 30;
    if (days >= 30) {
      return {
        month,
        day,
      };
    }
    return {
      days,
    };
  };

  return (
    <Box>
      <Card
        sx={{
          bgcolor: "var(--clr-white)",
          boxShadow: !matches ? "0px 9px 18px rgba(69, 143, 246, 0.09)" : "0px 0px 0px 0px",
          border: !matches ? "" : "1px solid #E4EEF5"
        }}
      >
        <Box sx={{ mb: matches ? 0 : 2, p: matches ? 1.875 : 2 }}>
          <InputLabel sx={{ py: 0.5 }}>Comment</InputLabel>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
              display: !matches && "flex",
              gap: 2,
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              disableUnderline
              fullWidth
              placeholder="Write your comment here"
              multiline
              value={hrComment}
              onChange={(e) => setHRComment(e.target.value)}
              onKeyDown={handleHRComment}
              sx={{ borderRadius: 1, padding: "3px 0px  !important" }}
              InputProps={{
                sx: {
                  ".MuiOutlinedInput-input": {
                    padding: '0px 0px',
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
            />
            <Box sx={{ mt: matches && "20px" }}>
              <Button
                onClick={(event) => handleHRComment(event, "onClick")}
                variant="contained"
                sx={{ py: 1.2, px: 3, borderRadius: 16 }}
              >
                Add&nbsp;Comment
              </Button>
            </Box>
          </Box>
        </Box>
        {
          !matches && <Divider sx={{ color: "var(--clr-gray-4)", borderWidth: "1px" }} />
        }

        <Box sx={{ mb: 1, mt: matches ? 0 : 1, px: matches ? 1.875 : 2, pb: matches ? 1.875 : 2, pt: matches ? 0.625 : 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: matches ? "16px" : "18px",
              fontWeight: 600,
              color: "var(--clr-blue-footer)",
            }}
          >
            Previous Comments
          </Typography>
          <Box sx={{ maxHeight: "350px", overflowX: "auto" }}>
            {allComments?.map((comment) => (
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2"
                  gutterBottom
                  component="div"
                  sx={{
                    ml: 0,
                    mb: 1,
                    color: "#395987",
                    fontWeight: "600",
                  }}>
                  {/* <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "var(--clr-blue-footer)",
                    }}
                  > */}
                  {hospitalUser?.contactName}
                  {/* </span>{" "} */}
                  {/* <span style={{ color: "#C7D3E3", fontSize: "12px", }}>
                    {date_diff_indays(new Date(`${comment?.commentedAt}`))
                      .month ? (
                      <>
                        {
                          date_diff_indays(new Date(`${comment?.commentedAt}`))
                            .month
                        }{" "}
                        {date_diff_indays(new Date(`${comment?.commentedAt}`))
                          .month === 1
                          ? "month"
                          : "months"}{" "}
                        {date_diff_indays(new Date(`${comment?.commentedAt}`))
                          .day ? (
                          <>
                            {
                              date_diff_indays(
                                new Date(`${comment?.commentedAt}`)
                              ).day
                            }{" "}
                            {date_diff_indays(new Date(`${comment?.commentedAt}`))
                              .day === 1
                              ? "day"
                              : "days"}{" "}
                            {"ago"}
                          </>
                        ) : (
                          <> {"ago"}</>
                        )}
                      </>
                    ) : (
                      <>
                        {
                          date_diff_indays(new Date(`${comment?.commentedAt}`))
                            .days
                        }{" "}
                        {date_diff_indays(new Date(`${comment?.commentedAt}`))
                          .days === 1
                          ? "day"
                          : "days"}{" "}
                        {"ago"}
                      </>
                    )} */}
                  {/* {comment?.commentedAt}  */}
                  {/* </span>{" "} */}
                  {/* <br /> */}
                  <Typography
                    variant="caption"
                    display="inline"
                    gutterBottom
                    sx={{
                      mx: 2,
                      color: "#C7D3E3",
                      fontWeight: '400',

                    }}
                  >

                    {moment(comment?.commentedAt).startOf('seconds').fromNow()}
                  </Typography>
                </Typography>
                <ReactReadMoreReadLess
                  sx={{ color: "#828282", fontSize: "14px" }}
                  charLimit={200}
                  readMoreText={"Read more"}
                  readLessText={"Read less"}
                  readMoreClassName="read-more-less--more"
                  readLessClassName="read-more-less--less"
                >
                  {comment?.comment}
                </ReactReadMoreReadLess>
              </Box>
            ))}
          </Box>
        </Box>

        {
          addHrCommentSuccess && (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                {addHrCommentSuccess}
              </Alert>
            </Snackbar>
          )
        }

        {
          addHrCommentFailure && (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                {addHrCommentFailure}
              </Alert>
            </Snackbar>
          )
        }
      </Card>
    </Box>
  );
}
