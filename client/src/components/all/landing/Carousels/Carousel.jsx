import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { settings } from "./HomeCarouselSettings";
import HomeCard from "./HomeCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import { makeStyles, useTheme } from "@mui/styles";
import axiosFetch from "../../../../utils/axiosFetch";

const useStyles = makeStyles(() => ({
  slickSlider: {
    "& .slick-list": {
      paddingBottom: "30px",
    },
    "& .slick-dots li button::before": {
      fontSize: "12px",
    },
  },
}));

const CarouselCards = (props) => {
  const theme = useTheme();
  const [data, getData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosFetch.get("api/homecard");

        if (res.data) {
          getData(res.data);
        }
      } catch (error) {
        console.log(error);
        console.log(error?.response?.data?.error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ width: "80vw", position: "relative" }}>
      <Box className={classes.slickSlider}>
        <Slider {...settings}>
          {data.map((dataValue) => (
            <HomeCard
              data-aos="fade-down"
              key={dataValue._id}
              thumbnail={dataValue.imglink}
              title={dataValue.title}
              content={dataValue.desc}
              theme={theme}
              seemore={dataValue.seemore}
            />
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default CarouselCards;
