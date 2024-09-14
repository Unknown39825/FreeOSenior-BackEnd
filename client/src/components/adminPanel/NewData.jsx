import React, { useState } from "react"

import TableCell from "@mui/material/TableCell"

import TableRow from "@mui/material/TableRow"

import axiosFetch from "../../utils/axiosFetch"
import { Button, TextField } from "@mui/material"
import { useSelector } from "react-redux"
import CreateIcon from "@mui/icons-material/Create"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: "15px",
  },
  tablehead: {
    fontSize: 20,
    fontWeight: 800,
    fontFamily: "serif",
    textAlign: "center",
  },
  tableContent: {
    fontSize: 15,
    fontFmaily: "arial",
    textAlign: "center",
  },
}))

export default function NewData({
  setReload = f => f,
  reload,
  tableTitles = [],
  baseAPI = "",
  Data = {},
}) {
  const [data, setData] = useState(Data)
  const state = useSelector(({ auth }) => auth)

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const createData = async event => {
    try {
      if (!state.isLoggedin) {
        window.alert("Please Sign in to continue")
        return
      }

      const res = await axiosFetch.post(`${baseAPI}`, data)
      if (res.data) {
        window.alert("created")

        setReload(!reload)
        setData({})
      }
    } catch (error) {
      console.log(error)
      console.log(error)
      console.log(error?.response?.data?.error)
    }
  }

  const classes = useStyles()

  return (
    <TableRow>
      {/* <td>{event._id}</td> */}

      {tableTitles.map(field => {
        return (
          <TableCell className={classes.tableContent}>
            {" "}
            <TextField
              id="outlined-basic"
              value={data[field]}
              name={field}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />{" "}
          </TableCell>
        )
      })}

      {state.isLoggedin && (
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<CreateIcon />}
            onClick={createData}
          >
            create
          </Button>
        </TableCell>
      )}
    </TableRow>
  )
}
