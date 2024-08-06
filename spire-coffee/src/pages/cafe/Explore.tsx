import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Grid, Container, useMediaQuery, useTheme, Box } from "@mui/material";
import CafeCard from "../../component/CafeCard";
import { useQuery } from "@apollo/client";
import { returnAllCafeQuery } from "@/support/graphqlServerApi";
import { Cafe } from "@/types/cafe";
import FilterSidebar from "@/component/FilterSidebar";
import strings from "@/config/strings";

const Explore = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [cafeCount, setCafeCount] = useState(0);

  // add back refresh later
  const { loading, error } = useQuery(returnAllCafeQuery, {
    onError: (error) => {
      throw error;
    },

    onCompleted: (data) => {
      console.log(data);
      setCafes(data?.returnAllCafes);
      setCafeCount(data?.getCafeCount);
    },
    // add back variables for filtering
    variables: {},
  });

  return (
    <React.Fragment>
      <Helmet title={strings.navbar.explore} />
      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div>
          <p> There was an error.</p>
        </div>
      )}
      <Box sx={{ display: "flex", height: "100%", borderRadius: 0 }}>
        <Box sx={{ flex: "0 0 250px", borderRight: "1px solid #ddd" }}>
          <FilterSidebar />
        </Box>
        <Box sx={{ flex: "1", overflowY: "auto" }}>
          {cafes.length > 0 && (
            <Container
              sx={{
                maxWidth: isSmallScreen ? "320px" : "800px",
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <p>{`Cafe count: ${cafeCount}`}</p>
              <Grid
                container
                spacing={2}
                justifyContent={isSmallScreen ? "center" : "space-between"}
                flexWrap="wrap"
              >
                {cafes.map((cafe) => (
                  <Grid
                    item
                    key={cafe.stringId}
                    xs={10}
                    sm={12}
                    md={6}
                    lg={4}
                    style={{ display: "flex", justifyContent: "center" }}
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
                      price={cafe.price}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Explore;
