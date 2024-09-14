import React, { useEffect, useState } from "react"
import Layout from "../components/main/layout"
import Hidden from "@mui/material/Hidden"
import { TutorialCard } from "../components/all/TutorialCard"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { Divider } from "@mui/material"
import Container from "@mui/material/Container"
import axiosFetch from "../utils/axiosFetch"
import { usePromiseTracker } from "react-promise-tracker"
import { trackPromise } from "react-promise-tracker"
import * as Loader from "react-loader-spinner"
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

export default function Tutorials() {
  const [tutorials, settutorials] = useState([])

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axiosFetch.get("api/tutorial")

        if (res.data) {
          settutorials(res.data)
        }
      } catch (error) {
        console.log(error)
        console.log(error)
        console.log(error?.response?.data?.error)
      }
    }

    trackPromise(fetchdata())
  }, [])

  return (
    <Layout>
      <Hidden>
        <br />
        <Typography variant="h1" component="h2" gutterBottom>
          Tutorials
        </Typography>
        <br />
        <Divider />
        <br />
        <Container maxWidth="fixed">
          <div style={{ marginBottom: 30 }}>
            <Grid container spacing={5} alignItems="center" justify="center">
              <LoadingIndicator />
              {tutorials.map(tutorial => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={`${tutorial._id}test`}
                  data-aos="flip-left"
                >
                  <TutorialCard
                    key={tutorial._id}
                    title={tutorial.title}
                    category={tutorial.category}
                    embedlink={tutorial.link}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </Hidden>
      {/* <KommunicateChat /> */}
    </Layout>
  )
}
