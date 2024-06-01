import React from 'react'
import EditIcon from "@mui/icons-material/Edit";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  Box,
  // Breadcrumbs,
  Card, CardActions, CardContent, CircularProgress, FormHelperText, Grid, IconButton, TextField,
  InputLabel, Tooltip, Typography
} from "@mui/material";
import Button from "@mui/material/Button";
// Swiper react slider
// import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
// import { makeStyles } from "@material-ui/core/styles";
// import { styled } from "@material-ui/styles";
// import CancelIcon from '@mui/icons-material/Cancel';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import MuiAlert from '@mui/material/Alert';
// import InputBase from "@mui/material/InputBase";
// import Modal from '@mui/material/Modal';
// import Snackbar from '@mui/material/Snackbar';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// import { encode } from 'base-64';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export const AboutTab = (props) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card
      sx={{
        borderRadius: "0.5rem",
        my: 2,
        boxShadow: matches ? "0px 0px 0px 0px" : "0px 9px 18px rgba(69, 143, 246, 0.09)",
        border: matches && "1px solid #E4EEF5",
        marginTop: '30px',
      }}
    >

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: matches ? 1.25 : 2.5,
          py: matches && 1.5
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#395987", fontWeight: "600", fontSize: matches ? "18px" : "24px" }}
        >
          Gallery
        </Typography>
        {props.isLoading ? (
          <Button
            sx={{
              borderRadius: "28px",
              fontSize: matches ? "10px" : "14px",
              fontWeight: "600",
              padding: "4px 16px",
              border: "2px solid #5A98F2",
            }}
          >
            <CircularProgress size={matches ? "1.1rem" : "1.5rem"} thickness={6} />
          </Button>
        ) : (
          <label htmlFor="contained-button-file">
            <props.InputUpload
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={props.handleUploadHospitalImage}
            />
            <Button
              sx={{
                borderRadius: "28px",
                fontSize: matches ? "10px" : "14px",
                fontWeight: "600",
                padding: "4px 16px",
                border: "2px solid #5A98F2",
              }}
              component="span"
            >
              Upload
            </Button>
          </label>
        )}
      </Box>
      <Box sx={{ px: matches ? 1.25 : 2.5, pt: 2 }}>
        <SimpleReactLightbox>
          <SRLWrapper>
            {
              props.copyHospitalImages?.length > 0 ? <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={"auto"}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
              >
                {/* {allHospitalImages?.length === counter && copyHospitalImages?.map((slide) => ( */}

                {props.copyHospitalImages?.map((slide) => (
                  <SwiperSlide
                    style={{
                      backgroundColor: "#BDBDBD",
                      height: "150px",
                      width: "150px",
                    }}
                    key={slide?.id}
                  >
                    {slide?.response?.content === undefined ? (
                      <>
                        {props.isLoading ? (
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
                          <img
                            style={{ padding: "50px" }}
                            src={props.scletonImg}
                            alt="img not availeble"
                          />
                        )}
                      </>
                    ) : (
                      <>
                        {/* {
                        isLoading ? (
                          <Button
                            sx={{
                              marginTop: 3,
                              marginBottom: "1rem",
                              px: 5,
                              py: 5,
                              borderRadius: 16,
                            }}
                          >
                            <CircularProgress size="2rem" thickness={6} />
                          </Button>
                        ) : ( */}
                        <img
                          style={{
                            padding: "5px",
                            height: "150px",
                            width: "150px",
                          }}
                          alt="slide"
                          src={`data:image/png;base64,${slide?.response?.content}`}
                        />
                        {/* )} */}
                      </>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper> : <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#C7D3E3' }}>No image upload yet.! upload image</Typography>
            }
          </SRLWrapper>
        </SimpleReactLightbox>
      </Box>
      <Box sx={{ px: matches ? 1.25 : 2.5, py: 2 }}>
        {!props.updateCompanyVideo ? (
          <>
            <Grid container alignItems="center" specing={2}>
              <Grid item xs={12} sx={12} md={3}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: "#395987", fontWeight: "600", fontSize: matches ? "18px" : "24px" }}
                >
                  Company Video
                </Typography>
              </Grid>
              <Grid item xs={11} sx={11} md={8}>
                <a href={props.hospitalDetails?.video} target="_blank" rel="noreferrer">
                  <Typography variant="body2" sx={{ color: "#5A98F2" }}>
                    {props.hospitalDetails?.video || <Typography sx={{ fontSize: '16px', fontWeight: 400, color: '#C7D3E3' }}>No youtube video upload yet.! upload youtube video</Typography>}
                  </Typography>
                </a>
              </Grid>
              <Grid item xs={1} sx={1} md={1}>
                <Tooltip title="Edit Company Video">
                  <IconButton sx={{ mx: "5px" }} onClick={props.onClickUpdateCompanyVideo}>
                    <EditIcon
                      fontSize="small"
                      sx={{ color: "#5A98F2", cursor: "pointer" }}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Box>
              <Box>
                <InputLabel
                  sx={{ py: 0.5, fontSize: "12px", fontWeight: "600" }}
                >
                  Update Company youtube Video&nbsp;
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    *
                  </span>
                </InputLabel>
                <TextField
                  variant="outlined"
                  placeholder="Update Company Video "
                  onChange={props.handleCompanyVideoChange("videoLink")}
                  onKeyDown={props.handleUpdateCompanyVideo}
                  defaultValue={props.hospitalDetails?.video}
                  error={props.companyVideo.videoLink === "" && props.errInput}
                  id="companyVideo"
                  type="text"
                  fullWidth
                  multiline
                  disableUnderline
                  sx={{
                    color: "var(--clr-blue-footer)",
                    bgcolor: "#FFFFFF",
                    borderRadius: "4px",
                    mt: 0,
                  }}
                  InputProps={{
                    sx: {
                      ".MuiOutlinedInput-input": {
                        // padding: '1px 0px',
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
                {props.companyVideo.videoLink === "" && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {props.errInput}
                  </FormHelperText>
                )}
                {props.youtubeErrInput && (
                  <FormHelperText sx={{ color: "red", mb: 1 }}>
                    {props.youtubeErrInput}
                  </FormHelperText>
                )}
              </Box>
              <Grid
                item
                direction={"column"}
                xs={12}
                md={12}
                justifyContent="flex-end"
                sx={{ display: "grid" }}
              >
                <CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "flex-end",
                      gap: "1rem",
                      padding: 0,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={props.handleCancelCompanyVideoUpdate}
                      sx={{ borderRadius: "28px", fontWeight: "600" }}
                    >
                      Cancel
                    </Button>

                    <Button
                      sx={{ borderRadius: "28px", fontWeight: "600" }}
                      variant="contained"
                      onClick={(event) => props.handleUpdateCompanyVideo(event, "onClick")}
                    >
                      Save
                    </Button>
                  </CardActions>
                </CardContent>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </Card>
  )
}
