import { Box, Tab, Tabs, useMediaQuery, IconButton } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import PropsType from "prop-types";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const UserTabs = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {

    setValue(newValue);
  };

  const theme = useTheme();
  const styles = {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  };
  // const mobileView = useMediaQuery("(max-width:900px)");

  const showNewTab = (tab) => {
    if (tab === "leftTab") {
      setValue((prev) => prev - 1);
    } else {
      setValue((prev) => prev + 1);
    }
  };

  return (
    <Box maxWidth="md" sx={{ /* width: `${mobileView ? "90%" : "100%"}`, */ mx: "auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "var(--clr-blue-light)", color: "var(--clr-blue-footer)" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile={true}
          aria-label="basic tabs"
          textColor="inherit"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "#F2B45A",
              height: "4px",
              borderBottom: 0,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            },
          }}
          ScrollButtonComponent={(props) => {
            if (
              props.direction === "left"
            ) {
              return (
                <IconButton {...props}>
                  <ArrowBackIosNewIcon sx={{ fontSize: 12 }} onClick={() => showNewTab("leftTab")} />
                </IconButton>
              );
            } else if (
              props.direction === "right"
            ) {
              return (
                <IconButton {...props}>
                  <ArrowForwardIosIcon sx={{ fontSize: 12 }} onClick={() => showNewTab("rightTab")} />
                </IconButton>
              );
            } else {
              return null;
            }
          }}
        >
          {props.tabsData.map((tab) => (
            <Tab style={{ fontWeight: 600, width: "auto !important" }} label={tab.name} key={tab.name} sx={styles} />
          ))}
        </Tabs>
      </Box>
      {props.tabsData.map((tab, i) => (
        <TabPanel value={value} index={i} key={tab.name}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
};

export default UserTabs;

UserTabs.prototype = {
  tabsData: PropsType.arrayOf({
    name: PropsType.string,
    component: PropsType.node,
  }),
};
