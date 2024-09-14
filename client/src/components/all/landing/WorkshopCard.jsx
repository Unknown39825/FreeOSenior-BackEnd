import React, { useState } from "react"
import { makeStyles } from "@mui/styles"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActionArea from "@mui/material/CardActionArea"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { Avatar, Button, Collapse } from "@mui/material"

// import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog"
// import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over"

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  title: {
    color: "grey",
    fontWeight: "bolder",
  },
  desc: {
    fontSize: 20,
  },
  card: {
    flexDirection: "row",
    margin: 10,
  },
  media: {
    overflow: "hidden",
    zIndex: "1",
    "&:hover": {
      transform: "scale(1.3,1.3)",
      transition: "1s transform",
    },
  },
  mediawrapper: {
    width: "100%",
    height: "auto",
    zIndex: "10",
    overflow: "hidden",
    "&:hover": {
      transform: "none",
    },
  },
  button: {
    height: 50,
  },
}))

export const WorkshopCard = props => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea>
          <div className={classes.mediawrapper}>
            <CardMedia
              component="img"
              alt="Could Not be Loaded"
              width="100%"
              image={props.imglink}
              title={props.title}
              className={classes.media}
            />
          </div>
          <CardContent style={{ color: "violet" }}>
            <Grid
              container
              spacing={2}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h1" className={classes.title}>
                  {props.title}
                </Typography>
              </Grid>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Grid item>
                  <Typography variant="h3" className={classes.desc}>
                    {props.desc}
                  </Typography>
                </Grid>

                <Grid
                  container
                  item
                  direction="row"
                  spacing={2}
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid
                    container
                    item
                    direction="row"
                    alignItems="center"
                    justify="center"
                    spacing={2}
                  >
                    <Grid item>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          "https://res.cloudinary.com/dvhrzmkwd/image/upload/v1622565321/Unknown39825/xogatnz3nliw7eryvd2r.png"
                        }
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h3"
                        component="h3"
                        className={classes.desc}
                      >
                        {props.author}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h3"
                      component="h3"
                      className={classes.desc}
                    >
                      {new Date(props.date).getUTCDate() +
                        "-" +
                        (new Date(props.date).getUTCMonth() + 1) +
                        "-" +
                        new Date(props.date).getUTCFullYear() +
                        " at " +
                        new Date(props.date)
                          .toLocaleString(undefined, {
                            timeZone: "Asia/Kolkata",
                          })
                          .slice(11)}
                    </Typography>
                  </Grid>
                </Grid>
              </Collapse>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  style={{ marginBottom: 10 }}
                  onClick={() => {
                    setExpanded(!expanded)
                  }}
                >
                  Show Related
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}
