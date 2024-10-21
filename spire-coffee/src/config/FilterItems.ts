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

export enum Price {
  LOW = "$",
  MEDIUM = "$$",
  HIGH = "$$$",
}

export enum RadioAttribute {
  NOISE = "noise",
  CAPACITY = "capacity",
  SORT = "sort",
}

export enum ExploreSortOption {
  NOISE_LOW = "Noise - Low to High",
  NOISE_HIGH = "Noise - High to Low",
  CAPACITY_LOW = "Capacity - Low to High",
  CAPACITY_HIGH = "Capacity - High to Low",
  PRICE_LOW = "Price - Low to High",
  PRICE_HIGH = "Price - High to Low",
}

export const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30+",
  },
];

export function valuetext(value: number) {
  return `${value} km`;
}
