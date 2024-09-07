import { CircularProgress, styled } from "@mui/material";

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const LoadingSpinner = () => {
  return <StyledCircularProgress size={80} thickness={4.1} />;
};

export default LoadingSpinner;
