import React from "react"
import { Typography, Paper, Grid,  } from "@mui/material"
import imageLight from "../../../images/growing-plant-light.png"
import imageDark from "../../../images/growing-plant-dark.png"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(() => ({
  root: props => {
    return ({
      borderRadius: 0,
      height: '45vw',
      backgroundImage: true ? `url(${imageLight})` : `url(${imageDark})`,
      backgroundPosition: "center",
      backgroundSize: "cover"
    })
  }
}));
const Frame1 = props => {
  const theme = props.theme
  const classes = useStyles(theme)
  return (
    <>
      <div elevation={0} className={classes.root}>
        <Grid container direction="column" alignItems="center">
          <Grid item data-aos="fade-down" data-aos-delay="500">
            <Typography
              style={{
                marginTop: "3vw",
                textAlign: "center",
                color: theme.textLight,
                fontSize: "5vw",
              }}
            >
              <b>A Group Of Amazing People</b>
            </Typography>
          </Grid>
          <Grid item data-aos="fade-in" style={{ textAlign: "center" }}>
            <Typography
              style={{
                marginTop: "1.5vw",
                textAlign: "center",
                fontSize: "6vw",
                color: theme.textLight,
                textShadow: "5px 5px 0px #000000",
              }}
            >
              <b>Supporting Each Other</b>
            </Typography>
            <Typography
              style={{
                textAlign: "center",
                color: theme.textLight,
                fontSize: "3vw",
              }}
            >
              Growth for juniors and seniors
            </Typography>
          </Grid>
        </Grid>

      </div>
    </>
  )
}

export default Frame1
