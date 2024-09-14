import React from "react";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const TutorialCard = (props) => {
  const theme = useTheme(); // Access the MUI theme

  const styles = {
    card: css`
      max-width: 550px;
      border-radius: 15px;
      box-shadow: 0px 20px 30px rgba(38, 57, 77, 0.5);
      background-color: ${theme.palette.background.paper}; /* Theme-based background */
      transition: 0.3s;
    `,
    title: css`
      color: ${theme.palette.primary.main}; /* Use primary color from the theme */
      font-weight: 500;
    `,
  };

  const embedlink = props.embedlink;

  return (
    <Card css={styles.card}>
      <CardActionArea>
        <CardMedia
          component="iframe"
          title={props.title}
          height={250}
          src={embedlink}
          allowFullScreen
        />
        <CardContent
          style={{
            color: theme.palette.text.primary, // Use theme-based text color
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Typography gutterBottom variant="h3" css={styles.title}>
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                color="textSecondary"
                component="p"
              >
                {props.category}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TutorialCard;
export { TutorialCard };
