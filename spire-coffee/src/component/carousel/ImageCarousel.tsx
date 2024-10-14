import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Placeholder from "../../assets/images/placeholder.jpg";
import Placeholder2 from "../../assets/images/placeholder2.jpg";

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
    <Box>
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
        indicatorContainerProps={{
          style: {
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "white",
          },
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              width: "100%",
              height: {
                xs: "275px",
                sm: "550px",
                md: "600px",
                lg: "445px",
              },
              position: "relative", 
              overflow: "hidden",
            }}
          >
            <img
              src={item.imagePath}
              alt={item.imagePath}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;
