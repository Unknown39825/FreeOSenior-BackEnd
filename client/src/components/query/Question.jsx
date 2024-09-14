import React, { useState } from "react"
import {
  Avatar,
  Grid,
  Paper,
  Button,
  Typography,
  Chip,
  IconButton,
  Collapse,
} from "@mui/material"
import Answer from "./Answer"
import PostAnswer from "./PostAnswer"
import { useSelector } from "react-redux"
import { makeStyles } from "@mui/styles"
import InputBase from "@mui/material/InputBase"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import axiosFetch from "../../utils/axiosFetch"
import DeleteIcon from "@mui/icons-material/Delete"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import UpdateIcon from "@mui/icons-material/Update"
const useStyles = makeStyles({
  root: {
    padding: "40px 20px",
    marginTop: 20,
    marginBottom: 40,
    borderRadius: "30px !important",
  },
  title: {
    fontFamily: "serif",
  },
  textfield: {
    margin: "20px auto",
    borderRadius: 30,
    // border: none,
  },
  button: {
    background: "linear-gradient(45deg, #af58f5 30%, #901af0  90%)",
    boxShadow: "0 3px 5px 2px rgba(181, 99, 247, .3)",
    color: "white",
    borderRadius: 3,
    height: 48,
    padding: "0 30px",
  },
  comment: {
    marginTop: 10,
    height: "auto",
    fontSize: "20px",
    fontWeight: 500,
  },
  chipResolve: {
    marginLeft: 10,
    color: "white",
    background: "linear-gradient(45deg, #4ff087 30%, #0cc74d  90%)",
  },
  chipUnResolve: {
    marginLeft: 10,
    color: "white",
    background: "linear-gradient(45deg, #f23f45 30%, #c70c28  90%)",
  },
})

const Question = ({
  data = {
    _id: "",
    author: {
      firstname: "demo",
      lastname: "demo",
    },
    title: "demo",
    desc: "demo",
    comments: [],
    tag: "",
  },
  setReload = f => f,
  reload,
}) => {
  const classes = useStyles()
  const [disabled, setDisabled] = useState(true)
  const [desc, setDesc] = useState(data.desc)

  const deleteQuestion = async event => {
    event.preventDefault()

    try {
      const res = await axiosFetch.delete(`api/query/${data._id}`)
      if (res.data) {
        window.alert("success deleted")
        setReload(!reload)
      }
    } catch (error) {
      console.log(error.response.data.erorr)
    }
  }

  const resolveQuestion = async event => {
    event.preventDefault()

    try {
      const res = await axiosFetch.get(`api/resolvequery/${data._id}`)
      if (res.data) {
        window.alert("resolved")
        setReload(!reload)
      }
    } catch (error) {
      console.log(error.response.data.erorr)
    }
  }

  const UpdateQuestion = async event => {
    event.preventDefault()

    try {
      const res = await axiosFetch.put(`api/query/${data._id}`, {
        desc,
      })
      if (res.data) {
        window.alert("success updated")
        setDisabled(true)
        setReload(!reload)
      }
    } catch (error) {
      console.log(error.response.data.erorr)
    }
  }

  const state = useSelector(({ auth }) => auth)

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Paper elevation="20" className={classes.root}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar>{data.author.firstname.slice(0, 1)}</Avatar>
        </Grid>

        <Grid justifyContent="left" item xs zeroMinWidth>
          <Typography variant="h4">
            {data.title}
            <Chip
              className={
                data.isResolved ? classes.chipResolve : classes.chipUnResolve
              }

              label={data.isResolved ? "Resolved" : "Not Resolved"}
            />
          </Typography>
          <Typography variant="h6">
            {data?.author?.firstname} {data?.author?.lastname}
          </Typography>
          <InputBase
            disabled={disabled}
            multiline={true}
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className={classes.comment}
            fullWidth
          />
          <Typography variant="h5" style={{ marginTop: 10 }}>
            Tags:{" "}
            {data.tag.split(",").map(t => (
              <Chip label={t} style={{ margin: "5px" }} />
            ))}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h6" style={{ marginTop: 10 }}>
        Comments: {data.comments.length}
      </Typography>
      <IconButton
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {data.comments
          .sort(function (a, b) {
            const votecnt1 =
              a.votes.filter(vote => vote.vote === true).length -
              a.votes.filter(vote => vote.vote === false).length

            const votecnt2 =
              b.votes.filter(vote => vote.vote === true).length -
              b.votes.filter(vote => vote.vote === false).length

            return votecnt2 - votecnt1
          })
          .map(d => (
            <Answer
              key={d._id}
              qid={data._id}
              data={d}
              reload={reload}
              setReload={setReload}
            />
          ))}
        <PostAnswer qid={data._id} reload={reload} setReload={setReload} />
      </Collapse>

      <Grid container spacing={3}>
        {state.isLoggedin && state.userId === data.author._id && (
          //alignSelf: "center"
          <Grid item style={{ margin: 10, justifyContent: "space-between" }}>
            {disabled && (
              <Button
                variant="contained"
                color="primary"
                //style={{ backgroundColor: "#e05358" }}
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
                //style={{ backgroundColor: "#e05358" }}
                startIcon={<UpdateIcon />}
                onClick={UpdateQuestion}
              >
                update
              </Button>
            )}
            {/* <Grid item xs={4}> */}
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DoneAllIcon />}
              onClick={resolveQuestion}
            >
              mark resolved
            </Button>
            {/* </Grid> */}
            {/* <Grid item xs={4}> */}
            <Button
              variant="contained"
              style={{ background: "#e05358" }}
              startIcon={<DeleteIcon />}
              onClick={deleteQuestion}
            >
              delete
            </Button>
            {/* </Grid> */}
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

export default Question
