export enum Level {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum LevelLabel {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export enum SortLabel {
  ALPHABETICAL = "Alphabetical",
  NOISE = "Noise",
  CAPACITY = "Capacity",
}

export enum Price {
  LOW = "$",
  MEDIUM = "$$",
  HIGH = "$$$",
}

export enum RadioAttribute {
  NOISE = "noise",
  CAPACITY = "capacity",
  SORT = "sort"
}

export enum SortOption {
  ALPHABETICAL = "Alphabetical",
  NOISE = "Noise",
  CAPACITY = "Capacity",
}

export const marks = [
  {
    value: 0,
    label: "0 km",
  },
  {
    value: 10,
    label: "10 km",
  },
  {
    value: 20,
    label: "20 km",
  },
  {
    value: 30,
    label: "30+ km",
  },
];

export function valuetext(value: number) {
  return `${value} km`;
}
