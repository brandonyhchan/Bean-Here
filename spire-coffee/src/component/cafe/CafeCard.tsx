import strings from "@/config/strings";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  ClickableIconButton,
  NonClickableIconButton,
} from "../../styles/iconTheme";
import {
  renderBusyIcon,
  renderFavoriteIcon,
  renderNoiseIcon,
  renderPrice,
} from "../icons/Icons";

type CafeCardPropsType = {
  id: number;
  name: string;
  street: string;
  city: string;
  province: string;
  profilePhotoURL: string;
  busyness: string;
  noisiness: string;
  price: string;
};

const CafeCard = ({
  name,
  street,
  city,
  province,
  profilePhotoURL,
  busyness,
  noisiness,
  price,
}: CafeCardPropsType) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      sx={{ display: "flex", width: 377, height: 115, position: "relative" }}
    >
      <CardMedia
        component="img"
        sx={{
          width: {
            xs: 70,
            sm: 80,
          },
          height: "100%",
          objectFit: "contain",
          p: 0.5,
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
        <CardContent
          sx={{
            p: 0,
            ml: 2,
            mr: 2,
            pr: 2,
            pt: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography
            noWrap
            variant="h6"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant={isSmallScreen ? "body1" : "body2"}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {street}
          </Typography>
          <Typography
            variant={isSmallScreen ? "body1" : "body2"}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {city}, {province}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ p: 0 }}>
          <Box display="flex" alignItems="center" sx={{ pl: 0.5 }}>
            <NonClickableIconButton>
              {renderBusyIcon(busyness)}
            </NonClickableIconButton>
            <Typography variant={isSmallScreen ? "body1" : "body2"}>
              {strings.cafe.busynessLabel}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <NonClickableIconButton>
              {renderNoiseIcon(noisiness)}
            </NonClickableIconButton>
            <Typography variant={isSmallScreen ? "body1" : "body2"}>
              {strings.cafe.noisinessLabel}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <NonClickableIconButton>
              {renderPrice(price)}
            </NonClickableIconButton>
          </Box>
        </CardActions>
      </Box>
      <ClickableIconButton
        sx={{ position: "absolute", top: 0, right: 0 }}
        onClick={handleFavoriteClick}
      >
        {renderFavoriteIcon(isFavorite)}
      </ClickableIconButton>
    </Card>
  );
};

export default CafeCard;
