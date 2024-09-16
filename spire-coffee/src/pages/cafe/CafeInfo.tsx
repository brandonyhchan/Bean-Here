import LoadingSpinner from "@/component/LoadingSpinner";
import strings from "@/config/strings";
import { useQuery } from "@apollo/client";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  renderPrice
} from "../../component/icons/Icons";
import { getCafeInfo } from "../../support/graphqlServerApi";
import { Cafe } from "../../types/cafe";

const CafeInfo = () => {
  const { cafeId } = useParams();

  const [cafe, setCafe] = useState<Cafe>();

  const { loading, error, refetch } = useQuery(getCafeInfo, {
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

  function nameFormat(name: string | undefined) {
    return name?.replaceAll(" ", "+").replaceAll("&", "and");
  }


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

              {/* <div>
                <ImageCarousel />
              </div> */}

              <Card>
                <CardContent
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography>{`${cafe?.street} ${cafe?.city}, ${cafe?.province}`}</Typography>
                  <Typography>{renderPrice(cafe?.price)}</Typography>
                </CardContent>
              </Card>

              <div>
                <div>
                  <div>
                    {/* <Label
                      text={`${cafe?.city}, ${cafe?.province} ${cafe?.postalCode}`}
                    /> */}
                    <div>
                      {/* <Label
                        icon={Icons.clock}
                        text={strings.cafe.businessHours}
                      /> */}
                      <div>
                        {/* {businessHours.map((hours, index) => (
                          <div
                            key={index}
                            className={classNames(
                              styles.businessHoursContainer
                            )}
                          >
                            <Label text={hours.weekday} />
                            <Label text={hours.hours} />
                          </div>
                        ))} */}
                      </div>
                    </div>
                    {/* <Label
                      icon={Icons.phone}
                      text={cafe?.phoneNumber}
                      secondaryText={strings.cafe.noPhoneNumber}
                    /> */}
                    {/* {renderWebsite()} */}
                  </div>
                  <div>
                    {/* <Label
                      icon={renderBusyIcon(cafe?.busyness)}
                      text={`${strings.cafe.busynessLabel}: ${renderBusyText(
                        cafe?.busyness
                      )}`}
                    /> */}
                    {/* <Label
                      icon={renderNoiseIcon(cafe?.noisiness)}
                      text={`${
                        strings.cafe.noisinessLabel
                      }: ${renderNoiseText(cafe?.noisiness)}`}
                    /> */}
                    {/* <Label
                      icon={renderPrice()}
                      text={`${strings.cafe.priceLabel}: ${renderPriceText(
                        cafe?.price
                      )}`}
                    /> */}
                  </div>
                </div>
              </div>
              <div>
                {/* <Report cafe={cafe} /> */}
              </div>
              <div>
                {
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    referrerPolicy="no-referrer-when-downgrade"
                    // src={mapURL}
                    allowFullScreen={true}
                  />
                }
              </div>
            </Box>
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

export default CafeInfo;
