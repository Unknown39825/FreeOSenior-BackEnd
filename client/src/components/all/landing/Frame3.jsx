import {  Paper, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import React from "react"
import CarouselCards from "./Carousels/Carousel"
import imageLight from "../../../images/blueTexture2.jpg"
import imageDark from "../../../images/dark-theme-background3.jpg"
import { Grid } from "@mui/material"

const useStyles = makeStyles(theme => ({
  root: props => ({
    borderRadius: 0,
    height: "auto",
    width: "100%",
    padding: "100px auto",
    backgroundImage: props.light ? `url(${imageLight})` : `url(${imageDark})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  }),
}))

function Frame3(props) {
  const theme = props.theme
  const classes = useStyles(theme)

  return (
    <div elevation={0} className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
      >
        <Grid item style={{ textAlign: "center" }}>
          <Typography
            data-aos="fade-down"
            variant="h2"
            style={{
              fontSize: "6vw",
              marginBottom: "5vh",
              marginTop: "5vh",
              fontWeight: "bold",
              color: theme.text,
            }}
          >
            What We Do?
          </Typography>
        </Grid>

        <Grid item>
          <CarouselCards theme={props} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Frame3
