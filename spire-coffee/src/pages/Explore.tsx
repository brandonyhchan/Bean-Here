import * as React from "react";
import { Grid, Container } from "@mui/material";
import cafeData from "../component/data/cafes.json";
import CafeCard from "@/component/card/CafeCard";
import "../index.scss";

const Explore = () => {
  return (
    <React.Fragment>
      <h1 style={{ textAlign: "center" }}>
        Hello world, this is the Explore page
      </h1>
      <Container maxWidth={false}>
        <Grid
          container
          spacing={2}
        >
          {cafeData.map((cafe) => (
            <Grid item key={cafe.stringId}>
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
