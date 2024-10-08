import React from "react"
import { makeStyles } from "@mui/styles"
import Dialog from "@mui/material/Dialog"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/CloseOutlined"
import ArrowIcon from "@mui/icons-material/ArrowRightAltOutlined"
import Box from "@mui/material/Box"
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemSecondaryAction,
} from "@mui/material"
import Typography from "@mui/material/Typography"
import DialogContent from "@mui/material/DialogContent"

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}))

const Profile = ({ open, onClose, name = "Paras Bansal" }) => {
  const classes = useStyles()
  return (
    <>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={onClose}
        aria-labelledby="profile dialog"
      >
        <DialogContent>
          <IconButton aria-label="close button" onClick={onClose}>
            <CloseIcon color="action" />
          </IconButton>
          <Box mb={4} display="flex" flexDirection="column" alignItems="center">
            <Avatar
              className={classes.avatar}
              src="https://dentalia.orionthemes.com/demo-1/wp-content/uploads/2016/10/dentalia-demo-deoctor-3-1-750x750.jpg"
            >
              {name[0]}
            </Avatar>

            <Typography variant="h4" color="primary">
              <b>{name}</b>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Member since {"July 2020"}
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListSubheader>
              <Typography variant="subtitle2" color="primary">
                My Bookings
              </Typography>
            </ListSubheader>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  src={"https://material-ui.com/static/images/avatar/1.jpg"}
                >
                  A
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<b>Anurag Singh</b>}
                secondary="25th Jan"
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="">
                  <ArrowIcon color="secondary" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Profile
