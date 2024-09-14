import React from "react"
import Layout from "../components/main/layout"

import Grid from '@mui/material/Grid';

import Frame1 from "../components/all/landing/Frame1"
import Frame2 from "../components/all/landing/Frame2"
import Frame3 from "../components/all/landing/Frame3"
import Frame4 from "../components/all/landing/Frame4"
import Frame5 from "../components/all/landing/Frame5"
import Frame6 from "../components/all/landing/Frame6"

export default function Home() {
  return (
    <Layout>
        <Frame1  />
        <Frame2  />
        <Frame3  />
        <Frame4  />
        <Grid container style={{ margin: "30px auto" }}>
          <Grid item md={8}>
            <Frame5 />
          </Grid>
          <Grid item md={4}>
            <Frame6 />
          </Grid>
        </Grid>
    </Layout>
  )
}
