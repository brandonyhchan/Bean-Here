import { Avatar } from "@mui/material";
import wordmark from "../assets/images/wordmark.png";
import logo from "../assets/images/logo.png";

type LogoPropsType = {
  size: string;
  type?: string;
}

const Logo = ({ size, type } : LogoPropsType) => (
  <Avatar sx={{ width: size, height: size }} src={type === "logo" ? logo : wordmark } />
);

export default Logo;
