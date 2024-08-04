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
import strings from "../../config/strings";

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

export function renderBusyIcon(option?: string, className?: string) {
  if (option === busyOptions[0] || option === "LOW") {
    return <HourglassEmptyRoundedIcon className={className} />;
  } else if (option === busyOptions[1] || option === "MEDIUM") {
    return <HourglassBottomRoundedIcon className={className} />;
  } else if (option === busyOptions[2] || option === "HIGH") {
    return <HourglassFullRoundedIcon className={className} />;
  } else {
    return undefined;
  }
}

export function renderNoiseIcon(option?: string) {
  if (option === noiseOptions[0] || option === "LOW") {
    return (
      <VolumeMuteRoundedIcon />
    );
  } else if (option === noiseOptions[1] || option === "MEDIUM") {
    return (
      <VolumeDownRoundedIcon />
    );
  } else if (option === noiseOptions[2] || option === "HIGH") {
    return <VolumeUpRoundedIcon />;
  } else {
    return undefined;
  }
}

export function renderPrice(option?: string) {
  if (option === "LOW") {
    return (
      <div>
        <AttachMoneyRoundedIcon />
      </div>
    );
  } else if (option === "MEDIUM") {
    return (
      <div>
        <AttachMoneyRoundedIcon />
        <AttachMoneyRoundedIcon />
      </div>
    );
  } else if (option === "HIGH") {
    return (
      <div>
        <AttachMoneyRoundedIcon />
        <AttachMoneyRoundedIcon />
        <AttachMoneyRoundedIcon />
      </div>
    );
  } else {
    return <AttachMoneyRoundedIcon />;
  }
}

// is there a way to make these less redundant?
export function renderBusyText(option?: string) {
  if (option === "LOW") {
    return strings.list.busyness1;
  } else if (option === "MEDIUM") {
    return strings.list.busyness2;
  } else if (option === "HIGH") {
    return strings.list.busyness3;
  } else {
    return undefined;
  }
}

export function renderNoiseText(option?: string) {
  if (option === "LOW") {
    return strings.list.noisiness1;
  } else if (option === "MEDIUM") {
    return strings.list.noisiness2;
  } else if (option === "HIGH") {
    return strings.list.noisiness3;
  } else {
    return undefined;
  }
}

export function renderPriceText(option?: string) {
  if (option === "LOW") {
    return strings.list.priceText1;
  } else if (option === "MEDIUM") {
    return strings.list.priceText2;
  } else if (option === "HIGH") {
    return strings.list.priceText3;
  } else {
    return undefined;
  }
}

export enum Icons {
  clock = "clock",
  phone = "phone",
  globe = "globe",
  redirect = "redirect",
}

export function renderCafeIcon(icon?: string) {
  switch (icon) {
    case Icons.clock:
      return <AccessTimeRoundedIcon />;
    case Icons.phone:
      return <LocalPhoneRoundedIcon />;
    case Icons.globe:
      return <LanguageRoundedIcon />;
    case Icons.redirect:
      return <LaunchRoundedIcon />;
    default:
      break;
  }
}
