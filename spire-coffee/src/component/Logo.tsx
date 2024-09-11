import { Avatar } from "@mui/material";
import brandLogo from "../assets/images/brand-logo.png";
import logo from "../assets/images/sc-logo.png";

type LogoPropsType = {
  size?: string;
  type?: string;
}

const Logo = ({ size, type }: LogoPropsType) => (
  <Avatar
    sx={{
      width: size ? size : "300px",
      height: size ? size : "300px",
      borderRadius: "0%",
      objectFit: "contain"
    }}
    src={type === "logo" ? brandLogo : logo}
  />
);

export default Logo;
