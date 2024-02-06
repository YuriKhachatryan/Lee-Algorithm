interface INfButton {
  onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
  title: string;
  variant: "contained" | "text" | "outlined";
  fullWidth?: boolean;
}

interface IInputField {
  value: string;
  handleChange: (value: string, name: string) => void;
  type: string;
  name: string;
}

interface Address {
  x: number;
  y: number;
  numbeOfSteps: number;
}

export type { INfButton, IInputField, Address };
