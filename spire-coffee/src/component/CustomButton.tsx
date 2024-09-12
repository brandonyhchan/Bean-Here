import React, { MouseEventHandler } from "react";
import classNames from "classnames";
import styles from "./customButton.module.scss";
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
  type?:  // can use this if we want to be more specific with styles, can edit classes as needed
    | ""
    | "mediumWidth"
    | "largeWidth"
  className?: string;
  to?: string;
  isIconButton?: boolean;
  icon?: "delete" | "edit" | "check" | "favorite"; // can add more icons here
  href?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  color?: "primary" | "secondary" | "primaryOpposite" | "warning";
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
  variant = "contained",
  type = "",
  className,
  isIconButton = false,
  icon,
  size = "medium",
  disabled = false,
  loading = false,
  color = "primary",
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
            className={classNames(styles[type], className)}
            size={size}
            disabled={disabled}
            >
            <IconComponent />
          </IconButton>
        );
      }

      if (loading) { 
        return (
          <LoadingButton
            className={classNames(styles[type], className)}
            variant={variant}
            onClick={onClick}
            size={size}
            disabled={disabled}
            loading={loading}
            color={color as ButtonProps["color"]}
            {...rest}
          >
            {text}
          </LoadingButton>
        );
      }

  return (
    <Button
      className={classNames(styles[type], className)}
      variant={variant}
      onClick={onClick}
      size={size}
      disabled={disabled}
      color={color as ButtonProps["color"]}
      {...rest}
    >
      {text}
    </Button>
  )
};

export default CustomButton;
