import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

const NonClickableIconButton = styled(IconButton)({
  color: "#000000DE",
  pointerEvents: "none", // Disable click events
  '&:hover': {
    color: "#000000DE", // No color change on hover
  },
});

const ClickableIconButton = styled(IconButton)({
  color: "#4c698b",
  '&:hover': {
    color: "#8b7972",
  },
});

export { NonClickableIconButton, ClickableIconButton };
