export enum Level {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum Price {
  LOW = '$',
  MEDIUM = '$$',
  HIGH = '$$$',
}

export const marks = [
  {
    value: 0,
    label: '0 km',
  },
  {
    value: 10,
    label: '10 km',
  },
  {
    value: 20,
    label: '20 km',
  },
  {
    value: 30,
    label: '30 km+',
  },
];

export function valuetext(value: number) {
  return `${value} km`;
}

