import React from "react"
import { css } from '@emotion/react'
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActionArea from "@mui/material/CardActionArea"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"

const useStyles = {
  root: css`
    margin: auto;
    border-radius: 16px; /* 16px */
    transition: 0.3s;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    position: relative;
    max-width: 500px;
    margin-left: auto;
    overflow: initial;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 16px;
    @media (min-width: 768px) {
      flex-direction: row;
      padding-top: 16px;
    }

  `,
  title: css`
    color: purple;
    font-weight: 500;
  `,
  card: css`
    max-width: 550px;
    border-radius: 15px;
    box-shadow: 0px 20px 30px rgba(38, 57, 77, 0.5);
  `,
}

const TutorialCard = props => {
  const styles = useStyles

  const embedlink = props.embedlink // Assuming embedlink is directly usable

  return (
    <Card css={styles.card}>
      <CardActionArea>
        <CardMedia
          component="iframe"
          title={props.title}
          height={250}
          image={embedlink}
          controls
        >
          <iframe
            src={embedlink}
            title={props.title}
            allowFullScreen
          ></iframe>
        </CardMedia>
        <CardContent style={{ color: "violet" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography
                gutterBottom
                variant="h3"
                css={styles.title}
                component="h2"
              >
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" color="textSecondary" component="p">
                {props.category}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TutorialCard;
export { TutorialCard}
