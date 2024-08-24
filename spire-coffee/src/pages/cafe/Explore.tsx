import ExploreBar from "@/component/ExploreBar";
import FilterSidebar from "@/component/filter/FilterSidebar";
import LoadingSpinner from "@/component/LoadingSpinner";
import strings from "@/config/strings";
import { ClickableIconButton } from "@/styles/iconTheme";
import { returnAllCafeQuery } from "@/support/graphqlServerApi";
import { Cafe } from "@/types/cafe";
import { useQuery } from "@apollo/client";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import CafeList from "../../component/cafe/CafeList";

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
  const [showCloseButton, setShowCloseButton] = useState<boolean>(false);
  const [showFilterSidebar, setShowFilterSidebar] = useState<boolean>(false);
  const [showSearchAndFilterButton, setShowSearchAndFilterButton] =
    useState<boolean>(true);
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
          {!isSmallScreen && <FilterSidebar />}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: isLargeScreen ? "calc(100% - 300px)" : "100%",
              paddingTop: "1rem",
              paddingBottom: "0.5rem",
              height: "100%",
            }}
          >
            {showFilterSidebar && isSmallScreen ? (
              <div>
                <ClickableIconButton onClick={handleFilterButton}>
                  <CloseRoundedIcon />
                </ClickableIconButton>
                <FilterSidebar />
              </div>
            ) : (
              <>
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
                  isLargeScreen={isLargeScreen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Explore;
