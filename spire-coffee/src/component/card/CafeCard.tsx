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
    <Card sx={{ display: "flex", width: 377, height: 110 }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: "100%", objectFit: "contain", p: 0.5 }}
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
        <CardContent sx={{ p: 0, pl: 2 }}>
          <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '95%' }}>
            <Typography noWrap variant="h6">{name}</Typography>
          </div>
          <Typography variant="body2">{street}</Typography>
          <Typography variant="body2">
            {city}, {province}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ p: 0 }}>
          <Box display="flex" alignItems="center" sx={{ pl: 0.5 }}>
            <NonClickableIconButton>
              {renderBusyIcon(busyness)}
            </NonClickableIconButton>
            <Typography variant="body2">{strings.cafe.busynessLabel}</Typography>
          </Box>
          <Box display="flex" alignItems="center" ml={2}>
            <NonClickableIconButton>
              {renderNoiseIcon(noisiness)}
            </NonClickableIconButton>
            <Typography variant="body2">{strings.cafe.noisinessLabel}</Typography>
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CafeCard;
