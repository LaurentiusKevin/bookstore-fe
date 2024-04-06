import { Snackbar, SnackbarProps } from "@mui/joy";
import { UseSnackbarParameters } from "@mui/base";
import { ReactNode } from "react";

interface SnackbarCustomInterface extends UseSnackbarParameters {
  children: ReactNode;
}

export default function SnackbarCustom({
  autoHideDuration,
  open,
  onClose,
  color,
  variant,
  children,
}: SnackbarCustomInterface & SnackbarProps) {
  return (
    <Snackbar
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={onClose}
      color={color}
      variant={variant}
    >
      {children}
    </Snackbar>
  );
}
