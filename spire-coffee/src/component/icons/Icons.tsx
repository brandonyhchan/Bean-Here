import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import HourglassFullRoundedIcon from "@mui/icons-material/HourglassFullRounded";
import VolumeMuteRoundedIcon from "@mui/icons-material/VolumeMuteRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import strings from "../../config/strings";
import { SvgIconProps } from "@mui/material/SvgIcon";

const iconFontSize: SvgIconProps['fontSize'] = 'small';

const renderIcon = (IconComponent: React.ElementType, additionalProps: SvgIconProps = {}): JSX.Element => (
  <IconComponent fontSize={iconFontSize} {...additionalProps} />
);

export const busyOptions = [
  strings.list.busyness1,
  strings.list.busyness2,
  strings.list.busyness3,
];

export const noiseOptions = [
  strings.list.noisiness1,
  strings.list.noisiness2,
  strings.list.noisiness3,
];

export function renderBusyIcon(option?: string): JSX.Element | undefined {
  if (option === busyOptions[0] || option === "LOW") {
    return renderIcon(HourglassEmptyRoundedIcon);
  } else if (option === busyOptions[1] || option === "MEDIUM") {
    return renderIcon(HourglassBottomRoundedIcon);
  } else if (option === busyOptions[2] || option === "HIGH") {
    return renderIcon(HourglassFullRoundedIcon);
  } else {
    return undefined;
  }
}

export function renderNoiseIcon(option?: string): JSX.Element | undefined {
  if (option === noiseOptions[0] || option === "LOW") {
    return renderIcon(VolumeMuteRoundedIcon);
  } else if (option === noiseOptions[1] || option === "MEDIUM") {
    return renderIcon(VolumeDownRoundedIcon);
  } else if (option === noiseOptions[2] || option === "HIGH") {
    return renderIcon(VolumeUpRoundedIcon);
  } else {
    return undefined;
  }
}

export function renderPrice(option?: string): JSX.Element {
  if (option === "LOW") {
    return renderIcon(AttachMoneyRoundedIcon);
  } else if (option === "MEDIUM") {
    return (
      <>
        {renderIcon(AttachMoneyRoundedIcon)}
        {renderIcon(AttachMoneyRoundedIcon, { sx: { ml: -1.3 } })}
      </>
    );
  } else if (option === "HIGH") {
    return (
      <>
        {renderIcon(AttachMoneyRoundedIcon)}
        {renderIcon(AttachMoneyRoundedIcon, { sx: { ml: -1.3 } })}
        {renderIcon(AttachMoneyRoundedIcon, { sx: { ml: -1.3 } })}
      </>
    );
  } else {
    return renderIcon(AttachMoneyRoundedIcon);
  }
}

const renderText = (option: string | undefined, textOptions: string[]): string | undefined => {
  switch (option) {
    case "LOW":
      return textOptions[0];
    case "MEDIUM":
      return textOptions[1];
    case "HIGH":
      return textOptions[2];
    default:
      return undefined;
  }
}

export function renderBusyText(option?: string): string | undefined {
  return renderText(option, [strings.list.busyness1, strings.list.busyness2, strings.list.busyness3]);
}

export function renderNoiseText(option?: string): string | undefined {
  return renderText(option, [strings.list.noisiness1, strings.list.noisiness2, strings.list.noisiness3]);
}

export function renderPriceText(option?: string): string | undefined {
  return renderText(option, [strings.list.priceText1, strings.list.priceText2, strings.list.priceText3]);
}

export enum Icons {
  clock = "clock",
  phone = "phone",
  globe = "globe",
  redirect = "redirect",
}

export function renderCafeIcon(icon?: string): JSX.Element | undefined {
  switch (icon) {
    case Icons.clock:
      return renderIcon(AccessTimeRoundedIcon);
    case Icons.phone:
      return renderIcon(LocalPhoneRoundedIcon);
    case Icons.globe:
      return renderIcon(LanguageRoundedIcon);
    case Icons.redirect:
      return renderIcon(LaunchRoundedIcon);
    default:
      return undefined;
  }
}

export function renderFavoriteIcon(isFavorite?: boolean): JSX.Element {
  return renderIcon(isFavorite ? FavoriteRoundedIcon : FavoriteBorderRoundedIcon);
}
