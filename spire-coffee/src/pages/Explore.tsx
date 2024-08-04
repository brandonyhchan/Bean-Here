import * as React from "react";
import { Grid } from "@mui/material";
import cafeData from "../component/data/cafes.json";
import CafeCard from "@/component/card/CafeCard";

const Explore = () => {
  return (
    <React.Fragment>
      <h1>Hello world, this is the Explore page</h1>
      <Grid container spacing={3}>
        {cafeData.map((cafe) => (
          <Grid
            item
            key={cafe.stringId}
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
    </React.Fragment>
  );
};

export default Explore;
