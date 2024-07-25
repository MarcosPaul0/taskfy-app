export const SPINNER_SIZE = {
  sm: 22,
  md: 34,
  lg: 42,
} as const;

export type SpinnerSize = keyof typeof SPINNER_SIZE;
