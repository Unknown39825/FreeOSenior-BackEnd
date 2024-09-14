import React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const TutorialCard = (props) => {
  const theme = useTheme(); // Access the MUI theme

  return (
    <Card
      sx={{
        maxWidth: 550,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: theme.palette.background.paper,
        transition: '0.3s',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="iframe"
          title={props.title}
          height={250}
          src={props.embedlink}
          allowFullScreen
        />
        <CardContent
          sx={{
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
              <Typography
                gutterBottom
                variant="h3"
                sx={{
                  color: theme.palette.primary.main, // Use primary color from the theme
                  fontWeight: 500,
                }}
              >
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
