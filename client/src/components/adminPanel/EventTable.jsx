import React, { useEffect, useState } from "react"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import axiosFetch from "../../utils/axiosFetch"
import { Container, Divider,  Typography } from "@mui/material"
import { useSelector } from "react-redux"

import TableData from "./TableData"
import NewData from "./NewData"
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
const EventTable = () => {
  const state = useSelector(({ auth }) => auth)
  const classes = useStyles()

  const [tutorials, setTutorials] = useState([])

  const [reload, setReload] = useState(true)

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await axiosFetch.get(`api/event`)

        if (res.data) {
          setTutorials(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    dataFetch()
  }, [reload])

  const fields = ["title", "link", "img"]
  return (
    <>
      <br />
      <br />
      <Typography variant="h1">Event table</Typography>
      <Divider />

      <Container maxWidth="lg">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {fields.map((field, index) => (
                  <TableCell
                    className={classes.tablehead}
                    key={`${index}eventfield`}
                  >
                    {field.toUpperCase()}
                  </TableCell>
                ))}

                {state.isLoggedin && (
                  <TableCell className={classes.tablehead}>
                    UPDATE/CREATE
                  </TableCell>
                )}
                {state.isLoggedin && (
                  <TableCell className={classes.tablehead}>DELETE</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {tutorials.map((event, index) => {
                return (
                  <TableData
                    key={`${index}eventtabledata`}
                    setReload={setReload}
                    reload={reload}
                    Data={event}
                    tableTitles={fields}
                    baseAPI="api/event"
                  />
                )
              })}
              {state.isLoggedin && state.admin && (
                <NewData
                  setReload={setReload}
                  reload={reload}
                  tableTitles={fields}
                  baseAPI="api/event"
                />
              )}
            </TableBody>
          </Table>
          <Grid2
            container
            alignContents="center"
            alignItems="center"
            justify="center"
          ></Grid2>
        </TableContainer>
      </Container>
    </>
  )
}

export default EventTable
