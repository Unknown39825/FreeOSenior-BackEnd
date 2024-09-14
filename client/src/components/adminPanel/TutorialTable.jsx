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

import Grid from "@mui/material/Grid"

import TableData from "./TableData"
import NewData from "./NewData"
import { usePromiseTracker } from "react-promise-tracker"
import { trackPromise } from "react-promise-tracker"
import * as Loader from "react-loader-spinner"
import { makeStyles } from "@mui/styles"
const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader.ThreeDots color="#3c2bad" height={100} width={100} />
      </div>
    )
  );
};

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
const TurtorialTable = () => {
  const state = useSelector(({ auth }) => auth)
  const classes = useStyles()

  const [tutorials, setTutorials] = useState([])

  const [reload, setReload] = useState(true)

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await axiosFetch.get(`api/tutorial`)

        if (res.data) {
          setTutorials(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    trackPromise(dataFetch())
  }, [reload])

  const fields = ["title", "link", "category"]
  return (
    <>
      <br />
      <br />
      <Typography variant="h1">Tutorial Table</Typography>
      <Divider />
      <LoadingIndicator />
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
              {tutorials.map(event => {
                return (
                  <TableData
                    setReload={setReload}
                    reload={reload}
                    Data={event}
                    tableTitles={fields}
                    baseAPI="api/tutorial"
                  />
                )
              })}
              {state.isLoggedin && state.admin && (
                <NewData
                  setReload={setReload}
                  reload={reload}
                  tableTitles={fields}
                  baseAPI="api/tutorial"
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

export default TurtorialTable
