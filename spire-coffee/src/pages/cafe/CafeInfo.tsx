import ImageCarousel from "@/component/carousel/ImageCarousel";
import LoadingSpinner from "@/component/LoadingSpinner";
import strings from "@/config/strings";
import { useQuery } from "@apollo/client";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  renderBusyIcon,
  renderNoiseIcon,
  renderPrice
} from "../../component/icons/Icons";
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
                  <Card>
                    <CardContent
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Typography>{`${cafe?.street} ${cafe?.city}, ${cafe?.province}`}</Typography>
                      <Typography>{renderNoiseIcon(cafe?.noisiness)}</Typography>
                      <Typography>{renderBusyIcon(cafe?.busyness)}</Typography>
                      <Typography>{renderPrice(cafe?.price)}</Typography>
                    </CardContent>
                  </Card>
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
