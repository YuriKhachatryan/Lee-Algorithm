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

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

export type { INfButton, IInputField, Address };
