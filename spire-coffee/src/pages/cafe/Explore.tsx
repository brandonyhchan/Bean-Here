import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
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
import SearchBar from "../../component/SearchBar";
import { useQuery } from "@apollo/client";
import { returnAllCafeQuery } from "@/support/graphqlServerApi";
import { Cafe } from "@/types/cafe";
import FilterSidebar from "@/component/FilterSidebar";
import strings from "@/config/strings";

const Explore = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const [cafes, setCafes] = useState<Cafe[]>([]);
  // const [cafeCount, setCafeCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchCafeName, setSearchCafeName] = useState(
    searchParams.get("search") || ""
  );

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
    variables: {
      filterByName: searchCafeName,
    },
  });

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCafeName(event.target.value);
    setSearchParams({ search: event.target.value });
  };

  return (
    <React.Fragment>
      <Helmet title={strings.navbar.explore} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingLeft: "0",
          paddingRight: "0",
        }}
      >
        <FilterSidebar />
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {loading && (
            <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
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
              <Typography variant="h3">
                {strings.error.exploreGeneric}
              </Typography>
            </Box>
          )}
          <SearchBar query={searchCafeName} handleQuery={handleSearchQuery} />
          {cafes.length ? (
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
                justifyContent={
                  isSmallScreen || (isLargeScreen && cafes.length == 2)
                    ? "center"
                    : "flex-start"
                }
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
          ) : (
            <p>{strings.error.noCafe}</p>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Explore;
