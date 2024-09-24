import CafeInfoCard from "@/component/cafe/CafeInfoCard";
import ImageCarousel from "@/component/carousel/ImageCarousel";
import { default as LoadingSpinner } from "@/component/LoadingSpinner";
import { default as strings } from "@/config/strings";
import { useQuery } from "@apollo/client";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getCafeInfo } from "../../support/graphqlServerApi";
import { Cafe } from "../../types/cafe";

const CafeInfo = () => {
  const { cafeId } = useParams();

  const [cafe, setCafe] = useState<Cafe>();

  const { loading } = useQuery(getCafeInfo, {
    onError: (error) => {
      throw error;
    },
    onCompleted: (data) => {
      setCafe(data.getCafeInfo);
    },
    variables: {
      stringId: cafeId,
    },
  });

  return (
    <Container>
      {loading ? (
        <Box>
          <LoadingSpinner />
        </Box>
      ) : (
        <React.Fragment>
          {cafe === null ? (
            <span>{strings.error.noCafe}</span>
          ) : (
            <Box>
              <Typography variant="h1">{cafe?.name}</Typography>
              <Grid container spacing={2}>
                <Grid
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                >
                  <ImageCarousel />
                </Grid>
                <Grid>
                  <CafeInfoCard
                    street={cafe?.street}
                    city={cafe?.street}
                    province={cafe?.province}
                    postalCode={cafe?.postalCode}
                    phoneNumber={cafe?.phoneNumber}
                    website={cafe?.website}
                    noisiness={cafe?.noisiness}
                    busyness={cafe?.busyness}
                    price={cafe?.price}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

export default CafeInfo;
