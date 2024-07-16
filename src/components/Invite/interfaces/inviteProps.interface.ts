import { InputProps } from "@taskfy/components/TextInput/interfaces/inputProps.interface";

export interface InviteProps {
  emailInputProps: Omit<InputProps, "label">;
  emailListProps: {
    addEmail: () => void;
    removeEmail: (email: string) => void;
    emails: string[];
  };
}
