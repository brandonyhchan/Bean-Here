import * as React from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { renderBusyIcon, renderNoiseIcon } from "./icons/Icons";
import { NonClickableIconButton } from "../styles/iconTheme";
import strings from "@/config/strings";

type CafeCardPropsType = {
  id: number;
  name: string;
  street: string;
  city: string;
  province: string;
  profilePhotoURL: string;
  busyness: string;
  noisiness: string;
};

const CafeCard = ({
  name,
  street,
  city,
  province,
  profilePhotoURL,
  busyness,
  noisiness,
}: CafeCardPropsType) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Card sx={{ display: "flex", width: { xs: '100%', sm: 377 }, height: 110 }}>
      <CardMedia
        component="img"
        sx={{
          width: {
            xs: 75,
            sm: 100
          }, height: "100%", objectFit: "contain", p: 0.5
        }}
        image={profilePhotoURL}
        alt={`${name} logo`}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 0, pl: 2, pr: 2, overflow: "hidden", textOverflow: "ellipsis" }}>
          <Typography
            noWrap
            variant="h6"
            sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {name}
          </Typography>
          <Typography
            variant={isSmallScreen ? "body1" : "body2"}
            sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {street}
          </Typography>
          <Typography
            variant={isSmallScreen ? "body1" : "body2"}
            sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {city}, {province}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ p: 0 }}>
          <Box display="flex" alignItems="center" sx={{ pl: 0.5 }}>
            <NonClickableIconButton>
              {renderBusyIcon(busyness)}
            </NonClickableIconButton>
            <Typography variant={isSmallScreen ? "body1" : "body2"}>{strings.cafe.busynessLabel}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <NonClickableIconButton>
              {renderNoiseIcon(noisiness)}
            </NonClickableIconButton>
            <Typography variant={isSmallScreen ? "body1" : "body2"}>{strings.cafe.noisinessLabel}</Typography>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CafeCard;
