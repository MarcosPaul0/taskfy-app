import { ClipLoader } from "react-spinners";
import { SpinnerProps } from "./interfaces/spinnerProps.interface";
import { SPINNER_SIZE } from "./constants/spinnerSize.constant";

export function Spinner({ size }: SpinnerProps) {
  return (
    <ClipLoader size={SPINNER_SIZE[size]} loading={true} color="#10b981" />
  );
}
