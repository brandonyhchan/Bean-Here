import * as React from "react";
import { Grid, Container, useMediaQuery, useTheme } from "@mui/material";
import cafeData from "../component/data/cafes.json";
import CafeCard from "@/component/card/CafeCard";
import "../index.scss";

const Explore = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>
        Hello world, this is the Explore page
      </h1>
      <Container
        fixed
        sx={{
          paddingLeft: isSmallScreen ? 10 : 0,
          paddingRight: isSmallScreen ? 10 : 0,
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent={isSmallScreen ? "center" : "space-between"}
          flexWrap="wrap"
        >
          {cafeData.map((cafe) => (
            <Grid
              item
              key={cafe.stringId}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <CafeCard
                id={parseInt(cafe.stringId)}
                name={cafe.name}
                street={cafe.street}
                city={cafe.city}
                province={cafe.province}
                profilePhotoURL={cafe.profilePhotoURL}
                busyness={cafe.busyness}
                noisiness={cafe.noisiness}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Explore;
