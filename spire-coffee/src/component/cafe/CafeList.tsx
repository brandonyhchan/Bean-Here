// CafeList.tsx
import CafeCard from "@/component/cafe/CafeCard";
import LoadingSpinner from "@/component/LoadingSpinner";
import strings from "@/config/strings";
import { Cafe } from "@/types/cafe";
import { Box, Container, Grid, Typography } from "@mui/material";

type CafeListPropsType = {
  cafes: Cafe[];
  isLoading: boolean;
  isSmallScreen: boolean;
  isLargeScreen: boolean;
};

const CafeList = ({
  cafes,
  isLoading,
  isSmallScreen,
  isLargeScreen,
}: CafeListPropsType) => {
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
      sx={{
        maxWidth: isSmallScreen ? "320px" : "800px",
        height: "100%",
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
  );
};

export default CafeList;
