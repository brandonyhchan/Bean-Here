import IconLabel from "@/component/IconLabel";
import { businessHours } from "@/config/BusinessHoursDummyData";
import { Level } from "@/config/FilterItems";
import strings from "@/config/strings";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import { Box, Card, CardContent, Typography } from "@mui/material";

import {
  renderBusyIcon,
  renderNoiseIcon,
  renderPrice,
} from "../../component/icons/Icons";

type CafeInfoCardTypeProps = {
  street?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  phoneNumber?: string;
  website?: string;
  noisiness?: string;
  busyness?: string;
  price?: string;
};

const CafeInfoCard = ({
  street,
  city,
  province,
  postalCode,
  phoneNumber,
  website,
  noisiness,
  busyness,
  price,
}: CafeInfoCardTypeProps) => {
  function renderText(text?: string) {
    if (text === Level.LOW) {
      return "Low";
    } else if (text === Level.MEDIUM) {
      return "Moderate";
    } else {
      ("High");
    }
  }

  return (
    <Card>
      <CardContent
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {/* cafe address */}
        <Box sx={{ pb: 2 }}>
          <Typography variant="body1">{`${street}`}</Typography>
          <Typography variant="body1">{`${city}, ${province} ${postalCode}`}</Typography>
        </Box>

        <Box sx={{ pb: 2 }}>
          <IconLabel
            primaryIcon={<AccessTimeRoundedIcon />}
            text="Business Hours"
          />
          {businessHours.map((hours, index) => (
            <IconLabel
              key={index}
              text={`${hours.weekday}: ${hours.start} - ${hours.end}`}
            />
          ))}
        </Box>

        {/* cafe phone number */}
        {phoneNumber ? (
          <IconLabel
            primaryIcon={<LocalPhoneRoundedIcon />}
            text={phoneNumber}
          />
        ) : (
          <IconLabel
            primaryIcon={<LocalPhoneRoundedIcon />}
            text={strings.cafe.noPhoneNumber}
          />
        )}

        {/* cafe website */}
        {website ? (
          <IconLabel
            primaryIcon={<LanguageRoundedIcon />}
            path={website}
            text={website}
            secondaryIcon={<LaunchRoundedIcon />}
          />
        ) : (
          <IconLabel
            primaryIcon={<LanguageRoundedIcon />}
            text={strings.cafe.noWebsite}
          />
        )}

        <IconLabel
          primaryIcon={renderNoiseIcon(noisiness)}
          text={`Noise: ${renderText(noisiness)}`}
        />
        <IconLabel
          primaryIcon={renderBusyIcon(busyness)}
          text={`Capacity: ${renderText(busyness)}`}
        />
        <IconLabel
          primaryIcon={renderPrice(price)}
          text={`Price: ${renderText(price)}`}
        />
      </CardContent>
    </Card>
  );
};

export default CafeInfoCard;
