import CafeCard from "@/component/cafe/CafeCard";
import LoadingSpinner from "@/component/LoadingSpinner";
import strings from "@/config/strings";
import { Cafe } from "@/types/cafe";
import {
  Box,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
  Pagination,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

type CafeListPropsType = {
  cafes: Cafe[];
  isLoading: boolean;
  isSmallScreen: boolean;
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const CafeList = ({
  cafes,
  isLoading,
  isSmallScreen,
  pageCount,
  currentPage,
  setCurrentPage,
}: CafeListPropsType) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  if (isLoading && cafes.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50%",
        }}
      >
        <LoadingSpinner />
      </Box>
    );
  }

  if (cafes.length === 0) {
    return (
      <Typography variant="h3" textAlign={"center"}>
        {strings.error.noCafe}
      </Typography>
    );
  }

  return (
    <Container
      disableGutters
      sx={{
        maxWidth: isSmallScreen ? "380px" : "800px",
        height: "100%",
        pr: { xs: "0", sm: "0", md: 4, lg: 4 },
        pb: 4,
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent={isSmallScreen ? "center" : "flex-start"}
        flexWrap="wrap"
      >
        {cafes.map((cafe: Cafe) => (
          <Grid
            item
            key={cafe.stringId}
            xs={10}
            sm={12}
            md={6}
            lg={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <MuiLink
              reloadDocument
              key={cafe.id}
              component={Link}
              to={`/cafes/${cafe.stringId}`}
              variant="body2"
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
            </MuiLink>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          color="primary"
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default CafeList;
