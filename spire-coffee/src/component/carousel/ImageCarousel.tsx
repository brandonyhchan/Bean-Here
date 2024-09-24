import { Box } from "@mui/material";
import classNames from "classnames";
import Carousel from "react-material-ui-carousel";
import Placeholder from "../../assets/images/placeholder.jpg";
import Placeholder2 from "../../assets/images/placeholder2.jpg";
import styles from "./ImageCarousel.module.scss";

const ImageCarousel = () => {
  const items = [
    {
      imagePath: Placeholder,
    },
    {
      imagePath: Placeholder2,
    },
  ];
  return (
    <Box sx={{ mb: 1.5 }}>
      <Carousel
        autoPlay={false}
        animation={"slide"}
        duration={800}
        navButtonsAlwaysVisible
        navButtonsProps={{
          style: {
            backgroundColor: "#f5f5f700",
            color: "white",
            borderRadius: 0,
          },
        }}
      >
        {items.map((item, index) => (
          <Box key={index} className={classNames(styles.carouselWrapper)}>
            <img src={item.imagePath} alt={item.imagePath} />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;
