import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import { IconButton, Button, ButtonProps } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import FavouriteIcon from "@mui/icons-material/Favorite";
import LoadingButton from '@mui/lab/LoadingButton';

type ButtonPropsType = {
  onClick?: MouseEventHandler;
  text?: string;
  variant?: "text" | "outlined" | "contained";
  style?: React.CSSProperties;
  className?: string;
  to?: string;
  isIconButton?: boolean;
  icon?: "delete" | "edit" | "check" | "favorite"; // can add more icons here
  href?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  color?: "primary" | "secondary" | "primaryOpposite" | "warning";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
};

const iconMap = {
    delete: DeleteIcon,
    edit: EditIcon,
    check: CheckIcon,
    favorite: FavouriteIcon,
  };

const CustomButton = ({
  onClick,
  text,
  variant = "text",
  style,
  className,
  isIconButton = false,
  icon,
  size = "medium",
  disabled = false,
  loading = false,
  color = "primary",
  fullWidth = false,
  type = "button",
  ...rest
}: ButtonPropsType) => {
    if (isIconButton && icon) {
        const IconComponent = iconMap[icon]; // Get the icon component from the map

        if (!IconComponent) {
            console.error(`Icon "${icon}" is not available. Please import the icon 
                and add it to the props and to the map.`);
            return null;
        }

        return (
          <IconButton
            onClick={onClick}
            className={classNames(className)}
            size={size}
            disabled={disabled}
            style={style}
            >
            <IconComponent />
          </IconButton>
        );
      }

      if (loading) { 
        return (
          <LoadingButton
            className={classNames(className)}
            variant={variant}
            onClick={onClick}
            size={size}
            disabled={disabled}
            loading={loading}
            color={color as ButtonProps["color"]}
            style={style}
            fullWidth={fullWidth}
            {...rest}
          >
            {text}
          </LoadingButton>
        );
      }

  return (
    <Button
      className={classNames(className)}
      variant={variant}
      onClick={onClick}
      size={size}
      disabled={disabled}
      color={color as ButtonProps["color"]}
      style={style}
      fullWidth={fullWidth}
      type={type}
      {...rest}
    >
      {text}
    </Button>
  )
};

export default CustomButton;
