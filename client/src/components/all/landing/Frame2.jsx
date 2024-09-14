import React from "react"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(theme => ({
  root: props => ({
    textAlign: "center",
    backgroundColor: props.background,
    paddingTop: "10vh",
    
    paddingBottom: "10vh",
  }),
  heading: props => ({
    marginTop: 20,
    textAlign: "center !important",
    color: props.text,
    fontSize: "8vh !important",
  }),
  innertext: props => ({
    color: props.text,
    fontSize: "4vh !important",
    textAlign: "center",
    fontFamily: "'Arvo', serif",
    marginBottom: "5vh",
    paddingLeft: "10vw",
    paddingRight: "10vw",
  }),
}))

const Frame2 = props => {
  const theme = props.theme
  const classes = useStyles(theme)

  return (
    <div className={classes.root}>
      <div data-aos="fade-down"  className={classes.heading}>
        <b>Who are We?</b>
      </div>
      <div data-aos="fade-down" className={classes.innertext}>
        We are a group of like minded people or you can call us your "Seniors"
        who are dedicated to manage a Platform which is committed to provide
        necessary help and support to all the Juniors so that they can easily
        coexist in our college environment.
      </div>
    </div>
  )
}

export default Frame2
