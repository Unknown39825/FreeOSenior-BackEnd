import React from "react"
import HeaderStyles from "./header.module.css"
import { makeStyles } from "@mui/styles"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Hidden from "@mui/material/Hidden"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Logo from "./../../images/gatsby-icon.png"
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"
import Drawer from "./drawer"
import AuthModel from "../auth"
import { Grid2, useTheme } from "@mui/material"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Container, Grid } from "@mui/system"
import ThemeToggle from "../../styles/ThemeToggle"
const useStyles = makeStyles(theme => ({
  innerNav: props => ({
    margin: "0 auto",
    color: props.textDark,
  }),
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navItem: props => ({
    cursor: "pointer",
    fontSize: "1.1rem",
    alignSelf: "flex-end",
    padding: "5px 18px",
    color: props.text,
    textAlign: "center",
    backgroundColor: "none",
    transition: "0.35s",
    borderBottom: "4px solid transparent !important",
    paddingBottom: "16px !important",
    "&:hover": {
      backgroundColor: "transparent",
      transition: "0.35s",
      paddingBottom: "16px !important",
      borderBottom: `4px solid ${props.text} !important`,
    },
  }),
  activeNavItem: props => ({
    cursor: "default",
    padding: "5px 18px",
    color: props.text,
    textAlign: "center",
    borderBottom: `4.5px solid ${props.text} !important`,
    paddingBottom: "16px !important",
    "&:hover": {
      borderBottom: `4.5px solid ${props.text} !important`,
      paddingBottom: "16px !important",
      backgroundColor: "transparent",
    },
  }),
  logoText: props => ({
    marginLeft: 7,
    marginBottom: 3,
    color: props.text,
  }),
}))

const Navbar = () => {
  const state = useSelector(({ auth }) => auth)
  const theme = useTheme();
  const classes = useStyles(theme)
  const trigger = useScrollTrigger({
    threshold: 30,
    disableHysteresis: true,
  })
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  return (
    <div className={HeaderStyles.main}>
      <Drawer
        handler={setDrawerOpen}
        isOpen={drawerOpen}
        AuthModel={AuthModel}
      />
      <AppBar
        position="fixed"
        style={{
          height: 60,
          backgroundColor: theme.background,
          boxShadow: `${trigger} ? 5px 5px 10px #ffffff : "none"`,
        }}
        elevation={trigger ? 4 : 0}
      >
        <Container maxWidth="lg">
          <Toolbar style={{ minHeight: 60 }}>
            <div style={{ width: "100%" }}>
              <Grid
                container
                spacing={1}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                alignContent="center"
              >
                <Grid item>
                  <Hidden mdUp>
                    <IconButton
                      aria-label="openNav"
                      onClick={() => setDrawerOpen(true)}
                    >
                      <MenuIcon />
                      <Typography variant={"h6"} className={classes.logoText}>
                        FreeOSenior
                      </Typography>
                    </IconButton>
                  </Hidden>
                  <Link
                    to="/"
                    style={{
                      all: "unset",
                      cursor: "pointer",
                      color: "#FFF",
                    }}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      css={{
                        flexShrink: 0,
                        flexBasis: "calc(100% / 10)",
                      }}
                      className={classes.logoBox}
                    >
                      <Hidden smDown>
                        <img
                          src={Logo}
                          alt={"freeosenior logo"}
                          style={{
                            height: 35,
                            color: "#FFF",
                            margin: "0px 2px 0px 0px",
                          }}
                          className={classes.logo}
                        />
                        <Typography variant={"h6"} className={classes.logoText}>
                          FreeOSenior
                        </Typography>
                      </Hidden>
                    </Box>
                  </Link>
                </Grid>

                <Grid item>
                  <Hidden smDown>
                    <Link
                      className={classes.navItem}
                      activeClassName={classes.activeNavItem}
                      to="/"
                    >
                      <Typography variant={"subtitle"}>Home</Typography>
                    </Link>
                    <Link
                      className={classes.navItem}
                      activeClassName={classes.activeNavItem}
                      to="/tutorials"
                    >
                      <Typography variant={"subtitle"}>Tutorials</Typography>
                    </Link>
                    <Link
                      className={classes.navItem}
                      activeClassName={classes.activeNavItem}
                      to="/projectNotes"
                    >
                      <Typography variant={"subtitle"}>
                        Project/Notes
                      </Typography>
                    </Link>
                    <Link
                      className={classes.navItem}
                      activeClassName={classes.activeNavItem}
                      to="/askAQuery"
                    >
                      <Typography variant={"subtitle"}>Ask A Query</Typography>
                    </Link>

                    {state.isLoggedin && state.admin && (
                      <Link
                        className={classes.navItem}
                        activeClassName={classes.activeNavItem}
                        to="/adminPanel"
                      >
                        <Typography variant={"subtitle"}>Admin Panel</Typography>
                      </Link>
                    )}
                  </Hidden>
                </Grid>

                <Grid item>
                  <Hidden smDown>
                    <AuthModel />
                  </Hidden>
                </Grid>

                <Grid item>
                  <Hidden smDown>
                    <ThemeToggle />
                  </Hidden>
                </Grid>
              </Grid>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Navbar