import React, { useEffect } from "react";
import { Box, Divider, Drawer, List, Typography, makeStyles } from "@material-ui/core";

import PeopleIcon from "@material-ui/icons/People";
import NavItem from "./NavItem";

const user = {
  jobTitle: "Web administrator",
  name: "Administrator",
};

const items = [
  {
    href: "/students",
    icon: PeopleIcon,
    title: "Students",
  },
];

const useStyles = makeStyles(() => ({
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Typography className={classes.name} color="textPrimary" variant="h5">
          Hello,
        </Typography>
        <Typography color="textPrimary" variant="h5">
          {user.name}!
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem href={item.href} key={item.title} title={item.title} icon={item.icon} />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Drawer anchor="left" classes={{ paper: classes.desktopDrawer }} open variant="persistent">
        {content}
      </Drawer>
    </>
  );
};

export default NavBar;
