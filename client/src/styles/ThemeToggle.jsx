import React from "react";
import Button from "@mui/material/Button";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";
import { makeStyles, useTheme } from "@mui/styles";
import { useThemeContext } from "../styles/ThemeWrapper";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "1.5rem",
    
    paddingRight: theme.spacing(1),
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
  },
}));

const ThemeToggle = () => {
  const classes = useStyles();
  const { toggleTheme } = useThemeContext(); // Get toggleTheme function from context
  const theme = useTheme(); // Get current theme from MUI's ThemeProvider

  const handleToggle = () => {
    toggleTheme(); // Toggle theme when button is clicked
  };

  return (
    <Button
      variant="contained"
      className={classes.buttonWrapper}
      onClick={handleToggle}
    >
      {theme.palette.mode === "light" ? (
        <NightsStayOutlinedIcon className={classes.icon} />
      ) : (
        <Brightness5OutlinedIcon className={classes.icon} />
      )}
    </Button>
  );
};

export default ThemeToggle;
