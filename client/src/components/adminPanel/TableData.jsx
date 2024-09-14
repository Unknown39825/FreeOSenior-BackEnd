import React, { useState } from "react"

import TableCell from "@mui/material/TableCell"

import TableRow from "@mui/material/TableRow"

import axiosFetch from "../../utils/axiosFetch"
import { Button, TextField } from "@mui/material"
import { useSelector } from "react-redux"

import DeleteIcon from "@mui/icons-material/Delete"

import UpdateIcon from "@mui/icons-material/Update"
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

export default function TableData({
  Data,
  setReload = f => f,
  reload,
  tableTitles = [],
  baseAPI = "",
  update = true,
}) {
  const state = useSelector(({ auth }) => auth)
  const [disabled, setDisabled] = useState(true)
  const [data, setData] = useState(Data)

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const updateData = async event => {
    try {
      if (!state.isLoggedin) {
        window.alert("Please Sign in to continue")
        return
      }

      const res = await axiosFetch.put(`${baseAPI}/${data._id}`, data)
      if (res.data) {
        window.alert("updated")

        setDisabled(true)
        setReload(!reload)
      }
    } catch (error) {
      console.log(error)
      console.log(error?.response?.data?.error)
    }
  }

  const deleteData = async event => {
    try {
      if (!state.isLoggedin) {
        window.alert("Please Sign in to continue")
        return
      }

      const res = await axiosFetch.delete(`${baseAPI}/${data._id}`)
      if (res.data) {
        window.alert("deleted")

        setReload(!reload)
      }
    } catch (error) {
      console.log(error)
      console.log(error?.response?.data?.error)
    }
  }

  const classes = useStyles()

  return (
    <TableRow>
      {tableTitles.map(field => {
        return (
          <TableCell className={classes.tableContent}>
            {" "}
            <TextField
              id="outlined-basic"
              disabled={disabled}
              value={data[field]}
              name={field}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />{" "}
          </TableCell>
        )
      })}

      {update && state.isLoggedin && (
        <TableCell>
          {disabled && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<UpdateIcon />}
              onClick={() => setDisabled(false)}
            >
              update
            </Button>
          )}
          {!disabled && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<UpdateIcon />}
              onClick={updateData}
            >
              update
            </Button>
          )}
        </TableCell>
      )}
      {update && state.isLoggedin && (
        <TableCell>
          <Button
            onClick={deleteData}
            value={data._id}
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
          >
            {" "}
            Delete{" "}
          </Button>{" "}
        </TableCell>
      )}
    </TableRow>
  )
}
