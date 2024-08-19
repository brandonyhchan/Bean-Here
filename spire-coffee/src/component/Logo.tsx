import { Avatar } from "@mui/material";
import word_mark from "../assets/images/favicon.png";
import logo from "../assets/images/logo.png";

type LogoPropsType = {
  size: string;
  type?: string;
}

const Logo = ({ size, type } : LogoPropsType) => (
  <Avatar sx={{ width: size, height: size }} src={type === "logo" ? logo : word_mark } />
);

export default Logo;
