import React, { useState } from "react"
import logo from "../../images/gatsby-icon.png"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import Forget from "./Forget"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Portal from "@mui/material/Portal"
import Snackbar from "@mui/material/Snackbar"
import SnackbarContent from "@mui/material/SnackbarContent"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"

export default function AuthModal({ index, setIndex, open, setOpen }) {
  const [snackbar, setSnackbar] = useState(false)
  const [snackColor, setSnackColor] = useState(false)
  const [snackbarmsg, setSnackbarmsg] = useState("")
  const [transition, setTransition] = useState(undefined)
  const closeDialog = () => {
    setOpen(false)
  }

  let snackOptions = {
    setSnackbar,
    setSnackColor,
    setSnackbarmsg,
    setTransition,
  }
  const snackbarClose = () => {
    setSnackbar(false)
  }

  return (
    <>
      <Portal>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={snackbar}
          onClose={snackbarClose}
          TransitionComponent={transition}
          key={Date.now()}
        >
          <SnackbarContent
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={snackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>,
            ]}
            style={{
              backgroundColor: `${snackColor}`,
            }}
            message={<span id="client-snackbar">{snackbarmsg}</span>}
          />
        </Snackbar>
      </Portal>
      <Dialog
        open={open}
        onClose={closeDialog}
        maxWidth="xs"
        fullWidth
        aria-labelledby=""
      >
        <div
          style={{
            backgroundImage: `url(https://api.freeosenior.in/static/img/bg3.jpeg)`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Box style={{ float: "right", position: "fixed" }}>
            <IconButton style={{}} onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" htmlColor="#fff" />
            </IconButton>
          </Box>
          <Box display="flex" pt={3} justifyContent="center">
            <img src={logo} alt="logo" style={{ width: 30, height: 30 }} />
            <Typography
              style={{ color: "#fff", fontSize: 20, fontWeight: 500 }}
            >
              <a
                href="/"
                style={{
                  textDecoration: "inherit",
                  color: "black",
                  marginLeft: 5,
                }}
              >
                FreeOSenior
              </a>
            </Typography>
          </Box>
        </div>
        <DialogContent>
          <Tabs
            centered
            value={index}
            indicatorColor="primary"
            textColor="primary"
            onChange={(_, i) => {
              setIndex(i)
            }}
            aria-label="auth-form"
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
          {(() => {
            switch (index) {
              case 0:
                return (
                  <SignIn
                    forgetPassword={() => setIndex(2)}
                    {...snackOptions}
                  />
                )
              case 1:
                return (
                  <SignUp goToSignIN={() => setIndex(0)} {...snackOptions} />
                )
              case 2:
                return <Forget {...snackOptions} />
              default:
                return undefined
            }
          })()}
        </DialogContent>
      </Dialog>
    </>
  )
}
