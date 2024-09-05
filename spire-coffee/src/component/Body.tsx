import Footer from "@/component/Footer";
import { useGlobalStateManager } from "@/context/StateContext"; // Import the hook
import { Box } from "@mui/material";

type BodyPropsType = {
  children: JSX.Element | null;
};

const Body = ({ children = null }: BodyPropsType) => {
  const { showFilterSidebar, isSmallScreen } = useGlobalStateManager(); // Access the state

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
      {(!showFilterSidebar || !isSmallScreen) && <Footer />}
    </Box>
  );
};

export default Body;
