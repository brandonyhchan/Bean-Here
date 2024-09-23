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
  NOISE_LOW = "Noise - Low to High",
  NOISE_HIGH = "Noise - High to Low",
  CAPACITY_LOW = "Capacity - Low to High",
  CAPACITY_HIGH = "Capacity - High to Low",
  PRICE_LOW = "Price - Low to High",
  PRICE_HIGH = "Price - High to Low"
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
  NOISE_LOW = "Noise - Low to High",
  NOISE_HIGH = "Noise - High to Low",
  CAPACITY_LOW = "Capacity - Low to High",
  CAPACITY_HIGH = "Capacity - High to Low",
  PRICE_LOW = "Price - Low to High",
  PRICE_HIGH = "Price - High to Low"
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
