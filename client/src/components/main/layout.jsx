import React, { useEffect } from "react"
import Header from "../navigation/header"
import Footer from "../navigation/footer"
import styles from "./layout.module.css"
import AOS from "aos"
import "aos/dist/aos.css"
import { StylesProvider } from "@mui/styles"

const Layout = props => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      offest: 50,
    })
  }, [])

  return (
    <StylesProvider injectFirst>
        <Header />
        <div className={styles.container}>{props.children}</div>
        <Footer />
    </StylesProvider>
  )
}

export default Layout
