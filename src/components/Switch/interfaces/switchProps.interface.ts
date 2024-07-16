export interface SwitchProps {
  onSwitch: (isActive: boolean) => void;
  value: boolean;
  label?: string;
  id?: string;
}
