import React from "react"
import cx from "clsx"
import { makeStyles } from "@mui/styles"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: "0 auto",
    borderRadius: "16px !important",
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2) !important", // Replacing custom shadow with standard boxShadow
    position: "relative",
    width: "80%",
    overflow: "initial",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "16px !important",
    [breakpoints.up("md")]: {
      flexDirection: "row",
      paddingTop: "16px !important",
    },
  },
  cardcontent: {
    width: "60% !important",
    display: "flex !important",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    [breakpoints.down("md")]: {
      width: "90%",
      margin: "0 auto",
    },
  },
  media: {
    objectFit: "cover",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: spacing(-3),
    width: "80%",
    height: "auto",
    paddingBottom: "48%",
    borderRadius: spacing(2),
    backgroundColor: "#ffffff",
    position: "relative",
    [breakpoints.up("md")]: {
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: "translateX(-8px)",
    },
    "&:after": {
      content: '" "',
      position: "absolute",
      top: 0,
      left: 0,
      backgroundImage: "linear-gradient(147deg, #ffffff 0%, #ffffff 74%) !important",
      borderRadius: spacing(2), // 16px
      opacity: 0.0,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: "initial",
  },
}))

export const NoteCard = props => {
  const semarray = [
    ",",
    "Ist",
    "IInd",
    "IIIrd",
    "IVth",
    "Vth",
    "VIth",
    "VIIth",
    "VIIIth",
  ]
  const styles = useStyles()

  return (
    <Card className={styles.root}>
      <CardMedia className={styles.media} image={props.imglink} />
      <CardContent className={styles.cardcontent}>
        <Typography variant="overline" display="block">
          {`${semarray[props.sem]} sem`}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {props.desc}
        </Typography>
        <Button className={styles.cta} href={props.dlink}>
          See More
        </Button>
      </CardContent>
    </Card>
  )
}
