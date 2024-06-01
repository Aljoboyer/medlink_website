import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

const ApplicantDetailsSkeleton = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      {!matches ? (
        <>
          {/* web */}
          <Box maxWidth="md" sx={{ mx: "auto" }}>
            <Box sx={{ mb: 8 }}>
              {/* Breadcrumbs skeleton */}
              <Box>
                <Skeleton
                  variant="text"
                  animation="wave"
                  width="620px"
                  height={20}
                  sx={{ my: 2 }}
                />
              </Box>
              {/* add tag skeleton */}
              <Box
                maxWidth="md"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mt: 2,
                  mb: 2,
                  mx: "auto",
                }}
              >
                <Box>
                  <Card
                    sx={{
                      bgcolor: "var(--clr-white)",
                      boxShadow: !matches
                        ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                        : "0px 0px 0px 0px",
                      px: matches ? 1.875 : 2,
                      py: matches ? 1.25 : 2,
                      border: !matches ? "" : "1px solid #E4EEF5",
                    }}
                  >
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="170px"
                      height={20}
                      sx={{ my: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="50%"
                      height={60}
                      sx={{ my: 0.5 }}
                    />
                  </Card>
                </Box>
              </Box>
              {/* hr comment skeleton */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                  }}
                >
                  <Box sx={{ mb: matches ? 0 : 1, p: matches ? 1.875 : 2 }}>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="80px"
                      height={16}
                      sx={{ my: 0.5 }}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="95%"
                      height={65}
                    />
                  </Box>
                  {!matches && (
                    <Divider
                      sx={{ color: "var(--clr-gray-4)", borderWidth: "1px" }}
                    />
                  )}

                  <Box
                    sx={{
                      mb: 1,
                      mt: matches ? 0 : 1,
                      px: matches ? 1.875 : 2,
                      pb: matches ? 1.875 : 2,
                      pt: matches ? 0.625 : 2,
                    }}
                  >
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="160px"
                      height={25}
                      sx={{ my: 0.5 }}
                    />
                    <Box sx={{ maxHeight: "350px", overflowX: "auto" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="360px"
                        height={15}
                        sx={{ my: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="95%"
                        height={20}
                        sx={{ mb: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="95%"
                        height={20}
                        sx={{ mb: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="95%"
                        height={20}
                        sx={{ mb: 0.5 }}
                      />
                    </Box>
                    <Box sx={{ maxHeight: "350px", overflowX: "auto" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="360px"
                        height={15}
                        sx={{ my: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="95%"
                        height={20}
                        sx={{ mb: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="95%"
                        height={20}
                        sx={{ mb: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="95%"
                        height={20}
                        sx={{ mb: 0.5 }}
                      />
                    </Box>
                  </Box>
                </Card>
              </Box>
              {/* applicant details skeleton */}
              <Box>
                <Grid
                  justifyContent="space-between"
                  alignItems="center"
                  container
                  spacing={2}
                >
                  <Grid item xs={12} md={6}>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="320px"
                      height={60}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Box>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="320px"
                          height={60}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              {/* applicant bio skeleton */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    p: 2,
                    borderRadius: "6px 6px 0px 0px",
                  }}
                >
                  <Grid container spacing={matches ? 2 : 3}>
                    <Grid item xs={12} md={3.4}>
                      <Box>
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          width="72px"
                          height="72px"
                          sx={{ borderRadius: 1 }}
                        />
                      </Box>
                      <Box>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="62px"
                          height={20}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            textAlign: "center",
                            my: 0.8,
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="92px"
                            height={20}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            textAlign: "center",
                            my: 0.5,
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="132px"
                            height={20}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            textAlign: "center",
                            my: 0.5,
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="50px"
                            height={20}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            textAlign: "center",
                            my: 0.5,
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="65px"
                            height={20}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            textAlign: "center",
                            my: 0.5,
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="90px"
                            height={20}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8.6}>
                      <Box sx={{ pb: matches ? 0.8 : 2 }}>
                        <Grid container spacing={matches ? 1 : 3}>
                          <Grid item xs={5} md={4}>
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="90px"
                              height={18}
                            />
                          </Grid>
                          <Grid item xs={7} md={8}>
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="130px"
                              height={18}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <Box sx={{ pb: matches ? 0.8 : 2 }}>
                        <Grid container spacing={matches ? 1 : 3}>
                          <Grid item xs={5} md={4}>
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="110px"
                              height={18}
                            />
                          </Grid>
                          <Grid item xs={7} md={8}>
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="50px"
                              height={18}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <Box>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="70%"
                          height={18}
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="70%"
                          height={18}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
                <Box
                  sx={{
                    backgroundColor: "#E4EEF5",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    borderRadius: "0px 0px 6px 6px",
                    px: 1,
                    py: 1,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="300px"
                    height={35}
                    sx={{ ml: "270px" }}
                  />
                </Box>
              </Box>
              {/* career */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    px: matches ? 1.25 : 2.5,
                    py: matches ? 1.25 : 2,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="320px"
                    height={60}
                  />
                  <Box
                    sx={{
                      pb: matches ? 1.25 : 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    {/* {console.log(careerList)} */}
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="320px"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="320px"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="320px"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="320px"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="320px"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="320px"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="320px"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="320px"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="320px"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="320px"
                        height={15}
                      />
                    </Box>
                  </Box>
                </Card>
              </Box>
              {/* Education */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    px: matches ? 1.25 : 2.5,
                    py: matches ? 1.25 : 2,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="260px"
                    height={35}
                    sx={{ my: 2 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: matches ? 1.7 : 3,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", pb: 2 }}
                    >
                      <Box sx={{ display: "grid", lineHeight: "24px" }}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="290px"
                          height={20}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="200px"
                            height={23}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="330px"
                            height={18}
                            sx={{ mb: 1 }}
                          />
                        </Box>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="290px"
                          height={18}
                          sx={{ mb: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="270px"
                          height={18}
                          sx={{ mb: 1 }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: matches ? 1.7 : 3,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", pb: 2 }}
                    >
                      <Box sx={{ display: "grid", lineHeight: "24px" }}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="290px"
                          height={20}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="200px"
                            height={23}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="330px"
                            height={18}
                            sx={{ mb: 1 }}
                          />
                        </Box>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="290px"
                          height={18}
                          sx={{ mb: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="270px"
                          height={18}
                          sx={{ mb: 1 }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Box>
              {/* Experience */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    px: matches ? 1.25 : 2.5,
                    py: matches ? 1.25 : 2,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="210px"
                    height={35}
                    sx={{ mb: 2 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: matches ? 1.7 : 3,
                      px: matches ? 0.1 : 0.5,
                      mb: 2,
                    }}
                  >
                    <Grid
                      container
                      direction={"row"}
                      alignItems="flex-start"
                      rowSpacing={2.5}
                      columnSpacing={4}
                    >
                      <Grid item direction={"column"} xs={12} md={3}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="180px"
                          height={17}
                        />
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={8}>
                        <Box
                          sx={{
                            display: "grid",
                            lineHeight: "24px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              pb: 1,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="280px"
                              height={23}
                            />
                          </Box>
                          <Box
                            sx={{
                              mt: -0.5,
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.3,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="140px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="250px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="290px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="230px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="290px"
                              height={16}
                            />
                          </Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="220px"
                            height={16}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="98%"
                            height={16}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="98%"
                            height={16}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: matches ? 1.7 : 3,
                      px: matches ? 0.1 : 0.5,
                      mb: 1,
                    }}
                  >
                    <Grid
                      container
                      direction={"row"}
                      alignItems="flex-start"
                      rowSpacing={2.5}
                      columnSpacing={4}
                    >
                      <Grid item direction={"column"} xs={12} md={3}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="180px"
                          height={17}
                        />
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={8}>
                        <Box
                          sx={{
                            display: "grid",
                            lineHeight: "24px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              pb: 1,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="280px"
                              height={23}
                            />
                          </Box>
                          <Box
                            sx={{
                              mt: -0.5,
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.3,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="140px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="250px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="290px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="230px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="290px"
                              height={16}
                            />
                          </Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="220px"
                            height={16}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="98%"
                            height={16}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="98%"
                            height={16}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Box>
              {/* Accomplishments */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    px: matches ? 1.25 : 2.5,
                    py: matches ? 1.25 : 2,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="210px"
                    height={35}
                    sx={{ mb: 2 }}
                  />

                  <Box
                    sx={{
                      pl: 0,
                      pb: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      width: matches ? "100%" : "80%",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="210px"
                        height={20}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ width: matches ? "100%" : "700px" }}>
                      <Box
                        sx={{ display: "flex", alignItems: "baseline", mb: 2 }}
                      >
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              color: "#828282",
                              mb: 1,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="200px"
                              height={17}
                              sx={{ mb: 1 }}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="220px"
                              height={17}
                              sx={{ mb: 1 }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              color: "#828282",
                              mb: 1,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="200px"
                              height={17}
                              sx={{ mb: 1 }}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="220px"
                              height={17}
                              sx={{ mb: 1 }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              color: "#828282",
                              mb: 1,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="200px"
                              height={17}
                              sx={{ mb: 1 }}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="220px"
                              height={17}
                              sx={{ mb: 2 }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Divider
                    sx={{
                      color: "var(--clr-gray-4)",
                      fontWeight: "bold",
                      mb: matches ? 2.5 : 4,
                    }}
                  />

                  <Box style={{ marginTop: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: matches ? "100%" : "80%",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="140px"
                        height={20}
                        sx={{ mb: 1 }}
                      />
                    </div>
                    <div>
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          p: 0,
                          mb: matches ? 0.5 : 3,
                        }}
                      >
                        <Box sx={{ display: "grid", lineHeight: "25px" }}>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="250px"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="250px"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="240px"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="98%"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="260px"
                            height={20}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="98%"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                        </Box>
                      </CardContent>
                    </div>
                  </Box>
                  <Divider
                    sx={{
                      color: "var(--clr-gray-4)",
                      fontWeight: "bold",
                      mb: matches ? 2.5 : 4,
                    }}
                  />

                  <Box style={{ marginTop: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: matches ? "100%" : "80%",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="140px"
                        height={20}
                        sx={{ mb: 1 }}
                      />
                    </div>
                    <div>
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          p: 0,
                          mb: matches ? 0.5 : 3,
                        }}
                      >
                        <Box sx={{ display: "grid", lineHeight: "25px" }}>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="250px"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="250px"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="240px"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="98%"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="260px"
                            height={20}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="98%"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                        </Box>
                      </CardContent>
                    </div>
                  </Box>
                </Card>
              </Box>
              {/* PersonalDetails */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    px: matches ? 1.25 : 2.5,
                    py: matches ? 1.25 : 2,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="210px"
                    height={35}
                    sx={{ mb: 2 }}
                  />
                  <Box
                    sx={{
                      pb: 4,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="220px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="220px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="230px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="180px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="190px"
                      height={20}
                      sx={{ mb: 2 }}
                    />
                    <Box sx={{ width: matches ? "100%" : "70%", mb: 1 }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="70%"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="70%"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="70%"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                  </Box>
                </Card>
              </Box>
              {/* Resume */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    px: matches ? 1.25 : 2.5,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="210px"
                    height={35}
                  />
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 1,
                        px: 1,
                      }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="100px"
                        height="100px"
                      />
                      <Box sx={{ px: 1 }}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="172px"
                          height={23}
                          sx={{ mb: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="160px"
                          height={18}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            gap: 3,
                            color: "#828282",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="150px"
                            height={23}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ mt: "-20px" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="95%"
                        height={300}
                      />
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
          {/* tab and mobile */}
          <Box>
            <Box
              sx={{
                backgroundColor: "var(--clr-blue-light)",
                padding: "15px 0 15px 17px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="30px"
                height="30px"
                sx={{ mr: 3.1 }}
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="180px"
                height="20px"
                sx={{ mr: 3.1 }}
              />
            </Box>
            <Box sx={{ p: 1 }}>
              {/* add tag skeleton */}
              <Box
                maxWidth="md"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  mt: 0.5,
                  mb: 0.5,
                  mx: "auto",
                }}
              >
                <Box>
                  <Card
                    sx={{
                      bgcolor: "var(--clr-white)",
                      boxShadow: !matches
                        ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                        : "0px 0px 0px 0px",
                      px: matches ? 1.875 : 2,
                      py: matches ? 1.25 : 2,
                      border: !matches ? "" : "1px solid #E4EEF5",
                    }}
                  >
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="170px"
                      height={20}
                      sx={{ my: 1 }}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="70%"
                      height={60}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="30%"
                      height={60}
                    />
                  </Card>
                </Box>
              </Box>
              {/* hr comment skeleton */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                  }}
                >
                  <Box sx={{ mb: matches ? 0 : 1, p: matches ? 1.875 : 2 }}>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="80px"
                      height={16}
                      sx={{ my: 0.5 }}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="95%"
                      height={65}
                    />
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="25%"
                      height={55}
                    />
                  </Box>
                  {!matches && (
                    <Divider
                      sx={{ color: "var(--clr-gray-4)", borderWidth: "1px" }}
                    />
                  )}

                  <Box
                    sx={{
                      mb: 1,
                      mt: matches ? 0 : 1,
                      px: matches ? 1.875 : 2,
                      pb: matches ? 1.875 : 2,
                      pt: matches ? 0.625 : 2,
                    }}
                  >
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="160px"
                      height={25}
                      sx={{ my: 0.5 }}
                    />
                    <Box sx={{ mb: 2 }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="170px"
                        height={15}
                        sx={{ my: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="180px"
                        height={20}
                        sx={{ mb: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="90%"
                        height={20}
                        sx={{ mb: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="90%"
                        height={20}
                        sx={{ mb: 0.5 }}
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="170px"
                        height={15}
                        sx={{ my: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="180px"
                        height={20}
                        sx={{ mb: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="90%"
                        height={20}
                        sx={{ mb: 0.5 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="90%"
                        height={20}
                        sx={{ mb: 0.5 }}
                      />
                    </Box>
                  </Box>
                </Card>
              </Box>
              {/* applicant details skeleton */}
              <Box>
                <Grid
                  justifyContent="space-between"
                  alignItems="center"
                  container
                >
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Box>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="170px"
                          height={60}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="160px"
                      height={60}
                    />
                  </Grid>
                </Grid>
              </Box>
              {/* applicant bio skeleton */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    p: 2,
                    borderRadius: "6px 6px 0px 0px",
                  }}
                >
                  <Grid container spacing={matches ? 2 : 3}>
                    <Grid item xs={12} md={3.4}>
                      <Box>
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          width="72px"
                          height="72px"
                          sx={{ borderRadius: 1, mb: 1 }}
                        />
                      </Box>
                      <Box>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="75px"
                          height={20}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            textAlign: "center",
                            my: 0.8,
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="135px"
                            height={20}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            textAlign: "center",
                            my: 0.5,
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="160px"
                            height={20}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            textAlign: "center",
                            my: 0.5,
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="80px"
                            height={20}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            textAlign: "center",
                            my: 0.5,
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="90px"
                            height={20}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            textAlign: "center",
                            my: 0.5,
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="110px"
                            height={20}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8.6}>
                      <Box sx={{ pb: matches ? 0.8 : 2 }}>
                        <Grid container spacing={matches ? 1 : 3}>
                          <Grid item xs={5} md={4}>
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="90px"
                              height={18}
                            />
                          </Grid>
                          <Grid item xs={7} md={8}>
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="130px"
                              height={18}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <Box sx={{ pb: matches ? 0.8 : 2 }}>
                        <Grid container spacing={matches ? 1 : 3}>
                          <Grid item xs={5} md={4}>
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="110px"
                              height={18}
                            />
                          </Grid>
                          <Grid item xs={7} md={8}>
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="50px"
                              height={18}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <Box>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="70%"
                          height={18}
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="70%"
                          height={18}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
                <Box
                  sx={{
                    backgroundColor: "#E4EEF5",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    borderRadius: "0px 0px 6px 6px",
                    px: 1,
                    py: 1,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="260px"
                    height={35}
                    sx={{ ml: 1 }}
                  />
                </Box>
              </Box>
              {/* career */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    px: matches ? 1.25 : 2.5,
                    py: matches ? 1.25 : 2,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="134px"
                    height={35}
                  />
                  <Box
                    sx={{
                      pb: matches ? 1.25 : 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="40%"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="50%"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="40%"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="50%"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="40%"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="50%"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="40%"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="50%"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="40%"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="50%"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="40%"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="50%"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="40%"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="50%"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="40%"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="50%"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="40%"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="50%"
                        height={15}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="40%"
                        height={15}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="50%"
                        height={15}
                      />
                    </Box>
                  </Box>
                </Card>
              </Box>
              {/* Education */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    px: matches ? 1.25 : 2.5,
                    py: matches ? 1.25 : 2,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="130px"
                    height={35}
                    sx={{ my: 2 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: matches ? 1.7 : 3,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", pb: 2 }}
                    >
                      <Box sx={{ display: "grid", lineHeight: "24px" }}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="150px"
                          height={20}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="25%"
                            height={23}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="65%"
                            height={18}
                            sx={{ mb: 1 }}
                          />
                        </Box>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="190px"
                          height={18}
                          sx={{ mb: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="170px"
                          height={18}
                          sx={{ mb: 1 }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: matches ? 1.7 : 3,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", flexDirection: "column", pb: 2 }}
                    >
                      <Box sx={{ display: "grid", lineHeight: "24px" }}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="150px"
                          height={20}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="25%"
                            height={23}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="65%"
                            height={18}
                            sx={{ mb: 1 }}
                          />
                        </Box>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="190px"
                          height={18}
                          sx={{ mb: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="170px"
                          height={18}
                          sx={{ mb: 1 }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Box>
              {/* Experience */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    px: matches ? 1.25 : 2.5,
                    py: matches ? 1.25 : 2,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="170px"
                    height={35}
                    sx={{ mb: 2 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: matches ? 1.7 : 3,
                      px: matches ? 0.1 : 0.5,
                      mb: 2,
                    }}
                  >
                    <Grid
                      container
                      direction={"row"}
                      alignItems="flex-start"
                      rowSpacing={2.5}
                      columnSpacing={4}
                    >
                      <Grid item direction={"column"} xs={12} md={3}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="180px"
                          height={17}
                        />
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={8}>
                        <Box
                          sx={{
                            display: "grid",
                            lineHeight: "24px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              pb: 1,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="200px"
                              height={23}
                            />
                          </Box>
                          <Box
                            sx={{
                              mt: -0.5,
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.3,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="140px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="210px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="190px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="180px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="200px"
                              height={16}
                            />
                          </Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="180px"
                            height={16}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="95%"
                            height={16}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="95%"
                            height={16}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: matches ? 1.7 : 3,
                      px: matches ? 0.1 : 0.5,
                      mt: 1,
                    }}
                  >
                    <Grid
                      container
                      direction={"row"}
                      alignItems="flex-start"
                      rowSpacing={2.5}
                      columnSpacing={4}
                    >
                      <Grid item direction={"column"} xs={12} md={3}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="180px"
                          height={17}
                        />
                      </Grid>
                      <Grid item direction={"column"} xs={12} md={8}>
                        <Box
                          sx={{
                            display: "grid",
                            lineHeight: "24px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              pb: 1,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="200px"
                              height={23}
                            />
                          </Box>
                          <Box
                            sx={{
                              mt: -0.5,
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.3,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="140px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="210px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="190px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="180px"
                              height={16}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="200px"
                              height={16}
                            />
                          </Box>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="180px"
                            height={16}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="95%"
                            height={16}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="95%"
                            height={16}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Box>
              {/* Accomplishments */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    px: matches ? 1.25 : 2.5,
                    py: matches ? 1.25 : 2,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="190px"
                    height={35}
                    sx={{ mb: 1 }}
                  />

                  <Box
                    sx={{
                      pl: 0,
                      pb: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      width: matches ? "100%" : "80%",
                    }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="200px"
                        height={20}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ width: matches ? "100%" : "700px" }}>
                      <Box
                        sx={{ display: "flex", alignItems: "baseline", mb: 2 }}
                      >
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              color: "#828282",
                              mb: 1,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="100px"
                              height={17}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="170px"
                              height={17}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              color: "#828282",
                              mb: 1,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="100px"
                              height={17}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="170px"
                              height={17}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              color: "#828282",
                              mb: 1,
                            }}
                          >
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="100px"
                              height={17}
                            />
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width="170px"
                              height={17}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Divider
                    sx={{
                      color: "var(--clr-gray-4)",
                      fontWeight: "bold",
                      mb: matches ? 2.5 : 4,
                    }}
                  />

                  <Box style={{ marginTop: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: matches ? "100%" : "80%",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="140px"
                        height={20}
                        sx={{ mb: 1 }}
                      />
                    </div>
                    <div>
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          p: 0,
                          mb: matches ? 0.5 : 3,
                        }}
                      >
                        <Box sx={{ display: "grid", lineHeight: "25px" }}>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="140px"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="170px"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="120px"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="80%"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="95%"
                            height={20}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="95%"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                        </Box>
                      </CardContent>
                    </div>
                  </Box>
                  <Divider
                    sx={{
                      color: "var(--clr-gray-4)",
                      fontWeight: "bold",
                      mb: matches ? 2.5 : 4,
                    }}
                  />
                  <Box style={{ marginTop: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: matches ? "100%" : "80%",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="140px"
                        height={20}
                        sx={{ mb: 1 }}
                      />
                    </div>
                    <div>
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          p: 0,
                          mb: matches ? 0.5 : 3,
                        }}
                      >
                        <Box sx={{ display: "grid", lineHeight: "25px" }}>
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="140px"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="170px"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="120px"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="80%"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="95%"
                            height={20}
                            sx={{ mb: 1 }}
                          />
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="95%"
                            height={17}
                            sx={{ mb: 1 }}
                          />
                        </Box>
                      </CardContent>
                    </div>
                  </Box>
                </Card>
              </Box>
              {/* PersonalDetails */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    px: matches ? 1.25 : 2.5,
                    py: matches ? 1.25 : 2,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="210px"
                    height={35}
                    sx={{ mb: 1 }}
                  />
                  <Box
                    sx={{
                      pb: 4,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="170px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="210px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="170px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="210px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="175px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="210px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="180px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="220px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="175px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="190px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 3, color: "#828282" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="150px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="170px"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      width="160px"
                      height={20}
                      sx={{ mb: 1 }}
                    />
                    <Box sx={{ width: matches ? "100%" : "70%", mb: 1 }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="95%"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="95%"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="95%"
                        height={17}
                        sx={{ mb: 1 }}
                      />
                    </Box>
                  </Box>
                </Card>
              </Box>
              {/* Resume */}
              <Box>
                <Card
                  sx={{
                    bgcolor: "var(--clr-white)",
                    boxShadow: !matches
                      ? "0px 9px 18px rgba(69, 143, 246, 0.09)"
                      : "0px 0px 0px 0px",
                    border: !matches ? "" : "1px solid #E4EEF5",
                    px: matches ? 1.25 : 2.5,
                  }}
                >
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="210px"
                    height={35}
                  />
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 1,
                        px: 1,
                      }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="100px"
                        height="100px"
                      />
                      <Box sx={{ px: 1 }}>
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="172px"
                          height={23}
                          sx={{ mb: 1 }}
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          width="160px"
                          height={18}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            gap: 3,
                            color: "#828282",
                          }}
                        >
                          <Skeleton
                            variant="text"
                            animation="wave"
                            width="150px"
                            height={23}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ mt: "-20px" }}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="95%"
                        height={300}
                      />
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default ApplicantDetailsSkeleton;
