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
import SearchBar from "../../component/SearchBar";
import LoadingSpinner from "@/component/LoadingSpinner";
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
      {error ? (
        <Container sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100% - 32px)"
        }}>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50%",
          }}>
            {loading ? <LoadingSpinner /> : (
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
          </Box>
        </Container>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%"
          }}
        >
          <FilterSidebar />
          <div style={{
            justifyContent: "center",
            flexDirection: "column",
            minWidth: "calc(100% - 300px)",
            paddingTop: "1rem",
            paddingBottom: "0.5rem",
          }}>
            <SearchBar query={searchCafeName} handleQuery={handleSearchQuery} />
            <Container
              sx={{
                maxWidth: isSmallScreen ? "320px" : "800px",
                height: "100%",
              }}
            >
              {(loading && cafes.length === 0) && (
                <Box sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50%",
                }}>
                  <LoadingSpinner />
                </Box>
              )}
              {cafes.length ? (
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
              ) : (
                <Typography variant="h3" textAlign={"center"}>{strings.error.noCafe}</Typography>
              )}
            </Container>
          </div>
        </div>)
      }
    </React.Fragment>
  );
};

export default Explore;
