import { Box } from "@mui/material";
import Footer from "@/component/Footer";

type BodyPropsType = {
  children: JSX.Element | null;
};

const Body = ({ children = null }: BodyPropsType) => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Box sx={{ flex: 1 }} paddingBottom={3}>
      {children}
    </Box>
    <Footer />
  </Box>
);

export default Body;
