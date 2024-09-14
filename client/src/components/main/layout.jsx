import React, { useEffect } from "react"
import Header from "../navigation/header"
import Footer from "../navigation/footer"
import styles from "./layout.module.css"
import AOS from "aos"
import "aos/dist/aos.css"
import { makeStyles, StylesProvider, useTheme } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  root: props => ({
    borderRadius: 0,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    paddingBottom : "5vh",
  })
}));

const Layout = props => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      offest: 50,
    })
  }, [])

  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <StylesProvider injectFirst>
        <Header />
        <div className={classes.root} >{props.children}</div>
        <Footer />
    </StylesProvider>
  )
}

export default Layout
