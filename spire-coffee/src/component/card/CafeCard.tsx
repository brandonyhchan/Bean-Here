import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import { renderBusyIcon, renderNoiseIcon } from "../icons/Icons";
import { NonClickableIconButton } from "../../styles/iconTheme";
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
  return (
    <Card sx={{ display: "flex", width: 500, height: 140 }}>
      <CardMedia
        component="img"
        sx={{ width: 125, height: "100%", objectFit: "contain", pl: 1 }}
        image={profilePhotoURL}
        alt={`${name} logo`}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1
        }}
      >
        <CardContent>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body1">{street}</Typography>
          <Typography>
            {city}, {province}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ mt: -3 }}>
          <Box display="flex" alignItems="center" sx={{ ml: -1 }}>
            <NonClickableIconButton>
              {renderBusyIcon(busyness)}
            </NonClickableIconButton>
            <Typography>{strings.cafe.busynessLabel}</Typography>
          </Box>
          <Box display="flex" alignItems="center" ml={2}>
            <NonClickableIconButton>
              {renderNoiseIcon(noisiness)}
            </NonClickableIconButton>
            <Typography>{strings.cafe.noisinessLabel}</Typography>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CafeCard;
