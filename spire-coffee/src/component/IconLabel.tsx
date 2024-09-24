import { Box, Link as MuiLink, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type IconLabelPropsType = {
  primaryIcon?: JSX.Element;
  secondaryIcon?: JSX.Element;
  text: string | undefined;
  secondaryText?: string;
  path?: string;
};

const IconLabel = ({
  primaryIcon,
  secondaryIcon,
  text,
  path,
}: IconLabelPropsType) => {
  return (
    <Typography variant="body1" sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ width: 50 }}>{primaryIcon}</Box>
      <Box>
        {path ? (
          <Box>
            <MuiLink
              component={Link}
              to={`${path}`}
              variant="body1"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1
              }}
            >
              {text}
              {secondaryIcon}
            </MuiLink>
          </Box>
        ) : (
          <Typography
            variant="body1"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            {text}
          </Typography>
        )}
      </Box>
    </Typography>
  );
};

export default IconLabel;
