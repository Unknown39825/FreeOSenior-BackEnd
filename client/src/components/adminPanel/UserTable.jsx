import React, { useEffect, useState } from "react"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import axiosFetch from "../../utils/axiosFetch"
import { Container, Divider,Typography } from "@mui/material"

import Grid from "@mui/material/Grid"

import TableData from "./TableData"
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
const UserTable = () => {
  const classes = useStyles()

  const [users, setUsers] = useState([])

  const [reload, setReload] = useState(true)

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await axiosFetch.get(`user/all`)

        if (res.data) {
          setUsers(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    dataFetch()
  }, [reload])

  const fields = ["firstname", "lastname", "isVerified", "admin", "email"]
  return (
    <>
      <br />
      <br />
      <Typography variant="h1">UserTable</Typography>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((event, index) => {
                return (
                  <TableData
                    update={false}
                    key={`${index}UserTable`}
                    setReload={setReload}
                    reload={reload}
                    Data={event}
                    tableTitles={fields}
                    baseAPI="api/homecard"
                  />
                )
              })}
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

export default UserTable
