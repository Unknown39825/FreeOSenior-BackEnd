import React, { useEffect, useState } from "react"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import axiosFetch from "../../utils/axiosFetch"
import { Container, Divider, makeStyles, Typography } from "@material-ui/core"
import { useSelector } from "react-redux"

import Grid from "@material-ui/core/Grid"

import TableData from "./TableData"
import NewData from "./NewData"

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
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
const HomeCardTable = () => {
  const state = useSelector(({ auth }) => auth)
  const classes = useStyles()

  const [tutorials, setTutorials] = useState([])

  const [reload, setReload] = useState(true)

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await axiosFetch.get(`api/homecard`)

        if (res.data) {
          setTutorials(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    dataFetch()
  }, [reload])

  const fields = ["imglink", "title", "seemore", "desc"]
  return (
    <>
      <br />
      <br />
      <Typography variant="h1">HomeCard</Typography>
      <Divider />

      <Container maxWidth="lg">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {fields.map(field => (
                  <TableCell className={classes.tablehead}>
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
                    key={`${index}homecardtable`}
                    setReload={setReload}
                    reload={reload}
                    Data={event}
                    tableTitles={fields}
                    baseAPI="api/homecard"
                  />
                )
              })}
              {state.isLoggedin && state.admin && (
                <NewData
                  setReload={setReload}
                  reload={reload}
                  tableTitles={fields}
                  baseAPI="api/homecard"
                />
              )}
            </TableBody>
          </Table>
          <Grid
            container
            alignContents="center"
            alignItems="center"
            justify="center"
          ></Grid>
        </TableContainer>
      </Container>
    </>
  )
}

export default HomeCardTable
