import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Grid,
  Container,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import CafeCard from "../../component/CafeCard";
import LoadingSpinner from "@/component/LoadingSpinner";
import { useQuery } from "@apollo/client";
import { returnAllCafeQuery } from "@/support/graphqlServerApi";
import { Cafe } from "@/types/cafe";
import strings from "@/config/strings";

const Explore = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [cafes, setCafes] = useState<Cafe[]>([]);
  // const [cafeCount, setCafeCount] = useState(0);

  // add back refresh later
  const { loading, error } = useQuery(returnAllCafeQuery, {
    onError: (error) => {
      throw error;
    },

    onCompleted: (data) => {
      setCafes(data?.returnAllCafes);
      // setCafeCount(data?.getCafeCount);
    },
    // add back variables for filtering
    variables: {},
  });

  return (
    <React.Fragment>
      <Helmet title={strings.navbar.explore} />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {loading && (
          <Box>
            <LoadingSpinner />
          </Box>
        )}
        {error && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            <Typography variant="h3">{strings.error.exploreGeneric}</Typography>
          </Box>
        )}
        {!!cafes.length && (
          <Container
            sx={{
              maxWidth: isSmallScreen ? "320px" : "800px",
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
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
      </Container>
    </React.Fragment>
  );
};

export default Explore;
