import React from "react"
import PropTypes from "prop-types"

import Button from "@mui/material/Button"

import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined"
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: "1.5rem",
    color:
      theme.palette?.type?.localeCompare("light") === 0
        ? theme.palette.primary.main
        : theme.palette.primary.contrastText,
    paddingRight: "15px",
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "flex-end",
    padding: "15px",
    backgroundColor: theme.palette.background.paper,
    color:
      theme.palette.type?.localeCompare("light") === 0
        ? theme.palette.text.primary
        : theme.palette.primary.contrastText,
  },
  fakeInput: {
    display: "flex",
    flexDirection: "row",
    minWidth: theme.myConfigButtonWidth,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor:
      theme.palette.type?.localeCompare("light") === 0
        ? theme.palette.primary.main
        : theme.palette.primary.contrastText,
  },
}))

const ThemeToggle = props => {
  const classes = useStyles()
  const [themeFlag, setThemeFlag] = React.useState(props.themeType || "light")

  const handleToggle = () => {
    if (
      props.hasOwnProperty("themeType") &&
      props.hasOwnProperty("setThemeType")
    ) {
      const newType = props.themeType === "light" ? "dark" : "light"
      props.setThemeType(newType)
      setThemeFlag(newType)
    } else {
      setThemeFlag(themeFlag === "light" ? "dark" : "light")
    }
  }

  return (
    <Button
      variant="contained"
      className={classes.buttonWrapper}
      onClick={handleToggle}
    >
      {themeFlag === "light" ? (
        <NightsStayOutlinedIcon className={classes.icon} />
      ) : (
        <Brightness5OutlinedIcon className={classes.icon} />
      )}
    </Button>
  )
}

ThemeToggle.propTypes = {
  themeType: PropTypes.string,
  setThemeType: PropTypes.func,
}

export default ThemeToggle
