import React from "react"
import Typography from "@mui/material/Typography"
import "../../../styles/global.css"

import { makeStyles } from "@mui/styles"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"

import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction"

const useStyles = makeStyles({
  contributor: {
    padding: "5px auto",
    borderRadius: 30,
    width: "100%",
    backgroundColor: "#91ede5",
    margin: 5,
    color: "#1a1de8",
    fontFamily: "'Livvic', sans-serif",
  },
  avatar: {
    height: "15px",
    width: "15px",
  },
})

export default function Contributor(props) {
  const styles = useStyles()

  return (
    <ListItem alignItems="flex-start" className={styles.contributor}>
      <ListItemText>
        <Typography
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {props.name[0].toUpperCase() + props.name.slice(1)}
        </Typography>
      </ListItemText>
      <ListItemSecondaryAction>
        <Typography
          style={{ fontSize: 18, fontFamily: "'Livvic', sans-serif" }}
        >
          ({props.count})
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  )
}
