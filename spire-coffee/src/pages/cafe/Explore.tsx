import ExploreBar from "@/component/ExploreBar";
import FilterSidebar from "@/component/filter/FilterSidebar";
import LoadingSpinner from "@/component/LoadingSpinner";
import strings from "@/config/strings";
import { useGlobalStateManager } from "@/context/StateContext";
import { returnAllCafeQuery } from "@/support/graphqlServerApi";
import { Cafe } from "@/types/cafe";
import { useQuery } from "@apollo/client";
import { Box, Container, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import CafeList from "../../component/cafe/CafeList";

const Explore = () => {
  const {
    noiseFilter,
    busynessFilter,
    priceFilters,
    showFilterSidebar,
    setShowFilterSidebar,
    isSmallScreen,
    userLocation,
    setUserLocation,
    distanceFilterValue,
  } = useGlobalStateManager();

  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchCafeName, setSearchCafeName] = useState(
    searchParams.get("search") || ""
  );

  const [showCloseButton, setShowCloseButton] = useState<boolean>(false);
  const [showSearchAndFilterButton, setShowSearchAndFilterButton] =
    useState<boolean>(true);
  // add back refresh later
  const { loading, error } = useQuery(returnAllCafeQuery, {
    onError: (error) => {
      throw error;
    },

    onCompleted: (data) => {
      setCafes(data?.returnAllCafes?.cafes);
      setPageCount(data?.returnAllCafes?.pageCount);
    },
    // add back variables for filtering
    variables: {
      filterByName: searchCafeName,
      busynessFilter,
      noiseFilter,
      priceFilters,
      userLocation,
      distanceFilter: distanceFilterValue,
      page: currentPage,
    },
  });

  const handleCloseButton = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setSearchCafeName("");
    setSearchParams({});
    setShowCloseButton(false);
  };

  const handleFilterButton = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setShowFilterSidebar(!showFilterSidebar);
    setShowSearchAndFilterButton(!showSearchAndFilterButton);
  };

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCafeName(event.target.value);
    setSearchParams({ search: event.target.value });
    setShowCloseButton(true);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          console.error("Unable to retrieve your location");
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <React.Fragment>
      <Helmet title={strings.navbar.explore} />
      {error ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100% - 32px)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50%",
            }}
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
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
        <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
          {!isSmallScreen && (
            <FilterSidebar
              handleFilterButton={handleFilterButton}
              showFilterSidebar={showFilterSidebar}
              isSmallScreen={isSmallScreen}
            />
          )}
          <Container
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              paddingRight: { xs: "0", sm: "0", md: 2, lg: 2 },
              paddingLeft: { xs: "0", sm: "0", md: 2, lg: 2 },
              height: "100%",
            }}
          >
            {showFilterSidebar && isSmallScreen ? (
              <FilterSidebar
                handleFilterButton={handleFilterButton}
                showFilterSidebar={showFilterSidebar}
                isSmallScreen={isSmallScreen}
              />
            ) : (
              <Container
                disableGutters
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 2
                  }}
                >
                  <ExploreBar
                    searchCafeName={searchCafeName}
                    showCloseButton={showCloseButton}
                    handleSearchQuery={handleSearchQuery}
                    handleCloseButton={handleCloseButton}
                    handleFilterButton={handleFilterButton}
                    isSmallScreen={isSmallScreen}
                    showFilterSidebar={showFilterSidebar}
                  />
                  <CafeList
                    cafes={cafes}
                    isLoading={loading}
                    isSmallScreen={isSmallScreen}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
                    mb: 3
                  }}
                >
                  <Pagination
                    color="primary"
                    count={pageCount}
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </Box>
              </Container>
            )}
          </Container>
        </div>
      )}
    </React.Fragment>
  );
};

export default Explore;
